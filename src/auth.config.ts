import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default {
  providers: [
    GoogleProvider({
      clientId: '336755466816-pcblua1l0g6d4sel1t8ptk2d6971f9r8.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          scope: "openid email profile",
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
