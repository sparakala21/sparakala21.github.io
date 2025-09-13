// next.config.ts
import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure page extensions to include MDX
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Disable basePath since you're using GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/sravan-online' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sravan-online/' : '',
};

// Create MDX configuration
const withMDX = createMDX({
  // Add markdown plugins here if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);