import { Send } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-tight ${className}`}
    >
      <span
        className="glossy grid h-9 w-9 place-items-center rounded-[28%] text-white"
        style={{ ["--g" as string]: "linear-gradient(150deg,#ff7a8a,#ff2d55)" }}
      >
        <Send className="h-4 w-4 -translate-x-px translate-y-px" />
      </span>
      <span className="text-ink-900">
        POST<span className="text-flame">PILOT</span>
      </span>
    </span>
  );
}
