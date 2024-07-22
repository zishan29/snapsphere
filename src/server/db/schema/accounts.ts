import { integer, text, primaryKey } from "drizzle-orm/pg-core";

import { createTable } from "./table-creator";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const accounts = createTable(
  "accounts",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => users.user_id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.user_id],
    references: [users.user_id],
  }),
}));
