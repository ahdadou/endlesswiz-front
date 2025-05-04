import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { cookies } from "next/headers";
import { TOKEN } from "./middleware";
import {
  signInFacebookRequest,
  signInGoogleRequest,
} from "./clients/AuthService";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
    sessionToken: string;
  }
  interface User {
    accessToken: string;
    refreshToken?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        try {
          const res = await signInGoogleRequest(account.id_token!);
          if (!res?.accessToken) {
            console.error("Google sign-in failed: No access token");
            return false;
          }

          // Store token in user object for JWT callback
          user.accessToken = res.accessToken;
          user.refreshToken = res.refreshToken;
          return true;
        } catch (error) {
          console.error("Google authentication failed:", error);
          return false;
        }
      }
      if (account?.provider === "facebook") {
        try {
          const res = await signInFacebookRequest(account.access_token!);
          if (!res?.accessToken) {
            console.error("Facebook sign-in failed: No access token");
            return false;
          }
          // Store token in user object for JWT callback
          user.accessToken = res.accessToken;
          user.refreshToken = res.refreshToken;
          return true;
        } catch (error) {
          console.error("Facebook authentication failed:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, trigger }) {
      // Initial token population
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        const cookieStore = await cookies();
        cookieStore.set(TOKEN, user.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "test",
          sameSite: "lax", // Changed to lax for cross-domain
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
          domain:
            process.env.ENVIRONMENT !== "local"
              ? ".endlesswiz.com"
              : "localhost",
        });
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure session token is always populated
      if (token.accessToken) {
        session.sessionToken = token.accessToken as string;
        session.user = {
          ...session.user,
          id: token.sub!,
          role: token.role as "ADMIN" | "USER",
        };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/api/auth")) {
        return `${baseUrl}/user/dashboard`;
      }

      if (url.startsWith(baseUrl)) {
        return url.includes("/user/dashboard")
          ? url
          : `${baseUrl}/user/dashboard`;
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  ...authConfig,
});
