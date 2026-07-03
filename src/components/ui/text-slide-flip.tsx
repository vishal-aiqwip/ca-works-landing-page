"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib";

interface TextSlideFlipProps {
  words: string[];
  /** Time each word is visible before flipping (ms) */
  interval?: number;
  className?: string;
}

export default function TextSlideFlip({
  words,
  interval = 3000,
  className,
}: TextSlideFlipProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | "auto">("auto");
  const containerRef = useRef<HTMLSpanElement>(null);
  const activeWord = words[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <motion.span
      ref={containerRef}
      className={cn(
        "relative inline-flex overflow-hidden align-bottom",
        className,
      )}
      animate={{ width }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={activeWord}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="whitespace-nowrap"
          onAnimationStart={() => {
            requestAnimationFrame(() => {
              const el = containerRef.current?.querySelector(
                "[data-flip-text]",
              ) as HTMLElement | null;
              if (el && containerRef.current) {
                const styles = getComputedStyle(containerRef.current);
                const px =
                  parseFloat(styles.paddingLeft) +
                  parseFloat(styles.paddingRight);
                setWidth(el.offsetWidth + px);
              }
            });
          }}
          data-flip-text=""
        >
          {activeWord}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
