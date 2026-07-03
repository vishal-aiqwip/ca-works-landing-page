import type { Metadata } from "next";

import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

/**
 * Metadata for the page
 */

export const metadata: Metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: "https://www.caworks.ai",
  },
  openGraph: {
    title: "",
    description: "",
    images: [{ url: "/images/meta/og-image.png", width: 1200, height: 630 }],
  },
};

/**
 * @file page.tsx
 * @description Home page of the app
 */
export default async function Home() {
  return (
    <section className="bg-linear-to-b from-white to-accent">
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <h1 className="text-balance font-extrabold text-4xl text-foreground tracking-tight sm:text-6xl">
          Stop losing time on repetitive client communications
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          CA Works helps to manage client communications across various
          channels like Email & WhatsApp
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-accent hover:text-primary"
            asChild
          >
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
