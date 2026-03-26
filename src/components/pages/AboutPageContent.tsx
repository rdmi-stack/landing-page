"use client";

import { Bot, Users, IndianRupee, Rocket, Globe, Shield, Code2, Zap } from "lucide-react";
import { useModal } from "@/components/ModalProvider";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Global Clients" },
  { value: "50%", label: "Cost Savings" },
];

const values = [
  { icon: Users, title: "Direct Developer Access", desc: "No project managers or middlemen. You talk to the engineers building your product — every single day." },
  { icon: IndianRupee, title: "Save 50% Development Cost", desc: "AI-powered development team delivers same quality as US/UK agencies at half the cost. Fixed-price, transparent." },
  { icon: Bot, title: "AI-Powered Development Team", desc: "Every project leverages AI tools — GitHub Copilot, Claude, Cursor — for 2x faster delivery and fewer bugs." },
  { icon: Rocket, title: "Startup Speed, Enterprise Quality", desc: "We ship MVPs in 4-6 weeks. Production-grade code with CI/CD, testing, and monitoring from day one." },
  { icon: Globe, title: "Global Delivery, India Pricing", desc: "Serving clients across USA, UK, Canada, Australia, Singapore & the Middle East with IST-overlap hours." },
  { icon: Shield, title: "NDA & IP Protection", desc: "Your code, your IP. Full source code ownership, NDA-protected from the first conversation." },
];

const techHighlights = [
  "React / Next.js / TypeScript", "Node.js / Python / Go",
  "React Native / Flutter", "PostgreSQL / MongoDB / Redis",
  "AWS / GCP / Azure", "OpenAI / LangChain / RAG",
  "Docker / Kubernetes", "Stripe / Razorpay",
];

export default function AboutPageContent() {
  const { openModal } = useModal();

  return (
    <div className="pb-20 lg:pb-32">
      {/* Hero */}
      <section className="relative mb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              India&apos;s{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI-Powered</span>{" "}
              Software &amp; Web Application Development Company
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
              RDMI Web Services, a division of RDMI Tech Ventures Pvt. Ltd., builds custom software for startups and enterprises worldwide. We combine senior engineering talent with AI-powered workflows to deliver faster, better, and at half the cost.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
             
             
             
             
              className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
            >
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why RDMI */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Why <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Choose RDMI</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v, i) => (
            <div
              key={v.title}
             
             
             
             
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Tech Stack</h2>
          <p className="text-zinc-500 text-sm mt-2">Modern, battle-tested technologies</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {techHighlights.map((tech) => (
            <span key={tech} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-400">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
          <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Build Something Great?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Talk to a senior developer today. Get a free quote with timeline, tech stack, and transparent pricing.
          </p>
          <button onClick={() => openModal()} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02]">
            Get Free Quote
          </button>
        </div>
      </section>
    </div>
  );
}
