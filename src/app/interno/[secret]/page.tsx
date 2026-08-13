import { notFound } from "next/navigation";
import { getAnalyticsSecret, isValidSecret } from "@/config/analytics";
import {
  getStats,
  sortRecord,
  type DayStats,
} from "@/lib/analytics";

type PageProps = {
  params: Promise<{ secret: string }>;
};

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function DayCard({ day }: { day: DayStats }) {
  const countries = sortRecord(day.countries);
  const cities = sortRecord(day.cities);

  return (
    <article className="border border-navy/15 bg-white/90 p-5">
      <div className="flex items-baseline justify-between gap-4 border-b border-navy/10 pb-4">
        <h2 className="font-display text-2xl text-navy">{formatDate(day.date)}</h2>
        <p className="text-sm text-navy-muted">
          <span className="font-medium text-navy">{day.total}</span> visitas
        </p>
      </div>

      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
            Por país
          </h3>
          {countries.length ? (
            <ul className="mt-3 space-y-2">
              {countries.map(([name, count]) => (
                <li
                  key={name}
                  className="flex items-center justify-between text-sm text-navy-soft"
                >
                  <span>{name}</span>
                  <span className="font-medium text-navy">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-navy-muted">Sin datos</p>
          )}
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
            Por localidad
          </h3>
          {cities.length ? (
            <ul className="mt-3 space-y-2">
              {cities.map(([name, count]) => (
                <li
                  key={name}
                  className="flex items-center justify-between gap-3 text-sm text-navy-soft"
                >
                  <span className="min-w-0 break-words">{name}</span>
                  <span className="shrink-0 font-medium text-navy">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-navy-muted">Sin datos</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function AnalyticsPage({ params }: PageProps) {
  const { secret } = await params;

  if (!isValidSecret(secret)) {
    notFound();
  }

  const stats = await getStats();

  return (
    <main className="min-h-screen bg-cream px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <header className="border-b border-navy/10 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
            Acceso interno
          </p>
          <h1 className="mt-2 font-display text-4xl text-navy sm:text-5xl">
            Historial de visitantes
          </h1>
          <p className="mt-3 text-navy-soft">
            Visitas registradas por día, país y localidad.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-navy/15 bg-white/90 p-4">
            <p className="text-xs uppercase tracking-wider text-navy-muted">
              Total visitas
            </p>
            <p className="mt-2 font-display text-3xl text-navy">{stats.totalVisits}</p>
          </div>
          <div className="border border-navy/15 bg-white/90 p-4">
            <p className="text-xs uppercase tracking-wider text-navy-muted">
              Días registrados
            </p>
            <p className="mt-2 font-display text-3xl text-navy">{stats.days.length}</p>
          </div>
          <div className="border border-navy/15 bg-white/90 p-4">
            <p className="text-xs uppercase tracking-wider text-navy-muted">
              Almacenamiento
            </p>
            <p className="mt-2 font-display text-3xl text-navy">{stats.storage}</p>
          </div>
        </section>

        {stats.storage === "none" && (
          <div className="mt-6 border border-heart/40 bg-heart-soft/80 px-5 py-4 text-sm text-heart">
            Para guardar visitas en Vercel, pegá un token de GitHub en{" "}
            <code className="rounded bg-white/60 px-1.5 py-0.5 text-xs">
              src/config/analytics.ts
            </code>
            . Sin variables de entorno.
          </div>
        )}

        <section className="mt-8 space-y-4">
          {stats.days.length ? (
            stats.days.map((day) => <DayCard key={day.date} day={day} />)
          ) : (
            <div className="border border-dashed border-navy/20 bg-white/50 px-5 py-8 text-center text-navy-muted">
              Todavía no hay visitas registradas.
            </div>
          )}
        </section>

        <footer className="mt-10 text-center text-xs text-navy-muted">
          URL privada · /interno/{getAnalyticsSecret()}
        </footer>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Interno | Visitantes",
  robots: {
    index: false,
    follow: false,
  },
};
