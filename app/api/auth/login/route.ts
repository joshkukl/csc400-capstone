import { NextResponse } from "next/server";
import {
  createAuthenticatedResponse,
  setSessionCookie,
  validateCredentials,
  verifyPassword,
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

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const { token, publicUser } = await createAuthenticatedResponse(user);
    const response = NextResponse.json({ user: publicUser });
    setSessionCookie(response, token);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Unable to log in. Please try again." },
      { status: 500 },
    );
  }
}
