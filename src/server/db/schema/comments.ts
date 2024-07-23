import { relations } from "drizzle-orm";
import { timestamp, text, varchar, pgTable } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";
import { likes } from "./likes";

export const comments = pgTable("comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  postId: text("postId").references(() => posts.id),
  userId: text("userId").references(() => users.id),
  content: varchar("content").notNull(),
  comment_image_url: varchar("comment_image_url", { length: 255 }),
  comment_date: timestamp("comment_date").notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  userId: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  postId: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  likes: many(likes),
}));
