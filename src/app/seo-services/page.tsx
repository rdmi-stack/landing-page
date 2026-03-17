import type { Metadata } from "next";
import Footer from "@/components/Footer";
import SEOServicesPage from "@/components/pages/SEOServicesPage";

export const metadata: Metadata = {
  title: "SEO & GEO Services India | Rank in Google + AI | RDMI Web Services",
  description:
    "India's first SEO + GEO agency. Traditional SEO, Generative Engine Optimization, AI Overview optimization & entity authority. Rank in Google, ChatGPT, Perplexity & Gemini. Free audit.",
  keywords:
    "SEO services India, GEO optimization India, generative engine optimization, AI SEO India, AI overview optimization, SEO company India, best SEO agency India, answer engine optimization, zero-click SEO, entity SEO India, programmatic SEO India, social search SEO, video SEO India, technical SEO services, on-page SEO India, link building services India, local SEO company India, ecommerce SEO India, SaaS SEO agency, SEO audit India, content SEO India, Google ranking services India, ChatGPT SEO, Perplexity optimization, AI search optimization India, SEO packages India, B2B SEO India",
  openGraph: {
    title: "SEO + GEO Services India — Rank in Google AND AI | RDMI",
    description: "Traditional SEO + Generative Engine Optimization. Rank in Google, ChatGPT, Perplexity & AI Overviews. Free audit.",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <SEOServicesPage />
      <Footer />
    </main>
  );
}
