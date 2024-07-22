"use server";

import { api } from "~/trpc/server";
import type * as z from "zod";
import { LoginSchema } from "~/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  return { success: "email sent!" };
};
