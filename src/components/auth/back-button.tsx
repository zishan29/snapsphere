import Link from "next/link";
import { Button } from "~/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="w-full font-normal" size="sm" asChild variant="link">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
