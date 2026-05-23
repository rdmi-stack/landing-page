/**
 * Add campaign-level ad assets (sitelinks, callouts, structured snippets) to a
 * web-dev campaign via the Google Ads API. Extensions lift CTR and Ad Strength
 * (Google's "add 6 more sitelinks" tip). Idempotent: skips a field type that's
 * already linked to the campaign.
 *
 *   node scripts/ads/add-extensions.mts                 # default: CSV Import campaign
 *   node scripts/ads/add-extensions.mts "Search | India" # match a different campaign by name
 */

import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";
import { DOMAIN, SITELINKS, CALLOUTS, STRUCTURED_SNIPPET } from "./config.mts";

const envPath = path.resolve(process.cwd(), ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const NAME_MATCH = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "CSV Import";

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});
const cid = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
const customer = client.Customer({
  customer_id: cid,
  login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ""),
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

const camps = await customer.query(`
  SELECT campaign.id, campaign.name FROM campaign
  WHERE campaign.name LIKE '%${NAME_MATCH}%' AND campaign.status != 'REMOVED'
  ORDER BY campaign.id DESC
`);
if (!camps.length) throw new Error(`No campaign matching "${NAME_MATCH}"`);
const campaignId = camps[0].campaign!.id!;
const campaign = `customers/${cid}/campaigns/${campaignId}`;
console.log(`Target: ${camps[0].campaign!.name}  (id ${campaignId})`);

// What's already linked? Skip those field types so reruns don't duplicate.
const linked = await customer.query(`
  SELECT campaign.id, campaign_asset.field_type FROM campaign_asset
  WHERE campaign.id = ${campaignId} AND campaign_asset.status != 'REMOVED'
`);
const have = new Set(linked.map((r) => r.campaign_asset!.field_type));

async function linkAssets(assets: object[], fieldType: number, label: string) {
  if (have.has(fieldType)) {
    console.log(`  • ${label} already linked — skipped`);
    return;
  }
  const res = await customer.assets.create(assets);
  const links = res.results!.map((r) => ({ campaign, asset: r.resource_name!, field_type: fieldType }));
  await customer.campaignAssets.create(links);
  console.log(`  ✓ ${label}: ${links.length} linked`);
}

await linkAssets(
  SITELINKS.map((s) => ({
    final_urls: [`${DOMAIN}${s.path}`],
    sitelink_asset: { link_text: s.text, description1: s.desc1, description2: s.desc2 },
  })),
  enums.AssetFieldType.SITELINK,
  "Sitelinks",
);

await linkAssets(
  CALLOUTS.map((text) => ({ callout_asset: { callout_text: text } })),
  enums.AssetFieldType.CALLOUT,
  "Callouts",
);

await linkAssets(
  [{ structured_snippet_asset: { header: STRUCTURED_SNIPPET.header, values: STRUCTURED_SNIPPET.values } }],
  enums.AssetFieldType.STRUCTURED_SNIPPET,
  "Structured snippet",
);

console.log("\n✓ Extensions linked. Ad Strength recalculates within a few minutes.");
