"use client";

import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import { FaStar } from "react-icons/fa";

const capabilities = [
  {
    title: "Branding",
    image:
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1000&h=700&fit=crop",
  },
  {
    title: "Website",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1000&h=700&fit=crop",
  },
  {
    title: "App",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&h=700&fit=crop",
  },
];

export default function Capabilities() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="capabilities"
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
          <div className="flex h-9 w-9 shrink-0 rotate-[-12deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <FaStar className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          {/* Heading */}
          <h2 className="shrink-0 font-display text-3xl font-black uppercase leading-none tracking-[-0.04em] sm:text-4xl md:text-5xl">
            CAPABILITIES
          </h2>

          {/* Description */}
          <p className="max-w-[260px] font-mono text-sm leading-[1.4] text-ink sm:text-[15px]">
            Here&apos;s how I help businesses
            <br className="hidden sm:block" />
            bring their ideas to life
            <br className="hidden sm:block" />
            through development.
          </p>
        </div>

        {/* Capability Cards */}
        <div
          ref={ref}
          className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 md:gap-5"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="reveal-item group relative overflow-hidden rounded-[16px] border border-black/10 bg-[#faf9f4] p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-4"
            >
              {/* Grid Paper Background */}
              <div
                className="absolute inset-0 opacity-70"
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
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Card Content */}
              <div className="relative z-10">
                {/* Image */}
                <div className="relative h-[200px] overflow-hidden rounded-[10px] bg-ink sm:h-[190px] md:h-[200px] lg:h-[210px]">
                  <Image
                    src={cap.image}
                    alt={`${cap.title} work sample`}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-black/[0.04] transition-colors duration-300 group-hover:bg-transparent" />
                </div>

                {/* Title */}
                <div className="flex items-center justify-center py-5 pb-2">
                  <p className="font-display text-base font-medium tracking-tight text-ink sm:text-[17px]">
                    {cap.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}