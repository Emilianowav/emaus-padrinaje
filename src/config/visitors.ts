export const VISITORS = {
  secret: "emaus-interno-2026",
  namespace: "emauspadrinaje",
  countries: [
    { code: "AR", label: "Argentina" },
    { code: "UY", label: "Uruguay" },
    { code: "PY", label: "Paraguay" },
    { code: "BR", label: "Brasil" },
    { code: "CL", label: "Chile" },
    { code: "ES", label: "España" },
    { code: "US", label: "Estados Unidos" },
    { code: "XX", label: "Desconocido" },
  ],
  cities: [
    { key: "corrientes", label: "Corrientes" },
    { key: "resistencia", label: "Resistencia" },
    { key: "buenosaires", label: "Buenos Aires" },
    { key: "rosario", label: "Rosario" },
    { key: "cordoba", label: "Córdoba" },
    { key: "otros", label: "Otras / desconocida" },
  ],
} as const;
