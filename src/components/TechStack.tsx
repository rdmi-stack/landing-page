"use client";
const categories = [
  {
    label: "Frontend",
    techs: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    techs: ["Node.js", "Python", "Django", "FastAPI", "Go", "Java Spring"],
  },
  {
    label: "Mobile",
    techs: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  },
  {
    label: "Database",
    techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Supabase"],
  },
  {
    label: "Cloud & DevOps",
    techs: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform"],
  },
  {
    label: "AI / ML",
    techs: ["OpenAI", "LangChain", "TensorFlow", "PyTorch", "Hugging Face", "Pinecone"],
  },
];

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-20 lg:py-32 relative bg-[#161616]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
         
         
         
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Software Development Technologies
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Our App Development{" "}
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto">
            Our mobile app developers & web developers are experts in React, Next.js, Flutter, Python, Node.js, AWS & AI/ML.
            Right technology for your custom software — not just what&apos;s trendy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <div
              key={category.label}
             
             
             
             
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/20 transition-all"
            >
              <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider mb-4">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/5 text-zinc-300 hover:border-indigo-500/30 hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
