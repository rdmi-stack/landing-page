import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProductShowcase from "@/components/ProductShowcase";

export const metadata: Metadata = {
  title: "50+ Software Products & Solutions | Custom Development | RDMI Web Services",
  description:
    "Explore 50+ ready-to-build software products — AI agents, SaaS platforms, mobile apps, e-commerce, fintech, and more. Get a free quote for any product. Starting from ₹1.5 Lakh.",
  keywords:
    "software products India, SaaS development, AI agent development, mobile app development, e-commerce development, fintech software, custom software solutions India",
  openGraph: {
    title: "50+ Software Products & Solutions - RDMI Web Services",
    description:
      "AI agents, SaaS, mobile apps, fintech — 50+ products ready to build. Starting ₹1.5L.",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <div className="pt-8">
        <ProductShowcase />
      </div>
      <Footer />
    </main>
  );
}
