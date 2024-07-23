import NextAuth from "next-auth";
import authConfig from "~/auth.config";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
