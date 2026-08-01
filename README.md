# Emaús — Sé un Padrino

Landing de una página para donaciones por transferencia bancaria. Hecha con Next.js y lista para publicar en Vercel.

## Datos de transferencia

Todo se edita en `src/config/donations.ts`:

- Alias, titular, CUIL, tipo de cuenta y CBU
- Número de WhatsApp para enviar el comprobante
- Textos del sitio y pasos

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
