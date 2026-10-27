import Link from "next/link";
import { Aurora } from "@/components/ui-kit";
import { Floaty } from "@/components/floaty";

const TITLE_COLOR: Record<string, string> = {
  flame: "text-flame",
  magenta: "text-magenta",
  pink: "text-pink",
  grass: "text-grass",
  grape: "text-grape",
  sky: "text-blue",
  sun: "text-sun",
};

type Cta = { label: string; href: string };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  color = "flame",
  link,
  primary,
  secondary,
  betweenLabel,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  color?: keyof typeof TITLE_COLOR;
  /** small underlined link under the title */
  link?: Cta;
  /** big stacked gradient buttons at the bottom */
  primary?: Cta;
  secondary?: Cta;
  betweenLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <Aurora />

      {/* Side floating icons */}
      <Floaty kind="squiggle" color="sky" size={64} left="8%" top="14%" dur="7s" tilt="-12deg" />
      <Floaty kind="ball" color="grape" size={42} left="10%" top="46%" dur="9s" delay="0.4s" motion="drift" />
      <Floaty kind="squiggle" color="sun" size={70} left="6%" bottom="10%" dur="8s" delay="0.6s" tilt="20deg" />
      <Floaty kind="pill" color="grape" size={70} right="9%" top="16%" dur="8.5s" tilt="28deg" />
      <Floaty kind="squiggle" color="cyan" size={66} right="7%" bottom="12%" dur="7.5s" delay="0.5s" tilt="-14deg" />
      <Floaty kind="ball" color="pink" size={20} right="22%" top="40%" dur="10s" delay="0.3s" motion="drift" />

      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-24">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            {eyebrow}
          </span>
        )}
        <h1
          className={`text-balance mt-2 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl ${TITLE_COLOR[color]}`}
        >
          {title}
        </h1>

        {link && (
          <Link
            href={link.href}
            className="mt-5 inline-block text-base font-semibold text-ink-900 underline decoration-2 underline-offset-4 transition-colors hover:text-flame"
          >
            {link.label}
          </Link>
        )}

        {subtitle && (
          <p className="text-balance mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-700/80">
            {subtitle}
          </p>
        )}

        {(primary || secondary) && (
          <div className="mx-auto mt-12 max-w-lg space-y-3">
            {primary && (
              <Link
                href={primary.href}
                className="block rounded-2xl bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_18px_36px_-14px_rgba(255,45,85,0.65)] transition-transform hover:-translate-y-0.5"
              >
                {primary.label}
              </Link>
            )}
            {betweenLabel && (
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted">
                {betweenLabel}
              </p>
            )}
            {secondary && (
              <Link
                href={secondary.href}
                className="block rounded-2xl bg-[linear-gradient(95deg,#7c3aed,#a855f7)] py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-[0_18px_36px_-14px_rgba(124,58,237,0.65)] transition-transform hover:-translate-y-0.5"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
