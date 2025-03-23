import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, //todo remporary This skips TS errors during build and dev
  },
};

export default nextConfig;
