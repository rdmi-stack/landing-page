"use client";

import {
  ArrowRight,
  MessageCircle,
  IndianRupee,
  Bot,
  Play,
  CheckCircle2,
  BarChart3,
  ShoppingCart,
  Users,
  Smartphone,
  Stethoscope,
  GraduationCap,
  Home,
  Wallet,
  Truck,
  Shield,
  Brain,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useModal } from "./ModalProvider";

const stats = [
  { value: "200+", label: "Products Shipped" },
  { value: "₹47Cr+", label: "Client Revenue Generated" },
  { value: "3x", label: "Faster Than Traditional Teams" },
  { value: "50%", label: "Less Than US/UK Agencies" },
];

interface ShowcaseCard {
  title: string;
  icon: LucideIcon;
  gradient: string;
  color: string;
  metrics: { label: string; value: string }[];
  chart: number[];
}

const showcaseCards: ShowcaseCard[] = [
  {
    title: "SaaS Dashboard",
    icon: BarChart3,
    gradient: "from-indigo-500 to-blue-600",
    color: "#6366f1",
    metrics: [{ label: "Stack", value: "Next.js" }, { label: "Timeline", value: "8 Weeks" }],
    chart: [35, 50, 42, 65, 58, 72, 85],
  },
  {
    title: "E-Commerce Platform",
    icon: ShoppingCart,
    gradient: "from-emerald-500 to-green-600",
    color: "#10b981",
    metrics: [{ label: "Stack", value: "React" }, { label: "Timeline", value: "10 Weeks" }],
    chart: [20, 35, 30, 55, 48, 60, 75],
  },
  {
    title: "AI Agent Platform",
    icon: Bot,
    gradient: "from-purple-500 to-violet-600",
    color: "#8b5cf6",
    metrics: [{ label: "Stack", value: "Python" }, { label: "Timeline", value: "6 Weeks" }],
    chart: [40, 55, 60, 70, 65, 80, 92],
  },
  {
    title: "FinTech Wallet",
    icon: Wallet,
    gradient: "from-amber-500 to-orange-600",
    color: "#f59e0b",
    metrics: [{ label: "Stack", value: "Flutter" }, { label: "Timeline", value: "12 Weeks" }],
    chart: [30, 45, 55, 50, 65, 78, 88],
  },
  {
    title: "Healthcare App",
    icon: Stethoscope,
    gradient: "from-rose-500 to-pink-600",
    color: "#f43f5e",
    metrics: [{ label: "Stack", value: "React Native" }, { label: "Timeline", value: "10 Weeks" }],
    chart: [25, 40, 35, 50, 60, 55, 70],
  },
  {
    title: "EdTech LMS",
    icon: GraduationCap,
    gradient: "from-cyan-500 to-teal-600",
    color: "#06b6d4",
    metrics: [{ label: "Stack", value: "Next.js" }, { label: "Timeline", value: "8 Weeks" }],
    chart: [20, 30, 45, 40, 55, 65, 80],
  },
  {
    title: "PropTech CRM",
    icon: Home,
    gradient: "from-sky-500 to-blue-600",
    color: "#0ea5e9",
    metrics: [{ label: "Stack", value: "Node.js" }, { label: "Timeline", value: "10 Weeks" }],
    chart: [35, 42, 38, 55, 62, 58, 75],
  },
  {
    title: "Logistics Platform",
    icon: Truck,
    gradient: "from-lime-500 to-green-600",
    color: "#84cc16",
    metrics: [{ label: "Stack", value: "Go" }, { label: "Timeline", value: "12 Weeks" }],
    chart: [50, 55, 60, 58, 70, 75, 85],
  },
  {
    title: "HR & Payroll System",
    icon: Users,
    gradient: "from-fuchsia-500 to-purple-600",
    color: "#d946ef",
    metrics: [{ label: "Stack", value: "Python" }, { label: "Timeline", value: "10 Weeks" }],
    chart: [40, 45, 50, 55, 52, 65, 72],
  },
  {
    title: "Mobile Super App",
    icon: Smartphone,
    gradient: "from-red-500 to-rose-600",
    color: "#ef4444",
    metrics: [{ label: "Stack", value: "Flutter" }, { label: "Timeline", value: "14 Weeks" }],
    chart: [15, 30, 45, 55, 65, 78, 90],
  },
  {
    title: "RAG Knowledge Base",
    icon: Brain,
    gradient: "from-violet-500 to-indigo-600",
    color: "#7c3aed",
    metrics: [{ label: "Stack", value: "LangChain" }, { label: "Timeline", value: "6 Weeks" }],
    chart: [45, 50, 58, 62, 70, 78, 95],
  },
  {
    title: "Workflow Engine",
    icon: Workflow,
    gradient: "from-teal-500 to-emerald-600",
    color: "#14b8a6",
    metrics: [{ label: "Stack", value: "Node.js" }, { label: "Timeline", value: "8 Weeks" }],
    chart: [30, 40, 50, 55, 68, 75, 82],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    gradient: "from-slate-500 to-zinc-600",
    color: "#64748b",
    metrics: [{ label: "Stack", value: "AWS" }, { label: "Timeline", value: "8 Weeks" }],
    chart: [60, 65, 70, 68, 75, 80, 90],
  },
];

// Duplicate for seamless loop
const doubledCards = [...showcaseCards, ...showcaseCards];

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="w-full h-8" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`cg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <polygon fill={`url(#cg-${color.replace("#", "")})`} points={`0,100 ${points} 100,100`} />
    </svg>
  );
}

function ProductCard({ card }: { card: ShowcaseCard }) {
  const { openModal } = useModal();

  return (
    <div
      onClick={() => openModal(card.title)}
      className="flex-shrink-0 w-[240px] sm:w-[260px] p-4 rounded-2xl bg-[#111]/80 border border-white/[0.08] backdrop-blur-md overflow-hidden group cursor-pointer hover:border-indigo-500/20 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Glow */}
      <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${card.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`} />

      {/* Header */}
      <div className="relative flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
          <card.icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold leading-tight">{card.title}</p>
          <p className="text-[9px] text-zinc-600">We Build This</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400/80">Ready</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="relative grid grid-cols-2 gap-2 mb-2">
        {card.metrics.map((m) => (
          <div key={m.label} className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.05]">
            <p className="text-[9px] text-zinc-500">{m.label}</p>
            <p className="text-xs font-bold">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative rounded-md overflow-hidden bg-white/[0.02] border border-white/[0.04] px-1.5 py-1">
        <MiniChart data={card.chart} color={card.color} />
      </div>
    </div>
  );
}

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative pt-28 pb-10 lg:pt-40 lg:pb-16 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium">
            <Shield className="w-4 h-4" />
            <span>100% Money-Back Guarantee If We Miss Your Deadline</span>
          </div>
        </div>

        {/* Headline — ROI-focused, result-driven */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            We Build <span className="gradient-text">Custom Software</span> That{" "}
            <span className="gradient-text-orange">Makes You Money</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Not just another app development company.{" "}
            <strong className="text-white">We&apos;ve generated ₹47Cr+ in revenue</strong> for clients through{" "}
            custom software, mobile apps & AI solutions.{" "}
            <span className="text-emerald-400 font-semibold">You talk to developers, not salespeople. You pay 50% less. You ship 3x faster.</span>
          </p>
        </div>

        {/* USP pills — result-focused */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { icon: MessageCircle, text: "Talk to Developers, Not Salespeople" },
            { icon: IndianRupee, text: "50% Less Than US/UK Agencies" },
            { icon: Bot, text: "AI-Powered = 3x Faster Delivery" },
          ].map((usp) => (
            <div key={usp.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
              <usp.icon className="w-4 h-4 text-indigo-400" />
              {usp.text}
            </div>
          ))}
        </div>

        {/* CTAs — urgency + specific */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => openModal()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer"
          >
            Get Free Prototype in 48 Hours
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#case-studies" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-all">
            <Play className="w-4 h-4" />
            See Results We&apos;ve Delivered
          </a>
        </div>

        {/* Trust line — guarantee focused */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-zinc-500">
          {["Money-back deadline guarantee", "Free prototype before you pay", "NDA from day one", "You own 100% of the code"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── INFINITE SLIDING PRODUCT SHOWCASE ─────────── */}
      <div
       
       
       
        className="relative mt-16 lg:mt-20"
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Sliding row */}
        <div className="overflow-hidden">
          <div className="flex gap-4 py-2 animate-marquee">
            {doubledCards.map((card, i) => (
              <ProductCard key={`${card.title}-${i}`} card={card} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
