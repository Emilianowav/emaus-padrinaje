# Emaús — Sé un Padrino

Landing de una página para donaciones con Mercado Pago. Hecha con Next.js y lista para publicar en Vercel.

## Cómo agregar los links de pago

Abrí el archivo `src/config/donations.ts` y pegá cada link de Mercado Pago en el campo `url`:

```ts
export const DONATION_OPTIONS = [
  {
    id: "monto-1",
    label: "$5.000",
    description: "Aporte solidario",
    url: "https://mpago.la/tu-link-aqui",
  },
  // ...
];
```

Podés cambiar montos, textos o agregar más opciones sin tocar el resto de la página.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Publicar en Vercel

1. Subí el proyecto a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importá el repo.
3. Dejá los valores por defecto (Next.js se detecta solo).
4. Deploy.

O desde la terminal:

```bash
npx vercel
```

## Personalizar textos

En el mismo archivo `src/config/donations.ts` podés editar:

- `SITE.brand`, `SITE.title`, `SITE.subtitle`
- Los pasos en `STEPS`
- Las opciones de donación en `DONATION_OPTIONS`
