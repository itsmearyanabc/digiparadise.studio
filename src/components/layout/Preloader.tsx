"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { DpMark } from "@/components/brand/Logo";

/**
 * First-visit intro (once per session): dp mark rises, aqua fills the bowls,
 * the arrow shoots up, then the panel wipes away. Skipped for reduced motion.
 * Content underneath is always server-rendered, so this never hurts SEO.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current!;
    let seen = false;
    try {
      seen = sessionStorage.getItem("dp-intro") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      (window as any).__dpIntroDone = true;
      window.dispatchEvent(new Event("dp:intro-done"));
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          try {
            sessionStorage.setItem("dp-intro", "1");
          } catch {}
          setDone(true);
          (window as any).__dpIntroDone = true;
      window.dispatchEvent(new Event("dp:intro-done"));
        },
      });
      tl.from(".pl-mark", { yPercent: 60, opacity: 0, duration: 0.6 })
        .from(".pl-bowls", { scale: 0, transformOrigin: "50% 60%", duration: 0.5 }, "-=0.3")
        .from(".pl-count", { opacity: 0, duration: 0.3 }, "<")
        .to(".pl-count-num", { innerText: 100, snap: { innerText: 1 }, duration: 0.55, ease: "power2.inOut" }, "<")
        .to(".pl-mark", { yPercent: -40, opacity: 0, duration: 0.35, ease: "power3.in" })
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut" }, "-=0.2");
    }, el);
    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[200] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div className="pl-mark">
        <DpMark className="h-28 w-auto md:h-36" lettersClassName="text-paper" bowlsClassName="pl-bowls text-aqua" />
      </div>
      <div className="pl-count absolute bottom-8 right-8 font-label text-sm font-semibold tracking-[0.2em] text-paper/60">
        <span className="pl-count-num">0</span>%
      </div>
      <div className="absolute bottom-8 left-8 eyebrow text-paper/40">digiparadise.studio</div>
    </div>
  );
}
