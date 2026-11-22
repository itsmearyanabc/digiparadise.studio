"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Aqua dot cursor that follows with a little lag and morphs on interactive targets.
 * Opt-in labels: add data-cursor="Play" / "View" / "Drag" to any element.
 * Only enabled for fine pointers; touch devices keep native behaviour.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const el = dot.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      const interactive = t.closest("a, button, [role='button'], input, textarea, select, label, summary");
      setLabel(labelled?.dataset.cursor ?? null);
      setHover(!!interactive && !labelled);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const size = label ? 88 : hover ? 44 : 12;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{
        display: enabled ? "flex" : "none",
        width: size,
        height: size,
        background: label ? "var(--color-aqua)" : hover ? "rgba(21,255,236,.18)" : "var(--color-aqua)",
        border: label ? "0" : "1.5px solid var(--color-ink)",
        transition: "width .35s var(--ease-out-expo), height .35s var(--ease-out-expo), background .2s, border .2s",
      }}
    >
      {label && (
        <span className="font-label text-[11px] font-bold uppercase tracking-[0.18em] text-ink">{label}</span>
      )}
    </div>
  );
}
