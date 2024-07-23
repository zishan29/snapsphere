import { Button } from "~/components/ui/button";
import { signOut } from "~/server/auth";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-2xl font-bold">SnapSphere</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </nav>
  );
}
