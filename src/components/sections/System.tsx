"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { DpMark } from "@/components/brand/Logo";

const nodes = [
  { k: "Strategy", d: "Audience, positioning and content pillars, before a single frame is shot." },
  { k: "Scripts", d: "Hooks, scripts and storyboards written for each platform." },
  { k: "Shoot", d: "Studio, location and creator-led production, directed on set." },
  { k: "Edit", d: "Cuts, sound, motion graphics, subtitles and colour, ready for the platform." },
  { k: "Publish", d: "Calendars, captions and scheduling, plus community management." },
  { k: "Amplify", d: "Ad creatives and variations, plus performance insights fed back into the next cycle." },
];

export function System() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (hovering || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), 2200);
    return () => clearInterval(id);
  }, [hovering, inView]);

  return (
    <section className="py-16 sm:py-24 lg:py-36" aria-labelledby="system-title">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-blue">How we think</p>
          <SplitReveal id="system-title" className="h2 mt-5">
            Not posts. A content system.
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">
              Posting regularly isn&apos;t a strategy. We build a consistent content ecosystem that says the right thing to the right
              audience, in the right format, on the right platform. Every piece feeds the next.
            </p>
          </Reveal>
          <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-1 md:mt-10 md:gap-y-3">
            {nodes.map((n, i) => (
              <li key={n.k}>
                <button
                  onMouseEnter={() => {
                    setHovering(true);
                    setActive(i);
                  }}
                  onMouseLeave={() => setHovering(false)}
                  onFocus={() => {
                    setHovering(true);
                    setActive(i);
                  }}
                  onBlur={() => setHovering(false)}
                  className="group flex w-full items-center gap-3 border-b border-line py-3 text-left"
                >
                  <span className={clsx("font-label text-xs font-bold transition-colors", active === i ? "text-blue" : "text-muted")}>
                    0{i + 1}
                  </span>
                  <span className={clsx("font-display text-xl font-bold tracking-tight transition-colors", active === i ? "text-ink" : "text-ink/45")}>
                    {n.k}
                  </span>
                  <span
                    className={clsx(
                      "ml-auto size-2 rounded-full transition-all duration-300",
                      active === i ? "scale-100 bg-aqua shadow-[0_0_0_4px_rgba(21,255,236,.3)]" : "scale-0 bg-ink",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-6 min-h-[3em] text-[15px] leading-relaxed text-ink/70 sm:hidden"
              aria-live="polite"
            >
              <strong className="text-ink">{nodes[active].k}:</strong> {nodes[active].d}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Engine */}
        {/* Mobile: the active step's description sits under the list instead of inside the circle */}
        <div ref={ref} className="relative mx-auto -mt-6 aspect-square w-full max-w-[340px] sm:mt-0 sm:max-w-[540px]">
          <div className="absolute inset-[6%] rounded-full border border-dashed border-ink/15" />
          <motion.div
            className="absolute inset-[6%] rounded-full"
            style={{ background: "conic-gradient(from -30deg, rgba(21,255,236,0), rgba(21,255,236,.55) 30deg, rgba(21,255,236,0) 60deg)" }}
            animate={{ rotate: active * 60 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-[22%] rounded-full bg-ink shadow-[0_40px_80px_-30px_rgba(10,11,13,.6)]" />
          <div className="absolute inset-[22%] grid place-items-center p-[9%] text-center text-paper">
            <div>
              <DpMark className="mx-auto h-10 w-auto md:h-12" lettersClassName="text-paper" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-aqua sm:mt-4 md:text-3xl">{nodes[active].k}</p>
                  <p className="mt-2 hidden text-sm leading-snug text-paper/70 sm:block">{nodes[active].d}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {nodes.map((n, i) => {
            const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.round((50 + 44 * Math.cos(a)) * 100) / 100;
            const y = Math.round((50 + 44 * Math.sin(a)) * 100) / 100;
            return (
              <button
                key={n.k}
                aria-label={n.k}
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
                onMouseLeave={() => setHovering(false)}
                onClick={() => setActive(i)}
                className={clsx(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 font-label text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all duration-500 ease-out-expo sm:px-4 sm:py-2 sm:text-xs md:text-[13px]",
                  active === i ? "scale-110 bg-aqua text-ink shadow-[0_10px_30px_-8px_rgba(21,255,236,.8)]" : "bg-white text-ink ring-1 ring-line hover:ring-ink",
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {n.k}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
