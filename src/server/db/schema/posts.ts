import { relations } from "drizzle-orm";
import { timestamp, text, varchar } from "drizzle-orm/pg-core";
import { createTable } from "./table-creator";
import { comments } from "./comments";
import { users } from "./users";
import { likes } from "./likes";

export const posts = createTable("posts", {
  post_id: text("post_id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id),
  content: varchar("content").notNull(),
  post_image_url: varchar("post_image_url", { length: 255 }),
  post_date: timestamp("post_date").notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  userId: one(users, {
    fields: [posts.user_id],
    references: [users.user_id],
  }),
  comments: many(comments),
  likes: many(likes),
}));
