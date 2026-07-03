import { Bell, FileText, History, Inbox, Sparkles } from "lucide-react";

import { Image } from "@/components";

const FEATURES = [
  {
    icon: <Inbox size={24} />,
    soft: "#ECF3FE",
    tint: "#0464E4",
    title: "Unified multi-channel inbox",
    body: "WhatsApp and Email for every client in one thread. No more switching apps or losing context.",
  },
  {
    icon: <Sparkles size={24} />,
    soft: "#E2F8EF",
    tint: "#04BC74",
    title: "AI replies in your voice",
    body: "Drafts and sends accurate answers to routine questions — filing status, due dates, document requests.",
  },
  {
    icon: <Bell size={24} />,
    soft: "#FEF1DC",
    tint: "#F5A623",
    title: "Automated follow-ups",
    body: "Schedule reminders for documents, deadlines and payments. CA Works chases so your team doesn't.",
  },
  {
    icon: <FileText size={24} />,
    soft: "#FDE7EB",
    tint: "#FB6A82",
    title: "Document collection",
    body: "Clients upload directly in chat; files are auto-named, filed against the right client and task.",
  },
  {
    icon: <History size={24} />,
    soft: "#EAF7F8",
    tint: "#0E8A93",
    title: "Full conversation log",
    body: "Every message, on every channel, recorded and searchable. Complete audit trail for the firm.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="mx-auto max-w-[95%] px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto mb-11 max-w-[54ch] text-center">
        <div className="mb-3 font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
          Features
        </div>
        <h2 className="font-medium text-[19px] text-muted-foreground leading-[1.55] tracking-[-0.005em]">
          Everything client communication needs
        </h2>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-3.5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-2xl border border-muted-foreground/15 bg-white p-5.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)] transition-[border-color,box-shadow] hover:border-[#C7DDFB] hover:shadow-[0_12px_28px_-14px_rgba(16,34,51,0.22)]"
            >
              <div
                className="flex size-11 flex-none items-center justify-center rounded-xl"
                style={{ background: f.soft, color: f.tint }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="mb-1.5 font-bold text-[17px] tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="text-[#596B75] text-[14.5px] leading-[1.55]">
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="relative min-h-[400px] self-stretch overflow-hidden rounded-2xl">
          <Image
            src="/images/features.webp"
            alt="CA Works product screenshot"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
