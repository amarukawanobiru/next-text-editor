import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.watchOptions = {
      ignored: ["**/node_modules", "**/.next", "**/.git"],
    };
  },
};

export default nextConfig;
