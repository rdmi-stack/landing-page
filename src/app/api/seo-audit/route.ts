import { NextRequest, NextResponse } from "next/server";

interface SEOIssue {
  type: "pass" | "warn" | "fail";
  message: string;
  category: string;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    const targetUrl = parsedUrl.toString();
    const issues: SEOIssue[] = [];
    let totalScore = 0;
    let pageSpeedData = { performance: 0, accessibility: 0, seo: 0, bestPractices: 0 };

    // 1. Fetch PageSpeed Insights
    try {
      const apiKey = process.env.PAGESPEED_API_KEY || "";
      const psUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile${apiKey ? `&key=${apiKey}` : ""}`;
      const psRes = await fetch(psUrl, { signal: AbortSignal.timeout(30000) });

      if (psRes.ok) {
        const psData = await psRes.json();
        const cats = psData.lighthouseResult?.categories || {};
        pageSpeedData = {
          performance: Math.round((cats.performance?.score || 0) * 100),
          accessibility: Math.round((cats.accessibility?.score || 0) * 100),
          seo: Math.round((cats.seo?.score || 0) * 100),
          bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
        };
      }
    } catch {
      // PageSpeed may timeout or fail — continue with HTML analysis
    }

    // 2. Fetch and parse HTML
    let html = "";
    try {
      const htmlRes = await fetch(targetUrl, {
        signal: AbortSignal.timeout(10000),
        headers: { "User-Agent": "RDMI-SEO-Audit-Bot/1.0" },
      });
      html = await htmlRes.text();
    } catch {
      return NextResponse.json(
        { error: "Could not fetch the website. Please check the URL and try again." },
        { status: 422 }
      );
    }

    // 3. Analyze HTML
    const lowerHtml = html.toLowerCase();

    // Title tag
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const titleText = titleMatch?.[1]?.trim() || "";
    if (!titleText) {
      issues.push({ type: "fail", message: "Missing <title> tag", category: "On-Page" });
    } else if (titleText.length < 30) {
      issues.push({ type: "warn", message: `Title tag too short (${titleText.length} chars, aim for 50-60)`, category: "On-Page" });
      totalScore += 3;
    } else if (titleText.length > 70) {
      issues.push({ type: "warn", message: `Title tag too long (${titleText.length} chars, keep under 60)`, category: "On-Page" });
      totalScore += 3;
    } else {
      issues.push({ type: "pass", message: `Title tag present (${titleText.length} chars)`, category: "On-Page" });
      totalScore += 5;
    }

    // Meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const descText = descMatch?.[1]?.trim() || "";
    if (!descText) {
      issues.push({ type: "fail", message: "Missing meta description", category: "On-Page" });
    } else if (descText.length < 100 || descText.length > 165) {
      issues.push({ type: "warn", message: `Meta description length: ${descText.length} chars (aim for 120-155)`, category: "On-Page" });
      totalScore += 3;
    } else {
      issues.push({ type: "pass", message: `Meta description present (${descText.length} chars)`, category: "On-Page" });
      totalScore += 5;
    }

    // H1 tag
    const h1Matches = html.match(/<h1[\s>]/gi) || [];
    if (h1Matches.length === 0) {
      issues.push({ type: "fail", message: "No H1 tag found", category: "On-Page" });
    } else if (h1Matches.length > 1) {
      issues.push({ type: "warn", message: `Multiple H1 tags found (${h1Matches.length}). Use exactly one.`, category: "On-Page" });
      totalScore += 3;
    } else {
      issues.push({ type: "pass", message: "Single H1 tag present", category: "On-Page" });
      totalScore += 5;
    }

    // H2 tags
    const h2Matches = html.match(/<h2[\s>]/gi) || [];
    if (h2Matches.length === 0) {
      issues.push({ type: "warn", message: "No H2 tags found — add subheadings for better structure", category: "On-Page" });
    } else {
      issues.push({ type: "pass", message: `${h2Matches.length} H2 tags found`, category: "On-Page" });
      totalScore += 5;
    }

    // Images without alt
    const imgTags = html.match(/<img[^>]*>/gi) || [];
    const missingAlt = imgTags.filter((img) => !img.match(/alt=["'][^"']+["']/i)).length;
    if (imgTags.length === 0) {
      issues.push({ type: "warn", message: "No images found on page", category: "On-Page" });
      totalScore += 5;
    } else if (missingAlt > 0) {
      issues.push({ type: "fail", message: `${missingAlt} of ${imgTags.length} images missing alt text`, category: "Accessibility" });
      totalScore += Math.round((1 - missingAlt / imgTags.length) * 10);
    } else {
      issues.push({ type: "pass", message: `All ${imgTags.length} images have alt text`, category: "Accessibility" });
      totalScore += 10;
    }

    // Viewport meta
    if (lowerHtml.includes('name="viewport"') || lowerHtml.includes("name='viewport'")) {
      issues.push({ type: "pass", message: "Viewport meta tag present (mobile-friendly)", category: "Technical" });
      totalScore += 5;
    } else {
      issues.push({ type: "fail", message: "Missing viewport meta tag — page may not be mobile-friendly", category: "Technical" });
    }

    // Canonical
    if (lowerHtml.includes('rel="canonical"') || lowerHtml.includes("rel='canonical'")) {
      issues.push({ type: "pass", message: "Canonical tag present", category: "Technical" });
      totalScore += 5;
    } else {
      issues.push({ type: "warn", message: "No canonical tag found — may cause duplicate content issues", category: "Technical" });
    }

    // Open Graph
    const hasOG = lowerHtml.includes('property="og:') || lowerHtml.includes("property='og:");
    if (hasOG) {
      issues.push({ type: "pass", message: "Open Graph tags present", category: "Social" });
      totalScore += 5;
    } else {
      issues.push({ type: "warn", message: "No Open Graph tags — social sharing will look poor", category: "Social" });
    }

    // Schema / structured data
    if (lowerHtml.includes("application/ld+json")) {
      issues.push({ type: "pass", message: "Structured data (JSON-LD) found", category: "Technical" });
      totalScore += 5;
    } else {
      issues.push({ type: "warn", message: "No structured data — add JSON-LD for rich search results", category: "Technical" });
    }

    // HTTPS
    if (parsedUrl.protocol === "https:") {
      issues.push({ type: "pass", message: "HTTPS enabled", category: "Security" });
      totalScore += 5;
    } else {
      issues.push({ type: "fail", message: "Not using HTTPS — critical for rankings and trust", category: "Security" });
    }

    // Add PageSpeed scores to total (30% weight)
    totalScore += Math.round(pageSpeedData.performance * 0.15);
    totalScore += Math.round(pageSpeedData.seo * 0.1);
    totalScore += Math.round(pageSpeedData.accessibility * 0.05);

    // Cap at 100
    const finalScore = Math.min(totalScore, 100);

    return NextResponse.json({
      score: finalScore,
      issues: issues.sort((a, b) => {
        const order = { fail: 0, warn: 1, pass: 2 };
        return order[a.type] - order[b.type];
      }),
      pageSpeed: pageSpeedData,
      url: targetUrl,
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
