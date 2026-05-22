/**
 * Create GA4 Key events via the Admin API using a service-account key.
 * Pure Node (no deps) — signs a JWT with the SA private key, exchanges it for
 * an access token, then POSTs keyEvents to the property.
 *
 *   node scripts/ga4/create-key-events.mts [propertyId]
 *
 * Requires .ga4-service-account.json (gitignored) with Editor access granted
 * to the GA4 property (Admin → Property Access Management).
 */

import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";

const KEY_PATH = path.resolve(process.cwd(), ".ga4-service-account.json");
const PROPERTY_ID = process.argv[2] || "482305512";
const EVENTS = ["generate_lead", "whatsapp_click"];
const SCOPE = "https://www.googleapis.com/auth/analytics.edit";

const sa = JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));

const b64url = (input: string | Buffer) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPE,
    aud: sa.token_uri,
    iat: now,
    exp: now + 3600,
  }));
  const signingInput = `${header}.${claim}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  const jwt = `${signingInput}.${b64url(signer.sign(sa.private_key))}`;

  const res = await fetch(sa.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error("Token exchange failed: " + JSON.stringify(json));
  return json.access_token;
}

async function listKeyEvents(token: string): Promise<string[]> {
  const res = await fetch(
    `https://analyticsadmin.googleapis.com/v1beta/properties/${PROPERTY_ID}/keyEvents`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${json?.error?.message || JSON.stringify(json)}`);
  return (json.keyEvents || []).map((k: { eventName: string }) => k.eventName);
}

async function createKeyEvent(token: string, eventName: string) {
  const res = await fetch(
    `https://analyticsadmin.googleapis.com/v1beta/properties/${PROPERTY_ID}/keyEvents`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, countingMethod: "ONCE_PER_EVENT" }),
    },
  );
  const json = await res.json();
  return { status: res.status, json };
}

const token = await getAccessToken();
console.log(`✓ authenticated as ${sa.client_email}`);
console.log(`  property ${PROPERTY_ID}\n`);

let existing: string[];
try {
  existing = await listKeyEvents(token);
} catch (e) {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg.startsWith("403")) {
    console.error(
      "✗ 403 — the service account isn't granted access to this property yet.\n" +
        `  Fix: GA4 → Admin → Property Access Management → + → add\n` +
        `  ${sa.client_email} as Editor, then re-run this script.\n` +
        "  (If GA4 says \"doesn't match a Google Account\", wait ~10-15 min for the\n" +
        "  new service account to propagate, then retry the add.)",
    );
    process.exit(1);
  }
  throw e;
}
for (const ev of EVENTS) {
  if (existing.includes(ev)) {
    console.log(`• ${ev} — already a key event`);
    continue;
  }
  const { status, json } = await createKeyEvent(token, ev);
  if (status === 200) console.log(`✓ created key event: ${ev}`);
  else console.log(`✗ ${ev} → ${status}: ${json?.error?.message || JSON.stringify(json)}`);
}
