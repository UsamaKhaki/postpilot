"use client";

import { useEffect, useState } from "react";
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

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("candy");

  useEffect(() => {
    const saved = (localStorage.getItem("pp-theme") as Theme) || "candy";
    setTheme(saved);
    apply(saved);
  }, []);

  function choose(t: Theme) {
    setTheme(t);
    localStorage.setItem("pp-theme", t);
    apply(t);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {OPTIONS.map((o) => {
        const active = theme === o.id;
        return (
          <button
            key={o.id}
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
