"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealOptions = {
  /** CSS selector, scoped to the container, for the items to stagger in. */
  targets?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/**
 * Reveals the matched children of the returned ref with a single
 * fade + rise as the section enters the viewport. Respects
 * prefers-reduced-motion by skipping straight to the end state.
 */
export function useReveal<T extends HTMLElement>({
  targets = ".reveal-item",
  y = 28,
  stagger = 0.08,
  duration = 0.8,
  start = "top 80%",
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = el.querySelectorAll(targets);
    if (items.length === 0) return;

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [targets, y, stagger, duration, start]);

  return ref;
}
