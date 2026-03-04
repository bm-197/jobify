import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* cacheComponents disabled — conflicts with dynamic route segment config */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
