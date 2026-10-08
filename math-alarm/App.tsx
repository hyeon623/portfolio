import { StatusBar } from "expo-status-bar";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AppState,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  DEFAULT_SETTINGS,
  STORAGE_KEY,
  formatClock,
  formatDateKo,
  makeProblem,
  parseSettings,
  type AlarmSettings,
  type Difficulty,
  type MathProblem,
} from "./src/alarmLogic";
import { startAlarmSound, stopAlarmSound } from "./src/alarmSound";
import {
  cancelScheduledAlarm,
  ensureNotificationPermissions,
  getInitialMathAlarmResponse,
  isMathAlarmData,
  scheduleDailyAlarm,
} from "./src/notifications";

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [settings, setSettings] = useState<AlarmSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notifyReady, setNotifyReady] = useState(false);
  const [scheduleError, setScheduleError] = useState("");
  const lastTriggerKeyRef = useRef<string | null>(null);
  const difficultyRef = useRef<Difficulty>(DEFAULT_SETTINGS.difficulty);
  const ringingRef = useRef(false);

  useEffect(() => {
    difficultyRef.current = settings.difficulty;
  }, [settings.difficulty]);

  useEffect(() => {
    ringingRef.current = ringing;
  }, [ringing]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 250);
    return () => clearInterval(id);
  }, []);

  const triggerAlarm = useCallback(() => {
    if (ringingRef.current) return;
    setProblem(makeProblem(difficultyRef.current));
    setAnswer("");
    setFeedback("");
    setRinging(true);
    void activateKeepAwakeAsync("math-alarm");
    void startAlarmSound();
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  useEffect(() => {
    void (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const loaded = parseSettings(raw);
      setSettings(loaded);
      setHydrated(true);

      if (loaded.enabled) {
        try {
          await scheduleDailyAlarm(loaded.time);
          setNotifyReady(true);
          setScheduleError("");
        } catch {
          setNotifyReady(false);
          setScheduleError("알림 권한이 필요합니다. 알람을 다시 켜 주세요.");
          setSettings((prev) => ({ ...prev, enabled: false }));
        }
      }

      const initial = await getInitialMathAlarmResponse();
      if (initial) {
        triggerAlarm();
      }
    })();
  }, [triggerAlarm]);

  useEffect(() => {
    if (!hydrated) return;
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, hydrated]);

  // Foreground clock-based trigger (when app is already open).
  useEffect(() => {
    if (!hydrated || !settings.enabled || ringing) return;
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;
    if (hhmm !== settings.time) return;
    const key = `${now.toDateString()}-${hhmm}`;
    if (lastTriggerKeyRef.current === key) return;
    lastTriggerKeyRef.current = key;
    triggerAlarm();
  }, [now, settings.enabled, settings.time, hydrated, ringing, triggerAlarm]);

  useEffect(() => {
    const received = Notifications.addNotificationReceivedListener((notification) => {
      if (isMathAlarmData(notification.request.content.data)) {
        triggerAlarm();
      }
    });
    const response = Notifications.addNotificationResponseReceivedListener(
      (event) => {
        if (isMathAlarmData(event.notification.request.content.data)) {
          triggerAlarm();
        }
      },
    );
    return () => {
      received.remove();
      response.remove();
    };
  }, [triggerAlarm]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active" && ringingRef.current) {
        void startAlarmSound();
      }
    });
    return () => sub.remove();
  }, []);

  const updateSettings = useCallback(
    async (patch: Partial<AlarmSettings>) => {
      const next: AlarmSettings = { ...settings, ...patch };
      setScheduleError("");

      // Time change while armed: cancel old, schedule new.
      if (patch.time !== undefined && next.enabled) {
        if (!/^\d{2}:\d{2}$/.test(next.time)) {
          setSettings((prev) => ({ ...prev, time: DEFAULT_SETTINGS.time }));
          return;
        }
        try {
          await scheduleDailyAlarm(next.time);
          setNotifyReady(true);
        } catch {
          setNotifyReady(false);
          setScheduleError("알림 권한이 없어 새 시각으로 예약하지 못했습니다.");
          next.enabled = false;
          await cancelScheduledAlarm();
        }
        setSettings(next);
        return;
      }

      if (patch.enabled === true) {
        try {
          const ok = await ensureNotificationPermissions();
          if (!ok) throw new Error("NOTIFICATION_PERMISSION_DENIED");
          await scheduleDailyAlarm(next.time);
          setNotifyReady(true);
          void activateKeepAwakeAsync("math-alarm-armed");
        } catch {
          setNotifyReady(false);
          setScheduleError("알림 권한을 허용해야 알람을 켤 수 있습니다.");
          next.enabled = false;
          await cancelScheduledAlarm();
        }
        setSettings(next);
        return;
      }

      if (patch.enabled === false) {
        await cancelScheduledAlarm();
        deactivateKeepAwake("math-alarm-armed");
        setNotifyReady(false);
        setSettings(next);
        return;
      }

      // Difficulty-only (or other) updates.
      setSettings(next);
    },
    [settings],
  );

  const dismissAlarm = useCallback(() => {
    void stopAlarmSound();
    setRinging(false);
    setProblem(null);
    setAnswer("");
    setFeedback("");
    deactivateKeepAwake("math-alarm");
    setSettings((prev) => ({ ...prev, enabled: false }));
    void cancelScheduledAlarm();
    void Notifications.dismissAllNotificationsAsync().catch(() => undefined);
  }, []);

  const submitAnswer = useCallback(() => {
    if (!problem || answer === "") return;
    const value = Number(answer);
    if (Number.isNaN(value) || value !== problem.answer) {
      setFeedback("틀렸어요. 다시 풀어주세요.");
      setAnswer("");
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    dismissAlarm();
  }, [answer, problem, dismissAlarm]);

  const onPad = useCallback(
    (key: string) => {
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
    [submitAnswer],
  );

  const statusLabel = useMemo(() => {
    if (!hydrated) return "불러오는 중";
    if (!settings.enabled) return "알람 꺼짐";
    return `${settings.time}에 울림`;
  }, [hydrated, settings.enabled, settings.time]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.brand}>WAKE UP DONGDONG</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, settings.enabled && styles.dotOn]} />
          <Text style={styles.statusText}>{statusLabel}</Text>
        </View>
      </View>

      <View style={styles.clock}>
        <Text style={styles.clockLabel}>지금</Text>
        <Text style={styles.clockTime}>{formatClock(now)}</Text>
        <Text style={styles.clockDate}>{formatDateKo(now)}</Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.row}>
          <View style={styles.rowLabel}>
            <Text style={styles.rowTitle}>알람 시각</Text>
            <Text style={styles.rowDesc}>울릴 시간을 선택하세요 (HH:MM)</Text>
          </View>
          <TextInput
            style={styles.timeInput}
            value={settings.time}
            onChangeText={(value) => {
              const cleaned = value.replace(/[^\d:]/g, "").slice(0, 5);
              setSettings((prev) => ({ ...prev, time: cleaned }));
            }}
            onBlur={() => {
              if (/^\d{2}:\d{2}$/.test(settings.time)) {
                void updateSettings({ time: settings.time });
              } else {
                setSettings((prev) => ({
                  ...prev,
                  time: DEFAULT_SETTINGS.time,
                }));
              }
            }}
            keyboardType="numbers-and-punctuation"
            placeholder="07:00"
            placeholderTextColor="#8b9aab"
            maxLength={5}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLabel}>
            <Text style={styles.rowTitle}>알람 켜기</Text>
            <Text style={styles.rowDesc}>
              {settings.enabled
                ? notifyReady
                  ? "매일 예약됨 · 알림 허용"
                  : "알림 권한이 필요합니다"
                : "켤 때 매일 알림을 예약합니다"}
            </Text>
          </View>
          <Switch
            value={settings.enabled}
            onValueChange={(enabled) => {
              void updateSettings({ enabled });
            }}
            trackColor={{ false: "#243040", true: "#3dd6c6" }}
            thumbColor="#ffffff"
          />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLabel}>
            <Text style={styles.rowTitle}>문제 난이도</Text>
            <Text style={styles.rowDesc}>끌 때 풀어야 하는 수학 문제</Text>
          </View>
          <View style={styles.seg}>
            {(["easy", "normal"] as Difficulty[]).map((level) => (
              <Pressable
                key={level}
                style={[
                  styles.segBtn,
                  settings.difficulty === level && styles.segBtnOn,
                ]}
                onPress={() => {
                  void updateSettings({ difficulty: level });
                }}
              >
                <Text
                  style={[
                    styles.segText,
                    settings.difficulty === level && styles.segTextOn,
                  ]}
                >
                  {level === "easy" ? "쉬움" : "보통"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.testBtn}
          onPress={async () => {
            await ensureNotificationPermissions();
            triggerAlarm();
          }}
        >
          <Text style={styles.testBtnText}>지금 시험 울리기</Text>
        </Pressable>

        {scheduleError ? (
          <Text style={styles.errorText}>{scheduleError}</Text>
        ) : null}
      </View>

      <Text style={styles.tip}>
        잠금·종료 상태에서는 시스템 알림으로 울립니다. 알림을 열면 수학 문제가
        나타납니다.
      </Text>

      {ringing && problem ? (
        <View style={styles.ringing} accessibilityViewIsModal>
          <Text style={styles.ringTitle}>ALARM</Text>
          <Text style={styles.ringTime}>{formatClock(now)}</Text>
          <Text style={styles.ringSub}>문제를 맞혀야 알람이 꺼집니다</Text>

          <View style={styles.mathCard}>
            <Text style={styles.mathPrompt}>다음 계산의 결과는?</Text>
            <Text style={styles.mathEq}>{problem.prompt} = ?</Text>
            <View style={styles.answerBox}>
              <Text style={styles.answerText}>{answer || "—"}</Text>
            </View>
            <Text style={styles.feedback}>{feedback}</Text>
            <View style={styles.pad}>
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "del",
                "0",
                "clear",
              ].map((key) => (
                <Pressable
                  key={key}
                  style={[
                    styles.padBtn,
                    (key === "del" || key === "clear") && styles.padAction,
                  ]}
                  onPress={() => onPad(key)}
                >
                  <Text style={styles.padText}>
                    {key === "del" ? "←" : key === "clear" ? "C" : key}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable
              style={[styles.submitBtn, answer === "" && styles.submitDisabled]}
              disabled={answer === ""}
              onPress={() => onPad("submit")}
            >
              <Text style={styles.submitText}>확인</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0f1419",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    color: "#3dd6c6",
    fontWeight: "700",
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8b9aab",
  },
  dotOn: {
    backgroundColor: "#3dd6c6",
  },
  statusText: {
    color: "#8b9aab",
    fontSize: 13,
  },
  clock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clockLabel: {
    color: "#8b9aab",
    letterSpacing: 2,
    marginBottom: 8,
  },
  clockTime: {
    color: "#f2f5f8",
    fontSize: 64,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  clockDate: {
    color: "#8b9aab",
    marginTop: 10,
    fontSize: 16,
  },
  panel: {
    backgroundColor: "#1a222c",
    borderColor: "#2a3542",
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    gap: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    gap: 4,
  },
  rowTitle: {
    color: "#f2f5f8",
    fontSize: 16,
    fontWeight: "600",
  },
  rowDesc: {
    color: "#8b9aab",
    fontSize: 12,
    lineHeight: 16,
  },
  timeInput: {
    minWidth: 88,
    backgroundColor: "#243040",
    borderColor: "#2a3542",
    borderWidth: 1,
    borderRadius: 12,
    color: "#f2f5f8",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  seg: {
    flexDirection: "row",
    backgroundColor: "#243040",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a3542",
    overflow: "hidden",
  },
  segBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  segBtnOn: {
    backgroundColor: "#3dd6c6",
  },
  segText: {
    color: "#8b9aab",
    fontWeight: "600",
  },
  segTextOn: {
    color: "#06241f",
  },
  testBtn: {
    borderWidth: 1,
    borderColor: "#2a3542",
    borderRadius: 14,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  testBtnText: {
    color: "#f2f5f8",
    fontWeight: "600",
  },
  errorText: {
    color: "#ff5a5f",
    fontSize: 12,
    textAlign: "center",
  },
  tip: {
    marginTop: 14,
    color: "#8b9aab",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  ringing: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "#12080c",
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 28,
  },
  ringTitle: {
    color: "#ff5a5f",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 3,
  },
  ringTime: {
    color: "#f2f5f8",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "700",
    marginTop: 8,
  },
  ringSub: {
    color: "#c9b4b8",
    textAlign: "center",
    marginBottom: 24,
  },
  mathCard: {
    marginTop: "auto",
    backgroundColor: "#1b1014",
    borderColor: "#7a3038",
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
  },
  mathPrompt: {
    color: "#c9b4b8",
    textAlign: "center",
  },
  mathEq: {
    color: "#f2f5f8",
    textAlign: "center",
    fontSize: 36,
    fontWeight: "700",
    marginVertical: 10,
  },
  answerBox: {
    minHeight: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a3542",
    backgroundColor: "#0d080a",
    alignItems: "center",
    justifyContent: "center",
  },
  answerText: {
    color: "#f2f5f8",
    fontSize: 28,
    fontWeight: "700",
  },
  feedback: {
    color: "#ff5a5f",
    textAlign: "center",
    minHeight: 20,
    marginVertical: 8,
  },
  pad: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  padBtn: {
    width: "31%",
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: "#243040",
    alignItems: "center",
    justifyContent: "center",
  },
  padAction: {
    backgroundColor: "#3a2430",
  },
  padText: {
    color: "#f2f5f8",
    fontSize: 22,
    fontWeight: "700",
  },
  submitBtn: {
    marginTop: 12,
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: "#3dd6c6",
    alignItems: "center",
    justifyContent: "center",
  },
  submitDisabled: {
    opacity: 0.45,
  },
  submitText: {
    color: "#06241f",
    fontSize: 18,
    fontWeight: "700",
  },
});
