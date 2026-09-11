"use client";

import { useSyncExternalStore } from "react";

const MOBILE_MAX_WIDTH = 767;

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches;
}

function getServerSnapshot() {
  return false;
}

/** True for phone-width viewports. Same URL; layout switches client-side. */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
