"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2, GraduationCap, Search, FileText, Code2, Link2, MapPin, BarChart3, Zap, Star, Users, Clock } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const days = [
  { day: 1, icon: Search, title: "How Google Really Works", topics: ["Crawling, indexing & ranking explained", "Google's ranking factors in 2025", "How AI is changing search"] },
  { day: 2, icon: Search, title: "Keyword Research Masterclass", topics: ["Finding high-intent keywords", "Keyword clustering & topic maps", "AI tools for keyword research"] },
  { day: 3, icon: FileText, title: "On-Page SEO — Complete Guide", topics: ["Title tags & meta descriptions", "Header hierarchy & content structure", "Internal linking strategy"] },
  { day: 4, icon: Code2, title: "Technical SEO Essentials", topics: ["Core Web Vitals optimization", "Schema markup & structured data", "Crawl budget & site architecture"] },
  { day: 5, icon: Link2, title: "Link Building That Works", topics: ["White-hat link building tactics", "Guest posting & digital PR", "Broken link building strategy"] },
  { day: 6, icon: MapPin, title: "Local SEO & Google Business", topics: ["Google Business Profile optimization", "Local citations & reviews", "Map pack ranking factors"] },
  { day: 7, icon: BarChart3, title: "Measuring SEO Success", topics: ["GA4 & Search Console setup", "KPIs that actually matter", "Building your SEO dashboard"] },
];

export default function SEOCoursePage() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name || "SEO Course Student", email: formData.email, message: "[SEO Course] Enrolled in 7-Day SEO Masterclass" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors";

  return (
    <div className="pb-20 lg:pb-32">
      {/* Hero */}
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" /> 100% Free — No Credit Card Required
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Free 7-Day{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">SEO Masterclass</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Learn SEO from scratch. One email per day for 7 days. Written by the team that&apos;s grown 50+ websites organically.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> 2,000+ enrolled</span>
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400" /> 4.9/5 rating</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400" /> 10 min/day</span>
            </div>
          </div>
        </div>
      </section>

      {/* Email capture — top */}
      <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {status === "success" ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-1">You&apos;re In!</h3>
            <p className="text-sm text-zinc-400">Check your inbox — Day 1 is on its way.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={field} placeholder="Your Name" />
            <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={field} placeholder="Your Email *" />
            <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] disabled:opacity-70">
              {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <GraduationCap className="w-4 h-4" />}
              {status === "loading" ? "Enrolling..." : "Start Free Course"}
            </button>
            {status === "error" && <p className="text-xs text-red-400 text-center">Failed. Please try again.</p>}
            <p className="text-[10px] text-zinc-600 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </section>

      {/* Curriculum */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">What You&apos;ll Learn</h2>
          <p className="text-zinc-500 mt-2">7 days. 7 actionable lessons. Zero fluff.</p>
        </div>
        <div className="space-y-4">
          {days.map((d, i) => (
            <div key={d.day} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/20 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                {d.day}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <d.icon className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-semibold text-sm">{d.title}</h3>
                </div>
                <ul className="space-y-1">
                  {d.topics.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400/60 flex-shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
          <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Ready to Learn SEO?</h2>
          <p className="text-zinc-400 text-sm mb-4">Join 2,000+ students. Start getting results in 7 days.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 font-semibold text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
            Enroll Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
