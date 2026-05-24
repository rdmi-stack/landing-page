/**
 * One-time OAuth2 consent for the GA4 Admin + Data APIs + Google Sheets.
 *
 * Reuses the same OAuth client as Google Ads (GOOGLE_ADS_CLIENT_ID/SECRET) but
 * requests the Analytics + Spreadsheets scopes, then writes GA4_OAUTH_REFRESH_TOKEN
 * to .env.local. Sign in as the account that owns the GA4 property (and that will
 * own the leads/OCI Google Sheet). The Sheets scope lets the app create + write
 * the sheet end-to-end with no manual setup.
 *
 *   npm run ga4:oauth
 */

import http from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const PORT = 4181;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPES = [
  "https://www.googleapis.com/auth/analytics.edit",
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/spreadsheets", // create + read/write the leads/OCI sheet
  "openid",
  "email",
].join(" ");

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("✘ Need GOOGLE_ADS_CLIENT_ID + GOOGLE_ADS_CLIENT_SECRET in .env.local (reused for GA4).");
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent select_account",
  }).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) return res.writeHead(404).end();
  const code = new URL(req.url, REDIRECT_URI).searchParams.get("code");
  if (!code) return res.writeHead(400).end("No code.");
  try {
    const r = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
    const json = await r.json();
    if (!json.refresh_token) throw new Error(JSON.stringify(json));
    let env = fs.readFileSync(envPath, "utf8");
    if (/^GA4_OAUTH_REFRESH_TOKEN=.*$/m.test(env)) {
      env = env.replace(/^GA4_OAUTH_REFRESH_TOKEN=.*$/m, `GA4_OAUTH_REFRESH_TOKEN=${json.refresh_token}`);
    } else {
      env += `\nGA4_OAUTH_REFRESH_TOKEN=${json.refresh_token}\n`;
    }
    fs.writeFileSync(envPath, env);
    res.writeHead(200, { "Content-Type": "text/html" }).end("<h2>✓ GA4 refresh token saved to .env.local.</h2><p>Return to your terminal.</p>");
    console.log("\n✓ GA4_OAUTH_REFRESH_TOKEN written to .env.local\n");
    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500).end("Token exchange failed — see terminal.");
    console.error("✘", e instanceof Error ? e.message : e);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`\nOpening GA4 consent screen… if it doesn't open, paste:\n${authUrl}\n`);
  const opener = process.platform === "darwin" ? "open" : "xdg-open";
  spawn(opener, [authUrl], { stdio: "ignore", detached: true }).on("error", () => {});
});
