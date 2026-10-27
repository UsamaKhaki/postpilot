import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Service-role Supabase client for trusted server jobs (e.g. the cron
 * dispatcher) that must read/write across users. It BYPASSES Row Level
 * Security — never import this into client code or expose it to the browser.
 */
export function createAdminClient() {
  return createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
