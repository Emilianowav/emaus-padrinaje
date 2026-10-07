/**
 * Datos de donación
 * ------------------------------------
 * Editá el WhatsApp y el mensaje predefinido acá.
 */

export const SITE = {
  brand: "Emaús",
  title: "Sé un padrino de Emaús",
  community: "\"Inmaculado Corazón de María\" (ICM) I",
  subtitle: "Tu aporte es muy importante.",
  quote: "Dios no se deja ganar en generosidad.",
  footerNote: "Consultas y donaciones por WhatsApp",
} as const;

export const CONTACT = {
  ctaLabel: "Si querés información para donar, hacé click acá",
  whatsapp: {
    phone: "+5493794243737",
    /** Número sin + ni espacios, para wa.me */
    phoneDigits: "5493794243737",
    message:
      "¡Hola! Quisiera recibir información para hacer una donación y ser padrino de Emaús (ICM).",
  },
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Escribinos por WhatsApp",
    text: "Tocá el botón de abajo y se abrirá un chat con un mensaje listo para enviar.",
  },
  {
    number: "02",
    title: "Recibí la información",
    text: "Te pasamos los datos para que puedas hacer tu aporte.",
  },
  {
    number: "03",
    title: "Enviá el comprobante",
    text: "Mandá el comprobante por el mismo chat para registrar tu padrinaje.",
  },
] as const;
