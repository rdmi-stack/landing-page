# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Company Info

- **Brand**: RDMI Web Services
- **Legal Entity**: RDMI Tech Ventures Pvt. Ltd.
- **Email**: info@rdmi.in
- **Phone/WhatsApp**: +91 98185 65561
- **Lead Notification**: info@rdmi.in (CC: rdmitechventurespvtltd@gmail.com)
- **Mailgun Domain**: hello.rdmi.in
- **Netlify Site**: rdmi-landing-page.netlify.app
- **GitHub Repo**: rdmi-stack/landing-page
- **Regions**: India (HQ), USA, UK

## Build & Dev Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run build        # Production build (also runs TypeScript check)
npm run lint         # ESLint via next lint
npx tsc --noEmit     # Type check without emitting
```

## Deployment

- **Netlify** via GitHub Actions: push to `main` triggers `.github/workflows/deploy.yml`
- Workflow: `npm ci` → `npm run build` → `netlify deploy --prod`
- Netlify config in `netlify.toml` uses `@netlify/plugin-nextjs` for SSR support
- Environment secrets (Mailgun) stored in GitHub Secrets and injected at build time

## Architecture

**Next.js 16 App Router** with React 19, TypeScript strict mode, Tailwind CSS v4, Framer Motion.

### Global Modal System

`ModalProvider` (React Context) wraps the entire app in `layout.tsx`. Every CTA on the site calls `openModal(productName?)` from the `useModal()` hook — this opens `QuoteModal` with an optional pre-filled product name. All CTA buttons must use `onClick={() => openModal()}` (not `onClick={openModal}`) to avoid type mismatches with MouseEvent.

### Page Structure

| Route | Type | Purpose |
|-------|------|---------|
| `/` | Homepage | Full landing page — Hero, TrustBar, USP, Services, HowItWorks, TechStack, ProductShowcase, CaseStudies, Testimonials, FAQ, CTA, Footer |
| `/get-quote` | Sitelink | Full-page quote form with benefits sidebar |
| `/products` | Sitelink | 50+ product showcase with category filters |
| `/services` | Sitelink | USPs + 8 services + tech stack |
| `/about` | Sitelink | Company story, stats, values |
| `/how-it-works` | Sitelink | 4-step dev process |
| `/case-studies` | Sitelink | Portfolio + testimonials |
| `/contact` | Sitelink | Email, phone, WhatsApp, offices |
| `/faq` | Sitelink | Common questions |
| `/lp` | UTM Dynamic | Paid ads landing page — content changes by UTM params |

- `/get-quote`, `/about`, `/contact` use dedicated components from `src/components/pages/`
- Other sitelink pages reuse section components with Navbar/Footer wrapper and `pt-20` for fixed nav
- Each page exports its own `Metadata` object for SEO sitelinks

### UTM Dynamic Landing Page (`/lp`)

Self-contained in `src/components/pages/UTMLandingPage.tsx`. Reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` from URL search params and dynamically renders headline, subheadline, CTA, offer badge, urgency bar, trust badges, and social proof.

**4-layer priority**: `utm_term` (keyword injection) > `utm_campaign` > `utm_source` > defaults

**Supported campaigns**: mvp, saas, mobile, ai, ecommerce, enterprise, startup, outsourcing, retarget
**Supported sources**: google, facebook, instagram, linkedin, twitter, email, newsletter, producthunt, reddit, partner
**Medium → CTA map**: cpc, ppc, social, email, referral, organic, display, video

UTM data is captured in form submissions as `[UTM: source=x, medium=y, campaign=z]` prefix in the message field. Page is `noindex, nofollow`.

### API Route: `/api/contact`

POST endpoint using Mailgun. Sends two emails:
1. **Customer confirmation** — styled HTML with next-steps
2. **Lead notification** — to info@rdmi.in with CC to rdmitechventurespvtltd@gmail.com

Guards against missing env vars. Uses `MAILGUN_REGION` to select US/EU API endpoint. Timestamps in IST.

### Product Showcase

50 products in `ProductShowcase.tsx` with category filtering (useState + useMemo). Categories: AI & Agents, SaaS Platforms, E-Commerce, Mobile Apps, FinTech & Blockchain, Industry Solutions, Enterprise & Automation. Clicking a product card calls `openModal(product.name)`.

## Key Conventions

- **All interactive components** use `"use client"` directive
- **Animation pattern**: `motion.div` with `initial={{ opacity: 0, y: 20 }}` / `whileInView={{ opacity: 1, y: 0 }}` / `viewport={{ once: true }}`
- **Card pattern**: `rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30`
- **Dark theme only**: bg `#0a0a0a`, accents indigo/purple gradient
- **Icons**: lucide-react exclusively
- **Path alias**: `@/*` → `./src/*`
- **Budget ranges**: INR starting ₹1,50,000 up to ₹25,00,000+
- **Footer links**: Array of `{ label, href }` objects pointing to actual page routes
- **Custom CSS utilities** in `globals.css`: `.gradient-text`, `.glow-border`, `.animate-gradient`, `.pulse-glow`, `.animate-float`

## Environment Variables

```
MAILGUN_API_KEY=<key>
MAILGUN_DOMAIN=hello.rdmi.in
MAILGUN_FROM_EMAIL=info@rdmi.in
MAILGUN_REGION=US
```

---

## SEO Target Keywords (High Commercial Intent)

### Primary Keywords (Highest Value — target in homepage title, H1, meta)
| Keyword | Intent | Monthly Search | Est. CPC |
|---------|--------|---------------|----------|
| custom software development company India | Transactional | 2,400 | ₹80–150 |
| software development company in India | Transactional | 3,600 | ₹60–120 |
| app development company India | Transactional | 2,900 | ₹70–140 |
| hire software developers India | Transactional | 1,900 | ₹100–200 |
| web application development company India | Transactional | 1,600 | ₹80–160 |
| custom software development services | Transactional | 2,400 | ₹90–180 |
| mobile app development company India | Transactional | 2,400 | ₹80–150 |
| SaaS development company India | Transactional | 880 | ₹100–200 |
| IT outsourcing company India | Transactional | 1,300 | ₹60–120 |
| offshore software development India | Transactional | 1,000 | ₹80–160 |

### Secondary Keywords (High Intent — target in service pages, H2s, content)
| Keyword | Intent |
|---------|--------|
| hire dedicated developers India | Transactional |
| custom web development India | Transactional |
| enterprise software development India | Transactional |
| ecommerce development company India | Transactional |
| AI software development company India | Transactional |
| MVP development company India | Transactional |
| React development company India | Transactional |
| Node.js development company India | Transactional |
| full stack development services India | Transactional |
| software development outsourcing India cost | Commercial |

### Long-Tail Keywords (Low Competition, High Conversion — target in FAQ, blog, UTM pages)
| Keyword |
|---------|
| hire dedicated React developers India |
| custom CRM development company India |
| AI chatbot development company India |
| how much does custom software cost in India |
| best software development company for startups India |
| build SaaS platform India cost |
| hire remote developers India for US startup |
| custom ERP development company India |
| mobile app development cost India 2025 |
| white label software development India |
| fintech app development company India |
| healthcare software development India |
| logistics software development India |
| custom LMS development company India |
| on demand app development India |

---

## Google Ads — Campaign & Ad Group Structure

### Campaign 1: Custom Software Development (Broad)
**Landing Page**: `/lp?utm_source=google&utm_medium=cpc&utm_campaign=outsourcing`
**Budget**: ₹1,500–3,000/day | **Bid Strategy**: Maximize conversions

| Ad Group | Keywords (Phrase/Exact Match) | Match |
|----------|------------------------------|-------|
| **AG1: Custom Software** | custom software development company India, custom software development services India, bespoke software development India | Phrase + Exact |
| **AG2: Software Company** | software development company in India, best software development company India, top software company India | Phrase + Exact |
| **AG3: IT Outsourcing** | IT outsourcing company India, offshore software development India, outsource software development India | Phrase + Exact |
| **AG4: Hire Developers** | hire software developers India, hire dedicated developers India, hire remote developers India | Phrase + Exact |

**Negative Keywords**: free, tutorial, course, salary, internship, jobs, wiki, what is, download

### Campaign 2: App Development
**Landing Page**: `/lp?utm_source=google&utm_medium=cpc&utm_campaign=mobile`
**Budget**: ₹1,000–2,000/day

| Ad Group | Keywords | Match |
|----------|----------|-------|
| **AG1: Mobile App** | mobile app development company India, app development company India, android app development India, iOS app development India | Phrase + Exact |
| **AG2: Cross-Platform** | React Native development company India, Flutter development company India, cross platform app development India | Phrase + Exact |
| **AG3: App Cost** | mobile app development cost India, how much does app development cost India, app development pricing India | Phrase + Exact |

### Campaign 3: SaaS & MVP
**Landing Page**: `/lp?utm_source=google&utm_medium=cpc&utm_campaign=saas` or `mvp`
**Budget**: ₹800–1,500/day

| Ad Group | Keywords | Match |
|----------|----------|-------|
| **AG1: SaaS Development** | SaaS development company India, SaaS product development India, build SaaS platform India | Phrase + Exact |
| **AG2: MVP Development** | MVP development company India, MVP development cost India, startup software development India | Phrase + Exact |
| **AG3: Startup Dev** | software development for startups India, hire developers for startup India, tech co-founder India | Phrase + Exact |

### Campaign 4: AI & ML
**Landing Page**: `/lp?utm_source=google&utm_medium=cpc&utm_campaign=ai`
**Budget**: ₹800–1,500/day

| Ad Group | Keywords | Match |
|----------|----------|-------|
| **AG1: AI Development** | AI development company India, AI software development India, AI app development India | Phrase + Exact |
| **AG2: ChatBot & Agents** | AI chatbot development India, custom AI agent development, AI automation company India | Phrase + Exact |
| **AG3: ML & Data** | machine learning development India, predictive analytics development, computer vision development India | Phrase + Exact |

### Campaign 5: Enterprise & E-Commerce
**Landing Page**: `/lp?utm_source=google&utm_medium=cpc&utm_campaign=enterprise` or `ecommerce`
**Budget**: ₹800–1,500/day

| Ad Group | Keywords | Match |
|----------|----------|-------|
| **AG1: Enterprise** | enterprise software development India, ERP development company India, CRM development company India | Phrase + Exact |
| **AG2: E-Commerce** | ecommerce development company India, custom ecommerce development India, marketplace development India | Phrase + Exact |
| **AG3: Web App** | web application development company India, custom web development India, full stack development India | Phrase + Exact |

### Campaign 6: Retargeting (Display + Search)
**Landing Page**: `/lp?utm_source=google&utm_medium=cpc&utm_campaign=retarget`
**Budget**: ₹500–1,000/day | **Audience**: Website visitors (7-30 days)

| Ad Group | Strategy |
|----------|----------|
| **AG1: Site Visitors** | RLSA — bid +50% on past visitors searching any campaign keyword |
| **AG2: Quote Abandoners** | Display remarketing to users who opened quote modal but didn't submit |
| **AG3: Page Viewers** | Display remarketing to /products and /services page visitors |

### Google Ads Copy Templates

**Headline 1** (30 chars): Custom Software Dev India
**Headline 2** (30 chars): Save 50% — Talk to Devs
**Headline 3** (30 chars): AI-First Development
**Description 1** (90 chars): Senior developers, not sales reps. AI-powered delivery. Free quote in 2 hours.
**Description 2** (90 chars): 50+ projects delivered. NDA protected. Full source code ownership. ₹1.5L onwards.

**Sitelink Extensions**:
- Get Free Quote → /get-quote
- Our Products (50+) → /products
- Case Studies → /case-studies
- How It Works → /how-it-works
- About Us → /about
- Contact Us → /contact

**Callout Extensions**: Free Consultation | NDA Protected | Source Code Ownership | 2-Hour Response | AI-First Approach | 50% Cost Savings

**Structured Snippets**:
- Services: Web Apps, Mobile Apps, SaaS, AI/ML, E-Commerce, Enterprise Software
- Types: React, Next.js, Node.js, Python, Flutter, React Native

---

## UTM URL Quick Reference

```
# Google Ads
/lp?utm_source=google&utm_medium=cpc&utm_campaign=mvp
/lp?utm_source=google&utm_medium=cpc&utm_campaign=saas
/lp?utm_source=google&utm_medium=cpc&utm_campaign=mobile
/lp?utm_source=google&utm_medium=cpc&utm_campaign=ai
/lp?utm_source=google&utm_medium=cpc&utm_campaign=ecommerce
/lp?utm_source=google&utm_medium=cpc&utm_campaign=enterprise
/lp?utm_source=google&utm_medium=cpc&utm_campaign=startup
/lp?utm_source=google&utm_medium=cpc&utm_campaign=outsourcing
/lp?utm_source=google&utm_medium=cpc&utm_campaign=retarget

# Social Ads
/lp?utm_source=facebook&utm_medium=social&utm_campaign=mvp
/lp?utm_source=instagram&utm_medium=social&utm_campaign=mobile
/lp?utm_source=linkedin&utm_medium=social&utm_campaign=enterprise

# Email Campaigns
/lp?utm_source=email&utm_medium=email&utm_campaign=retarget
/lp?utm_source=newsletter&utm_medium=email&utm_campaign=saas

# Keyword Injection (dynamic headline from search term)
/lp?utm_source=google&utm_medium=cpc&utm_term=hire+react+developers+india
/lp?utm_source=google&utm_medium=cpc&utm_term=custom+crm+development+india

# Partners & Communities
/lp?utm_source=producthunt&utm_medium=referral&utm_campaign=startup
/lp?utm_source=reddit&utm_medium=social&utm_campaign=mvp
/lp?utm_source=partner&utm_medium=referral&utm_campaign=outsourcing
```
