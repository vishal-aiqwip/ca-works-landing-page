"use client";

import type { RefObject } from "react";

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
 * intro stagger, scroll-triggered fade-ups, card-group stagger, image/blob
 * parallax, a scroll-velocity-reactive marquee, and magnetic CTA hover.
 * Renders nothing.
 */
export function LandingFx({
  rootRef,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
}) {
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    const magneticHandlers: Array<{
      btn: HTMLAnchorElement;
      onMove: (e: MouseEvent) => void;
      reset: () => void;
    }> = [];

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element = HTMLElement>(selector: string) =>
        Array.from(root.querySelectorAll<T>(selector));

      // Hero headline: masked word-by-word rise on load
      const h1 = root.querySelector<HTMLElement>("h1");
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
      const blob = root.querySelector<HTMLElement>("[data-blob]");
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
      const marquee = root.querySelector<HTMLElement>("[data-marquee]");
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
