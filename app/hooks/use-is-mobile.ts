"use client";

import { useEffect, useState } from "react";

const MOBILE_MAX = 767;

function getIsMobile() {
  if (typeof window === "undefined") {
    return true;
  }
  return window.innerWidth <= MOBILE_MAX;
}

/** Client-only mobile detection; remounts on resize. */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(getIsMobile());
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return isMobile;
}
