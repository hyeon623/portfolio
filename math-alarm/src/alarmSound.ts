import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";

const alarmSource = require("../assets/alarm.wav");

let player: AudioPlayer | null = null;
let audioModeReady = false;

async function ensureAudioMode() {
  if (audioModeReady) return;
  await setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: true,
    interruptionMode: "doNotMix",
  });
  audioModeReady = true;
}

export async function startAlarmSound() {
  try {
    await ensureAudioMode();
    if (!player) {
      player = createAudioPlayer(alarmSource);
    }
    player.loop = true;
    player.volume = 1;
    player.seekTo(0);
    player.play();
  } catch {
    // Audio may be unavailable in some environments (e.g. web without gesture).
  }
}

export async function stopAlarmSound() {
  try {
    if (!player) return;
    player.pause();
    player.seekTo(0);
  } catch {
    // ignore
  }
}

export function releaseAlarmSound() {
  try {
    player?.remove();
  } catch {
    // ignore
  } finally {
    player = null;
  }
}
