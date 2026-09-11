"use client";

import { useEffect, useState } from "react";
import { koreanClass } from "./bilingual";
import {
  AboutSection,
  ContactSection,
  ResumeSection,
  WorkPortfolioSection,
} from "./desktop-home";

type MobileTab = "work" | "about" | "contact";

function TabIcon({ name }: { name: MobileTab }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.4,
    className: "h-5 w-5",
    "aria-hidden": true as const,
  };

  if (name === "work") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="0.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="0.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="0.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="0.5" />
      </svg>
    );
  }

  if (name === "about") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.25" />
        <path
          d="M5.5 19.5c1.8-3.2 4.2-4.8 6.5-4.8s4.7 1.6 6.5 4.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 7.5h16M4 12h16M4 16.5h10" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Phone chrome only — same portfolio content/interactions as desktop.
 * Work tab reuses WorkPortfolioSection (categories → projects → full detail).
 */
export function MobileHome() {
  const [tab, setTab] = useState<MobileTab>("work");

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [tab]);

  return (
    <div className="min-h-dvh bg-white font-sans text-black">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="flex h-12 items-center justify-between px-4">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.28em] text-black">
              Kim Dong Hyeon
            </p>
            <p className={`truncate text-[0.62rem] text-black/40 ${koreanClass}`}>
              김동현 · Spatial Designer
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-black/35">
            Portfolio
          </p>
        </div>
      </header>

      <main className="pb-24">
        {tab === "work" ? <WorkPortfolioSection compact /> : null}
        {tab === "about" ? (
          <>
            <AboutSection compact />
            <ResumeSection compact />
          </>
        ) : null}
        {tab === "contact" ? <ContactSection compact /> : null}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <ul className="mx-auto flex h-16 max-w-lg items-stretch">
          {(
            [
              { id: "work" as const, label: "Work" },
              { id: "about" as const, label: "About" },
              { id: "contact" as const, label: "Contact" },
            ]
          ).map((item) => {
            const active = tab === item.id;
            return (
              <li key={item.id} className="flex-1">
                <button
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex h-full w-full touch-manipulation flex-col items-center justify-center gap-1 transition-colors ${
                    active ? "text-black" : "text-black/35"
                  }`}
                >
                  <TabIcon name={item.id} />
                  <span className="text-[9px] font-medium uppercase tracking-[0.18em]">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
