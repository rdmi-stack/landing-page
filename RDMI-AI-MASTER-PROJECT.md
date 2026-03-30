# RDMI AI Master Project — Autonomous Service Delivery System

## Vision
RDMI is not an agency. Not a SaaS company. RDMI is an **AI-powered production company** — a services business that uses AI to deliver at 10x the speed and 50% the cost of any traditional firm. We sell outcomes (revenue, cost savings, automation) — not software subscriptions, not hourly billing. The goal is to automate 70-80% of service delivery using AI agents, so humans supervise and architect — not build.

**Target**: ₹1,000 Cr+ revenue. $3M/month run rate within 18 months.

**Core Principle (Who Not How)**: Every task asks "Which AI agent does this?" — not "How do I do this?"

---

## RDMI AI Execution Framework

### The System (Not Tools)
> "Most companies use AI tools. We build AI systems that run businesses."

RDMI sells **Business Operating Systems Powered by AI** — not chatbots, not automation, not development hours.

### 4-Layer Architecture

```
┌─────────────────────────────────────────────────┐
│  Layer 1: INPUT (Client Requests)               │
│  Website forms, WhatsApp, CRM, Email, Ads       │
├─────────────────────────────────────────────────┤
│  Layer 2: AI ORCHESTRATOR (Brain)               │
│  Central agent decides: what to build, which    │
│  agents to trigger, priority, timeline          │
├─────────────────────────────────────────────────┤
│  Layer 3: SPECIALIZED AI AGENTS (The "Who")     │
│  Strategy, Proposal, Dev, Workflow, QA,         │
│  Delivery, Outreach, Support agents             │
├─────────────────────────────────────────────────┤
│  Layer 4: ROI & MEASUREMENT                     │
│  Cost saved, revenue generated, time saved,     │
│  client satisfaction, delivery speed             │
└─────────────────────────────────────────────────┘
```

---

## 8 Core AI Agents to Build

### Agent 1: 🧠 Strategy Agent
**Input**: Client idea/brief (from form, WhatsApp, email)
**Output**: Execution plan with tech stack, timeline, cost estimate, risk assessment
**How it works**:
- Analyzes project requirements against RDMI's 200+ delivered project patterns
- Recommends optimal tech stack based on budget, scale, and timeline
- Generates SOW-ready scope document
- Flags compliance requirements (HIPAA, DIFC, SOC2) based on client industry
**Tools**: Claude API, project template library, pricing database
**Human role**: Review and approve before sending to client

### Agent 2: 🧾 Proposal Agent
**Input**: Strategy Agent output + client details
**Output**: Branded proposal PDF with pricing, timeline, architecture, team composition
**How it works**:
- Pulls from 50+ proposal templates
- Customizes pricing based on geo (INR/USD/AED)
- Includes relevant case studies (NDA-compliant)
- Generates milestone breakdown with payment schedule
- Auto-sends via Mailgun within 2 hours of inquiry
**Tools**: Claude API, Puppeteer (PDF), Mailgun, template library
**Human role**: Final review on proposals >₹10L

### Agent 3: 💻 Dev Architect Agent
**Input**: Approved proposal/SOW
**Output**: Technical architecture, DB schema, API specs, feature breakdown, sprint plan
**How it works**:
- Breaks project into 2-week sprint milestones
- Generates database schemas, API endpoint specs, component hierarchy
- Creates GitHub repo with boilerplate, CI/CD, and project structure
- Assigns tasks to sprint boards (Linear/Jira)
**Tools**: Claude API, GitHub API, Linear API, architecture templates
**Human role**: Senior architect reviews before sprint starts

### Agent 4: 👨‍💻 Code Generation Agent
**Input**: Sprint tasks from Dev Architect
**Output**: Production-ready code (reviewed by human)
**How it works**:
- Generates backend (Node.js/Python), frontend (Next.js/React), mobile (Flutter)
- Uses RDMI code templates and patterns library
- Writes tests alongside code (unit + integration)
- Creates PR with description and test results
**Tools**: Claude Code, GitHub Copilot, Cursor, RDMI template library
**Human role**: Code review every PR. No code ships without human approval.

### Agent 5: 🔗 Workflow Automation Agent
**Input**: Client process requirements
**Output**: Configured n8n/Make workflows + custom API integrations
**How it works**:
- Maps client business processes to automation opportunities
- Builds n8n workflows with error handling, retries, human checkpoints
- Integrates CRM, ERP, payment gateways, communication tools
- Sets up monitoring and alerting
**Tools**: n8n, Make, custom APIs, webhooks
**Human role**: Test with real data before deploying to client

### Agent 6: 🧪 QA Agent
**Input**: Completed sprint code
**Output**: Bug reports, test results, performance benchmarks
**How it works**:
- Runs automated test suites (Playwright, Jest, pytest)
- Performs security scans (OWASP top 10)
- Checks performance (Lighthouse, load testing)
- Generates test report with pass/fail and screenshots
**Tools**: Playwright, Jest, pytest, Lighthouse, OWASP ZAP
**Human role**: Review critical bugs, decide ship/no-ship

### Agent 7: 📊 Delivery Agent
**Input**: QA-approved build
**Output**: Deployment, documentation, client handover package
**How it works**:
- Deploys to staging → production (CI/CD)
- Generates technical documentation, API docs, user guides
- Creates Loom walkthrough videos (scripted)
- Prepares source code handover package
- Sends client notification with access credentials
**Tools**: GitHub Actions, Netlify/Vercel/AWS, documentation generators
**Human role**: Final deployment approval, client handover call

### Agent 8: 📢 Outreach & Revenue Agent
**Input**: Market intelligence, prospect signals
**Output**: Personalized outreach (email, LinkedIn, WhatsApp), ad copy, content
**How it works**:
- Monitors hiring signals (AI engineer, MLOps, automation roles)
- Generates personalized cold emails based on company + signal
- Creates LinkedIn DMs with specific workflow improvement suggestions
- Drafts Google Ads copy matched to keyword groups
- Produces weekly SEO content for blog
**Tools**: Claude API, LinkedIn API, Mailgun, Google Ads API
**Human role**: Approve outbound before sending. Never auto-send cold outreach.

---

## Sales Approach: Consultation, Not Pitching

### The Rule
> **We never sell. We consult. We educate. We let the client decide.**

RDMI sales reps are **consultants and thought leaders** — not closers reading scripts. The client should feel smarter after talking to us, whether they buy or not. That's how you build a brand that scales to ₹10,000 Cr.

### The Consultation Call Framework (When Sales Rep Calls a Lead)

**Mindset**: You are a senior AI strategist offering a free consultation. Not a salesperson. If the client is not a fit, say so honestly — that builds more trust than any pitch.

```
PHASE 1: LISTEN (First 10 min — 80% client talking)
─────────────────────────────────────────────────
- "Tell me about your business and what you're trying to solve."
- "What's the current process? Walk me through a typical day."
- "What have you tried before? What worked, what didn't?"
- "What does success look like for you in 6 months?"

DO: Take notes. Ask follow-up questions. Understand the REAL pain.
DON'T: Talk about RDMI. Don't mention pricing. Don't pitch.

PHASE 2: DIAGNOSE (Next 10 min — thought leadership)
─────────────────────────────────────────────────
- "Based on what you've told me, here's what I see..."
- Share a genuine insight about their industry or workflow
- Reference a similar problem you've solved (NDA-safe)
- Explain the AI approach: "Here's how AI can actually help this specific problem"
- Be honest: "This part AI can automate. This part still needs humans."

DO: Show expertise. Teach something they didn't know. Be the smartest person
    they've talked to this week.
DON'T: Oversell AI. Don't promise magic. Don't badmouth competitors.

PHASE 3: RECOMMEND (Next 5 min — options, not pressure)
─────────────────────────────────────────────────
- "Here's what I'd recommend, and here's why:"
- Give 2-3 options with trade-offs (not just the most expensive)
- "You could start with X (smaller scope) and expand to Y after seeing ROI"
- Mention the free prototype: "We'll build a working demo in 48 hours
  before you commit anything — you can evaluate with zero risk"

DO: Frame as advisor. Give genuine options. Let them choose.
DON'T: Push for close. Don't create fake urgency. Don't use "limited time" BS.

PHASE 4: NEXT STEPS (Final 5 min — their decision)
─────────────────────────────────────────────────
- "Would it be helpful if we built a quick prototype so you can see this working?"
- "I'll send you a summary of what we discussed + a rough scope. No obligation."
- "Take your time. Happy to answer any follow-up questions over email/WhatsApp."
- If not ready: "Totally fine. I'll add you to our monthly AI insights newsletter
  — we share case studies and industry trends. When you're ready, we're here."

DO: Make it easy to say yes AND easy to say no. Both are fine.
DON'T: Pressure. Don't follow up 5 times in a week. Don't beg.
```

### After the Call — Follow-Up via Mailchimp

**Tool**: Mailchimp (not Mailgun — Mailchimp for nurture sequences, Mailgun for transactional)

**Segment leads into 3 lists based on call outcome:**

#### List 1: HOT (Ready to buy — wants prototype)
```
Sequence: "Active Deal" (5 emails over 10 days)
─────────────────────────────────────────────────
Email 1 (Same day): Call summary + scope outline + "prototype coming in 48 hrs"
Email 2 (Day 2): Prototype delivered + Loom walkthrough + "Here's what we built"
Email 3 (Day 4): Case study from same industry + ROI numbers
Email 4 (Day 7): "Any questions? Here's my WhatsApp for a quick chat"
Email 5 (Day 10): Gentle close: "Ready to move forward? Here's the SOW."
```

#### List 2: WARM (Interested but not ready — needs nurturing)
```
Sequence: "Thought Leadership Nurture" (12 emails over 60 days)
─────────────────────────────────────────────────
Week 1: "3 AI Workflows That Save [Industry] Companies 40% in Ops Cost"
Week 2: Case study: "How a [similar company] automated [process] in 6 weeks"
Week 3: "Is Your Business AI-Ready? Free 5-Minute Assessment"
Week 4: Industry trend: "What [Industry] Leaders Are Building with AI in 2026"
Week 5: ROI calculator link: "See what AI could save YOUR business"
Week 6: "Common AI Mistakes We See (and How to Avoid Them)"
Week 7: Client testimonial / anonymized results
Week 8: "The 'Show Before Commit' Model — Why We Build Free Prototypes"
Week 9: New case study from relevant industry
Week 10: "AI Readiness Checklist — 10 Questions Before You Build"
Week 11: Invite to a free 30-min AI strategy session
Week 12: "When you're ready, we're here. Meanwhile, here's our latest work."

Tone: Teacher, not seller. Every email should make them smarter.
Every email should position RDMI as the obvious choice when they're ready.
```

#### List 3: COLD (Not a fit now — long-term brand building)
```
Sequence: "Monthly AI Digest" (1 email/month, indefinite)
─────────────────────────────────────────────────
Monthly email with:
- 1 AI industry trend
- 1 case study (anonymized)
- 1 actionable tip they can use without hiring anyone
- Soft CTA: "Need help implementing? We're here."

Goal: Stay top-of-mind. When they're ready (6-12 months), RDMI is
the first name they think of. Zero pressure. Pure value.
```

### Mailchimp Setup
```
Account: RDMI Tech Ventures
Audiences:
  - "Hot Leads" (Active deals → 5-email sequence)
  - "Warm Leads" (Nurture → 12-email sequence over 60 days)
  - "Newsletter" (Monthly AI digest → everyone)

Tags: industry, geo (india/usa/dubai), budget tier, lead source (ads/outreach/organic)
Integration: Form submissions → Mailchimp via API (tag based on form type)
Automation: Sequences trigger on tag assignment
```

### What Makes This Different from Every Other Agency
| Other Agencies | RDMI |
|---|---|
| "Buy now, limited offer!" | "Take your time. Here's a free prototype." |
| Sales reps read scripts | AI engineers consult on your specific problem |
| Follow up 10 times in a week | Nurture with value, follow up on their schedule |
| Hide pricing until call | Transparent budget ranges on every landing page |
| Promise everything | Honest about what AI can and can't do |
| Close the deal, disappear | Thought leadership → trust → client decides → long-term relationship |

### The Long Game (Why This Works at Scale)
- 1 consultation call → even if they don't buy → they tell 3 people about RDMI
- 1 value email/month → 12 months later → "Hey, we're finally ready, let's talk"
- 1 free prototype → client shares internally → 3 stakeholders see RDMI quality
- 0 pressure → client trusts us → refers us to their network
- **Result**: 40% of revenue comes from referrals by Year 2. CAC drops 60%.**

---

## End-to-End Automated Workflow (Updated)

```
Client submits form (60 sec)
    ↓
AI scores lead (Hot/Warm/Cold) + adds to Mailchimp list
    ↓
Strategy Agent creates plan (15 min)
    ↓
Sales rep calls for CONSULTATION (not pitch) — within 2 hours
    ↓
Proposal Agent sends offer (if client wants to proceed)
    ↓ [Client approves]
Dev Architect creates sprint plan (1 day)
    ↓
Code Generation Agent builds (2-week sprints)
    ↓
Workflow Agent integrates (parallel)
    ↓
QA Agent tests (each sprint)
    ↓
Delivery Agent packages & deploys
    ↓
Done — Human only reviews, doesn't build
```

**Result**: 70% less human effort per project. 3x more projects per team.

---

## Implementation Phases

### Phase 1: Foundation (Days 1-15) — Ship This First
- [ ] Strategy Agent (auto-generates project plans from briefs)
- [ ] Proposal Agent (auto-generates proposals with pricing)
- [ ] Lead Scoring (auto-scores and routes incoming leads)
- [ ] Follow-Up Email Sequences (auto-sends based on lead type)
**Goal**: Close deals 3x faster. Respond in minutes, not hours.

### Phase 2: Delivery Automation (Days 15-45)
- [ ] Dev Architect Agent (auto-creates sprint plans, schemas, specs)
- [ ] Code Generation Agent (generates boilerplate + features from specs)
- [ ] QA Agent (automated testing pipeline)
- [ ] Workflow Agent (n8n automation builder)
**Goal**: Reduce manual development work by 50%.

### Phase 3: Full Orchestration (Days 45-90)
- [ ] AI Orchestrator (central brain routing work between agents)
- [ ] Multi-project handling (parallel client delivery)
- [ ] Outreach Agent (automated prospecting + content)
- [ ] Client dashboard (real-time project visibility)
**Goal**: Scale to ₹2-3 Cr/month with same team size.

### Phase 4: Platform (Days 90-180)
- [ ] White-label delivery for partner agencies (instant 3x pipeline)
- [ ] Template library: 500+ reusable project architectures (internal, not sold)
- [ ] Managed AI retainers: 50+ clients on recurring monthly
- [ ] Industry-specific delivery teams (Healthcare, BFSI, Logistics, Legal)
**Goal**: ₹10Cr+/month from pure services + managed AI retainers.

---

## Service Offerings (Automated Delivery)

### Tier 1: AI Agent & Workflow Systems ($3K-$25K)
- AI Chatbots (WhatsApp, Web, Slack, Voice)
- Autonomous AI Agents (LangChain, CrewAI, AutoGen)
- RAG Knowledge Bases (enterprise document search)
- Workflow Automation (n8n, Make, custom)
- GenAI Consulting & Strategy
- AI Copilots & SaaS Features

### Tier 2: Custom Software & Apps ($5K-$50K)
- Web Applications (React, Next.js, Node.js)
- Mobile Apps (Flutter, React Native)
- SaaS Platforms (multi-tenant, subscription billing)
- E-Commerce (Shopify, custom marketplace)
- Enterprise Software (ERP, CRM)

### Tier 3: Managed AI Operations ($1K-$10K/month)
- Model retraining & optimization
- Agent monitoring & performance tuning
- Workflow maintenance & scaling
- Dedicated AI engineer retainer

---

## Target Industries (Ranked by Revenue Potential)

| Priority | Industry | Budget Range | Key AI Use Case |
|----------|----------|-------------|-----------------|
| 1 | Healthcare & Life Sciences | $20K-$500K+ | RCM, patient comms, clinical docs |
| 2 | Financial Services (BFSI) | $25K-$750K+ | KYC/AML, claims, credit scoring |
| 3 | Software / SaaS / Tech | $15K-$300K+ | Support agents, copilots, DevOps |
| 4 | Retail & E-Commerce | $10K-$250K+ | Recommendations, support, catalog AI |
| 5 | Manufacturing | $15K-$300K+ | Maintenance, quality, SOP agents |
| 6 | Logistics & Supply Chain | $10K-$250K+ | BOL processing, route AI, comms |
| 7 | Legal / Professional Services | $5K-$150K+ | Contract review, research, intake |
| 8 | Travel & Hospitality | $10K-$100K+ | Booking AI, itinerary, revenue mgmt |
| 9 | Education / EdTech | $5K-$100K+ | AI tutors, LMS, adaptive learning |
| 10 | Real Estate / PropTech | $5K-$150K+ | Lead qualification, portfolio ops |

---

## Geographic Strategy

### USA (55% of ad budget)
- **Positioning**: "Silicon Valley quality at 60% less"
- **Pricing**: $5K-$250K+ (USD only)
- **Key cities**: SF, NYC, Seattle, Austin, Boston
- **Compliance**: SOC2, HIPAA, BAA-ready
- **Timezone**: 4-8hr overlap EST/PST
- **Landing page**: `/kw/ai-software-development-usa`

### Dubai/UAE (20% of ad budget)
- **Positioning**: "DIFC-compliant AI for UAE enterprises"
- **Pricing**: AED 35K-750K+ / $10K-$200K+
- **Key zones**: DIFC, ADGM, Dubai AI Campus
- **Compliance**: DFSA, DHA, ADGM standards
- **Timezone**: 1.5hr gap (IST ↔ GST)
- **Landing page**: `/kw/ai-software-development-dubai`

### India (25% of ad budget)
- **Positioning**: "AI-native development at ₹1.5L-₹1Cr+"
- **Pricing**: ₹1.5L-₹1Cr+ (INR)
- **Key cities**: Bengaluru, Delhi-NCR, Mumbai, Hyderabad, Pune
- **Target**: GCCs, enterprises, funded startups
- **Landing page**: Homepage + `/kw/*` pages

---

## Outreach Automation (Revenue Engine)

### Prospect Signals (Who to Target)
1. **"AI Pilot to Production"**: Hiring AI engineer/MLOps but can't execute
2. **"Ops Efficiency"**: Support-heavy, back-office-heavy businesses
3. **"Growth After Funding"**: Newly funded startups needing fast delivery

### Outreach Cadence (Automated)
- Day 1: Personalized email/LinkedIn (signal-based)
- Day 3: Value-add follow-up with mini workflow audit
- Day 6: 3-line use-case note
- Day 9: Case study or ROI message
- Day 12: Close-the-loop message

### Never Auto-Send
All outbound requires human approval before sending. AI drafts, human approves.

---

## Key Principles

### 1. Sell Systems, Not Services
- "We don't sell development. We sell automated business systems powered by AI."
- Every project ships as a SYSTEM, not a one-off build.

### 2. AI-Native, Not AI-Added
- Every product has AI built into the core architecture from Sprint 1.
- Not bolted on later as an upgrade.

### 3. Preview Before Payment
- Free prototype in 48 hours.
- Client sees working software before paying anything.
- Money-back deadline guarantee.

### 4. Who Not How
- AI agents are the "Who" — they do the work.
- Humans are architects and supervisors — they review and approve.
- Never do ₹200/hour work when your time is worth ₹10,000/hour.

### 5. 10x Thinking
- 10x goals force you to find "Whos" (AI agents) instead of doing everything yourself.
- Can't grow to ₹1000 Cr doing everything manually.
- Every repetitive task → automate or delegate.

### 6. Guaranteed Delivery
- Fixed-price contracts.
- Milestone-based billing.
- Money-back on missed deadlines.
- Contracted accuracy benchmarks for AI systems.

---

## Tech Stack (Production)

### Primary Development Tool
- **Claude Code (VS Code Extension)** — THE development tool. No developer writes code manually. Every line is prompted and instructed through Claude Code.

### Development
- **Next.js** — all web apps, SaaS, landing pages, dashboards
- **Tailwind CSS** — all styling, no custom CSS unless required
- **React Native / Flutter** — mobile apps
- **Node.js / Python** — backend APIs, AI pipelines
- **TypeScript** — strict mode everywhere

### Database
- **MongoDB Atlas** — primary database for all projects
- **Pinecone / pgvector** — vector storage for RAG systems

### Authentication
- **NextAuth.js** — all auth (Google, GitHub, email, credentials)

### Deployment & Hosting
- **Vercel** — primary hosting for Next.js apps (auto-deploy from GitHub)
- **Netlify CLI** — secondary hosting, current landing page (`netlify deploy --prod`)
- **Railway** (`railway up`) — backend services, Python APIs, n8n, databases
- **GitHub Actions** — CI/CD pipelines

### AI & LLM
- OpenAI GPT-4o/5.4, Claude (Anthropic), Gemini (Google), Llama 3, Mistral
- LangChain, LlamaIndex, CrewAI, AutoGen
- Vercel AI SDK — streaming AI responses in Next.js

### Automation
- n8n (self-hosted on Railway) — primary workflow engine
- Make — client-facing automation
- Custom API orchestration

### Communication
- Mailgun (email — domain: hello.rdmi.in)
- WhatsApp Business API
- Twilio (voice AI agents)
- Slack/Teams integration

### Monitoring
- GA4 (G-MNG2DGKSZV), Google Ads conversion tracking
- Custom KPI dashboards
- Agent performance monitoring

---

## Prompt-First Development (Zero Manual Code)

### The Rule
> **No developer writes a single line of code. Every line is prompted and instructed through Claude Code.**

### How It Works
1. **Architect prompts** → Claude Code generates code
2. **Review output** → approve or refine with follow-up prompts
3. **Test** → Claude Code runs tests, fixes issues
4. **Ship** → Claude Code commits, pushes, deploys

### Prompt Library (Reusable Instructions)

#### Project Setup
```
Create a Next.js 16 app with TypeScript strict mode, Tailwind CSS, NextAuth.js
(Google + credentials), MongoDB Atlas connection via Mongoose, and deploy to
Vercel. Use src/ directory, app router, path alias @/*. Add .env.local template.
```

#### SaaS MVP
```
Build a multi-tenant SaaS with: NextAuth (Google + email), MongoDB Atlas,
Stripe subscription billing (3 tiers), admin dashboard, user dashboard,
role-based access (admin/user/viewer), API rate limiting, and Vercel deployment.
Include seed data script.
```

#### AI Chatbot
```
Build a RAG chatbot using LangChain + OpenAI + Pinecone. Features: document
upload (PDF/DOCX), chunk + embed on upload, conversational retrieval with
source citations, chat history in MongoDB, streaming responses via Vercel AI
SDK, and a clean chat UI with Tailwind. Deploy frontend to Vercel, backend
to Railway.
```

#### AI Agent Workflow
```
Build an autonomous AI agent using LangChain + CrewAI that: reads incoming
emails via Gmail API, classifies intent, extracts key data, drafts responses,
updates MongoDB CRM collection, and sends approved responses via Mailgun.
Include human-in-the-loop approval queue UI in Next.js. Deploy to Railway.
```

#### E-Commerce
```
Build a Shopify-like e-commerce platform with: Next.js storefront, MongoDB
Atlas (products, orders, users), Razorpay + Stripe payments, admin panel
with inventory management, product search with Algolia, and mobile-responsive
Tailwind UI. Deploy to Vercel.
```

#### Mobile App
```
Build a cross-platform mobile app with Flutter. Features: Firebase Auth,
MongoDB Atlas backend via REST API (Node.js on Railway), push notifications,
in-app payments (Razorpay), offline mode, and responsive UI. Include both
iOS and Android build configs.
```

#### Landing Page (Like This Project)
```
Build a high-converting landing page with Next.js 16, Tailwind CSS, dark theme.
Sections: Hero with background image, Stats, Services grid, AI Capabilities,
Process steps, USP with images, Portfolio gallery, FAQ accordion, CTA with
background image, Footer. Include QuoteModal with Mailgun email, GA4 tracking,
floating WhatsApp widget, exit-intent popup. SEO optimized with keyword-rich
H1/H2/meta. Deploy to Netlify via GitHub Actions.
```

#### Workflow Automation
```
Build an n8n workflow that: triggers on new form submission (webhook),
scores lead (1-10 via OpenAI), routes hot leads to WhatsApp alert +
calendar booking, sends personalized email sequence via Mailgun (day 1,
3, 6, 9), updates MongoDB lead collection, and posts to Slack channel.
Deploy n8n to Railway.
```

### Prompt Best Practices
- **Be specific**: Include tech stack, features, deployment target
- **Reference existing patterns**: "Use the same card pattern as ProductShowcase.tsx"
- **Include constraints**: "No framer-motion, use CSS animations only"
- **Specify output**: "TypeScript strict, ESLint clean, production build passes"
- **Include data**: Paste actual content, keywords, pricing into prompts
- **Iterate**: Start with scaffold → add features → refine → ship

---

## Client Acquisition Engine

### Channel 1: Google Search Ads (Primary)
**Goal**: Capture existing high-intent demand

**Structure** (from CLAUDE.md):
- Campaign 1: Custom Software Development (₹1,500-3,000/day)
- Campaign 2: App Development (₹1,000-2,000/day)
- Campaign 3: SaaS & MVP (₹800-1,500/day)
- Campaign 4: AI & ML (₹800-1,500/day)
- Campaign 5: Enterprise & E-Commerce (₹800-1,500/day)
- Campaign 6: Retargeting (₹500-1,000/day)

**Keyword-to-Landing-Page Match** (10/10 Quality Score):
- Each ad group → dedicated `/kw/<slug>` landing page
- Ad headline matches landing page H1 exactly
- 8 live landing pages targeting 471 keywords
- Geo-specific pages: USA, Dubai, India

**Conversion Flow**:
Ad click → Landing page → CTA click → Quote modal → Form submit → /thank-you (GA4 conversion fires) → Welcome email → Developer calls in 2 hours

### Channel 2: AI-Powered Email Outreach (Revenue Engine)
**Goal**: Create demand where it doesn't exist yet

**How It Works**:
1. **Signal Detection** (automated): Monitor LinkedIn for AI hiring, funding announcements, product launches
2. **AI Drafts Email** (Claude API): Personalized cold email mentioning specific company signal + one workflow improvement
3. **Human Approves** (mandatory): No auto-sending. Ever.
4. **Send via Mailgun**: Tracked, personalized, branded
5. **Follow-Up Sequence**: Day 1 → Day 3 (value-add) → Day 6 (use case) → Day 9 (case study) → Day 12 (close loop)

**Email Template (AI-Generated, Human-Approved)**:
```
Subject: Idea to automate [specific workflow] at [Company]

Hi [Name] — noticed [signal: hiring AI engineer / expanding ops / launching product].

We help teams turn AI ideas into shipped systems: AI agents, workflow automation,
and custom internal tools.

One use case I'd explore for [Company]: [specific workflow] — e.g. reduce manual
[support/onboarding/reporting] work by connecting [tool 1] + [tool 2] + an AI layer.

If useful, I can send a 5-bullet teardown with scope, risks, and a rough
implementation path. No pitch deck unless you want one.

— Ranjit, RDMI AI
```

**Volume**: 50 personalized emails/market/week = 150 total. Quality > quantity.

### Channel 3: Content & SEO (Long-Term)
- Weekly blog posts (AI-generated, human-edited) targeting long-tail keywords
- Case study pages per industry (NDA-compliant)
- Free tools on website (SEO score calculator, ROI calculator, ads grader)
- SEO Course (/seo-course) as lead magnet

---

## Sales Model: Sell ROI, Not Hours

### What We Sell
> "We don't sell development hours. We sell revenue and cost savings — guaranteed."

### The RDMI Guarantee Stack
1. **Preview Before Payment**: Free clickable prototype in 48 hours. Don't love it? Walk away. ₹0.
2. **Fixed-Price Contracts**: The quote IS the final bill. No hourly billing. No scope creep charges.
3. **Money-Back Deadline Guarantee**: Miss the agreed deadline? Client gets refund. No fine print.
4. **Contracted AI Benchmarks**: Deflection ≥70%, accuracy ≥90% — whatever matters. Not met? We iterate free.
5. **100% Code Ownership**: NDA from day one. Full IP transfer. Zero lock-in. Client takes everything.

### ROI-First Proposal Structure
Every proposal includes:
1. **Current Cost** — what the client spends today (manual labor, SaaS subscriptions, lost revenue)
2. **RDMI Solution Cost** — fixed-price build
3. **Projected Savings/Revenue** — what the AI system generates in Year 1
4. **ROI Timeline** — when the investment pays back (typically 60-90 days for AI agents)
5. **Guarantee** — what happens if we underperform

Example:
```
Current: 3 support staff at ₹4L/year each = ₹12L/year
RDMI AI Chatbot: ₹5L one-time build
Year 1 savings: ₹8L-10L (chatbot handles 80% of tickets)
ROI payback: 7 months
Guarantee: ≥70% deflection or we iterate free
```

### Show Before Commit Model
```
Day 0: Client submits inquiry
Day 0: Senior developer/AI engineer calls (within 2 hours)
Day 1-2: Free clickable prototype delivered
Day 2: Client reviews prototype
    → Love it? Sign contract, we start. ₹0 paid so far.
    → Don't love it? Walk away. Zero cost. Zero obligation.
Day 3+: Sprint development begins (2-week cycles with demos)
```

---

## The Founder's Role (Critical)

You are NOT:
- A developer (Claude Code writes the code)
- An operator (AI agents run operations)
- A project manager (systems manage projects)

You ARE:
- **System Architect** — design prompts, instructions, and AI agent workflows
- **Deal Closer** — close high-ticket clients on ROI-based proposals
- **Vision Setter** — ₹1000 Cr direction, market positioning, partnerships

**Buy Back Your Time**: If a task is below ₹10,000/hour value → AI agent does it or it doesn't get done.

**The Leverage Stack**:
- Claude Code writes all code (leverage: code)
- AI agents run operations (leverage: automation)
- Landing pages capture leads 24/7 (leverage: media)
- Google Ads + outreach generate pipeline (leverage: capital)

---

## Reading List (Applied to RDMI)

| Book | How to Apply |
|------|-------------|
| **Buy Back Your Time** | Calculate hourly value. Delegate everything below it. |
| **10x Is Easier Than 2x** | ₹1000 Cr forces AI agents, not manual work. |
| **Who Not How** | Every task → "Which AI agent?" not "How do I?" |
| **Traction (EOS)** | Systems + accountability for multi-project delivery. |
| **Zero to One** | Build monopoly position in AI-native software delivery. |
| **The Almanack of Naval** | Wealth = leverage (code, capital, AI agents). |
| **Essentialism** | Say NO to everything that doesn't scale to ₹1000 Cr. |

---

## Team Structure: 5 Humans + Unlimited AI

### The 5-Person AI-Augmented Team
Each human operates with 5-10x leverage via AI tools. A 5-person RDMI team outperforms a 50-person traditional agency.

| Role | Person | AI Multiplier | Effective Output |
|------|--------|--------------|-----------------|
| **System Architect / CEO** | Founder | Claude Code + AI Agents | Designs systems, closes deals, sets vision |
| **AI Engineer** | Senior Dev | Claude Code + LangChain + CrewAI | Builds AI agents, RAG systems, workflows — via prompts |
| **Full-Stack Engineer** | Senior Dev | Claude Code + Vercel + Railway | Ships web/mobile/SaaS apps — via prompts, no manual code |
| **Ops & Delivery Lead** | Ops | n8n + AI agents + dashboards | Manages client delivery, QA, deployment, handover |
| **Growth & Outreach** | Marketing | Claude API + Google Ads + Mailgun | Runs ads, drafts outreach (AI), manages pipeline |

### How 5 People Beat 50
- Traditional agency: 50 people → 10 projects/month → ₹50L/month
- RDMI (5 people + AI): 5 people → 20+ projects/month → ₹2-3Cr/month

**The math**: Each person does 10x work because:
1. Claude Code writes all code (saves 300+ hours/month per dev)
2. AI agents handle proposals, follow-ups, testing, docs (saves 200+ hours/month)
3. n8n automates client communication, lead routing, reporting (saves 100+ hours/month)
4. Prompt library = reusable patterns (every new project starts 60% done)

### Scaling Model (Forward-Thinking)
```
Phase 1 (Now): 5 humans + AI → 20 projects/month → ₹2Cr/month
Phase 2 (6 months): 10 humans + AI → 50 projects/month → ₹5Cr/month
Phase 3 (12 months): 20 humans + AI → 100+ projects/month → ₹10Cr+/month
Phase 4 (24 months): 50 humans + AI → Platform + services → ₹50Cr+/month
```

Each new hire is an **AI-augmented operator**, not a traditional developer:
- Every engineer uses Claude Code (zero manual coding)
- Every ops person uses AI agents (zero manual reporting)
- Every marketer uses AI outreach (zero generic cold emails)

### Hiring Criteria
- Must be comfortable with prompt-first development
- Must think in systems, not tasks
- Must deliver 10x output vs traditional role
- Senior only — no juniors, no training overhead
- Remote-first, async-friendly, outcome-measured

### Competitive Advantage: Why RDMI Outranks Traditional Agencies
| Traditional Agency | RDMI AI |
|---|---|
| 50 developers write code manually | 5 people prompt Claude Code |
| 2-week sprints, 3-month delivery | 1-week sprints, 4-8 week delivery |
| Generic proposals in 3-5 days | AI-generated proposals in 2 hours |
| ₹8K-15K/hour billing | Fixed-price, ROI-guaranteed |
| Sell development hours | Sell revenue and cost savings |
| Tools collection | Integrated AI system |
| Reactive to client requests | Proactive with AI-powered insights |
| Scale by hiring more people | Scale by building better AI agents |

---

## Success Metrics

| Metric | Current | Phase 1 Target | Phase 3 Target |
|--------|---------|---------------|---------------|
| Team size | 5 | 5 (same) | 10-20 |
| Lead response time | 2-4 hours | <30 min (auto) | <5 min (auto) |
| Proposal turnaround | 2-3 days | 2 hours (auto) | 30 min (auto) |
| Projects/month | 3-5 | 15-20 | 50+ |
| Revenue/month | ₹15-25L | ₹1-2Cr | ₹5-10Cr |
| Human hours/project | 400-600 | 100-200 | 50-100 |
| Client satisfaction | 4.5/5 | 4.7/5 | 4.9/5 |
| Repeat clients | 40% | 60% | 80%+ |
| Code written by AI | 30% | 70% | 90%+ |
| Outreach personalization | Manual | AI-drafted, human-approved | Fully AI with approval gate |

---

## 5-Year Scale Plan: RDMI → Accenture-Scale AI Company

### Why This Is Possible Now (Age of AI)
Accenture took 30 years to reach $60B+ revenue with 700K+ employees. In the AI era, the same scale is achievable in 5 years with 1/100th the headcount because:
- AI agents replace 80% of traditional consulting/dev work
- Prompt-first development = 10x faster delivery per person
- Platform + templates = near-zero marginal cost per project
- AI compounds — every project makes the system smarter

### The 5-Year Trajectory (Aggressive — AI Compounds Exponentially)

AI capability doubles every 6 months. What takes 5 people today will take 1 person in 18 months. The window to build an AI-native services empire is 2025-2027 — after that, the moat is built or it's too late.

```
Q1 2026 (Now):     5 people  →  ₹50L/month     →  ₹6Cr/year run rate
Q3 2026:          15 people  →  ₹5Cr/month     →  ₹60Cr/year run rate
Q1 2027:          50 people  →  ₹20Cr/month    →  ₹240Cr/year run rate
Q3 2027:         150 people  →  ₹60Cr/month    →  ₹720Cr/year run rate
Q1 2028:         400 people  →  ₹150Cr/month   →  ₹1,800Cr/year
Q1 2029:       1,000 people  →  ₹400Cr/month   →  ₹5,000Cr/year
Q1 2030:       2,500 people  →  ₹1,000Cr/month →  ₹12,000Cr/year
```

### Year 1 (2026) — BLITZ: ₹6Cr → ₹240Cr/year

**Q1 (Now → June 2026): Prove & Close**
- 5 people, 100% AI-augmented
- Ship 15-20 projects/month via Claude Code + AI agents
- Build prompt library to 200+ battle-tested instructions
- Close first $50K+ USA deal and first AED 100K+ Dubai deal
- Google Ads live on all 8 landing pages, ₹5K/day budget
- AI email outreach: 150 personalized emails/week
- Revenue target: ₹50L → ₹2Cr/month by June

**Q2 (July → Sept 2026): Scale Revenue**
- 5 → 15 people (3 AI engineers, 2 full-stack, 2 ops, 3 growth)
- Launch 3 vertical packages: Healthcare AI, FinTech AI, E-Commerce AI
- White-label delivery for 2-3 partner agencies (instant 3x pipeline)
- Internal template library: every project starts 70% pre-built
- AI proposal agent live: proposals in 30 min, not 2 hours
- Revenue target: ₹2Cr → ₹5Cr/month by September

**Q3-Q4 (Oct 2026 → Mar 2027): Dominate**
- 15 → 50 people across India + USA (remote)
- Enterprise sales team: 3 closers for $100K+ deals
- Managed AI retainers: 30+ clients on $2K-$10K/month recurring
- Proprietary prompt library: 500+ instructions, refined across 200+ delivered projects
- Revenue target: ₹5Cr → ₹20Cr/month by March 2027

### Year 2 (2027) — DOMINATE VERTICALS: ₹240Cr → ₹1,800Cr/year

- 50 → 400 people, AI does 85% of delivery, humans architect + manage relationships
- Industry-specific delivery teams: Healthcare AI, BFSI AI, Legal AI, Logistics AI, Retail AI, EdTech AI
- Each vertical team: 3-5 AI-augmented engineers + 1 industry expert + 1 account manager
- SOC2 Type II, HIPAA, ISO 27001 certified
- Offices: India (3 cities), USA (NYC, SF), Dubai (DIFC)
- Government contracts: India (IndiaAI), UAE (Dubai AI initiatives)
- Acquire 2-3 smaller AI agencies for talent + client base
- 200+ managed AI retainer clients ($2K-$15K/month each = ₹40Cr+/year recurring)
- White-label delivery for 20+ partner agencies worldwide
- Revenue: ₹240Cr → ₹1,800Cr/year

### Year 3-5 (2028-2030) — EMPIRE: ₹1,800Cr → ₹12,000Cr/year

- 2,500 people, 90%+ delivery by AI, humans = architects + relationship managers + deal closers
- Proprietary AI delivery system trained on 10,000+ completed projects — unmatched speed
- Enterprise accounts: 50+ clients on $500K+/year managed AI contracts
- Global presence: 15+ countries, partnerships with Big 4 consulting for AI execution
- Revenue mix: 60% project delivery + 40% managed AI retainers (recurring)
- The new Accenture — but 100x more profitable per employee because AI does the work
- Revenue: ₹12,000Cr/year ($1.4B+)

### The Unfair Advantage
Traditional agencies scale linearly: 2x people = 2x revenue.
RDMI scales exponentially: AI agents + prompt library + reusable templates = **10x revenue per person added**.

Every project makes RDMI smarter:
- New prompt patterns → faster future delivery
- New industry knowledge → better proposals
- New workflows → reusable templates
- More data → better AI agents

**This is the compounding moat that Accenture/Cognizant cannot replicate** — they have 700K people writing code manually. RDMI has AI agents that learn from every project.

---

## SOPs (Standard Operating Procedures)

Every process at RDMI is documented as an SOP. SOPs are written by AI (Claude), reviewed by humans, and stored in this repo. When a new team member joins, they follow SOPs — not tribal knowledge.

### SOP 1: New Lead → Closed Deal
```
1. Lead arrives (form, WhatsApp, email, ad click)
2. AI auto-scores lead (1-10) based on budget, industry, message quality
3. Hot (8-10): WhatsApp alert + developer assigned within 30 min
4. Warm (5-7): AI sends personalized follow-up email within 2 hours
5. Cold (1-4): Added to nurture sequence (7-day email drip)
6. Developer/AI engineer calls lead (within 2 hours for Hot)
7. Strategy Agent generates project plan + cost estimate
8. Proposal Agent creates branded proposal (30 min)
9. Human reviews proposal, sends to client
10. Client reviews prototype (free, 48 hours)
11. Client approves → NDA signed → Sprint 1 starts
12. Client declines → tagged in CRM → retarget in 30 days
```

### SOP 2: Project Delivery (Sprint Cycle)
```
1. Dev Architect Agent creates sprint plan from approved SOW
2. Tasks created in Linear/GitHub Issues
3. Engineer prompts Claude Code for each task (no manual coding)
4. PR created → human code review → merge
5. QA Agent runs automated tests (every PR)
6. Sprint demo to client (every 2 weeks)
7. Client feedback → next sprint backlog
8. Repeat until launch
9. Delivery Agent: deploy, docs, handover, Loom walkthrough
10. 30-60 day post-launch support begins
```

### SOP 3: Content & Marketing
```
1. Every Monday: AI generates 3 blog post drafts (targeting long-tail keywords)
2. Human reviews + publishes 1-2 per week
3. Every Monday: AI drafts 5 LinkedIn posts from blog content
4. Every Wednesday: AI generates 50 personalized outreach emails
5. Human reviews → approves → Mailgun sends
6. Every Friday: Review Google Ads performance → pause losers → scale winners
7. Monthly: New landing page for trending keyword group
```

### SOP 4: Client Communication
```
1. Dedicated Slack/WhatsApp channel per client (created on Day 1)
2. Daily async update (Loom or text — what was done, what's next, any blockers)
3. Weekly 30-min video standup (same time every week)
4. Sprint demo at end of each 2-week sprint
5. Client can message anytime — response within 2 hours during business hours
6. Escalation: if client is unhappy → founder gets notified within 1 hour
```

---

## Ad Copy & Landing Page Playbook

### How to Create a New Landing Page (for any keyword group)
```
1. Open CSV from Google Keyword Planner
2. Claude Code: "Read this CSV, find top 10 high-intent keywords with CPC > ₹100
   and volume > 500. Group them by theme. Suggest a slug, H1, and meta description."
3. Claude Code: "Add a new keyword group to src/data/keyword-groups.ts with these
   keywords. Use the same structure as existing groups. Make copy ROI-focused with
   specific numbers. Include images, process steps, 8 FAQs, and 6 services."
4. Build and test: `npm run dev` → preview → `npm run build`
5. Push to main → auto-deploys to Netlify
6. Add keywords to Google Ads campaign (phrase + exact match)
7. Point ad group to new landing page URL
```

### Ad Copy Formula (10/10 Quality Score)
```
Headline 1 (30 chars): [Primary keyword] + India/USA/Dubai
Headline 2 (30 chars): Save 50% / Talk to Devs / AI-First
Headline 3 (30 chars): Free Quote in 2 Hours
Description 1 (90 chars): [Result] + [Differentiator] + [CTA]
Description 2 (90 chars): [Social proof] + [Guarantee] + [Budget range]

Rule: Ad headline MUST appear in landing page H1.
Rule: Landing page URL MUST contain primary keyword.
Rule: Every ad group → 1 dedicated landing page. Never share.
```

### Keyword CSV Analysis Prompt
```
Read the attached CSV from Google Keyword Planner. For each keyword:
1. Filter: CPC > ₹100, Volume > 500
2. Group by commercial intent theme
3. Rank groups by (volume × CPC) = revenue potential
4. For top 5 groups, suggest: slug, H1, target keywords, match type
5. Flag any keywords that overlap with existing groups in CLAUDE.md
6. Identify long-tail keywords (4+ words) with low competition
```

---

## HR & People Operations

### Job Description Templates (AI-Generated)

#### AI Engineer JD
```
Role: AI Engineer (Prompt-First Development)
Company: RDMI Tech Ventures Pvt. Ltd.
Location: Remote (India) / Hybrid (Delhi NCR)

What You'll Do:
- Build production AI agents, RAG systems, and workflow automation
- Use Claude Code — you prompt, AI writes code, you review
- Ship 3-5 AI projects/month using LangChain, CrewAI, OpenAI APIs
- Work directly with clients (no PM layer between you and the customer)

Requirements:
- 3+ years Python/Node.js + AI/ML experience
- Hands-on with LangChain, OpenAI API, or similar
- Comfortable with prompt-first development (Claude Code, Cursor, Copilot)
- Can ship production code, not just notebooks
- Strong English communication (you'll talk to US/UAE clients directly)

We Offer:
- Work on cutting-edge AI (not CRUD apps)
- Remote-first, async-friendly
- Performance-based pay (top performers earn 2-3x market)
- Direct access to founder — no corporate hierarchy
- Every tool you need: Claude Code, GPT-5, all premium AI subscriptions
```

#### Full-Stack Engineer JD
```
Role: Full-Stack Engineer (AI-Augmented)
What You'll Do:
- Ship web apps, mobile apps, SaaS platforms using Claude Code
- You prompt, review, and ship — not write boilerplate manually
- Tech: Next.js, React, Node.js, Flutter, MongoDB Atlas, Vercel, Railway
- 3-5 projects/month alongside AI tools

Requirements:
- 3+ years React/Next.js + Node.js
- Comfortable letting AI write code while you architect and review
- Can deploy to Vercel, Railway, and manage CI/CD
- Strong communication — you'll demo directly to clients
```

### Employee Onboarding SOP
```
Day 1:
- NDA + employment agreement signed
- Access: GitHub (private repos only), Slack, Linear, Claude Code license
- Read: RDMI-AI-MASTER-PROJECT.md (this file)
- Read: CLAUDE.md (project conventions)
- Setup: Claude Code VS Code extension, Vercel CLI, Railway CLI, Netlify CLI

Day 2-3:
- Shadow a senior engineer on a live project
- Complete 3 practice prompts from the Prompt Library
- Ship a small feature using Claude Code (reviewed by senior)

Day 4-5:
- Assigned to first real client project (junior tasks, reviewed by senior)
- First client interaction (observe, then participate)
- Feedback session with founder

Week 2:
- Independent sprint tasks (still reviewed)
- First solo client demo (with senior backup)
```

### HR Email Templates

#### Offer Letter Email
```
Subject: Welcome to RDMI AI — Offer Letter Enclosed

Hi [Name],

Congratulations! We're excited to offer you the role of [Role] at RDMI Tech Ventures Pvt. Ltd.

Key details:
- Role: [Role]
- CTC: ₹[X] LPA (performance bonuses additional)
- Start date: [Date]
- Location: Remote / [Office]
- Reporting to: [Name]

Please find your offer letter attached. Sign and return by [Date].

What makes RDMI different:
- You'll use AI (Claude Code) to write code — we value thinking over typing
- You'll talk to clients directly — no PM layer
- Performance-based culture — top performers earn 2-3x
- Every AI tool subscription provided (Claude, GPT-5, Copilot, etc.)

Looking forward to building the future with you.

— RDMI Tech Ventures Pvt. Ltd.
info@rdmi.in | +91 98185 65561
```

#### Rejection Email
```
Subject: Update on your application — RDMI AI

Hi [Name],

Thank you for your interest in RDMI and the time you invested in our process.

After careful consideration, we've decided to move forward with another candidate whose experience more closely matches our current needs.

This doesn't reflect on your abilities — our bar is exceptionally high because we hire senior-only and expect AI-augmented output from day one.

We'd love to stay connected. If a better-fit role opens, we'll reach out.

Best,
RDMI Tech Ventures Pvt. Ltd.
```

#### Performance Warning Email
```
Subject: Performance Discussion — Action Required

Hi [Name],

This is a formal note following our conversation on [Date] about performance expectations.

Areas requiring improvement:
- [Specific metric/behavior 1]
- [Specific metric/behavior 2]

Expected improvement:
- [Specific target] by [Date]

Support provided:
- [Training/mentorship/tools offered]

Next review: [Date]. If targets are not met, we will discuss next steps including potential separation.

Please acknowledge receipt of this email.

— [Manager Name], RDMI Tech Ventures Pvt. Ltd.
```

---

## Employee Handbook (Core Policies)

### 1. Code of Conduct
- Client NDA is sacred — breach = immediate termination + legal action
- All code lives in RDMI GitHub repos — never personal accounts
- No client data on personal devices or personal cloud storage
- All communication via official channels (Slack, email) — never personal WhatsApp for client work

### 2. IP & Non-Compete Protection
- All work product belongs to RDMI Tech Ventures Pvt. Ltd.
- Employees sign IP assignment + non-compete (12 months, same industry)
- No freelancing for competing services during employment
- No soliciting RDMI clients for 24 months after departure
- Source code access revoked within 1 hour of separation

### 3. Preventing Employee Theft / Copying
> This is critical. The #1 risk in a services company is employees stealing clients, code, or processes.

**Technical Controls:**
- GitHub repos: branch protection, no force push, audit logs enabled
- All commits tied to RDMI GitHub accounts (not personal)
- No local code storage — everything in cloud repos
- Vercel/Railway/Netlify credentials: team accounts, not personal
- MongoDB Atlas: IP whitelisting, role-based access, audit logs
- Claude Code: company license, usage tracked
- All client credentials in 1Password team vault — never shared directly

**Process Controls:**
- No single person has full access to any client's entire system
- Separation of duties: dev builds, ops deploys, founder holds keys
- Client relationships owned by RDMI (founder on every client Slack/WhatsApp)
- Proposals, SOWs, invoices sent from RDMI email (info@rdmi.in) — never personal
- All client calls recorded (with consent) for quality and protection
- Exit interview + access revocation checklist (mandatory, same day)

**Legal Controls:**
- Employment agreement with IP assignment clause
- Non-compete: 12 months, same industry, same geography
- Non-solicitation: 24 months for RDMI clients
- Confidentiality: perpetual, survives termination
- Penalty clause for breach: ₹10L-50L depending on severity

**Cultural Controls (Who Not How):**
- Pay top-of-market (people don't steal when they're well compensated)
- Give ownership and growth (people don't leave when they see upside)
- Transparent revenue sharing for senior roles
- Build loyalty through mission, not control
- "If you want to start your own thing, tell us — we might fund you instead"

### 4. Work Hours & Leave
- Core hours: 10am-2pm IST (for overlap with Dubai/USA clients)
- Flexible otherwise — output measured, not hours
- Unlimited PTO (with 2 weeks minimum per year)
- No meetings before 10am or after 7pm IST unless client-critical

### 5. Performance Review
- Monthly 1:1 with direct manager
- Quarterly performance review (metrics-based)
- Metrics: projects shipped, client satisfaction, code quality, revenue generated
- Top performers: bonus + promotion + equity discussion
- Underperformers: 30-day improvement plan → separation if no improvement

### 6. Tools Provided (Company Paid)
- Claude Code (VS Code Extension) — unlimited
- Claude Pro / ChatGPT Plus / Gemini Advanced
- GitHub Copilot
- Cursor Pro
- Vercel Pro, Railway, Netlify
- MongoDB Atlas
- Slack, Linear, Notion
- Figma
- Loom Business
- 1Password Teams
- Any other tool needed — just ask

---

## Book Principles → RDMI Implementation

### Who Not How (Dan Sullivan & Benjamin Hardy)
| Principle | RDMI Implementation |
|-----------|-------------------|
| Ask "Who can do this?" not "How do I do this?" | Every task → which AI agent handles it? |
| Free your time from $10/hour tasks | Founder only does >₹10,000/hour work (deals, architecture, vision) |
| Invest in people, not in doing | Hire 5 senior A-players, give them AI tools, let them 10x |
| Results, not effort | Pay for output (projects shipped) not input (hours worked) |

### Buy Back Your Time (Dan Martell)
| Principle | RDMI Implementation |
|-----------|-------------------|
| Calculate your buyback rate | Founder: ₹10,000/hr. Anything below → AI agent or delegate |
| Replacement Ladder: VA → Specialist → Manager | AI Agent → Senior Engineer → Ops Lead → Founder only for deals |
| Energy audit: delete, delegate, design | Delete: manual proposals, repetitive emails. Delegate to AI: code, testing, docs. Design: systems, client relationships |
| Don't hire to fill seats, hire to free yourself | Each hire must free 20+ hours/week of founder time |

### 10x Is Easier Than 2x (Dan Sullivan & Benjamin Hardy)
| Principle | RDMI Implementation |
|-----------|-------------------|
| 10x forces "Who" thinking, 2x keeps you in "How" | ₹1000Cr target is impossible with manual work → forces AI agents |
| Drop the 80% that doesn't serve 10x | Stop: small projects <₹1L, hourly billing, manual proposals |
| 10x requires entirely new capabilities | Build: AI delivery system, prompt library, automated outreach |
| Quality > Quantity at 10x | 20 high-ticket projects/month > 100 small freelance gigs |

### Zero to One (Peter Thiel)
| Principle | RDMI Implementation |
|-----------|-------------------|
| Create monopoly, don't compete | Monopoly: AI-native services company (nobody else has this delivery speed) |
| Start small, dominate, then expand | Start: AI agents for healthcare + BFSI → expand to all industries |
| Proprietary technology = moat | Moat: 500+ prompt library + reusable templates + delivery system trained on 200+ projects |
| Definite optimism | RDMI will be ₹10,000Cr company — plan backward from that |

### The Almanack of Naval Ravikant
| Principle | RDMI Implementation |
|-----------|-------------------|
| Wealth = leverage (code, capital, media, labor) | Code: Claude Code writes all software. Capital: Google Ads. Media: Landing pages + content. Labor: 5 AI-augmented people |
| Specific knowledge + accountability + leverage | Specific knowledge: AI delivery at speed. Accountability: founder's name on every deal. Leverage: AI agents |
| Build something that works while you sleep | AI chatbots, landing pages, email sequences — all work 24/7 |
| Earn with your mind, not your time | Founder designs systems, doesn't write code or manage tasks |

### Essentialism (Greg McKeown)
| Principle | RDMI Implementation |
|-----------|-------------------|
| Less but better | 5 people doing 10x work > 50 people doing 1x work |
| Say NO to everything that isn't essential | NO: small projects, hourly billing, scope creep, clients who don't value AI |
| Trade-offs are real — choose deliberately | Trade-off: fewer clients, higher ticket, better delivery, more profit |
| Routine enables creativity | SOPs for everything repetitive → frees brainpower for strategy |

### Traction (Gino Wickman — EOS)
| Principle | RDMI Implementation |
|-----------|-------------------|
| Vision, People, Data, Issues, Process, Traction | Vision: ₹10,000Cr AI services company. People: 5 A-players. Data: revenue, projects, satisfaction. Process: SOPs above. Traction: weekly scorecard |
| Rocks (90-day priorities) | Q1 Rock: Ship 15 projects, close first $50K deal, launch AI email outreach |
| Weekly L10 meeting | Every Monday: founder + 5 team → 90 min. Scorecard, rocks, issues, to-dos |
| Right people, right seats | AI Engineer builds agents. Full-Stack ships apps. Ops delivers. Growth acquires. Founder architects + closes |

---

## Weekly Execution Rhythm

### Monday: Plan & Align
- 10am IST: L10 meeting (founder + team, 90 min)
- Review: last week's scorecard (projects shipped, revenue, leads, satisfaction)
- Set: this week's priorities (rocks, blockers, decisions)
- AI generates: 3 blog drafts, 50 outreach emails, Google Ads report

### Tuesday-Thursday: Build & Ship
- Engineers: prompt Claude Code, review PRs, ship features
- Ops: client demos, QA, deployments, documentation
- Growth: approve + send outreach, manage ads, publish content
- Founder: close deals, architect new systems, client relationships

### Friday: Review & Improve
- Sprint demos to clients
- Review: what worked, what didn't, what to automate next
- Update: prompt library, SOPs, templates with learnings from the week
- Plan: next week's sprint priorities

### Saturday-Sunday: AI Works, Humans Rest
- Landing pages capture leads 24/7
- AI chatbots handle inquiries
- Email sequences nurture leads
- Google Ads run continuously
- The system works while the team recharges
