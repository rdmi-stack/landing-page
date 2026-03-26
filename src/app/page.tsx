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
  title: "Custom Software Development Company India | App Development | RDMI — Save 50%",
  description:
    "RDMI is India's #1 custom software development company. Mobile app development, web application development & AI software — talk to developers directly, save 50%. 200+ projects delivered. Free consultation.",
  keywords: [
    "custom software development",
    "software development company",
    "mobile app development company",
    "app development company",
    "custom software development services",
    "web development company",
    "mobile app developer",
    "ai app development company",
    "android app development company",
    "web application development",
    "custom software development company India",
    "mobile app development company India",
    "software development services",
    "app development company India",
    "web application development company India",
  ].join(", "),
  openGraph: {
    title: "Custom Software Development Company India | Mobile App & Web Development | RDMI",
    description:
      "India's #1 custom software & app development company. Talk to developers directly. Save 50% cost. AI-powered delivery. 200+ projects. Free consultation & prototype.",
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
