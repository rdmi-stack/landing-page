import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Case Studies & Client Success Stories | RDMI Web Services",
  description:
    "See how we've helped startups and enterprises build custom software. Real case studies with measurable results — 3x revenue, 60% cost reduction, 10x faster delivery. Read client testimonials.",
  keywords:
    "software development case studies, client testimonials India, custom software success stories, app development portfolio, SaaS case studies",
  openGraph: {
    title: "Case Studies - RDMI Web Services",
    description:
      "Real results: 3x revenue, 60% cost reduction. See our software development case studies.",
    type: "website",
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <CaseStudies />
        <Testimonials />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
