import { relations } from "drizzle-orm";
import { text, timestamp } from "drizzle-orm/pg-core";
import { createTable } from "./table-creator";
import { follows } from "./follows";
import { posts } from "./posts";
import { likes } from "./likes";
import { accounts } from "./accounts";

export const users = createTable("users", {
  user_id: text("user_id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("username"),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  profile_url: text("profile_url"),
});

export const usersRelations = relations(users, ({ many }) => ({
  following: many(follows, { relationName: "following" }),
  followers: many(follows, { relationName: "followers" }),
  posts: many(posts),
  likes: many(likes),
  accounts: many(accounts),
}));
