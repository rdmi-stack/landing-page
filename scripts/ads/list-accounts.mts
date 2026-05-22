/**
 * List ad accounts under the MCC — confirms the OAuth + dev-token chain works
 * and surfaces the customer IDs to pick GOOGLE_ADS_CUSTOMER_ID from.
 *
 *   node scripts/ads/list-accounts.mts
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

const mcc = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, "");
const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
});
const customer = client.Customer({
  customer_id: mcc,
  login_customer_id: mcc,
  refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
});

const rows = await customer.query(`
  SELECT customer_client.id, customer_client.descriptive_name,
         customer_client.manager, customer_client.level,
         customer_client.currency_code, customer_client.time_zone
  FROM customer_client
  WHERE customer_client.status = 'ENABLED'
`);

console.log("\nAccounts under MCC " + mcc + ":\n" + "─".repeat(60));
for (const r of rows) {
  const c = r.customer_client!;
  const kind = c.manager ? "MANAGER" : "ad account";
  console.log(
    `  ${String(c.id).padEnd(12)} ${kind.padEnd(11)} ${c.descriptive_name || "(no name)"}` +
      `  [${c.currency_code || "?"}]`,
  );
}
console.log("─".repeat(60));
console.log("→ Use a non-manager ad account id as GOOGLE_ADS_CUSTOMER_ID\n");
