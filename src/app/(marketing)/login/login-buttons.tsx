"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { createClient, supabaseConfiguredClient } from "@/lib/supabase/client";

function LinkedInGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function LoginButtons() {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signInWithLinkedIn() {
    if (!agreed) {
      setError("Please accept the terms to continue.");
      return;
    }
    setError("");

    // No Supabase configured locally → use the demo session so the app is testable.
    if (!supabaseConfiguredClient()) {
      window.location.href = "/api/auth/demo";
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) throw error;
    } catch {
      setError("Couldn't start sign-in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-7">
      <button
        type="button"
        onClick={signInWithLinkedIn}
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#0a66c2] px-6 py-4 text-base font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LinkedInGlyph className="h-5 w-5" />}
        Sign in with LinkedIn
      </button>

      <label className="mt-5 flex items-start gap-2.5 text-left text-xs text-muted">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-ink-200 text-brand-600 focus:ring-brand-200"
        />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="font-semibold text-brand-600 hover:underline">Terms &amp; Conditions</Link>,{" "}
          <Link href="/privacy" className="font-semibold text-brand-600 hover:underline">Privacy Policy</Link>{" "}
          and{" "}
          <Link href="/refund-policy" className="font-semibold text-brand-600 hover:underline">Refund Policy</Link>.
        </span>
      </label>

      {error && <p className="mt-3 text-sm font-medium text-rose-600">{error}</p>}

      <a
        href="/api/auth/demo"
        className="mt-4 block text-center text-xs font-semibold text-muted underline-offset-4 hover:text-brand-600 hover:underline"
      >
        Or continue with a demo account
      </a>
    </div>
  );
}
