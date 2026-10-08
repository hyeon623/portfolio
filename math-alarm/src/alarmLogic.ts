export type Difficulty = "easy" | "normal";

export type AlarmSettings = {
  time: string;
  enabled: boolean;
  difficulty: Difficulty;
};

export type MathProblem = {
  prompt: string;
  answer: number;
};

export const STORAGE_KEY = "math-alarm-settings-v1";
export const NOTIFICATION_ID = "math-alarm-daily";

export const DEFAULT_SETTINGS: AlarmSettings = {
  time: "07:00",
  enabled: false,
  difficulty: "easy",
};

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function formatClock(date: Date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

export function formatDateKo(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function parseSettings(raw: string | null): AlarmSettings {
  if (!raw) return DEFAULT_SETTINGS;
  try {
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

export function makeProblem(difficulty: Difficulty): MathProblem {
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

export function parseHourMinute(time: string) {
  const [h, m] = time.split(":").map((part) => Number(part));
  return {
    hour: Number.isFinite(h) ? h : 7,
    minute: Number.isFinite(m) ? m : 0,
  };
}
