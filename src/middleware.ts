import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (pathname !== "/") {
    return NextResponse.next();
  }

  const trackToken =
    process.env.ANALYTICS_TRACK_TOKEN ??
    process.env.ANALYTICS_SECRET ??
    "emaus-track-2026";
  if (!trackToken) {
    return NextResponse.next();
  }

  const trackUrl = new URL("/api/analytics/track", request.url);

  void fetch(trackUrl, {
    method: "POST",
    headers: {
      "x-analytics-token": trackToken,
      "x-vercel-ip-country": request.headers.get("x-vercel-ip-country") ?? "",
      "x-vercel-ip-city": request.headers.get("x-vercel-ip-city") ?? "",
      "x-vercel-ip-country-region":
        request.headers.get("x-vercel-ip-country-region") ?? "",
      "cf-ipcountry": request.headers.get("cf-ipcountry") ?? "",
      "cf-ipcity": request.headers.get("cf-ipcity") ?? "",
      "cf-ipregion": request.headers.get("cf-ipregion") ?? "",
    },
  }).catch(() => {});

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
