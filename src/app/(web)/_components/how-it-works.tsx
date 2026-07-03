"use client";

import { useEffect, useState } from "react";

const STEPS = [
  {
    num: "1",
    title: "Connect your channels",
    body: "Link your firm's WhatsApp Business number and email inbox in a few minutes. No new app for clients to install.",
  },
  {
    num: "2",
    title: "CA Works reads & understands",
    body: "Every incoming message is read, classified and matched to the right client and task automatically.",
  },
  {
    num: "3",
    title: "It replies & acts in your voice",
    body: "Answers routine questions, sends document links, collects uploads and files them automatically, without manual effort.",
  },
  {
    num: "4",
    title: "You stay in control",
    body: "Anything sensitive is escalated to your team with full context, and every conversation is logged and searchable.",
  },
];

const FILL_MS = 3200;
const HOLD_MS = 650;
const FADE_MS = 420;

const HowItWorks = () => {
  const [fillWidth, setFillWidth] = useState(0);
  const [fillOpacity, setFillOpacity] = useState(1);
  const [litCount, setLitCount] = useState(0);
  const [instant, setInstant] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    const run = () => {
      setInstant(true);
      setFillOpacity(1);
      setFillWidth(0);
      setLitCount(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setInstant(false);
          setFillWidth(100);
        });
      });

      STEPS.forEach((_, i) => {
        schedule(
          () => setLitCount(i + 1),
          Math.round((i / (STEPS.length - 1)) * FILL_MS),
        );
      });

      schedule(() => {
        setFillOpacity(0);
        setLitCount(0);
      }, FILL_MS + HOLD_MS);

      schedule(run, FILL_MS + HOLD_MS + FADE_MS + 250);
    };

    run();
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section id="channels" className="bg-[#1C2A33] text-white">
      <div className="mx-auto max-w-[95%] px-8 py-20">
        <div className="mx-auto mb-14 max-w-[60ch] text-center">
          <div className="mb-3.5 font-extrabold text-[13px] text-primary uppercase tracking-[0.1em]">
            How it works
          </div>
          <h2 className="mb-4 whitespace-nowrap font-extrabold text-[40px] leading-[1.1] tracking-[-0.025em]">
            Up and running in 4 simple steps
          </h2>
          <p className="mx-auto max-w-[52ch] text-[#A9B4BD] text-[18px] leading-[1.6]">
            Connect your channels once and effortlessly handle the day-to-day
            client communications
          </p>
        </div>
        <div className="relative">
          <div className="relative mb-5.5 h-[46px]">
            <div className="absolute top-[21.5px] right-[12.5%] left-[12.5%] h-[3px] overflow-hidden rounded-full bg-[#22323D]">
              <div
                className="h-full rounded-full bg-[#0464E4]"
                style={{
                  width: `${fillWidth}%`,
                  opacity: fillOpacity,
                  transition: instant
                    ? "none"
                    : `width ${FILL_MS}ms linear, opacity ${FADE_MS}ms ease`,
                }}
              />
            </div>
            <div className="relative grid h-full grid-cols-4">
              {STEPS.map((s, i) => (
                <div key={s.num} className="flex items-center justify-center">
                  <div
                    className="flex size-[46px] flex-none items-center justify-center rounded-full font-extrabold text-[18px] transition-[background,color,box-shadow] duration-500 ease-out"
                    style={{
                      background: i < litCount ? "#0464E4" : "#22323D",
                      color: i < litCount ? "#fff" : "#5A6B78",
                      boxShadow:
                        i < litCount ? "0 0 0 6px rgba(4,100,228,.16)" : "none",
                    }}
                  >
                    {s.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.num}>
                <h3 className="mb-1.5 font-bold text-[18px] tracking-[-0.01em]">
                  {s.title}
                </h3>
                <p className="text-[#A9B4BD] text-[14.5px] leading-[1.6]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
