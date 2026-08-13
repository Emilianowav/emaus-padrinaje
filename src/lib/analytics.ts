import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

export type DayStats = {
  date: string;
  total: number;
  countries: Record<string, number>;
  cities: Record<string, number>;
};

export type AnalyticsSnapshot = {
  days: DayStats[];
  totalVisits: number;
  storage: "redis" | "file" | "none";
};

type VisitPayload = {
  country: string;
  city: string;
  region: string;
};

const FILE_PATH = path.join(process.cwd(), "data", "analytics.json");

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function locationLabel(city: string, region: string, country: string) {
  const parts = [city, region, country].filter(
    (part) => part && part !== "Desconocido",
  );
  return parts.length > 0 ? parts.join(", ") : "Desconocido";
}

async function readFileStore(): Promise<AnalyticsSnapshot> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(raw) as AnalyticsSnapshot;
  } catch {
    return { days: [], totalVisits: 0, storage: "file" };
  }
}

async function writeFileStore(data: AnalyticsSnapshot) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

function upsertDay(
  days: DayStats[],
  date: string,
  visit: VisitPayload,
): DayStats[] {
  const country = visit.country || "Desconocido";
  const city = locationLabel(visit.city, visit.region, visit.country);

  const existing = days.find((day) => day.date === date);
  if (existing) {
    existing.total += 1;
    existing.countries[country] = (existing.countries[country] ?? 0) + 1;
    existing.cities[city] = (existing.cities[city] ?? 0) + 1;
    return days;
  }

  return [
    {
      date,
      total: 1,
      countries: { [country]: 1 },
      cities: { [city]: 1 },
    },
    ...days,
  ].sort((a, b) => b.date.localeCompare(a.date));
}

export async function recordVisit(visit: VisitPayload) {
  const date = todayKey();
  const redis = getRedis();

  if (redis) {
    const dayKey = `stats:day:${date}`;
    await redis.incr(`${dayKey}:total`);
    await redis.sadd("stats:days", date);
    await redis.incr(`${dayKey}:country:${visit.country || "Desconocido"}`);
    await redis.incr(
      `${dayKey}:city:${locationLabel(visit.city, visit.region, visit.country)}`,
    );
    return;
  }

  const store = await readFileStore();
  store.days = upsertDay(store.days, date, visit);
  store.totalVisits += 1;
  store.storage = "file";
  await writeFileStore(store);
}

function sortRecord(record: Record<string, number>) {
  return Object.entries(record).sort((a, b) => b[1] - a[1]);
}

async function getStatsFromRedis(): Promise<AnalyticsSnapshot | null> {
  const redis = getRedis();
  if (!redis) return null;

  const dates = (await redis.smembers("stats:days")) as string[];
  if (!dates.length) {
    return { days: [], totalVisits: 0, storage: "redis" };
  }

  const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));
  let totalVisits = 0;
  const days: DayStats[] = [];

  for (const date of sortedDates) {
    const dayKey = `stats:day:${date}`;
    const total = Number((await redis.get(`${dayKey}:total`)) ?? 0);
    totalVisits += total;

    const countryKeys = await redis.keys(`${dayKey}:country:*`);
    const cityKeys = await redis.keys(`${dayKey}:city:*`);

    const countries: Record<string, number> = {};
    for (const key of countryKeys) {
      const name = key.replace(`${dayKey}:country:`, "");
      countries[name] = Number((await redis.get(key)) ?? 0);
    }

    const cities: Record<string, number> = {};
    for (const key of cityKeys) {
      const name = key.replace(`${dayKey}:city:`, "");
      cities[name] = Number((await redis.get(key)) ?? 0);
    }

    days.push({ date, total, countries, cities });
  }

  return { days, totalVisits, storage: "redis" };
}

export async function getStats(): Promise<AnalyticsSnapshot> {
  const fromRedis = await getStatsFromRedis();
  if (fromRedis) return fromRedis;

  const fromFile = await readFileStore();
  if (fromFile.days.length > 0) {
    fromFile.totalVisits = fromFile.days.reduce((sum, day) => sum + day.total, 0);
    return fromFile;
  }

  return { days: [], totalVisits: 0, storage: "none" };
}

export function getAnalyticsSecret() {
  return process.env.ANALYTICS_SECRET ?? "emaus-interno-2026";
}

export function isValidSecret(secret: string) {
  return secret === getAnalyticsSecret();
}

export { sortRecord };
