# Problem Section Redesign — Design Spec

## Context

The landing page's "Problem" section (`src/app/(web)/_components/problem-section.tsx`)
currently shows a static team photo + heading/body on the left and a stacked list of
5 icon-badged problem cards on the right.

The user wants this section restyled to match the layout of a reference screenshot
(a Supahub-style feature section): label + heading on one side, description + CTA on
the other, a large rounded image card in the middle, a plain 3-column feature grid
below it, and the middle image area turned into a carousel.

## Layout

Two-row structure, top row split into two columns (stacks to one column below `md`):

1. **Top row**
   - Left: existing label "THE PROBLEM" (small, uppercase, bold, `#F0506B`, left-aligned
     instead of centered) + existing heading "Manual client communication is eating
     your team's day".
   - Right: a single merged description paragraph combining the current intro blurb
     ("Your team is losing time following up for documents, sending reminders and
     answering questions.") and the current body copy ("Every return, every client,
     every month: the same chasing, collecting and reminding. Done by hand, it never
     ends and never scales.") + a "Book a Demo" button (same style/variant as the
     Hero's primary CTA) linking to `BOOKING_URL` from `@/config`.

2. **Middle**: a large rounded card (`rounded-2xl` or `rounded-[28px]`) with a light
   blue tint background (consistent with the brand blue used in the hero gradient —
   NOT the reference's lavender), containing:
   - A carousel (shadcn `Carousel`/`CarouselContent`/`CarouselItem` from
     `src/components/ui/carousel.tsx`) cycling through the two existing images,
     `/images/team.webp` and `/images/features.webp`, auto-advancing via the
     already-installed `embla-carousel-autoplay` plugin.
   - A small decorative sparkle icon (lucide `Sparkles`) in the top-right corner of
     the card, amber-tinted (`#F5A623`, matching the existing warm accent used in the
     problem cards) — purely decorative, no interaction.
   - Two small dot indicators centered below the carousel, showing which slide is
     active (filled/enlarged dot for the current slide, muted for the other),
     wired to the carousel's `api.selectedScrollSnap()`/`on("select", ...)`.

3. **Bottom**: the existing 5 `PROBLEMS` entries, restyled as plain text — bold title
   + body copy, no icon/badge — laid out in a responsive grid that shows 3 columns
   on desktop (wrapping to a second row of 2), 1 column on mobile. All 5 problems are
   kept; nothing is trimmed.

## Removed

- The current `team.webp` image block and its adjacent heading/body pair (the content
  is folded into the new top-row description; the heading is reused as-is in the top
  row's left column).
- The icon badges (`p.icon`, `p.soft`, `p.tint` styling) on each problem card — the
  `PROBLEMS` array's `icon`, `soft`, `tint` fields become unused and can be dropped
  from the data since nothing else in the codebase references this array.

## Implementation notes

- Reuse `src/components/ui/carousel.tsx` as-is (no changes needed to the shared
  component); build the autoplay plugin wiring and dot indicators locally inside
  `problem-section.tsx`.
- Preserve the existing `data-reveal` / `data-reveal-group` / `data-reveal-item`
  scroll-reveal attributes on the equivalent new elements, following the same
  convention already used elsewhere in this file and sibling sections (see
  `ScrollReveal` component usage).
- Match existing typography/spacing conventions already present in this file and
  sibling sections (`trust-bar.tsx`, `testimonials.tsx`) rather than introducing new
  scale values.
- No new dependencies required — `embla-carousel-autoplay` and `embla-carousel-react`
  are already in `package.json`.

## Out of scope

- No changes to the `PROBLEMS` copy/content itself (title/body text stays the same).
- No changes to any other landing page section.
- No new image assets — carousel is limited to the two images that already exist.
