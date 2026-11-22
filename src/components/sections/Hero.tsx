"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Aperture } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const reels = [
  { name: "Mary Kom", tag: "Podcast", id: "_xlO4ugYVuk", href: "https://youtu.be/_xlO4ugYVuk", rot: -9, x: -38, y: 40, z: 1 },
  { name: "Varun Mayya", tag: "Podcast", id: "ObXOm9YqnBk", href: "https://youtu.be/ObXOm9YqnBk", rot: 4, x: 30, y: -10, z: 3 },
  { name: "KK Creates", tag: "Long-form", id: "RncL-lkUpU4", href: "https://youtu.be/RncL-lkUpU4", rot: 12, x: 92, y: 70, z: 2 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const start = () => {
        gsap.from(".hero-card", {
          y: 160,
          rotate: 0,
          opacity: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: "expo.out",
          delay: 0.25,
        });
        gsap.from(".hero-fade", { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.55 });
      };
      if (!reduce) {
        if ((window as any).__dpIntroDone) start();
        else window.addEventListener("dp:intro-done", start, { once: true });

        // Aperture spins with scroll
        gsap.to(".hero-aperture", {
          rotate: 360,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        // Cards drift apart while scrolling out
        gsap.utils.toArray<HTMLElement>(".hero-card-wrap").forEach((c, i) => {
          gsap.to(c, {
            yPercent: -18 - i * 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
          });
        });
      }
    }, el);

    // Pointer parallax on the card stack (desktop only). quickTo reuses one tween per
    // property instead of creating new tweens on every mousemove.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let onMove: ((e: PointerEvent) => void) | null = null;
    if (fine && !reduce) {
      const cards = gsap.utils.toArray<HTMLElement>(".hero-card", el);
      const movers = cards.map((c) => ({
        x: gsap.quickTo(c, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(c, "y", { duration: 0.9, ease: "power3.out" }),
        ry: gsap.quickTo(c, "rotateY", { duration: 0.9, ease: "power3.out" }),
        rx: gsap.quickTo(c, "rotateX", { duration: 0.9, ease: "power3.out" }),
      }));
      const glow = el.querySelector(".hero-glow");
      const gx = gsap.quickTo(glow, "x", { duration: 1.4, ease: "power3.out" });
      const gy = gsap.quickTo(glow, "y", { duration: 1.4, ease: "power3.out" });
      let r = el.getBoundingClientRect();
      const measure = () => (r = el.getBoundingClientRect());
      el.addEventListener("pointerenter", measure);
      onMove = (e: PointerEvent) => {
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m, i) => {
          const depth = (i + 1) * 10;
          m.x(px * depth * 2);
          m.y(py * depth);
          m.ry(px * 8);
          m.rx(-py * 8);
        });
        gx(px * 120);
        gy(py * 80);
      };
      el.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      if (onMove) el.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="relative overflow-hidden pt-[112px] pb-10 md:pt-[140px] md:pb-28" aria-labelledby="hero-title">
      {/* soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-glow absolute right-[-10%] top-[8%] h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(21,255,236,.45),rgba(31,59,255,.16)_42%,transparent_68%)]" />
      </div>

      <div className="container-x grid items-center gap-4 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <p className="hero-fade eyebrow mb-6 flex items-center gap-3 text-muted">
            <span className="inline-block size-2 rounded-full bg-aqua shadow-[0_0_0_4px_rgba(21,255,236,.25)]" />
            Content &amp; digital growth studio
          </p>

          <SplitReveal
            as="h1"
            id="hero-title"
            afterIntro
            stagger={0.08}
            className="display text-[clamp(3.6rem,11vw,9.5rem)]"
          >
            Content
            <br />
            that gets
            <br />
            {"n"}
            <span className="relative inline-block w-[0.6em] align-baseline">
              <span className="sr-only">o</span>
              <Aperture className="hero-aperture absolute bottom-[0.11em] left-[0.03em] size-[0.54em] text-blue" />
              <span className="invisible" aria-hidden>
                o
              </span>
            </span>
            {"ticed."}
          </SplitReveal>

          <p className="hero-fade mt-8 max-w-xl text-lg leading-relaxed text-ink/70 md:text-xl">
            We build content systems for brands, founders and experts. Strategy, scripts, shoots, edits and amplification, connected
            into one workflow that turns attention into business.
          </p>

          <div className="hero-fade mt-10 flex flex-wrap gap-3">
            <Button href="/#contact" size="lg">
              I&apos;m a brand
            </Button>
            <Button href="/#contact" size="lg" variant="ghost">
              I&apos;m a founder or creator
            </Button>
          </div>

          <div className="hero-fade mt-10 flex items-center gap-4 md:mt-12">
            <div className="flex -space-x-2">
              {["MK", "VM", "VB", "AT", "SK"].map((t, i) => (
                <span
                  key={t}
                  className="grid size-10 place-items-center rounded-full border-2 border-paper font-label text-[11px] font-bold"
                  style={{ background: ["#0a0b0d", "#1f3bff", "#15ffec", "#ffd23f", "#ecebe4"][i], color: i < 2 ? "#f6f5f0" : "#0a0b0d" }}
                  aria-hidden
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm leading-snug text-muted">
              <strong className="font-semibold text-ink">30+ creators, brands &amp; personal brands</strong>
              <br />
              in India and Australia
            </p>
          </div>
        </div>

        {/* Reel stack */}
        <div className="hero-stack relative mx-auto h-[350px] w-full max-w-[460px] scale-[0.78] [perspective:1200px] sm:h-[520px] sm:scale-100">
          {reels.map((r) => (
            <div
              key={r.id}
              className="hero-card-wrap absolute left-1/2 top-1/2"
              style={{ zIndex: r.z, transform: `translate(calc(-50% + ${r.x}px), calc(-50% + ${r.y}px))` }}
            >
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Play"
                aria-label={`Watch ${r.name} ${r.tag.toLowerCase()} edited by Digiparadise`}
                className="hero-card group relative block h-[340px] w-[200px] overflow-hidden rounded-[28px] bg-ink shadow-[0_30px_80px_-20px_rgba(10,11,13,.45)] ring-1 ring-ink/10 [transform-style:preserve-3d] sm:h-[400px] sm:w-[230px]"
                style={{ rotate: `${r.rot}deg` }}
              >
                <Image
                  src={`https://i.ytimg.com/vi/${r.id}/hqdefault.jpg`}
                  alt=""
                  fill
                  sizes="230px"
                  priority
                  className="object-cover opacity-90 transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                  <span className="rounded-full bg-paper/90 px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider text-ink">
                    {r.tag}
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-aqua text-ink transition-transform duration-500 group-hover:scale-125">
                    <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5" fill="currentColor" aria-hidden>
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 text-paper">
                  <p className="font-display text-2xl font-extrabold leading-none tracking-tight">{r.name}</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper/20">
                    <div className="h-full w-1/3 rounded-full bg-aqua transition-[width] duration-[1.6s] ease-out-expo group-hover:w-full" />
                  </div>
                </div>
              </a>
            </div>
          ))}

          {/* floating stickers */}
          <div className="hero-fade absolute -left-2 top-6 z-10 rotate-[-6deg] rounded-2xl bg-sun px-4 py-3 shadow-lg sm:-left-8">
            <p className="font-label text-[10px] font-bold uppercase tracking-wider">Hook → Script → Edit</p>
          </div>
          <div className="hero-fade absolute -right-1 bottom-8 z-10 flex rotate-[5deg] items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-paper shadow-lg sm:-right-6">
            <Aperture className="size-4 animate-spin-slow text-aqua" />
            <span className="font-label text-[11px] font-semibold tracking-wide">Shot · Cut · Shipped</span>
          </div>
        </div>
      </div>

      <a
        href="#marquee"
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex"
        aria-label="Scroll to content"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-ink" />
        </span>
      </a>
    </section>
  );
}
