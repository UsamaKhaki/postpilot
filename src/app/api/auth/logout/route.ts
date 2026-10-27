import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/env";
import { SESSION_COOKIE } from "@/lib/session";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  if (supabaseConfigured()) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  const res = NextResponse.redirect(`${origin}/login`);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
