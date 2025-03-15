/**
 *  AN array of public routes
 */
export const publicRoutes = [
  "/",
  "/auth/verify-email",
  "/auth/login",
  "/auth/register",
  "/auth/forgot_password",
  "/auth/confirm-email",
];

/**
 *  Routes that use for authentication
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/user/dashboard";
