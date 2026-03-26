"use client";

import Image from "next/image";
import { Shield } from "lucide-react";

const projects = [
  {
    tag: "SaaS Platform",
    title: "AI-Powered HR Management System",
    description: "Complete HRMS SaaS with AI-driven resume screening, automated payroll, attendance tracking & employee analytics dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
    timeline: "14 weeks",
    gradient: "from-blue-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    tag: "E-Commerce",
    title: "Multi-Vendor Marketplace Platform",
    description: "Custom marketplace with vendor onboarding, AI recommendations, payment gateway integration, real-time inventory & admin analytics.",
    tech: ["React", "Python", "MongoDB", "Redis", "Razorpay"],
    timeline: "16 weeks",
    gradient: "from-emerald-600 to-green-600",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    tag: "FinTech",
    title: "Digital Lending & Credit Platform",
    description: "End-to-end digital lending solution with KYC verification, ML credit scoring, loan management, EMI collection & compliance dashboard.",
    tech: ["React Native", "Django", "TensorFlow", "AWS", "PostgreSQL"],
    timeline: "20 weeks",
    gradient: "from-orange-600 to-red-600",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
  },
  {
    tag: "Healthcare",
    title: "Telemedicine & Patient Management",
    description: "Video consultation platform with appointment booking, e-prescriptions, health records, lab integration & wearable sync.",
    tech: ["Flutter", "Node.js", "PostgreSQL", "WebRTC", "GCP"],
    timeline: "12 weeks",
    gradient: "from-rose-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    tag: "AI Agent",
    title: "Custom RAG Knowledge Base System",
    description: "AI-powered internal knowledge system with document ingestion, semantic search, chat interface & CRM integration.",
    tech: ["Python", "LangChain", "Pinecone", "OpenAI", "Next.js"],
    timeline: "8 weeks",
    gradient: "from-purple-600 to-violet-600",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    tag: "Logistics",
    title: "Fleet Management & Route Optimization",
    description: "Real-time GPS tracking, route optimization, driver management, proof-of-delivery, analytics & multi-depot support.",
    tech: ["React", "Go", "PostgreSQL", "Redis", "AWS"],
    timeline: "14 weeks",
    gradient: "from-amber-600 to-yellow-600",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
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
