"use client";

import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    tag: "SaaS Platform",
    title: "AI-Powered HR Management System",
    description: "Complete HRMS SaaS with AI-driven resume screening, automated payroll, attendance tracking & employee analytics dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
    timeline: "14 weeks",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    tag: "E-Commerce",
    title: "Multi-Vendor Marketplace Platform",
    description: "Custom marketplace with vendor onboarding, AI recommendations, payment gateway integration, real-time inventory & admin analytics.",
    tech: ["React", "Python", "MongoDB", "Redis", "Razorpay"],
    timeline: "16 weeks",
    gradient: "from-emerald-600 to-green-600",
  },
  {
    tag: "FinTech",
    title: "Digital Lending & Credit Platform",
    description: "End-to-end digital lending solution with KYC verification, ML credit scoring, loan management, EMI collection & compliance dashboard.",
    tech: ["React Native", "Django", "TensorFlow", "AWS", "PostgreSQL"],
    timeline: "20 weeks",
    gradient: "from-orange-600 to-red-600",
  },
  {
    tag: "Healthcare",
    title: "Telemedicine & Patient Management",
    description: "Video consultation platform with appointment booking, e-prescriptions, health records, lab integration & wearable sync.",
    tech: ["Flutter", "Node.js", "PostgreSQL", "WebRTC", "GCP"],
    timeline: "12 weeks",
    gradient: "from-rose-600 to-pink-600",
  },
  {
    tag: "AI Agent",
    title: "Custom RAG Knowledge Base System",
    description: "AI-powered internal knowledge system with document ingestion, semantic search, chat interface & CRM integration.",
    tech: ["Python", "LangChain", "Pinecone", "OpenAI", "Next.js"],
    timeline: "8 weeks",
    gradient: "from-purple-600 to-violet-600",
  },
  {
    tag: "Logistics",
    title: "Fleet Management & Route Optimization",
    description: "Real-time GPS tracking, route optimization, driver management, proof-of-delivery, analytics & multi-depot support.",
    tech: ["React", "Go", "PostgreSQL", "Redis", "AWS"],
    timeline: "14 weeks",
    gradient: "from-amber-600 to-yellow-600",
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 lg:py-32 relative bg-[#161616]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Custom Software Development Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            200+ Projects{" "}
            <span className="gradient-text">Delivered by Our Team</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Mobile app development, web applications, AI software & enterprise solutions — built under NDA for startups and enterprises worldwide.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mt-4">
            <Shield className="w-3 h-3 text-indigo-400" />
            All projects are NDA protected — no client names or data shared
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${project.gradient} text-white`}>
                    {project.tag}
                  </span>
                  <span className="text-[10px] text-zinc-600">{project.timeline}</span>
                </div>

                <h3 className="text-lg font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded bg-white/5 text-zinc-500">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
