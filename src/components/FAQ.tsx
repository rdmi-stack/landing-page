"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much does custom software development cost in India?",
    a: "Custom software development in India typically ranges from ₹1.5 Lakh for MVPs to ₹25 Lakh+ for enterprise solutions. At RDMI, our AI-powered development team delivers 50-60% cost savings compared to US/UK agencies without compromising on quality. We offer fixed-price project models with transparent pricing.",
  },
  {
    q: "How long does it take to build a custom web application?",
    a: "A typical MVP takes 4-8 weeks, a full-featured web application takes 8-16 weeks, and enterprise solutions can take 4-6 months. We provide a detailed timeline during our free discovery call, and we show you a clickable prototype before you commit to the full build.",
  },
  {
    q: "Do I get to talk to the developers directly?",
    a: "Absolutely — this is our #1 USP. You get a direct Slack or WhatsApp channel with the senior developers building your product. No project managers acting as middlemen, no communication delays. Daily standups, real-time updates, and technical discussions directly with the people writing the code.",
  },
  {
    q: "What is your AI-first development approach?",
    a: "We integrate AI into every phase of development: AI-assisted code generation (3x faster delivery), AI-powered testing & QA, and AI features built into your product (chatbots, recommendation engines, automation). Every project benefits from AI even if the end product isn't AI-focused.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We work with everyone — from solo founders building their first MVP to Fortune 500 companies modernizing legacy systems. About 60% of our clients are startups and growth-stage companies, and 40% are enterprises. Our flexible engagement models adapt to your size and budget.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our core stack includes React/Next.js, Node.js, Python, React Native, Flutter, PostgreSQL, MongoDB, AWS/GCP, and AI/ML tools (OpenAI, LangChain, TensorFlow). We choose the best tech for your specific use case — not what's trendy.",
  },
  {
    q: "Do I own the source code?",
    a: "100% yes. You get complete ownership of all source code, documentation, design files, and intellectual property from day one. We sign an NDA before we start, and everything we build belongs entirely to you.",
  },
  {
    q: "What happens after the project launches?",
    a: "All plans include 30-60 days of free post-launch support. After that, we offer flexible maintenance packages — from ad-hoc bug fixes to a dedicated team for ongoing development. Most clients continue working with us as their product evolves.",
  },
  {
    q: "How do you ensure code quality?",
    a: "We follow strict engineering practices: code reviews on every PR, automated testing (unit + integration + E2E), CI/CD pipelines, comprehensive documentation, and regular security audits. Our AI-powered QA catches bugs before they reach production.",
  },
  {
    q: "Can you show me a prototype before I commit?",
    a: "Yes! This is part of our process. After the discovery call, we create a detailed proposal with wireframes and a clickable prototype. You see exactly what you're getting before committing any significant budget. Preview before you commit — that's our promise.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32 relative bg-[#161616]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Custom Software Development FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            App Development{" "}
            <span className="gradient-text">Questions Answered</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
             
             
             
             
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              
                {openIndex === i && (
                  <div
                   
                   
                   
                   
                  >
                    <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                )}
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
