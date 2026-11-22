"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import clsx from "clsx";

type Variant = "ink" | "aqua" | "ghost" | "paper";

const styles: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  ink: { base: "bg-ink text-paper", fill: "bg-aqua", hoverText: "group-hover:text-ink" },
  aqua: { base: "bg-aqua text-ink", fill: "bg-ink", hoverText: "group-hover:text-aqua" },
  paper: { base: "bg-paper text-ink", fill: "bg-aqua", hoverText: "group-hover:text-ink" },
  ghost: { base: "bg-transparent text-current ring-1 ring-inset ring-current/25", fill: "bg-ink", hoverText: "group-hover:text-paper" },
};

/**
 * Pill button: magnetic pull toward the cursor, a fill that sweeps in from where the
 * pointer entered, and an arrow that nudges up-right (the "growth" arrow from the logo).
 */
export function Button({
  href,
  children,
  variant = "ink",
  className,
  arrow = true,
  external,
  size = "md",
  onClick,
  type,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
  size?: "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const wrap = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const s = styles[variant];

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = wrap.current!.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(wrap.current, { x: x * 0.25, y: y * 0.35, duration: 0.5, ease: "power3.out" });
  };
  const onEnter = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    gsap.set(fill.current, { left: e.clientX - r.left, top: e.clientY - r.top });
    gsap.to(fill.current, { scale: 1, duration: 0.5, ease: "expo.out" });
  };
  const onLeave = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    gsap.to(wrap.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    gsap.to(fill.current, {
      left: e.clientX - r.left,
      top: e.clientY - r.top,
      scale: 0,
      duration: 0.45,
      ease: "expo.out",
    });
  };

  const inner = (
    <span
      ref={wrap}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={clsx(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full font-label font-semibold tracking-wide transition-colors duration-300",
        size === "lg" ? "px-8 py-5 text-base" : "px-6 py-3.5 text-sm",
        s.base,
        className,
      )}
    >
      <span
        ref={fill}
        aria-hidden
        className={clsx("pointer-events-none absolute aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full", s.fill)}
      />
      <span className={clsx("relative z-10 transition-colors duration-300", s.hoverText)}>{children}</span>
      {arrow && (
        <span
          className={clsx(
            "relative z-10 grid size-6 place-items-center overflow-hidden rounded-full transition-colors duration-300",
            s.hoverText,
          )}
        >
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-6 group-hover:translate-x-6" />
          <ArrowUpRight className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </span>
  );

  if (href) {
    const isExternal = external ?? /^https?:/.test(href);
    return (
      <Link
        href={href}
        className="inline-block"
        onClick={onClick}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
