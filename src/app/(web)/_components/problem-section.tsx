"use client";

import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Bell,
  Inbox,
  ListFilter,
  Repeat,
  Shuffle,
  Sparkles,
} from "lucide-react";

import {
  Button,
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  Image,
} from "@/components";
import { BOOKING_URL } from "@/config";

const PROBLEMS = [
  {
    icon: <Repeat size={24} />,
    soft: "#FDE7EB",
    tint: "#F0506B",
    title: "Endless follow-ups",
    body: "You reach out three, four, five times for one missing document, and still have to ask again next month.",
  },
  {
    icon: <Shuffle size={24} />,
    soft: "#FEF1DC",
    tint: "#F5A623",
    title: "Documents scattered everywhere",
    body: "Clients send files over WhatsApp, email and drive links: unnamed, out of order and easy to lose track of.",
  },
  {
    icon: <ListFilter size={24} />,
    soft: "#ECF3FE",
    tint: "#0464E4",
    title: "Gathering & sorting by hand",
    body: "Collecting attachments, renaming them, filing them against the right client and chasing what's still missing. Hours gone.",
  },
  {
    icon: <Bell size={26} />,
    soft: "#FEF1DC",
    tint: "#F5A623",
    title: "Reminders typed out one by one",
    body: "Filing deadlines and pending payments need constant nudging, and every message is written and sent manually.",
  },
  {
    icon: <Inbox size={24} />,
    soft: "#FDE7EB",
    tint: "#F0506B",
    title: "It simply doesn't scale",
    body: "Hundreds of clients across every channel, and no team can handle all of that communication manually without things slipping.",
  },
];

const SLIDES = [
  { src: "/images/team.webp", alt: "CA team at work" },
  { src: "/images/features.webp", alt: "CA Works product features" },
];

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
        <div
          data-reveal-group
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14"
        >
          <div data-reveal-item>
            <div className="mb-4.5 font-extrabold text-[#F0506B] text-[13px] uppercase tracking-[0.1em]">
              The problem
            </div>
            <h2 className="font-bold text-2xl text-foreground leading-[1.14] tracking-[-0.025em] md:text-[34px]">
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
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  Book a Demo
                </a>
              </Button>
            </div>
          </div>
        </div>

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

export default ProblemSection;
