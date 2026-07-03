"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

type Channel = "wa" | "em" | "rm" | "doc";

const CYCLE_MS = 21400;

const WA_ROWS = [
  {
    id: "ST",
    bg: "#ECF3FE",
    fg: "#0464E4",
    name: "Sharma Textiles",
    ago: "2m",
    preview: "Yes, sure. Here is the zip attached.",
    active: true,
  },
  {
    id: "VC",
    bg: "#FEF1DC",
    fg: "#F5A623",
    name: "Verma & Co",
    ago: "18m",
    preview: "Uploaded bank statements ✓",
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
    id: "MI",
    bg: "#FDE7EB",
    fg: "#F0506B",
    name: "Mehta Imports",
    ago: "3h",
    preview: "Reminder sent · TDS due 7 Jul",
  },
];

const EM_ROWS = [
  {
    id: "MI",
    bg: "#FDE7EB",
    fg: "#F0506B",
    name: "Mehta Imports",
    ago: "5m",
    preview: "Q1 advance tax — documents required",
    active: true,
  },
  {
    id: "VC",
    bg: "#FEF1DC",
    fg: "#F5A623",
    name: "Verma & Co",
    ago: "40m",
    preview: "Re: Form 16 issuance query",
  },
  {
    id: "KC",
    bg: "#ECF3FE",
    fg: "#0464E4",
    name: "Kabra & Co",
    ago: "2h",
    preview: "GST reconciliation sheet attached",
  },
  {
    id: "PS",
    bg: "#E2F8EF",
    fg: "#04BC74",
    name: "Patel & Sons",
    ago: "5h",
    preview: "Re: TDS return acknowledgement",
  },
];

const RM_GROUPS = [
  {
    label: "Monthly",
    items: [
      {
        title: "GSTR-1 & GSTR-3B filing",
        sub: "Monthly · 11th & 20th",
        active: true,
        soft: "#ECF3FE",
        tint: "#0464E4",
      },
      {
        title: "TDS payment",
        sub: "Monthly · 7th",
        soft: "#E2F8EF",
        tint: "#04BC74",
      },
    ],
  },
  {
    label: "Quarterly",
    items: [
      {
        title: "TDS return (Form 26Q)",
        sub: "Quarterly · 31 Jul, Oct, Jan, May",
        soft: "#FEF1DC",
        tint: "#F5A623",
      },
      {
        title: "Advance tax instalment",
        sub: "Quarterly · 15 Jun, Sep, Dec, Mar",
        soft: "#FDE7EB",
        tint: "#F0506B",
      },
    ],
  },
  {
    label: "Yearly",
    items: [
      {
        title: "Income-tax return (ITR)",
        sub: "Yearly · 31 Jul",
        soft: "#EEF0FF",
        tint: "#6C5CE7",
      },
      {
        title: "Statutory & tax audit",
        sub: "Yearly · 30 Sep",
        soft: "#EAF7F8",
        tint: "#0E8A93",
      },
    ],
  },
];

const DOC_FOLDERS = [
  { id: "ST", name: "Sharma Textiles", count: 24, soft: "#ECF3FE", tint: "#0464E4" },
  { id: "VC", name: "Verma & Co", count: 18, soft: "#FEF1DC", tint: "#F5A623" },
  { id: "RK", name: "Rao Kitchens", count: 12, soft: "#E2F8EF", tint: "#04BC74" },
  { id: "MI", name: "Mehta Imports", count: 31, soft: "#FDE7EB", tint: "#F0506B" },
  { id: "KC", name: "Kabra & Co", count: 9, soft: "#EEF0FF", tint: "#6C5CE7" },
];

const DOC_FILES = [
  { name: "Invoice-2026-031.pdf", size: "184 KB", date: "28 Mar 2026", tint: "#F0506B", soft: "#FDE7EB" },
  { name: "Invoice-2026-024.pdf", size: "192 KB", date: "14 Mar 2026", tint: "#F0506B", soft: "#FDE7EB" },
  { name: "Invoice-2026-018.pdf", size: "176 KB", date: "02 Mar 2026", tint: "#F0506B", soft: "#FDE7EB" },
  { name: "Invoice-2026-009.pdf", size: "188 KB", date: "18 Feb 2026", tint: "#F0506B", soft: "#FDE7EB" },
  { name: "Sales-Register-Q4.xlsx", size: "640 KB", date: "10 Apr 2026", tint: "#04BC74", soft: "#E2F8EF" },
  { name: "Bank-Statement-Mar.pdf", size: "1.2 MB", date: "03 Apr 2026", tint: "#0464E4", soft: "#ECF3FE" },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A9B4BD" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="#04BC74">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 0 1 12 4zm-2.3 3.6c-.2 0-.5 0-.7.4-.2.4-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.8 2.7.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.1-1.4-.5-.6-.9-1.2-1-1.4-.1-.2 0-.3.1-.4l.4-.4c.1-.1.1-.3.2-.4 0-.2 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4z" />
    </svg>
  );
}

function EmailIcon({ color = "#0464E4" }: { color?: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ClockIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FolderOrDocsIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FolderIconLg() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FormsIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C2CCD6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C2CCD6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function FileIcon({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2v6h6" />
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    </svg>
  );
}

function ZipIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04A884" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function Tick({ color }: { color: string }) {
  return (
    <svg aria-hidden="true" width="16" height="11" viewBox="0 0 18 18" className="mt-px">
      <path
        fill={color}
        d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609z"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </svg>
  );
}

function LikeIcon() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8696A0" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIconWA() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="#fff">
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function SendIconSmall() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="#fff">
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

function MoreVerticalIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0464E4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function ArchiveInboxIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v6a2 2 0 0 0 2 2h2l3 3V4L7 7H5a2 2 0 0 0-2 0z" />
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 17V9a2 2 0 0 0-2-2h-7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function NavItem({
  navRef,
  active,
  bounce,
  icon,
  label,
}: {
  navRef: RefObject<HTMLDivElement | null>;
  active: boolean;
  bounce: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      ref={navRef}
      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 font-semibold text-[14px] transition-transform duration-150 ease-out"
      style={{
        background: active ? "#ECF3FE" : "transparent",
        color: active ? "#0464E4" : "#45555F",
        fontWeight: active ? 700 : 600,
        transform: bounce ? "scale(.95)" : "none",
      }}
    >
      <span className="flex size-[18px] flex-none items-center justify-center rounded">{icon}</span>
      {label}
    </div>
  );
}

function ListRow({
  active,
  bg,
  fg,
  initials,
  name,
  ago,
  preview,
}: {
  active?: boolean;
  bg: string;
  fg: string;
  initials: string;
  name: string;
  ago: string;
  preview: string;
}) {
  return (
    <div
      className="flex animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] items-start gap-2.5 px-4.5 py-3.5"
      style={{
        background: active ? "#F6F9FE" : undefined,
        borderLeft: active ? "3px solid #0464E4" : "3px solid transparent",
      }}
    >
      <div
        className="flex size-[38px] flex-none items-center justify-center rounded-full font-extrabold text-[13px]"
        style={{ background: bg, color: fg }}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <span className="font-bold text-[14px]">{name}</span>
          <span className="flex-none font-semibold text-[11px] text-[#A9B4BD]">{ago}</span>
        </div>
        <div className="mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#7A8893]">
          {preview}
        </div>
      </div>
    </div>
  );
}

function EmailFileChip({ name, size }: { name: string; size: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#E4EAF2] bg-[#F7F9FC] px-2.5 py-1.5">
      <span className="flex size-7 flex-none items-center justify-center rounded-md bg-[#ECF3FE]">
        <FileIcon color="#0464E4" />
      </span>
      <span className="min-w-0">
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[#1C2A33] text-[12px]">
          {name}
        </span>
        <span className="block text-[#7A8893] text-[11px]">{size}</span>
      </span>
    </div>
  );
}

function ProductDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const waNavRef = useRef<HTMLDivElement>(null);
  const emNavRef = useRef<HTMLDivElement>(null);
  const rmNavRef = useRef<HTMLDivElement>(null);
  const docNavRef = useRef<HTMLDivElement>(null);
  const pulseIdRef = useRef(0);

  const [channel, setChannel] = useState<Channel>("wa");
  const [navBounce, setNavBounce] = useState<Channel | null>(null);
  const [waStep, setWaStep] = useState(0);
  const [emStep, setEmStep] = useState(0);
  const [docSelected, setDocSelected] = useState(false);
  const [cursor, setCursor] = useState({ left: 120, top: 300, visible: false });
  const [cursorPressed, setCursorPressed] = useState(false);
  const [pulses, setPulses] = useState<{ id: number; left: number; top: number }[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const getPos = (ref: RefObject<HTMLDivElement | null>) => {
      const card = cardRef.current;
      const el = ref.current;
      if (!card || !el) return null;
      const cr = card.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      return { left: er.left - cr.left + 24, top: er.top - cr.top + er.height / 2 - 1 };
    };

    const moveCursorTo = (ref: RefObject<HTMLDivElement | null>) => {
      const pos = getPos(ref);
      if (pos) setCursor({ ...pos, visible: true });
    };

    const spawnPulse = (ref: RefObject<HTMLDivElement | null>) => {
      const pos = getPos(ref);
      if (!pos) return;
      setCursorPressed(true);
      schedule(() => setCursorPressed(false), 200);
      const id = pulseIdRef.current++;
      setPulses((p) => [...p, { id, ...pos }]);
      schedule(() => setPulses((p) => p.filter((x) => x.id !== id)), 520);
    };

    const clickNav = (ref: RefObject<HTMLDivElement | null>, at: number) => {
      schedule(() => moveCursorTo(ref), Math.max(0, at - 950));
      schedule(() => spawnPulse(ref), Math.max(0, at - 130));
    };

    const switchTo = (ch: Channel) => {
      setChannel(ch);
      setWaStep(0);
      setEmStep(0);
      setDocSelected(false);
      setNavBounce(ch);
      schedule(() => setNavBounce(null), 150);
    };

    const runCycle = () => {
      clickNav(waNavRef, 500);
      clickNav(emNavRef, 5300);
      clickNav(rmNavRef, 10100);
      clickNav(docNavRef, 14900);

      switchTo("wa");
      schedule(() => setWaStep(1), 600);
      schedule(() => setWaStep(2), 1700);
      schedule(() => setWaStep(3), 2500);
      schedule(() => setWaStep(4), 4200);

      schedule(() => {
        switchTo("em");
        schedule(() => setEmStep(1), 600);
        schedule(() => setEmStep(2), 2600);
      }, 5300);

      schedule(() => switchTo("rm"), 10100);

      schedule(() => switchTo("doc"), 14900);
      schedule(() => setDocSelected(true), 16600);

      schedule(runCycle, CYCLE_MS);
    };

    runCycle();
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const listTitle =
    channel === "wa" ? "WhatsApp" : channel === "em" ? "Email" : channel === "rm" ? "Reminders" : "Documents";

  return (
    <div className="mx-auto max-w-[1240px] overflow-x-auto px-5 pt-4 pb-16">
      <div
        ref={cardRef}
        className="relative min-w-[900px] overflow-hidden rounded-2xl border border-[#DCE4F0] bg-white shadow-[0_0_0_1px_rgba(16,34,51,0.03),0_30px_70px_-28px_rgba(16,34,51,0.38)]"
      >
        <div className="flex items-center gap-3.5 border-[#F0F3F9] border-b bg-[#FBFCFE] px-4.5 py-3">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#FB6A82]" />
            <span className="size-2.5 rounded-full bg-[#FBBF24]" />
            <span className="size-2.5 rounded-full bg-[#04BC74]" />
          </span>
          <div className="mx-auto flex max-w-[340px] flex-1 items-center justify-center">
            <span className="font-bold text-[#7A8893] text-[13px]">CA Works</span>
          </div>
          <span className="w-[54px]" />
        </div>

        <div className="flex items-center gap-4 border-[#EEF2F8] border-b bg-white px-4.5 py-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-7 items-center justify-center rounded-full font-extrabold text-[10px] text-white tracking-[-0.02em]"
              style={{ background: "#0464E4", boxShadow: "0 4px 12px rgba(4,100,228,.32)" }}
            >
              CA
            </div>
            <span className="font-extrabold text-[#1C2A33] text-[15px] tracking-[-0.01em]">Works</span>
          </div>
          <div className="ml-auto flex flex-[0_1_320px] items-center gap-2 rounded-lg bg-[#F3F6FD] px-3 py-1.5">
            <SearchIcon />
            <span className="text-[#A9B4BD] text-[13px]">Search clients, messages…</span>
          </div>
          <div className="flex items-center gap-3.5">
            <span className="relative flex text-[#7A8893]">
              <BellIcon />
              <span className="absolute top-0 right-0 size-[7px] rounded-full border-[1.5px] border-white bg-[#FB6A82]" />
            </span>
            <span className="flex size-[30px] items-center justify-center rounded-full bg-[#1C2A33] font-bold text-[11px] text-white">
              RM
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute z-40"
          style={{
            left: cursor.left,
            top: cursor.top,
            opacity: cursor.visible ? 1 : 0,
            transition: "left .85s cubic-bezier(.4,0,.2,1), top .85s cubic-bezier(.4,0,.2,1), opacity .3s ease",
          }}
        >
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              display: "block",
              filter: "drop-shadow(0 2px 3px rgba(16,34,51,.32))",
              transform: cursorPressed ? "scale(.82)" : "scale(1)",
              transition: "transform .14s ease",
            }}
          >
            <path
              d="M5 2.5L5 18.4L9.1 14.5L12.1 21.2L14.7 20L11.7 13.4L17 13.2Z"
              fill="#1C2A33"
              stroke="#fff"
              strokeWidth={1.4}
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {pulses.map((p) => (
          <span
            key={p.id}
            className="pointer-events-none absolute z-[39] animate-[cw-click_.5s_ease-out_forwards] rounded-full bg-[#0464E4]"
            style={{ left: p.left, top: p.top, width: 32, height: 32, margin: "-16px 0 0 -16px" }}
          />
        ))}

        <div className="grid min-h-[580px] grid-cols-[250px_1fr_360px]">
          <div className="border-[#F0F3F9] border-r bg-[#FBFCFE] p-3.5">
            <div className="px-2 pb-2.5 font-extrabold text-[#A9B4BD] text-[11px] uppercase tracking-[0.09em]">
              Channels
            </div>
            <div className="flex flex-col gap-0.5">
              <NavItem navRef={waNavRef} active={channel === "wa"} bounce={navBounce === "wa"} icon={<WhatsAppIcon />} label="WhatsApp" />
              <NavItem navRef={emNavRef} active={channel === "em"} bounce={navBounce === "em"} icon={<EmailIcon />} label="Email" />
            </div>
            <div className="px-2 pt-4.5 pb-2.5 font-extrabold text-[#A9B4BD] text-[11px] uppercase tracking-[0.09em]">
              Schedules
            </div>
            <div className="flex flex-col gap-0.5">
              <NavItem navRef={rmNavRef} active={channel === "rm"} bounce={navBounce === "rm"} icon={<ClockIcon size={15} />} label="Reminders" />
            </div>
            <div className="px-2 pt-4.5 pb-2.5 font-extrabold text-[#A9B4BD] text-[11px] uppercase tracking-[0.09em]">
              Drive
            </div>
            <div className="flex flex-col gap-0.5">
              <NavItem navRef={docNavRef} active={channel === "doc"} bounce={navBounce === "doc"} icon={<FolderOrDocsIcon />} label="Documents" />
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 font-semibold text-[#45555F] text-[14px]">
                <FormsIcon />
                Forms
              </div>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden border-[#F0F3F9] border-r">
            <div className="border-[#F0F3F9] border-b px-4.5 py-3.5 font-bold text-[15px]">{listTitle}</div>
            <div className="flex-1 overflow-hidden">
              {channel === "wa" &&
                WA_ROWS.map((r) => (
                  <ListRow key={r.id} active={r.active} bg={r.bg} fg={r.fg} initials={r.id} name={r.name} ago={r.ago} preview={r.preview} />
                ))}
              {channel === "em" &&
                EM_ROWS.map((r) => (
                  <ListRow key={r.id} active={r.active} bg={r.bg} fg={r.fg} initials={r.id} name={r.name} ago={r.ago} preview={r.preview} />
                ))}
              {channel === "rm" &&
                RM_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div className="px-4.5 pt-3.5 pb-1.5 font-extrabold text-[#A9B4BD] text-[11px] uppercase tracking-[0.08em]">
                      {group.label}
                    </div>
                    {group.items.map((item) => (
                      <div
                        key={item.title}
                        className="flex animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] items-center gap-2.5 px-4.5 py-2.5"
                        style={{
                          background: item.active ? "#F6F9FE" : undefined,
                          borderLeft: item.active ? "3px solid #0464E4" : "3px solid transparent",
                        }}
                      >
                        <span
                          className="flex size-[34px] flex-none items-center justify-center rounded-lg"
                          style={{ background: item.soft, color: item.tint }}
                        >
                          <ClockIcon />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-[#1C2A33] text-[13.5px]">{item.title}</div>
                          <div className="mt-px text-[#7A8893] text-[12px]">{item.sub}</div>
                        </div>
                        <span className="relative h-[19px] w-8 flex-none rounded-full bg-[#04BC74]">
                          <span className="absolute top-0.5 right-0.5 size-[15px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              {channel === "doc" &&
                DOC_FOLDERS.map((f) => (
                  <div
                    key={f.id}
                    className="flex animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] items-center gap-3 px-4.5 py-3.5"
                    style={{
                      background: docSelected && f.id === "ST" ? "#F6F9FE" : undefined,
                      borderLeft: docSelected && f.id === "ST" ? "3px solid #0464E4" : "3px solid transparent",
                    }}
                  >
                    <span
                      className="flex size-[38px] flex-none items-center justify-center rounded-lg"
                      style={{ background: f.soft, color: f.tint }}
                    >
                      <FolderIconLg />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-[#1C2A33] text-[14px]">{f.name}</div>
                      <div className="mt-px text-[#7A8893] text-[12px]">{f.count} files</div>
                    </div>
                    <ChevronRightIcon />
                  </div>
                ))}
            </div>
          </div>

          <div
            className="flex flex-col"
            style={{ background: channel === "wa" ? "#EFE7DE" : channel === "em" ? "#fff" : "#FBFCFE" }}
          >
            {channel === "wa" && (
              <>
                <div className="flex items-center gap-2.5 bg-[#008069] px-4 py-2.5">
                  <div className="flex size-[34px] flex-none items-center justify-center rounded-full bg-[rgba(255,255,255,.22)] font-extrabold text-[12px] text-white">
                    ST
                  </div>
                  <div>
                    <div className="font-bold text-[14px] text-white leading-tight">Sharma Textiles</div>
                    <div className="font-medium text-[11px] text-[rgba(255,255,255,.8)]">online</div>
                  </div>
                  <span className="ml-auto flex gap-4.5 text-[rgba(255,255,255,.9)]">
                    <VideoIcon />
                    <MoreVerticalIcon />
                  </span>
                </div>
                <div
                  className="flex min-h-[312px] flex-1 flex-col gap-2 overflow-hidden p-4"
                  style={{ backgroundImage: "radial-gradient(rgba(11,20,26,.04) 1px,transparent 1px)", backgroundSize: "22px 22px" }}
                >
                  {waStep >= 1 && (
                    <div
                      className="animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] self-end rounded-tl-lg rounded-tr-none rounded-br-lg rounded-bl-lg bg-[#D9FDD3] px-2.5 pt-1.5 pb-1 text-[13px] text-[#111B21] leading-[1.4] shadow-[0_1px_.5px_rgba(11,20,26,.13)]"
                      style={{ maxWidth: "80%" }}
                    >
                      Hi, can you please upload the balance invoices for the month of March.
                      <span className="mt-0.5 flex items-center justify-end gap-0.5">
                        <span className="text-[#667781] text-[10px]">10:24</span>
                        <Tick color={waStep >= 2 ? "#53BDEB" : "#8696A0"} />
                      </span>
                    </div>
                  )}
                  {waStep === 3 && (
                    <div className="flex animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] items-center gap-1 self-start rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg bg-white px-3.5 py-2.5 shadow-[0_1px_.5px_rgba(11,20,26,.13)]">
                      <span className="size-[7px] animate-[wa-blink_1.2s_infinite] rounded-full bg-[#8696A0]" />
                      <span className="size-[7px] animate-[wa-blink_1.2s_infinite] rounded-full bg-[#8696A0]" style={{ animationDelay: ".2s" }} />
                      <span className="size-[7px] animate-[wa-blink_1.2s_infinite] rounded-full bg-[#8696A0]" style={{ animationDelay: ".4s" }} />
                    </div>
                  )}
                  {waStep >= 4 && (
                    <div
                      className="animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] self-start rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg bg-white px-2.5 pt-1.5 pb-1 text-[13px] text-[#111B21] leading-[1.4] shadow-[0_1px_.5px_rgba(11,20,26,.13)]"
                      style={{ maxWidth: "82%" }}
                    >
                      Yes, sure. Here is the zip attached. Thanks for reminding!
                      <div className="mt-1.5 flex items-center gap-2.5 rounded-lg border border-[#E3E5E5] bg-[#F5F6F6] px-2.5 py-1.5">
                        <span className="flex size-[30px] flex-none items-center justify-center rounded-md bg-[#E7F4EC]">
                          <ZipIcon />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold text-[#111B21] text-[12px]">March-Invoices.zip</span>
                          <span className="block text-[#667781] text-[11px]">2.4 MB</span>
                        </span>
                      </div>
                      <span className="mt-0.5 block text-right text-[#667781] text-[10px]">10:25</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2.5 bg-[#F0F2F5] px-3.5 py-2.5">
                  <div className="flex flex-1 items-center gap-2.5 rounded-full bg-white px-3.5 py-2.5">
                    <MicIcon />
                    <span className="flex-1 text-[#8696A0] text-[13px]">Edit or send AI reply…</span>
                    <LikeIcon />
                  </div>
                  <button
                    type="button"
                    className="flex size-[42px] flex-none items-center justify-center rounded-full bg-[#008069]"
                  >
                    <SendIconWA />
                  </button>
                </div>
              </>
            )}

            {channel === "em" && (
              <>
                <div className="flex items-start gap-3 border-[#EEF2F8] border-b bg-white px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1C2A33] text-[16px] tracking-[-0.01em]">
                      Q1 advance tax — documents required
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-[#7A8893] text-[12px]">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-[#ECF3FE] px-2 py-0.5 font-semibold text-[#0464E4]">
                        <EmailIcon />
                        Inbox
                      </span>
                      <span>2 messages</span>
                    </div>
                  </div>
                  <span className="mt-0.5 flex flex-none gap-3.5 text-[#A9B4BD]">
                    <ArchiveInboxIcon />
                    <TrashIcon />
                  </span>
                </div>
                <div className="min-h-[300px] flex-1 overflow-hidden bg-white">
                  {emStep >= 1 && (
                    <div className="animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] border-[#EEF2F8] border-b px-5 py-4.5">
                      <div className="flex items-start gap-3">
                        <span className="flex size-[38px] flex-none items-center justify-center rounded-full bg-[#0464E4] font-extrabold text-[12px] text-white">
                          CA
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#1C2A33] text-[14px]">CA Works</span>
                            <span className="font-medium text-[#A9B4BD] text-[11px]">· you</span>
                            <span className="ml-auto flex-none text-[#A9B4BD] text-[11px]">10:24</span>
                          </div>
                          <div className="mt-0.5 text-[#7A8893] text-[11.5px]">to accounts@mehta.co</div>
                          <div className="mt-2.5 text-[#2C3A45] text-[13.5px] leading-[1.62]">
                            Hi team, please share your Q1 bank statements and sales register so we can compute the
                            advance tax due this quarter.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {emStep >= 2 && (
                    <div className="animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] border-[#EEF2F8] border-b border-l-[3px] border-l-[#0464E4] bg-[#F8FBFF] px-5 py-4.5">
                      <div className="flex items-start gap-3">
                        <span className="flex size-[38px] flex-none items-center justify-center rounded-full bg-[#FDE7EB] font-extrabold text-[#F0506B] text-[12px]">
                          MI
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-[#1C2A33] text-[14px]">Mehta Imports</span>
                            <span className="ml-auto flex-none text-[#A9B4BD] text-[11px]">10:26</span>
                          </div>
                          <div className="mt-0.5 text-[#7A8893] text-[11.5px]">to CA Works</div>
                          <div className="mt-2.5 text-[#2C3A45] text-[13.5px] leading-[1.62]">
                            Sure — attaching our Q1 bank statements and sales register. Let me know if anything
                            else is needed.
                          </div>
                          <div className="mt-3.5 flex flex-wrap gap-2">
                            <EmailFileChip name="Bank-Statements-Q1.pdf" size="1.8 MB" />
                            <EmailFileChip name="Sales-Register-Q1.xlsx" size="640 KB" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2.5 border-[#EEF2F8] border-t bg-[#FBFCFE] px-4 py-3">
                  <div className="flex flex-1 items-center gap-2.5 rounded-lg border border-[#E4EAF2] bg-white px-3.5 py-2.5">
                    <SparkleIcon />
                    <span className="flex-1 text-[#8696A0] text-[13px]">Reply with AI…</span>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg bg-[#0464E4] px-4.5 py-2.5 font-bold text-[13px] text-white"
                  >
                    Send
                    <SendIconSmall />
                  </button>
                </div>
              </>
            )}

            {channel === "rm" && (
              <>
                <div className="flex items-center gap-3 border-[#EEF2F8] border-b bg-white px-5.5 py-4.5">
                  <span className="flex size-[42px] flex-none items-center justify-center rounded-lg bg-[#ECF3FE] text-[#0464E4]">
                    <ClockIcon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1C2A33] text-[16px] tracking-[-0.01em]">GSTR-3B filing</div>
                    <div className="mt-0.5 text-[#7A8893] text-[12px]">Automated reminder · Monthly</div>
                  </div>
                  <span className="flex flex-none items-center gap-1.5 font-bold text-[#04BC74] text-[12px]">
                    <span className="size-[7px] rounded-full bg-[#04BC74]" />
                    Active
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3.5 bg-[#FBFCFE] px-5.5 py-5">
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-xl border border-[#EEF2F8] bg-white px-3.5 py-3">
                      <div className="font-bold text-[#A9B4BD] text-[11px] uppercase tracking-[0.06em]">
                        Next reminder
                      </div>
                      <div className="mt-1 font-bold text-[#1C2A33] text-[15px]">18 Jul · 9:00 AM</div>
                    </div>
                    <div className="flex-1 rounded-xl border border-[#EEF2F8] bg-white px-3.5 py-3">
                      <div className="font-bold text-[#A9B4BD] text-[11px] uppercase tracking-[0.06em]">
                        Sent to
                      </div>
                      <div className="mt-1 font-bold text-[#1C2A33] text-[15px]">142 clients</div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#EEF2F8] bg-white px-3.5 py-3.5">
                    <div className="mb-2.5 font-bold text-[#A9B4BD] text-[11px] uppercase tracking-[0.06em]">
                      Delivered over
                    </div>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-white px-2.5 py-1.5 font-bold text-[#1C2A33] text-[12.5px]">
                        <WhatsAppIcon />
                        WhatsApp
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4EAF2] bg-white px-2.5 py-1.5 font-bold text-[#1C2A33] text-[12.5px]">
                        <EmailIcon />
                        Email
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#EEF2F8] bg-white px-3.5 py-3.5">
                    <div className="mb-2.5 font-bold text-[#A9B4BD] text-[11px] uppercase tracking-[0.06em]">
                      Message preview
                    </div>
                    <div className="rounded-lg bg-[#F6F9FE] px-3.5 py-3 text-[#2C3A45] text-[13px] leading-[1.55]">
                      Hi <b>Mehta Imports</b>, a quick reminder that your <b>GSTR-3B for June</b> is due on{" "}
                      <b>20 Jul</b>. Please confirm your sales figures so we can file on time. — CA Works
                    </div>
                  </div>
                </div>
              </>
            )}

            {channel === "doc" && !docSelected && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3.5 bg-[#FBFCFE] p-8 text-center text-[#A9B4BD]">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-[#EEF3FA] text-[#9AA8B4]">
                  <svg aria-hidden="true" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <div className="max-w-[210px] font-semibold text-[14px] leading-[1.5]">
                  Select a client folder to view its documents
                </div>
              </div>
            )}

            {channel === "doc" && docSelected && (
              <>
                <div className="border-[#EEF2F8] border-b bg-white px-5.5 py-4">
                  <div className="mb-2.5 flex items-center gap-1.5 font-semibold text-[#A9B4BD] text-[12px]">
                    <span>Documents</span>
                    <ChevronRightIcon />
                    <span className="text-[#1C2A33]">Sharma Textiles</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-10 flex-none items-center justify-center rounded-lg bg-[#ECF3FE] text-[#0464E4]">
                      <FolderIconLg />
                    </span>
                    <div>
                      <div className="font-bold text-[#1C2A33] text-[16px]">Sharma Textiles</div>
                      <div className="mt-0.5 text-[#7A8893] text-[12px]">24 files · auto-filed by CA Works</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 bg-[#FBFCFE] px-5 py-4">
                  {DOC_FILES.map((f) => (
                    <div
                      key={f.name}
                      className="flex animate-[wa-in_.32s_cubic-bezier(.22,1,.36,1)_both] items-center gap-3 rounded-xl border border-[#EEF2F8] bg-white px-3 py-2.5"
                    >
                      <span
                        className="flex size-[34px] flex-none items-center justify-center rounded-lg"
                        style={{ background: f.soft }}
                      >
                        <FileIcon color={f.tint} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[#1C2A33] text-[13px]">
                          {f.name}
                        </div>
                        <div className="mt-px text-[#7A8893] text-[11.5px]">
                          {f.size} · {f.date}
                        </div>
                      </div>
                      <DownloadIcon />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDemo;
