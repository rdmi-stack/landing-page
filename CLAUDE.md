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

| Route | Navbar | Type | Purpose |
|-------|--------|------|---------|
| `/` | Yes | Homepage | Full landing — Hero, TrustBar, USP, Services, HowItWorks, TechStack, ProductShowcase, FAQ, CTA, Footer |
| `/get-quote` | No | Sitelink | Full-page quote form with benefits sidebar |
| `/products` | No | Sitelink | 50+ product showcase with category filters |
| `/services` | Yes | Sitelink | USPs + 8 services + tech stack |
| `/about` | No | Sitelink | Company story, stats, values |
| `/how-it-works` | Yes | Sitelink | 4-step dev process |
| `/case-studies` | Yes | Sitelink | Portfolio + testimonials |
| `/contact` | No | Sitelink | Email, phone, WhatsApp, offices |
| `/faq` | Yes | Sitelink | Common questions |
| `/lp` | No | UTM Dynamic | Paid ads — content changes by UTM params |
| `/seo-services` | No | Landing | 14 SEO services with tools |
| `/digital-marketing` | No | Landing | 11 DM services with tools |
| `/seo-course` | No | Landing | Free 7-day SEO course |
| `/lab` | No | Landing | Experiment lab with 8 experiments |
| `/dashboard` | No | Landing | Live stats dashboard |
| `/kw/<slug>` | No | Keyword LP | Keyword-specific landing pages (~10 planned) |

- Pages without Navbar use Footer only + FloatingWidget (WhatsApp + Callback)
- Pages with Navbar use `pt-20` for fixed nav offset
- Each page exports its own `Metadata` object for SEO

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

## Keyword-Specific Landing Pages Strategy

### Overview
~50 high-intent keywords grouped into ~10 dedicated landing pages (~5 keywords per group). Each landing page is a standalone route (no Navbar, Footer only) built from real project data — no mock stats, no fake case studies, no placeholder metrics. All content must be sourced from actual RDMI capabilities, tech stack, process, and NDA-compliant descriptions.

### Architecture
- **Routes**: `/kw/<slug>` (e.g., `/kw/custom-software-development-india`)
- **Component**: Shared `KeywordLandingPage` component in `src/components/pages/` that takes keyword group config as props
- **Data**: Keyword groups defined in `src/data/keyword-groups.ts` — each group has: slug, primary keyword, secondary keywords (4-5), headline, subheadline, services list, FAQ, CTA text, meta title/description
- **No Navbar**: Landing pages never have navigation — only Footer + FloatingWidget
- **CTA**: All CTAs use `openModal(primaryKeyword)` to pre-fill the quote form with keyword context
- **UTM Capture**: Form submissions capture the page slug + UTM params for attribution
- **SEO**: Each page has unique `Metadata` with primary keyword in title, H1, meta description, and URL slug
- **noindex**: Paid traffic pages are `noindex, nofollow`; organic-targeted pages are indexed

### Keyword Grouping Principles (for max Quality Score & conversion)
1. **Tight theme**: All keywords in a group share the same search intent and service category
2. **Single CTA focus**: One clear action per page — no competing CTAs
3. **Ad-to-page match**: Headline mirrors the ad headline for Quality Score boost
4. **Keyword in H1, title, meta, URL**: Primary keyword appears in all four
5. **Secondary keywords**: Woven naturally into H2s, body copy, FAQ questions

### Content Rules (NDA-Compliant)
- **No client names** — use "a leading fintech company" style references
- **No revenue/user metrics** from client projects
- **Tech stack mentions are OK** — React, Next.js, Node.js, Python, Flutter, etc.
- **Process details are OK** — discovery, sprint planning, CI/CD, testing
- **Budget ranges are OK** — ₹1.5L–₹25L+ based on complexity
- **Team size/composition OK** — "dedicated team of 3-5 senior developers"
- **Deliverables OK** — source code, documentation, deployment, support

### Admin Panel (Planned)
- Separate admin dashboard to manage all keyword landing pages
- CRUD for keyword groups and page content
- Lead tracking: form submissions with source page, UTM data, timestamps
- Conversion metrics per landing page

### Geo-Targeting Strategy
**Phase 1 — India (Top Metro Cities)**:
Mumbai, Delhi/NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad

- Keyword pages will include city-specific variants (e.g., "software development company in Mumbai")
- Google Ads location targeting by city for higher relevance score
- Landing page content can reference local presence / timezone alignment

**Phase 2 — International (Top Markets)**:
USA, UK, Canada, Australia, UAE, Singapore, Germany

- Focus on "hire developers from India" / "outsource to India" angle
- USD/GBP/AUD pricing references where applicable
- Timezone overlap and communication as trust signals

### Service Evolution Strategy (Forward-Looking)
Traditional software development demand will shift over time. The keyword landing page system and ad campaigns must be adaptable to emerging high-demand services. Current trajectory:

**Now (2025-2026) — Core Revenue**:
Custom software, mobile apps, SaaS, web apps, e-commerce, enterprise (ERP/CRM)

**Rising Fast (2025-2027) — Invest Now**:
- AI Agents & Autonomous Workflows (LangChain, CrewAI, AutoGen)
- AI-Powered SaaS (embedded AI features, copilots, smart dashboards)
- RAG Systems & Knowledge Bases (enterprise search, document AI)
- Workflow Automation (n8n, Make, custom orchestration)
- AI Chatbots & Conversational AI (customer support, sales bots)
- Voice AI & Telephony Agents

**Next Wave (2026-2028) — Watch & Prepare**:
- AI Agent Marketplaces & Platforms
- Autonomous Business Operations (AI replacing manual workflows end-to-end)
- Vertical AI SaaS (industry-specific AI products — legal, healthcare, finance, logistics)
- AI-Native Mobile Apps (on-device models, personalized UX)
- Computer Vision & IoT Integration
- Blockchain/Web3 enterprise applications
- GEO/AEO Optimization Services (AI search visibility)

**Strategy**: Keyword groups and landing pages should be easy to swap/add. When a service category gains traction (search volume up, CPC rising), spin up a new keyword group + landing page within hours using the existing system. The admin panel should surface trending keywords and suggest new page opportunities.

### Keyword Groups (Data-Backed from Google Keyword Planner Feb 2026)

**10 groups, ~50 high-intent keywords total. Sorted by revenue potential (CPC × volume).**

#### Group 1: Custom Software Development (₹1,109 CPC — highest value)
- **Primary**: custom software development company
- **Secondary**: custom software development services, custom software development agency, bespoke software development services, custom software design companies, custom software development firms
- **Slug**: `/kw/custom-software-development`
- **Ad Group**: Campaign 1 / AG1

#### Group 2: Mobile App Development (₹268–278 CPC, 5K+ volume)
- **Primary**: mobile app development company
- **Secondary**: app development company, android app development company, best mobile app development companies, mobile application development companies
- **Slug**: `/kw/mobile-app-development`
- **Ad Group**: Campaign 2 / AG1

#### Group 3: Web Development & Web Apps (₹128–152 CPC, 5K volume)
- **Primary**: web development company
- **Secondary**: web development agency, web application development, web development services, web designing company, web dev company
- **Slug**: `/kw/web-development-company`
- **Ad Group**: Campaign 5 / AG3

#### Group 4: AI & ML Development (₹145–298 CPC, rising demand)
- **Primary**: ai app development company
- **Secondary**: ai software development, ai app development services, ai software development companies, web development with ai
- **Slug**: `/kw/ai-software-development`
- **Ad Group**: Campaign 4 / AG1

#### Group 5: E-Commerce & Marketplace (₹142–358 CPC)
- **Primary**: ecommerce app development company
- **Secondary**: shopify app development, ecommerce web development company, marketplace development, shopify ecommerce development
- **Slug**: `/kw/ecommerce-development`
- **Ad Group**: Campaign 5 / AG2

#### Group 6: Enterprise Software — ERP/CRM (₹343–510 CPC)
- **Primary**: enterprise software development
- **Secondary**: enterprise software, erp software development company, best crm software, enterprise asset management software
- **Slug**: `/kw/enterprise-software-development`
- **Ad Group**: Campaign 5 / AG1

#### Group 7: SaaS & MVP Development (₹120–611 CPC)
- **Primary**: saas development company
- **Secondary**: saas product development services, saas product development company, mvp development company
- **Slug**: `/kw/saas-mvp-development`
- **Ad Group**: Campaign 3 / AG1–AG2

#### Group 8: Flutter & Cross-Platform Apps (₹214–450 CPC)
- **Primary**: flutter app development company
- **Secondary**: react native development companies, cross platform app development company, cross platform mobile app development
- **Slug**: `/kw/flutter-react-native-development`
- **Ad Group**: Campaign 2 / AG2

#### Group 9: IT Outsourcing & Hire Developers (₹127–285 CPC)
- **Primary**: outsourcing software development
- **Secondary**: offshore software development company, software development outsourcing companies, us software development company
- **Slug**: `/kw/it-outsourcing-hire-developers`
- **Ad Group**: Campaign 1 / AG3–AG4

#### Group 10: Industry-Specific Apps (₹553–4,226 CPC — ultra-high value niche)
- **Primary**: healthcare app development company
- **Secondary**: fintech software development companies, grocery delivery app development, restaurant app development company, fitness app development company
- **Slug**: `/kw/industry-specific-app-development`
- **Ad Group**: Custom niche campaigns

---

## SEO Target Keywords (High Commercial Intent)

**Data source**: Google Keyword Planner (Feb 2026), 4,036 keywords analyzed. Filtered for high commercial intent (CPC ≥ ₹100, volume ≥ 500).

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

### High-Volume Keywords from Google Keyword Planner (Feb 2026)

**Tier 1 — 50,000 monthly searches** (broad, high volume):
| Keyword | Volume | CPC (High) | Competition |
|---------|--------|-----------|-------------|
| mobile app developer | 50,000 | ₹148 | Low (4) |
| website developer | 50,000 | ₹121 | Medium (61) |
| enterprise resource planning software | 50,000 | ₹123 | Low (15) |
| company management software | 50,000 | ₹160 | Low (2) |

**Tier 2 — 5,000 monthly searches** (targeted, high intent):
| Keyword | Volume | CPC (High) | Competition |
|---------|--------|-----------|-------------|
| custom software development | 5,000 | ₹1,109 | Low (12) |
| custom software development companies | 5,000 | ₹1,109 | Low (6) |
| custom software development services | 5,000 | ₹1,109 | Low (6) |
| custom software development agency | 5,000 | ₹1,109 | Low (6) |
| bespoke software development services | 5,000 | ₹1,109 | Low (6) |
| enterprise software | 5,000 | ₹510 | Low (8) |
| ai app development company | 5,000 | ₹298 | Low (6) |
| mobile app development company | 5,000 | ₹278 | Low (12) |
| android app development company | 5,000 | ₹269 | Low (5) |
| app development company | 5,000 | ₹268 | Low (19) |
| flutter app development company | 5,000 | ₹214 | Low (2) |
| ecommerce app development company | 5,000 | ₹204 | Low (1) |
| web development agency | 5,000 | ₹152 | Medium (35) |
| software development company | 5,000 | ₹152 | Low (13) |
| ai software development | 5,000 | ₹145 | Medium (34) |
| web application development | 5,000 | ₹129 | Low (20) |
| web development company | 5,000 | ₹128 | Low (22) |
| software development services | 5,000 | ₹111 | Low (8) |

**Tier 3 — 500 monthly searches** (ultra-high CPC, niche intent):
| Keyword | Volume | CPC (High) | Competition |
|---------|--------|-----------|-------------|
| grocery delivery app development company | 500 | ₹4,226 | Low (4) |
| grocery app development company | 500 | ₹2,436 | Low (7) |
| restaurant app development company | 500 | ₹2,040 | Low (5) |
| medicine delivery app development company | 500 | ₹1,062 | Low (1) |
| react native development companies | 500 | ₹982 | Low (4) |
| matrimony app development company | 500 | ₹901 | Low (2) |
| mlm software development company | 500 | ₹865 | Low (3) |
| custom mobile app development company | 500 | ₹794 | Low (7) |
| healthcare app development company | 500 | ₹643 | Low (4) |
| saas product development services | 500 | ₹611 | Low (3) |
| fintech software development companies | 500 | ₹385 | Low (1) |
| enterprise software development | 500 | ₹372 | Low (8) |
| erp software development company | 500 | ₹343 | Low (4) |
| outsourcing software development | 500 | ₹285 | Low (8) |
| saas development company | 500 | ₹215 | Low (5) |

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
