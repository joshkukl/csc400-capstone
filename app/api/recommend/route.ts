import { type NextRequest, NextResponse } from "next/server";
import type { FormData } from "@/types/questionnaire";
import { recommend } from "@/lib/recommend";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";
import { validateQuestionnaire } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<FormData>;

    const validation = validateQuestionnaire(body);

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Invalid questionnaire data.",
          fields: validation.errors,
        },
        { status: 400 },
      );
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

    return NextResponse.json({
      recommendation,
    });
  } catch (error) {
    console.error("Recommendation API error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate recommendation.",
      },
      { status: 500 },
    );
  }
}