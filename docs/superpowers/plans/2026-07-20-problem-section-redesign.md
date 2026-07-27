# Problem Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `src/app/(web)/_components/problem-section.tsx` into a two-row layout (label/heading + description/CTA on top, a middle carousel card, a plain 3-column problem grid at the bottom), per `docs/superpowers/specs/2026-07-20-problem-section-redesign-design.md`.

**Architecture:** Single-file component rewrite, done in three incremental, independently-verifiable passes: (1) top row restructure, (2) middle carousel card, (3) bottom grid restyle. All three passes touch only `src/app/(web)/_components/problem-section.tsx`; task 2 additionally adds one export line to the shared `src/components/index.ts` barrel so the already-existing (but currently unused) shadcn `Carousel` component becomes importable the same way every other UI primitive in this codebase is.

**Tech Stack:** Next.js (App Router) + React 19 + Tailwind, shadcn-style UI components, `embla-carousel-react` + `embla-carousel-autoplay` (already installed), `lucide-react` icons, Biome for linting.

## Global Constraints

- No test framework exists in this repo (`package.json` has no `test` script, no `*.test.*` files). Verification for every task in this plan is: (a) `npm run lint -- <file>` must pass with zero errors, and (b) a Playwright CLI screenshot of the running dev server, viewed with the Read tool, must visually match the task's described change. This replaces the usual "write failing test" step.
- The dev server is assumed to be running at `http://localhost:3000` (Next.js dev + turbopack hot-reloads on save; if it isn't running, start it with `npm run dev` in the background and wait for `curl -sf http://localhost:3000` to succeed before screenshotting).
- Match existing typography/spacing/color conventions already present in this file and sibling sections (`trust-bar.tsx`, `testimonials.tsx`, `hero.tsx`) — do not introduce new scale values or a new component library.
- Keep all 5 `PROBLEMS` entries and their existing title/body copy verbatim — only the `icon`/`soft`/`tint` fields and their rendering are dropped (task 3).
- No new dependencies. No new image assets — the carousel is limited to `/images/team.webp` and `/images/features.webp`, which already exist in `public/images/`.

---

### Task 1: Top row restructure (label/heading + description/CTA)

**Files:**
- Modify: `src/app/(web)/_components/problem-section.tsx` (currently 108 lines — see below for exact before/after)

**Interfaces:**
- Consumes: `Button` from `@/components` (existing component, `variant="default-shadow"` / `size="lg"` / `asChild` props already used identically in `src/app/(web)/_components/hero.tsx:29-33`), `BOOKING_URL` from `@/config` (existing string constant).
- Produces: nothing consumed by later tasks directly — task 2 and 3 append/replace sibling JSX blocks in the same file, not this task's output.

- [ ] **Step 1: Replace the file's imports and top-of-JSX structure**

Replace lines 1–3 (imports) with:

```tsx
import { Bell, Inbox, ListFilter, Repeat, Shuffle } from "lucide-react";

import { Button } from "@/components";
import { BOOKING_URL } from "@/config";
```

(This drops the now-unused `import { Image } from "@/components";` — task 1 removes the only place that used it. Task 2 re-adds `Image` to the `@/components` import when the carousel needs it.)

Replace the component body (currently lines 43–105, from `const ProblemSection = () => {` through the closing `};`) with:

```tsx
const ProblemSection = () => {
  return (
    <section data-problem-section className="bg-white">
      <div className="mx-auto max-w-[95%] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div
          data-reveal-group
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14"
        >
          <div data-reveal-item>
            <div className="mb-4.5 font-extrabold text-[#F0506B] text-[13px] uppercase tracking-[0.1em]">
              The problem
            </div>
            <h2 className="font-bold text-foreground text-2xl leading-[1.14] tracking-[-0.025em] md:text-[34px]">
              Manual client communication is eating your team's day
            </h2>
          </div>
          <div data-reveal-item className="flex flex-col justify-center gap-6">
            <p className="text-[17px] text-muted-foreground leading-[1.6]">
              Your team is losing time following up for documents, sending
              reminders and answering questions. Every return, every client,
              every month: the same chasing, collecting and reminding. Done by
              hand, it never ends and never scales.
            </p>
            <div>
              <Button variant="default-shadow" size="lg" asChild>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Demo
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-3.5 sm:mt-14"
          data-reveal-group
        >
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              data-reveal-item
              className="flex gap-4 rounded-2xl border border-muted-foreground/15 bg-white p-5.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)]"
            >
              <div
                className="flex size-11 flex-none items-center justify-center rounded-xl"
                style={{ background: p.soft, color: p.tint }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="mb-1.5 font-bold text-[17px]">{p.title}</h3>
                <p className="text-[#596B75] text-[14.5px] leading-[1.55]">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

Leave the `PROBLEMS` array (lines 5–41) and `export default ProblemSection;` (final line) untouched.

- [ ] **Step 2: Lint the file**

Run: `npm run lint -- "src/app/(web)/_components/problem-section.tsx"`
Expected: no errors (no unused-import or unused-variable warnings).

- [ ] **Step 3: Screenshot and visually verify**

Run:
```bash
npx --yes playwright screenshot --viewport-size=1280,900 --wait-for-selector "[data-problem-section]" --full-page http://localhost:3000 "C:\Users\visha\AppData\Local\Temp\claude\c--Users-visha-Desktop-caworks\2a66b3ca-6736-485c-9717-13c948987260\scratchpad\problem-section-task1.png"
```
Then Read the resulting PNG. Expected: the Problem section now shows a two-column top row — left side has the small red "THE PROBLEM" label + heading, right side has the merged paragraph + a "Book a Demo" button — followed below by the still-unchanged icon-badged problem list (5 items, one per row).

- [ ] **Step 4: Commit**

```bash
git add "src/app/(web)/_components/problem-section.tsx"
git commit -m "feat: restructure problem section top row into label/heading + description/CTA"
```

---

### Task 2: Middle carousel card

**Files:**
- Modify: `src/components/index.ts:33-34` (add one barrel export line)
- Modify: `src/app/(web)/_components/problem-section.tsx` (add `"use client"`, new imports, `SLIDES` constant, carousel state, and the carousel JSX block)

**Interfaces:**
- Consumes: `Carousel`, `CarouselContent`, `CarouselItem`, `type CarouselApi` from `src/components/ui/carousel.tsx` (existing component, documented props: `setApi?: (api: CarouselApi) => void`, `opts?: CarouselOptions`, `plugins?: CarouselPlugin`; `CarouselApi` exposes `.selectedScrollSnap(): number`, `.on("select", cb)`, `.scrollTo(index: number)` — see `src/components/ui/carousel.tsx:12,64-105`). `Image` from `@/components` (existing wrapper, `fill`/`quality`/`className` props already used at `src/app/(web)/_components/problem-section.tsx` prior to task 1). `Autoplay` default export from `embla-carousel-autoplay`.
- Produces: nothing new consumed by task 3 — task 3 only touches the bottom `PROBLEMS` rendering and the `lucide-react` import line, which are unaffected by this task's additions.

- [ ] **Step 1: Add the carousel export to the shared components barrel**

In `src/components/index.ts`, between the existing `export * from "./ui/card";` and `export * from "./ui/checkbox";` lines, insert:

```ts
export * from "./ui/carousel";
```

- [ ] **Step 2: Update imports in problem-section.tsx**

Add `"use client";` followed by a blank line as the very first line of the file (required because this component now uses `useState`/`useEffect`).

Change the `lucide-react` import to add `Sparkles`:

```tsx
import { Bell, Inbox, ListFilter, Repeat, Sparkles, Shuffle } from "lucide-react";
```

Add two new imports after it, and change the `@/components` import to include `Carousel`, `CarouselContent`, `CarouselItem`, `Image`, and the `CarouselApi` type:

```tsx
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  Image,
} from "@/components";
import { BOOKING_URL } from "@/config";
```

- [ ] **Step 3: Add the SLIDES constant**

After the `PROBLEMS` array closes (after the `];` that ends it), add:

```tsx
const SLIDES = [
  { src: "/images/team.webp", alt: "CA team at work" },
  { src: "/images/features.webp", alt: "CA Works product features" },
];
```

- [ ] **Step 4: Add carousel state and the carousel JSX block**

Change the component to:

```tsx
const ProblemSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    api.on("select", () => setSelectedIndex(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section data-problem-section className="bg-white">
      <div className="mx-auto max-w-[95%] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
```

(the top-row `<div data-reveal-group>...</div>` block from task 1 stays exactly as-is, directly below this)

Immediately after the top row's closing `</div>` and before the `<div className="mt-10 flex flex-col gap-3.5 sm:mt-14" data-reveal-group>` problem-list block, insert:

```tsx
        <div
          data-reveal
          className="relative mt-10 overflow-hidden rounded-[28px] bg-[#EAF2FF] p-6 sm:mt-14 sm:p-10"
        >
          <Sparkles
            className="absolute top-4 right-6 text-[#F5A623] sm:top-6 sm:right-10"
            size={28}
          />
          <Carousel
            setApi={setApi}
            opts={{ loop: true }}
            plugins={[Autoplay({ delay: 4000 })]}
          >
            <CarouselContent className="ml-0">
              {SLIDES.map((slide) => (
                <CarouselItem key={slide.src} className="pl-0">
                  <div className="relative h-[280px] overflow-hidden rounded-2xl border border-[#DCE4F0] sm:h-[420px]">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      quality={100}
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-5 flex items-center justify-center gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={
                  index === selectedIndex
                    ? "h-2 w-6 rounded-full bg-primary transition-all"
                    : "h-2 w-2 rounded-full bg-primary/25 transition-all"
                }
              />
            ))}
          </div>
        </div>
```

- [ ] **Step 5: Lint the files**

Run: `npm run lint -- "src/app/(web)/_components/problem-section.tsx" "src/components/index.ts"`
Expected: no errors.

- [ ] **Step 6: Screenshot and visually verify slide 1**

Run:
```bash
npx --yes playwright screenshot --viewport-size=1280,1200 --wait-for-selector "[data-problem-section]" --full-page http://localhost:3000 "C:\Users\visha\AppData\Local\Temp\claude\c--Users-visha-Desktop-caworks\2a66b3ca-6736-485c-9717-13c948987260\scratchpad\problem-section-task2-slide1.png"
```
Then Read the PNG. Expected: a light-blue rounded card sits below the top row, showing `team.webp`, a small amber sparkle icon in the top-right corner of the card, and two dot indicators centered below the image (first dot wider/filled).

- [ ] **Step 7: Screenshot and visually verify autoplay advances to slide 2**

Run:
```bash
npx --yes playwright screenshot --viewport-size=1280,1200 --wait-for-selector "[data-problem-section]" --wait-for-timeout 5000 --full-page http://localhost:3000 "C:\Users\visha\AppData\Local\Temp\claude\c--Users-visha-Desktop-caworks\2a66b3ca-6736-485c-9717-13c948987260\scratchpad\problem-section-task2-slide2.png"
```
Then Read the PNG. Expected: the carousel has advanced — `features.webp` is now visible instead of `team.webp`, and the second dot is now the wider/filled one.

- [ ] **Step 8: Commit**

```bash
git add "src/app/(web)/_components/problem-section.tsx" "src/components/index.ts"
git commit -m "feat: add autoplay carousel card to problem section"
```

---

### Task 3: Bottom grid restyle (drop icon badges, plain 3-column layout)

**Files:**
- Modify: `src/app/(web)/_components/problem-section.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed elsewhere — this is the final task in the file.

- [ ] **Step 1: Simplify the PROBLEMS array**

Replace the `PROBLEMS` array with:

```tsx
const PROBLEMS = [
  {
    title: "Endless follow-ups",
    body: "You reach out three, four, five times for one missing document, and still have to ask again next month.",
  },
  {
    title: "Documents scattered everywhere",
    body: "Clients send files over WhatsApp, email and drive links: unnamed, out of order and easy to lose track of.",
  },
  {
    title: "Gathering & sorting by hand",
    body: "Collecting attachments, renaming them, filing them against the right client and chasing what's still missing. Hours gone.",
  },
  {
    title: "Reminders typed out one by one",
    body: "Filing deadlines and pending payments need constant nudging, and every message is written and sent manually.",
  },
  {
    title: "It simply doesn't scale",
    body: "Hundreds of clients across every channel, and no team can handle all of that communication manually without things slipping.",
  },
];
```

- [ ] **Step 2: Remove the now-unused lucide-react icon imports**

Change:

```tsx
import { Bell, Inbox, ListFilter, Repeat, Sparkles, Shuffle } from "lucide-react";
```

to:

```tsx
import { Sparkles } from "lucide-react";
```

- [ ] **Step 3: Replace the bottom problem-list JSX**

Replace the block:

```tsx
        <div
          className="mt-10 flex flex-col gap-3.5 sm:mt-14"
          data-reveal-group
        >
          {PROBLEMS.map((p) => (
            <div
              key={p.title}
              data-reveal-item
              className="flex gap-4 rounded-2xl border border-muted-foreground/15 bg-white p-5.5 shadow-[0_1px_2px_rgba(16,34,51,0.04)]"
            >
              <div
                className="flex size-11 flex-none items-center justify-center rounded-xl"
                style={{ background: p.soft, color: p.tint }}
              >
                {p.icon}
              </div>
              <div>
                <h3 className="mb-1.5 font-bold text-[17px]">{p.title}</h3>
                <p className="text-[#596B75] text-[14.5px] leading-[1.55]">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
```

with:

```tsx
        <div
          className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:mt-14 sm:grid-cols-3"
          data-reveal-group
        >
          {PROBLEMS.map((p) => (
            <div key={p.title} data-reveal-item>
              <h3 className="mb-2 font-bold text-[17px]">{p.title}</h3>
              <p className="text-[#596B75] text-[14.5px] leading-[1.55]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
```

- [ ] **Step 4: Lint the file**

Run: `npm run lint -- "src/app/(web)/_components/problem-section.tsx"`
Expected: no errors.

- [ ] **Step 5: Screenshot and visually verify**

Run:
```bash
npx --yes playwright screenshot --viewport-size=1280,1300 --wait-for-selector "[data-problem-section]" --full-page http://localhost:3000 "C:\Users\visha\AppData\Local\Temp\claude\c--Users-visha-Desktop-caworks\2a66b3ca-6736-485c-9717-13c948987260\scratchpad\problem-section-task3.png"
```
Then Read the PNG. Expected: below the carousel card, the 5 problems now render as plain bold titles + body text (no icon badges, no card border) in a 3-column grid that wraps to a second row of 2 on desktop widths, and stacks to 1 column on mobile widths.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(web)/_components/problem-section.tsx"
git commit -m "feat: restyle problem list as plain 3-column grid"
```

---

## Self-Review Notes

- **Spec coverage:** Top row (label/heading/description/CTA) → Task 1. Carousel card with autoplay, sparkle, dots, light-blue tint → Task 2. Plain 3-column problem grid, all 5 items kept → Task 3. Barrel export addition for `Carousel` → Task 2, Step 1. All spec sections covered.
- **Placeholder scan:** no TBD/TODO; every step shows full code, not descriptions.
- **Type consistency:** `CarouselApi`, `setApi`, `api.selectedScrollSnap()`, `api.on("select", ...)`, `api.scrollTo(index)` are used identically in Task 2's steps 2 and 4, matching the real signatures in `src/components/ui/carousel.tsx`. `SLIDES` shape (`{ src, alt }`) is defined once in Task 2 Step 3 and consumed identically in Step 4.
