"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The native system cursor stays on (it's drawn by the OS, so it never lags).
 * Over elements marked data-cursor="Play" / "View", a small aqua label sits next to
 * the pointer. It is positioned directly on every pointer event, with no easing or
 * trailing, so it moves exactly with the mouse. Disabled on touch devices.
 */
export function Cursor() {
  const tag = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const el = tag.current!;

    const move = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX + 18}px, ${e.clientY + 18}px, 0)`;
    };
    const over = (e: PointerEvent) => {
      const labelled = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
    };
    const leave = () => setLabel(null);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={tag}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] will-change-transform"
      style={{ transform: "translate3d(-200px,-200px,0)" }}
    >
      <span
        className="flex items-center gap-1.5 rounded-full bg-aqua px-3 py-1.5 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-[0_8px_24px_-8px_rgba(10,11,13,.5)] transition-[opacity,transform] duration-200"
        style={{ opacity: label ? 1 : 0, transform: label ? "scale(1)" : "scale(0.6)" }}
      >
        {label === "Play" && (
          <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
        )}
        {label ?? ""}
      </span>
    </div>
  );
}
