"use client";

import { DesktopHome } from "./components/desktop-home";
import { MobileHome } from "./components/mobile-home";
import { useIsMobile } from "./hooks/use-is-mobile";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHome />;
  }

  return <DesktopHome />;
}
