import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

const CtaSection = () => {
  return (
    <section id="cta" className="mx-auto max-w-[95%] px-4 py-14 sm:px-6 sm:py-22.5 lg:px-8">
      <div
        data-reveal-scale
        className="relative overflow-hidden rounded-[28px] px-5 py-10 text-center text-white shadow-[0_30px_70px_-30px_rgba(4,100,228,0.6)] sm:px-8 sm:py-16 md:px-14"
        style={{
          background:
            "radial-gradient(120% 140% at 80% 0%, #0A4FB4 0%, #0464E4 55%, #0E4090 100%)",
        }}
      >
        <div className="mb-4 font-extrabold text-[#AECBFB] text-[13px] uppercase tracking-[0.12em]">
          Get started
        </div>
        <h2 className="mx-auto mb-4 max-w-[30ch] font-bold text-[24px] leading-[1.22] tracking-[-0.02em] sm:text-[34px]">
          Let CA Works handle tedious work while your team is focused on
          critical business
        </h2>
        <div className="flex justify-center gap-2 sm:gap-3.5">
          <Button
            size="lg"
            className="flex-1 rounded-xl bg-white px-4 py-3 text-[14px] text-primary shadow-[0_10px_24px_rgba(0,0,0,0.16)] hover:bg-accent sm:flex-none sm:px-8 sm:py-4 sm:text-[16px]"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="flex-1 rounded-xl border-[1.5px] border-white/35 bg-white/[.14] px-4 py-3 text-[14px] text-white hover:bg-white/[.22] hover:text-white sm:flex-none sm:px-8 sm:py-4 sm:text-[16px]"
            asChild
          >
            <a href="#pricing">View Pricing</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
