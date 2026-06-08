import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import {
  createAuthenticatedResponse,
  hashPassword,
  setSessionCookie,
  validateCredentials,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: unknown;
      password?: unknown;
    };

    const validation = validateCredentials(body.username, body.password);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { username, password } = validation;
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { username, passwordHash },
    });

    const { token, publicUser } = await createAuthenticatedResponse(user);
    const response = NextResponse.json({ user: publicUser }, { status: 201 });
    setSessionCookie(response, token);

    return response;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Username is already taken." },
        { status: 409 },
      );
    }

    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Unable to create account. Please try again." },
      { status: 500 },
    );
  }
}
