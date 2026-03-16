import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "How It Works | Our Development Process | RDMI Web Services",
  description:
    "Simple 4-step software development process — Discovery Call, Proposal & Prototype, Agile Development, Launch & Support. Talk to developers directly. No middlemen. AI-powered delivery.",
  keywords:
    "software development process, how software development works, agile development India, custom software workflow, project development steps",
  openGraph: {
    title: "How It Works - RDMI Web Services",
    description:
      "4-step process: Discovery → Prototype → Development → Launch. Talk to developers directly.",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <HowItWorks />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
