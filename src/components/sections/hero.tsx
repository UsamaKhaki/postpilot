import { Send, Users, Sparkles } from "lucide-react";
import { Aurora, GradientButton } from "@/components/ui-kit";
import { Floaty } from "@/components/floaty";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Aurora />

      {/* Floating 3D social icons — kept to the left & right side rails */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {/* left rail */}
        <Floaty kind="thumb" color="blue" size={60} left="3%" top="14%" dur="7s" tilt="-8deg" />
        <Floaty kind="play" color="red" size={54} left="6%" top="44%" dur="8.5s" delay="0.4s" tilt="6deg" />
        <Floaty kind="chat" color="sky" size={52} left="4%" bottom="14%" dur="9s" delay="1s" tilt="4deg" motion="drift" />
        <Floaty kind="ball" color="grape" size={16} left="15%" top="30%" dur="10s" motion="drift" />
        {/* right rail */}
        <Floaty kind="heart" color="pink" size={58} right="3%" top="16%" dur="8s" delay="0.2s" tilt="10deg" />
        <Floaty kind="laugh" color="butter" size={52} right="5%" top="46%" dur="7.5s" delay="0.8s" tilt="-6deg" />
        <Floaty kind="squiggle" color="grape" size={56} right="4%" bottom="14%" dur="6.5s" delay="0.5s" tilt="18deg" />
        <Floaty kind="ball" color="sun" size={14} right="15%" top="32%" dur="11s" delay="0.6s" motion="drift" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            The Gateway to{" "}
            <span className="marker-underline">Effortless</span> LinkedIn Growth
          </h1>
          <p className="mt-5 max-w-md text-lg text-ink-700/80">
            Grow your audience and earn more — Postpilot writes, schedules and
            publishes posts in your voice while you approve over WhatsApp.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <GradientButton href="#start" variant="flame">
              <Sparkles className="h-5 w-5" />
              Start automating
            </GradientButton>
            <GradientButton href="/features" variant="grape">
              See features
            </GradientButton>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-ink-700">Join our community</p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <GradientButton href="#start" variant="sky" className="px-5 py-2.5 text-sm">
                <Send className="h-4 w-4" />
                Telegram
              </GradientButton>
              <span className="text-sm text-muted">Discord · X · LinkedIn</span>
            </div>
          </div>
        </div>

        {/* Right: glossy stat card */}
        <StatCard />
      </div>
    </section>
  );
}

function StatCard() {
  return (
    <div className="animate-pop-in relative mx-auto w-full max-w-md">
      <div className="relative rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffd27a,#ff7a00)] blur-md opacity-80" />

        <div className="grid grid-cols-2 gap-6">
          <Stat
            icon={<Users className="h-6 w-6" />}
            grad="linear-gradient(150deg,#ffc06a,#ff7a00)"
            label="Posts published"
            value="98,185"
            labelColor="text-sun"
          />
          <Stat
            icon={<Send className="h-6 w-6" />}
            grad="linear-gradient(150deg,#5eb0ff,#0a66c2)"
            label="Reach generated"
            value="9.5M"
            labelColor="text-blue"
          />
        </div>

        <div className="mt-8 space-y-3">
          <a
            href="#start"
            className="block rounded-2xl bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] py-4 text-center text-base font-bold text-white shadow-[0_14px_30px_-10px_rgba(255,45,85,0.6)] transition-transform hover:-translate-y-0.5"
          >
            START FREE
          </a>
          <p className="text-center text-xs font-semibold tracking-wider text-muted">
            OR
          </p>
          <a
            href="/pricing"
            className="block rounded-2xl bg-[linear-gradient(95deg,#7c3aed,#a855f7)] py-4 text-center text-base font-bold text-white shadow-[0_14px_30px_-10px_rgba(124,58,237,0.6)] transition-transform hover:-translate-y-0.5"
          >
            VIEW PRICING
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  grad,
  label,
  value,
  labelColor,
}: {
  icon: React.ReactNode;
  grad: string;
  label: string;
  value: string;
  labelColor: string;
}) {
  return (
    <div className="text-center">
      <span
        className="glossy mx-auto grid h-14 w-14 place-items-center rounded-full text-white"
        style={{ ["--g" as string]: grad }}
      >
        {icon}
      </span>
      <div className={`mt-3 text-sm font-bold ${labelColor}`}>{label}</div>
      <div className="text-2xl font-extrabold text-ink-900">{value}</div>
    </div>
  );
}
