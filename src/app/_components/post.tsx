import Image from "next/image";
import { type Post } from "~/types";

export default function LatestPost({ post }: { post: Post }) {
  return (
    <div className="flex w-96 flex-col border border-gray-200 p-2">
      <div>{post.post_date.toLocaleString()}</div>
      <div>{post.content}</div>
      {post.post_image_url ? (
        <Image
          src={post.post_image_url}
          alt="post image"
          width={500}
          height={500}
        />
      ) : null}
    </div>
  );
}
