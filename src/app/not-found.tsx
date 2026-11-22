import type { Metadata } from "next";
import { Aperture } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-[72px]">
      <div className="container-x">
        <p className="eyebrow text-blue">Error 404</p>
        <h1 className="display mt-6 text-[clamp(4rem,14vw,12rem)]">
          Out of
          <br />
          f
          <span className="relative inline-block w-[0.6em] align-baseline">
            <span className="sr-only">o</span>
            <Aperture className="absolute bottom-[0.11em] left-[0.03em] size-[0.54em] animate-spin-slow text-blue" />
            <span className="invisible" aria-hidden>
              o
            </span>
          </span>
          cus.
        </h1>
        <p className="mt-8 max-w-md text-lg text-ink/70">This page didn&apos;t make the final cut. Let&apos;s get you back to the good stuff.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Back home
          </Button>
          <Button href="/#contact" size="lg" variant="ghost">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
