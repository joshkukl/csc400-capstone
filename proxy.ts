import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isProtected =
    pathname.startsWith("/questionnaire") || pathname.startsWith("/account");

  if (isProtected) {
    const session = await getSessionFromRequest(request);

    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/questionnaire/:path*", "/account/:path*"],
};
