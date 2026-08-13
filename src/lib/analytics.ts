import { promises as fs } from "fs";
import path from "path";
import { ANALYTICS_CONFIG } from "@/config/analytics";

export type DayStats = {
  date: string;
  total: number;
  countries: Record<string, number>;
  cities: Record<string, number>;
};

export type AnalyticsSnapshot = {
  days: DayStats[];
  totalVisits: number;
};

type VisitPayload = {
  country: string;
  city: string;
  region: string;
};

type StoreMeta = {
  storage: "file" | "github" | "none";
  canWrite: boolean;
};

const FILE_PATH = path.join(process.cwd(), "data", "analytics.json");
const { github } = ANALYTICS_CONFIG;

function emptySnapshot(): AnalyticsSnapshot {
  return { days: [], totalVisits: 0 };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function locationLabel(city: string, region: string, country: string) {
  const parts = [city, region, country].filter(
    (part) => part && part !== "Desconocido",
  );
  return parts.length > 0 ? parts.join(", ") : "Desconocido";
}

function withTotals(data: AnalyticsSnapshot): AnalyticsSnapshot {
  return {
    days: data.days,
    totalVisits: data.days.reduce((sum, day) => sum + day.total, 0),
  };
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

async function readLocalStore(): Promise<AnalyticsSnapshot> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    return withTotals(JSON.parse(raw) as AnalyticsSnapshot);
  } catch {
    return emptySnapshot();
  }
}

async function writeLocalStore(data: AnalyticsSnapshot) {
  await fs.mkdir(path.dirname(FILE_PATH), { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(withTotals(data), null, 2), "utf-8");
}

function githubHeaders(withAuth: boolean) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (withAuth && github.token) {
    headers.Authorization = `Bearer ${github.token}`;
  }
  return headers;
}

async function readGithubStore(): Promise<{
  data: AnalyticsSnapshot;
  sha: string | null;
}> {
  if (github.token) {
    const res = await fetch(
      `https://api.github.com/repos/${github.owner}/${github.repo}/contents/${github.path}?ref=${github.branch}`,
      { headers: githubHeaders(true), cache: "no-store" },
    );

    if (res.status === 404) {
      return { data: emptySnapshot(), sha: null };
    }

    if (!res.ok) {
      return { data: emptySnapshot(), sha: null };
    }

    const payload = (await res.json()) as { content: string; sha: string };
    const decoded = Buffer.from(payload.content, "base64").toString("utf-8");
    return { data: withTotals(JSON.parse(decoded) as AnalyticsSnapshot), sha: payload.sha };
  }

  const res = await fetch(
    `https://raw.githubusercontent.com/${github.owner}/${github.repo}/${github.branch}/${github.path}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    return { data: emptySnapshot(), sha: null };
  }

  return {
    data: withTotals((await res.json()) as AnalyticsSnapshot),
    sha: null,
  };
}

async function writeGithubStore(data: AnalyticsSnapshot, sha: string | null) {
  if (!github.token) return false;

  const body = {
    message: "chore: update visitor analytics",
    content: Buffer.from(JSON.stringify(withTotals(data), null, 2)).toString(
      "base64",
    ),
    branch: github.branch,
    ...(sha ? { sha } : {}),
  };

  const res = await fetch(
    `https://api.github.com/repos/${github.owner}/${github.repo}/contents/${github.path}`,
    {
      method: "PUT",
      headers: {
        ...githubHeaders(true),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  return res.ok;
}

function isVercel() {
  return Boolean(process.env.VERCEL);
}

async function readStore(): Promise<{
  data: AnalyticsSnapshot;
  sha: string | null;
}> {
  if (isVercel() || github.token) {
    return readGithubStore();
  }
  return { data: await readLocalStore(), sha: null };
}

async function writeStore(data: AnalyticsSnapshot, sha: string | null) {
  if (isVercel() || github.token) {
    return writeGithubStore(data, sha);
  }
  await writeLocalStore(data);
  return true;
}

export function getStoreMeta(): StoreMeta {
  if (isVercel()) {
    return {
      storage: github.token ? "github" : "none",
      canWrite: Boolean(github.token),
    };
  }

  if (github.token) {
    return { storage: "github", canWrite: true };
  }

  return { storage: "file", canWrite: true };
}

export async function recordVisit(visit: VisitPayload) {
  const meta = getStoreMeta();
  if (!meta.canWrite) return;

  const date = todayKey();
  const { data, sha } = await readStore();
  data.days = upsertDay(data.days, date, visit);
  await writeStore(withTotals(data), sha);
}

export async function getStats(): Promise<AnalyticsSnapshot & StoreMeta> {
  const meta = getStoreMeta();
  const { data } = await readStore();
  return { ...data, ...meta };
}

export function sortRecord(record: Record<string, number>) {
  return Object.entries(record).sort((a, b) => b[1] - a[1]);
}
