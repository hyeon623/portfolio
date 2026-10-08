import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `npm run dev` binds 0.0.0.0. Browsers that open 127.0.0.1 are otherwise
  // blocked from dev assets and the HMR socket, so the page never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // orbit-1f04.png is 50,744,972 bytes, above the 50MB default.
    maximumResponseBody: 52_000_000,
  },
};

export default nextConfig;
