"use server";

import { api } from "~/trpc/server";
import type * as z from "zod";
import { RegisterSchema } from "~/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const response = await api.user.create(validatedFields.data);
  if (response.success) {
    return { success: "User created!" };
  }

  return { error: response.error };
};
