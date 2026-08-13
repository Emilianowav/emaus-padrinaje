import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getTrackToken } from "@/config/analytics";

export async function middleware(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  const trackUrl = new URL("/api/analytics/track", request.url);

  void fetch(trackUrl, {
    method: "POST",
    headers: {
      "x-analytics-token": getTrackToken(),
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
