import type { MailchimpSequence, MailchimpSequenceEmail } from "./web-development-sequence";

const brand = {
  company: "RDMI Tech Ventures Pvt. Ltd.",
  email: "info@rdmi.in",
  phone: "+91 98185 65561",
  whatsapp: "https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%20want%20a%20senior%20review%20for%20my%20enterprise%20software%20project.",
  enterprisePage: "https://rdmi-landing-page.netlify.app/enterprise-software-development-company",
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
              <td style="padding:28px 30px;background:linear-gradient(135deg,#18181b,#4338ca);">
                <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#c7d2fe;font-weight:700;">RDMI Enterprise Software</div>
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
                  You are receiving this because you requested an enterprise software consultation from RDMI.
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
    ${items.map((item) => `<li style="margin:0 0 10px;padding-left:22px;font-size:14px;line-height:1.6;color:#d4d4d8;"><span style="color:#a5b4fc;font-weight:700;margin-left:-22px;display:inline-block;width:22px;">+</span>${item}</li>`).join("")}
  </ul>`;
}

function note(copy: string) {
  return `<div style="margin:22px 0;padding:16px;border-radius:14px;background:#18181b;border:1px solid #27272a;color:#cbd5e1;font-size:13px;line-height:1.65;">${copy}</div>`;
}

function cta(label: string, url = brand.whatsapp) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
    <tr>
      <td style="padding:20px;border-radius:16px;background:linear-gradient(135deg,#1e1b4b,#111827);border:1px solid #3730a3;">
        <p style="margin:0 0 6px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#c4b5fd;font-weight:800;">Best next step</p>
        <p style="margin:0 0 14px;font-size:18px;line-height:1.35;color:#ffffff;font-weight:800;">Get a senior enterprise architecture review before approving a large build.</p>
        <p style="margin:0 0 18px;font-size:14px;line-height:1.65;color:#d4d4d8;">Send your current ERP, CRM, workflow, spreadsheet, or legacy-system context. We will reply with the first three decisions: what to modernize first, what to integrate, and what to avoid changing too early.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${url}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;border-radius:999px;padding:14px 26px;font-size:14px;font-weight:800;">${label}</a>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:12px;line-height:1.55;color:#9ca3af;text-align:center;">Prefer email? Reply with <strong style="color:#ffffff;">ERP</strong>, <strong style="color:#ffffff;">CRM</strong>, or <strong style="color:#ffffff;">workflow</strong> and we will guide the next step.</p>
      </td>
    </tr>
  </table>`;
}

function textEmail(title: string, body: string) {
  return `${title}

Hi *|FNAME|*,

${body}

Best next step:
Send your current ERP, CRM, workflow, spreadsheet, or legacy-system context. We will reply with the first three decisions: what to modernize first, what to integrate, and what to avoid changing too early.

WhatsApp RDMI:
${brand.whatsapp}

Enterprise software page:
${brand.enterprisePage}

RDMI Team
${brand.email}
${brand.phone}`;
}

const emails: MailchimpSequenceEmail[] = [
  {
    id: "enterprise-software-01-instant-response",
    day: 0,
    delayHours: 0,
    name: "Instant response - enterprise architecture review",
    goal: "Confirm inquiry and position RDMI as an enterprise modernization partner.",
    segmentRule: "Send immediately after tag enterprise-software-lead is added.",
    subject: "*|FNAME|*, your enterprise software request is with RDMI",
    previewText: "We are reviewing the systems, teams, data, and modernization path.",
    html: htmlShell(
      "We are reviewing the systems, teams, data, and modernization path.",
      "Your enterprise software request is with RDMI",
      [
        p("Hi *|FNAME|*,"),
        p("Thanks for reaching out. Enterprise software should not begin with screens. It should begin with systems, teams, approvals, integrations, and the business process behind them."),
        p("RDMI will review your requirement as an architecture and operations problem first, then recommend the safest build path."),
        bullets([
          "We map departments, roles, data flows, and approval chains.",
          "We identify what should be ERP, CRM, dashboard, workflow automation, or custom software.",
          "We plan a phased rollout so teams can adopt the system without disruption.",
        ]),
        note("Project type: <strong>*|PROJECT_TYPE|*</strong><br>Budget range: <strong>*|BUDGET|*</strong><br>Source page: <strong>*|SOURCE_PAGE|*</strong>"),
        cta("Get my enterprise review"),
      ].join("")
    ),
    text: textEmail(
      "Your enterprise software request is with RDMI",
      "Enterprise software should start with systems, teams, approvals, integrations, and business process. RDMI will review the architecture and recommend the safest build path."
    ),
  },
  {
    id: "enterprise-software-02-map-before-erp-crm",
    day: 2,
    delayHours: 48,
    name: "Day 2 - map before ERP CRM",
    goal: "Educate that workflow mapping comes before software selection.",
    segmentRule: "Send if no reply or booked-call event after 2 days.",
    subject: "Before ERP or CRM, map the real workflow",
    previewText: "The right enterprise software depends on how the business actually works.",
    html: htmlShell(
      "The right enterprise software depends on how the business actually works.",
      "Before ERP or CRM, map the real workflow",
      [
        p("Hi *|FNAME|*,"),
        p("ERP and CRM projects fail when teams select software before mapping the real workflow. The system then forces people into a process that does not match operations."),
        h2("Map these first:"),
        bullets([
          "Which departments create, approve, update, and consume the data?",
          "Where does the current process depend on spreadsheets or WhatsApp?",
          "Which approvals cause delays or errors?",
          "Which reports are needed by leadership, finance, sales, or operations?",
          "Which external systems must stay connected?",
        ]),
        p("Once this is clear, the software decision becomes much more precise."),
        cta("Map my enterprise workflow"),
      ].join("")
    ),
    text: textEmail(
      "Before ERP or CRM, map the real workflow",
      "ERP and CRM projects fail when software is selected before the real workflow is mapped. First clarify departments, approvals, reports, spreadsheets, WhatsApp usage, and external systems."
    ),
  },
  {
    id: "enterprise-software-03-custom-vs-platform",
    day: 4,
    delayHours: 96,
    name: "Day 4 - custom vs platform",
    goal: "Help buyers think through ERP/CRM customization versus off-the-shelf tools.",
    segmentRule: "Send if lead has not booked and remains tagged enterprise-software-lead.",
    subject: "Custom ERP, CRM, or an existing platform?",
    previewText: "The answer depends on process uniqueness, scale, control, and integrations.",
    html: htmlShell(
      "The answer depends on process uniqueness, scale, control, and integrations.",
      "Custom ERP, CRM, or an existing platform?",
      [
        p("Hi *|FNAME|*,"),
        p("Not every enterprise workflow needs a fully custom system. Not every business fits cleanly inside a standard tool either."),
        h2("A practical decision framework:"),
        bullets([
          "Use an existing platform when the process is standard and speed matters most.",
          "Build custom when the workflow is your competitive advantage or too specific for generic software.",
          "Integrate when the tools already work but data is trapped between them.",
          "Automate when the process is repetitive but does not need a full new app.",
          "Modernize in phases when old systems still run critical operations.",
        ]),
        note("The right solution may be a mix: CRM plus custom portal, ERP plus dashboards, legacy system plus automation, or custom software around a core platform."),
        cta("Choose platform, custom, or hybrid"),
      ].join("")
    ),
    text: textEmail(
      "Custom ERP, CRM, or an existing platform?",
      "Use a platform for standard processes, custom software for unique workflows, integration when tools already work, automation for repetitive steps, and phased modernization for critical old systems."
    ),
  },
  {
    id: "enterprise-software-04-integrations-data",
    day: 6,
    delayHours: 144,
    name: "Day 6 - integrations and data",
    goal: "Make data and integration architecture central to the buying decision.",
    segmentRule: "Send if lead has not booked or replied after 6 days.",
    subject: "Enterprise software breaks when data is not planned",
    previewText: "Integrations, ownership, permissions, and reporting must be designed early.",
    html: htmlShell(
      "Integrations, ownership, permissions, and reporting must be designed early.",
      "Enterprise software breaks when data is not planned",
      [
        p("Hi *|FNAME|*,"),
        p("Enterprise systems are only useful when the right data reaches the right team at the right time. That rarely happens by accident."),
        h2("Before development, clarify:"),
        bullets([
          "Which systems must sync: ERP, CRM, accounting, inventory, HRMS, support, or BI?",
          "Which system is the source of truth for each data type?",
          "What permissions should each role have?",
          "What reports need real-time data versus scheduled exports?",
          "What audit trail is needed for compliance and accountability?",
        ]),
        p("This prevents duplicated records, manual re-entry, broken reports, and vendor lock-in."),
        cta("Review my integration plan"),
      ].join("")
    ),
    text: textEmail(
      "Enterprise software breaks when data is not planned",
      "Clarify system sync, source of truth, role permissions, reporting needs, and audit trail before development. This prevents duplicated records and broken reports."
    ),
  },
  {
    id: "enterprise-software-05-phased-rollout",
    day: 8,
    delayHours: 192,
    name: "Day 8 - phased rollout",
    goal: "Reduce fear of enterprise disruption with phased implementation.",
    segmentRule: "Send if no booked-call event after 8 days.",
    subject: "Do not roll out enterprise software all at once",
    previewText: "A phased launch protects operations and improves adoption.",
    html: htmlShell(
      "A phased launch protects operations and improves adoption.",
      "Do not roll out enterprise software all at once",
      [
        p("Hi *|FNAME|*,"),
        p("A big-bang enterprise rollout can create confusion, resistance, and operational risk. A phased rollout is usually safer."),
        h2("A practical rollout plan can start with:"),
        bullets([
          "One department, workflow, or branch first.",
          "Core roles and reports before advanced automation.",
          "Manual override paths while users learn the system.",
          "Training material and admin documentation.",
          "Feedback loop before expanding to the next process.",
        ]),
        note("This is how enterprise software becomes adopted instead of merely launched."),
        cta("Plan a phased rollout"),
      ].join("")
    ),
    text: textEmail(
      "Do not roll out enterprise software all at once",
      "A phased rollout can start with one department or workflow, core reports, manual override paths, training, documentation, and a feedback loop before expansion."
    ),
  },
  {
    id: "enterprise-software-06-dashboards-bi",
    day: 10,
    delayHours: 240,
    name: "Day 10 - dashboards and BI",
    goal: "Show the business value of dashboards and decision systems.",
    segmentRule: "Send if lead has not replied after 10 days.",
    subject: "Enterprise software should make decisions easier",
    previewText: "Dashboards, alerts, and reports should reduce management blind spots.",
    html: htmlShell(
      "Dashboards, alerts, and reports should reduce management blind spots.",
      "Enterprise software should make decisions easier",
      [
        p("Hi *|FNAME|*,"),
        p("The value of enterprise software is not only faster data entry. It should help leaders see what is happening and act earlier."),
        h2("Strong enterprise dashboards can show:"),
        bullets([
          "Sales pipeline, fulfillment, inventory, collections, or service performance.",
          "Workflow bottlenecks and delayed approvals.",
          "Team workload, SLA risk, and pending escalations.",
          "Financial or operational exceptions that need attention.",
          "AI-generated summaries for weekly leadership review.",
        ]),
        p("The dashboard should match business decisions, not just display every possible metric."),
        cta("Design my decision dashboard"),
      ].join("")
    ),
    text: textEmail(
      "Enterprise software should make decisions easier",
      "Enterprise dashboards should show pipeline, fulfillment, inventory, collections, bottlenecks, workload, SLA risk, exceptions, and leadership summaries."
    ),
  },
  {
    id: "enterprise-software-07-ai-with-governance",
    day: 12,
    delayHours: 288,
    name: "Day 12 - AI with governance",
    goal: "Position AI as controlled enterprise automation, not novelty.",
    segmentRule: "Send if no booked consultation after 12 days.",
    subject: "AI in enterprise software needs guardrails",
    previewText: "Useful AI improves operations without losing control of data and decisions.",
    html: htmlShell(
      "Useful AI improves operations without losing control of data and decisions.",
      "AI in enterprise software needs guardrails",
      [
        p("Hi *|FNAME|*,"),
        p("AI can be very useful inside enterprise systems, but it needs clear boundaries, permissions, and human control."),
        h2("Good enterprise AI use cases:"),
        bullets([
          "Summarize customer, vendor, ticket, or transaction history before action.",
          "Extract data from invoices, forms, contracts, and operational documents.",
          "Flag risk, missing information, or process exceptions.",
          "Answer internal policy or knowledge-base questions with source references.",
          "Draft responses or reports for human approval instead of sending automatically.",
        ]),
        note("The goal is not autonomous chaos. The goal is faster teams, better context, and safer decisions."),
        cta("Find safe AI use cases"),
      ].join("")
    ),
    text: textEmail(
      "AI in enterprise software needs guardrails",
      "Good enterprise AI summarizes records, extracts data, flags risk, answers internal questions with sources, and drafts responses for human approval."
    ),
  },
  {
    id: "enterprise-software-08-security-compliance",
    day: 14,
    delayHours: 336,
    name: "Day 14 - security and compliance",
    goal: "Differentiate by security, auditability, and operational discipline.",
    segmentRule: "Send if lead has not replied after 14 days.",
    subject: "Enterprise software must be built for control",
    previewText: "Roles, audit logs, backups, and access controls are not optional.",
    html: htmlShell(
      "Roles, audit logs, backups, and access controls are not optional.",
      "Enterprise software must be built for control",
      [
        p("Hi *|FNAME|*,"),
        p("Enterprise software touches customers, money, operations, employees, vendors, or compliance. That means control must be designed into the system."),
        h2("Important controls include:"),
        bullets([
          "Role-based access by department, seniority, location, or function.",
          "Audit logs for create, update, approve, export, and delete actions.",
          "Backup, restore, and rollback planning.",
          "Environment separation for development, staging, and production.",
          "Data export and ownership plan if vendors or platforms change.",
        ]),
        p("These details are not glamorous, but they protect the business after launch."),
        cta("Check my control requirements"),
      ].join("")
    ),
    text: textEmail(
      "Enterprise software must be built for control",
      "Enterprise software needs role-based access, audit logs, backups, rollback, environment separation, data export, and clear ownership."
    ),
  },
  {
    id: "enterprise-software-09-modernize-without-disruption",
    day: 16,
    delayHours: 384,
    name: "Day 16 - modernize without disruption",
    goal: "Speak to legacy modernization pain and reduce risk concern.",
    segmentRule: "Send if lead has not booked after 16 days.",
    subject: "You may not need to replace the whole system",
    previewText: "Modernization can start around the old system before replacing it.",
    html: htmlShell(
      "Modernization can start around the old system before replacing it.",
      "You may not need to replace the whole system",
      [
        p("Hi *|FNAME|*,"),
        p("Many enterprise teams delay modernization because the existing system is painful but still critical. The answer is not always a full replacement on day one."),
        h2("Lower-risk modernization options:"),
        bullets([
          "Build a clean dashboard on top of old data.",
          "Add a new portal for customers, vendors, employees, or partners.",
          "Automate reporting, approvals, or handoffs around the existing system.",
          "Replace one module at a time instead of everything at once.",
          "Create APIs that let old and new systems work together during transition.",
        ]),
        p("This gives leadership progress without risking the operation."),
        cta("Modernize without disruption"),
      ].join("")
    ),
    text: textEmail(
      "You may not need to replace the whole system",
      "Modernization can start with dashboards, portals, automation, module-by-module replacement, or APIs around the old system before a full replacement."
    ),
  },
  {
    id: "enterprise-software-10-final-checklist",
    day: 18,
    delayHours: 432,
    name: "Day 18 - final enterprise checklist",
    goal: "Final nudge with enterprise buying checklist.",
    segmentRule: "Send if no reply, booked call, or sales-qualified tag after 18 days.",
    subject: "Final checklist before choosing an enterprise software partner",
    previewText: "Use this before selecting any ERP, CRM, or enterprise software team.",
    html: htmlShell(
      "Use this before selecting any ERP, CRM, or enterprise software team.",
      "Final checklist before choosing an enterprise software partner",
      [
        p("Hi *|FNAME|*,"),
        p("I will close the loop here unless enterprise software is still active for you. Before selecting a partner, use this checklist."),
        bullets([
          "Can they map the real workflow before proposing a system?",
          "Can they decide custom, platform, hybrid, or automation honestly?",
          "Do they plan integrations, source of truth, and reporting early?",
          "Can they roll out in phases without disrupting operations?",
          "Do they include security, roles, audit logs, and ownership?",
          "Can they add AI with guardrails where it improves real work?",
        ]),
        p("If you want RDMI to review the system, reply with 'enterprise'. If timing is later, reply with the month. If it is closed, reply with 'close'."),
        cta("Reopen my enterprise review"),
      ].join("")
    ),
    text: textEmail(
      "Final checklist before choosing an enterprise software partner",
      "Before selecting a partner, ask if they map the workflow, choose custom/platform/hybrid honestly, plan integrations, support phased rollout, include controls, and use AI safely."
    ),
  },
];

export const enterpriseSoftwareDevelopmentMailchimpSequence: MailchimpSequence = {
  id: "enterprise-software-development-lead-nurture-v1",
  name: "Enterprise Software Development Leads - 10 Email Consultative Nurture",
  audienceTag: "enterprise-software-lead",
  triggerFormTypes: ["enterprise-software-premium", "enterprise-saas"],
  sourceRoutes: ["/enterprise-software-development-company"],
  defaultFromName: "RDMI Web Services",
  defaultReplyTo: brand.email,
  primaryCtaUrl: brand.whatsapp,
  notes: [
    "Use only for leads from /enterprise-software-development-company or formType enterprise-software-premium/enterprise-saas.",
    "Spacing is every 2 days: day 0, 2, 4, 6, 8, 10, 12, 14, 16, and 18.",
    "Stop the sequence when a lead replies, books a call, becomes sales-qualified, or requests no follow-up.",
    "Key nurture angles: workflow mapping, ERP/CRM fit, hybrid architecture, integrations, phased rollout, dashboards, AI governance, controls, and modernization.",
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

export default enterpriseSoftwareDevelopmentMailchimpSequence;
