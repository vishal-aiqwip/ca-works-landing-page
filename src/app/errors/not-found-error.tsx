"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components";

const NAV_LINKS = [{ label: "Home", href: "/" as const }];

/**
 * @file not-found-error.tsx
 * @description 404 error page
 */
export function NotFoundError() {
  const router = useRouter();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-[7rem] leading-tight">404</h1>
        <span className="font-medium text-xl">Page Not Found</span>
        <p className="text-center text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
        <nav className="mt-8 flex flex-wrap justify-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground text-sm transition-colors duration-200 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
