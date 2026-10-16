"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCode } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const projects = [
  {
    title: "Building Scalable Web Applications",
    description:
      "Shipping client products with Next.js, React/Redux, TypeScript, and Django REST Framework, with a focus on clean architecture, SEO, and fast page loads.",
    image: "/working-web.png",
  },
  {
    title: "Exploring Cybersecurity",
    description:
      "Learning how to secure web applications: authentication, API protection, and common vulnerabilities, and applying it to the projects I build.",
    image: "/working-cyber.png",
  },
];

export default function WorkingOnNow() {
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
            trigger: q(".wo-header")[0],
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          q(".wo-icon"),
          { opacity: 0, scale: 0.4, rotate: -60 },
          {
            opacity: 1,
            scale: 1,
            rotate: -10,
            duration: 0.8,
            ease: "back.out(2)",
          }
        )
        .fromTo(
          q(".wo-heading"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          q(".wo-desc"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );

      /* 2) Project cards: staggered rise (batched so it also works when stacked on mobile) */
      const cards = q(".wo-card");
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

      /* 3) Inside each card: image wipes open, number fades in, text rises */
      cards.forEach((card) => {
        const image = card.querySelector(".wo-image");
        const num = card.querySelector(".wo-num");
        const textItems = card.querySelectorAll(".wo-text");

        gsap.set(image, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(num, { opacity: 0, y: -10 });
        gsap.set(textItems, { opacity: 0, y: 16 });

        gsap
          .timeline({
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
            clearProps: "clipPath",
          })
          .to(
            num,
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.35"
          )
          .to(
            textItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            },
            "-=0.3"
          );
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
      id="working-on"
      ref={sectionRef}
      className="relative mt-6 overflow-hidden rounded-card bg-ink px-5 py-14 text-cream sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      {/* Editorial horizontal lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 right-0 top-[8%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[18%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[28%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[38%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[48%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[58%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[68%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[78%] border-t border-white/[0.035]" />
        <div className="absolute left-0 right-0 top-[88%] border-t border-white/[0.035]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="wo-header mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {/* Icon */}
          <div className="wo-icon flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaCode className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Heading */}
          <h2 className="wo-heading shrink-0 font-display text-2xl font-black uppercase leading-none tracking-[-0.04em] sm:text-3xl md:text-4xl">
            WHAT I&apos;M
            <br className="sm:hidden" /> WORKING ON NOW
          </h2>

          {/* Description */}
          <p className="wo-desc max-w-[230px] font-mono text-sm leading-[1.4] text-cream/70 sm:text-[15px]">
            A look at what I&apos;m currently building, learning, and
            exploring.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 md:gap-7">
          {projects.map((project, i) => (
            <article key={project.title} className="wo-card group">
              {/* Image */}
              <div className="wo-image relative h-[260px] overflow-hidden rounded-[14px] bg-forest sm:h-[300px] md:h-[330px] lg:h-[360px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-black/[0.08] transition-colors duration-500 group-hover:bg-black/[0.02]" />

                {/* Project number */}
                <div className="absolute right-4 top-4">
                  <span className="wo-num inline-block font-mono text-xs text-cream/80">
                    // 0{i + 1}
                  </span>
                </div>
              </div>

              {/* Project information */}
              <div className="mt-4">
                <h3 className="wo-text max-w-lg font-mono text-sm leading-[1.5] text-cream sm:text-base">
                  {project.title}
                </h3>

                <p className="wo-text mt-2 max-w-lg font-mono text-xs leading-[1.6] text-cream/50 sm:text-sm">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}