import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import USPSection from "@/components/USPSection";
import Services from "@/components/Services";
import AICapabilities from "@/components/AICapabilities";
import HowItWorks from "@/components/HowItWorks";
import TechStack from "@/components/TechStack";
import ProductShowcase from "@/components/ProductShowcase";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI-Integrated Software Development & AI Agents | Talk to AI Developer | RDMI",
  description:
    "RDMI builds AI-integrated software, autonomous AI agents, chatbots, and workflow automation. Talk direct to a senior AI developer — not a salesperson. Show-before-commit model: free working prototype in 48 hours before you pay anything.",
  keywords: [
    "ai integrated software development",
    "ai agent development company",
    "ai software development",
    "custom ai agent development",
    "autonomous ai agent",
    "ai chatbot development",
    "ai workflow automation",
    "talk to ai developer",
    "ai integrated app development",
    "custom software development with ai",
    "ai software development india",
    "build ai agent",
    "rag chatbot development",
    "ai automation services",
    "agentic ai development",
  ].join(", "),
  openGraph: {
    title: "AI-Integrated Software & AI Agent Development | RDMI",
    description:
      "AI-integrated software development and autonomous AI agents. Talk direct to a senior AI developer. Free working prototype in 48 hours — show before you commit. 200+ products shipped.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <USPSection />
      <Services />
      <AICapabilities />
      <HowItWorks />
      <TechStack />
      <ProductShowcase />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
