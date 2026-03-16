import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import TechStack from "@/components/TechStack";
import USPSection from "@/components/USPSection";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Custom Software Development Services India | Web, Mobile, AI, SaaS | RDMI",
  description:
    "Full-stack custom software development services — web apps, mobile apps, SaaS platforms, AI/ML, e-commerce, cloud & DevOps, API development. Senior developers. AI-first approach. Save 50%.",
  keywords:
    "custom software development services India, web application development, mobile app development, SaaS development company, AI ML development, e-commerce development, cloud DevOps services, API development",
  openGraph: {
    title: "Software Development Services - RDMI Web Services",
    description:
      "Web apps, mobile apps, SaaS, AI/ML, e-commerce — full-stack development services. Save 50%.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <USPSection />
        <Services />
        <TechStack />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
