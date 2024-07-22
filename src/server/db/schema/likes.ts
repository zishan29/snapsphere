import { relations } from "drizzle-orm";
import { text, varchar } from "drizzle-orm/pg-core";
import { comments } from "./comments";
import { posts } from "./posts";
import { createTable } from "./table-creator";
import { users } from "./users";

export const likes = createTable("likes", {
  likes_id: text("likes_id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text("user_id").notNull(),
  target_id: text("target_id").notNull(),
  target_type: varchar("target_type").notNull(),
});

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.user_id],
    references: [users.user_id],
  }),
  post: one(posts, {
    fields: [likes.target_id],
    references: [posts.post_id],
  }),
  comment: one(comments, {
    fields: [likes.target_id],
    references: [comments.comment_id],
  }),
}));
