"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2, MessageCircle, ArrowRight, Phone, Clock } from "lucide-react";
import { useExitIntent } from "@/hooks/useExitIntent";
import { useModal } from "./ModalProvider";

export default function ExitIntentPopup() {
  const { showPopup, dismiss } = useExitIntent();
  const pathname = usePathname();
  const { openModal } = useModal();
  const [mode, setMode] = useState<"offer" | "callback">("offer");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isSEO = pathname?.includes("seo") || pathname?.includes("digital-marketing");

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Callback Request",
          email: "callback@rdmi.in",
          phone,
          message: `[Callback] Exit-intent callback request from ${pathname}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleOpenQuote = () => {
    dismiss();
    openModal();
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-2xl bg-[#111] border border-white/10 shadow-2xl shadow-indigo-500/10 overflow-hidden"
          >
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600" />

            <button onClick={dismiss} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10">
              <X className="w-4 h-4 text-zinc-400" />
            </button>

            <div className="p-6 sm:p-8">
              {status === "success" ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">We&apos;ll Call You Shortly!</h3>
                  <p className="text-sm text-zinc-400 mb-1">A senior developer will call within 30 minutes.</p>
                  <p className="text-xs text-zinc-600">Not a salesperson — an actual developer who can discuss your project.</p>
                </div>
              ) : mode === "callback" ? (
                <>
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-400 font-medium mb-1">Request a Callback</p>
                      <h3 className="text-lg font-bold leading-tight">Talk to a Developer in 30 Min</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Free consultation. No commitment.</p>
                    </div>
                  </div>

                  <form onSubmit={handleCallback} className="space-y-3">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={status === "loading"}
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Requesting...</>
                      ) : (
                        <><Phone className="w-4 h-4" /> Request Free Callback</>
                      )}
                    </button>
                    {status === "error" && <p className="text-xs text-red-400 text-center">Failed. Please try again.</p>}
                  </form>

                  <button onClick={() => setMode("offer")} className="block w-full text-center text-xs text-zinc-600 hover:text-zinc-400 mt-3 transition-colors">
                    ← Back to options
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="w-7 h-7 text-indigo-400" />
                    </div>
                    <p className="text-xs text-indigo-400 font-medium mb-2">Wait — before you go!</p>
                    <h3 className="text-xl font-bold leading-tight">
                      Get a Free {isSEO ? "Marketing" : "Development"} Consultation
                    </h3>
                    <p className="text-sm text-zinc-400 mt-2">
                      Talk to a senior {isSEO ? "marketing strategist" : "developer"} — not a salesperson.
                      Get expert advice on your project, free of charge.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6 text-xs text-zinc-500">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    Avg. response time: 47 minutes
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleOpenQuote}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                      Get Free Quote & Prototype
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setMode("callback")}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 hover:bg-white/5 font-semibold text-sm transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Request a Callback Instead
                    </button>

                    <a
                      href="https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%20need%20help%20with%20my%20project."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-400 font-semibold text-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us Now
                    </a>
                  </div>

                  <p className="text-[10px] text-zinc-600 text-center mt-4">
                    No spam. No obligation. NDA protected.
                  </p>

                  <button onClick={dismiss} className="block w-full text-center text-xs text-zinc-600 hover:text-zinc-400 mt-3 transition-colors">
                    No thanks, I&apos;m just browsing
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
