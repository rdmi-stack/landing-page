"use client";

import { useState } from "react";
import SEOScoreCalculator from "@/components/seo-tools/SEOScoreCalculator";
import ROICalculator from "@/components/seo-tools/ROICalculator";
import QuizFunnel from "@/components/QuizFunnel";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Search,
  FileText,
  Link2,
  MapPin,
  Globe,
  ShoppingCart,
  Code2,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Bot,
  Star,
  Clock,
  MessageCircle,
  Shield,
  Eye,
  Settings,
  Gauge,
  Target,
  Layers,
  Bug,
  Smartphone,
  Database,
  Sparkles,
  Video,
  Network,
  Brain,
  Mic,
  Zap,
} from "lucide-react";

// ─── SEO SERVICES ─────────────────────────────────────

const serviceCategories = ["All", "Foundation", "Growth", "Next-Gen AI"] as const;

const seoServices = [
  // ─── FOUNDATION SEO ──────────────────────────────
  { icon: Code2, title: "Technical SEO", category: "Foundation", description: "Site architecture, crawlability, indexation, Core Web Vitals, schema markup, XML sitemaps, robots.txt, canonical tags & rendering optimization.", deliverables: ["Full technical audit", "Core Web Vitals fix", "Schema markup", "Crawl optimization", "Site speed boost"], gradient: "from-blue-500 to-indigo-600", impact: "Foundation for all rankings" },
  { icon: FileText, title: "On-Page SEO", category: "Foundation", description: "Title tags, meta descriptions, header hierarchy, keyword optimization, internal linking, content structure & NLP-optimized copy for every page.", deliverables: ["Keyword mapping", "Title/meta optimization", "Header structure", "Internal linking", "Content gaps fix"], gradient: "from-emerald-500 to-green-600", impact: "Avg 40% ranking improvement" },
  { icon: Link2, title: "Link Building & Off-Page", category: "Foundation", description: "White-hat link acquisition through guest posting, digital PR, broken link building, resource pages, HARO & niche-relevant outreach.", deliverables: ["Guest post outreach", "Digital PR", "Broken link building", "HARO responses", "Competitor backlink gap"], gradient: "from-purple-500 to-violet-600", impact: "20-50 quality links/month" },
  { icon: MapPin, title: "Local SEO", category: "Foundation", description: "Google Business Profile optimization, local citations, review management, map pack ranking, geo-targeted landing pages & local schema.", deliverables: ["GBP optimization", "Citation building", "Review strategy", "Local landing pages", "Map pack ranking"], gradient: "from-amber-500 to-orange-600", impact: "#1 map pack for 80% clients" },
  { icon: Globe, title: "Content Strategy & SEO", category: "Foundation", description: "AI-powered keyword research, topic cluster planning, content calendar, blog writing, pillar pages & content refresh for topical authority.", deliverables: ["Keyword research", "Topic clusters", "Content calendar", "Blog writing (8-12/mo)", "Content refresh"], gradient: "from-cyan-500 to-teal-600", impact: "3x organic traffic avg" },

  // ─── GROWTH SEO ──────────────────────────────────
  { icon: ShoppingCart, title: "E-Commerce SEO", category: "Growth", description: "Product page optimization, category architecture, faceted navigation, product schema, image SEO & marketplace listing optimization.", deliverables: ["Product page SEO", "Category optimization", "Product schema", "Image optimization", "Internal search SEO"], gradient: "from-rose-500 to-pink-600", impact: "2x organic revenue avg" },
  { icon: Layers, title: "SaaS & B2B SEO", category: "Growth", description: "Bottom-of-funnel keyword targeting, comparison pages, feature pages, integration pages & programmatic SEO for scalable content.", deliverables: ["BoFu keyword strategy", "Comparison pages", "Feature pages", "Programmatic SEO", "Link magnets"], gradient: "from-indigo-500 to-blue-600", impact: "5x demo requests avg" },
  { icon: Globe, title: "International SEO", category: "Growth", description: "Hreflang implementation, country-specific targeting, multilingual content strategy, international link building & geo-specific keyword research.", deliverables: ["Hreflang setup", "Country targeting", "Multilingual content", "International links", "Geo-keyword research"], gradient: "from-sky-500 to-blue-600", impact: "Enter 5+ new markets" },
  { icon: Database, title: "Programmatic SEO", category: "Growth", description: "AI-generated landing pages at scale for long-tail keywords. 1000s of pages with unique, valuable content targeting every search variation.", deliverables: ["Template design", "Data source integration", "AI content generation", "Dynamic schema", "Automated internal linking"], gradient: "from-fuchsia-500 to-purple-600", impact: "10x indexed pages in 3mo" },

  // ─── NEXT-GEN AI SEO ─────────────────────────────
  { icon: Sparkles, title: "GEO (Generative Engine Optimization)", category: "Next-Gen AI", description: "Optimize for ChatGPT, Perplexity, Google AI Overviews & Gemini. Get your brand cited in AI-generated answers — the new SEO battleground.", deliverables: ["AI citation monitoring", "LLM visibility strategy", "Content formatting for AI", "Structured data for AI", "Competitor AI visibility audit"], gradient: "from-violet-500 to-purple-600", impact: "340+ AI citations/month" },
  { icon: Bot, title: "AI Overview & Zero-Click SEO", category: "Next-Gen AI", description: "Win Google's AI Overviews, featured snippets, PAA boxes & knowledge panels. Maximize visibility even when users don't click through.", deliverables: ["AI Overview targeting", "Featured snippet optimization", "PAA strategy", "Knowledge panel building", "Zero-click content"], gradient: "from-indigo-500 to-violet-600", impact: "28+ AI Overview wins" },
  { icon: Mic, title: "Answer Engine Optimization (AEO)", category: "Next-Gen AI", description: "Structure content for voice search, AI assistants (Siri, Alexa, Google Assistant) & conversational queries. The future of search is questions.", deliverables: ["FAQ schema optimization", "Conversational keywords", "Voice search content", "Q&A strategy", "Speakable schema"], gradient: "from-teal-500 to-emerald-600", impact: "3x voice search visibility" },
  { icon: Network, title: "Entity & Topical Authority", category: "Next-Gen AI", description: "Build your brand as a recognized entity in Google's Knowledge Graph. Establish topical authority through comprehensive, interconnected content hubs.", deliverables: ["Entity mapping", "Knowledge graph optimization", "Topical clusters", "E-E-A-T signals", "Author authority building"], gradient: "from-orange-500 to-amber-600", impact: "Become the topical authority" },
  { icon: Video, title: "Social & Video Search SEO", category: "Next-Gen AI", description: "Optimize for TikTok search, YouTube SEO, Instagram search & Reddit rankings. Gen-Z uses social platforms as search engines — meet them there.", deliverables: ["YouTube SEO", "TikTok optimization", "Reddit content strategy", "Video schema", "Short-form content calendar"], gradient: "from-red-500 to-rose-600", impact: "5M+ video views for clients" },
];

// ─── SEO PROCESS ──────────────────────────────────────

const seoProcess = [
  { step: "01", title: "Deep SEO Audit", desc: "300+ point technical, on-page & off-page audit with competitor analysis. Delivered as actionable report in 48 hours.", icon: Bug },
  { step: "02", title: "Strategy & Roadmap", desc: "Custom 6-month SEO roadmap with keyword targets, content plan, link building goals & monthly KPIs.", icon: Target },
  { step: "03", title: "Execute & Build", desc: "Technical fixes, content creation, link building & on-page optimization — all executed by our in-house team.", icon: Settings },
  { step: "04", title: "Track & Scale", desc: "Weekly rank tracking, monthly traffic reports, quarterly strategy reviews & continuous optimization.", icon: TrendingUp },
];

// ─── RESULTS ──────────────────────────────────────────

const seoResults = [
  { before: "2,400", after: "28,000", label: "Monthly Organic Visitors", industry: "SaaS Platform" },
  { before: "0", after: "47", label: "First Page Rankings", industry: "E-Commerce Store" },
  { before: "12", after: "89", label: "Domain Authority", industry: "FinTech Startup" },
  { before: "₹0", after: "₹18L/mo", label: "Organic Revenue", industry: "D2C Brand" },
  { before: "0", after: "340/mo", label: "AI Citations (ChatGPT/Perplexity)", industry: "SaaS Company" },
  { before: "0", after: "28", label: "Google AI Overview Wins", industry: "EdTech Platform" },
];

// ─── WHAT YOU GET ─────────────────────────────────────

const deliverables = [
  { icon: Bug, text: "300+ point SEO audit" },
  { icon: Search, text: "AI-powered keyword research" },
  { icon: FileText, text: "8-12 SEO blog posts/month" },
  { icon: Link2, text: "20-50 quality backlinks/month" },
  { icon: Code2, text: "Technical fixes by our dev team" },
  { icon: Gauge, text: "Core Web Vitals optimization" },
  { icon: Database, text: "Schema markup implementation" },
  { icon: Smartphone, text: "Mobile SEO optimization" },
  { icon: MapPin, text: "Local SEO & GBP management" },
  { icon: BarChart3, text: "Weekly rank tracking dashboard" },
  { icon: Eye, text: "Monthly performance reports" },
  { icon: MessageCircle, text: "Direct Slack/WhatsApp access" },
  { icon: Sparkles, text: "AI citation monitoring (GEO)" },
  { icon: Bot, text: "AI Overview tracking dashboard" },
  { icon: Network, text: "Entity & knowledge graph audit" },
  { icon: Brain, text: "GEO content optimization" },
];

// ─── FAQ ──────────────────────────────────────────────

const faqs = [
  { q: "How long does SEO take to show results?", a: "Initial improvements in 2-3 months (technical fixes, indexing). Significant ranking and traffic gains in 4-6 months. After 6 months, results compound — most clients see 3x traffic by month 8-10. SEO is the highest-ROI marketing channel long-term." },
  { q: "How much do your SEO services cost?", a: "SEO packages start from ₹50,000/month for startups (5-10 keywords) and go up to ₹3,00,000+/month for enterprise (100+ keywords, full content + link building). We provide a custom quote after the free audit based on your competition and goals." },
  { q: "Do you guarantee first page rankings?", a: "No ethical SEO company can guarantee specific rankings — Google's algorithm considers 200+ factors. What we guarantee: transparent reporting, consistent effort, and measurable improvement. Our track record: 90% of target keywords reach page 1 within 6-8 months." },
  { q: "What makes your SEO different from other agencies?", a: "Three things: (1) AI-powered — we use AI for keyword research, content optimization, and predictive ranking analysis. (2) Dev team in-house — technical SEO fixes are implemented immediately, not waiting on your dev team. (3) Content + links included — most agencies charge separately. We bundle everything." },
  { q: "Do you write the content or do we?", a: "We handle everything. Our AI-assisted content team writes 8-12 SEO-optimized blog posts per month, plus pillar pages, landing pages, and content refreshes. All content goes through our editorial process for quality, accuracy, and brand voice alignment." },
  { q: "Can you help with a Google penalty recovery?", a: "Yes. We've recovered multiple sites from manual actions and algorithmic penalties. Our process: full audit → identify penalty cause → disavow toxic links → fix content issues → submit reconsideration request → rebuild authority. Recovery typically takes 2-4 months." },
  { q: "Do you work with e-commerce websites?", a: "Absolutely. E-commerce SEO is one of our specialties. We optimize product pages, category architecture, faceted navigation, product schema, image SEO, and internal search. We've helped e-commerce clients achieve 2x organic revenue within 6 months." },
  { q: "What tools do you use for SEO?", a: "We use a combination of: Ahrefs (backlink analysis), SEMrush (keyword research), Screaming Frog (technical audits), Google Search Console, GA4, Surfer SEO (content optimization), Clearscope (NLP analysis), Otterly.ai (AI citation tracking), and our own AI-powered tools for predictive ranking analysis." },
  { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is the practice of optimizing your content to appear in AI-generated answers — ChatGPT, Perplexity, Google AI Overviews, and Gemini. Unlike traditional SEO (ranking in blue links), GEO focuses on getting your brand cited as a source in AI responses. This is the biggest shift in search since mobile-first indexing. We're one of the first Indian agencies offering dedicated GEO services." },
  { q: "How do I get my brand mentioned by ChatGPT and Perplexity?", a: "AI models cite brands that have strong topical authority, comprehensive content, structured data, and consistent entity signals across the web. Our GEO strategy includes: (1) Building topical authority through content hubs, (2) Structured data and schema optimization for AI extraction, (3) Citation building on high-authority sources that LLMs train on, (4) Content formatting optimized for AI answer generation. Most clients see AI citations within 2-3 months." },
  { q: "Will AI kill SEO? Should I still invest?", a: "AI won't kill SEO — it's transforming it. Google still processes 8.5B searches/day, and organic traffic remains the highest-ROI channel. What's changing: (1) AI Overviews reduce clicks on some queries, so zero-click optimization matters more, (2) AI search engines (Perplexity, ChatGPT) are new traffic sources, (3) Entity authority and structured data matter more than ever. The agencies that adapt to GEO + traditional SEO will dominate. Those stuck on 2020 SEO tactics will lose." },
  { q: "What's the difference between SEO and GEO?", a: "Traditional SEO optimizes for Google's blue link rankings (position 1-10). GEO optimizes for AI-generated answers across ChatGPT, Perplexity, Google AI Overviews, and Gemini. SEO = rank in search results. GEO = get cited in AI answers. You need both in 2025+. Our combined SEO + GEO approach ensures visibility across ALL search surfaces — traditional, AI, voice, and social." },
];

// ─── SEO TOOLS MARQUEE ────────────────────────────────

const seoTools = [
  "Ahrefs", "SEMrush", "Screaming Frog", "Google Search Console", "Google Analytics 4",
  "Surfer SEO", "Clearscope", "Moz Pro", "Majestic", "Ubersuggest", "Sitebulb",
  "PageSpeed Insights", "Schema.org", "GTmetrix", "Google Tag Manager", "Looker Studio",
  "ChatGPT / Claude", "Frase", "MarketMuse", "BrightLocal",
  "Perplexity", "Otterly.ai", "Brand24", "SparkToro", "Google AI Overview Tracker",
];

// ─── FORM ─────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

function SEOLeadForm() {
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
        body: JSON.stringify({ ...formData, message: `[SEO Services Inquiry]\n${formData.message}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors";

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold mb-1">Audit Request Received!</h3>
        <p className="text-sm text-zinc-400">Our SEO strategist will deliver your audit within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {status === "error" && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">{errorMsg}</div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <input type="text" required disabled={status === "loading"} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={field} placeholder="Full Name *" />
        <input type="email" required disabled={status === "loading"} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={field} placeholder="Email *" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input type="tel" disabled={status === "loading"} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={field} placeholder="Phone / WhatsApp" />
        <input type="url" disabled={status === "loading"} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={field} placeholder="Website URL *" />
      </div>
      <select disabled={status === "loading"} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={field}>
        <option value="" className="bg-zinc-900">Monthly SEO Budget</option>
        <option value="₹50,000 - ₹1,00,000" className="bg-zinc-900">₹50,000 – ₹1,00,000/mo</option>
        <option value="₹1,00,000 - ₹2,00,000" className="bg-zinc-900">₹1,00,000 – ₹2,00,000/mo</option>
        <option value="₹2,00,000 - ₹3,00,000" className="bg-zinc-900">₹2,00,000 – ₹3,00,000/mo</option>
        <option value="₹3,00,000+" className="bg-zinc-900">₹3,00,000+/mo</option>
      </select>
      <textarea required rows={3} disabled={status === "loading"} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${field} resize-none`} placeholder="Tell us your SEO goals — target keywords, competitors, current traffic *" />
      <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
        {status === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" />Sending...</>) : (<>Get Free SEO Audit (300+ Points)<ArrowRight className="w-4 h-4" /></>)}
      </button>
      <p className="text-[10px] text-zinc-600 text-center">Free 300+ point audit. No obligation. Delivered in 48 hours.</p>
    </form>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────

export default function SEOServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [serviceTab, setServiceTab] = useState<string>("All");

  return (
    <div>
      {/* ══════ HERO ══════ */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-[128px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm">
                <Bot className="w-4 h-4" />
                AI-Powered SEO Agency India
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                SEO That Ranks in{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  Google AND AI
                </span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed">
                India&apos;s first SEO + GEO agency. We optimize for Google, ChatGPT, Perplexity, Gemini & AI Overviews — traditional SEO, generative engine optimization & entity authority that compounds every month.
              </p>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "3x", label: "Avg Traffic Growth" },
                  { value: "90%", label: "Page 1 Rankings" },
                  { value: "6mo", label: "To See Results" },
                ].map((m) => (
                  <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                    <p className="text-xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">{m.value}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["SEO + GEO Combined", "AI Overview Optimization", "Dev Team In-House", "No Lock-in Contracts"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />{badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {["R", "A", "S", "K"].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold">{l}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-xs text-zinc-500">50+ businesses trust our SEO</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-emerald-500/5">
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-2">
                  <Search className="w-3 h-3" /> Free 300+ Point SEO Audit
                </div>
                <h2 className="text-xl font-bold">Get Your Free SEO Audit</h2>
                <p className="text-sm text-zinc-500 mt-1">Comprehensive audit with actionable fixes — delivered in 48 hours.</p>
              </div>
              <SEOLeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ BEFORE/AFTER RESULTS ══════ */}
      <section className="py-14 bg-[#161616] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-2">Real Results</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Before & After RDMI SEO</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {seoResults.map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">{r.industry}</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div>
                    <p className="text-sm text-zinc-500 line-through">{r.before}</p>
                    <p className="text-[9px] text-zinc-600">Before</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">{r.after}</p>
                    <p className="text-[9px] text-emerald-400/60">After 6mo</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 font-medium">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 2025 SEO LANDSCAPE ══════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-3">
              <Zap className="w-3 h-3" /> The SEO Landscape Has Changed
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              It&apos;s Not Just Google Anymore —{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">It&apos;s AI Everywhere</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stat: "60%", label: "of Google searches end without a click", desc: "Zero-click SEO is now critical" },
              { stat: "30%+", label: "of searches show AI Overviews", desc: "Google AI answers before blue links" },
              { stat: "40%", label: "of Gen-Z use TikTok as search engine", desc: "Social search is real, not a trend" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{s.stat}</p>
                <p className="text-xs font-medium mt-2">{s.label}</p>
                <p className="text-[10px] text-zinc-500 mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-400 mt-6">
            We optimize for <span className="text-white font-semibold">ALL search surfaces</span> — Google, ChatGPT, Perplexity, Gemini, AI Overviews, YouTube, TikTok & voice assistants.
          </p>
        </div>
      </section>

      {/* ══════ SEO SCORE CALCULATOR ══════ */}
      <SEOScoreCalculator />

      {/* ══════ 14 SEO SERVICES (TABBED) ══════ */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Our SEO Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              SEO + GEO Solutions{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">for 2025 & Beyond</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">From technical foundations to AI-era optimization — 14 services covering every search surface.</p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex gap-2 justify-center flex-wrap mb-10">
            {serviceCategories.map((cat) => (
              <button key={cat} onClick={() => setServiceTab(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${serviceTab === cat ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/25" : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/5"}`}>
                {cat}
                {cat !== "All" && <span className="ml-1.5 text-xs opacity-60">{seoServices.filter((s) => s.category === cat).length}</span>}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(serviceTab === "All" ? seoServices : seoServices.filter((s) => s.category === serviceTab)).map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold mb-2 group-hover:text-emerald-300 transition-colors">{s.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{s.description}</p>
                <ul className="space-y-1 mb-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" />{d}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium pt-2 border-t border-white/[0.05]">
                  <TrendingUp className="w-3 h-3" />{s.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHAT YOU GET ══════ */}
      <section className="py-20 lg:py-28 bg-[#161616]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">What&apos;s Included</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Everything You Get{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Every Month</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {deliverables.map((d, i) => (
              <motion.div key={d.text} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <d.icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-medium">{d.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ROI CALCULATOR ══════ */}
      <ROICalculator />

      {/* ══════ PROCESS ══════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              From Audit to{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Page 1 Rankings</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {seoProcess.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 flex items-center justify-center mx-auto mb-4 text-sm font-bold">{p.step}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TOOLS MARQUEE ══════ */}
      <section className="py-10 border-y border-white/[0.06] bg-[#161616] overflow-hidden">
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">SEO Tools We Use</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#161616] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#161616] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <motion.div className="flex gap-3" animate={{ x: [0, -(seoTools.length * 145)] }} transition={{ x: { duration: 30, repeat: Infinity, ease: "linear" } }}>
              {[...seoTools, ...seoTools].map((tool, i) => (
                <div key={`${tool}-${i}`} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-emerald-500/10 text-xs font-medium text-zinc-400 whitespace-nowrap">
                  <Search className="w-3 h-3 text-emerald-400" />{tool}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ WHY RDMI SEO ══════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why Brands Choose{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">RDMI for SEO</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Bot, title: "AI-Powered SEO", desc: "AI for keyword clustering, content optimization, predictive ranking & competitor gap analysis. Not manual spreadsheet work." },
              { icon: Code2, title: "Dev Team In-House", desc: "Technical SEO fixes implemented immediately by our engineering team. No waiting on your developers for months." },
              { icon: FileText, title: "Content Included", desc: "8-12 SEO blog posts, pillar pages & content refreshes every month. Written by humans, optimized by AI." },
              { icon: Link2, title: "White-Hat Links Only", desc: "Guest posts, digital PR, HARO, broken link building — no PBNs, no spam. Only links that last." },
              { icon: Shield, title: "No Lock-in Contracts", desc: "Month-to-month. We earn your business with rankings, not paperwork. Cancel anytime." },
              { icon: Eye, title: "Full Transparency", desc: "Real-time rank tracking dashboard, weekly updates, monthly strategy calls. You see everything." },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIAL ══════ */}
      <section className="py-16 bg-[#161616]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/10 text-center">
            <div className="flex justify-center gap-0.5 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}</div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              &ldquo;We went from 2,400 monthly organic visitors to 28,000 in 7 months with RDMI. Their AI-powered content strategy and technical SEO fixes were game-changers. The best part? Their dev team implemented all fixes — we didn&apos;t have to touch anything.&rdquo;
            </p>
            <p className="text-sm font-semibold">Vikram R.</p>
            <p className="text-xs text-zinc-500">Founder, SaaS Platform — Bangalore</p>
          </motion.div>
        </div>
      </section>

      {/* ══════ QUIZ FUNNEL ══════ */}
      <QuizFunnel />

      {/* ══════ FAQ ══════ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">SEO FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="text-sm font-semibold">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform flex-shrink-0 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ BOTTOM CTA ══════ */}
      <section className="py-20 lg:py-28 bg-[#161616]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/5 border border-emerald-500/20">
            <Search className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Dominate Search Results?</h2>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              Get a free 300+ point SEO audit with keyword opportunities, technical fixes & competitor analysis — delivered in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-semibold transition-all hover:shadow-lg hover:shadow-emerald-500/25">
                Get Free SEO Audit <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919818565561" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-medium text-sm transition-all">
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Us
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 48-hour delivery</span>
              <span>•</span>
              <span>info@rdmi.in</span>
              <span>•</span>
              <span>+91 98185 65561</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
