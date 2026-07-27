const STEPS = [
  {
    num: "1",
    title: "Connect your channels",
    body: "Link your firm's WhatsApp Business number and email inbox in a few minutes. No new app for clients to install.",
  },
  {
    num: "2",
    title: "CA Works reads & understands",
    body: "Every incoming message is read, classified and matched to the right client and task automatically.",
  },
  {
    num: "3",
    title: "It replies & acts in your voice",
    body: "Answers routine questions, sends document links, collects uploads and files them automatically, without manual effort.",
  },
  {
    num: "4",
    title: "You stay in control",
    body: "Anything sensitive is escalated to your team with full context, and every conversation is logged and searchable.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="channels"
      className="mx-auto max-w-[95%] px-4 py-12 sm:px-6 sm:py-20 lg:px-8"
    >
      <div data-reveal className="mx-auto mb-14 max-w-[60ch] text-center">
        <div className="mb-3.5 font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
          How it works
        </div>
        <h2 className="mb-4 font-extrabold text-[28px] text-foreground leading-[1.1] tracking-[-0.025em] sm:whitespace-nowrap sm:text-[40px]">
          Up and running in 4 simple steps
        </h2>
        <p className="mx-auto max-w-[52ch] text-[18px] text-muted-foreground leading-[1.6]">
          Connect your channels once and effortlessly handle the day-to-day
          client communications
        </p>
      </div>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        data-reveal-group
      >
        {STEPS.map((s) => (
          <div
            key={s.num}
            data-reveal-item
            className="rounded-2xl border border-muted-foreground/15 bg-white p-6 shadow-[0_1px_2px_rgba(16,34,51,0.04)]"
          >
            <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-primary font-extrabold text-[18px] text-white">
              {s.num}
            </div>
            <h3 className="mb-1.5 font-bold text-[18px] tracking-[-0.01em]">
              {s.title}
            </h3>
            <p className="text-[#596B75] text-[14.5px] leading-[1.55]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
