"use client";

import { useState } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { faqs } from "@/content/site";

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
