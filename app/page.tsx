"use client";

import { DesktopHome } from "./components/desktop-home";
import { MobileHome } from "./components/mobile-home";

/**
 * Same URL: phone layout via CSS (max-md), desktop via md+.
 * Avoids matchMedia hydration misses so phones always get the mobile shell
 * with the shared WorkPortfolioSection content.
 */
export default function Home() {
  return (
    <>
      <div className="md:hidden">
        <MobileHome />
      </div>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
    </>
  );
}
