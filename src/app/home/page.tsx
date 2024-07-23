import { api, HydrateClient } from "~/trpc/server";
import Post from "~/app/_components/post";
import PostForm from "../_components/post-form";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const posts = await api.post.getAll();
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center gap-4 p-4">
        <div>
          <PostForm />
          {posts.map((post) => (
            <Post post={post} key={post.post_id} />
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}
