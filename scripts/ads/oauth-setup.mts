/**
 * One-time OAuth2 consent helper for the Google Ads API.
 *
 * Mints a long-lived refresh token by running a tiny localhost server, opening
 * the Google consent screen, capturing the redirect, and exchanging the code.
 * Run once; paste the printed refresh token into .env.local.
 *
 *   GOOGLE_ADS_CLIENT_ID=... GOOGLE_ADS_CLIENT_SECRET=... node scripts/ads/oauth-setup.mts
 *   (or put those two in .env.local first — this script reads it)
 *
 * The OAuth client must be type "Desktop app" (or "Web" with
 * http://localhost:4180/oauth2callback as an authorized redirect URI).
 */

import http from "node:http";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// Load .env.local manually (no dep).
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const CLIENT_ID = process.env.GOOGLE_ADS_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_ADS_CLIENT_SECRET;
const PORT = 4180;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;
const SCOPE = "https://www.googleapis.com/auth/adwords";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("✘ Set GOOGLE_ADS_CLIENT_ID and GOOGLE_ADS_CLIENT_SECRET (in .env.local) first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
  }).toString();

const server = http.createServer(async (req, res) => {
  if (!req.url?.startsWith("/oauth2callback")) {
    res.writeHead(404).end();
    return;
  }
  const code = new URL(req.url, REDIRECT_URI).searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("No code in callback.");
    return;
  }
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
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
    const json = await tokenRes.json();
    if (!json.refresh_token) throw new Error(JSON.stringify(json));
    res.writeHead(200, { "Content-Type": "text/html" }).end(
      "<h2>✓ Done — refresh token captured.</h2><p>Return to your terminal. You can close this tab.</p>",
    );
    console.log("\n✓ Refresh token (paste into .env.local as GOOGLE_ADS_REFRESH_TOKEN):\n");
    console.log("GOOGLE_ADS_REFRESH_TOKEN=" + json.refresh_token + "\n");
    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500).end("Token exchange failed — see terminal.");
    console.error("✘ Token exchange failed:", e instanceof Error ? e.message : e);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, () => {
  console.log(`\nOpening Google consent screen… if it doesn't open, paste this URL:\n${authUrl}\n`);
  // Best-effort auto-open (macOS `open`, Linux `xdg-open`).
  const opener = process.platform === "darwin" ? "open" : "xdg-open";
  spawn(opener, [authUrl], { stdio: "ignore", detached: true }).on("error", () => {});
});
