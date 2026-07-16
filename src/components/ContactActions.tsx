"use client";

import { useState } from "react";
import { CONTACT } from "@/config/donations";

function buildWhatsAppUrl() {
  return `https://wa.me/${CONTACT.whatsapp.phoneDigits}`;
}

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  async function copyAlias() {
    try {
      await navigator.clipboard.writeText(CONTACT.alias);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / insecure contexts
      const input = document.createElement("input");
      input.value = CONTACT.alias;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={copyAlias}
        className="group flex w-full items-center justify-between border border-navy/15 bg-white/80 px-5 py-4 text-left transition duration-300 hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold active:scale-[0.99]"
        aria-label={`Copiar alias ${CONTACT.alias}`}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
            {CONTACT.aliasLabel}
          </p>
          <p className="mt-1 font-display text-2xl text-navy">{CONTACT.alias}</p>
        </div>
        <span className="text-sm font-medium text-gold">
          {copied ? "¡Copiado!" : "Copiar"}
        </span>
      </button>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center justify-between border border-navy/15 bg-white/80 px-5 py-4 text-left transition duration-300 hover:border-gold hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted transition-colors group-hover:text-gold-soft">
            WhatsApp
          </p>
          <p className="mt-1 font-display text-xl text-navy transition-colors group-hover:text-cream sm:text-2xl">
            {CONTACT.whatsapp.phone}
          </p>
        </div>
        <span className="text-sm font-medium text-gold transition-colors group-hover:text-gold-soft">
          Escribir →
        </span>
      </a>
    </div>
  );
}
