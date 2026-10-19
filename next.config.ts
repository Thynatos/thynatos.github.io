import type { NextConfig } from "next";

// Static export: `npm run build` writes a plain HTML site to `out/`,
// which can be hosted on GitHub Pages, Vercel or any static host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
