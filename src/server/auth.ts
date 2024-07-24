import NextAuth from "next-auth";
import authConfig from "~/auth.config";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import { users } from "~/server/db/schema/users";
import { eq } from "drizzle-orm";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id));
    },
  },
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
