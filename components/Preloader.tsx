"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const LETTERS = [..."ATHARVA", "."];

const pad = (n: number) => String(n).padStart(2, "0");

// Curtain shape in a 100x100 viewBox: v = how far down it reaches (100 = full
// screen, 0 = gone), c = how much the bottom edge bulges downward
const curvePath = (v: number, c: number) =>
  `M0 0 H100 V${v} Q50 ${v + c} 0 ${v} Z`;

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const counterEl = counterRef.current;
    const path = pathRef.current;
    if (!root || !counterEl || !path) return;

    let cancelled = false;

    // Lock scroll on BOTH html and body (locking only body fails if html
    // has its own overflow rule)
    const html = document.documentElement;
    const body = document.body;
    const prevOverflow = { html: html.style.overflow, body: body.style.overflow };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const unlock = () => {
      html.style.overflow = prevOverflow.html;
      body.style.overflow = prevOverflow.body;
    };

    const finish = () => {
      unlock();
      window.dispatchEvent(new Event("preloader:done"));
      setDone(true);
    };

    const q = gsap.utils.selector(root);

    // Reduced motion: show the finished state briefly, then a plain fade.
    // (Everything starts hidden, so it must be revealed explicitly here.)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      counterEl.textContent = "100";
      gsap.set(q(".pl-letter"), { yPercent: 0, opacity: 1 });
      gsap.set(q(".pl-sub"), { opacity: 1 });
      gsap.set(q(".pl-bar"), { scaleX: 1 });

      const t = gsap.to(root, {
        opacity: 0,
        duration: 0.4,
        delay: 0.7,
        onComplete: finish,
      });
      return () => {
        t.kill();
        unlock();
      };
    }

    // Resolves once the page's assets have finished loading
    const pageLoaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    const ctx = gsap.context(() => {
      counterEl.textContent = "00";

      /* ---------------------------- Exit: curtain lift --------------------- */
      const curtain = { v: 100, c: 0 };
      const renderCurtain = () =>
        path.setAttribute("d", curvePath(curtain.v, curtain.c));

      const exit = gsap.timeline({ paused: true, onComplete: finish });
      exit
        // Content drifts up and fades
        .to(".pl-content", {
          opacity: 0,
          y: -40,
          duration: 0.5,
          ease: "power2.in",
        })
        // Curtain lifts off the top of the screen
        .to(
          curtain,
          {
            v: 0,
            duration: 1.1,
            ease: "power4.inOut",
            onUpdate: renderCurtain,
          },
          0.25
        )
        // Bottom edge bulges down while lifting, then flattens out
        .to(
          curtain,
          { c: 22, duration: 0.45, ease: "sine.out", onUpdate: renderCurtain },
          0.25
        )
        .to(
          curtain,
          { c: 0, duration: 0.65, ease: "sine.inOut", onUpdate: renderCurtain },
          0.7
        )
        // Tell the page to start while the curtain is still lifting
        .call(
          () => window.dispatchEvent(new Event("preloader:reveal")),
          [],
          0.85
        );

      /* ----------------------------- Intro --------------------------------- */
      const state = { value: 0 };
      const intro = gsap.timeline({
        onComplete: () => {
          pageLoaded.then(() => {
            if (!cancelled) exit.play();
          });
        },
      });

      intro
        // Letters rise out of their masks one after another
        .fromTo(
          ".pl-letter",
          { yPercent: 120, opacity: 1 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.06,
          },
          0.1
        )
        .fromTo(
          ".pl-sub",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0.7
        )
        // Counter + progress line
        .to(
          state,
          {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              counterEl.textContent = pad(Math.round(state.value));
            },
          },
          0
        )
        .fromTo(
          ".pl-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 2, ease: "power2.inOut" },
          0
        );
    }, root);

    return () => {
      cancelled = true;
      ctx.revert();
      unlock();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-preloader
      className="fixed inset-0 z-[9999] overflow-hidden text-ink"
      aria-hidden="true"
    >
      {/* Curtain (covers the whole screen until it lifts) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={curvePath(100, 0)} fill="currentColor" />
      </svg>

      {/* Content on top of the curtain */}
      <div className="pl-content absolute inset-0 z-10 flex flex-col items-center justify-center text-cream">
        {/* Name: each letter rises out of its own mask.
            15vw keeps it inside the screen width on small phones. */}
        <h1
          className="flex max-w-full font-display text-[15vw] font-black uppercase leading-none tracking-[-0.04em] sm:text-8xl md:text-9xl"
          aria-label="Atharva"
        >
          {LETTERS.map((ch, i) => (
            <span key={i} className="inline-block overflow-hidden py-[0.06em]">
              <span
                className={`pl-letter inline-block opacity-0 ${
                  ch === "." ? "text-rust" : ""
                }`}
              >
                {ch}
              </span>
            </span>
          ))}
        </h1>

        {/* Progress line */}
        <div className="mt-6 h-[2px] w-40 bg-cream/15 sm:w-56">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-rust" />
        </div>

        <p className="pl-sub mt-4 font-mono text-xs text-cream/60 opacity-0 sm:text-sm">
          Software Developer
        </p>

        {/* Corner details */}
        <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between sm:bottom-8 sm:left-10 sm:right-10">
          <span className="font-display text-5xl font-black leading-none sm:text-7xl">
            <span ref={counterRef}>00</span>
            <span className="text-rust">%</span>
          </span>
          <span className="font-mono text-xs text-cream/60">Loading</span>
        </div>
      </div>
    </div>
  );
}