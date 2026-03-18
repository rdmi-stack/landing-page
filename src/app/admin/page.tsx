import { Metadata } from "next";
import AdminPage from "@/components/pages/AdminPage";

export const metadata: Metadata = {
  title: "Admin Panel — RDMI Web Services",
  robots: "noindex, nofollow",
};

export default function Admin() {
  return <AdminPage />;
}
