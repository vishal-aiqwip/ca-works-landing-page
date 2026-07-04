"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const EASE = "power3.out";
const DURATION = 0.7;
const Y_OFFSET = 28;

/**
 * Mount once per page. Scans the DOM for the data-intro-* and data-reveal-*
 * marker attributes and wires up GSAP entrance/scroll animations for them.
 * Renders nothing.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      document
        .querySelectorAll<HTMLElement>("[data-intro-group]")
        .forEach((group) => {
          const items =
            group.querySelectorAll<HTMLElement>("[data-intro-item]");
          if (!items.length) return;
          gsap.from(items, {
            opacity: 0,
            y: 20,
            duration: DURATION,
            ease: EASE,
            stagger: 0.12,
            delay: 0.1,
          });
        });

      ScrollTrigger.batch("[data-reveal]", {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: Y_OFFSET,
            duration: DURATION,
            ease: EASE,
            stagger: 0.1,
            overwrite: true,
          }),
      });

      ScrollTrigger.batch("[data-reveal-scale]", {
        start: "top 85%",
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            scale: 0.94,
            duration: DURATION,
            ease: EASE,
            overwrite: true,
          }),
      });

      document
        .querySelectorAll<HTMLElement>("[data-reveal-group]")
        .forEach((group) => {
          const items =
            group.querySelectorAll<HTMLElement>("[data-reveal-item]");
          if (!items.length) return;
          gsap.from(items, {
            opacity: 0,
            y: Y_OFFSET,
            duration: DURATION,
            ease: EASE,
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });
    });

    return () => mm.revert();
  }, []);

  return null;
}
