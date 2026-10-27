"use client";

import { useState } from "react";
import { Info } from "lucide-react";

const SUBJECTS = [
  "General inquiry",
  "Account issue",
  "Subscription question",
  "Technical support",
  "Feedback",
  "Other",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // There is no contact backend in this project, so the form validates input
  // but says plainly that nothing was sent instead of faking a success state.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-card)] border border-ink-200 bg-white p-10 text-center"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <Info className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-ink-900">
          Message not sent
        </h3>
        <p className="mt-2 text-sm text-muted">
          This demo is not connected to an inbox, so your message was not
          delivered anywhere.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-brand-600 hover:underline"
        >
          Back to the form
        </button>
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
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
      >
        Submit message
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Demo only: messages are not delivered.
      </p>
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
