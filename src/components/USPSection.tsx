"use client";

import { MessageCircle, IndianRupee, Bot, ArrowRight } from "lucide-react";

const usps = [
  {
    icon: MessageCircle,
    title: "Talk to Developers Directly",
    headline: "Zero Middlemen. Zero BS.",
    description:
      "Skip the sales team, project managers, and account executives. At RDMI, you get a direct Slack/WhatsApp channel with the senior developers building your product. Faster decisions, fewer misunderstandings, better software.",
    features: [
      "Direct Slack/WhatsApp access to your dev team",
      "Daily standups with actual developers",
      "No project manager markup on your bill",
      "Technical founders who speak your language",
    ],
    gradient: "from-blue-500 to-indigo-600",
    bgGlow: "bg-blue-600/20",
  },
  {
    icon: IndianRupee,
    title: "Save 50% Development Cost",
    headline: "Same Quality. Half the Price.",
    description:
      "Our AI-powered development team in India delivers the same quality as US/UK agencies at half the cost. We're not a body shop — we're a product-minded team with AI-accelerated workflows that cut timelines and costs dramatically.",
    features: [
      "AI-powered team delivers 2x faster at 50% less cost",
      "Fixed-price projects with no hidden costs",
      "No recruitment, training, or infrastructure overhead",
      "Transparent pricing — know the full cost upfront",
    ],
    gradient: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-600/20",
  },
  {
    icon: Bot,
    title: "AI-Powered Development Team",
    headline: "Ship 3x Faster with AI.",
    description:
      "Every project leverages AI from day one — AI-assisted code generation, automated testing, intelligent debugging, and AI-powered features built into your product. We don't just build software, we build intelligent software.",
    features: [
      "AI-assisted development for 3x faster delivery",
      "Built-in AI features (chatbots, recommendations, automation)",
      "AI-powered testing & quality assurance",
      "Future-proof architecture with AI/ML pipelines",
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

              {/* Visual card */}
              <div className="flex-1 w-full max-w-lg">
                <div className="relative">
                  <div className={`absolute inset-0 ${usp.bgGlow} rounded-3xl blur-[80px]`} />
                  <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${usp.gradient} flex items-center justify-center mb-6`}
                    >
                      <usp.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-4">
                      {usp.features.map((feature, fi) => (
                        <div
                          key={fi}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${usp.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                          >
                            {fi + 1}
                          </div>
                          <span className="text-sm text-zinc-300">{feature}</span>
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
