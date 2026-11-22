"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Aperture } from "@/components/brand/Logo";
import { marqueeNames } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Two rows of names moving in opposite directions. Scroll velocity speeds them up and
 * flips direction. One ticker callback eases the speed (no tweens created per scroll
 * event), and the rows pause entirely while the section is off-screen.
 */
export function Marquee() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current!;
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    const tweens = Array.from(rows).map((row, i) =>
      gsap.fromTo(row, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 }),
    );

    let dir = 1;
    let boost = 0; // extra speed from scrolling, decays every frame
    let hover = false;
    let current = 1;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.resume() : t.pause())),
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (Math.abs(v) > 10) dir = v > 0 ? 1 : -1;
        boost = Math.max(boost, Math.min(Math.abs(v) / 300, 6));
      },
    });

    const tick = () => {
      if (!st.isActive) return;
      boost *= 0.9;
      const target = (hover ? 0.15 : 1 + boost) * dir;
      current += (target - current) * 0.12;
      tweens.forEach((t) => t.timeScale(current));
    };
    gsap.ticker.add(tick);

    const enter = () => (hover = true);
    const leave = () => (hover = false);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      tweens.forEach((t) => t.kill());
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
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
      <div className="space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:space-y-4">
        {rowsData.map((names, i) => (
          <div key={i} data-row className="flex w-max will-change-transform">
            {[0, 1].map((dup) => (
              <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1 || undefined}>
                {names.map((n) => (
                  <li key={n} className="flex items-center">
                    <span
                      className={
                        "px-4 font-display text-3xl font-extrabold tracking-tight transition-colors duration-300 hover:text-blue md:px-6 md:text-6xl " +
                        (i % 2 ? "text-transparent [-webkit-text-stroke:1.2px_var(--color-ink)] hover:[-webkit-text-stroke:1.2px_var(--color-blue)]" : "text-ink")
                      }
                    >
                      {n}
                    </span>
                    <Aperture className={"size-6 md:size-9 " + (i % 2 ? "text-blue" : "text-aqua-deep")} />
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
