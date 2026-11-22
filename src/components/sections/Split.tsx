"use client";

import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { DpMark, Aperture } from "@/components/brand/Logo";
import clsx from "clsx";

const columns = [
  {
    theme: "ink" as const,
    title: "I'm building a brand",
    body: "You have a product people should know about. You need content that builds awareness, shows the product and feeds your ads.",
    steps: [
      ["Strategy & audit", "Audience, competitors and the content pillars that fit your brand."],
      ["Content that ships monthly", "Reels, statics, carousels and campaigns on a calendar."],
      ["UGC & ad creatives", "Creator-led videos with multiple hooks and angles to test."],
      ["Report & scale", "We double down on what performs and cut what doesn't."],
    ],
    cta: "Grow my brand",
  },
  {
    theme: "sun" as const,
    title: "I'm a founder or expert",
    body: "You know your stuff. We turn your expertise and story into content that makes you the recognisable voice in your space.",
    steps: [
      ["Positioning", "What you stand for, who it's for, and where to show up."],
      ["Topic bank & scripts", "Hooks and scripts written in your voice. You just show up."],
      ["Shoot & direct", "Recording plans and on-camera direction that make it easy."],
      ["Edit & distribute", "Reels, shorts, LinkedIn and podcast cut-downs, published for you."],
    ],
    cta: "Build my personal brand",
  },
];

export function Split() {
  return (
    <section className="py-16 sm:py-24 lg:py-36" aria-labelledby="split-title">
      <div className="container-x">
        <SplitReveal id="split-title" className="h2 text-center">
          Brand, or founder?
        </SplitReveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg text-ink/65">Two paths, one studio. Pick yours.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:mt-14 md:gap-5 lg:grid-cols-2">
          {columns.map((c, ci) => (
            <Reveal key={c.title} delay={ci * 0.12}>
              <article
                className={clsx(
                  "group relative h-full overflow-hidden rounded-[26px] p-6 transition-transform duration-700 ease-out-expo hover:-translate-y-1.5 sm:p-8 md:rounded-[32px] md:p-12",
                  c.theme === "ink" ? "bg-ink text-paper" : "bg-sun text-ink",
                )}
              >
                {/* decorative mark */}
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 opacity-[0.07] transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-4 group-hover:rotate-6">
                  {c.theme === "ink" ? (
                    <DpMark className="h-72 w-auto" lettersClassName="text-paper" bowlsClassName="text-paper" />
                  ) : (
                    <Aperture className="size-72 text-ink" />
                  )}
                </div>

                <h3 className="relative font-display text-[2.3rem] font-extrabold leading-[0.98] tracking-tight md:text-6xl">{c.title}</h3>
                <p className={clsx("relative mt-5 max-w-md text-[17px] leading-relaxed", c.theme === "ink" ? "text-paper/70" : "text-ink/75")}>{c.body}</p>

                <ol className="relative mt-7 space-y-0 md:mt-10">
                  {c.steps.map(([t, d], i) => (
                    <li
                      key={t}
                      className={clsx(
                        "flex gap-4 border-t py-4 md:gap-5 md:py-5",
                        c.theme === "ink" ? "border-paper/15" : "border-ink/15",
                      )}
                    >
                      <span
                        className={clsx(
                          "grid size-9 shrink-0 place-items-center rounded-full font-label text-sm font-bold transition-colors duration-300",
                          c.theme === "ink" ? "border border-paper/30 group-hover:border-aqua group-hover:text-aqua" : "border border-ink/30",
                        )}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-lg font-semibold">{t}</p>
                        <p className={clsx("mt-1 text-[15px]", c.theme === "ink" ? "text-paper/60" : "text-ink/65")}>{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="relative mt-8">
                  <Button href="/#contact" variant={c.theme === "ink" ? "aqua" : "ink"}>
                    {c.cta}
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
