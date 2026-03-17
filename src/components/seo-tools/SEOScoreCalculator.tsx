"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Loader2, CheckCircle2, AlertTriangle, XCircle, Lock, Gauge } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

interface SEOIssue {
  type: "pass" | "warn" | "fail";
  message: string;
  category: string;
}

interface AuditResult {
  score: number;
  issues: SEOIssue[];
  pageSpeed: { performance: number; accessibility: number; seo: number; bestPractices: number };
  url: string;
}

const loadingMessages = [
  "Fetching your website...",
  "Analyzing page structure...",
  "Checking meta tags...",
  "Running PageSpeed audit...",
  "Evaluating SEO signals...",
  "Calculating score...",
];

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 70 ? "#10b981" : score >= 40 ? "#f59e0b" : "#ef4444";
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-[10px] text-zinc-500">/100</span>
      </div>
    </div>
  );
}

function MiniGauge({ value, label }: { value: number; label: string }) {
  const color = value >= 70 ? "text-emerald-400" : value >= 40 ? "text-amber-400" : "text-red-400";
  return (
    <div className="text-center">
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-zinc-500">{label}</p>
    </div>
  );
}

export default function SEOScoreCalculator() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setStatus("loading");
    setResult(null);
    setLoadingIdx(0);

    const interval = setInterval(() => {
      setLoadingIdx((prev) => (prev + 1) % loadingMessages.length);
    }, 2500);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      clearInterval(interval);
      if (!res.ok) throw new Error(data.error || "Audit failed");
      setResult(data);
      setStatus("done");
    } catch (err) {
      clearInterval(interval);
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
          name: "SEO Audit User",
          email,
          message: `[SEO Tool] Requested full audit for: ${result?.url}. Score: ${result?.score}/100`,
        }),
      });
      setEmailStatus("done");
    } catch {
      setEmailStatus("done");
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#161616]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-3">
            <Gauge className="w-3 h-3" /> Free SEO Tool
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Check Your Website&apos;s{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">SEO Score</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto">
            Enter your URL and get an instant SEO audit with actionable fixes.
          </p>
        </motion.div>

        {/* Input */}
        <form onSubmit={handleAudit} className="flex gap-3 max-w-xl mx-auto mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === "loading"}
              placeholder="Enter your website URL (e.g., example.com)"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-semibold text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/25 disabled:opacity-70 flex items-center gap-2 whitespace-nowrap"
          >
            {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Analyze
          </button>
        </form>

        {/* Loading */}
        <AnimatePresence>
          {status === "loading" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto mb-4" />
              <motion.p key={loadingIdx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-zinc-400">
                {loadingMessages[loadingIdx]}
              </motion.p>
              <div className="w-48 h-1.5 rounded-full bg-white/5 mx-auto mt-4 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" initial={{ width: "0%" }} animate={{ width: "90%" }} transition={{ duration: 15, ease: "linear" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {status === "error" && (
          <div className="text-center py-6">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <p className="text-sm text-red-400">{errorMsg}</p>
            <button onClick={() => setStatus("idle")} className="mt-3 text-xs text-zinc-500 hover:text-white transition-colors">Try again</button>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {status === "done" && result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
              {/* Score + PageSpeed */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="grid sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="text-xs text-zinc-500 mb-2">Overall SEO Score</p>
                    <ScoreGauge score={result.score} />
                    <p className="text-center text-xs text-zinc-500 mt-2">{result.url}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-3">PageSpeed Insights</p>
                    <div className="grid grid-cols-2 gap-4">
                      <MiniGauge value={result.pageSpeed.performance} label="Performance" />
                      <MiniGauge value={result.pageSpeed.accessibility} label="Accessibility" />
                      <MiniGauge value={result.pageSpeed.seo} label="SEO" />
                      <MiniGauge value={result.pageSpeed.bestPractices} label="Best Practices" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues list — show first 6 free */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-sm font-semibold mb-4">Issues Found ({result.issues.length})</p>
                <div className="space-y-2">
                  {result.issues.slice(0, 6).map((issue, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                      {issue.type === "pass" && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
                      {issue.type === "warn" && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />}
                      {issue.type === "fail" && <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                      <div>
                        <p className="text-sm">{issue.message}</p>
                        <p className="text-[10px] text-zinc-600">{issue.category}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gated section */}
                {result.issues.length > 6 && (
                  <div className="relative mt-4">
                    {emailStatus !== "done" && (
                      <div className="space-y-2 blur-sm pointer-events-none">
                        {result.issues.slice(6, 9).map((issue, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                            <p className="text-sm">{issue.message}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {emailStatus === "done" ? (
                      <div className="space-y-2">
                        {result.issues.slice(6).map((issue, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                            {issue.type === "pass" && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
                            {issue.type === "warn" && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />}
                            {issue.type === "fail" && <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                            <div>
                              <p className="text-sm">{issue.message}</p>
                              <p className="text-[10px] text-zinc-600">{issue.category}</p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                          <p className="text-sm text-emerald-400 font-medium">Full audit sent to your email!</p>
                          <p className="text-xs text-zinc-500 mt-1">Our SEO team will follow up with a detailed action plan.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <form onSubmit={handleEmailGate} className="w-full max-w-sm p-5 rounded-xl bg-[#111] border border-white/10 text-center">
                          <Lock className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                          <p className="text-sm font-semibold mb-1">Get Full Audit Report</p>
                          <p className="text-xs text-zinc-500 mb-3">Unlock all issues + get expert recommendations</p>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={emailStatus === "loading"}
                              placeholder="Your email"
                              className="flex-1 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 outline-none"
                            />
                            <button
                              type="submit"
                              disabled={emailStatus === "loading"}
                              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 text-sm font-semibold flex items-center gap-1 disabled:opacity-70"
                            >
                              {emailStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
