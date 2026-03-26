"use client";

import { ArrowRight, MessageCircle, Phone, Mail, CheckCircle2 } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function CTASection() {
  const { openModal } = useModal();

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div>
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Stop Researching. Start Building.
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Get a Free Prototype in{" "}
              <span className="gradient-text">48 Hours</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              Every week you delay is revenue your competitor captures.
              Talk to a senior developer in 2 hours. Get a clickable prototype in 48.{" "}
              <strong className="text-white">If you don&apos;t love it, walk away — zero cost.</strong>
            </p>
          </div>

          {/* Trust points — guarantee heavy */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: MessageCircle, text: "Developer calls you in 2 hours" },
              { icon: Phone, text: "Free prototype before any payment" },
              { icon: Mail, text: "Money-back deadline guarantee" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-zinc-400">
                <item.icon className="w-4 h-4 text-emerald-400" />
                {item.text}
              </div>
            ))}
          </div>

          {/* Big CTA button */}
          <div>
            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-105 cursor-pointer"
            >
              Get Free Prototype — No Payment Required
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            {["₹0 upfront", "You own 100% of code", "NDA signed before we start", "Cancel anytime, keep everything"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          {/* Direct contact */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-sm text-zinc-500 mb-2">Want to talk right now?</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
              <span>
                Email: <span className="text-white">info@rdmi.in</span>
              </span>
              <span>
                WhatsApp: <span className="text-white">+91 98185 65561</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
