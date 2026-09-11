"use client";

import { DesktopHome } from "./components/desktop-home";
import { MobileHome } from "./components/mobile-home";
import { useIsMobile } from "./hooks/use-is-mobile";

/**
 * Mount exactly one layout. Rendering both (even with CSS hide) left
 * desktop fixed/sticky layers intercepting taps on phones.
 */
export default function Home() {
  const isMobile = useIsMobile();

  // Avoid flashing the wrong layout; keep a blank shell until measured.
  if (isMobile === null) {
    return <div className="min-h-dvh bg-white" />;
  }

  if (isMobile) {
    return <MobileHome />;
  }

  return <DesktopHome />;
}
