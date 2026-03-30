import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/data/leads";

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

type FormType = "software" | "ai-agent" | "seo" | "digital-marketing" | "callback" | "lead-magnet" | "seo-tool" | "quiz" | "seo-course" | "utm";

function detectFormType(message: string): FormType {
  if (message.startsWith("[AI Agent")) return "ai-agent";
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
    case "ai-agent":
      return {
        subject: `${firstName}, your AI strategy session is confirmed — RDMI AI`,
        html: emailWrapper(
          `<h2 style="margin:0 0 8px;font-size:22px;color:#fff;">Hi ${firstName}, your AI project is in expert hands.</h2>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#ccc;">A <strong style="color:#fff;">senior AI engineer</strong> — not a sales rep — is reviewing your requirements right now and will call you within <strong style="color:#c4b5fd;">2 hours</strong>.</p>

          ${summaryTable([["Name", name], ["Email", email], ["Phone", phone], ["Company", company], ["Budget", budget], ["Project", message.replace(/\[.*?\]\n?/g, "")]])}

          <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#fff;">Your AI Journey — Step by Step:</p>
          ${stepsBlock([
            ["01", "AI Strategy Call (Within 2 Hours)", "Senior AI engineer assesses your use case, data readiness, and recommends: LLM vs RAG vs Agent vs ML pipeline"],
            ["02", "Working Prototype (2 Weeks)", "Real AI processing YOUR data — not a slide deck. Test it, break it, validate ROI before committing"],
            ["03", "Production Build (4-8 Weeks)", "Enterprise-grade: monitoring, fallbacks, human-in-the-loop, audit logs. Contracted accuracy benchmarks"],
            ["04", "Deploy & Scale", "Production launch with KPI dashboard. 30-day free optimization. Model retraining included"],
          ])}

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 20px;background:linear-gradient(135deg,#1a1028,#0f172a);border-radius:12px;border:1px solid #312e81;"><tr><td style="padding:24px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#818cf8;">AI Solutions We Build</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
              <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;">🤖 <strong style="color:#c4b5fd;">AI Chatbots & Voice Agents</strong> — 24/7 support, 80% deflection, WhatsApp/Web/Slack/Phone</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;">🧠 <strong style="color:#c4b5fd;">Autonomous AI Agents</strong> — LangChain/CrewAI agents that research, draft, execute end-to-end</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;">📄 <strong style="color:#c4b5fd;">RAG Knowledge Bases</strong> — Query 50K+ docs in plain English, zero hallucination</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;">⚡ <strong style="color:#c4b5fd;">Workflow Automation</strong> — n8n + custom orchestration, ₹1.2Cr/year saved for one client</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;">🎯 <strong style="color:#c4b5fd;">AI Copilots & SaaS Features</strong> — Smart search, recommendations, in-app AI assistant</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#94a3b8;">👁️ <strong style="color:#c4b5fd;">Computer Vision & Document AI</strong> — OCR, image recognition, ID verification, 95%+ accuracy</td></tr>
            </table>
          </td></tr></table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;"><tr><td style="padding:20px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#fff;text-align:center;">Our AI Guarantee</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;font-size:12px;color:#aaa;"><span style="color:#10b981;font-weight:700;">✓</span> Contracted accuracy benchmarks — not met? We iterate free</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#aaa;"><span style="color:#10b981;font-weight:700;">✓</span> 14-day money-back on discovery sprints</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#aaa;"><span style="color:#10b981;font-weight:700;">✓</span> Full source code + model weights ownership on final payment</td></tr>
              <tr><td style="padding:6px 0;font-size:12px;color:#aaa;"><span style="color:#10b981;font-weight:700;">✓</span> NDA signed before first call — your data stays your data</td></tr>
            </table>
          </td></tr></table>

          ${ctaButton("WhatsApp Our AI Team Now", "https://wa.me/919818565561?text=Hi%2C%20I%20just%20submitted%20an%20AI%20project%20inquiry.%20Can%20we%20discuss%3F", "linear-gradient(135deg,#7c3aed,#4f46e5)")}

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;"><tr>
            <td style="text-align:center;">
              <a href="tel:+919818565561" style="font-size:14px;color:#c4b5fd;text-decoration:none;font-weight:600;">+91 98185 65561</a>
              <span style="color:#333;margin:0 8px;">|</span>
              <a href="mailto:info@rdmi.in" style="font-size:14px;color:#c4b5fd;text-decoration:none;font-weight:600;">info@rdmi.in</a>
            </td>
          </tr></table>

          <p style="margin:16px 0 0;font-size:11px;color:#444;text-align:center;line-height:1.6;">76% of enterprises buy AI, not build it · 50+ AI products shipped · Performance guaranteed · India | USA | UK</p>`,
          "linear-gradient(135deg,#7c3aed,#4f46e5)", "RDMI AI", "AI Agent & GenAI Consulting"
        ),
        text: `Hi ${firstName},\n\nYour AI project inquiry is confirmed! A senior AI engineer will call within 2 hours.\n\n${message}\n\nNext steps:\n1. AI Strategy Call — within 2 hours\n2. Working Prototype — 2 weeks\n3. Production Build — 4-8 weeks\n4. Deploy & Scale\n\nAI Solutions:\n• AI Chatbots & Voice Agents\n• Autonomous AI Agents (LangChain/CrewAI)\n• RAG Knowledge Bases\n• Workflow Automation (n8n)\n• AI Copilots & SaaS Features\n• Computer Vision & Document AI\n\nGuarantee: Contracted accuracy benchmarks or we iterate free. 14-day money-back on discovery.\n\nWhatsApp: +91 98185 65561\nEmail: info@rdmi.in\n\n— RDMI Tech Ventures Pvt. Ltd.`,
      };

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
        subject: `${firstName}, your free prototype request is confirmed — RDMI AI`,
        html: emailWrapper(
          `<h2 style="margin:0 0 8px;font-size:22px;color:#fff;">Hi ${firstName}, great news!</h2>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#ccc;">Your request has been received. A <strong style="color:#fff;">senior developer</strong> — not a salesperson — is reviewing your project right now and will reach out within <strong style="color:#a5b4fc;">2 hours</strong>.</p>

          ${summaryTable([["Name", name], ["Email", email], ["Phone", phone], ["Company", company], ["Budget", budget], ["Project", message.replace(/\[.*?\]\n?/, "")]])}

          <p style="margin:0 0 12px;font-size:15px;font-weight:700;color:#fff;">Here's exactly what happens next:</p>
          ${stepsBlock([
            ["01", "Developer Call (Within 2 Hours)", "A 5+ year senior developer calls to discuss your project — not a BDM or sales rep"],
            ["02", "Free Prototype (Within 48 Hours)", "You receive a clickable prototype with architecture, timeline & fixed-price quote"],
            ["03", "Review & Approve", "Love it? We start. Don't love it? Walk away — ₹0 cost, zero obligation"],
            ["04", "Sprint Development Begins", "2-week sprints with live demos. You see working software every 14 days"],
          ])}

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 20px;background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;"><tr><td style="padding:24px;">
            <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#fff;text-align:center;">Why 200+ Clients Trust RDMI AI</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#aaa;"><span style="color:#a5b4fc;font-weight:700;">✦</span> <strong style="color:#e5e5e5;">Talk to Developers Directly</strong> — No middlemen, no PM markup. Direct WhatsApp/Slack with your dev team.</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#aaa;"><span style="color:#10b981;font-weight:700;">✦</span> <strong style="color:#e5e5e5;">Save 50% vs US/UK Agencies</strong> — Same React/Next.js/Flutter stack, same senior devs. AI-powered delivery = half the cost.</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#aaa;"><span style="color:#c084fc;font-weight:700;">✦</span> <strong style="color:#e5e5e5;">AI-Native Development</strong> — Every product ships with AI built-in: OpenAI, Claude, Gemini, LangChain, CrewAI. Not bolted on later.</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#aaa;"><span style="color:#fbbf24;font-weight:700;">✦</span> <strong style="color:#e5e5e5;">Money-Back Deadline Guarantee</strong> — Fixed price. If we miss the deadline, you get a refund. No fine print.</td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:13px;color:#aaa;"><span style="color:#f87171;font-weight:700;">✦</span> <strong style="color:#e5e5e5;">You Own 100% of the Code</strong> — NDA signed before first call. Full IP transfer. No lock-in, ever.</td>
              </tr>
            </table>
          </td></tr></table>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background:linear-gradient(135deg,#1a1028,#0f172a);border-radius:12px;border:1px solid #312e81;"><tr><td style="padding:24px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#818cf8;">AI-Powered by</p>
            <p style="margin:0 0 16px;font-size:14px;font-weight:700;color:#fff;">OpenAI · Claude · Gemini · LangChain · CrewAI · n8n</p>
            <p style="margin:0 0 14px;font-size:13px;color:#aaa;line-height:1.7;">We don't just build apps — we build <strong style="color:#e5e5e5;">intelligent software</strong> with AI baked into the core:</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#94a3b8;">🤖 <strong style="color:#c4b5fd;">AI Chatbots & Voice Agents</strong> — 24/7 customer support that handles 80% of tickets automatically</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#94a3b8;">🧠 <strong style="color:#c4b5fd;">AI Agents & Autonomous Workflows</strong> — LangChain/CrewAI agents that replace 10+ hrs/week of manual tasks</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#94a3b8;">📄 <strong style="color:#c4b5fd;">RAG Knowledge Bases</strong> — Query your documents, PDFs & databases in plain English. 60% faster research.</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#94a3b8;">⚡ <strong style="color:#c4b5fd;">AI Workflow Automation</strong> — n8n + custom orchestration replacing repetitive business processes end-to-end</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#94a3b8;">🎯 <strong style="color:#c4b5fd;">Smart Recommendations & Copilots</strong> — Boost AOV 35%, personalize UX, in-app AI assistants</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:12px;color:#94a3b8;">👁️ <strong style="color:#c4b5fd;">Computer Vision & Document AI</strong> — OCR, image recognition, invoice processing, ID verification</td>
              </tr>
            </table>
            <p style="margin:14px 0 0;font-size:12px;color:#6366f1;font-weight:600;text-align:center;">Every project gets AI capabilities — even if you didn't ask for them. That's our edge.</p>
          </td></tr></table>

          ${ctaButton("WhatsApp Us for Faster Response", "https://wa.me/919818565561?text=Hi%2C%20I%20just%20submitted%20a%20project%20inquiry.%20Can%20we%20discuss%3F", "linear-gradient(135deg,#4f46e5,#7c3aed)")}

          <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;"><tr>
            <td style="text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#666;">Or call us directly:</p>
              <a href="tel:+919818565561" style="font-size:14px;color:#a5b4fc;text-decoration:none;font-weight:600;">+91 98185 65561</a>
              <span style="color:#333;margin:0 8px;">|</span>
              <a href="mailto:info@rdmi.in" style="font-size:14px;color:#a5b4fc;text-decoration:none;font-weight:600;">info@rdmi.in</a>
            </td>
          </tr></table>

          <p style="margin:16px 0 0;font-size:11px;color:#444;text-align:center;line-height:1.6;">₹47Cr+ client revenue generated · 200+ projects shipped · NDA protected · India | USA | UK</p>`,
          "linear-gradient(135deg,#4f46e5,#7c3aed)", "RDMI AI", "Custom Software & App Development"
        ),
        text: `Hi ${firstName},\n\nYour project request has been received! A senior developer (not a salesperson) will reach out within 2 hours.\n\nYour submission:\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}${budget ? `Budget: ${budget}\n` : ""}Project: ${message}\n\nWhat happens next:\n1. Developer calls within 2 hours\n2. Free prototype in 48 hours\n3. Review & approve (₹0 if you don't like it)\n4. Sprint development begins\n\nWhy RDMI AI:\n• Talk to developers directly — no middlemen\n• Save 50% vs US/UK agencies\n• AI-native development (OpenAI, Claude, Gemini, LangChain, CrewAI)\n• Money-back deadline guarantee\n• You own 100% of the code\n\nAI-Powered Products We Build:\n• AI Chatbots & Voice Agents — 24/7 support, 80% ticket deflection\n• AI Agents & Workflows — LangChain/CrewAI autonomous task execution\n• RAG Knowledge Bases — query documents in plain English\n• AI Workflow Automation — n8n + custom orchestration\n• Smart Recommendations & Copilots — boost AOV 35%\n• Computer Vision & Document AI — OCR, image recognition\n\nWhatsApp: +91 98185 65561\nEmail: info@rdmi.in\n\n— RDMI Tech Ventures Pvt. Ltd.`,
      };
  }
}

// ─── LEAD NOTIFICATION LABELS ─────────────────────────

const formTypeLabels: Record<FormType, string> = {
  software: "Software Inquiry",
  "ai-agent": "🤖 AI Agent / GenAI Inquiry",
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

    // Store lead locally for admin panel
    const referer = req.headers.get("referer") || "";
    const sourcePage = referer ? new URL(referer).pathname : "unknown";
    try {
      await saveLead({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        email,
        phone: phone || "",
        company: company || "",
        budget: budget || "",
        message,
        formType,
        source: sourcePage,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      console.error("[contact] Failed to save lead locally:", e);
    }

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
