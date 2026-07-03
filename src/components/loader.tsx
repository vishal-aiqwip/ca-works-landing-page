import { cn } from "@/lib";

import { Spinner } from "./ui/spinner";

/**
 * @file loader.jsx
 * @description Default loading screen for application
 */
export const Loader = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn(
        "pointer-events-none flex items-center justify-center overflow-hidden backdrop-blur-sm dark:bg-background dark:text-primary",
        "size-full",
        className,
      )}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-primary"
        disabled
      >
        <Spinner className="size-5" />
        <span className="sm:text-lg">Loading</span>
        <div className="space-x-1">
          <span className="inline-block size-[0.15rem] rounded-full bg-primary dark:bg-primary"></span>
          <span className="inline-block size-[0.15rem] rounded-full bg-primary dark:bg-primary"></span>
          <span className="inline-block size-[0.15rem] rounded-full bg-primary dark:bg-primary"></span>
        </div>
      </button>
    </section>
  );
};
