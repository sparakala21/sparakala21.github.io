//next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  distDir: "out"
};

export default nextConfig;