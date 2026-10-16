"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const capabilities = [
  {
    title: "Branding",
    image: "atharva-portfolio-branding.png",
  },
  {
    title: "Website",
    image: "atharva-portfolio-website.png",
  },
  {
    title: "App",
    image: "atharva-portfolio-app.png",
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const q = gsap.utils.selector(section);

    const ctx = gsap.context(() => {
      /* 1) Header: icon pops in, then heading + description follow */
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: q(".cap-header")[0],
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          q(".cap-icon"),
          { opacity: 0, scale: 0.4, rotate: -60 },
          {
            opacity: 1,
            scale: 1,
            rotate: -12,
            duration: 0.8,
            ease: "back.out(2)",
          }
        )
        .fromTo(
          q(".cap-heading"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          q(".cap-desc"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );

      /* 2) Cards: staggered rise (batched so it also works when stacked on mobile) */
      const cards = q(".cap-card");
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.97 });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.14,
          }),
      });

      /* 3) Inside each card: image wipes open, then the title rises */
      cards.forEach((card) => {
        const image = card.querySelector(".cap-image");
        const title = card.querySelector(".cap-title");

        gsap.set(image, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(title, { opacity: 0, y: 14 });

        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
            delay: 0.3,
          })
          .to(image, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
          })
          .to(title, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      });
    }, section);

    // Re-measure trigger positions once images load and the preloader is gone
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("preloader:done", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("preloader:done", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
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
        <div className="cap-header mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-7">
          {/* Icon */}
          <div className="cap-icon flex h-9 w-9 shrink-0 rotate-[-12deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaStar className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Heading */}
          <h2 className="cap-heading shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            CAPABILITIES
          </h2>

          {/* Description */}
          <p className="cap-desc max-w-[260px] font-mono text-sm leading-[1.4] text-ink sm:text-[15px]">
            Here&apos;s how I help businesses
            <br className="hidden sm:block" />
            bring their ideas to life
            <br className="hidden sm:block" />
            through development.
          </p>
        </div>

        {/* Capability Cards */}
        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 md:gap-5">
          {capabilities.map((cap) => (
            // Outer wrapper is animated by GSAP; the inner card keeps its own
            // hover lift so the two transforms never conflict
            <div key={cap.title} className="cap-card">
              <div className="group relative overflow-hidden rounded-[16px] border border-black/10 bg-[#faf9f4] p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-4">
                {/* Grid Paper Background */}
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        to right,
                        rgba(20,20,15,0.055) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        to bottom,
                        rgba(20,20,15,0.055) 1px,
                        transparent 1px
                      )
                    `,
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Card Content */}
                <div className="relative z-10">
                  {/* Image */}
                  <div className="cap-image relative aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-ink">
                    <Image
                      src={`/${cap.image}`}
                      alt={`${cap.title} work sample`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-black/[0.04] transition-colors duration-300 group-hover:bg-transparent" />
                  </div>

                  {/* Title */}
                  <div className="flex items-center justify-center py-5 pb-2">
                    <p className="cap-title font-display text-base font-medium tracking-tight text-ink sm:text-[17px]">
                      {cap.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}