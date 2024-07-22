import { relations } from "drizzle-orm";
import { timestamp, text, varchar } from "drizzle-orm/pg-core";
import { createTable } from "./table-creator";
import { posts } from "./posts";
import { users } from "./users";
import { likes } from "./likes";

export const comments = createTable("comments", {
  comment_id: text("comment_id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  post_id: text("user_id").references(() => posts.post_id),
  user_id: text("user_id").references(() => users.user_id),
  content: varchar("content").notNull(),
  comment_image_url: varchar("comment_image_url", { length: 255 }),
  comment_date: timestamp("comment_date").notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  userId: one(users, {
    fields: [comments.user_id],
    references: [users.user_id],
  }),
  postId: one(posts, {
    fields: [comments.post_id],
    references: [posts.post_id],
  }),
  likes: many(likes),
}));
