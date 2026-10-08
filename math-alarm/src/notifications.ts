import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { NOTIFICATION_ID, parseHourMinute } from "./alarmLogic";

/** Bundled via expo-notifications config plugin `sounds`. Use base filename only. */
export const ALARM_SOUND_FILE = "alarm.wav";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function isMathAlarmNotification(
  data: unknown,
): data is { type: "math-alarm" } {
  return (
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    (data as { type?: unknown }).type === "math-alarm"
  );
}

export function isMathAlarmData(data: unknown) {
  return isMathAlarmNotification(data);
}

export async function ensureNotificationPermissions() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("alarms", {
      name: "Math Alarm",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: ALARM_SOUND_FILE,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
      bypassDnd: false,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (
    current.granted ||
    current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  }

  const requested = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowCriticalAlerts: false,
    },
  });

  return (
    requested.granted ||
    requested.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export async function cancelScheduledAlarm() {
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID).catch(
    () => undefined,
  );
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((item) => isMathAlarmNotification(item.content.data))
      .map((item) =>
        Notifications.cancelScheduledNotificationAsync(item.identifier).catch(
          () => undefined,
        ),
      ),
  );
}

export async function scheduleDailyAlarm(time: string) {
  const { hour, minute } = parseHourMinute(time);
  const permitted = await ensureNotificationPermissions();
  if (!permitted) {
    throw new Error("NOTIFICATION_PERMISSION_DENIED");
  }

  await cancelScheduledAlarm();

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID,
    content: {
      title: "Math Alarm",
      body: "문제를 풀어야 알람이 꺼집니다",
      sound: ALARM_SOUND_FILE,
      data: { type: "math-alarm" },
      ...(Platform.OS === "android" ? { channelId: "alarms" } : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      ...(Platform.OS === "android" ? { channelId: "alarms" } : {}),
    },
  });
}

export async function getInitialMathAlarmResponse() {
  const response = await Notifications.getLastNotificationResponseAsync();
  if (!response) return null;
  if (!isMathAlarmNotification(response.notification.request.content.data)) {
    await Notifications.clearLastNotificationResponseAsync();
    return null;
  }

  // Ignore stale taps from previous sessions (older than 2 minutes).
  const ageMs = Date.now() - response.notification.date;
  if (!Number.isFinite(ageMs) || ageMs > 2 * 60 * 1000) {
    await Notifications.clearLastNotificationResponseAsync();
    return null;
  }

  await Notifications.clearLastNotificationResponseAsync();
  return response;
}
