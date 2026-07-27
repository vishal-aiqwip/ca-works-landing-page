import Link from "next/link";

import { ArrowRight } from "lucide-react";

const SIGNALS = [
  { label: "Urgency", group: "SIGNAL", stars: 4 },
  { label: "Client importance", group: "CONTEXT", stars: 5 },
  { label: "Needs a human", group: null, stars: 2 },
];

const TriageSection = () => {
  return (
    <section className="mx-auto max-w-[1160px] px-6 pt-17.5 pb-5 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-15">
        <div
          data-reveal-scale
          className="rounded-[20px] p-8 sm:p-10"
          style={{
            background:
              "linear-gradient(150deg, #DBEAFE, #EFF4FF 45%, #F5F3FF)",
          }}
        >
          <div className="rounded-[14px] bg-white p-6.5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.25)]">
            <div className="mb-5 font-extrabold text-[19px]">
              Message triage
            </div>
            {SIGNALS.map((s, i) => (
              <div key={s.label}>
                {s.group && (
                  <div className="mb-3 font-bold text-[#94A3B8] text-[11px] tracking-[0.06em]">
                    {s.group}
                  </div>
                )}
                <div
                  className={
                    i < SIGNALS.length - 1
                      ? "flex items-center justify-between border-[#F1F5F9] border-b pb-3.5"
                      : "mt-4.5 flex items-center justify-between"
                  }
                >
                  <span className="font-semibold text-[15px]">{s.label}</span>
                  {i < SIGNALS.length - 1 ? (
                    <span className="text-[#F59E0B] text-[16px]">
                      {"★".repeat(s.stars)}
                      {"☆".repeat(5 - s.stars)}
                    </span>
                  ) : (
                    <span className="rounded-[10px] bg-[#0F172A] px-4 py-1.5 font-extrabold text-[14px] text-white">
                      Auto
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            data-reveal
            className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]"
          >
            AI triage
          </div>
          <h2
            data-reveal-heading
            className="mt-4 font-extrabold text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[38px] lg:text-[46px]"
          >
            Every message read, understood and routed
          </h2>
          <p
            data-reveal
            className="mt-4.5 text-[#475569] text-[17px] leading-[1.6]"
          >
            CA Works classifies each incoming message and matches it to the
            right client and task. Routine questions are answered automatically;
            anything sensitive is escalated to your team with full context.
          </p>
          <Link
            href="/#how"
            className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-[#0F172A] px-5.5 py-3.5 font-bold text-[15px] text-white"
          >
            See how it works
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TriageSection;
