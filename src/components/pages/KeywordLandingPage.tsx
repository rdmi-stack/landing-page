"use client";

import { useState } from "react";
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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", projectType: "", industry: "", timeline: "", challenge: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isAIPage = data.slug.includes("ai-") || data.slug.includes("-dubai") || data.slug.includes("-usa") || data.slug.includes("healthcare") || data.slug.includes("insurance") || data.slug.includes("travel");
  const openConsult = () => setShowModal(true);

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
  const industries = ["Healthcare", "Finance / Insurance", "E-Commerce / Retail", "SaaS / Technology", "Travel / Hospitality", "Education", "Real Estate", "Logistics", "Legal", "Manufacturing", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const message = [`[formType:${f.formType}]`, `[${data.primaryKeyword} Consultation]`, formData.projectType ? `Project: ${formData.projectType}` : "", formData.industry ? `Industry: ${formData.industry}` : "", formData.timeline ? `Timeline: ${formData.timeline}` : "", formData.challenge || ""].filter(Boolean).join("\n");
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, message }) });
      if (!res.ok) throw new Error();
      const params = new URLSearchParams();
      if (formData.name) params.set("name", formData.name);
      params.set("product", data.primaryKeyword);
      setFormData({ name: "", email: "", phone: "", projectType: "", industry: "", timeline: "", challenge: "" });
      setShowModal(false);
      router.push(`/thank-you?${params.toString()}`);
    } catch { setFormStatus("error"); }
  };

  const inp = `w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 ${a.ring} outline-none transition-all`;

  return (
    <div className="bg-white text-gray-900">
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden text-white" style={{ background: t.heroGradient }}>
        {/* Background layers */}
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src={data.images.hero} alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)" }} />
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/20 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Live status row */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 backdrop-blur-sm text-xs font-semibold text-emerald-200">
              <span className="relative flex w-2 h-2"><span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" /><span className="relative rounded-full w-2 h-2 bg-emerald-400" /></span>
              47 developers building now
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-xs font-semibold text-white">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" /><Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span className="ml-1">4.9 · 200+ shipped</span>
            </span>
          </div>

          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold mb-6 border border-white/25 shadow-lg shadow-black/10">
            <span className="text-base">{t.icon}</span>
            <span className="tracking-wide">{data.hero.badge}</span>
          </div>

          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold leading-[1.05] tracking-[-0.025em] mb-6 max-w-5xl mx-auto" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.2)" }}>
            {data.hero.h1}
          </h1>

          <p className="text-lg sm:text-xl lg:text-[1.35rem] text-white/85 max-w-3xl mx-auto leading-relaxed mb-9 font-light">
            {data.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
            <button onClick={openConsult} className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl bg-white font-bold text-lg transition-all hover:scale-[1.03] shadow-2xl shadow-black/30 cursor-pointer overflow-hidden" style={{ color: t.urgencyColor }}>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative">{data.hero.cta1}</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="https://wa.me/919818565561" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold text-base hover:bg-white/15 hover:border-white/50 transition-all">
              <Phone className="w-4 h-4" /> WhatsApp Now
            </a>
          </div>

          {/* Urgency line */}
          <p className="text-sm text-white/70 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse mr-2" />
            Only <span className="font-bold text-amber-200">3 slots left</span> this week · Free prototype in 48 hours
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {data.hero.trustPoints.map((tp) => (
              <span key={tp} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs sm:text-sm font-medium text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />{tp}
              </span>
            ))}
          </div>

          {/* Inline stats */}
          <div className="grid grid-cols-3 max-w-2xl mx-auto gap-4 mb-10 pb-10 border-b border-white/10">
            {data.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">{s.value}</div>
                <div className="text-[11px] sm:text-xs text-white/70 mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
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
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center py-4">
                <div className="className={`text-3xl sm:text-4xl font-extrabold ${a.text}`}">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PAIN STRIP ═══════ */}
      <section className="py-14 lg:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { pain: "Other agencies assigned you juniors", solve: "Every RDMI project: 5+ year seniors only.", icon: "😤", color: "border-l-red-500" },
              { pain: "Your last quote had billing surprises", solve: "Fixed price in 2 hours. The quote IS the invoice.", icon: "💸", color: "border-l-amber-500" },
              { pain: "You can't reach the person writing code", solve: "Direct WhatsApp with your developer. <30 min.", icon: "📵", color: "border-l-orange-500" },
            ].map((item) => (
              <div key={item.pain} className={`bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${item.color} shadow-sm`}>
                <p className="text-base font-semibold text-gray-800 mb-2">{item.icon} {item.pain}</p>
                <p className="text-sm text-emerald-600 font-medium leading-relaxed">✓ {item.solve}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section id="services" className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            What We <span className={a.text}>Deliver</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.services.map((service, i) => (
              <div key={service.title} onClick={openConsult} className="group p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white text-xs font-bold mb-3`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CASE STUDIES ═══════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            Results We&apos;ve <span className={a.text}>Delivered</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {(data.caseStudies || [
              { tag: "SaaS", headline: "AI Dashboard — 3x user engagement", result: "₹2Cr+/mo processed", tech: ["Next.js", "OpenAI", "AWS"], weeks: 10 },
              { tag: "E-Commerce", headline: "Marketplace — 4x conversion increase", result: "35% higher AOV", tech: ["React", "Node.js", "Razorpay"], weeks: 12 },
              { tag: "AI Agent", headline: "RAG System — 50K docs in 3 seconds", result: "Replaced 3 FTE", tech: ["LangChain", "Pinecone"], weeks: 8 },
            ]).map((cs) => (
              <div key={cs.headline} onClick={openConsult} className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-700">{cs.tag}</span>
                  <span className="text-[10px] text-gray-400">{cs.weeks} weeks</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{cs.headline}</h3>
                <p className="text-xl font-extrabold text-emerald-600 mb-3">{cs.result}</p>
                <div className="flex flex-wrap gap-1">
                  {cs.tech.map((t) => <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ PROCESS ═══════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            From Idea to <span className={a.text}>Revenue</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.process.map((step, i) => (
              <div key={step.step} className="relative p-5 rounded-xl bg-gray-50 border border-gray-100">
                {i < data.process.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-gray-300 text-lg">→</div>}
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-white text-xs font-bold mb-3`}>{step.step}</div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ USPS ═══════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, title: "Talk to Developers", text: data.uspHeadlines.direct, color: "text-blue-600", bg: "bg-blue-50", border: "border-l-blue-500", bullets: ["Direct WhatsApp/Slack", "Daily standups", "Senior engineer calls in 2hrs"] },
              { icon: IndianRupee, title: "Save 50% Guaranteed", text: data.uspHeadlines.cost, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-l-emerald-500", bullets: ["Fixed price — no hourly", "The quote IS the invoice", "Money-back deadline guarantee"] },
              { icon: Bot, title: "AI = 3x Faster", text: data.uspHeadlines.ai, color: "text-purple-600", bg: "bg-purple-50", border: "border-l-purple-500", bullets: ["AI writes 40% of code", "12-week projects in 4 weeks", "Built-in AI features free"] },
            ].map((usp) => (
              <div key={usp.title} className={`bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${usp.border} shadow-sm`}>
                <div className={`w-10 h-10 rounded-xl ${usp.bg} flex items-center justify-center mb-3`}>
                  <usp.icon className={`w-5 h-5 ${usp.color}`} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{usp.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{usp.text}</p>
                <ul className="space-y-1.5">
                  {usp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TECH STACK ═══════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            Built With <span className={a.text}>Modern Stack</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {(isAIPage ? [
              { cat: "AI & LLM", items: ["OpenAI GPT-4o", "Claude", "Gemini", "LangChain", "CrewAI", "LlamaIndex"] },
              { cat: "Backend", items: ["Python", "Node.js", "FastAPI", "Pinecone", "pgvector", "MongoDB"] },
              { cat: "Cloud", items: ["AWS", "GCP", "Docker", "Railway", "Vercel", "n8n"] },
            ] : [
              { cat: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Flutter", "React Native"] },
              { cat: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"] },
              { cat: "Cloud", items: ["AWS", "Vercel", "Docker", "GitHub Actions", "Stripe", "Razorpay"] },
            ]).map((stack) => (
              <div key={stack.cat} className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <p className={`text-xs font-bold ${a.text} uppercase tracking-wider mb-3`}>{stack.cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 text-xs rounded-lg bg-white text-gray-600 border border-gray-200 shadow-sm">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            What Clients <span className={a.text}>Say</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data.testimonials || [
              { quote: "Delivered our prototype in 48 hours. The developer knew our industry better than our previous agency.", author: "AK", role: "Startup Founder, Bangalore", rating: 5 },
              { quote: "AI-first approach cut our timeline in half. We launched in 6 weeks instead of 12.", author: "SR", role: "CTO, FinTech, Mumbai", rating: 5 },
              { quote: "We talked to the actual developer, not a salesperson. That changed everything.", author: "PM", role: "Founder, Healthcare SaaS", rating: 5 },
              { quote: "Fixed price, no surprises. First agency that kept their word on deadline.", author: "RV", role: "COO, Logistics, Pune", rating: 5 },
              { quote: "The AI chatbot handles 80% of tickets. ROI positive in month 2.", author: "DS", role: "VP Ops, E-Commerce", rating: 5 },
              { quote: "After the first sprint demo, we extended the contract to 6 months.", author: "MT", role: "PM, SaaS, San Francisco", rating: 5 },
            ]).map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-base text-gray-600 italic leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">{t.author}</div>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ URGENCY STRIP ═══════ */}
      <section className="py-4 text-white" style={{ backgroundColor: t.urgencyColor }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <p className="text-base font-semibold">Taking on <strong>3 new projects</strong> this month — slots fill fast</p>
          </div>
          <button onClick={openConsult} className={`px-5 py-2 rounded-lg bg-white ${a.text} text-sm font-bold hover:bg-gray-50 transition-all hover:scale-105 cursor-pointer whitespace-nowrap shadow-sm`}>
            Claim Your Slot <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
          </button>
        </div>
      </section>

      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            Why RDMI <span className={a.text}>vs Others</span>
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium text-xs">Criteria</th>
                  <th className={`text-center py-3 px-4 font-bold text-xs ${a.bg50} ${a.text}`}>RDMI AI</th>
                  <th className="text-center py-3 px-4 text-gray-500 font-medium text-xs">Large Agency</th>
                  <th className="text-center py-3 px-4 text-gray-500 font-medium text-xs">Freelancer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Developer Seniority", "5+ yr seniors only", "Mix of juniors", "Varies"],
                  ["Response Time", "<2 hours", "2-5 days", "Unpredictable"],
                  ["Pricing", "Fixed price", "Hourly billing", "Hourly"],
                  ["Source Code", "100% yours", "Often restricted", "Usually yours"],
                  ["AI-Powered", "Every project", "Traditional", "No"],
                  ["Guarantee", "Money-back", "Best effort", "None"],
                  ["Post-Launch", "30-60 days free", "Paid from Day 1", "Limited"],
                ].map(([crit, rdmi, agency, free]) => (
                  <tr key={crit} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-700 font-medium">{crit}</td>
                    <td className="py-3 px-4 text-sm text-center font-semibold text-emerald-600 bg-gray-50">{rdmi}</td>
                    <td className="py-3 px-4 text-sm text-center text-amber-600">{agency}</td>
                    <td className="py-3 px-4 text-sm text-center text-red-500">{free}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900">
            Questions <span className={a.text}>Answered</span>
          </h2>
          <div className="space-y-2">
            {data.faq.map((faq, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors">
                  <span className="text-base font-semibold text-gray-800 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-base text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-16 text-white" style={{ background: t.ctaGradient }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{data.ctaSection.headline}</h2>
          <p className="text-indigo-100 text-lg max-w-xl mx-auto">{data.ctaSection.subtitle}</p>
          <button onClick={openConsult} className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-white text-indigo-700 font-bold text-lg hover:bg-indigo-50 transition-all hover:scale-105 shadow-lg shadow-black/10 cursor-pointer">
            {data.ctaSection.buttonText} <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-indigo-200">
            {["Free consultation", "NDA protected", "Money-back guarantee", "You own 100% of code"].map((t) => (
              <span key={t} className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-300" />{t}</span>
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

      {/* ═══════ STICKY BOTTOM BAR ═══════ */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 flex items-center gap-2 sm:gap-3">
        {/* WhatsApp — pill with icon */}
        <a
          href="https://wa.me/919818565561"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-full bg-[#25D366] text-white text-sm font-bold shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.386 0-4.593-.807-6.35-2.165l-.444-.341-3.082 1.033 1.033-3.082-.341-.444A9.962 9.962 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* CTA — animated gradient pill */}
        <button
          onClick={openConsult}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-full text-white text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer relative overflow-hidden"
          style={{ background: t.heroGradient }}
        >
          {/* Shimmer overlay */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" style={{ backgroundSize: "200% 100%" }} />
          <span className="relative flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
            Get Free Consultation
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
      <div className="h-20" />

      {/* ═══════ CONSULTATION MODAL ═══════ */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div onClick={() => formStatus !== "loading" && setShowModal(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl shadow-black/20 border border-gray-200">
            <div className="h-1.5 rounded-t-2xl" style={{ background: t.heroGradient }} />
            {formStatus !== "loading" && (
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10">
                <span className="text-gray-500 text-lg leading-none">×</span>
              </button>
            )}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                  <p className="text-xs text-gray-500">{f.subtitle}</p>
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
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">Industry</label>
                    <select disabled={formStatus === "loading"} value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className={inp}>
                      <option value="">Select industry</option>
                      {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div><label className="block text-[11px] text-gray-500 mb-1 font-medium">Timeline</label>
                    <select disabled={formStatus === "loading"} value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className={inp}>
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="This month">This month</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="Exploring">Just exploring</option>
                    </select>
                  </div>
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
