import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";
import { APP_NAME } from "@/config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Pricing for ${APP_NAME}.`,
};

export default function PricingPage() {
  return (
    <ComingSoon
      eyebrow="Pricing"
      body="We're finalizing our pricing plans. Book a demo and we'll work out a plan that fits your firm."
    />
  );
}
