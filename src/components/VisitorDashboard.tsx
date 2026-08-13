"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  countryFlagUrl,
  formatDate,
  formatMonthLabel,
  todayInArgentina,
  type CountryCount,
  type DayBreakdown,
  type DayCount,
} from "@/lib/visitors";

type Props = {
  totalVisits: number;
  initialYear: number;
  initialMonth: number;
  initialDays: DayCount[];
};

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

function buildGrid(year: number, month: number) {
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month, 0).getDate();
  const cells: Array<{ date: string | null; day: number | null }> = [];

  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push({ date: null, day: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const monthStr = String(month).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    cells.push({ date: `${year}-${monthStr}-${dayStr}`, day });
  }

  return cells;
}

export function VisitorDashboard({
  totalVisits,
  initialYear,
  initialMonth,
  initialDays,
}: Props) {
  const today = todayInArgentina();
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [monthDays, setMonthDays] = useState<DayCount[]>(initialDays);
  const [selectedDate, setSelectedDate] = useState(today);
  const [breakdown, setBreakdown] = useState<DayBreakdown | null>(null);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingDay, setLoadingDay] = useState(false);

  const dayMap = useMemo(
    () => new Map(monthDays.map((item) => [item.date, item.total])),
    [monthDays],
  );

  const grid = useMemo(() => buildGrid(year, month), [year, month]);

  const loadDay = useCallback(async (date: string) => {
    setLoadingDay(true);
    try {
      const res = await fetch(`/api/visitors/stats?date=${date}`);
      const data = (await res.json()) as DayBreakdown;
      setBreakdown(data);
    } finally {
      setLoadingDay(false);
    }
  }, []);

  const loadMonth = useCallback(async (y: number, m: number) => {
    setLoadingMonth(true);
    try {
      const res = await fetch(`/api/visitors/stats?year=${y}&month=${m}`);
      const data = (await res.json()) as { days: DayCount[] };
      setMonthDays(data.days);
    } finally {
      setLoadingMonth(false);
    }
  }, []);

  useEffect(() => {
    void loadDay(selectedDate);
  }, [selectedDate, loadDay]);

  function changeMonth(delta: number) {
    let nextMonth = month + delta;
    let nextYear = year;
    if (nextMonth < 1) {
      nextMonth = 12;
      nextYear -= 1;
    } else if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    setYear(nextYear);
    setMonth(nextMonth);
    void loadMonth(nextYear, nextMonth);
  }

  const selectedTotal = breakdown?.total ?? 0;

  return (
    <div className="space-y-8">
      <section className="border border-navy/15 bg-white/90 p-5">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 text-sm text-navy transition hover:text-gold"
            aria-label="Mes anterior"
          >
            ←
          </button>
          <h2 className="font-display text-xl capitalize text-navy">
            {formatMonthLabel(year, month)}
          </h2>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="px-3 py-1 text-sm text-navy transition hover:text-gold"
            aria-label="Mes siguiente"
          >
            →
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium uppercase tracking-wider text-navy-muted">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div
          className={`mt-1 grid grid-cols-7 gap-1 ${loadingMonth ? "opacity-50" : ""}`}
        >
          {grid.map((cell, index) => {
            if (!cell.date || !cell.day) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const visits = dayMap.get(cell.date) ?? 0;
            const isSelected = cell.date === selectedDate;
            const isToday = cell.date === today;

            return (
              <button
                key={cell.date}
                type="button"
                onClick={() => setSelectedDate(cell.date!)}
                className={`aspect-square rounded-sm border p-1 text-left transition ${
                  isSelected
                    ? "border-navy bg-navy text-cream"
                    : visits > 0
                      ? "border-gold/50 bg-gold-mist/60 text-navy hover:border-gold"
                      : "border-navy/10 bg-white text-navy-soft hover:border-navy/30"
                } ${isToday && !isSelected ? "ring-1 ring-gold" : ""}`}
              >
                <span className="block text-sm font-medium">{cell.day}</span>
                {visits > 0 && (
                  <span
                    className={`mt-0.5 block text-[10px] ${isSelected ? "text-gold-soft" : "text-navy-muted"}`}
                  >
                    {visits}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="border border-navy/15 bg-white/90 p-5">
        <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-navy-muted">
          Desglose del día
        </h2>
        <p className="mt-2 font-display text-2xl text-navy">
          {formatDate(selectedDate)}
        </p>

        {loadingDay ? (
          <p className="mt-4 text-sm text-navy-muted">Cargando...</p>
        ) : breakdown && breakdown.total > 0 ? (
          <ul className="mt-6 space-y-3">
            {breakdown.countries.map((item) => (
              <CountryRow key={item.code} item={item} />
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-navy-muted">
            No hubo visitas este día.
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4 text-sm">
          <span className="text-navy-soft">Total del día</span>
          <span className="font-display text-2xl text-navy">{selectedTotal}</span>
        </div>
      </section>

      <section className="border border-navy/15 bg-navy px-5 py-6 text-cream">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-soft">
              Totalizador
            </p>
            <p className="mt-1 text-sm text-cream/80">
              Visitas acumuladas desde el inicio
            </p>
          </div>
          <p className="font-display text-4xl text-cream">{totalVisits}</p>
        </div>
      </section>
    </div>
  );
}

function CountryRow({ item }: { item: CountryCount }) {
  const flag = countryFlagUrl(item.code);

  return (
    <li className="flex items-center justify-between gap-3 text-sm">
      <span className="flex items-center gap-3 text-navy-soft">
        {flag ? (
          <img
            src={flag}
            alt=""
            width={28}
            height={20}
            className="h-5 w-7 rounded-[2px] object-cover shadow-sm"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-5 w-7 items-center justify-center rounded-[2px] bg-navy/10 text-xs"
          >
            ?
          </span>
        )}
        {item.label}
      </span>
      <span className="font-medium text-navy">{item.total}</span>
    </li>
  );
}
