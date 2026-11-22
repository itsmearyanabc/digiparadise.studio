"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { process } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const cardTone = ["bg-white", "bg-white", "bg-aqua", "bg-white", "bg-white", "bg-ink text-paper"];

/** Desktop: pinned section, cards scroll horizontally and an aqua line fills. Mobile: vertical timeline. */
export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(".process-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: 0.8 } });
      gsap.utils.toArray<HTMLElement>(".process-card").forEach((card) => {
        gsap.from(card.querySelector(".process-num"), {
          yPercent: 60,
          opacity: 0,
          ease: "expo.out",
          duration: 1,
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%" },
        });
      });
    });
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".process-vline", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".process-list", start: "top 70%", end: "bottom 70%", scrub: true } });
    });
    return () => mm.revert();
  }, []);

  // Outer div keeps GSAP's pin-spacer inside an element React owns (avoids DOM insertBefore errors).
  return (
    <div>
    <section ref={root} id="process" className="relative overflow-hidden bg-paper py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pb-0 lg:pt-[72px]" aria-labelledby="process-title">
      <div className="container-x flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow text-blue">Our process</p>
          <SplitReveal id="process-title" className="h2 mt-5">
            From idea to impact, in six steps.
          </SplitReveal>
        </div>
        <p className="max-w-sm text-ink/65">A structured workflow with clear approvals, so nothing gets lost between the brief and the final export.</p>
      </div>

      {/* progress line (desktop) */}
      <div className="container-x mt-12 hidden lg:block" aria-hidden>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div className="process-progress h-full origin-left bg-gradient-to-r from-aqua to-blue" />
        </div>
      </div>

      <div className="relative mt-10 lg:mt-12">
        <span aria-hidden className="process-vline absolute bottom-0 left-[calc(clamp(16px,4vw,40px)+18px)] top-0 w-[3px] origin-top bg-gradient-to-b from-aqua to-blue lg:hidden" />
        <div
          ref={track}
          className="process-list container-x flex flex-col gap-4 lg:w-max lg:max-w-none lg:flex-row lg:gap-5 lg:pr-[10vw]"
        >
          {process.map((p, i) => (
            <article
              key={p.n}
              className={clsx(
                "process-card relative ml-12 rounded-[28px] p-7 ring-1 ring-line lg:ml-0 lg:flex lg:h-[400px] lg:w-[380px] lg:shrink-0 lg:flex-col lg:justify-between lg:p-9",
                cardTone[i],
              )}
            >
              <span aria-hidden className="absolute -left-[38px] top-8 size-4 rounded-full border-[3px] border-paper bg-blue lg:hidden" />
              <p className="process-num font-display text-7xl font-extrabold leading-none tracking-tighter opacity-90 lg:text-[7rem]">{p.n}</p>
              <div className="mt-6">
                <h3 className="font-display text-3xl font-extrabold tracking-tight">{p.title}</h3>
                <p className={clsx("mt-3 text-[15px] leading-relaxed", i === 5 ? "text-paper/70" : "text-ink/70")}>{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
