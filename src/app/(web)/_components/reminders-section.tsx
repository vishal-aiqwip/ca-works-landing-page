import { ArrowRight, Bell } from "lucide-react";

import { BOOKING_URL } from "@/config";

const REMINDERS = [
  { label: "GSTR-3B due in 3 days", width: "70%", dot: "#04BC74" },
  { label: "Bank statements needed", width: "85%", dot: "#2563EB" },
  { label: "Payment of ₹18,000 pending", width: "55%", dot: "#FBBF24" },
];

const RemindersSection = () => {
  return (
    <section className="mx-auto max-w-[1160px] px-6 pt-17.5 pb-10 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-15">
        <div>
          <div
            data-reveal
            className="inline-block rounded-full bg-[#FEF3C7] px-3.5 py-1.5 font-bold text-[#B45309] text-[12px] uppercase tracking-[0.08em]"
          >
            Automated follow-ups
          </div>
          <h2
            data-reveal-heading
            className="mt-4 font-extrabold text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[38px] lg:text-[46px]"
          >
            Reminders that go out on their own
          </h2>
          <p
            data-reveal
            className="mt-4.5 text-[#475569] text-[17px] leading-[1.6]"
          >
            Filing deadlines, missing documents and pending payments need
            constant nudging. CA Works schedules and sends every reminder over
            WhatsApp — so your team never chases by hand again.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-[#0F172A] px-5.5 py-3.5 font-bold text-[15px] text-white"
          >
            See it in action
            <ArrowRight size={16} />
          </a>
        </div>

        <div
          data-reveal-scale
          className="relative rounded-[20px] p-8 sm:p-10"
          style={{
            background:
              "linear-gradient(150deg, #FFEDD5, #FEF3C7 55%, #FCE7F3)",
          }}
        >
          <div className="absolute top-6.5 right-7.5 flex items-center gap-1.75 rounded-full bg-[#0F172A] px-4 py-2.25 font-bold text-[13px] text-white">
            <Bell size={14} />
            Reminders
            <span className="size-1.75 rounded-full bg-[#F87171]" />
          </div>

          <div className="mt-11 flex flex-col gap-3.5">
            {REMINDERS.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.3)]"
              >
                <div className="flex-1">
                  <div className="font-bold text-[14px]">{r.label}</div>
                  <div
                    className="mt-2.25 h-1.5 rounded-[4px] bg-[#EEF2F7]"
                    style={{ width: r.width }}
                  />
                </div>
                <span
                  className="size-8.5 flex-none rounded-full"
                  style={{ background: r.dot }}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 text-center font-bold text-[#0F172A] text-[14px] underline">
            View all reminders
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemindersSection;
