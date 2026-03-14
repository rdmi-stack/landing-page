"use client";

import { motion } from "framer-motion";

const logos = [
  "Startup India",
  "NASSCOM",
  "AWS Partner",
  "Google Cloud",
  "Microsoft",
  "Stripe",
  "Razorpay",
  "ISO 27001",
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-zinc-600 mb-8">
          Trusted by startups & enterprises across 15+ countries
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-14"
        >
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-zinc-600 text-sm font-semibold tracking-wide hover:text-zinc-400 transition-colors cursor-default"
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
