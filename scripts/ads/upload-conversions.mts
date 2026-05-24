/**
 * Offline Conversion Import (OCI): read the leads Google Sheet, find rows you
 * marked Qualified=yes that haven't been uploaded, and push them to Google Ads
 * as "Qualified Lead (OCI)" conversions via their gclid — then mark them
 * Uploaded so they're never double-counted.
 *
 *   node scripts/ads/upload-conversions.mts            # upload qualified rows
 *   node scripts/ads/upload-conversions.mts -- --dry-run  # show what would upload
 *
 * Run on a daily GitHub Actions cron (creds as secrets) for hands-off OCI.
 * Sheet columns: A Timestamp · B Name · C Email · D Phone · E Budget · F Page
 *   · G gclid · H UTMSource · I UTMCampaign · J Qualified · K Value · L Uploaded · M UploadTime
 */

import { GoogleAdsApi } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const DRY = process.argv.includes("--dry-run");
const SHEET_ID = process.env.LEADS_SHEET_ID!;
const OCI_ID = process.env.OCI_CONVERSION_ACTION_ID!;
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");

async function sheetsToken(): Promise<string> {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GA4_OAUTH_REFRESH_TOKEN!, grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!j.access_token) throw new Error("Sheets token: " + JSON.stringify(j));
  return j.access_token;
}

/** Google Ads conversion_date_time: "yyyy-mm-dd hh:mm:ss+05:30" (IST). */
function istNow(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const g = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${g("year")}-${g("month")}-${g("day")} ${g("hour")}:${g("minute")}:${g("second")}+05:30`;
}

const token = await sheetsToken();
const H = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

// 1. Read all data rows
const get = await (await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Leads!A2:M`, { headers: H })).json();
const rows: string[][] = get.values || [];

type Pending = { rowNumber: number; gclid: string; value: number };
const pending: Pending[] = [];
rows.forEach((r, i) => {
  const qualified = (r[9] || "").trim().toLowerCase() === "yes";
  const uploaded = (r[11] || "").trim() !== "";
  const gclid = (r[6] || "").trim();
  if (qualified && !uploaded && gclid) {
    pending.push({ rowNumber: i + 2, gclid, value: Number(r[10]) || 50000 });
  }
});

if (!pending.length) { console.log("No new qualified leads to upload."); process.exit(0); }
console.log(`${pending.length} qualified lead(s) to upload${DRY ? " (dry-run)" : ""}:`);
for (const p of pending) console.log(`  row ${p.rowNumber}  gclid=${p.gclid.slice(0, 18)}…  value=₹${p.value}`);
if (DRY) process.exit(0);

// 2. Upload to Google Ads
const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!, client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});
const customer = client.Customer({
  customer_id: cid, login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});
const when = istNow();
const res = await customer.conversionUploads.uploadClickConversions(
  pending.map((p) => ({
    conversion_action: `customers/${cid}/conversionActions/${OCI_ID}`,
    gclid: p.gclid,
    conversion_date_time: when,
    conversion_value: p.value,
    currency_code: "INR",
  })),
  { partial_failure: true },
);
const failures = (res.partial_failure_error?.details?.length ?? 0) > 0;
console.log(`\n✓ Uploaded ${pending.length} conversion(s) to 'Qualified Lead (OCI)'.${failures ? " (some partial failures — check gclid validity/age)" : ""}`);
if (res.partial_failure_error) console.log("  partial_failure:", res.partial_failure_error.message);

// 3. Mark rows Uploaded (col L) + time (col M)
const data = pending.map((p) => ({ range: `Leads!L${p.rowNumber}:M${p.rowNumber}`, values: [["yes", when]] }));
await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchUpdate`, {
  method: "POST", headers: H,
  body: JSON.stringify({ valueInputOption: "USER_ENTERED", data }),
});
console.log("✓ Marked uploaded rows in the sheet.");
