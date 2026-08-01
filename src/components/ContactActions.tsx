"use client";

import { useState } from "react";
import { CONTACT } from "@/config/donations";

function buildWhatsAppUrl() {
  return `https://wa.me/${CONTACT.whatsapp.phoneDigits}`;
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const input = document.createElement("input");
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    return true;
  }
}

export function ContactActions() {
  const [copiedKey, setCopiedKey] = useState<"alias" | "cbu" | null>(null);

  async function handleCopy(key: "alias" | "cbu", value: string) {
    await copyText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  }

  const { account } = CONTACT;

  return (
    <div className="space-y-3">
      <div
        role="status"
        className="border border-gold/40 bg-gold-mist/70 px-5 py-4 text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-navy">
          Importante
        </p>
        <p className="mt-2 text-sm leading-relaxed text-navy-soft sm:text-base">
          {CONTACT.comprobanteNotice}
        </p>
      </div>

      <button
        type="button"
        onClick={() => handleCopy("alias", CONTACT.alias)}
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
          {copiedKey === "alias" ? "¡Copiado!" : "Copiar"}
        </span>
      </button>

      <div className="border border-navy/15 bg-white/80 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
          Datos para verificar
        </p>
        <dl className="mt-4 space-y-3 text-left">
          <div>
            <dt className="text-xs uppercase tracking-wider text-navy-muted">
              Titular
            </dt>
            <dd className="mt-0.5 text-base font-medium text-navy">
              {account.titular}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-navy-muted">
              CUIL
            </dt>
            <dd className="mt-0.5 text-base font-medium text-navy">
              {account.cuil}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-navy-muted">
              Tipo
            </dt>
            <dd className="mt-0.5 text-base font-medium text-navy">
              {account.tipo}
            </dd>
          </div>
          <div className="flex items-end justify-between gap-3 border-t border-navy/10 pt-3">
            <div className="min-w-0">
              <dt className="text-xs uppercase tracking-wider text-navy-muted">
                CBU
              </dt>
              <dd className="mt-0.5 break-all font-display text-lg text-navy">
                {account.cbu}
              </dd>
            </div>
            <button
              type="button"
              onClick={() => handleCopy("cbu", account.cbu)}
              className="shrink-0 text-sm font-medium text-gold transition hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label="Copiar CBU"
            >
              {copiedKey === "cbu" ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
        </dl>
      </div>

      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center justify-between border border-navy/15 bg-white/80 px-5 py-4 text-left transition duration-300 hover:border-gold hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted transition-colors group-hover:text-gold-soft">
            WhatsApp · Enviar comprobante
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
