import { notFound } from "next/navigation";
import { VISITORS } from "@/config/visitors";
import { formatDate, getVisitorStats } from "@/lib/visitors";

type PageProps = {
  params: Promise<{ secret: string }>;
};

export const dynamic = "force-dynamic";

export default async function InternoPage({ params }: PageProps) {
  const { secret } = await params;
  if (secret !== VISITORS.secret) {
    notFound();
  }

  const stats = await getVisitorStats();

  return (
    <main className="min-h-screen bg-cream px-6 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-navy/10 pb-6">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-navy-muted">
            Acceso interno
          </p>
          <h1 className="mt-2 font-display text-4xl text-navy sm:text-5xl">
            Historial de visitantes
          </h1>
          <p className="mt-3 text-navy-soft">
            Visitas por día, país y localidad. Esta página no está enlazada en el
            sitio.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="Total visitas" value={stats.totalVisits} />
          <StatCard
            label="Hoy"
            value={stats.days[0]?.total ?? 0}
          />
          <StatCard
            label="Días con visitas"
            value={stats.days.filter((day) => day.total > 0).length}
          />
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-navy-muted">
            Por día
          </h2>
          <ul className="mt-4 divide-y divide-navy/10 border border-navy/15 bg-white/90">
            {stats.days.map((day) => (
              <li
                key={day.date}
                className="flex items-center justify-between px-5 py-3 text-sm"
              >
                <span className="text-navy">{formatDate(day.date)}</span>
                <span className="font-medium text-navy">{day.total}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <CountList title="Por país" items={stats.countries} />
          <CountList title="Por localidad" items={stats.cities} />
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-navy/15 bg-white/90 p-4">
      <p className="text-xs uppercase tracking-wider text-navy-muted">{label}</p>
      <p className="mt-2 font-display text-3xl text-navy">{value}</p>
    </div>
  );
}

function CountList({
  title,
  items,
}: {
  title: string;
  items: { label: string; total: number }[];
}) {
  return (
    <div className="border border-navy/15 bg-white/90 p-5">
      <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-navy-muted">
        {title}
      </h2>
      {items.length ? (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between text-sm text-navy-soft"
            >
              <span>{item.label}</span>
              <span className="font-medium text-navy">{item.total}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-navy-muted">Todavía no hay datos.</p>
      )}
    </div>
  );
}

export const metadata = {
  title: "Interno | Visitantes",
  robots: { index: false, follow: false },
};
