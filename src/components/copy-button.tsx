"use client";

import { useState } from "react";

import type { VariantProps } from "class-variance-authority";
import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib";

import { Button, type buttonVariants } from "./ui/button";

type CopyButtonProps = {
  value: string;
  onSuccess?: () => void;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export const CopyButton = ({
  value,
  variant = "reset",
  className,
  onSuccess,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  // Handle the copy action
  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
        onSuccess?.();
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        toast.error("Failed to copy text");
      });
  };

  return (
    <Button
      onClick={handleCopy}
      aria-label="Copy value to clipboard"
      variant={variant}
      size={"icon"}
      className={cn("", className)}
      {...props}
    >
      {copied ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
    </Button>
  );
};
