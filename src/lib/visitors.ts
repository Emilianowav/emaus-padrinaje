import { VISITORS } from "@/config/visitors";

export type DayCount = { date: string; total: number };

export type CountryCount = {
  code: string;
  label: string;
  total: number;
};

export type DayBreakdown = {
  date: string;
  total: number;
  countries: CountryCount[];
};

const BASE = "https://abacus.jasoncameron.dev";
const NS = VISITORS.namespace;
const TZ = "America/Argentina/Buenos_Aires";

function dateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date);
}

function compactDate(date: string) {
  return date.replace(/-/g, "");
}

export function countryCode(raw: string) {
  const code = decodeURIComponent(raw || "")
    .trim()
    .toUpperCase();
  if (!code || code === "UNKNOWN" || code === "XX" || code === "T1") return "XX";
  return /^[A-Z]{2}$/.test(code) ? code : "XX";
}

async function abacus(path: string) {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) return 0;
  const data = (await res.json()) as { value?: number };
  return Number(data.value ?? 0);
}

function dayPrefix(date: string) {
  return `d${compactDate(date)}`;
}

export async function recordVisit(input: { country: string }) {
  const date = dateKey();
  const country = countryCode(input.country);
  const prefix = dayPrefix(date);

  await Promise.all([
    abacus(`/hit/${NS}/total`),
    abacus(`/hit/${NS}/${prefix}`),
    abacus(`/hit/${NS}/${prefix}c${country}`),
    abacus(`/hit/${NS}/c${country}`),
  ]);
}

export async function getTotalVisits() {
  return abacus(`/get/${NS}/total`);
}

export async function getDayBreakdown(date: string): Promise<DayBreakdown> {
  const prefix = dayPrefix(date);

  const [total, countryValues] = await Promise.all([
    abacus(`/get/${NS}/${prefix}`),
    Promise.all(
      VISITORS.countries.map((country) =>
        abacus(`/get/${NS}/${prefix}c${country.code}`),
      ),
    ),
  ]);

  const countries = VISITORS.countries
    .map((country, index) => ({
      code: country.code,
      label: country.label,
      total: countryValues[index] ?? 0,
    }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);

  if (total > 0 && countries.length === 0) {
    countries.push({
      code: "XX",
      label: "Desconocido",
      total,
    });
  }

  return { date, total, countries };
}

export async function getMonthDayTotals(
  year: number,
  month: number,
): Promise<DayCount[]> {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, index) => {
    const day = String(index + 1).padStart(2, "0");
    const monthStr = String(month).padStart(2, "0");
    return `${year}-${monthStr}-${day}`;
  });

  const totals = await Promise.all(
    dates.map((date) => abacus(`/get/${NS}/${dayPrefix(date)}`)),
  );

  return dates.map((date, index) => ({
    date,
    total: totals[index] ?? 0,
  }));
}

export function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function formatMonthLabel(year: number, month: number) {
  const d = new Date(year, month - 1, 1);
  return new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
    timeZone: TZ,
  }).format(d);
}

export function todayInArgentina() {
  return dateKey();
}

export function countryFlagUrl(code: string) {
  if (!code || code === "XX") return null;
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}
