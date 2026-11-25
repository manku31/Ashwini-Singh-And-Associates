import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/session";

// Optimistic gate only: the real checks live in requireAdmin() on every admin page/action/read.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (!verifyToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
