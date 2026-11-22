import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ArrowUpRight } from "@/components/ui/Button";
import { Aperture } from "@/components/brand/Logo";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  // Placeholder metadata. Keyword-tuned titles and descriptions come in the SEO phase.
  return {
    title: s.title,
    description: `${s.pitch} ${s.overview[0]}`.slice(0, 158),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="relative overflow-hidden pt-[140px] pb-20 md:pb-28">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(21,255,236,.4),rgba(31,59,255,.15)_45%,transparent_70%)] blur-2xl" />
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2 text-muted">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-ink">Services</Link>
            <span>/</span>
            <span className="text-blue">{s.index}</span>
          </nav>
          <SplitReveal as="h1" immediate className="display mt-8 max-w-5xl text-[clamp(3rem,8vw,7rem)]">
            {s.title}
          </SplitReveal>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink/70 md:text-2xl">{s.pitch}</p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
            <Button href="#contact" size="lg">Start a project</Button>
            <Button href="/#work" size="lg" variant="ghost">See our work</Button>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-28" aria-labelledby="overview">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-blue">Overview</p>
            <h2 id="overview" className="h2 mt-5 !text-4xl md:!text-5xl">What it is</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/75 lg:col-span-7 lg:col-start-6">
            {s.overview.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2/60 py-20 md:py-28" aria-labelledby="what-we-do">
        <div className="container-x">
          <p className="eyebrow text-blue">What we do</p>
          <SplitReveal id="what-we-do" className="h2 mt-5">Inside the service.</SplitReveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {s.groups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 3) * 0.07} className="h-full">
                <article className="group h-full rounded-[28px] bg-white p-8 ring-1 ring-line transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(10,11,13,.35)]">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-xs font-bold text-muted">0{i + 1}</span>
                    <Aperture className="size-6 text-ink/15 transition-all duration-700 group-hover:rotate-180 group-hover:text-blue" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight">{g.title}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {g.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] text-ink/75">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-aqua-deep" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="deliverables">
        <div className="container-x">
          <div className="rounded-[32px] bg-ink p-8 text-paper md:p-14">
            <p className="eyebrow text-aqua">Typical deliverables</p>
            <h2 id="deliverables" className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-6xl">What you get.</h2>
            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {s.deliverables.map((d, i) => (
                <li key={d} className="flex items-center gap-4 border-t border-paper/15 py-4 text-lg">
                  <span className="font-label text-xs font-bold text-aqua">{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {s.idealClients && (
            <div className="mt-16">
              <p className="eyebrow text-muted">Ideal for</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.idealClients.map((c) => (
                  <li key={c} className="rounded-full bg-white px-5 py-2.5 text-[15px] font-medium ring-1 ring-line">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <Process />

      <section className="py-20 md:py-28" aria-labelledby="more-services">
        <div className="container-x">
          <h2 id="more-services" className="eyebrow text-muted">More services</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-6 py-6">
                  <span className="flex items-baseline gap-5">
                    <span className="font-label text-xs font-bold text-muted">{o.index}</span>
                    <span className="font-display text-2xl font-extrabold tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-4xl">
                      {o.title}
                    </span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full ring-1 ring-line transition-all duration-500 group-hover:bg-aqua group-hover:ring-aqua">
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </>
  );
}
