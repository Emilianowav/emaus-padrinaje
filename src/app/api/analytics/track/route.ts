import { NextRequest, NextResponse } from "next/server";
import { getTrackToken } from "@/config/analytics";
import { recordVisit } from "@/lib/analytics";

export async function POST(request: NextRequest) {
  const auth = request.headers.get("x-analytics-token");
  if (auth !== getTrackToken()) {
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
