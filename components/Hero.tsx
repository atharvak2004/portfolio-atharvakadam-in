"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".hero-item", {
          opacity: 1,
          y: 0,
          x: 0,
        });
        return;
      }

      gsap
        .timeline({
          defaults: {
            ease: "power3.out",
          },
        })
        .fromTo(
          ".hero-image",
          {
            opacity: 0,
            x: -25,
            rotate: -4,
          },
          {
            opacity: 1,
            x: 0,
            rotate: -10,
            duration: 0.8,
          }
        )
        .fromTo(
          ".hero-title",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.45"
        )
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .fromTo(
          ".hero-project-image",
          {
            opacity: 0,
            y: 40,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden px-5 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-14 md:px-12 md:pt-12 md:pb-16 lg:px-16"
    >
      {/* Editorial horizontal lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 top-[28%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[48%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[68%] border-t border-black/[0.035]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Hero Introduction */}
        <div className="flex items-center pt-2 md:pt-4">
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr_auto] md:gap-8 lg:gap-12">
            {/* Profile Image */}
            <div className="hero-item hero-image relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-[22px] bg-ink sm:h-32 sm:w-32 md:mx-0 md:h-36 md:w-36 lg:h-40 lg:w-40">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
                alt="Atharva, software developer"
                fill
                priority
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Name */}
            <div className="hero-item hero-title text-center md:text-left">
              <p className="font-mono text-2xl leading-none text-rust sm:text-3xl lg:text-4xl">
                I&apos;M
              </p>

              <h1 className="mt-1 font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl">
                Atharva
              </h1>
            </div>

            {/* Description */}
            <div className="hero-item hero-description max-w-md text-center md:text-left lg:max-w-sm">
              <p className="font-mono text-xl leading-[1.35] text-ink sm:text-2xl lg:text-[26px]">
                A Creative Software
                <br className="hidden sm:block" />
                Developer Building
                <br className="hidden sm:block" />
                Digital Experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Image / Project Showcase */}
        <div className="hero-item hero-project-image relative mt-8 overflow-hidden rounded-[24px] border border-black/10 bg-cream-dark sm:mt-10 md:mt-12">
          <div className="relative h-[280px] w-full sm:h-[380px] md:h-[480px] lg:h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1600&h=1000&fit=crop"
              alt="Software project showcase"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            {/* Image Overlay */}
            <div className="absolute inset-0 bg-ink/10" />

            {/* Project Label */}
            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              <span className="rounded-full border border-white/20 bg-ink/80 px-4 py-2 font-mono text-xs text-cream backdrop-blur-md sm:text-sm">
                // SELECTED WORK
              </span>
            </div>

            {/* Project Number */}
            <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
              <span className="font-mono text-sm text-cream">
                // 01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}