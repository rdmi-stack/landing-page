import type { Metadata } from "next";
import Footer from "@/components/Footer";
import DigitalMarketingPage from "@/components/pages/DigitalMarketingPage";

export const metadata: Metadata = {
  title: "Digital Marketing Agency India | AI-Powered Google Ads, SEO, Meta Ads | RDMI",
  description:
    "India's AI-powered digital marketing agency. Google Ads, Meta Ads, LinkedIn Ads, SEO & GEO, content marketing, CRO & analytics. Free ad account grader + ROI calculator. Transparent ROAS reporting.",
  keywords:
    "digital marketing agency India, Google Ads agency India, performance marketing India, PPC management India, Meta Ads agency India, Facebook Ads India, LinkedIn Ads B2B India, social media marketing India, SEO company India, GEO optimization India, content marketing agency India, CRO services India, conversion rate optimization, marketing analytics India, lead generation company India, ecommerce marketing India, B2B digital marketing India, AI marketing India, ad spend calculator, ROAS optimization India, YouTube Ads India, email marketing India, WhatsApp marketing India, landing page optimization",
  openGraph: {
    title: "Digital Marketing Agency India — AI-Powered, ROAS-Focused | RDMI",
    description:
      "SEO, Google Ads, Meta Ads, LinkedIn Ads — AI-powered campaigns with transparent ROAS. Free marketing audit.",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <DigitalMarketingPage />
      <Footer />
    </main>
  );
}
