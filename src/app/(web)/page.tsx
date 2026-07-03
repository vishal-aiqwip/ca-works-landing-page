import type { Metadata } from "next";
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
  return <div>Home page</div>;
}
