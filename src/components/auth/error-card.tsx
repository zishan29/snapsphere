import { CardWrapper } from "~/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center text-destructive">
        <ExclamationTriangleIcon />
      </div>
    </CardWrapper>
  );
}
