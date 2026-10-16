"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useReveal } from "@/lib/useReveal";

const faqs = [
  {
    question: "What is your typical development process like?",
    answer:
      "I start by understanding the project requirements and goals, then move through planning, development, testing, and final deployment with regular updates throughout the process.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on the scope and complexity. A typical website can take two to six weeks, while larger applications may require additional time.",
  },
  {
    question: "Do you work on both frontend and backend?",
    answer:
      "Yes. I work across the full stack, including frontend interfaces, backend APIs, databases, authentication, integrations, and deployment.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "I primarily work with React, Next.js, TypeScript, Node.js, Python, Django, REST APIs, SQL databases, and modern cloud deployment platforms.",
  },
  {
    question: "Can you work with an existing project?",
    answer:
      "Absolutely. I can work with an existing codebase, understand its architecture, fix issues, add new features, improve performance, and continue development without starting from scratch.",
  },
];

function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    const next = !open;
    const el = bodyRef.current;

    if (!el) {
      setOpen(next);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setOpen(next);
      return;
    }

    // Prevent overlapping tweens if the user clicks rapidly mid-animation
    gsap.killTweensOf(el);

    if (next) {
      setOpen(true);

      requestAnimationFrame(() => {
        gsap.fromTo(
          el,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: "auto",
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          }
        );
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setOpen(false);
        },
      });
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-[10px] border border-ink/10 transition-colors duration-200 ${
        open ? "bg-cream-dark" : "bg-cream"
      }`}
    >
      {/* Question */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-4 py-4 text-left sm:px-5 sm:py-5"
      >
        <span className="font-mono text-sm leading-[1.4] text-ink sm:text-[15px]">
          {question}
        </span>

        <span className="shrink-0 font-mono text-xs text-rust">
          {open ? "Collapse ↑" : "Expand ↓"}
        </span>
      </button>

      {/* Answer */}
      {open && (
        <div
          ref={bodyRef}
          className="overflow-hidden px-4 pb-5 sm:px-5"
        >
          <p className="max-w-2xl font-mono text-xs leading-[1.7] text-ink/65 sm:text-sm">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="faq"
      className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-16"
    >
      {/* Editorial horizontal lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 top-[8%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[18%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[28%] border-t border-black/[0.035]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-4 sm:gap-5 md:gap-7">
          {/* Icon */}
          <div className="flex h-9 w-9 shrink-0 rotate-[-10deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaRegCircleQuestion className="h-5 w-5 sm:h-[21px] sm:w-[21px]" />
          </div>

          {/* Heading */}
          <h2 className="shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            FAQ
          </h2>

          {/* Description */}
          <p className="max-w-[235px] font-mono text-sm leading-[1.4] text-ink sm:text-[15px]">
            Answers to the most common
            <br className="hidden sm:block" />
            questions about my development
            <br className="hidden sm:block" />
            process and services.
          </p>
        </div>

        {/* FAQ List */}
        <div
          ref={ref}
          className="mx-auto mt-10 max-w-2xl space-y-1 sm:mt-12"
        >
          {faqs.map((faq, i) => (
            <div key={faq.question} className="reveal-item">
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                defaultOpen={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}