"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import clsx from "clsx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowUpRight, Button } from "@/components/ui/Button";
import { Aperture } from "@/components/brand/Logo";
import { site, work, type WorkItem } from "@/content/site";

const tabs = ["All", "Creators", "Brands", "Personal brands"] as const;
type Tab = (typeof tabs)[number];

// Mostly dark cards with an occasional brand accent, so the grid reads calm, not rainbow.
const tones = ["bg-ink-2 text-paper", "bg-aqua text-ink", "bg-ink-2 text-paper", "bg-ink-2 text-paper", "bg-sun text-ink", "bg-ink-2 text-paper", "bg-blue text-paper", "bg-ink-2 text-paper"];
const LIMIT = 12;
const MOBILE_LIMIT = 8;

export function Work() {
  const [tab, setTab] = useState<Tab>("All");
  const [expanded, setExpanded] = useState(false);
  const all = useMemo(() => (tab === "All" ? work : work.filter((w) => w.category === tab)), [tab]);
  const items = expanded ? all : all.slice(0, LIMIT);

  return (
    <section id="work" className="bg-ink py-24 text-paper md:py-36" aria-labelledby="work-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-aqua">Selected work</p>
            <SplitReveal id="work-title" className="h2 mt-5 max-w-3xl">
              Creators, brands &amp; personal brands we&apos;ve grown.
            </SplitReveal>
          </div>

          <LayoutGroup>
            <div role="tablist" aria-label="Filter work" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0"><div className="flex shrink-0 gap-1 rounded-full bg-paper/5 p-1.5 ring-1 ring-paper/10">
              {tabs.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => {
                    setTab(t);
                    setExpanded(false);
                  }}
                  className={clsx("relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors", tab === t ? "text-ink" : "text-paper/70 hover:text-paper")}
                >
                  {tab === t && (
                    <motion.span layoutId="work-tab" className="absolute inset-0 rounded-full bg-aqua" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div></div>
          </LayoutGroup>
        </div>

        <motion.ul layout className="mt-10 grid grid-cols-2 gap-2.5 md:mt-14 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((w, i) => (
              <motion.li
                key={w.name + w.category}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, delay: Math.min(i, 12) * 0.025, ease: [0.16, 1, 0.3, 1] }}
                className={clsx(!expanded && i >= MOBILE_LIMIT && "max-md:hidden")}
              >
                <WorkCard w={w} i={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {all.length > MOBILE_LIMIT && (
          <div className={clsx("mt-8 flex justify-center", all.length <= LIMIT && "md:hidden")}>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="rounded-full px-6 py-3 text-sm font-medium text-paper/80 ring-1 ring-paper/20 transition-all hover:bg-paper hover:text-ink"
            >
              {expanded ? "Show less" : `Show all ${all.length}`}
            </button>
          </div>
        )}

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-paper/10 pt-10 sm:flex-row sm:items-center">
          <p className="max-w-md text-paper/60">Want the full reel? Our editing portfolio has long-form, podcasts, reels and ads.</p>
          <Button href={site.playbook} variant="aqua">
            Open the editing portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ w, i }: { w: WorkItem; i: number }) {
  const isVideo = !!w.youtubeId;
  return (
    <a
      href={w.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor={isVideo ? "Play" : "View"}
      className={clsx(
        "group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[20px] p-3.5 ring-1 sm:rounded-3xl sm:p-5 ring-paper/10 transition-transform duration-700 ease-out-expo hover:-translate-y-1",
        isVideo ? "bg-ink-2 text-paper" : tones[i % tones.length],
      )}
    >
      {isVideo && (
        <>
          <Image
            src={`https://i.ytimg.com/vi/${w.youtubeId}/hqdefault.jpg`}
            alt={`${w.name}: video edited by Digiparadise`}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
            className="object-cover opacity-70 transition-all duration-700 ease-out-expo group-hover:scale-110 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </>
      )}
      {!isVideo && (
        <Aperture
          className={clsx(
            "absolute -bottom-10 -right-10 size-44 opacity-10 transition-transform duration-[1.2s] ease-out-expo group-hover:rotate-[120deg] group-hover:scale-110",
          )}
        />
      )}
      <div className="relative flex items-center justify-between">
        <span className="rounded-full bg-current/10 px-2.5 py-1 font-label text-[10px] font-bold uppercase tracking-wider">
          <span className={clsx(isVideo ? "text-paper" : "")}>{w.category}</span>
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-current/10 transition-all duration-500 group-hover:bg-aqua group-hover:text-ink">
          {isVideo ? (
            <svg viewBox="0 0 24 24" className="ml-0.5 size-3.5" fill="currentColor" aria-hidden>
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
          ) : (
            <ArrowUpRight className="size-4" />
          )}
        </span>
      </div>
      <div className="relative">
        <p className="font-display text-xl font-extrabold leading-[1.02] tracking-tight sm:text-2xl md:text-3xl">{w.name}</p>
        {w.note && <p className="mt-1.5 text-xs opacity-70 sm:mt-2 sm:text-sm">{w.note}</p>}
      </div>
    </a>
  );
}
