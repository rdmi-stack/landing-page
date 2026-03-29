"use client";

import { X, ArrowRight, Loader2, Bot } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AIQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  region?: "india" | "usa" | "dubai";
}

type Status = "idle" | "loading" | "success" | "error";

const aiUseCases = [
  "AI Chatbot / Voice Agent",
  "Autonomous AI Agent / Workflow",
  "RAG Knowledge Base / Document AI",
  "AI Workflow Automation (n8n/Make)",
  "GenAI Consulting / AI Strategy",
  "AI Copilot / SaaS AI Features",
  "Computer Vision / Image AI",
  "AI Integration into Existing Software",
  "Other / Not Sure Yet",
];

const budgetOptions = {
  india: [
    { value: "₹3,00,000 - ₹5,00,000", label: "₹3,00,000 – ₹5,00,000" },
    { value: "₹5,00,000 - ₹10,00,000", label: "₹5,00,000 – ₹10,00,000" },
    { value: "₹10,00,000 - ₹20,00,000", label: "₹10,00,000 – ₹20,00,000" },
    { value: "₹20,00,000 - ₹50,00,000", label: "₹20,00,000 – ₹50,00,000" },
    { value: "₹50,00,000 - ₹1,00,00,000", label: "₹50,00,000 – ₹1 Crore" },
    { value: "₹1,00,00,000+", label: "₹1 Crore+" },
  ],
  usa: [
    { value: "$5,000 - $15,000", label: "$5,000 – $15,000" },
    { value: "$15,000 - $25,000", label: "$15,000 – $25,000" },
    { value: "$25,000 - $50,000", label: "$25,000 – $50,000" },
    { value: "$50,000 - $100,000", label: "$50,000 – $100,000" },
    { value: "$100,000 - $250,000", label: "$100,000 – $250,000" },
    { value: "$250,000+", label: "$250,000+" },
  ],
  dubai: [
    { value: "AED 35,000 - AED 75,000 / $10K-$20K", label: "AED 35K – 75K ($10K – $20K)" },
    { value: "AED 75,000 - AED 175,000 / $20K-$50K", label: "AED 75K – 175K ($20K – $50K)" },
    { value: "AED 175,000 - AED 350,000 / $50K-$100K", label: "AED 175K – 350K ($50K – $100K)" },
    { value: "AED 350,000 - AED 750,000 / $100K-$200K", label: "AED 350K – 750K ($100K – $200K)" },
    { value: "AED 750,000+ / $200K+", label: "AED 750K+ ($200K+)" },
  ],
};

export default function AIQuoteModal({ isOpen, onClose, productName, region = "india" }: AIQuoteModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    useCase: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const fullMessage = [
        "[AI Agent Inquiry]",
        productName ? `Product: ${productName}` : "",
        `Use Case: ${formData.useCase}`,
        `Timeline: ${formData.timeline}`,
        formData.message,
      ].filter(Boolean).join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          budget: formData.budget,
          message: fullMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      const params = new URLSearchParams();
      if (formData.name) params.set("name", formData.name);
      params.set("product", productName || "AI Agent Development");
      setFormData({ name: "", email: "", phone: "", company: "", useCase: "", budget: "", timeline: "", message: "" });
      onClose();
      router.push(`/thank-you?${params.toString()}`);
      setStatus("idle");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
      setStatus("error");
    }
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors";

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            onClick={status !== "loading" ? onClose : undefined}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111] border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            {/* Purple gradient top bar */}
            <div className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

            {status !== "loading" && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            )}

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium mb-3">
                  <Bot className="w-3.5 h-3.5" />
                  AI Agent & GenAI Consulting
                </div>
                <h3 className="text-2xl font-bold">Get Your AI Strategy Session</h3>
                {productName && (
                  <p className="text-sm text-purple-400 mt-1 font-medium">
                    {productName}
                  </p>
                )}
                <p className="text-sm text-zinc-500 mt-1">
                  Senior AI engineer responds in 2 hours — not a sales rep. Working prototype in 2 weeks.
                </p>
              </div>

              {/* Error */}
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
                    <input type="text" required disabled={status === "loading"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={field} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Work Email *</label>
                    <input type="email" required disabled={status === "loading"} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={field} placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Phone / WhatsApp</label>
                    <input type="tel" disabled={status === "loading"} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={field} placeholder="+91 98185 65561" />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Company / Website</label>
                    <input type="text" disabled={status === "loading"} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={field} placeholder="company.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">AI Use Case *</label>
                  <select required disabled={status === "loading"} value={formData.useCase} onChange={(e) => setFormData({ ...formData, useCase: e.target.value })} className={field}>
                    <option value="" className="bg-zinc-900">What do you want to build?</option>
                    {aiUseCases.map((uc) => (
                      <option key={uc} value={uc} className="bg-zinc-900">{uc}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Investment Budget</label>
                    <select disabled={status === "loading"} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={field}>
                      <option value="" className="bg-zinc-900">Select budget range</option>
                      {budgetOptions[region].map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-zinc-900">{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-1.5">Timeline</label>
                    <select disabled={status === "loading"} value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className={field}>
                      <option value="" className="bg-zinc-900">When do you need this?</option>
                      <option value="ASAP — within 2 weeks" className="bg-zinc-900">ASAP — within 2 weeks</option>
                      <option value="This month" className="bg-zinc-900">This month</option>
                      <option value="Next 1-3 months" className="bg-zinc-900">Next 1-3 months</option>
                      <option value="Next quarter" className="bg-zinc-900">Next quarter</option>
                      <option value="Exploring / Strategy phase" className="bg-zinc-900">Exploring / Strategy phase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Describe your AI project *</label>
                  <textarea required rows={3} disabled={status === "loading"} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${field} resize-none`} placeholder="What process do you want to automate? What data sources? What's the current pain point?" />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "loading" ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : (
                    <><Bot className="w-4 h-4" /> Get Free AI Strategy Session <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                <p className="text-xs text-zinc-600 text-center">
                  No spam. NDA protected. Working prototype in 2 weeks or walk away.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
