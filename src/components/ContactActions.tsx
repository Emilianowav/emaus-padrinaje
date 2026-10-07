import { CONTACT } from "@/config/donations";

function buildWhatsAppUrl() {
  const text = encodeURIComponent(CONTACT.whatsapp.message);
  return `https://wa.me/${CONTACT.whatsapp.phoneDigits}?text=${text}`;
}

export function ContactActions() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-between gap-4 border border-navy/15 bg-white/80 px-5 py-5 text-left transition duration-300 hover:border-gold hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:scale-[0.99]"
    >
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted transition-colors group-hover:text-gold-soft">
          WhatsApp
        </p>
        <p className="mt-1 font-display text-xl text-navy transition-colors group-hover:text-cream sm:text-2xl">
          {CONTACT.ctaLabel}
        </p>
      </div>
      <span className="shrink-0 text-sm font-medium text-gold transition-colors group-hover:text-gold-soft">
        Escribir →
      </span>
    </a>
  );
}
