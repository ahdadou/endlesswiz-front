import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { cookies } from "next/headers";
import { TOKEN } from "./middleware";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
    sessionToken?: string;
  }
  interface User {
    refreshToken?: string;
    accessToken: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        (await cookies()).set(TOKEN, user.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict", // Changed to lax for better CORS compatibility
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (matches cookie maxAge)
  },
  ...authConfig,
});
