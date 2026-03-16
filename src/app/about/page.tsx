import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageContent from "@/components/pages/AboutPageContent";

export const metadata: Metadata = {
  title: "About RDMI Web Services | AI-First Software Development Company India",
  description:
    "RDMI Web Services (RDMI Tech Ventures Pvt. Ltd.) — India's AI-first custom software development company. Talk to developers directly, save 50% cost. Serving clients across USA, UK, Canada, Australia & Singapore.",
  keywords:
    "about RDMI Web Services, software development company India, AI first development, RDMI Tech Ventures, IT company India, offshore development India",
  openGraph: {
    title: "About RDMI Web Services - AI-First Software Company India",
    description:
      "India's AI-first software development company. Direct developer access. 50% cost savings.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
