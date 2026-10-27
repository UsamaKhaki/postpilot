import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env, supabaseConfigured } from "@/lib/env";

/**
 * Refreshes the Supabase auth session on every request so Server Components —
 * which can't write cookies — always see a valid token. Without this, expired
 * access tokens would silently sign users out of `/dashboard`.
 *
 * Next.js 16 renamed the `middleware` convention to `proxy`. Runs on the
 * Node.js runtime by default, which `@supabase/ssr` needs.
 *
 * When Supabase isn't configured (local/demo via the signed cookie) this is a
 * pass-through, so the app still works with no backend.
 */
export async function proxy(request: NextRequest) {
  if (!supabaseConfigured()) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Mirror refreshed cookies onto both the request (for downstream
        // handlers in this pass) and the outgoing response (for the browser).
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Touch the session — this triggers a token refresh and the setAll above.
  // Do not run code between createServerClient and getUser (Supabase guidance).
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on all paths except static assets and metadata files so auth cookies
     * stay fresh across pages and API routes:
     * - _next/static, _next/image (build/image assets)
     * - favicon.ico, sitemap.xml, robots.txt (metadata)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
