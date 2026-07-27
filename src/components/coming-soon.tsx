import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

export function ComingSoon({
  eyebrow,
  body,
}: {
  eyebrow: string;
  body: string;
}) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-center px-6 py-24 text-center sm:px-10">
      <div className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]">
        {eyebrow}
      </div>
      <h1 className="mt-4 font-extrabold text-[40px] text-foreground tracking-[-0.02em] sm:text-[52px]">
        Coming soon
      </h1>
      <p className="mt-4 max-w-[480px] text-[#475569] text-[18px] leading-[1.6]">
        {body}
      </p>
      <Button
        size="lg"
        className="mt-8 rounded-xl px-6.5 py-6 text-[16px]"
        asChild
      >
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
          Book a demo
        </a>
      </Button>
    </div>
  );
}
