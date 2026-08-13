import { NextRequest, NextResponse } from "next/server";
import { recordVisit } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  const expected =
    process.env.ANALYTICS_TRACK_TOKEN ??
    process.env.ANALYTICS_SECRET ??
    "emaus-track-2026";
  const auth = request.headers.get("x-analytics-token");
  if (auth !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "Desconocido";
  const city =
    request.headers.get("x-vercel-ip-city") ??
    request.headers.get("cf-ipcity") ??
    "Desconocido";
  const region =
    request.headers.get("x-vercel-ip-country-region") ??
    request.headers.get("cf-ipregion") ??
    "";

  await recordVisit({ country, city, region });

  return NextResponse.json({ ok: true });
}
