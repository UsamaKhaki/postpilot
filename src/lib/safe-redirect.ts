/**
 * Returns `next` only when it is a same-origin path. Anything else (absolute
 * URLs, protocol-relative `//host`, `\` tricks, or `@host` which would turn
 * `${origin}${next}` into userinfo) falls back, so the OAuth callback can't be
 * used as an open redirect.
 */
export function safeRedirectPath(next: string | null, fallback = "/dashboard"): string {
  if (!next || !next.startsWith("/")) return fallback;
  if (next.startsWith("//") || next.includes("\\")) return fallback;
  return next;
}
