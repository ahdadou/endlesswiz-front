/**
 *  AN array of public routes
 */
export const publicRoutes = [
  "/",
  "/verify-email",
  "/login",
  "/register",
  "/forgot_password",
];

/**
 *  Routes that use for authentication
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
