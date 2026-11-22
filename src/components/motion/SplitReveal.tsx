"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  /** start immediately instead of on scroll (e.g. hero) */
  immediate?: boolean;
  /** wait for the preloader to finish before playing */
  afterIntro?: boolean;
  id?: string;
};

/**
 * Masked word-by-word reveal. Text stays real, crawlable text in the HTML:
 * strings are split into words server-side, other nodes (icons, <br/>) pass through as a unit.
 */
export function SplitReveal({ as: Tag = "h2", children, className, delay = 0, stagger = 0.045, immediate, afterIntro, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = el.querySelectorAll<HTMLElement>(".split-word > span");
    const ctx = gsap.context(() => {}, el);
    const run = () =>
      ctx.add(() => {
        gsap.fromTo(
          words,
          // y: 0 clears the pixel offset GSAP parses from the CSS pre-hide transform
          { y: 0, yPercent: 110, rotate: 4 },
          {
            y: 0,
            yPercent: 0,
            rotate: 0,
            duration: 0.85,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger: immediate || afterIntro ? undefined : { trigger: el, start: "top 96%", once: true },
          },
        );
      });
    const waiting = afterIntro && !(window as { __dpIntroDone?: boolean }).__dpIntroDone;
    if (waiting) window.addEventListener("dp:intro-done", run, { once: true });
    else run();
    return () => {
      window.removeEventListener("dp:intro-done", run);
      ctx.revert();
    };
  }, [delay, stagger, immediate, afterIntro]);

  return (
    <Tag ref={ref} className={className} id={id} data-split="">
      {split(children)}
    </Tag>
  );
}

function split(node: ReactNode): ReactNode {
  const parts = Array.isArray(node) ? node : [node];
  return parts.map((part, i) => {
    if (typeof part === "string") {
      return part.split(/(\s+)/).map((w, j) =>
        /^\s+$/.test(w) || w === "" ? (
          w
        ) : (
          <span className="split-word" key={`${i}-${j}`}>
            <span>{w}</span>
          </span>
        ),
      );
    }
    if (part === null || part === undefined || typeof part === "boolean") return part;
    if (typeof part === "object" && "type" in part && part.type === "br") return <br key={i} />;
    return (
      <span className="split-word" key={i}>
        <span>{part}</span>
      </span>
    );
  });
}
