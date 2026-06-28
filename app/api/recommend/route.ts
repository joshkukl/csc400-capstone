import { NextResponse } from "next/server";
import type { FormData } from "@/types/questionnaire";
import { recommend } from "@/lib/recommend";

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

export async function POST(request: Request) {
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

    const recommendation = recommend(body as FormData);
    return NextResponse.json({ recommendation });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate recommendation." },
      { status: 500 },
    );
  }
}
