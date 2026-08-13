import { NextRequest, NextResponse } from "next/server";
import { getDayBreakdown, getMonthDayTotals } from "@/lib/visitors";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const year = request.nextUrl.searchParams.get("year");
  const month = request.nextUrl.searchParams.get("month");

  if (date) {
    const breakdown = await getDayBreakdown(date);
    return NextResponse.json(breakdown);
  }

  if (year && month) {
    const days = await getMonthDayTotals(Number(year), Number(month));
    return NextResponse.json({ days });
  }

  return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
}
