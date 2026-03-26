"use client";

import { useState, useMemo } from "react";
import { FlaskConical, TrendingUp, ArrowRight, Zap } from "lucide-react";
import { experiments, experimentCategories, type Experiment } from "@/data/experiments";
import { useModal } from "@/components/ModalProvider";

const categoryLabels: Record<string, string> = {
  all: "All", seo: "SEO", content: "Content", ppc: "PPC", conversion: "Conversion", technical: "Technical",
};

const categoryColors: Record<string, string> = {
  seo: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  content: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ppc: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  conversion: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  technical: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

function ExperimentCard({ exp, index }: { exp: Experiment; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
     
     
     
     
      className="rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20 transition-all overflow-hidden"
    >
      <div className="p-5 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${categoryColors[exp.category]}`}>
            {exp.category.toUpperCase()}
          </span>
          <span className="text-[10px] text-zinc-600">{exp.date}</span>
        </div>
        <h3 className="text-sm font-semibold mb-2 leading-tight">{exp.title}</h3>
        <p className="text-xs text-zinc-500 line-clamp-2">{exp.hypothesis}</p>

        {exp.metrics && exp.metrics.length > 0 && (
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400 font-medium">
              {exp.metrics[0].before} → {exp.metrics[0].after}
            </span>
          </div>
        )}
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Hypothesis</p>
            <p className="text-sm text-zinc-400">{exp.hypothesis}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Method</p>
            <p className="text-sm text-zinc-400">{exp.method}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Result</p>
            <p className="text-sm text-zinc-300">{exp.result}</p>
          </div>
          {exp.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {exp.metrics.map((m) => (
                <div key={m.label} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[9px] text-zinc-500">{m.label}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-zinc-500 line-through">{m.before}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">{m.after}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
            <p className="text-[10px] uppercase tracking-widest text-indigo-400/60 mb-1">Key Takeaway</p>
            <p className="text-sm text-indigo-300">{exp.takeaway}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-[9px] bg-white/5 text-zinc-500 border border-white/5">#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function LabPage() {
  const [active, setActive] = useState<string>("all");
  const { openModal } = useModal();

  const filtered = useMemo(
    () => active === "all" ? experiments : experiments.filter((e) => e.category === active),
    [active]
  );

  return (
    <div className="pb-20 lg:pb-32">
      {/* Hero */}
      <section className="relative mb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
              <FlaskConical className="w-4 h-4" /> Original Research & Experiments
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              The RDMI{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Experiment Lab</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              Real experiments. Real data. No opinions. We test SEO, PPC, and conversion hypotheses so you don&apos;t have to.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {experimentCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                active === cat
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-white/5 text-zinc-400 hover:bg-white/10 border border-white/5"
              }`}
            >
              {categoryLabels[cat]}
              {cat !== "all" && <span className="ml-1.5 text-xs opacity-60">{experiments.filter((e) => e.category === cat).length}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exp, i) => (
            <ExperimentCard key={exp.slug} exp={exp} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
          <Zap className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Want Us to Run Experiments for Your Business?</h2>
          <p className="text-zinc-400 text-sm mb-4">We apply these learnings to every client campaign. Get data-driven marketing for your brand.</p>
          <button onClick={() => openModal()} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
            Get Free Marketing Audit <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
