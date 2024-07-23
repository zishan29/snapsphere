import { relations } from "drizzle-orm";
import { timestamp, text, varchar, pgTable } from "drizzle-orm/pg-core";
import { comments } from "./comments";
import { users } from "./users";
import { likes } from "./likes";

export const posts = pgTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  content: varchar("content").notNull(),
  post_image_url: varchar("post_image_url", { length: 255 }),
  post_date: timestamp("post_date").notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  userId: one(users, {
    fields: [posts.id],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
}));
