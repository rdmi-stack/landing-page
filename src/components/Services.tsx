"use client";

import {
  Globe,
  Smartphone,
  Cloud,
  ShoppingCart,
  Cpu,
  Layers,
  Database,
  Code2,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "SaaS platforms processing ₹2Cr+/month. Dashboards that cut decision time 60%. Our React/Next.js web apps don't just work — they generate revenue from day one.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "120K+ downloads for our last client's app. Cross-platform Flutter & React Native apps that convert. Android & iOS — one codebase, half the cost, 2x the reach.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: Cloud,
    title: "SaaS & MVP Development",
    description:
      "MVP in 4 weeks. Product-market fit in 8. We've helped 30+ startups launch, 12 raised funding after. Multi-tenant, subscription billing, analytics — all included.",
    tags: ["SaaS", "Multi-tenant", "Stripe", "API"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description:
      "4x conversion rate for our last e-commerce client. Shopify apps, custom marketplaces, headless commerce. Payment integration that never drops a transaction.",
    tags: ["Shopify", "Razorpay", "Marketplace", "Headless"],
  },
  {
    icon: Cpu,
    title: "AI Software Development",
    description:
      "AI chatbots that handle 80% of support tickets. Recommendation engines that boost AOV 35%. RAG systems, AI agents, automation — AI that pays for itself in month one.",
    tags: ["OpenAI", "LangChain", "Python", "CrewAI"],
  },
  {
    icon: Layers,
    title: "Enterprise Software",
    description:
      "Custom ERP that saved a manufacturer ₹1.2Cr/year. CRM that increased sales team output 40%. Enterprise-grade security. Compliance-ready. Built to run your business.",
    tags: ["ERP", "CRM", "Microservices", "Security"],
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
            Custom Software Development Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Mobile App Development,{" "}
            <span className="gradient-text">Web Application Development</span>{" "}
            & AI Software
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Full-stack app development company building custom software, Android & iOS apps,
            SaaS platforms, and AI-powered enterprise solutions — powered by senior developers in India.
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
