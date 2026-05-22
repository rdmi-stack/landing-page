/**
 * Verify what's actually in the ad account — campaigns, ad groups, keyword
 * counts, ad counts. Read-only sanity check after a push.
 *
 *   node scripts/ads/verify.mts
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

const campaigns = await customer.query(`
  SELECT campaign.id, campaign.name, campaign.status,
         campaign.advertising_channel_type, campaign_budget.amount_micros
  FROM campaign WHERE campaign.status != 'REMOVED'
`);
console.log("\nCampaigns:\n" + "─".repeat(60));
for (const r of campaigns) {
  console.log(`  ${r.campaign!.name}`);
  console.log(`    status=${r.campaign!.status}  budget=₹${Number(r.campaign_budget!.amount_micros) / 1e6}/day`);
}

const kw = await customer.query(`
  SELECT ad_group.name, ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type
  FROM ad_group_criterion
  WHERE ad_group_criterion.type = 'KEYWORD' AND ad_group_criterion.status != 'REMOVED'
`);
const ads = await customer.query(`
  SELECT ad_group_ad.ad.id FROM ad_group_ad WHERE ad_group_ad.status != 'REMOVED'
`);
console.log("─".repeat(60));
console.log(`  keywords: ${kw.length}   ads (RSA): ${ads.length}`);
console.log("─".repeat(60) + "\n");
