"use client";

import { Zap, Phone } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              RDMI<span className="text-indigo-400"> Web Services</span>
            </span>
          </a>

          {/* Right: phone + CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+919818565561"
              className="hidden sm:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 98185 65561
            </a>
            <button
              onClick={() => openModal()}
              className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
