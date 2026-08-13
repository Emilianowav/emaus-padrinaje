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
3. Deploy.

## Historial de visitantes (URL privada)

Página oculta, no enlazada desde el sitio:

```
/interno/emaus-interno-2026
```

El historial se guarda en `data/analytics.json` del repo.

- **Local:** se escribe directo en el archivo.
- **Vercel:** se actualiza vía GitHub API.

Para que funcione en producción **sin variables de entorno**, pegá un token de GitHub en `src/config/analytics.ts` (campo `github.token`). Necesita permiso **Contents: Read and write** en este repo.

También podés cambiar la clave privada en el mismo archivo (`secret`).
