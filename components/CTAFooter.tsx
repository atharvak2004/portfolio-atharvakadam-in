"use client";

import { useReveal } from "@/lib/useReveal";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

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
];

export default function CTAFooter() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >

      <div className="mx-auto max-w-7xl">
        {/* CTA */}
        <div
          ref={ref}
          className="reveal-item relative overflow-hidden rounded-[20px] border border-ink/10 bg-cream-dark px-6 py-14 text-center sm:px-10 sm:py-16 md:py-20"
        >
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
              <span className="h-px w-8 bg-rust/40" />

              <span className="font-mono text-xs uppercase tracking-[0.18em] text-rust">
                Let&apos;s Connect
              </span>

              <span className="h-px w-8 bg-rust/40" />
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl md:text-6xl">
              Let&apos;s Build
              <br />
              Something Great
              <br />
              Together
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-md font-mono text-sm leading-[1.6] text-ink/60 sm:text-base">
              Have an idea, project, or product you want to bring to life?
              Let&apos;s talk about how we can build it together.
            </p>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/YOUR_PHONE_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-[9px] bg-rust px-6 py-3 font-mono text-sm font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rust/20 active:translate-y-0"
            >
              <FaWhatsapp className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            {/* About */}
            <div>
              <p className="font-display text-xl font-bold uppercase">
                DEV. Atharva Kadam
              </p>

              <p className="mt-2 max-w-sm font-mono text-xs leading-[1.7] text-ink/50">
                Software developer building thoughtful, scalable, and
                practical digital experiences.
              </p>
            </div>

            {/* Socials */}
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
                Find Me Online
              </p>

              <div className="flex items-center gap-3">
                {socials.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-[9px] border border-ink/10 bg-cream-dark text-ink transition-all duration-200 hover:border-rust hover:bg-rust hover:text-cream"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 border-t border-ink/10 pt-5">
            <div className="flex flex-col gap-3 font-mono text-[11px] text-ink/45 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} @ Atharva Kadam</p>

              <p>Built with Next.js &amp; TypeScript</p>

              <p>All rights reserved.</p>
            </div>
          </div>

          {/* Large Name */}
          <div className="relative mt-8 overflow-hidden">
            <p className="select-none whitespace-nowrap text-center font-display text-[22vw] font-black uppercase leading-[0.75] tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgba(234,70,35,0.22)] sm:text-[14vw] md:text-[12vw]">
              ATHARVA
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}