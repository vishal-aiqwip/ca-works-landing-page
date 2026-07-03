"use client";

import NextImage, { type ImageProps, type StaticImageData } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

// Tiny 1x1 transparent blurDataURL — used as placeholder while loading
const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlMmUyZTIiLz48L3N2Zz4=";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: StaticImageData | string | null;
};

/**
 * A wrapper around Next.js Image that handles:
 * - Lazy loading by default (below-fold images)
 * - Blur placeholder while loading
 * - Smooth fade-in transition on load
 * - Error fallback image
 */
export const Image = ({
  src,
  className,
  placeholder,
  blurDataURL,
  ...props
}: SafeImageProps) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isError = error || !src;

  return (
    <NextImage
      src={isError ? BLUR_DATA_URL : (src as string)}
      className={cn(
        "transition-all duration-500 ease-out",
        isLoading ? "scale-[1.02] blur-sm" : "scale-100 blur-0",
        isError && "!object-contain bg-white",
        className,
      )}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder={placeholder ?? "blur"}
      blurDataURL={blurDataURL ?? BLUR_DATA_URL}
      loading="lazy"
      {...props}
      onLoad={() => setIsLoading(false)}
      onError={() => setError(true)}
    />
  );
};
