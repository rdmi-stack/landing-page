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
import { motion } from "framer-motion";
import { useModal } from "./ModalProvider";

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50%", label: "Cost Savings" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "48hr", label: "First Prototype" },
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
    metrics: [{ label: "Revenue", value: "$48.2K" }, { label: "Users", value: "12.4K" }],
    chart: [35, 50, 42, 65, 58, 72, 85],
  },
  {
    title: "E-Commerce App",
    icon: ShoppingCart,
    gradient: "from-emerald-500 to-green-600",
    color: "#10b981",
    metrics: [{ label: "Orders", value: "2,847" }, { label: "GMV", value: "₹18L" }],
    chart: [20, 35, 30, 55, 48, 60, 75],
  },
  {
    title: "AI Agent Platform",
    icon: Bot,
    gradient: "from-purple-500 to-violet-600",
    color: "#8b5cf6",
    metrics: [{ label: "Resolved", value: "94%" }, { label: "Avg Time", value: "1.2s" }],
    chart: [40, 55, 60, 70, 65, 80, 92],
  },
  {
    title: "FinTech Wallet",
    icon: Wallet,
    gradient: "from-amber-500 to-orange-600",
    color: "#f59e0b",
    metrics: [{ label: "Txns", value: "58K" }, { label: "Volume", value: "₹2.1Cr" }],
    chart: [30, 45, 55, 50, 65, 78, 88],
  },
  {
    title: "Healthcare App",
    icon: Stethoscope,
    gradient: "from-rose-500 to-pink-600",
    color: "#f43f5e",
    metrics: [{ label: "Patients", value: "8,200" }, { label: "Consults", value: "340/day" }],
    chart: [25, 40, 35, 50, 60, 55, 70],
  },
  {
    title: "EdTech LMS",
    icon: GraduationCap,
    gradient: "from-cyan-500 to-teal-600",
    color: "#06b6d4",
    metrics: [{ label: "Students", value: "25K" }, { label: "Courses", value: "180" }],
    chart: [20, 30, 45, 40, 55, 65, 80],
  },
  {
    title: "PropTech CRM",
    icon: Home,
    gradient: "from-sky-500 to-blue-600",
    color: "#0ea5e9",
    metrics: [{ label: "Listings", value: "4,500" }, { label: "Leads", value: "890" }],
    chart: [35, 42, 38, 55, 62, 58, 75],
  },
  {
    title: "Logistics Fleet",
    icon: Truck,
    gradient: "from-lime-500 to-green-600",
    color: "#84cc16",
    metrics: [{ label: "Vehicles", value: "320" }, { label: "On-time", value: "97.2%" }],
    chart: [50, 55, 60, 58, 70, 75, 85],
  },
  {
    title: "HR & Payroll",
    icon: Users,
    gradient: "from-fuchsia-500 to-purple-600",
    color: "#d946ef",
    metrics: [{ label: "Employees", value: "1,200" }, { label: "Payroll", value: "₹4.8Cr" }],
    chart: [40, 45, 50, 55, 52, 65, 72],
  },
  {
    title: "Mobile Super App",
    icon: Smartphone,
    gradient: "from-red-500 to-rose-600",
    color: "#ef4444",
    metrics: [{ label: "Downloads", value: "120K" }, { label: "DAU", value: "28K" }],
    chart: [15, 30, 45, 55, 65, 78, 90],
  },
  {
    title: "RAG Knowledge Base",
    icon: Brain,
    gradient: "from-violet-500 to-indigo-600",
    color: "#7c3aed",
    metrics: [{ label: "Docs", value: "50K" }, { label: "Accuracy", value: "96%" }],
    chart: [45, 50, 58, 62, 70, 78, 95],
  },
  {
    title: "Workflow Engine",
    icon: Workflow,
    gradient: "from-teal-500 to-emerald-600",
    color: "#14b8a6",
    metrics: [{ label: "Automations", value: "2,400" }, { label: "Saved", value: "180hr/mo" }],
    chart: [30, 40, 50, 55, 68, 75, 82],
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    gradient: "from-slate-500 to-zinc-600",
    color: "#64748b",
    metrics: [{ label: "Threats", value: "0" }, { label: "Uptime", value: "99.99%" }],
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
          <p className="text-[9px] text-zinc-600">Live Preview</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400/80">Live</span>
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
  const cardWidth = 260 + 16; // card width + gap
  const totalWidth = showcaseCards.length * cardWidth;

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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm">
            <Bot className="w-4 h-4" />
            <span>AI-Powered Development Team</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Custom Software Development{" "}
            <span className="gradient-text">That Actually</span>{" "}
            <span className="gradient-text-orange">Ships</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            India&apos;s premier AI-powered development team. Custom web applications, mobile apps
            & SaaS platforms — talk directly to developers, no middlemen.{" "}
            <span className="text-white font-medium">Save 50% with our AI-first approach.</span>
          </p>
        </motion.div>

        {/* USP pills */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            { icon: MessageCircle, text: "Talk to Developers Directly" },
            { icon: IndianRupee, text: "Save 50% Development Cost" },
            { icon: Bot, text: "AI-Powered Development Team" },
          ].map((usp) => (
            <div key={usp.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
              <usp.icon className="w-4 h-4 text-indigo-400" />
              {usp.text}
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => openModal()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#case-studies" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-all">
            <Play className="w-4 h-4" />
            See Our Work
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-zinc-500">
          {["No upfront payment", "Free consultation", "NDA protected", "100% source code ownership"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── INFINITE SLIDING PRODUCT SHOWCASE ─────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative mt-16 lg:mt-20"
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        {/* Sliding row */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 py-2"
            animate={{ x: [0, -totalWidth] }}
            transition={{
              x: {
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {doubledCards.map((card, i) => (
              <ProductCard key={`${card.title}-${i}`} card={card} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
