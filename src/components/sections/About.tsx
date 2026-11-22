"use client";

import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Aperture } from "@/components/brand/Logo";
import { audiences, capabilities } from "@/content/site";

export function About() {
  return (
    <section id="about" className="py-24 md:py-36" aria-labelledby="about-title">
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
        <div className="mt-20">
          <h3 className="eyebrow text-muted">Who we work with</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[28px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 3) * 0.06} className="group relative bg-paper p-8 transition-colors duration-500 hover:bg-white">
                <span className="font-label text-xs font-bold text-muted transition-colors group-hover:text-blue">0{i + 1}</span>
                <p className="mt-6 font-display text-2xl font-extrabold tracking-tight">{a.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{a.body}</p>
                <span className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-aqua transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Production capabilities */}
        <div className="mt-24 rounded-[32px] bg-ink p-8 text-paper md:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-aqua">Production capabilities</p>
              <p className="mt-4 max-w-xl font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
                A full production pipeline, customised to every project.
              </p>
            </div>
            <Aperture className="size-16 shrink-0 animate-spin-slow text-aqua md:size-20" />
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <p className="border-t border-paper/15 pt-5 font-display text-xl font-bold">{c.title}</p>
                <ul className="mt-4 space-y-2 text-[15px] text-paper/60">
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
