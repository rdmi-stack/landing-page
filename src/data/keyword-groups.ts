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
      cost: "A US agency charges $80K-$150K for what we deliver with AI-powered development. Our AI tools write 40% of code = your budget goes to features, not boilerplate. Fixed price. Money-back guarantee.",
      ai: "Every RDMI app ships with AI built into the architecture — chatbots, recommendations, voice, analytics. Your competitors' apps are static menus. Yours will learn, predict, and convert.",
    },
    faq: [
      { q: "What AI features come built into the app?", a: "Every app includes: AI chatbot for in-app support (handles 80% of queries 24/7), smart recommendations engine (35% AOV increase for e-commerce), personalized push notifications (4x retention), and analytics dashboard. Additional AI: voice commands, image recognition, predictive UX." },
      { q: "How long to build an AI-powered mobile app?", a: "Prototype in 72 hours. MVP with core AI features in 6-10 weeks. Full app with advanced AI in 12-20 weeks. AI writes 40% of code so we deliver 3x faster than traditional agencies. You see a working build on your phone every 2 weeks." },
      { q: "Flutter, React Native, or Native — which is best for AI apps?", a: "Flutter for 70% of AI-integrated apps (best performance, single codebase, TensorFlow Lite support). React Native for teams with existing JS/React codebase. Native Swift/Kotlin when you need heavy on-device ML, AR, or hardware-specific AI. We recommend based on YOUR use case in the first call." },
      { q: "Will the AI features actually generate ROI?", a: "Yes — measurable ROI from month 1. AI chatbot: reduces support cost by 80%. Recommendations: increases AOV 35%. Personalized push: 4x retention. Voice search: 2-3x session length. We set KPIs before building and track post-launch." },
      { q: "Do you handle App Store & Play Store submission?", a: "End-to-end: provisioning, screenshots, ASO-optimized metadata, compliance review. 98% first-submission approval rate. Any rejection resolved within 48 hours free. Ongoing ASO optimization available." },
      { q: "100% code ownership?", a: "Every line. Source code, AI model weights, design files, documentation — all yours on Day 1. NDA signed before first call. No licensing fees, no vendor lock-in. You can take the code to any team." },
      { q: "What about post-launch AI optimization?", a: "30 days free post-launch: AI model retraining on real user data, recommendation engine tuning, chatbot response improvement. Then optional retainer for ongoing AI optimization, new features, and OS updates." },
      { q: "AI in mobile apps?", a: "TensorFlow Lite, Core ML, OpenAI, LangChain. 2–3x session length, 35% fewer tickets, 20% conversion lift." },
    ],
    ctaSection: {
      headline: "Get a Fixed-Price Mobile App Quote in 2 Hours",
      subtitle: "Senior developers review your idea — scope, timeline, cost. No obligation, NDA on request.",
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
      title: "AI-Powered Web Development Company India | Custom Websites from ₹50K | RDMI",
      description: "India's AI-powered web development company. Custom websites, web apps, SaaS & e-commerce — built with AI for 3x faster delivery. ₹50K–₹5L. 50K+ monthly searches. Free prototype in 48 hours.",
    },
    hero: {
      badge: "AI-Powered Web Development — Not Traditional Coding",
      h1: "Custom Websites That Load in 1.2s, Rank on Page 1 & Convert 4x More",
      subtitle: "Your website isn't a brochure — it's a revenue engine. We build AI-powered custom websites with built-in SEO, lead capture, chatbots, and analytics. React, Next.js, Tailwind — delivered 3x faster than traditional agencies because AI writes 40% of the code. From ₹50,000.",
      cta1: "Get Free Website Prototype in 48 Hours",
      cta2: "See Websites We've Built",
      trustPoints: ["AI-powered = 3x faster delivery", "₹50K–₹5L fixed-price (no hourly)", "Built-in SEO + AI chatbot included", "Money-back if we miss your deadline"],
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
      { step: "02", title: "AI-Designed Prototype in 48 Hours", description: "Clickable Figma prototype with your branding, content structure, and user flows. See your website before paying a single rupee. Don't love it? Walk away." },
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
      cost: "₹50K gets you a custom website that looks like ₹5L. AI writes 40% of the code, so your budget goes to design and features — not manual labor. Fixed price. No hourly billing.",
      ai: "Every website we build ships with AI built-in: chatbot for lead capture, smart search, auto-generated meta tags, performance monitoring. Your competitors are still building static sites.",
    },
    faq: [
      { q: "How much does a custom website cost?", a: "Every project is different — we provide a fixed-price quote within 2 hours of your discovery call. The quote IS the final bill. No hourly billing, no hidden costs, no scope creep charges. Talk to a developer, not a salesperson." },
      { q: "How fast can you build my website?", a: "Business website: 2-3 weeks. Web app: 4-8 weeks. E-commerce: 3-4 weeks. Landing page: 1-2 weeks. AI-powered development is 3x faster than traditional agencies. You get a staging URL in week 1." },
      { q: "What makes your websites 'AI-powered'?", a: "Three things: (1) AI writes 40% of the code so we deliver 3x faster. (2) Every site ships with a built-in AI chatbot for lead capture. (3) AI-powered SEO — auto meta tags, structured data, sitemap generation. Your website is intelligent from day one." },
      { q: "Do I get an AI chatbot with my website?", a: "Yes — included in every plan above ₹75K. The chatbot handles visitor queries 24/7, captures leads, books appointments, and integrates with WhatsApp. It's trained on YOUR business data, not generic FAQ." },
      { q: "Will my website rank on Google?", a: "We build for SEO from the ground up: server-side rendering (Next.js), Core Web Vitals 90+, schema markup, sitemap, meta tags, alt text. We also offer ongoing SEO services if you want to rank for specific keywords." },
      { q: "Can I see a prototype before paying?", a: "Yes — free clickable prototype in 48 hours. See your website's design, layout, and user flow before committing. Don't love it? Walk away. ₹0 cost." },
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
    primaryKeyword: "AI Automation & Business Process Automation",
    adGroupMatch: "AI Automation Services",
    theme: { heroGradient: "linear-gradient(135deg, #7e22ce, #4f46e5, #7e22ce)", ctaGradient: "linear-gradient(135deg, #7e22ce, #4f46e5, #7e22ce)", urgencyColor: "#7e22ce", accent: "purple", icon: "⚡" },
    form: { title: "Get Free AI Strategy Session", subtitle: "AI architect maps your highest-ROI automation opportunity", projectTypes: ["AI Customer Service Agent", "Workflow Automation (n8n/Make)", "RAG Knowledge Base", "AI Copilot for SaaS", "GenAI Consulting & Strategy", "AI Voice Agent", "Other"], placeholder: "What repetitive process wastes the most time in your business?", buttonText: "Book AI Strategy Session", formType: "ai-agent" },
    meta: {
      title: "AI Automation Services | AI Agents, Chatbots & Workflow Automation | RDMI AI",
      description: "AI automation that replaces manual work 24/7. AI agents, chatbots, business process automation, workflow automation. 80% ticket deflection. Talk to an AI engineer, not a salesperson.",
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
      "ai automation services",
      "business process automation",
      "workflow automation",
      "ai chatbot development",
      "ai tools for business",
      "ai solutions for business",
      "ai agent development company",
      "ai consulting services",
      "robotic process automation",
      "marketing automation",
      "intelligent automation",
      "ai chatbot for customer service",
      "custom ai solutions",
      "ai integration services",
      "ai workflow automation",
      "ai development company",
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
      subtitle: "RDMI AI builds production-grade AI agents, Arabic+English chatbots, RAG knowledge bases, and workflow automation for UAE enterprises — NDA-protected, DIFC-compliant, delivered from India with only 1.5hr timezone gap. From AED 35,000.",
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
      { value: "60%", label: "Cost Saved vs Dubai-Based AI Agencies" },
      { value: "1.5 Hrs", label: "IST to GST — Real-Time Collaboration" },
      { value: "AED 35K", label: "Starting Budget for Production AI" },
    ],
    services: [
      { title: "Arabic + English AI Chatbots", description: "Conversational AI switching seamlessly between Gulf Arabic and English — trained on YOUR data, WhatsApp integrated. UAE retail, banking, govt portals. 50%+ support cost reduction from Month 1.", tags: ["Arabic NLP", "Gulf Dialect", "WhatsApp API", "RAG", "Fine-tuning"] },
      { title: "AI Agents & Autonomous Workflows", description: "Agents that run procurement approvals, compliance checks, customer onboarding end-to-end. A UAE logistics firm cut manual processing time by 74% with our autonomous ops agent.", tags: ["LangChain", "CrewAI", "AutoGen", "GPT-4o", "n8n"] },
      { title: "RAG Systems — DIFC Compliant", description: "10,000 pages of policies and contracts queryable in seconds with source citations. Deployed on UAE Azure/AWS. DIFC firms use this for regulatory Q&A and audit prep.", tags: ["Pinecone", "LlamaIndex", "Azure OpenAI", "AWS Bedrock"] },
      { title: "FinTech AI & DFSA Compliance", description: "KYC/AML screening, transaction risk scoring, regulatory reporting — built to DFSA and ADGM standards. 68% faster compliance review, 40% fewer false positives.", tags: ["KYC/AML", "DFSA", "ADGM", "Risk Scoring", "Python"] },
      { title: "Healthcare AI (DHA Compliant)", description: "Clinical decision support, Arabic patient intake chatbots, predictive diagnostics — built to Dubai Health Authority standards. HL7/FHIR integrated.", tags: ["DHA Compliant", "HL7/FHIR", "Clinical AI", "Arabic NLP"] },
      { title: "Logistics & Supply Chain AI", description: "Demand forecasting, route optimization, predictive maintenance for UAE freight and 3PL. A regional operator saved AED 2.4M/year in fuel costs with our route AI.", tags: ["Forecasting", "Route Optimization", "SAP Integration", "TensorFlow"] },
    ],
    uspHeadlines: {
      direct: "Your 9am GST is our 10:30am IST — we're already at our desks when you start. No overnight delays. Real-time collaboration at 60% the cost of a Dubai AI agency.",
      cost: "Dubai agencies quote AED 200K–500K for what we deliver at AED 35K–175K — same quality, senior engineers only. The savings fund your next product.",
      ai: "Arabic and English AI, DIFC-compliant, deployed on UAE cloud. Your data never leaves the region. We architect AI-first — agents that act, RAG that knows, chatbots that sell.",
    },
    faq: [
      { q: "Does our data leave the UAE?", a: "No. We deploy on AWS ME-South-1 (Bahrain) or Azure UAE North (Dubai). Data never transits outside GCC. On-premise deployments available for DIFC/DHA entities." },
      { q: "Can your AI handle Arabic — including Gulf dialect?", a: "Yes, natively. MSA, Gulf Khaleeji, and Arabic-English code-switching. Fine-tuned on your domain vocabulary (finance, healthcare, real estate)." },
      { q: "What's the timezone overlap?", a: "IST is only 1.5 hours ahead of GST — the smallest gap of any major offshore hub. Your 9am is our 10:30am. Fully available during Dubai business hours." },
      { q: "Pricing in AED and USD?", a: "AED 35,000 / $10K for scoped AI modules. Full platforms: AED 175K–350K / $50K–$100K. Dubai agencies charge 2–3x for equivalent scope." },
      { q: "DIFC and ADGM compliant?", a: "Built to DIFC, ADGM, and DFSA standards from architecture phase. Data classification, access controls, audit logging, encryption, model explainability." },
      { q: "How long to go live?", a: "AI chatbot with Arabic NLP: 6–8 weeks. Multi-agent workflow: 10–14 weeks. Full AI SaaS: 16–20 weeks. Fixed milestones, not open-ended retainers." },
      { q: "NDA and IP protection?", a: "NDA before first call. 100% IP ownership. Work-for-hire under UAE contract law or DIFC/ADGM courts. No open-source encumbrance." },
      { q: "Post-launch support?", a: "90 days free. Then retainer from AED 5,000/month for model retraining, new features, 4-hour SLA during GST hours." },
    ],
    ctaSection: {
      headline: "Dubai's AI Window Is Open — But Not Forever",
      subtitle: "76% of UAE enterprises are accelerating AI investment. Deploy now or spend 3x to catch up later. Free 45-minute AI strategy call — fixed-price estimate in AED and USD before the call ends.",
      buttonText: "Book Free AI Strategy Call",
    },
    targetKeywords: ["AI software development Dubai", "AI development company Dubai", "AI app development UAE", "AI chatbot development Dubai", "AI automation company Dubai", "Arabic AI chatbot development", "DIFC AI compliance software", "software development company Dubai", "machine learning development UAE", "offshore AI development UAE"],
  },
  {
    slug: "ai-software-development-usa",
    primaryKeyword: "AI Software Development for US Companies",
    adGroupMatch: "AI Development Company USA",
    theme: { heroGradient: "linear-gradient(135deg, #1d4ed8, #4f46e5, #1d4ed8)", ctaGradient: "linear-gradient(135deg, #1d4ed8, #4f46e5, #1d4ed8)", urgencyColor: "#1d4ed8", accent: "blue", icon: "🇺🇸" },
    form: { title: "Get Free AI Consultation (US)", subtitle: "US-timezone AI engineer — EST/PST overlap", projectTypes: ["AI Chatbot / Agent", "HIPAA-Compliant AI", "SaaS Copilot / AI Features", "AI Staff Augmentation", "AI MVP Development", "RAG / Knowledge Base", "Other"], placeholder: "What would you build if AI development cost 60% less?", buttonText: "Book AI Roadmap Call", formType: "ai-usa" },
    meta: {
      title: "AI Software Development for US Companies — 60% Less Than Silicon Valley | RDMI AI",
      description: "Senior AI engineers. 4-8hr US timezone overlap. SOC2-ready, HIPAA-compliant. SF-quality AI agents, RAG systems & SaaS copilots at $15K–$20K vs $50K locally. Free consultation.",
    },
    hero: {
      badge: "Trusted by US Startups & Mid-Market — NYC · SF · Seattle · Austin",
      h1: "Your US Competitors Are Already Shipping AI. Are You?",
      subtitle: "RDMI AI builds production-grade AI agents, RAG pipelines, and SaaS copilots for US companies — at 60% less than a San Francisco agency. Same NDA. Same IP ownership. Same English-speaking senior engineers. Just faster delivery and a budget that doesn't terrify your CFO.",
      cta1: "Get a Free AI Roadmap",
      cta2: "See US Client Work",
      trustPoints: ["4-8 hour overlap with EST & PST — no async black holes", "NDA on Day 1 — full IP transfer, zero lock-in", "SOC2-ready & HIPAA-compliant architecture", "200+ projects shipped — $5K MVP to $150K enterprise"],
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
      { step: "01", title: "Discovery Call During Your Business Hours", description: "We schedule within your EST or PST window. In 60 minutes we map your AI use case, define scope, and give you a fixed-price estimate. Written proposal before your next standup." },
      { step: "02", title: "NDA Signed, Sprint Plan in 48 Hours", description: "NDA on Day 1. Within 48 hours: full sprint plan, milestones, engineer profiles, and a dedicated Slack channel. No offshore mystery — you know who's building what." },
      { step: "03", title: "4-8hr Daily Overlap — Never Out of the Loop", description: "Engineers maintain 4-8 hour overlap with US timezones. Daily Loom updates, async Notion docs, weekly video standups. Communication feels like a co-located team." },
      { step: "04", title: "Production Handoff — Full IP Transfer", description: "Source code, architecture docs, CI/CD pipelines, 30-day hypercare. 100% IP ownership. Zero lock-in. Your team can maintain or hand to any US agency." },
    ],
    stats: [
      { value: "60%", label: "Cost Savings vs US-Based AI Agencies" },
      { value: "4-8hr", label: "Daily Timezone Overlap with EST & PST" },
      { value: "$15K", label: "Avg Project vs $50K+ From SF Agency" },
      { value: "200+", label: "Projects Shipped for Global Clients" },
    ],
    services: [
      { title: "AI Agents & Autonomous Workflows", description: "LangChain, CrewAI agents that act, decide, and escalate 24/7. US clients save 800-1,200 manual hours/year per deployed agent. Lead qualification, document review, support escalation.", tags: ["LangChain", "CrewAI", "AutoGen", "OpenAI", "Claude API"] },
      { title: "SaaS Copilots & Embedded AI", description: "Turn your SaaS into an AI-first platform without a rewrite. Products with AI features see 2.4x higher retention. Copilots for CRMs, project tools, analytics platforms.", tags: ["Next.js", "OpenAI API", "Streaming UI", "RAG", "React"] },
      { title: "RAG Systems & Enterprise Knowledge Bases", description: "Internal knowledge turned into a searchable AI brain. 40-60% fewer support tickets, onboarding time cut in half. Enterprise access control and audit logging.", tags: ["Pinecone", "Weaviate", "pgvector", "LlamaIndex", "AWS"] },
      { title: "AI-First MVP Development", description: "Idea to investor-ready product in 8-12 weeks. $15K-$50K. LLM integrations, real-time data pipelines, scalable cloud — from day one. We've helped founders raise pre-seed with RDMI-built MVPs.", tags: ["Next.js", "Supabase", "OpenAI", "Stripe", "Vercel"] },
      { title: "Senior AI Engineer Staff Augmentation", description: "Hire one engineer or a full pod (3-5 seniors) on monthly retainer. $4K-$8K/month per engineer vs $180K-$220K/year SF salary. Join your Slack, attend your standups, work in your stack.", tags: ["Dedicated Team", "Slack Integration", "Agile", "Python", "React"] },
      { title: "HIPAA & SOC2-Compliant Healthcare AI", description: "Clinical documentation, patient triage, prior auth automation — built HIPAA-compliant from sprint one. AWS GovCloud, encrypted pipelines, BAA-ready. We'll sign your BAA.", tags: ["HIPAA", "SOC2", "AWS GovCloud", "HL7 FHIR", "Python"] },
    ],
    uspHeadlines: {
      direct: "You talk to the engineer building your product — not a PM reading notes. Our Slack response time averages 12 minutes during overlap hours.",
      cost: "San Francisco quoted you $50K. We'll build the same thing for $15K-$20K. Same NDA. Same IP. Same stack. 60% less. Here's the breakdown.",
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
      { q: "Typical budget range?", a: "$5K-$15K for AI feature integrations. $15K-$50K for full MVPs. $50K-$150K+ for enterprise AI. Fixed-scope quotes upfront. SF costs 3-4x more for same output." },
      { q: "Can you work with our existing US team?", a: "Most common model. We join your GitHub, attend your standups, follow your PR process. Your US lead stays in control. We augment bandwidth + bring AI specialization." },
      { q: "What does communication look like?", a: "Dedicated Slack channel, daily Loom video updates, shared Notion workspace, weekly 30-min video standup. Most US clients say we communicate better than in-house contractors." },
    ],
    ctaSection: {
      headline: "Your Competitors Are Shipping AI This Quarter. Let's Talk This Week.",
      subtitle: "Free 60-minute AI Roadmap call with a senior engineer — not a sales rep. We'll identify your top 3 AI opportunities and give you a cost estimate before the call ends.",
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
    meta: { title: "Healthcare AI Development — HIPAA-Compliant AI for Hospitals & Clinics | RDMI", description: "Cut patient no-shows 40%, recover crores in denied claims, automate clinical documentation. HIPAA & DHA-compliant AI agents for hospitals, clinics, dental practices. Free consultation." },
    hero: { badge: "HIPAA & DHA Compliant · NDA Protected · 2-Hour Response", h1: "AI That Cuts Patient No-Shows 40% and Recovers ₹Crores in Denied Claims", subtitle: "Production-ready AI agents for hospitals, clinics, dental practices, and pharma — ambient scribes, intelligent scheduling, RCM automation, and clinical chatbots. Full compliance, source code ownership, money-back guarantee.", cta1: "Get Free Healthcare AI Consultation", cta2: "See How It Works", trustPoints: ["HIPAA & DHA compliant AI systems", "40% reduction in patient no-shows", "92%+ claim acceptance with RCM AI", "Money-back guarantee on prototype"] },
    images: { hero: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80", process: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80", team: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=80", services: ["https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80", "https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=800&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80"], portfolio: ["https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80", "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&q=80", "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"], cta: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80" },
    process: [
      { step: "01", title: "HIPAA & Compliance Assessment", description: "Signed NDA + deep-dive compliance audit — mapping EHR systems, data flows, regulatory obligations. Written risk + opportunity report before any code." },
      { step: "02", title: "Prototype & Clinical Validation", description: "Working prototype in 2-3 weeks — AI scheduling, ambient scribe, or RCM agent — validated with clinical staff on real workflows. Money-back applies." },
      { step: "03", title: "HIPAA-Hardened Production Build", description: "End-to-end encryption, RBAC, audit trails, PHI handling baked into architecture. EHR integration (Epic, Cerner, Practo) tested in staging." },
      { step: "04", title: "Deploy with Compliance Handover", description: "Live deployment, 30-day monitoring, full source code + HIPAA docs + BAA + staff training. You own everything." },
    ],
    stats: [{ value: "$1.5B+", label: "Healthcare AI Spend 2025 (Menlo)" }, { value: "40%", label: "No-Show Reduction with AI Scheduling" }, { value: "92%+", label: "Claim Acceptance with RCM AI" }, { value: "3-6 hrs", label: "Saved Per Doctor Per Day (Ambient Scribe)" }],
    services: [
      { title: "AI Patient Scheduling & No-Show Reduction", description: "40% fewer no-shows — guaranteed. AI handles booking, smart reminders (WhatsApp/SMS/voice), no-show prediction, automatic waitlist slot reallocation. Every cancelled slot offered to waitlisted patients.", tags: ["AI Scheduling", "No-Show Prediction", "WhatsApp", "Slot Optimization"] },
      { title: "Ambient Scribe for Doctors", description: "Save 3-6 hours per doctor per day. AI listens to conversations, auto-generates SOAP notes and EHR-ready documentation. HIPAA-compliant, specialty-tuned, integrated with your existing EHR.", tags: ["Ambient AI Scribe", "SOAP Notes", "EHR Integration", "Medical NLP"] },
      { title: "RCM & Medical Billing AI", description: "Recover crores in denied claims. AI automates pre-auth checks, ICD/CPT validation, claim scrubbing, denial prediction. 92%+ first-pass acceptance. Denied claims resubmitted in hours, not weeks.", tags: ["RCM Automation", "Claims AI", "Denial Management", "ICD-10 Coding"] },
      { title: "Clinical Chatbot & AI Receptionist", description: "Handle 80% of inbound queries without staff. AI manages appointments, prescription refills, symptom triage, insurance verification — 24/7, multilingual, across WhatsApp/web/phone.", tags: ["AI Receptionist", "Healthcare Chatbot", "Symptom Triage", "24/7"] },
      { title: "HIPAA-Compliant AI Agents", description: "Full-stack compliant AI with signed BAA. PHI data isolation, AES-256 encryption, audit trails, RBAC, HIPAA/DHA/ABDM-aligned. Compliance docs ready for your legal team.", tags: ["HIPAA", "PHI Security", "BAA", "DHA Compliance"] },
      { title: "EHR Integration & Interoperability", description: "Connect AI to Epic, Cerner, Meditech, Practo or custom EHR. HL7 FHIR-compliant bridges, real-time sync, bi-directional AI-to-EHR pipelines — without disrupting clinical workflows.", tags: ["EHR Integration", "HL7 FHIR", "Epic/Cerner", "Interoperability"] },
    ],
    uspHeadlines: { direct: "We build healthcare AI that clinical staff actually use — validated in real workflows, not demos.", cost: "50-70% lower cost than US/UK AI agencies. Same HIPAA-grade compliance. Full source code. No vendor lock-in.", ai: "LangChain, RAG, fine-tuned medical LLMs, and real-time voice AI — built for clinical environments." },
    faq: [
      { q: "Is it HIPAA compliant? Do you sign a BAA?", a: "Yes. BAA signed before any PHI is shared. PHI isolation, AES-256 encryption, RBAC, full audit logging standard. DHA/DOH compliance for UAE clients." },
      { q: "How much does healthcare AI cost?", a: "India: ₹5L-₹50L. USA/UAE: $20K-$100K+. Single-use AI (no-show reduction): ₹5L-₹10L. Full RCM + ambient scribe + EHR: ₹25L-₹50L+. Fixed-price after free discovery." },
      { q: "How fast is ROI?", a: "60-90 days. AI scheduling: 25-40% no-show reduction in month 1. RCM AI: denied claims recovered within weeks. Ambient scribe: 3-6 hours saved per doctor from day one." },
      { q: "Will it integrate with our EHR?", a: "Yes. Epic, Cerner, Meditech, Practo, custom systems — HL7 FHIR-compliant integration. Tested in your staging before any go-live." },
      { q: "How do you handle patient data security?", a: "Zero-trust architecture. AES-256 encryption, HIPAA-eligible cloud (AWS GovCloud/Azure Healthcare), each deployment isolated. Full data flow diagram provided." },
      { q: "Do you work with dental practices?", a: "Yes. AI receptionist + no-show reduction for dental: ₹5L-₹12L. Pre-built dental-specific configs for faster implementation." },
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
    meta: { title: "AI for Insurance Agencies & Carriers — Claims, Underwriting & Voice Agents | RDMI", description: "Cut claims processing from 9 days to 90 seconds. AI agents for insurance — claims automation, AI underwriting, fraud detection, voice agents. ₹5L-₹50L / $10K-$100K." },
    hero: { badge: "InsurTech AI · IRDAI-Aware · Production-Ready", h1: "AI That Processes Claims in 90 Seconds — Not 9 Days", subtitle: "Insurance agencies, brokers, and carriers use RDMI's AI to automate claims intake, underwrite faster, qualify leads before your team picks up, and detect fraud before it costs you. No vendor lock-in. You own the code.", cta1: "Get Free Insurance AI Consultation", cta2: "See Insurance AI in Action", trustPoints: ["IRDAI & GDPR-aware architecture", "Integrates with Applied Epic, Hawksoft, AMS360", "68% faster claims processing", "NDA signed before we discuss your data"] },
    images: { hero: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80", process: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80", team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80", services: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&q=80"], portfolio: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"], cta: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80" },
    process: [
      { step: "01", title: "Discovery & Compliance Mapping", description: "Map existing workflows — claims intake, underwriting, lead routing, fraud review — against IRDAI/GDPR compliance. Identify highest-ROI automation targets." },
      { step: "02", title: "Data Audit & Integration Planning", description: "Audit policy systems, AMS platforms, loss runs, data feeds. Design integration with Applied Epic, AMS360, Hawksoft, Guidewire." },
      { step: "03", title: "AI Build with Compliance Review", description: "3-5 senior engineers, 6-10 week sprints. Explainable AI for underwriting. Compliance review in QA cycle, not bolted on." },
      { step: "04", title: "Pilot, Validate & Go Live", description: "Controlled pilot on 10-20% volume, measure against baseline KPIs, validate accuracy, then cutover. 90-day post-launch support." },
    ],
    stats: [{ value: "$1B+", label: "InsurTech AI Funding in 2025" }, { value: "68%", label: "Faster Claims Processing" }, { value: "40%", label: "Fewer Fraud False Positives" }, { value: "90 sec", label: "AI-Assisted Claims Intake Time" }],
    services: [
      { title: "Claims Automation — 68% Faster", description: "AI triages FNOL, extracts data from photos/PDFs/voice, routes to right adjuster, pre-fills forms, flags SLA breaches. Auto, property, health, commercial lines.", tags: ["FNOL Automation", "Document AI", "Adjuster Routing", "SLA Alerts"] },
      { title: "AI Underwriting — 55% Less Review Time", description: "AI ingests loss runs, credit signals, applicant history → generates explainable risk scores your underwriters can act on and regulators can audit.", tags: ["Risk Scoring", "Explainable AI", "Loss Run Analysis", "Audit Trail"] },
      { title: "Voice AI for Agencies — 3x More Calls Handled", description: "AI voice agents answer policy questions, take FNOL, qualify renewal intent, book callbacks — 24/7, multilingual. Integrated with your AMS.", tags: ["Voice AI", "FNOL Intake", "Renewal Outreach", "AMS Integration"] },
      { title: "Fraud Detection — 40% Fewer False Positives", description: "ML analyzes claim patterns, social signals, network relationships. Surfaces high-risk claims for investigators without blocking legitimate payouts.", tags: ["Anomaly Detection", "Network Analysis", "Real-Time Scoring"] },
      { title: "Lead Qualification AI — 3.2x More Qualified Leads", description: "AI scores inbound leads by intent, coverage fit, and LTV before your team picks up. Auto-enriches CRM records, routes hot leads instantly.", tags: ["Intent Scoring", "CRM Integration", "Auto-Enrichment", "Producer Routing"] },
      { title: "Policy Comparison Bots — 45% Less Quote Abandonment", description: "Conversational AI walks prospects through coverage, surfaces best-fit policies, explains trade-offs. Web, WhatsApp, SMS.", tags: ["Quoting Integration", "Coverage Advisor", "WhatsApp Bot", "Producer Handoff"] },
    ],
    uspHeadlines: { direct: "Senior insurance-domain engineers — not a generalist agency learning your industry on your budget.", cost: "India-based delivery at 40-60% of US/UK rates. Full source code ownership. No SaaS markup.", ai: "Explainable outputs, compliance-ready documentation, model governance baked in from day one." },
    faq: [
      { q: "How do you handle IRDAI compliance for AI underwriting?", a: "Explainability first — every risk score includes human-readable rationale log. For US carriers, aligned with NAIC model bulletin. Full audit trail on inputs, training data, decision thresholds." },
      { q: "Can you integrate with Applied Epic, AMS360, Hawksoft?", a: "Yes. Applied API, Vertafore API, Hawksoft, EZLynx. For systems without public API, we build secure middleware. 2-4 weeks integration scope." },
      { q: "What does insurance AI cost?", a: "₹5L-₹50L / $10K-$100K. Claims triage bot: lower end. Multi-module (FNOL + fraud + voice): higher end. Fixed-price after discovery." },
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
    meta: { title: "AI for Hotels & Travel Agencies | Booking Engine, Chatbot & Revenue AI | RDMI", description: "AI booking engines, multilingual hotel chatbots, dynamic revenue management. 28% more bookings. 40% higher RevPAR. ₹3L-₹25L / $5K-$50K. Free consultation." },
    hero: { badge: "Travel & Hospitality AI · 12+ Languages · PMS Integrated", h1: "AI That Sells Trips While You Sleep — 24/7 Booking Engine", subtitle: "Multilingual AI agents that handle bookings, answer guest queries in 12+ languages, optimise room pricing in real time, and follow up with every lead — so your team focuses on experiences, not chasing enquiries.", cta1: "Get Free Travel AI Consultation", cta2: "See Live Demo", trustPoints: ["28% average revenue increase in 6 months", "24/7 automated booking across all channels", "Integrates with 30+ PMS, OTA & CRS", "₹3L-₹25L / $5K-$50K fixed pricing"] },
    images: { hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80", process: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80", team: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80", services: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", "https://images.unsplash.com/photo-1529290130-4ca3753253ae?w=800&q=80", "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80"], portfolio: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"], cta: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1600&q=80" },
    process: [
      { step: "01", title: "Discovery & Channel Audit", description: "Map booking funnel, PMS/OTA stack, guest communication gaps. Prioritized AI opportunity report with projected ROI in 3 days." },
      { step: "02", title: "Scope & Fixed Quote", description: "Exact deliverables, integrations, milestones. Fixed-price quote (₹3L-₹25L / $5K-$50K) before any code. Zero scope creep." },
      { step: "03", title: "Build, Integrate & Test", description: "2-week sprints integrating with PMS, OTA feeds, WhatsApp, CRM. Live demo and sign-off every sprint." },
      { step: "04", title: "Launch, Train & Optimize", description: "Deployment, staff training, 30-day monitoring. AI retrained on your booking data monthly for better conversion." },
    ],
    stats: [{ value: "28%", label: "Revenue Increase (6 Months)" }, { value: "24/7", label: "Automated Booking — Zero Downtime" }, { value: "40%", label: "Higher RevPAR via Dynamic Pricing" }, { value: "12+", label: "Languages Supported" }],
    services: [
      { title: "AI Booking Engine — 28% More Direct Bookings", description: "Conversational booking on website, WhatsApp, Instagram DMs. Qualifies guests, checks real-time availability, applies dynamic pricing, closes bookings 24/7. 28% lift in direct bookings, reducing OTA commissions.", tags: ["LangChain", "WhatsApp API", "PMS API", "Stripe/Razorpay"] },
      { title: "Multilingual Hotel Chatbot — 12+ Languages", description: "AI concierge handles pre-arrival queries, check-in, room upgrades, restaurant bookings in 12+ languages. 60% less front-desk queries. ₹1,800 / $22 upsell per guest average.", tags: ["Multilingual NLP", "WhatsApp", "Booking.com Sync"] },
      { title: "Revenue Management AI — 40% Higher RevPAR", description: "Dynamic pricing monitoring competitor rates, events, occupancy, demand signals. Auto-adjusts prices every 15 minutes across OTAs + direct channel. 40% RevPAR improvement in 90 days.", tags: ["ML Forecasting", "OTA Rate APIs", "Dashboards", "Auto-Sync"] },
      { title: "AI Guest Concierge — 3x More Upsells", description: "Post-booking AI sends personalized pre-arrival sequences — spa, transfers, activities, birthday upgrades. 3x upsell revenue, measurable review score improvement in 60 days.", tags: ["RAG", "Guest Profiles", "Email + WhatsApp", "Personalization"] },
      { title: "Tour Operator Automation — 70% Less Ops Time", description: "Auto-generates custom itineraries, sends supplier bookings, tracks confirmations, assembles travel docs. 70% less manual ops per booking. Multi-day, multi-destination, group tours.", tags: ["n8n", "CrewAI", "PDF Generation", "Supplier APIs"] },
      { title: "Travel CRM with AI Lead Scoring — 2x Faster Deals", description: "Purpose-built CRM with AI lead scoring, auto follow-ups, quote generation, pipeline forecasting. Cuts deal closure time by half.", tags: ["AI Scoring", "Email Automation", "WhatsApp Follow-Up"] },
    ],
    uspHeadlines: { direct: "Every project starts with a 45-min call with a senior developer who has shipped travel-tech — not a sales rep reading a deck.", cost: "50% of Western agency rates. Senior developers + hospitality domain expertise — all in fixed-scope pricing from ₹3L / $5K.", ai: "Production-grade LLMs, RAG, autonomous agents — not template chatbots or plugins dressed up as AI." },
    faq: [
      { q: "Which languages does the chatbot support?", a: "12+: English, Hindi, Arabic, French, German, Spanish, Mandarin, Japanese, Russian, Portuguese, Italian, Dutch. More added in 5-7 days. Auto-detects and switches mid-conversation." },
      { q: "Which PMS/OTA do you integrate with?", a: "Opera, Cloudbeds, Mews, Hotelogix, RMS Cloud, Booking.com, Expedia, Airbnb, Agoda, MakeMyTrip. Custom integration for others. Audit included in discovery." },
      { q: "How much does AI booking engine cost?", a: "₹3L-₹8L / $5K-$15K for booking engine with WhatsApp + website. Full quote after free 45-min discovery call. Fixed-scope, no hourly." },
      { q: "What ROI and how fast?", a: "Hotels: 28% direct booking increase + 40% RevPAR in 6 months. Tour operators: project cost recovered in 90 days via reduced ops + higher conversion." },
      { q: "Can it handle group bookings and multi-destination?", a: "Yes. Multi-day, multi-destination, up to 500 PAX. Custom proposals, supplier coordination, confirmation tracking, final docs — with human approval at key steps." },
      { q: "NDA and code ownership?", a: "Mutual NDA before discovery. 100% source code, AI models, training data ownership on final payment. No resale, no reuse." },
      { q: "How long to go live?", a: "AI booking engine or chatbot: 4-8 weeks. Full suite (booking + concierge + revenue AI): 10-16 weeks. Working software in first 14 days." },
      { q: "Post-launch support?", a: "30 days free. Then retainer from ₹35K / $500/month: model retraining, integration updates, 4-hour priority support." },
    ],
    ctaSection: { headline: "Your Competitors Are Already Using AI to Steal Your Bookings", subtitle: "Free 45-min consultation with a senior developer. Walk away with AI roadmap, integration checklist, and projected ROI. No commitment.", buttonText: "Book Free Consultation" },
    targetKeywords: ["ai for hotels", "hotel chatbot development", "ai booking assistant", "ai for tour operators", "travel chatbot development", "ai for travel agencies", "hotel ai concierge", "ai dynamic pricing hotel", "ai revenue management hotel", "hospitality ai solutions"],
  },
];

export function getKeywordGroup(slug: string): KeywordGroup | undefined {
  return keywordGroups.find((g) => g.slug === slug);
}

export function getAllSlugs(): string[] {
  return keywordGroups.map((g) => g.slug);
}
