import type { Metadata } from "next";
import Footer from "@/components/Footer";
import UTMLandingPage from "@/components/pages/UTMLandingPage";

export const metadata: Metadata = {
  title: "Custom Software Development India | Save 50% | RDMI Web Services",
  description:
    "India's AI-first custom software development company. Talk to developers directly. Save 50% on development costs. Web apps, mobile apps, SaaS, AI/ML — get a free quote today.",
  robots: "noindex, nofollow",
};

export default function LPPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <UTMLandingPage />
      <Footer />
    </main>
  );
}
