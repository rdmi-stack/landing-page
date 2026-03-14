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
    title: "Custom Web Application Development",
    description:
      "Full-stack web applications built with React, Next.js, Node.js. From SaaS platforms to enterprise dashboards — scalable, secure, and blazing fast.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile apps for iOS & Android. React Native & Flutter expertise for startups and enterprises.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: Cloud,
    title: "SaaS Product Development",
    description:
      "End-to-end SaaS development from MVP to scale. Multi-tenant architecture, subscription billing, analytics dashboards, and more.",
    tags: ["Multi-tenant", "Stripe", "Analytics", "API"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description:
      "Custom e-commerce solutions, Shopify apps, and marketplace platforms. Payment gateway integration with Razorpay, Stripe & more.",
    tags: ["Shopify", "Razorpay", "Stripe", "Headless"],
  },
  {
    icon: Cpu,
    title: "AI/ML Software Development",
    description:
      "AI-powered applications with ChatGPT integration, recommendation engines, computer vision, NLP, and predictive analytics built in.",
    tags: ["OpenAI", "LangChain", "Python", "TensorFlow"],
  },
  {
    icon: Layers,
    title: "Enterprise Software Solutions",
    description:
      "ERP systems, CRM platforms, workflow automation, and internal tools. Built for scale with enterprise-grade security and compliance.",
    tags: ["ERP", "CRM", "Microservices", "Security"],
  },
  {
    icon: Database,
    title: "Cloud & DevOps Services",
    description:
      "AWS, GCP, Azure deployment. CI/CD pipelines, Docker, Kubernetes, infrastructure as code. We handle your entire cloud architecture.",
    tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: Code2,
    title: "API Development & Integration",
    description:
      "RESTful & GraphQL API design, third-party integrations, payment gateways, CRM systems, and microservices architecture.",
    tags: ["REST", "GraphQL", "Microservices", "OAuth"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-32 relative">
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
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Custom Software Development{" "}
            <span className="gradient-text">Services in India</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            From web and mobile apps to AI-powered enterprise solutions — we build software
            that drives revenue and scales with your business.
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
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300"
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
