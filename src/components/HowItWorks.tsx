"use client";

import Image from "next/image";
import { MessageSquare, FileSearch, Code2, Rocket, ArrowRight } from "lucide-react";
import { useModal } from "./ModalProvider";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Free Discovery Call",
    description:
      "Book a 30-min call with a senior developer (not a sales rep). We'll understand your requirements, suggest the right tech stack, and give you a realistic timeline.",
    detail: "Within 24 hours of inquiry",
  },
  {
    icon: FileSearch,
    step: "02",
    title: "Detailed Proposal & Prototype",
    description:
      "Receive a comprehensive proposal with wireframes, tech architecture, timeline, and fixed-price quote. We build a clickable prototype before you commit a single rupee.",
    detail: "Preview before you commit",
  },
  {
    icon: Code2,
    step: "03",
    title: "Agile Development",
    description:
      "2-week sprints with daily standups. Direct access to developers via Slack/WhatsApp. Review working software every sprint — not just status reports.",
    detail: "Talk to devs directly",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch & Scale",
    description:
      "Thorough QA, performance optimization, and deployment. Post-launch support with dedicated dev team. We scale with you as your product grows.",
    detail: "Ongoing support included",
  },
];

export default function HowItWorks() {
  const { openModal } = useModal();

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Software Development Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            How We Build Your{" "}
            <span className="gradient-text">Custom Software</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Our mobile app development & web application development process: preview before you commit. No surprises, no scope creep, no wasted budget.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.step}
               
               
               
               
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm relative z-10">
                      {step.step}
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-indigo-500/30 hidden lg:block" />
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-indigo-400" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">{step.description}</p>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process image */}
        <div className="mt-12 mb-12 relative rounded-2xl overflow-hidden aspect-[21/9] max-w-4xl mx-auto">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
            alt="Our development process"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <p className="text-sm font-semibold text-emerald-400">Preview Before You Pay</p>
            <p className="text-xs text-zinc-300 mt-1">Free clickable prototype in 48 hours — zero commitment</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer"
          >
            Book Free Discovery Call
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
