import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

const CtaSection = () => {
  return (
    <section
      id="pricing"
      className="mx-auto mt-10 max-w-[1200px] px-6 sm:px-10"
    >
      <div
        data-reveal-scale
        className="relative overflow-hidden rounded-[26px] bg-[url('/images/landing/cta-bg.jpg')] bg-center bg-cover px-6 py-16 text-center text-white sm:px-10 sm:py-20"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 120% at 78% 10%, rgba(255,255,255,0.18), transparent 55%)",
          }}
        />
        <div className="relative">
          <div className="font-bold text-[13px] text-white/75 uppercase tracking-[0.12em]">
            Get started
          </div>
          <h2
            data-reveal-heading
            className="mx-auto mt-5 max-w-[760px] font-extrabold text-[28px] leading-[1.12] tracking-[-0.02em] sm:text-[38px] lg:text-[52px]"
          >
            Let CA Works handle the tedious work while your team focuses on what
            matters
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[#DBEAFE] text-[18px] leading-[1.55]">
            Stop chasing documents and typing reminders. Book a demo and see it
            working on your own client conversations.
          </p>
          <div className="mt-8.5 flex flex-wrap justify-center gap-3.5">
            <Button
              size="lg"
              className="rounded-xl bg-white px-7 py-6 text-[16px] text-primary hover:bg-white/90"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-xl border border-white/32 bg-white/14 px-7 py-6 text-[16px] text-white hover:bg-white/22 hover:text-white"
              asChild
            >
              <a href="#contact">Contact us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
