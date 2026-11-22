"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Wordmark, DpMark } from "@/components/brand/Logo";
import { ArrowUpRight } from "@/components/ui/Button";
import { services, site } from "@/content/site";
import { useLenis } from "@/components/motion/SmoothScroll";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["45%", "0%"]);

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={ref} className="relative overflow-hidden bg-ink text-paper">
      <div className="container-x grid gap-12 pt-20 pb-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow text-aqua">Digiparadise Studio</p>
          <p className="mt-5 max-w-sm font-display text-3xl font-bold leading-tight tracking-tight">
            Content systems that get brands noticed, and keep them there.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-paper/25 pb-1 text-lg transition-colors hover:border-aqua hover:text-aqua"
          >
            {site.email}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <nav className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3" aria-label="Footer">
          <div>
            <p className="eyebrow text-paper/50">Services</p>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-paper/80 transition-colors hover:text-aqua">
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-paper/50">Studio</p>
            <ul className="mt-5 space-y-3">
              {[
                ["Work", "/#work"],
                ["Process", "/#process"],
                ["About", "/#about"],
                ["FAQ", "/#faq"],
                ["Contact", "/#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-paper/80 transition-colors hover:text-aqua">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-paper/50">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={site.playbook} target="_blank" rel="noopener noreferrer" className="text-paper/80 transition-colors hover:text-aqua">
                  Editing portfolio ↗
                </a>
              </li>
              {/* TODO: Instagram / YouTube / LinkedIn once handles are confirmed */}
            </ul>
            <button
              onClick={toTop}
              className="group mt-10 flex items-center gap-3 text-sm text-paper/60 transition-colors hover:text-aqua"
              aria-label="Back to top"
            >
              <span className="grid size-12 place-items-center rounded-full border border-paper/20 transition-colors group-hover:border-aqua">
                <DpMark className="h-6 w-auto transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" lettersClassName="text-paper" />
              </span>
              Back to top
            </button>
          </div>
        </nav>
      </div>

      <div className="container-x" aria-hidden>
        <motion.div style={{ y }} className="border-t border-paper/10 pt-8">
          <Wordmark className="mx-auto h-auto w-full max-w-[760px] text-paper" />
        </motion.div>
      </div>

      <div className="container-x flex flex-col gap-2 py-8 text-xs text-paper/45 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
        <p>digiparadise.studio</p>
      </div>
    </footer>
  );
}
