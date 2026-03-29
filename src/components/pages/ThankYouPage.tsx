"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Mail,
  MessageCircle,
  ArrowRight,
  Phone,
  Shield,
  FileText,
} from "lucide-react";
import Footer from "@/components/Footer";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const nextSteps = [
  {
    icon: Mail,
    title: "Check Your Inbox",
    description: "We've sent a confirmation email with project details and next steps.",
    time: "Now",
  },
  {
    icon: Phone,
    title: "Developer Call",
    description:
      "A senior developer (not a salesperson) will call or WhatsApp you to discuss your project.",
    time: "Within 2 hours",
  },
  {
    icon: FileText,
    title: "Free Proposal & Prototype",
    description:
      "You'll receive a detailed proposal with architecture, timeline, cost breakdown, and a clickable prototype.",
    time: "Within 48 hours",
  },
  {
    icon: Shield,
    title: "NDA & Kickoff",
    description:
      "Sign the NDA, approve the proposal, and we start building. No upfront payment required.",
    time: "When you're ready",
  },
];

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "there";
  const product = searchParams.get("product") || "";

  // Fire GA4 conversion event on page load
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "G-MNG2DGKSZV",
        event_category: "lead",
        event_label: product || "quote_form",
        value: 1,
      });

      // Also fire as generate_lead for Google Ads conversion tracking
      window.gtag("event", "generate_lead", {
        currency: "INR",
        value: 150000, // min project value
        event_label: product || "quote_form",
      });
    }
  }, [product]);

  return (
    <>
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success hero */}
          <div
           
           
           
            className="text-center mb-16"
          >
            <div
             
             
             
              className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Thank You, {name.split(" ")[0]}!
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              Your request has been received.{" "}
              {product && (
                <span className="text-indigo-400 font-medium">Project: {product}. </span>
              )}
              A senior developer will reach out within{" "}
              <span className="text-white font-semibold">2 hours</span> — not a sales rep.
            </p>

            {/* Urgency bar */}
            <div
             
             
             
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
            >
              <Clock className="w-4 h-4" />
              Avg. response time: 47 minutes
            </div>
          </div>

          {/* Next steps */}
          <div
           
           
           
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              What Happens <span className="gradient-text">Next</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {nextSteps.map((step, i) => (
                <div
                  key={step.title}
                 
                 
                 
                  className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/20 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                          Step {i + 1}
                        </span>
                        <span className="text-xs text-zinc-600">{step.time}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct contact */}
          <div
           
           
           
            className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
          >
            <h3 className="text-lg font-semibold mb-2">Need Faster Response?</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Reach out directly — we&apos;re online right now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%20just%20submitted%20a%20quote%20request.%20Can%20we%20discuss%20my%20project%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 transition-all text-sm font-semibold hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us Now
              </a>
              <a
                href="tel:+919818565561"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                Call +91 98185 65561
              </a>
            </div>
          </div>

          {/* Back to homepage */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors"
            >
              <ArrowRight className="w-3 h-3 rotate-180" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <ThankYouContent />
    </Suspense>
  );
}
