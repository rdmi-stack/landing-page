/**
 * Adapter: Campaign[] → Google Ads API (Phase 2 — stub).
 *
 * Consumes the SAME Campaign objects as the CSV adapter, so when this is wired
 * up nothing about build-campaign.mts changes. Intentionally not implemented yet
 * — it needs live API credentials and would create real, billable entities.
 *
 * To enable, provide these env vars (never commit them — use .env.local / CI secrets):
 *   GOOGLE_ADS_DEVELOPER_TOKEN   — from Google Ads API Center (Basic access is enough here)
 *   GOOGLE_ADS_CLIENT_ID         — OAuth2 client (Google Cloud console)
 *   GOOGLE_ADS_CLIENT_SECRET
 *   GOOGLE_ADS_REFRESH_TOKEN     — one-time OAuth2 consent for the managing Google account
 *   GOOGLE_ADS_LOGIN_CUSTOMER_ID — MCC id (digits only, no dashes)
 *   GOOGLE_ADS_CUSTOMER_ID       — target ad account id (digits only, no dashes)
 *
 * Then: npm i google-ads-api  and implement push() with CampaignBudget →
 * Campaign (PAUSED) → AdGroup → AdGroupCriterion (keywords) → Ad (RSA).
 */

import type { Campaign } from "./build-campaign.mts";

const REQUIRED_ENV = [
  "GOOGLE_ADS_DEVELOPER_TOKEN",
  "GOOGLE_ADS_CLIENT_ID",
  "GOOGLE_ADS_CLIENT_SECRET",
  "GOOGLE_ADS_REFRESH_TOKEN",
  "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
  "GOOGLE_ADS_CUSTOMER_ID",
];

export function apiCredentialsPresent(): boolean {
  return REQUIRED_ENV.every((k) => !!process.env[k]);
}

export async function pushToGoogleAds(_campaigns: Campaign[]): Promise<never> {
  const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
  throw new Error(
    "Google Ads API push is not enabled yet (Phase 2).\n" +
      (missing.length
        ? `Missing env: ${missing.join(", ")}\n`
        : "Credentials present — implement pushToGoogleAds() with the google-ads-api client.\n") +
      "Until then use the CSV output: import docs/ads/<slug>.csv into Google Ads Editor.",
  );
}
