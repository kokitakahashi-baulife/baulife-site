import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 旧名 MyAtelier のURLを Artherapy へ転送(2026-09-08 改名)。
  // App Store Connect の掲載リンクは新URLに直したが、外に出た旧URLが死なないように残す
  async redirects() {
    return [
      { source: "/myatelier", destination: "/artherapy", permanent: true },
      { source: "/myatelier/:path*", destination: "/artherapy/:path*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
