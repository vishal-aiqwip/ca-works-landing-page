import Link from "next/link";

import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

const AVATARS = [
  { initials: "LG", from: "#60A5FA", to: "#2563EB" },
  { initials: "AT", from: "#34D399", to: "#059669" },
  { initials: "KK", from: "#F472B6", to: "#DB2777" },
  { initials: "RN", from: "#FBBF24", to: "#D97706" },
  { initials: "SA", from: "#818CF8", to: "#4F46E5" },
];

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      <div
        data-blob
        className="absolute top-[220px] left-1/2 z-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full opacity-50 blur-xl sm:h-[560px] sm:w-[1100px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 40%, #C7D2FE 0%, #DBE4F5 40%, #E6EEF7 62%, transparent 74%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1000px] px-4 text-center sm:px-8">
        <div
          data-hero-item
          className="font-bold text-[13.5px] text-primary uppercase tracking-[0.12em]"
        >
          AI client communication for chartered accountants
        </div>
        <h1
          data-hero-item
          className="mx-auto mt-5.5 max-w-[860px] text-balance font-extrabold text-[36px] text-foreground leading-[1.06] tracking-[-0.02em] sm:text-[52px] lg:text-[64px] lg:leading-[1.03]"
        >
          Stop losing time on repetitive client communications
        </h1>
        <p
          data-hero-item
          className="mx-auto mt-6.5 max-w-[600px] text-[17px] text-muted-foreground leading-[1.55] sm:text-[19px]"
        >
          CA Works helps to manage client communications across various channels
          like Email & WhatsApp
        </p>
        <div
          data-hero-item
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button
            size="lg"
            className="rounded-xl bg-[#0F172A] px-6.5 py-6 text-[16px] text-white hover:bg-[#0F172A]/90"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a demo
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-[#E2E8F0] px-6.5 py-6 text-[16px] text-foreground"
            asChild
          >
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
        <div
          data-hero-item
          className="mt-7.5 flex items-center justify-center gap-4"
        >
          <div className="flex">
            {AVATARS.map((a, i) => (
              <span
                key={a.initials}
                className="-mr-3 flex size-10 items-center justify-center rounded-full border-[2.5px] border-white font-bold text-[12px] text-white last:mr-0"
                style={{
                  background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                  zIndex: AVATARS.length - i,
                }}
              >
                {a.initials}
              </span>
            ))}
          </div>
          <div className="text-left">
            <div className="text-[#F59E0B] text-[16px] tracking-[2px]">
              ★★★★★
            </div>
            <div className="font-semibold text-[#334155] text-[14px]">
              Trusted by modern CA &amp; tax firms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
