"use client";

import type { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components";
import { BOOKING_URL } from "@/config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  // { label: "Channels", href: "/#channels" },
  { label: "How it works", href: "/#how" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-[padding-top] duration-300 ease-out"
      style={{ paddingTop: scrolled ? 10 : 0 }}
    >
      <div
        className={cn(
          "mx-auto flex items-center gap-4 border border-transparent bg-white/85 backdrop-blur-md transition-all duration-300 ease-out",
          scrolled
            ? "max-w-[860px] rounded-xl border-[#E6EAF2] px-5.5 py-2.5 shadow-[0_12px_30px_-14px_rgba(15,23,42,0.22)]"
            : "max-w-[1240px] rounded-none px-6 py-4 sm:px-10",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-[22px] text-foreground tracking-[-0.02em]"
        >
          <span className="flex size-8 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] font-extrabold text-[13px] text-white">
            CA
          </span>
          Works
        </Link>

        <nav className="mx-auto hidden items-center gap-7.5 font-medium text-[#334155] text-[15px] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href as Route}
              className="hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="hidden sm:inline-flex"
            asChild
          >
            <a href="/login">Log in</a>
          </Button>
          <Button variant="default-shadow" size="lg" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Demo
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
