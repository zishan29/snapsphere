import { Button } from "~/components/ui/button";
import LoginButton from "~/components/auth/login-button";

export default function TopNav() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="text-2xl font-bold">SnapSphere</div>
      <LoginButton>
        <Button variant="secondary">Log in</Button>
      </LoginButton>
    </nav>
  );
}
