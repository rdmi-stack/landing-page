/**
 * Append leads to the "RDMI Leads + Offline Conversions" Google Sheet, server-side.
 *
 * Every form submit writes one row WITH its gclid, so qualified leads can later
 * be uploaded to Google Ads as offline conversions (OCI). Uses the GA4 OAuth
 * refresh token (Sheets scope) — same token as GA4 Admin/Data.
 *
 * Requires in env: LEADS_SHEET_ID, GA4_OAUTH_REFRESH_TOKEN, GOOGLE_ADS_CLIENT_ID,
 * GOOGLE_ADS_CLIENT_SECRET. No-ops silently if any are missing; never throws
 * into the caller (fire-and-forget, must not block or fail the form response).
 */

const SHEET_ID = process.env.LEADS_SHEET_ID;
const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GA4_OAUTH_REFRESH_TOKEN;

/** Map the (required) budget selection to a representative conversion value (INR). */
export function budgetToValue(budget: string): number {
  const b = (budget || "").toLowerCase();
  if (b.includes("50l") || b.includes("50,00,000") || /₹?50l\+/.test(b)) return 5_000_000;
  if (b.includes("15l") || b.includes("15,00,000")) return 3_000_000;
  if (b.includes("5l") || b.includes("5,00,000")) return 1_000_000;
  if (b.includes("1l") || b.includes("1,00,000") || b.includes("3,00,000")) return 300_000;
  if (b.includes("50k") || b.includes("50,000")) return 75_000;
  return 50_000; // "Not sure yet" / unknown → lowest
}

async function accessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  return j.access_token ?? null;
}

export interface LeadRow {
  name: string;
  email: string;
  phone: string;
  budget: string;
  page: string;
  gclid: string;
  utmSource: string;
  utmCampaign: string;
  value: number;
}

/** Append one lead row. Columns: Timestamp·Name·Email·Phone·Budget·Page·gclid·UTMSource·UTMCampaign·Qualified·Value·Uploaded·UploadTime */
export async function appendLeadRow(lead: LeadRow): Promise<void> {
  if (!SHEET_ID) return;
  try {
    const token = await accessToken();
    if (!token) return;
    const ts = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const row = [
      ts, lead.name, lead.email, lead.phone, lead.budget, lead.page,
      lead.gclid, lead.utmSource, lead.utmCampaign,
      "", // Qualified — set by you (yes/no)
      lead.value, // pre-filled budget-derived value; editable
      "", "", // Uploaded, Upload Time — set by the OCI upload script
    ];
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Leads!A:M:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [row] }),
      },
    );
  } catch (e) {
    console.error("[leads-sheet] append failed:", e);
  }
}
