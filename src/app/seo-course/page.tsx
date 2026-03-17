import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SEOCoursePage from "@/components/pages/SEOCoursePage";

export const metadata: Metadata = {
  title: "Free 7-Day SEO Masterclass | Learn SEO from Scratch | RDMI Web Services",
  description: "Free 7-day email course: Learn SEO fundamentals, keyword research, on-page SEO, technical SEO, link building, local SEO & measuring results. One lesson per day.",
  keywords: "free SEO course, learn SEO, SEO masterclass, SEO tutorial, SEO for beginners India, SEO training free",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <SEOCoursePage />
      <Footer />
    </main>
  );
}
