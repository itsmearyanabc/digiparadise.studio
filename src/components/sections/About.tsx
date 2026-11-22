"use client";

import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Aperture } from "@/components/brand/Logo";
import { audiences, capabilities } from "@/content/site";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-36" aria-labelledby="about-title">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-blue">Who we are</p>
            <SplitReveal id="about-title" className="h2 mt-5">
              Strategy, creativity and execution. Together.
            </SplitReveal>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/70 lg:col-span-6 lg:col-start-7 lg:pt-12">
            <Reveal>
              <p>
                Digiparadise is a content and digital growth studio. We help brands, businesses, founders and experts build a strong digital
                presence through strategic content, creative production and marketing.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                From strategy to scripting, production, post-production, publishing and paid amplification, we bring the entire creative
                process together, so your content communicates your value, builds awareness and creates real business opportunities.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Who we work with */}
        <div className="mt-14 md:mt-20">
          <h3 className="eyebrow text-muted">Who we work with</h3>
          <ul className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:rounded-[28px] sm:bg-line sm:px-0 sm:pb-0 sm:ring-1 sm:ring-line lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 3) * 0.06} className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-line transition-colors duration-500 hover:bg-white sm:w-auto sm:rounded-none sm:bg-paper sm:p-8 sm:ring-0">
                <span className="font-label text-xs font-bold text-muted transition-colors group-hover:text-blue">0{i + 1}</span>
                <p className="mt-4 font-display text-2xl font-extrabold tracking-tight sm:mt-6">{a.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{a.body}</p>
                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-aqua transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Production capabilities */}
        <div className="mt-16 rounded-[26px] bg-ink p-6 text-paper sm:p-8 md:mt-24 md:rounded-[32px] md:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-aqua">Production capabilities</p>
              <p className="mt-4 max-w-xl font-display text-[1.9rem] font-extrabold leading-tight tracking-tight md:text-5xl">
                A full production pipeline, customised to every project.
              </p>
            </div>
            <Aperture className="hidden size-16 shrink-0 animate-spin-slow text-aqua sm:block md:size-20" />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-12 lg:grid-cols-5">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <p className="border-t border-paper/15 pt-4 font-display text-lg font-bold md:pt-5 md:text-xl">{c.title}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-paper/60 md:mt-4 md:space-y-2 md:text-[15px]">
                  {c.items.map((it) => (
                    <li key={it} className="transition-colors hover:text-aqua">
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
