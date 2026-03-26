"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  IndianRupee,
  Bot,
  Shield,
  Play,
} from "lucide-react";
import { useModal } from "@/components/ModalProvider";
import Footer from "@/components/Footer";
import type { KeywordGroup } from "@/data/keyword-groups";

export default function KeywordLandingPage({ data }: { data: KeywordGroup }) {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-16 pb-10 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium">
              <Shield className="w-4 h-4" />
              {data.hero.badge}
            </div>
          </div>

          {/* H1 */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              {data.hero.h1}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              {data.hero.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
              onClick={() => openModal(data.primaryKeyword)}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer"
            >
              {data.hero.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#services" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full border border-white/10 hover:bg-white/5 transition-all">
              <Play className="w-4 h-4" />
              {data.hero.cta2}
            </a>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-zinc-500">
            {data.hero.trustPoints.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-20 lg:py-28 relative bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {data.primaryKeyword} Services
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              What We <span className="gradient-text">Deliver</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.services.map((service) => (
              <div
                key={service.title}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-zinc-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USPs ─── */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Why Clients Choose <span className="gradient-text">RDMI</span>
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { icon: MessageCircle, title: "Talk to Developers Directly", text: data.uspHeadlines.direct, gradient: "from-blue-500 to-indigo-600" },
              { icon: IndianRupee, title: "Save 50% Development Cost", text: data.uspHeadlines.cost, gradient: "from-emerald-500 to-green-600" },
              { icon: Bot, title: "AI-Powered = 3x Faster", text: data.uspHeadlines.ai, gradient: "from-purple-500 to-violet-600" },
            ].map((usp) => (
              <div key={usp.title} className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${usp.gradient} flex items-center justify-center flex-shrink-0`}>
                  <usp.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{usp.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{usp.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28 relative bg-[#161616]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {data.primaryKeyword} FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Questions <span className="gradient-text">Answered</span>
            </h2>
          </div>

          <div className="space-y-3">
            {data.faq.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {data.ctaSection.headline}
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              {data.ctaSection.subtitle}
            </p>
          </div>

          <button
            onClick={() => openModal(data.primaryKeyword)}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 cursor-pointer"
          >
            {data.ctaSection.buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            {["₹0 upfront", "You own 100% of code", "NDA from day one", "Money-back deadline guarantee"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
