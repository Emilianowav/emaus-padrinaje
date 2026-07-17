import { DONATION_OPTIONS } from "@/config/donations";

export function DonationButtons() {
  const hasAnyLink = DONATION_OPTIONS.some((option) => option.url.trim());

  return (
    <div className="space-y-3">
      {DONATION_OPTIONS.map((option) => {
        const ready = Boolean(option.url.trim());

        if (!ready) {
          return (
            <div
              key={option.id}
              className="flex w-full items-center justify-between border border-dashed border-navy/20 bg-white/50 px-5 py-4 text-left"
            >
              <div>
                <p className="font-display text-2xl text-navy/40">{option.label}</p>
                {option.description ? (
                  <p className="mt-0.5 text-sm text-navy-muted">{option.description}</p>
                ) : null}
              </div>
              <span className="text-xs uppercase tracking-wider text-navy-muted">
                Link pendiente
              </span>
            </div>
          );
        }

        return (
          <a
            key={option.id}
            href={option.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between border border-navy/15 bg-white/80 px-5 py-4 text-left shadow-[0_0_0_1px_transparent] transition duration-300 hover:border-gold hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <div>
              <p className="font-display text-2xl text-navy transition-colors group-hover:text-cream">
                {option.label}
              </p>
              {option.description ? (
                <p className="mt-0.5 text-sm text-navy-soft transition-colors group-hover:text-gold-soft">
                  {option.description}
                </p>
              ) : null}
            </div>
            <span className="text-sm font-medium text-gold transition-colors group-hover:text-gold-soft">
              Donar →
            </span>
          </a>
        );
      })}

      {!hasAnyLink && (
        <p className="pt-2 text-sm text-navy-muted">
          Los botones se activan cuando agregues los links de Mercado Pago en{" "}
          <code className="rounded bg-navy/5 px-1.5 py-0.5 text-xs text-navy-soft">
            src/config/donations.ts
          </code>
          .
        </p>
      )}
    </div>
  );
}
