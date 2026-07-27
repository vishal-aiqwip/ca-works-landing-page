# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CA Works marketing landing page (and sitewide Header/Footer) to match `reference/CA Firm Landing.dc.html`, replacing the current section set with the reference's sections, and porting its bespoke GSAP animation behavior.

**Architecture:** A single new client component (`landing-fx.tsx`) mounted at the top of `page.tsx` drives all scroll/hover animation via `data-*` marker attributes, mirroring the reference's inline `Component` class. Every landing section component is rewritten (or newly created) with Tailwind utility classes, reusing existing shadcn primitives (`Button`, `Separator`) and `lucide-react` icons. Header gets its own local scroll-shrink effect since it's sitewide, not landing-specific.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `gsap` + `@gsap/react` (`useGSAP`), `lucide-react`, `next/image`, Biome (lint/format), Bun.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-27-landing-page-redesign-design.md` — read it before starting; every task below implements a piece of it.
- Reference source of truth: `reference/CA Firm Landing.dc.html` ("v1"). Copy, layout, and section order are taken from this file. Ignore `reference/CA Firm Landing v2.dc.html`, `v3`, `support.js`, `image-slot.js` — design-tool scaffolding only.
- `BOOKING_URL` and `APP_NAME` always come from `src/config/app.tsx` — never hardcode the cal.com URL or "CA Works" string directly in a component.
- Reuse existing shadcn primitives (`Button` variants, `Separator`) and the `cn()` helper from `@/lib/utils` instead of writing new primitives.
- One-off illustrative hex colors used only inside mockup-style cards (status dots, chip backgrounds, avatar gradients) are literal arbitrary Tailwind values (e.g. `text-[#0464E4]`), matching the existing pattern already used in `product-demo.tsx`/`testimonials.tsx`. Brand/content-level color (accent blue, body text, muted text) uses the existing tokens: `text-primary`/`bg-primary`, `text-foreground`, `text-muted-foreground`.
- No new dependencies are needed. Do not add any.
- No unit test framework exists in this repo (no jest/vitest/playwright configured) — verification per task is `bunx tsc --noEmit` (type-check) plus `bunx biome check` scoped to that task's exact files (the repo has pre-existing, unrelated lint debt across `src/components/ui/*` and other files — confirmed by running `bun run lint` before starting this plan — so whole-repo lint is never the right check for a single task); the final task additionally runs `bun run build` and a manual browser check per this project's CLAUDE.md frontend-testing rule.
- Package manager is Bun (`bun.lock` is the authoritative lockfile). Use `bun run <script>` / `bunx <tool>` for all commands.

---

### Task 1: Copy reference image assets into `public/images/landing/`

**Files:**
- Create (copy): `public/images/landing/bento-ledger.webp`
- Create (copy): `public/images/landing/bento-whatsapp.webp`
- Create (copy): `public/images/landing/bento-financial.webp`
- Create (copy): `public/images/landing/bento-payment.webp`
- Create (copy): `public/images/landing/features-bg.jpg`
- Create (copy): `public/images/landing/cta-bg.jpg`

**Interfaces:**
- Produces: the six file paths above, referenced by later tasks as `/images/landing/<name>`.

- [ ] **Step 1: Create the target directory and copy the six files**

```bash
mkdir -p "public/images/landing"
cp "reference/assets/bento-ledger.webp" "public/images/landing/bento-ledger.webp"
cp "reference/assets/bento-whatsapp.webp" "public/images/landing/bento-whatsapp.webp"
cp "reference/assets/bento-financial.webp" "public/images/landing/bento-financial.webp"
cp "reference/assets/bento-payment.webp" "public/images/landing/bento-payment.webp"
cp "reference/assets/features-bg.jpg" "public/images/landing/features-bg.jpg"
cp "reference/assets/cta-bg.jpg" "public/images/landing/cta-bg.jpg"
```

- [ ] **Step 2: Verify all six files exist**

Run: `ls public/images/landing`
Expected: the six filenames listed above, nothing else.

- [ ] **Step 3: Commit**

```bash
git add public/images/landing
git commit -m "feat: add landing page image assets from reference design"
```

---

### Task 2: Build the `landing-fx.tsx` animation engine

**Files:**
- Create: `src/app/(web)/_components/landing-fx.tsx`
- Delete: `src/app/(web)/_components/scroll-reveal.tsx` (superseded by this file; confirmed unused by any other route — see Task 15)

**Interfaces:**
- Produces: `LandingFx` component, `import { LandingFx } from "./landing-fx"`, no props. Renders `null`; side-effect only. Queries `document` directly rather than an externally-passed ancestor ref — a ref on this component's own parent `<div>` is still `null` when this component's `useGSAP` layout effect runs, since React commits child layout effects before the parent's own ref gets attached in the same commit.
- Consumed by: Task 15 (`page.tsx`), which mounts it once (no props needed).
- Marker attributes this component reacts to (used by every later section task): `data-hero-item`, `data-reveal`, `data-reveal-heading`, `data-reveal-scale`, `data-reveal-group` (wrapping `data-reveal-item` children), `data-blob` (hero background glow), `data-marquee` (the scrolling marquee track). Also auto-targets every `a[href*="cal.com"]` for magnetic hover.

- [ ] **Step 1: Write `landing-fx.tsx`**

```tsx
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function splitWords(el: HTMLElement) {
  const words: HTMLElement[] = [];
  const wrap = (word: string) => {
    const mask = document.createElement("span");
    mask.style.cssText =
      "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em";
    const inner = document.createElement("span");
    inner.style.cssText = "display:inline-block;will-change:transform";
    inner.textContent = word;
    mask.appendChild(inner);
    words.push(inner);
    return mask;
  };
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const parts = node.textContent.split(/(\s+)/);
      const frag = document.createDocumentFragment();
      for (const part of parts) {
        frag.appendChild(
          part.trim() === "" ? document.createTextNode(part) : wrap(part),
        );
      }
      el.replaceChild(frag, node);
    }
  }
  return words;
}

/**
 * Mounted once at the root of the landing page. Ports the reference
 * mockup's bespoke GSAP behavior: masked headline/heading reveal, hero
 * intro stagger, scroll-triggered fade-ups, card-group stagger, blob
 * parallax, a scroll-velocity-reactive marquee, and magnetic CTA hover.
 * Renders nothing.
 *
 * Queries `document` directly rather than an ancestor ref: this component
 * only ever mounts once, as the first child of the page's root element, and
 * React's commit phase runs child layout effects before the parent's own
 * ref gets attached — so a ref on that ancestor div is still null when this
 * effect fires.
 */
export function LandingFx() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    const magneticHandlers: Array<{
      btn: HTMLAnchorElement;
      onMove: (e: MouseEvent) => void;
      reset: () => void;
    }> = [];

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element = HTMLElement>(selector: string) =>
        Array.from(document.querySelectorAll<T>(selector));

      // Hero headline: masked word-by-word rise on load
      const h1 = document.querySelector<HTMLElement>("h1");
      const heroWords = h1 ? splitWords(h1) : [];
      gsap.set(heroWords, { yPercent: 115 });

      const heroItems = q("[data-hero-item]");
      gsap.set(heroItems, { opacity: 0, y: 30 });

      const introTl = gsap.timeline({ delay: 0.2 });
      if (heroWords.length) {
        introTl.to(heroWords, {
          yPercent: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
        });
      }
      if (heroItems.length) {
        introTl.to(
          heroItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          heroWords.length ? "-=.7" : 0,
        );
      }

      // Section headings: masked word reveal on scroll
      for (const el of q("[data-reveal-heading]")) {
        const words = splitWords(el);
        gsap.set(words, { yPercent: 115 });
        gsap.to(words, {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }

      // Eyebrows + paragraphs: fade up
      for (const el of q("[data-reveal]")) {
        gsap.set(el, { opacity: 0, y: 26 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      }

      // Scale-in reveal (final CTA card)
      for (const el of q("[data-reveal-scale]")) {
        gsap.set(el, { opacity: 0, scale: 0.94 });
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }

      // Card groups: staggered rise per grid
      for (const group of q("[data-reveal-group]")) {
        const items = Array.from(
          group.querySelectorAll<HTMLElement>("[data-reveal-item]"),
        );
        if (!items.length) continue;
        gsap.set(items, { opacity: 0, y: 40 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 84%", once: true },
        });
      }

      // Hero glow blob parallax
      const blob = document.querySelector<HTMLElement>("[data-blob]");
      if (blob) {
        gsap.to(blob, {
          yPercent: 26,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: blob.parentElement ?? blob,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Marquee driven by scroll velocity
      const marquee = document.querySelector<HTMLElement>("[data-marquee]");
      if (marquee) {
        const half = marquee.scrollWidth / 2;
        const loop = gsap.to(marquee, {
          x: -half,
          duration: 22,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x: string) => `${Number.parseFloat(x) % half}px`,
          },
        });
        let dir = 1;
        ScrollTrigger.create({
          trigger: marquee,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            const ts = gsap.utils.clamp(-6, 6, 1 + v / 340);
            if (v < 0 && dir !== -1) {
              dir = -1;
              loop.timeScale(-1);
            } else if (v > 0 && dir !== 1) {
              dir = 1;
              loop.timeScale(1);
            }
            gsap.to(loop, {
              timeScale: dir * Math.abs(ts),
              duration: 0.3,
              overwrite: true,
            });
            gsap.to(marquee, {
              skewX: gsap.utils.clamp(-10, 10, v / -260),
              duration: 0.4,
              overwrite: "auto",
            });
          },
        });
      }

      // Magnetic hover on primary booking CTAs
      for (const btn of q<HTMLAnchorElement>('a[href*="cal.com"]')) {
        btn.style.willChange = "transform";
        const strength = 0.35;
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          gsap.to(btn, {
            x: mx * strength,
            y: my * strength,
            duration: 0.4,
            ease: "power3.out",
          });
        };
        const reset = () =>
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1,.4)",
          });
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", reset);
        magneticHandlers.push({ btn, onMove, reset });
      }
    });

    return () => {
      magneticHandlers.forEach(({ btn, onMove, reset }) => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", reset);
      });
      mm.revert();
    };
  }, []);

  return null;
}
```

- [ ] **Step 2: Delete the now-superseded `scroll-reveal.tsx`**

```bash
rm "src/app/(web)/_components/scroll-reveal.tsx"
```

(Its only importer, `page.tsx`, is rewritten in Task 15 to drop the import. Leaving the file deleted now is safe because no other task re-adds a reference to it.)

- [ ] **Step 3: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors referencing `landing-fx.tsx`.

Run: `bunx biome check --write "src/app/(web)/_components/landing-fx.tsx"`
Expected: no errors for `landing-fx.tsx` (the file is new and unused until Task 15 wires it in, so an "unused export" style warning, if any, is expected and resolves once Task 15 lands). Note: the repo has pre-existing lint debt in unrelated files (run `bun run lint` with no args to see it) — this plan only requires the files it touches to be clean, not the whole repo.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(web\)/_components/landing-fx.tsx src/app/\(web\)/_components/scroll-reveal.tsx
git commit -m "feat: add landing-fx animation engine, remove unused scroll-reveal"
```

---

### Task 3: Redesign the sitewide Header

**Files:**
- Modify (rewrite): `src/app/(web)/_components/header.tsx`

**Interfaces:**
- Produces: `Header` default export, same signature as before (`const Header = () => {...}`), still rendered from wherever it currently is (root layout — unchanged, no other file needs edits for this task).
- Consumes: `Button` from `@/components`, `APP_NAME`/`BOOKING_URL` from `@/config`, `cn` from `@/lib/utils`.

- [ ] **Step 1: Rewrite `header.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components";
import { APP_NAME, BOOKING_URL } from "@/config";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Channels", href: "#channels" },
  { label: "How it works", href: "#how" },
  { label: "Contact", href: "#contact" },
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
          {APP_NAME}
        </Link>

        <nav className="mx-auto hidden items-center gap-7.5 font-medium text-[#334155] text-[15px] md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </a>
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
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/header.tsx"`
Expected: 0 remaining errors after the auto-fix (Biome will auto-sort Tailwind class lists and normalize formatting/line-endings in place).

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/header.tsx
git commit -m "feat: redesign header with scroll-shrink nav to match reference"
```

---

### Task 4: Redesign the sitewide Footer

**Files:**
- Modify (rewrite): `src/app/(web)/_components/footer.tsx`

**Interfaces:**
- Produces: `Footer` default export, unchanged signature.
- Consumes: `Separator` and `Button` from `@/components`, `APP_NAME`/`BOOKING_URL` from `@/config`.

- [ ] **Step 1: Rewrite `footer.tsx`**

```tsx
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
              The AI client communication layer for chartered accountants
              across Email &amp; WhatsApp.
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
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/footer.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/footer.tsx
git commit -m "feat: redesign footer to light theme matching reference"
```

---

### Task 5: Rebuild Hero and the logo strip (TrustBar)

**Files:**
- Modify (rewrite): `src/app/(web)/_components/hero.tsx`
- Modify (rewrite): `src/app/(web)/_components/trust-bar.tsx`

**Interfaces:**
- Produces: `Hero` default export (unchanged signature), `TrustBar` default export (unchanged signature).
- Consumes: `Button` from `@/components`, `BOOKING_URL` from `@/config`.
- Uses `landing-fx` marker attributes: `data-hero-item` on hero intro elements, `data-blob` on the background glow, `data-reveal` on the trust-bar eyebrow.

- [ ] **Step 1: Rewrite `hero.tsx`**

```tsx
import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

const AVATARS = [
  { initials: "LG", from: "#60A5FA", to: "#2563EB" },
  { initials: "AT", from: "#34D399", to: "#059669" },
  { initials: "KK", from: "#F472B6", to: "#DB2777" },
  { initials: "RN", from: "#FBBF24", to: "#D97706" },
  { initials: "SA", from: "#818CF8", to: "#4F46E5" },
];

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-16">
      <div
        data-blob
        className="-translate-x-1/2 absolute top-[220px] left-1/2 z-0 h-[420px] w-[900px] rounded-full opacity-50 blur-xl sm:h-[560px] sm:w-[1100px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 40%, #C7D2FE 0%, #DBE4F5 40%, #E6EEF7 62%, transparent 74%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1000px] px-4 text-center sm:px-8">
        <div
          data-hero-item
          className="font-bold text-[13.5px] text-primary uppercase tracking-[0.12em]"
        >
          AI client communication for chartered accountants
        </div>
        <h1
          data-hero-item
          className="mx-auto mt-5.5 max-w-[860px] text-balance font-extrabold text-[36px] text-foreground leading-[1.06] tracking-[-0.02em] sm:text-[52px] lg:text-[64px] lg:leading-[1.03]"
        >
          The AI client communication layer for CA firms
        </h1>
        <p
          data-hero-item
          className="mx-auto mt-6.5 max-w-[600px] text-[17px] text-muted-foreground leading-[1.55] sm:text-[19px]"
        >
          CA Works handles client conversations, document collection and
          reminders across Email &amp; WhatsApp — so your team stops chasing
          and starts focusing on real work.
        </p>
        <div
          data-hero-item
          className="mt-9 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button
            size="lg"
            className="rounded-xl bg-[#0F172A] px-6.5 py-6 text-[16px] text-white hover:bg-[#0F172A]/90"
            asChild
          >
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a demo
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-[#E2E8F0] px-6.5 py-6 text-[16px] text-foreground"
            asChild
          >
            <a href="#pricing">View pricing</a>
          </Button>
        </div>
        <div
          data-hero-item
          className="mt-7.5 flex items-center justify-center gap-4"
        >
          <div className="flex">
            {AVATARS.map((a, i) => (
              <span
                key={a.initials}
                className="-mr-3 flex size-10 items-center justify-center rounded-full border-[2.5px] border-white font-bold text-[12px] text-white last:mr-0"
                style={{
                  background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                  zIndex: AVATARS.length - i,
                }}
              >
                {a.initials}
              </span>
            ))}
          </div>
          <div className="text-left">
            <div className="text-[16px] text-[#F59E0B] tracking-[2px]">
              ★★★★★
            </div>
            <div className="font-semibold text-[#334155] text-[14px]">
              Trusted by modern CA &amp; tax firms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
```

- [ ] **Step 2: Rewrite `trust-bar.tsx`**

```tsx
const FIRMS = [
  "Fintax Co",
  "Verma LLP",
  "Kabra & Co",
  "SAR Associates",
  "Vasavi Tax",
];

const TrustBar = () => {
  return (
    <section className="border-[#F1F5F9] border-y bg-white">
      <div className="mx-auto max-w-[1120px] px-8 py-8.5 text-center">
        <div
          data-reveal
          className="mb-5 font-bold text-[#94A3B8] text-[12.5px] uppercase tracking-[0.08em]"
        >
          Trusted by modern CA &amp; tax firms
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
          {FIRMS.map((firm) => (
            <span
              key={firm}
              className="font-extrabold text-[#64748B] text-[20px] tracking-[-0.02em]"
            >
              {firm}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
```

- [ ] **Step 3: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/hero.tsx" "src/app/(web)/_components/trust-bar.tsx"`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(web\)/_components/hero.tsx src/app/\(web\)/_components/trust-bar.tsx
git commit -m "feat: rebuild hero and logo strip to match reference"
```

---

### Task 6: Build the Unified Inbox bento section

**Files:**
- Create: `src/app/(web)/_components/unified-inbox.tsx`

**Interfaces:**
- Produces: `UnifiedInbox` default export, no props.
- Consumes: `next/image` for the four bento images at `/images/landing/bento-*.webp` (Task 1).
- Uses `landing-fx` markers: `data-reveal` on the header column, `data-reveal-group`/`data-reveal-item` on the bento grid and the blurb row.

- [ ] **Step 1: Write `unified-inbox.tsx`**

```tsx
import Image from "next/image";

const BENTO_IMAGES = [
  { id: "ca-ledger", src: "/images/landing/bento-ledger.webp", alt: "Client ledger" },
  { id: "ca-whatsapp", src: "/images/landing/bento-whatsapp.webp", alt: "WhatsApp API" },
  { id: "ca-financial", src: "/images/landing/bento-financial.webp", alt: "Financial report" },
  { id: "ca-payment", src: "/images/landing/bento-payment.webp", alt: "Payment reminder" },
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
              className="mt-4 font-extrabold text-[32px] text-[#111826] leading-[1.06] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
            >
              One inbox for every client conversation
            </h2>
          </div>
          <div>
            <p className="mt-1.5 text-[#334155] text-[16.5px] leading-[1.6]">
              WhatsApp and Email for every client land in a single thread —
              read, classified and matched to the right client and task, so
              your team never switches apps or loses context again.
            </p>
            <a
              href="#features"
              className="mt-7 inline-block rounded-xl bg-[#0F172A] px-5.5 py-3.5 font-bold text-[15px] text-white"
            >
              Explore the inbox →
            </a>
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
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/unified-inbox.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/unified-inbox.tsx
git commit -m "feat: add unified inbox bento section"
```

---

### Task 7: Rebuild the Features section

**Files:**
- Modify (rewrite): `src/app/(web)/_components/features-section.tsx`

**Interfaces:**
- Produces: `FeaturesSection` default export, no props. Rendered with `id="features"`.
- Consumes: background image `/images/landing/features-bg.jpg` (Task 1), `BOOKING_URL` from `@/config`.
- Uses `landing-fx` markers: `data-reveal` (eyebrow/paragraph/CTA line), `data-reveal-heading` (h2), `data-reveal-group`/`data-reveal-item` (pill row and bento grid).

This replaces the current cycling-mockup implementation entirely with the reference's static bento layout.

- [ ] **Step 1: Rewrite `features-section.tsx`**

```tsx
import { BOOKING_URL } from "@/config";

const PILLS = [
  {
    title: "Unified inbox",
    body: "WhatsApp + Email for every client, in one thread.",
    active: false,
  },
  {
    title: "AI replies",
    body: "Accurate answers to routine questions, in your voice.",
    active: true,
  },
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
  { color: "#22C55E", label: "GSTR-3B due in 3 days", meta: "WhatsApp + Email" },
  { color: "#2563EB", label: "Bank statements needed · Nexa Pvt", meta: "Sent" },
  { color: "#FBBF24", label: "Payment of ₹18,000 pending", meta: "Link sent" },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative mt-5 bg-[url('/images/landing/features-bg.jpg')] bg-cover bg-center"
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
          Read, reply, collect and remind — across every channel, so your
          team doesn't have to.
        </p>

        <div
          data-reveal-group
          className="mt-11 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-4"
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
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/features-section.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/features-section.tsx
git commit -m "feat: rebuild features section with bg image and bento grid"
```

---

### Task 8: Build the Channels section

**Files:**
- Create: `src/app/(web)/_components/channels-section.tsx`

**Interfaces:**
- Produces: `ChannelsSection` default export, no props. Rendered with `id="channels"`.
- Uses `landing-fx` markers: `data-reveal` (eyebrow/paragraph), `data-reveal-heading` (h2), `data-reveal-group`/`data-reveal-item` (the two mockup frames and the 3-col blurb row).

- [ ] **Step 1: Write `channels-section.tsx`**

```tsx
const BOARD_COLUMNS = [
  { label: "Docs pending", client: "Mehta Traders", tag: "GSTR-3B", tagColor: "#B45309" },
  { label: "In review", client: "Nexa Pvt", tag: "TDS 26Q", tagColor: "#2563EB" },
  { label: "Filed", client: "S. Kapoor", tag: "ITR ✓", tagColor: "#1E8E5A" },
];

const TIMELINE_STEPS = [
  { label: "Request sent", meta: "WhatsApp · Mon 9:02 AM", state: "done" as const },
  { label: "Invoices received", meta: "Auto-filed · Mon 2:14 PM", state: "done" as const },
  { label: "Reminder for bank statement", meta: "Scheduled · Wed 10:00 AM", state: "active" as const },
  { label: "Ready to file", meta: "Pending 1 document", state: "todo" as const },
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
    <section id="channels" className="mx-auto max-w-[1160px] px-6 pt-20 pb-5 text-center sm:px-10">
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
        WhatsApp and email flow into one board, so nothing slips between
        apps, threads or team members.
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
                  <div className="text-[#94A3B8] text-[11.5px]">{step.meta}</div>
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
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/channels-section.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/channels-section.tsx
git commit -m "feat: add channels section with compliance board and timeline mockups"
```

---

### Task 9: Build the Triage section

**Files:**
- Create: `src/app/(web)/_components/triage-section.tsx`

**Interfaces:**
- Produces: `TriageSection` default export, no props.
- Uses `landing-fx` markers: `data-reveal` (eyebrow/paragraph), `data-reveal-heading` (h2), `data-reveal-scale` (the mockup card).

- [ ] **Step 1: Write `triage-section.tsx`**

```tsx
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
            background: "linear-gradient(150deg, #DBEAFE, #EFF4FF 45%, #F5F3FF)",
          }}
        >
          <div className="rounded-[14px] bg-white p-6.5 shadow-[0_18px_40px_-22px_rgba(15,23,42,0.25)]">
            <div className="mb-5 font-extrabold text-[19px]">Message triage</div>
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
          <p data-reveal className="mt-4.5 text-[#475569] text-[17px] leading-[1.6]">
            CA Works classifies each incoming message and matches it to the
            right client and task. Routine questions are answered
            automatically; anything sensitive is escalated to your team with
            full context.
          </p>
          <a
            href="#how"
            className="mt-7 inline-block rounded-xl bg-[#0F172A] px-5.5 py-3.5 font-bold text-[15px] text-white"
          >
            See how it works →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TriageSection;
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/triage-section.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/triage-section.tsx
git commit -m "feat: add AI triage section with message-triage scorecard mockup"
```

---

### Task 10: Build the Reminders section

**Files:**
- Create: `src/app/(web)/_components/reminders-section.tsx`

**Interfaces:**
- Produces: `RemindersSection` default export, no props.
- Consumes: `Bell` icon from `lucide-react`, `BOOKING_URL` from `@/config`.
- Uses `landing-fx` markers: `data-reveal` (eyebrow/paragraph), `data-reveal-heading` (h2), `data-reveal-scale` (mockup card).

- [ ] **Step 1: Write `reminders-section.tsx`**

```tsx
import { Bell } from "lucide-react";

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
          <p data-reveal className="mt-4.5 text-[#475569] text-[17px] leading-[1.6]">
            Filing deadlines, missing documents and pending payments need
            constant nudging. CA Works schedules and sends every reminder
            over WhatsApp and email — so your team never chases by hand
            again.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-xl bg-[#0F172A] px-5.5 py-3.5 font-bold text-[15px] text-white"
          >
            See it in action →
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
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/reminders-section.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/reminders-section.tsx
git commit -m "feat: add reminders section with reminders-list mockup"
```

---

### Task 11: Rebuild How It Works

**Files:**
- Modify (rewrite): `src/app/(web)/_components/how-it-works.tsx`

**Interfaces:**
- Produces: `HowItWorks` default export, no props. Rendered with `id="how"` (moved off `#channels`, since Task 8 now owns that id).
- Uses `landing-fx` markers: `data-reveal` (paragraph), `data-reveal-heading` (h2), `data-reveal-group`/`data-reveal-item` (step cards).

- [ ] **Step 1: Rewrite `how-it-works.tsx`**

```tsx
const STEPS = [
  {
    num: "1",
    title: "Connect your channels",
    body: "Link your firm's WhatsApp Business number and email inbox in minutes. No new app for clients to install.",
  },
  {
    num: "2",
    title: "CA Works reads & understands",
    body: "Every incoming message is read, classified and matched to the right client and task automatically.",
  },
  {
    num: "3",
    title: "It replies & acts in your voice",
    body: "Answers routine questions, sends document links, collects uploads and files them — without manual effort.",
  },
  {
    num: "4",
    title: "You stay in control",
    body: "Anything sensitive is escalated to your team with full context, and every conversation is logged and searchable.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="mx-auto max-w-[1160px] px-6 pt-17.5 pb-5 text-center sm:px-10">
      <div
        data-reveal
        className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]"
      >
        How it works
      </div>
      <h2
        data-reveal-heading
        className="mx-auto mt-4 max-w-[640px] font-extrabold text-[32px] leading-[1.05] tracking-[-0.02em] sm:text-[42px] lg:text-[52px]"
      >
        Up and running in 4 simple steps
      </h2>
      <p
        data-reveal
        className="mx-auto mt-4.5 max-w-[560px] text-[#475569] text-[18px] leading-[1.55]"
      >
        Connect your channels once and effortlessly handle the day-to-day
        client communication.
      </p>
      <div
        data-reveal-group
        className="mt-12 grid grid-cols-1 gap-5.5 text-left sm:grid-cols-2 lg:grid-cols-4"
      >
        {STEPS.map((s) => (
          <div
            key={s.num}
            data-reveal-item
            className="rounded-2xl border border-[#E2E8F0] p-6.5 transition-[transform,box-shadow,border-color] hover:-translate-y-1.25 hover:border-[#C7D2FE] hover:shadow-[0_20px_38px_-20px_rgba(15,23,42,0.2)]"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-[#0F172A] font-extrabold text-[16px] text-white">
              {s.num}
            </div>
            <h3 className="mt-4.5 mb-2 font-bold text-[18px]">{s.title}</h3>
            <p className="text-[#475569] text-[14.5px] leading-[1.55]">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/how-it-works.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/how-it-works.tsx
git commit -m "feat: restyle how-it-works to match reference, move id to #how"
```

---

### Task 12: Rebuild Testimonials as a "Wall of love" masonry

**Files:**
- Modify (rewrite): `src/app/(web)/_components/testimonials.tsx`

**Interfaces:**
- Produces: `Testimonials` default export, no props.
- Consumes: `Star`, `Heart` icons from `lucide-react`.
- Uses `landing-fx` markers: `data-reveal` (header block), `data-reveal-heading` (h2), `data-reveal-group`/`data-reveal-item` (testimonial cards).

- [ ] **Step 1: Rewrite `testimonials.tsx`**

```tsx
import { Heart, Star } from "lucide-react";

const QUOTES = [
  {
    name: "Lalit Gupta",
    firm: "RNC Fintax",
    initials: "LG",
    from: "#60A5FA",
    to: "#2563EB",
    text: "My juniors used to spend half their day answering 'is it filed yet?' on WhatsApp. CA Works just… handles it now.",
  },
  {
    name: "Avinash Tripathi",
    firm: "CA Avinash Tripathi",
    initials: "AT",
    from: "#34D399",
    to: "#059669",
    text: "Document collection went from a week of chasing to a day. Clients reply to the AI faster than they reply to me.",
  },
  {
    name: "Kaushal Kabra",
    firm: "Kaushal Kabra & Co",
    initials: "KK",
    from: "#F472B6",
    to: "#DB2777",
    text: "Payments come in faster because the reminders never stop and never feel rude. It pays for itself.",
  },
  {
    name: "SAR Associates",
    firm: "Tax practice, Hyderabad",
    initials: "SA",
    from: "#FBBF24",
    to: "#D97706",
    text: "Finally, one place for WhatsApp and email. Nothing slips between the team any more.",
  },
  {
    name: "Verma LLP",
    firm: "CA firm, Pune",
    initials: "VL",
    from: "#818CF8",
    to: "#4F46E5",
    text: "The AI drafts replies in our firm's voice — we just review and approve. Huge time saver at peak season.",
  },
  {
    name: "Fintax Co",
    firm: "Accounting firm, Mumbai",
    initials: "FC",
    from: "#2DD4BF",
    to: "#0891B2",
    text: "We got back 10+ hours a week per staff member. That's a whole extra day of real work.",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pt-20 pb-5 sm:px-10">
      <div data-reveal className="mb-12 text-center">
        <div className="inline-block rounded-full bg-[#EFF4FF] px-3.5 py-1.5 font-bold text-[12px] text-primary uppercase tracking-[0.08em]">
          Loved by practitioners
        </div>
        <h2
          data-reveal-heading
          className="mt-3.5 flex items-center justify-center gap-3.5 font-extrabold text-[34px] tracking-[-0.02em] sm:text-[44px] lg:text-[56px]"
        >
          What CA firms say <Heart size={40} className="fill-primary text-primary" />
        </h2>
      </div>
      <div data-reveal-group className="columns-1 gap-5.5 sm:columns-2 lg:columns-3">
        {QUOTES.map((q) => (
          <figure
            key={q.name}
            data-reveal-item
            className="mb-5.5 break-inside-avoid rounded-2xl border border-[#E2E8F0] p-6 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-[#C7D2FE] hover:shadow-[0_18px_34px_-20px_rgba(15,23,42,0.2)]"
          >
            <div className="mb-3 flex items-center gap-2.75">
              <span
                className="flex size-10.5 items-center justify-center rounded-full font-bold text-[14px] text-white"
                style={{ background: `linear-gradient(135deg, ${q.from}, ${q.to})` }}
              >
                {q.initials}
              </span>
              <div>
                <div className="font-bold text-[14.5px]">{q.name}</div>
                <div className="text-[#94A3B8] text-[12.5px]">{q.firm}</div>
              </div>
            </div>
            <div className="mb-2 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-star rating, order never changes
                  key={i}
                  size={15}
                  fill="#F59E0B"
                  stroke="#F59E0B"
                />
              ))}
            </div>
            <blockquote className="text-[#1E293B] text-[15.5px] leading-[1.6]">
              "{q.text}"
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/testimonials.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/testimonials.tsx
git commit -m "feat: rebuild testimonials as wall-of-love masonry"
```

---

### Task 13: Build the FAQ section

**Files:**
- Create: `src/app/(web)/_components/faq-section.tsx`

**Interfaces:**
- Produces: `FaqSection` default export, no props.
- Uses `landing-fx` markers: `data-reveal-heading` (h2), `data-reveal-group`/`data-reveal-item` (the Q&A grid).

- [ ] **Step 1: Write `faq-section.tsx`**

```tsx
const FAQS = [
  {
    q: "What is CA Works?",
    a: "CA Works is an AI client-communication layer for chartered accountants that handles conversations, document collection and reminders across Email and WhatsApp.",
  },
  {
    q: "Which channels does it support?",
    a: "WhatsApp Business and email today, unified into a single inbox and thread per client — with more channels on the way.",
  },
  {
    q: "Do my clients need to install anything?",
    a: "No. Clients keep using the WhatsApp and email they already use — CA Works works behind your firm's existing channels.",
  },
  {
    q: "Does the AI send replies on its own?",
    a: "It drafts and sends accurate answers to routine questions in your voice. Anything sensitive is escalated to your team with full context.",
  },
  {
    q: "Is my clients' data secure?",
    a: "Yes. Every conversation is logged, access-controlled and searchable, giving your firm a complete, auditable trail.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo, connect your WhatsApp Business number and inbox in a few minutes, and CA Works starts handling day-to-day communication.",
  },
];

const FaqSection = () => {
  return (
    <section className="mx-auto max-w-[1160px] px-6 pt-17.5 pb-10 sm:px-10">
      <h2
        data-reveal-heading
        className="font-extrabold text-[30px] tracking-[-0.02em] sm:text-[38px] lg:text-[48px]"
      >
        Everything you need to know
      </h2>
      <p className="mt-3.5 mb-11 text-[#475569] text-[17px]">
        If you have anything else you'd like to ask,{" "}
        <a href="#contact" className="font-semibold">
          reach out to us
        </a>
        .
      </p>
      <div
        data-reveal-group
        className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FAQS.map((f) => (
          <div key={f.q} data-reveal-item>
            <h3 className="mb-2.5 font-bold text-[18px]">{f.q}</h3>
            <p className="text-[#475569] text-[15px] leading-[1.6]">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
```

- [ ] **Step 2: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/faq-section.tsx"`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(web\)/_components/faq-section.tsx
git commit -m "feat: add FAQ section"
```

---

### Task 14: Rebuild the final CTA section and build the Marquee

**Files:**
- Modify (rewrite): `src/app/(web)/_components/cta-section.tsx`
- Create: `src/app/(web)/_components/marquee.tsx`

**Interfaces:**
- Produces: `CtaSection` default export (unchanged signature, still rendered with `id="pricing"`), `Marquee` default export (no props).
- Consumes: background image `/images/landing/cta-bg.jpg` (Task 1), `BOOKING_URL` from `@/config`.
- Uses `landing-fx` markers: `data-reveal-scale` (CTA card), `data-reveal-heading` (h2), `data-marquee` (the scrolling track).

- [ ] **Step 1: Rewrite `cta-section.tsx`**

```tsx
import { Button } from "@/components";
import { BOOKING_URL } from "@/config";

const CtaSection = () => {
  return (
    <section id="pricing" className="mx-auto mt-10 max-w-[1200px] px-6 sm:px-10">
      <div
        data-reveal-scale
        className="relative overflow-hidden rounded-[26px] bg-[url('/images/landing/cta-bg.jpg')] bg-cover bg-center px-6 py-16 text-center text-white sm:px-10 sm:py-20"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 120% at 78% 10%, rgba(255,255,255,0.18), transparent 55%)",
          }}
        />
        <div className="relative">
          <div className="font-bold text-[13px] text-white/75 uppercase tracking-[0.12em]">
            Get started
          </div>
          <h2
            data-reveal-heading
            className="mx-auto mt-5 max-w-[760px] font-extrabold text-[28px] leading-[1.12] tracking-[-0.02em] sm:text-[38px] lg:text-[52px]"
          >
            Let CA Works handle the tedious work while your team focuses on
            what matters
          </h2>
          <p className="mx-auto mt-5 max-w-[540px] text-[#DBEAFE] text-[18px] leading-[1.55]">
            Stop chasing documents and typing reminders. Book a demo and see
            it working on your own client conversations.
          </p>
          <div className="mt-8.5 flex flex-wrap justify-center gap-3.5">
            <Button
              size="lg"
              className="rounded-xl bg-white px-7 py-6 text-[16px] text-primary hover:bg-white/90"
              asChild
            >
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="rounded-xl border border-white/32 bg-white/14 px-7 py-6 text-[16px] text-white hover:bg-white/22 hover:text-white"
              asChild
            >
              <a href="#contact">Contact us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
```

- [ ] **Step 2: Write `marquee.tsx`**

```tsx
const ITEMS: { label: string; outline?: boolean }[] = [
  { label: "Reply with AI" },
  { label: "✦" },
  { label: "Collect Documents", outline: true },
  { label: "✦" },
  { label: "Never Chase Again" },
  { label: "✦" },
];
const LOOPED_ITEMS = [...ITEMS, ...ITEMS];

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-16 sm:py-11">
      <div
        data-marquee
        className="inline-flex items-center gap-11 font-extrabold text-[36px] tracking-[-0.02em] sm:text-[52px]"
      >
        {LOOPED_ITEMS.map((item, i) => (
          <span
            key={`${item.label}-${i}`}
            className={
              item.label === "✦"
                ? "text-primary"
                : item.outline
                  ? "text-transparent [-webkit-text-stroke:1.5px_#0F172A]"
                  : "text-[#0F172A]"
            }
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
```

- [ ] **Step 3: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/_components/cta-section.tsx" "src/app/(web)/_components/marquee.tsx"`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/\(web\)/_components/cta-section.tsx src/app/\(web\)/_components/marquee.tsx
git commit -m "feat: rebuild final CTA with bg image, add scroll-velocity marquee"
```

---

### Task 15: Wire up `page.tsx` and remove orphaned files

**Files:**
- Modify (rewrite): `src/app/(web)/page.tsx`
- Delete: `src/app/(web)/_components/problem-section.tsx`
- Delete: `src/app/(web)/_components/value-props.tsx`

**Interfaces:**
- Consumes every component built/rewritten in Tasks 2–14: `LandingFx`, `Hero`, `ProductDemo` (unchanged, from the existing codebase), `TrustBar`, `UnifiedInbox`, `FeaturesSection`, `ChannelsSection`, `TriageSection`, `RemindersSection`, `HowItWorks`, `Testimonials`, `FaqSection`, `CtaSection`, `Marquee`.

- [ ] **Step 1: Confirm `problem-section.tsx` and `value-props.tsx` have no other importers**

Run: `grep -rl "problem-section\|value-props" src --include="*.tsx" --include="*.ts"`
Expected: only `src/app/(web)/page.tsx` (the file this task rewrites) and the component files themselves.

- [ ] **Step 2: Delete the orphaned components**

```bash
rm "src/app/(web)/_components/problem-section.tsx"
rm "src/app/(web)/_components/value-props.tsx"
```

- [ ] **Step 3: Rewrite `page.tsx`**

```tsx
import type { Metadata } from "next";
import NextImage from "next/image";

import ChannelsSection from "./_components/channels-section";
import CtaSection from "./_components/cta-section";
import FaqSection from "./_components/faq-section";
import FeaturesSection from "./_components/features-section";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import { LandingFx } from "./_components/landing-fx";
import Marquee from "./_components/marquee";
import ProductDemo from "./_components/product-demo";
import RemindersSection from "./_components/reminders-section";
import Testimonials from "./_components/testimonials";
import TriageSection from "./_components/triage-section";
import TrustBar from "./_components/trust-bar";
import UnifiedInbox from "./_components/unified-inbox";

export const metadata: Metadata = {
  title: "",
  description: "",
  alternates: {
    canonical: "https://www.caworks.ai",
  },
  openGraph: {
    title: "",
    description: "",
    images: [{ url: "/images/meta/og-image.png", width: 1200, height: 630 }],
  },
};

export default async function Home() {
  return (
    <div>
      <LandingFx />

      <section
        className="border-[#EEF2FA] border-b"
        style={{
          background:
            "radial-gradient(85% 75% at 50% 60%, #7FB0FF 0%, #C3DBFF 35%, #EDF4FF 65%, #ffffff 100%)",
        }}
      >
        <Hero />

        <div className="hidden md:block">
          <ProductDemo />
        </div>
        <div className="px-5 pb-16 md:hidden">
          <NextImage
            src="/videos/product-view.gif"
            alt="CA Works product preview"
            width={800}
            height={600}
            unoptimized
            className="h-auto w-full rounded-2xl border border-[#DCE4F0]"
          />
        </div>
      </section>

      <TrustBar />
      <UnifiedInbox />
      <FeaturesSection />
      <ChannelsSection />
      <TriageSection />
      <RemindersSection />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <CtaSection />
      <Marquee />
    </div>
  );
}
```

**Note:** `page.tsx` stays a Server Component. `LandingFx` is itself marked `"use client"` internally, and a Server Component can render a Client Component as a child directly — the parent does not need `"use client"` just because one of its children does. `page.tsx` keeps its own `metadata` export (Server Components can export `metadata`; Client Components cannot), so no separate `layout.tsx` is needed for this route group.

- [ ] **Step 4: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: no errors.

Run: `bunx biome check --write "src/app/(web)/page.tsx"`
Expected: no errors, no remaining references to the deleted files.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(web\)/page.tsx
git rm "src/app/(web)/_components/problem-section.tsx" "src/app/(web)/_components/value-props.tsx"
git commit -m "feat: wire up redesigned landing page, remove orphaned sections"
```

---

### Task 16: Full build, lint, and manual browser verification

**Files:** none (verification only).

- [ ] **Step 1: Lint pass on every file this plan touches**

Run:
```bash
bunx biome check \
  "src/app/(web)/page.tsx" \
  "src/app/(web)/_components/landing-fx.tsx" \
  "src/app/(web)/_components/header.tsx" \
  "src/app/(web)/_components/footer.tsx" \
  "src/app/(web)/_components/hero.tsx" \
  "src/app/(web)/_components/trust-bar.tsx" \
  "src/app/(web)/_components/unified-inbox.tsx" \
  "src/app/(web)/_components/features-section.tsx" \
  "src/app/(web)/_components/channels-section.tsx" \
  "src/app/(web)/_components/triage-section.tsx" \
  "src/app/(web)/_components/reminders-section.tsx" \
  "src/app/(web)/_components/how-it-works.tsx" \
  "src/app/(web)/_components/testimonials.tsx" \
  "src/app/(web)/_components/faq-section.tsx" \
  "src/app/(web)/_components/cta-section.tsx" \
  "src/app/(web)/_components/marquee.tsx"
```
Expected: 0 errors, 0 warnings across this list. Note: `bun run lint` (no args) checks the whole repo and has pre-existing, unrelated lint debt outside these files (confirmed at plan-execution time, e.g. across `src/components/ui/*`) — that debt is out of scope for this plan and must not block it. If this scoped check reports anything, fix it before continuing.

- [ ] **Step 2: Full production build**

Run: `bun run build`
Expected: build succeeds with no type errors and no missing-module errors (this is the first point every new component is actually imported together, so this is the real end-to-end check).

- [ ] **Step 3: Manual browser check**

Run: `bun run dev` (in the background/a separate terminal)

Open `http://localhost:3000` in a browser and confirm:
- Header pill shrinks smoothly when scrolling past ~100px, expands back near the top.
- Hero headline animates in word-by-word on load; CTA buttons show magnetic hover pull toward the cursor.
- Every new section renders in order: Hero → Product demo → Logo strip → Unified inbox (2×2 images load correctly from `/images/landing/`) → Features (background image visible, bento cards laid out) → Channels → Triage → Reminders → How it works → Wall of love (masonry columns) → FAQ → Final CTA (background image visible) → Marquee (scrolls, skews/reverses on fast scroll).
- Nav anchor links (`#features`, `#channels`, `#how`, `#contact`) scroll to the correct section.
- Footer renders in the light theme with working links.
- No console errors in the browser dev tools.
- Resize to a mobile viewport width and confirm sections stack in a single column without overflow.

- [ ] **Step 4: Stop the dev server**

Stop the `bun run dev` process once verification is complete.

- [ ] **Step 5: Final commit (only if Step 3 required fixes)**

If manual verification surfaced any fixes, stage and commit them with a description of what was fixed:

```bash
git add -A
git commit -m "fix: address visual issues found in landing page verification"
```

If no fixes were needed, no commit is required for this task.

---

## Post-plan cleanup note (informational, not a task)

`public/images/features.webp` and `public/images/problem/*` become unused once Task 15 deletes `problem-section.tsx`/`value-props.tsx` (their only consumers). Per the project's surgical-changes convention, these binary assets are intentionally left in place rather than deleted as part of this plan — flag them to the user if a follow-up cleanup is ever wanted.
