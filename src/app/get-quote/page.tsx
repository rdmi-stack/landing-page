import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetQuotePageContent from "@/components/pages/GetQuotePageContent";

export const metadata: Metadata = {
  title: "Get Free Quote | Custom Software Development | RDMI Web Services",
  description:
    "Get a free quote for your custom software, web app, or mobile app project. Talk to senior developers directly. No sales reps. Response within 2 hours. Save 50% on development costs.",
  keywords:
    "software development quote, custom software cost India, app development pricing, hire developers India, free consultation software project",
  openGraph: {
    title: "Get Free Quote - RDMI Web Services",
    description:
      "Get a free quote for your software project. Talk to developers directly. Save 50% cost.",
    type: "website",
  },
};

export default function GetQuotePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <GetQuotePageContent />
      <Footer />
    </main>
  );
}
