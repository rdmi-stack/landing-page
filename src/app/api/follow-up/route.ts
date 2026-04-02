import { NextRequest, NextResponse } from "next/server";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY!;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
const MAILGUN_FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL!;
const MAILGUN_REGION = process.env.MAILGUN_REGION || "US";

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

// ─── EMAIL TEMPLATES BY SEQUENCE + DAY ──────────

function wrap(content: string, accent: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;color:#e5e5e5;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 16px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid #222;max-width:560px;">
<tr><td style="padding:32px 32px 28px;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;">
    <span style="font-size:18px;font-weight:800;color:#fff;">RDMI</span>
    <span style="background:linear-gradient(135deg,${accent},#7c3aed);padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;color:#fff;letter-spacing:1px;">AI</span>
  </div>
  ${content}
</td></tr>
<tr><td style="background:#0d0d0d;padding:16px 32px;text-align:center;border-top:1px solid #1e1e1e;">
  <p style="margin:0;font-size:11px;color:#444;">RDMI Tech Ventures Pvt. Ltd. · info@rdmi.in · +91 98185 65561</p>
  <p style="margin:4px 0 0;font-size:10px;color:#333;">You received this because you inquired at rdmi.in. <a href="mailto:info@rdmi.in?subject=Unsubscribe" style="color:#555;">Unsubscribe</a></p>
</td></tr>
</table></td></tr></table></body></html>`;
}

type Sequence = "hot" | "warm" | "cold";

interface SequenceEmail {
  subject: string;
  html: string;
}

function getSequenceEmail(
  sequence: Sequence,
  day: number,
  name: string,
  product: string
): SequenceEmail | null {
  const firstName = name.split(" ")[0] || name;
  const accent = "#6366f1";

  // ─── HOT SEQUENCE (5 emails over 10 days) ───
  if (sequence === "hot") {
    switch (day) {
      case 1:
        return {
          subject: `${firstName}, here's your project scope — RDMI AI`,
          html: wrap(`
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Hi ${firstName},</h2>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Following up on our conversation about <strong style="color:#fff;">${product}</strong>.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">As promised, here's the scope outline with timeline and estimated investment. Your free prototype is being prepared and will be ready within 48 hours.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;"><strong style="color:#a5b4fc;">What's included in the prototype:</strong></p>
            <ul style="padding-left:20px;margin:12px 0;font-size:13px;color:#aaa;line-height:2;">
              <li>Clickable UI with your core user flows</li>
              <li>Architecture diagram + tech stack recommendation</li>
              <li>Sprint breakdown with milestones</li>
              <li>Fixed-price quote (the quote IS the final bill)</li>
            </ul>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Zero cost. Zero obligation. If you don't love it, walk away.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr><td align="center">
              <a href="https://wa.me/919818565561?text=Hi%20RDMI%2C%20following%20up%20on%20my%20project%20inquiry" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;">Reply on WhatsApp</a>
            </td></tr></table>
          `, accent),
        };
      case 3:
        return {
          subject: `Your free prototype is ready, ${firstName}`,
          html: wrap(`
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">${firstName}, your prototype is ready!</h2>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">We've built a working preview for your <strong style="color:#fff;">${product}</strong> project.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Here's what's included:</p>
            <ul style="padding-left:20px;margin:12px 0;font-size:13px;color:#aaa;line-height:2;">
              <li>Clickable prototype with your core flows</li>
              <li>Architecture & tech stack decision document</li>
              <li>Sprint plan with 2-week milestones</li>
              <li>Fixed-price quote — no hidden costs</li>
            </ul>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Want to see it? Just reply to this email or WhatsApp us. We'll walk you through it in 15 minutes.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;"><strong style="color:#10b981;">Reminder:</strong> Zero cost to review. If it's not right, walk away.</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr><td align="center">
              <a href="https://wa.me/919818565561?text=Hi%2C%20I%27d%20like%20to%20see%20my%20prototype" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#059669,#10b981);color:#fff;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;">View My Prototype</a>
            </td></tr></table>
          `, accent),
        };
      case 5:
        return {
          subject: `How similar companies used AI to cut costs 40% — ${firstName}`,
          html: wrap(`
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Hi ${firstName},</h2>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">While your prototype is ready for review, I wanted to share how companies in a similar space are using AI to drive real results:</p>
            <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;">
              <p style="margin:0 0 12px;font-size:13px;color:#aaa;">🏥 <strong style="color:#e5e5e5;">Healthcare RCM platform</strong> — AI catches 92% of claim errors before submission. Recovered ₹Crores in lost revenue.</p>
              <p style="margin:0 0 12px;font-size:13px;color:#aaa;">📧 <strong style="color:#e5e5e5;">Inbox automation agent</strong> — 73% of shared inbox emails auto-resolved. Response time: 4 hours → 12 minutes.</p>
              <p style="margin:0;font-size:13px;color:#aaa;">📞 <strong style="color:#e5e5e5;">AI voice front desk</strong> — Recovered 340 missed calls/month. Revenue up 28% for a dental chain.</p>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Your <strong style="color:#fff;">${product}</strong> project has similar ROI potential. Want to discuss?</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr><td align="center">
              <a href="https://wa.me/919818565561" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;">Let's Discuss ROI</a>
            </td></tr></table>
          `, accent),
        };
      case 7:
        return {
          subject: `Quick question about your ${product} project`,
          html: wrap(`
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Hi ${firstName},</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Just checking in — did you get a chance to review the prototype we prepared for your <strong style="color:#fff;">${product}</strong> project?</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">If you have any questions or need changes, I'm happy to jump on a quick 15-min call. No pressure — just want to make sure you have everything you need to make a decision.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">You can reply here, WhatsApp me, or book a time that works for you.</p>
            <p style="font-size:14px;color:#a5b4fc;font-weight:600;margin-top:16px;">— Senior AI Engineer, RDMI AI</p>
          `, accent),
        };
      case 10:
        return {
          subject: `${firstName}, ready when you are`,
          html: wrap(`
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Hi ${firstName},</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">I know timing matters — so just a quick note to say your prototype and proposal for <strong style="color:#fff;">${product}</strong> are ready whenever you are.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;"><strong style="color:#fff;">What's waiting for you:</strong></p>
            <ul style="padding-left:20px;margin:12px 0;font-size:13px;color:#aaa;line-height:2;">
              <li>Working prototype (clickable)</li>
              <li>Fixed-price proposal (no surprises)</li>
              <li>Sprint plan with milestones</li>
              <li>Money-back deadline guarantee</li>
            </ul>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">No rush. When you're ready, just reply or WhatsApp. We'll pick up right where we left off.</p>
            <p style="font-size:14px;line-height:1.7;color:#666;">If the timing isn't right, I'll add you to our monthly AI insights digest — we share case studies and industry trends. No spam, just value.</p>
            <p style="font-size:14px;color:#a5b4fc;font-weight:600;margin-top:16px;">— RDMI AI Team</p>
          `, accent),
        };
      default:
        return null;
    }
  }

  // ─── WARM SEQUENCE (key emails from 12-email nurture) ───
  if (sequence === "warm") {
    switch (day) {
      case 1:
        return {
          subject: `3 AI workflows saving businesses 40% in ops cost`,
          html: wrap(`
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Hi ${firstName},</h2>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Thanks for your interest in AI-powered solutions. Here are 3 real workflows we've built that are saving businesses serious money:</p>
            <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;">
              <p style="margin:0 0 14px;font-size:13px;color:#aaa;"><strong style="color:#c4b5fd;">1. AI Support Agent</strong> — Handles 80% of customer tickets 24/7. Saves 2-3 support staff salaries/year.</p>
              <p style="margin:0 0 14px;font-size:13px;color:#aaa;"><strong style="color:#c4b5fd;">2. Document Processing Agent</strong> — Extracts data from invoices, contracts, forms in seconds. 70% less manual data entry.</p>
              <p style="margin:0;font-size:13px;color:#aaa;"><strong style="color:#c4b5fd;">3. RAG Knowledge Base</strong> — Employees query 50K+ docs in plain English. 60% faster internal research.</p>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Which of these resonates most with your business? Reply and I'll share a detailed breakdown.</p>
            <p style="font-size:14px;color:#a5b4fc;font-weight:600;margin-top:16px;">— RDMI AI Team</p>
          `, accent),
        };
      case 7:
        return {
          subject: `Is your business AI-ready? (5-min assessment)`,
          html: wrap(`
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Hi ${firstName},</h2>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Most businesses want AI but don't know where to start. Here's a quick self-assessment:</p>
            <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;">
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;">✅ Do you have repetitive processes that eat 10+ hours/week?</p>
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;">✅ Does your team copy-paste data between systems?</p>
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;">✅ Are customers waiting hours for support responses?</p>
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;">✅ Do employees search through documents to find answers?</p>
              <p style="margin:0;font-size:13px;color:#aaa;">✅ Are you spending on SaaS tools that could be replaced by custom AI?</p>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">If you checked 2 or more — AI can likely save you 30-60% in operational costs within 90 days.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Want a free assessment specific to your business? Reply with "AI audit" and we'll prepare one in 48 hours.</p>
          `, accent),
        };
      case 14:
        return {
          subject: `The "show before commit" model — why we build free prototypes`,
          html: wrap(`
            <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Hi ${firstName},</h2>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Most AI agencies ask you to sign a contract before showing you anything. We think that's backwards.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;"><strong style="color:#fff;">Here's how RDMI works:</strong></p>
            <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;">
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;"><strong style="color:#10b981;">Step 1:</strong> You tell us what you need (30-min call)</p>
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;"><strong style="color:#10b981;">Step 2:</strong> We build a working prototype (48 hours, free)</p>
              <p style="margin:0 0 8px;font-size:13px;color:#aaa;"><strong style="color:#10b981;">Step 3:</strong> You review it. Love it? We start. Don't? Walk away. ₹0.</p>
              <p style="margin:0;font-size:13px;color:#aaa;"><strong style="color:#10b981;">Step 4:</strong> Fixed-price build with money-back deadline guarantee</p>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">Zero risk. You see working software before spending a single rupee.</p>
            <p style="font-size:14px;line-height:1.7;color:#aaa;">When you're ready to explore, just reply. No pressure.</p>
          `, accent),
        };
      default:
        return null;
    }
  }

  // ─── COLD: Monthly digest ───
  if (sequence === "cold" && day === 1) {
    return {
      subject: `Monthly AI Insights — What's Working in ${new Date().toLocaleString("en-US", { month: "long" })} 2026`,
      html: wrap(`
        <h2 style="margin:0 0 12px;font-size:20px;color:#fff;">Hi ${firstName},</h2>
        <p style="font-size:14px;line-height:1.7;color:#aaa;">Here's what's actually working in AI right now — no hype, just results:</p>
        <div style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;padding:20px;margin:16px 0;">
          <p style="margin:0 0 14px;font-size:13px;color:#aaa;">📊 <strong style="color:#e5e5e5;">Trend:</strong> 76% of enterprises now buy AI solutions instead of building in-house (Menlo 2025)</p>
          <p style="margin:0 0 14px;font-size:13px;color:#aaa;">🏆 <strong style="color:#e5e5e5;">Case Study:</strong> AI voice agent recovered 340 missed calls/month for a dental chain → 28% revenue increase</p>
          <p style="margin:0;font-size:13px;color:#aaa;">💡 <strong style="color:#e5e5e5;">Tip:</strong> Start with your highest-volume, lowest-complexity workflow — that's where AI ROI hits fastest</p>
        </div>
        <p style="font-size:14px;line-height:1.7;color:#aaa;">Need help figuring out where AI fits in your business? We offer a free 30-min consultation — no strings attached.</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr><td align="center">
          <a href="https://wa.me/919818565561?text=Hi%20RDMI%2C%20I%27d%20like%20a%20free%20AI%20consultation" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:50px;font-size:13px;font-weight:600;">Book Free Consultation</a>
        </td></tr></table>
      `, accent),
    };
  }

  return null;
}

// ─── API HANDLER ───

export async function POST(req: NextRequest) {
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_FROM_EMAIL) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  try {
    const { email, name, sequence, day, product } = await req.json();

    if (!email || !name || !sequence || !day) {
      return NextResponse.json({ error: "email, name, sequence, and day are required" }, { status: 400 });
    }

    const emailContent = getSequenceEmail(sequence as Sequence, day, name, product || "your project");
    if (!emailContent) {
      return NextResponse.json({ error: `No email template for sequence=${sequence} day=${day}` }, { status: 400 });
    }

    await sendEmail({
      from: `RDMI AI <${MAILGUN_FROM_EMAIL}>`,
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: `Hi ${name.split(" ")[0]}, follow-up from RDMI AI regarding ${product || "your project"}. Reply to this email or WhatsApp us at +91 98185 65561.`,
    });

    return NextResponse.json({ success: true, sequence, day });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[follow-up] API error:", message);
    return NextResponse.json({ error: "Failed to send follow-up email" }, { status: 500 });
  }
}
