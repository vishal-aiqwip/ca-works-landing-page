"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, useState, useTransition } from "react";

import type { VariantProps } from "class-variance-authority";

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
import { responseHandler } from "@/lib";
import type { ApiResponse } from "@/lib/fetcher";

type ActionButtonProps = {
  action: () => Promise<ApiResponse>;
  successMessage?: string;
  loadingMessage?: string;
  showChild?: boolean;
  disabled?: boolean;
  asChild?: boolean;
  requireAreYouSure?: boolean;
} & Omit<ComponentProps<typeof Button>, "onClick"> &
  VariantProps<typeof buttonVariants>;

/**
 * @file action-button.tsx
 * @description Action button component
 */
export function ActionButton({
  action,
  successMessage,
  loadingMessage,
  disabled,
  requireAreYouSure,
  children,
  ...props
}: ActionButtonProps) {
  //-------------- State & Variables --------------//
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  //-------------- Other Methods --------------//

  /**
   * Handle action
   */
  const handleAction = () => {
    startTransition(async () => {
      await responseHandler(action(), successMessage, loadingMessage);
    });
    router.refresh();
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
              variant={props.variant}
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
