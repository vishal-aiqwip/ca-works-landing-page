import { Heart, Star } from "lucide-react";

const QUOTES = [
  {
    name: "Lalit Gupta",
    firm: "RNC Fintax",
    initials: "LG",
    from: "#60A5FA",
    to: "#2563EB",
    text: "My juniors used to spend half their day answering 'is it filed yet?' on WhatsApp. CA Works just… handles it now.",
  },
  {
    name: "Avinash Tripathi",
    firm: "CA Avinash Tripathi",
    initials: "AT",
    from: "#34D399",
    to: "#059669",
    text: "Document collection went from a week of chasing to a day. Clients reply to the AI faster than they reply to me.",
  },
  {
    name: "Kaushal Kabra",
    firm: "Kaushal Kabra & Co",
    initials: "KK",
    from: "#F472B6",
    to: "#DB2777",
    text: "Payments come in faster because the reminders never stop and never feel rude. It pays for itself.",
  },
  {
    name: "SAR Associates",
    firm: "Tax practice, Hyderabad",
    initials: "SA",
    from: "#FBBF24",
    to: "#D97706",
    text: "Finally, one place for every WhatsApp thread. Nothing slips between the team any more.",
  },
  {
    name: "Verma LLP",
    firm: "CA firm, Pune",
    initials: "VL",
    from: "#818CF8",
    to: "#4F46E5",
    text: "The AI drafts replies in our firm's voice — we just review and approve. Huge time saver at peak season.",
  },
  {
    name: "Fintax Co",
    firm: "Accounting firm, Mumbai",
    initials: "FC",
    from: "#2DD4BF",
    to: "#0891B2",
    text: "We got back 10+ hours a week per staff member. That's a whole extra day of real work.",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-20 pb-5 sm:px-10">
      <div data-reveal className="mb-12 text-center">
        <div className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]">
          Loved by practitioners
        </div>
        <h2
          data-reveal-heading
          className="mt-3.5 flex items-center justify-center gap-3.5 font-extrabold text-[34px] tracking-[-0.02em] sm:text-[44px] lg:text-[56px]"
        >
          What CA firms say{" "}
          <Heart size={40} className="fill-primary text-primary" />
        </h2>
      </div>
      <div
        data-reveal-group
        className="columns-1 gap-5.5 sm:columns-2 lg:columns-3"
      >
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            data-reveal-item
            className="mb-5.5 break-inside-avoid rounded-2xl border border-[#E2E8F0] p-6 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-[#C7D2FE] hover:shadow-[0_18px_34px_-20px_rgba(15,23,42,0.2)]"
          >
            <div className="mb-3 flex items-center gap-2.75">
              <span
                className="flex size-10.5 items-center justify-center rounded-full font-bold text-[14px] text-white"
                style={{
                  background: `linear-gradient(135deg, ${q.from}, ${q.to})`,
                }}
              >
                {q.initials}
              </span>
              <div>
                <div className="font-bold text-[14.5px]">{q.name}</div>
                <div className="text-[#94A3B8] text-[12.5px]">{q.firm}</div>
              </div>
            </div>
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-star rating, order never changes
                  key={i}
                  size={15}
                  fill="#F59E0B"
                  stroke="#F59E0B"
                />
              ))}
            </div>
            <blockquote className="text-[#1E293B] text-[15.5px] leading-[1.6]">
              "{q.text}"
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
