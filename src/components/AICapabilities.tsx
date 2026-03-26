"use client";

import Image from "next/image";
import {
  Bot,
  Brain,
  MessageSquare,
  Workflow,
  Eye,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useModal } from "./ModalProvider";

const aiProducts = [
  {
    icon: MessageSquare,
    title: "AI Chatbots & Voice Agents",
    description: "24/7 customer support that handles 80% of tickets. WhatsApp, web, Slack — trained on YOUR data. Replaces 2-3 support staff from day one.",
    result: "80% ticket deflection",
    tools: "OpenAI · Claude · Dialogflow",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Brain,
    title: "AI Agents & Autonomous Workflows",
    description: "Multi-step agents that browse, research, call APIs, write reports, and execute tasks end-to-end. Replace 10+ hours/week of manual work per person.",
    result: "10+ hrs/week saved per person",
    tools: "LangChain · CrewAI · AutoGen",
    gradient: "from-purple-500 to-violet-600",
  },
  {
    icon: Bot,
    title: "RAG Knowledge Bases",
    description: "Query your documents, PDFs, CRMs & databases in plain English. 60% faster research. Zero hallucination with grounded retrieval.",
    result: "60% faster internal research",
    tools: "LlamaIndex · Pinecone · pgvector",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    description: "End-to-end business process automation with n8n + custom orchestration. Invoice processing, lead scoring, content generation — on autopilot.",
    result: "70% less manual data entry",
    tools: "n8n · Make · Custom APIs",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations & Copilots",
    description: "In-app AI assistants that boost AOV 35%, personalize user experience, and auto-summarize content. Built into your SaaS/app from day one.",
    result: "35% higher AOV",
    tools: "OpenAI · Gemini · Vercel AI SDK",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: Eye,
    title: "Computer Vision & Document AI",
    description: "Image classification, OCR, document extraction, ID verification — 95%+ accuracy. Manufacturing QC, invoice scanning, healthcare imaging.",
    result: "95%+ accuracy on documents",
    tools: "YOLOv8 · AWS Textract · PyTorch",
    gradient: "from-rose-500 to-red-600",
  },
];

const aiLogos = [
  "OpenAI", "Claude", "Gemini", "LangChain", "CrewAI", "AutoGen",
  "Pinecone", "n8n", "Hugging Face", "TensorFlow", "PyTorch", "Vercel AI",
];

export default function AICapabilities() {
  const { openModal } = useModal();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80"
          alt="AI technology"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
            <Bot className="w-4 h-4" />
            AI-Native Software — Not Traditional Development
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Your Software Ships with{" "}
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">AI Built-In</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-3xl mx-auto">
            Every product we build includes AI capabilities powered by OpenAI, Claude, Gemini & LangChain.
            Your competitors are still building traditional apps. You&apos;re building intelligent ones.
          </p>
        </div>

        {/* AI Tech logos marquee */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {aiLogos.map((logo) => (
            <span key={logo} className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-zinc-400 font-medium">
              {logo}
            </span>
          ))}
        </div>

        {/* AI Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiProducts.map((product) => (
            <div
              key={product.title}
              onClick={() => openModal(product.title)}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <product.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                {product.title}
              </h3>

              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{product.description}</p>

              {/* Result badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                  {product.result}
                </span>
              </div>

              {/* Tools */}
              <p className="text-[11px] text-zinc-600 font-medium">{product.tools}</p>

              <div className="mt-3 flex items-center gap-1 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Get quote <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-zinc-500 text-sm mb-4">
            Every project gets AI capabilities — even if you didn&apos;t ask for them. That&apos;s our edge.
          </p>
          <button
            onClick={() => openModal("AI Software Development")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 cursor-pointer"
          >
            Build AI-Powered Software
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
