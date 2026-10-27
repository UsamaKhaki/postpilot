import { Check, CheckCheck } from "lucide-react";

export function WhatsappFlow() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Daily AI partner
          </span>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            Approve tomorrow&rsquo;s post in ten seconds
          </h2>
          <p className="mt-4 text-muted">
            Every morning Postpilot sends your next draft to WhatsApp. Read it on
            the go, reply to approve, ask for a different angle, or push it to
            another day. No dashboards to log into.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Preview the full post before it ever goes live",
              "Reply YES to publish or NO to regenerate",
              "Edit a line and we rewrite around it",
              "Reschedule with a single message",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-700">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ChatMockup />
      </div>
    </section>
  );
}

function ChatMockup() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="rounded-[2rem] border border-ink-200 bg-white p-3 shadow-[var(--shadow-soft)]">
        <div className="rounded-[1.5rem] bg-[#e7f3ee] p-4">
          <div className="flex items-center gap-3 border-b border-black/5 pb-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-sm font-semibold text-white">
              P
            </div>
            <div>
              <div className="text-sm font-semibold text-ink-900">Postpilot</div>
              <div className="text-xs text-emerald-700">online</div>
            </div>
          </div>

          <div className="space-y-3 py-4">
            <Bubble side="in">
              <p className="text-sm leading-relaxed">
                Morning! Here&rsquo;s your post for 9:10 AM tomorrow 👇
              </p>
            </Bubble>
            <Bubble side="in">
              <p className="text-sm leading-relaxed">
                &ldquo;We deleted 40% of our onboarding docs and activation went
                up…&rdquo;
              </p>
              <p className="mt-2 text-xs text-emerald-700">#engineering #saas</p>
            </Bubble>
            <Bubble side="out">
              <p className="text-sm leading-relaxed">YES 🚀</p>
              <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-700">
                9:02 AM <CheckCheck className="h-3.5 w-3.5" />
              </span>
            </Bubble>
            <Bubble side="in">
              <p className="text-sm leading-relaxed">
                Scheduled for 9:10 AM. I&rsquo;ll let you know when it&rsquo;s live ✅
              </p>
            </Bubble>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "in" | "out";
  children: React.ReactNode;
}) {
  const isOut = side === "out";
  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-sm ${
          isOut
            ? "rounded-br-sm bg-[#d4f7c5] text-ink-900"
            : "rounded-bl-sm bg-white text-ink-900"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
