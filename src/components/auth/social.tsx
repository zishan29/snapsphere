"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "~/components/ui/button";

export const Social = () => {
  const onClick = () => {
    console.log("clicked");
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button className="w-full" size="lg" variant="outline" onClick={onClick}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={onClick}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
