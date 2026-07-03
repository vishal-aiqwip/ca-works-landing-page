import type { JSX } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * @file overlay.tsx
 * @description Overlay component
 */
export const Overlay = ({ children, className }: Props): JSX.Element => {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-b from-primary/25 to-foreground/50",
        className,
      )}
    >
      {children}
    </div>
  );
};
