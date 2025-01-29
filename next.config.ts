import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "samehadaku.mba",
      },
    ],
  },
};

export default nextConfig;
