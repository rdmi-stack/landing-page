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
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    title: "Web Application Development",
    description:
      "Custom web applications built with React, Next.js & Node.js. From SaaS dashboards to enterprise portals — our web development company delivers scalable, production-ready software.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development Company",
    description:
      "Android app development & iOS apps built with Flutter and React Native. Our mobile app developers ship cross-platform apps for startups and enterprises alike.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: Cloud,
    title: "Custom Software Development Services",
    description:
      "End-to-end SaaS product development from MVP to scale. Multi-tenant architecture, subscription billing, analytics — bespoke software development that ships.",
    tags: ["SaaS", "Multi-tenant", "Stripe", "API"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce App Development",
    description:
      "Shopify apps, custom marketplace platforms, and e-commerce solutions. Payment integration with Razorpay, Stripe — complete ecommerce development company services.",
    tags: ["Shopify", "Razorpay", "Marketplace", "Headless"],
  },
  {
    icon: Cpu,
    title: "AI App Development Company",
    description:
      "AI software development with ChatGPT, LangChain, and custom ML models. AI agents, chatbots, recommendation engines, RAG systems — built by our AI-powered development team.",
    tags: ["OpenAI", "LangChain", "Python", "CrewAI"],
  },
  {
    icon: Layers,
    title: "Enterprise Software Development",
    description:
      "Custom ERP software, CRM platforms, workflow automation, and enterprise applications. Built for scale with enterprise-grade security and compliance.",
    tags: ["ERP", "CRM", "Microservices", "Security"],
  },
  {
    icon: Database,
    title: "Cloud & DevOps Engineering",
    description:
      "AWS, Google Cloud, Azure deployment. CI/CD pipelines, Docker, Kubernetes, infrastructure as code. Complete cloud architecture for your software development services.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: Code2,
    title: "API & Integration Development",
    description:
      "RESTful & GraphQL API design, third-party integrations, payment gateways, CRM systems — the backbone of modern web application development.",
    tags: ["REST", "GraphQL", "Microservices", "OAuth"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 relative bg-[#161616]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
