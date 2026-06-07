import type { NextConfig } from "next";

const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.euautomation.com",
      },
    ],
  },
}

module.exports = nextConfig