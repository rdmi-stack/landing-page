"use client";

import { ArrowRight, MessageCircle, Phone, Mail, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useModal } from "./ModalProvider";

export default function CTASection() {
  const { openModal } = useModal();

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Get Started Today
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Let&apos;s Build Your{" "}
              <span className="gradient-text">Next Big Thing</span>
            </h2>
            <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
              Book a free 30-minute discovery call with a senior developer.
              Get a detailed proposal with prototype — before you commit.
            </p>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: MessageCircle, text: "Free 30-min consultation" },
              { icon: Phone, text: "Response in 2 hours" },
              { icon: Mail, text: "NDA protected" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-zinc-400">
                <item.icon className="w-4 h-4 text-indigo-400" />
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
              Get Free Quote & Prototype
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            {["No upfront payment", "100% source code ownership", "Cancel anytime"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>

          {/* Direct contact */}
          <div className="pt-8 border-t border-white/5">
            <p className="text-sm text-zinc-500 mb-2">Prefer to reach out directly?</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
              <span>
                Email: <span className="text-white">info@rdmi.in</span>
              </span>
              <span>
                WhatsApp: <span className="text-white">+91 98185 65561</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
