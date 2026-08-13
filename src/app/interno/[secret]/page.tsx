import { notFound } from "next/navigation";
import { VisitorDashboard } from "@/components/VisitorDashboard";
import { VISITORS } from "@/config/visitors";
import {
  getMonthDayTotals,
  getTotalVisits,
  todayInArgentina,
} from "@/lib/visitors";

type PageProps = {
  params: Promise<{ secret: string }>;
};

export const dynamic = "force-dynamic";

export default async function InternoPage({ params }: PageProps) {
  const { secret } = await params;
  if (secret !== VISITORS.secret) {
    notFound();
  }

  const today = todayInArgentina();
  const [year, month] = today.split("-").map(Number);
  const [totalVisits, initialDays] = await Promise.all([
    getTotalVisits(),
    getMonthDayTotals(year, month),
  ]);

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
            Elegí un día en el calendario para ver el desglose.
          </p>
        </header>

        <div className="mt-8">
          <VisitorDashboard
            totalVisits={totalVisits}
            initialYear={year}
            initialMonth={month}
            initialDays={initialDays}
          />
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: "Interno | Visitantes",
  robots: { index: false, follow: false },
};
