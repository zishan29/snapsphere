import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier")
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
    email: text("email"),
    token: text("token").notNull().unique(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.email, verificationToken.token],
    }),
  }),
);
