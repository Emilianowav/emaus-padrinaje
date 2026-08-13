import { NextRequest, NextResponse } from "next/server";
import { recordVisit } from "@/lib/visitors";

export async function POST(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    "XX";
  const city =
    request.headers.get("x-vercel-ip-city") ??
    request.headers.get("cf-ipcity") ??
    "";

  await recordVisit({ country, city });
  return NextResponse.json({ ok: true });
}
