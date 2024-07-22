import { db } from "~/server/db";

export const getUserByEmail = async (email: string) => {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.email, email),
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.user_id, id),
  });

  return user;
};
