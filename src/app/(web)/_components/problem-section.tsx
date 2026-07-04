import { Bell, Inbox, ListFilter, Repeat, Shuffle } from "lucide-react";

import { Image } from "@/components";

const PROBLEMS = [
  {
    icon: <Repeat size={24} />,
    soft: "#FDE7EB",
    tint: "#F0506B",
    title: "Endless follow-ups",
    body: "You reach out three, four, five times for one missing document, and still have to ask again next month.",
  },
  {
    icon: <Shuffle size={24} />,
    soft: "#FEF1DC",
    tint: "#F5A623",
    title: "Documents scattered everywhere",
    body: "Clients send files over WhatsApp, email and drive links: unnamed, out of order and easy to lose track of.",
  },
  {
    icon: <ListFilter size={24} />,
    soft: "#ECF3FE",
    tint: "#0464E4",
    title: "Gathering & sorting by hand",
    body: "Collecting attachments, renaming them, filing them against the right client and chasing what's still missing. Hours gone.",
  },
  {
    icon: <Bell size={26} />,
    soft: "#FEF1DC",
    tint: "#F5A623",
    title: "Reminders typed out one by one",
    body: "Filing deadlines and pending payments need constant nudging, and every message is written and sent manually.",
  },
  {
    icon: <Inbox size={24} />,
    soft: "#FDE7EB",
    tint: "#F0506B",
    title: "It simply doesn't scale",
    body: "Hundreds of clients across every channel, and no team can handle all of that communication manually without things slipping.",
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[95%] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-4.5 text-center font-extrabold text-[#F0506B] text-[13px] uppercase tracking-[0.1em]">
          The problem
        </div>
        <p className="mx-auto mb-[46px] max-w-[56ch] text-center text-[19px] text-muted-foreground leading-[1.55]">
          Your team is losing time following up for documents, sending reminders
          and answering questions.
        </p>
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="flex flex-col gap-7">
            <div
              data-reveal
              className="relative min-h-[400px] flex-1 overflow-hidden rounded-2xl"
            >
              <Image
                src="/images/team.webp"
                alt="CA team at work"
                fill
                quality={100}
                className="object-cover"
              />
            </div>
            <div data-reveal>
              <h2 className="mb-4 font-bold text-foreground text-xl leading-[1.14] tracking-[-0.025em] md:text-[34px]">
                Manual client communication is eating your team's day
              </h2>
              <p className="text-[17px] text-muted-foreground leading-[1.6]">
                Every return, every client, every month: the same chasing,
                collecting and reminding. Done by hand, it never ends and never
                scales.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3.5" data-reveal-group>
            {PROBLEMS.map((p) => (
              <div
                key={p.title}
                data-reveal-item
                className="flex gap-4 rounded-2xl border border-muted-foreground/15 bg-white p-5.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)]"
              >
                <div
                  className="flex size-11 flex-none items-center justify-center rounded-xl"
                  style={{ background: p.soft, color: p.tint }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 font-bold text-[17px]">{p.title}</h3>
                  <p className="text-[#596B75] text-[14.5px] leading-[1.55]">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
