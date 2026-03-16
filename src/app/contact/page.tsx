import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us | Talk to Developers Directly | RDMI Web Services India",
  description:
    "Contact RDMI Web Services for custom software development. Talk to senior developers directly — no sales reps. Email: info@rdmi.in. Response within 2 hours. Offices in India, USA & UK.",
  keywords:
    "contact software development company India, hire developers India, software development consultation, RDMI contact, talk to developers",
  openGraph: {
    title: "Contact Us - RDMI Web Services",
    description:
      "Talk to developers directly. Email: info@rdmi.in. Response within 2 hours.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <ContactPageContent />
      <Footer />
    </main>
  );
}
