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
            <span className="text-xl font-extrabold tracking-tight">
              RDMI
            </span>
            <span className="relative px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              AI
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
