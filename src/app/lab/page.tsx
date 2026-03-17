import type { Metadata } from "next";
import Footer from "@/components/Footer";
import LabPage from "@/components/pages/LabPage";

export const metadata: Metadata = {
  title: "SEO & Marketing Experiment Lab | Data-Driven Insights | RDMI Web Services",
  description: "Original SEO, PPC & conversion experiments with real data. Title tag length, AI content ranking, internal linking impact, page speed vs conversions & more.",
  keywords: "SEO experiments, marketing data, A/B testing results, SEO case studies, Google Ads experiments, conversion optimization data",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <LabPage />
      <Footer />
    </main>
  );
}
