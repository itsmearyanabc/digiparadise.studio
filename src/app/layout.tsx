import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { site } from "@/content/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const label = Montserrat({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-montserrat", display: "swap" });

// Base metadata. Full SEO pass (per-page titles, schema, OG images) is a later phase.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Digiparadise Studio | Content & Digital Growth Studio",
    template: "%s | Digiparadise Studio",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Digiparadise Studio",
    title: "Digiparadise Studio | Content & Digital Growth Studio",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
};

// Runs before paint: flags JS (enables pre-hidden reveal states) and skips the intro for returning visitors.
const bootScript = `document.documentElement.classList.add('js');try{if(sessionStorage.getItem('dp-intro')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('intro-seen');window.__dpIntroDone=true}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${label.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
