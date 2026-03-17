"use client";

import { useState } from "react";
import QuizFunnel from "@/components/QuizFunnel";
import AdSpendCalculator from "@/components/marketing-tools/AdSpendCalculator";
import AdsGrader from "@/components/marketing-tools/AdsGrader";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Search,
  Target,
  Megaphone,
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Mail,
  Video,
  PenTool,
  Globe,
  MapPin,
  Users,
  Zap,
  Bot,
  CheckCircle2,
  ChevronDown,
  Shield,
  Clock,
  Star,
  LineChart,
  Eye,
  MessageCircle,
} from "lucide-react";

// ─── SERVICES DATA ────────────────────────────────────────

const serviceCategories = ["All", "Paid Ads", "Organic Growth", "Optimization & Analytics"] as const;

const services = [
  // Paid Ads
  { icon: Target, title: "Google Ads (PPC Management)", category: "Paid Ads", description: "Search, Display, Shopping & YouTube campaigns. AI-optimized bidding, ad copy testing, negative keywords & conversion tracking for maximum ROAS.", tags: ["Search Ads", "Display", "Shopping", "YouTube", "Remarketing"], metrics: "Avg 4.2x ROAS for clients", gradient: "from-blue-500 to-indigo-600" },
  { icon: Megaphone, title: "Meta Ads (Facebook & Instagram)", category: "Paid Ads", description: "Full-funnel campaigns from awareness to conversion. Lookalike audiences, dynamic retargeting, creative A/B testing & AI-optimized budget allocation.", tags: ["Facebook Ads", "Instagram Ads", "Retargeting", "Lookalike", "Creative Testing"], metrics: "40% lower CPA vs industry avg", gradient: "from-purple-500 to-violet-600" },
  { icon: Users, title: "LinkedIn Ads (B2B Marketing)", category: "Paid Ads", description: "Sponsored content, InMail campaigns, ABM targeting for enterprise lead generation. Perfect for SaaS, IT services & professional services.", tags: ["Sponsored Content", "InMail", "ABM", "Lead Gen", "B2B"], metrics: "3x qualified leads for B2B clients", gradient: "from-sky-500 to-blue-600" },
  { icon: Video, title: "YouTube & Video Marketing", category: "Paid Ads", description: "YouTube Ads management, video SEO, short-form content strategy for Reels/Shorts, and video production support for brand storytelling.", tags: ["YouTube Ads", "Video SEO", "Reels", "Shorts", "Brand Videos"], metrics: "5M+ video views for clients", gradient: "from-red-500 to-rose-600" },
  // Organic Growth
  { icon: Search, title: "SEO & GEO (Generative Engine Optimization)", category: "Organic Growth", description: "Technical SEO, content strategy, link building, local SEO — plus GEO optimization for ChatGPT, Perplexity & Google AI Overviews.", tags: ["Technical SEO", "GEO", "Link Building", "AI Overviews", "Content"], metrics: "3x organic traffic + AI citations", gradient: "from-green-500 to-emerald-600" },
  { icon: PenTool, title: "Content Marketing", category: "Organic Growth", description: "AI-assisted blog content, whitepapers, case studies, infographics & video scripts. Topic cluster strategy with SEO-optimized content calendar.", tags: ["Blog Content", "Whitepapers", "Case Studies", "Infographics", "Video"], metrics: "200+ content pieces/month capacity", gradient: "from-amber-500 to-orange-600" },
  { icon: Mail, title: "Email & WhatsApp Marketing", category: "Organic Growth", description: "Drip campaigns, segmentation, automation workflows, personalized sequences & WhatsApp Business API integration for nurture and retention.", tags: ["Drip Campaigns", "Automation", "Segmentation", "WhatsApp API", "Retention"], metrics: "32% avg email open rate", gradient: "from-teal-500 to-cyan-600" },
  { icon: MapPin, title: "Local SEO & Google Business", category: "Organic Growth", description: "Google Business Profile optimization, local citations, review management, map pack ranking & geo-targeted campaigns for local businesses.", tags: ["Google Business", "Local Citations", "Reviews", "Map Pack", "Geo-targeting"], metrics: "#1 map pack for 80% of clients", gradient: "from-lime-500 to-green-600" },
  // Optimization & Analytics
  { icon: MousePointerClick, title: "Conversion Rate Optimization (CRO)", category: "Optimization & Analytics", description: "A/B testing, heatmap analysis, funnel optimization, landing page redesign & UX improvements. Data-driven decisions for higher conversions.", tags: ["A/B Testing", "Heatmaps", "Funnel Analysis", "UX", "Landing Pages"], metrics: "Avg 45% conversion lift", gradient: "from-rose-500 to-pink-600" },
  { icon: LineChart, title: "Marketing Analytics & Attribution", category: "Optimization & Analytics", description: "GA4 setup, conversion tracking, UTM strategy, custom dashboards, multi-touch attribution & AI-powered insights for data-driven decisions.", tags: ["GA4", "Attribution", "Dashboards", "UTM", "AI Insights"], metrics: "Full-funnel visibility in 7 days", gradient: "from-indigo-500 to-purple-600" },
  { icon: Globe, title: "Landing Page Optimization", category: "Optimization & Analytics", description: "High-converting landing pages built by our dev team. Message-match with ads, speed optimization, mobile-first design & continuous A/B testing.", tags: ["Landing Pages", "Speed", "Mobile-First", "Message Match", "Dev Team"], metrics: "2x conversion rate avg", gradient: "from-fuchsia-500 to-purple-600" },
];

// ─── RESULTS DATA ──────────────────────────────────────

const results = [
  { before: "1.2x", after: "4.5x", label: "ROAS", industry: "D2C Brand" },
  { before: "₹2,800", after: "₹980", label: "Cost Per Lead", industry: "SaaS Company" },
  { before: "₹3L", after: "₹18L/mo", label: "Revenue from Ads", industry: "E-Commerce" },
  { before: "8/mo", after: "45/mo", label: "Qualified Leads", industry: "B2B Services" },
  { before: "120", after: "480/mo", label: "Patient Bookings", industry: "Healthcare" },
  { before: "2K", after: "28K/mo", label: "App Installs", industry: "EdTech" },
];

// ─── PROCESS ──────────────────────────────────────────

const process = [
  { step: "01", title: "Free Audit", desc: "Complete analysis of your current marketing, competitors & opportunities. Delivered in 48 hours." },
  { step: "02", title: "Custom Strategy", desc: "Channel selection, budget allocation, targeting & KPI framework tailored to your business goals." },
  { step: "03", title: "Launch & Optimize", desc: "Campaigns go live with AI-powered bid management, creative testing & real-time optimization." },
  { step: "04", title: "Report & Scale", desc: "Weekly performance reports, monthly strategy reviews & continuous scaling of what works." },
];

// ─── FAQ ──────────────────────────────────────────────

const faqs = [
  { q: "How much does digital marketing cost in India?", a: "Our packages start from ₹50,000/month for startups and go up to ₹5,00,000+/month for enterprise campaigns. Pricing depends on channels, ad spend, and scope. We provide a detailed proposal after the free audit." },
  { q: "How long before I see results from SEO?", a: "SEO is a long-term investment. You'll see initial improvements in 2-3 months, significant traffic growth in 4-6 months, and compounding results after 6 months. We provide monthly progress reports with clear KPIs." },
  { q: "What's the minimum ad spend for Google/Meta Ads?", a: "We recommend a minimum of ₹50,000/month ad spend for Google Ads and ₹30,000/month for Meta Ads to generate meaningful data and results. Higher budgets allow for faster optimization and better ROAS." },
  { q: "Do you provide transparent reporting?", a: "Absolutely. You get a real-time dashboard with all KPIs, weekly performance summaries, and monthly strategy review calls. Full transparency on ad spend, clicks, conversions, ROAS, and every metric that matters." },
  { q: "Can you handle both B2B and B2C marketing?", a: "Yes. We run B2B campaigns on LinkedIn, Google Search & content marketing, and B2C campaigns across Meta, Google, YouTube & email. Different funnels, different creatives, same data-driven approach." },
  { q: "What makes RDMI different from other agencies?", a: "Three things: (1) We also build the software — landing pages, funnels, automation are built in-house, not outsourced. (2) AI-powered optimization — we use AI tools for bid management, content generation & predictive analytics. (3) Direct access to strategists — no account managers, talk to the people running your campaigns." },
  { q: "Do you offer a free audit?", a: "Yes. We provide a comprehensive free marketing audit covering your website SEO, competitor analysis, ad account review (if applicable), and a channel recommendation with estimated ROI. No strings attached." },
  { q: "Can you work with our existing team?", a: "Absolutely. We can work as your full-stack marketing team or complement your in-house team. We integrate with your existing tools, workflows & reporting systems." },
  { q: "How does AI improve ad performance?", a: "We use AI for: (1) Bid optimization — real-time bidding adjustments based on conversion probability, (2) Ad copy generation — testing 100s of headline/description variations, (3) Audience targeting — finding high-intent audiences your competitors miss, (4) Predictive analytics — forecasting performance before spending. Result: 20-40% better ROAS vs manual management." },
  { q: "How do you handle multi-channel attribution?", a: "We set up multi-touch attribution using GA4 + Looker Studio. You'll see the full customer journey: which channels drive awareness, consideration & conversion. We use data-driven attribution models (not last-click) to allocate budget to the channels actually driving revenue." },
  { q: "Can you manage ads for multiple locations/countries?", a: "Yes. We manage campaigns across India, USA, UK, Canada, Australia, Singapore & Middle East. We handle geo-targeting, language-specific ad copy, local landing pages, currency conversion & timezone-optimized scheduling. Each market gets a tailored strategy." },
  { q: "What's your approach to creative testing?", a: "We run structured creative testing: (1) Hook testing — 5-10 opening variations, (2) Format testing — static vs video vs carousel, (3) CTA testing — different value propositions, (4) Audience-creative match testing. We test weekly, kill underperformers fast, and scale winners. AI helps generate variations at 10x speed." },
];

// ─── INDUSTRIES ──────────────────────────────────────

const industries = [
  "SaaS & Tech", "E-Commerce & D2C", "Healthcare", "Real Estate", "Education & EdTech",
  "FinTech", "Professional Services", "Manufacturing", "Hospitality", "Logistics",
  "Legal", "Fitness & Wellness",
];

// ─── TECH TOOLS ──────────────────────────────────────

const tools = [
  "Google Ads", "Meta Business Suite", "LinkedIn Campaign Manager", "Google Analytics 4",
  "SEMrush", "Ahrefs", "Screaming Frog", "Hotjar", "Google Tag Manager", "Looker Studio",
  "HubSpot", "Mailchimp", "Zapier", "ChatGPT / Claude", "Canva Pro", "Figma",
];

// ─── DELIVERABLES ─────────────────────────────────────

const deliverables = [
  { icon: Target, text: "Campaign setup & management" },
  { icon: Bot, text: "AI-powered bid optimization" },
  { icon: PenTool, text: "Ad creative design & testing" },
  { icon: Users, text: "Audience research & targeting" },
  { icon: MousePointerClick, text: "Landing page optimization" },
  { icon: BarChart3, text: "Weekly performance reports" },
  { icon: MessageCircle, text: "Monthly strategy calls" },
  { icon: Eye, text: "Real-time dashboard access" },
  { icon: Search, text: "Competitor ad monitoring" },
  { icon: TrendingUp, text: "Retargeting setup & management" },
  { icon: LineChart, text: "GA4 + GTM conversion tracking" },
  { icon: Megaphone, text: "A/B testing (ads + pages)" },
  { icon: Zap, text: "Budget allocation optimization" },
  { icon: Star, text: "ROAS-focused KPI tracking" },
  { icon: Shield, text: "Direct Slack/WhatsApp access" },
  { icon: Video, text: "Creative asset library" },
];

// ─── FORM ─────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

function LeadForm() {
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
        body: JSON.stringify({ ...formData, message: `[Digital Marketing Inquiry]\n${formData.message}` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  const field = "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  if (status === "success") {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold mb-1">Audit Request Sent!</h3>
        <p className="text-sm text-zinc-400">Our marketing strategist will reach out within 2 hours.</p>
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
        <input type="text" disabled={status === "loading"} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={field} placeholder="Website URL" />
      </div>
      <select disabled={status === "loading"} value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={field}>
        <option value="" className="bg-zinc-900">Monthly Marketing Budget</option>
        <option value="₹50,000 - ₹1,00,000" className="bg-zinc-900">₹50,000 – ₹1,00,000/mo</option>
        <option value="₹1,00,000 - ₹3,00,000" className="bg-zinc-900">₹1,00,000 – ₹3,00,000/mo</option>
        <option value="₹3,00,000 - ₹5,00,000" className="bg-zinc-900">₹3,00,000 – ₹5,00,000/mo</option>
        <option value="₹5,00,000 - ₹10,00,000" className="bg-zinc-900">₹5,00,000 – ₹10,00,000/mo</option>
        <option value="₹10,00,000+" className="bg-zinc-900">₹10,00,000+/mo</option>
      </select>
      <textarea required rows={3} disabled={status === "loading"} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${field} resize-none`} placeholder="Tell us your marketing goals *" />
      <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100">
        {status === "loading" ? (<><Loader2 className="w-4 h-4 animate-spin" />Sending...</>) : (<>Get Free Marketing Audit<ArrowRight className="w-4 h-4" /></>)}
      </button>
      <p className="text-[10px] text-zinc-600 text-center">Free audit. No obligation. Results in 48 hours.</p>
    </form>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────

export default function DigitalMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [serviceTab, setServiceTab] = useState<string>("All");

  return (
    <div>
      {/* ══════ HERO ══════ */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm">
                <Bot className="w-4 h-4" />
                AI-Powered Digital Marketing Agency
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Digital Marketing{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  That Delivers ROAS
                </span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed">
                SEO, Google Ads, Meta Ads, LinkedIn Ads, Content Marketing & CRO — powered by AI,
                driven by data. We don&apos;t just run campaigns, we build revenue engines.
              </p>

              <div className="flex flex-wrap gap-2">
                {["3-5x ROAS Average", "AI-Optimized Campaigns", "Transparent Reporting", "No Lock-in Contracts"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {["R", "A", "S", "K", "M"].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold">{l}</div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-xs text-zinc-500">Trusted by 50+ brands across India</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-indigo-500/5">
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-2">
                  <Zap className="w-3 h-3" /> Free Marketing Audit
                </div>
                <h2 className="text-xl font-bold">Get Your Free Audit</h2>
                <p className="text-sm text-zinc-500 mt-1">Complete analysis of your marketing — delivered in 48 hours.</p>
              </div>
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ BEFORE/AFTER RESULTS ══════ */}
      <section className="py-14 bg-[#161616] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-2">Real Results</p>
            <h2 className="text-2xl sm:text-3xl font-bold">Before & After RDMI Marketing</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {results.map((r, i) => (
              <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">{r.industry}</p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-xs text-zinc-500 line-through">{r.before}</span>
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                  <span className="text-lg font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{r.after}</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-medium">{r.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ 2025 DM LANDSCAPE ══════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium mb-3">
              <Zap className="w-3 h-3" /> The Marketing Landscape Has Shifted
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Is Changing{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Every Ad Dollar You Spend</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stat: "72%", label: "of ad spend is wasted on wrong audiences", desc: "AI targeting eliminates this waste" },
              { stat: "68%", label: "AI ad copy outperforms human-written", desc: "We test 100s of AI variations weekly" },
              { stat: "30%", label: "ROAS increase with multi-touch attribution", desc: "Last-click is dead — data-driven wins" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{s.stat}</p>
                <p className="text-xs font-medium mt-2">{s.label}</p>
                <p className="text-[10px] text-zinc-500 mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-400 mt-6">
            We use <span className="text-white font-semibold">AI for every step</span> — targeting, ad copy, bid management, creative testing & attribution.
          </p>
        </div>
      </section>

      {/* ══════ ADS GRADER ══════ */}
      <AdsGrader />

      {/* ══════ SERVICES (TABBED) ══════ */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Full-Stack Digital Marketing{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Services in India</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              From paid ads to organic growth to conversion optimization — 11 services, one team.
            </p>
          </motion.div>

          {/* Category tabs */}
          <div className="flex gap-2 justify-center flex-wrap mb-10">
            {serviceCategories.map((cat) => (
              <button key={cat} onClick={() => setServiceTab(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${serviceTab === cat ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25" : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/5"}`}>
                {cat}
                {cat !== "All" && <span className="ml-1.5 text-xs opacity-60">{services.filter((s) => s.category === cat).length}</span>}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(serviceTab === "All" ? services : services.filter((s) => s.category === serviceTab)).map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 group-hover:text-indigo-300 transition-colors">{s.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">{s.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 text-[9px] rounded bg-white/5 text-zinc-500 border border-white/5">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {s.metrics}
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
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">What&apos;s Included</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Everything You Get{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Every Month</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {deliverables.map((d, i) => (
              <motion.div key={d.text} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <d.icon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-xs font-medium">{d.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ AD SPEND CALCULATOR ══════ */}
      <AdSpendCalculator />

      {/* ══════ WHY RDMI ══════ */}
      <section className="py-20 lg:py-32 bg-[#161616]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Not Just Another{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Marketing Agency</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Bot, title: "AI-Powered Campaigns", desc: "We use AI for bid optimization, content generation, audience targeting & predictive analytics. Not manual guesswork." },
              { icon: Globe, title: "We Build + We Market", desc: "Landing pages, funnels, automation — built in-house by our dev team. No outsourcing, no delays." },
              { icon: Eye, title: "Full Transparency", desc: "Real-time dashboard, weekly reports, no hidden fees. You see exactly where every rupee goes." },
              { icon: MessageCircle, title: "Talk to Strategists", desc: "Direct access to the people running your campaigns. No account managers, no communication lag." },
              { icon: Shield, title: "No Lock-in Contracts", desc: "Month-to-month engagement. We earn your trust with results, not contracts." },
              { icon: TrendingUp, title: "ROAS-Focused", desc: "We optimize for revenue, not vanity metrics. Every campaign is measured against real business outcomes." },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="py-20 lg:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              From Audit to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Revenue Growth</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-4 text-sm font-bold">{p.step}</div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ INDUSTRIES ══════ */}
      <section className="py-16 bg-[#161616]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Industries We Serve</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span key={ind} className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400 hover:border-indigo-500/20 hover:text-white transition-colors">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TOOLS MARQUEE ══════ */}
      <section className="py-10 border-y border-white/[0.06] overflow-hidden">
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">Tools & Platforms We Use</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <motion.div className="flex gap-3" animate={{ x: [0, -(tools.length * 150)] }} transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" } }}>
              {[...tools, ...tools].map((tool, i) => (
                <div key={`${tool}-${i}`} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-zinc-400 whitespace-nowrap">
                  <BarChart3 className="w-3 h-3 text-indigo-400" />
                  {tool}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIAL ══════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 text-center">
            <div className="flex justify-center gap-0.5 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />)}</div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              &ldquo;RDMI scaled our Google Ads from ₹2L/month to ₹8L/month while maintaining 4.5x ROAS. Their AI-optimized bidding and weekly strategy calls made all the difference. Best marketing team we&apos;ve worked with.&rdquo;
            </p>
            <p className="text-sm font-semibold">Priya S.</p>
            <p className="text-xs text-zinc-500">Head of Growth, D2C Brand — Mumbai</p>
          </motion.div>
        </div>
      </section>

      {/* ══════ QUIZ FUNNEL ══════ */}
      <QuizFunnel />

      {/* ══════ FAQ ══════ */}
      <section className="py-20 lg:py-32 bg-[#161616]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
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
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
            <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Grow Your Revenue?</h2>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              Get a free marketing audit with competitor analysis, channel recommendations & estimated ROI — delivered in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25">
                Get Free Audit <ArrowRight className="w-4 h-4" />
              </a>
              <a href="https://wa.me/919818565561" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-medium text-sm transition-all">
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Us
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 48-hour audit delivery</span>
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
