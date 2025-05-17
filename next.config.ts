import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com", // allow all HTTPS domains (use with caution)
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // allow all HTTPS domains (use with caution)
      },
    ],
  },
};

export default nextConfig;
