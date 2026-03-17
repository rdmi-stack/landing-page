"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight, IndianRupee, Zap } from "lucide-react";
import { useModal } from "@/components/ModalProvider";

function formatINR(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${Math.round(val)}`;
}

export default function AdSpendCalculator() {
  const { openModal } = useModal();
  const [spend, setSpend] = useState(100000);
  const [cpc, setCpc] = useState(25);
  const [convRate, setConvRate] = useState(3);
  const [dealValue, setDealValue] = useState(5000);

  const clicks = Math.round(spend / cpc);
  const leads = Math.round(clicks * (convRate / 100));
  const revenue = leads * dealValue;
  const currentROAS = spend > 0 ? (revenue / spend).toFixed(1) : "0";

  // Optimized projections (AI-managed)
  const optCpc = cpc * 0.8;
  const optConvRate = convRate * 1.3;
  const optClicks = Math.round(spend / optCpc);
  const optLeads = Math.round(optClicks * (optConvRate / 100));
  const optRevenue = optLeads * dealValue;
  const optROAS = spend > 0 ? (optRevenue / spend).toFixed(1) : "0";

  return (
    <section className="py-20 lg:py-28 bg-[#161616]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
            <IndianRupee className="w-3 h-3" /> Ad Spend Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            How Much Revenue Can{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Your Ads Generate?</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto">See your current performance vs AI-optimized projections.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          {/* Sliders */}
          <div className="space-y-6 mb-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Monthly Ad Spend</span>
                <span className="font-bold">{formatINR(spend)}</span>
              </div>
              <input type="range" min={10000} max={5000000} step={10000} value={spend} onChange={(e) => setSpend(Number(e.target.value))} className="range-slider w-full" />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1"><span>₹10K</span><span>₹50L</span></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Average Cost Per Click (CPC)</span>
                <span className="font-bold">₹{cpc}</span>
              </div>
              <input type="range" min={2} max={200} step={1} value={cpc} onChange={(e) => setCpc(Number(e.target.value))} className="range-slider w-full" />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1"><span>₹2</span><span>₹200</span></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Conversion Rate</span>
                <span className="font-bold">{convRate}%</span>
              </div>
              <input type="range" min={0.5} max={20} step={0.5} value={convRate} onChange={(e) => setConvRate(Number(e.target.value))} className="range-slider w-full" />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1"><span>0.5%</span><span>20%</span></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Average Deal / Order Value</span>
                <span className="font-bold">{formatINR(dealValue)}</span>
              </div>
              <input type="range" min={100} max={500000} step={100} value={dealValue} onChange={(e) => setDealValue(Number(e.target.value))} className="range-slider w-full" />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1"><span>₹100</span><span>₹5L</span></div>
            </div>
          </div>

          {/* Results comparison */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Current */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">Current Performance</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Clicks</span><span className="font-semibold">{clicks.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Leads</span><span className="font-semibold">{leads.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Revenue</span><span className="font-semibold">{formatINR(revenue)}</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/[0.06]"><span className="text-zinc-500">ROAS</span><span className="font-bold text-lg text-zinc-400">{currentROAS}x</span></div>
              </div>
            </div>

            {/* Optimized */}
            <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
              <p className="text-[10px] uppercase tracking-widest text-indigo-400/60 mb-3 flex items-center gap-1"><Zap className="w-3 h-3" /> AI-Optimized Projection</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Clicks</span><span className="font-semibold text-indigo-300">{optClicks.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Leads</span><span className="font-semibold text-indigo-300">{optLeads.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-zinc-500">Revenue</span><span className="font-semibold text-indigo-300">{formatINR(optRevenue)}</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-indigo-500/10"><span className="text-zinc-500">ROAS</span><span className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{optROAS}x</span></div>
              </div>
              <p className="text-[10px] text-zinc-600 mt-3">Based on -20% CPC + 30% better conversion rate with AI optimization</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button onClick={() => openModal("Performance Marketing")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-sm transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02]">
              <TrendingUp className="w-4 h-4" /> Let Us Optimize Your Ads <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
