"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { Wordmark, Aperture } from "@/components/brand/Logo";
import { Button, ArrowUpRight } from "@/components/ui/Button";
import { services } from "@/content/site";
import { useLenis } from "@/components/motion/SmoothScroll";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo",
          hidden && !open && !mega ? "-translate-y-full" : "translate-y-0",
        )}
        onMouseLeave={() => setMega(false)}
      >
        <div
          className={clsx(
            "transition-[background,box-shadow,backdrop-filter] duration-500",
            scrolled || mega ? "bg-paper/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
          )}
        >
          <nav className="container-x flex h-[72px] items-center justify-between gap-6" aria-label="Main">
            <Link href="/" className="relative z-10 shrink-0" aria-label="Digiparadise Studio home">
              <Wordmark className="h-11 w-auto text-ink" />
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              <li>
                <button
                  className={clsx(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                    mega ? "bg-ink text-paper" : "hover:bg-ink/5",
                  )}
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onMouseEnter={() => setMega(true)}
                  onClick={() => setMega((m) => !m)}
                >
                  Services
                  <svg viewBox="0 0 12 12" className={clsx("size-3 transition-transform duration-300", mega && "rotate-180")} aria-hidden>
                    <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
              {links.map((l) => (
                <li key={l.href} onMouseEnter={() => setMega(false)}>
                  <Link href={l.href} className="group relative block rounded-full px-4 py-2 text-[15px] font-medium">
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-right scale-x-0 bg-blue transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden md:block" onMouseEnter={() => setMega(false)}>
              <Button href="/#contact" variant="ink">
                Start a project
              </Button>
            </div>

            <button
              className="relative z-[60] grid size-12 place-items-center rounded-full bg-ink text-paper md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="relative block h-3 w-5">
                <span className={clsx("absolute left-0 h-[2px] w-5 bg-current transition-all duration-300", open ? "top-[5px] rotate-45" : "top-0")} />
                <span className={clsx("absolute left-0 h-[2px] w-5 bg-current transition-all duration-300", open ? "top-[5px] -rotate-45" : "top-[10px]")} />
              </span>
            </button>
          </nav>

          {/* Mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                id="mega-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="hidden border-t border-line md:block"
              >
                <div className="container-x grid grid-cols-3 gap-3 py-6">
                  {services.map((s, i) => (
                    <motion.div
                      key={s.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex h-full items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-white"
                      >
                        <span className="font-label text-xs font-bold text-muted transition-colors group-hover:text-blue">{s.index}</span>
                        <span className="flex-1">
                          <span className="flex items-center justify-between gap-2 font-display text-lg font-bold tracking-tight">
                            {s.title}
                            <ArrowUpRight className="size-4 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-muted">{s.pitch}</span>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col bg-ink text-paper md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Wordmark className="h-11 w-auto text-paper" />
              <button
                className="grid size-12 place-items-center rounded-full bg-paper text-ink"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                autoFocus
              >
                <span className="relative block size-5">
                  <span className="absolute left-0 top-1/2 h-[2px] w-5 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-[2px] w-5 -rotate-45 bg-current" />
                </span>
              </button>
            </div>
            <ul className="container-x mt-6 flex flex-1 flex-col gap-1">
              {[{ label: "Services", href: "/#services" }, ...links, { label: "Contact", href: "/#contact" }].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-paper/10 py-4 font-display text-5xl font-extrabold tracking-tight"
                  >
                    {l.label}
                    <span className="font-label text-xs text-aqua">0{i + 1}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-x flex items-center justify-between pb-10">
              <Button href="/#contact" variant="aqua" onClick={() => setOpen(false)}>
                Start a project
              </Button>
              <Aperture className="size-10 animate-spin-slow text-aqua" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
