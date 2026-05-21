import type { MailchimpSequence, MailchimpSequenceEmail } from "./web-development-sequence";

const brand = {
  company: "RDMI Tech Ventures Pvt. Ltd.",
  email: "info@rdmi.in",
  phone: "+91 98185 65561",
  whatsapp: "https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%20want%20a%20senior%20review%20for%20my%20custom%20software%20project.",
  softwarePage: "https://rdmi-landing-page.netlify.app/custom-software-development-company",
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
              <td style="padding:28px 30px;background:linear-gradient(135deg,#111827,#155e75);">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a5f3fc;font-weight:700;">RDMI Custom Software</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.2;color:#ffffff;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">${body}</td>
            </tr>
            <tr>
              <td style="padding:20px 30px;background:#0d0d0d;border-top:1px solid #242424;">
                <p style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#9ca3af;">${brand.company}</p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:#6b7280;">${brand.email} | ${brand.phone}</p>
                <p style="margin:14px 0 0;font-size:11px;line-height:1.5;color:#525252;">
                  You are receiving this because you requested a custom software consultation from RDMI.
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
    ${items.map((item) => `<li style="margin:0 0 10px;padding-left:22px;font-size:14px;line-height:1.6;color:#d4d4d8;"><span style="color:#22d3ee;font-weight:700;margin-left:-22px;display:inline-block;width:22px;">+</span>${item}</li>`).join("")}
  </ul>`;
}

function note(copy: string) {
  return `<div style="margin:22px 0;padding:16px;border-radius:14px;background:#18181b;border:1px solid #27272a;color:#cbd5e1;font-size:13px;line-height:1.65;">${copy}</div>`;
}

function cta(label: string, url = brand.whatsapp) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
    <tr>
      <td style="padding:20px;border-radius:16px;background:linear-gradient(135deg,#082f49,#111827);border:1px solid #164e63;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#67e8f9;font-weight:800;">Best next step</p>
        <p style="margin:0 0 14px;font-size:18px;line-height:1.35;color:#ffffff;font-weight:800;">Get a senior software scope review before you commit to the full build.</p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#d4d4d8;">Send your idea, workflow, old system, or competitor reference. We will reply with the first three decisions: what should be custom, what should be avoided, and the safest first release.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${url}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;border-radius:999px;padding:14px 26px;font-size:14px;font-weight:800;">${label}</a>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;line-height:1.55;color:#9ca3af;text-align:center;">Prefer email? Reply with <strong style="color:#ffffff;">workflow</strong>, <strong style="color:#ffffff;">idea</strong>, or <strong style="color:#ffffff;">scope</strong> and we will guide the next step.</p>
      </td>
    </tr>
  </table>`;
}

function textEmail(title: string, body: string) {
  return `${title}

Hi *|FNAME|*,

${body}

Best next step:
Send your idea, workflow, old system, or competitor reference. We will reply with the first three decisions: what should be custom, what should be avoided, and the safest first release.

WhatsApp RDMI:
${brand.whatsapp}

Custom software page:
${brand.softwarePage}

RDMI Team
${brand.email}
${brand.phone}`;
}

const emails: MailchimpSequenceEmail[] = [
  {
    id: "custom-software-01-instant-response",
    day: 0,
    delayHours: 0,
    name: "Instant response - software scope review",
    goal: "Confirm inquiry and position RDMI as a consultative software partner.",
    segmentRule: "Send immediately after tag custom-software-lead is added.",
    subject: "*|FNAME|*, your custom software request is with a senior engineer",
    previewText: "We are reviewing the workflow, risk, and first release path.",
    html: htmlShell(
      "We are reviewing the workflow, risk, and first release path.",
      "Your custom software request is with a senior engineer",
      [
        p("Hi *|FNAME|*,"),
        p("Thanks for reaching out to RDMI. We are reviewing your requirement as a business system, not just a list of screens to build."),
        p("A senior consultant-engineer will look at the workflow, users, integrations, data, budget, and launch pressure before suggesting the right first release."),
        bullets([
          "We identify the real bottleneck before writing features.",
          "We separate must-build custom logic from standard tools that can save time.",
          "We recommend a first version that can launch cleanly and still scale later.",
        ]),
        note("Project type: <strong>*|PROJECT_TYPE|*</strong><br>Budget range: <strong>*|BUDGET|*</strong><br>Source page: <strong>*|SOURCE_PAGE|*</strong>"),
        cta("Get my software scope review"),
      ].join("")
    ),
    text: textEmail(
      "Your custom software request is with a senior engineer",
      "Thanks for reaching out to RDMI. We are reviewing your requirement as a business system, not just screens.\n\nWe will check the workflow, users, integrations, data, budget, and safest first release."
    ),
  },
  {
    id: "custom-software-02-process-before-features",
    day: 2,
    delayHours: 48,
    name: "Day 2 - process before features",
    goal: "Educate that software scope starts with workflow diagnosis.",
    segmentRule: "Send if no reply or booked-call event after 2 days.",
    subject: "Before custom software, diagnose the workflow",
    previewText: "Good software starts with the business process, not the feature list.",
    html: htmlShell(
      "Good software starts with the business process, not the feature list.",
      "Before custom software, diagnose the workflow",
      [
        p("Hi *|FNAME|*,"),
        p("A feature list can look complete and still produce the wrong software. The better starting point is the workflow you want to improve."),
        h2("RDMI looks for these signals first:"),
        bullets([
          "Where does manual work slow the team down?",
          "Which approval, reporting, or handoff step creates errors?",
          "Which users need a dashboard, portal, mobile app, or admin system?",
          "Which data should move automatically between tools?",
          "Which part must be custom, and which part can use existing services?",
        ]),
        p("This makes the project smaller, clearer, and easier to deliver without surprises."),
        cta("Diagnose my software workflow"),
      ].join("")
    ),
    text: textEmail(
      "Before custom software, diagnose the workflow",
      "A feature list can look complete and still produce the wrong software. RDMI starts by checking manual work, errors, users, data movement, and what should or should not be custom."
    ),
  },
  {
    id: "custom-software-03-build-buy-automate",
    day: 4,
    delayHours: 96,
    name: "Day 4 - build buy automate",
    goal: "Position RDMI as honest advisor, not build-everything vendor.",
    segmentRule: "Send if lead has not booked and remains tagged custom-software-lead.",
    subject: "Not every software problem needs custom code",
    previewText: "Sometimes the right answer is build, buy, automate, or combine.",
    html: htmlShell(
      "Sometimes the right answer is build, buy, automate, or combine.",
      "Not every software problem needs custom code",
      [
        p("Hi *|FNAME|*,"),
        p("Custom software is powerful, but it is not always the smartest answer for every part of the system."),
        h2("A good plan separates the work:"),
        bullets([
          "Build the core workflow that makes your business different.",
          "Buy standard pieces like payments, email, analytics, auth, and hosting when it saves risk.",
          "Automate repetitive handoffs between existing tools before replacing everything.",
          "Use AI where it improves speed, quality, support, or decision-making.",
          "Keep ownership of source code, data model, documentation, and deployment.",
        ]),
        note("The goal is not maximum development hours. The goal is the highest-leverage system with the least unnecessary complexity."),
        cta("Choose build, buy, or automate"),
      ].join("")
    ),
    text: textEmail(
      "Not every software problem needs custom code",
      "A good plan separates what to build, buy, automate, and enhance with AI. Build the core workflow, buy standard services, automate repetitive handoffs, and keep ownership clear."
    ),
  },
  {
    id: "custom-software-04-first-release",
    day: 6,
    delayHours: 144,
    name: "Day 6 - safest first release",
    goal: "Move lead toward phased MVP instead of oversized scope.",
    segmentRule: "Send if lead has not booked or replied after 6 days.",
    subject: "The safest first release is usually smaller than you think",
    previewText: "A phased build reduces risk and gets real users into the system faster.",
    html: htmlShell(
      "A phased build reduces risk and gets real users into the system faster.",
      "The safest first release is usually smaller than you think",
      [
        p("Hi *|FNAME|*,"),
        p("Most custom software projects become risky when too much is packed into version one. The better approach is to define the smallest useful release."),
        h2("A strong first release should include:"),
        bullets([
          "The core user journey that proves the software is useful.",
          "Only the roles, permissions, and reports needed for launch.",
          "The most important integration, not every future integration.",
          "Clean data structure so future features do not require a rebuild.",
          "Tracking, error handling, and admin visibility from day one.",
        ]),
        p("This gives you speed now and a real foundation later."),
        cta("Plan my safest first release"),
      ].join("")
    ),
    text: textEmail(
      "The safest first release is usually smaller than you think",
      "Version one should prove the core journey, include only the needed roles and reports, handle the most important integration, and keep data clean for future growth."
    ),
  },
  {
    id: "custom-software-05-data-ownership",
    day: 8,
    delayHours: 192,
    name: "Day 8 - data and ownership",
    goal: "Educate on architecture, source ownership, and future handover.",
    segmentRule: "Send if no booked-call event after 8 days.",
    subject: "The software is only as good as the data model behind it",
    previewText: "Ownership, documentation, APIs, and data structure matter after launch.",
    html: htmlShell(
      "Ownership, documentation, APIs, and data structure matter after launch.",
      "The software is only as good as the data model behind it",
      [
        p("Hi *|FNAME|*,"),
        p("A custom app can look polished on the surface and still become hard to maintain if the data model and ownership are weak."),
        h2("Before development, clarify:"),
        bullets([
          "Who owns the source code, repositories, hosting, and database?",
          "How will users, roles, permissions, and audit trails work?",
          "What APIs or integrations will be needed now and later?",
          "How will data be exported if you change vendors or systems?",
          "What documentation will your internal team receive?",
        ]),
        note("RDMI builds with handover in mind: source code, deployment notes, environment setup, and practical documentation should not be an afterthought."),
        cta("Review my data and ownership plan"),
      ].join("")
    ),
    text: textEmail(
      "The software is only as good as the data model behind it",
      "Before development, clarify source ownership, hosting, database, roles, APIs, data export, and documentation. Good custom software should be maintainable after launch."
    ),
  },
  {
    id: "custom-software-06-ai-inside-software",
    day: 10,
    delayHours: 240,
    name: "Day 10 - AI inside software",
    goal: "Show practical AI use cases inside custom software.",
    segmentRule: "Send if lead has not replied after 10 days.",
    subject: "Where AI actually belongs inside custom software",
    previewText: "AI should remove effort, improve decisions, or speed up operations.",
    html: htmlShell(
      "AI should remove effort, improve decisions, or speed up operations.",
      "Where AI actually belongs inside custom software",
      [
        p("Hi *|FNAME|*,"),
        p("AI should not be added because it sounds modern. It should have a clear job inside the product or workflow."),
        h2("Useful AI software features include:"),
        bullets([
          "Document summarization for contracts, invoices, reports, or tickets.",
          "AI-assisted search across internal knowledge, files, or customer records.",
          "Lead, support, or operations summaries before a human takes action.",
          "Smart recommendations for the next best step in a workflow.",
          "Anomaly detection, risk flags, and quality checks before approval.",
        ]),
        p("The best AI features are narrow, measurable, and connected to a real business task."),
        cta("Find the right AI use case"),
      ].join("")
    ),
    text: textEmail(
      "Where AI actually belongs inside custom software",
      "AI should remove effort, improve decisions, or speed operations. Useful examples include document summaries, internal search, lead summaries, recommendations, anomaly detection, and quality checks."
    ),
  },
  {
    id: "custom-software-07-test-before-full-project",
    day: 12,
    delayHours: 288,
    name: "Day 12 - test before full project",
    goal: "Offer discovery sprint or prototype before full commitment.",
    segmentRule: "Send if no booked consultation after 12 days.",
    subject: "Test the software partner before the full build",
    previewText: "A discovery sprint or prototype can show thinking, speed, and delivery quality.",
    html: htmlShell(
      "A discovery sprint or prototype can show thinking, speed, and delivery quality.",
      "Test the software partner before the full build",
      [
        p("Hi *|FNAME|*,"),
        p("You do not need to approve a full software build on a sales conversation alone. A small first engagement is often the safer path."),
        h2("Good test scopes include:"),
        bullets([
          "Workflow audit and technical scope document.",
          "Clickable prototype for the main user journey.",
          "Data model and integration plan.",
          "One production-quality module or admin screen.",
          "A small automation or AI feature connected to your real workflow.",
        ]),
        p("This lets you see communication, product thinking, technical quality, and delivery rhythm before a larger project starts."),
        cta("Plan my software test scope"),
      ].join("")
    ),
    text: textEmail(
      "Test the software partner before the full build",
      "A small first scope can include a workflow audit, prototype, data model, one production module, or one automation. It shows thinking and delivery quality before the full project."
    ),
  },
  {
    id: "custom-software-08-security-devops-scale",
    day: 14,
    delayHours: 336,
    name: "Day 14 - security devops scale",
    goal: "Differentiate professional software engineering from simple app delivery.",
    segmentRule: "Send if lead has not replied after 14 days.",
    subject: "Custom software needs more than development",
    previewText: "Security, DevOps, logging, backups, and support decide whether the system survives real use.",
    html: htmlShell(
      "Security, DevOps, logging, backups, and support decide whether the system survives real use.",
      "Custom software needs more than development",
      [
        p("Hi *|FNAME|*,"),
        p("The real test of software starts after users begin using it. That is where engineering discipline matters."),
        h2("A production-ready build should consider:"),
        bullets([
          "Authentication, permissions, and audit logs.",
          "Secure environment variables and secret handling.",
          "Cloud deployment, backups, monitoring, and rollback path.",
          "Error tracking so bugs are visible instead of hidden.",
          "Performance planning for expected users, data, and traffic.",
        ]),
        note("A cheap build often skips these because they are not visible in a demo. They become very visible when real users arrive."),
        cta("Check my production readiness"),
      ].join("")
    ),
    text: textEmail(
      "Custom software needs more than development",
      "A production build needs auth, permissions, audit logs, secure secrets, deployment, backups, monitoring, rollback, error tracking, and performance planning."
    ),
  },
  {
    id: "custom-software-09-legacy-modernization",
    day: 16,
    delayHours: 384,
    name: "Day 16 - legacy modernization",
    goal: "Convert leads with old systems or spreadsheet-heavy operations.",
    segmentRule: "Send if lead has not booked after 16 days.",
    subject: "Spreadsheets and old tools can be a software roadmap",
    previewText: "Your current workaround often reveals what the custom system should become.",
    html: htmlShell(
      "Your current workaround often reveals what the custom system should become.",
      "Spreadsheets and old tools can be a software roadmap",
      [
        p("Hi *|FNAME|*,"),
        p("If your team runs operations through spreadsheets, WhatsApp, email threads, or an old system, that is not a failure. It is useful evidence."),
        h2("Those workarounds show:"),
        bullets([
          "Which data matters to the business.",
          "Which approvals and handoffs happen repeatedly.",
          "Which reports managers need every week.",
          "Which manual checks could be automated.",
          "Which parts should be modernized first instead of rebuilt all at once.",
        ]),
        p("RDMI can turn the current workflow into a phased modernization plan without forcing a disruptive big-bang rebuild."),
        cta("Turn my workflow into a roadmap"),
      ].join("")
    ),
    text: textEmail(
      "Spreadsheets and old tools can be a software roadmap",
      "Existing spreadsheets, WhatsApp processes, email threads, and old systems show what data, approvals, reports, checks, and modernization steps matter most."
    ),
  },
  {
    id: "custom-software-10-final-checklist",
    day: 18,
    delayHours: 432,
    name: "Day 18 - final software checklist",
    goal: "Final nudge with consultative buying checklist.",
    segmentRule: "Send if no reply, booked call, or sales-qualified tag after 18 days.",
    subject: "Final checklist before choosing a custom software partner",
    previewText: "Use this before you hire anyone, including RDMI.",
    html: htmlShell(
      "Use this before you hire anyone, including RDMI.",
      "Final checklist before choosing a custom software partner",
      [
        p("Hi *|FNAME|*,"),
        p("I will close the loop here unless custom software is still active for you. Before you choose any partner, use this checklist."),
        bullets([
          "Can they explain the workflow before proposing features?",
          "Will they challenge what should not be custom built?",
          "Can they define a safe first release instead of a bloated scope?",
          "Do they plan data, integrations, ownership, and handover?",
          "Can they add AI where it has a real business use?",
          "Will they support deployment, monitoring, and post-launch iteration?",
        ]),
        p("If you want RDMI to review the project, reply with 'scope'. If timing is later, reply with the month. If it is closed, reply with 'close'."),
        cta("Reopen my software review"),
      ].join("")
    ),
    text: textEmail(
      "Final checklist before choosing a custom software partner",
      "Before hiring anyone, ask if they understand the workflow, challenge unnecessary custom work, define a safe first release, plan data and ownership, use AI practically, and support deployment."
    ),
  },
];

export const customSoftwareDevelopmentMailchimpSequence: MailchimpSequence = {
  id: "custom-software-development-lead-nurture-v1",
  name: "Custom Software Development Leads - 10 Email Consultative Nurture",
  audienceTag: "custom-software-lead",
  triggerFormTypes: ["custom-software-premium", "software"],
  sourceRoutes: ["/custom-software-development-company"],
  defaultFromName: "RDMI Web Services",
  defaultReplyTo: brand.email,
  primaryCtaUrl: brand.whatsapp,
  notes: [
    "Use only for leads from /custom-software-development-company or formType custom-software-premium/software.",
    "Spacing is every 2 days: day 0, 2, 4, 6, 8, 10, 12, 14, 16, and 18.",
    "Stop the sequence when a lead replies, books a call, becomes sales-qualified, or requests no follow-up.",
    "Key nurture angles: workflow diagnosis, build-vs-buy, phased first release, data ownership, AI use cases, test scope, production readiness, and modernization.",
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

export default customSoftwareDevelopmentMailchimpSequence;
