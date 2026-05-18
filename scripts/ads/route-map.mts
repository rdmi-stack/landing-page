/**
 * Self-correcting slug → URL-path resolver.
 *
 * Scans src/app/* for dedicated landing-page routes and extracts the `SLUG`
 * (and optional `ROUTE`) constants each page.tsx declares. This means the
 * generator's Final URLs always match what's actually deployed — no hardcoded
 * mapping to drift. A keyword-groups slug with no matching route is reported
 * so it can be skipped instead of shipping a campaign with a 404 Final URL.
 */

import fs from "node:fs";
import path from "node:path";

const APP_DIR = path.resolve(process.cwd(), "src/app");

/** slug → "/route-path" for every dedicated landing-page route found on disk. */
export function buildRouteMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const entry of fs.readdirSync(APP_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith("[") || entry.name === "api") continue;
    const pagePath = path.join(APP_DIR, entry.name, "page.tsx");
    if (!fs.existsSync(pagePath)) continue;
    const src = fs.readFileSync(pagePath, "utf8");
    const slug = src.match(/const\s+SLUG\s*=\s*["'`]([^"'`]+)["'`]/)?.[1];
    if (!slug) continue; // not a keyword landing-page route
    const route = src.match(/const\s+ROUTE\s*=\s*["'`]([^"'`]+)["'`]/)?.[1] ?? entry.name;
    map.set(slug, `/${route}`);
  }
  return map;
}

export function resolveUrl(domain: string, routePath: string): string {
  return `${domain}${routePath}`;
}
