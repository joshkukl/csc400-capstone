import { NextResponse, type NextRequest } from "next/server";
import {
  getSessionFromRequest,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const body = (await request.json()) as {
      currentPassword?: unknown;
      newPassword?: unknown;
      confirmPassword?: unknown;
    };

    if (typeof body.currentPassword !== "string" || !body.currentPassword) {
      return NextResponse.json(
        { error: "Current password is required." },
        { status: 400 },
      );
    }

    if (typeof body.newPassword !== "string" || !body.newPassword) {
      return NextResponse.json(
        { error: "New password is required." },
        { status: 400 },
      );
    }

    if (body.newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters." },
        { status: 400 },
      );
    }

    if (
      typeof body.confirmPassword !== "string" ||
      body.confirmPassword !== body.newPassword
    ) {
      return NextResponse.json(
        { error: "New password and confirmation do not match." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const currentMatches = await verifyPassword(
      body.currentPassword,
      user.passwordHash,
    );

    if (!currentMatches) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 401 },
      );
    }

    const passwordHash = await hashPassword(body.newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Unable to update password. Please try again." },
      { status: 500 },
    );
  }
}
