"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaQuoteLeft } from "react-icons/fa6";
import { useReveal } from "@/lib/useReveal";

const testimonials = [
  {
    name: "Prasanna Deshmukh",
    role: "Founder of RisingUp",
    quote:
      "Atharva transformed our concept into a product that's intuitive and visually striking. His attention to detail is unmatched.",
  },
  {
    name: "Nilesh Chavan",
    role: "Founder of Bo-Stone Robo",
    quote:
      "Working with Atharva felt like adding a co-founder, not a contractor. He pushed our product forward and delivered beyond expectations.",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const busy = useRef(false);
  const direction = useRef<1 | -1>(1);
  const firstRender = useRef(true);

  // Slide-out: runs on click, then swaps the content
  const goTo = (next: number, dir: 1 | -1) => {
    if (busy.current) return;

    const wrapped = (next + testimonials.length) % testimonials.length;
    if (wrapped === index) return;

    const el = contentRef.current;
    if (!el || prefersReducedMotion()) {
      setIndex(wrapped);
      return;
    }

    busy.current = true;
    direction.current = dir;

    gsap.to(el.querySelectorAll(".t-item"), {
      opacity: 0,
      x: -28 * dir,
      duration: 0.28,
      stagger: 0.04,
      ease: "power2.in",
      onComplete: () => setIndex(wrapped),
    });
  };

  // Slide-in: runs after React has rendered the new testimonial
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const el = contentRef.current;
    if (!el || prefersReducedMotion()) {
      busy.current = false;
      return;
    }

    const items = el.querySelectorAll(".t-item");
    const tween = gsap.fromTo(
      items,
      { opacity: 0, x: 28 * direction.current },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        onComplete: () => {
          busy.current = false;
        },
      }
    );

    return () => {
      tween.kill();
      busy.current = false;
    };
  }, [index]);

  const active = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      {/* Editorial horizontal lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 top-[8%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[18%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[28%] border-t border-black/[0.035]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-7">
          <div className="flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaQuoteLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </div>

          <h2 className="shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            TESTIMONIALS
          </h2>

          <p className="max-w-[230px] font-mono text-sm leading-[1.4] text-ink sm:text-[15px]">
            Hear from those who&apos;ve
            <br className="hidden sm:block" />
            experienced Atharva&apos;s
            <br className="hidden sm:block" />
            expertise firsthand.
          </p>
        </div>

        {/* Testimonial card */}
        <div
          ref={ref}
          className="reveal-item mx-auto mt-10 max-w-3xl rounded-[16px] border border-black/10 bg-cream-dark p-6 sm:mt-12 sm:p-10"
        >
          {/* Animated content (quote + person) */}
          <div ref={contentRef} className="flex min-h-[220px] flex-col justify-between sm:min-h-[240px]">
            <div>
              <FaQuoteLeft className="t-item h-6 w-6 text-rust sm:h-7 sm:w-7" />

              <p className="t-item mt-4 font-mono text-base leading-[1.7] text-ink sm:text-lg">
                {active.quote}
              </p>
            </div>

            <div className="t-item mt-8">
              <p className="font-mono text-sm font-medium text-ink">
                {active.name}
              </p>
              <p className="mt-1 font-mono text-xs text-rust">{active.role}</p>
            </div>
          </div>

          {/* Controls (not animated, always visible) */}
          <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-5">
            {/* Counter + dots */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-ink/60">
                {pad(index + 1)} / {pad(testimonials.length)}
              </span>

              <div className="flex items-center gap-1.5">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => goTo(i, i > index ? 1 : -1)}
                    aria-label={`Show testimonial from ${t.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-rust" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(index - 1, -1)}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-ink/15 bg-cream transition-all duration-200 hover:bg-ink hover:text-cream active:scale-95"
              >
                ←
              </button>

              <button
                onClick={() => goTo(index + 1, 1)}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-ink/15 bg-cream transition-all duration-200 hover:bg-ink hover:text-cream active:scale-95"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}