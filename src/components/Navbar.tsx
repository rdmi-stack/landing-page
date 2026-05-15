"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useModal } from "./ModalProvider";

export default function Navbar() {
  const { openModal } = useModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/40 ring-1 ring-white/15">
              <span className="text-lg font-extrabold text-white leading-none">R</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-2 ring-[#0a0a0a]" />
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-white">RDMI</span>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AI</span>
              <span className="hidden sm:inline text-sm font-semibold tracking-tight text-zinc-300">Services</span>
            </span>
          </Link>

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
