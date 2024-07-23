import { Button } from "~/components/ui/button";
import { signOut } from "~/server/auth";
import { redirect } from "next/navigation";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-2xl font-bold">SnapSphere</div>
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/auth/login");
        }}
      >
        <Button type="submit" variant="secondary">
          Sign out
        </Button>
      </form>
    </nav>
  );
}
