import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "./clients/api/api";
import { publicRoutes } from "./routes";

export const TOKEN = "_token";
export const REFRESH_TOKEN = "_refresh_token";

export async function middleware(request: NextRequest) {
  let headers = new Headers(request.headers);

  const path = request.nextUrl.pathname;
  const isPublic = publicRoutes.includes(path);

  const token = request.cookies.get(TOKEN);
  const refresh_token = request.cookies.get(REFRESH_TOKEN);

  console.log("isPublic   :", isPublic);

  if (isPublic) {
    if (token && (await api.validateToken(token.value))) {
      const response = NextResponse.redirect(
        new URL("/dashboard", request.url),
      );
      response.headers.set("x-jwt", token.value);
      return response;
    }
    return NextResponse.next();
  }

  if (!token || !(await api.validateToken(token.value))) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next({
    request: headers ? { headers } : undefined,
  });
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/forgot_password",
    "/auth/confirm-email",
  ],
};
