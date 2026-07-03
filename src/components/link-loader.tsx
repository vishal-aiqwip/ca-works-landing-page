"use client";

import { useLinkStatus } from "next/link";

import { Spinner } from "./ui/spinner";

export function LinkLoader({
  children,
  noShowChildren = false,
  className,
}: {
  children?: React.ReactNode;
  noShowChildren?: boolean;
  className?: string;
}) {
  const { pending } = useLinkStatus();

  return pending ? (
    <>
      <Spinner className={className} />
      {!noShowChildren && children && children}
    </>
  ) : (
    children && children
  );
}
