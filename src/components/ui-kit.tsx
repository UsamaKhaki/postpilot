import Link from "next/link";

/* Soft pastel aurora washes bleeding from the edges of a section. */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-wash-mint/70 blur-[90px]" />
      <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-wash-lav/70 blur-[90px]" />
      <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-wash-peach/70 blur-[90px]" />
      <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-wash-pink/60 blur-[90px]" />
      <div className="absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-wash-sky/50 blur-[90px]" />
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "flame" | "grape" | "sky" | "ghost";
  className?: string;
};

const VARIANTS: Record<string, string> = {
  flame:
    "text-white bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] shadow-[0_14px_30px_-10px_rgba(255,45,85,0.6)]",
  grape:
    "text-white bg-[linear-gradient(95deg,#7c3aed,#a855f7)] shadow-[0_14px_30px_-10px_rgba(124,58,237,0.6)]",
  sky: "text-white bg-[linear-gradient(95deg,#2aabee,#5eb0ff)] shadow-[0_14px_30px_-10px_rgba(42,171,238,0.6)]",
  ghost: "text-ink-900 bg-white border border-ink-200 shadow-[var(--shadow-soft)]",
};

export function GradientButton({
  href,
  children,
  variant = "flame",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

const HEADING_COLOR: Record<string, string> = {
  magenta: "text-magenta",
  pink: "text-pink",
  grass: "text-grass",
  flame: "text-flame",
  grape: "text-grape",
  sky: "text-blue",
  sun: "text-sun",
};

export function SectionHeading({
  color = "magenta",
  title,
  subtitle,
  className = "",
}: {
  color?: keyof typeof HEADING_COLOR;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <h2
        className={`text-4xl font-extrabold tracking-tight sm:text-5xl ${HEADING_COLOR[color]}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-balance mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700/80">
          {subtitle}
        </p>
      )}
    </div>
  );
}
