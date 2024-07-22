import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function PostForm() {
  return (
    <div className="flex w-96 flex-col gap-4 border border-gray-200 p-2">
      <Input
        type="text"
        className="w-full border border-gray-200 bg-transparent"
        placeholder="What's happening?"
      />
      <Button variant="secondary">Submit</Button>
    </div>
  );
}
