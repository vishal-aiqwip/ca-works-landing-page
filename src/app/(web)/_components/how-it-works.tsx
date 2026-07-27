const STEPS = [
  {
    num: "1",
    title: "Connect your channels",
    body: "Link your firm's WhatsApp Business number and email inbox in minutes. No new app for clients to install.",
  },
  {
    num: "2",
    title: "CA Works reads & understands",
    body: "Every incoming message is read, classified and matched to the right client and task automatically.",
  },
  {
    num: "3",
    title: "It replies & acts in your voice",
    body: "Answers routine questions, sends document links, collects uploads and files them — without manual effort.",
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
      id="how"
      className="mx-auto max-w-[1160px] px-6 pt-17.5 pb-5 text-center sm:px-10"
    >
      <div
        data-reveal
        className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]"
      >
        How it works
      </div>
      <h2
        data-reveal-heading
        className="mx-auto mt-4 max-w-[640px] font-extrabold text-[32px] leading-[1.05] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
      >
        Up and running in 4 simple steps
      </h2>
      <p
        data-reveal
        className="mx-auto mt-4.5 max-w-[560px] text-[#475569] text-[18px] leading-[1.55]"
      >
        Connect your channels once and effortlessly handle the day-to-day client
        communication.
      </p>
      <div
        data-reveal-group
        className="mt-12 grid grid-cols-1 gap-5.5 text-left sm:grid-cols-2 lg:grid-cols-4"
      >
        {STEPS.map((s) => (
          <div
            key={s.num}
            data-reveal-item
            className="rounded-2xl border border-[#E2E8F0] p-6.5 transition-[transform,box-shadow,border-color] hover:-translate-y-1.25 hover:border-[#C7D2FE] hover:shadow-[0_20px_38px_-20px_rgba(15,23,42,0.2)]"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-[#0F172A] font-extrabold text-[16px] text-white">
              {s.num}
            </div>
            <h3 className="mt-4.5 mb-2 font-bold text-[18px]">{s.title}</h3>
            <p className="text-[#475569] text-[14.5px] leading-[1.55]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
