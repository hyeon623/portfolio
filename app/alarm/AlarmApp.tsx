"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import "./alarm.css";

type Difficulty = "easy" | "normal";

type AlarmSettings = {
  time: string;
  enabled: boolean;
  difficulty: Difficulty;
};

type MathProblem = {
  prompt: string;
  answer: number;
};

const STORAGE_KEY = "math-alarm-settings-v1";

const DEFAULT_SETTINGS: AlarmSettings = {
  time: "07:00",
  enabled: false,
  difficulty: "easy",
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatClock(date: Date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

function formatDateKo(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

function loadSettings(): AlarmSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<AlarmSettings>;
    return {
      time:
        typeof parsed.time === "string" && /^\d{2}:\d{2}$/.test(parsed.time)
          ? parsed.time
          : DEFAULT_SETTINGS.time,
      enabled: Boolean(parsed.enabled),
      difficulty: parsed.difficulty === "normal" ? "normal" : "easy",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeProblem(difficulty: Difficulty): MathProblem {
  if (difficulty === "easy") {
    const a = randInt(2, 9);
    const b = randInt(2, 9);
    return { prompt: `${a} + ${b}`, answer: a + b };
  }

  const op = Math.random() < 0.5 ? "+" : "-";
  if (op === "+") {
    const a = randInt(12, 48);
    const b = randInt(11, 39);
    return { prompt: `${a} + ${b}`, answer: a + b };
  }

  const a = randInt(20, 90);
  const b = randInt(10, Math.min(45, a - 1));
  return { prompt: `${a} − ${b}`, answer: a - b };
}

class AlarmTone {
  private ctx: AudioContext | null = null;
  private intervalId: number | null = null;
  private unlocked = false;

  async unlock() {
    if (this.unlocked && this.ctx?.state === "running") return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    if (!this.ctx) this.ctx = new Ctx();
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    // Short silent buffer to unlock iOS audio on user gesture.
    const buffer = this.ctx.createBuffer(1, 1, 22050);
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(this.ctx.destination);
    source.start(0);
    this.unlocked = true;
  }

  start() {
    if (!this.ctx) return;
    if (this.intervalId != null) return;

    const beep = () => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(660, now + 0.18);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    };

    beep();
    this.intervalId = window.setInterval(beep, 700);
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate([200, 120, 200, 120, 400]);
    }
  }

  isReady() {
    return this.unlocked && this.ctx?.state === "running";
  }

  stop() {
    if (this.intervalId != null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate(0);
    }
  }
}

function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      className={`alarm-toggle${on ? " on" : ""}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
    >
      <span className="alarm-toggle-knob" />
    </button>
  );
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}

export default function AlarmApp() {
  const isClient = useIsClient();
  const [now, setNow] = useState(() => new Date());
  const [settings, setSettings] = useState<AlarmSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answerError, setAnswerError] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [notifyReady, setNotifyReady] = useState(false);
  const [wakeReady, setWakeReady] = useState(false);

  const toneRef = useRef<AlarmTone | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const lastTriggerKeyRef = useRef<string | null>(null);
  const notifyRef = useRef<Notification | null>(null);

  if (isClient && !hydrated) {
    setHydrated(true);
    setSettings(loadSettings());
  }

  useEffect(() => {
    toneRef.current = new AlarmTone();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 250);
    return () => window.clearInterval(id);
  }, []);

  const requestWakeLock = useCallback(async () => {
    try {
      if (!("wakeLock" in navigator)) return false;
      await wakeLockRef.current?.release().catch(() => undefined);
      wakeLockRef.current = await navigator.wakeLock.request("screen");
      return true;
    } catch {
      // iOS may deny wake lock outside secure/user contexts.
      return false;
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    try {
      await wakeLockRef.current?.release();
    } catch {
      // ignore
    } finally {
      wakeLockRef.current = null;
    }
  }, []);

  const requestNotifications = useCallback(async () => {
    if (typeof Notification === "undefined") return false;
    try {
      const permission =
        Notification.permission === "granted"
          ? "granted"
          : await Notification.requestPermission();
      return permission === "granted";
    } catch {
      return false;
    }
  }, []);

  const requestAllPermissions = useCallback(async () => {
    await toneRef.current?.unlock();
    const audioOk = Boolean(toneRef.current?.isReady());
    const notifyOk = await requestNotifications();
    const wakeOk = await requestWakeLock();
    setAudioReady(audioOk);
    setNotifyReady(notifyOk);
    setWakeReady(wakeOk);
  }, [requestNotifications, requestWakeLock]);

  useEffect(() => {
    if (settings.enabled || ringing) {
      void requestWakeLock();
    } else {
      void releaseWakeLock();
    }
  }, [settings.enabled, ringing, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible" && (settings.enabled || ringing)) {
        void requestWakeLock();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [settings.enabled, ringing, requestWakeLock]);

  const triggerAlarm = useCallback(() => {
    setProblem(makeProblem(settings.difficulty));
    setAnswer("");
    setFeedback("");
    setAnswerError(false);
    setRinging(true);
    toneRef.current?.start();
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate([300, 150, 300, 150, 500]);
    }
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        notifyRef.current?.close();
        notifyRef.current = new Notification("Wake up dongdong", {
          body: "문제를 풀어야 알람이 꺼집니다",
          tag: "math-alarm-ring",
          requireInteraction: true,
        });
      } catch {
        // Some browsers block Notification construction outside service workers.
      }
    }
  }, [settings.difficulty]);

  useEffect(() => {
    if (!hydrated || !settings.enabled || ringing) return;

    const hhmm = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
    if (hhmm !== settings.time) return;

    const key = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${hhmm}`;
    if (lastTriggerKeyRef.current === key) return;
    lastTriggerKeyRef.current = key;
    triggerAlarm();
  }, [now, settings.enabled, settings.time, hydrated, ringing, triggerAlarm]);

  useEffect(() => {
    return () => {
      toneRef.current?.stop();
      void releaseWakeLock();
    };
  }, [releaseWakeLock]);

  const ensureAudio = useCallback(async () => {
    await toneRef.current?.unlock();
    setAudioReady(Boolean(toneRef.current?.isReady()));
  }, []);

  const updateSettings = useCallback(
    async (patch: Partial<AlarmSettings>) => {
      if (patch.enabled) {
        await requestAllPermissions();
      } else {
        await ensureAudio();
      }
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    [ensureAudio, requestAllPermissions],
  );

  const dismissAlarm = useCallback(() => {
    toneRef.current?.stop();
    notifyRef.current?.close();
    notifyRef.current = null;
    setRinging(false);
    setProblem(null);
    setAnswer("");
    setFeedback("");
    setAnswerError(false);
    setSettings((prev) => ({ ...prev, enabled: false }));
  }, []);

  const submitAnswer = useCallback(() => {
    if (!problem || answer === "") return;
    const value = Number(answer);
    if (Number.isNaN(value) || value !== problem.answer) {
      setAnswerError(true);
      setFeedback("틀렸어요. 다시 풀어주세요.");
      setAnswer("");
      window.setTimeout(() => setAnswerError(false), 350);
      return;
    }
    dismissAlarm();
  }, [answer, problem, dismissAlarm]);

  const onPad = useCallback(
    (key: string) => {
      void ensureAudio();
      if (key === "clear") {
        setAnswer("");
        setFeedback("");
        return;
      }
      if (key === "del") {
        setAnswer((prev) => prev.slice(0, -1));
        return;
      }
      if (key === "submit") {
        submitAnswer();
        return;
      }
      setAnswer((prev) => {
        if (prev.length >= 4) return prev;
        if (prev === "0") return key;
        return prev + key;
      });
      setFeedback("");
    },
    [ensureAudio, submitAnswer],
  );

  useEffect(() => {
    if (!ringing) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();
        onPad(event.key);
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        onPad("del");
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        onPad("clear");
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        onPad("submit");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ringing, onPad]);

  const nextLabel = useMemo(() => {
    if (!settings.enabled) return "알람 꺼짐";
    return `${settings.time}에 울림`;
  }, [settings.enabled, settings.time]);

  return (
    <div className="alarm-root">
      <header className="alarm-header">
        <div className="alarm-brand">WAKE UP DONGDONG</div>
        <div className="alarm-status" aria-live="polite">
          <span className={`alarm-status-dot${settings.enabled ? " on" : ""}`} />
          {hydrated ? nextLabel : "불러오는 중"}
        </div>
      </header>

      <section className="alarm-clock" aria-label="현재 시각">
        <div className="alarm-clock-label">지금</div>
        <div className="alarm-clock-time">{formatClock(now)}</div>
        <div className="alarm-clock-date">{formatDateKo(now)}</div>
      </section>

      <section className="alarm-panel" aria-label="알람 설정">
        <div className="alarm-row">
          <div className="alarm-row-label">
            <span className="alarm-row-title">알람 시각</span>
            <span className="alarm-row-desc">울릴 시간을 선택하세요</span>
          </div>
          <input
            className="alarm-time-input"
            type="time"
            value={settings.time}
            onChange={(e) => {
              void updateSettings({ time: e.target.value || "07:00" });
            }}
            aria-label="알람 시각"
          />
        </div>

        <div className="alarm-row">
          <div className="alarm-row-label">
            <span className="alarm-row-title">알람 켜기</span>
            <span className="alarm-row-desc">
              {settings.enabled
                ? [
                    audioReady ? "소리" : null,
                    notifyReady ? "알림" : null,
                    wakeReady ? "화면유지" : null,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "권한 요청 중"
                : "켤 때 소리·알림·화면유지 모두 허용"}
            </span>
          </div>
          <Toggle
            on={settings.enabled}
            label="알람 켜기"
            onChange={(enabled) => {
              void updateSettings({ enabled });
            }}
          />
        </div>

        <div className="alarm-row">
          <div className="alarm-row-label">
            <span className="alarm-row-title">문제 난이도</span>
            <span className="alarm-row-desc">끌 때 풀어야 하는 수학 문제</span>
          </div>
          <div className="alarm-seg" role="group" aria-label="난이도">
            <button
              type="button"
              className={settings.difficulty === "easy" ? "active" : undefined}
              onClick={() => {
                void updateSettings({ difficulty: "easy" });
              }}
            >
              쉬움
            </button>
            <button
              type="button"
              className={settings.difficulty === "normal" ? "active" : undefined}
              onClick={() => {
                void updateSettings({ difficulty: "normal" });
              }}
            >
              보통
            </button>
          </div>
        </div>

        <button
          type="button"
          className="alarm-test-btn"
          data-testid="alarm-test-ring"
          onClick={async () => {
            await requestAllPermissions();
            triggerAlarm();
          }}
        >
          지금 시험 울리기
        </button>
      </section>

      <p className="alarm-tip">
        아이폰: Safari에서 <strong>공유 → 홈 화면에 추가</strong> 후, 뜨는
        권한은 모두 허용하세요. 앱을 켠 채로 두면 가장 안정적입니다.
      </p>

      {ringing && problem ? (
        <RingingOverlay
          now={now}
          problem={problem}
          answer={answer}
          feedback={feedback}
          answerError={answerError}
          onPad={onPad}
        />
      ) : null}
    </div>
  );
}

function RingingOverlay({
  now,
  problem,
  answer,
  feedback,
  answerError,
  onPad,
}: {
  now: Date;
  problem: MathProblem;
  answer: string;
  feedback: string;
  answerError: boolean;
  onPad: (key: string) => void;
}) {
  const keys: { id: string; label: ReactNode; className?: string }[] = [
    { id: "1", label: "1" },
    { id: "2", label: "2" },
    { id: "3", label: "3" },
    { id: "4", label: "4" },
    { id: "5", label: "5" },
    { id: "6", label: "6" },
    { id: "7", label: "7" },
    { id: "8", label: "8" },
    { id: "9", label: "9" },
    { id: "del", label: "←", className: "action" },
    { id: "0", label: "0" },
    { id: "clear", label: "C", className: "action" },
  ];

  return (
    <div
      className="alarm-ringing"
      role="dialog"
      aria-modal="true"
      aria-label="알람"
      data-testid="alarm-ringing"
    >
      <div className="alarm-ring-title">Alarm</div>
      <div className="alarm-ring-time">{formatClock(now)}</div>
      <div className="alarm-ring-sub">문제를 맞혀야 알람이 꺼집니다</div>

      <div className="alarm-math-card">
        <div className="alarm-math-prompt">다음 계산의 결과는?</div>
        <div className="alarm-math-eq" data-testid="alarm-math-eq">
          {problem.prompt} = ?
        </div>
        <div
          className={`alarm-math-answer${answerError ? " error" : ""}`}
          aria-live="polite"
          data-testid="alarm-math-answer"
        >
          {answer || "—"}
        </div>
        <div className="alarm-math-feedback">{feedback}</div>
        <div className="alarm-pad">
          {keys.map((key) => (
            <button
              key={key.id}
              type="button"
              className={key.className}
              data-testid={`alarm-pad-${key.id}`}
              onClick={() => onPad(key.id)}
            >
              {key.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="alarm-submit-btn"
          data-testid="alarm-submit"
          disabled={answer === ""}
          onClick={() => onPad("submit")}
        >
          확인
        </button>
      </div>
    </div>
  );
}
