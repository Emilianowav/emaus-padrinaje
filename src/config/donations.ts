/**
 * Links de pago de Mercado Pago
 * --------------------------------
 * Reemplazá cada `url` con el link de pago correspondiente.
 * Podés agregar, quitar o renombrar montos sin tocar el resto de la página.
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
    "Tu aporte mensual acompaña a quienes más lo necesitan. Tres pasos, y listo.",
  footerNote: "Pago seguro a través de Mercado Pago",
} as const;

export const STEPS = [
  {
    number: "01",
    title: "Elegí un monto",
    text: "Seleccioná el aporte con el que querés acompañar.",
  },
  {
    number: "02",
    title: "Hacé clic en donar",
    text: "Te redirigimos a Mercado Pago de forma segura.",
  },
  {
    number: "03",
    title: "Confirmá el pago",
    text: "Completá el pago y ya sos padrino de Emaús.",
  },
] as const;

export const DONATION_OPTIONS: DonationOption[] = [
  {
    id: "monto-1",
    label: "$5.000",
    description: "Aporte solidario",
    // Pegá acá el link de Mercado Pago
    url: "",
  },
  {
    id: "monto-2",
    label: "$10.000",
    description: "Aporte padrino",
    url: "",
  },
  {
    id: "monto-3",
    label: "$20.000",
    description: "Aporte especial",
    url: "",
  },
];
