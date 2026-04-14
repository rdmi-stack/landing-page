"use client";

import {
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  Layers,
  Database,
  Code2,
  Bot,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "AI Agent Development",
    description:
      "Autonomous agents that reason, plan, and execute end-to-end workflows. LangGraph + CrewAI + GPT-4o. Multi-agent systems with evals, observability, and human approval gates baked in.",
    tags: ["LangGraph", "CrewAI", "OpenAI", "Claude"],
  },
  {
    icon: Bot,
    title: "AI Chatbot & Voice AI",
    description:
      "RAG chatbots that deflect 60% of tickets at launch. WhatsApp, web, voice IVR replacements. Trained on your data, integrated with your CRM, with citations and human handoff.",
    tags: ["RAG", "WhatsApp", "OpenAI Realtime", "Twilio"],
  },
  {
    icon: Globe,
    title: "AI-Integrated Web Apps",
    description:
      "React/Next.js web apps with AI woven into the architecture — embedded copilots, smart search, intelligent recommendations, anomaly detection. Not retrofitted later.",
    tags: ["Next.js", "Vercel AI SDK", "React", "TypeScript"],
  },
  {
    icon: Smartphone,
    title: "AI-Powered Mobile Apps",
    description:
      "Flutter and React Native apps with on-device ML, voice AI, AI recommendations, and personalized push. 120K+ downloads delivered. Native performance, AI-first UX.",
    tags: ["Flutter", "React Native", "Core ML", "TensorFlow Lite"],
  },
  {
    icon: Cloud,
    title: "AI-Native SaaS & MVPs",
    description:
      "AI-first SaaS platforms with embedded copilots, smart workflows, and observability from sprint one. Multi-tenant, subscription billing, analytics — built to scale on day one.",
    tags: ["SaaS", "Multi-tenant", "Stripe", "Embedded AI"],
  },
  {
    icon: Layers,
    title: "AI Workflow Automation",
    description:
      "Document OCR, email triage, sales pipelines, finance reconciliation, HR onboarding — automated end-to-end with AI in the loop. n8n + custom orchestration with human approval gates.",
    tags: ["n8n", "Document AI", "RPA", "OpenAI"],
  },
  {
    icon: Database,
    title: "Cloud & DevOps",
    description:
      "99.99% uptime. 70% infrastructure cost reduction. AWS/GCP/Azure with CI/CD, Docker, K8s. Your app scales from 100 to 100K users without rewriting a line.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: Code2,
    title: "API & Integrations",
    description:
      "APIs processing 10M+ requests/month. Payment, CRM, ERP integrations that work the first time. The invisible backbone that makes your software ecosystem print money.",
    tags: ["REST", "GraphQL", "Microservices", "OAuth"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 relative bg-[#161616]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            AI-Integrated Software Development Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            AI Agents, AI Chatbots &{" "}
            <span className="gradient-text">AI-Integrated Software</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Custom software with AI built into the architecture from sprint one — autonomous agents,
            chatbots, workflow automation, and AI-native web and mobile apps. Talk direct to a senior AI engineer.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
             
             
             
             
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-zinc-500 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
