/**
 * Configuración de analytics (sin variables de entorno)
 * ------------------------------------------------------
 * 1. Cambiá `secret` si querés otra URL privada.
 * 2. Para guardar visitas en Vercel, pegá un token de GitHub en `github.token`.
 *    Creá uno en: GitHub → Settings → Developer settings → Fine-grained tokens
 *    Permiso: Contents (Read and write) en este repo.
 */

export const ANALYTICS_CONFIG = {
  /** URL privada: /interno/{secret} */
  secret: "emaus-interno-2026",
  trackToken: "emaus-track-2026",
  github: {
    owner: "Emilianowav",
    repo: "emaus-padrinaje",
    branch: "main",
    path: "data/analytics.json",
    /** Pegá acá el token de GitHub para persistir en producción */
    token: "",
  },
} as const;

export function getAnalyticsSecret() {
  return ANALYTICS_CONFIG.secret;
}

export function getTrackToken() {
  return ANALYTICS_CONFIG.trackToken;
}

export function isValidSecret(secret: string) {
  return secret === ANALYTICS_CONFIG.secret;
}
