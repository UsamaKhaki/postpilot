import type { Metadata } from "next";
import { ShieldCheck, Check, Sparkles } from "lucide-react";
import { Aurora } from "@/components/ui-kit";
import { Floaty } from "@/components/floaty";
import { Logo } from "@/components/logo";
import { LoginButtons } from "./login-buttons";

export const metadata: Metadata = {
  title: "Log in — Postpilot",
  description:
    "Sign in to Postpilot with your LinkedIn account to start automating your content.",
};

const PERKS = [
  "Posts written in your voice",
  "Approve everything over WhatsApp",
  "Publishes at the perfect time",
];

export default function LoginPage() {
  return (
    <section className="relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-5 py-16">
      <Aurora />

      {/* Floating 3D icons on the sides */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <Floaty kind="thumb" color="blue" size={58} left="8%" top="18%" dur="7s" tilt="-8deg" />
        <Floaty kind="chat" color="sky" size={52} left="11%" top="52%" dur="8.5s" delay="0.5s" tilt="6deg" motion="drift" />
        <Floaty kind="squiggle" color="grape" size={60} left="6%" bottom="14%" dur="7.5s" delay="0.3s" tilt="16deg" />
        <Floaty kind="heart" color="pink" size={56} right="9%" top="20%" dur="8s" delay="0.2s" tilt="10deg" />
        <Floaty kind="star" color="butter" size={50} right="11%" top="54%" dur="7.5s" delay="0.8s" tilt="-6deg" />
        <Floaty kind="pill" color="grape" size={64} right="7%" bottom="16%" dur="8.5s" tilt="26deg" />
        <Floaty kind="ball" color="sun" size={16} left="22%" top="32%" dur="10s" motion="drift" />
        <Floaty kind="ball" color="pink" size={14} right="24%" bottom="30%" dur="11s" delay="0.4s" motion="drift" />
      </div>

      {/* Centered card */}
      <div className="animate-pop-in relative w-full max-w-md">
        <div className="rounded-[2rem] bg-white/80 p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-10">
          <div className="flex justify-center">
            <Logo />
          </div>

          <span className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome to Postpilot
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900">
            Sign in to continue
          </h1>
          <p className="mt-2 text-muted">
            Connect your LinkedIn account — it only takes a few seconds.
          </p>

          <LoginButtons />

          <div className="mt-7 border-t border-ink-100 pt-6">
            <ul className="space-y-2.5 text-left">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-ink-700">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-medium text-ink-700 backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-brand-600" />
            Secured with 256-bit OAuth 2.0
          </span>
          <p className="text-center text-xs text-muted">
            Not affiliated with or endorsed by LinkedIn Corporation.
          </p>
        </div>
      </div>
    </section>
  );
}
