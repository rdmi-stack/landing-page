"use client";

import Image from "next/image";
import { Shield } from "lucide-react";

const projects = [
  {
    tag: "🧳 Travel AI",
    title: "AI Booking Engine That Sells Trips While You Sleep",
    description: "Clook-like platform — AI builds personalized itineraries in 30 seconds, auto-negotiates vendor rates, processes payments 24/7. Zero human intervention. Your travel business runs on autopilot.",
    tech: ["Next.js", "Node.js", "OpenAI", "Stripe", "AWS"],
    timeline: "Delivered: 16 wks",
    gradient: "from-sky-600 to-blue-600",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  },
  {
    tag: "🏥 Healthcare",
    title: "VitalPay — RCM That Recovers ₹Crores in Lost Claims",
    description: "AI-powered denial management catches 92% of claim errors BEFORE submission. Auto-billing, insurance reconciliation, patient payment portal. Healthcare payments — finally intelligent.",
    tech: ["React", "Python", "PostgreSQL", "Stripe", "GCP"],
    timeline: "Delivered: 20 wks",
    gradient: "from-rose-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    tag: "🎫 Events",
    title: "QuiteLoud — Ticketing That Maximizes Every Seat's Revenue",
    description: "AI dynamic pricing fills 40% more seats at 25% higher revenue. QR instant entry, real-time crowd analytics, multi-venue scaling. Event organizers stop guessing, start profiting.",
    tech: ["Next.js", "Node.js", "Redis", "Razorpay", "AWS"],
    timeline: "Delivered: 14 wks",
    gradient: "from-purple-600 to-violet-600",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    tag: "🌍 NGO Impact",
    title: "GraffitiAid — Every Donation Tracked. Every Rupee Accountable.",
    description: "AI donor matching, auto tax receipts, impact dashboards that SHOW donors where their money went. Multi-currency. Volunteer coordination. Transparency that doubles repeat donations.",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Vercel"],
    timeline: "Delivered: 10 wks",
    gradient: "from-emerald-600 to-green-600",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
  },
  {
    tag: "🤖 AI Agent",
    title: "RAG Knowledge Base — Your Entire Company Brain, Queryable",
    description: "50K+ documents searchable in plain English. AI assistant answers in 3 seconds what used to take 30 minutes. Slack/Teams integrated. Zero hallucination — grounded in YOUR data only.",
    tech: ["Python", "LangChain", "Pinecone", "OpenAI", "Next.js"],
    timeline: "Delivered: 8 wks",
    gradient: "from-indigo-600 to-blue-600",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    tag: "💰 FinTech",
    title: "AI Lending Platform — Approve Loans in 90 Seconds, Not 9 Days",
    description: "ML credit scoring replaces 2 weeks of manual underwriting. Auto KYC, instant disbursement, smart EMI collection, compliance-ready. Bad loan rate dropped 60% for our client.",
    tech: ["React Native", "Django", "TensorFlow", "AWS", "PostgreSQL"],
    timeline: "Delivered: 20 wks",
    gradient: "from-orange-600 to-red-600",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
  },
  {
    tag: "🛒 E-Commerce",
    title: "Marketplace That 4x'd Conversions with AI Recommendations",
    description: "AI-powered \"customers also bought\" engine increased AOV 35%. Smart search, vendor auto-onboarding, split payments, real-time inventory. Not just a store — a revenue machine.",
    tech: ["React", "Python", "MongoDB", "Redis", "Razorpay"],
    timeline: "Delivered: 16 wks",
    gradient: "from-amber-600 to-yellow-600",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    tag: "🚛 Logistics",
    title: "Fleet AI — Saved ₹1.2Cr/Year in Fuel with Route Intelligence",
    description: "ML route optimization cuts 23% fuel costs. Real-time GPS, AI-predicted ETAs, driver scoring, proof-of-delivery, multi-depot. Your fleet runs smarter, not harder.",
    tech: ["React", "Go", "PostgreSQL", "Redis", "AWS"],
    timeline: "Delivered: 14 wks",
    gradient: "from-teal-600 to-cyan-600",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    tag: "📚 EdTech",
    title: "AI Tutor That Teaches 10,000 Students Simultaneously",
    description: "Adaptive learning paths powered by AI — each student gets a personalized curriculum. AI chatbot answers doubts 24/7. Completion rates jumped from 12% to 68% post-launch.",
    tech: ["Next.js", "Node.js", "OpenAI", "PostgreSQL", "AWS"],
    timeline: "Delivered: 14 wks",
    gradient: "from-cyan-600 to-blue-600",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 lg:py-32 relative bg-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Guaranteed Delivery. AI-Ready. Revenue-Generating.
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Intelligent Apps That{" "}
            <span className="gradient-text">Run Your Business 24/7</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Not traditional apps. <strong className="text-white">AI-native platforms</strong> that sell, collect, optimize, and scale — while you sleep. Every project ships with AI built-in. Every deadline guaranteed.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mt-4">
            <Shield className="w-3 h-3 text-indigo-400" />
            All projects are NDA protected — no client names or data shared
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
             
             
             
             
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all overflow-hidden"
            >
              {/* Project image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white`}>
                    {project.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 text-[10px] text-zinc-300 bg-black/50 backdrop-blur-sm rounded-md border border-white/10">{project.timeline}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] text-zinc-400">NDA Protected</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold mb-2 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded bg-white/5 text-zinc-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
