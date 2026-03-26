"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, FinLeap (USA)",
    text: "RDMI delivered our entire lending platform in 14 weeks — at half the cost we were quoted by 3 US agencies. The direct access to developers was a game-changer. No telephone game, just fast execution.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Founder, ShopKart (India)",
    text: "We needed a marketplace that could handle 50K+ orders/month. RDMI built it with AI recommendations that increased our average order value by 34%. Their AI-first approach is legit.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "VP Engineering, DataCore (UK)",
    text: "After a bad experience with another offshore team, I was skeptical. RDMI changed my mind completely. Daily standups with actual devs, clean code, and they shipped our MVP 2 weeks early.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "CEO, HealthStack (India)",
    text: "RDMI built our telemedicine platform during COVID. They understood the urgency, assembled a team in 48 hours, and we went live in 6 weeks. Now serving 100K+ patients.",
    rating: 5,
  },
  {
    name: "Michael Torres",
    role: "Product Lead, CloudSync (USA)",
    text: "The quality of code and architecture from RDMI rivals any Silicon Valley team I've worked with. The cost savings allowed us to invest more in marketing. Smart business decision.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Director, EduTech Pro (Singapore)",
    text: "RDMI didn't just build our LMS — they suggested AI features we hadn't even thought of. Auto-grading, plagiarism detection, personalized learning paths. They think like product partners.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Client Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Trusted by 200+{" "}
            <span className="gradient-text">Happy Clients</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
             
             
             
             
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20 transition-all"
            >
              <Quote className="w-8 h-8 text-indigo-500/20 mb-4" />
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="w-3 h-3 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
