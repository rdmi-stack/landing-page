export type MailchimpSequenceEmail = {
  id: string;
  day: number;
  delayHours: number;
  name: string;
  goal: string;
  segmentRule: string;
  subject: string;
  previewText: string;
  html: string;
  text: string;
};

export type MailchimpSequence = {
  id: string;
  name: string;
  audienceTag: string;
  triggerFormTypes: string[];
  sourceRoutes: string[];
  defaultFromName: string;
  defaultReplyTo: string;
  primaryCtaUrl: string;
  notes: string[];
  mergeTags: Record<string, string>;
  emails: MailchimpSequenceEmail[];
};

const brand = {
  company: "RDMI Tech Ventures Pvt. Ltd.",
  email: "info@rdmi.in",
  phone: "+91 98185 65561",
  whatsapp: "https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%20want%20to%20discuss%20my%20web%20development%20project.",
  webPage: "https://rdmi-landing-page.netlify.app/web-development-company",
  quotePage: "https://rdmi-landing-page.netlify.app/get-quote",
};

function htmlShell(previewText: string, title: string, body: string) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#e5e7eb;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${previewText}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="width:100%;max-width:620px;background:#111111;border:1px solid #262626;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:28px 30px;background:linear-gradient(135deg,#0f172a,#0f766e);">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a7f3d0;font-weight:700;">RDMI Web Services</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;color:#ffffff;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 30px;background:#0d0d0d;border-top:1px solid #242424;">
                <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#9ca3af;">${brand.company}</p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">${brand.email} | ${brand.phone}</p>
                <p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#525252;">
                  You are receiving this because you requested a web development consultation from RDMI.
                  <a href="*|UNSUB|*" style="color:#9ca3af;">Unsubscribe</a>.
                </p>
                <p style="margin:8px 0 0;font-size:11px;line-height:1.5;color:#3f3f46;">*|LIST:ADDRESS|*</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function p(copy: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#d4d4d8;">${copy}</p>`;
}

function h2(copy: string) {
  return `<h2 style="margin:0 0 14px;font-size:20px;line-height:1.3;color:#ffffff;">${copy}</h2>`;
}

function bullets(items: string[]) {
  return `<ul style="margin:0 0 20px;padding:0;list-style:none;">
    ${items.map((item) => `<li style="margin:0 0 10px;padding-left:22px;font-size:14px;line-height:1.6;color:#d4d4d8;"><span style="color:#34d399;font-weight:700;margin-left:-22px;display:inline-block;width:22px;">+</span>${item}</li>`).join("")}
  </ul>`;
}

function cta(label: string, url = brand.whatsapp) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
    <tr>
      <td style="padding:20px;border-radius:16px;background:linear-gradient(135deg,#10231d,#111827);border:1px solid #1f3f36;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#86efac;font-weight:800;">Best next step</p>
        <p style="margin:0 0 14px;font-size:18px;line-height:1.35;color:#ffffff;font-weight:800;">Get a senior review before you commit to the full project.</p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#d4d4d8;">Send your current website, idea, or competitor reference. We will reply with the first three decisions: what to build, what to avoid, and the fastest safe next step.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${url}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;border-radius:999px;padding:14px 26px;font-size:14px;font-weight:800;">${label}</a>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;line-height:1.55;color:#9ca3af;text-align:center;">Prefer email? Reply with <strong style="color:#ffffff;">website</strong>, <strong style="color:#ffffff;">idea</strong>, or <strong style="color:#ffffff;">audit</strong> and we will guide the next step.</p>
      </td>
    </tr>
  </table>`;
}

function note(copy: string) {
  return `<div style="margin:22px 0;padding:16px;border-radius:14px;background:#18181b;border:1px solid #27272a;color:#cbd5e1;font-size:13px;line-height:1.65;">${copy}</div>`;
}

function textEmail(title: string, body: string) {
  return `${title}

Hi *|FNAME|*,

${body}

Best next step:
Send your current website, idea, or competitor reference. We will reply with the first three decisions: what to build, what to avoid, and the fastest safe next step.

WhatsApp RDMI:
${brand.whatsapp}

Web development page:
${brand.webPage}

RDMI Team
${brand.email}
${brand.phone}`;
}

const emails: MailchimpSequenceEmail[] = [
  {
    id: "web-dev-01-instant-response",
    day: 0,
    delayHours: 0,
    name: "Instant response - senior architect review",
    goal: "Confirm inquiry and position RDMI as a senior web/software partner.",
    segmentRule: "Send immediately after tag web-development-lead is added.",
    subject: "*|FNAME|*, your web development request is with a senior RDMI architect",
    previewText: "We are reviewing your website, software, or automation requirement now.",
    html: htmlShell(
      "We are reviewing your website, software, or automation requirement now.",
      "Your web development request is with a senior architect",
      [
        p("Hi *|FNAME|*,"),
        p("Thanks for reaching out to RDMI. Your request came through from our web development page, so we are reviewing it as a business growth system, not just a design task."),
        p("A senior consultant-engineer will look at the requirement and recommend the practical path: landing page, website rebuild, custom web app, AI lead system, automation layer, or a mix of these."),
        bullets([
          "We check the buyer journey before discussing page design.",
          "We look for AI, automation, CRM, analytics, and lead follow-up opportunities.",
          "We recommend the simplest build that can launch fast and still scale.",
        ]),
        note("Project type: <strong>*|PROJECT_TYPE|*</strong><br>Budget range: <strong>*|BUDGET|*</strong><br>Source page: <strong>*|SOURCE_PAGE|*</strong>"),
        cta("Get my senior web review"),
      ].join("")
    ),
    text: textEmail(
      "Your web development request is with a senior architect",
      "Thanks for reaching out to RDMI. We are reviewing your request as a business growth system, not just a design task.\n\nWe will check buyer journey, AI opportunities, automation, CRM handoff, analytics, and the simplest build path."
    ),
  },
  {
    id: "web-dev-02-website-is-marketing-tool",
    day: 2,
    delayHours: 48,
    name: "Day 2 - website is a marketing tool",
    goal: "Reframe website as a revenue and lead-generation asset.",
    segmentRule: "Send if no reply or booked-call event after 2 days.",
    subject: "Your website is not a brochure. It is a marketing tool.",
    previewText: "A serious website should attract, qualify, educate, and convert buyers.",
    html: htmlShell(
      "A serious website should attract, qualify, educate, and convert buyers.",
      "Your website is not a brochure. It is a marketing tool.",
      [
        p("Hi *|FNAME|*,"),
        p("Many businesses still treat a website like a digital brochure: homepage, services, about, contact. That is not enough anymore."),
        h2("A good website should do marketing work every day."),
        bullets([
          "Attract the right traffic from Google, ads, referrals, and AI search.",
          "Explain your offer faster than a sales call can.",
          "Qualify serious buyers before they reach your team.",
          "Capture source, keyword, campaign, service interest, and budget.",
          "Push the right lead to WhatsApp, CRM, email, or a sales workflow.",
        ]),
        p("That is why RDMI designs web development around conversion paths, follow-up systems, and measurable pipeline."),
        cta("Review my website as a marketing tool"),
      ].join("")
    ),
    text: textEmail(
      "Your website is not a brochure. It is a marketing tool.",
      "A serious website should attract, educate, qualify, and convert buyers.\n\nIt should capture source, keyword, campaign, service interest, budget, and route the lead into WhatsApp, CRM, email, or sales workflow."
    ),
  },
  {
    id: "web-dev-03-ai-integration-importance",
    day: 4,
    delayHours: 96,
    name: "Day 4 - why AI integration matters",
    goal: "Educate why AI belongs inside modern web experiences.",
    segmentRule: "Send if lead has not booked and remains tagged web-development-lead.",
    subject: "Why AI integration matters on a modern website",
    previewText: "AI should reduce friction for buyers and manual work for your team.",
    html: htmlShell(
      "AI should reduce friction for buyers and manual work for your team.",
      "Why AI integration matters on a modern website",
      [
        p("Hi *|FNAME|*,"),
        p("AI on a website does not mean adding a random chatbot bubble. Done correctly, AI helps visitors make decisions faster and helps your team handle leads with more context."),
        h2("Useful AI website integrations include:"),
        bullets([
          "AI lead qualification that asks the right follow-up questions before your team joins.",
          "Smart FAQ and service discovery that guides buyers to the right offer.",
          "Quote-prep assistants that summarize project needs from form answers.",
          "Content search for service pages, case studies, docs, or product catalogs.",
          "Internal lead summaries so your team knows what to say before calling.",
        ]),
        note("The goal is not to look futuristic. The goal is to reduce friction, improve response quality, and help your team close better leads."),
        cta("Check where AI fits in my website"),
      ].join("")
    ),
    text: textEmail(
      "Why AI integration matters on a modern website",
      "AI should reduce friction for buyers and manual work for your team.\n\nUseful AI integrations include lead qualification, smart FAQ, quote-prep summaries, website search, and internal lead summaries."
    ),
  },
  {
    id: "web-dev-04-test-developer-first",
    day: 6,
    delayHours: 144,
    name: "Day 6 - test developer before full project",
    goal: "Offer a smaller first engagement before full commitment.",
    segmentRule: "Send if lead has not booked or replied after 6 days.",
    subject: "Test the developer before giving the full project",
    previewText: "A small paid or scoped test can reveal speed, thinking, and quality before the full build.",
    html: htmlShell(
      "A small paid or scoped test can reveal speed, thinking, and quality before the full build.",
      "Test the developer before giving the full project",
      [
        p("Hi *|FNAME|*,"),
        p("You do not need to hand over a full website or software project on trust alone. A smaller first scope is often the smarter move."),
        h2("A good test scope can be simple:"),
        bullets([
          "Audit your current website and write the rebuild plan.",
          "Build one landing page section or conversion form.",
          "Create one high-intent service page with tracking and CTA flow.",
          "Prototype the lead capture and WhatsApp handoff.",
          "Add one useful AI component, such as lead summary or FAQ assistant.",
        ]),
        p("This shows you how the developer thinks, communicates, ships, and handles edge cases before you approve a larger engagement."),
        cta("Plan a small developer test"),
      ].join("")
    ),
    text: textEmail(
      "Test the developer before giving the full project",
      "You can start with a smaller scope: audit, one landing section, one service page, lead capture flow, WhatsApp handoff, or one AI component.\n\nThis shows thinking, speed, communication, and quality before a full project."
    ),
  },
  {
    id: "web-dev-05-speed-seo-conversion",
    day: 8,
    delayHours: 192,
    name: "Day 8 - speed SEO and conversion",
    goal: "Show that design alone is not enough.",
    segmentRule: "Send if no booked-call event after 8 days.",
    subject: "A beautiful website can still lose leads",
    previewText: "Speed, clarity, SEO structure, and CTA flow matter as much as visual design.",
    html: htmlShell(
      "Speed, clarity, SEO structure, and CTA flow matter as much as visual design.",
      "A beautiful website can still lose leads",
      [
        p("Hi *|FNAME|*,"),
        p("A website can look premium and still fail commercially if it is slow, unclear, hard to navigate, or missing the right lead flow."),
        h2("Before launch, RDMI checks:"),
        bullets([
          "Does the first screen explain the offer clearly?",
          "Can a buyer act without hunting for the CTA?",
          "Is the page fast on mobile and stable during load?",
          "Are headings, metadata, schema, and internal links built for SEO?",
          "Does every form submission preserve source and project context?",
          "Is there a follow-up path after the lead submits?",
        ]),
        p("Design creates trust. Engineering and conversion architecture turn that trust into leads."),
        cta("Review my conversion path"),
      ].join("")
    ),
    text: textEmail(
      "A beautiful website can still lose leads",
      "A premium website can fail if it is slow, unclear, missing SEO structure, or has poor CTA flow.\n\nRDMI checks first-screen clarity, mobile speed, metadata, schema, forms, attribution, and follow-up path."
    ),
  },
  {
    id: "web-dev-06-lead-follow-up-system",
    day: 10,
    delayHours: 240,
    name: "Day 10 - lead follow-up system",
    goal: "Connect website build to CRM, email, WhatsApp, and nurture.",
    segmentRule: "Send if lead has not replied after 10 days.",
    subject: "What happens after someone fills your website form?",
    previewText: "The post-submit journey is where many websites waste good leads.",
    html: htmlShell(
      "The post-submit journey is where many websites waste good leads.",
      "What happens after someone fills your website form?",
      [
        p("Hi *|FNAME|*,"),
        p("Most websites focus on getting the form submission. But the real question is what happens after the form."),
        h2("A serious website needs a post-submit system."),
        bullets([
          "Instant confirmation email that matches the service interest.",
          "Lead notification to your team with budget, need, source, and page.",
          "WhatsApp or call prompt for high-intent users.",
          "Mailchimp or CRM tagging based on page and form type.",
          "Nurture sequence if the lead does not book immediately.",
          "Dashboard or lead log so nothing disappears inside an inbox.",
        ]),
        note("This is why your website should be treated as the beginning of a sales workflow, not the end of a design project."),
        cta("Plan my lead follow-up system"),
      ].join("")
    ),
    text: textEmail(
      "What happens after someone fills your website form?",
      "A serious website needs instant confirmation, team notification, WhatsApp prompt, Mailchimp or CRM tagging, nurture sequence, and lead logging.\n\nThe website is the start of a sales workflow."
    ),
  },
  {
    id: "web-dev-07-strategy-before-design",
    day: 12,
    delayHours: 288,
    name: "Day 12 - strategy before design",
    goal: "Push strategic consultation rather than design-only comparison.",
    segmentRule: "Send if no booked consultation after 12 days.",
    subject: "Do not start web design before answering this",
    previewText: "The right page structure depends on your buyer, offer, traffic source, and sales motion.",
    html: htmlShell(
      "The right page structure depends on your buyer, offer, traffic source, and sales motion.",
      "Do not start web design before answering this",
      [
        p("Hi *|FNAME|*,"),
        p("Before designing a website, answer this: what job should the website perform for the business?"),
        bullets([
          "Generate qualified sales calls?",
          "Support Google Ads traffic?",
          "Rank for high-intent service searches?",
          "Explain a premium offer clearly?",
          "Replace manual quote conversations?",
          "Launch a web app, portal, or software product?",
        ]),
        p("Each answer creates a different structure. That is why RDMI starts with strategy, then design, then engineering."),
        cta("Get strategy before design"),
      ].join("")
    ),
    text: textEmail(
      "Do not start web design before answering this",
      "Before design, decide the job of the website: sales calls, ads, SEO, premium offer education, quote prep, web app launch, or product support.\n\nEach goal creates a different structure."
    ),
  },
  {
    id: "web-dev-08-stack-choice",
    day: 14,
    delayHours: 336,
    name: "Day 14 - choose the right website stack",
    goal: "Educate on stack decisions and avoid template lock-in.",
    segmentRule: "Send if lead has not replied after 14 days.",
    subject: "WordPress, Shopify, Next.js, or custom web app?",
    previewText: "The right stack depends on content, commerce, speed, integrations, and future software needs.",
    html: htmlShell(
      "The right stack depends on content, commerce, speed, integrations, and future software needs.",
      "WordPress, Shopify, Next.js, or custom web app?",
      [
        p("Hi *|FNAME|*,"),
        p("There is no universal best stack. There is only the right stack for the business model."),
        bullets([
          "WordPress can work when content publishing is the main need.",
          "Shopify works when commerce operations matter more than custom workflows.",
          "Next.js is strong for speed, SEO, landing pages, and custom interfaces.",
          "A custom web app is better for dashboards, portals, SaaS, booking, CRM, and internal workflows.",
          "AI features can be added to any stack, but the architecture should plan for them early.",
        ]),
        p("We help you choose the stack that keeps launch simple without trapping you later."),
        cta("Choose my right web stack"),
      ].join("")
    ),
    text: textEmail(
      "WordPress, Shopify, Next.js, or custom web app?",
      "The right stack depends on the business model.\n\nWordPress for content, Shopify for commerce, Next.js for speed and custom interfaces, custom web app for portals, SaaS, booking, CRM, dashboards, and internal workflows."
    ),
  },
  {
    id: "web-dev-09-cost-of-cheap-website",
    day: 16,
    delayHours: 384,
    name: "Day 16 - cost of cheap website",
    goal: "Explain hidden costs of cheap websites and reinforce ownership.",
    segmentRule: "Send if lead has not booked after 16 days.",
    subject: "The hidden cost of a cheap website",
    previewText: "A low build price can become expensive when you need leads, speed, tracking, or ownership.",
    html: htmlShell(
      "A low build price can become expensive when you need leads, speed, tracking, or ownership.",
      "The hidden cost of a cheap website",
      [
        p("Hi *|FNAME|*,"),
        p("Cheap websites are not always bad. They are bad when they block the next business step."),
        h2("The common hidden costs:"),
        bullets([
          "No source ownership or unclear handover.",
          "Slow pages that hurt ads, SEO, and trust.",
          "No analytics or attribution setup.",
          "Forms that lose project context.",
          "Plugin/theme lock-in that makes changes expensive.",
          "No path from website to CRM, Mailchimp, WhatsApp, or sales follow-up.",
        ]),
        note("The question is not only 'how much does the website cost?' The better question is 'what will the website make easier, faster, or more profitable?'"),
        cta("Check hidden website costs"),
      ].join("")
    ),
    text: textEmail(
      "The hidden cost of a cheap website",
      "Cheap websites become expensive when they have no ownership, poor speed, no analytics, weak forms, plugin lock-in, or no CRM/Mailchimp/WhatsApp follow-up path."
    ),
  },
  {
    id: "web-dev-10-final-checklist",
    day: 18,
    delayHours: 432,
    name: "Day 18 - final checklist and close loop",
    goal: "Final nudge with a useful buying checklist.",
    segmentRule: "Send if no reply, booked call, or sales-qualified tag after 18 days.",
    subject: "Final checklist before you choose a web development partner",
    previewText: "Use this before you hire anyone, including RDMI.",
    html: htmlShell(
      "Use this before you hire anyone, including RDMI.",
      "Final checklist before you choose a web development partner",
      [
        p("Hi *|FNAME|*,"),
        p("I will close the loop here unless web development is still active for you. Before you hire anyone, use this checklist."),
        bullets([
          "Do they understand your buyer and sales process?",
          "Can they explain why AI integration matters for your specific website?",
          "Will they let you test the developer or scope before the full project?",
          "Do they treat the website as a marketing and sales tool?",
          "Will you own the code, tracking, content, and deployment?",
          "Can they connect the website to Mailchimp, CRM, WhatsApp, and analytics later?",
        ]),
        p("If you want RDMI to review the project, reply with 'ready'. If the timing is later, reply with the month. If it is closed, reply with 'close'."),
        cta("Reopen my web development review"),
      ].join("")
    ),
    text: textEmail(
      "Final checklist before you choose a web development partner",
      "Before hiring anyone, ask if they understand your buyer, can explain AI integration, let you test the developer first, treat the website as a marketing tool, give ownership, and connect Mailchimp, CRM, WhatsApp, and analytics later.\n\nReply ready, later, or close."
    ),
  },
];

export const webDevelopmentMailchimpSequence: MailchimpSequence = {
  id: "web-development-lead-nurture-v2",
  name: "Web Development Leads - 10 Email AI First Nurture",
  audienceTag: "web-development-lead",
  triggerFormTypes: ["web-dev", "web-dev-premium"],
  sourceRoutes: ["/web-development-company"],
  defaultFromName: "RDMI Web Services",
  defaultReplyTo: brand.email,
  primaryCtaUrl: brand.whatsapp,
  notes: [
    "Use only for leads from /web-development-company or formType web-dev/web-dev-premium.",
    "Spacing is every 2 days: day 0, 2, 4, 6, 8, 10, 12, 14, 16, and 18.",
    "Stop the sequence when a lead replies, books a call, becomes sales-qualified, or requests no follow-up.",
    "Key nurture angles: website as marketing tool, AI integration, testing developer before full project, stack choice, conversion, follow-up automation, and ownership.",
  ],
  mergeTags: {
    firstName: "*|FNAME|*",
    email: "*|EMAIL|*",
    projectType: "*|PROJECT_TYPE|*",
    budget: "*|BUDGET|*",
    phone: "*|PHONE|*",
    sourcePage: "*|SOURCE_PAGE|*",
  },
  emails,
};

export default webDevelopmentMailchimpSequence;
