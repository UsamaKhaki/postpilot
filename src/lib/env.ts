/** Centralized, server-only environment access with sane local defaults. */
export const env = {
  APP_URL: process.env.APP_URL ?? "http://localhost:3000",
  SESSION_SECRET: process.env.SESSION_SECRET ?? "dev-insecure-secret-change-me",

  // Supabase (LinkedIn OIDC is configured as an auth provider in the Supabase dashboard)
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM: process.env.TWILIO_WHATSAPP_FROM,

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  // Shared secret the Vercel Cron dispatcher must present (set as a Vercel env var).
  CRON_SECRET: process.env.CRON_SECRET,
} as const;

export const supabaseConfigured = () =>
  Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
// Service-role access for trusted server jobs (the cron dispatcher) — bypasses RLS.
export const adminConfigured = () =>
  Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
export const aiConfigured = () =>
  Boolean(env.OPENAI_API_KEY || env.ANTHROPIC_API_KEY);
export const billingConfigured = () => Boolean(env.STRIPE_SECRET_KEY);
export const whatsappConfigured = () =>
  Boolean(env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN);
