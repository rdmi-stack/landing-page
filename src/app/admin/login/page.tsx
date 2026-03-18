import { Metadata } from "next";
import AdminLogin from "@/components/pages/AdminLogin";

export const metadata: Metadata = {
  title: "Admin Login — RDMI Web Services",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return <AdminLogin />;
}
