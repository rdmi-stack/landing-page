"use client";

import Image from "next/image";
import { MessageCircle, Play, Bot, ArrowRight } from "lucide-react";

const usps = [
  {
    icon: MessageCircle,
    title: "Talk Direct to AI Developer",
    headline: "Your AI Engineer on Speed Dial. From Day One.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    description:
      "Most agencies hide their engineers behind account managers and project managers. At RDMI, you get a direct line to the senior AI developer building your system — same person, every standup, every message. They write the code, they answer your questions, they own the outcome.",
    features: [
      "Direct Slack/WhatsApp with the AI engineer writing your code",
      "Daily 15-min standups with the actual builder — not a PM proxy",
      "Senior-only team — minimum 5 years experience, AI-native",
      "Technical conversations that improve your product, not pad invoices",
    ],
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-600/20",
  },
  {
    icon: Play,
    title: "Show Before You Commit",
    headline: "Free Working Prototype in 48 Hours. Pay Only If You Love It.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    description:
      "Every other agency demands a deposit before they show you anything. We flip the model: you brief us on Monday, you have a working prototype on your phone by Wednesday. Not a slide deck. Not a Figma. Real software running on real data. If it isn't what you wanted, walk away — zero cost, zero pressure.",
    features: [
      "Working prototype in 48 hours — not slide decks or wireframes",
      "Built on your real data so you can validate the AI quality immediately",
      "Walk away anytime in the first 7 days at zero cost",
      "NDA signed before you share a single document",
    ],
    gradient: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-600/20",
  },
  {
    icon: Bot,
    title: "AI-Integrated by Default",
    headline: "AI Is the Architecture — Not a Plugin Bolted On Later.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    description:
      "Most software gets retrofitted with AI after launch and the seams show. We build AI into the core from sprint one — chatbots, agents, recommendations, automation, observability. Your product ships intelligent on day one, with evals and guardrails baked in. Your competitors will spend 12 months catching up.",
    features: [
      "Every product ships with embedded chatbot, recommendations, and analytics",
      "Autonomous AI agents built on LangGraph, CrewAI, GPT-4o, and Claude",
      "Eval suites and observability (LangSmith / Langfuse) from day one",
      "Full source code, model weights, and training data — yours forever",
    ],
    gradient: "from-purple-500 to-violet-600",
    bgGlow: "bg-purple-600/20",
  },
];

export default function USPSection() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Why Choose RDMI for AI-Integrated Software
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why 200+ Clients Choose RDMI for{" "}
            <span className="gradient-text">AI-Integrated Software & AI Agents</span>
          </h2>
        </div>

        <div className="space-y-20">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
             
             
             
             
              className={`flex flex-col ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-12 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${usp.gradient} text-white text-xs font-semibold`}
                >
                  <usp.icon className="w-3.5 h-3.5" />
                  {usp.title}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold">{usp.headline}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">{usp.description}</p>
                <ul className="space-y-3">
                  {usp.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-zinc-300">
                      <ArrowRight className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual — Image + feature overlay */}
              <div className="flex-1 w-full max-w-lg">
                <div className="relative">
                  <div className={`absolute inset-0 ${usp.bgGlow} rounded-3xl blur-[80px]`} />
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    {/* Image */}
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={usp.image}
                        alt={usp.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                    </div>
                    {/* Feature cards overlaid at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      {usp.features.map((feature, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10"
                        >
                          <div
                            className={`w-7 h-7 rounded-md bg-gradient-to-br ${usp.gradient} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}
                          >
                            {fi + 1}
                          </div>
                          <span className="text-xs text-zinc-200">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
