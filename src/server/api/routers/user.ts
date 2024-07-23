import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema/users";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "~/lib/db-utils";
import { RegisterSchema } from "~/schemas";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(RegisterSchema)
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
});
