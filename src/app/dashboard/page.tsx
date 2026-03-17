import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardPage from "@/components/pages/DashboardPage";

export const metadata: Metadata = {
  title: "Live Marketing Dashboard | Transparent Results | RDMI Web Services",
  description: "See our real-time marketing results — backlinks built, articles published, keywords tracked, ad spend managed. Full transparency.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navbar />
      <DashboardPage />
      <Footer />
    </main>
  );
}
