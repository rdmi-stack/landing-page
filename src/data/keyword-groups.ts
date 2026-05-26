export interface PageTheme {
  // CSS gradient value for inline style (not Tailwind class — Tailwind purges dynamic classes)
  heroGradient: string;
  ctaGradient: string;
  urgencyColor: string;
  accent: string;
  icon: string;
}

export interface FormConfig {
  title: string;
  subtitle: string;
  projectTypes: string[];
  placeholder: string;
  buttonText: string;
  formType: string;
}

export interface KeywordGroup {
  slug: string;
  primaryKeyword: string;
  adGroupMatch: string;
  // When true, the page renders a WhatsApp-first hero with a minimal lead form
  // (Name, Phone, Email, Budget) instead of the full multi-field modal flow.
  // Used for high-CPC ad-driven LPs where lower form friction beats qualification.
  minimalForm?: boolean;
  // When present, the hero RIGHT column renders an auto-advancing portfolio
  // carousel of past project screenshots instead of the inline lead form.
  // The form moves to a horizontal strip directly below the hero.
  heroPortfolio?: { image: string; project: string; outcome: string; tech: string[] }[];
  // When true, hides all secondary sections (stats, pain strip, services grid,
  // case studies, deliverables, guarantees, tech stack, urgency, comparison,
  // cross-services). Used for paid-ads LPs that need a single, focused funnel.
  lean?: boolean;
  theme: PageTheme;
  form: FormConfig;
  meta: { title: string; description: string };
  hero: {
    badge: string;
    h1: string;
    subtitle: string;
    cta1: string;
    cta2: string;
    trustPoints: string[];
  };
  images: {
    hero: string;
    process: string;
    team: string;
    services: string[];
    portfolio: string[];
    cta: string;
  };
  stats: { value: string; label: string }[];
  services: { title: string; description: string; tags: string[] }[];
  uspHeadlines: { direct: string; cost: string; ai: string };
  process: { step: string; title: string; description: string }[];
  caseStudies?: { tag: string; headline: string; result: string; tech: string[]; weeks: number }[];
  testimonials?: { quote: string; author: string; role: string; rating: number }[];
  faq: { q: string; a: string }[];
  ctaSection: { headline: string; subtitle: string; buttonText: string };
  targetKeywords: string[];
}

export const keywordGroups: KeywordGroup[] = [
  {
    slug: "custom-software-development",
    primaryKeyword: "Custom Software Development Company",
    adGroupMatch: "Custom Software Development Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #4f46e5, #7c3aed, #4338ca)",
      ctaGradient: "linear-gradient(135deg, #4f46e5, #7c3aed, #4338ca)",
      urgencyColor: "#4f46e5",
      accent: "indigo",
      icon: "💻"
    },
    form: {
      title: "Talk to a Senior Software Developer",
      subtitle: "Senior software engineer (not a sales rep) calls you on WhatsApp in 2 hours",
      projectTypes: [
        "Custom Web App",
        "SaaS Platform",
        "ERP / CRM System",
        "Legacy Modernization",
        "API & Integration",
        "AI-Powered Software",
        "Other"
      ],
      placeholder: "What business problem do you need software to solve?",
      buttonText: "Get The Call →",
      formType: "software"
    },
    meta: {
      title: "Custom Software Development Company India | AI-First SaaS, ERP, CRM & Automation | RDMI",
      description: "Custom software development company for SaaS platforms, business workflow software, ERP, CRM, APIs, AI-powered products, and legacy modernization. Senior architects, source ownership, and 48-hour build plan."
    },
    hero: {
      badge: "Senior software architect callback in 2 hours",
      h1: "Custom Software Development Company for AI-First Products, Platforms, and Automation",
      subtitle: "Searching for a custom software development company? RDMI builds the systems behind modern businesses: SaaS products, ERP, CRM, workflow automation, APIs, dashboards, and AI-powered software with senior architecture from day one.",
      cta1: "Get Software Build Plan",
      cta2: "Talk to Software Architect",
      trustPoints: [
        "Senior software architect on WhatsApp in 2 hours",
        "48-hour scope, architecture, and delivery plan",
        "Source code and documentation owned by you",
        "AI, automation, integrations, and analytics planned from day one"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Scope the Business System",
        description: "A senior architect maps users, workflows, roles, data, integrations, risks, and the exact business outcome the software needs to create."
      },
      {
        step: "02",
        title: "Design the Product Architecture",
        description: "You get a practical build plan covering stack, modules, AI opportunities, permissions, delivery timeline, and launch path before implementation starts."
      },
      {
        step: "03",
        title: "Ship Working Software in Sprints",
        description: "Two-week delivery cycles with a live staging URL, tested features, demos, and clear decisions instead of vague status updates."
      },
      {
        step: "04",
        title: "Launch, Handover, and Improve",
        description: "Production deployment, CI/CD, monitoring, documentation, source-code handover, and post-launch support so your team can operate with confidence."
      }
    ],
    stats: [
      {
        value: "200+",
        label: "Custom Products Shipped to Production"
      },
      {
        value: "48 hrs",
        label: "Free Working Prototype — Before You Pay"
      },
      {
        value: "100%",
        label: "Money-Back Deadline Guarantee"
      },
      {
        value: "98%",
        label: "On-Time Delivery Across All Projects"
      }
    ],
    services: [
      {
        title: "Custom Web Application Development",
        description: "React, Next.js, Node.js on AWS with AI copilots inside the product from sprint one — smart search, auto-summaries, anomaly alerts. Custom web app development that scales to 10K concurrent users without a rewrite.",
        tags: [
          "Next.js",
          "Node.js",
          "PostgreSQL",
          "OpenAI"
        ]
      },
      {
        title: "Bespoke SaaS Development & Multi-Tenant Platforms",
        description: "SaaS development with tenant isolation, Stripe billing, usage metering, feature flags, and AI features in the core. Bespoke SaaS platforms built for day-one revenue — scales from first customer to ten thousand.",
        tags: [
          "Multi-Tenant",
          "Stripe",
          "Feature Flags",
          "Vercel AI SDK"
        ]
      },
      {
        title: "Custom ERP & CRM Software Development",
        description: "Custom ERP and CRM development that replaces SaaS subscriptions forever. Workflow automation, AI agents that draft follow-ups and reconcile data, GST-ready invoicing, Tally integration. Own the system, full source code, zero lock-in.",
        tags: [
          "Custom ERP",
          "CRM",
          "n8n",
          "LangGraph"
        ]
      },
      {
        title: "AI-Powered Custom Software Development",
        description: "Custom software engineering with OpenAI, Anthropic, Google models orchestrated by LangChain and LangGraph. RAG on your docs, autonomous agents on your workflows, LangSmith evals on every deployment. Production AI — not another POC.",
        tags: [
          "LangChain",
          "LangGraph",
          "Pinecone",
          "LangSmith"
        ]
      },
      {
        title: "Custom Application Development & Legacy Modernisation",
        description: "Custom application development services with parallel-run migration pattern. New system runs beside your legacy stack with data reconciliation for 30-90 days, then cutover. SAP, Tally, on-prem, mainframe — zero downtime where it matters.",
        tags: [
          "Migration",
          "SAP",
          "Tally",
          "Kafka"
        ]
      },
      {
        title: "Enterprise Software Development & API Engineering",
        description: "Enterprise software development with REST, GraphQL, webhooks, event buses, and message queues that glue your stack together. AI-generated typed clients, contract tests, and anti-corruption layers that keep new code clean.",
        tags: [
          "GraphQL",
          "Kafka",
          "Webhooks",
          "OpenAPI"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You speak to senior software architects early, so the first conversation covers tradeoffs, integrations, risks, and the build path instead of generic sales qualification.",
      ai: "AI-first custom software architecture where it belongs: agents, RAG, copilots, document workflows, analytics, and automation planned into the product instead of bolted on after launch.",
      cost: "Full source-code ownership, documentation, deployment handover, and clean architecture so the software becomes your asset, not another vendor dependency."
    },
    faq: [
      {
        q: "How does custom software development work with the show-first-then-commit model?",
        a: "Brief us today. Within 48 hours you have a free clickable prototype with real flows on your real problem — not reused templates. You test it, your team tests it, your investors test it. Love it? We start the build. Don't love it? Walk away with the prototype, zero cost, NDA still in force. We've never sent an invoice for a prototype."
      },
      {
        q: "What does the money-back deadline guarantee on custom software actually cover?",
        a: "Every milestone has a contracted delivery date. If we miss it without an approved scope change, you get a pro-rated refund of that milestone — written into the contract before sprint one. We've shipped 200+ custom software products and refunded fewer than three deadlines in five years. The guarantee isn't marketing copy, it's a clause."
      },
      {
        q: "Why pick a custom software development company over off-the-shelf SaaS?",
        a: "Off-the-shelf SaaS forces you into someone else's workflow, charges per seat forever, and limits how AI plugs in. Custom software development gives you a system built around your actual operations — with AI agents, custom workflows, and full source code ownership. Beyond a certain scale, custom always wins on cost-of-ownership and AI integration depth."
      },
      {
        q: "How is AI-native development different from a traditional agency?",
        a: "Traditional agencies bill by the hour and type every line by hand. Our senior engineers use the latest AI tools to move 3x faster — humans own architecture and review every feature before it ships. You get working software in weeks instead of quarters, and the engineer who scoped it is the engineer who built it."
      },
      {
        q: "Will AI-generated code hallucinate bugs into production?",
        a: "Not on our workflow. Every AI-generated PR is reviewed by the senior engineer who owns that module. Typed schemas, contract tests, and end-to-end tests run on every commit. Measured defect rate in production is lower than a fully-manual team because review catches what a junior would miss."
      },
      {
        q: "Who owns the code, AI prompts, and model weights?",
        a: "You do, one hundred percent, from day one. Full source code in your private GitHub. Custom prompts, fine-tuned weights, eval sets, and design files handed over on payment. No retained rights, no background licensing, no exit friction."
      },
      {
        q: "What happens when the next GPT or Claude model ships and breaks my integration?",
        a: "We build model-agnostic from the start with provider abstractions and eval suites. When a new model ships we re-run evals — swap if it scores better, roll back if it regresses. You're not coupled to one vendor's release cycle."
      },
      {
        q: "How do you measure success — working software or a demo that rots in staging?",
        a: "Benchmarks written into the contract. Task-success rate, latency, defect rate, and business KPIs tracked from sprint one. If we miss the benchmarks we iterate free. If the first milestone disappoints, you walk — nothing owed."
      },
      {
        q: "Can you deploy on-prem or in our VPC for regulated data?",
        a: "Yes. AWS, GCP, Azure, and on-prem Kubernetes. Private LLMs with Llama or Mistral in your VPC when healthcare, BFSI, or legal compliance demands it. Same LangChain code runs on OpenAI or vLLM — no rewrite on migration."
      }
    ],
    testimonials: [
      {
        quote: "They shipped a production SaaS far faster than our previous vendor quoted — senior engineers throughout, AI-accelerated delivery. We stopped getting junior output at senior rates.",
        author: "A.K.",
        role: "CTO, B2B SaaS (Mumbai)",
        rating: 5
      },
      {
        quote: "Legacy ERP replaced with zero downtime using their parallel-run pattern. The architecture call alone saved us from a costly mistake. The platform still runs smoothly with no escalations.",
        author: "R.M.",
        role: "Head of Engineering, FinTech (Delhi NCR)",
        rating: 5
      },
      {
        quote: "Working staging URL in week two and working software every sprint. Our in-house team learned a lot watching them work. Source code, eval sets, and docs — all handed over clean.",
        author: "S.P.",
        role: "Founder, D2C Brand (Bangalore)",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Build Software That Becomes the Operating System of Your Business.",
      subtitle: "Get a senior architecture review, practical build plan, and clear path for SaaS, ERP, CRM, automation, or AI-powered product development.",
      buttonText: "Get Software Build Plan"
    },
    targetKeywords: [
      "custom software development",
      "custom software development company",
      "custom software development services",
      "custom software development companies",
      "custom software development agency",
      "custom software development firms",
      "bespoke software development",
      "bespoke software development services",
      "custom software engineering",
      "custom application development services",
      "custom application development company",
      "enterprise software development",
      "saas development company",
      "software development company",
      "software development services"
    ]
  },
  {
    slug: "mobile-app-development",
    primaryKeyword: "Mobile App Development Company",
    adGroupMatch: "Mobile App Development Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
      ctaGradient: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
      urgencyColor: "#a855f7",
      accent: "purple",
      icon: "📱"
    },
    form: {
      title: "Talk to a Senior App Developer",
      subtitle: "Senior app developer (not a sales rep) WhatsApps you in 2 hours",
      projectTypes: [
        "AI-Powered Flutter App",
        "Android App (Kotlin)",
        "iOS App (Swift)",
        "E-Commerce / Marketplace App",
        "Healthcare / FinTech App",
        "On-Demand / Delivery App",
        "Other"
      ],
      placeholder: "What should your app do that competitors' apps don't?",
      buttonText: "Get The Call →",
      formType: "mobile-app"
    },
    meta: {
      title: "Mobile App Development Company India | AI-First iOS, Android, Flutter & React Native | RDMI",
      description: "Mobile app development company for AI-first iOS, Android, Flutter, React Native, healthcare, fintech, ecommerce, marketplace, grocery, delivery, and SaaS mobile apps. Senior app architects and 48-hour build plan."
    },
    hero: {
      badge: "Senior mobile app architect callback in 2 hours",
      h1: "Mobile App Development Company for AI-First iOS, Android, Flutter, and React Native Apps",
      subtitle: "Searching for a mobile app development company? RDMI builds mobile products that users keep using: iOS, Android, Flutter, React Native, marketplace apps, healthcare apps, fintech apps, delivery apps, and AI-powered mobile experiences with launch strategy built in.",
      cta1: "Get App Build Plan",
      cta2: "Talk to App Architect",
      trustPoints: [
        "Senior mobile app architect on WhatsApp in 2 hours",
        "48-hour app product, stack, and launch plan",
        "iOS, Android, Flutter, React Native, and AI app delivery",
        "Source code, release docs, and analytics ownership"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&q=80",
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
        "https://images.unsplash.com/photo-1605170439002-90845e8c0137?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Map the Mobile Product",
        description: "A senior app architect reviews your users, workflow, business model, platform needs, AI opportunities, integrations, and store-launch risks."
      },
      {
        step: "02",
        title: "Choose the Right Stack",
        description: "Flutter, React Native, native iOS, native Android, or PWA is chosen from product needs, team skill, performance, roadmap, and budget, not agency preference."
      },
      {
        step: "03",
        title: "Ship Test Builds Every Sprint",
        description: "You test real app builds through TestFlight, Play Console internal testing, or device builds with analytics, crash reporting, and QA from early sprints."
      },
      {
        step: "04",
        title: "Launch and Improve Retention",
        description: "App Store and Play Store submission, privacy assets, release notes, analytics, onboarding, push loops, and post-launch iteration are handled as part of delivery."
      }
    ],
    stats: [
      {
        value: "60+",
        label: "Mobile Apps Shipped to Production"
      },
      {
        value: "72 hrs",
        label: "Free Working Prototype on Your Phone"
      },
      {
        value: "100%",
        label: "Money-Back Deadline Guarantee"
      },
      {
        value: "98%",
        label: "First-Submission Store Approval Rate"
      }
    ],
    services: [
      {
        title: "Flutter App Development With AI Copilots",
        description: "Flutter app development for iOS and Android from a single codebase, with OpenAI models, voice commands, and smart recommendations baked in from sprint one. An app that learns, predicts, and converts on every session — not a hamburger menu over a REST API.",
        tags: [
          "Flutter",
          "OpenAI",
          "Firebase",
          "LangChain"
        ]
      },
      {
        title: "Android App Development With On-Device ML",
        description: "Native Android app development with Kotlin, Jetpack Compose, and TensorFlow Lite inference running on the device — real-time image recognition, voice search, predictive text. Works offline, protects user data, runs 60fps on mid-range hardware.",
        tags: [
          "Kotlin",
          "TensorFlow Lite",
          "Jetpack Compose",
          "On-Device ML"
        ]
      },
      {
        title: "iOS App Development With Core ML & Apple Intelligence",
        description: "Native iOS app development with Swift, SwiftUI, Core ML inference, Siri shortcuts, and Apple Intelligence hooks. Vision framework for face and object detection. Passes App Review on first submission — 4.5+ star rating average.",
        tags: [
          "Swift",
          "Core ML",
          "Vision",
          "Apple Intelligence"
        ]
      },
      {
        title: "AI App Development — Voice & Conversational Mobile Apps",
        description: "AI app development that lets users talk to your app instead of tapping through five screens. Whisper on-device for transcription, the latest LLMs for reasoning, ElevenLabs TTS for natural responses. WhatsApp and Twilio integrations for hybrid UX.",
        tags: [
          "Whisper",
          "OpenAI",
          "WhatsApp API",
          "Twilio"
        ]
      },
      {
        title: "Ecommerce App Development & Marketplace Apps",
        description: "Ecommerce app development with visual search — upload a photo, find the product. AI-written checkout assistance, personalised recommendations trained on your catalogue, fraud detection on payment flows. Razorpay, Stripe, UPI Intent ready.",
        tags: [
          "Visual Search",
          "Recommendations",
          "Razorpay",
          "Stripe"
        ]
      },
      {
        title: "Custom Mobile App Development for Healthcare & FinTech",
        description: "Custom mobile app development with compliance baked in — HIPAA-aligned health apps with AI triage and telemedicine, FinTech apps with AI KYC, credit signals, and fraud detection. Compliance designed from sprint one — not bolted on during security review.",
        tags: [
          "HIPAA",
          "DPDP Act",
          "KYC",
          "Telemedicine"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You speak to senior app architects early, so platform choice, launch risk, performance, compliance, and roadmap tradeoffs are handled before design and code begin.",
      ai: "AI-first mobile app development where it improves real usage: voice search, visual search, smart recommendations, document scanning, copilots, and on-device intelligence.",
      cost: "You own the mobile source code, release documentation, analytics setup, and deployment handover. No template lock-in, no hidden platform dependency."
    },
    faq: [
      {
        q: "How does mobile app development work with the show-first-then-commit model?",
        a: "Brief us today. Within 72 hours you have a free working prototype installable on your phone — real screens, real AI flows, real navigation. You test it, your team tests it, your users test it. Love it? We start the build. Don't love it? Walk away with the prototype, zero cost, NDA still in force. We've never invoiced for a prototype."
      },
      {
        q: "What does the money-back deadline guarantee on mobile app development cover?",
        a: "Every milestone has a contracted delivery date — discovery, prototype, MVP, store submission. If we miss it without an approved scope change, you get a pro-rated refund of that milestone — written into the contract before sprint one. We've shipped 60+ mobile apps and refunded fewer than two deadlines in three years."
      },
      {
        q: "Why does every new app need AI in the core in 2026?",
        a: "Users now expect voice, visual search, and intelligent recommendations by default. Apps that force users through static menus lose to apps that understand intent. Session length doubles on voice-enabled flows, add-to-cart rises on visual search, retention goes 4x on personalised push. AI in the core is the new table-stakes UX — not a feature flag."
      },
      {
        q: "Flutter, React Native, or Native — which ships AI best?",
        a: "Flutter for most AI-integrated apps — single codebase, strong TensorFlow Lite bindings, fast iteration. Native Swift or Kotlin when you need heavy on-device ML, Apple Intelligence, or AR. React Native when you already have a React team. A senior engineer recommends the right path on your first call — not a template answer."
      },
      {
        q: "Will the AI features still work when GPT-5 or Claude 4 ships?",
        a: "We build model-agnostic with provider abstractions and eval suites. New model ships, we re-run evals — swap if it scores better, roll back if it regresses. Same app code runs on OpenAI, Anthropic, Google models, or on-device Phi-3. You're not coupled to a vendor release cycle."
      },
      {
        q: "What about hallucinations in a consumer app?",
        a: "Grounded retrieval, forced citations on factual responses, typed tool outputs, and output schemas that fail closed. Voice and chat flows have a confidence threshold — below it, the app falls back to a human-handoff or a deterministic UI. Eval harness catches regressions before release."
      },
      {
        q: "Who owns the code, AI prompts, and trained models?",
        a: "You do, from day one. Source code in your private GitHub. Custom prompts, fine-tuned weights, training data references, design files — all handed over on payment. NDA signed before first call. No retained rights, no SDK lock-in."
      },
      {
        q: "How fast from first call to App Store?",
        a: "Prototype in 48 hours. MVP with core AI features in 6-10 weeks. Full app with voice, vision, and agent features in 12-16 weeks. TestFlight and Play Console builds every 14 days. Most apps clear first-submission review — 98% approval rate last year."
      }
    ],
    testimonials: [
      {
        quote: "Our previous agency shipped a basic wrapper over a REST API. RDMI shipped voice search, visual product lookup, and an AI copilot in the same build — an app that actually feels modern.",
        author: "N.R.",
        role: "Product Head, D2C Retail (Bangalore)",
        rating: 5
      },
      {
        quote: "On-device Core ML running face detection and document scanning without a backend call — our KYC flow got dramatically faster. Full source code, model weights, and prompts in our repo from sprint two.",
        author: "V.K.",
        role: "CTO, FinTech (Mumbai)",
        rating: 5
      },
      {
        quote: "TestFlight build in week two, store submission cleared first time, and the AI triage flow caught a compliance issue our legal team had missed. The senior engineer was on our Slack the entire project — no project-manager filter.",
        author: "D.S.",
        role: "Founder, HealthTech (Hyderabad)",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Build a Mobile App People Actually Keep Using.",
      subtitle: "Get a senior app architecture review, platform recommendation, launch plan, and roadmap for iOS, Android, Flutter, React Native, or AI-powered mobile products.",
      buttonText: "Get App Build Plan"
    },
    targetKeywords: [
      "mobile app developer",
      "mobile app development company",
      "mobile app development services",
      "app development company",
      "android app development company",
      "flutter app development company",
      "ios app development company",
      "ai app development company",
      "best mobile app development companies",
      "mobile application development company",
      "ecommerce app development company",
      "mobile app development agency",
      "custom mobile app development company",
      "android app developer",
      "mobile development company"
    ]
  },
  {
    slug: "web-development-company",
    primaryKeyword: "Web Development Company",
    adGroupMatch: "Web Development Company",
    minimalForm: true,
    lean: true,
    theme: {
      heroGradient: "linear-gradient(135deg, #7c3aed, #9333ea, #6d28d9)",
      ctaGradient: "linear-gradient(135deg, #7c3aed, #9333ea, #6d28d9)",
      urgencyColor: "#7c3aed",
      accent: "violet",
      icon: "🌐"
    },
    form: {
      title: "Talk to a Senior Web Developer",
      subtitle: "Senior Indian web developer (not a sales rep) WhatsApps you in 2 hours",
      projectTypes: [
        "Business / Lead-Gen Website",
        "E-Commerce Store",
        "Web App / SaaS Platform",
        "WordPress / CMS",
        "Website Redesign & Speed",
        "Landing Pages for Ads",
        "Other"
      ],
      placeholder: "What should your website do for your business?",
      buttonText: "Get The Call →",
      formType: "web-dev"
    },
    meta: {
      title: "Web Development Company India — Get a Website That Brings Leads, Not a Brochure | RDMI",
      description: "A website built to win you more enquiries — not just a static brochure. Senior Indian web developer (not a sales rep) WhatsApps you in 2 hours. Free 48-hour prototype before you pay. 200+ websites shipped."
    },
    hero: {
      badge: "💬 Talk to a Senior Indian Web Developer on WhatsApp · 2-Hour Callback",
      h1: "Get a Website That Brings You Leads — Not a Brochure That Sits There.",
      subtitle: "Most websites are expensive brochures. We build sites designed to turn visitors into enquiries — through Google rankings, a 24/7 AI chat assistant, and pages that load in under 1 second. Built by senior Indian developers who've shipped 200+ websites. Talk direct on WhatsApp in 2 hours. Free 48-hour prototype.",
      cta1: "Talk to Web Developer on WhatsApp",
      cta2: "↓ See Live Websites",
      trustPoints: [
        "Built to turn visitors into enquiries — not just a brochure",
        "Senior Indian web developer WhatsApps you in 2 hours — not a sales rep",
        "Free 48-hour clickable prototype before you pay a rupee",
        "Money-back if we miss the deadline — written into the contract"
      ]
    },
    heroPortfolio: [
      {
        image: "/images/portfolio-ai-dashboard.png",
        project: "B2B SaaS · Bangalore",
        outcome: "Marketing site with a built-in AI chat agent that engages visitors and routes enquiries to the sales team.",
        tech: [
          "Next.js",
          "AI Chat Agent",
          "WhatsApp API",
          "Vercel"
        ]
      },
      {
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
        project: "D2C Brand · Ahmedabad",
        outcome: "Headless storefront on Shopify with fast product pages, clean checkout, and integrated payments.",
        tech: [
          "Next.js",
          "Shopify",
          "Razorpay",
          "Search"
        ]
      },
      {
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
        project: "Healthcare Network · Pan-India",
        outcome: "SEO-structured, accessible website with schema markup and a fast patient-facing experience.",
        tech: [
          "Next.js",
          "Sanity CMS",
          "ABDM",
          "Schema"
        ]
      },
      {
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
        project: "FinTech · Mumbai",
        outcome: "AI-powered on-site search and support, built to load in under a second on any device.",
        tech: [
          "Next.js",
          "AI Search",
          "Razorpay",
          "AWS"
        ]
      },
      {
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
        project: "Booking SaaS · Pune",
        outcome: "AI agent that qualifies leads around the clock and notifies the sales team on WhatsApp.",
        tech: [
          "Next.js",
          "AI Agent",
          "WhatsApp API",
          "Slack"
        ]
      },
      {
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        project: "B2B Marketplace · Bangalore",
        outcome: "Multi-vendor marketplace with seller dashboards and integrated payments.",
        tech: [
          "Next.js",
          "Razorpay",
          "PostgreSQL",
          "tRPC"
        ]
      }
    ],
    images: {
      hero: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80"
      ],
      portfolio: [
        "/images/portfolio-ai-dashboard.png",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "WhatsApp Call in 2 Hours",
        description: "A senior Indian web developer (not a sales rep) WhatsApps you within 2 hours. We map what your website needs to do — leads, sales, bookings — your content, and the fastest route to measurable results."
      },
      {
        step: "02",
        title: "Free 48-Hour Clickable Prototype",
        description: "You get a real working preview of your website — your brand, your content, your goals. Test it, show your team, show investors. Walk away at zero cost if it misses. No prototype invoice, ever."
      },
      {
        step: "03",
        title: "Live Staging Site in 14 Days",
        description: "Your full site goes live on a staging URL you can share. Loads under 1 second on any phone, any city. AI chat agent already answering visitors. You approve every screen before launch."
      },
      {
        step: "04",
        title: "Launch + 30 Days Free Support",
        description: "Site goes live with analytics, SEO, and the AI agent already booking demos. 30 days of free bug fixes and content tweaks. Full source code in your GitHub from day one — yours to keep forever."
      }
    ],
    stats: [
      {
        value: "200+",
        label: "Websites & Web Apps Shipped"
      },
      {
        value: "Sub-1s",
        label: "Page Load on Any Device"
      },
      {
        value: "24/7",
        label: "AI Chat Assistant Built In"
      },
      {
        value: "14 days",
        label: "To a Live Staging Site"
      }
    ],
    services: [
      {
        title: "AI Consulting and Software Roadmapping",
        description: "We identify where AI, automation, custom software, and web systems will actually create leverage — then turn that into a buildable roadmap, not a strategy PDF that dies in a folder.",
        tags: [
          "AI Strategy",
          "Automation",
          "Architecture",
          "Roadmap"
        ]
      },
      {
        title: "Custom Software and SaaS Platforms",
        description: "Dashboards, portals, booking engines, CRMs, marketplaces, and internal tools with smart search, auto-summaries, AI agents, permissions, payments, and operational workflows baked in.",
        tags: [
          "React",
          "Next.js",
          "Node.js",
          "Vercel Edge"
        ]
      },
      {
        title: "Headless E-Commerce With AI Search and Recommendations",
        description: "Next.js on top of Shopify Storefront API or Medusa.js. Semantic product search, personalised recommendations, AI checkout copilot, edge-cached product pages. Shipped in 8-10 weeks.",
        tags: [
          "Next.js",
          "Shopify",
          "Medusa.js",
          "AI Search"
        ]
      },
      {
        title: "High-Converting Landing Pages With AI A/B Tests",
        description: "Campaign-ready pages for Google Ads, product launches, and lead gen. GA4, A/B test rig, conversion-optimised copy. AI-written variants tested against each other — winner promoted automatically.",
        tags: [
          "Next.js",
          "GA4",
          "A/B Testing",
          "Vercel"
        ]
      },
      {
        title: "WordPress and Headless CMS for Content Teams",
        description: "Custom WordPress theme, Gutenberg blocks, WPGraphQL headless, or Sanity-powered Next.js. 90+ Core Web Vitals, SEO baked in, AI-generated alt text and meta descriptions. Content team ships without a developer.",
        tags: [
          "WordPress",
          "WPGraphQL",
          "Sanity",
          "Next.js"
        ]
      },
      {
        title: "Redesign and Speed Optimisation With Zero Downtime",
        description: "Slow, ugly, not converting? Rebuild on Next.js and Vercel Edge with AI copilot, GEO schema, and sub-1s TTFB. Parallel-run migration — old site stays up until the new one clears your benchmarks.",
        tags: [
          "Migration",
          "Lighthouse 90+",
          "Edge Cache",
          "GEO"
        ]
      }
    ],
    uspHeadlines: {
      direct: "A senior Indian developer with 8+ years building SaaS, e-commerce, and SMB sites WhatsApps you in 2 hours. No sales rep filtering your questions. The same engineer who scopes your site codes it and supports it for 100 days after launch.",
      ai: "Built-in AI chat agent that answers visitor questions, books demos, and qualifies leads at 3 AM. Most clients see 30–50% more inbound demos in the first 60 days — without spending one extra rupee on ads.",
      cost: "Full source code in your GitHub from day one. No hosting tax, no CMS licensing, no per-seat fees, no exit penalty. If we ever disappoint you, take the repo to any other team — zero friction, zero lock-in."
    },
    faq: [
      {
        q: "How is RDMI different from other web development companies?",
        a: "Three things. You talk directly to a senior developer on WhatsApp within 2 hours — not a sales rep. You get a free working prototype in 48 hours and pay only after you approve. And every contract has a money-back clause if we miss the deadline. Most Indian agencies promise these in proposals but won't put them in the contract. We do."
      },
      {
        q: "What if my website doesn't bring leads after launch?",
        a: "We don't hand over a site and disappear. The first 30 days are free — we tune copy, the AI chat agent, analytics, and bugs with you. If it isn't bringing traffic we diagnose it (usually SEO, copy, or chat setup) and fix it. Average client sees their first qualified lead within 14 days of launch."
      },
      {
        q: "How much does a website cost?",
        a: "Depends on scope. A business website with AI chat starts around ₹1.5L. Lead-generation sites run ₹2.5L–₹5L. E-commerce stores ₹4L–₹10L. Custom web apps or SaaS ₹8L–₹25L+. We share a fixed-price quote on the first WhatsApp call — no hourly billing, no surprise change orders."
      },
      {
        q: "Can you also handle SEO, Google Ads, and AI search visibility?",
        a: "Yes. Search structure, analytics, schema, page speed, and conversion tracking are included in every growth build. We can also run SEO, GEO/AEO, Google Ads, landing-page testing, and marketing automation after launch."
      },
      {
        q: "Who owns the code? Can I move it to another team later?",
        a: "You own everything, 100%, from day one. Source code in your private GitHub. Designs in your Figma. Content in your CMS. AI prompts in your repo. No proprietary CMS, no recurring license fees, no hosting lock-in. If you ever want to move to another team, you can — no penalty, no friction. We earn your business by performing, not by trapping you."
      },
      {
        q: "How fast can my website actually launch?",
        a: "Free clickable prototype within 48 hours of the first call. Simple business website live in 2–3 weeks. Lead-gen site live in 3–4 weeks. E-commerce live in 6–10 weeks. Custom web app live in 8–16 weeks. Every project has weekly staging updates so you can see progress and request changes in real time — not just status emails."
      }
    ],
    testimonials: [
      {
        quote: "Our old site barely engaged anyone. RDMI rebuilt it with an AI chat agent on the homepage that answers visitors and routes them to us. A senior developer was on WhatsApp with us throughout the build.",
        author: "P.M.",
        role: "Head of Marketing, B2B SaaS (Pune)",
        rating: 5
      },
      {
        quote: "They rebuilt our store with fast product pages, a clean checkout, and instant loads on any phone. Full source code in our GitHub on day one — no agency lock-in. Best Indian team we've worked with.",
        author: "A.S.",
        role: "Founder, D2C Brand (Ahmedabad)",
        rating: 5
      },
      {
        quote: "Senior engineer on our WhatsApp from day one — no account-manager filter, no junior copy-paste. Our website now qualifies and routes leads to my sales team instead of just sitting there.",
        author: "J.V.",
        role: "CTO, MarTech Startup (Bangalore)",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Stop Paying for Websites That Just Sit There.",
      subtitle: "Get a website that earns its keep. WhatsApp a senior Indian web developer in 2 hours — not a sales rep with a slide deck. Free 48-hour prototype before you pay. Source code yours from day one.",
      buttonText: "Talk to Web Developer on WhatsApp"
    },
    targetKeywords: [
      "web development company",
      "website development company",
      "web development services",
      "web development agency",
      "web application development",
      "website developer",
      "custom website development",
      "web app development services",
      "website design and development services",
      "best web development companies",
      "web designing company",
      "website development service",
      "ecommerce website development company",
      "shopify website development",
      "building website for business"
    ]
  },
  {
    slug: "ai-software-development",
    primaryKeyword: "AI Software Development Company",
    adGroupMatch: "AI Software Development Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #9333ea, #db2777, #7e22ce)",
      ctaGradient: "linear-gradient(135deg, #9333ea, #db2777, #7e22ce)",
      urgencyColor: "#9333ea",
      accent: "purple",
      icon: "🤖"
    },
    form: {
      title: "Talk to a Senior AI Developer",
      subtitle: "Senior AI developer calls you in 2 hours — not a salesperson",
      projectTypes: [
        "AI Chatbot / Voice Agent",
        "Autonomous AI Agent",
        "RAG / Knowledge Base",
        "ML Model / Predictive Analytics",
        "Computer Vision / Document AI",
        "AI Integration into Existing Software",
        "Other"
      ],
      placeholder: "What manual process do you want AI to automate?",
      buttonText: "Talk to AI Developer",
      formType: "ai-software"
    },
    meta: {
      title: "AI Software Development Company India | AI Agents, RAG, Chatbots & Automation | RDMI",
      description: "AI software development company for production AI agents, RAG systems, AI chatbots, copilots, workflow automation, document AI, and private LLM deployments. Prototype in 2 weeks."
    },
    hero: {
      badge: "🤖 Production AI in 8 Weeks — Not Another Failed POC",
      h1: "AI Software Development Company for Agents, RAG, Chatbots, and Automation",
      subtitle: "Searching for an AI software development company? RDMI builds production AI systems on OpenAI, Anthropic, Google, and open-source LLMs — with LangGraph agents, RAG, evals, observability, guardrails, and private deployment options from day one.",
      cta1: "Talk to AI Engineer",
      cta2: "See AI Products We Built",
      trustPoints: [
        "50+ AI systems shipped to production",
        "92% task-success rate at launch",
        "8-week prototype-to-production average",
        "LangSmith evals on every deployment"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1655720828018-edd71a68420e?w=800&q=80",
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "AI Strategy Call — Within 2 Hours",
        description: "Senior AI engineer audits your use case, data readiness, and the right stack (LLM vs RAG vs agent vs fine-tune). You leave with an honest build-vs-buy answer — not a pitch deck."
      },
      {
        step: "02",
        title: "Working Prototype in 2 Weeks",
        description: "Real AI running on your real data — not a Figma mockup. You test it hands-on. Eval dataset locked and target accuracy written into the contract before full build."
      },
      {
        step: "03",
        title: "Production Build in 6–8 Weeks",
        description: "LangSmith tracing, typed tool schemas, guardrails, fallback models, rate limiting, and human-in-the-loop gates. Shipped against contracted eval benchmarks — or we iterate free."
      },
      {
        step: "04",
        title: "Deploy, Measure, Keep Improving",
        description: "KPI dashboard live from day one. Task success, latency p95, hallucination rate, cost per run. 30-day free tuning period. Retainer for eval-driven improvement."
      }
    ],
    stats: [
      {
        value: "50+",
        label: "AI Systems Live in Production"
      },
      {
        value: "92%",
        label: "Task-Success Rate at Launch"
      },
      {
        value: "8 wks",
        label: "Prototype to Production"
      },
      {
        value: "76%",
        label: "Enterprises Buy AI, Don't Build (Menlo)"
      }
    ],
    services: [
      {
        title: "AI Chatbots That Deflect 60% of Tickets From Day One",
        description: "Grounded RAG on your help centre and tickets — not template bots that hallucinate. WhatsApp, web, Slack. Live in 14 days with citations, CRM integration, and a deflection benchmark in the contract.",
        tags: [
          "OpenAI",
          "LangChain",
          "WhatsApp API",
          "Pinecone"
        ]
      },
      {
        title: "Autonomous Agents That Actually Finish Work",
        description: "LangGraph state machines and CrewAI crews that own a workflow end-to-end — read, enrich, decide, act, log. Built with evals and human approval gates so they don't go rogue.",
        tags: [
          "LangGraph",
          "CrewAI",
          "AutoGen",
          "n8n"
        ]
      },
      {
        title: "RAG Systems Your Team Will Actually Use",
        description: "Hybrid retrieval, re-ranking, forced citations, and hallucination guardrails. Plugs into Slack, Teams, your CRM. Every answer traces back to the source document — no making things up.",
        tags: [
          "LlamaIndex",
          "Pinecone",
          "pgvector",
          "Citations"
        ]
      },
      {
        title: "AI-Powered SaaS + Copilots",
        description: "Embed smart search, auto-summarisation, anomaly detection, and conversational workflows into your product. Vercel AI SDK, streaming UI, multi-model routing between OpenAI models, Claude, and Gemini.",
        tags: [
          "Vercel AI SDK",
          "OpenAI",
          "Claude",
          "Gemini"
        ]
      },
      {
        title: "Computer Vision & Document AI With 95%+ Accuracy",
        description: "LLM-powered OCR that handles messy scans, invoices, KYC docs, contracts, and medical records. Pushes clean structured data to your ERP — not another dashboard screenshot.",
        tags: [
          "Textract",
          "YOLOv8",
          "PyTorch",
          "OpenCV"
        ]
      },
      {
        title: "Private / On-Prem LLM Deployments",
        description: "Llama, Mistral, or your fine-tuned model in your VPC. Same orchestration code runs on OpenAI or vLLM — no rewrite. Required for healthcare, BFSI, legal, and regulated data.",
        tags: [
          "Llama",
          "Mistral",
          "vLLM",
          "VPC Deploy"
        ]
      }
    ],
    uspHeadlines: {
      direct: "Your senior AI engineer gets on a call in 2 hours — not a sales rep with a deck. The person architecting your system is the one you talk to every sprint.",
      cost: "You own the code, the prompts, the eval sets, and the model weights. No per-token markup. No vendor lock-in. Run on OpenAI today, swap to Llama in your VPC tomorrow — same codebase.",
      ai: "We ship with LangSmith evals and observability from day one. An AI system you can't measure is one that silently fails. Every deployment has task-success benchmarks in the contract."
    },
    faq: [
      {
        q: "How is this different from building on ChatGPT or Claude directly?",
        a: "A raw LLM is a component. Production AI software is evals, retrieval, guardrails, tool schemas, observability, fallback logic, rate limiting, audit logs, and the UI around it. That's the 90% of work that decides whether your AI ships or rots in a demo. Anyone can prompt GPT — we build the infrastructure that makes it reliable."
      },
      {
        q: "What happens when the underlying LLM (GPT-5, Claude 4) ships and breaks my system?",
        a: "We design model-agnostic. Every deployment has an eval suite — when a new model ships we re-run evals, swap if it scores better, roll back if it regresses. You're not coupled to one vendor's release cycle. Same code runs across OpenAI, Anthropic, Google models, and Llama."
      },
      {
        q: "Can AI actually be trusted in production without hallucinations?",
        a: "Yes, with the right architecture. Grounded retrieval with forced citations, typed tool outputs, output validation schemas, and human-in-the-loop on high-stakes decisions. Hallucinations drop to near-zero when the model is forced to cite sources or call deterministic tools. We write eval suites that fail the build if hallucination rate exceeds 2%."
      },
      {
        q: "How do you measure AI success — not impressions, real outcomes?",
        a: "Task-success rate (did the AI complete the goal?), latency p95, tool error rate, human-override rate, cost per run, and hallucination rate. Dashboards in LangSmith or Langfuse. You see every trace. Benchmarks written into the contract — if we miss them, we iterate free."
      },
      {
        q: "Who owns the model weights, prompts, and training data?",
        a: "You do. Full source code, prompts, eval sets, and any fine-tuned weights handed over on payment. Your training data never leaves your environment under private deploy. NDA signed before the first call. No clause letting us reuse your data for other clients."
      },
      {
        q: "Do you offer on-prem or private LLM for regulated data?",
        a: "Yes. Llama, Mistral, or your own fine-tuned model hosted in your VPC on AWS, GCP, Azure, or bare metal. Routine for healthcare, BFSI, legal, and defence. Same LangChain / LangGraph code runs on OpenAI or vLLM — no rewrite, no vendor switch."
      }
    ],
    ctaSection: {
      headline: "Stop Writing the AI Strategy Deck. Ship Production AI.",
      subtitle: "Senior AI engineer on the call in 2 hours — not a salesperson. Working prototype in 2 weeks. Production in 8. Evals, observability, guardrails, and source ownership included.",
      buttonText: "Talk to AI Engineer"
    },
    targetKeywords: [
      "ai software development company",
      "ai software development",
      "ai development company",
      "ai app development company",
      "ai agent development company",
      "custom ai software development",
      "ai chatbot development company",
      "rag development company",
      "ai automation company",
      "ai consulting services",
      "enterprise ai solutions"
    ]
  },
  {
    slug: "ecommerce-development",
    primaryKeyword: "Ecommerce Development Company",
    adGroupMatch: "Ecommerce Development Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #d97706, #ea580c, #b45309)",
      ctaGradient: "linear-gradient(135deg, #d97706, #ea580c, #b45309)",
      urgencyColor: "#d97706",
      accent: "amber",
      icon: "🛒"
    },
    form: {
      title: "Talk to an E-Commerce Expert",
      subtitle: "Senior e-commerce developer calls you in 2 hours — not a salesperson",
      projectTypes: [
        "Shopify / Shopify Plus Store",
        "Custom Marketplace Platform",
        "B2B Wholesale Portal",
        "Grocery / Food Delivery App",
        "Headless Commerce",
        "Payment & Checkout Optimization",
        "Other"
      ],
      placeholder: "What's your current monthly GMV and growth target?",
      buttonText: "Talk to E-Commerce Expert",
      formType: "ecommerce"
    },
    meta: {
      title: "Ecommerce Development Company India | Shopify, Marketplace, Grocery App & AI Commerce | RDMI",
      description: "Ecommerce development company for Shopify, Shopify Plus, headless commerce, marketplaces, grocery delivery apps, restaurant apps, B2B portals, AI search, recommendations, payments, and checkout optimization."
    },
    hero: {
      badge: "Senior commerce architect callback in 2 hours",
      h1: "Ecommerce Development Company for Shopify, Marketplaces, Grocery Apps, and AI Commerce",
      subtitle: "Searching for an ecommerce development company? RDMI builds Shopify stores, headless commerce, marketplaces, B2B portals, grocery delivery apps, restaurant apps, and AI-powered commerce systems with search, recommendations, checkout, payments, and analytics built in.",
      cta1: "Get Commerce Growth Plan",
      cta2: "Talk to Commerce Architect",
      trustPoints: [
        "Shopify, headless, marketplace, and delivery platforms",
        "AI search, recommendations, product advisors, and support agents",
        "Razorpay, Stripe, PayU, UPI, inventory, and shipping integrations",
        "Source code, store setup, analytics, and handover documentation"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Map the Commerce Model",
        description: "A senior commerce architect reviews catalog, buyer journeys, channels, payments, inventory, shipping, operations, and where AI can improve discovery or conversion."
      },
      {
        step: "02",
        title: "Choose Shopify, Headless, or Custom",
        description: "We recommend the right architecture for your stage: Shopify, Shopify Plus, Hydrogen, headless Next.js, marketplace, B2B portal, or delivery app."
      },
      {
        step: "03",
        title: "Build Revenue-Critical Flows",
        description: "Product discovery, PDP, cart, checkout, payments, inventory, vendor dashboards, AI search, recommendations, analytics, and recovery flows ship in focused sprints."
      },
      {
        step: "04",
        title: "Launch, Measure, and Improve",
        description: "Go live with tracking, SEO schema, conversion baselines, abandoned cart flows, product data QA, release docs, and post-launch optimization."
      }
    ],
    stats: [
      {
        value: "50+",
        label: "E-Commerce Stores Live in Production"
      },
      {
        value: "4x",
        label: "Average Conversion Rate Lift"
      },
      {
        value: "72 hrs",
        label: "MVP Storefront Live"
      },
      {
        value: "30%+",
        label: "Buyers Starting in AI Search"
      }
    ],
    services: [
      {
        title: "Shopify & Shopify Plus With AI Search Built In",
        description: "Custom storefronts, apps, enterprise setups — with AI semantic search, product recommendations, and checkout copilot from day one. 3–5x better page speed than off-the-shelf themes.",
        tags: [
          "Shopify Plus",
          "Hydrogen",
          "Liquid",
          "AI Search"
        ]
      },
      {
        title: "Headless Commerce That Loads Sub-1s",
        description: "Next.js + Shopify Storefront API or Medusa.js. AI-powered search with Perplexity-ready schema, edge-cached product pages, streaming checkout. For high-volume brands scaling past theme limits.",
        tags: [
          "Next.js",
          "Medusa.js",
          "GraphQL",
          "Vercel Edge"
        ]
      },
      {
        title: "Multi-Vendor Marketplaces in 8–10 Weeks",
        description: "Seller onboarding, split payments, commission engines, AI-powered matching between buyers and sellers. Elasticsearch for discovery, Stripe Connect for payouts.",
        tags: [
          "React",
          "Node.js",
          "Stripe Connect",
          "Elasticsearch"
        ]
      },
      {
        title: "Grocery & Food Delivery Apps With Live Tracking",
        description: "Customer app, driver app, vendor dashboard, admin — real-time tracking, slot-based delivery, AI-driven demand forecasting. Full solution in 10–14 weeks, MVP in 6.",
        tags: [
          "Flutter",
          "Google Maps API",
          "Firebase",
          "Razorpay"
        ]
      },
      {
        title: "B2B Commerce & Wholesale With GST + Tally",
        description: "Tiered pricing, MOQ, credit limits, GST invoicing, Tally integration, AI-powered reorder suggestions. Built for high-volume wholesale operations that outgrew spreadsheets.",
        tags: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Tally API"
        ]
      },
      {
        title: "AI Checkout Optimisation That Cuts Drop-off 40%",
        description: "One-click checkout, UPI, EMI, abandoned cart recovery with AI-written sequences, dynamic pricing, smart upsells. 20–30% higher AOV, 40% less drop-off at the cart.",
        tags: [
          "Razorpay",
          "Stripe",
          "PayU",
          "UPI Intent"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You speak to senior commerce architects early, so catalog structure, conversion flow, payments, inventory, logistics, and launch constraints are handled before design begins.",
      cost: "Full source-code ownership where custom code is used, clean platform handover, analytics access, release documentation, and no agency markup hiding inside transaction flows.",
      ai: "AI commerce features are scoped around revenue: semantic search, recommendations, product advisors, checkout assistance, support agents, abandoned-cart recovery, and review/FAQ automation."
    },
    faq: [
      {
        q: "How is building with you different from hiring a Shopify Plus partner?",
        a: "Most Shopify Plus partners install themes and apps. We write custom Liquid, Hydrogen components, and AI integrations. We also build headless, marketplaces, and grocery apps — not just stores. One team, any architecture, AI-first from sprint one."
      },
      {
        q: "What happens when ChatGPT, Perplexity, and Gemini eat more of Google's search share?",
        a: "Your store needs to be citable by LLMs — not just crawlable by Google. We build GEO schema (llms.txt, entity markup, FAQ schema, review schema) from day one so ChatGPT and Perplexity surface your products as answers, not ads."
      },
      {
        q: "Can AI search and recommendations actually lift conversion?",
        a: "Yes, when grounded in your catalogue. Semantic search finds products even when the customer misspells or describes loosely. Personalised recommendations use browse and purchase signals. Typical lift: 20–40% higher add-to-cart, 15–25% higher AOV within 60 days."
      },
      {
        q: "Shopify or custom — how do you decide?",
        a: "Shopify for early-stage and mid-volume stores. Custom Next.js for marketplaces, subscription models, B2B with complex pricing, or anyone outgrowing theme limits. We tell you honestly on the first call — no bias toward the bigger build."
      },
      {
        q: "Who owns the code, AI prompts, and customer data?",
        a: "You do. Full source code, custom theme code, AI prompts, and any fine-tuned models handed over on payment. Your customer data stays in your environment. NDA signed before first call."
      },
      {
        q: "How fast can we go live?",
        a: "Shopify storefront MVP: 3–5 weeks. Full Shopify Plus build: 8–10 weeks. Headless Next.js: 8–12 weeks. Grocery app (4 apps + admin): 10–14 weeks. Marketplace MVP: 8–10 weeks. Fixed milestones, not open-ended retainers."
      }
    ],
    ctaSection: {
      headline: "Build Commerce That Sells, Recommends, Recovers, and Scales.",
      subtitle: "Get a senior commerce architecture review for Shopify, headless commerce, marketplace, grocery delivery, restaurant, B2B, or AI-powered ecommerce builds.",
      buttonText: "Get Commerce Growth Plan"
    },
    targetKeywords: [
      "ecommerce app development company",
      "ecommerce website development company",
      "ecommerce web development company",
      "shopify app development",
      "ecommerce website design companies",
      "shopify web development company",
      "ecommerce development company",
      "grocery delivery app development company"
    ]
  },
  {
    slug: "ai-agent-development",
    primaryKeyword: "AI Agent Development Company",
    adGroupMatch: "AI Agent Development Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #7e22ce, #4f46e5, #7e22ce)",
      ctaGradient: "linear-gradient(135deg, #7e22ce, #4f46e5, #7e22ce)",
      urgencyColor: "#7e22ce",
      accent: "purple",
      icon: "🤖"
    },
    form: {
      title: "Talk to an AI Agent Expert",
      subtitle: "Senior AI architect calls you in 2 hours — not a salesperson",
      projectTypes: [
        "Custom AI Agent (Single Workflow)",
        "Multi-Agent System",
        "RAG & Knowledge Agent",
        "Voice AI Agent",
        "AI Agent + Tool Integration",
        "On-Prem / Private LLM Agent",
        "Other"
      ],
      placeholder: "What operational workflow should an autonomous agent run end-to-end?",
      buttonText: "Talk to AI Agent Expert",
      formType: "ai-agent"
    },
    meta: {
      title: "AI Agent Development Company India | LangGraph, CrewAI, Voice Agents & Automation | RDMI",
      description: "AI agent development company for production sales agents, support agents, voice agents, operations agents, LangGraph workflows, CrewAI systems, tool integration, evals, and governance."
    },
    hero: {
      badge: "🤖 Autonomous AI Agents — Production-Ready in 8 Weeks",
      h1: "AI Agent Development Company for Sales, Support, Operations, and Voice Automation",
      subtitle: "Searching for an AI agent development company? RDMI builds production agents that use tools, memory, state, approvals, and observability — on OpenAI, Anthropic, and open-source LLMs with LangGraph, CrewAI, and LangSmith evals.",
      cta1: "Talk to AI Agent Expert",
      cta2: "See Agents We've Built",
      trustPoints: [
        "30+ production agents shipped to live ops",
        "92% task-success rate on launch day",
        "8-week prototype-to-production average",
        "LangGraph + CrewAI + LangSmith native"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1655720828018-edd71a68420e?w=800&q=80",
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Agent Scope & Tool Mapping — Within 2 Hours",
        description: "Senior AI architect identifies the workflow, the tools (APIs, DBs, CRMs), decision boundaries, and where humans approve. You leave the call with an agent spec, eval plan, and honest risk register — not a pitch."
      },
      {
        step: "02",
        title: "Working Agent Prototype in 2 Weeks",
        description: "Real agent running on your data, calling your tools, producing measurable outputs. You break it end-to-end before we go to production. Eval benchmarks locked into the contract."
      },
      {
        step: "03",
        title: "Production Build in 6–8 Weeks",
        description: "LangGraph state machines, CrewAI orchestration, LangSmith traces, guardrails, rate limiting, human-in-the-loop escalation, audit logs. Shipped against contracted task-success benchmarks — or we iterate free."
      },
      {
        step: "04",
        title: "Deploy, Measure, Keep Improving",
        description: "Production launch with agent trace dashboard, KPI tracking, and drift alerts. 30 days free optimisation. Retainer for eval-driven improvement as your tools and data evolve."
      }
    ],
    stats: [
      {
        value: "30+",
        label: "Production Agents Shipped"
      },
      {
        value: "92%",
        label: "Task-Success Rate at Launch"
      },
      {
        value: "8 wks",
        label: "Prototype → Production"
      },
      {
        value: "21%",
        label: "Enterprises With Agent Governance (Deloitte)"
      }
    ],
    services: [
      {
        title: "Custom AI Agents That Own One Workflow End-to-End",
        description: "Single-purpose agents that read, decide, act, and log — email triage, CRM updates, compliance reviews, collections outreach. LangGraph state machines you can reason about. Deterministic where it matters, flexible where it helps.",
        tags: [
          "LangGraph",
          "the latest LLMs Function Calling",
          "Claude Tool Use",
          "State Machines"
        ]
      },
      {
        title: "Multi-Agent Crews That Handle Complex Work",
        description: "Supervisor + specialist architectures for tasks one model can't handle — researcher, writer, reviewer, executor. CrewAI and AutoGen with shared memory, role boundaries, and human approval gates. Built for auditability.",
        tags: [
          "CrewAI",
          "AutoGen",
          "Supervisor Patterns",
          "Shared Memory"
        ]
      },
      {
        title: "Voice Agents That Sound Human at Sub-Second Latency",
        description: "Phone agents on OpenAI Realtime, Deepgram, and ElevenLabs that book appointments, qualify leads, recover carts, and handle tier-1 support. Integrated with your CRM and calendar. Warm handoff when confidence drops.",
        tags: [
          "OpenAI Realtime",
          "Deepgram",
          "ElevenLabs",
          "Twilio",
          "Calendly"
        ]
      },
      {
        title: "Tool & API Integration Layer",
        description: "The plumbing that makes agents useful: secure credential vaulting, typed tool schemas, retry logic, error recovery, rate limiting, permission boundaries. Any internal API becomes an agent-callable tool with full observability.",
        tags: [
          "MCP",
          "Tool Schemas",
          "Secret Management",
          "Rate Limiting"
        ]
      },
      {
        title: "Agent Observability & Eval Suites",
        description: "You can't improve what you can't measure. LangSmith or Langfuse tracing, custom eval suites, regression tests, production dashboards. Task success, latency, cost, hallucination rate — tracked per deployment.",
        tags: [
          "LangSmith",
          "Langfuse",
          "Eval Suites",
          "Regression Tests"
        ]
      },
      {
        title: "On-Prem / Private LLM Agents",
        description: "Agents running on Llama, Mistral, or your fine-tuned model in your VPC. Required for healthcare, BFSI, legal, defence. Same LangGraph orchestration code runs on OpenAI or vLLM — no rewrite.",
        tags: [
          "Llama",
          "Mistral",
          "vLLM",
          "VPC Deploy"
        ]
      }
    ],
    uspHeadlines: {
      direct: "Your AI architect gets on a call in 2 hours — not a consultant with slides. 30+ production agents built. We tell you which patterns actually work and which are 2024 hype.",
      cost: "Senior engineers only. No sub-contracting, no per-conversation markup, no vendor lock-in. Full source code, prompts, eval sets, and any fine-tuned weights are yours on payment.",
      ai: "Agents without evals silently fail in production. Every agent we ship has LangSmith traces, a regression test suite, and task-success benchmarks in the contract from day one."
    },
    faq: [
      {
        q: "What's the difference between an AI agent and a chatbot?",
        a: "A chatbot answers questions. An agent ACTS — it reasons about a goal, picks tools, calls APIs, handles failures, and produces an outcome. Agents have memory, planning, and tool use. Chatbots don't. If you need conversations, build a chatbot. If you need work done, build an agent."
      },
      {
        q: "How is this different from building on ChatGPT or Claude directly?",
        a: "Raw GPT is a reasoning component. Production agents need state machines, tool schemas, retries, guardrails, memory, observability, and human-in-the-loop escalation. That's the 90% of work that decides whether an agent ships or rots in a demo. We build that layer — you own it."
      },
      {
        q: "What happens if the underlying LLM (GPT-5, Claude 4) ships and breaks my agent?",
        a: "Model-agnostic by design. Every agent has an eval suite — when a new model ships we re-run evals, swap if better, roll back if worse. Same LangGraph code runs across OpenAI, Anthropic, Google models, Llama. No rewrites, no vendor lock-in."
      },
      {
        q: "Can agents actually be trusted in production without hallucinations?",
        a: "Yes, when architected right. Grounded retrieval with forced citations, typed tool outputs, output validation schemas, human-in-the-loop on high-stakes decisions, and eval suites that fail the build if hallucination rate exceeds your contracted threshold."
      },
      {
        q: "How do you measure agent success — not impressions, real outcomes?",
        a: "Contracted task-success rate (did the agent complete the goal?). Plus latency p95, cost per run, tool error rate, human-override rate, hallucination rate. Dashboards in LangSmith or Langfuse. You see every trace. If we miss the benchmarks we iterate free."
      },
      {
        q: "On-prem or private LLM for regulated data?",
        a: "Yes. Llama, Mistral, or your fine-tuned model hosted in your VPC on AWS, GCP, Azure, or bare metal. Routine for healthcare, BFSI, legal, defence. Same LangGraph / CrewAI code runs on OpenAI or vLLM — no rewrite, no vendor switch."
      }
    ],
    testimonials: [
      {
        quote: "Their agent runs our lead-qualification pipeline — research, enrich, score, and draft the first reply. The LangSmith traces gave our board the confidence to scale it across more workflows.",
        author: "V.N.",
        role: "VP Growth, B2B SaaS",
        rating: 5
      },
      {
        quote: "We'd had failed GenAI pilots before RDMI. They started with evals and observability — not a demo — and shipped a production agent. The difference was process, not prompts.",
        author: "D.M.",
        role: "Head of AI, FinTech",
        rating: 5
      },
      {
        quote: "Our voice agent handles a large share of inbound calls end-to-end with sub-second latency — callers don't know it's AI. It freed up the team to focus on higher-value work.",
        author: "P.R.",
        role: "Founder, Real Estate Tech",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Stop Talking About AI Agents. Ship One That Finishes Work.",
      subtitle: "Senior AI agent architect on the call in 2 hours — not a salesperson. Working prototype in 2 weeks. Production agent in 8. Tool integration, LangSmith evals, approval gates, and observability in every deployment.",
      buttonText: "Talk to AI Agent Expert"
    },
    targetKeywords: [
      "ai agent development",
      "ai agent development company",
      "custom ai agent development",
      "ai agent for business",
      "build ai agent",
      "agentic ai development",
      "autonomous ai agent",
      "ai agent consulting",
      "multi agent system development",
      "langgraph development",
      "crewai development",
      "voice ai agent development"
    ]
  },
  {
    slug: "enterprise-saas-development",
    primaryKeyword: "Enterprise Software Development Company",
    adGroupMatch: "Enterprise Software Development",
    theme: {
      heroGradient: "linear-gradient(135deg, #1e3a8a, #2563eb, #1e40af)",
      ctaGradient: "linear-gradient(135deg, #1e3a8a, #2563eb, #1e40af)",
      urgencyColor: "#1e40af",
      accent: "blue",
      icon: "🏢"
    },
    form: {
      title: "Talk to a Senior Enterprise Software Architect",
      subtitle: "Senior enterprise architect calls you in 2 hours — not a salesperson",
      projectTypes: [
        "Custom ERP System",
        "Sales & Service CRM",
        "Workflow & Approvals Engine",
        "Multi-Tenant SaaS Platform",
        "Reporting & BI Dashboards",
        "Legacy ERP Migration",
        "Other"
      ],
      placeholder: "What enterprise workflow, department, or legacy system needs to be modernized?",
      buttonText: "Talk to Enterprise Architect",
      formType: "enterprise-software"
    },
    meta: {
      title: "Enterprise Software Development Company India | AI-First ERP, CRM & Automation | RDMI",
      description: "Enterprise software development company for AI-first ERP, CRM, workflow automation, dashboards, SaaS, and legacy modernization. Senior architects, SOC 2-ready, SSO/SCIM, source code ownership."
    },
    hero: {
      badge: "🏢 Enterprise Software, ERP & CRM — AI-First, SOC 2 Ready",
      h1: "Enterprise Software Development Company for AI-First ERP, CRM, and Workflow Automation",
      subtitle: "Searching for an enterprise software development company or ERP/CRM development partner? RDMI builds AI-first enterprise systems: custom ERP, CRM, dashboards, workflow automation, internal tools, integrations, and AI agents that remove manual work across operations, finance, sales, and support.",
      cta1: "Talk to Enterprise Architect",
      cta2: "See Enterprise Systems Built",
      trustPoints: [
        "AI agents inside real workflows — not a chatbot widget",
        "SOC 2 Type II-ready, SSO and SCIM standard",
        "40+ enterprise platforms shipped to production",
        "Multi-region, row-level tenant isolation by default"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Senior Architect on the Call — Within 2 Hours",
        description: "A senior SaaS architect maps your scale, compliance posture, integration surface, and AI-feature gaps. Architecture decision record and risk register delivered the same day — before a line of code."
      },
      {
        step: "02",
        title: "Multi-Tenant + AI Foundation in 14 Days",
        description: "Row-level tenant isolation, SSO, SCIM, audit log pipeline, and the LangGraph agent runtime — stood up first. The boring stuff that kills enterprise projects when retrofitted later. AI copilot wired to real data on day ten."
      },
      {
        step: "03",
        title: "Sprint Delivery With Working Demos",
        description: "Two-week sprints on staging. Enterprise stakeholders review real software every 14 days — not a Gantt chart. UAT signed before anything ships to production. LangSmith evals catch AI regressions before release."
      },
      {
        step: "04",
        title: "Launch, Observability, 30-Day Hypercare",
        description: "Blue-green deploy, OpenTelemetry observability, runbooks, on-call handoff, and eval dashboards. 30 days hypercare with sev-1 response under one hour. Retainer available for ongoing ops and AI tuning."
      }
    ],
    stats: [
      {
        value: "40+",
        label: "Enterprise Software Platforms Shipped"
      },
      {
        value: "99.9%",
        label: "Uptime SLA — Battle-Tested"
      },
      {
        value: "14 wks",
        label: "Average MVP With AI Features Live"
      },
      {
        value: "88%",
        label: "Enterprises Piloting AI Agents (Deloitte)"
      }
    ],
    services: [
      {
        title: "Custom Enterprise Software With AI Copilots",
        description: "ERP, CRM, dashboards, approval engines, internal portals, and reporting systems with AI copilots that draft, summarise, reconcile, classify, and automate work across departments. Built for permissions, auditability, and scale.",
        tags: [
          "ERP",
          "CRM",
          "OpenAI",
          "Audit Logs"
        ]
      },
      {
        title: "Agentic Workflow Platforms on LangGraph and CrewAI",
        description: "LangGraph state machines and CrewAI crews that own a workflow end-to-end — read, enrich, decide, act, log. Human-in-the-loop gates on high-stakes steps. Eval harness with LangSmith. Not another chatbot widget — autonomous operations.",
        tags: [
          "LangGraph",
          "CrewAI",
          "LangSmith",
          "n8n"
        ]
      },
      {
        title: "Custom ERP Modernized With AI Agents",
        description: "Inventory, procurement, finance, production, and approvals unified on one platform with AI agents that draft purchase orders, reconcile invoices, and flag anomalies. Module-by-module parallel-run against your legacy SAP or Tally until signed cutover.",
        tags: [
          "Custom ERP",
          "SAP Integration",
          "Tally",
          "LangGraph"
        ]
      },
      {
        title: "Sales and Service CRM With AI Copilots",
        description: "Pipeline, contacts, ticketing, forecasting with AI copilots that summarise calls, draft follow-ups, qualify leads, and deflect tier-one tickets. Native WhatsApp, email, and voice integrations. No Salesforce tax, full source code ownership.",
        tags: [
          "Pipeline",
          "OpenAI",
          "WhatsApp API",
          "Twilio"
        ]
      },
      {
        title: "RAG Knowledge Bases and Reporting AI",
        description: "Enterprise search with hybrid retrieval, re-ranking, forced citations, and row-level security. Self-serve BI where users ask questions in English and get governed answers from production data. Metabase and Superset embedded where needed.",
        tags: [
          "LlamaIndex",
          "Pinecone",
          "pgvector",
          "Metabase"
        ]
      },
      {
        title: "Legacy Migration and API Integration",
        description: "Migrate off Salesforce, NetSuite, legacy ERP, or mainframe with parallel-run and data reconciliation. REST, GraphQL, Kafka, webhooks. Anti-corruption layer keeps new AI-native code clean while legacy integrations keep shipping value.",
        tags: [
          "Migration",
          "GraphQL",
          "Kafka",
          "SAP"
        ]
      }
    ],
    uspHeadlines: {
      direct: "Senior enterprise architect on the first call — not an account manager with a capability deck. Scope, risks, and AI-feature gaps named before any contract is discussed.",
      ai: "LangGraph agents, LangSmith evals, and the latest LLMs copilots inside the product from sprint one. Human-in-the-loop gates, forced citations, and eval thresholds in the contract. Production AI — not a POC that rots in QA.",
      cost: "Full source code, AI prompts, eval sets, and model weights yours on day one. No per-seat SaaS markup forever. No vendor lock-in. Run on OpenAI today, swap to private Llama in your VPC tomorrow — same codebase."
    },
    faq: [
      {
        q: "Why is my 2020 multi-tenant SaaS stack getting replaced?",
        a: "Enterprise buyers in 2026 expect AI copilots inside the product, agent-driven automation on core workflows, and RAG search on their data — by default. A multi-tenant stack without these features now looks like a 2015 product to your buyer committee. 88% of enterprises are piloting AI agents (Deloitte), and the ones that don't have them lose renewals."
      },
      {
        q: "Can AI agents be trusted inside an enterprise SaaS for real customers?",
        a: "Yes, with the right architecture. LangGraph state machines with typed tool schemas, forced citations on factual answers, human-in-the-loop gates on high-stakes actions, output validation schemas that fail closed, and LangSmith eval suites that block release if hallucination rate or task-success drops below contracted thresholds."
      },
      {
        q: "Do you support SOC 2, SSO, SCIM, GDPR, and DPDP?",
        a: "Yes — standard on every enterprise build. Okta, Azure AD, Google Workspace, OneLogin, custom SAML IdPs. SCIM user provisioning. SOC 2 Type II-ready architecture with audit logs, encryption at rest and in transit, and multi-region residency. DPAs and BAAs signed before first call."
      },
      {
        q: "Will our prompts, embeddings, and customer data train someone else's model?",
        a: "No. Your content, embeddings, prompts, fine-tuned weights, and chat logs stay in your infrastructure. No clause letting us reuse your data for other clients. Private deploy available on OpenAI Enterprise, Azure OpenAI, or Llama in your VPC for regulated industries."
      },
      {
        q: "What happens when GPT-5 or Claude 4 ships and changes our agent behaviour?",
        a: "We build model-agnostic with provider abstractions and LangSmith eval suites. New model ships, we re-run evals — swap if it scores better, roll back if it regresses. Same code runs across OpenAI, Anthropic, Google models, and on-prem Llama. Model upgrades are a planned release, not a fire drill."
      },
      {
        q: "Can you migrate us off Salesforce, NetSuite, or a legacy ERP?",
        a: "Yes. Parallel-run pattern: new AI-native platform runs alongside the legacy system for 30-90 days with data reconciliation before cutover. We've migrated SAP, Tally, NetSuite, and custom legacy ERPs. Zero downtime where it matters, phased cutover where the org needs it."
      }
    ],
    testimonials: [
      {
        quote: "Multi-tenant SaaS with SSO, SCIM, audit logs, and an LLM copilot inside the product — far faster than our previous vendor quoted for a stack without any AI. Enterprise customers signed without a security escalation.",
        author: "J.K.",
        role: "CTO, B2B SaaS (USA)",
        rating: 5
      },
      {
        quote: "Migrated our 12-year-old ERP to an AI-native platform with zero downtime. LangGraph agents now reconcile invoices and flag anomalies overnight, so the ops team stopped chasing spreadsheets. The parallel-run cutover was remarkably smooth.",
        author: "M.V.",
        role: "COO, Manufacturing (Pune)",
        rating: 5
      },
      {
        quote: "Their architecture call named a multi-region design flaw we were about to ship, and they added LangSmith evals on every agent deploy to keep task-success high across model upgrades. Worth the engagement before we wrote a single line of code.",
        author: "R.C.",
        role: "VP Engineering, FinTech (Bangalore)",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Your Legacy Enterprise Software Is Leaking Time. AI-First Systems Replace the Manual Work.",
      subtitle: "Senior enterprise architect calls you in 2 hours. Architecture and AI-gap review the same day. ERP, CRM, workflow automation, dashboards, SSO, audit logs, and source ownership by default.",
      buttonText: "Talk to Enterprise Architect"
    },
    targetKeywords: [
      "enterprise software development company",
      "enterprise software development",
      "custom enterprise software development",
      "enterprise app development",
      "enterprise software solutions",
      "erp software development company",
      "custom erp software development",
      "crm development company",
      "crm software development company",
      "business process automation software",
      "enterprise application development",
      "multi tenant saas development"
    ]
  },
  {
    slug: "ai-receptionist",
    primaryKeyword: "AI Receptionist",
    adGroupMatch: "AI Receptionist",
    theme: {
      heroGradient: "linear-gradient(135deg, #0ea5e9, #6366f1, #0284c7)",
      ctaGradient: "linear-gradient(135deg, #0ea5e9, #6366f1, #0284c7)",
      urgencyColor: "#0ea5e9",
      accent: "sky",
      icon: "📞"
    },
    form: {
      title: "Hear Your AI Receptionist Live",
      subtitle: "A voice-AI engineer (not a salesperson) calls you back within 2 hours",
      projectTypes: [
        "AI Receptionist (Inbound Calls)",
        "AI Appointment Booking Agent",
        "AI Lead-Qualification Voice Agent",
        "AI Receptionist for Clinics / Dental",
        "AI Receptionist for Law Firm",
        "AI Receptionist for Insurance Agency",
        "Other"
      ],
      placeholder: "Which calls do you want answered and booked 24/7 — and how many do you miss now?",
      buttonText: "Hear a Live Demo →",
      formType: "ai-receptionist"
    },
    meta: {
      title: "AI Receptionist & AI Voice Agent | 24/7 Call Answering, Booking & Lead Capture | RDMI",
      description: "AI receptionist that answers every call 24/7, books appointments into your calendar, qualifies leads, and routes urgent calls to a human. Built for clinics, law firms, insurance agencies and home services. Custom voice AI on OpenAI Realtime, Deepgram, ElevenLabs and Twilio. Source code yours."
    },
    hero: {
      badge: "📞 AI Receptionist — Answers Every Call, Books Every Lead, 24/7",
      h1: "AI Receptionist That Answers Every Call and Books Every Appointment, 24/7",
      subtitle: "Looking for an AI receptionist? RDMI builds custom AI voice agents that pick up on the first ring, book appointments straight into your calendar, qualify and capture leads, answer FAQs, and hand off urgent calls to a human — day, night, weekends and holidays. Built on OpenAI Realtime, Deepgram, ElevenLabs and Twilio, integrated with your calendar and CRM.",
      cta1: "Hear a Live Demo",
      cta2: "Talk to a Voice-AI Engineer",
      trustPoints: [
        "Answers 24/7 — never a missed call or voicemail",
        "Sub-second, natural voice that books into your calendar",
        "Qualifies leads and warm-transfers urgent callers to a human",
        "Custom-built and integrated with your CRM — source code yours"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Call Audit & Voice Scope — Within 2 Hours",
        description: "A voice-AI engineer maps the calls you handle and miss — bookings, FAQs, after-hours, overflow — and the actions the agent must take: check the calendar, book, qualify, transfer. You leave with a scoped agent spec, the integrations needed, and an honest view of what voice AI should and shouldn't answer."
      },
      {
        step: "02",
        title: "Hear a Working Agent in Days",
        description: "We build a live voice agent on your scripts and FAQs, connected to a test calendar, so you can call in and break it before go-live. You tune the voice, the wording, the booking rules and the escalation triggers until it sounds like your front desk."
      },
      {
        step: "03",
        title: "Integrate, Harden, Go Live",
        description: "Calendar and CRM integration, your phone number ported or forwarded, business-hours and after-hours routing, human warm-transfer rules, call logging and transcripts. Guardrails so the agent stays on-script and hands off when it's unsure."
      },
      {
        step: "04",
        title: "Monitor & Keep Improving",
        description: "Every call transcribed and logged with outcome tags (booked, qualified, transferred, FAQ). We review real calls, refine the prompts and booking logic, and tune the voice on a retainer as your business and call patterns change."
      }
    ],
    stats: [
      {
        value: "24/7",
        label: "Calls Answered — Nights & Weekends"
      },
      {
        value: "Sub-1s",
        label: "Voice Response Latency"
      },
      {
        value: "Days",
        label: "To a Working Live Demo"
      },
      {
        value: "100%",
        label: "Source Code & Prompts Yours"
      }
    ],
    services: [
      {
        title: "24/7 Inbound Call Answering",
        description: "A natural-sounding AI voice agent that picks up on the first ring, every hour of every day. It greets callers in your business's voice, answers your most common questions from your own knowledge base, and never sends a caller to voicemail. Spillover and after-hours calls stop leaking revenue.",
        tags: [
          "OpenAI Realtime",
          "Deepgram",
          "ElevenLabs",
          "Twilio"
        ]
      },
      {
        title: "Appointment Booking Into Your Calendar",
        description: "The agent checks real availability and books, reschedules, or cancels appointments directly in your calendar or practice-management system — then sends the confirmation. Built-in rules for buffers, slot types, and reminders to cut no-shows.",
        tags: [
          "Google Calendar",
          "Calendly",
          "Cal.com",
          "Practice Mgmt APIs"
        ]
      },
      {
        title: "Lead Qualification & Capture",
        description: "For sales and service calls, the agent asks your qualifying questions, captures name, intent, and budget, logs the lead to your CRM, and flags hot leads for instant follow-up. No more lost enquiries from a busy or after-hours line.",
        tags: [
          "CRM Sync",
          "Custom Qualifying Flows",
          "Lead Scoring",
          "Webhooks"
        ]
      },
      {
        title: "Human Warm-Transfer & Escalation",
        description: "When a caller is urgent, upset, or asks something outside scope, the agent warm-transfers to the right human with context — or takes a detailed message. Confidence thresholds and escalation rules keep it from guessing on high-stakes calls.",
        tags: [
          "Live Transfer",
          "Confidence Thresholds",
          "Escalation Rules",
          "Voicemail-to-Text"
        ]
      },
      {
        title: "Vertical Voice Agents",
        description: "Configured for how your industry actually answers the phone: dental and medical clinics, law firm intake, insurance agencies, and home-services dispatch. Industry scripts, intake questions, and compliance-aware handling of sensitive callers.",
        tags: [
          "Clinics & Dental",
          "Law Firm Intake",
          "Insurance Agencies",
          "Home Services"
        ]
      },
      {
        title: "Multilingual & Private Deployment",
        description: "Answer callers in multiple languages with one agent, and — for regulated data — run on private or self-hosted models in your cloud. Required for healthcare and BFSI where call content is sensitive. Same agent logic, your infrastructure.",
        tags: [
          "Multilingual",
          "HIPAA-Aware",
          "Private LLM",
          "VPC Deploy"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You talk to the voice-AI engineer who builds your agent — on a call within 2 hours, not a salesperson with slides. You hear a working agent in days, tune it on real calls, and approve before it answers a single customer.",
      cost: "No per-minute reseller markup on top of someone else's platform. We build your agent on the underlying voice and LLM providers directly — and the prompts, call flows, and source code are yours. No lock-in to a black-box subscription.",
      ai: "A voice agent that guesses on the wrong call costs you a customer. Every agent ships with confidence thresholds, human warm-transfer, on-script guardrails, and full call transcripts — so it answers what it should and hands off what it shouldn't."
    },
    faq: [
      {
        q: "What is an AI receptionist and how is it different from voicemail or an IVR menu?",
        a: "An AI receptionist is a natural-sounding voice agent that actually talks with callers — it answers questions, books appointments, qualifies leads, and transfers urgent calls to a human. Unlike voicemail it never makes a caller wait or hang up, and unlike a 'press 1 for…' IVR menu there are no rigid menus: the caller just speaks normally and the agent understands and acts."
      },
      {
        q: "Will callers be able to tell it's an AI?",
        a: "It uses sub-second, natural speech and your own greeting, so most callers experience a smooth, professional conversation. We're transparent by design — the agent can disclose it's an AI assistant where you want it to, and it warm-transfers to a human the moment a call needs one. The goal is no missed calls and no frustrating menus, not deception."
      },
      {
        q: "Does it actually book appointments into my calendar?",
        a: "Yes. The agent connects to your calendar or practice-management system, checks real availability, and books, reschedules, or cancels — then sends the confirmation. We configure your slot types, buffers, and reminder rules to reduce no-shows."
      },
      {
        q: "What happens with urgent calls or questions it can't handle?",
        a: "You define the escalation rules. When a caller is urgent, sounds upset, or asks something outside the agent's scope, it warm-transfers to the right person with context — or takes a detailed message and flags it immediately. Confidence thresholds stop it from guessing on high-stakes calls."
      },
      {
        q: "Can it handle a healthcare clinic, law firm, or insurance agency specifically?",
        a: "Yes — we build the agent around your industry's intake. Clinics get appointment booking and patient FAQs with HIPAA-aware handling; law firms get new-client intake and conflict-screening questions; insurance agencies get policy questions and lead qualification. For sensitive data we can run on private or self-hosted models in your own cloud."
      },
      {
        q: "Do I own the agent, or am I locked into a subscription?",
        a: "You own the prompts, call flows, and source code. We build your agent directly on the underlying voice and LLM providers rather than reselling a black-box platform with per-minute markup, so there's no lock-in. You pay the providers' usage directly and keep what we build."
      }
    ],
    testimonials: [
      {
        quote: "After-hours calls used to go to voicemail and we'd lose the booking. The AI receptionist now answers every one and books straight into our calendar — we hear about it in the morning log.",
        author: "S.K.",
        role: "Practice Manager, Dental Clinic",
        rating: 5
      },
      {
        quote: "New-client calls get answered and screened around the clock now. The warm-transfer rules mean genuinely urgent matters still reach us, and everything else is captured cleanly.",
        author: "A.R.",
        role: "Partner, Law Firm",
        rating: 5
      },
      {
        quote: "They built it on our own stack and handed over the prompts and code — no per-minute reseller markup. It answers, qualifies, and logs every lead to our CRM.",
        author: "M.T.",
        role: "Owner, Insurance Agency",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Stop Losing Customers to a Missed Call.",
      subtitle: "Hear a working AI receptionist on your own scripts in days — answering 24/7, booking into your calendar, qualifying leads, and transferring urgent callers to a human. A voice-AI engineer (not a salesperson) calls you back within 2 hours.",
      buttonText: "Hear a Live Demo"
    },
    targetKeywords: [
      "ai receptionist",
      "ai voice agent",
      "ai phone answering service",
      "virtual receptionist software",
      "ai answering service",
      "ai receptionist for clinics",
      "ai receptionist for law firms",
      "ai voice agent development",
      "conversational ai phone agent",
      "ai appointment booking agent"
    ]
  },
  {
    slug: "ai-automation-agency",
    primaryKeyword: "AI Automation Agency",
    adGroupMatch: "AI Automation Agency",
    theme: {
      heroGradient: "linear-gradient(135deg, #059669, #0d9488, #047857)",
      ctaGradient: "linear-gradient(135deg, #059669, #0d9488, #047857)",
      urgencyColor: "#059669",
      accent: "emerald",
      icon: "⚙️"
    },
    form: {
      title: "Get Your Free Automation Audit",
      subtitle: "An automation engineer (not a salesperson) calls you back within 2 hours",
      projectTypes: [
        "AI Workflow Automation",
        "Business Process Automation",
        "AI Agent for a Workflow",
        "CRM / Sales Automation",
        "Back-Office / Ops Automation",
        "Document / Data Automation",
        "Other"
      ],
      placeholder: "Which repetitive, manual process is eating your team's hours right now?",
      buttonText: "Get My Free Audit →",
      formType: "ai-automation"
    },
    meta: {
      title: "AI Automation Agency | AI Workflow & Business Process Automation, Live in Weeks | RDMI",
      description: "AI automation agency that automates the repetitive, manual work draining your team — workflow automation, AI agents, and business process automation across your CRM, email, docs and back office. Free automation audit, a working pilot in weeks, on time or your money back. Built on n8n, Make and custom code. Source code yours, no lock-in."
    },
    hero: {
      badge: "⚙️ AI Automation Agency — Working Pilot in Weeks, On Time or Money-Back",
      h1: "AI Automation Agency That Automates the Busywork — Live in Weeks, or Your Money Back",
      subtitle: "Looking for an AI automation agency? RDMI automates the repetitive, manual work that drains your team — lead follow-up, data entry, reporting, document handling, approvals and hand-offs — with AI agents and workflow automation wired into your CRM, email, and back office. We start with a free automation audit, ship a working pilot in weeks, and guarantee it: on time and on scope, or your money back.",
      cta1: "Get Free Automation Audit",
      cta2: "Talk to an Automation Engineer",
      trustPoints: [
        "Free automation audit before you commit a rupee",
        "Working pilot live in weeks — on time and on scope, or money back",
        "AI agents + workflows across your CRM, email, docs and back office",
        "You own the workflows and source code — no per-task reseller markup"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Free Automation Audit — Within 2 Hours",
        description: "An automation engineer maps your most repetitive, time-draining workflows — what's manual, how often it runs, which tools it touches, and where the hand-offs break. You leave with a prioritised automation plan and a clear, honest view of what's worth automating first. No charge, no obligation."
      },
      {
        step: "02",
        title: "Fixed-Scope Pilot — You Approve Before We Build",
        description: "We scope one high-impact workflow into a fixed-price pilot with a defined deliverable and timeline written into the contract. You know exactly what you're getting, what it costs, and when it's live — before any work starts."
      },
      {
        step: "03",
        title: "Working Automation Live in Weeks — Or Money Back",
        description: "We build and ship the automation wired into your real tools, running on real data. If we miss the agreed scope or timeline, you get your money back — the guarantee is in the contract, not just the pitch. You test it end-to-end before go-live."
      },
      {
        step: "04",
        title: "Measure, Expand, Keep Improving",
        description: "Every automation logs what it ran, what it saved, and where it failed. We review real runs with you, harden the edge cases, then roll automation into the next workflow. Retainer for ongoing build-out as your processes evolve."
      }
    ],
    stats: [
      {
        value: "Free",
        label: "Automation Audit & Plan"
      },
      {
        value: "Weeks",
        label: "To a Working Pilot — Not Months"
      },
      {
        value: "Money-Back",
        label: "If We Miss Scope or Timeline"
      },
      {
        value: "100%",
        label: "Workflows & Source Code Yours"
      }
    ],
    services: [
      {
        title: "AI Workflow Automation",
        description: "Connect the tools you already use and let work flow between them automatically — leads route to the right rep, data syncs across systems, follow-ups send themselves, reports build overnight. The repetitive copy-paste between apps disappears.",
        tags: [
          "n8n",
          "Make",
          "Zapier",
          "Custom Orchestration"
        ]
      },
      {
        title: "AI Agents That Do the Work, Not Just Chat",
        description: "Agents that read, decide, and act on a workflow end-to-end — triage inbound email, qualify and enrich leads, draft replies, update the CRM, run compliance checks. Built with guardrails and human approval where the stakes are high.",
        tags: [
          "LangGraph",
          "CrewAI",
          "Tool Use",
          "Human-in-the-Loop"
        ]
      },
      {
        title: "Business Process Automation",
        description: "The back-office work that quietly eats hours — invoice processing, onboarding, order handling, approvals, reconciliation — automated with clear audit trails. Your team stops doing manual data entry and starts doing the work that needs a human.",
        tags: [
          "Process Mapping",
          "Approvals",
          "Audit Logs",
          "Exception Handling"
        ]
      },
      {
        title: "Document & Data Automation",
        description: "Pull structured data out of invoices, forms, contracts, and emails; validate it; and push it into your systems automatically. Document AI that ends manual re-keying and the errors that come with it.",
        tags: [
          "Document AI",
          "OCR + LLM Extraction",
          "Validation",
          "System Sync"
        ]
      },
      {
        title: "CRM & Sales Automation",
        description: "Capture every lead, enrich and score it, route it to the right person, and trigger timely follow-up — so nothing slips through the cracks. The pipeline keeps itself updated instead of relying on someone remembering to.",
        tags: [
          "Lead Routing",
          "Enrichment",
          "Follow-Up Sequences",
          "CRM Sync"
        ]
      },
      {
        title: "Private & Compliant Deployment",
        description: "For regulated data, run automations and agents on private or self-hosted models inside your own cloud. Required for healthcare, BFSI, and legal. Same automation logic, your infrastructure, full control of where data goes.",
        tags: [
          "Private LLM",
          "VPC Deploy",
          "Access Controls",
          "Compliance-Aware"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You talk to the automation engineer who builds your workflows — on a call within 2 hours, not a salesperson with slides. Free audit first, fixed scope, working pilot in weeks. You approve before we build.",
      cost: "No per-task reseller markup on top of someone else's platform. We build your automations directly on the underlying tools and models — and the workflows, prompts, and source code are yours. No lock-in to a black-box subscription.",
      ai: "Automation that breaks silently costs more than the manual work did. Every workflow we ship has run logs, error handling, exception alerts, and human approval where the stakes are high — so it keeps working when reality gets messy."
    },
    faq: [
      {
        q: "What exactly does an AI automation agency do?",
        a: "We find the repetitive, manual work that drains your team's time — things like lead follow-up, data entry, reporting, document handling, and approvals — and automate them using a mix of workflow tools (n8n, Make, custom code) and AI agents. The result is work that happens automatically and reliably, so your people focus on what actually needs a human."
      },
      {
        q: "How does the 'live in weeks or money back' guarantee work?",
        a: "After the free audit, we scope one workflow into a fixed-price pilot with a specific deliverable and timeline written into the contract. If we miss the agreed scope or the agreed timeline, you get your money back. The guarantee is on what we control — delivery — and it's in the contract, not just the sales call."
      },
      {
        q: "Will this actually save us money, or is it just hype?",
        a: "We don't promise a magic ROI number — anyone who guarantees a specific percentage before seeing your workflows is guessing. What we do is start with a free audit that estimates the time each automation should save, prioritise the ones with the clearest payback, and ship a pilot you can measure for yourself before expanding. You decide if the numbers justify the next step."
      },
      {
        q: "Which tools and platforms do you build on?",
        a: "Workflow automation on n8n, Make, and Zapier where they fit, and custom code (Python, Node.js) where they don't. AI agents on LangGraph and CrewAI using OpenAI, Anthropic, and open-source models. We integrate with your existing CRM, email, calendar, databases, and internal APIs — we automate around your stack, we don't make you switch."
      },
      {
        q: "What happens when an automation hits something unexpected?",
        a: "Every workflow we build has error handling, exception alerts, and human-approval steps on high-stakes actions. When something falls outside the rules, it pauses and flags a human rather than guessing. You get run logs and a dashboard so you can see exactly what ran, what it did, and where it needed attention."
      },
      {
        q: "Do we own the automations, or are we locked into a subscription?",
        a: "You own the workflows, prompts, and source code. We build directly on the underlying tools and models instead of reselling a black-box platform with per-task markup, so there's no lock-in. You pay the platforms' usage directly and keep everything we build."
      }
    ],
    testimonials: [
      {
        quote: "They started with an audit, not a pitch, and put the timeline in the contract. The first workflow went live on schedule and our team stopped doing the manual data entry that used to swallow mornings.",
        author: "R.S.",
        role: "Operations Head, B2B Services",
        rating: 5
      },
      {
        quote: "We'd been burned by an 'AI' vendor before. RDMI scoped a fixed pilot, shipped it, and handed over the workflows and code. No lock-in, no per-task markup — we run it ourselves now.",
        author: "K.A.",
        role: "Founder, FinTech Startup",
        rating: 5
      },
      {
        quote: "Lead follow-up used to slip through the cracks after hours. The automation captures, enriches, and routes every enquiry into our CRM now, and flags the hot ones immediately.",
        author: "N.D.",
        role: "Sales Director, SaaS",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Stop Paying People to Do Work a Workflow Should.",
      subtitle: "Start with a free automation audit, get a fixed-scope pilot live in weeks, and only scale what you can measure. On time and on scope, or your money back. An automation engineer (not a salesperson) calls you back within 2 hours.",
      buttonText: "Get Free Automation Audit"
    },
    targetKeywords: [
      "ai automation agency",
      "ai automation services",
      "ai workflow automation",
      "workflow automation services",
      "business process automation",
      "ai process automation",
      "intelligent automation services",
      "ai automation for business",
      "ai automation consulting",
      "ai automation company"
    ]
  },
  {
    slug: "ai-consulting-company",
    primaryKeyword: "AI Consulting Company",
    adGroupMatch: "AI Consulting Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #6d28d9, #4f46e5, #5b21b6)",
      ctaGradient: "linear-gradient(135deg, #6d28d9, #4f46e5, #5b21b6)",
      urgencyColor: "#6d28d9",
      accent: "violet",
      icon: "🧭"
    },
    form: {
      title: "Get a Free AI Opportunity Assessment",
      subtitle: "An AI consultant who also builds (not a salesperson) calls you back within 2 hours",
      projectTypes: [
        "AI Opportunity Assessment",
        "AI Strategy & Roadmap",
        "Build a Specific AI Use Case",
        "GenAI / LLM Integration",
        "AI Automation of a Workflow",
        "AI for My Industry",
        "Other"
      ],
      placeholder: "What part of your business do you think AI could help with — and what's the goal?",
      buttonText: "Get My Free Assessment →",
      formType: "ai-consulting"
    },
    meta: {
      title: "AI Consulting Company | AI Strategy, Roadmap & Use-Case Discovery — Then We Build | RDMI",
      description: "AI consulting company that finds where AI actually pays off in your business, prioritises it into a clear roadmap, then builds it. Free AI opportunity assessment, a prioritised roadmap in weeks, and consultants who ship — not just advise. GenAI, LLMs, agents and automation. You own the strategy and the code."
    },
    hero: {
      badge: "🧭 AI Consulting Company — Free Assessment, Roadmap in Weeks, Then We Build",
      h1: "AI Consulting Company That Finds Where AI Actually Pays Off — Then Builds It",
      subtitle: "Looking for an AI consulting company? RDMI cuts through the AI hype to find the use cases that actually move your numbers, prioritises them into a clear roadmap, and then builds them — we don't just hand you a deck. Start with a free AI opportunity assessment from a consultant who also ships production AI.",
      cta1: "Get Free AI Assessment",
      cta2: "Talk to an AI Consultant",
      trustPoints: [
        "Free AI opportunity assessment before you commit",
        "A prioritised, honest roadmap — not a 100-slide deck",
        "Consultants who also build production AI, not just advise",
        "You own the strategy, the prompts, and any code we write"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Free AI Opportunity Assessment — Within 2 Hours",
        description: "An AI consultant maps where AI could realistically help your business — which workflows, what data you have, what's feasible today versus hype. You leave with a shortlist of use cases ranked by impact and effort, and an honest view of what's worth doing first. No charge, no obligation."
      },
      {
        step: "02",
        title: "Prioritised Roadmap in Weeks — Not a 100-Slide Deck",
        description: "We turn the shortlist into a practical roadmap: the use case to start with, what it takes to build, the data and integrations needed, risks, and a rough cost and timeline. Short, honest, and built to act on — not to sit in a drawer."
      },
      {
        step: "03",
        title: "Build the First Use Case — Fixed Scope",
        description: "Unlike advice-only consultancies, we build. We scope the first use case into a fixed deliverable and ship it on your real data and tools, so you can measure it before committing further. You decide if the results justify the next step."
      },
      {
        step: "04",
        title: "Scale What Works, Govern What You Run",
        description: "Roll out the use cases that prove their value, with evals, monitoring, and governance so they keep working in production. We advise on team, tooling, and data as you mature — or keep building alongside you on a retainer."
      }
    ],
    stats: [
      {
        value: "Free",
        label: "AI Opportunity Assessment"
      },
      {
        value: "Weeks",
        label: "To a Prioritised Roadmap"
      },
      {
        value: "Build",
        label: "We Ship It, Not Just Advise"
      },
      {
        value: "100%",
        label: "Strategy & Code Yours"
      }
    ],
    services: [
      {
        title: "AI Opportunity Assessment",
        description: "We look at your actual workflows, data, and goals and tell you — honestly — where AI will pay off, where it won't yet, and what to do first. The opposite of a generic 'AI strategy' deck: a ranked, feasible shortlist you can act on.",
        tags: [
          "Use-Case Discovery",
          "Feasibility",
          "Impact vs Effort",
          "Data Readiness"
        ]
      },
      {
        title: "AI Strategy & Roadmap",
        description: "A practical roadmap that sequences the use cases by value and effort, with the data, integrations, risks, cost, and timeline for each. Built to act on, sized for your business — whether you're a startup or an enterprise function.",
        tags: [
          "Roadmap",
          "Build vs Buy",
          "Risk & Governance",
          "Cost & Timeline"
        ]
      },
      {
        title: "GenAI & LLM Integration",
        description: "Bring large language models into your products and operations the right way — grounded on your data, with guardrails, evals, and cost control. OpenAI, Anthropic, and open-source models, integrated with the systems you already run.",
        tags: [
          "OpenAI",
          "Anthropic",
          "RAG",
          "Evals & Guardrails"
        ]
      },
      {
        title: "Build & Implementation",
        description: "We don't stop at advice. We build the first use case — agent, automation, chatbot, or model integration — on your real data and tools, shipped to production so you can measure the outcome instead of imagining it.",
        tags: [
          "Production Build",
          "Agents",
          "Automation",
          "Integrations"
        ]
      },
      {
        title: "AI Automation of Workflows",
        description: "Many of the highest-ROI AI projects are simply automating repetitive work. We identify those workflows in the assessment and automate them with agents and orchestration wired into your existing stack.",
        tags: [
          "Workflow Automation",
          "AI Agents",
          "n8n / Custom",
          "Human-in-the-Loop"
        ]
      },
      {
        title: "Private & Compliant AI",
        description: "For regulated or sensitive data, we design AI that runs on private or self-hosted models inside your own cloud, with the access controls and audit trails healthcare, BFSI, and legal require. Strategy and build, your infrastructure.",
        tags: [
          "Private LLM",
          "VPC Deploy",
          "Access Controls",
          "Compliance-Aware"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You talk to an AI consultant who actually ships production AI — on a call within 2 hours, not a salesperson with slides. Free assessment first. A practical roadmap, not a drawer-filler. We build the first use case so you can measure it.",
      cost: "No army of junior analysts billed by the hour. A senior consultant scopes the opportunity, gives you an honest roadmap, and builds the first use case at a fixed price. The strategy, prompts, and code are yours — no lock-in.",
      ai: "Most AI projects stall because they start with hype, not a use case. We start with your data and your numbers, prioritise what's feasible, and prove the first use case in production before anyone commits to scaling it."
    },
    faq: [
      {
        q: "What does an AI consulting company actually do?",
        a: "We help you decide where AI is worth using in your business and then make it real. That means a free assessment of your workflows and data, a prioritised roadmap of feasible use cases ranked by impact and effort, and — unlike advice-only firms — building the first use case so you can measure the result before scaling."
      },
      {
        q: "How are you different from a big consultancy?",
        a: "Two ways. First, you talk to a senior consultant who also builds production AI, not a deck-making analyst. Second, we don't stop at strategy — we ship the first use case on your real data and tools at a fixed scope. You get something working and measurable in weeks, not a long engagement that ends with recommendations."
      },
      {
        q: "Can you guarantee a specific ROI from AI?",
        a: "No — and anyone who promises a fixed ROI percentage before seeing your data is guessing. What we do is honest: the assessment estimates the likely payback for each use case, we start with the ones that have the clearest case, and we build the first one so you can measure the real result and decide whether to scale. The proof is in the pilot, not the pitch."
      },
      {
        q: "Which industries and use cases do you work with?",
        a: "Common high-value use cases are customer support automation, sales and lead workflows, document and data processing, internal knowledge assistants, and process automation. We work across services, SaaS, fintech, healthcare, and more — the assessment is tailored to your specific workflows rather than a one-size template."
      },
      {
        q: "What about data privacy and sensitive information?",
        a: "We design around your constraints. For sensitive or regulated data we use private or self-hosted models in your own cloud, with access controls and audit trails. We sign an NDA before the first detailed call, and you decide what data is in scope."
      },
      {
        q: "Do we own the strategy and anything you build?",
        a: "Yes. The roadmap, the prompts, and any source code we write are yours. We build directly on the underlying tools and models rather than locking you into a black-box platform, so you can run and extend everything we deliver without us."
      }
    ],
    testimonials: [
      {
        quote: "Every other firm sent a strategy deck. RDMI ran a free assessment, told us which two use cases were actually worth doing, and built the first one. We could measure it instead of guessing.",
        author: "A.M.",
        role: "COO, B2B Services",
        rating: 5
      },
      {
        quote: "They were honest about what wasn't worth automating yet — which is why we trusted the roadmap. The first use case shipped on a fixed scope and we own the code.",
        author: "S.V.",
        role: "Founder, SaaS Startup",
        rating: 5
      },
      {
        quote: "Senior consultant on the first call, not a junior with a template. They understood our data constraints and proposed a private deployment from the start.",
        author: "R.K.",
        role: "Head of Digital, FinTech",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Stop Buying AI Strategy Decks. Get One Use Case That Works.",
      subtitle: "Start with a free AI opportunity assessment, get a prioritised roadmap in weeks, and let us build the first use case so you can measure it before scaling. An AI consultant who also ships (not a salesperson) calls you back within 2 hours.",
      buttonText: "Get Free AI Assessment"
    },
    targetKeywords: [
      "ai consulting company",
      "ai consultant",
      "ai consultancy",
      "artificial intelligence consultancy",
      "ai consulting services",
      "ai consulting firms",
      "ai consulting",
      "ai strategy consulting",
      "artificial intelligence consulting companies",
      "ai consulting company india"
    ]
  },
  {
    slug: "ai-chatbot-development",
    primaryKeyword: "AI Chatbot Development Company",
    adGroupMatch: "AI Chatbot Development Company",
    theme: {
      heroGradient: "linear-gradient(135deg, #0891b2, #0ea5e9, #0e7490)",
      ctaGradient: "linear-gradient(135deg, #0891b2, #0ea5e9, #0e7490)",
      urgencyColor: "#0891b2",
      accent: "cyan",
      icon: "💬"
    },
    form: {
      title: "See Your AI Chatbot on Your Content",
      subtitle: "A chatbot engineer (not a salesperson) calls you back within 2 hours",
      projectTypes: [
        "AI Support Chatbot",
        "AI Sales / Lead Chatbot",
        "Website AI Assistant",
        "WhatsApp AI Chatbot",
        "RAG / Knowledge-Base Chatbot",
        "Multilingual Chatbot",
        "Other"
      ],
      placeholder: "What should your chatbot do — answer support, qualify leads, or both? On which channels?",
      buttonText: "See a Demo on My Content →",
      formType: "ai-chatbot"
    },
    meta: {
      title: "AI Chatbot Development Company | Custom Support, Sales & RAG Chatbots on Your Data | RDMI",
      description: "AI chatbot development company building custom chatbots that answer from your own content — support, sales, and website assistants for web, WhatsApp, and app. RAG-grounded so it answers from your knowledge base instead of hallucinating, with human handoff and CRM sync. You own the prompts and source code."
    },
    hero: {
      badge: "💬 AI Chatbot Development — Grounded on Your Content, Live on Web & WhatsApp",
      h1: "AI Chatbot Development Company for Support, Sales, and Website Assistants",
      subtitle: "Looking for an AI chatbot development company? RDMI builds custom AI chatbots that answer from your own content and knowledge base — not generic guesses — to handle support, qualify and capture leads, and assist visitors 24/7 across your website, WhatsApp, and app. Grounded with RAG, with human handoff and CRM sync built in.",
      cta1: "See a Demo on My Content",
      cta2: "Talk to a Chatbot Engineer",
      trustPoints: [
        "Answers from your content and knowledge base, not hallucinations",
        "Live on your website, WhatsApp, and app — 24/7",
        "Qualifies and captures leads, hands off to a human when needed",
        "You own the prompts and source code — no per-message lock-in"
      ]
    },
    images: {
      hero: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
        "https://images.unsplash.com/photo-1655720828018-edd71a68420e?w=800&q=80"
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80"
      ],
      cta: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80"
    },
    process: [
      {
        step: "01",
        title: "Chatbot Scope & Content Review — Within 2 Hours",
        description: "A chatbot engineer maps what the bot should do — answer support, qualify leads, book, or all three — and what it should answer from: your website, docs, FAQs, product data. You leave with a clear scope, the channels (web, WhatsApp, app), and an honest view of what to automate first."
      },
      {
        step: "02",
        title: "See a Working Demo on Your Content",
        description: "We build a working chatbot grounded on your actual content so you can talk to it and check the answers before go-live. You tune the tone, the guardrails, and the handoff rules until it answers the way you'd want your team to."
      },
      {
        step: "03",
        title: "Integrate, Ground, Go Live",
        description: "RAG grounding on your knowledge base, channel integration (website widget, WhatsApp, app), CRM and lead capture, human-handoff rules, and guardrails so it stays on-topic and says 'let me connect you' instead of guessing. Live across your channels."
      },
      {
        step: "04",
        title: "Monitor & Improve",
        description: "Every conversation logged with outcome tags (answered, lead captured, handed off, unanswered). We review real chats, close knowledge gaps, and refine the prompts and guardrails on a retainer as your content and questions evolve."
      }
    ],
    stats: [
      {
        value: "24/7",
        label: "Support & Lead Capture"
      },
      {
        value: "RAG",
        label: "Grounded on Your Content"
      },
      {
        value: "Web + WhatsApp",
        label: "Live Across Channels"
      },
      {
        value: "100%",
        label: "Prompts & Source Code Yours"
      }
    ],
    services: [
      {
        title: "AI Support Chatbot",
        description: "Deflect repetitive support questions 24/7 with a chatbot that answers from your help docs, FAQs, and policies — accurately, because it's grounded on your content. Escalates to a human with full context when it should, so customers never hit a dead end.",
        tags: [
          "RAG",
          "Knowledge Base",
          "Human Handoff",
          "Ticket Deflection"
        ]
      },
      {
        title: "AI Sales & Lead-Qualification Chatbot",
        description: "Engage website visitors, answer pre-sales questions, qualify with your criteria, capture the lead, and push it to your CRM — so enquiries convert instead of bouncing. Flags hot leads for instant follow-up, day or night.",
        tags: [
          "Lead Capture",
          "Qualifying Flows",
          "CRM Sync",
          "Hot-Lead Alerts"
        ]
      },
      {
        title: "Website AI Assistant",
        description: "A branded assistant embedded on your site that helps visitors find products, answers, and the right next step. Looks and sounds like your brand, grounded on your real content, no generic canned replies.",
        tags: [
          "Web Widget",
          "Branded UX",
          "Product Search",
          "Guided Help"
        ]
      },
      {
        title: "RAG / Knowledge-Base Chatbot",
        description: "An internal or external chatbot that answers from your documents — manuals, policies, contracts, wikis — with citations, so answers are grounded and checkable. The fix for hallucination: it retrieves from your knowledge, it doesn't invent.",
        tags: [
          "Retrieval-Augmented",
          "Citations",
          "Document Ingestion",
          "Vector Search"
        ]
      },
      {
        title: "WhatsApp & Multichannel Chatbots",
        description: "Meet customers where they are — WhatsApp, your website, and your app — with one chatbot brain across channels. Bookings, support, and lead capture over the channels your customers actually use.",
        tags: [
          "WhatsApp Business API",
          "Web",
          "App",
          "Unified Brain"
        ]
      },
      {
        title: "Private & Compliant Chatbots",
        description: "For sensitive data, run the chatbot on private or self-hosted models inside your own cloud, with access controls and audit logs. Suited to healthcare, BFSI, and legal where conversation content must stay protected.",
        tags: [
          "Private LLM",
          "VPC Deploy",
          "Access Controls",
          "Audit Logs"
        ]
      }
    ],
    uspHeadlines: {
      direct: "You talk to the chatbot engineer who builds your bot — on a call within 2 hours, not a salesperson with slides. You see a working demo on your own content, tune it, and approve before a single customer talks to it.",
      cost: "No per-message reseller markup on a black-box platform. We build your chatbot directly on the underlying models and channels — and the prompts, flows, and source code are yours. You pay providers' usage directly, no lock-in.",
      ai: "A chatbot that makes things up costs you trust. Every bot we ship is grounded on your content with RAG, answers with citations where it matters, stays on-topic with guardrails, and hands off to a human instead of guessing."
    },
    faq: [
      {
        q: "How is a custom AI chatbot different from a template or website plugin?",
        a: "A plugin gives generic canned flows or an ungrounded model that can make things up. We build a custom chatbot grounded on your own content with RAG, so it answers from your docs, FAQs, and product data accurately — with your qualifying logic, your CRM integration, your guardrails, and human handoff. You own the prompts and code, not a monthly black-box subscription."
      },
      {
        q: "Will it make up answers (hallucinate)?",
        a: "We design against it. The chatbot is grounded on your content with retrieval-augmented generation, answers with citations where it matters, and is given guardrails so that when it doesn't know, it says so and offers a human handoff instead of guessing. You review the answers on your own content before it goes live."
      },
      {
        q: "Which channels can it run on — website, WhatsApp, app?",
        a: "All of them. We deploy a website widget, connect WhatsApp via the WhatsApp Business API, and integrate into your mobile app — with one chatbot brain across channels so the experience and knowledge are consistent everywhere."
      },
      {
        q: "Can it capture leads and update our CRM?",
        a: "Yes. The chatbot can run your qualifying questions, capture the lead's details and intent, push them to your CRM, and flag hot leads for instant follow-up. For support, it logs conversations and outcomes so you can see what's being asked and answered."
      },
      {
        q: "What about sensitive data and privacy?",
        a: "For sensitive or regulated data we can run the chatbot on private or self-hosted models inside your own cloud, with access controls and audit logs. We sign an NDA before detailed discussions and you decide what content and data the bot can access."
      },
      {
        q: "Do we own the chatbot, or are we locked into a subscription?",
        a: "You own the prompts, conversation flows, and source code. We build directly on the underlying models and channels rather than reselling a per-message platform, so there's no lock-in — you pay the providers' usage directly and keep what we build."
      }
    ],
    testimonials: [
      {
        quote: "It answers from our actual help docs, so the answers are right — and it hands off to our team with context when it isn't sure. Support volume on repetitive questions dropped noticeably.",
        author: "P.S.",
        role: "Support Lead, SaaS",
        rating: 5
      },
      {
        quote: "The sales chatbot qualifies website visitors after hours and drops the leads straight into our CRM. We stopped losing enquiries that used to come in overnight.",
        author: "D.G.",
        role: "Marketing Head, B2B",
        rating: 5
      },
      {
        quote: "They showed us a working demo on our own content before we paid, and handed over the prompts and code. No per-message markup, no lock-in.",
        author: "V.A.",
        role: "Founder, E-Commerce",
        rating: 5
      }
    ],
    ctaSection: {
      headline: "Give Every Visitor an Answer — and Every Lead a Follow-Up.",
      subtitle: "See a working AI chatbot on your own content before you pay — answering support 24/7, qualifying leads into your CRM, and handing off to a human when it should, across web and WhatsApp. A chatbot engineer (not a salesperson) calls you back within 2 hours.",
      buttonText: "See a Demo on My Content"
    },
    targetKeywords: [
      "ai chatbot development company",
      "ai chatbot development",
      "ai chatbot development services",
      "custom ai chatbot development",
      "chatbot development company",
      "ai chatbot for website",
      "rag chatbot development",
      "conversational ai chatbot development",
      "ai chatbot development company india",
      "chatbot development services"
    ]
  }
];

// ---- Web-dev SKAG variant pages -------------------------------------------
// Each high-intent web-dev keyword gets its own dedicated landing page for tight
// ad↔page message-match (Quality Score + lead quality). They reuse the
// web-development-company page's structure (services, process, portfolio, USPs,
// stats) and override only the intent-specific copy: keyword, hero, meta, form
// title, FAQ lead question, and CTA headline.
const webDevBase = keywordGroups.find((g) => g.slug === "web-development-company")!;

function webDevVariant(o: {
  slug: string;
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1: string;
  subtitle: string;
  formTitle: string;
  faqLead: { q: string; a: string };
  ctaHeadline: string;
  targetKeywords: string[];
}): KeywordGroup {
  return {
    ...webDevBase,
    slug: o.slug,
    primaryKeyword: o.primaryKeyword,
    adGroupMatch: o.primaryKeyword,
    meta: { title: o.metaTitle, description: o.metaDescription },
    hero: { ...webDevBase.hero, badge: o.badge, h1: o.h1, subtitle: o.subtitle },
    form: { ...webDevBase.form, title: o.formTitle },
    faq: [o.faqLead, ...webDevBase.faq.slice(1)],
    ctaSection: { ...webDevBase.ctaSection, headline: o.ctaHeadline },
    targetKeywords: o.targetKeywords,
  };
}

keywordGroups.push(
  webDevVariant({
    slug: "website-development-company",
    primaryKeyword: "Website Development Company",
    metaTitle: "Website Development Company in India — A Website That Brings Leads | RDMI",
    metaDescription:
      "Website development company in India building business websites that turn visitors into enquiries — not static brochures. Senior developer WhatsApps you in 2 hours. Free 48-hour prototype. Source code yours.",
    badge: "💬 Website Development Company · Talk to a Senior Developer on WhatsApp",
    h1: "A Website That Brings You Leads — Not Just a Brochure That Sits There",
    subtitle:
      "We are a website development company that builds business sites designed to win enquiries — through Google rankings, a 24/7 AI chat assistant, and pages that load in under 1 second. Built by senior Indian developers who have shipped 200+ websites. Talk direct on WhatsApp in 2 hours. Free 48-hour prototype.",
    formTitle: "Talk to a Senior Web Developer",
    faqLead: {
      q: "How is RDMI different from other website development companies?",
      a: "Three things. You talk directly to a senior developer on WhatsApp within 2 hours — not a sales rep. You get a free working prototype in 48 hours and pay only after you approve. And every contract has a money-back clause if we miss the deadline. Most website development companies promise these in proposals but won't put them in the contract. We do.",
    },
    ctaHeadline: "Stop Paying for a Website That Just Sits There.",
    targetKeywords: [
      "website development company",
      "website development services",
      "website development agency",
      "business website development",
      "website developer",
    ],
  }),
  webDevVariant({
    slug: "custom-website-development",
    primaryKeyword: "Custom Website Development",
    metaTitle: "Custom Website Development in India — Built From Scratch, No Templates | RDMI",
    metaDescription:
      "Custom website development in India — designed and coded from scratch around your business, not a template you will outgrow. Senior developer WhatsApps you in 2 hours. Free 48-hour prototype. Full source code yours.",
    badge: "💬 Custom Website Development · Talk to a Senior Developer on WhatsApp",
    h1: "Custom Website Development — Built From Scratch for Your Business, Not a Template",
    subtitle:
      "No themes, no page-builders, no template you will outgrow in a year. We design and code your website from scratch around how your business actually works — fast, custom, and fully yours. Built by senior Indian developers. Talk direct on WhatsApp in 2 hours. Free 48-hour prototype before you pay.",
    formTitle: "Talk to a Senior Web Developer",
    faqLead: {
      q: "What does custom website development include?",
      a: "A website designed and coded from scratch for your business — no templates or page-builders. Custom design, custom front-end and back-end, the integrations you need (payments, CRM, WhatsApp, AI chat), sub-1-second load, and SEO structure baked in. You own 100% of the source code from day one. We share a fixed-price quote on the first WhatsApp call.",
    },
    ctaHeadline: "Get a Website Built Around Your Business — Not a Template.",
    targetKeywords: [
      "custom website development",
      "custom website development services",
      "custom web design services",
      "custom website developer",
      "bespoke website development",
    ],
  }),
  webDevVariant({
    slug: "web-development-services",
    primaryKeyword: "Web Development Services",
    metaTitle: "Web Development Services in India — Front-End to Full-Stack | RDMI",
    metaDescription:
      "Full-stack web development services in India — front-end, back-end, CMS, e-commerce, redesigns, and maintenance. Senior developer WhatsApps you in 2 hours. Free 48-hour prototype. Source code yours.",
    badge: "💬 Web Development Services · Talk to a Senior Developer on WhatsApp",
    h1: "Web Development Services — Front-End, Back-End, Full-Stack, by Senior Indian Devs",
    subtitle:
      "Front-end, back-end, full-stack, CMS, e-commerce, redesigns, and ongoing maintenance — whatever your website needs, a senior Indian developer builds it. Loads under 1 second, ranks on Google, captures leads 24/7 with built-in AI chat. Talk direct on WhatsApp in 2 hours. Free 48-hour prototype.",
    formTitle: "Talk to a Senior Web Developer",
    faqLead: {
      q: "What web development services does RDMI offer?",
      a: "The full stack: front-end (React, Next.js), back-end and APIs (Node.js, Python), CMS and WordPress, headless e-commerce, landing pages, redesigns and speed optimisation, plus ongoing maintenance and support. Every build includes SEO structure, analytics, a 24/7 AI chat agent, and full source-code ownership. One senior engineer scopes, builds, and supports your project.",
    },
    ctaHeadline: "Web Development Services That Ship Results, Not Excuses.",
    targetKeywords: [
      "web development services",
      "custom web development services",
      "full stack web development services",
      "professional web development services",
      "best web development services",
    ],
  }),
  webDevVariant({
    slug: "web-development-agency",
    primaryKeyword: "Web Development Agency",
    metaTitle: "Web Development Agency in India — Your Dedicated Senior Dev Team | RDMI",
    metaDescription:
      "Web development agency in India that works like your in-house team. Talk direct to the senior developer who builds your site on WhatsApp in 2 hours — no account-manager filter. Free 48-hour prototype. Source code yours.",
    badge: "💬 Web Development Agency · Talk to a Senior Developer on WhatsApp",
    h1: "A Web Development Agency That Works Like Your In-House Team",
    subtitle:
      "Most agencies hide senior developers behind account managers and junior hand-offs. We do not. You talk direct to the senior Indian engineer who builds your site — on WhatsApp, in 2 hours. Free 48-hour prototype. Source code yours from day one. No lock-in, ever.",
    formTitle: "Talk to a Senior Web Developer",
    faqLead: {
      q: "How is RDMI different from other web development agencies?",
      a: "No account-manager filter and no junior hand-offs. You talk directly to the senior developer who scopes, builds, and supports your site — on WhatsApp within 2 hours. You get a free working prototype in 48 hours and pay only after you approve, every contract has a money-back clause if we miss the deadline, and you own the full source code from day one with zero lock-in.",
    },
    ctaHeadline: "A Web Development Agency You Can Actually Talk To.",
    targetKeywords: [
      "web development agency",
      "web design and development agency",
      "web app development agency",
      "website development agency",
      "best web development agency",
    ],
  }),
);

export function getKeywordGroup(slug: string): KeywordGroup | undefined {
  return keywordGroups.find((g) => g.slug === slug);
}

const PROMOTED_SLUGS = new Set<string>([
  "ai-agent-development",
  "ai-software-development",
  "custom-software-development",
  "ecommerce-development",
  "enterprise-saas-development",
  "mobile-app-development",
  "web-development-company",
  "website-development-company",
  "custom-website-development",
  "web-development-services",
  "web-development-agency",
  "ai-automation-agency"
]);

export function getAllSlugs(): string[] {
  return keywordGroups.map((g) => g.slug).filter((s) => !PROMOTED_SLUGS.has(s));
}
