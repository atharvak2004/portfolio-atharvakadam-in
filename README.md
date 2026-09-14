# Antony — Portfolio (Next.js + Tailwind + GSAP)

A recreation of the reference design: rust-orange frame, cream sections,
dark case-study/journal panels, and GSAP-driven motion (hero intro
timeline, scroll-triggered reveals, animated stat counters, a FAQ
accordion, and a testimonial crossfade).

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. This build was verified with `next build`
(type-checked and compiled clean) in a sandboxed environment that
couldn't reach Google Fonts — that call to fonts.googleapis.com will
resolve normally on your machine or any real host.

## Structure

- `app/layout.tsx` — loads Space Grotesk (display), Inter (body), and
  JetBrains Mono (labels/eyebrows) via `next/font/google`.
- `app/page.tsx` — assembles all sections inside the outer rust frame.
- `components/` — one file per section (Navbar, Hero, Stats, CaseStudy,
  Capabilities, Journal, Testimonials, FAQ, CTAFooter).
- `lib/useReveal.ts` — shared GSAP + ScrollTrigger hook for the
  fade/rise-on-scroll pattern used across sections.

## Swapping in your own content

- Replace the Unsplash URLs in each component with your own images —
  they're just plain `next/image` sources.
- Copy, stats, testimonials, FAQ entries, and footer links are static
  arrays/strings at the top of each component — edit them directly.
- Color tokens (`cream`, `ink`, `rust`, `forest`, `stone`) live in
  `tailwind.config.ts` if you want to retheme.

## Motion notes

- Hero: a single GSAP timeline on mount (badge → heading → image card →
  inner panels).
- Every other section: `useReveal` fades + rises its `.reveal-item`
  children in as the section crosses 80% of the viewport, once.
- Stats: numbers count up via a tweened object driving `textContent`.
- FAQ: each answer's wrapper animates `height`/`opacity` open and closed.
- Testimonials: quote crossfades on avatar click or arrow nav.
- `prefers-reduced-motion` is respected everywhere — animated elements
  jump straight to their end state instead.
