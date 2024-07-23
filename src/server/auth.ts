import NextAuth from "next-auth";
import authConfig from "~/auth.config";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import { getUserByEmail } from "~/lib/db-utils";

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
      if (token.sub && token.name) {
        session.user.name = token.name;
      }
      if (token.sub && token.image) {
        session.user.image = token.image as string;
      }
      return session;
    },
    async jwt({ token }) {
      const user = await getUserByEmail(token.email!);
      token.sub = user?.user_id;
      token.name = user?.username;
      token.image = user?.profile_url;
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
