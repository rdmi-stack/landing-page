"use client";

import Image from "next/image";
import { MessageCircle, IndianRupee, Bot, ArrowRight } from "lucide-react";

const usps = [
  {
    icon: MessageCircle,
    title: "Talk to Developers Directly",
    headline: "Your CTO on Speed Dial. For Free.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    description:
      "Other agencies charge you ₹2L/month for a 'project manager' who forwards your emails. At RDMI, you get a direct line to the 5+ year senior developers writing your code. Result? 73% fewer revisions, 40% faster approvals, and software that actually matches what you asked for.",
    features: [
      "Direct Slack/WhatsApp with your dev team — respond in <30 min",
      "Daily 15-min standups (not weekly status emails)",
      "Zero PM markup = ₹3-5L saved per project",
      "Technical co-founders who challenge bad ideas (and improve good ones)",
    ],
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-600/20",
  },
  {
    icon: IndianRupee,
    title: "Guaranteed 50% Cost Savings",
    headline: "₹15L Here = ₹30L in the US. Same Code. Same Quality.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    description:
      "We don't compete on cheap labor. We compete on AI-accelerated delivery. Our team writes production code 3x faster using AI tools — so your ₹15L budget buys what ₹30L buys elsewhere. Fixed price. No surprises. Money-back guarantee if we miss your deadline.",
    features: [
      "Fixed-price contracts — the quote IS the final bill",
      "Money-back guarantee if we miss the agreed deadline",
      "No hidden costs: hosting setup, deployment, documentation included",
      "ROI calculator: see exactly what your investment returns",
    ],
    gradient: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-600/20",
  },
  {
    icon: Bot,
    title: "AI-First = 3x Faster Delivery",
    headline: "12-Week Projects Done in 4. That's Not a Typo.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    description:
      "Every RDMI developer uses AI code generation, AI testing, and AI debugging — daily. This isn't a buzzword. Our last 20 projects shipped 2.8x faster than client estimates. Your competitors are still hiring. You're already launching.",
    features: [
      "AI generates 40% of boilerplate code — humans review 100%",
      "AI-powered QA catches bugs 5x faster than manual testing",
      "Built-in AI features: chatbots, recommendations, automation at no extra cost",
      "Your product launches with AI built-in — not bolted-on later",
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
            Why Choose Our Software Development Company
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Why 200+ Clients Choose RDMI for{" "}
            <span className="gradient-text">Custom Software Development</span>
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
