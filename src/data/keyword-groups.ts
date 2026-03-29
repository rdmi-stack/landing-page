export interface KeywordGroup {
  slug: string;
  primaryKeyword: string;
  adGroupMatch: string;
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
  faq: { q: string; a: string }[];
  ctaSection: { headline: string; subtitle: string; buttonText: string };
  targetKeywords: string[];
}

export const keywordGroups: KeywordGroup[] = [
  {
    slug: "custom-software-development",
    primaryKeyword: "Custom Software Development",
    adGroupMatch: "Custom Software Dev India",
    meta: {
      title: "Custom Software Development Company India | Save 50% | RDMI",
      description: "RDMI delivers custom software development that cuts costs 50% vs US/UK agencies. 200+ projects shipped, ₹47Cr+ revenue generated. Free quote in 2 hours.",
    },
    hero: {
      badge: "2-Hour Quote Guarantee — Senior Developers Only",
      h1: "Custom Software Development That Ships in Weeks, Not Months",
      subtitle: "200+ custom software projects delivered. 3x faster time-to-market and 50% lower cost vs US/UK agencies. Senior developers only — no juniors. Full source code ownership, NDA protected, money-back guarantee.",
      cta1: "Get Free Quote in 2 Hours",
      cta2: "See 50+ Live Products",
      trustPoints: ["Money-back guarantee on first milestone", "Full source code ownership — no lock-in", "2-hour response, 7 days a week", "NDA signed before first call"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Discovery Call", description: "Senior developer calls you within 2 hours. We map your requirements, define scope, and identify the fastest path to ROI." },
      { step: "02", title: "Free Prototype", description: "Clickable prototype in 48 hours — see exactly what you're getting before committing a single rupee." },
      { step: "03", title: "Sprint Development", description: "2-week agile sprints with live demos. You see working software every 14 days, not just status reports." },
      { step: "04", title: "Launch & Scale", description: "Production deployment with CI/CD, monitoring, and 30-60 days free support. Your software starts generating revenue." },
    ],
    stats: [
      { value: "200+", label: "Custom Software Projects Delivered" },
      { value: "₹47Cr+", label: "Revenue Generated for Clients" },
      { value: "50%", label: "Cost Savings vs US/UK Agencies" },
      { value: "3x", label: "Faster Delivery vs Industry Average" },
    ],
    services: [
      { title: "Custom Web Application Development", description: "Web apps handling 10,000+ concurrent users. React, Next.js, Node.js with CI/CD and 99.9% uptime. 60% reduction in manual workflows within 90 days.", tags: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"] },
      { title: "Bespoke SaaS Platform Development", description: "Multi-tenant SaaS ready for 1,000 paying customers on day one. Scales to 1M+ users without a rewrite. Delivered in 12–20 weeks.", tags: ["SaaS Architecture", "Stripe Billing", "Multi-Tenancy", "React"] },
      { title: "Custom ERP & CRM Software", description: "Replace ₹5–10L/year in SaaS subscriptions with a system you own forever. 40% reduction in operational overhead within 6 months.", tags: ["ERP", "CRM", "Workflow Automation", "Node.js"] },
      { title: "AI-Powered Custom Software", description: "LLM automation, document processing, predictive analytics. 70% less manual data entry, 45% fewer support tickets in Q1.", tags: ["LangChain", "OpenAI", "Python", "RAG"] },
      { title: "Custom Mobile App Development", description: "Flutter apps — single codebase, native performance, 40% lower cost. Average 4.6★ ratings. ₹3L–₹15L.", tags: ["Flutter", "React Native", "iOS", "Android"] },
      { title: "Legacy Software Modernisation", description: "Outdated systems to cloud-native platforms without disruption. Average ROI payback: 14 months.", tags: ["Cloud Migration", "API Development", "React", "DevOps"] },
    ],
    uspHeadlines: {
      direct: "You talk to the senior developer building your software — not a sales rep reading a deck",
      cost: "Same Silicon Valley quality at 50% lower cost — we build from India with no middlemen",
      ai: "Every project ships with AI capabilities built in — not bolted on later as an expensive upgrade",
    },
    faq: [
      { q: "How much does custom software development cost in India?", a: "₹1.5L for focused MVPs, ₹3L–₹8L for SaaS MVPs, ₹10L–₹20L for enterprise. Fixed-price quote within 2 hours — no hourly billing surprises." },
      { q: "How long does it take?", a: "MVP in 6–10 weeks. Full SaaS in 12–20 weeks. Enterprise in 16–28 weeks. Working demos every 2 weeks. 3x faster than industry average." },
      { q: "Do I own the source code?", a: "100%. Full source code, assets, schemas, deployment configs. No licensing fees. IP assignment signed before first line of code." },
      { q: "What technologies?", a: "React, Next.js, Node.js, Python, Go, Flutter, PostgreSQL, MongoDB, AWS, GCP, LangChain, OpenAI. Picked for YOUR scale, not what's trendy." },
      { q: "What's the quality guarantee?", a: "Not satisfied with first milestone? Full refund. Each sprint approved before billing. 94% proceed beyond first sprint." },
      { q: "Can you work with our team?", a: "Yes. Jira, Slack, GitHub integration. 40+ client engineering teams across India, USA, UK, Australia." },
      { q: "How do you handle NDAs?", a: "Mutual NDA before first call. Individual NDAs for all team members. Your code in your private repos. GDPR and SOC2-aligned." },
      { q: "Why RDMI over freelancers or large firms?", a: "Freelancers = delivery risk. Large firms = ₹8K–₹15K/hour juniors. RDMI = 3–5 seniors at ₹2.5K–₹4.5K/hour with PM, QA, DevOps. 200+ projects, zero abandoned." },
    ],
    ctaSection: {
      headline: "Get a Fixed-Price Custom Software Quote in 2 Hours",
      subtitle: "Senior developer responds with scope, timeline, and fixed price. No sales pitch. NDA signed before the call.",
      buttonText: "Get My Free Quote Now",
    },
    targetKeywords: ["custom software development", "custom software development companies", "custom software development services", "custom software development agency", "bespoke software development services", "custom software development firms", "custom app development company", "software development company"],
  },
  {
    slug: "mobile-app-development",
    primaryKeyword: "Mobile App Development Company",
    adGroupMatch: "Mobile App Development Co",
    meta: {
      title: "Mobile App Development Company India | Android & iOS | RDMI",
      description: "RDMI builds Android & iOS apps — 120K+ downloads delivered, 4x user retention. Custom mobile app development from ₹1.5L. Free quote in 2 hours.",
    },
    hero: {
      badge: "Top Mobile App Development Company India — 120K+ Downloads",
      h1: "Mobile App Development That Drives 4x User Retention",
      subtitle: "Android, iOS, and cross-platform apps that users actually keep. Flutter, React Native, and native — by senior engineers, not juniors. Money-back deadline guarantee.",
      cta1: "Get Free App Quote in 2 Hours",
      cta2: "See Our App Portfolio",
      trustPoints: ["120K+ app downloads delivered", "Flutter, React Native, Swift & Kotlin", "Money-back deadline guarantee", "Talk to developers — no sales middlemen"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&q=80",
        "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&q=80",
        "https://images.unsplash.com/photo-1605170439002-90845e8c0137?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
        "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
    },
    process: [
      { step: "01", title: "App Strategy Call", description: "Senior mobile developer discusses your app idea, target platform, and monetization strategy within 2 hours." },
      { step: "02", title: "UI/UX & Prototype", description: "Figma designs and clickable prototype in 72 hours. Test user flows before a single line of code." },
      { step: "03", title: "Agile Development", description: "2-week sprints with TestFlight/Play Store builds. You test real app on your phone every sprint." },
      { step: "04", title: "Store Launch", description: "App Store & Play Store submission, ASO optimization, and 30-day post-launch support included." },
    ],
    stats: [
      { value: "120K+", label: "App Downloads Delivered" },
      { value: "4x", label: "Avg User Retention Uplift" },
      { value: "72 hrs", label: "Prototype Turnaround" },
      { value: "₹1.5L", label: "Starting Budget" },
    ],
    services: [
      { title: "Android App Development", description: "Kotlin & Jetpack Compose — 60fps, Play Store approved, sub-3s cold start.", tags: ["Kotlin", "Jetpack Compose", "Play Store", "Firebase"] },
      { title: "iOS App Development", description: "Swift-native apps passing App Store review first time. 4.5+ star ratings.", tags: ["Swift", "SwiftUI", "App Store", "TestFlight"] },
      { title: "Flutter Cross-Platform Apps", description: "Single codebase, pixel-perfect — 40% faster to market, 30% lower maintenance.", tags: ["Flutter", "Dart", "iOS", "Android"] },
      { title: "React Native Development", description: "Near-native performance, OTA updates, shared code with web frontend.", tags: ["React Native", "TypeScript", "CodePush", "Expo"] },
      { title: "E-Commerce & On-Demand Apps", description: "10K+ concurrent users — real-time tracking, payments, push notifications, sub-500ms APIs.", tags: ["Stripe", "Razorpay", "Socket.io", "Maps API"] },
      { title: "AI-Powered Mobile Features", description: "Recommendations, OCR, voice commands, on-device ML — 2–3x session length.", tags: ["TensorFlow Lite", "Core ML", "OpenAI API"] },
    ],
    uspHeadlines: {
      direct: "You talk to the developer building your app — not a PM reading a brief",
      cost: "50–60% less than US agencies. Dedicated 3–5 person team, full source code ownership",
      ai: "Every app ships AI-ready — recommendation engines, smart search, in-app copilots from day one",
    },
    faq: [
      { q: "How much does mobile app development cost?", a: "MVP (8–12 screens): ₹1.5L–₹4L. Mid-complexity with backend: ₹4L–₹10L. Full marketplace: ₹10L–₹25L+. Fixed-price in 2 hours." },
      { q: "How long to build an app?", a: "Prototype in 72 hours. MVP in 6–10 weeks. Full app in 12–20 weeks. Demo every 2 weeks." },
      { q: "Flutter, React Native, or native?", a: "Flutter for 70% of projects (best performance, 40% faster). React Native for JS teams. Native for hardware access (AR, Bluetooth)." },
      { q: "App Store submission?", a: "End-to-end: provisioning, ASO metadata, compliance. 98% first-submission approval. Rejections resolved in 48 hours free." },
      { q: "Code ownership?", a: "100% yours on day one. NDA before any brief. No licensing, no lock-in." },
      { q: "Money-back guarantee?", a: "Miss sprint milestone by 5+ days? 10% refund on that sprint. Milestones locked in writing." },
      { q: "Post-launch scaling?", a: "Architected for 10x load. AMC from ₹15K/month: bug fixes, OS updates, minor features." },
      { q: "AI in mobile apps?", a: "TensorFlow Lite, Core ML, OpenAI, LangChain. 2–3x session length, 35% fewer tickets, 20% conversion lift." },
    ],
    ctaSection: {
      headline: "Get a Fixed-Price Mobile App Quote in 2 Hours",
      subtitle: "Senior developers review your idea — scope, timeline, cost. No obligation, NDA on request.",
      buttonText: "Talk to a Mobile App Developer",
    },
    targetKeywords: ["mobile app development company", "app development company", "android app development company", "best mobile app development companies", "mobile app developer", "ios app development companies", "custom mobile app development company", "flutter app development company"],
  },
  {
    slug: "web-development-company",
    primaryKeyword: "Web Development Company",
    adGroupMatch: "Web Development Company",
    meta: {
      title: "Web Development Company India | Custom Web Apps | RDMI — Save 50%",
      description: "RDMI — top web development company in India. Custom web apps, SaaS, e-commerce & enterprise portals. React, Next.js, Node.js. ₹1.5L onwards.",
    },
    hero: {
      badge: "India's Top Web Development Company — 50+ Web Apps Shipped",
      h1: "Web Development Company That Ships Revenue-Ready Products",
      subtitle: "High-performance web apps, SaaS platforms, and enterprise portals on React, Next.js, Node.js. Go live in 6–12 weeks with full source code, NDA, and 30-day money-back guarantee.",
      cta1: "Get Free Quote in 2 Hours",
      cta2: "Talk to a Developer Now",
      trustPoints: ["Senior developers — not sales team", "₹1.5L–₹25L+ fixed-price", "30-day money-back guarantee", "Source code on Day 1 of go-live"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Free Discovery Call", description: "Senior web developer discusses your project, recommends tech stack, and provides a fixed-price estimate in 2 hours." },
      { step: "02", title: "Design & Prototype", description: "Figma wireframes and interactive prototype. Approve every screen before development starts." },
      { step: "03", title: "Sprint Development", description: "Live staging URL after week 2. Working software every sprint — you see progress, not promises." },
      { step: "04", title: "Launch & Handover", description: "Production deploy, full source code handover, documentation, and 30-day free post-launch support." },
    ],
    stats: [
      { value: "50+", label: "Web Apps Shipped" },
      { value: "6–12 Wks", label: "Avg Time to Go-Live" },
      { value: "₹2Cr+/mo", label: "Revenue on Our SaaS Platforms" },
      { value: "50%", label: "Cost Saving vs US/UK" },
    ],
    services: [
      { title: "Custom Web Application Development", description: "React + Next.js + Node.js/Python. Dashboards, data pipelines, APIs. ₹3.5L MVP to ₹20L+ enterprise.", tags: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"] },
      { title: "SaaS Platform Development", description: "Multi-tenant SaaS with billing, analytics, CI/CD. Platforms processing ₹2Cr+/month. 10–14 weeks.", tags: ["SaaS Architecture", "Stripe", "Auth0", "Redis", "AWS"] },
      { title: "E-Commerce & Marketplace", description: "Shopify, headless Next.js, marketplaces. ₹2L Shopify to ₹12L+ custom.", tags: ["Shopify", "Headless Commerce", "Razorpay", "Elasticsearch"] },
      { title: "WordPress & CMS", description: "Core Web Vitals 90+. Custom Gutenberg, headless WP + React. 2–4 weeks from ₹1.5L.", tags: ["WordPress", "Headless WP", "ACF", "WooCommerce"] },
      { title: "Enterprise Web Portals", description: "SSO, RBAC, audit logs, SAP/Salesforce. ₹8L–₹25L over 12–20 weeks.", tags: ["SSO/SAML", "Salesforce API", "Azure AD", "RBAC"] },
      { title: "PWA & Web Performance", description: "Offline support, sub-2s loads. 40–60% Lighthouse improvement in 3 weeks.", tags: ["PWA", "Service Workers", "Lighthouse", "CDN"] },
    ],
    uspHeadlines: {
      direct: "You talk to the developer building your product — not a PM reading a brief",
      cost: "Save 50% vs US/UK web agencies — same React/Next.js stack, same senior developers",
      ai: "AI-accelerated dev cuts boilerplate 35% — your budget goes to features, not scaffolding",
    },
    faq: [
      { q: "How much for a custom web app?", a: "₹1.5L MVP. ₹5L–₹12L SaaS. ₹15L–₹25L+ enterprise. Fixed-price after free 1-hour discovery." },
      { q: "How long to build?", a: "MVP 6–8 weeks. SaaS 10–14 weeks. Enterprise 14–20 weeks. Working software every 2 weeks." },
      { q: "Tech stack?", a: "React/Next.js, Node.js/Python, PostgreSQL/MongoDB, AWS/Vercel/GCP, Tailwind. WordPress for CMS. Shopify for e-commerce." },
      { q: "Source code?", a: "100% yours. Private Git repo on Day 1. IP assignment before coding begins." },
      { q: "NDAs?", a: "Mutual NDA before discovery call. Never reference clients without written consent." },
      { q: "Work with our codebase?", a: "Yes. Audits, refactoring, features on existing React/Node.js. Daily standups, shared Git." },
      { q: "Money-back guarantee?", a: "30-day on fixed-price. Miss deliverables? 100% milestone refund. Never triggered in 50+ projects." },
      { q: "Post-launch?", a: "30 days free. Then ₹25K/month: 20 hours, 4-hour SLA, hosting, security patches." },
    ],
    ctaSection: {
      headline: "Get a Quote from a Senior Web Developer — in 2 Hours",
      subtitle: "No sales scripts. Talk directly to the developer who builds your product. NDA before the call.",
      buttonText: "Request Free Quote Now",
    },
    targetKeywords: ["web development company", "web development agency", "web application development", "website development company", "web development services", "custom web development services", "web app development agency", "best web development companies"],
  },
  {
    slug: "ai-software-development",
    primaryKeyword: "AI Software Development",
    adGroupMatch: "AI Software Development",
    meta: {
      title: "AI Software Development Company India | AI Apps & Agents | RDMI",
      description: "Production-grade AI software — chatbots handling 80% of tickets, RAG systems, LangChain agents. OpenAI, CrewAI. ₹3L onwards. Free consultation.",
    },
    hero: {
      badge: "AI-First Development — OpenAI · LangChain · CrewAI · RAG",
      h1: "AI Software Development That Delivers ROI — Not Just a Demo",
      subtitle: "Production-ready AI apps and autonomous agents that cut costs, boost revenue, and scale without headcount. Chatbots to RAG pipelines — shipped in 6–12 weeks.",
      cta1: "Get Free AI Consultation",
      cta2: "See AI Products We Built",
      trustPoints: ["Chatbots handling 80% of tier-1 tickets", "Recommendation engines boosting AOV 35%", "RAG cutting research time 60%", "Agents replacing 10+ hrs/week manual work"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1655720828018-edd71a68420e?w=800&q=80",
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    },
    process: [
      { step: "01", title: "AI Strategy Call", description: "Senior AI engineer assesses your use case, data readiness, and recommends the right AI approach — LLM, RAG, agents, or ML." },
      { step: "02", title: "Proof of Concept", description: "Working AI prototype in 2 weeks. Test with real data before committing to full build." },
      { step: "03", title: "Production Build", description: "Production-grade AI with monitoring, fallbacks, and performance benchmarks. Tested against agreed accuracy targets." },
      { step: "04", title: "Deploy & Optimize", description: "Production deployment, model monitoring, and 30-day tuning period. Performance guaranteed or we iterate free." },
    ],
    stats: [
      { value: "6–12 wks", label: "Avg AI App Delivery" },
      { value: "80%", label: "Support Tickets Auto-Resolved" },
      { value: "₹3L+", label: "Starting From" },
      { value: "50+", label: "AI & SaaS Products Delivered" },
    ],
    services: [
      { title: "AI Chatbots & Conversational Agents", description: "LLM chatbots on your data — web, WhatsApp, Slack. 75–80% tier-1 deflection in 30 days.", tags: ["OpenAI GPT-4o", "LangChain", "WhatsApp API", "RAG"] },
      { title: "Autonomous AI Agents", description: "LangChain, CrewAI, AutoGen agents replacing 10+ hours/week of manual work per person.", tags: ["CrewAI", "AutoGen", "LangChain Agents", "n8n"] },
      { title: "RAG Systems & Knowledge Bases", description: "Plain-language queries over documents. 60% faster research, grounded retrieval eliminates hallucination.", tags: ["RAG", "Pinecone", "pgvector", "LlamaIndex"] },
      { title: "ML & Predictive Analytics", description: "Forecasting, churn prediction, fraud detection, dynamic pricing. 30–40% AOV increases for e-commerce.", tags: ["Python", "scikit-learn", "TensorFlow", "XGBoost"] },
      { title: "Computer Vision & Document AI", description: "OCR, document extraction, image classification — 95%+ accuracy. Manufacturing QC, invoice processing, ID verification.", tags: ["OpenCV", "YOLOv8", "AWS Textract", "PyTorch"] },
      { title: "AI-Powered SaaS & Copilots", description: "Smart search, auto-summarisation, anomaly detection in your SaaS. OpenAI, Anthropic, Gemini integration.", tags: ["OpenAI API", "Anthropic Claude", "Gemini", "Vercel AI SDK"] },
    ],
    uspHeadlines: {
      direct: "Senior AI engineers on every project — no juniors, no sub-contracting",
      cost: "50–60% less than US/UK AI agencies. Same OpenAI stack, same LangChain expertise",
      ai: "We use AI to build AI — automated testing and LLM QA cut delivery 30% and bugs by half",
    },
    faq: [
      { q: "How much for a custom AI chatbot?", a: "Production-ready with RAG + CRM: ₹3L–₹8L. Basic FAQ bot: ₹1.5L. Enterprise multi-channel: ₹10L–₹20L+. Free 2-hour scoping." },
      { q: "How long?", a: "Chatbot/RAG: 4–6 weeks. Agent workflow: 6–10 weeks. AI SaaS: 10–16 weeks. Working demo at week 2." },
      { q: "Which AI frameworks?", a: "GPT-4o, Claude, Gemini, Llama 3, Mistral. LangChain, LlamaIndex, CrewAI, AutoGen. Pinecone, pgvector. Matched to your budget and privacy." },
      { q: "NDAs for AI projects?", a: "Mutual NDA within 2 hours. All data, models, prompts confidential. Full ownership of code and model weights on payment." },
      { q: "Can AI really handle 80% of tickets?", a: "70–85% for structured scenarios within 60 days. Key: quality RAG pipeline over your knowledge base, not generic bot." },
      { q: "ROI timeline?", a: "60–90 days. ₹5L chatbot replacing 2 staff (₹3–4L/year each) pays back in <12 months. Recommendation engines return 8–12x in year one." },
      { q: "Post-launch support?", a: "30 days free. Retainers ₹30K–₹80K/month: retraining, prompt optimization, new data, monitoring." },
      { q: "What if AI underperforms?", a: "Benchmarks in contract (deflection ≥70%, accuracy ≥90%). Not met? We iterate free until they are. 14-day money-back on discovery." },
    ],
    ctaSection: {
      headline: "Ready to Build AI Software That Actually Works?",
      subtitle: "Free 2-hour consultation. NDA same day. Working prototype in 2 weeks. ₹3L to start.",
      buttonText: "Get Free AI Consultation",
    },
    targetKeywords: ["ai app development company", "ai software development", "ai app development services", "ai software development companies", "ai app developer"],
  },
  {
    slug: "ecommerce-development",
    primaryKeyword: "E-Commerce Development",
    adGroupMatch: "Ecommerce App Development",
    meta: {
      title: "E-Commerce Development Company India | Shopify & Custom | RDMI",
      description: "High-converting e-commerce stores & apps. Shopify, headless commerce, grocery delivery, B2B marketplaces. ₹1.5L onwards. 2-hour free quote.",
    },
    hero: {
      badge: "E-Commerce — Shopify · Headless · Marketplace · Grocery",
      h1: "E-Commerce Development That Drives ₹2Cr+/Month in Orders",
      subtitle: "Shopify stores to grocery delivery apps and B2B marketplaces — platforms engineered for conversion, scale, and repeat revenue. Senior engineers, not agency juniors.",
      cta1: "Get Free E-Commerce Quote",
      cta2: "See Our E-Commerce Work",
      trustPoints: ["Shopify & headless commerce experts", "Razorpay, Stripe & PayU included", "4x avg conversion rate improvement", "100% source code — no lock-in"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
        "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80",
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    },
    process: [
      { step: "01", title: "E-Commerce Strategy", description: "Senior developer maps your catalogue, payment needs, delivery model, and recommends Shopify vs custom build." },
      { step: "02", title: "Design & Prototype", description: "Store design in Figma with mobile-first UX. Approve checkout flow, product pages, and admin panel before build." },
      { step: "03", title: "Build & Integrate", description: "2-week sprints with live staging store. Payment gateways, inventory, shipping integrated and tested." },
      { step: "04", title: "Launch & Optimize", description: "Go live with SEO setup, analytics, and 60-day free support. Conversion rate optimization included." },
    ],
    stats: [
      { value: "₹2Cr+", label: "Monthly GMV on Our Platforms" },
      { value: "4x", label: "Avg Conversion Rate Lift" },
      { value: "72 hrs", label: "MVP Storefront Live" },
      { value: "₹1.5L", label: "Starting Budget" },
    ],
    services: [
      { title: "Shopify & Shopify Plus", description: "Custom storefronts, apps, enterprise setups. 3–5x better page speed than off-the-shelf themes.", tags: ["Shopify", "Shopify Plus", "Liquid", "Hydrogen"] },
      { title: "Headless Commerce", description: "Next.js + Shopify Storefront API or Medusa.js. Sub-1s loads for brands past ₹50L/month.", tags: ["Next.js", "Medusa.js", "GraphQL", "Vercel Edge"] },
      { title: "Multi-Vendor Marketplace", description: "Seller onboarding, split payments, commission engines. MVP in 8–10 weeks.", tags: ["React", "Node.js", "Stripe Connect", "Elasticsearch"] },
      { title: "Grocery & Food Delivery Apps", description: "Customer app, driver app, vendor dashboard, admin — real-time tracking, slot-based delivery.", tags: ["Flutter", "Google Maps API", "Firebase", "Razorpay"] },
      { title: "B2B Commerce & Wholesale", description: "Tiered pricing, MOQ, credit limits, GST invoicing, Tally integration. For ₹5Cr+/month wholesale.", tags: ["React", "Node.js", "PostgreSQL", "Tally API"] },
      { title: "Payment & Checkout Optimization", description: "One-click checkout, UPI, EMI, cart recovery. 40% less drop-off, 20–30% higher AOV.", tags: ["Razorpay", "Stripe", "PayU", "UPI Intent"] },
    ],
    uspHeadlines: {
      direct: "You talk to the developer building your store — not an account manager",
      cost: "Same Shopify Plus expertise as 3x-priced agencies — full transparency from India",
      ai: "AI recommendations, smart search, dynamic pricing built into your store from day one",
    },
    faq: [
      { q: "E-commerce development cost?", a: "Shopify (500 SKUs): ₹1.5L. Marketplace with apps: ₹8L–₹25L+. Fixed-price in 2 hours." },
      { q: "Grocery delivery app timeline?", a: "Full solution (4 apps + admin): 10–14 weeks. Core MVP: 6–8 weeks. Shipped in as little as 5 weeks." },
      { q: "Shopify or custom?", a: "Shopify for <₹5Cr GMV (saves 30–40%). Custom Next.js for marketplaces, subscriptions, B2B." },
      { q: "Payment gateways?", a: "Razorpay, PayU, CCAvenue, Cashfree, Stripe, PayPal. UPI, saved cards, EMI, webhooks — all in scope." },
      { q: "Store migration?", a: "Zero-downtime from WooCommerce, Magento, PHP. Products, customers, orders, SEO URLs. 10K SKUs in 3–4 weeks." },
      { q: "Post-launch?", a: "60 days free. Then ₹15K/month: 10 hours, monitoring, patches, 4-hour priority." },
      { q: "Process?", a: "Discovery (3–5 days) → Figma (1–2 weeks) → 2-week sprints with staging → Launch & handover. You own everything." },
      { q: "NDAs?", a: "Always. Before any discussion. Never reference clients without written permission." },
    ],
    ctaSection: {
      headline: "Get a Fixed-Price E-Commerce Quote in 2 Hours",
      subtitle: "Shopify, marketplace, grocery app, or B2B — detailed scope and price in 2 hours. No retainer, just a clear number.",
      buttonText: "Get My Free E-Commerce Quote",
    },
    targetKeywords: ["ecommerce app development company", "ecommerce website development company", "ecommerce web development company", "shopify app development", "ecommerce website design companies", "shopify web development company", "ecommerce development company", "grocery delivery app development company"],
  },
  {
    slug: "ai-agent-workflow-consulting",
    primaryKeyword: "AI Agent & Workflow Development",
    adGroupMatch: "AI Agent Development Company",
    meta: {
      title: "AI Agent Development Company India | GenAI Consulting | Workflow Automation | RDMI",
      description: "Build autonomous AI agents, chatbots & workflow automation that run your business 24/7. LangChain, CrewAI, RAG, n8n. 76% of enterprises buy AI, not build it. ₹3L onwards.",
    },
    hero: {
      badge: "76% of Enterprises Buy AI Agents — Not Build Them (Menlo 2025)",
      h1: "AI Agents That Run Your Business While You Sleep",
      subtitle: "Your competitors are replacing entire departments with autonomous AI agents. We build production-grade AI workflows — chatbots that close deals, agents that process documents, RAG systems that replace 10 analysts — shipped in 4-8 weeks. Not a demo. Not a POC. Revenue-generating AI from week one.",
      cta1: "Get Free AI Strategy Session",
      cta2: "See AI Agents We've Built",
      trustPoints: [
        "Production AI in 4-8 weeks — not 6-month POCs",
        "80% support tickets auto-resolved by our chatbots",
        "₹1.2Cr/year saved for one logistics client",
        "Performance guaranteed or we iterate free",
      ],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1655720828018-edd71a68420e?w=800&q=80",
        "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    },
    process: [
      { step: "01", title: "AI Strategy & Use Case Mapping", description: "Senior AI engineer maps your workflows, identifies the 3 highest-ROI automation opportunities, and recommends the right stack — LLM vs RAG vs Agent vs ML." },
      { step: "02", title: "Working Prototype in 2 Weeks", description: "Not a slide deck. A real AI agent processing your actual data. Test it. Break it. Validate ROI before committing budget." },
      { step: "03", title: "Production Build (4-8 Weeks)", description: "Enterprise-grade: monitoring, fallbacks, human-in-the-loop, audit logs, rate limiting. Tested against contracted accuracy benchmarks." },
      { step: "04", title: "Deploy, Measure, Optimize", description: "Production launch with KPI dashboard. 30-day free optimization. Monthly retainer for retraining, new data ingestion, and scaling." },
    ],
    stats: [
      { value: "76%", label: "Of Enterprises Buy AI, Not Build (Menlo)" },
      { value: "80%", label: "Tickets Auto-Resolved by Our Bots" },
      { value: "4-8 wks", label: "Prototype to Production" },
      { value: "8-12x", label: "Year-One ROI on AI Agents" },
    ],
    services: [
      {
        title: "AI Chatbots & Voice Agents — 24/7 Revenue Machines",
        description: "Not FAQ bots. Intelligent agents trained on YOUR data that qualify leads, close deals, handle support, and process payments — WhatsApp, web, Slack, phone. One client's AI chatbot now handles 80% of tier-1 tickets and converts 3x more leads than their human team at midnight.",
        tags: ["OpenAI GPT-4o", "Claude", "WhatsApp Business API", "Twilio Voice", "RAG"],
      },
      {
        title: "Autonomous AI Agents — Replace Entire Workflows",
        description: "Multi-step agents that research, analyze, draft, and execute — end-to-end. A legal firm uses our agent to analyze 200-page contracts in 4 minutes (was 6 hours). A logistics company's agent processes 500 BOLs/day with zero human touch. This is not automation. This is autonomy.",
        tags: ["LangChain", "CrewAI", "AutoGen", "Tool Calling", "Function Agents"],
      },
      {
        title: "RAG Knowledge Systems — Your Company Brain, Queryable",
        description: "50K+ documents searchable in plain English. Employees get answers in 3 seconds, not 30 minutes. Grounded retrieval = zero hallucination. Integrates with Slack, Teams, CRM, ERP. One enterprise client eliminated 3 FTE positions in research operations within 60 days.",
        tags: ["LlamaIndex", "Pinecone", "pgvector", "Weaviate", "Hybrid Search"],
      },
      {
        title: "AI Workflow Automation — Kill Repetitive Processes",
        description: "Invoice processing, lead scoring, content generation, email triage, report building — all on autopilot. n8n + custom orchestration replaces the spreadsheet-email-meeting loop your team wastes 20+ hours/week on. One client saved ₹1.2Cr/year in operational costs.",
        tags: ["n8n", "Make", "Custom APIs", "Webhooks", "Zapier Alternative"],
      },
      {
        title: "GenAI Consulting & Strategy — Know What To Build First",
        description: "Don't build the wrong AI. Our consulting starts with workflow mapping, data audit, and ROI modeling — THEN we recommend what to automate. 70% of AI projects fail because they solve the wrong problem. We fix that in a 2-week paid discovery sprint. Deliverable: prioritized AI roadmap with ROI projections.",
        tags: ["AI Strategy", "Data Audit", "ROI Modeling", "Workflow Mapping", "Change Management"],
      },
      {
        title: "AI-Powered SaaS Features & Copilots — Ship Intelligence",
        description: "Add AI to your existing product: smart search, auto-summarization, recommendations, anomaly detection, in-app copilot. Your SaaS becomes 10x stickier. One client saw 35% AOV increase after adding AI recommendations and 45% reduction in churn after adding an AI copilot.",
        tags: ["Vercel AI SDK", "Streaming", "Embeddings", "Fine-Tuning", "A/B Testing"],
      },
    ],
    uspHeadlines: {
      direct: "Your AI engineer picks up the phone in 2 hours — not a consultant with a deck. We've shipped 50+ AI products. We know what works and what's a waste of money.",
      cost: "A ₹5L AI chatbot replaces 2 support staff (₹6-8L/year salary). A ₹10L RAG system replaces 3 research analysts. The ROI math is brutal — in your favor. 50% less than US/UK AI agencies.",
      ai: "We use AI to build AI. Our developers write production code 3x faster using AI tools — which means your budget goes to intelligence, not boilerplate. Every sprint ships faster than the last.",
    },
    faq: [
      { q: "What's the difference between an AI chatbot and an AI agent?", a: "A chatbot answers questions from a knowledge base. An AI agent ACTS — it reads emails, extracts data, calls APIs, updates CRMs, sends follow-ups, and makes decisions autonomously. Our agents replace workflows, not just conversations." },
      { q: "How much does an AI agent cost?", a: "Simple chatbot with RAG: ₹3L-₹5L. Multi-step autonomous agent: ₹5L-₹12L. Enterprise multi-agent system: ₹15L-₹30L+. Every project starts with a ₹50K-₹1L paid discovery sprint so you know EXACTLY what you're getting." },
      { q: "How long until we see ROI?", a: "60-90 days for most deployments. A ₹5L chatbot replacing 2 support staff pays back in <12 months. A ₹10L workflow agent saving 20 hrs/week pays back in 6 months. We model ROI before we write code." },
      { q: "What if the AI doesn't perform?", a: "Contracted benchmarks: deflection ≥70%, accuracy ≥90%, response time <3s — whatever matters for your use case. Not met at launch? We iterate at zero cost until they are. 14-day money-back on discovery sprints." },
      { q: "Which AI models do you use?", a: "GPT-4o, Claude 3.5, Gemini Pro, Llama 3, Mistral — matched to your use case, budget, and data privacy requirements. On-premise models for regulated industries. We're model-agnostic, not vendor-locked." },
      { q: "Can you add AI to our existing software?", a: "Yes. API integration, embedded copilots, smart search overlay, AI-powered dashboards — we bolt intelligence onto your existing stack without rewriting your codebase. Typical integration: 3-6 weeks." },
      { q: "Do you handle data privacy and compliance?", a: "GDPR, HIPAA, SOC2, India IT Act — all standard. Data stays in your cloud. Models run in your VPC if needed. NDA signed before first call. We've built AI for healthcare, fintech, and legal — compliance is non-negotiable." },
      { q: "What industries do you serve?", a: "Healthcare (RCM, patient comms), BFSI (claims, KYC, fraud), Legal (contract analysis, intake), Logistics (BOL processing, route AI), E-commerce (recommendations, support), SaaS (copilots, analytics), EdTech (AI tutors). If you have a repetitive process, we can automate it." },
      { q: "Why not build AI in-house?", a: "76% of enterprises buy AI, not build it (Menlo 2025). Why? Building takes 6-12 months, requires hiring 3-5 specialists, and most internal POCs never reach production. We ship production AI in 4-8 weeks with a team that's done it 50+ times." },
      { q: "How do we get started?", a: "Step 1: Fill the form (60 seconds). Step 2: Senior AI engineer calls within 2 hours. Step 3: 2-week paid discovery sprint (₹50K-₹1L) with working prototype. Step 4: Approve and we build. Don't love the prototype? Walk away." },
    ],
    ctaSection: {
      headline: "Your Business Runs 24/7. Shouldn't Your Software?",
      subtitle: "AI agents that sell, support, process, and scale — while your team sleeps. Senior AI engineer calls you in 2 hours. Working prototype in 2 weeks. Production in 4-8 weeks. Guaranteed.",
      buttonText: "Get Free AI Strategy Session",
    },
    targetKeywords: [
      "ai agent development company",
      "ai consulting services",
      "ai workflow automation company",
      "ai chatbot development company",
      "custom ai agent development",
      "generative ai development company",
      "langchain development company",
      "ai automation services India",
      "rag system development",
      "ai integration services",
      "ai agent development services",
      "enterprise ai consulting",
      "ai workflow automation services",
      "hire ai developers India",
      "ai software development company",
    ],
  },
];

export function getKeywordGroup(slug: string): KeywordGroup | undefined {
  return keywordGroups.find((g) => g.slug === slug);
}

export function getAllSlugs(): string[] {
  return keywordGroups.map((g) => g.slug);
}
