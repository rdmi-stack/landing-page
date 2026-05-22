/**
 * Adapter: Campaign[] → Google Ads API (live push).
 *
 * Consumes the SAME Campaign objects as the CSV adapter. Creates, in the target
 * account under the MCC:
 *   1 CampaignBudget → 1 Campaign (PAUSED, Search, Maximize Clicks)
 *   → campaign criteria (India geo, English+Hindi, negative keywords)
 *   → one AdGroup per Campaign object → keyword criteria (phrase+exact) → one RSA.
 *
 * Everything is created PAUSED at the campaign level — nothing serves or spends
 * until enabled in the Google Ads UI. Idempotent-ish: re-running creates a new
 * campaign (Google has no native upsert); intended for first launch.
 *
 * Requires env (never commit — .env.local / CI secrets):
 *   GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET,
 *   GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_LOGIN_CUSTOMER_ID, GOOGLE_ADS_CUSTOMER_ID
 */

import { GoogleAdsApi, enums, toMicros } from "google-ads-api";
import type { Campaign } from "./build-campaign.mts";
import { CAMPAIGN_NAME, DAILY_BUDGET, NEGATIVES } from "./config.mts";

const REQUIRED_ENV = [
  "GOOGLE_ADS_DEVELOPER_TOKEN",
  "GOOGLE_ADS_CLIENT_ID",
  "GOOGLE_ADS_CLIENT_SECRET",
  "GOOGLE_ADS_REFRESH_TOKEN",
  "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
  "GOOGLE_ADS_CUSTOMER_ID",
];

// India = 2356; English = 1000, Hindi = 1023 (Google geo/language constants).
const INDIA_GEO = "geoTargetConstants/2356";
const LANGUAGES = ["languageConstants/1000", "languageConstants/1023"];

export function apiCredentialsPresent(): boolean {
  return REQUIRED_ENV.every((k) => !!process.env[k]);
}

const MATCH = {
  Phrase: enums.KeywordMatchType.PHRASE,
  Exact: enums.KeywordMatchType.EXACT,
} as const;

export async function pushToGoogleAds(campaigns: Campaign[]): Promise<void> {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Missing env: ${missing.join(", ")}`);

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

  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");

  // 1. Budget
  const [{ resource_name: budget }] = (
    await customer.campaignBudgets.create([
      {
        name: `${CAMPAIGN_NAME} budget ${stamp}`,
        amount_micros: toMicros(DAILY_BUDGET),
        delivery_method: enums.BudgetDeliveryMethod.STANDARD,
        explicitly_shared: false,
      },
    ])
  ).results;
  console.log(`  ✓ budget — ₹${DAILY_BUDGET}/day`);

  // 2. Campaign — PAUSED, Search, Maximize Clicks, Search-only network
  const [{ resource_name: campaign }] = (
    await customer.campaigns.create([
      {
        name: `${CAMPAIGN_NAME} · ${stamp}`,
        status: enums.CampaignStatus.PAUSED,
        advertising_channel_type: enums.AdvertisingChannelType.SEARCH,
        campaign_budget: budget,
        target_spend: {}, // Maximize Clicks
        // Required since EU political-ad transparency rules.
        contains_eu_political_advertising:
          enums.EuPoliticalAdvertisingStatus.DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING,
        network_settings: {
          target_google_search: true,
          target_search_network: false,
          target_content_network: false,
          target_partner_search_network: false,
        },
      },
    ])
  ).results;
  console.log(`  ✓ campaign (PAUSED) — ${CAMPAIGN_NAME}`);

  // 3. Campaign criteria — India geo, languages, negatives
  await customer.campaignCriteria.create([
    { campaign, location: { geo_target_constant: INDIA_GEO } },
    ...LANGUAGES.map((language_constant) => ({ campaign, language: { language_constant } })),
    ...NEGATIVES.map((text) => ({
      campaign,
      negative: true,
      keyword: { text, match_type: enums.KeywordMatchType.BROAD },
    })),
  ]);
  console.log(`  ✓ geo (India) + languages + ${NEGATIVES.length} negatives`);

  // 4. One ad group + keywords + RSA per Campaign object
  for (const c of campaigns) {
    const [{ resource_name: adGroup }] = (
      await customer.adGroups.create([
        {
          name: c.adGroup,
          campaign,
          status: enums.AdGroupStatus.ENABLED,
          type: enums.AdGroupType.SEARCH_STANDARD,
        },
      ])
    ).results;

    await customer.adGroupCriteria.create(
      c.keywords.map((kw) => ({
        ad_group: adGroup,
        status: enums.AdGroupCriterionStatus.ENABLED,
        keyword: { text: kw.text, match_type: MATCH[kw.matchType as keyof typeof MATCH] },
      })),
    );

    await customer.adGroupAds.create([
      {
        ad_group: adGroup,
        status: enums.AdGroupAdStatus.ENABLED,
        ad: {
          final_urls: [c.finalUrl],
          responsive_search_ad: {
            headlines: c.headlines.map((text) => ({ text })),
            descriptions: c.descriptions.map((text) => ({ text })),
            path1: c.path1,
            path2: c.path2,
          },
        },
      },
    ]);
    console.log(`  ✓ ad group "${c.adGroup}" — ${c.keywords.length} keywords + 1 RSA`);
  }

  console.log(`\n✓ Campaign created PAUSED in account ${process.env.GOOGLE_ADS_CUSTOMER_ID}.`);
  console.log("  Review in Google Ads UI, then set status to ENABLED to go live.");
}
