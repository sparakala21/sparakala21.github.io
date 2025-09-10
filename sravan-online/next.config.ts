//next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/sravan-online",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;