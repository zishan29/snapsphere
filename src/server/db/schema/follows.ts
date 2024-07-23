import { relations } from "drizzle-orm";
import { text, pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";

export const follows = pgTable("follows", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  follower_userId: text("follower_userId")
    .notNull()
    .references(() => users.id),
  following_userId: text("following_userId")
    .notNull()
    .references(() => users.id),
});

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.follower_userId],
    references: [users.id],
    relationName: "following",
  }),
  following: one(users, {
    fields: [follows.following_userId],
    references: [users.id],
    relationName: "followers",
  }),
}));
