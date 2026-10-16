"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const WHATSAPP_URL = `https://wa.me/919765208456?text=${encodeURIComponent(
  "Hi Atharva, I found your portfolio and would like to get in touch!"
)}`;

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "WhatsApp",
    href: WHATSAPP_URL,
    icon: FaWhatsapp,
  }
];

/* -------------------------------------------------------------------------- */
/*  Big name animation settings                                               */
/* -------------------------------------------------------------------------- */
const BIG_NAME = "ATHARVA";
const FILL_OFF = "rgba(234,70,35,0)"; // letter fill when idle (outline only)
const FILL_WAVE = "rgba(234,70,35,0.35)"; // colour wave after the reveal
const FILL_NEAR = "rgba(234,70,35,0.45)"; // neighbours of the hovered letter
const FILL_HOVER = "rgba(234,70,35,0.9)"; // hovered letter

export default function CTAFooter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLDivElement | null>(null);

  /* ------------------------------------------------------------------------ */
  /*  Section reveal (CTA card, footer, socials)                              */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const q = gsap.utils.selector(section);

    const ctx = gsap.context(() => {
      /* 1) CTA card rises in */
      const card = q(".cta-card");
      gsap.set(card, { opacity: 0, y: 50, scale: 0.97 });

      ScrollTrigger.create({
        trigger: card[0],
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          }),
      });

      /* 2) Card content: label lines grow, then heading, text and button */
      const lines = q(".cta-line");
      const label = q(".cta-label");
      const heading = q(".cta-heading");
      const desc = q(".cta-desc");
      const button = q(".cta-btn");

      gsap.set(lines, {
        scaleX: 0,
        transformOrigin: (i: number) => (i === 0 ? "100% 50%" : "0% 50%"),
      });
      gsap.set(label, { opacity: 0, y: 12 });
      gsap.set(heading, { opacity: 0, y: 28 });
      gsap.set(desc, { opacity: 0, y: 20 });
      gsap.set(button, { opacity: 0, y: 18, scale: 0.92 });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: card[0],
            start: "top 80%",
            once: true,
          },
          delay: 0.3,
        })
        .to(label, { opacity: 1, y: 0, duration: 0.5 })
        .to(lines, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "<")
        .to(heading, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .to(desc, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(
          button,
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.8)" },
          "-=0.4"
        );

      /* 3) Footer: about, socials pop in, divider draws across, bottom row */
      const aboutTitle = q(".cta-about-title");
      const aboutDesc = q(".cta-about-desc");
      const socialsLabel = q(".cta-socials-label");
      const socialItems = q(".cta-social");
      const rule = q(".cta-rule");
      const bottomItems = q(".cta-bottom-item");

      gsap.set(aboutTitle, { opacity: 0, y: 24 });
      gsap.set(aboutDesc, { opacity: 0, y: 16 });
      gsap.set(socialsLabel, { opacity: 0, y: 14 });
      gsap.set(socialItems, { opacity: 0, y: 14, scale: 0.8 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(bottomItems, { opacity: 0, y: 14 });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: q(".cta-footer")[0],
            start: "top 92%",
            once: true,
          },
        })
        .to(aboutTitle, { opacity: 1, y: 0, duration: 0.8 })
        .to(aboutDesc, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(socialsLabel, { opacity: 1, y: 0, duration: 0.5 }, "-=0.6")
        .to(
          socialItems,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: 0.1,
          },
          "-=0.3"
        )
        .to(
          rule,
          { scaleX: 1, duration: 1, ease: "power3.inOut" },
          "-=0.2"
        )
        .to(
          bottomItems,
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.6"
        );
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

  /* ------------------------------------------------------------------------ */
  /*  Big name: fan-in from the centre -> colour wave -> idle float + hover   */
  /* ------------------------------------------------------------------------ */
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const letters = gsap.utils.toArray<HTMLElement>("[data-letter]", el);
    const reduced = prefersReducedMotion();
    const mid = (letters.length - 1) / 2;

    let observer: IntersectionObserver | undefined;
    let float: gsap.core.Animation | undefined;
    let inView = false;
    let introPlayed = false;
    let introDone = false;

    const ctx = gsap.context(() => {
      gsap.set(letters, { color: FILL_OFF, transformOrigin: "50% 100%" });

      // Reduced motion: just show the name, no entrance animation
      if (reduced) {
        gsap.set(letters, { autoAlpha: 1 });
        return;
      }

      // Start every letter below the mask, fanned out by position
      gsap.set(letters, {
        yPercent: 120,
        rotate: (i: number) => (i - mid) * 7,
        autoAlpha: 1,
      });

      // Idle float: a slow wave rolling through the letters (starts paused,
      // plays once the intro finishes and pauses when the name is off screen)
      float = gsap.to(letters, {
        yPercent: -4,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.12,
        paused: true,
      });

      const intro = gsap.timeline({
        paused: true,
        onComplete: () => {
          introDone = true;
          if (inView) float?.play();
        },
      });

      intro
        // 1) Letters rise from the centre outwards, untwisting as they land
        .to(letters, {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: "back.out(1.4)",
          stagger: { each: 0.08, from: "center" },
        })
        // 2) A soft rust wave runs left to right once
        .to(
          letters,
          {
            color: FILL_WAVE,
            duration: 0.3,
            ease: "sine.inOut",
            stagger: 0.09,
            repeat: 1,
            yoyo: true,
          },
          "-=0.5"
        );

      // Play the intro the first time the name is visible; after that, only
      // pause/resume the idle float depending on visibility
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;

          if (inView && !introPlayed) {
            introPlayed = true;
            intro.play();
          } else if (introDone) {
            if (inView) float?.play();
            else float?.pause();
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    }, el);

    // Hover: the letter under the mouse fills and lifts, its neighbours follow
    const lift = reduced ? 1 : 1.08;
    const near = reduced ? 1 : 1.03;

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const letter = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-letter]"
      );
      if (!letter) return;

      const hovered = letters.indexOf(letter);
      letters.forEach((l, i) => {
        const d = Math.abs(i - hovered);
        if (d > 1) return;
        gsap.to(l, {
          color: d === 0 ? FILL_HOVER : FILL_NEAR,
          scale: d === 0 ? lift : near,
          duration: d === 0 ? 0.25 : 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    const onOut = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const letter = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-letter]"
      );
      if (!letter) return;

      const hovered = letters.indexOf(letter);
      gsap.to(
        letters.filter((_, i) => Math.abs(i - hovered) <= 1),
        {
          color: FILL_OFF,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    };

    el.addEventListener("pointerover", onOver);
    el.addEventListener("pointerout", onOut);

    return () => {
      observer?.disconnect();
      el.removeEventListener("pointerover", onOver);
      el.removeEventListener("pointerout", onOut);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* CTA */}
        <div className="cta-card relative overflow-hidden rounded-[20px] border border-ink/10 bg-cream-dark px-6 py-14 text-center sm:px-10 sm:py-16 md:py-20">
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
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 border-l border-rust/10" />

          {/* CTA content */}
          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Small label */}
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="cta-line h-px w-8 bg-rust/40" />

              <span className="cta-label font-mono text-xs uppercase tracking-[0.18em] text-rust">
                Let&apos;s Connect
              </span>

              <span className="cta-line h-px w-8 bg-rust/40" />
            </div>

            {/* Heading */}
            <h2 className="cta-heading font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl md:text-6xl">
              Let&apos;s Build
              <br />
              Something Great
              <br />
              Together
            </h2>

            {/* Description */}
            <p className="cta-desc mx-auto mt-5 max-w-md font-mono text-sm leading-[1.6] text-ink/60 sm:text-base">
              Have an idea, project, or product you want to bring to life?
              Let&apos;s talk about how we can build it together.
            </p>

            {/* WhatsApp Button — wrapper is animated by GSAP; the link keeps
                its own hover lift so the two transforms never conflict */}
            <div className="cta-btn mt-7">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[9px] bg-rust px-6 py-3 font-mono text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rust/20 active:translate-y-0"
              >
                <FaWhatsapp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="cta-footer mt-14">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            {/* About */}
            <div>
              <p className="cta-about-title font-display text-xl font-bold uppercase">
                DEV. Atharva Kadam
              </p>

              <p className="cta-about-desc mt-2 max-w-sm font-mono text-xs leading-[1.7] text-ink/50">
                Software developer building thoughtful, scalable, and
                practical digital experiences.
              </p>
            </div>

            {/* Socials */}
            <div>
              <p className="cta-socials-label mb-4 font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
                Find Me Online
              </p>

              <div className="flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    // Wrapper is animated by GSAP; the link keeps its own
                    // transition-all hover colours
                    <div key={social.name} className="cta-social">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-ink/10 bg-cream-dark text-ink transition-all duration-200 hover:border-rust hover:bg-rust hover:text-cream"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider (a real element, so it can draw across) + bottom row */}
          <div className="mt-10">
            <div className="cta-rule h-px w-full bg-ink/10" />

            <div className="flex flex-col gap-3 pt-5 font-mono text-[11px] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
              <p className="cta-bottom-item">
                © {new Date().getFullYear()} @ Atharva Kadam
              </p>

              <p className="cta-bottom-item">Built with Next.js &amp; TypeScript</p>

              <p className="cta-bottom-item">All rights reserved.</p>
            </div>
          </div>

          {/* Large Name — animated with GSAP (decorative, so hidden from screen readers).
              pt-[0.12em] leaves room above the letters for the overshoot,
              float and hover lift, since the wrapper clips with overflow-hidden. */}
          <div
            ref={nameRef}
            aria-hidden="true"
            className="relative mt-8 overflow-hidden"
          >
            <p className="select-none whitespace-nowrap pt-[0.12em] text-center font-display text-[22vw] font-black uppercase leading-[0.75] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgba(234,70,35,0.22)] sm:text-[14vw] md:text-[12vw]">
              {BIG_NAME.split("").map((char, i) => (
                <span
                  key={`${char}-${i}`}
                  data-letter
                  className="inline-block will-change-transform"
                  style={{ visibility: "hidden" }}
                >
                  {char}
                </span>
              ))}
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}