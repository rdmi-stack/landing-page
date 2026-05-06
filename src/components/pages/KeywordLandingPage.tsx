"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  IndianRupee,
  Bot,
  Phone,
  Loader2,
  Star,
  Shield,
} from "lucide-react";
import Footer from "@/components/Footer";
import type { KeywordGroup } from "@/data/keyword-groups";

/* ─── helpers ─── */
const gradients = [
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-red-500",
  "from-cyan-500 to-blue-500",
];

export default function KeywordLandingPage({ data }: { data: KeywordGroup }) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", projectType: "", budget: "", challenge: "" });
  const budgets = ["Under ₹1L / <$2K", "₹1L – ₹5L / $2K – $10K", "₹5L – ₹15L / $10K – $25K", "₹15L – ₹50L / $25K – $75K", "₹50L+ / $75K+", "Not sure yet"];
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [exitIntentSubtitle, setExitIntentSubtitle] = useState<string | null>(null);
  const [stickyForm, setStickyForm] = useState({ name: "", phone: "", email: "" });
  const [stickyStatus, setStickyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [stickySheetOpen, setStickySheetOpen] = useState(false);

  const handleStickySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stickyForm.phone.trim()) return;
    setStickyStatus("loading");
    try {
      const message = [`[formType:${data.form.formType}-sticky]`, `[${data.primaryKeyword} — WhatsApp Bar]`, `Source: sticky whatsapp bar on /kw/${data.slug}`].join("\n");
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: stickyForm.name || "WhatsApp Bar Lead", email: stickyForm.email || "whatsapp@rdmi.in", phone: stickyForm.phone, message }) });
      const waMsg = encodeURIComponent(`Hi RDMI, I'm ${stickyForm.name || "interested"} and I'd like to discuss ${data.primaryKeyword}.`);
      window.open(`https://wa.me/919818565561?text=${waMsg}`, "_blank");
      setStickyStatus("success");
      setStickyForm({ name: "", phone: "", email: "" });
      setStickySheetOpen(false);
      setTimeout(() => setStickyStatus("idle"), 3000);
    } catch {
      setStickyStatus("error");
      setTimeout(() => setStickyStatus("idle"), 3000);
    }
  };

  const isAIPage = data.slug.includes("ai-") || data.slug.includes("-dubai") || data.slug.includes("-usa") || data.slug.includes("healthcare") || data.slug.includes("insurance") || data.slug.includes("travel");
  const openConsult = () => setShowModal(true);
  const closeConsult = () => { setShowModal(false); setExitIntentSubtitle(null); };

  // Exit-intent recovery: trigger modal once per session when cursor races toward top edge
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("rdmi_exit_intent_fired") === "1") return;

    let lastY = 0;
    let lastT = performance.now();

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const velocity = (e.clientY - lastY) / (now - lastT || 1);
      if (e.clientY < 50 && velocity < -0.35) {
        sessionStorage.setItem("rdmi_exit_intent_fired", "1");
        setExitIntentSubtitle("Wait — grab your free consultation before you go. No spam, no calls unless you ask.");
        setShowModal(true);
        window.removeEventListener("mousemove", onMove);
      }
      lastY = e.clientY;
      lastT = now;
    };

    const t = setTimeout(() => window.addEventListener("mousemove", onMove), 8000);
    return () => { clearTimeout(t); window.removeEventListener("mousemove", onMove); };
  }, []);

  // Theme-driven colors
  const t = data.theme;
  const accentMap: Record<string, { text: string; bg: string; bg50: string; border: string; borderL: string; ring: string }> = {
    indigo:  { text: "text-indigo-600",  bg: "bg-indigo-600",  bg50: "bg-indigo-50",  border: "border-indigo-200", borderL: "border-l-indigo-500", ring: "focus:ring-indigo-500/20 focus:border-indigo-500" },
    blue:    { text: "text-blue-600",    bg: "bg-blue-600",    bg50: "bg-blue-50",    border: "border-blue-200",   borderL: "border-l-blue-500",   ring: "focus:ring-blue-500/20 focus:border-blue-500" },
    violet:  { text: "text-violet-600",  bg: "bg-violet-600",  bg50: "bg-violet-50",  border: "border-violet-200", borderL: "border-l-violet-500", ring: "focus:ring-violet-500/20 focus:border-violet-500" },
    purple:  { text: "text-purple-600",  bg: "bg-purple-600",  bg50: "bg-purple-50",  border: "border-purple-200", borderL: "border-l-purple-500", ring: "focus:ring-purple-500/20 focus:border-purple-500" },
    amber:   { text: "text-amber-600",   bg: "bg-amber-600",   bg50: "bg-amber-50",   border: "border-amber-200",  borderL: "border-l-amber-500",  ring: "focus:ring-amber-500/20 focus:border-amber-500" },
    emerald: { text: "text-emerald-600", bg: "bg-emerald-600", bg50: "bg-emerald-50", border: "border-emerald-200",borderL: "border-l-emerald-500",ring: "focus:ring-emerald-500/20 focus:border-emerald-500" },
    rose:    { text: "text-rose-600",    bg: "bg-rose-600",    bg50: "bg-rose-50",    border: "border-rose-200",   borderL: "border-l-rose-500",   ring: "focus:ring-rose-500/20 focus:border-rose-500" },
    sky:     { text: "text-sky-600",     bg: "bg-sky-600",     bg50: "bg-sky-50",     border: "border-sky-200",    borderL: "border-l-sky-500",    ring: "focus:ring-sky-500/20 focus:border-sky-500" },
    cyan:    { text: "text-cyan-600",    bg: "bg-cyan-600",    bg50: "bg-cyan-50",    border: "border-cyan-200",   borderL: "border-l-cyan-500",   ring: "focus:ring-cyan-500/20 focus:border-cyan-500" },
  };
  const a = accentMap[t.accent] || accentMap.indigo;

  const f = data.form;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const message = [`[formType:${f.formType}]`, `[${data.primaryKeyword} Consultation]`, formData.projectType ? `Project: ${formData.projectType}` : "", formData.budget ? `Budget: ${formData.budget}` : "", formData.challenge || ""].filter(Boolean).join("\n");
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, message }) });
      if (!res.ok) throw new Error();
      const params = new URLSearchParams();
      if (formData.name) params.set("name", formData.name);
      params.set("product", data.primaryKeyword);
      setFormData({ name: "", email: "", phone: "", projectType: "", budget: "", challenge: "" });
      setShowModal(false);
      router.push(`/thank-you?${params.toString()}`);
    } catch { setFormStatus("error"); }
  };

  const inp = `w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 ${a.ring} outline-none transition-all`;

  return (
    <div className="bg-white text-gray-900">
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden text-white" style={{ background: t.heroGradient }}>
        {/* Ambient theme + complementary orbs */}
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[160px] opacity-50 animate-pulse-slow mix-blend-screen" style={{ backgroundColor: t.urgencyColor }} />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full blur-[150px] opacity-35 mix-blend-screen" style={{ backgroundColor: "#a855f7" }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30 mix-blend-screen" style={{ backgroundColor: "#06b6d4" }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full blur-[130px] opacity-25 mix-blend-screen" style={{ backgroundColor: "#ec4899" }} />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)" }} />

        {/* Vignette + grain */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top status pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 backdrop-blur-md text-xs font-semibold text-emerald-200 shadow-lg shadow-emerald-500/10">
              <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" /><span className="relative rounded-full w-2 h-2 bg-emerald-400" /></span>
              47 developers building now
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-xs font-semibold text-white shadow-lg shadow-black/10">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span className="ml-1 text-amber-100">4.9 · 200+ shipped</span>
            </span>
          </div>

          {/* Two-column hero: text left, product mockup right */}
          <div className="grid lg:grid-cols-[1.05fr,1fr] gap-10 lg:gap-14 items-center mb-12 lg:mb-16">
            {/* LEFT — text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl text-xs sm:text-sm font-semibold mb-5 border border-white/30 shadow-lg shadow-black/20">
                <span className="text-base">{t.icon}</span>
                <span className="tracking-wide">{data.hero.badge}</span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-5xl xl:text-[3.6rem] font-extrabold leading-[1.05] tracking-[-0.025em] mb-5 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(180deg, #ffffff 0%, #ffffff 55%, rgba(255,255,255,0.82) 100%)", filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.25))" }}>
                {data.hero.h1}
              </h1>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-7 font-light max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                {data.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-stretch justify-center lg:justify-start gap-3 mb-5">
                <button onClick={openConsult} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white font-bold text-base lg:text-lg transition-all hover:scale-[1.03] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)] cursor-pointer overflow-hidden ring-1 ring-white/60" style={{ color: t.urgencyColor }}>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <span className="relative">{data.hero.cta1}</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="https://wa.me/919818565561" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border border-white/35 bg-white/10 backdrop-blur-md text-white font-bold text-sm lg:text-base hover:bg-white/20 hover:border-white/60 transition-all shadow-lg shadow-black/20">
                  <Phone className="w-4 h-4" /> WhatsApp Now
                </a>
              </div>

              <p className="text-xs sm:text-sm text-white/75 mb-6">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse mr-2 align-middle" />
                Only <span className="font-bold text-amber-200">3 slots left</span> this week · Free prototype in 48 hours
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {data.hero.trustPoints.map((tp) => (
                  <span key={tp} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-medium text-white shadow-md shadow-black/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />{tp}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT — product mockup */}
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 rounded-[3rem] blur-3xl opacity-60 scale-105" style={{ background: `radial-gradient(circle, ${t.urgencyColor}, transparent 70%)` }} />

              {data.slug === "mobile-app-development" ? (
                /* Phone frame mockup */
                <div className="relative mx-auto max-w-[300px] lg:max-w-[340px]">
                  <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent blur-2xl" />
                  <div className="relative aspect-[9/19] rounded-[3rem] bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 hover:scale-[1.02] transition-transform duration-500">
                    {/* Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 rounded-b-2xl bg-zinc-900 z-20" />
                    {/* Screen */}
                    <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden bg-zinc-950">
                      <Image src={data.images.hero} alt="App mockup" fill className="object-cover" priority />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                    </div>
                  </div>
                  {/* Floating accent badges */}
                  <div className="absolute -top-3 -left-6 px-3 py-2 rounded-xl bg-white shadow-xl shadow-black/20 backdrop-blur" style={{ color: t.urgencyColor }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Live Demo</p>
                    <p className="text-sm font-extrabold">Phone-Ready</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl shadow-black/20">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.urgencyColor}15` }}>
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Avg Rating</p>
                        <p className="text-sm font-extrabold text-gray-900">4.6★ on stores</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Browser/dashboard mockup */
                <div className="relative">
                  <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-white/20 via-white/5 to-transparent blur-2xl" />
                  <div className="relative rounded-2xl bg-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 overflow-hidden hover:scale-[1.01] transition-transform duration-500">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-zinc-700/60 text-[11px] text-zinc-400 font-mono truncate">
                        https://app.yourbrand.in/dashboard
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-300 font-semibold">Live</span>
                      </div>
                    </div>
                    {/* Screen */}
                    <div className="relative aspect-[16/10]">
                      <Image src={data.images.hero} alt="Software dashboard mockup" fill className="object-cover" priority />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>
                  </div>
                  {/* Floating accent badges */}
                  <div className="absolute -top-4 -left-4 px-4 py-3 rounded-2xl bg-white shadow-xl shadow-black/20" style={{ color: t.urgencyColor }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider">Live Preview</p>
                    <p className="text-sm font-extrabold">48-Hour Prototype</p>
                  </div>
                  <div className="absolute -bottom-5 -right-5 px-4 py-3 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl shadow-black/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-base font-bold" style={{ backgroundColor: t.urgencyColor }}>
                        ✓
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Money-Back</p>
                        <p className="text-sm font-extrabold text-gray-900">Deadline Guarantee</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats — full-width glass panel below the 2-col block */}
          <div className="mb-10 pb-10 border-b border-white/15">
            <div className="grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/30">
              {data.stats.slice(0, 4).map((s, i) => (
                <div key={s.label} className={`text-center ${i < 3 ? "md:border-r border-white/10 md:pr-3" : ""}`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">{s.value}</div>
                  <div className="text-[11px] sm:text-xs text-white/70 mt-1.5 leading-tight font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image slider */}
          <div className="relative -mx-4 sm:mx-0">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10" style={{ background: `linear-gradient(to right, ${t.urgencyColor}ee, transparent)` }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10" style={{ background: `linear-gradient(to left, ${t.urgencyColor}ee, transparent)` }} />
            <div className="overflow-hidden">
              <div className="flex gap-4 animate-marquee">
                {[...data.images.portfolio, ...data.images.services, ...data.images.portfolio, ...data.images.services].map((img, i) => (
                  <div key={i} onClick={openConsult} className="flex-shrink-0 w-[260px] sm:w-[300px] relative rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer group shadow-2xl shadow-black/40 ring-1 ring-white/10">
                    <Image src={img} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm">
                        <Shield className="w-3 h-3 text-emerald-300" />
                        <span className="text-[10px] font-semibold text-white">NDA Protected</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md bg-white text-[10px] font-bold" style={{ color: t.urgencyColor }}>View →</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="relative py-16 lg:py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #f8fafc, #eff6ff, #f5f3ff, #f8fafc)" }}>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20" style={{ backgroundColor: t.urgencyColor }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center p-6 lg:p-7 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/[0.03] hover:shadow-xl hover:bg-white/80 transition-all">
                <div className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold ${a.text} leading-none tracking-tight`}>{s.value}</div>
                <div className="text-sm lg:text-[15px] text-gray-700 mt-3 font-medium leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PAIN STRIP ═══════ */}
      <section className="relative py-20 lg:py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc, #eff6ff)" }}>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] opacity-15" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { pain: "Other agencies assigned you juniors", solve: "Every RDMI project: 5+ year seniors only.", icon: "😤", color: "border-l-red-500" },
              { pain: "You waited days for a quote and revisions", solve: "Senior engineer calls you in 2 hours — same day scope.", icon: "⏳", color: "border-l-amber-500" },
              { pain: "You can\'t reach the person writing code", solve: "Direct WhatsApp with your developer. Replies in 30 min.", icon: "📵", color: "border-l-orange-500" },
            ].map((item) => (
              <div key={item.pain} className={`bg-white/70 backdrop-blur-xl rounded-2xl p-6 lg:p-7 border border-white/60 border-l-4 ${item.color} shadow-lg shadow-black/[0.04] hover:shadow-xl hover:bg-white/90 transition-all`}>
                <p className="text-lg font-semibold text-gray-900 mb-3 leading-snug">{item.icon} {item.pain}</p>
                <p className="text-[15px] text-emerald-700 font-medium leading-relaxed">✓ {item.solve}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #eff6ff, #f8fafc, #f5f3ff)" }}>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20" style={{ backgroundColor: t.urgencyColor }} />
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>What We Deliver</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Everything You Need, <span className={a.text}>Built AI-First</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {data.services.map((service, i) => (
              <div key={service.title} onClick={openConsult} className="group p-7 lg:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/[0.04] hover:shadow-2xl hover:bg-white/90 hover:-translate-y-1 transition-all cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white text-sm font-bold mb-5 shadow-sm`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className={`text-lg lg:text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:${a.text} transition-colors`}>{service.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-200">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CASE STUDIES ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f3ff, #f8fafc, #eff6ff)" }}>
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>Proven Results</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Outcomes We&apos;ve <span className={a.text}>Delivered</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
            {(data.caseStudies || [
              { tag: "SaaS", headline: "AI Dashboard — 3x user engagement", result: "4x faster decisions", tech: ["Next.js", "OpenAI", "AWS"], weeks: 10 },
              { tag: "E-Commerce", headline: "Marketplace — 4x conversion increase", result: "35% higher AOV", tech: ["React", "Node.js", "Razorpay"], weeks: 12 },
              { tag: "AI Agent", headline: "RAG System — 50K docs in 3 seconds", result: "Replaced 3 FTE roles", tech: ["LangChain", "Pinecone"], weeks: 8 },
            ]).map((cs) => (
              <div key={cs.headline} onClick={openConsult} className="group bg-white/70 backdrop-blur-xl rounded-2xl p-7 lg:p-8 border border-white/60 shadow-lg shadow-black/[0.04] hover:shadow-2xl hover:bg-white/90 hover:-translate-y-1 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${a.bg50} ${a.text}`}>{cs.tag}</span>
                  <span className="text-xs font-medium text-gray-500">{cs.weeks} weeks</span>
                </div>
                <h3 className={`text-lg lg:text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:${a.text} transition-colors`}>{cs.headline}</h3>
                <p className="text-2xl lg:text-3xl font-extrabold text-emerald-600 mb-5 tracking-tight">{cs.result}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.tech.map((t) => <span key={t} className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 border border-gray-200">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #eff6ff, #f8fafc)" }}>
        <div className="absolute top-0 right-1/3 w-[500px] h-[450px] rounded-full blur-[140px] opacity-15" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>How It Works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              From Idea to <span className={a.text}>Launch</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {data.process.map((step, i) => (
              <div key={step.step} className="relative p-7 lg:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/[0.04] hover:shadow-xl hover:bg-white/90 transition-all">
                {i < data.process.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-gray-300 text-2xl leading-none -translate-y-1/2">→</div>}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white text-sm font-bold mb-5 shadow-sm`}>{step.step}</div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 leading-snug">{step.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ USPS ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc, #f0f9ff, #f5f3ff)" }}>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15" style={{ backgroundColor: t.urgencyColor }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>Why RDMI</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Three Reasons <span className={a.text}>Clients Stay</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
            {[
              { icon: MessageCircle, title: "Talk to Developers Directly", text: data.uspHeadlines.direct, color: "text-blue-600", bg: "bg-blue-50", border: "border-l-blue-500", bullets: ["Direct WhatsApp with your developer", "Daily standups, not weekly reports", "Senior engineer calls within 2 hours"] },
              { icon: IndianRupee, title: "Senior Engineers, No Surprises", text: data.uspHeadlines.cost, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-l-emerald-500", bullets: ["5+ year senior engineers only", "Full source code ownership", "Month-to-month, walk away anytime"] },
              { icon: Bot, title: "AI-Native Delivery", text: data.uspHeadlines.ai, color: "text-purple-600", bg: "bg-purple-50", border: "border-l-purple-500", bullets: ["Cursor, Claude Code, Copilot daily", "3x faster than legacy agencies", "AI features built into every product"] },
            ].map((usp) => (
              <div key={usp.title} className={`bg-white/70 backdrop-blur-xl rounded-2xl p-7 lg:p-8 border border-white/60 border-l-4 ${usp.border} shadow-lg shadow-black/[0.04] hover:shadow-2xl hover:bg-white/90 hover:-translate-y-1 transition-all`}>
                <div className={`w-14 h-14 rounded-2xl ${usp.bg} flex items-center justify-center mb-5`}>
                  <usp.icon className={`w-7 h-7 ${usp.color}`} />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 leading-snug">{usp.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-5">{usp.text}</p>
                <ul className="space-y-2.5">
                  {usp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TECH STACK ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f3ff, #f8fafc)" }}>
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[140px] opacity-12" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>Technology</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Built With the <span className={a.text}>Latest Stack</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 lg:gap-6">
            {(isAIPage ? [
              { cat: "AI & LLM", items: ["OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "LangGraph", "CrewAI", "LlamaIndex", "LangSmith"] },
              { cat: "Backend & Data", items: ["Python", "Node.js", "FastAPI", "Pinecone", "pgvector", "MongoDB", "PostgreSQL", "Redis"] },
              { cat: "Cloud & Ops", items: ["AWS", "GCP", "Vercel", "Docker", "Kubernetes", "n8n", "Temporal", "GitHub Actions"] },
            ] : [
              { cat: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Flutter", "React Native", "Swift", "Kotlin"] },
              { cat: "Backend & Data", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "FastAPI", "Prisma"] },
              { cat: "Cloud & Payments", items: ["AWS", "Vercel", "Docker", "GitHub Actions", "Stripe", "Razorpay", "Cloudflare", "Sentry"] },
            ]).map((stack) => (
              <div key={stack.cat} className="p-7 lg:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/[0.04] hover:shadow-xl hover:bg-white/90 transition-all">
                <p className={`text-xs font-bold ${a.text} uppercase tracking-widest mb-5`}>{stack.cat}</p>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item) => (
                    <span key={item} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white text-gray-700 border border-gray-200 shadow-sm">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc, #eff6ff, #f5f3ff)" }}>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>Client Feedback</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              What Founders <span className={a.text}>Say</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {(data.testimonials || [
              { quote: "Delivered our prototype in 48 hours. The developer knew our industry better than our previous agency.", author: "AK", role: "Startup Founder, Bangalore", rating: 5 },
              { quote: "AI-first approach cut our timeline in half. We launched in 6 weeks instead of 12.", author: "SR", role: "CTO, FinTech, Mumbai", rating: 5 },
              { quote: "We talked to the actual developer, not a salesperson. That changed everything.", author: "PM", role: "Founder, Healthcare SaaS", rating: 5 },
              { quote: "First agency that kept their word on deadline. Fixed scope, no scope creep.", author: "RV", role: "COO, Logistics, Pune", rating: 5 },
              { quote: "The AI chatbot handles 80% of tickets. ROI positive in month 2.", author: "DS", role: "VP Ops, E-Commerce", rating: 5 },
              { quote: "After the first sprint demo, we extended the contract to 6 months.", author: "MT", role: "PM, SaaS, San Francisco", rating: 5 },
            ]).map((t, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl p-7 lg:p-8 border border-white/60 shadow-lg shadow-black/[0.04] hover:shadow-2xl hover:bg-white/90 hover:-translate-y-1 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[15px] lg:text-base text-gray-700 italic leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">{t.author}</div>
                  <p className="text-sm text-gray-600 font-medium">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ URGENCY STRIP ═══════ */}
      <section className="py-5 lg:py-6 text-white" style={{ backgroundColor: t.urgencyColor }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex w-2.5 h-2.5"><span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-75" /><span className="relative rounded-full w-2.5 h-2.5 bg-emerald-300" /></span>
            <p className="text-[15px] lg:text-base font-semibold">Taking on <strong>3 new projects</strong> this month — slots fill fast</p>
          </div>
          <button onClick={openConsult} className={`px-6 py-3 rounded-xl bg-white ${a.text} text-sm font-bold hover:bg-gray-50 transition-all hover:scale-105 cursor-pointer whitespace-nowrap shadow-md`}>
            Claim Your Slot <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
        </div>
      </section>

      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f5f3ff, #f8fafc)" }}>
        <div className="absolute top-1/4 left-0 w-[500px] h-[400px] rounded-full blur-[140px] opacity-12" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>Compare</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              RDMI vs <span className={a.text}>The Alternatives</span>
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/60 shadow-xl shadow-black/[0.06] bg-white/70 backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-white/50 border-b border-gray-200">
                  <th className="text-left py-4 px-5 lg:px-6 text-gray-600 font-semibold text-sm">Criteria</th>
                  <th className={`text-center py-4 px-5 lg:px-6 font-bold text-sm ${a.bg50} ${a.text}`}>RDMI</th>
                  <th className="text-center py-4 px-5 lg:px-6 text-gray-600 font-semibold text-sm">Large Agency</th>
                  <th className="text-center py-4 px-5 lg:px-6 text-gray-600 font-semibold text-sm">Freelancer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Developer Seniority", "5+ yr seniors only", "Mix of juniors", "Varies"],
                  ["Response Time", "< 2 hours", "2–5 days", "Unpredictable"],
                  ["Engagement", "Month-to-month", "12-month lock-in", "Project-based"],
                  ["Source Code", "100% yours", "Often restricted", "Usually yours"],
                  ["AI-Native Delivery", "Every project", "Traditional coding", "No"],
                  ["Guarantee", "Walk-away month 1", "Best-effort only", "None"],
                  ["Post-Launch Support", "30–60 days free", "Paid from day 1", "Limited"],
                ].map(([crit, rdmi, agency, free]) => (
                  <tr key={crit} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-5 lg:px-6 text-[15px] text-gray-800 font-semibold">{crit}</td>
                    <td className="py-4 px-5 lg:px-6 text-[15px] text-center font-bold text-emerald-600 bg-gray-50">{rdmi}</td>
                    <td className="py-4 px-5 lg:px-6 text-[15px] text-center text-amber-600 font-medium">{agency}</td>
                    <td className="py-4 px-5 lg:px-6 text-[15px] text-center text-red-500 font-medium">{free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f8fafc, #eff6ff)" }}>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[140px] opacity-12" style={{ backgroundColor: t.urgencyColor }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-16">
            <p className={`text-xs lg:text-sm font-bold uppercase tracking-widest mb-3 ${a.text}`}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Questions, <span className={a.text}>Answered</span>
            </h2>
          </div>
          <div className="space-y-3">
            {data.faq.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg shadow-black/[0.04] overflow-hidden hover:bg-white/90 hover:shadow-xl transition-all">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 lg:p-6 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base lg:text-lg font-semibold text-gray-900 pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 lg:px-6 lg:pb-6 text-[15px] lg:text-base text-gray-700 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-20 lg:py-28 text-white relative overflow-hidden" style={{ background: t.ctaGradient }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>{data.ctaSection.headline}</h2>
          <p className="text-white/90 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">{data.ctaSection.subtitle}</p>
          <button onClick={openConsult} className="inline-flex items-center gap-2.5 px-10 py-5 rounded-2xl bg-white font-bold text-lg hover:scale-[1.03] transition-all shadow-2xl shadow-black/30 cursor-pointer" style={{ color: t.urgencyColor }}>
            {data.ctaSection.buttonText} <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/80 pt-4">
            {["Free consultation", "NDA protected", "Senior engineers only", "Month-to-month, walk away anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-300" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CROSS SERVICES ═══════ */}
      <section className="py-16 lg:py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f8fafc, #eef2ff, #f5f3ff)" }}>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-100/40 rounded-full blur-[80px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">Explore More</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Full-Stack AI Development <span className={a.text}>Across Industries</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Custom Software Development", desc: "Enterprise apps, SaaS, ERP & CRM", href: "/kw/custom-software-development", icon: "💻", gradient: "from-indigo-500 to-purple-500" },
              { name: "Mobile App Development", desc: "iOS, Android, Flutter & React Native", href: "/kw/mobile-app-development", icon: "📱", gradient: "from-blue-500 to-cyan-500" },
              { name: "Web Development", desc: "Websites, web apps, Shopify & WordPress", href: "/kw/web-development-company", icon: "🌐", gradient: "from-violet-500 to-purple-500" },
              { name: "AI Software & Agents", desc: "Chatbots, RAG, workflow automation", href: "/kw/ai-software-development", icon: "🤖", gradient: "from-purple-500 to-pink-500" },
              { name: "E-Commerce Development", desc: "Shopify, marketplace & headless commerce", href: "/kw/ecommerce-development", icon: "🛒", gradient: "from-amber-500 to-orange-500" },
              { name: "AI Automation & Consulting", desc: "Business process automation & AI strategy", href: "/kw/ai-agent-workflow-consulting", icon: "⚡", gradient: "from-purple-600 to-indigo-600" },
              { name: "Healthcare AI", desc: "HIPAA-compliant patient & clinical AI", href: "/kw/healthcare-ai-development", icon: "🏥", gradient: "from-rose-500 to-pink-500" },
              { name: "Insurance AI", desc: "Claims, underwriting & fraud detection AI", href: "/kw/insurance-ai-development", icon: "🛡️", gradient: "from-sky-500 to-blue-500" },
              { name: "Travel & Hospitality AI", desc: "Booking engines, chatbots & revenue AI", href: "/kw/travel-hospitality-ai", icon: "✈️", gradient: "from-cyan-500 to-teal-500" },
            ].filter((s) => s.href !== `/kw/${data.slug}`).slice(0, 6).map((s) => (
              <a key={s.href} href={s.href} className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-xl shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-0.5">{s.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer onCTA={openConsult} />

      {/* ═══════ STICKY WHATSAPP BAR ═══════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        {/* Mobile: full-width button that opens sheet modal */}
        <div className="lg:hidden px-4 py-3">
          <button
            onClick={() => setStickySheetOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#1fba56] text-white font-bold text-base shadow-lg transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.593-.807-6.35-2.165l-.444-.341-3.082 1.033 1.033-3.082-.341-.444A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            WhatsApp Us
          </button>
        </div>

        {/* Desktop: inline horizontal form */}
        <form onSubmit={handleStickySubmit} className="hidden lg:flex max-w-6xl mx-auto px-6 py-3 items-center gap-3">
          <div className="flex flex-col flex-shrink-0 pr-4 border-r border-gray-200">
            <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.593-.807-6.35-2.165l-.444-.341-3.082 1.033 1.033-3.082-.341-.444A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp Us
            </span>
            <span className="text-xs text-gray-500 mt-0.5">Get instant response</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-2">
            <input type="text" placeholder="Name*" value={stickyForm.name} onChange={(e) => setStickyForm({ ...stickyForm, name: e.target.value })} disabled={stickyStatus === "loading"} className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white outline-none transition-colors" />
            <input type="tel" required placeholder="Mobile number*" value={stickyForm.phone} onChange={(e) => setStickyForm({ ...stickyForm, phone: e.target.value })} disabled={stickyStatus === "loading"} className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white outline-none transition-colors" />
            <input type="email" placeholder="Email*" value={stickyForm.email} onChange={(e) => setStickyForm({ ...stickyForm, email: e.target.value })} disabled={stickyStatus === "loading"} className="px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:bg-white outline-none transition-colors" />
          </div>
          <button type="submit" disabled={stickyStatus === "loading" || !stickyForm.phone.trim()} className="flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1fba56] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed">
            {stickyStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : stickyStatus === "success" ? <><CheckCircle2 className="w-4 h-4" /> Opening WhatsApp…</> : <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.593-.807-6.35-2.165l-.444-.341-3.082 1.033 1.033-3.082-.341-.444A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>WhatsApp Us</>}
          </button>
        </form>
      </div>
      <div className="h-20 lg:h-20" />

      {/* ═══════ MOBILE WHATSAPP SHEET MODAL ═══════ */}
      {stickySheetOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
          <div onClick={() => stickyStatus !== "loading" && setStickySheetOpen(false)} className="absolute inset-0 bg-black/40" />
          <form onSubmit={handleStickySubmit} className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto">
            {stickyStatus !== "loading" && (
              <button type="button" onClick={() => setStickySheetOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10" aria-label="Close">
                <span className="text-gray-700 text-2xl leading-none">×</span>
              </button>
            )}
            <div className="p-6 pt-8">
              <h3 className="text-xl font-bold text-gray-900 pr-8 leading-tight">Talk to a Senior {data.primaryKeyword.includes("AI") ? "AI " : ""}Developer</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">Please enter your details to get an instant response over WhatsApp.</p>

              <div className="mt-6 space-y-3">
                <input type="text" placeholder="Full Name*" value={stickyForm.name} onChange={(e) => setStickyForm({ ...stickyForm, name: e.target.value })} disabled={stickyStatus === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-base text-gray-900 placeholder-gray-400 focus:border-gray-400 outline-none transition-colors" />
                <input type="tel" required placeholder="Mobile Number*" value={stickyForm.phone} onChange={(e) => setStickyForm({ ...stickyForm, phone: e.target.value })} disabled={stickyStatus === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-base text-gray-900 placeholder-gray-400 focus:border-gray-400 outline-none transition-colors" />
                <input type="email" placeholder="Work Email*" value={stickyForm.email} onChange={(e) => setStickyForm({ ...stickyForm, email: e.target.value })} disabled={stickyStatus === "loading"} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-base text-gray-900 placeholder-gray-400 focus:border-gray-400 outline-none transition-colors" />
              </div>

              {stickyStatus === "error" && <p className="mt-3 text-xs text-red-600">Failed to submit. Please try again or WhatsApp +91 98185 65561 directly.</p>}
            </div>

            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
              <button type="submit" disabled={stickyStatus === "loading" || !stickyForm.phone.trim()} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#1fba56] text-white font-bold text-base shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                {stickyStatus === "loading" ? <Loader2 className="w-5 h-5 animate-spin" /> : <><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.593-.807-6.35-2.165l-.444-.341-3.082 1.033 1.033-3.082-.341-.444A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>WhatsApp Us</>}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ═══════ CONSULTATION MODAL ═══════ */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => formStatus !== "loading" && closeConsult()} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-black/20 border border-gray-200">
            <div className="h-1.5 rounded-t-2xl" style={{ background: t.heroGradient }} />
            {formStatus !== "loading" && (
              <button onClick={closeConsult} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10">
                <span className="text-gray-500 text-lg leading-none">×</span>
              </button>
            )}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exitIntentSubtitle ? "Don't leave empty-handed" : f.title}</h3>
                  <p className="text-xs text-gray-500">{exitIntentSubtitle ?? f.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mb-5 text-[11px] text-gray-500">
                {["Free consultation", "NDA protected", "48hr prototype", "Money-back guarantee"].map((t) => (
                  <span key={t} className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" />{t}</span>
                ))}
              </div>
              {formStatus === "error" && <div className="mb-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">Failed. Try again or WhatsApp +91 98185 65561.</div>}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">Full Name *</label><input type="text" required disabled={formStatus === "loading"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inp} placeholder="John Doe" /></div>
                  <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">WhatsApp / Phone</label><input type="tel" disabled={formStatus === "loading"} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inp} placeholder="+91 98185 65561" /></div>
                </div>
                <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">Work Email *</label><input type="email" required disabled={formStatus === "loading"} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inp} placeholder="john@company.com" /></div>
                <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">What do you need? *</label>
                  <select required disabled={formStatus === "loading"} value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} className={inp}>
                    <option value="">Select project type</option>
                    {f.projectTypes.map((pt) => <option key={pt} value={pt}>{pt}</option>)}
                  </select>
                </div>
                <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">Budget Range</label>
                  <select disabled={formStatus === "loading"} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={inp}>
                    <option value="">Select budget range</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">Biggest challenge? (optional)</label>
                  <textarea rows={2} disabled={formStatus === "loading"} value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} className={`${inp} resize-none`} placeholder={f.placeholder} />
                </div>
                <button type="submit" disabled={formStatus === "loading"} className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed" style={{ background: t.heroGradient }}>
                  {formStatus === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : (<>{f.buttonText} <ArrowRight className="w-4 h-4" /></>)}
                </button>
              </form>
              <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <p className="text-[11px] text-gray-500 italic">&ldquo;They delivered our prototype in 48 hours. The developer knew our industry better than our previous agency.&rdquo;</p>
                <p className="text-[10px] text-gray-400 mt-1">— Startup Founder, Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
