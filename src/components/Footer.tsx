"use client";

import { Zap, Mail, Phone, MapPin } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Brand + contact */}
          <div className="space-y-4 max-w-sm">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                RDMI<span className="text-indigo-400"> Web Services</span>
              </span>
            </a>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Custom software that makes you money. 200+ products shipped. ₹47Cr+ client revenue generated.
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
              Ready to build software that generates revenue?
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
            <a href="/about" className="hover:text-zinc-400 transition-colors">About</a>
            <a href="/contact" className="hover:text-zinc-400 transition-colors">Contact</a>
            <a href="/get-quote" className="hover:text-zinc-400 transition-colors">Get Quote</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
