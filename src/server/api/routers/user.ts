import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema/users";
import bcrypt from "bcrypt";
import { getUserByEmail } from "~/lib/db-utils";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);

      const existingUser = await getUserByEmail(input.email);

      if (existingUser) {
        return { error: "Email already in use!" };
      }

      await ctx.db.insert(users).values({
        username: input.username,
        email: input.email,
        password: hashedPassword,
      });

      //TODO: Send verification token email
      return { success: "User created!" };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: (model, { eq }) => eq(model.email, input.email),
      });

      if (!user) {
        return { error: "User not found" };
      }
      const isCorrect = await bcrypt.compare(input.password, user.password!);

      if (!isCorrect) {
        return { error: "Incorrect password" };
      }

      return {
        success: "email sent!",
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
        },
      };
    }),
});
