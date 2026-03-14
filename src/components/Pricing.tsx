"use client";

import { Check, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useModal } from "./ModalProvider";

const plans = [
  {
    name: "MVP / Startup",
    description: "Perfect for startups validating an idea",
    price: "$3,000",
    priceNote: "starting from",
    duration: "4-8 weeks",
    features: [
      "Core feature development",
      "Responsive web or mobile app",
      "Basic admin dashboard",
      "3rd party integrations (up to 3)",
      "Cloud deployment (AWS/GCP)",
      "30 days post-launch support",
      "Source code ownership",
    ],
    cta: "Start MVP Project",
    popular: false,
  },
  {
    name: "Growth / Scale",
    description: "For growing companies building serious products",
    price: "$8,000",
    priceNote: "starting from",
    duration: "8-16 weeks",
    features: [
      "Everything in MVP, plus:",
      "Advanced features & AI integration",
      "Custom UI/UX design",
      "Multi-role admin panel",
      "Payment gateway integration",
      "CI/CD pipeline setup",
      "60 days post-launch support",
      "Dedicated dev team (2-4 devs)",
    ],
    cta: "Start Growth Project",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For enterprises needing custom solutions at scale",
    price: "Custom",
    priceNote: "tailored pricing",
    duration: "Ongoing",
    features: [
      "Everything in Growth, plus:",
      "Microservices architecture",
      "Enterprise security & compliance",
      "AI/ML model development",
      "Dedicated project team (4-8 devs)",
      "24/7 support & monitoring",
      "SLA guaranteed uptime",
      "On-demand scaling",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const { openModal } = useModal();

  return (
    <section id="pricing" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Software Development Cost{" "}
            <span className="gradient-text">That Makes Sense</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            No hidden fees. No surprise invoices. Fixed-price projects or flexible hourly engagement
            — you choose what works best.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo-500/10 to-purple-500/5 border-2 border-indigo-500/30 scale-[1.02] lg:scale-105"
                  : "bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-zinc-500 text-sm ml-2">{plan.priceNote}</span>
                <div className="text-xs text-zinc-600 mt-1">Timeline: {plan.duration}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={openModal}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/25"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Hourly rates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <span className="text-sm text-zinc-400">
              Prefer hourly? Senior developers at{" "}
              <span className="text-white font-semibold">$40-80/hr</span>
              <span className="text-zinc-600"> (vs $150-250/hr US/UK)</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
