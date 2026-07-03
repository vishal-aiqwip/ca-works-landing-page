import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { PropsWithChildren } from "react";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import { APP_NAME } from "@/config";
import { lato } from "@/font";
import { Providers as AllProviders } from "@/provider";
import "@/styles/index.css";

import Footer from "./(web)/_components/footer";
import Header from "./(web)/_components/header";

// import {
//   OrganizationSchema,
//   SiteNavigationSchema,
//   WebsiteSchema,
// } from "./(web)/_components/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://www.caworks.ai";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `Your Development Partner for AI MVP / Features / SaaS Products | ${APP_NAME}`,
  },
  description:
    "We Help Early Stage Startups Ship AI Native Products Faster. 4-Week MVP Guarantee, Full-Stack AI Team, Ongoing Partnership.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/images/meta/favicon.webp", type: "image/webp" },
      { url: "/images/meta/favicon.png", type: "image/png" },
    ],
    apple: "/images/meta/favicon.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: APP_NAME,
    title: `Your Development Partner for AI MVP / Features / SaaS Products | ${APP_NAME}`,
    description:
      "We Help Early Stage Startups Ship AI Native Products Faster. 4-Week MVP Guarantee, Full-Stack AI Team, Ongoing Partnership.",
    images: [
      {
        url: "/images/meta/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aiqwip — Your Development Partner for AI MVP / Features / SaaS Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aiqwip",
    title: `Your Development Partner for AI MVP / Features / SaaS Products | ${APP_NAME}`,
    description:
      "We Help Early Stage Startups Ship AI Native Products Faster. 4-Week MVP Guarantee, Full-Stack AI Team, Ongoing Partnership.",
    images: ["/images/meta/og-image.png"],
    creator: "@SairamCh_",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * @file layout.tsx
 * @description Root layout the application
 */
export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cal.com" />
      </head>
      {/* FO<GoogleAnalytics gaId="G-LJGPWSHW8F" /> */}

      <body className={`${lato.variable} overflow-x-hidden antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {/* <OrganizationSchema />
        <WebsiteSchema />
        <SiteNavigationSchema /> */}
        <Header />
        <main id="main-content">
          <Providers>{children}</Providers>
        </main>

        <Footer />
      </body>
    </html>
  );
}

const Providers = async ({ children }: { children: React.ReactNode }) => {
  return <AllProviders>{children}</AllProviders>;
};
