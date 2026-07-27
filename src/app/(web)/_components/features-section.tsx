"use client";

import { useEffect, useState } from "react";

import { CheckCircle2, FileText, Search, Sparkles } from "lucide-react";

const FEATURES = [
  {
    soft: "#ECF3FE",
    tint: "#0464E4",
    label: "Unified Inbox",
    title: "One inbox for every client channel",
    body: "WhatsApp and Email for every client, merged into a single thread your whole team can see. Pick up any conversation exactly where it left off, without switching apps, hunting through old messages, or asking a colleague what was already said.",
  },
  {
    soft: "#E2F8EF",
    tint: "#04BC74",
    label: "AI Replies",
    title: "AI replies in your voice",
    body: "Trained on how your firm actually talks to clients, it drafts and sends accurate answers to the questions that repeat every week — filing status, due dates, missing documents — so your team only steps in for what genuinely needs a human.",
  },
  {
    soft: "#FEF1DC",
    tint: "#F5A623",
    label: "Automated Follow-ups",
    title: "Reminders that send themselves",
    body: "Set the schedule once for documents, filing deadlines and pending payments, and CA Works keeps nudging clients on your behalf — politely, consistently, and without anyone on your team having to remember to send it.",
  },
  {
    soft: "#FDE7EB",
    tint: "#FB6A82",
    label: "Document Collection",
    title: "Documents, collected and filed automatically",
    body: "Clients upload straight from the same WhatsApp or Email thread they're already using. Every file is automatically renamed, matched to the right client, and filed against the correct task, so nothing sits unsorted in a downloads folder.",
  },
  {
    soft: "#EAF7F8",
    tint: "#0E8A93",
    label: "Conversation Log",
    title: "A complete, searchable audit trail",
    body: "Every message on every channel is recorded, timestamped and searchable in one place. When a client asks \"didn't we already send that?\" or a partner needs proof a reminder went out, the answer is a search away, not a scroll through someone's phone.",
  },
];

const ENTRANCE = "animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both]";
const STEP_MS = 550;
const HOLD_MS = 1600;
const SWITCH_MS = 350;

/**
 * Cycles through a list of "screens" (each an array of items), revealing one
 * screen's items at a time, holding, then switching to the next screen and
 * looping forever — mirrors ProductDemo's channel-switching behavior.
 */
function useScreenCycle<T>(screens: T[][]) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const runScreen = (idx: number) => {
      if (cancelled) return;
      setScreenIndex(idx);
      setVisible(0);
      const count = screens[idx].length;
      for (let i = 1; i <= count; i++) {
        schedule(() => !cancelled && setVisible(i), i * STEP_MS);
      }
      schedule(
        () => runScreen((idx + 1) % screens.length),
        count * STEP_MS + HOLD_MS + SWITCH_MS,
      );
    };

    runScreen(0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [screens]);

  return { screen: screens[screenIndex], visible };
}

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div className="flex aspect-4/3 flex-col overflow-hidden rounded-2xl border border-[#DCE4F0] bg-white shadow-[0_20px_45px_-24px_rgba(16,34,51,0.35)]">
    <div className="flex items-center gap-2 border-[#F0F3F9] border-b bg-[#FBFCFE] px-3.5 py-2.5">
      <span className="flex gap-1.5">
        <span className="size-2 rounded-full bg-[#FB6A82]" />
        <span className="size-2 rounded-full bg-[#FBBF24]" />
        <span className="size-2 rounded-full bg-[#04BC74]" />
      </span>
      <span className="mx-auto font-bold text-[#7A8893] text-[11px]">
        CA Works
      </span>
      <span className="w-[34px]" />
    </div>
    <div className="flex flex-1 flex-col justify-center gap-2 bg-[#F8FAFD] p-4">
      {children}
    </div>
  </div>
);

const ChatRow = ({
  id,
  bg,
  fg,
  name,
  ago,
  preview,
}: {
  id: string;
  bg: string;
  fg: string;
  name: string;
  ago: string;
  preview: string;
}) => (
  <div
    className={`flex items-center gap-2.5 rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(16,34,51,0.04)] ${ENTRANCE}`}
  >
    <span
      className="flex size-7 flex-none items-center justify-center rounded-full font-bold text-[10px]"
      style={{ background: bg, color: fg }}
    >
      {id}
    </span>
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-bold text-[#1C2A33] text-[12px]">
          {name}
        </span>
        <span className="flex-none text-[#A9B4BD] text-[10px]">{ago}</span>
      </div>
      <div className="truncate text-[#7A8893] text-[11px]">{preview}</div>
    </div>
  </div>
);

const INBOX_SCREENS = [
  [
    {
      id: "ST",
      bg: "#E2F8EF",
      fg: "#04BC74",
      name: "Sharma Textiles",
      ago: "2m",
      preview: "Yes, sure. Here's the zip attached.",
    },
    {
      id: "VC",
      bg: "#ECF3FE",
      fg: "#0464E4",
      name: "Verma & Co",
      ago: "18m",
      preview: "Re: Form 16 issuance query",
    },
    {
      id: "RK",
      bg: "#E2F8EF",
      fg: "#04BC74",
      name: "Rao Kitchens",
      ago: "1h",
      preview: "Payment of ₹18,000 received",
    },
    {
      id: "KC",
      bg: "#ECF3FE",
      fg: "#0464E4",
      name: "Kabra & Co",
      ago: "3h",
      preview: "GST reconciliation sheet attached",
    },
  ],
  [
    {
      id: "PS",
      bg: "#ECF3FE",
      fg: "#0464E4",
      name: "Patel & Sons",
      ago: "5m",
      preview: "Re: TDS return acknowledgement",
    },
    {
      id: "MI",
      bg: "#FDE7EB",
      fg: "#F0506B",
      name: "Mehta Imports",
      ago: "20m",
      preview: "Q1 advance tax — documents required",
    },
    {
      id: "KC",
      bg: "#ECF3FE",
      fg: "#0464E4",
      name: "Kabra & Co",
      ago: "1h",
      preview: "GST reconciliation sheet attached",
    },
  ],
  [
    {
      id: "SA",
      bg: "#FEF1DC",
      fg: "#F5A623",
      name: "S. Agarwal & Associates",
      ago: "6m",
      preview: "Client uploaded Aadhaar + PAN",
    },
    {
      id: "GT",
      bg: "#E2F8EF",
      fg: "#04BC74",
      name: "Gupta Traders",
      ago: "22m",
      preview: "Confirmed: TDS payment done ✓",
    },
    {
      id: "NK",
      bg: "#FDE7EB",
      fg: "#F0506B",
      name: "Nair & Kumar LLP",
      ago: "2h",
      preview: "Query: input tax credit eligibility",
    },
  ],
];

const InboxMockup = () => {
  const { screen, visible } = useScreenCycle(INBOX_SCREENS);
  return (
    <div className="flex flex-col gap-1.5">
      {screen.slice(0, visible).map((r) => (
        <ChatRow key={r.id} {...r} />
      ))}
    </div>
  );
};

type AiStep =
  | { id: string; kind: "incoming"; text: string }
  | { id: string; kind: "typing" }
  | { id: string; kind: "outgoing"; text: string };

const AI_CONVERSATIONS: AiStep[][] = [
  [
    { id: "a-q1", kind: "incoming", text: "When is my GSTR-1 due this month?" },
    { id: "a-t1", kind: "typing" },
    {
      id: "a-a1",
      kind: "outgoing",
      text: "GSTR-1 for June is due on 11 July. Want a reminder set?",
    },
    { id: "a-q2", kind: "incoming", text: "Yes please, and for TDS too." },
    { id: "a-t2", kind: "typing" },
    {
      id: "a-a2",
      kind: "outgoing",
      text: "Done — reminders set for both. You'll get a nudge 3 days before each.",
    },
  ],
  [
    {
      id: "b-q1",
      kind: "incoming",
      text: "Can you send last month's invoice again?",
    },
    { id: "b-t1", kind: "typing" },
    {
      id: "b-a1",
      kind: "outgoing",
      text: "Sure — sending Invoice_June_2026.pdf to this chat now.",
    },
    {
      id: "b-q2",
      kind: "incoming",
      text: "Thanks! Has Verma & Co paid yet?",
    },
    { id: "b-t2", kind: "typing" },
    {
      id: "b-a2",
      kind: "outgoing",
      text: "Not yet — ₹42,000 is still pending since 3 Jul.",
    },
  ],
  [
    {
      id: "c-q1",
      kind: "incoming",
      text: "I haven't received my Form 16 yet.",
    },
    { id: "c-t1", kind: "typing" },
    {
      id: "c-a1",
      kind: "outgoing",
      text: "Apologies for the delay — sending it now, check your inbox in 2 minutes.",
    },
    {
      id: "c-q2",
      kind: "incoming",
      text: "Thanks. Can you also confirm my PAN on file?",
    },
    { id: "c-t2", kind: "typing" },
    {
      id: "c-a2",
      kind: "outgoing",
      text: "Yes — PAN ABCDE1234F, name matches your Aadhaar record.",
    },
  ],
];

const TypingBubble = () => (
  <div
    className={`flex w-fit items-center gap-1 self-start rounded-xl rounded-bl-sm bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)] ${ENTRANCE}`}
  >
    <span className="size-[6px] animate-[wa-blink_1.2s_infinite] rounded-full bg-[#8696A0]" />
    <span
      className="size-[6px] animate-[wa-blink_1.2s_infinite] rounded-full bg-[#8696A0]"
      style={{ animationDelay: ".2s" }}
    />
    <span
      className="size-[6px] animate-[wa-blink_1.2s_infinite] rounded-full bg-[#8696A0]"
      style={{ animationDelay: ".4s" }}
    />
  </div>
);

const AiMockup = () => {
  const [conversationIndex, setConversationIndex] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const runConversation = (idx: number) => {
      if (cancelled) return;
      setConversationIndex(idx);
      setStep(0);
      const steps = AI_CONVERSATIONS[idx];
      let elapsed = 0;
      steps.forEach((s, i) => {
        elapsed += s.kind === "typing" ? 500 : 750;
        schedule(() => !cancelled && setStep(i + 1), elapsed);
      });
      schedule(
        () => runConversation((idx + 1) % AI_CONVERSATIONS.length),
        elapsed + HOLD_MS + SWITCH_MS,
      );
    };

    runConversation(0);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const steps = AI_CONVERSATIONS[conversationIndex];

  return (
    <div className="flex flex-col gap-1.5">
      {steps.slice(0, step).map((s, i) => {
        if (s.kind === "typing") {
          const isCurrent = i === step - 1;
          return isCurrent ? <TypingBubble key={s.id} /> : null;
        }
        if (s.kind === "incoming") {
          return (
            <div
              key={s.id}
              className={`max-w-[80%] self-start rounded-xl rounded-bl-sm bg-white px-3 py-2 text-[#1C2A33] text-[11.5px] shadow-[0_1px_2px_rgba(16,34,51,0.04)] ${ENTRANCE}`}
            >
              {s.text}
            </div>
          );
        }
        return (
          <div key={s.id} className={`flex flex-col items-end gap-1 ${ENTRANCE}`}>
            <div className="flex items-center gap-1 font-bold text-[#04BC74] text-[10px]">
              <Sparkles size={11} />
              AI reply
            </div>
            <div className="max-w-[80%] rounded-xl rounded-br-sm bg-[#0464E4] px-3 py-2 text-[11.5px] text-white shadow-[0_1px_2px_rgba(16,34,51,0.04)]">
              {s.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReminderRow = ({
  title,
  sub,
  on,
}: {
  title: string;
  sub: string;
  on?: boolean;
}) => (
  <div
    className={`flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)] ${ENTRANCE}`}
  >
    <div className="min-w-0">
      <div className="truncate font-bold text-[#1C2A33] text-[12px]">
        {title}
      </div>
      <div className="truncate text-[#7A8893] text-[11px]">{sub}</div>
    </div>
    <span
      className="relative h-[16px] w-7 flex-none rounded-full transition-colors duration-300"
      style={{ background: on ? "#04BC74" : "#DCE4F0" }}
    >
      <span
        className="absolute top-0.5 size-[13px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)] transition-[left] duration-300"
        style={{ left: on ? 15 : 2 }}
      />
    </span>
  </div>
);

const REMINDER_SCREENS = [
  [
    { title: "GSTR-1 filing", sub: "Monthly · 11th", on: true },
    { title: "TDS payment", sub: "Monthly · 7th", on: true },
    { title: "Advance tax", sub: "Quarterly · 15th", on: false },
    { title: "Client payment follow-up", sub: "As needed", on: true },
  ],
  [
    { title: "TDS payment", sub: "Reminder sent to Verma & Co", on: true },
    { title: "GSTR-1 filing", sub: "Reminder sent to 12 clients", on: true },
    { title: "Advance tax", sub: "Scheduled for 15th", on: false },
  ],
  [
    { title: "PF & ESI filing", sub: "Monthly · 15th", on: true },
    { title: "Professional tax", sub: "Monthly · 20th", on: false },
    { title: "Annual ROC filing", sub: "Yearly · 30 Sep", on: true },
  ],
];

const ReminderMockup = () => {
  const { screen, visible } = useScreenCycle(REMINDER_SCREENS);
  return (
    <div className="flex flex-col gap-1.5">
      {screen.slice(0, visible).map((r) => (
        <ReminderRow key={r.title} {...r} />
      ))}
    </div>
  );
};

const FileRow = ({ name }: { name: string }) => (
  <div
    className={`flex items-center gap-2.5 rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(16,34,51,0.04)] ${ENTRANCE}`}
  >
    <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-[#FDE7EB] text-[#FB6A82]">
      <FileText size={14} />
    </span>
    <span className="min-w-0 flex-1 truncate text-[#1C2A33] text-[11.5px]">
      {name}
    </span>
    <span className="flex flex-none items-center gap-1 text-[#04BC74] text-[10px]">
      <CheckCircle2 size={12} />
      Filed
    </span>
  </div>
);

const FILE_SCREENS = [
  [
    "PAN_Card_VermaCo.pdf",
    "Bank_Statement_Q1.pdf",
    "GST_Invoice_June.pdf",
    "TDS_Challan_Q1.pdf",
  ],
  ["Form16_MehtaImports.pdf", "Rent_Agreement.pdf", "Salary_Slips_Q1.pdf"],
  [
    "Aadhaar_NairKumar.pdf",
    "ITC_Reconciliation.xlsx",
    "Partnership_Deed.pdf",
  ],
];

const DocumentMockup = () => {
  const { screen, visible } = useScreenCycle(FILE_SCREENS);
  return (
    <div className="flex flex-col gap-1.5">
      {screen.slice(0, visible).map((name) => (
        <FileRow key={name} name={name} />
      ))}
    </div>
  );
};

const LogRow = ({ time, text }: { time: string; text: string }) => (
  <div
    className={`flex items-start gap-2.5 rounded-lg bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(16,34,51,0.04)] ${ENTRANCE}`}
  >
    <span className="mt-px flex-none text-[#A9B4BD] text-[10px]">{time}</span>
    <span className="min-w-0 flex-1 truncate text-[#1C2A33] text-[11.5px]">
      {text}
    </span>
  </div>
);

const LOG_SCREENS = [
  [
    { time: "09:14", text: "Reminder sent · TDS due 7 Jul" },
    { time: "11:02", text: "Document received: GST_Invoice.pdf" },
    { time: "14:40", text: "AI replied to filing status query" },
    { time: "16:05", text: "Payment confirmation logged" },
  ],
  [
    { time: "10:22", text: "Client uploaded PAN card" },
    { time: "12:47", text: "Follow-up sent · Advance tax" },
    { time: "15:10", text: "Query resolved via AI reply" },
  ],
  [
    { time: "08:05", text: "New client onboarded: Gupta Traders" },
    { time: "13:30", text: "Reminder sent · PF filing due 15th" },
    { time: "17:45", text: "Document filed: ITC_Reconciliation.xlsx" },
  ],
];

const LogMockup = () => {
  const { screen, visible } = useScreenCycle(LOG_SCREENS);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)]">
        <Search size={12} className="text-[#A9B4BD]" />
        <span className="text-[#A9B4BD] text-[11px]">
          Search conversations…
        </span>
      </div>
      {screen.slice(0, visible).map((r) => (
        <LogRow key={r.time} {...r} />
      ))}
    </div>
  );
};

const MOCKUPS = [InboxMockup, AiMockup, ReminderMockup, DocumentMockup, LogMockup];

const FeaturesSection = () => {
  return (
    <section id="features" className="mx-auto max-w-[95%] px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div data-reveal className="mx-auto mb-16 max-w-[54ch] text-center">
        <div className="mb-3 font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
          Features
        </div>
        <h2 className="font-medium text-[19px] text-muted-foreground leading-[1.55] tracking-[-0.005em]">
          Everything client communication needs
        </h2>
      </div>
      <div className="flex flex-col gap-16 sm:gap-24" data-reveal-group>
        {FEATURES.map((f, i) => {
          const Mockup = MOCKUPS[i];
          const imageBlock = (
            <div className="rounded-[28px] p-6" style={{ background: f.soft }}>
              <Frame>
                <Mockup />
              </Frame>
            </div>
          );
          const textBlock = (
            <div>
              <div
                className="mb-3 font-extrabold text-[13px] uppercase tracking-[0.1em]"
                style={{ color: f.tint }}
              >
                {f.label}
              </div>
              <h3 className="mb-4 font-bold text-2xl tracking-[-0.02em] md:text-[28px]">
                {f.title}
              </h3>
              <p className="text-[17px] text-muted-foreground leading-[1.6]">
                {f.body}
              </p>
            </div>
          );
          return (
            <div
              key={f.title}
              data-reveal-item
              className="grid grid-cols-1 items-center gap-8 sm:gap-14 md:grid-cols-2"
            >
              {i % 2 === 0 ? (
                <>
                  {imageBlock}
                  {textBlock}
                </>
              ) : (
                <>
                  {textBlock}
                  {imageBlock}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
