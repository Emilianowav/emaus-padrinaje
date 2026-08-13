import { VISITORS } from "@/config/visitors";

export type DayCount = { date: string; total: number };
export type NamedCount = { label: string; total: number };

export type DayBreakdown = {
  date: string;
  total: number;
  countries: NamedCount[];
  cities: NamedCount[];
};

export type VisitorStats = {
  totalVisits: number;
  days: DayCount[];
  countries: NamedCount[];
  cities: NamedCount[];
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

function slug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
}

function countryCode(raw: string) {
  const code = raw.trim().toUpperCase();
  if (!code || code === "UNKNOWN" || code === "XX") return "XX";
  return /^[A-Z]{2}$/.test(code) ? code : "XX";
}

function cityKey(raw: string) {
  const normalized = slug(decodeURIComponent(raw || ""));
  if (!normalized) return "otros";
  const known = VISITORS.cities.find((city) => city.key === normalized);
  if (known) return known.key;
  if (normalized.includes("corrientes")) return "corrientes";
  if (normalized.includes("buenosaires") || normalized === "caba") {
    return "buenosaires";
  }
  return "otros";
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

export async function recordVisit(input: {
  country: string;
  city: string;
}) {
  const date = dateKey();
  const country = countryCode(input.country);
  const city = cityKey(input.city);
  const prefix = dayPrefix(date);

  await Promise.all([
    abacus(`/hit/${NS}/total`),
    abacus(`/hit/${NS}/${prefix}`),
    abacus(`/hit/${NS}/${prefix}c${country}`),
    abacus(`/hit/${NS}/${prefix}v${city}`),
    abacus(`/hit/${NS}/c${country}`),
    abacus(`/hit/${NS}/v${city}`),
  ]);
}

export async function getTotalVisits() {
  return abacus(`/get/${NS}/total`);
}

export async function getDayBreakdown(date: string): Promise<DayBreakdown> {
  const prefix = dayPrefix(date);

  const [total, countryValues, cityValues] = await Promise.all([
    abacus(`/get/${NS}/${prefix}`),
    Promise.all(
      VISITORS.countries.map((country) =>
        abacus(`/get/${NS}/${prefix}c${country.code}`),
      ),
    ),
    Promise.all(
      VISITORS.cities.map((city) =>
        abacus(`/get/${NS}/${prefix}v${city.key}`),
      ),
    ),
  ]);

  return {
    date,
    total,
    countries: VISITORS.countries
      .map((country, index) => ({
        label: country.label,
        total: countryValues[index] ?? 0,
      }))
      .filter((item) => item.total > 0)
      .sort((a, b) => b.total - a.total),
    cities: VISITORS.cities
      .map((city, index) => ({
        label: city.label,
        total: cityValues[index] ?? 0,
      }))
      .filter((item) => item.total > 0)
      .sort((a, b) => b.total - a.total),
  };
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

export async function getVisitorStats(): Promise<VisitorStats> {
  const now = new Date();
  const year = Number(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric" }).format(
      now,
    ),
  );
  const month = Number(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, month: "2-digit" }).format(
      now,
    ),
  );

  const [totalVisits, days, countryValues, cityValues] = await Promise.all([
    getTotalVisits(),
    getMonthDayTotals(year, month),
    Promise.all(
      VISITORS.countries.map((country) => abacus(`/get/${NS}/c${country.code}`)),
    ),
    Promise.all(VISITORS.cities.map((city) => abacus(`/get/${NS}/v${city.key}`))),
  ]);

  return {
    totalVisits,
    days,
    countries: VISITORS.countries
      .map((country, index) => ({
        label: country.label,
        total: countryValues[index] ?? 0,
      }))
      .filter((item) => item.total > 0)
      .sort((a, b) => b.total - a.total),
    cities: VISITORS.cities
      .map((city, index) => ({
        label: city.label,
        total: cityValues[index] ?? 0,
      }))
      .filter((item) => item.total > 0)
      .sort((a, b) => b.total - a.total),
  };
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
