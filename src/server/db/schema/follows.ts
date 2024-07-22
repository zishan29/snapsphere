import { relations } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { createTable } from "./table-creator";
import { users } from "./users";

export const follows = createTable("follows", {
  follows_id: text("follows_id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  follower_user_id: text("follower_user_id")
    .notNull()
    .references(() => users.user_id),
  following_user_id: text("following_user_id")
    .notNull()
    .references(() => users.user_id),
});

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.follower_user_id],
    references: [users.user_id],
    relationName: "following",
  }),
  following: one(users, {
    fields: [follows.following_user_id],
    references: [users.user_id],
    relationName: "followers",
  }),
}));
