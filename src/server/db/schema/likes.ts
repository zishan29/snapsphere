import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { comments } from "./comments";
import { posts } from "./posts";
import { users } from "./users";

export const likes = pgTable("likes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId").notNull(),
  targetId: text("targetId").notNull(),
  targetType: varchar("targetType").notNull(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likes.targetId],
    references: [posts.id],
  }),
  comment: one(comments, {
    fields: [likes.targetId],
    references: [comments.id],
  }),
}));
