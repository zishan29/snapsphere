"use client";

import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "~/hooks/use-current-user";
import Link from "next/link";
import { UserButton } from "~/components/auth/user-button";

export default function TopNav() {
  const user = useCurrentUser();
  const pathname = usePathname();

  console.log(pathname);
  console.log(user);
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-2xl font-bold">SnapSphere</div>
      <div className="flex items-center gap-x-4">
        <Button
          className="text-black"
          variant={pathname === "/home" ? "outline" : "default"}
        >
          <Link href="/home">Home</Link>
        </Button>
        <Button variant={pathname === "/chat" ? "outline" : "default"} asChild>
          <Link href="/chat">Chat</Link>
        </Button>
        <UserButton />
      </div>
    </nav>
  );
}
