import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { NOTIFICATION_ID, parseHourMinute } from "./alarmLogic";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensureNotificationPermissions() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("alarms", {
      name: "Alarms",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: "default",
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (current.granted || current.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
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
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID).catch(() => undefined);
  await Notifications.cancelAllScheduledNotificationsAsync().catch(() => undefined);
}

export async function scheduleDailyAlarm(time: string) {
  const { hour, minute } = parseHourMinute(time);
  await cancelScheduledAlarm();

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID,
    content: {
      title: "Math Alarm",
      body: "문제를 풀어야 알람이 꺼집니다",
      sound: "default",
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
