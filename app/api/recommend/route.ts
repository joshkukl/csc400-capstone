import { type NextRequest, NextResponse } from "next/server";
import type { FormData } from "@/types/questionnaire";
import { recommend } from "@/lib/recommend";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

const REQUIRED_FIELDS: (keyof FormData)[] = [
  "projectType",
  "audience",
  "languagePreference",
  "userLoad",
  "realTime",
  "dataNeed",
  "timeline",
  "experience",
  "priority",
];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<FormData>;

    for (const key of REQUIRED_FIELDS) {
      if (!body[key]) {
        return NextResponse.json(
          { error: `Missing required field: ${key}` },
          { status: 400 },
        );
      }
    }

    const data = body as FormData;
    const recommendation = recommend(data);
    const session = await getSessionFromRequest(request);

    await prisma.recommendation.create({
      data: {
        userId: session?.userId ?? null,
        ...data,
        title: recommendation.title,
        summary: recommendation.summary,
        resultJson: JSON.stringify(recommendation.layers),
      },
    });

    return NextResponse.json({ recommendation });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate recommendation." },
      { status: 500 },
    );
  }
}
