"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Aperture } from "@/components/brand/Logo";
import { marqueeNames } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/** Two rows of names moving in opposite directions; scroll velocity speeds them up and flips direction. */
export function Marquee() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = root.current!.querySelectorAll<HTMLElement>("[data-row]");
    const tweens = Array.from(rows).map((row, i) => {
      const t = gsap.fromTo(
        row,
        { xPercent: i % 2 ? -50 : 0 },
        { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 },
      );
      return t;
    });
    let dir = 1;
    let settle: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (Math.abs(v) > 10) dir = v > 0 ? 1 : -1;
        const boost = 1 + Math.min(Math.abs(v) / 400, 5);
        tweens.forEach((t) => gsap.to(t, { timeScale: boost * dir, duration: 0.3, overwrite: true }));
        settle?.kill();
        settle = gsap.delayedCall(0.35, () => tweens.forEach((t) => gsap.to(t, { timeScale: dir, duration: 1.2, overwrite: true })));
      },
    });
    const pause = () => tweens.forEach((t) => gsap.to(t, { timeScale: 0.15, duration: 0.6, overwrite: true }));
    const resume = () => tweens.forEach((t) => gsap.to(t, { timeScale: dir, duration: 0.6, overwrite: true }));
    const el = root.current!;
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    return () => {
      st.kill();
      tweens.forEach((t) => t.kill());
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
    };
  }, []);

  const half = Math.ceil(marqueeNames.length / 2);
  const rowsData = [marqueeNames.slice(0, half), marqueeNames.slice(half)];

  return (
    <section ref={root} id="marquee" className="relative border-y border-line bg-paper py-10 md:py-14" aria-labelledby="marquee-title">
      <div className="container-x mb-8 flex items-center justify-between gap-6">
        <h2 id="marquee-title" className="eyebrow text-muted">
          Creators &amp; brands we&apos;ve worked with
        </h2>
        <span className="hidden h-px flex-1 bg-line md:block" />
      </div>
      <div className="space-y-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {rowsData.map((names, i) => (
          <div key={i} data-row className="flex w-max">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1 || undefined}>
                {names.map((n) => (
                  <li key={n} className="flex items-center">
                    <span
                      className={
                        "px-6 font-display text-4xl font-extrabold tracking-tight transition-colors duration-300 hover:text-blue md:text-6xl " +
                        (i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)] hover:[-webkit-text-stroke:1.5px_var(--color-blue)]" : "text-ink")
                      }
                    >
                      {n}
                    </span>
                    <Aperture className={"size-7 md:size-9 " + (i % 2 ? "text-blue" : "text-aqua-deep")} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
