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
        destination: "/ai-agent-development-company",
        permanent: true,
      },
      {
        source: "/kw/web-development-company",
        destination: "/web-development-company",
        permanent: true,
      },
      {
        source: "/kw/custom-software-development",
        destination: "/custom-software-development-company",
        permanent: true,
      },
      {
        source: "/kw/mobile-app-development",
        destination: "/mobile-app-development-company",
        permanent: true,
      },
      {
        source: "/kw/ai-software-development",
        destination: "/ai-software-development-company",
        permanent: true,
      },
      {
        source: "/kw/ai-agent-development",
        destination: "/ai-agent-development-company",
        permanent: true,
      },
      {
        source: "/kw/ecommerce-development",
        destination: "/ecommerce-development-company",
        permanent: true,
      },
      {
        source: "/kw/enterprise-saas-development",
        destination: "/enterprise-software-development-company",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
