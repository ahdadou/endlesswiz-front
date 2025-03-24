import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { cookies } from "next/headers";
import { TOKEN } from "./middleware";
import { signInGoogleRequest } from "./clients/AuthService";

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
    async signIn({ account }) {
      if (account?.provider === "google") {
        const googleToken = account.id_token;
        if (googleToken) {
          try {
            const res = await signInGoogleRequest(googleToken);
            if (res?.access_token) {
              const cookieStore = await cookies();

              cookieStore.set(TOKEN, res.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: "/",
                // priority: "high",
                // Consider adding domain if using cross-origin
                // domain: '.yourdomain.com',
              });
            } else {
              console.error("Failed to retrieve access_token");
              return false;
            }
          } catch (error) {
            console.error("Authentication failed:", error);
            return false;
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.accessToken) {
        const cookieStore = await cookies();
        cookieStore.set(TOKEN, user.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
          domain: ".endlesswiz.com", // Share across subdomains
        });
      } else {
        console.warn("### No accessToken found in jwt callback");
      }
      return token;
    },
    async session({ session, token }) {
      session.sessionToken = token.accessToken as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl || url === `${baseUrl}/`) {
        return `${baseUrl}/user/dashboard`;
      }
      return url;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (matches cookie maxAge)
  },
  ...authConfig,
});
