import { NextRequest, NextResponse } from "next/server";
import { getStats, isValidSecret } from "@/lib/analytics";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ secret: string }> },
) {
  const { secret } = await params;
  if (!isValidSecret(secret)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 404 });
  }

  const stats = await getStats();
  return NextResponse.json(stats);
}
