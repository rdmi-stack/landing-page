#!/usr/bin/env node
/**
 * Generate hero images via OpenAI Images API (gpt-image-1).
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... node scripts/generate-hero-images.mjs
 *
 * Generates hero PNGs for each slug listed in HERO_IMAGES below and
 * saves them to public/images/hero/<slug>.png. After generating,
 * update src/data/keyword-groups.ts to point hero: "/images/hero/<slug>.png".
 *
 * Costs: ~$0.04–0.17 per image depending on size/quality. 2 images ≈ $0.10–0.35.
 */

import fs from "node:fs";
import path from "node:path";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("✘ Missing OPENAI_API_KEY. Run:\n   OPENAI_API_KEY=sk-... node scripts/generate-hero-images.mjs");
  process.exit(1);
}

const OUT_DIR = path.resolve(process.cwd(), "public/images/hero");
fs.mkdirSync(OUT_DIR, { recursive: true });

// Slugs to generate. Each entry: { slug, prompt }
const HERO_IMAGES = [
  {
    slug: "mobile-app-development",
    prompt: "Cinematic 3D render of a floating modern smartphone with a glowing UI interface, surrounded by soft vibrant blue and purple aurora lights and blurred bokeh orbs. Deep navy background with cyan and violet light leaks. Premium, minimal, professional tech vibe. Ultra-high detail, photorealistic lighting, subtle film grain, 16:9 widescreen cinematic composition, dark moody tones for landing page hero. No text, no watermarks, no people.",
  },
  {
    slug: "web-development-company",
    prompt: "Cinematic 3D render of multiple floating glass browser windows and dashboard panels with colorful abstract data visualisations, glowing in soft indigo, violet and blue aurora light. Dark moody tech background with blurred bokeh orbs and light leaks. Premium AI-era aesthetic, photorealistic, ultra-detailed, 16:9 widescreen cinematic composition for a landing page hero. No text, no watermarks, no people.",
  },
];

async function generateOne({ slug, prompt }) {
  console.log(`\n→ Generating ${slug} …`);
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024", // closest widescreen
      quality: "high",
      n: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI ${res.status}: ${err}`);
  }

  const json = await res.json();
  const b64 = json?.data?.[0]?.b64_json;
  if (!b64) throw new Error(`No b64_json in response: ${JSON.stringify(json).slice(0, 300)}`);

  const outPath = path.join(OUT_DIR, `${slug}.png`);
  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`  ✓ Saved ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);
}

for (const item of HERO_IMAGES) {
  try {
    await generateOne(item);
  } catch (e) {
    console.error(`  ✘ ${item.slug} failed:`, e.message);
  }
}

console.log("\nNext: update src/data/keyword-groups.ts so each hero points to /images/hero/<slug>.png");
