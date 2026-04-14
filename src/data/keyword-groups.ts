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
    primaryKeyword: "Custom Software Development",
    adGroupMatch: "Custom Software Dev India",
    theme: { heroGradient: "linear-gradient(135deg, #4f46e5, #7c3aed, #4338ca)", ctaGradient: "linear-gradient(135deg, #4f46e5, #7c3aed, #4338ca)", urgencyColor: "#4f46e5", accent: "indigo", icon: "💻" },
    form: { title: "Get Free Software Consultation", subtitle: "Senior developer discusses your project in 2 hours", projectTypes: ["Custom Web App", "SaaS Platform", "ERP / CRM System", "Legacy Modernization", "API & Integration", "AI-Powered Software", "Other"], placeholder: "What business problem do you need software to solve?", buttonText: "Get Free Prototype", formType: "software" },
    meta: {
      title: "Custom Software Development Company India | Senior Engineers Only | RDMI",
      description: "RDMI delivers custom software development built by senior engineers. 200+ projects shipped, full source code ownership, NDA protected. Free quote in 2 hours.",
    },
    hero: {
      badge: "2-Hour Quote Guarantee — Senior Developers Only",
      h1: "Custom Software Development That Ships in Weeks, Not Months",
      subtitle: "200+ custom software projects delivered. 3x faster time-to-market. Senior developers only — no juniors. Full source code ownership, NDA protected, money-back guarantee.",
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
      { step: "02", title: "Free Prototype", description: "Clickable prototype in 48 hours — see exactly what you're getting before committing." },
      { step: "03", title: "Sprint Development", description: "2-week agile sprints with live demos. You see working software every 14 days, not just status reports." },
      { step: "04", title: "Launch & Scale", description: "Production deployment with CI/CD, monitoring, and 30-60 days free support. Your software starts generating revenue." },
    ],
    stats: [
      { value: "200+", label: "Custom Software Projects Delivered" },
      { value: "98%", label: "On-Time Delivery Rate" },
      { value: "3x", label: "Faster Delivery vs Industry Average" },
      { value: "100%", label: "Source Code Ownership" },
    ],
    services: [
      { title: "Custom Web Application Development", description: "Web apps handling 10,000+ concurrent users. React, Next.js, Node.js with CI/CD and 99.9% uptime. 60% reduction in manual workflows within 90 days.", tags: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS"] },
      { title: "Bespoke SaaS Platform Development", description: "Multi-tenant SaaS ready for 1,000 paying customers on day one. Scales to 1M+ users without a rewrite. Delivered in 12–20 weeks.", tags: ["SaaS Architecture", "Stripe Billing", "Multi-Tenancy", "React"] },
      { title: "Custom ERP & CRM Software", description: "Replace recurring SaaS subscriptions with a system you own forever. 40% reduction in operational overhead within 6 months.", tags: ["ERP", "CRM", "Workflow Automation", "Node.js"] },
      { title: "AI-Powered Custom Software", description: "LLM automation, document processing, predictive analytics. 70% less manual data entry, 45% fewer support tickets in Q1.", tags: ["LangChain", "OpenAI", "Python", "RAG"] },
      { title: "Custom Mobile App Development", description: "Flutter apps — single codebase, native performance, 40% faster delivery. Average 4.6★ ratings.", tags: ["Flutter", "React Native", "iOS", "Android"] },
      { title: "Legacy Software Modernisation", description: "Outdated systems to cloud-native platforms without disruption. Average ROI payback: 14 months.", tags: ["Cloud Migration", "API Development", "React", "DevOps"] },
    ],
    uspHeadlines: {
      direct: "You talk to the senior developer building your software — not a sales rep reading a deck",
      cost: "Silicon Valley quality engineering — senior developers only, no juniors, no middlemen, no outsourcing chains",
      ai: "Every project ships with AI capabilities built in — not bolted on later as an expensive upgrade",
    },
    faq: [
      { q: "How long does it take?", a: "MVP in 6–10 weeks. Full SaaS in 12–20 weeks. Enterprise in 16–28 weeks. Working demos every 2 weeks. 3x faster than industry average." },
      { q: "Do I own the source code?", a: "100%. Full source code, assets, schemas, deployment configs. No licensing fees. IP assignment signed before first line of code." },
      { q: "What technologies?", a: "React, Next.js, Node.js, Python, Go, Flutter, PostgreSQL, MongoDB, AWS, GCP, LangChain, OpenAI. Picked for YOUR scale, not what's trendy." },
      { q: "What's the quality guarantee?", a: "Not satisfied with first milestone? Full refund. Each sprint approved before billing. 94% proceed beyond first sprint." },
      { q: "Can you work with our team?", a: "Yes. Jira, Slack, GitHub integration. 40+ client engineering teams across India, USA, UK, Australia." },
      { q: "How do you handle NDAs?", a: "Mutual NDA before first call. Individual NDAs for all team members. Your code in your private repos. GDPR and SOC2-aligned." },
      { q: "Why RDMI over freelancers or large firms?", a: "Freelancers = delivery risk. Large firms = junior-heavy teams. RDMI = 3–5 senior engineers with PM, QA, DevOps. 200+ projects, zero abandoned." },
    ],
    testimonials: [
      { quote: "They shipped a production SaaS in 11 weeks — something our previous vendor quoted us 9 months for. The senior devs were hands-on daily, not hidden behind a project manager.", author: "A.K.", role: "CTO, B2B SaaS (Mumbai)", rating: 5 },
      { quote: "Full source code ownership, NDA signed day one, and a working prototype inside 72 hours. That's rare. Two years later the platform still runs with zero lock-in.", author: "R.M.", role: "Founder, D2C Brand (Bangalore)", rating: 5 },
      { quote: "We replaced a crumbling legacy ERP without a single day of downtime. Their architecture review alone saved us from a six-figure mistake. Strongly recommend.", author: "S.P.", role: "Head of Engineering, FinTech (Delhi NCR)", rating: 5 },
    ],
    ctaSection: {
      headline: "Get a Custom Software Quote in 2 Hours",
      subtitle: "Senior developer responds with scope and timeline. No sales pitch. NDA signed before the call.",
      buttonText: "Get My Free Quote Now",
    },
    targetKeywords: ["custom software development", "custom software development company", "custom software development services", "software development company", "software development services", "software development agency", "custom software development cost", "enterprise software development", "saas development company", "software development outsourcing", "best software development companies", "healthcare software development", "fintech software development", "custom application development"],
  },
  {
    slug: "mobile-app-development",
    primaryKeyword: "Mobile App Development Company",
    adGroupMatch: "Mobile App Development Co",
    theme: { heroGradient: "linear-gradient(135deg, #1e40af, #0891b2, #1e3a8a)", ctaGradient: "linear-gradient(135deg, #1e40af, #0891b2, #1e3a8a)", urgencyColor: "#1e40af", accent: "blue", icon: "📱" },
    form: { title: "Get Free App Consultation", subtitle: "AI engineer + mobile dev assess your app idea", projectTypes: ["AI-Powered Flutter App", "Android App (Kotlin)", "iOS App (Swift)", "E-Commerce / Marketplace App", "Healthcare / FinTech App", "On-Demand / Delivery App", "Other"], placeholder: "What should your app do that competitors' apps don't?", buttonText: "Get Free App Prototype", formType: "mobile-app" },
    meta: {
      title: "AI-Powered Mobile App Development Company India | Android & iOS | RDMI",
      description: "Build AI-integrated mobile apps that generate revenue from day one. 120K+ downloads delivered. AI chatbots, smart recommendations, voice AI built into every app. Talk to a developer, not a salesperson.",
    },
    hero: {
      badge: "📱 AI-Integrated Mobile Apps — Not Just Another App Agency",
      h1: "Mobile Apps That Generate Revenue From Day One — With AI Built In",
      subtitle: "Your competitors' apps are static. Yours will have AI chatbots, smart recommendations, voice search, and predictive analytics — built into the core, not bolted on later. 120K+ downloads delivered. Flutter, React Native, Swift & Kotlin. Senior engineers only.",
      cta1: "Get Free App Consultation",
      cta2: "See Our App Portfolio",
      trustPoints: ["AI chatbot + recommendations included free", "120K+ app downloads delivered", "Money-back deadline guarantee", "Talk to developers — not salespeople"],
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
      { step: "01", title: "App Strategy + AI Assessment", description: "Senior mobile dev + AI engineer assess your app idea. We identify which AI features will drive the highest ROI — chatbot, recommendations, voice, or automation." },
      { step: "02", title: "AI-Designed Prototype in 72 Hours", description: "Clickable prototype with AI features mocked up. Test user flows on your phone before committing. Don't love it? Walk away at zero cost." },
      { step: "03", title: "AI-Powered Sprint Development", description: "AI writes 40% of code, humans review 100%. TestFlight/Play Store builds every 2 weeks. You test the real app on your phone every sprint." },
      { step: "04", title: "Launch + AI Optimization", description: "App Store & Play Store submission with ASO. AI features trained on real user data post-launch. 30-day free optimization included." },
    ],
    stats: [
      { value: "120K+", label: "App Downloads Delivered" },
      { value: "4x", label: "User Retention vs Industry Avg" },
      { value: "35%", label: "Higher AOV with AI Recommendations" },
      { value: "80%", label: "Support Tickets Handled by AI Chatbot" },
    ],
    services: [
      { title: "AI-Integrated Flutter Apps", description: "One codebase, both platforms, AI built-in. Smart recommendations that boost AOV 35%. AI chatbot for 24/7 in-app support. Personalized push notifications that increase retention 4x. 40% faster to market than native.", tags: ["Flutter", "OpenAI", "Firebase", "AI Recommendations"] },
      { title: "AI-Powered Android Apps", description: "Kotlin + Jetpack Compose with on-device ML. AI features: real-time image recognition, voice commands, predictive text, smart search. Play Store approved first time, 60fps performance, sub-3s cold start.", tags: ["Kotlin", "TensorFlow Lite", "Play Store", "On-Device ML"] },
      { title: "AI-Powered iOS Apps", description: "Swift + SwiftUI with Core ML integration. AI features: Siri shortcuts, on-device face/object detection, smart categorization, predictive UX. 4.5+ star App Store ratings. Passes review first submission.", tags: ["Swift", "Core ML", "ARKit", "App Store"] },
      { title: "AI E-Commerce & Marketplace Apps", description: "Apps that sell while users sleep. AI-powered product recommendations (35% AOV increase), visual search, chatbot checkout assistance, fraud detection. Real-time inventory, payments, push notifications. 10K+ concurrent users.", tags: ["AI Recommendations", "Visual Search", "Razorpay", "Socket.io"] },
      { title: "AI Healthcare & FinTech Apps", description: "HIPAA-ready health apps with AI symptom triage, appointment scheduling, telemedicine. FinTech apps with AI credit scoring, KYC automation, fraud detection. Compliance built from sprint 1, not bolted on.", tags: ["HIPAA", "AI Triage", "KYC", "Telemedicine"] },
      { title: "AI Voice & Conversational Apps", description: "Apps with built-in voice AI — voice search, voice commands, AI phone agent, WhatsApp bot integration. Users interact naturally instead of tapping buttons. 2-3x longer session length with voice-enabled apps.", tags: ["Voice AI", "WhatsApp API", "Twilio", "Speech-to-Text"] },
    ],
    uspHeadlines: {
      direct: "Your app developer calls you in 2 hours — a 5+ year senior engineer who has shipped AI apps, not a salesperson reading a script. Direct WhatsApp access to your dev team throughout the project.",
      cost: "AI-powered development: our AI tools write 40% of code, so your budget goes to features and polish — not boilerplate. Money-back guarantee.",
      ai: "Every RDMI app ships with AI built into the architecture — chatbots, recommendations, voice, analytics. Your competitors' apps are static menus. Yours will learn, predict, and convert.",
    },
    faq: [
      { q: "What AI features come built into the app?", a: "Every app includes: AI chatbot for in-app support (handles 80% of queries 24/7), smart recommendations engine (35% AOV increase for e-commerce), personalized push notifications (4x retention), and analytics dashboard. Additional AI: voice commands, image recognition, predictive UX." },
      { q: "How long to build an AI-powered mobile app?", a: "Prototype in 72 hours. MVP with core AI features in 6-10 weeks. Full app with advanced AI in 12-20 weeks. AI writes 40% of code so we deliver 3x faster. You see a working build on your phone every 2 weeks." },
      { q: "Flutter, React Native, or Native — which is best for AI apps?", a: "Flutter for 70% of AI-integrated apps (best performance, single codebase, TensorFlow Lite support). React Native for teams with existing JS/React codebase. Native Swift/Kotlin when you need heavy on-device ML, AR, or hardware-specific AI. We recommend based on YOUR use case in the first call." },
      { q: "Will the AI features actually generate ROI?", a: "Yes — measurable ROI from month 1. AI chatbot: reduces support cost by 80%. Recommendations: increases AOV 35%. Personalized push: 4x retention. Voice search: 2-3x session length. We set KPIs before building and track post-launch." },
      { q: "Do you handle App Store & Play Store submission?", a: "End-to-end: provisioning, screenshots, ASO-optimized metadata, compliance review. 98% first-submission approval rate. Any rejection resolved within 48 hours free. Ongoing ASO optimization available." },
      { q: "100% code ownership?", a: "Every line. Source code, AI model weights, design files, documentation — all yours on Day 1. NDA signed before first call. No licensing fees, no vendor lock-in. You can take the code to any team." },
      { q: "What about post-launch AI optimization?", a: "30 days free post-launch: AI model retraining on real user data, recommendation engine tuning, chatbot response improvement. Then optional retainer for ongoing AI optimization, new features, and OS updates." },
      { q: "AI in mobile apps?", a: "TensorFlow Lite, Core ML, OpenAI, LangChain. 2–3x session length, 35% fewer tickets, 20% conversion lift." },
    ],
    ctaSection: {
      headline: "Get a Mobile App Quote in 2 Hours",
      subtitle: "Senior developers review your idea — scope and timeline. No obligation, NDA on request.",
      buttonText: "Talk to a Mobile App Developer",
    },
    targetKeywords: ["mobile app development company", "mobile app developer", "app development company", "android app development company", "ios app development companies", "best mobile app development companies", "flutter app development company", "react native app development companies", "mobile app development services", "healthcare app development company", "ecommerce app development company", "app development agency", "hire app developers", "mobile app development cost"],
  },
  {
    slug: "web-development-company",
    primaryKeyword: "Web Development Company",
    adGroupMatch: "Web Development Company",
    theme: { heroGradient: "linear-gradient(135deg, #7c3aed, #9333ea, #6d28d9)", ctaGradient: "linear-gradient(135deg, #7c3aed, #9333ea, #6d28d9)", urgencyColor: "#7c3aed", accent: "violet", icon: "🌐" },
    form: { title: "Get Free Website Consultation", subtitle: "Developer calls in 2 hours — not a salesperson", projectTypes: ["AI-Powered Business Website", "Web Application / SaaS", "E-Commerce Store", "WordPress / CMS", "Landing Pages", "Website Redesign & Speed", "Other"], placeholder: "What should your website achieve for your business?", buttonText: "Get Free Website Prototype", formType: "web-dev" },
    meta: {
      title: "AI-Powered Web Development Company India | Custom Websites & Web Apps | RDMI",
      description: "India's AI-powered web development company. Custom websites, web apps, SaaS & e-commerce — built with AI for 3x faster delivery. Free prototype in 48 hours.",
    },
    hero: {
      badge: "AI-Powered Web Development — Not Traditional Coding",
      h1: "Custom Websites That Load in 1.2s, Rank on Page 1 & Convert 4x More",
      subtitle: "Your website isn't a brochure — it's a revenue engine. We build AI-powered custom websites with built-in SEO, lead capture, chatbots, and analytics. React, Next.js, Tailwind — delivered 3x faster than traditional agencies because AI writes 40% of the code.",
      cta1: "Get Free Website Prototype in 48 Hours",
      cta2: "See Websites We've Built",
      trustPoints: ["AI-powered = 3x faster delivery", "Fixed-scope pricing (no hourly)", "Built-in SEO + AI chatbot included", "Money-back if we miss your deadline"],
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
        "/images/portfolio-ai-dashboard.png",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Free 30-Min Discovery Call", description: "Senior developer (not a salesperson) discusses your business goals, target audience, and budget. You get a fixed-price quote before the call ends." },
      { step: "02", title: "AI-Designed Prototype in 48 Hours", description: "Clickable Figma prototype with your branding, content structure, and user flows. See your website before committing. Don't love it? Walk away." },
      { step: "03", title: "AI-Powered Development (2-4 Weeks)", description: "AI writes 40% of the code, humans review 100%. Live staging URL in week 1. Built-in SEO, analytics, AI chatbot, and lead capture — not added later." },
      { step: "04", title: "Launch + 30-Day Free Support", description: "Production deployment on Vercel/AWS, domain setup, SSL, Google Analytics, Search Console. 30-day free support for bug fixes and tweaks. You own everything." },
    ],
    stats: [
      { value: "200+", label: "Websites & Web Apps Delivered" },
      { value: "1.2s", label: "Avg Page Load Time (vs 4s industry)" },
      { value: "3x", label: "Faster Than Traditional Agencies" },
      { value: "90+", label: "Lighthouse Score Guaranteed" },
    ],
    services: [
      { title: "AI-Powered Business Website", description: "Not a template. Custom-designed, mobile-first website with built-in AI chatbot for 24/7 lead capture, SEO baked into architecture, WhatsApp integration, and Google Analytics. 90+ Lighthouse score guaranteed. Live in 2-3 weeks.", tags: ["Next.js", "Tailwind", "AI Chatbot", "SEO", "WhatsApp"] },
      { title: "Custom Web Application", description: "Dashboards, portals, booking systems, CRMs — full-stack web apps with user auth, database, APIs, and admin panel. AI features built-in: smart search, auto-reports, recommendations. Delivered in 4-8 weeks.", tags: ["React", "Node.js", "MongoDB", "Auth", "Admin Panel"] },
      { title: "E-Commerce Website", description: "Shopify, WooCommerce, or custom headless commerce. Product catalog, payments (Razorpay/Stripe), inventory, order tracking. AI-powered recommendations that increase AOV 35%. Live in 3-4 weeks.", tags: ["Shopify", "WooCommerce", "Razorpay", "Headless", "AI Recs"] },
      { title: "WordPress / CMS Website", description: "High-performance WordPress with custom theme, Gutenberg blocks, WooCommerce, or headless setup. Core Web Vitals 90+. SEO-optimized from day one. Delivered in 2-3 weeks.", tags: ["WordPress", "Custom Theme", "ACF", "SEO", "WooCommerce"] },
      { title: "High-Converting Landing Pages", description: "Campaign-ready landing pages for Google Ads, product launches, lead gen. A/B test ready, GA4 tracking, conversion-optimized copy. 4x higher conversion than template builders. Live in 1-2 weeks.", tags: ["Next.js", "Tailwind", "GA4", "A/B Testing", "CRO"] },
      { title: "Website Redesign & Speed Optimization", description: "Slow, ugly, or not converting? We rebuild on modern stack (Next.js/React) with 90+ Lighthouse score, mobile-first design, and AI-powered features. Zero downtime migration.", tags: ["Migration", "Speed Optimization", "Lighthouse 90+", "Mobile-First"] },
    ],
    uspHeadlines: {
      direct: "A senior developer calls you in 2 hours — not a sales rep. You see your website prototype in 48 hours — not 2 weeks. That's the RDMI difference.",
      cost: "AI writes 40% of the code, so your budget goes to design and features — not manual labor. Fixed price. No hourly billing.",
      ai: "Every website we build ships with AI built-in: chatbot for lead capture, smart search, auto-generated meta tags, performance monitoring. Your competitors are still building static sites.",
    },
    faq: [
      { q: "How fast can you build my website?", a: "Business website: 2-3 weeks. Web app: 4-8 weeks. E-commerce: 3-4 weeks. Landing page: 1-2 weeks. AI-powered development is 3x faster than traditional agencies. You get a staging URL in week 1." },
      { q: "What makes your websites 'AI-powered'?", a: "Three things: (1) AI writes 40% of the code so we deliver 3x faster. (2) Every site ships with a built-in AI chatbot for lead capture. (3) AI-powered SEO — auto meta tags, structured data, sitemap generation. Your website is intelligent from day one." },
      { q: "Do I get an AI chatbot with my website?", a: "Yes — included as standard. The chatbot handles visitor queries 24/7, captures leads, books appointments, and integrates with WhatsApp. It's trained on YOUR business data, not generic FAQ." },
      { q: "Will my website rank on Google?", a: "We build for SEO from the ground up: server-side rendering (Next.js), Core Web Vitals 90+, schema markup, sitemap, meta tags, alt text. We also offer ongoing SEO services if you want to rank for specific keywords." },
      { q: "Can I see a prototype before starting?", a: "Yes — free clickable prototype in 48 hours. See your website's design, layout, and user flow before committing. Don't love it? Walk away at zero cost." },
      { q: "Do I own the website code?", a: "100%. Full source code in your GitHub repo. No proprietary CMS lock-in. You can modify it, host it anywhere, or hire anyone else to maintain it." },
      { q: "What about hosting and domain?", a: "We deploy on Vercel (free tier handles most business websites) or AWS. Domain setup, SSL certificate, email setup — all included in the project scope. No surprise hosting bills." },
    ],
    ctaSection: {
      headline: "Your Website Should Work Harder Than Your Sales Team.",
      subtitle: "AI-powered custom website with built-in chatbot, SEO, and analytics. Talk to a senior developer in 2 hours. Free prototype in 48 hours. Don't love it? Walk away — zero cost.",
      buttonText: "Get Free Website Prototype",
    },
    targetKeywords: ["web development company", "website development company", "web development services", "web development agency", "web application development", "website developer", "custom website development", "web app development services", "website design and development services", "best web development companies", "web designing company", "website development service", "ecommerce website development company", "shopify website development", "building website for business"],
  },
  {
    slug: "ai-software-development",
    primaryKeyword: "AI Software Development",
    adGroupMatch: "AI Software Development",
    theme: { heroGradient: "linear-gradient(135deg, #9333ea, #db2777, #7e22ce)", ctaGradient: "linear-gradient(135deg, #9333ea, #db2777, #7e22ce)", urgencyColor: "#9333ea", accent: "purple", icon: "🤖" },
    form: { title: "Get Free AI Consultation", subtitle: "Senior AI engineer assesses your use case", projectTypes: ["AI Chatbot / Voice Agent", "Autonomous AI Agent", "RAG / Knowledge Base", "ML Model / Predictive Analytics", "Computer Vision / Document AI", "AI Integration into Existing Software", "Other"], placeholder: "What manual process do you want AI to automate?", buttonText: "Get Free AI Assessment", formType: "ai-software" },
    meta: {
      title: "AI Software Development Company India | AI Apps & Agents | RDMI",
      description: "Production-grade AI software — chatbots handling 80% of tickets, RAG systems, LangChain agents. OpenAI, CrewAI. Free consultation.",
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
      { value: "92%", label: "Model Accuracy on Production" },
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
      cost: "Senior AI engineers only — same OpenAI stack and LangChain expertise, no juniors, no sub-contracting",
      ai: "We use AI to build AI — automated testing and LLM QA cut delivery 30% and bugs by half",
    },
    faq: [
      { q: "How long?", a: "Chatbot/RAG: 4–6 weeks. Agent workflow: 6–10 weeks. AI SaaS: 10–16 weeks. Working demo at week 2." },
      { q: "Which AI frameworks?", a: "GPT-4o, Claude, Gemini, Llama 3, Mistral. LangChain, LlamaIndex, CrewAI, AutoGen. Pinecone, pgvector. Matched to your use case and privacy needs." },
      { q: "NDAs for AI projects?", a: "Mutual NDA within 2 hours. All data, models, prompts confidential. Full ownership of code and model weights on payment." },
      { q: "Can AI really handle 80% of tickets?", a: "70–85% for structured scenarios within 60 days. Key: quality RAG pipeline over your knowledge base, not generic bot." },
      { q: "ROI timeline?", a: "60–90 days for most deployments. Chatbots replacing support staff typically pay back in under 12 months. Recommendation engines return 8–12x in year one." },
      { q: "Post-launch support?", a: "30 days free. Monthly retainers available for retraining, prompt optimization, new data ingestion, and monitoring." },
      { q: "What if AI underperforms?", a: "Benchmarks in contract (deflection ≥70%, accuracy ≥90%). Not met? We iterate free until they are. 14-day money-back on discovery." },
    ],
    ctaSection: {
      headline: "Ready to Build AI Software That Actually Works?",
      subtitle: "Free 2-hour consultation. NDA same day. Working prototype in 2 weeks.",
      buttonText: "Get Free AI Consultation",
    },
    targetKeywords: ["ai development company", "ai software development", "ai app development company", "ai solutions for business", "ai tools for business", "ai app development services", "custom ai solutions", "ai software development companies", "ai consulting services", "enterprise ai solutions"],
  },
  {
    slug: "ecommerce-development",
    primaryKeyword: "E-Commerce Development",
    adGroupMatch: "Ecommerce App Development",
    theme: { heroGradient: "linear-gradient(135deg, #d97706, #ea580c, #b45309)", ctaGradient: "linear-gradient(135deg, #d97706, #ea580c, #b45309)", urgencyColor: "#d97706", accent: "amber", icon: "🛒" },
    form: { title: "Get Free E-Commerce Consultation", subtitle: "E-commerce specialist responds in 2 hours", projectTypes: ["Shopify / Shopify Plus Store", "Custom Marketplace Platform", "B2B Wholesale Portal", "Grocery / Food Delivery App", "Headless Commerce", "Payment & Checkout Optimization", "Other"], placeholder: "What's your current monthly GMV and growth target?", buttonText: "Get Free Store Prototype", formType: "ecommerce" },
    meta: {
      title: "E-Commerce Development Company India | Shopify & Custom | RDMI",
      description: "High-converting e-commerce stores & apps. Shopify, headless commerce, grocery delivery, B2B marketplaces. 2-hour free quote.",
    },
    hero: {
      badge: "E-Commerce — Shopify · Headless · Marketplace · Grocery",
      h1: "E-Commerce Development That 4x's Your Conversions",
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
      { value: "50+", label: "E-Commerce Stores Live" },
      { value: "4x", label: "Avg Conversion Rate Lift" },
      { value: "72 hrs", label: "MVP Storefront Live" },
      { value: "100%", label: "Source Code Ownership" },
    ],
    services: [
      { title: "Shopify & Shopify Plus", description: "Custom storefronts, apps, enterprise setups. 3–5x better page speed than off-the-shelf themes.", tags: ["Shopify", "Shopify Plus", "Liquid", "Hydrogen"] },
      { title: "Headless Commerce", description: "Next.js + Shopify Storefront API or Medusa.js. Sub-1s loads for high-volume brands scaling past templates.", tags: ["Next.js", "Medusa.js", "GraphQL", "Vercel Edge"] },
      { title: "Multi-Vendor Marketplace", description: "Seller onboarding, split payments, commission engines. MVP in 8–10 weeks.", tags: ["React", "Node.js", "Stripe Connect", "Elasticsearch"] },
      { title: "Grocery & Food Delivery Apps", description: "Customer app, driver app, vendor dashboard, admin — real-time tracking, slot-based delivery.", tags: ["Flutter", "Google Maps API", "Firebase", "Razorpay"] },
      { title: "B2B Commerce & Wholesale", description: "Tiered pricing, MOQ, credit limits, GST invoicing, Tally integration. Built for high-volume wholesale operations.", tags: ["React", "Node.js", "PostgreSQL", "Tally API"] },
      { title: "Payment & Checkout Optimization", description: "One-click checkout, UPI, EMI, cart recovery. 40% less drop-off, 20–30% higher AOV.", tags: ["Razorpay", "Stripe", "PayU", "UPI Intent"] },
    ],
    uspHeadlines: {
      direct: "You talk to the developer building your store — not an account manager",
      cost: "Shopify Plus expertise with full transparency — senior engineers only, no outsourcing chains",
      ai: "AI recommendations, smart search, dynamic pricing built into your store from day one",
    },
    faq: [
      { q: "Grocery delivery app timeline?", a: "Full solution (4 apps + admin): 10–14 weeks. Core MVP: 6–8 weeks. Shipped in as little as 5 weeks." },
      { q: "Shopify or custom?", a: "Shopify for early-stage and mid-volume stores. Custom Next.js for marketplaces, subscriptions, B2B." },
      { q: "Payment gateways?", a: "Razorpay, PayU, CCAvenue, Cashfree, Stripe, PayPal. UPI, saved cards, EMI, webhooks — all in scope." },
      { q: "Store migration?", a: "Zero-downtime from WooCommerce, Magento, PHP. Products, customers, orders, SEO URLs. 10K SKUs in 3–4 weeks." },
      { q: "Post-launch?", a: "60 days free. Then monthly retainer available: monitoring, patches, 4-hour priority support." },
      { q: "Process?", a: "Discovery (3–5 days) → Figma (1–2 weeks) → 2-week sprints with staging → Launch & handover. You own everything." },
      { q: "NDAs?", a: "Always. Before any discussion. Never reference clients without written permission." },
    ],
    ctaSection: {
      headline: "Get an E-Commerce Quote in 2 Hours",
      subtitle: "Shopify, marketplace, grocery app, or B2B — detailed scope and timeline in 2 hours. No retainer, just a clear plan.",
      buttonText: "Get My Free E-Commerce Quote",
    },
    targetKeywords: ["ecommerce app development company", "ecommerce website development company", "ecommerce web development company", "shopify app development", "ecommerce website design companies", "shopify web development company", "ecommerce development company", "grocery delivery app development company"],
  },
  {
    slug: "ai-agent-development",
    primaryKeyword: "AI Agent Development",
    adGroupMatch: "AI Agent Development",
    theme: { heroGradient: "linear-gradient(135deg, #7e22ce, #4f46e5, #7e22ce)", ctaGradient: "linear-gradient(135deg, #7e22ce, #4f46e5, #7e22ce)", urgencyColor: "#7e22ce", accent: "purple", icon: "🤖" },
    form: { title: "Get Free AI Agent Strategy Session", subtitle: "Senior AI architect scopes your first autonomous agent in 45 minutes", projectTypes: ["Custom AI Agent (Single Workflow)", "Multi-Agent System", "RAG & Knowledge Agent", "Voice AI Agent", "AI Agent + Tool Integration", "On-Prem / Private LLM Agent", "Other"], placeholder: "What operational workflow should an autonomous agent run end-to-end?", buttonText: "Book AI Agent Strategy Call", formType: "ai-agent" },
    meta: {
      title: "AI Agent Development Company | Autonomous Agents for Business | RDMI AI",
      description: "Custom AI agents that reason, plan, and execute end-to-end workflows — not just chatbots. LangGraph, CrewAI, GPT-4o, Claude. Production agents shipped in 8 weeks. Senior AI engineers only.",
    },
    hero: {
      badge: "🤖 Autonomous AI Agents — Not Just Chatbots",
      h1: "Autonomous AI Agents That Run Your Operations 24/7 — Not Just Chatbots",
      subtitle: "Multi-step reasoning, tool use, memory, and human-in-the-loop — built on GPT-4o, Claude, and open-source LLMs. Production-grade agents with evals, guardrails, and observability baked in from day one.",
      cta1: "Book AI Agent Strategy Call",
      cta2: "See Agents We've Built",
      trustPoints: [
        "30+ production agents shipped",
        "8-week average build — prototype to production",
        "92% task-success rate at launch",
        "LangGraph + CrewAI native",
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
      { step: "01", title: "Agent Scope & Tool Mapping", description: "Senior AI engineer identifies the workflow, the tools the agent needs to call (APIs, DBs, CRMs), the decision boundaries, and where humans approve. Deliverable: agent spec + eval plan." },
      { step: "02", title: "Working Agent Prototype in 2 Weeks", description: "Real agent running on your data, calling your tools, producing measurable outputs. You test it end-to-end. Validate success metrics before committing full scope." },
      { step: "03", title: "Production Build (6-8 Weeks)", description: "Guardrails, evals, observability (LangSmith / Langfuse), rate limiting, human-in-the-loop escalation, audit logs. Tested against contracted task-success benchmarks." },
      { step: "04", title: "Deploy, Measure, Improve", description: "Production launch with KPI dashboard, agent traces, and retraining pipeline. 30-day free optimization. Ongoing retainer for eval-driven improvement." },
    ],
    stats: [
      { value: "30+", label: "Production Agents Shipped" },
      { value: "92%", label: "Task Success Rate at Launch" },
      { value: "8 wks", label: "Avg Prototype → Production" },
      { value: "24/7", label: "Autonomous Operations" },
    ],
    services: [
      {
        title: "Custom AI Agent Development",
        description: "Single-purpose agents that own one workflow end-to-end: reading emails, drafting replies, updating CRMs, calling APIs, making decisions. Built with LangGraph for state machines you can actually reason about. Deterministic where it matters, flexible where it helps.",
        tags: ["LangGraph", "OpenAI Function Calling", "Claude Tool Use", "State Machines"],
      },
      {
        title: "Multi-Agent Systems",
        description: "Supervisor + specialist agent architectures for tasks too complex for one model — researcher, writer, reviewer, executor. CrewAI and AutoGen-based orchestration with shared memory, role boundaries, and human approval gates. Built for auditability.",
        tags: ["CrewAI", "AutoGen", "Supervisor Patterns", "Shared Memory"],
      },
      {
        title: "RAG & Knowledge Agents",
        description: "Agents that answer questions grounded in your private documents, wikis, tickets, and databases. Hybrid retrieval (keyword + semantic), re-ranking, citations, and hallucination guardrails. Integrates with Slack, Teams, CRM, ERP.",
        tags: ["LlamaIndex", "Pinecone", "pgvector", "Hybrid Retrieval", "Citations"],
      },
      {
        title: "Tool & API Integration Layer",
        description: "The invisible plumbing that makes agents useful: secure credential vaulting, typed tool schemas, retry logic, error recovery, rate limiting, and permission boundaries. We turn any internal API into an agent-callable tool with proper observability.",
        tags: ["MCP", "Tool Schemas", "Secret Management", "Rate Limiting"],
      },
      {
        title: "Agent Observability & Evaluation",
        description: "You can't improve what you can't measure. We instrument every agent with LangSmith or Langfuse tracing, custom eval suites, regression tests, and production dashboards. Track task success, latency, cost, and hallucination rate per deployment.",
        tags: ["LangSmith", "Langfuse", "Eval Suites", "Regression Tests"],
      },
      {
        title: "Voice Agents (Realtime)",
        description: "Phone agents using OpenAI Realtime, Deepgram, and ElevenLabs that book appointments, qualify leads, recover carts, and handle tier-1 support with sub-second latency. Integrated with your CRM and calendar. Human escalation when confidence drops.",
        tags: ["OpenAI Realtime", "Deepgram", "ElevenLabs", "Twilio", "Calendly"],
      },
    ],
    uspHeadlines: {
      direct: "Your AI architect gets on a call in 2 hours — not a consultant with a deck. We've built 30+ production agents. We know which patterns work and which are hype.",
      cost: "Agents replace repetitive knowledge work, not humans. Senior engineers only. No sub-contracting, no vendor lock-in, full source code and model weights yours.",
      ai: "We build agents with evals and observability from day one — because an agent you can't measure is an agent that silently fails. Production-grade, not demos.",
    },
    faq: [
      { q: "What's the difference between an AI agent and a chatbot?", a: "A chatbot answers questions. An agent ACTS — it reasons about a goal, picks tools, calls APIs, handles failures, and produces an outcome. Agents have memory, planning, and tool use. Chatbots don't. If you need conversations, build a chatbot. If you need work done, build an agent." },
      { q: "Which LLM do you use — and why?", a: "Model-agnostic by design. GPT-4o for tool use and reasoning, Claude 3.5 Sonnet for long-context analysis, Llama/Mistral for on-prem and cost-sensitive workloads, Gemini for multimodal. We pick per task and per budget, not per vendor." },
      { q: "How do you prevent hallucinations?", a: "Grounded retrieval (RAG with citations), typed tool outputs, output validation schemas, human-in-the-loop approval for high-stakes decisions, and eval suites that run on every prompt change. Hallucinations drop to near-zero when the agent is forced to cite sources or call a deterministic tool." },
      { q: "How do you measure agent success?", a: "Contracted task-success rate (did the agent complete the goal?), not response quality. Plus: latency p95, cost per run, tool error rate, human-override rate, and hallucination rate. Dashboards in LangSmith or Langfuse. You see every trace." },
      { q: "Can you run agents on-prem or with a private LLM?", a: "Yes. We ship agents running on Llama 3, Mistral, or your own fine-tuned model hosted in your VPC. Required for healthcare, BFSI, legal, and defence clients. Same orchestration code runs on OpenAI or on vLLM — no rewrite." },
      { q: "What's the maintenance overhead?", a: "Agents drift. Tools change. Data grows. We offer monthly retainers for eval monitoring, prompt tuning, tool additions, and regression testing. Most clients stay on retainer because agents get better the more you measure them." },
    ],
    testimonials: [
      { quote: "Their agent runs our entire lead-qualification pipeline — research, enrich, score, draft the first reply. What took a sales ops person 3 days now takes 7 minutes. Worth every rupee.", author: "V.N.", role: "VP Growth, B2B SaaS", rating: 5 },
      { quote: "We had three failed GenAI pilots before RDMI. They started with evals and observability — not a demo — and shipped a production agent in 8 weeks. The difference was process, not prompts.", author: "D.M.", role: "Head of AI, FinTech", rating: 5 },
      { quote: "Voice agent handles 62% of our inbound calls end-to-end — no human needed. Latency under a second. Clients don't know it's AI. Absolute step-change in our unit economics.", author: "P.R.", role: "Founder, Real Estate Tech", rating: 5 },
    ],
    ctaSection: {
      headline: "Stop Talking About AI Agents. Ship One.",
      subtitle: "Senior AI architect calls you in 2 hours. Working prototype in 2 weeks. Production agent in 8 weeks. Evals and observability included — not bolted on.",
      buttonText: "Book AI Agent Strategy Call",
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
      "voice ai agent development",
    ],
  },
  {
    slug: "ai-software-development-dubai",
    primaryKeyword: "AI Software Development Dubai",
    adGroupMatch: "AI Development Company Dubai",
    theme: { heroGradient: "linear-gradient(135deg, #059669, #0d9488, #047857)", ctaGradient: "linear-gradient(135deg, #059669, #0d9488, #047857)", urgencyColor: "#059669", accent: "emerald", icon: "🇦🇪" },
    form: { title: "Get Free AI Consultation (Dubai)", subtitle: "Arabic + English AI specialist — GST morning slots", projectTypes: ["Arabic AI Chatbot", "DIFC Compliance AI", "Healthcare AI (DHA)", "Logistics / Supply Chain AI", "PropTech AI", "FinTech AI (DFSA)", "Other"], placeholder: "What's your biggest operational challenge in the UAE market?", buttonText: "Book Strategy Call (GST)", formType: "ai-dubai" },
    meta: {
      title: "AI Software Development Dubai — Agents, Chatbots & RAG | RDMI AI",
      description: "52% of DIFC firms already use AI. Build AI agents, Arabic chatbots, RAG systems & workflow automation in 8-12 weeks. IST+1.5hr overlap. DIFC-compliant. Free consultation.",
    },
    hero: {
      badge: "52% of DIFC Firms Already Use AI (DFSA 2025) — Are You in the Other 48%?",
      h1: "AI Software That Puts Dubai Businesses 3 Years Ahead — Built in 10 Weeks",
      subtitle: "RDMI AI builds production-grade AI agents, Arabic+English chatbots, RAG knowledge bases, and workflow automation for UAE enterprises — NDA-protected, DIFC-compliant, delivered from India with only 1.5hr timezone gap.",
      cta1: "Get Free AI Strategy Call",
      cta2: "See UAE Case Studies",
      trustPoints: ["IST ↔ GST: Only 1.5hrs apart — real-time collaboration", "Arabic + English NLP out of the box", "DIFC / DHA / ADGM compliance by design", "Data residency in UAE cloud regions (AWS ME-South, Azure UAE North)"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
        "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Discovery Call — Same Day, Your Timezone", description: "Book a call at 9am GST — our team is already at their desks (10:30am IST). We map your AI use case, compliance requirements (DIFC/DHA), and ROI targets in 60 minutes." },
      { step: "02", title: "Architecture & NDA — 48 Hours", description: "NDA signed, senior AI architect designs your solution: LLM selection, Arabic NLP pipeline, UAE data residency, integration points. Fixed-price SOW in 48 hours." },
      { step: "03", title: "Sprint Delivery — 2-Week Cycles", description: "Live staging URL after Sprint 1. Daily async updates on WhatsApp. Weekly demos at your preferred GST morning time. Feedback actioned same working day." },
      { step: "04", title: "Launch & 90-Day Support", description: "Go-live on UAE infrastructure. Source code, documentation, runbooks handed over. 90 days post-launch support. Critical bugs fixed within 4 hours during GST hours." },
    ],
    stats: [
      { value: "52%", label: "DIFC Firms Already Using AI (DFSA 2025)" },
      { value: "1.5 Hrs", label: "IST to GST — Real-Time Collaboration" },
      { value: "100%", label: "DIFC-Compliant Architecture" },
      { value: "50+", label: "AI Products Delivered" },
    ],
    services: [
      { title: "Arabic + English AI Chatbots", description: "Conversational AI switching seamlessly between Gulf Arabic and English — trained on YOUR data, WhatsApp integrated. UAE retail, banking, govt portals. 50%+ support cost reduction from Month 1.", tags: ["Arabic NLP", "Gulf Dialect", "WhatsApp API", "RAG", "Fine-tuning"] },
      { title: "AI Agents & Autonomous Workflows", description: "Agents that run procurement approvals, compliance checks, customer onboarding end-to-end. A UAE logistics firm cut manual processing time by 74% with our autonomous ops agent.", tags: ["LangChain", "CrewAI", "AutoGen", "GPT-4o", "n8n"] },
      { title: "RAG Systems — DIFC Compliant", description: "10,000 pages of policies and contracts queryable in seconds with source citations. Deployed on UAE Azure/AWS. DIFC firms use this for regulatory Q&A and audit prep.", tags: ["Pinecone", "LlamaIndex", "Azure OpenAI", "AWS Bedrock"] },
      { title: "FinTech AI & DFSA Compliance", description: "KYC/AML screening, transaction risk scoring, regulatory reporting — built to DFSA and ADGM standards. 68% faster compliance review, 40% fewer false positives.", tags: ["KYC/AML", "DFSA", "ADGM", "Risk Scoring", "Python"] },
      { title: "Healthcare AI (DHA Compliant)", description: "Clinical decision support, Arabic patient intake chatbots, predictive diagnostics — built to Dubai Health Authority standards. HL7/FHIR integrated.", tags: ["DHA Compliant", "HL7/FHIR", "Clinical AI", "Arabic NLP"] },
      { title: "Logistics & Supply Chain AI", description: "Demand forecasting, route optimization, predictive maintenance for UAE freight and 3PL. Regional operators use our route AI to cut fuel consumption significantly.", tags: ["Forecasting", "Route Optimization", "SAP Integration", "TensorFlow"] },
    ],
    uspHeadlines: {
      direct: "Your 9am GST is our 10:30am IST — we're already at our desks when you start. No overnight delays. Real-time collaboration with senior engineers only.",
      cost: "Senior engineers only, no juniors, no sub-contracting — the same DIFC-grade AI expertise, delivered transparently from India.",
      ai: "Arabic and English AI, DIFC-compliant, deployed on UAE cloud. Your data never leaves the region. We architect AI-first — agents that act, RAG that knows, chatbots that sell.",
    },
    faq: [
      { q: "Does our data leave the UAE?", a: "No. We deploy on AWS ME-South-1 (Bahrain) or Azure UAE North (Dubai). Data never transits outside GCC. On-premise deployments available for DIFC/DHA entities." },
      { q: "Can your AI handle Arabic — including Gulf dialect?", a: "Yes, natively. MSA, Gulf Khaleeji, and Arabic-English code-switching. Fine-tuned on your domain vocabulary (finance, healthcare, real estate)." },
      { q: "What's the timezone overlap?", a: "IST is only 1.5 hours ahead of GST — the smallest gap of any major offshore hub. Your 9am is our 10:30am. Fully available during Dubai business hours." },
      { q: "DIFC and ADGM compliant?", a: "Built to DIFC, ADGM, and DFSA standards from architecture phase. Data classification, access controls, audit logging, encryption, model explainability." },
      { q: "How long to go live?", a: "AI chatbot with Arabic NLP: 6–8 weeks. Multi-agent workflow: 10–14 weeks. Full AI SaaS: 16–20 weeks. Fixed milestones, not open-ended retainers." },
      { q: "NDA and IP protection?", a: "NDA before first call. 100% IP ownership. Work-for-hire under UAE contract law or DIFC/ADGM courts. No open-source encumbrance." },
      { q: "Post-launch support?", a: "90 days free. Then monthly retainer for model retraining, new features, 4-hour SLA during GST hours." },
    ],
    ctaSection: {
      headline: "Dubai's AI Window Is Open — But Not Forever",
      subtitle: "76% of UAE enterprises are accelerating AI investment. Deploy now or play catch-up later. Free 45-minute AI strategy call — scope, timeline and deliverables mapped before the call ends.",
      buttonText: "Book Free AI Strategy Call",
    },
    targetKeywords: ["AI software development Dubai", "AI development company Dubai", "AI app development UAE", "AI chatbot development Dubai", "AI automation company Dubai", "Arabic AI chatbot development", "DIFC AI compliance software", "software development company Dubai", "machine learning development UAE", "offshore AI development UAE"],
  },
  {
    slug: "ai-software-development-usa",
    primaryKeyword: "AI Software Development for US Companies",
    adGroupMatch: "AI Development Company USA",
    theme: { heroGradient: "linear-gradient(135deg, #1d4ed8, #4f46e5, #1d4ed8)", ctaGradient: "linear-gradient(135deg, #1d4ed8, #4f46e5, #1d4ed8)", urgencyColor: "#1d4ed8", accent: "blue", icon: "🇺🇸" },
    form: { title: "Get Free AI Consultation (US)", subtitle: "US-timezone AI engineer — EST/PST overlap", projectTypes: ["AI Chatbot / Agent", "HIPAA-Compliant AI", "SaaS Copilot / AI Features", "AI Staff Augmentation", "AI MVP Development", "RAG / Knowledge Base", "Other"], placeholder: "What AI capability would transform your business this quarter?", buttonText: "Book AI Roadmap Call", formType: "ai-usa" },
    meta: {
      title: "AI Software Development for US Companies — Senior Engineers Only | RDMI AI",
      description: "Senior AI engineers. 4-8hr US timezone overlap. SOC2-ready, HIPAA-compliant. SF-quality AI agents, RAG systems & SaaS copilots. Free consultation.",
    },
    hero: {
      badge: "Trusted by US Startups & Mid-Market — NYC · SF · Seattle · Austin",
      h1: "Your US Competitors Are Already Shipping AI. Are You?",
      subtitle: "RDMI AI builds production-grade AI agents, RAG pipelines, and SaaS copilots for US companies. Same NDA. Same IP ownership. Same English-speaking senior engineers. Just faster delivery and a CFO-friendly budget.",
      cta1: "Get a Free AI Roadmap",
      cta2: "See US Client Work",
      trustPoints: ["4-8 hour overlap with EST & PST — no async black holes", "NDA on Day 1 — full IP transfer, zero lock-in", "SOC2-ready & HIPAA-compliant architecture", "200+ projects shipped — MVP to enterprise"],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Discovery Call During Your Business Hours", description: "We schedule within your EST or PST window. In 60 minutes we map your AI use case and define scope. Written proposal before your next standup." },
      { step: "02", title: "NDA Signed, Sprint Plan in 48 Hours", description: "NDA on Day 1. Within 48 hours: full sprint plan, milestones, engineer profiles, and a dedicated Slack channel. No offshore mystery — you know who's building what." },
      { step: "03", title: "4-8hr Daily Overlap — Never Out of the Loop", description: "Engineers maintain 4-8 hour overlap with US timezones. Daily Loom updates, async Notion docs, weekly video standups. Communication feels like a co-located team." },
      { step: "04", title: "Production Handoff — Full IP Transfer", description: "Source code, architecture docs, CI/CD pipelines, 30-day hypercare. 100% IP ownership. Zero lock-in. Your team can maintain or hand to any US agency." },
    ],
    stats: [
      { value: "200+", label: "Projects Shipped for Global Clients" },
      { value: "4-8hr", label: "Daily Timezone Overlap with EST & PST" },
      { value: "100%", label: "IP Ownership Transferred to Client" },
      { value: "50+", label: "AI Products in Production" },
    ],
    services: [
      { title: "AI Agents & Autonomous Workflows", description: "LangChain, CrewAI agents that act, decide, and escalate 24/7. US clients save 800-1,200 manual hours/year per deployed agent. Lead qualification, document review, support escalation.", tags: ["LangChain", "CrewAI", "AutoGen", "OpenAI", "Claude API"] },
      { title: "SaaS Copilots & Embedded AI", description: "Turn your SaaS into an AI-first platform without a rewrite. Products with AI features see 2.4x higher retention. Copilots for CRMs, project tools, analytics platforms.", tags: ["Next.js", "OpenAI API", "Streaming UI", "RAG", "React"] },
      { title: "RAG Systems & Enterprise Knowledge Bases", description: "Internal knowledge turned into a searchable AI brain. 40-60% fewer support tickets, onboarding time cut in half. Enterprise access control and audit logging.", tags: ["Pinecone", "Weaviate", "pgvector", "LlamaIndex", "AWS"] },
      { title: "AI-First MVP Development", description: "Idea to investor-ready product in 8-12 weeks. LLM integrations, real-time data pipelines, scalable cloud — from day one. We've helped founders raise pre-seed with RDMI-built MVPs.", tags: ["Next.js", "Supabase", "OpenAI", "Stripe", "Vercel"] },
      { title: "Senior AI Engineer Staff Augmentation", description: "Hire one engineer or a full pod (3-5 seniors) on monthly retainer. Join your Slack, attend your standups, work in your stack. No juniors, no bench-warming.", tags: ["Dedicated Team", "Slack Integration", "Agile", "Python", "React"] },
      { title: "HIPAA & SOC2-Compliant Healthcare AI", description: "Clinical documentation, patient triage, prior auth automation — built HIPAA-compliant from sprint one. AWS GovCloud, encrypted pipelines, BAA-ready. We'll sign your BAA.", tags: ["HIPAA", "SOC2", "AWS GovCloud", "HL7 FHIR", "Python"] },
    ],
    uspHeadlines: {
      direct: "You talk to the engineer building your product — not a PM reading notes. Our Slack response time averages 12 minutes during overlap hours.",
      cost: "Senior engineers only — 5-10 years experience, US-team communication standards. Same NDA, same IP, same stack as SF agencies — without the juniors or the agency markup.",
      ai: "We don't add AI as a feature. We architect for AI from Sprint One. Every project ships with intelligence built into the core — not bolted on later.",
    },
    faq: [
      { q: "Who owns the IP and source code?", a: "You do. 100%. From the first commit. Explicit IP assignment in every contract. Zero retained rights. Non-negotiable." },
      { q: "What timezone overlap do you offer?", a: "4-8 hour daily overlap with EST & PST. We're deep in your codebase before your morning standup. Dedicated point of contact in your timezone for async escalations." },
      { q: "How is RDMI different from cheap offshore shops?", a: "5-10 year senior engineers, not juniors. Same tools as your US team (GitHub, Linear, Notion, Loom). Code reviews, tests, documentation standard. 30-day hypercare included." },
      { q: "Do you sign NDAs?", a: "Before the first technical call. Mutual NDA standard. We'll sign your template within 24 hours." },
      { q: "HIPAA-compliant builds?", a: "Yes. AWS GovCloud, encrypted pipelines, BAA-eligible services, role-based access, audit logging. We'll sign your BAA from sprint one." },
      { q: "SOC2 readiness?", a: "We build with controls that make your SOC2 audit easier: encrypted storage, secrets management, access logging, least-privilege IAM, documented change management." },
      { q: "Data security for US clients?", a: "Dedicated environments, encrypted storage, VPN-restricted access, no production data in dev. US-only AWS regions supported. Security questionnaire completed in 48 hours." },
      { q: "Can you work with our existing US team?", a: "Most common model. We join your GitHub, attend your standups, follow your PR process. Your US lead stays in control. We augment bandwidth + bring AI specialization." },
      { q: "What does communication look like?", a: "Dedicated Slack channel, daily Loom video updates, shared Notion workspace, weekly 30-min video standup. Most US clients say we communicate better than in-house contractors." },
    ],
    ctaSection: {
      headline: "Your Competitors Are Shipping AI This Quarter. Let's Talk This Week.",
      subtitle: "Free 60-minute AI Roadmap call with a senior engineer — not a sales rep. We'll identify your top 3 AI opportunities and map a delivery plan before the call ends.",
      buttonText: "Book My Free AI Roadmap Call",
    },
    targetKeywords: ["AI software development company USA", "hire AI developers from India", "AI development agency USA", "offshore AI development company", "AI app development company US", "HIPAA compliant AI development", "AI software development outsourcing USA", "LangChain development company USA", "AI SaaS development US timezone", "custom AI development for US startups"],
  },
  {
    slug: "healthcare-ai-development",
    primaryKeyword: "Healthcare AI Solutions",
    adGroupMatch: "Healthcare AI Development",
    theme: { heroGradient: "linear-gradient(135deg, #e11d48, #db2777, #be123c)", ctaGradient: "linear-gradient(135deg, #e11d48, #db2777, #be123c)", urgencyColor: "#e11d48", accent: "rose", icon: "🏥" },
    form: { title: "Get Free Healthcare AI Assessment", subtitle: "HIPAA-certified AI engineer — BAA signed before first call", projectTypes: ["AI Patient Scheduling / No-Show Reduction", "Ambient Scribe / Clinical Documentation", "RCM & Medical Billing AI", "Clinical Chatbot / AI Receptionist", "EHR Integration & Interoperability", "HIPAA-Compliant AI Agent", "Other"], placeholder: "What's the biggest clinical workflow bottleneck in your practice?", buttonText: "Get Free HIPAA Assessment", formType: "healthcare-ai" },
    meta: { title: "Healthcare AI Development — HIPAA-Compliant AI for Hospitals & Clinics | RDMI", description: "Cut patient no-shows 40%, recover denied claims, automate clinical documentation. HIPAA & DHA-compliant AI agents for hospitals, clinics, dental practices. Free consultation." },
    hero: { badge: "HIPAA & DHA Compliant · NDA Protected · 2-Hour Response", h1: "AI That Cuts Patient No-Shows 40% and Recovers Denied Claims", subtitle: "Production-ready AI agents for hospitals, clinics, dental practices, and pharma — ambient scribes, intelligent scheduling, RCM automation, and clinical chatbots. Full compliance, source code ownership, money-back guarantee.", cta1: "Get Free Healthcare AI Consultation", cta2: "See How It Works", trustPoints: ["HIPAA & DHA compliant AI systems", "40% reduction in patient no-shows", "92%+ claim acceptance with RCM AI", "Money-back guarantee on prototype"] },
    images: { hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80", process: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80", team: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80", services: ["https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80", "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80"], portfolio: ["https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80", "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=80", "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"], cta: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80" },
    process: [
      { step: "01", title: "HIPAA & Compliance Assessment", description: "Signed NDA + deep-dive compliance audit — mapping EHR systems, data flows, regulatory obligations. Written risk + opportunity report before any code." },
      { step: "02", title: "Prototype & Clinical Validation", description: "Working prototype in 2-3 weeks — AI scheduling, ambient scribe, or RCM agent — validated with clinical staff on real workflows. Money-back applies." },
      { step: "03", title: "HIPAA-Hardened Production Build", description: "End-to-end encryption, RBAC, audit trails, PHI handling baked into architecture. EHR integration (Epic, Cerner, Practo) tested in staging." },
      { step: "04", title: "Deploy with Compliance Handover", description: "Live deployment, 30-day monitoring, full source code + HIPAA docs + BAA + staff training. You own everything." },
    ],
    stats: [{ value: "HIPAA", label: "BAA Signed Before First Call" }, { value: "40%", label: "No-Show Reduction with AI Scheduling" }, { value: "92%+", label: "Claim Acceptance with RCM AI" }, { value: "3-6 hrs", label: "Saved Per Doctor Per Day (Ambient Scribe)" }],
    services: [
      { title: "AI Patient Scheduling & No-Show Reduction", description: "40% fewer no-shows — guaranteed. AI handles booking, smart reminders (WhatsApp/SMS/voice), no-show prediction, automatic waitlist slot reallocation. Every cancelled slot offered to waitlisted patients.", tags: ["AI Scheduling", "No-Show Prediction", "WhatsApp", "Slot Optimization"] },
      { title: "Ambient Scribe for Doctors", description: "Save 3-6 hours per doctor per day. AI listens to conversations, auto-generates SOAP notes and EHR-ready documentation. HIPAA-compliant, specialty-tuned, integrated with your existing EHR.", tags: ["Ambient AI Scribe", "SOAP Notes", "EHR Integration", "Medical NLP"] },
      { title: "RCM & Medical Billing AI", description: "Recover crores in denied claims. AI automates pre-auth checks, ICD/CPT validation, claim scrubbing, denial prediction. 92%+ first-pass acceptance. Denied claims resubmitted in hours, not weeks.", tags: ["RCM Automation", "Claims AI", "Denial Management", "ICD-10 Coding"] },
      { title: "Clinical Chatbot & AI Receptionist", description: "Handle 80% of inbound queries without staff. AI manages appointments, prescription refills, symptom triage, insurance verification — 24/7, multilingual, across WhatsApp/web/phone.", tags: ["AI Receptionist", "Healthcare Chatbot", "Symptom Triage", "24/7"] },
      { title: "HIPAA-Compliant AI Agents", description: "Full-stack compliant AI with signed BAA. PHI data isolation, AES-256 encryption, audit trails, RBAC, HIPAA/DHA/ABDM-aligned. Compliance docs ready for your legal team.", tags: ["HIPAA", "PHI Security", "BAA", "DHA Compliance"] },
      { title: "EHR Integration & Interoperability", description: "Connect AI to Epic, Cerner, Meditech, Practo or custom EHR. HL7 FHIR-compliant bridges, real-time sync, bi-directional AI-to-EHR pipelines — without disrupting clinical workflows.", tags: ["EHR Integration", "HL7 FHIR", "Epic/Cerner", "Interoperability"] },
    ],
    uspHeadlines: { direct: "We build healthcare AI that clinical staff actually use — validated in real workflows, not demos.", cost: "HIPAA-grade compliance, senior engineers only, full source code ownership, no vendor lock-in.", ai: "LangChain, RAG, fine-tuned medical LLMs, and real-time voice AI — built for clinical environments." },
    faq: [
      { q: "Is it HIPAA compliant? Do you sign a BAA?", a: "Yes. BAA signed before any PHI is shared. PHI isolation, AES-256 encryption, RBAC, full audit logging standard. DHA/DOH compliance for UAE clients." },
      { q: "How fast is ROI?", a: "60-90 days. AI scheduling: 25-40% no-show reduction in month 1. RCM AI: denied claims recovered within weeks. Ambient scribe: 3-6 hours saved per doctor from day one." },
      { q: "Will it integrate with our EHR?", a: "Yes. Epic, Cerner, Meditech, Practo, custom systems — HL7 FHIR-compliant integration. Tested in your staging before any go-live." },
      { q: "How do you handle patient data security?", a: "Zero-trust architecture. AES-256 encryption, HIPAA-eligible cloud (AWS GovCloud/Azure Healthcare), each deployment isolated. Full data flow diagram provided." },
      { q: "Do you work with dental practices?", a: "Yes. AI receptionist + no-show reduction tailored for dental workflows. Pre-built dental-specific configs for faster implementation." },
      { q: "What's the money-back guarantee?", a: "Fail to deliver working prototype within milestone timeline? Full refund. Each production milestone gated — you approve before we invoice." },
      { q: "Who owns the code?", a: "You — completely. Source code, model weights, documentation, deployment scripts. No licence fee, no SaaS lock-in." },
    ],
    ctaSection: { headline: "Book Your Free Healthcare AI Consultation — NDA Signed Before We Start", subtitle: "Tell us your biggest challenge — no-shows, claim denials, documentation overload — and we'll map a compliant, ROI-backed AI solution in 48 hours. No sales pitch.", buttonText: "Book Free Consultation" },
    targetKeywords: ["ai patient scheduling", "healthcare chatbot development", "hipaa compliant ai chatbot", "ai for dental practice", "ai medical documentation", "healthcare ai solutions", "ai for patient no shows", "ai receptionist for clinics", "ai for medical billing", "ambient scribe for doctors"],
  },
  {
    slug: "insurance-ai-development",
    primaryKeyword: "AI for Insurance Agencies",
    adGroupMatch: "Insurance AI Development",
    theme: { heroGradient: "linear-gradient(135deg, #0284c7, #2563eb, #0369a1)", ctaGradient: "linear-gradient(135deg, #0284c7, #2563eb, #0369a1)", urgencyColor: "#0284c7", accent: "sky", icon: "🛡️" },
    form: { title: "Get Free Insurance AI Assessment", subtitle: "Insurance-domain AI engineer — IRDAI-aware architecture", projectTypes: ["Claims Processing Automation", "AI Underwriting Assistant", "Voice AI for Agencies", "Fraud Detection AI", "Lead Qualification AI", "Policy Comparison Bot", "Other"], placeholder: "What's your biggest claims or operations bottleneck?", buttonText: "Get Insurance AI Demo", formType: "insurance-ai" },
    meta: { title: "AI for Insurance Agencies & Carriers — Claims, Underwriting & Voice Agents | RDMI", description: "Cut claims processing from 9 days to 90 seconds. AI agents for insurance — claims automation, AI underwriting, fraud detection, voice agents. Free consultation." },
    hero: { badge: "InsurTech AI · IRDAI-Aware · Production-Ready", h1: "AI That Processes Claims in 90 Seconds — Not 9 Days", subtitle: "Insurance agencies, brokers, and carriers use RDMI's AI to automate claims intake, underwrite faster, qualify leads before your team picks up, and detect fraud before it costs you. No vendor lock-in. You own the code.", cta1: "Get Free Insurance AI Consultation", cta2: "See Insurance AI in Action", trustPoints: ["IRDAI & GDPR-aware architecture", "Integrates with Applied Epic, Hawksoft, AMS360", "68% faster claims processing", "NDA signed before we discuss your data"] },
    images: { hero: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80", process: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80", team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80", services: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80"], portfolio: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"], cta: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80" },
    process: [
      { step: "01", title: "Discovery & Compliance Mapping", description: "Map existing workflows — claims intake, underwriting, lead routing, fraud review — against IRDAI/GDPR compliance. Identify highest-ROI automation targets." },
      { step: "02", title: "Data Audit & Integration Planning", description: "Audit policy systems, AMS platforms, loss runs, data feeds. Design integration with Applied Epic, AMS360, Hawksoft, Guidewire." },
      { step: "03", title: "AI Build with Compliance Review", description: "3-5 senior engineers, 6-10 week sprints. Explainable AI for underwriting. Compliance review in QA cycle, not bolted on." },
      { step: "04", title: "Pilot, Validate & Go Live", description: "Controlled pilot on 10-20% volume, measure against baseline KPIs, validate accuracy, then cutover. 90-day post-launch support." },
    ],
    stats: [{ value: "IRDAI", label: "Compliance-Aware Architecture" }, { value: "68%", label: "Faster Claims Processing" }, { value: "40%", label: "Fewer Fraud False Positives" }, { value: "90 sec", label: "AI-Assisted Claims Intake Time" }],
    services: [
      { title: "Claims Automation — 68% Faster", description: "AI triages FNOL, extracts data from photos/PDFs/voice, routes to right adjuster, pre-fills forms, flags SLA breaches. Auto, property, health, commercial lines.", tags: ["FNOL Automation", "Document AI", "Adjuster Routing", "SLA Alerts"] },
      { title: "AI Underwriting — 55% Less Review Time", description: "AI ingests loss runs, credit signals, applicant history → generates explainable risk scores your underwriters can act on and regulators can audit.", tags: ["Risk Scoring", "Explainable AI", "Loss Run Analysis", "Audit Trail"] },
      { title: "Voice AI for Agencies — 3x More Calls Handled", description: "AI voice agents answer policy questions, take FNOL, qualify renewal intent, book callbacks — 24/7, multilingual. Integrated with your AMS.", tags: ["Voice AI", "FNOL Intake", "Renewal Outreach", "AMS Integration"] },
      { title: "Fraud Detection — 40% Fewer False Positives", description: "ML analyzes claim patterns, social signals, network relationships. Surfaces high-risk claims for investigators without blocking legitimate payouts.", tags: ["Anomaly Detection", "Network Analysis", "Real-Time Scoring"] },
      { title: "Lead Qualification AI — 3.2x More Qualified Leads", description: "AI scores inbound leads by intent, coverage fit, and LTV before your team picks up. Auto-enriches CRM records, routes hot leads instantly.", tags: ["Intent Scoring", "CRM Integration", "Auto-Enrichment", "Producer Routing"] },
      { title: "Policy Comparison Bots — 45% Less Quote Abandonment", description: "Conversational AI walks prospects through coverage, surfaces best-fit policies, explains trade-offs. Web, WhatsApp, SMS.", tags: ["Quoting Integration", "Coverage Advisor", "WhatsApp Bot", "Producer Handoff"] },
    ],
    uspHeadlines: { direct: "Senior insurance-domain engineers — not a generalist agency learning your industry on your budget.", cost: "Senior engineers only, full source code ownership, no SaaS markup, no vendor lock-in.", ai: "Explainable outputs, compliance-ready documentation, model governance baked in from day one." },
    faq: [
      { q: "How do you handle IRDAI compliance for AI underwriting?", a: "Explainability first — every risk score includes human-readable rationale log. For US carriers, aligned with NAIC model bulletin. Full audit trail on inputs, training data, decision thresholds." },
      { q: "Can you integrate with Applied Epic, AMS360, Hawksoft?", a: "Yes. Applied API, Vertafore API, Hawksoft, EZLynx. For systems without public API, we build secure middleware. 2-4 weeks integration scope." },
      { q: "What ROI from claims automation?", a: "Claims cycle time reduction 40-70%, adjuster capacity +30-50%, CSAT improvement from faster resolution. KPIs set during discovery." },
      { q: "How do you protect policyholder data?", a: "NDA first. Dev uses anonymized/synthetic data. Production access role-restricted, logged, time-limited. DPDP Act, GDPR compliant." },
      { q: "How long to go live?", a: "Single module (FNOL/lead qual): 8-12 weeks. Multi-module with AMS integration: 16-24 weeks. Working software at each sprint." },
      { q: "Do we own the AI model and code?", a: "Everything — source code, model weights, pipelines, documentation. No per-seat fee, no usage billing, no lock-in." },
      { q: "Multilingual voice AI?", a: "English, Hindi, major Indian regional languages, Arabic for UAE/GCC. Accent robustness validated during pilot on real call samples." },
    ],
    ctaSection: { headline: "Book a Free Insurance AI Consultation — Scoped in 48 Hours", subtitle: "Tell us your bottleneck — claims backlog, fraud leakage, agent capacity — and we'll map a concrete AI solution with timeline and budget. No sales pitch.", buttonText: "Book Free Consultation" },
    targetKeywords: ["ai for insurance agencies", "insurance chatbot development", "ai insurance claims processing", "insurance automation software", "ai underwriting software", "insurance agency automation", "ai voice agent for insurance", "insurance lead qualification ai", "insurtech software development", "claims processing automation"],
  },
  {
    slug: "travel-hospitality-ai",
    primaryKeyword: "AI for Hotels & Travel",
    adGroupMatch: "Travel Hospitality AI",
    theme: { heroGradient: "linear-gradient(135deg, #0891b2, #0d9488, #0e7490)", ctaGradient: "linear-gradient(135deg, #0891b2, #0d9488, #0e7490)", urgencyColor: "#0891b2", accent: "cyan", icon: "✈️" },
    form: { title: "Get Free Travel AI Consultation", subtitle: "Travel-tech specialist — PMS & OTA integrations", projectTypes: ["AI Booking Engine", "Multilingual Hotel Chatbot", "Revenue Management AI", "Tour Operator Automation", "Travel CRM with AI", "AI Guest Concierge", "Other"], placeholder: "What's your biggest booking or guest experience challenge?", buttonText: "Get Travel AI Demo", formType: "travel-ai" },
    meta: { title: "AI for Hotels & Travel Agencies | Booking Engine, Chatbot & Revenue AI | RDMI", description: "AI booking engines, multilingual hotel chatbots, dynamic revenue management. 28% more bookings. 40% higher RevPAR. Free consultation." },
    hero: { badge: "Travel & Hospitality AI · 12+ Languages · PMS Integrated", h1: "AI That Sells Trips While You Sleep — 24/7 Booking Engine", subtitle: "Multilingual AI agents that handle bookings, answer guest queries in 12+ languages, optimise room pricing in real time, and follow up with every lead — so your team focuses on experiences, not chasing enquiries.", cta1: "Get Free Travel AI Consultation", cta2: "See Live Demo", trustPoints: ["28% average revenue increase in 6 months", "24/7 automated booking across all channels", "Integrates with 30+ PMS, OTA & CRS", "Fixed-scope, milestone-based delivery"] },
    images: { hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80", process: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80", team: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80", services: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800&q=80", "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80"], portfolio: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"], cta: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1600&q=80" },
    process: [
      { step: "01", title: "Discovery & Channel Audit", description: "Map booking funnel, PMS/OTA stack, guest communication gaps. Prioritized AI opportunity report with projected ROI in 3 days." },
      { step: "02", title: "Scope & Fixed Quote", description: "Exact deliverables, integrations, milestones. Fixed-scope quote before any code. Zero scope creep." },
      { step: "03", title: "Build, Integrate & Test", description: "2-week sprints integrating with PMS, OTA feeds, WhatsApp, CRM. Live demo and sign-off every sprint." },
      { step: "04", title: "Launch, Train & Optimize", description: "Deployment, staff training, 30-day monitoring. AI retrained on your booking data monthly for better conversion." },
    ],
    stats: [{ value: "28%", label: "Revenue Increase (6 Months)" }, { value: "24/7", label: "Automated Booking — Zero Downtime" }, { value: "40%", label: "Higher RevPAR via Dynamic Pricing" }, { value: "12+", label: "Languages Supported" }],
    services: [
      { title: "AI Booking Engine — 28% More Direct Bookings", description: "Conversational booking on website, WhatsApp, Instagram DMs. Qualifies guests, checks real-time availability, applies dynamic pricing, closes bookings 24/7. 28% lift in direct bookings, reducing OTA commissions.", tags: ["LangChain", "WhatsApp API", "PMS API", "Stripe/Razorpay"] },
      { title: "Multilingual Hotel Chatbot — 12+ Languages", description: "AI concierge handles pre-arrival queries, check-in, room upgrades, restaurant bookings in 12+ languages. 60% less front-desk queries. Consistent per-guest upsell lift post-launch.", tags: ["Multilingual NLP", "WhatsApp", "Booking.com Sync"] },
      { title: "Revenue Management AI — 40% Higher RevPAR", description: "Dynamic pricing monitoring competitor rates, events, occupancy, demand signals. Auto-adjusts prices every 15 minutes across OTAs + direct channel. 40% RevPAR improvement in 90 days.", tags: ["ML Forecasting", "OTA Rate APIs", "Dashboards", "Auto-Sync"] },
      { title: "AI Guest Concierge — 3x More Upsells", description: "Post-booking AI sends personalized pre-arrival sequences — spa, transfers, activities, birthday upgrades. 3x upsell revenue, measurable review score improvement in 60 days.", tags: ["RAG", "Guest Profiles", "Email + WhatsApp", "Personalization"] },
      { title: "Tour Operator Automation — 70% Less Ops Time", description: "Auto-generates custom itineraries, sends supplier bookings, tracks confirmations, assembles travel docs. 70% less manual ops per booking. Multi-day, multi-destination, group tours.", tags: ["n8n", "CrewAI", "PDF Generation", "Supplier APIs"] },
      { title: "Travel CRM with AI Lead Scoring — 2x Faster Deals", description: "Purpose-built CRM with AI lead scoring, auto follow-ups, quote generation, pipeline forecasting. Cuts deal closure time by half.", tags: ["AI Scoring", "Email Automation", "WhatsApp Follow-Up"] },
    ],
    uspHeadlines: { direct: "Every project starts with a 45-min call with a senior developer who has shipped travel-tech — not a sales rep reading a deck.", cost: "Senior developers with hospitality domain expertise — fixed-scope engagements, no hourly surprises.", ai: "Production-grade LLMs, RAG, autonomous agents — not template chatbots or plugins dressed up as AI." },
    faq: [
      { q: "Which languages does the chatbot support?", a: "12+: English, Hindi, Arabic, French, German, Spanish, Mandarin, Japanese, Russian, Portuguese, Italian, Dutch. More added in 5-7 days. Auto-detects and switches mid-conversation." },
      { q: "Which PMS/OTA do you integrate with?", a: "Opera, Cloudbeds, Mews, Hotelogix, RMS Cloud, Booking.com, Expedia, Airbnb, Agoda, MakeMyTrip. Custom integration for others. Audit included in discovery." },
      { q: "What ROI and how fast?", a: "Hotels: 28% direct booking increase + 40% RevPAR in 6 months. Tour operators: measurable efficiency gains within 90 days via reduced ops + higher conversion." },
      { q: "Can it handle group bookings and multi-destination?", a: "Yes. Multi-day, multi-destination, up to 500 PAX. Custom proposals, supplier coordination, confirmation tracking, final docs — with human approval at key steps." },
      { q: "NDA and code ownership?", a: "Mutual NDA before discovery. 100% source code, AI models, training data ownership on final payment. No resale, no reuse." },
      { q: "How long to go live?", a: "AI booking engine or chatbot: 4-8 weeks. Full suite (booking + concierge + revenue AI): 10-16 weeks. Working software in first 14 days." },
      { q: "Post-launch support?", a: "30 days free. Then monthly retainer available: model retraining, integration updates, 4-hour priority support." },
    ],
    ctaSection: { headline: "Your Competitors Are Already Using AI to Steal Your Bookings", subtitle: "Free 45-min consultation with a senior developer. Walk away with AI roadmap, integration checklist, and projected ROI. No commitment.", buttonText: "Book Free Consultation" },
    targetKeywords: ["ai for hotels", "hotel chatbot development", "ai booking assistant", "ai for tour operators", "travel chatbot development", "ai for travel agencies", "hotel ai concierge", "ai dynamic pricing hotel", "ai revenue management hotel", "hospitality ai solutions"],
  },
  {
    slug: "enterprise-saas-development",
    primaryKeyword: "Enterprise SaaS Development",
    adGroupMatch: "Enterprise SaaS",
    theme: { heroGradient: "linear-gradient(135deg, #1e3a8a, #2563eb, #1e40af)", ctaGradient: "linear-gradient(135deg, #1e3a8a, #2563eb, #1e40af)", urgencyColor: "#1e40af", accent: "blue", icon: "🏢" },
    form: { title: "Get Free Enterprise SaaS Consultation", subtitle: "Senior architect audits your SaaS requirements in 60 minutes", projectTypes: ["Multi-Tenant SaaS Platform", "Custom ERP System", "Sales & Service CRM", "Workflow & Approvals Engine", "Reporting & BI Dashboards", "Legacy ERP Migration", "Other"], placeholder: "What enterprise problem are you trying to solve at scale?", buttonText: "Get Free Architecture Audit", formType: "enterprise-saas" },
    meta: {
      title: "Enterprise SaaS & ERP Development Company | SOC 2, SSO, Multi-Tenant | RDMI",
      description: "Enterprise SaaS, ERP, and CRM platforms built for scale and compliance. Multi-tenant, SSO/SCIM, audit logs, role-based access. 40+ enterprise builds. Senior engineers only.",
    },
    hero: {
      badge: "🏢 Enterprise-Grade From Day One — Not Retrofitted Later",
      h1: "Enterprise SaaS & ERP Platforms Built for Scale, Compliance, and 99.9% Uptime",
      subtitle: "Multi-tenant architecture, SSO/SCIM, audit logs, role-based access — baked in from sprint one. Built for mid-market and enterprise operators who can't afford downtime or compliance surprises.",
      cta1: "Get Free Architecture Audit",
      cta2: "See Enterprise Platforms Built",
      trustPoints: [
        "99.9% uptime SLA — battle-tested",
        "SOC 2 Type II-ready architecture",
        "40+ enterprise builds shipped",
        "Multi-region deployment by default",
      ],
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
      { step: "01", title: "Architecture Discovery", description: "Senior architect maps your scale requirements, compliance posture, and integration surface. Deliverable: architecture decision record and risk register before a single line of code." },
      { step: "02", title: "Multi-Tenant Foundation", description: "Tenant isolation, row-level security, SSO/SCIM, audit logging, and role model built first. The boring stuff that kills enterprise projects when retrofitted later." },
      { step: "03", title: "Sprint Delivery With Demos", description: "Two-week sprints with working software every demo. Enterprise stakeholders review in staging. Nothing ships to prod without a signed UAT." },
      { step: "04", title: "Launch, Monitor, Scale", description: "Blue-green deployment, observability stack, runbooks, and on-call handoff. 30 days of hypercare. Monthly retainer available for ongoing ops." },
    ],
    stats: [
      { value: "99.9%", label: "Uptime SLA" },
      { value: "40+", label: "Enterprise Platforms Shipped" },
      { value: "SOC 2", label: "Ready Architecture" },
      { value: "12 wks", label: "Avg MVP Timeline" },
    ],
    services: [
      { title: "Multi-Tenant SaaS Platforms", description: "Row-level tenant isolation, subscription billing, feature flags, plan tiers, usage metering. Built on PostgreSQL RLS or schema-per-tenant depending on your isolation needs. Scales from first customer to 10,000 without rewrite.", tags: ["PostgreSQL RLS", "Stripe Billing", "Feature Flags", "Usage Metering"] },
      { title: "Custom ERP Systems", description: "Inventory, orders, procurement, finance, production — unified on one system that matches your actual workflows, not a vendor's template. Module-by-module rollout with parallel-run against legacy until cutover.", tags: ["Inventory", "Procurement", "GST Invoicing", "Module Rollout"] },
      { title: "Sales & Service CRM", description: "Pipeline, contacts, tickets, automation, forecasting — built around your sales motion. Native integrations with email, phone, WhatsApp, and your existing tools. No Salesforce tax, full source code ownership.", tags: ["Pipeline", "Ticketing", "Automation", "Forecasting"] },
      { title: "Workflow & Approvals Engine", description: "Configurable approval chains, conditional routing, SLA tracking, escalation, and audit trails. Powers procurement, HR, expense, and any process that needs a signature or a reason code.", tags: ["BPMN", "Approval Chains", "SLA Tracking", "Audit Trails"] },
      { title: "Reporting & BI Dashboards", description: "Executive dashboards, operational reports, self-serve analytics — powered by your production data with proper caching and row-level security. Embedded Metabase, Superset, or custom React dashboards.", tags: ["Metabase", "Superset", "Recharts", "Row-Level Security"] },
      { title: "API & Legacy Integration", description: "REST, GraphQL, webhooks, message queues, file drops — we speak whatever your legacy systems speak. SAP, Oracle, Tally, mainframe, on-prem databases. Anti-corruption layer keeps new code clean.", tags: ["REST", "GraphQL", "Kafka", "SAP", "Tally"] },
    ],
    uspHeadlines: {
      direct: "Senior enterprise architect on the first call — not an account manager. Scope, risks, and architecture recommendations delivered before any contract.",
      cost: "Enterprise quality without enterprise overhead. Senior engineers, full source code ownership, no vendor lock-in, no per-seat markup forever.",
      ai: "AI-powered development accelerates enterprise builds 3x without compromising compliance. Human review on every PR. AI writes boilerplate; seniors own architecture.",
    },
    faq: [
      { q: "Multi-tenant or single-tenant — which do you recommend?", a: "Depends on your isolation, compliance, and scaling needs. Multi-tenant (row-level or schema-per-tenant) scales cheaper and ships faster. Single-tenant wins for regulated industries, data residency, or enterprise customers who insist. We recommend per project in discovery." },
      { q: "Do you support SSO, SAML, and SCIM?", a: "Yes — standard on every enterprise build. Okta, Azure AD, Google Workspace, OneLogin, and custom SAML IdPs. SCIM user provisioning included. We've passed enterprise security reviews at Fortune 500 procurement teams." },
      { q: "How do you handle data residency and GDPR?", a: "Multi-region deployment with per-tenant region selection. Data stays in your chosen region. GDPR, DPDP Act, and CCPA aligned by default. DPAs signed before first call. PII encryption at rest and in transit." },
      { q: "Can you migrate us off a legacy ERP?", a: "Yes. We've migrated SAP, Tally, and custom legacy ERPs. Parallel-run pattern: new system runs alongside legacy for 30-90 days with data reconciliation before cutover. Zero-downtime migration where possible." },
      { q: "On-prem, private cloud, or managed cloud?", a: "All three. AWS, GCP, Azure, and on-prem Kubernetes. Private cloud for regulated industries. Terraform-managed infra so you can take the stack anywhere. No cloud lock-in." },
      { q: "What does post-launch support look like?", a: "30 days hypercare included (sev-1 response <1 hour). Then monthly retainer available: dedicated maintenance bandwidth, quarterly security patches, new feature sprints, and priority bug fixes. Renewable annually." },
    ],
    testimonials: [
      { quote: "They shipped a multi-tenant SaaS with SSO, audit logs, and SOC 2-ready architecture in 14 weeks. Our previous vendor quoted 40 weeks for less. Enterprise customers signed without security questions.", author: "J.K.", role: "CTO, B2B SaaS (USA)", rating: 5 },
      { quote: "Migrated our 12-year-old ERP to a modern custom platform with zero downtime. Parallel-run worked perfectly. The ops team barely noticed cutover day.", author: "M.V.", role: "COO, Manufacturing", rating: 5 },
      { quote: "Their architecture discovery alone saved us from a disastrous multi-region design choice. Worth the engagement before we wrote a single line of code.", author: "R.C.", role: "VP Engineering, FinTech", rating: 5 },
    ],
    ctaSection: { headline: "Enterprise Software That Passes Security Review", subtitle: "Senior architect calls you in 2 hours. Free architecture audit. SOC 2-ready by default. Full source code ownership, no vendor lock-in.", buttonText: "Get Free Architecture Audit" },
    targetKeywords: ["enterprise software development", "enterprise saas development", "saas development company", "saas product development", "erp development company", "crm development company", "custom erp software", "enterprise software solutions", "multi tenant saas development", "enterprise application development"],
  },
  {
    slug: "hire-software-developers-india",
    primaryKeyword: "Hire Software Developers India",
    adGroupMatch: "Hire Developers India",
    theme: { heroGradient: "linear-gradient(135deg, #047857, #059669, #065f46)", ctaGradient: "linear-gradient(135deg, #047857, #059669, #065f46)", urgencyColor: "#059669", accent: "emerald", icon: "👨‍💻" },
    form: { title: "Hire Senior Developers in 7 Days", subtitle: "Top 3% vetted engineers. 3 CVs within 48 hours. NDA on day zero.", projectTypes: ["Dedicated Developer (Full-Time)", "Squad-as-a-Service (3-8 Engineers)", "Staff Augmentation", "CTO-as-a-Service", "QA & DevOps Pod", "AI/ML Specialist", "Other"], placeholder: "What role do you need, tech stack, and timezone overlap?", buttonText: "Get 3 Vetted CVs Free", formType: "hire-developers" },
    meta: {
      title: "Hire Vetted Software Developers From India | 7-Day SLA, Top 3% | RDMI",
      description: "Hire senior developers from India in 7 days. Top 3% vetted. 48-hour replacement guarantee. Your timezone overlap. NDA on day zero. No recruiters, no junior bait-and-switch.",
    },
    hero: {
      badge: "👨‍💻 Senior Engineers Only — No Recruiter Markup",
      h1: "Hire Vetted Senior Developers From India in 7 Days — No Recruiters, No Junior Bait-and-Switch",
      subtitle: "Top 3% engineers. Your timezone overlap. 48-hour replacement guarantee. NDA signed day zero. Direct Slack access to your engineers — not a project manager filtering everything.",
      cta1: "Get 3 Vetted CVs Free",
      cta2: "See How Vetting Works",
      trustPoints: [
        "7-day hire SLA — from brief to kickoff",
        "Top 3% vetted (1 in 33 applicants)",
        "48-hour replacement guarantee",
        "4-hour timezone overlap with US/EU",
      ],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Brief + Fit Call (24 Hours)", description: "You send us the role, stack, seniority, and timezone. Within 24 hours a senior engineer scopes the fit. No recruiters, no HR layer, no keyword matching." },
      { step: "02", title: "3 Shortlisted CVs (48 Hours)", description: "Three pre-vetted engineers with matching stack, recent projects, and references. Interview transcripts and take-home results included so you can skip the filtering round." },
      { step: "03", title: "Technical Interview", description: "You interview directly. No gatekeeping. We coordinate scheduling across timezones. Decide within 48 hours of the interview." },
      { step: "04", title: "Kickoff in 7 Days", description: "NDA and contract signed day zero. Engineer joins your Slack, Jira, and GitHub. Daily standups in your timezone from day one." },
    ],
    stats: [
      { value: "7 days", label: "Brief to Kickoff SLA" },
      { value: "Top 3%", label: "Vetted Engineer Pool" },
      { value: "48 hrs", label: "Replacement Guarantee" },
      { value: "200+", label: "Engineers Placed" },
    ],
    services: [
      { title: "Dedicated Developer (Full-Time)", description: "One senior engineer, full-time on your project. Joins your Slack and standups. Reports to your PM. Works in your stack, your git flow, your deployment pipeline. You own the IP and the code.", tags: ["Full-Time", "Dedicated", "Your Stack", "Your Flow"] },
      { title: "Squad-as-a-Service (3-8 Engineers)", description: "A small pod with built-in tech lead, frontend, backend, and DevOps. Self-managing team that delivers features, not tickets. Best for founders who need output, not a hiring project.", tags: ["Pod", "Tech Lead", "Full Stack", "Self-Managing"] },
      { title: "Staff Augmentation", description: "Plug engineers into your existing team to accelerate delivery. Interview, pick, onboard. They sit inside your team structure, your rituals, your decision-making. Flex up or down monthly.", tags: ["Embedded", "Flexible", "Monthly", "Your Team"] },
      { title: "CTO-as-a-Service", description: "Fractional CTO for pre-Series-A founders. Architecture decisions, hiring plan, tech strategy, vendor reviews, technical diligence. 10-20 hours/week. Covers the CTO gap until you hire full-time.", tags: ["Fractional", "Strategy", "Architecture", "Hiring"] },
      { title: "QA & DevOps Pods", description: "Specialist pods for what your core team shouldn't be spending time on: end-to-end testing, CI/CD pipelines, cloud infra, observability, incident response. Plug in, harden the stack, hand back.", tags: ["QA Automation", "CI/CD", "Cloud Infra", "Observability"] },
      { title: "AI/ML Specialist Hires", description: "Scarce talent: LLM engineers, MLOps, RAG architects, voice AI specialists, fine-tuning experts. Pre-vetted for real production experience, not YouTube tutorials. Available for full-time or project-based engagements.", tags: ["LLM", "MLOps", "RAG", "Voice AI", "Fine-Tuning"] },
    ],
    uspHeadlines: {
      direct: "You interview the engineer directly — no gatekeeping, no account manager. We stay out of the way once the match is made. Direct Slack, direct standups, direct output.",
      cost: "Senior engineers from India at a fraction of US/EU staff cost — without the recruiter markup, without the agency layer, without the junior swap after month one.",
      ai: "Our engineers use AI coding tools daily (Copilot, Cursor, Claude Code) — which means output per engineer is 2-3x higher than legacy outsourcing shops. You pay for seniors, you get senior velocity.",
    },
    faq: [
      { q: "How do you vet engineers?", a: "Multi-stage: GitHub review, technical screen, live pair-programming round, system design interview, reference check, and a final fit interview. 1 in 33 applicants passes. We maintain the standard because our reputation depends on it." },
      { q: "Who owns the IP and the code?", a: "You, 100%. IP assignment clause is in every contract. The engineer commits directly to your repos. All code, documentation, and design assets are yours from day one. No background licensing, no retained rights." },
      { q: "How fast can an engineer actually start?", a: "7 days from brief to kickoff is the SLA we commit to. 3 CVs in 48 hours, interview in the next 48, contracts signed day zero. For common stacks (React, Node, Python) we sometimes move faster." },
      { q: "What's the replacement policy?", a: "Not happy with an engineer in the first 30 days? We replace within 48 hours at no cost. Transition support included. We'd rather find the right match than lose a client over a mismatch." },
      { q: "How do communication and timezones work?", a: "4-hour timezone overlap with US East, US West, or EU — your choice. Daily standups in your timezone. Slack, Jira, GitHub, Linear — whatever your team uses. No async-only black holes." },
      { q: "Can I convert to a direct hire later?", a: "Yes. After 12 months of engagement, you can offer the engineer a direct hire with a flat one-time conversion fee. No markup games, no non-competes preventing the hire. We've done this dozens of times." },
    ],
    testimonials: [
      { quote: "We'd tried 3 outsourcing shops before RDMI and kept getting juniors. The engineer they placed with us is genuinely senior — ships features end-to-end, debates architecture, owns his code. Two years in, still going strong.", author: "L.S.", role: "Founder, YC-backed SaaS", rating: 5 },
      { quote: "Needed a senior React + Node developer with 4-hour EST overlap. First CV on day 2, interview day 3, kickoff day 6. That speed alone changed how we think about hiring.", author: "T.B.", role: "Head of Product, MarTech", rating: 5 },
      { quote: "The replacement guarantee is real. First engineer wasn't the right cultural fit — replaced within 48 hours, and the second has been with us 18 months. That's the trust they've earned.", author: "K.O.", role: "CTO, HealthTech", rating: 5 },
    ],
    ctaSection: { headline: "Stop Wasting 3 Months on Recruiters", subtitle: "Send us the role, stack, and timezone. 3 vetted CVs within 48 hours. Kickoff in 7 days. Replacement in 48 hours if we miss.", buttonText: "Get 3 Vetted CVs Free" },
    targetKeywords: ["hire software developers india", "hire dedicated developers", "hire remote developers india", "offshore software development", "offshore software development company", "outsourcing software development", "software development outsourcing", "hire react developers india", "hire node developers india", "hire full stack developers india", "staff augmentation india"],
  },
  {
    slug: "ai-chatbot-development",
    primaryKeyword: "AI Chatbot Development",
    adGroupMatch: "AI Chatbot Development",
    theme: { heroGradient: "linear-gradient(135deg, #0284c7, #0ea5e9, #0369a1)", ctaGradient: "linear-gradient(135deg, #0284c7, #0ea5e9, #0369a1)", urgencyColor: "#0284c7", accent: "sky", icon: "💬" },
    form: { title: "Launch Your AI Chatbot in 14 Days", subtitle: "Senior chatbot engineer scopes your deployment in 45 minutes", projectTypes: ["Website Chatbot (RAG)", "WhatsApp Business Bot", "Lead-Qualification Bot", "Customer Support Bot", "Voice IVR Replacement", "Multi-Channel Bot", "Other"], placeholder: "Which channel should your chatbot live on and what should it do?", buttonText: "Get Free Chatbot Demo", formType: "ai-chatbot" },
    meta: {
      title: "AI Chatbot Development Company | RAG, WhatsApp & Website Bots | RDMI AI",
      description: "AI chatbots that sell, support, and qualify — live on your site or WhatsApp in 14 days. Trained on your data, integrated with your CRM, 60% ticket deflection guaranteed.",
    },
    hero: {
      badge: "💬 14-Day Launch — Not a 6-Month POC",
      h1: "AI Chatbots That Sell, Support, and Qualify — Live on Your Site or WhatsApp in 14 Days",
      subtitle: "Trained on your docs, integrated with your CRM, escalates to humans when confidence drops. 60% ticket deflection, 24/7 coverage, 30+ languages. Not template bots — grounded RAG with citations.",
      cta1: "Get Free Chatbot Demo",
      cta2: "See Chatbots We've Built",
      trustPoints: [
        "60% ticket deflection at launch",
        "14-day production deployment",
        "WhatsApp + Web + Slack + Voice",
        "30+ languages auto-detected",
      ],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
        "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&q=80",
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Content Audit + Intent Mapping", description: "We ingest your knowledge base, tickets, FAQs, and product docs. Map the 20 intents that cover 80% of user queries. Deliverable: intent model and eval dataset before a single prompt." },
      { step: "02", title: "RAG Prototype in 3 Days", description: "Working chatbot answering real questions from your real data. You test it live. We tune retrieval, re-ranking, and prompts against your eval set until quality holds." },
      { step: "03", title: "Channel Integration", description: "Deploy to your website, WhatsApp Business, Slack, or voice. CRM/helpdesk integration (HubSpot, Zendesk, Intercom, Freshdesk). Human handoff with full conversation context." },
      { step: "04", title: "Launch + Optimize", description: "Production go-live with dashboards showing deflection rate, handoff triggers, and unanswered queries. Weekly tuning for 30 days. Retainer available for ongoing improvement." },
    ],
    stats: [
      { value: "60%", label: "Avg Ticket Deflection" },
      { value: "14 days", label: "To Production Launch" },
      { value: "30+", label: "Languages Supported" },
      { value: "24/7", label: "Coverage, Every Channel" },
    ],
    services: [
      { title: "Website Chatbot (RAG)", description: "Grounded chatbot trained on your site content, product docs, and help center. Answers with citations, routes complex queries to humans, captures leads, and integrates with your CRM. Shipped as embeddable widget or full-page interface.", tags: ["RAG", "Citations", "Lead Capture", "Widget SDK"] },
      { title: "WhatsApp Business AI Bot", description: "Conversational AI on WhatsApp Business API — the preferred channel for India, Middle East, LATAM, and SEA. Handles orders, bookings, support, payments. Integrates with your OMS/CRM. Twilio, Gupshup, or Meta direct.", tags: ["WhatsApp Business API", "Twilio", "Gupshup", "Meta Cloud"] },
      { title: "Lead-Qualification Bot", description: "Replaces your inbound form with a conversational qualifier. Asks the right questions based on user type, scores the lead, books a meeting on your calendar, and pushes the enriched record to HubSpot/Salesforce. 3x higher form completion.", tags: ["Conversational Forms", "Lead Scoring", "Calendar Booking", "CRM Push"] },
      { title: "Customer Support Bot", description: "Tier-1 support handled autonomously, tier-2 escalated with full context. Integrated with Zendesk, Intercom, Freshdesk. Sentiment detection for urgent escalations. Typically deflects 60% of tickets and reduces average handle time by 40%.", tags: ["Zendesk", "Intercom", "Freshdesk", "Sentiment Analysis"] },
      { title: "Voice IVR Replacement", description: "Replace your touch-tone IVR with a natural conversational voice agent. OpenAI Realtime or Deepgram + ElevenLabs. Sub-second latency, interruption handling, warm handoff to human agents. Callers never press 1 again.", tags: ["OpenAI Realtime", "Deepgram", "ElevenLabs", "Twilio Voice"] },
      { title: "CRM & Helpdesk Integration", description: "Deep integration with your CRM, helpdesk, OMS, or booking system — not just a webhook. Agent reads and writes to your systems. Conversations create tickets, update contacts, book calendars, and trigger workflows.", tags: ["HubSpot", "Salesforce", "Zendesk", "Calendly", "Custom APIs"] },
    ],
    uspHeadlines: {
      direct: "Senior chatbot engineer on the call in 2 hours — the person who actually tunes retrieval and prompts. Not a salesperson with a feature list.",
      cost: "Senior engineers, full source code ownership, and you keep the model weights and training data. No per-conversation markup, no vendor lock-in.",
      ai: "Grounded RAG with citations and eval suites — not template bots that hallucinate. We measure what works and tune until the numbers hit your bar.",
    },
    faq: [
      { q: "How is the chatbot trained on my data?", a: "We ingest your help center, product docs, past tickets, FAQs, and any internal wikis. Content is chunked, embedded, and stored in a vector database (Pinecone/pgvector). At query time we retrieve relevant chunks, re-rank them, and ground the LLM response in the actual source with citations. No fine-tuning needed for most use cases." },
      { q: "How does WhatsApp Business API setup work?", a: "We handle the Meta Business verification, WhatsApp Business API provisioning, template approvals, and integration with Twilio, Gupshup, or Meta Cloud API. Typical setup: 5-7 days. Comes with session management, template messaging, and broadcast capabilities." },
      { q: "How does human handoff work?", a: "The bot detects when it's out of its depth (low confidence, user frustration, sensitive topic) and escalates to a human agent with full conversation context. Works in Zendesk, Intercom, Freshdesk, or your custom agent desktop. Agents pick up mid-conversation without missing a beat." },
      { q: "Which languages are supported?", a: "30+ out of the box: English, Hindi, Arabic, Spanish, French, German, Portuguese, Mandarin, Japanese, and more. Auto-detection and mid-conversation language switching. We've shipped chatbots for India, Middle East, LATAM, and SEA audiences." },
      { q: "What about privacy and data retention?", a: "Your data is your data. We never use your conversations for model training. Configurable retention (30, 60, 90 days or forever). PII redaction before storage. GDPR, HIPAA, and DPDP Act-aligned deployments available. On-prem or private cloud for regulated clients." },
      { q: "What integrations come out of the box?", a: "HubSpot, Salesforce, Zoho, Pipedrive (CRM); Zendesk, Intercom, Freshdesk, Help Scout (helpdesk); Calendly, Cal.com (scheduling); Shopify, WooCommerce (commerce); Slack, Microsoft Teams (workplace). Custom integrations typically 3-5 days." },
    ],
    testimonials: [
      { quote: "Deflection rate hit 63% in the first month. Our support team finally has time to handle escalations properly instead of drowning in password resets. Game-changing.", author: "H.P.", role: "Head of CX, D2C Brand", rating: 5 },
      { quote: "Shipped a WhatsApp chatbot for our Middle East customers in 11 days — Arabic + English, booking handoff, full CRM integration. Conversion on WhatsApp is now 4x our website.", author: "F.A.", role: "CMO, Travel Agency (Dubai)", rating: 5 },
      { quote: "We'd built an internal chatbot that hallucinated constantly. RDMI rebuilt it with proper RAG and evals, and hallucination dropped to near zero. The difference was the eval-first approach.", author: "N.S.", role: "VP Engineering, LegalTech", rating: 5 },
    ],
    ctaSection: { headline: "Ship a Chatbot That Actually Deflects Tickets", subtitle: "Senior chatbot engineer calls in 2 hours. RAG prototype in 3 days. Production in 14 days. 60% deflection benchmark or we keep tuning free.", buttonText: "Get Free Chatbot Demo" },
    targetKeywords: ["ai chatbot development", "ai chatbot development company", "custom ai chatbot development", "chatbot development services", "whatsapp ai chatbot", "ai chatbot for business", "ai chatbot integration", "rag chatbot development", "website chatbot development", "customer support chatbot"],
  },
  {
    slug: "ai-automation-workflow",
    primaryKeyword: "AI Workflow Automation",
    adGroupMatch: "AI Workflow Automation",
    theme: { heroGradient: "linear-gradient(135deg, #b45309, #d97706, #92400e)", ctaGradient: "linear-gradient(135deg, #b45309, #d97706, #92400e)", urgencyColor: "#d97706", accent: "amber", icon: "⚙️" },
    form: { title: "Automate 40+ Hours of Manual Work Per Week", subtitle: "Automation engineer audits your workflows and finds the top 3 opportunities", projectTypes: ["Document & Invoice OCR", "Email & Inbox Triage", "Sales Pipeline Automation", "Finance & Reconciliation", "HR Onboarding Workflows", "Custom AI Pipeline", "Other"], placeholder: "Which repetitive workflow wastes the most time in your business?", buttonText: "Get Free Workflow Audit", formType: "ai-automation" },
    meta: {
      title: "AI Workflow Automation Services | Replace 40+ Hrs of Manual Work | RDMI AI",
      description: "AI-powered workflow automation for operations, finance, HR, and sales. Document OCR, email triage, approvals, reporting — automated end-to-end with AI in the loop. 6-week ROI.",
    },
    hero: {
      badge: "⚙️ 40+ Hours Saved Per Week — Per Workflow",
      h1: "AI-Powered Workflow Automation That Replaces 40 Hours of Manual Work Per Week",
      subtitle: "Document processing, data entry, approvals, and reporting — automated end-to-end with AI in the loop. n8n, Zapier, and custom orchestration. Human approval gates where they matter. 6-week ROI on most deployments.",
      cta1: "Get Free Workflow Audit",
      cta2: "See Workflows We've Built",
      trustPoints: [
        "40+ hours/week saved per workflow",
        "90% faster processing end-to-end",
        "100+ workflows shipped to production",
        "6-week avg ROI payback period",
      ],
    },
    images: {
      hero: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80",
      process: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
      team: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
      services: [
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      ],
      portfolio: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
        "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?w=800&q=80",
      ],
      cta: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    },
    process: [
      { step: "01", title: "Workflow Audit", description: "Senior automation engineer maps your repetitive processes, identifies the top 3 ROI opportunities, and delivers a prioritized automation roadmap. Deliverable: workflow map + ROI model before any build." },
      { step: "02", title: "Prototype in 1 Week", description: "Working automation running on your real data in a sandbox. You validate outputs before we touch production. Human approval gates installed at every high-stakes step." },
      { step: "03", title: "Production Rollout", description: "Deploy the automation with monitoring, error recovery, audit logs, and escalation rules. Integrated with your existing systems — CRM, ERP, email, file drops. Parallel-run against manual process to validate." },
      { step: "04", title: "Measure + Optimize", description: "KPI dashboard showing hours saved, error rate, and human-override rate. Weekly tuning for the first month. Retainer available for ongoing workflow additions and improvements." },
    ],
    stats: [
      { value: "40+", label: "Hours/Week Saved Per Workflow" },
      { value: "90%", label: "Faster End-to-End Processing" },
      { value: "100+", label: "Workflows Shipped" },
      { value: "6 wks", label: "Avg ROI Payback" },
    ],
    services: [
      { title: "Document & Invoice OCR Automation", description: "Ingest invoices, POs, contracts, KYC documents, medical records — extract structured data with LLM-powered OCR that handles messy scans, multi-page forms, and handwritten notes. Push clean data to your ERP or accounting system.", tags: ["LLM OCR", "Textract", "DocumentAI", "ERP Integration"] },
      { title: "Email & Inbox Triage", description: "AI classifier that reads inbound emails, categorizes by intent, drafts responses, routes to the right team, and flags urgent items. Handles support@, sales@, and internal operations inboxes. Works with Gmail, Outlook, and custom mail servers.", tags: ["Gmail API", "Outlook Graph", "Intent Classification", "Auto-Draft"] },
      { title: "Sales Pipeline Automation", description: "Enrich leads, score them, draft personalized outreach, follow up on non-responses, log everything to the CRM. Replaces the SDR grunt work so your sales team only talks to qualified, warm leads.", tags: ["Clearbit", "Apollo", "HubSpot", "Lead Scoring"] },
      { title: "Finance & Reconciliation Bots", description: "Match payments to invoices, reconcile bank statements, flag exceptions, auto-generate journal entries. Works with Tally, QuickBooks, Xero, SAP. Reduces month-end close from 10 days to 3.", tags: ["Tally", "QuickBooks", "Xero", "Reconciliation"] },
      { title: "HR Onboarding Workflows", description: "From offer-letter to first-day ready: background check trigger, contract generation, tool provisioning (Slack/GitHub/Jira), welcome email series, first-week scheduling. Reduces HR manual effort by 70%.", tags: ["Contract Gen", "Provisioning", "Email Automation", "Calendar"] },
      { title: "Custom AI Pipelines", description: "Complex multi-step workflows that can't be done in Zapier: AI classification → enrichment → human review → downstream action → notification. Built with n8n, Temporal, or custom orchestration for reliability at scale.", tags: ["n8n", "Temporal", "Custom Orchestration", "Reliability"] },
    ],
    uspHeadlines: {
      direct: "Senior automation engineer audits your workflows in the first call — not a salesperson with a deck. You walk away with a prioritized automation roadmap whether you hire us or not.",
      cost: "Full source code and workflow definitions are yours. Runs on your infrastructure if you want. No per-execution markup, no vendor lock-in to n8n/Zapier/Make.",
      ai: "We use AI where it adds value (classification, extraction, drafting) and deterministic code where it matters (reconciliation, routing, approvals). Not everything needs an LLM — we pick per step.",
    },
    faq: [
      { q: "Why build custom when I can use Zapier or Make?", a: "Zapier and Make are perfect for simple linear workflows. Custom wins when you need: AI decisions in the middle, human approval gates, complex error handling, high-volume processing, regulatory auditability, or integration with systems those platforms don't support. We use Zapier/Make where it fits and build custom where it doesn't." },
      { q: "Which systems do you integrate with?", a: "Anything with an API or a file drop. Common: Gmail, Outlook, Slack, Teams, HubSpot, Salesforce, Zoho, Pipedrive, Zendesk, Intercom, Tally, QuickBooks, Xero, SAP, Oracle, Jira, Asana, Notion, Airtable, Google Sheets, Shopify, WooCommerce, Stripe, Razorpay. Legacy systems via SFTP, file parsing, or RPA." },
      { q: "How do you handle data security?", a: "Workflows run in your cloud (AWS, GCP, Azure) or on-prem if needed. No data leaves your environment. PII redaction before LLM calls. Audit logs for every action. GDPR, HIPAA, DPDP Act-aligned. NDAs signed before first call." },
      { q: "What's the maintenance overhead?", a: "Workflows drift as your tools and processes change. We offer monthly retainers for monitoring, tool updates, new workflow additions, and regression testing. Most clients add 2-3 new workflows per quarter once they see the ROI." },
      { q: "How fast until ROI?", a: "Most deployments pay back in 6-8 weeks. A workflow saving 40 hours/week of manual effort typically recovers its build cost inside 2 months. We model ROI before we write code so you know the number going in." },
      { q: "Can humans still approve critical steps?", a: "Yes — and they should. We install human approval gates at any step with financial, legal, or customer-facing impact. The AI drafts, the human approves with one click. Best-of-both: AI speed plus human judgment where it matters." },
    ],
    testimonials: [
      { quote: "Our finance team spent 10 days on month-end close. RDMI built a reconciliation pipeline that does it in 2. Saved 8 days per month and reduced errors to near-zero.", author: "A.M.", role: "CFO, Mid-Market SaaS", rating: 5 },
      { quote: "The invoice OCR workflow processes 1,200 invoices/day with 98% accuracy. Our AP team went from 4 FTEs to 1 — and the 3 others moved to higher-value work.", author: "P.G.", role: "Head of Operations, Logistics", rating: 5 },
      { quote: "They audited our workflows and found 7 automation opportunities I hadn't even considered. We shipped the top 3 in 8 weeks and saved 140+ hours/week across ops and finance.", author: "S.J.", role: "COO, InsurTech", rating: 5 },
    ],
    ctaSection: { headline: "Stop Paying Humans to Do Robot Work", subtitle: "Senior automation engineer audits your workflows and finds the top 3 ROI opportunities. Free roadmap in 60 minutes. Prototype in 1 week.", buttonText: "Get Free Workflow Audit" },
    targetKeywords: ["ai automation services", "workflow automation services", "business process automation", "ai workflow automation", "ai process automation", "intelligent process automation", "workflow automation india", "robotic process automation", "document automation ai", "invoice automation ai", "finance automation ai"],
  },
];

export function getKeywordGroup(slug: string): KeywordGroup | undefined {
  return keywordGroups.find((g) => g.slug === slug);
}

export function getAllSlugs(): string[] {
  return keywordGroups.map((g) => g.slug);
}
