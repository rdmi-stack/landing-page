"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ArrowRight, Loader2, CheckCircle2, AlertTriangle, XCircle, Lock, Gauge } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

interface Recommendation {
  type: "pass" | "warn" | "fail";
  area: string;
  message: string;
  fix: string;
}

interface GradeResult {
  score: number;
  grade: string;
  recommendations: Recommendation[];
  summary: string;
}

function ScoreGauge({ score, grade }: { score: number; grade: string }) {
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : score >= 40 ? "#f97316" : "#ef4444";
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: "easeOut" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold" style={{ color }}>{grade}</span>
        <span className="text-xs text-zinc-500">{score}/100</span>
      </div>
    </div>
  );
}

export default function AdsGrader() {
  const [formData, setFormData] = useState({ spend: "", campaigns: "", ctr: "", convRate: "", roas: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setResult(null);
    try {
      const res = await fetch("/api/ads-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spend: Number(formData.spend),
          campaigns: Number(formData.campaigns),
          ctr: Number(formData.ctr),
          convRate: Number(formData.convRate),
          roas: Number(formData.roas),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Grading failed");
      setResult(data);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  const handleEmailGate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Ads Grader User",
          email,
          message: `[SEO Tool] Ads Grader: Score ${result?.score}/100 (${result?.grade}). Spend: ₹${formData.spend}, CTR: ${formData.ctr}%, Conv: ${formData.convRate}%, ROAS: ${formData.roas}x`,
        }),
      });
    } catch { /* silent */ }
    setEmailStatus("done");
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
            <Gauge className="w-3 h-3" /> Free Tool
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Grade Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Ad Account</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto">Enter your current metrics and get an instant performance score with actionable recommendations.</p>
        </motion.div>

        {status === "idle" || status === "loading" || status === "error" ? (
          <form onSubmit={handleGrade} className="max-w-md mx-auto p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Monthly Ad Spend (₹)</label>
                <input type="number" required value={formData.spend} onChange={(e) => setFormData({ ...formData, spend: e.target.value })} className={field} placeholder="100000" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Number of Campaigns</label>
                <input type="number" required value={formData.campaigns} onChange={(e) => setFormData({ ...formData, campaigns: e.target.value })} className={field} placeholder="5" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Avg CTR (%)</label>
                <input type="number" step="0.1" required value={formData.ctr} onChange={(e) => setFormData({ ...formData, ctr: e.target.value })} className={field} placeholder="3.5" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Conv Rate (%)</label>
                <input type="number" step="0.1" required value={formData.convRate} onChange={(e) => setFormData({ ...formData, convRate: e.target.value })} className={field} placeholder="2.5" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Current ROAS</label>
                <input type="number" step="0.1" required value={formData.roas} onChange={(e) => setFormData({ ...formData, roas: e.target.value })} className={field} placeholder="3.0" />
              </div>
            </div>
            <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-70">
              {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Target className="w-4 h-4" /> Grade My Ads</>}
            </button>
            {status === "error" && <p className="text-xs text-red-400 text-center">{errorMsg}</p>}
          </form>
        ) : null}

        {/* Results */}
        <AnimatePresence>
          {status === "done" && result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
              {/* Score + Summary */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <ScoreGauge score={result.score} grade={result.grade} />
                <p className="text-sm text-zinc-400 mt-4 max-w-md mx-auto">{result.summary}</p>
              </div>

              {/* Recommendations — first 3 free */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-sm font-semibold mb-4">Recommendations</p>
                <div className="space-y-3">
                  {result.recommendations.slice(0, 3).map((rec, i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/[0.02]">
                      <div className="flex items-start gap-3">
                        {rec.type === "pass" && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
                        {rec.type === "warn" && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />}
                        {rec.type === "fail" && <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                        <div>
                          <p className="text-xs font-semibold text-zinc-300">{rec.area}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{rec.message}</p>
                          {rec.fix && <p className="text-xs text-indigo-400/80 mt-1">{rec.fix}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gated remaining recs */}
                {result.recommendations.length > 3 && (
                  <div className="relative mt-4">
                    {emailStatus !== "done" && (
                      <div className="space-y-3 blur-sm pointer-events-none">
                        {result.recommendations.slice(3).map((rec, i) => (
                          <div key={i} className="p-4 rounded-lg bg-white/[0.02]">
                            <p className="text-xs text-zinc-500">{rec.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {emailStatus === "done" ? (
                      <div className="space-y-3">
                        {result.recommendations.slice(3).map((rec, i) => (
                          <div key={i} className="p-4 rounded-lg bg-white/[0.02]">
                            <div className="flex items-start gap-3">
                              {rec.type === "pass" && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
                              {rec.type === "warn" && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />}
                              {rec.type === "fail" && <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                              <div>
                                <p className="text-xs font-semibold text-zinc-300">{rec.area}</p>
                                <p className="text-xs text-zinc-500 mt-0.5">{rec.message}</p>
                                {rec.fix && <p className="text-xs text-indigo-400/80 mt-1">{rec.fix}</p>}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                          <p className="text-sm text-indigo-400 font-medium">Full report sent to your email!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <form onSubmit={handleEmailGate} className="w-full max-w-sm p-5 rounded-xl bg-[#111] border border-white/10 text-center">
                          <Lock className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                          <p className="text-sm font-semibold mb-1">Unlock Full Report</p>
                          <p className="text-xs text-zinc-500 mb-3">Get all recommendations + expert action plan</p>
                          <div className="flex gap-2">
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={emailStatus === "loading"} placeholder="Your email" className="flex-1 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 outline-none" />
                            <button type="submit" disabled={emailStatus === "loading"} className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold flex items-center gap-1 disabled:opacity-70">
                              {emailStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-center">
                <button onClick={() => { setStatus("idle"); setResult(null); }} className="text-xs text-zinc-500 hover:text-white transition-colors">Grade another account →</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
