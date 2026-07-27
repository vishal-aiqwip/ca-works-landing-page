"use client";

import NextImage from "next/image";
import { useRef } from "react";

import ChannelsSection from "./_components/channels-section";
import CtaSection from "./_components/cta-section";
import FaqSection from "./_components/faq-section";
import FeaturesSection from "./_components/features-section";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import { LandingFx } from "./_components/landing-fx";
import Marquee from "./_components/marquee";
import ProductDemo from "./_components/product-demo";
import RemindersSection from "./_components/reminders-section";
import Testimonials from "./_components/testimonials";
import TriageSection from "./_components/triage-section";
import TrustBar from "./_components/trust-bar";
import UnifiedInbox from "./_components/unified-inbox";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef}>
      <LandingFx rootRef={rootRef} />

      <section
        className="border-[#EEF2FA] border-b"
        style={{
          background:
            "radial-gradient(85% 75% at 50% 60%, #7FB0FF 0%, #C3DBFF 35%, #EDF4FF 65%, #ffffff 100%)",
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
      <UnifiedInbox />
      <FeaturesSection />
      <ChannelsSection />
      <TriageSection />
      <RemindersSection />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <CtaSection />
      <Marquee />
    </div>
  );
}
