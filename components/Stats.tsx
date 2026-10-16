"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaBalanceScale,
  FaHome,
  FaCreditCard,
  FaHeartbeat,
  FaShoppingCart,
  FaPaintBrush,
  FaLink,
  FaLaptopCode,
  FaGraduationCap,
  FaTruck,
  FaConciergeBell,
  FaTshirt,
  FaGamepad,
  FaPlane,
  FaHandsHelping,
} from "react-icons/fa";
import type { IconType } from "react-icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/*  Count-up number                                                           */
/* -------------------------------------------------------------------------- */
function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: to,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [to, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gauge: power-on sweep -> damped settle -> idle needle tremor              */
/* -------------------------------------------------------------------------- */
const G = { cx: 135, cy: 145, R: 115, strokeWidth: 22 };

const toRad = (deg: number) => (deg * Math.PI) / 180;

const gaugePoint = (r: number, angleDeg: number) => ({
  x: G.cx + r * Math.cos(toRad(angleDeg)),
  y: G.cy - r * Math.sin(toRad(angleDeg)),
});

const gaugeArc = (r: number, startAngle: number, endAngle: number) => {
  const start = gaugePoint(r, startAngle);
  const end = gaugePoint(r, endAngle);
  const largeArc = Math.abs(startAngle - endAngle) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
};

const needleArrowPath = (angle: number) => {
  const tip = gaugePoint(95, angle);
  const back1 = gaugePoint(88, angle - 5);
  const back2 = gaugePoint(88, angle + 5);
  return `M ${tip.x} ${tip.y} L ${back1.x} ${back1.y} M ${tip.x} ${tip.y} L ${back2.x} ${back2.y}`;
};

const clampAngle = (a: number) => Math.min(180, Math.max(0, a));

function Gauge({ value = 1.4, max = 6 }: { value?: number; max?: number }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<SVGPathElement | null>(null);
  const needleRef = useRef<SVGLineElement | null>(null);
  const arrowRef = useRef<SVGPathElement | null>(null);

  const { cx, cy, R, strokeWidth } = G;

  // Matches the labels: 01 -> 180deg, 06+ -> 0deg
  const fraction = Math.min(Math.max((value - 1) / (max - 1), 0), 1);
  const needleAngle = 180 - fraction * 180;

  const ticks = Array.from({ length: 11 }, (_, i) => 180 - i * 18); // 6 labels + 5 midpoints
  const labels = ["01", "02", "03", "04", "05", "06+"];
  const labelAngles = [180, 144, 108, 72, 36, 0];

  const needleTip = gaugePoint(95, needleAngle);

  useEffect(() => {
    const wrap = wrapRef.current;
    const progress = progressRef.current;
    const needle = needleRef.current;
    const arrow = arrowRef.current;
    if (!wrap || !progress || !needle || !arrow) return;
    
    const render = (raw: number) => {
      const angle = clampAngle(raw);
      const tip = gaugePoint(95, angle);
      progress.setAttribute("d", gaugeArc(R, 180, angle));
      needle.setAttribute("x2", String(tip.x));
      needle.setAttribute("y2", String(tip.y));
      arrow.setAttribute("d", needleArrowPath(angle));
    };

    if (prefersReducedMotion()) {
      render(needleAngle);
      return;
    }

    // base = where the needle "wants" to be, jitter = tiny live tremor
    const state = { base: 180, jitter: 0 };
    const update = () => render(state.base + state.jitter);
    update();

    let wobbleTween: gsap.core.Tween | null = null;
    const wobble = () => {
      wobbleTween = gsap.to(state, {
        jitter: gsap.utils.random(-1.6, 1.6),
        duration: gsap.utils.random(0.25, 0.8),
        ease: "sine.inOut",
        onUpdate: update,
        onComplete: wobble,
      });
    };

    let tl: gsap.core.Timeline | null = null;
    let io: IntersectionObserver | null = null;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true, delay: 0.6, onComplete: wobble });

      tl
        // 1) power-on sweep: 01 -> full scale
        .to(state, {
          base: 0,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: update,
        })
        // 2) brief hold at the top
        .to({}, { duration: 0.15 })
        // 3) fall back with damped overshoot: high -> low -> rest
        .to(state, {
          base: needleAngle + 10,
          duration: 0.9,
          ease: "power3.out",
          onUpdate: update,
        })
        .to(state, {
          base: needleAngle - 4,
          duration: 0.45,
          ease: "sine.inOut",
          onUpdate: update,
        })
        .to(state, {
          base: needleAngle,
          duration: 0.45,
          ease: "sine.inOut",
          onUpdate: update,
        });

    });

    // IntersectionObserver doesn't depend on ScrollTrigger's cached positions,
    // which can be stale because the cards get moved/faded by the parent effect.
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          tl?.play();
          io?.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(wrap);

    return () => {
      io?.disconnect();
      wobbleTween?.kill();
      tl?.kill();
      ctx.revert();
      render(needleAngle);
    };
  }, [needleAngle, R]);

  return (
    <div
      ref={wrapRef}
      className="absolute bottom-6 left-1/2 h-[140px] w-[240px] -translate-x-1/2"
    >
      <svg viewBox="0 0 270 155" className="h-full w-full" fill="none">
        {/* Background track */}
        <path
          d={gaugeArc(R, 180, 0)}
          stroke="#DAD3C1"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress */}
        <path
          ref={progressRef}
          d={gaugeArc(R, 180, needleAngle)}
          stroke="#EA4623"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Ticks */}
        <g stroke="#D0C8B5" strokeWidth="1" opacity="0.8">
          {ticks.map((angle) => {
            const p1 = gaugePoint(R + strokeWidth / 2 + 2, angle);
            const p2 = gaugePoint(R + strokeWidth / 2 + 10, angle);
            return (
              <line key={angle} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
            );
          })}
        </g>

        {/* Numbers */}
        <g className="font-mono text-[9px]">
          {labels.map((label, i) => {
            const p = gaugePoint(R - strokeWidth / 2 - 8, labelAngles[i]);
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={i === 0 ? "#EA4623" : "#D0C8B5"}
              >
                {label}
              </text>
            );
          })}
        </g>

        {/* Needle */}
        <line
          ref={needleRef}
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="#EA4623"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          ref={arrowRef}
          d={needleArrowPath(needleAngle)}
          stroke="#EA4623"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center hub */}
        <circle cx={cx} cy={cy} r="8" fill="#151310" />
        <circle cx={cx} cy={cy} r="3" fill="#EA4623" />
      </svg>
    </div>
  );
}

/* ---------- Industry marquee (Card 1) ---------- */

type Industry = {
  label: string;
  icon: IconType;
  variant: "outline" | "dark" | "rust-outline" | "rust" | "forest";
};

const row1: Industry[] = [
  { label: "Law & Attorney", icon: FaBalanceScale, variant: "outline" },
  { label: "Real Estate", icon: FaHome, variant: "dark" },
  { label: "Fintech", icon: FaCreditCard, variant: "rust-outline" },
  { label: "Medical", icon: FaHeartbeat, variant: "rust" },
];

const row2: Industry[] = [
  { label: "E-Commerce", icon: FaShoppingCart, variant: "forest" },
  { label: "Branding", icon: FaPaintBrush, variant: "dark" },
  { label: "Web3", icon: FaLink, variant: "outline" },
  { label: "SaaS", icon: FaLaptopCode, variant: "rust-outline" },
];

const row3: Industry[] = [
  { label: "Education", icon: FaGraduationCap, variant: "outline" },
  { label: "Healthcare", icon: FaHeartbeat, variant: "rust" },
  { label: "Logistics", icon: FaTruck, variant: "dark" },
  { label: "Hospitality", icon: FaConciergeBell, variant: "forest" },
];

// Kept from the original file (unused by the current layout)
const row4: Industry[] = [
  { label: "Fashion", icon: FaTshirt, variant: "rust-outline" },
  { label: "Gaming", icon: FaGamepad, variant: "outline" },
  { label: "Travel", icon: FaPlane, variant: "dark" },
  { label: "Non-Profit", icon: FaHandsHelping, variant: "rust" },
];
void row4;

const variantClasses: Record<Industry["variant"], string> = {
  outline: "border border-ink/15 bg-cream-dark text-ink/70",
  dark: "bg-ink text-cream",
  "rust-outline": "border border-rust text-rust",
  rust: "bg-rust text-cream",
  forest: "bg-forest text-cream",
};

const iconWrapClasses: Record<Industry["variant"], string> = {
  outline: "bg-ink/10 text-ink/70",
  dark: "bg-cream/15 text-cream",
  "rust-outline": "bg-rust/10 text-rust",
  rust: "bg-cream/20 text-cream",
  forest: "bg-cream/20 text-cream",
};

function IndustryTag({ item }: { item: Industry }) {
  const Icon = item.icon;
  return (
    <span
      className={`mx-2 inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] ${variantClasses[item.variant]}`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full ${iconWrapClasses[item.variant]}`}
      >
        <Icon size={11} />
      </span>
      {item.label}
    </span>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  duration = 28,
}: {
  items: Industry[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <IndustryTag key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */
export default function Stats() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const q = gsap.utils.selector(section);

    const ctx = gsap.context(() => {
      /* 1) Header: icon pops in, then heading + description follow */
      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: q(".stats-header")[0],
            start: "top 85%",
            once: true,
          },
        })
        .fromTo(
          q(".stats-icon"),
          { opacity: 0, scale: 0.4, rotate: -60 },
          {
            opacity: 1,
            scale: 1,
            rotate: -12,
            duration: 0.8,
            ease: "back.out(2)",
          }
        )
        .fromTo(
          q(".stats-heading"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          q(".stats-desc"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );

      /* 2) Cards: staggered rise (batched so it also works when stacked on mobile) */
      const cards = q(".stats-card");
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.97 });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.14,
          }),
      });

      /* 3) Chat (card 2): messages arrive one after another */
      const chatItems = q(".chat-item");
      gsap.set(chatItems, {
        opacity: 0,
        y: 14,
        scale: 0.94,
        transformOrigin: "0% 0%",
      });

      gsap
        .timeline({
          defaults: { duration: 0.55, ease: "back.out(1.6)" },
          scrollTrigger: {
            trigger: q(".stats-chat")[0],
            start: "top 92%",
            once: true,
          },
        })
        .to(q(".chat-msg-1"), { opacity: 1, y: 0, scale: 1 }, "+=0.5")
        .to(q(".chat-msg-2"), { opacity: 1, y: 0, scale: 1 }, "+=0.45")
        .to(
          q(".chat-status"),
          { opacity: 1, y: 0, scale: 1, ease: "power2.out" },
          "+=0.2"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20"
    >
      {/* Marquee keyframes (global to this section) */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* Background editorial lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 right-0 top-[8%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[18%] border-t border-black/[0.035]" />
        <div className="absolute left-0 right-0 top-[28%] border-t border-black/[0.035]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Stats Header */}
        <div className="stats-header mx-auto flex max-w-xl items-center justify-center gap-4 sm:gap-5 md:gap-6">
          {/* Icon */}
          <div className="stats-icon flex h-9 w-9 shrink-0 rotate-[-12deg] items-center justify-center rounded-[9px] bg-rust text-cream sm:h-10 sm:w-10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
            >
              <rect
                x="6"
                y="4"
                width="12"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M9 8h6M9 12h6M9 16h3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="stats-heading font-display text-4xl font-black uppercase leading-none tracking-[-0.04em] sm:text-5xl">
            STATS
          </h2>

          {/* Description */}
          <p className="stats-desc max-w-[210px] font-mono text-sm leading-[1.35] text-ink sm:text-[15px]">
            A quick look at the measurable impact behind Atharva&apos;s
            development journey.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-4 sm:mt-14 md:grid-cols-3">
          {/* Card 1 */}
          <div className="stats-card relative h-[290px] overflow-hidden rounded-[16px] border border-ink/10 bg-cream-dark p-6 sm:h-[300px]">
            <div className="relative z-10">
              <p className="font-display text-4xl font-black leading-none sm:text-5xl">
                <CountUp to={20} suffix="+" />
              </p>

              <p className="mt-2 font-mono text-sm text-rust">
                Successful Projects
              </p>
            </div>

            {/* Scrolling Industry Rows */}
            <div className="absolute inset-x-0 bottom-0 top-[110px] flex flex-col justify-center gap-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <MarqueeRow items={row1} direction="left" duration={26} />
              <MarqueeRow items={row2} direction="right" duration={30} />
              <MarqueeRow items={row3} direction="left" duration={24} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="stats-card relative h-[290px] overflow-hidden rounded-[16px] bg-ink p-6 text-cream sm:h-[300px]">
            <div className="relative z-10">
              <p className="font-display text-4xl font-black leading-none sm:text-5xl">
                <CountUp to={95} suffix="%" />
              </p>

              <p className="mt-2 font-mono text-sm text-green-400">
                Client Satisfaction Rate
              </p>
            </div>

            {/* Chat */}
            <div className="stats-chat absolute bottom-6 left-7 right-7">
              {/* First Message */}
              <div className="chat-item chat-msg-1 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink">
                  <span className="font-display text-sm font-bold">A</span>
                </div>

                <div className="rounded-xl border border-white/10 bg-forest px-3 py-2 font-mono text-[10px] text-cream/80">
                  Hi, Atharva
                </div>
              </div>

              {/* Reply */}
              <div className="chat-item chat-msg-2 ml-10 mt-2 max-w-[180px] rounded-xl rounded-tl-sm border border-white/10 bg-forest px-3 py-3">
                <p className="font-mono text-[10px] leading-[1.5] text-cream/80">
                  Huge thanks for the effort.
                  <br />
                  You totally exceeded my
                  <br />
                  expectations!
                </p>
              </div>

              {/* Status */}
              <p className="chat-item chat-status ml-11 mt-1 font-mono text-[9px] text-green-400">
                ✓ 5m ago
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="stats-card relative h-[290px] overflow-hidden rounded-[16px] border border-ink/10 bg-cream-dark p-6 sm:h-[300px]">
            <div className="relative z-10">
              <p className="font-display text-4xl font-black leading-none sm:text-5xl">
                <CountUp to={1} suffix="+" />
              </p>

              <p className="mt-2 font-mono text-sm text-rust">
                Year of Experience
              </p>
            </div>

            <Gauge value={1.4} max={6} />
          </div>
        </div>
      </div>
    </section>
  );
}