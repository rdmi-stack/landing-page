import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "FAQ | Software Development Questions Answered | RDMI Web Services",
  description:
    "Frequently asked questions about custom software development — pricing, timeline, process, technology stack, AI integration, post-launch support, NDA & IP protection. Get answers now.",
  keywords:
    "software development FAQ, custom software questions, app development cost India, how long to build software, software development process questions",
  openGraph: {
    title: "FAQ - RDMI Web Services",
    description:
      "Get answers to common software development questions — pricing, timeline, tech stack & more.",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <FAQ />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
