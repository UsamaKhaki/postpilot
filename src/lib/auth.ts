import { supabaseConfigured } from "@/lib/env";
import { getSession, initials } from "@/lib/session";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  initials: string;
  provider: "linkedin" | "demo";
};

/**
 * Returns the current user, or null if signed out.
 * Uses Supabase auth when configured; otherwise falls back to the local
 * demo-login cookie so the app is fully clickable without a backend.
 */
export async function getCurrentUser(): Promise<AppUser | null> {
  if (supabaseConfigured()) {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const meta = user.user_metadata ?? {};
      const name = meta.full_name ?? meta.name ?? user.email ?? "Member";
      return {
        id: user.id,
        name,
        email: user.email ?? "",
        avatar: meta.avatar_url ?? meta.picture,
        initials: initials(name),
        provider: "linkedin",
      };
    }
    // fall through to demo cookie so previewing works before the
    // LinkedIn provider is enabled in the Supabase dashboard.
  }

  const session = await getSession();
  if (!session) return null;
  return {
    id: session.sub,
    name: session.name,
    email: session.email,
    avatar: session.avatar,
    initials: initials(session.name),
    provider: session.provider,
  };
}
