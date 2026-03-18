import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import USPSection from "@/components/USPSection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TechStack from "@/components/TechStack";
import ProductShowcase from "@/components/ProductShowcase";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RDMI Web Services | #1 Custom Software Development Company India | Save 50%",
  description:
    "India's top custom software & app development company. Hire dedicated developers, build SaaS, mobile apps, AI solutions & enterprise software. Talk to developers directly — save 50% cost. NDA protected, full source code ownership.",
  keywords: [
    "software development company India",
    "custom software development company India",
    "app development company India",
    "mobile app development company India",
    "hire software developers India",
    "SaaS development company India",
    "AI development company India",
    "web application development company India",
    "IT outsourcing company India",
    "MVP development company India",
  ].join(", "),
  openGraph: {
    title: "RDMI Web Services | Custom Software & App Development Company India",
    description:
      "Talk to developers directly. Save 50% cost. AI-first custom software, mobile apps, SaaS & enterprise solutions. NDA protected.",
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
