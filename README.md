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
3. Conectá **Upstash Redis** desde el marketplace de Vercel.
4. Agregá las variables de `.env.example`.
5. Deploy.

## Historial de visitantes (URL privada)

Página oculta, no enlazada desde el sitio:

```
/interno/TU_ANALYTICS_SECRET
```

Registra visitas por día, país y localidad. Ver `.env.example` para configuración.
