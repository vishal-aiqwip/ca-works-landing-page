import { BOOKING_URL } from "@/config";

const PILLS = [
  {
    title: "Unified inbox",
    body: "WhatsApp + Email for every client, in one thread.",
    active: false,
  },
  // {
  //   title: "AI replies",
  //   body: "Accurate answers to routine questions, in your voice.",
  //   active: true,
  // },
  {
    title: "Automated follow-ups",
    body: "Reminders for documents, deadlines and payments.",
    active: false,
  },
  {
    title: "Document collection",
    body: "Uploads auto-named and filed against the right client.",
    active: false,
  },
];

const REMINDERS = [
  {
    color: "#22C55E",
    label: "GSTR-3B due in 3 days",
    meta: "WhatsApp + Email",
  },
  {
    color: "#2563EB",
    label: "Bank statements needed · Nexa Pvt",
    meta: "Sent",
  },
  { color: "#FBBF24", label: "Payment of ₹18,000 pending", meta: "Link sent" },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative mt-5 bg-[url('/images/landing/features-bg.jpg')] bg-center bg-cover"
    >
      <div className="relative z-10 mx-auto max-w-[1160px] px-6 py-19 text-center sm:px-10 sm:py-24">
        <div
          data-reveal
          className="inline-block rounded-full bg-white/90 px-3.5 py-1.5 font-bold text-[#1D4ED8] text-[12px] uppercase tracking-[0.08em]"
        >
          Features
        </div>
        <h2
          data-reveal-heading
          className="mx-auto mt-4 max-w-[640px] font-extrabold text-[32px] text-white leading-[1.08] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
        >
          Everything client communication needs
        </h2>
        <p
          data-reveal
          className="mx-auto mt-4.5 max-w-[560px] text-[#EAF1FF] text-[18px] leading-[1.55]"
        >
          Read, reply, collect and remind — across every channel, so your team
          doesn't have to.
        </p>

        <div
          data-reveal-group
          className="mt-11 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {PILLS.map((p) => (
            <div
              key={p.title}
              data-reveal-item
              className={
                p.active
                  ? "rounded-[14px] border border-[#C7D2FE] bg-[#EFF4FF] p-5"
                  : "rounded-[14px] border border-[#E2E8F0] bg-white p-5 transition-[transform,box-shadow,border-color] hover:border-[#C7D2FE] hover:shadow-[0_12px_26px_-16px_rgba(15,23,42,0.18)]"
              }
            >
              <div
                className={
                  p.active
                    ? "font-bold text-[16px] text-primary"
                    : "font-bold text-[16px]"
                }
              >
                {p.title}
              </div>
              <p className="mt-2.5 text-[#475569] text-[14px] leading-[1.5]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div
          data-reveal-group
          className="mt-11 grid grid-cols-1 gap-4.5 text-left lg:grid-cols-[1.5fr_1fr_1fr]"
        >
          <div
            data-reveal-item
            className="flex flex-col rounded-[18px] border border-[#E9EDF3] bg-white p-5.5 shadow-[0_18px_40px_-26px_rgba(16,34,51,0.2)] lg:row-span-2"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex size-8.5 items-center justify-center rounded-[9px] bg-[#EAF6F0] font-extrabold text-[#1E8E5A] text-[12px]">
                ST
              </span>
              <div>
                <div className="font-bold text-[14px]">Sharma Textiles</div>
                <div className="flex items-center gap-1.5 text-[#94A3B8] text-[11.5px]">
                  <span className="size-1.75 rounded-full bg-[#22C55E]" />
                  WhatsApp · online
                </div>
              </div>
              <span className="ml-auto rounded-md bg-[#E6F5EC] px-2.5 py-0.5 font-bold text-[#1E8E5A] text-[10.5px]">
                Resolved
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              <div className="max-w-[82%] self-start rounded-[13px] rounded-bl-[4px] bg-[#F1F5F9] px-3.5 py-2.5 text-[#334155] text-[13px]">
                Could you share the March sales invoices for GSTR-3B?
              </div>
              <div className="max-w-[82%] self-end rounded-[13px] rounded-br-[4px] bg-[#0F172A] px-3.5 py-2.5 text-[13px] text-white">
                Sure — sending them now. Zip attached.
              </div>
              <div className="max-w-[88%] self-start rounded-[13px] border border-[#DBE4FB] bg-[#EFF4FF] px-3.5 py-2.5 font-semibold text-[12px] text-primary">
                CA Works AI · matched to GSTR-3B, client notified
              </div>
              <div className="max-w-[82%] self-start rounded-[13px] rounded-bl-[4px] bg-[#F1F5F9] px-3.5 py-2.5 text-[#334155] text-[13px]">
                Also, is my advance tax paid for this quarter?
              </div>
              <div className="max-w-[82%] self-end rounded-[13px] rounded-br-[4px] bg-[#0F172A] px-3.5 py-2.5 text-[13px] text-white">
                Yes — ₹42,000 paid on 15 Jun. Receipt shared. 👍
              </div>
            </div>
          </div>

          <div
            data-reveal-item
            className="rounded-[18px] border border-[#E9EDF3] bg-white p-5.5 shadow-[0_18px_40px_-26px_rgba(16,34,51,0.2)]"
          >
            <div className="font-semibold text-[#94A3B8] text-[12px]">
              Auto-resolved
            </div>
            <div className="mt-0.5 font-extrabold text-[40px] tracking-[-0.02em]">
              92%
            </div>
            <div className="mb-3 font-bold text-[#1E8E5A] text-[12px]">
              of routine questions
            </div>
            <div className="flex h-11 items-end gap-1.25">
              {[40, 55, 48, 72, 88, 100].map((h, i) => (
                <span
                  key={`bar-${h}`}
                  className="flex-1 rounded-[3px] bg-primary"
                  style={{ height: `${h}%`, opacity: 0.35 + (i / 6) * 0.65 }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border border-[#0F172A] bg-[#0F172A] p-5.5 text-white shadow-[0_18px_40px_-26px_rgba(16,34,51,0.3)]">
            <div className="font-semibold text-[#94A3B8] text-[12px]">
              Documents collected in
            </div>
            <div className="mt-0.5 font-extrabold text-[40px] text-white tracking-[-0.02em]">
              1 day
            </div>
            <div className="mb-3.5 font-bold text-[#93C5FD] text-[12px]">
              not a week of chasing
            </div>
            <div className="flex items-center gap-2.5 rounded-[10px] bg-[#1E293B] px-2.75 py-2.25">
              <span className="flex size-7 items-center justify-center rounded-[7px] bg-[#EF476F] font-extrabold text-[9px] text-white">
                ZIP
              </span>
              <div>
                <div className="font-bold text-[12px] text-white">
                  March-Invoices.zip
                </div>
                <div className="text-[#94A3B8] text-[10.5px]">
                  auto-filed · 14 files
                </div>
              </div>
            </div>
          </div>

          <div
            data-reveal-item
            className="rounded-[18px] border border-[#E9EDF3] bg-white p-5 shadow-[0_18px_40px_-26px_rgba(16,34,51,0.2)] lg:col-span-2"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-extrabold text-[13px]">
                Automated reminders
              </span>
              <span className="rounded-md bg-[#FEF3C7] px-2.5 py-0.5 font-bold text-[#B45309] text-[11px]">
                3 scheduled
              </span>
            </div>
            {REMINDERS.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2.75 border-[#F1F5F9] border-t py-2.25 text-[13px]"
              >
                <span
                  className="size-2.25 flex-none rounded-full"
                  style={{ background: r.color }}
                />
                <span className="flex-1 font-semibold">{r.label}</span>
                <span className="text-[#94A3B8] text-[11px]">{r.meta}</span>
              </div>
            ))}
          </div>
        </div>

        <p
          data-reveal
          className="mx-auto mt-8.5 max-w-[640px] text-[#EAF1FF] text-[15px] leading-[1.5]"
        >
          Happy to keep chasing documents across a dozen chat groups?{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-white underline"
          >
            CA Works is not for you
          </a>
          . Keep typing every reminder by hand.
        </p>
      </div>
    </section>
  );
};

export default FeaturesSection;
