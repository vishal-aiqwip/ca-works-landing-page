import Link from "next/link";

import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "./button";

interface SlideButtonProps extends ButtonProps {
  /** Size variant: "sm" uses h-11 / 9x9 icon, "default" uses h-12 / 10x10 icon */
  slide?: "sm" | "default";
  /** Custom icon — defaults to ArrowRight */
  icon?: LucideIcon;
  /** Whether icon rotates on hover — defaults to true */
  iconRotate?: boolean;
  /** When provided, renders as a link instead of a button */
  href?: string;
}

function SlideButton({
  children,
  className,
  slide = "default",
  icon: Icon = ArrowRight,
  iconRotate = true,
  href,
  ...props
}: SlideButtonProps) {
  const isSmall = slide === "sm";

  const sharedClassName = cn(
    "group relative inline-flex w-fit cursor-pointer items-center overflow-hidden rounded-xl bg-primary p-1 ps-6 pe-14 font-medium text-primary-foreground text-sm transition-all duration-500 hover:bg-primary/90 hover:pe-6 hover:ps-14 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none",
    isSmall ? "h-11" : "h-12",
    className,
  );

  const inner = (
    <>
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>
      <span
        className={cn(
          "absolute right-1 flex items-center justify-center rounded-lg bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)]",
          isSmall ? "h-9 w-9" : "h-10 w-10",
        )}
      >
        <Icon size={16} className={cn("transition-transform duration-500", iconRotate && "-rotate-45 group-hover:rotate-0")} />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href as never} className={sharedClassName}>
        {inner}
      </Link>
    );
  }

  return (
    <Button
      variant="reset"
      size="reset"
      className={sharedClassName}
      {...props}
    >
      {inner}
    </Button>
  );
}

export { SlideButton, type SlideButtonProps };
