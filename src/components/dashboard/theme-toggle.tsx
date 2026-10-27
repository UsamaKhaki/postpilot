"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Palette, Briefcase } from "lucide-react";

type Theme = "candy" | "pro";

const OPTIONS: { id: Theme; label: string; desc: string; icon: typeof Palette }[] = [
  { id: "candy", label: "Playful", desc: "Bright, social, Gen-Z energy.", icon: Palette },
  { id: "pro", label: "Professional", desc: "Restrained navy for B2B buyers.", icon: Briefcase },
];

function apply(theme: Theme) {
  if (theme === "pro") document.documentElement.setAttribute("data-theme", "pro");
  else document.documentElement.removeAttribute("data-theme");
}

const STORAGE_KEY = "pp-theme";
const THEME_EVENT = "pp-theme-change";

function readTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === "pro" ? "pro" : "candy";
  } catch {
    return "candy";
  }
}

// localStorage is an external store: subscribe to cross-tab `storage` events
// and to our own event so this component re-renders after `choose`.
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "candy" as const);

  useEffect(() => {
    apply(theme);
  }, [theme]);

  function choose(t: Theme) {
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this page.
      apply(t);
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {OPTIONS.map((o) => {
        const active = theme === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => choose(o.id)}
            className={`flex items-start gap-3 rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5 ${
              active ? "bg-white shadow-[var(--shadow-soft)] ring-2 ring-brand-300" : "bg-white/70 ring-1 ring-ink-100"
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white">
              <o.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink-900">{o.label}</span>
              <span className="block text-xs text-muted">{o.desc}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
