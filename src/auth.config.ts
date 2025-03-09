import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        try {
          const { access_token, refresh_token } = credentials as {
            access_token: string;
            refresh_token: string;
          };

          if (credentials) {
            return {
              accessToken: access_token, // This is now part of the User type
              refreshToken: refresh_token, // This is now part of the User type
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
