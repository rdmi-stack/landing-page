"use client";

import { ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const caseStudies = [
  {
    tag: "SaaS Platform",
    title: "AI-Powered HR Management Platform",
    description:
      "Built a complete HRMS SaaS with AI-driven resume screening, automated payroll, attendance tracking, and employee analytics dashboard. Scaled to 10,000+ users.",
    metrics: [
      { label: "Dev Cost Saved", value: "52%" },
      { label: "Time to Market", value: "14 weeks" },
      { label: "Active Users", value: "10K+" },
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "AWS"],
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    tag: "E-Commerce",
    title: "Multi-Vendor Marketplace with AI Recommendations",
    description:
      "Custom marketplace with 500+ vendors, AI-powered product recommendations, Razorpay/Stripe payments, real-time inventory management, and admin analytics.",
    metrics: [
      { label: "Revenue Increase", value: "340%" },
      { label: "Vendors Onboarded", value: "500+" },
      { label: "Orders/Month", value: "50K+" },
    ],
    tech: ["React", "Python", "MongoDB", "Redis", "Razorpay"],
    gradient: "from-emerald-600 to-green-600",
  },
  {
    tag: "FinTech",
    title: "Digital Lending Platform for NBFCs",
    description:
      "End-to-end digital lending solution with KYC verification, credit scoring ML model, loan management, EMI collection, and regulatory compliance dashboard.",
    metrics: [
      { label: "Loan Processing", value: "3x faster" },
      { label: "Default Rate Drop", value: "28%" },
      { label: "Loans Processed", value: "₹50Cr+" },
    ],
    tech: ["React Native", "Django", "TensorFlow", "AWS", "PostgreSQL"],
    gradient: "from-orange-600 to-red-600",
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
            Case Studies
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Real Projects.{" "}
            <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            See how we&apos;ve helped startups and enterprises build software that drives growth.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all overflow-hidden"
            >
              {/* Gradient header */}
              <div
                className={`h-2 bg-gradient-to-r ${study.gradient}`}
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${study.gradient} text-white`}
                  >
                    {study.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-300 transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-6">{study.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {study.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <div className="flex items-center justify-center gap-1 text-emerald-400 text-sm font-bold">
                        <TrendingUp className="w-3 h-3" />
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-zinc-600 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {study.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded bg-white/5 text-zinc-500"
                    >
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
