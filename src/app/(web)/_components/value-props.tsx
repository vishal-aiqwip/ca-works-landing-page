import { Image } from "@/components";

const FEATURES = [
  {
    title: "10+ hrs saved",
    body: "Per week, per staff — time back for billable work.",
  },
  {
    title: "Multiple channels",
    body: "WhatsApp and Email, unified into one inbox.",
  },
  {
    title: "Faster resolutions",
    body: "Document gathering and client queries close quicker.",
  },
  {
    title: "Zero missed conversations",
    body: "Nothing falls through the cracks, ever.",
    highlighted: true,
  },
];

const ValueProps = () => {
  return (
    <section className="mx-auto max-w-[95%] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <div className="mb-4.5 font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
          Why CA Works
        </div>
        <h2 className="font-bold text-2xl text-foreground leading-[1.14] tracking-[-0.025em] md:text-[34px]">
          Everything you need to stop chasing clients
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-[17px] text-muted-foreground leading-[1.6]">
          One place to reach clients, collect documents and send reminders —
          so nothing depends on someone remembering to follow up.
        </p>
      </div>

      <div
        className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 md:grid-cols-4"
        data-reveal-group
      >
        {FEATURES.map((f) => (
          <div
            key={f.title}
            data-reveal-item
            className={
              f.highlighted
                ? "rounded-2xl border-2 border-primary bg-primary/5 p-4"
                : "rounded-2xl border border-muted-foreground/15 bg-white p-4"
            }
          >
            <div className="font-bold text-[15px]">{f.title}</div>
            <p className="mt-1 text-[#596B75] text-[13px] leading-[1.5]">
              {f.body}
            </p>
          </div>
        ))}
      </div>

      <div
        data-reveal
        className="relative mt-10 overflow-hidden rounded-[28px] border border-[#DCE4F0] bg-[#EAF2FF] p-6 sm:mt-14 sm:p-10"
      >
        <div className="relative h-[280px] overflow-hidden rounded-2xl border border-[#DCE4F0] sm:h-[420px]">
          <Image
            src="/images/features.webp"
            alt="CA Works product features"
            fill
            quality={100}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
