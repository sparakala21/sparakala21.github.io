import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // basePath: "/sravan-online",
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  compilerOptions: {
    "moduleResolution": "bundler", // or "node"
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  transpilePackages: ['next-mdx-remote/rsc'],
};

export default nextConfig;
