import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { follows } from "./follows";
import { posts } from "./posts";
import { likes } from "./likes";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  following: many(follows, { relationName: "following" }),
  followers: many(follows, { relationName: "followers" }),
  posts: many(posts),
  likes: many(likes),
}));
