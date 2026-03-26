import { Metadata } from "next";
import ThankYouPage from "@/components/pages/ThankYouPage";

export const metadata: Metadata = {
  title: "Thank You — RDMI Web Services",
  description: "Your request has been received. A senior developer will contact you within 2 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <ThankYouPage />
    </main>
  );
}
