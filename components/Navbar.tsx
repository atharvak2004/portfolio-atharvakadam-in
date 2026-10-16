"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

/* -------------------------------------------------------------------------- */
/*  `id` must match the id on each section (e.g. <section id="technologies">) */
/* -------------------------------------------------------------------------- */
const links = [
  { label: "Home", id: "home" },
  { label: "Technologies", id: "technologies" },
  { label: "Work & Education", id: "experience" },
  // { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

const WHATSAPP_URL = "https://wa.me/919765208456?text=Hi%20Atharva,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20get%20in%20touch!";

/*
  Extra space (px) between the navbar and the section you land on.
    bigger number  -> section lands lower on screen (more breathing room)
    smaller / negative (e.g. -24) -> page scrolls further down
*/
const SCROLL_GAP = -24;

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const spyLocked = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  // While a click-triggered scroll is running, ignore the scroll-spy so the
  // highlight doesn't flicker through every section on the way
  const lockSpy = () => {
    spyLocked.current = true;
    window.clearTimeout(unlockTimer.current);

    const unlock = () => {
      spyLocked.current = false;
      window.clearTimeout(unlockTimer.current);
      window.removeEventListener("scrollend", unlock);
    };

    window.addEventListener("scrollend", unlock, { once: true });
    unlockTimer.current = window.setTimeout(unlock, 1500); // fallback
  };

  // Scroll to a section, leaving room for the sticky navbar
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Let ctrl/cmd/middle-click open in a new tab as usual
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();

    const headerH = headerRef.current?.getBoundingClientRect().height ?? 0;
    const top =
      id === "home"
        ? 0
        : target.getBoundingClientRect().top +
          window.scrollY -
          headerH -
          SCROLL_GAP;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setActive(id);
    lockSpy();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduced ? "auto" : "smooth",
    });
    history.replaceState(null, "", `#${id}`);
  };

  // Scroll-spy: highlight the section crossing the middle of the viewport
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (spyLocked.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Clean up the unlock timer on unmount
  useEffect(() => () => window.clearTimeout(unlockTimer.current), []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md"
    >
      {/*
        Mobile / tablet: logo left, actions right (flex).
        Desktop (lg+): 3-column grid so the nav is truly centred,
        regardless of how wide the logo and CTA are.
      */}
      <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => goTo(e, "home")}
          aria-label="Back to top"
          className="block h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white md:h-16 md:w-16 lg:justify-self-start"
        >
          <Image
            src="/AtharvaKadam-Logo.png"
            alt="Atharva Kadam logo"
            width={64}
            height={64}
            priority
            className="h-full w-full object-cover"
          />
        </a>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center font-mono lg:flex"
        >
          {links.map((link, i) => {
            const isActive = active === link.id;

            return (
              <div key={link.id} className="flex items-center">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => goTo(e, link.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`whitespace-nowrap px-2 py-1.5 text-xs transition-colors xl:px-3 xl:text-sm ${
                    isActive
                      ? "font-medium text-rust underline decoration-2 underline-offset-4"
                      : "text-ink/80 hover:text-rust hover:underline hover:decoration-2 hover:underline-offset-4"
                  }`}
                >
                  {link.label}
                </a>

                {/* Dot separator */}
                {i < links.length - 1 && (
                  <span aria-hidden className="mx-0.5 text-ink/30 xl:mx-1">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:justify-self-end">
          {/* WhatsApp CTA — icon only on small phones */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full bg-rust text-sm font-medium text-cream transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto sm:px-5"
          >
            <FaWhatsapp className="h-5 w-5" />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>

          {/* Menu button — below lg */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-ink transition-colors hover:bg-ink hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust lg:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-black/10 bg-cream px-5 pb-3 pt-1 shadow-lg shadow-black/5 md:px-8 lg:hidden"
        >
          <ul className="divide-y divide-black/10 font-mono">
            {links.map((link) => {
              const isActive = active === link.id;

              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      goTo(e, link.id);
                      setOpen(false);
                    }}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-center justify-between py-3.5 text-base transition-colors ${
                      isActive
                        ? "font-medium text-rust"
                        : "text-ink/80 hover:text-rust"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-rust"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}