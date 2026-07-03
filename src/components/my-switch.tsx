"use client";

import type React from "react";
import { useOptimistic, useTransition } from "react";

import { responseHandler } from "@/lib";
import type { ApiResponse } from "@/lib/fetcher";

import { Switch, type SwitchProps } from "./ui/switch";

interface ToggleSwitchProps
  extends Omit<SwitchProps, "checked" | "onCheckedChange"> {
  checked: boolean;
  action: (newValue: boolean) => Promise<ApiResponse>;
}

/**
 * @file my-switch.tsx
 * @description Toggle switch
 */
export const MySwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  action,
  ...props
}) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticChecked, setOptimisticChecked] = useOptimistic(checked);

  const handleToggleChange = (newValue: boolean) => {
    startTransition(async () => {
      // Optimistically update the UI immediately
      setOptimisticChecked(newValue);
      const api_call = action(newValue);

      const res = await responseHandler(
        api_call,
        `${newValue ? "Enabled" : "Disabled"}`,
        "Updating...",
      );

      // revert if failed
      if (!res?.data?.status) {
        setOptimisticChecked(checked);
      }
    });
  };

  return (
    <Switch
      checked={optimisticChecked}
      onCheckedChange={handleToggleChange}
      disabled={isPending}
      {...props}
    />
  );
};
