"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* -------------------------------------------------------------------------- */
/*  Selected work data — drop your screenshots in /public/projects/           */
/*  Recommended screenshot size: 1600 x 1000 (16:10), PNG / WebP / JPG        */
/*  SEO: write alt text that describes what the screenshot shows              */
/* -------------------------------------------------------------------------- */
type Project = {
  title: string;
  category: string;
  image: string;
  alt: string;
  href?: string;
};

const projects: Project[] = [
  {
    title: "MediCare HMS",
    category: "ERP",
    image: "/MediCareHospitalDashboard.png",
    alt: "MediCare HMS hospital management system dashboard built with Next.js",
  },
  {
    title: "ChatNova AI Chatbot",
    category: "Dashboard",
    image: "/ChatNovaAIChatbot.png",
    alt: "ChatNova AI chatbot interface and dashboard screenshot",
  },
  {
    title: "Skillora Project",
    category: "Dashboard",
    image: "/skillora-project.png",
    alt: "Skillora web application dashboard screenshot",
  },
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 40;

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------- Icons ------------------------------------ */
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const PlayIcon = () => (
  <svg {...iconProps} fill="currentColor" stroke="none">
    <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" />
  </svg>
);

const PauseIcon = () => (
  <svg {...iconProps} fill="currentColor" stroke="none">
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

const ChevronLeft = () => (
  <svg {...iconProps}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg {...iconProps}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* ---------------------------- Carousel state ---------------------------- */
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true); // the toggle button
  const [hold, setHold] = useState(false); // temporary pause: hover / touch
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const total = projects.length;
  const hasMany = total > 1;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );

  // Respect reduced motion: start with autoplay off
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
    }
  }, []);

  // Autoplay — timer restarts on every slide change (manual or automatic)
  useEffect(() => {
    if (!hasMany || !playing || hold) return;
    const id = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [hasMany, playing, hold, active, next]);

  /* ---------------------------- Touch / keyboard -------------------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    setHold(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    setHold(false);
    if (!start || !hasMany) return;

    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;

    // Only treat mostly-horizontal gestures as swipes so page scroll still works
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  /* ------------------------------- GSAP intro ----------------------------- */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let removeListeners = () => {};

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".hero-item", { opacity: 1, y: 0, x: 0 });
        return;
      }

      // Built paused: fromTo still applies the "from" state immediately,
      // so the hero stays hidden until the preloader reveals the page
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .fromTo(
          ".hero-image",
          { opacity: 0, x: -25, rotate: -4 },
          { opacity: 1, x: 0, rotate: -10, duration: 0.8 }
        )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          ".hero-project-image",
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.3"
        );

      // No preloader on screen (e.g. navigating back to this page): play now
      if (!document.querySelector("[data-preloader]")) {
        tl.play();
        return;
      }

      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        tl.play();
      };

      window.addEventListener("preloader:reveal", start);
      window.addEventListener("preloader:done", start); // safety net
      removeListeners = () => {
        window.removeEventListener("preloader:reveal", start);
        window.removeEventListener("preloader:done", start);
      };
    }, containerRef);

    return () => {
      removeListeners();
      ctx.revert();
    };
  }, []);

  const current = projects[active];

  const roundBtn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream-dark text-ink transition-colors hover:bg-ink hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust";

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
        {/* Hero Introduction — stacked & centred below lg; image left / text right from lg */}
        <div className="flex flex-col items-center gap-6 pt-2 text-center sm:gap-7 md:pt-4 lg:flex-row lg:justify-center lg:gap-14 lg:text-left xl:gap-16">
          {/* Profile Image */}
          <div className="hero-item hero-image relative h-36 w-36 shrink-0 overflow-hidden rounded-[26px] bg-ink sm:h-44 sm:w-44 sm:rounded-[30px] md:h-52 md:w-52 lg:h-96 lg:w-96 lg:rounded-[34px]">
            <Image
              src="/atharva-kadam-software-developer.png"
              alt="Atharva Kadam, full-stack developer in Pune"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 384px"
            />
          </div>

          {/* Name + description */}
          <div className="flex flex-col items-center gap-6 sm:gap-7 lg:items-start lg:gap-5">
            {/* Name */}
            <div className="hero-item hero-title">
              <p className="font-mono text-2xl leading-none text-rust sm:text-3xl lg:text-4xl">
                I&apos;M
              </p>

              {/* The visible design stays "Atharva"; the full name and role
                  are still part of the H1 for search engines and screen readers */}
              <h1 className="mt-1 font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl">
                Atharva
                <span className="sr-only">
                  {" "}
                  Kadam, Full-Stack Developer in Pune
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="hero-item hero-description max-w-2xl">
              <p className="font-mono text-xl leading-[1.35] text-ink sm:text-2xl lg:text-[26px]">
                Full-Stack Developer in Pune
                <br className="hidden sm:block" />
                Building fast web apps with Next.js and React.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*  Selected Work carousel                                            */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="hero-item hero-project-image mt-12 rounded-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust sm:mt-14 md:mt-16"
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected work"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {/* Container — same treatment as the CTA section */}
          <div className="relative overflow-hidden rounded-[20px] border border-ink/10 bg-cream-dark p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Grid background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
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
                backgroundSize: "18px 18px",
              }}
            />

            {/* Decorative lines */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 border-t border-rust/10" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 border-l border-rust/10" />

            {/* Content sits above the grid + lines */}
            <div className="relative z-10">
              {/* Header — sits ABOVE the screenshots, not on top of them */}
              <div className="flex items-center justify-between gap-4">
                {/* h2 gives search engines a heading for this block */}
                <h2 className="rounded-full bg-ink px-4 py-2 font-mono text-xs font-normal text-cream sm:text-sm">
                  // SELECTED WORK
                </h2>

                <span className="font-mono text-sm text-ink" aria-live="off">
                  // {pad(active + 1)} / {pad(total)}
                </span>
              </div>

              {/* Screenshot frame — padding from the container comes from the p-* above */}
              <div
                className="relative mt-5 overflow-hidden rounded-[12px] border border-ink/10 bg-cream sm:mt-6 sm:rounded-[16px] md:mt-8"
                onMouseEnter={() => setHold(true)}
                onMouseLeave={() => setHold(false)}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onTouchCancel={() => {
                  touchStart.current = null;
                  setHold(false);
                }}
              >
                {/* Track */}
                <div
                  className="flex touch-pan-y transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                  aria-live={playing ? "off" : "polite"}
                >
                  {projects.map((project, i) => (
                    <div
                      key={project.title}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${total}: ${project.title}`}
                      aria-hidden={i !== active}
                      className="relative aspect-[4/3] w-full shrink-0 sm:aspect-[16/10] lg:aspect-[16/9]"
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        priority={i === 0}
                        draggable={false}
                        className="select-none object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 1100px"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer — project info + controls */}
              <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
                {/* Info */}
                <div className="min-w-0">
                  <h3 className="truncate font-mono text-lg font-normal leading-tight text-ink sm:text-xl">
                    {current.title}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 font-mono text-sm text-ink/60">
                    <span>{current.category}</span>
                    {current.href && (
                      <a
                        href={current.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-rust underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust"
                      >
                        View project
                      </a>
                    )}
                  </p>
                </div>

                {/* Controls */}
                {hasMany && (
                  <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-5">
                    {/* Dots */}
                    <div
                      className="flex items-center"
                      role="tablist"
                      aria-label="Choose project"
                    >
                      {projects.map((project, i) => (
                        <button
                          key={project.title}
                          type="button"
                          role="tab"
                          aria-selected={i === active}
                          aria-label={`Show ${project.title}`}
                          onClick={() => setActive(i)}
                          className="group flex h-11 items-center px-1 focus-visible:outline-none"
                        >
                          <span
                            className={`block h-2 rounded-full transition-all duration-300 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-rust ${
                              i === active
                                ? "w-6 bg-rust"
                                : "w-2 bg-ink/20 group-hover:bg-ink/40"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Prev / Auto-scroll toggle / Next */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous project"
                        className={roundBtn}
                      >
                        <ChevronLeft />
                      </button>

                      <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        aria-pressed={playing}
                        aria-label={
                          playing ? "Pause auto-scroll" : "Start auto-scroll"
                        }
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 font-mono text-xs text-cream transition-colors hover:bg-rust focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust sm:text-sm"
                      >
                        {playing ? <PauseIcon /> : <PlayIcon />}
                        <span className="min-w-[2.75rem] text-left">
                          {playing ? "Pause" : "Play"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next project"
                        className={roundBtn}
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}