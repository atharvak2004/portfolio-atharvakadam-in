"use client";

import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import { FaCode } from "react-icons/fa";

const projects = [
  {
    title: "Building Scalable Web Applications",
    description:
      "Currently focused on building fast, scalable web applications with modern technologies and clean architecture.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=900&fit=crop",
  },
  {
    title: "Exploring AI-Powered Products",
    description:
      "Experimenting with AI integrations and intelligent product experiences that solve real-world problems.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=900&fit=crop",
  },
];

export default function WorkingOnNow() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="working-on"
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
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaCode className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Heading */}
          <h2 className="shrink-0 font-display text-2xl font-black uppercase leading-none tracking-[-0.04em] sm:text-3xl md:text-4xl">
            WHAT I&apos;M
            <br className="sm:hidden" /> WORKING ON NOW
          </h2>

          {/* Description */}
          <p className="max-w-[230px] font-mono text-sm leading-[1.4] text-cream/70 sm:text-[15px]">
            A look at what I&apos;m currently building, learning, and
            exploring.
          </p>
        </div>

        {/* Projects */}
        <div
          ref={ref}
          className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 md:gap-7"
        >
          {projects.map((project) => (
            <article
              key={project.title}
              className="reveal-item group"
            >
              {/* Image */}
              <div className="relative h-[260px] overflow-hidden rounded-[14px] bg-forest sm:h-[300px] md:h-[330px] lg:h-[360px]">
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
                  <span className="font-mono text-xs text-cream/80">
                    // 0{projects.indexOf(project) + 1}
                  </span>
                </div>
              </div>

              {/* Project information */}
              <div className="mt-4">
                <h3 className="max-w-lg font-mono text-sm leading-[1.5] text-cream sm:text-base">
                  {project.title}
                </h3>

                <p className="mt-2 max-w-lg font-mono text-xs leading-[1.6] text-cream/50 sm:text-sm">
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