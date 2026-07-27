import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";
import { APP_NAME } from "@/config";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${APP_NAME}.`,
};

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="About"
      body={`We're putting together the story behind ${APP_NAME}. Check back soon, or book a demo to talk to us directly.`}
    />
  );
}
