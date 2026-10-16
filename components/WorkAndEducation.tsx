"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import type { IconType } from "react-icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/*  Edit your content here                                                    */
/* -------------------------------------------------------------------------- */
type Entry = {
  title: string;
  org: string;
  period: string;
  location?: string;
  points?: string[];
};

type Column = {
  heading: string;
  icon: IconType;
  entries: Entry[];
};

const columns: Column[] = [
  {
    heading: "Work",
    icon: FaBriefcase,
    entries: [
      {
        title: "Full-Stack Developer",
        org: "Prushal Technology",
        period: "Jul 2026 — Present",
        points: [
          "Own features end to end across e-commerce, healthcare, and assessment products.",
          "Work across Next.js, React/Redux, TypeScript, GraphQL, and Django REST Framework.",
        ],
      },
      {
        title: "Full-Stack Developer Intern",
        org: "Prushal Technology",
        period: "Sep 2025 — Jul 2026",
        points: [
          "Built admin panels and storefront features for a floral e-commerce platform.",
          "Contributed to an LMS assessment platform and a hospital management system.",
        ],
      },
    ],
  },
  {
    heading: "Education",
    icon: FaGraduationCap,
    entries: [
      {
        title: "B.Tech in Computer Science (AI & ML)",
        org: "G.H. Raisoni College of Engineering",
        period: "2022 — 2026",
        location: "Pune, India",
        points: ["CGPA: 8.10 / 10"],
      },
      {
        title: "HSC in Science",
        org: "Abhinav College of Science",
        period: "2019 — 2021",
        location: "Pune, India",
        points: ["Percentage: 83%"],
      },
      {
        title: "SSC",
        org: "New English School, Ramanbaug",
        period: "2019",
        location: "Pune, India",
        points: ["Percentage: 84%"],

      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Timeline                                                                  */
/* -------------------------------------------------------------------------- */
function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <div className="relative mt-6 sm:mt-7">
      {/* Vertical line (a real element so it can "draw" downward) */}
      <span
        aria-hidden="true"
        className="tl-line absolute left-0 top-0 h-full w-px origin-top bg-ink/15"
      />

      <ol className="space-y-8 pl-6 sm:pl-7">
        {entries.map((entry) => (
          <li key={`${entry.title}-${entry.org}`} className="tl-item relative">
            {/* Dot on the line */}
            <span className="tl-dot absolute -left-[28.5px] top-[7px] h-2.5 w-2.5 rounded-full bg-rust ring-4 ring-cream sm:-left-[32.5px]" />

            {/* Period */}
            <p className="font-mono text-xs leading-none text-rust">
              {entry.period}
            </p>

            {/* Title + organisation */}
            <h4 className="mt-3 font-mono text-sm leading-[1.5] text-ink sm:text-base">
              {entry.title}
            </h4>

            <p className="mt-1 font-mono text-xs leading-[1.6] text-ink/70 sm:text-sm">
              {entry.org}
              {entry.location && (
                <span className="text-ink/45"> · {entry.location}</span>
              )}
            </p>

            {/* Highlights */}
            {entry.points && entry.points.length > 0 && (
              <ul className="mt-3 max-w-xl space-y-2">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 font-mono text-xs leading-[1.6] text-ink/60 before:absolute before:left-0 before:content-['–'] sm:text-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */
export default function WorkAndEducation() {
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
            trigger: q(".we-header")[0],
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          q(".we-icon"),
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
          q(".we-heading"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          q(".we-desc"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );

      /* 2) Column cards: staggered rise (batched so it also works when stacked on mobile) */
      const cards = q(".we-card");
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

      /* 3) Timeline in each card: line draws down, dots pop, entries slide in */
      cards.forEach((card) => {
        const line = card.querySelector(".tl-line");
        const items = card.querySelectorAll(".tl-item");
        const dots = card.querySelectorAll(".tl-dot");

        gsap.set(line, { scaleY: 0 });
        gsap.set(items, { opacity: 0, x: -20 });
        gsap.set(dots, { scale: 0 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true,
            },
            delay: 0.35,
          })
          .to(line, {
            scaleY: 1,
            duration: 0.5 + items.length * 0.35,
            ease: "power2.inOut",
          })
          .to(
            items,
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.35,
            },
            0.1
          )
          .to(
            dots,
            {
              scale: 1,
              duration: 0.45,
              ease: "back.out(2.5)",
              stagger: 0.35,
            },
            0.1
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
      id="experience"
      ref={sectionRef}
      className="relative mt-6 overflow-hidden px-5 py-14 text-ink sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      {/* Editorial horizontal lines */}
      <div className="pointer-events-none absolute inset-0">
        {[8, 18, 28].map((top) => (
          <div
            key={top}
            className="absolute left-0 right-0 border-t border-ink/[0.05]"
            style={{ top: `${top}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="we-header mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-6 md:text-left">
          {/* Icon */}
          <div className="we-icon flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaBriefcase className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Heading */}
          <h2 className="we-heading font-display text-2xl font-black uppercase leading-none tracking-[-0.04em] sm:text-3xl md:shrink-0 md:text-4xl">
            WORK &amp; EDUCATION
          </h2>

          {/* Description */}
          <p className="we-desc max-w-[260px] font-mono text-sm leading-[1.4] text-ink/60 sm:text-[15px]">
            Where I&apos;ve worked and what I&apos;ve studied along the way.
          </p>
        </div>

        {/* Columns: stacked below lg, Work gets more width than Education on lg+ */}
        <div className="mt-10 grid gap-6 sm:mt-12 md:gap-7 lg:grid-cols-[1.4fr_1fr]">
          {columns.map((column) => {
            const Icon = column.icon;

            return (
              <article
                key={column.heading}
                className="we-card rounded-[14px] border border-ink/10 bg-cream p-5 sm:p-7"
              >
                {/* Column header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-rust/15 text-rust">
                    <Icon className="h-4 w-4" />
                  </div>

                  <h3 className="font-display text-xl font-black uppercase leading-none tracking-[-0.03em] sm:text-2xl">
                    {column.heading}
                  </h3>
                </div>

                <Timeline entries={column.entries} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}