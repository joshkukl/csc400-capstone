import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const aId = searchParams.get("a");
  const bId = searchParams.get("b");

  if (!aId || !bId) {
    return NextResponse.json(
      { error: "Two recommendation IDs are required." },
      { status: 400 },
    );
  }

  const [a, b] = await Promise.all([
    prisma.recommendation.findFirst({ where: { id: aId, userId: session.userId } }),
    prisma.recommendation.findFirst({ where: { id: bId, userId: session.userId } }),
  ]);

  if (!a || !b) {
    return NextResponse.json(
      { error: "One or both recommendations not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({ a, b });
}
