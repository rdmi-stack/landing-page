import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/kw/ai-agent-workflow-consulting",
        destination: "/kw/ai-agent-development",
        permanent: true,
      },
      // Campaign launch: web-dev moved off the /kw/ prefix to a clean URL
      {
        source: "/kw/web-development-company",
        destination: "/web-development-company",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
