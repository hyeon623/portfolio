import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Cloudflare quick tunnels / phone preview to load Next dev assets.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
