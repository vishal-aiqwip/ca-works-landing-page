import { Star } from "lucide-react";

const QUOTES = [
  {
    text: '"My juniors used to spend half their day answering ‘is it filed yet?’ on WhatsApp. CA Works just… handles it now."',
    name: "Lalit Gupta",
    firm: "RNC Fintax",
    initials: "LG",
  },
  {
    text: '"Document collection went from a week of chasing to a day. Clients reply to the AI faster than they reply to me."',
    name: "Avinash Tripathi",
    firm: "CA Avinash Tripathi",
    initials: "AT",
  },
  {
    text: '"Payments come in faster because the reminders never stop and never feel rude. It pays for itself."',
    name: "Kaushal Kabra",
    firm: "Kaushal Kabra & Co",
    initials: "KK",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-[1080px] px-4 py-12 sm:px-6 sm:py-21 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mb-3 font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
          Loved by practitioners
        </div>
        <h2 className="font-extrabold text-[30px] leading-[1.1] tracking-[-0.025em] sm:text-[42px]">
          What CA firms say
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {QUOTES.map((q) => (
          <div
            key={q.name}
            className="flex flex-col rounded-[18px] border border-[#E9EEF4] bg-white p-7 shadow-[0_1px_2px_rgba(16,34,51,0.04)]"
          >
            <div className="mb-3.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-star rating, order never changes
                <Star key={i} size={16} fill="#F5A623" stroke="#F5A623" />
              ))}
            </div>
            <p className="mb-5 flex-1 font-medium text-[#2C3A45] text-[15px] leading-[1.6]">
              {q.text}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex size-[42px] items-center justify-center rounded-full bg-[#ECF3FE] font-extrabold text-[#0464E4] text-[14px]">
                {q.initials}
              </div>
              <div>
                <div className="font-bold text-[14px]">{q.name}</div>
                <div className="font-semibold text-[12px] text-muted-foreground/60">
                  {q.firm}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
