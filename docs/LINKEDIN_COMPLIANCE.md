# LinkedIn compliance: the de-risking decision

**Status: this is the single biggest product risk. Read before building auto-publish.**

## The problem

The marketing promise was "auto-publish to LinkedIn." LinkedIn's platform terms make
**unattended, third-party automated posting of organic personal content risky-to-disallowed**:

- LinkedIn's official APIs gate organic posting behind partner/Marketing-Developer-Program
  approval, and personal-profile posting via API is heavily restricted.
- Unofficial automation (headless browser, cookie reuse) violates the LinkedIn User
  Agreement and **can get end-user accounts restricted or banned**, an unacceptable risk
  for a tool whose users are founders/operators staking their reputation.

## The decision: approve-first, manual publish by default

We pivot the core flow from "auto-publish" to:

> **Draft → schedule → WhatsApp approval → 1-tap publish.**

- **`publish_mode = 'manual'` (default):** Postpilot prepares the post and notifies the user
  at the optimal time; the user taps **Publish** (deep-link into LinkedIn's composer with the
  text prefilled, or a one-tap publish via an *approved* API path). This is compliant and
  removes account-ban risk.
- **`publish_mode = 'auto'` (opt-in):** only enabled where we hold the proper LinkedIn API
  access for that account/use case. Never the default.

This is reflected in:
- `profiles.publish_mode` (see `supabase/schema.sql`)
- `src/server/scheduler.ts` (`PublishMode`)
- the product copy ("you approve … we publish") and the approval-centric dashboard.

## What to do next

1. Apply to the **LinkedIn Marketing Developer Program** and the "Share on LinkedIn"
   / "Sign In with LinkedIn using OpenID Connect" products; document exactly what organic
   posting scopes are granted.
2. If full auto-posting isn't granted, ship the **manual 1-tap** flow. It's the honest,
   compliant MVP and still delivers 90% of the value (the hard part is the *writing*, not
   the *clicking publish*).
3. Keep the WhatsApp approval step regardless. It's both a compliance asset (human in the
   loop) and the product's most differentiated feature.
