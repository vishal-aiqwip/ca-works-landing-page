"use client";

import { type ComponentProps, useState, useTransition } from "react";

import type { VariantProps } from "class-variance-authority";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  type buttonVariants,
} from "@/components";

type BetterAuthActionButtonProps = {
  action: () => Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
  showChild?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  requireAreYouSure?: boolean;
} & Omit<ComponentProps<typeof Button>, "onClick"> &
  VariantProps<typeof buttonVariants>;

export function BetterAuthActionButton({
  action,
  successMessage,
  disabled,
  requireAreYouSure,
  children,
  ...props
}: BetterAuthActionButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleAction = () => {
    startTransition(async () => {
      const res = await action();
      if (res.error) {
        toast.error(res.error.message || "Action failed");
      } else {
        successMessage && toast.success(successMessage);
      }
    });
  };

  if (requireAreYouSure) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            {...props}
            disabled={disabled || isPending}
            isLoading={isPending}
          >
            {children}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                setOpen(false);
                handleAction();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  // If no confirmation needed
  return (
    <Button
      {...props}
      disabled={disabled || isPending}
      isLoading={isPending}
      onClick={handleAction}
    >
      {children}
    </Button>
  );
}
