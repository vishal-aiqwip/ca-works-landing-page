import type { Metadata } from "next";
import NextImage from "next/image";

import CtaSection from "./_components/cta-section";
import FeaturesSection from "./_components/features-section";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import ProblemSection from "./_components/problem-section";
import ProductDemo from "./_components/product-demo";
import Testimonials from "./_components/testimonials";
import TrustBar from "./_components/trust-bar";
import ValueProps from "./_components/value-props";

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
    <>
      <section
        className="border-[#EEF2FA] border-b"
        style={{
          background: "radial-gradient(120% 90% at 50% -10%, #ECF3FE 0%, #F3F6FD 45%, #fff 100%)",
        }}
      >
        <Hero />

        <div className="hidden md:block">
          <ProductDemo />
        </div>
        <div className="px-5 pb-16 md:hidden">
          <NextImage
            src="/videos/product-view.gif"
            alt="CA Works product preview"
            width={800}
            height={600}
            unoptimized
            className="h-auto w-full rounded-2xl border border-[#DCE4F0]"
          />
        </div>
      </section>

      <TrustBar />
      <ProblemSection />
      <ValueProps />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </>
  );
}
