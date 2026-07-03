"use client";

import { useEffect } from "react";

import { Button } from "@/components";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * @file error.tsx
 * @description Error page
 */
const ErrorPage = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-svh items-center justify-center">
      <div className="p-4">
        <h2 className="text-xl">{error.message || "Something went wrong.!"}</h2>
        <Button className="mx-auto mt-4 block" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </section>
  );
};

export default ErrorPage;
