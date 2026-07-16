/**
 * Links de pago de Mercado Pago
 * --------------------------------
 * Para agregar o cambiar montos, editá este array.
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
    id: "10000",
    label: "$10.000",
    description: "Aporte solidario",
    url: "https://mpago.la/1MKzW8q",
  },
  {
    id: "20000",
    label: "$20.000",
    description: "Aporte padrino",
    url: "https://mpago.la/28vdSXT",
  },
  {
    id: "50000",
    label: "$50.000",
    description: "Aporte especial",
    url: "https://mpago.la/1S3WZj5",
  },
];
