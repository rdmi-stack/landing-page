"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Check,
  Shield,
  Clock,
  Users,
  Zap,
  Bot,
  IndianRupee,
  Star,
  MessageCircle,
  Globe,
} from "lucide-react";

// ─── UTM CONFIG MAP ────────────────────────────────────────────

interface UTMConfig {
  headline: string;
  highlightText: string;
  subheadline: string;
  ctaText: string;
  offer: string;
  socialProof: string;
  urgency: string;
  trustBadges: string[];
}

const defaultConfig: UTMConfig = {
  headline: "Custom Software Development",
  highlightText: "at 50% Less Cost",
  subheadline:
    "Talk to senior developers directly. AI-first approach. From MVP to enterprise scale — we build software that drives revenue.",
  ctaText: "Get Free Quote & Prototype",
  offer: "Free consultation + architecture blueprint",
  socialProof: "Trusted by 50+ startups & enterprises across 12 countries",
  urgency: "Limited slots available for Q2 2025",
  trustBadges: ["NDA Protected", "Source Code Ownership", "2-Hour Response"],
};

// Source-based overrides
const sourceConfigs: Record<string, Partial<UTMConfig>> = {
  google: {
    socialProof: "Rated 4.9/5 by clients who found us on Google",
    trustBadges: ["Google Verified", "NDA Protected", "50+ Projects"],
  },
  facebook: {
    subheadline:
      "Join 50+ businesses who switched from expensive agencies to RDMI. Same quality, half the price, AI-powered delivery.",
    ctaText: "Claim Your Free Consultation",
    socialProof: "500+ business owners follow us for dev insights",
  },
  instagram: {
    subheadline:
      "We build the apps and platforms you see trending. From concept to App Store — powered by AI, delivered by senior devs.",
    ctaText: "Start Building Your App",
    socialProof: "Featured by top startup communities",
  },
  linkedin: {
    subheadline:
      "Enterprise-grade software from India's top AI-first dev team. CTO-approved architecture, transparent pricing, direct developer access.",
    ctaText: "Schedule a Technical Discussion",
    socialProof: "Trusted by CTOs and VPs of Engineering at 20+ companies",
    trustBadges: ["Enterprise Security", "SOC2 Ready", "NDA Protected"],
  },
  twitter: {
    subheadline:
      "Ship faster with AI-powered development. We build MVPs in 4-6 weeks, production apps in 8-16 weeks. No middlemen.",
    ctaText: "Let's Ship Together",
    socialProof: "Followed by 1000+ developers and founders",
  },
  email: {
    headline: "Welcome Back —",
    highlightText: "Let's Build Together",
    subheadline:
      "You showed interest in custom software development. Here's your exclusive offer — talk to a senior developer today, completely free.",
    ctaText: "Redeem Free Consultation",
    offer: "Exclusive: Free 1-hour architecture session",
    urgency: "This offer expires in 48 hours",
  },
  newsletter: {
    headline: "Subscriber Exclusive:",
    highlightText: "Priority Development Slots",
    ctaText: "Claim Priority Slot",
    offer: "Newsletter subscribers get priority scheduling",
  },
  producthunt: {
    headline: "Built for Builders —",
    highlightText: "Ship Your MVP in 4 Weeks",
    subheadline:
      "We're the dev team behind products you've upvoted. AI-first, transparent pricing, you own everything.",
    ctaText: "Launch Your Product",
    socialProof: "Loved by the Product Hunt community",
  },
  reddit: {
    subheadline:
      "No BS pricing. No project managers. Talk directly to the devs building your product. AI tools for 2x speed.",
    ctaText: "Get Honest Quote",
    socialProof: "Recommended on r/startups and r/SaaS",
  },
  partner: {
    headline: "Partner Exclusive:",
    highlightText: "Priority Development Access",
    offer: "Partner referral: Free discovery session + architecture doc",
    ctaText: "Activate Partner Benefits",
  },
};

// Campaign-based overrides (highest priority)
const campaignConfigs: Record<string, Partial<UTMConfig>> = {
  mvp: {
    headline: "Launch Your MVP",
    highlightText: "in 4-6 Weeks",
    subheadline:
      "From idea to live product. We build MVPs with production-grade code, not throwaway prototypes. AI-powered, cost-effective.",
    ctaText: "Start MVP Project",
    offer: "Free MVP roadmap + tech stack recommendation",
    urgency: "Only 3 MVP slots left this month",
  },
  saas: {
    headline: "Build Your SaaS Platform",
    highlightText: "with AI-First Approach",
    subheadline:
      "Multi-tenant architecture, subscription billing, analytics dashboard — we've built 20+ SaaS products. Your turn.",
    ctaText: "Start SaaS Project",
    offer: "Free SaaS architecture blueprint",
  },
  mobile: {
    headline: "Custom Mobile App",
    highlightText: "Development in India",
    subheadline:
      "iOS & Android apps with React Native / Flutter. From fintech to healthcare — shipped to App Store & Play Store.",
    ctaText: "Build My App",
    offer: "Free app wireframe + cost estimate",
  },
  ai: {
    headline: "AI-Powered Software",
    highlightText: "Built by AI Experts",
    subheadline:
      "Custom AI agents, RAG systems, LLM integrations, computer vision — we build production-grade AI software, not demos.",
    ctaText: "Build AI Product",
    offer: "Free AI feasibility assessment",
    trustBadges: ["OpenAI Partner", "LangChain Experts", "Production AI"],
  },
  ecommerce: {
    headline: "E-Commerce Development",
    highlightText: "That Drives Revenue",
    subheadline:
      "Headless commerce, marketplaces, D2C platforms — optimized for conversion, built for scale. Razorpay & Stripe ready.",
    ctaText: "Build My Store",
    offer: "Free e-commerce audit + migration plan",
  },
  enterprise: {
    headline: "Enterprise Software",
    highlightText: "Solutions at Scale",
    subheadline:
      "ERP, CRM, workflow automation, data platforms — microservices architecture with enterprise security & compliance.",
    ctaText: "Schedule Enterprise Demo",
    trustBadges: ["ISO 27001 Ready", "Enterprise SLA", "24/7 Support"],
    urgency: "Enterprise consultation slots filling fast",
  },
  startup: {
    headline: "Startup-Friendly",
    highlightText: "Software Development",
    subheadline:
      "We've helped 30+ startups go from idea to funded product. Equity-friendly pricing, MVP-first approach, AI-powered speed.",
    ctaText: "Talk to a Startup Dev",
    offer: "Free 30-min strategy call for startups",
    socialProof: "30+ startups launched with RDMI",
  },
  outsourcing: {
    headline: "Outsource Software Dev",
    highlightText: "to India's Best Team",
    subheadline:
      "AI-powered development team that delivers at 50% less cost than US/UK agencies. Same timezone overlap, direct communication, NDA protected.",
    ctaText: "Hire Our Team",
    offer: "Free trial: 1 week of development",
    urgency: "Only 2 team slots available",
  },
  retarget: {
    headline: "Still Thinking?",
    highlightText: "Let's Clear Your Doubts",
    subheadline:
      "You checked us out before. Here's what you might have missed — we offer free prototypes, NDA from day one, and zero lock-in.",
    ctaText: "Get Free Prototype",
    offer: "Special: Free clickable prototype for your project",
    urgency: "This offer won't last — claim it today",
  },
};

// Medium-based CTA overrides
const mediumCTAs: Record<string, string> = {
  cpc: "Get Free Quote Now",
  ppc: "Get Free Quote Now",
  social: "Start Free Consultation",
  email: "Redeem Your Offer",
  referral: "Claim Referral Bonus",
  organic: "Explore Our Work",
  display: "Learn More & Get Quote",
  video: "See Our Work & Get Quote",
};

// ─── HELPER: resolve config ───────────────────────────────────

function resolveConfig(
  source: string | null,
  medium: string | null,
  campaign: string | null,
  term: string | null
): UTMConfig {
  const config = { ...defaultConfig };

  // Layer 1: source overrides
  if (source && sourceConfigs[source.toLowerCase()]) {
    Object.assign(config, sourceConfigs[source.toLowerCase()]);
  }

  // Layer 2: campaign overrides (higher priority)
  if (campaign && campaignConfigs[campaign.toLowerCase()]) {
    Object.assign(config, campaignConfigs[campaign.toLowerCase()]);
  }

  // Layer 3: medium CTA override
  if (medium && mediumCTAs[medium.toLowerCase()]) {
    config.ctaText = mediumCTAs[medium.toLowerCase()];
  }

  // Layer 4: keyword injection (utm_term)
  if (term) {
    const cleanTerm = term.replace(/[+_-]/g, " ").trim();
    config.headline = cleanTerm.charAt(0).toUpperCase() + cleanTerm.slice(1);
    config.highlightText = "— Built by RDMI";
  }

  return config;
}

// ─── FORM COMPONENT ──────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

function LeadForm({
  ctaText,
  utmData,
}: {
  ctaText: string;
  utmData: Record<string, string>;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const utmTag = Object.entries(utmData)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: `[UTM: ${utmTag || "direct"}]\n${formData.message}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
      setStatus("error");
    }
  };

  const field =
    "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">You&apos;re In!</h3>
        <p className="text-sm text-zinc-400">
          A senior developer will reach out within 2 hours.
        </p>
        <p className="text-xs text-zinc-600 mt-1">
          Check your inbox for confirmation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {status === "error" && (
        <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {errorMsg}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          required
          disabled={status === "loading"}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={field}
          placeholder="Full Name *"
        />
        <input
          type="email"
          required
          disabled={status === "loading"}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={field}
          placeholder="Email *"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="tel"
          disabled={status === "loading"}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={field}
          placeholder="Phone / WhatsApp"
        />
        <select
          disabled={status === "loading"}
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className={field}
        >
          <option value="" className="bg-zinc-900">Budget Range</option>
          <option value="₹1,50,000 - ₹3,00,000" className="bg-zinc-900">₹1.5L – ₹3L</option>
          <option value="₹3,00,000 - ₹5,00,000" className="bg-zinc-900">₹3L – ₹5L</option>
          <option value="₹5,00,000 - ₹10,00,000" className="bg-zinc-900">₹5L – ₹10L</option>
          <option value="₹10,00,000 - ₹15,00,000" className="bg-zinc-900">₹10L – ₹15L</option>
          <option value="₹15,00,000 - ₹25,00,000" className="bg-zinc-900">₹15L – ₹25L</option>
          <option value="₹25,00,000+" className="bg-zinc-900">₹25L+</option>
        </select>
      </div>
      <textarea
        required
        rows={3}
        disabled={status === "loading"}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${field} resize-none`}
        placeholder="Tell us about your project *"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            {ctaText} <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      <p className="text-xs text-zinc-600 text-center">
        No spam. No obligation. NDA protected.
      </p>
    </form>
  );
}

// ─── MAIN LANDING PAGE ──────────────────────────────────────

function LandingPageContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("utm_source");
  const medium = searchParams.get("utm_medium");
  const campaign = searchParams.get("utm_campaign");
  const term = searchParams.get("utm_term");
  const content = searchParams.get("utm_content");

  const config = useMemo(
    () => resolveConfig(source, medium, campaign, term),
    [source, medium, campaign, term]
  );

  const utmData = useMemo(
    () => ({
      source: source || "",
      medium: medium || "",
      campaign: campaign || "",
      term: term || "",
      content: content || "",
    }),
    [source, medium, campaign, term, content]
  );

  const usps = [
    { icon: Users, title: "Direct Developer Access", desc: "Talk to engineers, not sales reps" },
    { icon: IndianRupee, title: "Save 50% Cost", desc: "AI-powered team at half the cost" },
    { icon: Bot, title: "AI-Powered Dev Team", desc: "2x faster with AI-powered workflows" },
    { icon: Shield, title: "100% IP Ownership", desc: "Your code, NDA from day one" },
  ];

  const stats = [
    { value: "50+", label: "Projects" },
    { value: "12+", label: "Countries" },
    { value: "4-6", label: "Weeks to MVP" },
    { value: "50%", label: "Cost Saved" },
  ];

  return (
    <div className="pt-20">
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-purple-950/10 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Urgency bar */}
              {config.urgency && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                  <Clock className="w-3 h-3" />
                  {config.urgency}
                </div>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {config.headline}{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {config.highlightText}
                </span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed">
                {config.subheadline}
              </p>

              {/* Offer badge */}
              {config.offer && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">
                    {config.offer}
                  </span>
                </div>
              )}

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {config.trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400"
                  >
                    <Check className="w-3 h-3 text-indigo-400" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold"
                    >
                      {["R", "A", "S", "K"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500">{config.socialProof}</p>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-indigo-500/5"
            >
              <div className="mb-5">
                <h2 className="text-xl font-bold">Get Your Free Quote</h2>
                <p className="text-sm text-zinc-500 mt-1">
                  Senior developer responds within 2 hours
                </p>
              </div>
              <LeadForm ctaText={config.ctaText} utmData={utmData} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <section className="py-10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USP SECTION ────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              Why{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                50+ Businesses
              </span>{" "}
              Choose RDMI
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {usps.map((usp, i) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                  <usp.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{usp.title}</h3>
                <p className="text-xs text-zinc-500">{usp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section className="py-16 lg:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              How It Works —{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Simple & Fast
              </span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Submit Quote",
                desc: "Fill the form above. Takes 60 seconds.",
              },
              {
                step: "02",
                title: "Dev Call",
                desc: "Senior developer calls within 2 hours.",
              },
              {
                step: "03",
                title: "Free Prototype",
                desc: "We build a clickable prototype — free.",
              },
              {
                step: "04",
                title: "Build & Launch",
                desc: "Agile sprints. Weekly demos. You own everything.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                  {s.step}
                </div>
                <h3 className="font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-zinc-500">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/10 text-center"
          >
            <div className="flex justify-center gap-0.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              &ldquo;RDMI delivered our AI-powered SaaS platform in 8 weeks — at
              literally half of what US agencies quoted. The direct developer
              access made all the difference. No miscommunication, no delays.&rdquo;
            </p>
            <p className="text-sm font-semibold">Arjun M.</p>
            <p className="text-xs text-zinc-500">
              CTO, HealthTech Startup — San Francisco
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to Start?
            </h2>
            <p className="text-zinc-400 mb-6">
              Talk to a senior developer today. No sales pitch, just technical advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                {config.ctaText} <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919818565561"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-medium text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Us
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" /> India | USA | UK
              </span>
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

// ─── WRAPPER WITH SUSPENSE ──────────────────────────────────

export default function UTMLandingPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 pb-20 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-400 mx-auto" />
        </div>
      }
    >
      <LandingPageContent />
    </Suspense>
  );
}
