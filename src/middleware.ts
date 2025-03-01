// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./clients/api/api";

export const TOKEN = "_token";
export const REFRESH_TOKEN = "_refresh_token";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic = ["/login", "/register"].includes(path);
  const token = request.cookies.get(TOKEN);
  const refresh_token = request.cookies.get(REFRESH_TOKEN);

  if (isPublic) {
    if (token && (await api.validateToken(token.value))) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!token || !(await api.validateToken(token.value))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
