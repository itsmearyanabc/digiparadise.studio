import type { NextConfig } from "next";

// Fully static export: every page is prerendered to HTML in ./out and served
// from Cloudflare's edge as static assets (fast, cheap, ideal for SEO).
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // The default image optimizer needs a server; static export serves images as-is.
    unoptimized: true,
  },
};

export default nextConfig;
