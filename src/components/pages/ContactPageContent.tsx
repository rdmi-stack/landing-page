"use client";

import { Mail, Phone, MapPin, Clock, MessageSquare, Globe } from "lucide-react";
import { useModal } from "@/components/ModalProvider";

const contactMethods = [
  { icon: Mail, title: "Email Us", value: "info@rdmi.in", href: "mailto:info@rdmi.in", desc: "We respond within 2 hours" },
  { icon: Phone, title: "Call / WhatsApp", value: "+91 98185 65561", href: "tel:+919818565561", desc: "Mon–Sat, 10AM–7PM IST" },
  { icon: MessageSquare, title: "Live Chat", value: "Start a conversation", href: "#", desc: "Available during business hours" },
  { icon: Globe, title: "Social", value: "LinkedIn / Twitter", href: "#", desc: "Follow us for updates" },
];

const offices = [
  { icon: MapPin, location: "India (HQ)", address: "RDMI Tech Ventures Pvt. Ltd., India", timezone: "IST (UTC+5:30)" },
  { icon: MapPin, location: "USA", address: "Remote team, EST/PST overlap", timezone: "EST / PST" },
  { icon: MapPin, location: "UK", address: "Remote team, GMT overlap", timezone: "GMT / BST" },
];

export default function ContactPageContent() {
  const { openModal } = useModal();

  return (
    <div className="pb-20 lg:pb-32">
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Contact Us</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Talk to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Developers Directly</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
              No sales reps. No chatbots. Reach out and a senior developer will personally respond within 2 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((m, i) => (
            <a
              key={m.title}
              href={m.href}
             
             
             
             
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <m.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="font-semibold mb-1">{m.title}</h3>
              <p className="text-sm text-indigo-400 mb-1">{m.value}</p>
              <p className="text-xs text-zinc-600">{m.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Offices */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Presence</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {offices.map((o, i) => (
            <div
              key={o.location}
             
             
             
             
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <o.icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{o.location}</h3>
              <p className="text-sm text-zinc-500 mb-2">{o.address}</p>
              <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-600">
                <Clock className="w-3 h-3" /> {o.timezone}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Have a Project in Mind?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Get a free quote with detailed tech stack, timeline, and transparent pricing.
          </p>
          <button onClick={() => openModal()} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02]">
            Get Free Quote
          </button>
        </div>
      </section>
    </div>
  );
}
