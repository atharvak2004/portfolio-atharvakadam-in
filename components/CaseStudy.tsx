"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiDjango,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const technologies = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, accessible, and high-performance interfaces.",
    technologies: [
      { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
      { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
    ],
  },
  {
    title: "Backend Development",
    description:
      "Developing reliable APIs, business logic, authentication, and services.",
    technologies: [
      { name: "Node.js", icon: FaNodeJs, color: "text-[#68A063]" },
      { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
      { name: "Django", icon: SiDjango, color: "text-[#44B78B]" },
    ],
  },
  {
    title: "Database & DevOps",
    description:
      "Managing data, version control, deployment, and development workflows.",
    technologies: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
      { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
      { name: "Git", icon: FaGitAlt, color: "text-[#F05032]" },
      { name: "GitHub", icon: FaGithub, color: "text-white" },
      { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
    ],
  },
];

// Icons in the bottom showcase card
const showcaseIcons = [
  { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-[#3178C6]" },
  { name: "Python", icon: FaPython, color: "text-[#3776AB]" },
  { name: "Django", icon: SiDjango, color: "text-[#44B78B]" },
  { name: "Node.js", icon: FaNodeJs, color: "text-[#68A063]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]" },
  { name: "Docker", icon: FaDocker, color: "text-[#2496ED]" },
];

export default function CaseStudy() {
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
            trigger: q(".tech-header")[0],
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          q(".tech-icon"),
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
          q(".tech-heading"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          q(".tech-desc"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );

      /* 2) Technology group rows: staggered rise */
      const rows = q(".tech-group");
      gsap.set(rows, { opacity: 0, y: 50 });

      ScrollTrigger.batch(rows, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.14,
          }),
      });

      /* 3) Chips: each row's technologies pop in one after another */
      rows.forEach((row) => {
        const chips = row.querySelectorAll(".tech-chip");
        gsap.set(chips, { opacity: 0, y: 14, scale: 0.92 });

        ScrollTrigger.create({
          trigger: row,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(chips, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.6)",
              stagger: 0.07,
              delay: 0.35,
            }),
        });
      });

      /* 4) Showcase card: rises in */
      const showcase = q(".tech-showcase");
      gsap.set(showcase, { opacity: 0, y: 50, scale: 0.97 });

      ScrollTrigger.create({
        trigger: showcase[0],
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(showcase, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          }),
      });

      /* 5) Showcase icons: pop in one after another */
      const floats = q(".tech-float");
      gsap.set(floats, { opacity: 0, y: 14, scale: 0.8 });

      ScrollTrigger.create({
        trigger: q(".tech-floats")[0],
        start: "top 92%",
        once: true,
        onEnter: () =>
          gsap.to(floats, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.8)",
            stagger: 0.07,
            delay: 0.4,
          }),
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
      id="technologies"
      ref={sectionRef}
      className="relative mt-6 overflow-hidden rounded-card bg-ink px-5 py-14 text-cream sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      {/* Editorial horizontal lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 right-0 top-[8%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[18%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[28%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[38%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[48%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[58%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[68%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[78%] border-t border-cream/[0.035]" />
        <div className="absolute left-0 right-0 top-[88%] border-t border-cream/[0.035]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="tech-header mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-7">
          {/* Icon */}
          <div className="tech-icon flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaReact className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
          </div>

          {/* Heading */}
          <h2 className="tech-heading shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            TECHNOLOGIES
          </h2>

          {/* Description */}
          <p className="tech-desc max-w-[235px] font-mono text-sm leading-[1.4] text-cream/65 sm:text-[15px]">
            Technologies I use to
            <br className="hidden sm:block" />
            build modern, scalable
            <br className="hidden sm:block" />
            digital products.
          </p>
        </div>

        {/* Technology Groups */}
        <div className="mt-10 divide-y divide-cream/10 border-t border-cream/10 sm:mt-12">
          {technologies.map((group) => (
            <div
              key={group.title}
              className="tech-group grid gap-5 py-7 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-10"
            >
              {/* Group Information */}
              <div>
                <h3 className="font-display text-xl font-black uppercase leading-tight sm:text-2xl">
                  {group.title}
                </h3>

                <p className="mt-2 max-w-sm font-mono text-xs leading-[1.6] text-cream/45 sm:text-sm">
                  {group.description}
                </p>
              </div>

              {/* Technology List */}
              <div className="flex flex-wrap gap-2.5 md:justify-end">
                {group.technologies.map((tech) => {
                  const Icon = tech.icon;

                  return (
                    // Wrapper is animated by GSAP; the inner chip keeps its
                    // own hover transform so the two never conflict
                    <div key={tech.name} className="tech-chip">
                      <div className="group/tech flex items-center gap-2 rounded-[9px] border border-cream/10 bg-forest/50 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-rust/50 hover:bg-forest">
                        <Icon
                          className={`h-5 w-5 ${tech.color} transition-transform duration-300 group-hover/tech:scale-110`}
                        />

                        <span className="font-mono text-xs text-cream/75">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Technology Showcase */}
        <div className="tech-showcase relative mt-10 overflow-hidden rounded-[16px] border border-cream/10 bg-forest p-6 sm:p-8 md:mt-12 md:p-10">
          {/* Decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  rgba(255,255,255,0.06) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.06) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10">
            {/* Top label */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-rust">// TECH STACK</span>

              <span className="font-mono text-xs text-cream/30">2026</span>
            </div>

            {/* Centered Content */}
            <div className="mx-auto mt-8 max-w-2xl text-center">
              <h3 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] sm:text-4xl md:text-5xl">
                Turning Ideas
                <br />
                Into <span className="text-rust">Working Products.</span>
              </h3>

              <p className="mx-auto mt-5 max-w-lg font-mono text-xs leading-[1.7] text-cream/50 sm:text-sm">
                From frontend interfaces to backend systems, I enjoy working
                across the stack to turn ideas into reliable and useful
                digital experiences.
              </p>

              {/* Floating technology icons */}
              <div className="tech-floats mt-8 flex flex-wrap justify-center gap-3">
                {showcaseIcons.map(({ name, icon: Icon, color }) => (
                  <div
                    key={name}
                    className="tech-float flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink"
                  >
                    <Icon className={`h-6 w-6 ${color}`} aria-label={name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}