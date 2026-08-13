import { NextRequest, NextResponse } from "next/server";
import { recordVisit } from "@/lib/visitors";

export async function POST(request: NextRequest) {
  let bodyCountry = "";
  try {
    const body = (await request.json()) as { country?: string };
    bodyCountry = body.country ?? "";
  } catch {
    bodyCountry = "";
  }

  const country =
    bodyCountry ||
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "XX";

  await recordVisit({ country });
  return NextResponse.json({ ok: true });
}
