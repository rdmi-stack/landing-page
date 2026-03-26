"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much does custom software development cost in India?",
    a: "₹1.5L for MVPs, ₹5-15L for full products, ₹25L+ for enterprise. But here's what matters: that ₹5L app we built for a logistics client now processes ₹2Cr/month in orders. The question isn't cost — it's ROI. We give you a fixed price before we start. No surprises. The quote IS the final bill.",
  },
  {
    q: "What's your guarantee? What if the project fails?",
    a: "Money-back deadline guarantee: if we miss the agreed launch date, you get a refund. No fine print. We also show you a working prototype within 48 hours — before any money changes hands. If you don't like it, walk away at zero cost. 200+ projects delivered. Our track record IS the guarantee.",
  },
  {
    q: "Why should I hire RDMI instead of a US/UK agency?",
    a: "Same senior developers. Same tech stack. Same quality. 50% less cost. We use AI to write code 3x faster, so your budget goes further. A $50K project in San Francisco costs ₹15L here — and ships faster. You talk to developers, not account managers.",
  },
  {
    q: "How fast can you build my app?",
    a: "MVP in 4-6 weeks. Full product in 8-14 weeks. Enterprise in 4-6 months. Our AI-powered workflow compresses traditional 12-week timelines to 4-5 weeks. Last quarter, we shipped a SaaS dashboard in 3.5 weeks that a competitor quoted 12 weeks for. Speed without shortcuts.",
  },
  {
    q: "Do I really talk to developers, not salespeople?",
    a: "Yes. Within 2 hours, a 5+ year senior developer calls you — not a BDM, not a PM, not a sales rep. You get a direct WhatsApp/Slack channel with the actual team building your product. This is why we have 73% fewer revisions than the industry average.",
  },
  {
    q: "What results have your clients achieved?",
    a: "₹47Cr+ in combined client revenue generated. A fintech app processing ₹2Cr/month, an e-commerce platform that 4x'd conversions, a healthcare SaaS that cut operational costs 60%. We can't share names (NDA), but we share architectures and approaches in your proposal.",
  },
  {
    q: "Do I own 100% of the source code?",
    a: "Every line. Every design file. Every documentation page. NDA signed before the first call. Full IP transfer on day one. If you ever want to leave, you take everything. No lock-in. No vendor dependency. Your code, your servers, your terms.",
  },
  {
    q: "What if I need changes after launch?",
    a: "30-60 days free post-launch support included. After that, most clients keep us on retainer (₹50K-2L/month) for ongoing features. 87% of our clients continue beyond the first project — because the ROI keeps compounding.",
  },
  {
    q: "What technologies do you use?",
    a: "React/Next.js, Node.js, Python, Flutter, React Native, PostgreSQL, AWS/GCP, OpenAI, LangChain — we pick based on YOUR requirements. Every tech choice comes with a written justification. We optimize for performance, maintainability, and hiring ease.",
  },
  {
    q: "How do I get started?",
    a: "Step 1: Fill the form (60 seconds). Step 2: Senior developer calls within 2 hours. Step 3: Free clickable prototype in 48 hours. Step 4: Approve and we start. ₹0 upfront. Zero risk. Don't love the prototype? We part as friends.",
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
