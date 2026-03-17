"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Target, Layers, ArrowRight, ArrowLeft, Loader2, CheckCircle2,
  Building2, ShoppingCart, Stethoscope, GraduationCap, Home, Wallet, Briefcase, Factory, Globe,
} from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const challenges = [
  { id: "seo", label: "SEO & Organic Growth", icon: Search, desc: "Rank higher, get more organic traffic" },
  { id: "paid-ads", label: "Paid Ads & PPC", icon: Target, desc: "Google Ads, Meta Ads, LinkedIn Ads" },
  { id: "both", label: "Full-Stack Marketing", icon: Layers, desc: "SEO + Paid Ads + CRO — everything" },
];

const industries = [
  { id: "ecommerce", label: "E-Commerce / D2C", icon: ShoppingCart },
  { id: "saas", label: "SaaS / Technology", icon: Globe },
  { id: "healthcare", label: "Healthcare", icon: Stethoscope },
  { id: "education", label: "Education / EdTech", icon: GraduationCap },
  { id: "realestate", label: "Real Estate", icon: Home },
  { id: "finance", label: "Finance / FinTech", icon: Wallet },
  { id: "services", label: "Professional Services", icon: Briefcase },
  { id: "manufacturing", label: "Manufacturing", icon: Factory },
  { id: "other", label: "Other", icon: Building2 },
];

const budgets = [
  "₹25,000 – ₹50,000/mo",
  "₹50,000 – ₹1,00,000/mo",
  "₹1,00,000 – ₹3,00,000/mo",
  "₹3,00,000+/mo",
];

const timelines = [
  "Immediately",
  "Within 1 month",
  "1–3 months",
  "Just exploring",
];

const recommendations: Record<string, { title: string; services: string[]; tagline: string }> = {
  seo: { title: "SEO Growth Package", services: ["Technical SEO Audit & Fix", "Content Strategy (8-12 blogs/mo)", "Link Building (20-50/mo)", "Monthly Rank Tracking"], tagline: "3x organic traffic in 6 months" },
  "paid-ads": { title: "Performance Marketing Suite", services: ["Google Ads Management", "Meta Ads Campaigns", "Landing Page Optimization", "Weekly ROAS Reports"], tagline: "3-5x ROAS average" },
  both: { title: "Full-Stack Growth Package", services: ["Everything in SEO Package", "Everything in Paid Ads Package", "Conversion Rate Optimization", "Marketing Analytics & Attribution"], tagline: "Complete revenue engine" },
};

export default function QuizFunnel() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ challenge: "", industry: "", budget: "", timeline: "", name: "", email: "", phone: "" });
  const [status, setStatus] = useState<Status>("idle");

  const totalSteps = 5;
  const rec = recommendations[answers.challenge] || recommendations.both;

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          email: answers.email,
          phone: answers.phone,
          message: `[Quiz Funnel] Challenge: ${answers.challenge}, Industry: ${answers.industry}, Budget: ${answers.budget}, Timeline: ${answers.timeline}`,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const canProceed = () => {
    if (step === 0) return !!answers.challenge;
    if (step === 1) return !!answers.industry;
    if (step === 2) return !!answers.budget;
    if (step === 3) return !!answers.timeline;
    if (step === 4) return !!answers.name && !!answers.email;
    return false;
  };

  const next = () => {
    if (step === 4) { handleSubmit(); return; }
    if (canProceed()) setStep(step + 1);
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Get a{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Personalized Plan</span>
          </h2>
          <p className="mt-3 text-zinc-400">Answer 4 quick questions. Get a custom marketing recommendation.</p>
        </motion.div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          {/* Progress */}
          {status !== "success" && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>Step {Math.min(step + 1, totalSteps)} of {totalSteps}</span>
                <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" animate={{ width: `${((step + 1) / totalSteps) * 100}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Your Recommended Package</h3>
                <div className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
                  <p className="text-lg font-bold text-indigo-400 mb-1">{rec.title}</p>
                  <p className="text-xs text-zinc-500 mb-3">{rec.tagline}</p>
                  <ul className="space-y-1.5 text-left">
                    {rec.services.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-zinc-400">Our strategist will reach out within 2 hours with a detailed proposal.</p>
              </motion.div>
            ) : (
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                {/* Step 0: Challenge */}
                {step === 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-4">What&apos;s your biggest marketing challenge?</p>
                    <div className="space-y-3">
                      {challenges.map((c) => (
                        <button key={c.id} onClick={() => setAnswers({ ...answers, challenge: c.id })} className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${answers.challenge === c.id ? "bg-indigo-500/10 border-indigo-500/30" : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"}`}>
                          <c.icon className={`w-5 h-5 ${answers.challenge === c.id ? "text-indigo-400" : "text-zinc-500"}`} />
                          <div>
                            <p className="text-sm font-medium">{c.label}</p>
                            <p className="text-xs text-zinc-500">{c.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Industry */}
                {step === 1 && (
                  <div>
                    <p className="text-sm font-semibold mb-4">What industry are you in?</p>
                    <div className="grid grid-cols-3 gap-2">
                      {industries.map((ind) => (
                        <button key={ind.id} onClick={() => setAnswers({ ...answers, industry: ind.id })} className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${answers.industry === ind.id ? "bg-indigo-500/10 border-indigo-500/30" : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"}`}>
                          <ind.icon className={`w-5 h-5 ${answers.industry === ind.id ? "text-indigo-400" : "text-zinc-500"}`} />
                          <p className="text-[11px] font-medium leading-tight">{ind.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Budget */}
                {step === 2 && (
                  <div>
                    <p className="text-sm font-semibold mb-4">What&apos;s your monthly marketing budget?</p>
                    <div className="space-y-2">
                      {budgets.map((b) => (
                        <button key={b} onClick={() => setAnswers({ ...answers, budget: b })} className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${answers.budget === b ? "bg-indigo-500/10 border-indigo-500/30 font-medium" : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"}`}>
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Timeline */}
                {step === 3 && (
                  <div>
                    <p className="text-sm font-semibold mb-4">When do you want to start?</p>
                    <div className="space-y-2">
                      {timelines.map((t) => (
                        <button key={t} onClick={() => setAnswers({ ...answers, timeline: t })} className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${answers.timeline === t ? "bg-indigo-500/10 border-indigo-500/30 font-medium" : "bg-white/[0.02] border-white/[0.06] hover:border-white/10"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <div>
                    <p className="text-sm font-semibold mb-4">Almost done — where should we send your plan?</p>
                    <div className="space-y-3">
                      <input type="text" value={answers.name} onChange={(e) => setAnswers({ ...answers, name: e.target.value })} className={field} placeholder="Full Name *" />
                      <input type="email" value={answers.email} onChange={(e) => setAnswers({ ...answers, email: e.target.value })} className={field} placeholder="Email *" />
                      <input type="tel" value={answers.phone} onChange={(e) => setAnswers({ ...answers, phone: e.target.value })} className={field} placeholder="Phone / WhatsApp (optional)" />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  {step > 0 ? (
                    <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-zinc-500 hover:text-white transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : <div />}
                  <button
                    onClick={next}
                    disabled={!canProceed() || status === "loading"}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {step === 4 ? "Get My Plan" : "Next"}
                    {step < 4 && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
