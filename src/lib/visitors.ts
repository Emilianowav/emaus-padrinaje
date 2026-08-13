import { VISITORS } from "@/config/visitors";

export type DayCount = { date: string; total: number };
export type NamedCount = { label: string; total: number };

export type VisitorStats = {
  totalVisits: number;
  days: DayCount[];
  countries: NamedCount[];
  cities: NamedCount[];
};

const BASE = "https://abacus.jasoncameron.dev";
const NS = VISITORS.namespace;

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function dayKeys(count: number) {
  const keys: string[] = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    keys.push(todayKey(d));
  }
  return keys;
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

export async function recordVisit(input: {
  country: string;
  city: string;
}) {
  const date = todayKey();
  const country = countryCode(input.country);
  const city = cityKey(input.city);

  await Promise.all([
    abacus(`/hit/${NS}/total`),
    abacus(`/hit/${NS}/d${date.replace(/-/g, "")}`),
    abacus(`/hit/${NS}/c${country}`),
    abacus(`/hit/${NS}/v${city}`),
  ]);
}

export async function getVisitorStats(): Promise<VisitorStats> {
  const dates = dayKeys(VISITORS.daysToShow);

  const [totalVisits, dayValues, countryValues, cityValues] = await Promise.all([
    abacus(`/get/${NS}/total`),
    Promise.all(
      dates.map((date) => abacus(`/get/${NS}/d${date.replace(/-/g, "")}`)),
    ),
    Promise.all(
      VISITORS.countries.map((country) => abacus(`/get/${NS}/c${country.code}`)),
    ),
    Promise.all(VISITORS.cities.map((city) => abacus(`/get/${NS}/v${city.key}`))),
  ]);

  return {
    totalVisits,
    days: dates.map((date, index) => ({ date, total: dayValues[index] ?? 0 })),
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
