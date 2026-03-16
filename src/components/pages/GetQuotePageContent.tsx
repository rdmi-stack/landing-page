"use client";

import { ArrowRight, Loader2, Shield, Clock, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const benefits = [
  { icon: Users, title: "Talk to Developers", desc: "No sales reps. Direct access to senior engineers." },
  { icon: Zap, title: "AI-Powered Dev Team", desc: "50% faster delivery with AI-powered workflows." },
  { icon: Shield, title: "NDA Protected", desc: "Your idea is safe. Full IP ownership from day one." },
  { icon: Clock, title: "2-Hour Response", desc: "We respond within 2 hours, not 2 days." },
];

export default function GetQuotePageContent() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", budget: "", message: "",
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
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  return (
    <section className="pt-28 pb-20 lg:pt-36 lg:pb-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-4">
                Free Consultation
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Get Your{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Free Quote</span>
              </h1>
              <p className="mt-4 text-lg text-zinc-400 max-w-md">
                Tell us about your project and get a detailed proposal with timeline, tech stack, and transparent pricing — within 24 hours.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{b.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-sm text-emerald-400 font-medium">
                &ldquo;They delivered our SaaS MVP in 6 weeks at half the cost of US agencies. The AI-first approach saved us 200+ hours.&rdquo;
              </p>
              <p className="text-xs text-zinc-500 mt-2">— Startup Founder, San Francisco</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            {status === "success" ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Request Sent!</h3>
                <p className="text-sm text-zinc-400">A senior developer will reach out within 2 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-1">Start Your Project</h2>
                <p className="text-sm text-zinc-500 mb-6">Fill in the details below. We&apos;ll get back within 2 hours.</p>
                {status === "error" && (
                  <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">{errorMsg}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Full Name *</label>
                      <input type="text" required disabled={status === "loading"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={field} placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Email *</label>
                      <input type="email" required disabled={status === "loading"} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={field} placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Phone / WhatsApp</label>
                      <input type="tel" disabled={status === "loading"} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={field} placeholder="+91 98185 65561" />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1.5">Company</label>
                      <input type="text" disabled={status === "loading"} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={field} placeholder="Company name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Estimated Budget</label>
                    <select disabled={status === "loading"} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={field}>
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
                    <textarea required rows={4} disabled={status === "loading"} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${field} resize-none`} placeholder="Describe your project, goals, and timeline..." />
                  </div>
                  <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {status === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" />Sending...</>) : (<>Get Free Quote & Prototype<ArrowRight className="w-4 h-4" /></>)}
                  </button>
                  <p className="text-xs text-zinc-600 text-center">No spam. No obligation. NDA protected.</p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
