"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, FileText, Target, Download } from "lucide-react";
import { useExitIntent } from "@/hooks/useExitIntent";

type Status = "idle" | "loading" | "success" | "error";

const offers = {
  seo: {
    icon: FileText,
    title: "Free: 2025 SEO Checklist",
    subtitle: "47-Point SEO Audit Checklist",
    description: "The exact checklist our team uses for every client. Technical SEO, on-page, off-page, local SEO — all in one PDF.",
    gradient: "from-emerald-500 to-green-600",
    downloadPath: "/downloads/seo-checklist-2025.pdf",
    tag: "2025 SEO Checklist",
  },
  marketing: {
    icon: Target,
    title: "Free: Google Ads Playbook",
    subtitle: "Complete Google Ads Strategy for Indian Businesses",
    description: "Campaign structure, bidding strategies, ad copy templates, and ROAS optimization tactics — battle-tested on ₹10Cr+ ad spend.",
    gradient: "from-blue-500 to-indigo-600",
    downloadPath: "/downloads/google-ads-playbook.pdf",
    tag: "Google Ads Playbook",
  },
};

export default function ExitIntentPopup() {
  const { showPopup, dismiss } = useExitIntent();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isSEO = pathname?.includes("seo") || pathname?.includes("digital-marketing");
  const offer = isSEO ? offers.seo : offers.marketing;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Lead Magnet Download",
          email,
          message: `[Lead Magnet] Downloaded: ${offer.tag}. Page: ${pathname}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-2xl bg-[#111] border border-white/10 shadow-2xl shadow-indigo-500/10 overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className={`h-1.5 bg-gradient-to-r ${offer.gradient}`} />

            {/* Close */}
            <button onClick={dismiss} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10">
              <X className="w-4 h-4 text-zinc-400" />
            </button>

            <div className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Check Your Inbox!</h3>
                  <p className="text-sm text-zinc-400 mb-4">We&apos;ve sent the download link to your email.</p>
                  <a
                    href={offer.downloadPath}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Now
                  </a>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.gradient} flex items-center justify-center flex-shrink-0`}>
                      <offer.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-400 font-medium mb-1">Wait — before you go!</p>
                      <h3 className="text-lg font-bold leading-tight">{offer.title}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">{offer.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-5">{offer.description}</p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Enter your email to download free"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r ${offer.gradient} font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                    >
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Download className="w-4 h-4" /> Get Free Download</>
                      )}
                    </button>
                    {status === "error" && (
                      <p className="text-xs text-red-400 text-center">Failed to send. Please try again.</p>
                    )}
                  </form>

                  <p className="text-[10px] text-zinc-600 text-center mt-3">No spam. Unsubscribe anytime.</p>

                  <button onClick={dismiss} className="block w-full text-center text-xs text-zinc-600 hover:text-zinc-400 mt-3 transition-colors">
                    No thanks, I&apos;ll figure it out myself
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
