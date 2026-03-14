import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import USPSection from "@/components/USPSection";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import TechStack from "@/components/TechStack";
import CaseStudies from "@/components/CaseStudies";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
      <CaseStudies />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
