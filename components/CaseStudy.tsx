"use client";

import { useReveal } from "@/lib/useReveal";
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

const technologies = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, accessible, and high-performance interfaces.",
    technologies: [
      {
        name: "React",
        icon: FaReact,
        color: "text-[#61DAFB]",
      },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "text-white",
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        color: "text-[#3178C6]",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "text-[#F7DF1E]",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-[#06B6D4]",
      },
    ],
  },
  {
    title: "Backend Development",
    description:
      "Developing reliable APIs, business logic, authentication, and services.",
    technologies: [
      {
        name: "Node.js",
        icon: FaNodeJs,
        color: "text-[#68A063]",
      },
      {
        name: "Python",
        icon: FaPython,
        color: "text-[#3776AB]",
      },
      {
        name: "Django",
        icon: SiDjango,
        color: "text-[#44B78B]",
      },
    ],
  },
  {
    title: "Database & DevOps",
    description:
      "Managing data, version control, deployment, and development workflows.",
    technologies: [
      {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "text-[#4169E1]",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "text-[#47A248]",
      },
      {
        name: "Git",
        icon: FaGitAlt,
        color: "text-[#F05032]",
      },
      {
        name: "GitHub",
        icon: FaGithub,
        color: "text-white",
      },
      {
        name: "Docker",
        icon: FaDocker,
        color: "text-[#2496ED]",
      },
    ],
  },
];

export default function CaseStudy() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="technologies"
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
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-7">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaReact className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
          </div>

          {/* Heading */}
          <h2 className="shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            TECHNOLOGIES
          </h2>

          {/* Description */}
          <p className="max-w-[235px] font-mono text-sm leading-[1.4] text-cream/65 sm:text-[15px]">
            Technologies I use to
            <br className="hidden sm:block" />
            build modern, scalable
            <br className="hidden sm:block" />
            digital products.
          </p>
        </div>

        {/* Technology Groups */}
        <div
          ref={ref}
          className="mt-10 divide-y divide-cream/10 border-t border-cream/10 sm:mt-12"
        >
          {technologies.map((group) => (
            <div
              key={group.title}
              className="reveal-item grid gap-5 py-7 md:grid-cols-[1fr_1.5fr] md:items-center md:gap-10"
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
                    <div
                      key={tech.name}
                      className="group/tech flex items-center gap-2 rounded-[9px] border border-cream/10 bg-forest/50 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-rust/50 hover:bg-forest"
                    >
                      <Icon
                        className={`h-5 w-5 ${tech.color} transition-transform duration-300 group-hover/tech:scale-110`}
                      />

                      <span className="font-mono text-xs text-cream/75">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Technology Showcase */}
        <div className="reveal-item relative mt-10 overflow-hidden rounded-[16px] border border-cream/10 bg-forest p-6 sm:p-8 md:mt-12 md:p-10">
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
              <span className="font-mono text-xs text-rust">
                // TECH STACK
              </span>

              <span className="font-mono text-xs text-cream/30">
                2026
              </span>
            </div>

            {/* Large heading */}
            <div className="mt-8 max-w-2xl">
              <h3 className="font-display text-3xl font-black uppercase leading-[0.95] tracking-[-0.03em] sm:text-4xl md:text-5xl">
                Turning Ideas
                <br />
                Into{" "}
                <span className="text-rust">Working Products.</span>
              </h3>

              <p className="mt-5 max-w-lg font-mono text-xs leading-[1.7] text-cream/50 sm:text-sm">
                From frontend interfaces to backend systems, I enjoy working
                across the stack to turn ideas into reliable and useful
                digital experiences.
              </p>
            </div>

            {/* Floating technology icons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <FaReact className="h-6 w-6 text-[#61DAFB]" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <SiNextdotjs className="h-6 w-6 text-white" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <SiTypescript className="h-6 w-6 text-[#3178C6]" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <FaPython className="h-6 w-6 text-[#3776AB]" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <SiDjango className="h-6 w-6 text-[#44B78B]" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <FaNodeJs className="h-6 w-6 text-[#68A063]" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <SiPostgresql className="h-6 w-6 text-[#4169E1]" />
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-cream/10 bg-ink">
                <FaDocker className="h-6 w-6 text-[#2496ED]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}