# Backend & integrations

Postpilot runs **fully locally with no backend** (seeded data + a demo login), and upgrades
to real Supabase + integrations purely by setting env vars. Copy `.env.example` → `.env.local`.

## Layers

| Concern | File | Local fallback | Production |
|---|---|---|---|
| Auth | `src/lib/auth.ts`, `src/lib/supabase/*` | Signed demo cookie (`/api/auth/demo`) | Supabase Auth + LinkedIn OIDC |
| Data | `src/server/data.ts` | Seeded in-memory store | Supabase Postgres (`supabase/schema.sql`) |
| AI | `src/server/ai.ts` | Deterministic local draft | OpenAI / Anthropic |
| Scheduler | `src/server/scheduler.ts` | No-op + log | Durable job (Vercel Workflow / Supabase cron) |
| WhatsApp | `src/server/whatsapp.ts` | No-op + log | Twilio WhatsApp Business |
| Billing | `src/server/billing.ts` | Redirects to pricing | Stripe Checkout + webhook |

## Auth flow (Supabase)

1. Enable **LinkedIn (OIDC)** in Supabase → Authentication → Providers.
2. Add `http://localhost:6401/auth/callback` (and the prod URL) to the provider redirects.
3. Login page calls `supabase.auth.signInWithOAuth({ provider: 'linkedin_oidc' })`.
4. `/auth/callback` exchanges the code for a session.
5. `getCurrentUser()` guards `/dashboard/*` (redirect to `/login` when signed out).

> For production, add an `@supabase/ssr` proxy/middleware to refresh tokens (server
> components can't write cookies). The dashboard guard works without it for the MVP.

## Database

Run `supabase/schema.sql` in the SQL editor. It creates `profiles`, `voice_samples`,
`posts`, `notifications`, `subscriptions`, enables **RLS** (users see only their rows),
and auto-creates a profile on signup. Then replace the seed reads in `src/server/data.ts`
with Supabase queries (each function has a comment showing the shape).

## Wiring checklist for go-live

- [ ] Supabase project + `schema.sql` applied + LinkedIn provider enabled
- [x] Data reads/writes go to Supabase for real users (`src/server/data.ts`)
- [ ] `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` for real generation
- [ ] Resolve LinkedIn posting access (see `LINKEDIN_COMPLIANCE.md`)
- [ ] Twilio WhatsApp sender approved
- [x] Scheduler dispatcher wired (Vercel Cron `/api/cron/dispatch` → WhatsApp approval; set `CRON_SECRET` + `SUPABASE_SERVICE_ROLE_KEY`)
- [x] Stripe webhook → `subscriptions` (`/api/billing/webhook`; set `STRIPE_WEBHOOK_SECRET`). Still need a Stripe price + dashboard endpoint registered.
- [x] Supabase token refresh via `src/proxy.ts` (Next 16 proxy convention)
