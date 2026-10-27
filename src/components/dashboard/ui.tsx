import Link from "next/link";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] bg-white/80 p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

const GRADS: Record<string, string> = {
  flame: "linear-gradient(150deg,#ff7a8a,#ff2d55)",
  grape: "linear-gradient(150deg,#c79bff,#7c3aed)",
  blue: "linear-gradient(150deg,#5eb0ff,#0a66c2)",
  lime: "linear-gradient(150deg,#7ef0b6,#18c964)",
  sun: "linear-gradient(150deg,#ffc06a,#ff7a00)",
  pink: "linear-gradient(150deg,#ff8ec2,#ec0e7b)",
};

export function StatCard({
  icon,
  label,
  value,
  delta,
  color = "flame",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
  color?: keyof typeof GRADS;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span
          className="glossy grid h-12 w-12 place-items-center rounded-[28%] text-white"
          style={{ ["--g" as string]: GRADS[color] }}
        >
          {icon}
        </span>
        {delta && (
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-600">
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 text-3xl font-extrabold text-ink-900">{value}</div>
      <div className="mt-1 text-sm font-medium text-muted">{label}</div>
    </Card>
  );
}

const STATUS: Record<string, string> = {
  Published: "bg-emerald-100 text-emerald-700",
  Scheduled: "bg-sky-100 text-sky-700",
  "Awaiting approval": "bg-amber-100 text-amber-700",
  Draft: "bg-ink-100 text-ink-700",
  Failed: "bg-rose-100 text-rose-700",
};

export function StatusBadge({ status }: { status: keyof typeof STATUS }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
        STATUS[status] ?? "bg-ink-100 text-ink-700"
      }`}
    >
      {status}
    </span>
  );
}

export function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-5 py-2.5 text-sm font-semibold text-ink-700 shadow-[var(--shadow-soft)] backdrop-blur transition-transform hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({
  href,
  children,
  onClick,
  type = "button",
}: {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(95deg,#ff2d55,#ff8a00)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(255,45,85,0.6)] transition-transform hover:-translate-y-0.5";
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
