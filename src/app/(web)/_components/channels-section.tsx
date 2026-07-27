const BOARD_COLUMNS = [
  {
    label: "Docs pending",
    client: "Mehta Traders",
    tag: "GSTR-3B",
    tagColor: "#B45309",
  },
  {
    label: "In review",
    client: "Nexa Pvt",
    tag: "TDS 26Q",
    tagColor: "#2563EB",
  },
  { label: "Filed", client: "S. Kapoor", tag: "ITR ✓", tagColor: "#1E8E5A" },
];

const TIMELINE_STEPS = [
  {
    label: "Request sent",
    meta: "WhatsApp · Mon 9:02 AM",
    state: "done" as const,
  },
  {
    label: "Invoices received",
    meta: "Auto-filed · Mon 2:14 PM",
    state: "done" as const,
  },
  {
    label: "Reminder for bank statement",
    meta: "Scheduled · Wed 10:00 AM",
    state: "active" as const,
  },
  {
    label: "Ready to file",
    meta: "Pending 1 document",
    state: "todo" as const,
  },
];

const BLURBS = [
  {
    title: "Auto-collected documents",
    body: "Clients upload in chat; files are named and filed against the right client and task.",
  },
  {
    title: "Custom statuses",
    body: 'Track a task from "docs pending" to "in review" to "filed" as your team works.',
  },
  {
    title: "Full transparency",
    body: "Partners see the whole firm's client communication and deadlines at a glance.",
  },
];

const DOT_COLOR: Record<(typeof TIMELINE_STEPS)[number]["state"], string> = {
  done: "#1E8E5A",
  active: "#2563EB",
  todo: "transparent",
};

const ChannelsSection = () => {
  return (
    <section
      id="channels"
      className="mx-auto max-w-[1160px] px-6 pt-20 pb-5 text-center sm:px-10"
    >
      <div
        data-reveal
        className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]"
      >
        Every channel, one place
      </div>
      <h2
        data-reveal-heading
        className="mx-auto mt-4 max-w-[720px] font-extrabold text-[32px] leading-[1.08] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
      >
        Track every conversation, document and deadline
      </h2>
      <p
        data-reveal
        className="mx-auto mt-4.5 max-w-[600px] text-[#475569] text-[18px] leading-[1.55]"
      >
        WhatsApp flows into one board, so nothing slips between threads or team
        members.
      </p>

      <div
        data-reveal-group
        className="mt-11 grid grid-cols-1 gap-5.5 text-left md:grid-cols-2"
      >
        <div
          data-reveal-item
          className="rounded-[18px] border border-[#E9EDF3] bg-white p-5.5 shadow-[0_18px_40px_-26px_rgba(16,34,51,0.2)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-extrabold text-[14px]">Compliance board</span>
            <span className="rounded-[7px] bg-[#EFF4FF] px-2.5 py-1 font-bold text-[11px] text-primary">
              This week
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {BOARD_COLUMNS.map((col) => (
              <div key={col.label}>
                <div className="mb-2 font-bold text-[#94A3B8] text-[11px]">
                  {col.label}
                </div>
                <div className="rounded-[10px] border border-[#EEF2F7] bg-[#F8FAFC] p-2.75 font-bold text-[12px]">
                  {col.client}
                  <div
                    className="mt-1.25 font-semibold text-[10.5px]"
                    style={{ color: col.tagColor }}
                  >
                    {col.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2.5 border-[#F1F5F9] border-t pt-3.5 text-[#64748B] text-[12.5px]">
            <span className="flex size-7 items-center justify-center rounded-[8px] bg-[#EAF6F0] font-extrabold text-[#1E8E5A] text-[10px]">
              ZIP
            </span>
            Docs auto-filed against the right client &amp; task
          </div>
        </div>

        <div
          data-reveal-item
          className="rounded-[18px] border border-[#E9EDF3] bg-white p-5.5 shadow-[0_18px_40px_-26px_rgba(16,34,51,0.2)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-extrabold text-[14px]">
              Mehta Traders · GSTR-3B
            </span>
            <span className="rounded-[7px] bg-[#FEF3C7] px-2.5 py-1 font-bold text-[#B45309] text-[11px]">
              Docs pending
            </span>
          </div>
          <div className="flex flex-col">
            {TIMELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className="size-3.5 rounded-full"
                    style={{
                      background: DOT_COLOR[step.state],
                      border:
                        step.state === "todo" ? "2px solid #CBD5E1" : undefined,
                    }}
                  />
                  {i < TIMELINE_STEPS.length - 1 && (
                    <span className="w-0.5 flex-1 bg-[#E2E8F0]" />
                  )}
                </div>
                <div className="pb-4">
                  <div
                    className={
                      step.state === "todo"
                        ? "font-bold text-[#94A3B8] text-[13px]"
                        : "font-bold text-[13px]"
                    }
                  >
                    {step.label}
                  </div>
                  <div className="text-[#94A3B8] text-[11.5px]">
                    {step.meta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        data-reveal-group
        className="mt-11 grid grid-cols-1 gap-5.5 text-left sm:grid-cols-3"
      >
        {BLURBS.map((b) => (
          <div
            key={b.title}
            data-reveal-item
            className="rounded-2xl border border-[#EEF2F7] bg-[#F8FAFC] p-6.5 transition-[transform,box-shadow,border-color,background] hover:-translate-y-1.25 hover:border-[#C7D2FE] hover:bg-white hover:shadow-[0_20px_38px_-20px_rgba(15,23,42,0.18)]"
          >
            <h3 className="font-bold text-[22px]">{b.title}</h3>
            <p className="mt-2.5 text-[#475569] text-[15px] leading-[1.55]">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChannelsSection;
