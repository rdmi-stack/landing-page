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
} from "lucide-react";
import AIQuoteModal from "@/components/AIQuoteModal";
import Footer from "@/components/Footer";
import type { KeywordGroup } from "@/data/keyword-groups";

export default function KeywordLandingPage({ data }: { data: KeywordGroup }) {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", projectType: "", industry: "", timeline: "", challenge: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isAIPage = data.slug.includes("ai-") || data.slug.includes("-dubai") || data.slug.includes("-usa");
  const handleCTA = () => {
    // Scroll to the inline consultation form in hero
    const form = document.getElementById("consultation-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      // Focus the first input after scroll
      setTimeout(() => {
        const firstInput = form.querySelector("input") as HTMLInputElement;
        if (firstInput) firstInput.focus();
      }, 500);
    }
  };

  const handleInlineForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const message = [
        `[${data.primaryKeyword} Consultation]`,
        formData.projectType ? `Project: ${formData.projectType}` : "",
        formData.industry ? `Industry: ${formData.industry}` : "",
        formData.timeline ? `Timeline: ${formData.timeline}` : "",
        formData.challenge ? `Challenge: ${formData.challenge}` : "",
      ].filter(Boolean).join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setFormStatus("success");
      const params = new URLSearchParams();
      if (formData.name) params.set("name", formData.name);
      params.set("product", data.primaryKeyword);
      router.push(`/thank-you?${params.toString()}`);
    } catch {
      setFormStatus("error");
    }
  };

  const projectTypes = isAIPage
    ? ["AI Chatbot / Voice Agent", "AI Agent / Workflow Automation", "RAG / Knowledge Base", "AI Integration into Existing Software", "AI Consulting / Strategy", "Other / Not Sure"]
    : ["Custom Website", "Web Application / SaaS", "E-Commerce Store", "Mobile App", "Landing Page / Microsite", "Website Redesign", "Other / Not Sure"];

  const industries = ["Healthcare", "Finance / Insurance", "E-Commerce / Retail", "SaaS / Technology", "Travel / Hospitality", "Education", "Real Estate", "Logistics", "Legal", "Manufacturing", "Other"];

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  return (
    <>
      {/* ─── HERO: Gradient BG + 2-Column Layout ─── */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0">
          <Image src={data.images.hero} alt={data.primaryKeyword} fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0f0a1a] to-[#0a0a0a]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            {/* Left: Copy (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {data.hero.badge}
              </div>

              {/* H1 with gradient text */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">{data.hero.h1}</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {data.hero.subtitle}
              </p>

              {/* Trust points with gradient icons */}
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                {data.hero.trustPoints.map((item) => (
                  <span key={item} className="flex items-center gap-2 text-zinc-300">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>

              {/* Social proof bar */}
              <div className="flex items-center gap-4 pt-3 pb-1">
                <div className="flex -space-x-2">
                  {[
                    "from-indigo-500 to-blue-600",
                    "from-purple-500 to-pink-600",
                    "from-emerald-500 to-green-600",
                    "from-amber-500 to-orange-600",
                    "from-rose-500 to-red-600",
                  ].map((g, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold shadow-lg`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500">200+ projects · 4.9/5 rating · Talk to developers directly</p>
                </div>
              </div>

              {/* Urgency bar */}
              <div className="flex items-center gap-2 pt-3">
                <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 opacity-60" />
                <span className="text-[11px] text-zinc-500 whitespace-nowrap">Avg. response: 47 min</span>
              </div>
            </div>

            {/* Right: Dedicated Consultation Form (2 cols) */}
            <div className="lg:col-span-2" id="consultation-form">
              <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#111]/95 to-[#0d0d0d]/95 backdrop-blur-xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
                {/* Gradient top border */}
                <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold">Talk to a Developer</h3>
                      <p className="text-[11px] text-zinc-500">Not a sales rep — a senior engineer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Free consultation</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> NDA protected</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> 2hr response</span>
                  </div>
                </div>

                {formStatus === "error" && (
                  <div className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    Failed to send. Try again or WhatsApp us.
                  </div>
                )}

                <form onSubmit={handleInlineForm} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <input type="text" required disabled={formStatus === "loading"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={field} placeholder="Full Name *" />
                    <input type="tel" disabled={formStatus === "loading"} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={field} placeholder="WhatsApp / Phone" />
                  </div>
                  <input type="email" required disabled={formStatus === "loading"} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={field} placeholder="Work Email *" />

                  <select required disabled={formStatus === "loading"} value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} className={field}>
                    <option value="" className="bg-zinc-900">What do you need? *</option>
                    {projectTypes.map((t) => <option key={t} value={t} className="bg-zinc-900">{t}</option>)}
                  </select>

                  <div className="grid grid-cols-2 gap-2.5">
                    <select disabled={formStatus === "loading"} value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className={field}>
                      <option value="" className="bg-zinc-900">Your Industry</option>
                      {industries.map((ind) => <option key={ind} value={ind} className="bg-zinc-900">{ind}</option>)}
                    </select>
                    <select disabled={formStatus === "loading"} value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className={field}>
                      <option value="" className="bg-zinc-900">Timeline</option>
                      <option value="ASAP" className="bg-zinc-900">ASAP</option>
                      <option value="This month" className="bg-zinc-900">This month</option>
                      <option value="1-3 months" className="bg-zinc-900">1-3 months</option>
                      <option value="Exploring" className="bg-zinc-900">Just exploring</option>
                    </select>
                  </div>

                  <textarea rows={2} disabled={formStatus === "loading"} value={formData.challenge} onChange={(e) => setFormData({ ...formData, challenge: e.target.value })} className={`${field} resize-none`} placeholder="What's your biggest challenge right now? (optional)" />

                  <button type="submit" disabled={formStatus === "loading"} className="w-full flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed animate-gradient bg-[length:200%_200%]">
                    {formStatus === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : (<>{data.hero.cta1} <ArrowRight className="w-4 h-4" /></>)}
                  </button>
                </form>

                {/* Micro-testimonial inside form */}
                <div className="mt-4 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                  <p className="text-[11px] text-zinc-400 italic leading-relaxed">&ldquo;They delivered our prototype in 48 hours. The developer who called us knew more about our industry than our previous agency did in 3 months.&rdquo;</p>
                  <p className="text-[10px] text-zinc-600 mt-1">— Startup Founder, Bangalore</p>
                </div>

                <p className="text-[10px] text-zinc-600 text-center mt-3">
                  Free prototype · No upfront payment · Money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 relative bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PAIN/PROBLEM STRIP ─── */}
      <section className="py-12 lg:py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { pain: "Other agencies assigned you juniors", solve: "Every RDMI project: 5+ year seniors only. No exceptions.", painColor: "border-red-500/20 bg-red-500/[0.03]", solveColor: "text-emerald-400" },
              { pain: "Your last quote had hourly billing surprises", solve: "Fixed price in 2 hours. The quote IS the invoice. Money-back guarantee.", painColor: "border-amber-500/20 bg-amber-500/[0.03]", solveColor: "text-emerald-400" },
              { pain: "You can't reach the person writing your code", solve: "Direct WhatsApp/Slack with your developer. <30 min avg response.", painColor: "border-orange-500/20 bg-orange-500/[0.03]", solveColor: "text-emerald-400" },
            ].map((item) => (
              <div key={item.pain} className={`p-4 rounded-xl border ${item.painColor}`}>
                <p className="text-sm font-medium text-zinc-300 mb-2">{item.pain}</p>
                <div className="h-px bg-gradient-to-r from-zinc-700 to-transparent my-2" />
                <p className={`text-xs ${item.solveColor} font-medium leading-relaxed`}>{item.solve}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES (Clean grid, no images — fast) ─── */}
      <section id="services" className="py-16 lg:py-24 relative bg-[#111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              What We <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Deliver</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.services.map((service, i) => (
              <div key={service.title} onClick={handleCTA} className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-sm font-bold text-indigo-400">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-sm font-semibold group-hover:text-indigo-300 transition-colors">{service.title}</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{service.description}</p>
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-zinc-600">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CASE STUDIES (3 cards) ─── */}
      <section className="py-14 lg:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Results We&apos;ve <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Delivered</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {(data.caseStudies || [
              { tag: "SaaS", headline: "AI-Powered Dashboard — 3x user engagement", result: "₹2Cr+/month processed", tech: ["Next.js", "OpenAI", "AWS"], weeks: 10 },
              { tag: "E-Commerce", headline: "Marketplace — 4x conversion rate increase", result: "35% higher AOV", tech: ["React", "Node.js", "Razorpay"], weeks: 12 },
              { tag: "AI Agent", headline: "RAG System — 50K docs searchable in 3 seconds", result: "Replaced 3 FTE in research", tech: ["LangChain", "Pinecone", "Python"], weeks: 8 },
            ]).map((cs) => (
              <div key={cs.headline} onClick={handleCTA} className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">{cs.tag}</span>
                  <span className="text-[10px] text-zinc-600">{cs.weeks} weeks</span>
                </div>
                <h3 className="text-sm font-semibold mb-2 group-hover:text-indigo-300 transition-colors">{cs.headline}</h3>
                <p className="text-lg font-bold text-emerald-400 mb-3">{cs.result}</p>
                <div className="flex flex-wrap gap-1">
                  {cs.tech.map((t) => <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-zinc-600">{t}</span>)}
                </div>
                <div className="flex items-center gap-1 mt-3 text-[10px] text-zinc-600">
                  <CheckCircle2 className="w-3 h-3 text-indigo-400" /> NDA Protected
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS + USPs ─── */}
      <section className="py-16 lg:py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Process - horizontal steps */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              From Idea to <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Revenue</span> — 4 Steps
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {data.process.map((step, i) => (
                <div key={step.step} className="relative p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  {i < data.process.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-indigo-500 to-transparent z-10" />}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold mb-3">{step.step}</div>
                  <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* USPs - 3 columns with bullets */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, title: "Talk to Developers", text: data.uspHeadlines.direct, color: "text-blue-400", border: "border-l-2 border-blue-500", bullets: ["Direct WhatsApp/Slack with your dev", "Daily standups, not weekly status emails", "Senior engineer calls you in 2 hours"] },
              { icon: IndianRupee, title: "Save 50% Guaranteed", text: data.uspHeadlines.cost, color: "text-emerald-400", border: "border-l-2 border-emerald-500", bullets: ["Fixed price — the quote IS the invoice", "No hourly billing surprises", "Money-back if we miss your deadline"] },
              { icon: Bot, title: "AI = 3x Faster", text: data.uspHeadlines.ai, color: "text-purple-400", border: "border-l-2 border-purple-500", bullets: ["AI writes 40% of code, humans review 100%", "12-week projects done in 4 weeks", "Built-in AI features at no extra cost"] },
            ].map((usp) => (
              <div key={usp.title} className={`p-5 rounded-xl bg-white/[0.02] ${usp.border}`}>
                <usp.icon className={`w-5 h-5 ${usp.color} mb-2`} />
                <h3 className="text-sm font-bold mb-1">{usp.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{usp.text}</p>
                <ul className="space-y-1.5">
                  {usp.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TECH STACK ─── */}
      <section className="py-14 lg:py-20 relative bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Built With <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Modern Stack</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {(isAIPage ? [
              { cat: "AI & LLM", items: ["OpenAI GPT-4o", "Claude", "Gemini", "LangChain", "CrewAI", "LlamaIndex"] },
              { cat: "Backend & Data", items: ["Python", "Node.js", "FastAPI", "Pinecone", "pgvector", "MongoDB"] },
              { cat: "Cloud & DevOps", items: ["AWS", "GCP", "Docker", "Railway", "Vercel", "n8n"] },
            ] : [
              { cat: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter", "React Native"] },
              { cat: "Backend & Database", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis", "GraphQL"] },
              { cat: "Cloud & Tools", items: ["AWS", "Vercel", "Docker", "GitHub Actions", "Stripe", "Razorpay"] },
            ]).map((stack) => (
              <div key={stack.cat} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">{stack.cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {stack.items.map((item) => (
                    <span key={item} className="px-2 py-1 text-[11px] rounded-md bg-white/5 text-zinc-400 border border-white/5">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS (6 cards) ─── */}
      <section className="py-14 lg:py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            What Clients <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Say</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data.testimonials || [
              { quote: "Delivered our prototype in 48 hours. The developer knew our industry better than our previous agency did in 3 months.", author: "A.K.", role: "Startup Founder, Bangalore", rating: 5 },
              { quote: "AI-first approach cut our timeline in half. We launched in 6 weeks instead of the 12 our previous vendor quoted.", author: "S.R.", role: "CTO, FinTech Company, Mumbai", rating: 5 },
              { quote: "We talked to the actual developer, not a salesperson. That changed everything about the project outcome.", author: "P.M.", role: "Founder, Healthcare SaaS, Delhi", rating: 5 },
              { quote: "Fixed price, no surprises. They delivered exactly what they promised, on time. First agency that kept their word.", author: "R.V.", role: "COO, Logistics Company, Pune", rating: 5 },
              { quote: "The AI chatbot they built handles 80% of our support tickets now. ROI was positive in month 2. Unbelievable.", author: "D.S.", role: "VP Ops, E-Commerce, Hyderabad", rating: 5 },
              { quote: "We were skeptical about an India-based team. After the first sprint demo, we extended the contract to 6 months.", author: "M.T.", role: "Product Manager, SaaS, San Francisco", rating: 5 },
            ]).map((t, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: t.rating }).map((_, s) => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xs text-zinc-400 italic leading-relaxed mb-3">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[9px] font-bold">{t.author}</div>
                  <p className="text-[10px] text-zinc-600">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── URGENCY STRIP ─── */}
      <section className="py-4 relative bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border-y border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-sm text-zinc-300 font-medium">Taking on <strong className="text-white">3 new projects</strong> this month — slots fill fast</p>
          </div>
          <button onClick={handleCTA} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-semibold transition-all hover:scale-105 cursor-pointer whitespace-nowrap">
            Claim Your Slot <ArrowRight className="w-3 h-3 inline ml-1" />
          </button>
        </div>
      </section>

      {/* ─── COMPARISON TABLE (RDMI vs Agency vs Freelancer) ─── */}
      <section className="py-14 lg:py-20 relative bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Why RDMI <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">vs Others</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-zinc-500 font-medium text-xs">Criteria</th>
                  <th className="text-center py-3 px-4 text-indigo-400 font-bold text-xs bg-indigo-500/5 border-x border-indigo-500/10 rounded-t-lg">RDMI AI</th>
                  <th className="text-center py-3 px-4 text-zinc-500 font-medium text-xs">Large Agency</th>
                  <th className="text-center py-3 px-4 text-zinc-500 font-medium text-xs">Freelancer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Developer Seniority", "5+ yr seniors only", "Mix of juniors", "Varies widely"],
                  ["Response Time", "<2 hours", "2-5 days", "Unpredictable"],
                  ["Pricing Model", "Fixed price", "Hourly billing", "Hourly/milestone"],
                  ["Source Code", "100% yours Day 1", "Often restricted", "Usually yours"],
                  ["NDA", "Before first call", "After contract", "Sometimes"],
                  ["AI-Powered Delivery", "Built into every project", "Traditional only", "No"],
                  ["Deadline Guarantee", "Money-back", "Best effort", "No guarantee"],
                  ["Post-Launch Support", "30-60 days free", "Paid from Day 1", "Limited"],
                ].map(([criteria, rdmi, agency, freelancer]) => (
                  <tr key={criteria}>
                    <td className="py-3 px-4 text-xs text-zinc-400">{criteria}</td>
                    <td className="py-3 px-4 text-xs text-center font-medium text-emerald-400 bg-indigo-500/5 border-x border-indigo-500/10">{rdmi}</td>
                    <td className="py-3 px-4 text-xs text-center text-amber-400/70">{agency}</td>
                    <td className="py-3 px-4 text-xs text-center text-red-400/60">{freelancer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 lg:py-20 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
            Questions <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Answered</span>
          </h2>

          <div className="space-y-3">
            {data.faq.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA (Gradient, no image) ─── */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-[#0a0a0a] to-purple-950/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {data.ctaSection.headline}
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto">
            {data.ctaSection.subtitle}
          </p>

          <button
            onClick={handleCTA}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer animate-gradient bg-[length:200%_200%]"
          >
            {data.ctaSection.buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            {["Free consultation", "NDA protected", "Money-back guarantee", "You own 100% of code"].map((item) => (
              <span key={item} className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex justify-center gap-5 text-sm text-zinc-500 pt-4">
            <a href="mailto:info@rdmi.in" className="hover:text-white transition-colors">info@rdmi.in</a>
            <a href="https://wa.me/919818565561" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">+91 98185 65561</a>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Quote Modal — only rendered on AI/geo pages */}
      {isAIPage && (
        <AIQuoteModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          productName={data.primaryKeyword}
          region={data.slug.includes("-dubai") ? "dubai" : data.slug.includes("-usa") ? "usa" : "india"}
        />
      )}
    </>
  );
}
