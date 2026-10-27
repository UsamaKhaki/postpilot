import { Check, CreditCard } from "lucide-react";
import { PageHeader, Card } from "@/components/dashboard/ui";

const INCLUDED = [
  "Unlimited AI-written posts",
  "Optimal-time scheduling",
  "WhatsApp approvals",
  "Performance insights",
];

const INVOICES = [
  { id: "INV-2026-005", date: "May 1, 2026", amount: "$29.00" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$29.00" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$29.00" },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Billing" subtitle="Manage your plan and payment method." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current plan */}
        <Card className="lg:col-span-2">
          {/* This page does not call /api/billing/checkout yet, so it shows no plan controls. */}
          <div>
            <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
              Current plan
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-ink-900">Pro</h2>
            <p className="text-muted">$29 / month · renews Jun 1, 2026</p>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INCLUDED.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-ink-700">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-teal-500 text-white">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Card>

        {/* Usage + payment */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-ink-900">This month</h2>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-extrabold text-ink-900">42</span>
              <span className="text-sm text-muted">posts generated</span>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink-100">
              <div className="h-full w-[70%] rounded-full bg-[linear-gradient(95deg,#ff2d55,#ff8a00)]" />
            </div>
            <p className="mt-2 text-xs text-muted">Unlimited on Pro — plenty of room.</p>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-ink-900">Payment method</h2>
            <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-ink-100">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink-900 text-white">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-ink-900">Visa ···· 4242</div>
                <div className="text-xs text-muted">Expires 08/28</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-bold text-ink-900">Invoices</h2>
        <div className="mt-4 divide-y divide-ink-100">
          {INVOICES.map((inv) => (
            <div key={inv.id} className="flex items-center gap-4 py-3">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-ink-900">{inv.id}</div>
                <div className="text-xs text-muted">{inv.date}</div>
              </div>
              <div className="text-sm font-bold text-ink-900">{inv.amount}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
