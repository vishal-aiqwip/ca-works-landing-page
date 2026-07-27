import Link from "next/link";

const FAQS = [
  {
    q: "What is CA Works?",
    a: "CA Works is an AI client-communication layer for chartered accountants that handles conversations, document collection and reminders across Email and WhatsApp.",
  },
  {
    q: "Which channels does it support?",
    a: "WhatsApp Business and email today, unified into a single inbox and thread per client — with more channels on the way.",
  },
  {
    q: "Do my clients need to install anything?",
    a: "No. Clients keep using the WhatsApp and email they already use — CA Works works behind your firm's existing channels.",
  },
  {
    q: "Does the AI send replies on its own?",
    a: "It drafts and sends accurate answers to routine questions in your voice. Anything sensitive is escalated to your team with full context.",
  },
  {
    q: "Is my clients' data secure?",
    a: "Yes. Every conversation is logged, access-controlled and searchable, giving your firm a complete, auditable trail.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo, connect your WhatsApp Business number and inbox in a few minutes, and CA Works starts handling day-to-day communication.",
  },
];

const FaqSection = () => {
  return (
    <section className="mx-auto max-w-[1160px] px-6 pt-17.5 pb-10 sm:px-10">
      <h2
        data-reveal-heading
        className="font-extrabold text-[30px] tracking-[-0.02em] sm:text-[38px] lg:text-[48px]"
      >
        Everything you need to know
      </h2>
      <p className="mt-3.5 mb-11 text-[#475569] text-[17px]">
        If you have anything else you'd like to ask,{" "}
        <Link href="/contact" className="font-semibold">
          reach out to us
        </Link>
        .
      </p>
      <div
        data-reveal-group
        className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FAQS.map((f) => (
          <div key={f.q} data-reveal-item>
            <h3 className="mb-2.5 font-bold text-[18px]">{f.q}</h3>
            <p className="text-[#475569] text-[15px] leading-[1.6]">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
