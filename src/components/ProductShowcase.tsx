"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Brain,
  ShoppingCart,
  Smartphone,
  Building2,
  Users,
  GraduationCap,
  Truck,
  Stethoscope,
  Home,
  Wallet,
  BarChart3,
  FileText,
  Shield,
  Zap,
  Globe,
  MessageSquare,
  Video,
  Clock,
  Layers,
  Database,
  Cloud,
  Mic,
  Eye,
  Workflow,
  CreditCard,
  Package,
  Sparkles,
  Code2,
  Megaphone,
  Leaf,
  Car,
  Utensils,
  Heart,
  Fingerprint,
  ScanLine,
  Network,
  type LucideIcon,
} from "lucide-react";
import { useModal } from "./ModalProvider";

const categories = [
  "All",
  "AI & Agents",
  "SaaS Platforms",
  "E-Commerce",
  "Mobile Apps",
  "FinTech & Blockchain",
  "Industry Solutions",
  "Enterprise & Automation",
];

interface Product {
  name: string;
  description: string;
  category: string;
  icon: LucideIcon;
  price: string;
  popular?: boolean;
  trending?: boolean;
}

const products: Product[] = [
  // ─── AI & AGENTS (10) ────────────────────────────────────────
  {
    name: "Custom AI Agent Platform",
    description: "Autonomous AI agents that handle customer support, sales outreach, and back-office tasks 24/7",
    category: "AI & Agents",
    icon: Bot,
    price: "₹4L – ₹15L",
    popular: true,
    trending: true,
  },
  {
    name: "RAG Knowledge Base",
    description: "AI-powered internal knowledge system with document ingestion, semantic search & chat interface",
    category: "AI & Agents",
    icon: Brain,
    price: "₹3L – ₹10L",
    popular: true,
    trending: true,
  },
  {
    name: "AI Copilot for SaaS",
    description: "Embed an AI assistant inside your SaaS product — contextual help, auto-fill, smart suggestions",
    category: "AI & Agents",
    icon: Sparkles,
    price: "₹3L – ₹8L",
    trending: true,
  },
  {
    name: "AI Document Processing (IDP)",
    description: "Extract data from invoices, contracts, receipts using OCR + LLM classification pipelines",
    category: "AI & Agents",
    icon: ScanLine,
    price: "₹3L – ₹10L",
    popular: true,
  },
  {
    name: "AI Content Generation Engine",
    description: "Multi-modal content platform — blog, social, video scripts, images with brand voice training",
    category: "AI & Agents",
    icon: FileText,
    price: "₹2L – ₹6L",
  },
  {
    name: "Voice AI & Call Center Bot",
    description: "AI voice agent for inbound/outbound calls with natural speech, multilingual & CRM sync",
    category: "AI & Agents",
    icon: Mic,
    price: "₹4L – ₹12L",
    trending: true,
  },
  {
    name: "Computer Vision Platform",
    description: "Object detection, defect inspection, face recognition & video analytics for manufacturing/retail",
    category: "AI & Agents",
    icon: Eye,
    price: "₹5L – ₹15L",
  },
  {
    name: "Predictive Analytics Dashboard",
    description: "ML-powered forecasting for sales, churn, demand & inventory with interactive visualizations",
    category: "AI & Agents",
    icon: BarChart3,
    price: "₹3L – ₹10L",
    popular: true,
  },
  {
    name: "AI Recruitment & HR Screening",
    description: "Resume parsing, candidate scoring, interview scheduling & skill-gap analysis with AI",
    category: "AI & Agents",
    icon: Users,
    price: "₹2L – ₹7L",
  },
  {
    name: "AI-Powered Recommendation Engine",
    description: "Personalized product, content & service recommendations using collaborative + deep learning",
    category: "AI & Agents",
    icon: Network,
    price: "₹3L – ₹8L",
  },

  // ─── SaaS PLATFORMS (9) ──────────────────────────────────────
  {
    name: "Multi-Tenant SaaS Starter Kit",
    description: "Auth, billing, teams, API keys, admin panel, webhooks — launch your SaaS in weeks not months",
    category: "SaaS Platforms",
    icon: Layers,
    price: "₹2L – ₹5L",
    popular: true,
    trending: true,
  },
  {
    name: "Custom CRM Platform",
    description: "Lead tracking, sales pipeline, contact management, email sequences & reporting dashboard",
    category: "SaaS Platforms",
    icon: Users,
    price: "₹3L – ₹8L",
    popular: true,
  },
  {
    name: "Project Management Tool",
    description: "Kanban boards, Gantt charts, time tracking, resource allocation & client portal",
    category: "SaaS Platforms",
    icon: Workflow,
    price: "₹2.5L – ₹7L",
  },
  {
    name: "HR & Payroll Management System",
    description: "Recruitment, onboarding, attendance, payroll, leave management & employee self-service",
    category: "SaaS Platforms",
    icon: Building2,
    price: "₹3L – ₹10L",
    popular: true,
  },
  {
    name: "Learning Management System (LMS)",
    description: "Course builder, live classes, quizzes, certificates, progress tracking & cohort-based learning",
    category: "SaaS Platforms",
    icon: GraduationCap,
    price: "₹3L – ₹8L",
    popular: true,
  },
  {
    name: "Helpdesk & Ticketing Platform",
    description: "Omnichannel support — email, chat, WhatsApp, social. AI auto-routing, SLA tracking & knowledge base",
    category: "SaaS Platforms",
    icon: MessageSquare,
    price: "₹2L – ₹6L",
  },
  {
    name: "Subscription Billing Platform",
    description: "Recurring payments, usage metering, dunning, plan management & revenue analytics",
    category: "SaaS Platforms",
    icon: CreditCard,
    price: "₹2.5L – ₹7L",
  },
  {
    name: "Inventory & Warehouse Management",
    description: "Stock tracking, barcode/QR scanning, purchase orders, multi-warehouse & supplier management",
    category: "SaaS Platforms",
    icon: Package,
    price: "₹2.5L – ₹7L",
  },
  {
    name: "No-Code App Builder Platform",
    description: "Drag-and-drop app builder with database, workflows, API integrations & custom domains",
    category: "SaaS Platforms",
    icon: Code2,
    price: "₹5L – ₹15L",
    trending: true,
  },

  // ─── E-COMMERCE (7) ──────────────────────────────────────────
  {
    name: "Headless E-Commerce Store",
    description: "Next.js storefront with headless CMS, blazing-fast performance, SEO-optimized & Razorpay/Stripe",
    category: "E-Commerce",
    icon: ShoppingCart,
    price: "₹2L – ₹6L",
    popular: true,
  },
  {
    name: "Multi-Vendor Marketplace",
    description: "Vendor onboarding, commission engine, split payments, reviews & admin analytics dashboard",
    category: "E-Commerce",
    icon: Globe,
    price: "₹5L – ₹15L",
    popular: true,
  },
  {
    name: "B2B Wholesale Portal",
    description: "Bulk ordering, tiered pricing, credit limits, RFQ system & dealer management for manufacturers",
    category: "E-Commerce",
    icon: Building2,
    price: "₹3L – ₹10L",
  },
  {
    name: "Quick Commerce / Grocery App",
    description: "10-min delivery app with real-time tracking, slot booking, inventory sync & dark store management",
    category: "E-Commerce",
    icon: Utensils,
    price: "₹4L – ₹12L",
    trending: true,
  },
  {
    name: "Social Commerce Platform",
    description: "Instagram-style shoppable feeds, live selling, influencer storefronts & UGC integration",
    category: "E-Commerce",
    icon: Megaphone,
    price: "₹4L – ₹10L",
    trending: true,
  },
  {
    name: "Digital Products Marketplace",
    description: "Sell courses, templates, SaaS tools, APIs with instant delivery, licensing & creator payouts",
    category: "E-Commerce",
    icon: Zap,
    price: "₹2L – ₹5L",
  },
  {
    name: "Subscription Box Platform",
    description: "Recurring orders, box customization, trial management & churn analytics for D2C brands",
    category: "E-Commerce",
    icon: Package,
    price: "₹2L – ₹5L",
  },

  // ─── MOBILE APPS (8) ────────────────────────────────────────
  {
    name: "Super App (Multi-Service)",
    description: "Ride, food, grocery, payments, services — all in one app. Modular architecture for rapid scaling",
    category: "Mobile Apps",
    icon: Smartphone,
    price: "₹10L – ₹30L",
    popular: true,
    trending: true,
  },
  {
    name: "Food Delivery App",
    description: "Restaurant discovery, real-time order tracking, rider app, loyalty rewards & kitchen dashboard",
    category: "Mobile Apps",
    icon: Utensils,
    price: "₹4L – ₹12L",
    popular: true,
  },
  {
    name: "Telemedicine & Health App",
    description: "Video consultations, AI symptom checker, e-prescriptions, health records & wearable sync",
    category: "Mobile Apps",
    icon: Stethoscope,
    price: "₹4L – ₹12L",
    trending: true,
  },
  {
    name: "On-Demand Home Services App",
    description: "Book plumbers, electricians, cleaners — real-time tracking, payments, ratings & provider app",
    category: "Mobile Apps",
    icon: Home,
    price: "₹3L – ₹10L",
    popular: true,
  },
  {
    name: "Ride-Sharing & Taxi App",
    description: "Ride booking, driver matching, surge pricing, in-app navigation, wallet & safety features",
    category: "Mobile Apps",
    icon: Car,
    price: "₹5L – ₹15L",
  },
  {
    name: "Fitness & Wellness App",
    description: "AI workout plans, video classes, progress tracking, meal planning & wearable integration",
    category: "Mobile Apps",
    icon: Heart,
    price: "₹2L – ₹6L",
  },
  {
    name: "Dating & Social Discovery App",
    description: "AI-powered matching, video profiles, safety verification, events & community features",
    category: "Mobile Apps",
    icon: Heart,
    price: "₹3L – ₹10L",
  },
  {
    name: "Event & Ticketing App",
    description: "Event discovery, seat selection, QR tickets, live streaming, payments & organizer tools",
    category: "Mobile Apps",
    icon: Video,
    price: "₹2.5L – ₹7L",
  },

  // ─── FINTECH & BLOCKCHAIN (5) ───────────────────────────────
  {
    name: "Digital Wallet & Payments App",
    description: "UPI, cards, bank transfer, bill payments, P2P lending, KYC/AML compliance & rewards",
    category: "FinTech & Blockchain",
    icon: Wallet,
    price: "₹5L – ₹15L",
    popular: true,
    trending: true,
  },
  {
    name: "Lending & Credit Platform",
    description: "Loan origination, AI credit scoring, KYC automation, EMI management & collections dashboard",
    category: "FinTech & Blockchain",
    icon: CreditCard,
    price: "₹5L – ₹15L",
    trending: true,
  },
  {
    name: "Investment & Trading Platform",
    description: "Stocks, mutual funds, crypto trading with real-time data, portfolio analytics & robo-advisory",
    category: "FinTech & Blockchain",
    icon: BarChart3,
    price: "₹8L – ₹25L",
  },
  {
    name: "Tokenization & Digital Assets",
    description: "Real estate, art, equity tokenization with smart contracts, compliance & investor dashboard",
    category: "FinTech & Blockchain",
    icon: Shield,
    price: "₹5L – ₹20L",
    trending: true,
  },
  {
    name: "InsurTech Platform",
    description: "Policy comparison, AI underwriting, instant claims processing, agent portal & renewals automation",
    category: "FinTech & Blockchain",
    icon: Shield,
    price: "₹5L – ₹15L",
  },

  // ─── INDUSTRY SOLUTIONS (6) ─────────────────────────────────
  {
    name: "Hospital & Clinic Management",
    description: "Patient records, appointments, billing, pharmacy, lab reports & telemedicine integration",
    category: "Industry Solutions",
    icon: Stethoscope,
    price: "₹5L – ₹15L",
    popular: true,
  },
  {
    name: "Real Estate PropTech Platform",
    description: "Listings, 3D virtual tours, AI valuation, CRM, lead scoring & broker management",
    category: "Industry Solutions",
    icon: Home,
    price: "₹3L – ₹10L",
  },
  {
    name: "Logistics & Fleet Management",
    description: "Route optimization, GPS tracking, proof-of-delivery, driver management & analytics",
    category: "Industry Solutions",
    icon: Truck,
    price: "₹4L – ₹12L",
    popular: true,
  },
  {
    name: "EdTech School/Institute ERP",
    description: "Admissions, fee collection, timetable, exams, parent app & AI-powered learning analytics",
    category: "Industry Solutions",
    icon: GraduationCap,
    price: "₹3L – ₹10L",
  },
  {
    name: "AgriTech / Farm Management",
    description: "Crop monitoring, IoT sensor dashboards, marketplace, weather forecasting & supply chain tracking",
    category: "Industry Solutions",
    icon: Leaf,
    price: "₹3L – ₹10L",
    trending: true,
  },
  {
    name: "EV Charging Network Platform",
    description: "Station finder, booking, payment, fleet management & energy analytics for EV infrastructure",
    category: "Industry Solutions",
    icon: Zap,
    price: "₹4L – ₹12L",
    trending: true,
  },

  // ─── ENTERPRISE & AUTOMATION (5) ────────────────────────────
  {
    name: "Workflow Automation Platform",
    description: "Visual builder, triggers, approvals, API integrations — automate any business process",
    category: "Enterprise & Automation",
    icon: Workflow,
    price: "₹3L – ₹10L",
    popular: true,
    trending: true,
  },
  {
    name: "Business Intelligence Dashboard",
    description: "Real-time KPIs, data connectors, custom reports, alerts & AI-generated insights",
    category: "Enterprise & Automation",
    icon: BarChart3,
    price: "₹3L – ₹10L",
  },
  {
    name: "Custom API & Integration Hub",
    description: "Connect 100+ tools — data transformation, rate limiting, monitoring & unified API layer",
    category: "Enterprise & Automation",
    icon: Database,
    price: "₹2L – ₹7L",
  },
  {
    name: "Cloud Migration & DevOps Setup",
    description: "AWS/GCP/Azure migration, CI/CD pipelines, Kubernetes, monitoring & infrastructure-as-code",
    category: "Enterprise & Automation",
    icon: Cloud,
    price: "₹2L – ₹8L",
  },
  {
    name: "Cybersecurity & Compliance Platform",
    description: "Threat detection, vulnerability scanning, GDPR/SOC2 compliance, audit trails & access management",
    category: "Enterprise & Automation",
    icon: Fingerprint,
    price: "₹4L – ₹12L",
    trending: true,
  },

];

export default function ProductShowcase() {
  const [active, setActive] = useState("All");
  const { openModal } = useModal();

  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="products" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What We Build
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            50+ Products Ready to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Build & Launch
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            From AI agents to fintech platforms — battle-tested architectures for 2025 and beyond.
            Click any product to get a free quote.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                active === cat
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {products.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.03, 0.5) }}
                onClick={() => openModal(product.name)}
                className="group relative p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
              >
                {/* Badges */}
                <div className="flex gap-1.5 absolute top-3 right-3">
                  {product.trending && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/20">
                      2025
                    </span>
                  )}
                  {product.popular && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                      Hot
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <product.icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base font-semibold mb-1.5 group-hover:text-indigo-300 transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2 hidden sm:block">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-400/80">{product.price}</span>
                  <span className="text-[10px] text-zinc-600 group-hover:text-indigo-400 transition-colors">
                    Get Quote →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 text-sm mb-4">
            Don&apos;t see your product? We build custom solutions for any industry.
          </p>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 text-sm font-medium transition-all"
          >
            <Clock className="w-4 h-4 text-indigo-400" />
            Request Custom Product Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
}
