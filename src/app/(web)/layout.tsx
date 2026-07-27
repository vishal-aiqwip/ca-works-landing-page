import type { Metadata } from "next";

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

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
