"use client";
const techStack = [
  // AI & LLM
  { name: "OpenAI", category: "ai" },
  { name: "Anthropic Claude", category: "ai" },
  { name: "Google Gemini", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "CrewAI", category: "ai" },
  { name: "Hugging Face", category: "ai" },
  { name: "TensorFlow", category: "ai" },
  { name: "PyTorch", category: "ai" },
  { name: "Pinecone", category: "ai" },
  // Frontend
  { name: "Next.js", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Go", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Django", category: "backend" },
  // Mobile
  { name: "React Native", category: "mobile" },
  { name: "Flutter", category: "mobile" },
  { name: "Swift", category: "mobile" },
  { name: "Kotlin", category: "mobile" },
  // Cloud & DevOps
  { name: "AWS", category: "cloud" },
  { name: "Google Cloud", category: "cloud" },
  { name: "Microsoft Azure", category: "cloud" },
  { name: "Docker", category: "cloud" },
  { name: "Kubernetes", category: "cloud" },
  { name: "Terraform", category: "cloud" },
  { name: "Vercel", category: "cloud" },
  // Database
  { name: "PostgreSQL", category: "db" },
  { name: "MongoDB", category: "db" },
  { name: "Redis", category: "db" },
  { name: "Supabase", category: "db" },
  // Payments
  { name: "Stripe", category: "payments" },
  { name: "Razorpay", category: "payments" },
];

const categoryColors: Record<string, string> = {
  ai: "text-purple-400 border-purple-500/20",
  frontend: "text-blue-400 border-blue-500/20",
  backend: "text-emerald-400 border-emerald-500/20",
  mobile: "text-rose-400 border-rose-500/20",
  cloud: "text-amber-400 border-amber-500/20",
  db: "text-cyan-400 border-cyan-500/20",
  payments: "text-green-400 border-green-500/20",
};

const doubled = [...techStack, ...techStack];
const itemWidth = 160; // approx width per item including gap
const totalWidth = techStack.length * itemWidth;

export default function TrustBar() {
  return (
    <section className="py-8 border-y border-white/[0.06] bg-[#161616] overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-5">
        Our Tech Stack — 35+ Technologies We Ship With
      </p>

      {/* Marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#161616] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#161616] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div
            className="flex gap-3"
          >
            {doubled.map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border ${categoryColors[tech.category]} text-xs font-medium whitespace-nowrap hover:bg-white/[0.06] transition-colors`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
