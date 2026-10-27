import { Info } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} color="flame" title={title} subtitle={intro} />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-sm text-muted">Last updated: {updated}</p>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              This is placeholder template copy. Replace it with your own
              legal text reviewed by counsel before going live.
            </span>
          </div>

          <div className="mt-10 space-y-8">
            {sections.map((s, i) => (
              <div key={s.heading}>
                <h2 className="text-lg font-semibold text-ink-900">
                  {i + 1}. {s.heading}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-2 text-sm leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
