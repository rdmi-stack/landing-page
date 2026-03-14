"use client";

import { Zap } from "lucide-react";

const footerLinks = {
  Services: [
    "Custom Software Development",
    "Web Application Development",
    "Mobile App Development",
    "SaaS Development",
    "E-Commerce Development",
    "AI/ML Development",
    "Cloud & DevOps",
    "API Development",
  ],
  Company: [
    "About Us",
    "Case Studies",
    "Blog",
    "Careers",
    "Contact",
  ],
  Resources: [
    "How It Works",
    "Pricing",
    "Tech Stack",
    "FAQ",
    "Privacy Policy",
    "Terms of Service",
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                RDMI<span className="text-indigo-400"> Web Services</span>
              </span>
            </a>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              India&apos;s AI-first custom software development company.
              Talk to developers directly. Save 50% cost.
              Building intelligent software for startups & enterprises worldwide.
            </p>
            <div className="space-y-1 text-sm text-zinc-500">
              <p>hello@rdmiwebservices.com</p>
              <p>+91 98XXX XXXXX</p>
              <p>India | USA | UK</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-600 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} RDMI Web Services. All rights reserved.</p>
            <p className="mt-1 text-zinc-700">A product of RDMI Tech Ventures Pvt. Ltd.</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>

      {/* SEO-rich bottom section */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] text-zinc-700 leading-relaxed text-center max-w-4xl mx-auto">
            RDMI Web Services, a division of RDMI Tech Ventures Pvt. Ltd., is a leading custom software development company in India offering web application development, mobile app development, SaaS development, enterprise software solutions, e-commerce development, AI/ML development, cloud solutions, and IT outsourcing services. We serve clients across USA, UK, Canada, Australia, Singapore, and the Middle East. Hire dedicated software developers in India at competitive rates. Our AI-first approach to software development ensures faster delivery, better quality, and significant cost savings for startups and enterprises.
          </p>
        </div>
      </div>
    </footer>
  );
}
