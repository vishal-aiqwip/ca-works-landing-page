import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

const BENTO_IMAGES = [
  {
    id: "ca-ledger",
    src: "/images/landing/bento-ledger.png",
    alt: "Client ledger",
  },
  {
    id: "ca-whatsapp",
    src: "/images/landing/bento-whatsapp.png",
    alt: "WhatsApp API",
  },
  {
    id: "ca-financial",
    src: "/images/landing/bento-financial.png",
    alt: "Financial report",
  },
  {
    id: "ca-payment",
    src: "/images/landing/reminder.png",
    alt: "Payment reminder",
  },
];

const BLURBS = [
  {
    title: "One thread per client",
    body: "Every WhatsApp and email message from a client, together in one place — no more scattered context.",
  },
  {
    title: "Replies in your voice",
    body: "CA Works drafts and sends accurate answers to routine questions the way your firm would.",
  },
  {
    title: "Complete audit trail",
    body: "Every message on every channel is logged and searchable — a full record for the firm.",
  },
];

const UnifiedInbox = () => {
  return (
    <section className="bg-[#F5F6F8]">
      <div className="mx-auto max-w-[1160px] px-6 pt-19 pb-16 sm:px-10">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-15">
          <div>
            <div
              data-reveal
              className="inline-block rounded-full bg-[#E2E8F0] px-3.5 py-1.5 font-bold text-[#334155] text-[12px] uppercase tracking-[0.08em]"
            >
              Unified inbox
            </div>
            <h2
              data-reveal-heading
              className="mt-4 font-extrabold text-[#111826] text-[32px] leading-[1.06] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
            >
              One inbox for every client conversation
            </h2>
          </div>
          <div>
            <p className="mt-1.5 text-[#334155] text-[16.5px] leading-[1.6]">
              WhatsApp and Email for every client land in a single thread —
              read, classified and matched to the right client and task, so your
              team never switches apps or loses context again.
            </p>
            <Link
              href="/#features"
              className="mt-7 inline-flex items-center gap-1.5 rounded-xl bg-[#0F172A] px-5.5 py-3.5 font-bold text-[15px] text-white"
            >
              Explore the inbox
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          data-reveal-group
          className="mt-13 grid grid-cols-2 gap-4.5 lg:grid-cols-4"
        >
          {BENTO_IMAGES.map((img) => (
            <div
              key={img.id}
              data-reveal-item
              className="relative aspect-square overflow-hidden rounded-[18px] border border-[#E9EDF3] bg-white shadow-[0_18px_40px_-26px_rgba(16,34,51,0.2)] transition-[transform,box-shadow,border-color] duration-250 hover:-translate-y-1.5 hover:border-[#C7D2FE] hover:shadow-[0_30px_56px_-28px_rgba(37,99,235,0.38)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div
          data-reveal-group
          className="mt-13 grid grid-cols-1 gap-10 sm:grid-cols-3"
        >
          {BLURBS.map((b) => (
            <div
              key={b.title}
              data-reveal-item
              className="border-[#C7D2FE] border-t-[1.5px] pt-5.5"
            >
              <h3 className="font-bold text-[22px]">{b.title}</h3>
              <p className="mt-2.5 text-[#475569] text-[15px] leading-[1.55]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedInbox;
