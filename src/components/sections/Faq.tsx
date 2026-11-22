"use client";

import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { faqs } from "@/content/site";
import { Aperture } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export function Faq({ items = faqs, title = "Questions, answered." }: { items?: typeof faqs; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-36" aria-labelledby="faq-title">
      <div className="container-x grid gap-8 md:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-blue">FAQ</p>
          <SplitReveal id="faq-title" className="h2 mt-5">
            {title}
          </SplitReveal>
          {/* Fills the tall left column on desktop with a useful next step */}
          <div className="group relative mt-10 hidden overflow-hidden rounded-[28px] bg-ink p-7 text-paper lg:sticky lg:top-28 lg:block">
            <Aperture className="absolute -right-8 -top-8 size-36 animate-spin-slow text-paper/[0.06] transition-colors duration-700 group-hover:text-aqua/20" />
            <span className="relative flex items-center gap-2 text-xs text-paper/60">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-aqua opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-aqua" />
              </span>
              Replies within one working day
            </span>
            <p className="relative mt-5 font-display text-2xl font-extrabold leading-tight tracking-tight">
              Still have a question? Ask a person, not a bot.
            </p>
            <p className="relative mt-3 text-sm leading-relaxed text-paper/60">Tell us what you&apos;re working on and we&apos;ll point you to the right service.</p>
            <div className="relative mt-6">
              <Button href="/#contact" variant="aqua">
                Ask us anything
              </Button>
            </div>
          </div>
        </div>
        <ul className="lg:col-span-8">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={clsx("font-display text-xl font-bold tracking-tight transition-colors md:text-2xl", isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink")}>
                      {f.q}
                    </span>
                    <span
                      className={clsx(
                        "relative grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-out-expo",
                        isOpen ? "rotate-45 bg-aqua" : "bg-ink/5 group-hover:bg-ink group-hover:text-paper",
                      )}
                      aria-hidden
                    >
                      <span className="absolute h-[2px] w-4 bg-current" />
                      <span className="absolute h-4 w-[2px] bg-current" />
                    </span>
                  </button>
                </h3>
                {/* Answer stays in the DOM for crawlers; only height animates. */}
                <motion.div
                  id={`faq-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-ink/70">{f.a}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
