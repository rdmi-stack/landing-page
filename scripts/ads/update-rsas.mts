/**
 * Refresh the RSA in every web-dev ad group (broad + SKAG) to the current
 * generated copy (create-new + remove-old, since RSA text isn't editable in
 * place). Used after softening ad copy in keyword-groups.ts.
 *
 *   node scripts/ads/update-rsas.mts
 */

import { GoogleAdsApi, enums } from "google-ads-api";
import fs from "node:fs";
import path from "node:path";
import { keywordGroups } from "../../src/data/keyword-groups.ts";
import { buildRouteMap } from "./route-map.mts";
import { buildCampaign, buildSkagCampaign, type Campaign } from "./build-campaign.mts";

const envPath = path.resolve(process.cwd(), ".env.local");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const SLUG = "web-development-company";
const group = keywordGroups.find((g) => g.slug === SLUG)!;
const routePath = buildRouteMap().get(SLUG)!;

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

// Every ad group across both web-dev campaigns + its current ad.
const rows = await customer.query(`
  SELECT campaign.name, ad_group.name, ad_group.resource_name, ad_group_ad.resource_name
  FROM ad_group_ad
  WHERE campaign.name LIKE 'RDMI %' AND ad_group_ad.status != 'REMOVED'
`);

for (const r of rows) {
  const agName = r.ad_group!.name!;
  const isSkag = agName.startsWith("SKAG | ");
  const c: Campaign = isSkag
    ? buildSkagCampaign(group, agName.replace(/^SKAG \| /, "").toLowerCase(), routePath)
    : buildCampaign(group, routePath);

  await customer.adGroupAds.create([
    {
      ad_group: r.ad_group!.resource_name!,
      status: enums.AdGroupAdStatus.ENABLED,
      ad: {
        final_urls: [c.finalUrl],
        responsive_search_ad: {
          headlines: c.headlines.map((text) =>
            c.pinnedH1 && text === c.pinnedH1
              ? { text, pinned_field: enums.ServedAssetFieldType.HEADLINE_1 }
              : { text },
          ),
          descriptions: c.descriptions.map((text) => ({ text })),
          path1: c.path1,
          path2: c.path2,
        },
      },
    },
  ]);
  await customer.adGroupAds.remove([r.ad_group_ad!.resource_name!]);
  console.log(`  ✓ ${agName} — RSA refreshed (softened copy)`);
}
console.log(`\n✓ ${rows.length} RSAs refreshed across both web-dev campaigns.`);
