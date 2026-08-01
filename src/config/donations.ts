/**
 * Datos de donación por transferencia
 * ------------------------------------
 * Editá alias, cuenta y WhatsApp acá.
 */

export const SITE = {
  brand: "Emaús",
  title: "Sé un padrino de Emaús",
  community: "\"Inmaculado Corazón de María\" (ICM) I",
  subtitle: "Tu aporte es muy importante.",
  quote: "Dios no se deja ganar en generosidad.",
  footerNote: "Transferencia bancaria · Enviá tu comprobante por WhatsApp",
} as const;

export const CONTACT = {
  alias: "icm.parroquia",
  aliasLabel: "Alias",
  account: {
    banco: "BANCO DE CORRIENTES",
    titular: "PARROQUIA INMACULADO CORAZON D",
    cuil: "30714998923",
    tipo: "Cuenta corriente en pesos",
    cbu: "0940099330011118160013",
  },
  whatsapp: {
    phone: "+5493794243737",
    /** Número sin + ni espacios, para wa.me */
    phoneDigits: "5493794243737",
  },
  comprobanteNotice:
    "Importante: después de transferir, enviá el comprobante al WhatsApp para registrar tu aporte.",
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Transferí tu aporte",
    text: "Usá el alias o el CBU de la cuenta parroquial.",
  },
  {
    number: "02",
    title: "Verificá los datos",
    text: "Confirmá banco, titular, CUIL y tipo de cuenta antes de enviar.",
  },
  {
    number: "03",
    title: "Enviá el comprobante",
    text: "Mandá el comprobante por WhatsApp para registrar tu padrinaje.",
  },
] as const;
