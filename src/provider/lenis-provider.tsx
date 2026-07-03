"use client";

import type { ReactNode } from "react";

import { ReactLenis } from "@studio-freight/react-lenis";

import { useIsMobile } from "@/hooks/use-mobile";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const isMobile = useIsMobile();

  if (isMobile) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 0.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
