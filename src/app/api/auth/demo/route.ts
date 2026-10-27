import { NextResponse } from "next/server";
import { encodeSession, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

// Local demo login — used only when Supabase is not configured, so the
// dashboard is fully clickable without setting up a backend.
export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const token = encodeSession({
    sub: "demo-user",
    name: "Jane Doe",
    email: "jane@company.com",
    provider: "demo",
  });
  const res = NextResponse.redirect(`${origin}/dashboard`);
  res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return res;
}
