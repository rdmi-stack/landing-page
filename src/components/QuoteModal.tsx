"use client";

import { X, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteModal({ isOpen, onClose, productName }: QuoteModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, message: productName ? `[Product: ${productName}]\n${formData.message}` : formData.message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      // Redirect to thank-you page with conversion tracking
      const params = new URLSearchParams();
      if (formData.name) params.set("name", formData.name);
      if (productName) params.set("product", productName);
      setFormData({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
      onClose();
      router.push(`/thank-you?${params.toString()}`);
      setStatus("idle");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status !== "loading" ? onClose : undefined}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 shadow-2xl shadow-indigo-500/10"
          >
            {/* Close button */}
            {status !== "loading" && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            )}

            <div className="p-6 sm:p-8">
              {/* Success */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Request Sent!</h3>
                  <p className="text-sm text-zinc-400 mb-1">
                    A senior developer will reach out within 2 hours.
                  </p>
                  <p className="text-xs text-zinc-600">
                    Check your inbox — we&apos;ve sent a confirmation email.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
                      Free Consultation
                    </div>
                    <h3 className="text-2xl font-bold">Get Your Free Quote</h3>
                    {productName && (
                      <p className="text-sm text-indigo-400 mt-1 font-medium">
                        Product: {productName}
                      </p>
                    )}
                    <p className="text-sm text-zinc-500 mt-1">
                      Talk to a senior developer — not a sales rep. We respond within 2 hours.
                    </p>
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                      {errorMsg}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          disabled={status === "loading"}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={field}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          disabled={status === "loading"}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={field}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1.5">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          disabled={status === "loading"}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={field}
                          placeholder="+91 98185 65561"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-zinc-500 mb-1.5">Company</label>
                        <input
                          type="text"
                          disabled={status === "loading"}
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={field}
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Estimated Budget</label>
                      <select
                        disabled={status === "loading"}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={field}
                      >
                        <option value="" className="bg-zinc-900">Select budget range</option>
                        <option value="₹1,50,000 - ₹3,00,000" className="bg-zinc-900">₹1,50,000 – ₹3,00,000</option>
                        <option value="₹3,00,000 - ₹5,00,000" className="bg-zinc-900">₹3,00,000 – ₹5,00,000</option>
                        <option value="₹5,00,000 - ₹10,00,000" className="bg-zinc-900">₹5,00,000 – ₹10,00,000</option>
                        <option value="₹10,00,000 - ₹15,00,000" className="bg-zinc-900">₹10,00,000 – ₹15,00,000</option>
                        <option value="₹15,00,000 - ₹25,00,000" className="bg-zinc-900">₹15,00,000 – ₹25,00,000</option>
                        <option value="₹25,00,000+" className="bg-zinc-900">₹25,00,000+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Tell us about your project *</label>
                      <textarea
                        required
                        rows={3}
                        disabled={status === "loading"}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${field} resize-none`}
                        placeholder="Describe your project, goals, and timeline..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Free Quote & Prototype
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-zinc-600 text-center">
                      No spam. No obligation. NDA protected.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
