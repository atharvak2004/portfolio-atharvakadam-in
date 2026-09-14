"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReveal } from "@/lib/useReveal";

const testimonials = [
  {
    name: "Daniel Carter",
    role: "Founder of Flowbit",
    image: "/testimonials/daniel-carter.png",
    quote:
      "Atharva transformed our concept into a product that's intuitive and visually striking. His attention to detail is unmatched.",
  },
  {
    name: "Michael Reeves",
    role: "PM at NovaLabs",
    image: "/testimonials/michael-reeves.png",
    quote:
      "Working with Atharva felt like adding a co-founder, not a contractor. He pushed our product forward and delivered beyond expectations.",
  },
];

// Stack offsets — index 0 = front card, higher = further back
const CARD_STYLE = (distanceFromFront: number) => {
  if (distanceFromFront === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      zIndex: 30,
      boxShadow: "0 24px 40px -22px rgba(0,0,0,0.35)",
    };
  }
  return {
    x: 18 * distanceFromFront,
    y: 18 * distanceFromFront,
    scale: 1 - 0.06 * distanceFromFront,
    rotate: -4 * distanceFromFront,
    zIndex: 30 - distanceFromFront,
    boxShadow: "0 12px 24px -16px rgba(0,0,0,0.25)",
  };
};

export default function Testimonials() {
  const ref = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const quoteRef = useRef<HTMLParagraphElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set initial stack positions on mount
  useEffect(() => {
    testimonials.forEach((_, i) => {
      const dist =
        (i - index + testimonials.length) % testimonials.length;
      const el = cardRefs.current[i];
      if (el) gsap.set(el, CARD_STYLE(dist));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (next: number) => {
    const wrapped =
      (next + testimonials.length) % testimonials.length;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Animate the image stack: front card slides back/under,
    // the next-up card rises to the front and on top.
    testimonials.forEach((_, i) => {
      const dist =
        (i - wrapped + testimonials.length) % testimonials.length;
      const el = cardRefs.current[i];
      if (!el) return;

      if (reduced) {
        gsap.set(el, CARD_STYLE(dist));
      } else {
        gsap.to(el, {
          ...CARD_STYLE(dist),
          duration: 0.55,
          ease: "power3.out",
        });
      }
    });

    const el = quoteRef.current;

    if (!el || reduced) {
      setIndex(wrapped);
      return;
    }

    gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => {
        setIndex(wrapped);

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          }
        );
      },
    });
  };

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
          {/* Quote Icon */}
          <div className="flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center overflow-hidden rounded-[9px] bg-rust sm:h-10 sm:w-10">
            <Image
              src="/quote.png"
              alt="Quote"
              width={24}
              height={24}
              className="h-5 w-5 object-contain sm:h-6 sm:w-6"
            />
          </div>

          {/* Heading */}
          <h2 className="shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            TESTIMONIALS
          </h2>

          {/* Description */}
          <p className="max-w-[230px] font-mono text-sm leading-[1.4] text-ink sm:text-[15px]">
            Hear from those who&apos;ve
            <br className="hidden sm:block" />
            experienced Atharva&apos;s
            <br className="hidden sm:block" />
            expertise firsthand.
          </p>
        </div>

        {/* Testimonial */}
        <div
          ref={ref}
          className="reveal-item mt-10 grid gap-7 sm:mt-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10 lg:gap-12"
        >
          {/* Images */}
          <div className="overflow-hidden rounded-[16px] border border-black/10 bg-cream-dark">
            {/* Stacked card deck */}
            <div className="p-3 sm:p-4">
              <div className="relative h-[194px] sm:h-[244px] md:h-[284px] lg:h-[314px]">
                {testimonials.map((t, i) => (
                  <div
                    key={t.name}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="absolute inset-0 overflow-hidden rounded-[14px] border border-black/10 bg-[#f4f1e8]"
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 60vw, 30vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 border-t border-black/10">
              <div className="px-3 py-3 sm:px-4">
                <p className="font-mono text-xs font-medium text-ink sm:text-sm">
                  Daniel Carter
                </p>

                <p className="mt-1 font-mono text-[10px] text-rust sm:text-xs">
                  Founder of Flowbit
                </p>
              </div>

              <div className="border-l border-black/10 px-3 py-3 sm:px-4">
                <p className="font-mono text-xs font-medium text-ink sm:text-sm">
                  Michael Reeves
                </p>

                <p className="mt-1 font-mono text-[10px] text-rust sm:text-xs">
                  PM at NovaLabs
                </p>
              </div>
            </div>
          </div>

          {/* Quote Content */}
          <div className="flex flex-col justify-between md:min-h-[300px] lg:min-h-[330px]">
            {/* Quote Mark */}
            <div>
              <Image
                src="/quote.png"
                alt="Quote mark"
                width={32}
                height={32}
                className="h-7 w-7 object-contain sm:h-8 sm:w-8"
              />

              {/* Quote */}
              <p
                ref={quoteRef}
                className="mt-4 max-w-lg font-mono text-sm leading-[1.7] text-ink sm:text-base"
              >
                {active.quote}
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="mt-8 flex items-center justify-between md:mt-0">
              {/* Active person */}
              <div>
                <p className="font-mono text-sm font-medium text-ink">
                  {active.name}
                </p>

                <p className="mt-1 font-mono text-xs text-rust">
                  {active.role}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                {/* Previous */}
                <button
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-ink/15 bg-cream transition-all duration-200 hover:bg-ink hover:text-cream active:scale-95"
                >
                  ←
                </button>

                {/* Next */}
                <button
                  onClick={() => goTo(index + 1)}
                  aria-label="Next testimonial"
                  className="font-mono text-xs text-rust transition-opacity hover:opacity-70"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}