"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

const SUBJECTS = [
  "General inquiry",
  "Account issue",
  "Subscription question",
  "Technical support",
  "Feedback",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Placeholder: wire this to your API / email provider.
    setTimeout(() => setStatus("sent"), 900);
  }

  if (status === "sent") {
    return (
      <div className="rounded-[var(--radius-card)] border border-brand-200 bg-brand-50 p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-ink-900">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out. We&rsquo;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required>
          <input type="text" required className={inputClass} placeholder="Jane Doe" />
        </Field>
        <Field label="Work email" required>
          <input
            type="email"
            required
            className={inputClass}
            placeholder="jane@company.com"
          />
        </Field>
        <Field label="Phone">
          <input type="tel" className={inputClass} placeholder="+1 555 000 0000" />
        </Field>
        <Field label="Subject" required>
          <select required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Choose a topic
            </option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Description" required>
          <textarea
            required
            rows={5}
            className={`${inputClass} resize-y`}
            placeholder="Tell us a little about what you need…"
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sending" ? "Sending…" : "Submit message"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors placeholder:text-muted/70 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </span>
      {children}
    </label>
  );
}
