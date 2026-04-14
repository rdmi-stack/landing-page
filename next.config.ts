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
    ];
  },
};

export default nextConfig;
