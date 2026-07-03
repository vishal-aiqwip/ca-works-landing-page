"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components";
import { cn } from "@/lib";

type GeneralErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  minimal?: boolean;
};

/**
 * @file general-error.tsx
 * @description 500 error page
 */
export function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const router = useRouter();
  return (
    <div className={cn("h-svh w-full", className)}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        {!minimal && (
          <h1 className="font-bold text-[7rem] leading-tight">500</h1>
        )}
        <span className="font-medium">Oops! Something went wrong {`:')`}</span>
        <p className="text-center text-muted-foreground">
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Go Back
            </Button>
            <Button onClick={() => router.push("/")}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
