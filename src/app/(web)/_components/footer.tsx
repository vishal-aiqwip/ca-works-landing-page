import Link from "next/link";

import { Button, Separator } from "@/components";
import { APP_NAME, BOOKING_URL } from "@/config";

const FOOTER_COLUMNS = [
  {
    title: "PRODUCT",
    links: [
      { label: "Features", href: "#features" },
      { label: "Channels", href: "#channels" },
      { label: "Pricing", href: "#pricing" },
      { label: "Book a demo", href: BOOKING_URL },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Security", href: "/security" },
    ],
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="border-[#F1F5F9] border-t bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-14 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-10 border-[#F1F5F9] border-b pb-10 sm:flex-row">
          <div className="max-w-[340px]">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-extrabold text-[20px] text-foreground tracking-[-0.02em]"
            >
              <span className="flex size-[30px] items-center justify-center rounded-[9px] bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] font-extrabold text-[12px] text-white">
                CA
              </span>
              {APP_NAME}
            </Link>
            <p className="mt-4 text-[#64748B] text-[14.5px] leading-[1.55]">
              The AI client communication layer for chartered accountants across
              Email &amp; WhatsApp.
            </p>
          </div>
          <Button
            className="flex-none rounded-[11px] px-5.5 py-3 text-[14.5px] shadow-[0_2px_6px_rgba(4,100,228,0.35)]"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a demo
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-3">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <div className="mb-4 font-bold text-[12px] text-foreground tracking-[0.06em]">
                {column.title}
              </div>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#64748B] text-[14px] transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-10 mb-6 bg-[#F1F5F9]" />

        <p className="text-[#94A3B8] text-[13.5px]">
          © 2026 {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
