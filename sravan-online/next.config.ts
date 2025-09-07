import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/sravan-online",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  transpilePackages: ['next-mdx-remote'],
};

export default nextConfig;
