"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Button";
import { services, type Service } from "@/content/site";

const accent: Record<Service["accent"], { card: string; chip: string; sub: string }> = {
  aqua: { card: "bg-white hover:bg-aqua", chip: "bg-aqua/25 text-ink", sub: "text-ink/60" },
  blue: { card: "bg-white hover:bg-blue hover:text-paper", chip: "bg-blue-soft text-blue", sub: "text-ink/60 group-hover:text-paper/75" },
  sun: { card: "bg-white hover:bg-sun", chip: "bg-sun/40 text-ink", sub: "text-ink/60" },
  ink: { card: "bg-ink text-paper", chip: "bg-paper/10 text-paper", sub: "text-paper/60" },
};

// Bento layout spans for 6 cards on large screens
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4", "lg:col-span-12"];

export function Services() {
  return (
    <section id="services" className="bg-paper-2/60 py-16 sm:py-24 lg:py-36" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-blue">Services</p>
            <SplitReveal id="services-title" className="h2 mt-5 max-w-3xl">
              Everything your content needs. Under one roof.
            </SplitReveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-ink/70">
              Take one service, or combine them into a single monthly engagement. Strategy, production and post, all connected.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-3 md:mt-14 md:gap-4 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 0.08} className={clsx(spans[i])}>
              <ServiceCard s={s} wide={i === 0 || i === 5} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ s, wide }: { s: Service; wide?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });
  const a = accent[s.accent];

  return (
    <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }} className="h-full">
      <Link
        ref={ref}
        href={`/services/${s.slug}`}
        data-cursor="View"
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className={clsx(
          "group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] p-6 ring-1 ring-line transition-colors duration-500 ease-out-expo md:min-h-[300px] md:rounded-[28px] md:p-9",
          a.card,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className={clsx("rounded-full px-3 py-1 font-label text-[11px] font-bold tracking-wider", a.chip, "group-hover:bg-ink/10 group-hover:text-current")}>
            {s.index}
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-paper md:size-12 transition-transform duration-500 ease-out-expo group-hover:rotate-45 group-hover:scale-110">
            <ArrowUpRight className="size-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" />
          </span>
        </div>

        <div className={clsx(wide && "lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-10")}>
          <div>
            <h3 className="mt-6 font-display text-[1.75rem] font-extrabold leading-[1.02] tracking-tight md:mt-10 md:text-[2.4rem]">{s.title}</h3>
            <p className={clsx("mt-4 max-w-md text-[15px] leading-relaxed transition-colors duration-500", a.sub)}>{s.pitch}</p>
          </div>
          <ul className={clsx("mt-6 flex flex-wrap gap-2", !wide && "max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-out-expo group-hover:max-h-40 group-hover:opacity-100 max-lg:max-h-none max-lg:opacity-100")}>
            {s.deliverables.slice(0, wide ? 6 : 4).map((d, di) => (
              <li key={d} className={clsx("rounded-full border border-current/15 px-3 py-1 text-xs font-medium", di >= 3 && "max-lg:hidden")}>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}
