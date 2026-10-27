import {
  ThumbsUp,
  Heart,
  MessageCircle,
  Star,
  Send,
  Laugh,
  X,
  Play,
} from "lucide-react";

type FloatyKind =
  | "thumb"
  | "heart"
  | "chat"
  | "star"
  | "send"
  | "laugh"
  | "x"
  | "play"
  | "ball"
  | "pill"
  | "squiggle";

const GRADIENTS: Record<string, string> = {
  blue: "linear-gradient(150deg, #5eb0ff, #0a66c2)",
  red: "linear-gradient(150deg, #ff7a8a, #ff2d55)",
  pink: "linear-gradient(150deg, #ff8ec2, #ec0e7b)",
  sky: "linear-gradient(150deg, #bfe6ff, #6fc4f5)",
  butter: "linear-gradient(150deg, #ffe27a, #ffb01f)",
  grape: "linear-gradient(150deg, #c79bff, #7c3aed)",
  lime: "linear-gradient(150deg, #7ef0b6, #18c964)",
  sun: "linear-gradient(150deg, #ffc06a, #ff7a00)",
  cyan: "linear-gradient(150deg, #7ce7ff, #18b6e6)",
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  thumb: ThumbsUp,
  heart: Heart,
  chat: MessageCircle,
  star: Star,
  send: Send,
  laugh: Laugh,
  x: X,
  play: Play,
};

export type FloatyProps = {
  kind: FloatyKind;
  color: keyof typeof GRADIENTS;
  className?: string; // positioning
  size?: number;
  dur?: string;
  delay?: string;
  tilt?: string;
  /** "drift" = wander, "bob" = up/down (default) */
  motion?: "bob" | "drift";
  /** Inline position offsets (e.g. "4%", "20px") — reliable across viewports. */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

export function Floaty({
  kind,
  color,
  className = "",
  size = 56,
  dur = "7s",
  delay = "0s",
  tilt = "0deg",
  motion = "bob",
  top,
  left,
  right,
  bottom,
}: FloatyProps) {
  const anim = motion === "drift" ? "animate-drift" : "animate-float-bob";
  const style = {
    "--dur": dur,
    "--delay": delay,
    "--tilt": tilt,
    width: size,
    height: size,
    ...(top !== undefined ? { top } : {}),
    ...(left !== undefined ? { left } : {}),
    ...(right !== undefined ? { right } : {}),
    ...(bottom !== undefined ? { bottom } : {}),
  } as React.CSSProperties;

  // Small glossy sphere
  if (kind === "ball") {
    return (
      <span
        aria-hidden
        className={`glossy ${anim} absolute rounded-full ${className}`}
        style={{ ...style, ["--g" as string]: GRADIENTS[color] }}
      />
    );
  }

  // Glossy capsule / pill
  if (kind === "pill") {
    return (
      <span
        aria-hidden
        className={`glossy ${anim} absolute rounded-full ${className}`}
        style={{
          ...style,
          width: Math.round(size * 0.42),
          height: size,
          ["--g" as string]: GRADIENTS[color],
        }}
      />
    );
  }

  // Squiggle (zig-zag accent)
  if (kind === "squiggle") {
    return (
      <span
        aria-hidden
        className={`${anim} absolute ${className}`}
        style={style}
      >
        <svg viewBox="0 0 48 24" fill="none" className="h-full w-full">
          <path
            d="M2 16c4-10 8 8 12-2s8 8 12-2 8 8 12-2"
            stroke="url(#sq)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="sq" x1="0" y1="0" x2="48" y2="0">
              <stop stopColor="#6fc4f5" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </span>
    );
  }

  const Icon = ICONS[kind];
  const rounded = kind === "chat" ? "rounded-[30%_30%_30%_8%]" : "rounded-[28%]";

  return (
    <span
      aria-hidden
      className={`glossy ${anim} absolute grid place-items-center text-white ${rounded} ${className}`}
      style={{ ...style, ["--g" as string]: GRADIENTS[color] }}
    >
      <Icon className="h-1/2 w-1/2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
    </span>
  );
}
