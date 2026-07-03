"use client";

import { useRouter } from "next/navigation";
import type React from "react";

import type { VariantProps } from "class-variance-authority";
import { ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib";

import { Button, type buttonVariants } from "./ui/button";

type CopyButtonProps = {
  className?: string;
  onSuccess?: () => void;
  children?: React.ReactNode;
} & VariantProps<typeof buttonVariants>;

/**
 * back-button
 * @returns  {JSX.Element}
 */
export const BackButton = ({
  variant = "outline",
  onSuccess,
  children,
  ...props
}: CopyButtonProps) => {
  //-------------- State & Variables --------------//
  const router = useRouter();

  //-------------- Other Methods --------------//
  // Handle click
  const handleClick = () => {
    router.back();
    onSuccess?.();
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      {...props}
      className={cn("w-fit", props.className)}
    >
      {children ?? (
        <>
          <ArrowLeftIcon /> Back
        </>
      )}
    </Button>
  );
};
