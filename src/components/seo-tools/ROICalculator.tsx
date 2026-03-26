"use client";

import { useState } from "react";
import { TrendingUp, ArrowRight, IndianRupee } from "lucide-react";
import { useModal } from "@/components/ModalProvider";

function formatINR(val: number): string {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val.toFixed(0)}`;
}

export default function ROICalculator() {
  const { openModal } = useModal();
  const [traffic, setTraffic] = useState(5000);
  const [convRate, setConvRate] = useState(2);
  const [aov, setAov] = useState(2000);

  const currentRevenue = Math.round(traffic * (convRate / 100) * aov);
  const projections = [
    { multiplier: 2, label: "2x Traffic", revenue: currentRevenue * 2 },
    { multiplier: 3, label: "3x Traffic", revenue: currentRevenue * 3 },
    { multiplier: 5, label: "5x Traffic", revenue: currentRevenue * 5 },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-3">
            <IndianRupee className="w-3 h-3" /> ROI Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            How Much Revenue Can{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">SEO Generate</span> for You?
          </h2>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto">Adjust the sliders to see your projected organic revenue.</p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          {/* Sliders */}
          <div className="space-y-6 mb-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Monthly Organic Traffic</span>
                <span className="font-bold text-white">{traffic.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={500000}
                step={100}
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="range-slider w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                <span>100</span><span>5,00,000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Conversion Rate</span>
                <span className="font-bold text-white">{convRate}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={20}
                step={0.1}
                value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="range-slider w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                <span>0.1%</span><span>20%</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Average Order Value</span>
                <span className="font-bold text-white">₹{aov.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={100}
                max={100000}
                step={100}
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="range-slider w-full"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                <span>₹100</span><span>₹1,00,000</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Current</p>
              <p className="text-lg sm:text-xl font-extrabold text-zinc-400">{formatINR(currentRevenue)}</p>
              <p className="text-[10px] text-zinc-600">per month</p>
            </div>
            {projections.map((p) => (
              <div key={p.label} className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
                <p className="text-[10px] text-emerald-400/60 uppercase tracking-wider mb-1">{p.label}</p>
                <p className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  {formatINR(p.revenue)}
                </p>
                <p className="text-[10px] text-zinc-600">per month</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => openModal("SEO Growth Plan")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 font-semibold text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-[1.02]"
            >
              <TrendingUp className="w-4 h-4" /> Let Us Build This Growth for You <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
