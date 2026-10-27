# Postpilot

Postpilot drafts LinkedIn posts in your own voice, puts them on a schedule, and asks you to approve each one over WhatsApp before it goes out. Publishing is a one-tap hand-off to LinkedIn's composer rather than unattended auto-posting (see [docs/LINKEDIN_COMPLIANCE.md](docs/LINKEDIN_COMPLIANCE.md) for why).

The whole app runs locally with seeded data and a demo login. Each integration switches on when its environment variables are set.

## Features

- **Marketing site**: landing page, features, pricing, FAQ, about, contact and legal pages, with SEO metadata, `robots.txt` and a sitemap.
- **Sign-in**: LinkedIn via Supabase Auth (OIDC), or a signed demo session when Supabase is not configured.
- **Composer**: turn an idea and a tone into a draft through OpenAI or Anthropic, with a deterministic local fallback when no key is set. Save the draft or schedule it.
- **Posts**: filter by status, and approve posts that are waiting. Approving opens LinkedIn's share composer with the text prefilled.
- **Scheduler**: a Vercel Cron job finds posts that are due and sends a WhatsApp approval request through Twilio.
- **Billing**: Stripe Checkout, plus a signature-verified webhook that keeps a `subscriptions` table in sync.
- **Dashboard**: overview, calendar, voice samples, analytics, billing and settings screens, plus a Playful/Professional theme switch.

## Stack

Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, Supabase (Auth and Postgres with RLS), Vitest with Testing Library, and Vercel Cron.

## Architecture

```
src/
  app/(marketing)/   public pages (route group, shared header and footer)
  app/dashboard/     authenticated app; the layout redirects to /login when signed out
  app/api/           route handlers: posts, ai/generate, auth, billing, cron
  components/        marketing sections, dashboard UI kit, shared layout pieces
  lib/               env access, session cookie, auth, Supabase clients
  server/            data access, AI, scheduler, WhatsApp, billing (server-only)
  proxy.ts           Next 16 "proxy" (formerly middleware) that refreshes Supabase sessions
supabase/schema.sql  tables, RLS policies and the signup trigger
```

Every integration sits behind one module in `src/server/`. Each module checks whether it is configured (for example `aiConfigured()` or `adminConfigured()` in `src/lib/env.ts`) and otherwise falls back to local behaviour. Demo users read and write an in-memory store. Signed-in Supabase users read and write Postgres under row-level security. [docs/BACKEND.md](docs/BACKEND.md) has the full wiring table and the go-live checklist.

## Getting started

Requirements: Node 22 and npm.

```bash
npm install
cp .env.example .env.local   # all values are optional for local use
npm run dev
```

Open http://localhost:3000, go to **Log in**, accept the terms and continue. With no Supabase variables set, you are signed in as the demo user and the dashboard uses seeded posts.

### Environment variables

Names only. See `.env.example` for comments.

| Area | Variables |
|---|---|
| App | `APP_URL`, `SESSION_SECRET` |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| AI | `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` |
| WhatsApp (Twilio) | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` |
| Scheduler | `CRON_SECRET` |
| Billing (Stripe) | `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO`, `STRIPE_WEBHOOK_SECRET` |

To use a real database, run `supabase/schema.sql` in the Supabase SQL editor and enable the LinkedIn (OIDC) provider.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Make a production build and serve it |
| `npm run lint` | ESLint (Next.js core-web-vitals and TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run the Vitest suite once (`npm run test:watch` for watch mode) |

## Testing

Component tests run in jsdom with Testing Library and stub `fetch` at the network boundary. They cover:

- the posts page: loading, status filtering, the empty state, error and retry, and the approve flow that opens LinkedIn
- the composer: idea validation, the tone sent to the API, API error messages, and scheduling then navigating
- the theme toggle: persistence, restoring the saved theme, and ignoring unknown stored values

CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests and a production build on every push to `main` and on every pull request.

## Status and limitations

This is an MVP, not a production service.

- Server modules (data access, AI, scheduler, billing) have no unit tests yet. Tests cover only the dashboard UI.
- Auto-publishing to LinkedIn is not implemented, because it depends on LinkedIn partner API access. The supported flow is approve, then publish with one tap.
- The approval link in WhatsApp opens the posts page, but the page does not yet act on the `?approve=` parameter, and there is no handler for a "YES" reply.
- The contact form does not send anything yet. It only shows a confirmation.
- Billing has a checkout endpoint, but no dashboard button calls it yet.
- Several dashboard screens (calendar, analytics, voice, settings) show static demo content.
- The in-memory demo store is shared by everyone on the same server instance and resets when the server restarts.
