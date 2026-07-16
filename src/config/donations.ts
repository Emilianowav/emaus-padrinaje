/**
 * Links de pago de Mercado Pago
 * --------------------------------
 * Por ahora hay un solo link (monto libre).
 * Para agregar montos fijos después, sumá más objetos al array.
 *
 * Ejemplo:
 *   { id: "5000", label: "$5.000", description: "Aporte mensual", url: "https://mpago.la/xxxxx" }
 */

export type DonationOption = {
  id: string;
  label: string;
  description: string;
  url: string;
};

export const SITE = {
  brand: "Emaús",
  title: "Sé un Padrino",
  subtitle:
    "Tu aporte acompaña a quienes más lo necesitan. Tres pasos, y listo.",
  footerNote: "Pago seguro a través de Mercado Pago",
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Hacé clic en donar",
    text: "Te redirigimos a Mercado Pago de forma segura.",
  },
  {
    number: "02",
    title: "Elegí el monto",
    text: "Indicá el aporte con el que querés acompañar.",
  },
  {
    number: "03",
    title: "Confirmá el pago",
    text: "Completá el pago y ya sos padrino de Emaús.",
  },
] as const;

export const DONATION_OPTIONS: DonationOption[] = [
  {
    id: "donacion-libre",
    label: "Donar",
    description: "Elegí el monto en Mercado Pago",
    url: "https://link.mercadopago.com.ar/emausctesdonacion",
  },
];
