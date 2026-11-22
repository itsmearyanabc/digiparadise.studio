"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Rise (and optionally fade) into place as the element approaches the viewport.
 *
 * Anti-flicker rules:
 * - Triggers ~15% of a screen *before* the element enters, so on fast scrolls it has
 *   already settled by the time you see it (no half-transparent blocks).
 * - Big surfaces (cards, panels) should pass `fade={false}`: they only slide, never
 *   go see-through, so the page never "blinks" while scrolling.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  fade = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  fade?: boolean;
  as?: "div" | "li" | "section" | "article" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: fade ? 0 : 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 15% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
