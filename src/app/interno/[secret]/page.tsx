import { notFound } from "next/navigation";

/** Solo quien tenga el link entra. Cambiá esta clave si querés. */
const SECRET = "emaus-interno-2026";

type PageProps = {
  params: Promise<{ secret: string }>;
};

export default async function InternoPage({ params }: PageProps) {
  const { secret } = await params;

  if (secret !== SECRET) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
          Acceso interno
        </p>
        <h1 className="mt-2 font-display text-4xl text-navy sm:text-5xl">
          Visitantes
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-navy-soft">
          Las visitas se registran solas. Sin tokens, sin configuración extra.
        </p>

        <div className="mt-10 border border-navy/15 bg-white/90 px-6 py-8 text-left">
          <h2 className="font-display text-xl text-navy">Cómo ver el historial</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-navy-soft">
            <li>Entrá a tu panel de Vercel</li>
            <li>Abrí el proyecto <strong className="text-navy">emaus-padrinaje</strong></li>
            <li>Andá a la pestaña <strong className="text-navy">Analytics</strong></li>
          </ol>
          <p className="mt-5 text-sm text-navy-muted">
            Ahí ves visitas por día, país, ciudad, páginas y más.
          </p>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block border border-navy/15 bg-navy px-5 py-3 text-sm font-medium text-cream transition hover:bg-navy-deep"
          >
            Abrir panel de Vercel →
          </a>
        </div>

        <p className="mt-8 text-xs text-navy-muted">
          Si Analytics no aparece, activalo una vez en Vercel → Project → Analytics → Enable.
        </p>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Interno | Visitantes",
  robots: { index: false, follow: false },
};
