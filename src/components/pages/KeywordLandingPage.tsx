"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  IndianRupee,
  Bot,
  Shield,
  Play,
  Mail,
  Phone,
} from "lucide-react";
import { useModal } from "@/components/ModalProvider";
import AIQuoteModal from "@/components/AIQuoteModal";
import AICapabilities from "@/components/AICapabilities";
import Footer from "@/components/Footer";
import type { KeywordGroup } from "@/data/keyword-groups";

export default function KeywordLandingPage({ data }: { data: KeywordGroup }) {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const isAIPage = data.slug.includes("ai-agent") || data.slug === "ai-software-development";
  const handleCTA = () => {
    if (isAIPage) {
      setAiModalOpen(true);
    } else {
      openModal(data.primaryKeyword);
    }
  };

  return (
    <>
      {/* ─── HERO WITH BACKGROUND IMAGE ─── */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src={data.images.hero}
            alt={data.primaryKeyword}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium backdrop-blur-sm">
              <Shield className="w-4 h-4" />
              {data.hero.badge}
            </div>
          </div>

          {/* H1 */}
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              {data.hero.h1}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              {data.hero.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
              onClick={handleCTA}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer"
            >
              {data.hero.cta1}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#services" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-full border border-white/20 hover:bg-white/5 backdrop-blur-sm transition-all">
              <Play className="w-4 h-4" />
              {data.hero.cta2}
            </a>
          </div>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-sm text-zinc-400">
            {data.hero.trustPoints.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 relative bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES WITH IMAGES ─── */}
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

          <div className="grid lg:grid-cols-2 gap-6">
            {data.services.map((service, i) => (
              <div
                key={service.title}
                className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                {/* Service image */}
                {data.images.services[i % data.images.services.length] && (
                  <div className="relative w-full sm:w-40 h-32 sm:h-auto rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={data.images.services[i % data.images.services.length]}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-3">{service.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-zinc-500 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI CAPABILITIES ─── */}
      <AICapabilities />

      {/* ─── HOW WE WORK (Process with Image) ─── */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Process image */}
            <div className="flex-1 w-full max-w-lg">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src={data.images.process}
                  alt={`${data.primaryKeyword} process`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-semibold text-emerald-400">Preview Before You Pay</p>
                  <p className="text-xs text-zinc-400 mt-1">Free clickable prototype in 48 hours — zero commitment</p>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="flex-1 space-y-4">
              <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                Our Process
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold">
                From Idea to <span className="gradient-text">Revenue</span> in 4 Steps
              </h2>

              <div className="space-y-4 mt-6">
                {data.process.map((step) => (
                  <div key={step.step} className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/20 transition-all">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-0.5">{step.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── USPs WITH TEAM IMAGE ─── */}
      <section className="py-20 lg:py-28 relative bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Why Clients Choose <span className="gradient-text">RDMI</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Team image */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden aspect-[3/4] hidden lg:block">
              <Image
                src={data.images.team}
                alt="RDMI development team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-sm font-bold text-white">Senior Developers Only</p>
                <p className="text-xs text-zinc-300">5+ years avg experience</p>
              </div>
            </div>

            {/* USP cards */}
            <div className="lg:col-span-3 space-y-5">
              {[
                { icon: MessageCircle, title: "Talk to Developers Directly", text: data.uspHeadlines.direct, gradient: "from-blue-500 to-indigo-600" },
                { icon: IndianRupee, title: "Guaranteed 50% Cost Savings", text: data.uspHeadlines.cost, gradient: "from-emerald-500 to-green-600" },
                { icon: Bot, title: "AI-Powered = 3x Faster", text: data.uspHeadlines.ai, gradient: "from-purple-500 to-violet-600" },
              ].map((usp) => (
                <div key={usp.title} className="flex items-start gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/20 transition-all">
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
        </div>
      </section>

      {/* ─── PORTFOLIO GALLERY ─── */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Our Work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Projects We&apos;ve <span className="gradient-text">Delivered</span>
            </h2>
            <p className="mt-3 text-zinc-500 text-sm">
              All projects are NDA protected — showing architecture and approach, not client data
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {data.images.portfolio.map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-video group cursor-pointer" onClick={handleCTA}>
                <Image
                  src={img}
                  alt={`${data.primaryKeyword} project ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-indigo-400" />
                    <span className="text-xs text-zinc-300">NDA Protected</span>
                  </div>
                  <p className="text-sm font-semibold mt-1">{data.primaryKeyword} Project</p>
                  <p className="text-xs text-indigo-400 mt-1 group-hover:underline">Get similar quote →</p>
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

      {/* ─── CTA WITH BACKGROUND IMAGE ─── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.images.cta}
            alt="Get started"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/85 backdrop-blur-sm" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {data.ctaSection.headline}
            </h2>
            <p className="mt-4 text-zinc-300 text-lg max-w-2xl mx-auto">
              {data.ctaSection.subtitle}
            </p>
          </div>

          <button
            onClick={handleCTA}
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 cursor-pointer"
          >
            {data.ctaSection.buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
            {["₹0 upfront", "You own 100% of code", "NDA from day one", "Money-back deadline guarantee"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          {/* Direct contact */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <a href="mailto:info@rdmi.in" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" /> info@rdmi.in
            </a>
            <a href="https://wa.me/919818565561" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> +91 98185 65561
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Quote Modal — only rendered on AI pages */}
      {isAIPage && (
        <AIQuoteModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          productName={data.primaryKeyword}
        />
      )}
    </>
  );
}
