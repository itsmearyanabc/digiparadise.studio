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

const STEP_MS = 2600;

export function System() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (hovering || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % nodes.length), STEP_MS);
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
                  <span className={clsx("font-display text-xl font-bold tracking-tight transition-colors", active === i ? "text-ink" : "text-ink/55")}>
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

        {/* Engine: an orbit with rotating rings, travelling particles, a live connector
            to the active step and a countdown ring for the auto-advance. */}
        <div
          ref={ref}
          className={clsx(
            "relative mx-auto -mt-4 aspect-square w-full max-w-[350px] sm:mt-0 sm:max-w-[560px]",
            !inView && "[&_*]:[animation-play-state:paused]",
          )}
        >
          {/* dotted field */}
          <div
            aria-hidden
            className="absolute inset-[2%] rounded-full opacity-60 [background-image:radial-gradient(rgba(10,11,13,.16)_1px,transparent_1.2px)] [background-size:14px_14px] [mask-image:radial-gradient(circle,#000_35%,transparent_70%)]"
          />

          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="sys-arc" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#15ffec" />
                <stop offset="1" stopColor="#1f3bff" />
              </linearGradient>
              <radialGradient id="sys-glow">
                <stop offset="0" stopColor="rgba(21,255,236,.35)" />
                <stop offset="1" stopColor="rgba(21,255,236,0)" />
              </radialGradient>
            </defs>

            {/* outer dashed ring, slow spin */}
            <g className="origin-center animate-spin [transform-box:view-box]" style={{ animationDuration: "60s" }}>
              <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(10,11,13,.18)" strokeWidth=".25" strokeDasharray="1 2.2" />
            </g>
            {/* node orbit */}
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(10,11,13,.1)" strokeWidth=".35" />
            {/* progress arc: how far round the cycle we are */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#sys-arc)"
              strokeWidth=".8"
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              strokeDasharray={276.46}
              initial={false}
              animate={{ strokeDashoffset: 276.46 * (1 - (active + 1) / nodes.length) }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* inner dotted ring, counter spin */}
            <g className="origin-center animate-spin [animation-direction:reverse] [transform-box:view-box]" style={{ animationDuration: "40s" }}>
              <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(31,59,255,.35)" strokeWidth=".3" strokeDasharray=".4 1.6" strokeLinecap="round" />
            </g>

            {/* travelling particles */}
            {[
              { r: 44, d: "9s", c: "#15ffec", s: 0.9 },
              { r: 49, d: "16s", c: "#1f3bff", s: 0.7 },
              { r: 35, d: "12s", c: "#ffd23f", s: 0.8, rev: true },
            ].map((p, k) => (
              <g
                key={k}
                className={clsx("origin-center animate-spin [transform-box:view-box]", p.rev && "[animation-direction:reverse]")}
                style={{ animationDuration: p.d }}
              >
                <circle cx="50" cy={50 - p.r} r={p.s * 2.2} fill="url(#sys-glow)" />
                <circle cx="50" cy={50 - p.r} r={p.s} fill={p.c} />
              </g>
            ))}

            {/* live connector from the core to the active step */}
            {(() => {
              const a = (active / nodes.length) * Math.PI * 2 - Math.PI / 2;
              const x2 = Math.round((50 + 44 * Math.cos(a)) * 100) / 100;
              const y2 = Math.round((50 + 44 * Math.sin(a)) * 100) / 100;
              return (
                <motion.line
                  key={active}
                  x1="50"
                  y1="50"
                  x2={x2}
                  y2={y2}
                  stroke="#15ffec"
                  strokeWidth=".5"
                  strokeDasharray="1.2 1.4"
                  className="animate-[dashflow_1s_linear_infinite]"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              );
            })()}
          </svg>

          {/* core */}
          <div className="absolute inset-[22%] rounded-full bg-ink shadow-[0_40px_80px_-30px_rgba(10,11,13,.7)]" />
          {/* ripple each time the step changes */}
          <motion.div
            key={`ripple-${active}`}
            aria-hidden
            className="absolute inset-[22%] rounded-full border border-aqua/60"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
          {/* countdown ring for the auto-advance */}
          <svg viewBox="0 0 100 100" className="absolute inset-[20%] size-[60%] -rotate-90" aria-hidden>
            <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(21,255,236,.12)" strokeWidth="1.2" />
            {!hovering && inView && (
              <motion.circle
                key={`timer-${active}`}
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="#15ffec"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray={301.6}
                initial={{ strokeDashoffset: 301.6 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              />
            )}
          </svg>

          <div className="absolute inset-[22%] grid place-items-center p-[9%] text-center text-paper">
            <div>
              <motion.div key={`mark-${active}`} initial={{ y: 6, scale: 0.9 }} animate={{ y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
                <DpMark className="mx-auto h-9 w-auto md:h-12" lettersClassName="text-paper" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mt-2 font-label text-[10px] font-bold tracking-[0.25em] text-paper/45 sm:mt-3">
                    STEP 0{active + 1} / 06
                  </p>
                  <p className="mt-1 font-display text-2xl font-extrabold tracking-tight text-aqua md:text-3xl">{nodes[active].k}</p>
                  <p className="mt-2 hidden text-[13px] leading-snug text-paper/70 sm:block md:text-sm">{nodes[active].d}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {nodes.map((n, i) => {
            const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = Math.round((50 + 44 * Math.cos(a)) * 100) / 100;
            const y = Math.round((50 + 44 * Math.sin(a)) * 100) / 100;
            const on = active === i;
            return (
              <button
                key={n.k}
                aria-label={n.k}
                aria-pressed={on}
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(i);
                }}
                onMouseLeave={() => setHovering(false)}
                onClick={() => setActive(i)}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {on && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-aqua/40 [animation-duration:1.6s]" />}
                <span
                  className={clsx(
                    "relative flex items-center gap-1.5 rounded-full py-1.5 pl-1.5 pr-3 font-label text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all duration-500 ease-out-expo sm:gap-2 sm:py-2 sm:pl-2 sm:pr-4 sm:text-xs md:text-[13px]",
                    on
                      ? "scale-110 bg-aqua text-ink shadow-[0_10px_30px_-8px_rgba(21,255,236,.9)]"
                      : "bg-white text-ink ring-1 ring-line group-hover:-translate-y-0.5 group-hover:ring-ink",
                  )}
                >
                  <span
                    className={clsx(
                      "grid size-5 place-items-center rounded-full transition-colors duration-300 sm:size-6",
                      on ? "bg-ink text-aqua" : "bg-paper-2 text-ink",
                    )}
                  >
                    <NodeIcon k={n.k} />
                  </span>
                  {n.k}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Tiny line icons for each step of the system. */
function NodeIcon({ k }: { k: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    Strategy: (
      <>
        <circle cx="12" cy="12" r="8" {...common} />
        <circle cx="12" cy="12" r="3.5" {...common} />
      </>
    ),
    Scripts: <path d="M5 19h4L19 9l-4-4L5 15v4Zm8-12 4 4" {...common} />,
    Shoot: (
      <>
        <rect x="3" y="7" width="13" height="10" rx="2" {...common} />
        <path d="m16 11 5-3v8l-5-3" {...common} />
      </>
    ),
    Edit: (
      <>
        <circle cx="6" cy="7" r="2.5" {...common} />
        <circle cx="6" cy="17" r="2.5" {...common} />
        <path d="M8 8.5 20 18M8 15.5 20 6" {...common} />
      </>
    ),
    Publish: <path d="M4 12 20 4l-6 16-3-7-7-1Z" {...common} />,
    Amplify: <path d="M4 17 10 11l4 4 6-8M15 7h5v5" {...common} />,
  };
  return (
    <svg viewBox="0 0 24 24" className="size-3 sm:size-3.5" aria-hidden>
      {paths[k]}
    </svg>
  );
}
