import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // orbit-1f04.png is 50,744,972 bytes, above the 50MB default.
    maximumResponseBody: 52_000_000,
  },
};

export default nextConfig;
