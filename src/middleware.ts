import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./routes";
import { validateToken } from "./components/utils/validateToken";

export const TOKEN = "_token";
export const REFRESH_TOKEN = "_refresh_token";

export async function middleware(request: NextRequest) {
  let headers = new Headers(request.headers);

  const path = request.nextUrl.pathname;
  const isPublic = publicRoutes.includes(path);

  const token = request.cookies.get(TOKEN);
  const refresh_token = request.cookies.get(REFRESH_TOKEN);

  const validation = await validateToken(token?.value, process.env.JWT_SECRET);

  if (isPublic) {
    if (token && validation.isValid) {
      const response = NextResponse.redirect(
        new URL("/user/dashboard", request.url),
      );
      response.headers.set("x-jwt", token.value);
      return response;
    }
    return NextResponse.next();
  }

  if (token && !validation.isValid) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next({
    request: headers ? { headers } : undefined,
  });
}

export const config = {
  matcher: [
    "/user/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/forgot_password",
    "/auth/confirm-email",
  ],
};
