/**
 * Add ad extensions (assets) to the campaign via the Google Ads API:
 * sitelinks, callouts, structured snippets. Idempotent-ish — creates fresh
 * assets and links them; safe to run once after the push.
 *
 *   node scripts/ads/add-extensions.mts
 */

import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";
import { DOMAIN, CALLOUTS, STRUCTURED_SNIPPET } from "./config.mts";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const LP = `${DOMAIN}/web-development-company`;
const SITELINKS = [
  { link_text: "Get a Free Quote", description1: "Senior dev replies in 2 hours", description2: "Free 48-hour prototype", final_urls: [`${LP}#lead-form`] },
  { link_text: "See Live Work", description1: "Real projects, real outcomes", description2: "200+ websites shipped", final_urls: [LP] },
  { link_text: "Contact Us", description1: "Email, phone, WhatsApp", description2: "Talk to a real developer", final_urls: [`${DOMAIN}/contact`] },
  { link_text: "About RDMI", description1: "India-based senior team", description2: "200+ products shipped", final_urls: [`${DOMAIN}/about`] },
];

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});
const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ""),
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

const camp = await customer.query(`
  SELECT campaign.resource_name FROM campaign
  WHERE campaign.name LIKE 'RDMI | Search | India%' AND campaign.status != 'REMOVED'
  ORDER BY campaign.id DESC LIMIT 1`);
const campaign = camp[0].campaign!.resource_name!;

// 1. Create assets
const sitelinkAssets = (
  await customer.assets.create(
    SITELINKS.map((s) => ({ sitelink_asset: { link_text: s.link_text, description1: s.description1, description2: s.description2 }, final_urls: s.final_urls })),
  )
).results.map((r) => r.resource_name!);

const calloutAssets = (
  await customer.assets.create(CALLOUTS.map((callout_text) => ({ callout_asset: { callout_text } })))
).results.map((r) => r.resource_name!);

const [{ resource_name: snippetAsset }] = (
  await customer.assets.create([
    { structured_snippet_asset: { header: STRUCTURED_SNIPPET.header, values: STRUCTURED_SNIPPET.values } },
  ])
).results;
console.log(`✓ assets created — ${sitelinkAssets.length} sitelinks, ${calloutAssets.length} callouts, 1 structured snippet`);

// 2. Link assets to the campaign
await customer.campaignAssets.create([
  ...sitelinkAssets.map((asset) => ({ campaign, asset, field_type: enums.AssetFieldType.SITELINK })),
  ...calloutAssets.map((asset) => ({ campaign, asset, field_type: enums.AssetFieldType.CALLOUT })),
  { campaign, asset: snippetAsset, field_type: enums.AssetFieldType.STRUCTURED_SNIPPET },
]);
console.log(`✓ linked to campaign — sitelinks + callouts + structured snippet (Services)`);
console.log("  Extensions go live with the campaign once it's enabled + reviewed.");
