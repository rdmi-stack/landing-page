/**
 * Demo: prove the API does live UPDATES, not just creates.
 *  1. Add exact-match keywords to the ad group.
 *  2. "Update" the RSA headline + description (RSAs aren't editable in place —
 *     the API pattern is create a new ad with the new copy, then remove the old).
 *
 *   node scripts/ads/demo-update.mts
 *
 * Targets the newest "RDMI | Search | India" campaign's ad group. PAUSED
 * campaign, so no spend impact.
 */

import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const NEW_EXACT_KEYWORDS = ["website development company", "hire web developers india"];
const NEW_HEADLINE = "Websites Built in 14 Days"; // ≤30
const NEW_DESCRIPTION = "Updated via API — senior Indian web developer WhatsApps you in 2 hours."; // ≤90

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

// 1. Find the newest RDMI campaign's ad group + its current RSA.
const adRows = await customer.query(`
  SELECT campaign.id, campaign.name, ad_group.id, ad_group.resource_name,
         ad_group_ad.resource_name,
         ad_group_ad.ad.responsive_search_ad.headlines,
         ad_group_ad.ad.responsive_search_ad.descriptions,
         ad_group_ad.ad.final_urls
  FROM ad_group_ad
  WHERE campaign.name LIKE 'RDMI | Search | India%'
    AND ad_group_ad.status != 'REMOVED'
  ORDER BY campaign.id DESC
`);
if (!adRows.length) throw new Error("No RDMI campaign ad found — run the push first.");
const row = adRows[0];
const adGroup = row.ad_group!.resource_name!;
const oldAd = row.ad_group_ad!.resource_name!;
const rsa = row.ad_group_ad!.ad!.responsive_search_ad!;
console.log(`Target: ${row.campaign!.name}  (ad group ${row.ad_group!.id})`);
console.log(`  current H1: ${rsa.headlines![0].text}`);
console.log(`  current D1: ${rsa.descriptions![0].text}\n`);

// 2. Add exact-match keywords.
const kwRes = await customer.adGroupCriteria.create(
  NEW_EXACT_KEYWORDS.map((text) => ({
    ad_group: adGroup,
    status: enums.AdGroupCriterionStatus.ENABLED,
    keyword: { text, match_type: enums.KeywordMatchType.EXACT },
  })),
);
console.log(`✓ added ${kwRes.results.length} exact-match keywords: ${NEW_EXACT_KEYWORDS.map((k) => `[${k}]`).join(", ")}`);

// 3. Build updated copy (swap H1 + D1), create new ad, remove old.
const headlines = rsa.headlines!.map((h, i) => ({ text: i === 0 ? NEW_HEADLINE : h.text! }));
const descriptions = rsa.descriptions!.map((d, i) => ({ text: i === 0 ? NEW_DESCRIPTION : d.text! }));
await customer.adGroupAds.create([
  {
    ad_group: adGroup,
    status: enums.AdGroupAdStatus.ENABLED,
    ad: {
      final_urls: row.ad_group_ad!.ad!.final_urls!,
      responsive_search_ad: { headlines, descriptions },
    },
  },
]);
await customer.adGroupAds.remove([oldAd]);
console.log(`✓ replaced RSA — new H1: "${NEW_HEADLINE}"  new D1: "${NEW_DESCRIPTION}"`);
console.log("\n✓ Update complete. Refresh the Google Ads UI to see the new keywords + ad copy.");
