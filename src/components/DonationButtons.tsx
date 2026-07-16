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
              className="flex w-full items-center justify-between border border-dashed border-ink/20 bg-white/40 px-5 py-4 text-left"
            >
              <div>
                <p className="font-display text-2xl text-ink/40">{option.label}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{option.description}</p>
              </div>
              <span className="text-xs uppercase tracking-wider text-ink-muted">
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
            className="group flex w-full items-center justify-between border border-pine/20 bg-white/70 px-5 py-4 text-left transition duration-300 hover:border-pine hover:bg-pine hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine"
          >
            <div>
              <p className="font-display text-2xl text-ink transition-colors group-hover:text-white">
                {option.label}
              </p>
              <p className="mt-0.5 text-sm text-ink-soft transition-colors group-hover:text-white/80">
                {option.description}
              </p>
            </div>
            <span className="text-sm font-medium text-pine transition-colors group-hover:text-white">
              Donar →
            </span>
          </a>
        );
      })}

      {!hasAnyLink && (
        <p className="pt-2 text-sm text-ink-muted">
          Los botones se activan cuando agregues los links de Mercado Pago en{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 text-xs text-ink-soft">
            src/config/donations.ts
          </code>
          .
        </p>
      )}
    </div>
  );
}
