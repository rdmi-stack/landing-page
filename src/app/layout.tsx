import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/ModalProvider";
import FloatingWidget from "@/components/FloatingWidget";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RDMI Web Services | Custom Software & App Development Company India | Save 50% Cost",
  description:
    "RDMI Web Services - India's AI-first custom software development company. Talk to developers directly, save 50% on software development costs. Expert web app, mobile app, SaaS & enterprise software development services.",
  keywords:
    "custom software development India, app development company India, software development services, web application development, mobile app development India, hire software developers India, IT outsourcing India, SaaS development company, enterprise software development, custom web development, React development company, Node.js development India, full stack development services, software consulting India, MVP development company, startup software development, ecommerce development India, cloud application development, API development services, offshore software development India",
  openGraph: {
    title: "RDMI Web Services | Custom Software & App Development India",
    description:
      "Talk to developers directly. Save 50% cost. AI-first approach to custom software development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNG2DGKSZV" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MNG2DGKSZV');`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ModalProvider>
          {children}
          <FloatingWidget />
          <ExitIntentPopup />
        </ModalProvider>
      </body>
    </html>
  );
}
