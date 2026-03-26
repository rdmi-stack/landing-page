"use client";

import { useEffect, useRef, useState } from "react";
import { Link2, FileText, Search, BarChart3, Globe, TrendingUp, Target, MousePointerClick, Zap, type LucideIcon } from "lucide-react";
import { dashboardStats } from "@/data/dashboard-stats";
import { useModal } from "@/components/ModalProvider";

const iconMap: Record<string, LucideIcon> = { Link2, FileText, Search, BarChart3, Globe, TrendingUp, Target, MousePointerClick };

function formatValue(val: number, prefix?: string, suffix?: string): string {
  let formatted: string;
  if (val >= 10000000) formatted = `${(val / 10000000).toFixed(1)}Cr`;
  else if (val >= 100000) formatted = `${(val / 100000).toFixed(1)}L`;
  else if (val >= 1000) formatted = `${(val / 1000).toFixed(1)}K`;
  else formatted = val.toString();
  return `${prefix || ""}${formatted}${suffix || ""}`;
}

function AnimatedCounter({ target, prefix, suffix }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
      {formatValue(count, prefix, suffix)}
    </div>
  );
}

export default function DashboardPage() {
  const { openModal } = useModal();

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-32">
      {/* Hero */}
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Transparency Wall</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Our Numbers,{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">In Real Time</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              No vanity metrics. These are the actual results our team is delivering right now for our clients.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 mt-4">
              Last updated: {dashboardStats.lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardStats.stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || BarChart3;
            return (
              <div
                key={stat.label}
               
               
               
               
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center hover:border-indigo-500/20 transition-all"
              >
                <Icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
                <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-xs text-zinc-500 mt-2">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
          <Zap className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Want These Results for Your Business?</h2>
          <p className="text-zinc-400 mb-6">Get a free marketing audit and see what we can achieve for you.</p>
          <button onClick={() => openModal()} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02]">
            Get Free Audit
          </button>
        </div>
      </section>
    </div>
  );
}
