# digiparadise.studio — Website Plan (v1)

Status: **plan only, nothing built yet.** SEO deep-dive comes after the build, but the build is set up so SEO needs no rework later.

---

## 1. What we're working from

| Source | What it gives us |
|---|---|
| Company profile (Google Doc, one tab, read in full) | Positioning, 6 services, production capabilities, 6-step process, audiences, 3 Australian clients, editing folder + Playbook portfolio links |
| Portfolio PDF (7 pages) | 20 creators/celebs, 10 brands, 4 personal brands, with YouTube/Instagram links |
| Logo zip (4 PNGs) | `dp` arrow mark (black circle + "STUDIOS"), "digi paradise STUDIO" wordmark with camera-aperture dots on the i's, aqua accent version |
| buildmingle.in | Layout and motion inspiration (see §3) |

### Brand read from the logo
- **Colours in the logo:** black, white, and a bright **aqua/cyan** (~`#14FFE8`, used inside the `d` and `p` bowls and on the dot).
- **Motifs to animate:** the **up-arrow** on the `d` (growth), the **camera-aperture** dots on the i's (production), the **trailing dot** after "paradise." and "STUDIOS·".
- **Wordmark type:** rounded geometric sans; "STUDIO" is wide-tracked caps (Montserrat-style).

---

## 2. Colour system

The logo is black, white and aqua. You asked for white, black, blue and a yellow, so I've kept the logo's aqua as the hero colour and added blue and yellow as supporting accents.

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0A0B0D` | Main text, dark sections, buttons |
| `paper` | `#F6F5F0` | Page background (warm off-white like the inspiration site, softer than pure white) |
| `white` | `#FFFFFF` | Cards on paper |
| `aqua` (brand) | `#14FFE8` | Logo colour: highlights, hover fills, cursor, focus rings, the dot |
| `blue` | `#1F3BFF` | Electric blue: links, the "For brands" side, gradients with aqua |
| `sun` | `#FFD23F` | Yellow, used sparingly: one highlight card per page, stickers, "Launched"-style tags |
| `line` | `#E4E2DA` | Borders and dividers |

Rule: pages stay mostly black and off-white. Aqua, blue and yellow are accents, never full backgrounds except one statement section each (as buildmingle does with its black and yellow cards).
> Need from client: the exact aqua hex from the brand file, to replace my estimate.

## 3. Typography
- **Display / headings:** *Bricolage Grotesque* 700–800, tight tracking (−4%). Big, chunky, sentence case, ending in a full stop, as on buildmingle.
- **Body:** *Inter* (or *Manrope*) 400/500.
- **Labels / eyebrows:** *Montserrat* 500, wide letter-spacing in caps, to echo "S T U D I O" in the logo.
- All fonts self-hosted via `next/font`, so there are no layout shifts (good for Core Web Vitals and SEO).

---

## 4. What we take from buildmingle.in (inspiration, not a copy)
- Huge stacked headline in the hero, with **one letter swapped for an icon**. They swap the "o" in "your" for a crosshair. We swap an "o" for the **spinning aperture** from our logo.
- Warm off-white canvas, black text, then **one black card and one yellow card side by side** for the audience split.
- Short, punchy section headings ("One card says it all.").
- Numbered steps inside cards, FAQ, and a closing CTA band.
- Clean sticky nav with a pill-shaped search/CTA and a black rounded primary button.

---

## 5. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Static HTML per page, built-in metadata/sitemap APIs: best for SEO |
| Styling | **Tailwind CSS v4** with the tokens above | Fast and consistent |
| Smooth scroll | **Lenis** | The "buttery" scroll feel |
| Scroll animation | **GSAP + ScrollTrigger** | Pinned sections, scroll-scrubbed reveals, timeline progress |
| UI micro-interactions | **Motion (Framer Motion)** | Hovers, magnetic buttons, layout transitions, accordions |
| Content | Typed local content files (`/content/*.ts`) to start; can move to a CMS (Sanity) later | No CMS cost at launch, easy to edit |
| Video | Short muted MP4/WebM loops + poster images, hosted on Bunny/Cloudflare Stream or Vercel Blob | YouTube embeds are heavy and hurt page speed |
| Forms | Contact form → Resend email (+ optional Google Sheet) | Simple lead capture |
| Hosting | **Vercel** on `digiparadise.studio` | Free tier is fine, global CDN |
| Analytics | Vercel Analytics + GA4 / Search Console (in SEO phase) | |

Every animation respects `prefers-reduced-motion`, and nothing important is hidden behind JavaScript, so search engines see all content.

---

## 6. Sitemap (built for SEO from day one: one page per service)

```
/                                   Home
/services                           All services
  /services/social-media-management
  /services/personal-branding
  /services/short-form-video-production
  /services/ugc-performance-ads
  /services/video-editing-post-production
  /services/content-ip-branded-series
/work                               Portfolio (filters: Creators · Brands · Personal Brands)
  /work/[case-study]                (later: DIB Accountants, DIB Lawyers, Botanica… as case studies)
/process                            How we work + production capabilities
/about                              Who we are, who we work with
/contact                            Enquiry form + WhatsApp + email
/privacy, /terms
(later, SEO phase) /blog, /industries/[x], /locations/[city]
```

---

## 7. Home page: section by section

1. **Preloader (≈1.2s, first visit only):** the `dp` mark draws in, the arrow shoots up, aqua fills the bowls, then it wipes up to reveal the page.
2. **Nav:** logo left; Services (mega-menu with 6 service cards), Work, Process, About; black pill "Start a project" right. Hides on scroll down, returns on scroll up.
3. **Hero:**
   - Headline (draft): **"Content that gets noticed. Growth that gets measured."** The "o" in "noticed" becomes the rotating aperture.
   - Sub: *We build content systems that help brands get noticed, earn attention and turn it into business.*
   - Two CTAs: **"I'm a brand"** / **"I'm a founder or creator"**.
   - Right side: a fan of 3–4 **vertical 9:16 reel cards** autoplaying muted, floating slightly with the mouse (parallax).
4. **Logo/name marquee:** "Trusted by" with Varun Mayya, Mary Kom, Vivek Bindra, AstroTalk, Seekho, Perfora, MyFrido… in two rows going opposite ways. Speed reacts to scroll velocity; it pauses on hover.
5. **"Not posts. A content system."** (our version of "One card says it all"): a central interactive "content engine" card with labelled parts around it: Strategy → Scripts → Shoot → Edit → Publish → Amplify. Hovering a label lights up its part.
6. **Services:** a 6-card bento grid. On hover a card lifts, its icon animates and a short reel preview plays. Click goes to the service page.
7. **"Brand, or founder?"** (two-column split): a **black card** for *Brands & D2C* (awareness, UGC ads, social) and a **yellow card** for *Founders, coaches & experts* (personal branding, thought leadership), each with 4 numbered steps and a CTA.
8. **Work showcase:** filter tabs (Creators · Brands · Personal Brands) animating between grids. Cards show the name, a category tag and "View ↗". Hovering plays a preview, and the cursor turns into an aqua "▶ Play" disc.
9. **Process 01–06:** a horizontal pinned scroll on desktop and a vertical timeline on mobile. An aqua progress line fills as you scroll.
10. **Production capabilities:** five columns (Pre-production, Production, Post, Distribution, Management) that reveal with staggered text.
11. **Numbers band** (needs real figures from client: reels delivered, views generated, creators worked with, years).
12. **Testimonials** (if client provides).
13. **FAQ** accordion (also feeds FAQ structured data later).
14. **Closing CTA:** "Your next idea deserves an audience." Big black band, aqua button, WhatsApp link.
15. **Footer:** giant "digiparadise." wordmark that slides up on reveal, links, socials, email, location.

## 8. Other pages (brief)
- **Service page template:** hero with service name → overview → "What we do" (grouped lists from the doc, as expandable chips) → deliverables checklist → relevant work → mini process → FAQ → CTA. Six pages share one template, each with unique copy.
- **Work:** full filterable grid with lightbox video player. Later, case-study pages with problem → approach → result.
- **Process:** the 6 steps in depth plus production capabilities.
- **About:** positioning, "who we work with" (6 audiences as cards), team (if provided).
- **Contact:** short form (name, email/phone, I am a brand/founder/creator, services checkboxes, budget range, message) with validation micro-states. Success screen animates the dp arrow.

---

## 9. Micro-interactions and motion (the "feel")

| Interaction | Where |
|---|---|
| Lenis smooth scroll (gentle, not floaty) | Global |
| **Custom cursor:** small aqua dot that grows on links and becomes "▶ Play" on videos and "View" on cards; off on touch devices | Global |
| **Magnetic buttons:** the button pulls toward the cursor and its fill sweeps in from the hover side | All CTAs |
| **Split-text reveal:** headings rise in word by word, masked | Section titles |
| **Aperture icon** rotates with scroll speed | Hero, loader, section dividers |
| **Up-arrow motif:** buttons' arrows nudge up and right on hover; back-to-top is the dp arrow | Global |
| Card tilt + shadow lift on hover | Service and work cards |
| Hover-to-play video previews (lazy-loaded) | Work, services |
| Velocity-reactive marquee | Client names |
| Sticky pinned horizontal scroll | Process |
| Page transitions: aqua panel wipe between routes | Route changes |
| Nav hide/show on scroll; active-link underline that slides | Nav |
| Number count-up when in view | Stats band |
| Form fields: floating labels, aqua focus ring, shake on error, check on success | Contact |

Performance budget: Lighthouse **95+** on mobile, LCP < 2.0s, CLS ≈ 0. Videos never block the first paint.

---

## 10. SEO foundations built in now (full SEO pass comes later)
- Static pages, semantic HTML, exactly one `<h1>` per page, logical heading order.
- Clean URLs (as in §6), per-page `title`/`description` hooks ready to fill.
- `next/image` with alt text, self-hosted fonts, lazy video: fast Core Web Vitals.
- `sitemap.xml`, `robots.txt`, canonical URLs and Open Graph images, set up but tuned in the SEO phase.
- Slots ready for Organization / LocalBusiness / Service / FAQ JSON-LD.

---

## 11. Build phases

| Phase | Output |
|---|---|
| **0. Setup** | Next.js project, tokens, fonts, logo converted to SVG, Lenis/GSAP/Motion wired up, deploy preview on Vercel |
| **1. Design system** | Buttons, cursor, cards, nav, footer, section shells, motion utilities |
| **2. Home page** | All 15 sections with real copy from the profile doc |
| **3. Services** | Index + 6 service pages |
| **4. Work, Process, About, Contact** | Remaining pages + working contact form |
| **5. Polish** | Mobile pass, reduced-motion pass, performance and accessibility audit, cross-browser |
| **6. Launch** | Connect `digiparadise.studio`, SSL, redirects |
| **7. SEO phase** | Keyword map, metadata, schema, Search Console, content/blog plan |

---

## 12. Open questions / needed from client
1. **Brand name to use everywhere:** the doc says *Digiparadise Media*, the logo says *digi paradise Studio*, the PDF says *Digiparadise Studios*. Pick one; consistency matters a lot for SEO.
2. **Vector logo (SVG/AI/PDF)**: we only have PNGs. I can trace an SVG if needed, but the original file is better.
3. Exact brand aqua hex. Confirm we add electric blue and yellow as accents.
4. **Missing services E and G** in the doc (it jumps A, B, C, D, F, H). Were two services removed, or is something missing?
5. **Video files:** 10–15 best reels as MP4 (vertical) for hero and work previews. The doc links an *Editing Folder* (Google Drive) and an *Editing Portfolio* (Playbook). Please pick the reels from there and confirm we can download them and host them on the site.
6. **Permission** to show celebrity and creator names (Mary Kom, Vivek Bindra, Varun Mayya, etc.) and brand logos publicly.
7. Real numbers for the stats band, plus 2–4 testimonials.
8. Contact details: email, WhatsApp, phone, city/address (needed for local SEO), social handles.
9. Case-study details for DIB Accountants, DIB Lawyers and Botanica Pharmacy (Australia).
10. Hero headline: go with my draft or provide your own line.
