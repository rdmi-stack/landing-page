import { NextRequest, NextResponse } from "next/server";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY!;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
const MAILGUN_FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL!;
const MAILGUN_REGION = process.env.MAILGUN_REGION || "US";

const LEAD_TO = "info@rdmi.in";
const LEAD_CC = "rdmitechventurespvtltd@gmail.com";

function mailgunUrl() {
  const base =
    MAILGUN_REGION === "EU"
      ? "https://api.eu.mailgun.net"
      : "https://api.mailgun.net";
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

export async function POST(req: NextRequest) {
  // Guard: ensure env vars are present
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !MAILGUN_FROM_EMAIL) {
    console.error("Missing Mailgun env vars:", {
      MAILGUN_API_KEY: !!MAILGUN_API_KEY,
      MAILGUN_DOMAIN: !!MAILGUN_DOMAIN,
      MAILGUN_FROM_EMAIL: !!MAILGUN_FROM_EMAIL,
    });
    return NextResponse.json(
      { error: "Server misconfiguration. Please contact us directly at info@rdmi.in" },
      { status: 500 }
    );
  }

  try {
    const { name, email, phone, company, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 1. Customer confirmation email
    await sendEmail({
      from: `RDMI Tech Ventures <${MAILGUN_FROM_EMAIL}>`,
      to: email,
      subject: "We received your project inquiry — RDMI Tech Ventures",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;color:#e5e5e5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid #222;overflow:hidden;max-width:600px;">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:40px 40px 32px;text-align:center;">
                    <h1 style="margin:0;font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">RDMI Tech Ventures</h1>
                    <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">Custom Software & App Development</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#fff;">Hi ${name}, we've got your request! 🎉</h2>
                    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#aaa;">
                      Thank you for reaching out to us. A <strong style="color:#fff;">senior developer</strong> (not a sales rep) will review your project and get back to you within <strong style="color:#a5b4fc;">2 business hours</strong>.
                    </p>

                    <!-- Summary Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;margin-bottom:24px;">
                      <tr><td style="padding:24px;">
                        <p style="margin:0 0 16px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6366f1;">Your Submission Summary</p>
                        <table width="100%" cellpadding="4" cellspacing="0">
                          <tr>
                            <td style="font-size:13px;color:#666;width:120px;padding:6px 0;">Name</td>
                            <td style="font-size:13px;color:#e5e5e5;font-weight:500;">${name}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;color:#666;padding:6px 0;">Email</td>
                            <td style="font-size:13px;color:#e5e5e5;font-weight:500;">${email}</td>
                          </tr>
                          ${phone ? `<tr><td style="font-size:13px;color:#666;padding:6px 0;">Phone</td><td style="font-size:13px;color:#e5e5e5;font-weight:500;">${phone}</td></tr>` : ""}
                          ${company ? `<tr><td style="font-size:13px;color:#666;padding:6px 0;">Company</td><td style="font-size:13px;color:#e5e5e5;font-weight:500;">${company}</td></tr>` : ""}
                          ${budget ? `<tr><td style="font-size:13px;color:#666;padding:6px 0;">Budget</td><td style="font-size:13px;color:#e5e5e5;font-weight:500;">${budget}</td></tr>` : ""}
                          <tr>
                            <td style="font-size:13px;color:#666;padding:6px 0;vertical-align:top;">Project</td>
                            <td style="font-size:13px;color:#e5e5e5;font-weight:500;line-height:1.6;">${message}</td>
                          </tr>
                        </table>
                      </td></tr>
                    </table>

                    <!-- What's Next -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr><td>
                        <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#fff;">What happens next?</p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${[
                            ["01", "Developer review", "A senior dev reviews your requirements & prepares questions"],
                            ["02", "Discovery call", "We schedule a 30-min no-obligation call to understand your vision"],
                            ["03", "Free prototype", "We build a clickable prototype before you commit to anything"],
                          ]
                            .map(
                              ([num, title, desc]) => `
                          <tr>
                            <td style="padding:10px 0;vertical-align:top;">
                              <table cellpadding="0" cellspacing="0"><tr>
                                <td style="width:32px;height:32px;background:#4f46e5;border-radius:50%;text-align:center;vertical-align:middle;font-size:11px;font-weight:700;color:#fff;">${num}</td>
                                <td style="padding-left:12px;">
                                  <p style="margin:0;font-size:13px;font-weight:600;color:#fff;">${title}</p>
                                  <p style="margin:2px 0 0;font-size:12px;color:#666;">${desc}</p>
                                </td>
                              </tr></table>
                            </td>
                          </tr>`
                            )
                            .join("")}
                        </table>
                      </td></tr>
                    </table>

                    <!-- CTA -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                      <tr><td align="center">
                        <a href="https://wa.me/919876543210?text=Hi, I just submitted a project inquiry on your website"
                           style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:50px;font-size:14px;font-weight:600;">
                          💬 WhatsApp Us for Faster Response
                        </a>
                      </td></tr>
                    </table>

                    <p style="margin:0;font-size:13px;color:#555;text-align:center;">
                      Questions? Reply to this email or reach us at <a href="mailto:info@rdmi.in" style="color:#6366f1;">info@rdmi.in</a>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#0d0d0d;padding:24px 40px;text-align:center;border-top:1px solid #1e1e1e;">
                    <p style="margin:0 0 4px;font-size:12px;color:#444;">RDMI Tech Ventures Pvt. Ltd.</p>
                    <p style="margin:0;font-size:11px;color:#333;">India's AI-First Custom Software Development Company</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
      text: `Hi ${name},\n\nThank you for your project inquiry! A senior developer will reach out within 2 business hours.\n\nYour submission:\nName: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}${budget ? `Budget: ${budget}\n` : ""}Project: ${message}\n\n— RDMI Tech Ventures Pvt. Ltd.\ninfo@rdmi.in`,
    });

    // 2. Lead notification to team
    await sendEmail({
      from: `RDMI Lead Alert <${MAILGUN_FROM_EMAIL}>`,
      to: LEAD_TO,
      cc: LEAD_CC,
      subject: `🔥 New Lead: ${name}${company ? ` (${company})` : ""} — ${budget || "Budget TBD"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;color:#e5e5e5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:16px;border:1px solid #222;overflow:hidden;max-width:600px;">
                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#059669,#0d9488);padding:32px 40px;text-align:center;">
                    <p style="margin:0 0 6px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.7);">New Lead Alert</p>
                    <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;">🔥 ${name}</h1>
                    ${company ? `<p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.8);">${company}</p>` : ""}
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:32px 40px;">
                    <!-- Lead Details -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;margin-bottom:24px;">
                      <tr><td style="padding:24px;">
                        <p style="margin:0 0 16px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#10b981;">Lead Details</p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="font-size:13px;color:#666;width:100px;padding:8px 0;border-bottom:1px solid #222;">Name</td>
                            <td style="font-size:14px;color:#fff;font-weight:600;padding:8px 0;border-bottom:1px solid #222;">${name}</td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;color:#666;padding:8px 0;border-bottom:1px solid #222;">Email</td>
                            <td style="font-size:14px;padding:8px 0;border-bottom:1px solid #222;"><a href="mailto:${email}" style="color:#6366f1;">${email}</a></td>
                          </tr>
                          ${phone ? `<tr><td style="font-size:13px;color:#666;padding:8px 0;border-bottom:1px solid #222;">Phone</td><td style="font-size:14px;padding:8px 0;border-bottom:1px solid #222;"><a href="tel:${phone}" style="color:#6366f1;">${phone}</a></td></tr>` : ""}
                          ${company ? `<tr><td style="font-size:13px;color:#666;padding:8px 0;border-bottom:1px solid #222;">Company</td><td style="font-size:14px;color:#fff;font-weight:500;padding:8px 0;border-bottom:1px solid #222;">${company}</td></tr>` : ""}
                          <tr>
                            <td style="font-size:13px;color:#666;padding:8px 0;border-bottom:1px solid #222;">Budget</td>
                            <td style="padding:8px 0;border-bottom:1px solid #222;">
                              <span style="display:inline-block;padding:3px 10px;background:#4f46e5;border-radius:20px;font-size:12px;font-weight:600;color:#fff;">${budget || "Not specified"}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-size:13px;color:#666;padding:8px 0;vertical-align:top;">Submitted</td>
                            <td style="font-size:13px;color:#999;padding:8px 0;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td>
                          </tr>
                        </table>
                      </td></tr>
                    </table>

                    <!-- Project Message -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;margin-bottom:24px;">
                      <tr><td style="padding:24px;">
                        <p style="margin:0 0 12px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#10b981;">Project Brief</p>
                        <p style="margin:0;font-size:14px;line-height:1.7;color:#ccc;">${message}</p>
                      </td></tr>
                    </table>

                    <!-- Quick Actions -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:8px;">
                          <a href="mailto:${email}?subject=Re: Your project inquiry — RDMI Tech Ventures"
                             style="display:block;text-align:center;padding:12px;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">
                            ✉️ Reply to Lead
                          </a>
                        </td>
                        ${phone ? `<td style="padding-left:8px;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="display:block;text-align:center;padding:12px;background:#059669;color:#fff;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">💬 WhatsApp</a></td>` : ""}
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#0d0d0d;padding:20px 40px;text-align:center;border-top:1px solid #1e1e1e;">
                    <p style="margin:0;font-size:11px;color:#333;">RDMI Tech Ventures Pvt. Ltd. · Automated Lead Notification</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
      text: `New Lead: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ""}${company ? `Company: ${company}\n` : ""}Budget: ${budget || "Not specified"}\nProject: ${message}\nSubmitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] API error:", message);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us at info@rdmi.in" },
      { status: 500 }
    );
  }
}
