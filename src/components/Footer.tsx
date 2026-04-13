"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import { useModal } from "./ModalProvider";

interface FooterProps {
  onCTA?: () => void;
}

export default function Footer({ onCTA }: FooterProps) {
  const { openModal } = useModal();
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/kw/");

  return (
    <footer className={isLandingPage ? "border-t border-gray-200 bg-gray-50" : "border-t border-white/5 bg-[#050505]"}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Brand + contact */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <span className={`text-xl font-extrabold tracking-tight ${isLandingPage ? "text-gray-900" : "text-white"}`}>RDMI</span>
              <span className="relative px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                AI
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
            </Link>
            <p className={`text-sm leading-relaxed ${isLandingPage ? "text-gray-500" : "text-zinc-500"}`}>
              We build intelligent software that works 24/7 — AI agents, chatbots, smart workflows & automation. 200+ products shipped. Every deadline guaranteed.
            </p>
            <div className={`space-y-2 text-sm ${isLandingPage ? "text-gray-500" : "text-zinc-500"}`}>
              <a href="mailto:info@rdmi.in" className={`flex items-center gap-2 transition-colors ${isLandingPage ? "hover:text-gray-900" : "hover:text-white"}`}>
                <Mail className="w-3.5 h-3.5" /> info@rdmi.in
              </a>
              <a href="tel:+919818565561" className={`flex items-center gap-2 transition-colors ${isLandingPage ? "hover:text-gray-900" : "hover:text-white"}`}>
                <Phone className="w-3.5 h-3.5" /> +91 98185 65561
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> India | USA | UK
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center lg:text-right space-y-4">
            <p className={`text-sm ${isLandingPage ? "text-gray-500" : "text-zinc-400"}`}>
              Ready to build intelligent software that runs your business?
            </p>
            <button
              onClick={onCTA || (() => openModal())}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all hover:scale-105 cursor-pointer"
            >
              Get Free Consultation
            </button>
            <p className={`text-xs ${isLandingPage ? "text-gray-400" : "text-zinc-600"}`}>
              Free consultation. NDA protected. Money-back guarantee.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${isLandingPage ? "border-t border-gray-200" : "border-t border-white/5"}`}>
          <div className={`text-xs text-center sm:text-left ${isLandingPage ? "text-gray-400" : "text-zinc-700"}`}>
            &copy; {new Date().getFullYear()} RDMI Tech Ventures Pvt. Ltd. All rights reserved.
          </div>
          <div className={`flex items-center gap-4 text-xs ${isLandingPage ? "text-gray-400" : "text-zinc-700"}`}>
            <Link href="/about" className={`transition-colors ${isLandingPage ? "hover:text-gray-600" : "hover:text-zinc-400"}`}>About</Link>
            <Link href="/contact" className={`transition-colors ${isLandingPage ? "hover:text-gray-600" : "hover:text-zinc-400"}`}>Contact</Link>
            <Link href="/get-quote" className={`transition-colors ${isLandingPage ? "hover:text-gray-600" : "hover:text-zinc-400"}`}>Get Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
