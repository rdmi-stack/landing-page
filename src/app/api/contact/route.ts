import { NextRequest, NextResponse } from "next/server";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY!;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
const MAILGUN_FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL!;
const MAILGUN_REGION = process.env.MAILGUN_REGION || "US";

const LEAD_TO = "info@rdmi.in";
const LEAD_CC = "rdmitechventurespvtltd@gmail.com";

function mailgunUrl() {
  const base = MAILGUN_REGION === "EU" ? "https://api.eu.mailgun.net" : "https://api.mailgun.net";
  return `${base}/v3/${MAILGUN_DOMAIN}/messages`;
}

async function sendEmail(params: Record<string, string>) {
  const body = new URLSearchParams(params);
  const res = await fetch(mailgunUrl(), {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mailgun error ${res.status}: ${text}`);
  }
  return res.json();
}

// ─── DETECT FORM TYPE ─────────────────────────────────

type FormType = "software" | "seo" | "digital-marketing" | "callback" | "lead-magnet" | "seo-tool" | "quiz" | "seo-course" | "utm";

function detectFormType(message: string): FormType {
  if (message.startsWith("[SEO Services")) return "seo";
  if (message.startsWith("[Digital Marketing")) return "digital-marketing";
  if (message.startsWith("[Callback]")) return "callback";
  if (message.startsWith("[Lead Magnet]")) return "lead-magnet";
  if (message.startsWith("[SEO Tool]")) return "seo-tool";
  if (message.startsWith("[Quiz Funnel]")) return "quiz";
  if (message.startsWith("[SEO Course]")) return "seo-course";
  if (message.startsWith("[UTM:")) return "utm";
  return "software";
}

// ─── EMAIL TEMPLATES ──────────────────────────────────

function emailWrapper(content: string, headerBg: string, headerTitle: string, headerSub: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;color:#e5e5e5;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid #222;overflow:hidden;max-width:600px;">
<tr><td style="background:${headerBg};padding:36px 40px;text-align:center;">
  <h1 style="margin:0;font-size:24px;font-weight:800;color:#fff;">${headerTitle}</h1>
  <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">${headerSub}</p>
</td></tr>
<tr><td style="padding:36px 40px;">${content}</td></tr>
<tr><td style="background:#0d0d0d;padding:20px 40px;text-align:center;border-top:1px solid #1e1e1e;">
  <p style="margin:0 0 4px;font-size:12px;color:#444;">RDMI Tech Ventures Pvt. Ltd.</p>
  <p style="margin:0;font-size:11px;color:#333;">info@rdmi.in | +91 98185 65561</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function summaryTable(fields: [string, string][]) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;margin:20px 0;">
<tr><td style="padding:20px;">
<table width="100%" cellpadding="0" cellspacing="0">
${fields.filter(([, v]) => v).map(([k, v]) => `<tr><td style="font-size:13px;color:#666;width:120px;padding:6px 0;">${k}</td><td style="font-size:13px;color:#e5e5e5;font-weight:500;">${v}</td></tr>`).join("")}
</table></td></tr></table>`;
}

function ctaButton(text: string, url: string, bg: string) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr><td align="center">
<a href="${url}" style="display:inline-block;padding:14px 32px;background:${bg};color:#fff;text-decoration:none;border-radius:50px;font-size:14px;font-weight:600;">${text}</a>
</td></tr></table>`;
}

function stepsBlock(steps: [string, string, string][]) {
  return steps.map(([num, title, desc]) => `
<table cellpadding="0" cellspacing="0" style="margin:8px 0;"><tr>
<td style="width:32px;height:32px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:700;color:#fff;">${num}</td>
<td style="padding-left:12px;"><p style="margin:0;font-size:13px;font-weight:600;color:#fff;">${title}</p><p style="margin:2px 0 0;font-size:12px;color:#666;">${desc}</p></td>
</tr></table>`).join("");
}

function getCustomerEmail(type: FormType, name: string, email: string, phone: string, company: string, budget: string, message: string): { subject: string; html: string; text: string } {
  const firstName = name.split(" ")[0] || name;

  switch (type) {
    case "seo":
      return {
        subject: "Your SEO & GEO Audit Request — RDMI Tech Ventures",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Hi ${firstName}, we've received your SEO audit request!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">Our SEO & GEO strategist is already analyzing your request. You'll receive a <strong style="color:#10b981;">comprehensive 300+ point audit</strong> within 48 hours.</p>
          ${summaryTable([["Name", name], ["Email", email], ["Phone", phone], ["Website", company], ["Budget", budget], ["Goals", message.replace(/\[.*?\]\n?/, "")]])}
          <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#fff;">What's included in your free audit:</p>
          ${stepsBlock([
            ["01", "Technical SEO Analysis", "Core Web Vitals, crawlability, indexation, schema & speed"],
            ["02", "GEO & AI Visibility Check", "How your brand appears in ChatGPT, Perplexity & AI Overviews"],
            ["03", "Competitor Gap Analysis", "Keywords, backlinks & content gaps vs your top 3 competitors"],
            ["04", "Custom SEO + GEO Roadmap", "6-month strategy with KPIs, timelines & expected ROI"],
          ])}
          ${ctaButton("WhatsApp Us for Faster Response", "https://wa.me/919818565561?text=Hi, I just requested an SEO audit", "linear-gradient(135deg,#059669,#10b981)")}
          <p style="margin:0;font-size:12px;color:#555;text-align:center;">Meanwhile, check out our <a href="https://rdmi-landing-page.netlify.app/seo-course" style="color:#10b981;">Free 7-Day SEO Masterclass</a></p>`,
          "linear-gradient(135deg,#059669,#10b981)", "RDMI Tech Ventures", "SEO & GEO Services"
        ),
        text: `Hi ${firstName},\n\nThank you for your SEO audit request! Our strategist will deliver a 300+ point audit within 48 hours.\n\nWhat's included:\n1. Technical SEO analysis\n2. GEO & AI visibility check\n3. Competitor gap analysis\n4. Custom SEO + GEO roadmap\n\n— RDMI Tech Ventures Pvt. Ltd.\ninfo@rdmi.in`,
      };

    case "digital-marketing":
      return {
        subject: "Your Digital Marketing Audit Request — RDMI Tech Ventures",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Hi ${firstName}, your marketing audit is being prepared!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">Our performance marketing team is analyzing your business. You'll receive a <strong style="color:#6366f1;">complete marketing audit</strong> with channel recommendations & estimated ROI within 48 hours.</p>
          ${summaryTable([["Name", name], ["Email", email], ["Phone", phone], ["Website", company], ["Budget", budget], ["Goals", message.replace(/\[.*?\]\n?/, "")]])}
          <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#fff;">Your audit will cover:</p>
          ${stepsBlock([
            ["01", "Current Marketing Assessment", "Website, SEO, paid ads & social presence analysis"],
            ["02", "Competitor Benchmarking", "How your competitors are spending & where they're winning"],
            ["03", "Channel Recommendations", "Best channels for your business — SEO, Google Ads, Meta, LinkedIn"],
            ["04", "Campaign Roadmap & ROI Projection", "Budget allocation, timeline & expected ROAS"],
          ])}
          ${ctaButton("WhatsApp Us for Faster Response", "https://wa.me/919818565561?text=Hi, I just requested a marketing audit", "linear-gradient(135deg,#4f46e5,#7c3aed)")}`,
          "linear-gradient(135deg,#4f46e5,#7c3aed)", "RDMI Tech Ventures", "Digital Marketing Services"
        ),
        text: `Hi ${firstName},\n\nThank you for your marketing audit request! Our team will deliver a complete analysis within 48 hours.\n\nYour audit covers: current assessment, competitor benchmarking, channel recommendations & ROI projection.\n\n— RDMI Tech Ventures Pvt. Ltd.\ninfo@rdmi.in`,
      };

    case "callback":
      return {
        subject: "Callback Confirmed — A Developer Will Call You Shortly | RDMI",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Callback Requested!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">A <strong style="color:#fff;">senior developer</strong> will call you at <strong style="color:#a5b4fc;">${phone}</strong> within <strong style="color:#10b981;">30 minutes</strong> during business hours (Mon-Sat, 10AM-7PM IST).</p>
          <p style="margin:0 0 16px;font-size:14px;color:#aaa;">If you're outside business hours, we'll call you first thing in the morning.</p>
          ${ctaButton("Can't Wait? WhatsApp Us Now", "https://wa.me/919818565561?text=Hi, I requested a callback", "linear-gradient(135deg,#059669,#10b981)")}`,
          "linear-gradient(135deg,#4f46e5,#7c3aed)", "RDMI Tech Ventures", "Callback Confirmation"
        ),
        text: `Callback confirmed! A developer will call you at ${phone} within 30 minutes during business hours.\n\n— RDMI Tech Ventures`,
      };

    case "lead-magnet":
      return {
        subject: "Your Free Download is Ready — RDMI Tech Ventures",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Your download is ready!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">Thank you for downloading our resource. Here's your link — it never expires.</p>
          ${ctaButton("Download Now", "https://rdmi-landing-page.netlify.app/downloads/seo-checklist-2025.pdf", "linear-gradient(135deg,#059669,#10b981)")}
          <p style="margin:16px 0;font-size:14px;color:#aaa;">Want us to implement these optimizations for you? We offer a <strong style="color:#10b981;">free 300+ point SEO audit</strong> — just reply to this email.</p>
          <p style="margin:0;font-size:12px;color:#555;text-align:center;">Also check out our <a href="https://rdmi-landing-page.netlify.app/seo-course" style="color:#10b981;">Free 7-Day SEO Masterclass</a></p>`,
          "linear-gradient(135deg,#059669,#10b981)", "RDMI Tech Ventures", "Your Free Resource"
        ),
        text: `Your download is ready!\n\nDownload: https://rdmi-landing-page.netlify.app/downloads/seo-checklist-2025.pdf\n\nWant us to implement these? Reply for a free SEO audit.\n\n— RDMI Tech Ventures`,
      };

    case "seo-tool":
      return {
        subject: "Your SEO Score Report — RDMI Tech Ventures",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Your SEO score report is here!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">You just ran an SEO audit using our free tool. Here's what we found:</p>
          <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;text-align:center;">
            <p style="margin:0;font-size:13px;color:#666;">${message.replace(/\[.*?\]\s*/, "")}</p>
          </div>
          <p style="margin:0 0 16px;font-size:14px;color:#aaa;">Want the <strong style="color:#fff;">full detailed audit</strong> with prioritized fixes, competitor analysis & a custom SEO roadmap? Our team will prepare it for you — <strong style="color:#10b981;">completely free</strong>.</p>
          ${stepsBlock([
            ["01", "Deep Technical Audit", "300+ checkpoints including Core Web Vitals, schema & crawl"],
            ["02", "GEO Visibility Report", "How you appear in ChatGPT, Perplexity & AI Overviews"],
            ["03", "Competitor Analysis", "Your SEO gaps vs top 3 competitors"],
          ])}
          ${ctaButton("Get Full Free Audit", "https://wa.me/919818565561?text=Hi, I used your SEO tool and want a full audit", "linear-gradient(135deg,#059669,#10b981)")}`,
          "linear-gradient(135deg,#059669,#10b981)", "RDMI Tech Ventures", "SEO Audit Report"
        ),
        text: `Your SEO score report!\n\n${message}\n\nWant the full audit? Reply to this email or WhatsApp us at +91 98185 65561.\n\n— RDMI Tech Ventures`,
      };

    case "quiz":
      return {
        subject: "Your Personalized Marketing Plan — RDMI Tech Ventures",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Hi ${firstName}, your custom plan is ready!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">Based on your quiz answers, our strategist is preparing a <strong style="color:#a5b4fc;">personalized marketing recommendation</strong> tailored to your business.</p>
          <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;">
            <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6366f1;">Your Answers</p>
            <p style="margin:0;font-size:13px;color:#ccc;line-height:1.7;">${message.replace("[Quiz Funnel] ", "").replace(/,\s*/g, "<br/>")}</p>
          </div>
          <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#fff;">What happens next:</p>
          ${stepsBlock([
            ["01", "Strategy Review", "Our team reviews your answers and prepares a custom plan"],
            ["02", "Free Strategy Call", "30-min call to discuss recommendations & answer questions"],
            ["03", "Detailed Proposal", "Channel mix, budget allocation, timeline & projected ROI"],
          ])}
          ${ctaButton("Book Strategy Call via WhatsApp", "https://wa.me/919818565561?text=Hi, I completed the quiz and want to discuss my plan", "linear-gradient(135deg,#4f46e5,#7c3aed)")}`,
          "linear-gradient(135deg,#4f46e5,#7c3aed)", "RDMI Tech Ventures", "Your Custom Marketing Plan"
        ),
        text: `Hi ${firstName},\n\nBased on your quiz answers, we're preparing a personalized marketing plan.\n\n${message}\n\nA strategist will reach out within 2 hours.\n\n— RDMI Tech Ventures`,
      };

    case "seo-course":
      return {
        subject: "Welcome to the 7-Day SEO Masterclass! Day 1 Inside",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Welcome to the SEO Masterclass!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">You're now enrolled in our <strong style="color:#10b981;">Free 7-Day SEO Masterclass</strong>. One lesson per day, straight to your inbox.</p>
          <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:24px;margin:16px 0;">
            <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#10b981;">Day 1: How Google Really Works</p>
            <p style="margin:0 0 12px;font-size:14px;line-height:1.7;color:#ccc;">Before you optimize anything, you need to understand how Google crawls, indexes, and ranks pages. Here's the simplified version:</p>
            <p style="margin:0 0 8px;font-size:13px;color:#aaa;"><strong style="color:#fff;">1. Crawling</strong> — Google's bots discover pages by following links</p>
            <p style="margin:0 0 8px;font-size:13px;color:#aaa;"><strong style="color:#fff;">2. Indexing</strong> — Google stores and categorizes the content it found</p>
            <p style="margin:0 0 8px;font-size:13px;color:#aaa;"><strong style="color:#fff;">3. Ranking</strong> — Google's algorithm decides which pages best answer a query</p>
            <p style="margin:16px 0 0;font-size:13px;color:#aaa;">The key ranking factors in 2025: <strong style="color:#fff;">content relevance, backlinks, user experience (Core Web Vitals), E-E-A-T signals,</strong> and increasingly, <strong style="color:#10b981;">entity authority</strong> (how well Google understands your brand).</p>
          </div>
          <p style="margin:0 0 16px;font-size:14px;color:#aaa;"><strong style="color:#fff;">Tomorrow's lesson:</strong> Keyword Research Masterclass — how to find keywords that actually drive revenue.</p>
          <p style="margin:0;font-size:12px;color:#555;text-align:center;">Want us to handle your SEO? <a href="https://rdmi-landing-page.netlify.app/seo-services" style="color:#10b981;">Get a free audit</a></p>`,
          "linear-gradient(135deg,#059669,#10b981)", "RDMI SEO Masterclass", "Day 1 of 7"
        ),
        text: `Welcome to the 7-Day SEO Masterclass!\n\nDay 1: How Google Really Works\n\n1. Crawling — Google bots discover pages by following links\n2. Indexing — Google stores and categorizes content\n3. Ranking — Algorithm decides best answers\n\nKey factors: content relevance, backlinks, UX, E-E-A-T, entity authority.\n\nTomorrow: Keyword Research Masterclass\n\n— RDMI Tech Ventures`,
      };

    // UTM and default software inquiry
    default:
      return {
        subject: "We received your project inquiry — RDMI Tech Ventures",
        html: emailWrapper(
          `<h2 style="margin:0 0 16px;font-size:20px;color:#fff;">Hi ${firstName}, we've got your request!</h2>
          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#aaa;">Thank you for reaching out. A <strong style="color:#fff;">senior developer</strong> (not a sales rep) will review your project and get back within <strong style="color:#a5b4fc;">2 business hours</strong>.</p>
          ${summaryTable([["Name", name], ["Email", email], ["Phone", phone], ["Company", company], ["Budget", budget], ["Project", message.replace(/\[.*?\]\n?/, "")]])}
          <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#fff;">What happens next:</p>
          ${stepsBlock([
            ["01", "Developer review", "A senior dev reviews your requirements & prepares questions"],
            ["02", "Discovery call", "30-min no-obligation call to understand your vision"],
            ["03", "Free prototype", "We build a clickable prototype before you commit"],
          ])}
          ${ctaButton("WhatsApp Us for Faster Response", "https://wa.me/919818565561?text=Hi, I just submitted a project inquiry", "linear-gradient(135deg,#4f46e5,#7c3aed)")}
          <p style="margin:0;font-size:12px;color:#555;text-align:center;">Questions? Reply to this email or reach us at <a href="mailto:info@rdmi.in" style="color:#6366f1;">info@rdmi.in</a></p>`,
          "linear-gradient(135deg,#4f46e5,#7c3aed)", "RDMI Tech Ventures", "Custom Software & App Development"
        ),
        text: `Hi ${firstName},\n\nThank you for your project inquiry! A senior developer will reach out within 2 business hours.\n\nYour submission:\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}${budget ? `Budget: ${budget}\n` : ""}Project: ${message}\n\n— RDMI Tech Ventures Pvt. Ltd.\ninfo@rdmi.in`,
      };
  }
}

// ─── LEAD NOTIFICATION LABELS ─────────────────────────

const formTypeLabels: Record<FormType, string> = {
  software: "Software Inquiry",
  seo: "SEO Services",
  "digital-marketing": "Digital Marketing",
  callback: "Callback Request",
  "lead-magnet": "Lead Magnet Download",
  "seo-tool": "SEO Audit Tool",
  quiz: "Quiz Funnel",
  "seo-course": "SEO Course Enrollment",
  utm: "UTM Landing Page",
};

// ─── MAIN HANDLER ─────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_FROM_EMAIL) {
    console.error("Missing Mailgun env vars");
    return NextResponse.json(
      { error: "Server misconfiguration. Please contact us directly at info@rdmi.in" },
      { status: 500 }
    );
  }

  try {
    const { name, email, phone, company, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const formType = detectFormType(message);
    const customerEmail = getCustomerEmail(formType, name, email, phone || "", company || "", budget || "", message);

    // 1. Send context-aware customer email
    await sendEmail({
      from: `RDMI Tech Ventures <${MAILGUN_FROM_EMAIL}>`,
      to: email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
    });

    // 2. Send lead notification to team
    const label = formTypeLabels[formType];
    await sendEmail({
      from: `RDMI Lead Alert <${MAILGUN_FROM_EMAIL}>`,
      to: LEAD_TO,
      cc: LEAD_CC,
      subject: `[${label}] ${name}${company ? ` (${company})` : ""} — ${budget || "Budget TBD"}`,
      html: emailWrapper(
        `<div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin-bottom:20px;">
          <p style="margin:0 0 12px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#10b981;">Lead Details</p>
          ${[
            ["Type", `<span style="display:inline-block;padding:2px 10px;background:#4f46e5;border-radius:20px;font-size:11px;font-weight:600;color:#fff;">${label}</span>`],
            ["Name", name],
            ["Email", `<a href="mailto:${email}" style="color:#6366f1;">${email}</a>`],
            ...(phone ? [["Phone", `<a href="tel:${phone}" style="color:#6366f1;">${phone}</a>`]] : []),
            ...(company ? [["Company/URL", company]] : []),
            ["Budget", budget || "Not specified"],
            ["Submitted", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST"],
          ].map(([k, v]) => `<p style="margin:6px 0;font-size:13px;"><span style="color:#666;display:inline-block;width:100px;">${k}</span> <span style="color:#e5e5e5;">${v}</span></p>`).join("")}
        </div>
        <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin-bottom:20px;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#10b981;">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#ccc;">${message}</p>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="padding-right:8px;"><a href="mailto:${email}?subject=Re: Your inquiry — RDMI" style="display:block;text-align:center;padding:12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Reply to Lead</a></td>
          ${phone ? `<td style="padding-left:8px;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="display:block;text-align:center;padding:12px;background:#059669;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">WhatsApp</a></td>` : ""}
        </tr></table>`,
        "linear-gradient(135deg,#059669,#0d9488)", `New Lead: ${name}`, label
      ),
      text: `[${label}] New Lead: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}Budget: ${budget || "Not specified"}\nMessage: ${message}\nSubmitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[contact] API error:", errMsg);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us at info@rdmi.in" },
      { status: 500 }
    );
  }
}
