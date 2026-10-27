const COMPANIES = [
  "Northwind",
  "Acme Labs",
  "Hexa",
  "BrightPath",
  "Quanta",
  "Mediza",
  "Foundry",
  "Loopline",
];

export function TrustBar() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted">
          Trusted by operators, founders and creators at growing teams
        </p>
        <div className="marquee-paused mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...COMPANIES, ...COMPANIES].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-lg font-semibold text-ink-700/60"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
