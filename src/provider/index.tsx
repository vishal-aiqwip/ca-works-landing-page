import type { ReactNode } from "react";

import { Toaster } from "@/components";

import { LenisProvider } from "./lenis-provider";
import { ThemeProvider } from "./theme-provider";

/**
 * This is a wrapper element for all Providers.
 */
export const Providers = async ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>{children}</LenisProvider>

      <Toaster />
    </ThemeProvider>
  );
};

export * from "./theme-provider";
