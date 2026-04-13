"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, X, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

type Status = "idle" | "loading" | "success" | "error";

export default function FloatingWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  // Hide on keyword landing pages (they have their own sticky bar)
  if (pathname?.startsWith("/kw/")) return null;

  const handleSubmit = async (e: React.FormEvent) => {
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
          message: "[Callback] Requested callback from floating widget",
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setPhone("");
        setOpen(false);
      }, 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* Callback form */}
      
        {open && (
          <div
           
           
           
           
            className="w-72 p-4 rounded-2xl bg-[#111] border border-white/10 shadow-2xl shadow-black/50"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Request Callback</p>
              <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-3.5 h-3.5 text-zinc-500" />
              </button>
            </div>

            {status === "success" ? (
              <div className="flex items-center gap-2 py-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <p className="text-sm text-emerald-400">We&apos;ll call you within 30 minutes!</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-zinc-500 mb-3">
                  Enter your number — a developer will call you within 30 minutes.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={status === "loading"}
                    placeholder="+91 98185 65561"
                    className="flex-1 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </form>
                {status === "error" && (
                  <p className="text-xs text-red-400 mt-2">Failed to send. Try WhatsApp instead.</p>
                )}
              </>
            )}
          </div>
        )}
      

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        {/* Callback button */}
        <button
         
         
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center transition-all hover:shadow-xl hover:shadow-indigo-500/40"
          aria-label="Request callback"
        >
          <Phone className="w-5 h-5 text-white" />
        </button>

        {/* WhatsApp button */}
        <a
         
         
          href="https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%20need%20help%20with%20a%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-all hover:shadow-xl hover:shadow-emerald-500/40"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
        </a>
      </div>
    </div>
  );
}
