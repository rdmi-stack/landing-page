"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Brand + contact */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-xl font-extrabold tracking-tight">RDMI</span>
              <span className="relative px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                AI
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              We build intelligent software that works 24/7 — AI agents, chatbots, smart workflows & automation. 200+ products shipped. Every deadline guaranteed.
            </p>
            <div className="space-y-2 text-sm text-zinc-500">
              <a href="mailto:info@rdmi.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" /> info@rdmi.in
              </a>
              <a href="tel:+919818565561" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" /> +91 98185 65561
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> India | USA | UK
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center lg:text-right space-y-4">
            <p className="text-sm text-zinc-400">
              Ready to build intelligent software that runs your business?
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
            >
              Get Free Prototype in 48 Hours
            </button>
            <p className="text-xs text-zinc-600">
              ₹0 upfront. Money-back deadline guarantee. NDA protected.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-700 text-center sm:text-left">
            &copy; {new Date().getFullYear()} RDMI Tech Ventures Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-700">
            <Link href="/about" className="hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-zinc-400 transition-colors">Contact</Link>
            <Link href="/get-quote" className="hover:text-zinc-400 transition-colors">Get Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
