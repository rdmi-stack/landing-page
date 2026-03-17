import { NextRequest, NextResponse } from "next/server";

interface Recommendation {
  type: "pass" | "warn" | "fail";
  area: string;
  message: string;
  fix: string;
}

export async function POST(req: NextRequest) {
  try {
    const { spend, campaigns, ctr, convRate, roas } = await req.json();

    if (!spend || !campaigns || !ctr || !convRate || !roas) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const recs: Recommendation[] = [];
    let score = 0;

    // CTR grading (industry avg ~3.17% for search)
    if (ctr >= 5) {
      recs.push({ type: "pass", area: "Click-Through Rate", message: `${ctr}% CTR — excellent, well above industry average`, fix: "" });
      score += 25;
    } else if (ctr >= 2) {
      recs.push({ type: "warn", area: "Click-Through Rate", message: `${ctr}% CTR — average. Industry benchmark is 3-5%`, fix: "Test more headline variations in RSAs, add sitelink extensions, improve ad relevance score" });
      score += 15;
    } else {
      recs.push({ type: "fail", area: "Click-Through Rate", message: `${ctr}% CTR — below average. You're losing impressions to competitors`, fix: "Rewrite ad copy with stronger CTAs, use all 15 RSA headlines, add callout/structured snippet extensions, check keyword-ad relevance" });
      score += 5;
    }

    // Conversion rate grading (industry avg ~3.75% for search)
    if (convRate >= 5) {
      recs.push({ type: "pass", area: "Conversion Rate", message: `${convRate}% conversion rate — strong landing page performance`, fix: "" });
      score += 25;
    } else if (convRate >= 2) {
      recs.push({ type: "warn", area: "Conversion Rate", message: `${convRate}% conversion rate — room for improvement`, fix: "A/B test landing pages, simplify forms, add trust signals, improve page speed, test different CTAs" });
      score += 15;
    } else {
      recs.push({ type: "fail", area: "Conversion Rate", message: `${convRate}% conversion rate — your landing pages are leaking leads`, fix: "Complete landing page redesign recommended. Check: page speed (<2.5s LCP), form length (reduce fields), social proof, mobile experience, message match between ad and page" });
      score += 5;
    }

    // ROAS grading
    if (roas >= 4) {
      recs.push({ type: "pass", area: "Return on Ad Spend", message: `${roas}x ROAS — excellent profitability`, fix: "" });
      score += 25;
    } else if (roas >= 2) {
      recs.push({ type: "warn", area: "Return on Ad Spend", message: `${roas}x ROAS — profitable but can be improved`, fix: "Shift budget to highest-ROAS campaigns, add negative keywords aggressively, implement smart bidding (tCPA/tROAS), optimize for high-value conversions" });
      score += 15;
    } else {
      recs.push({ type: "fail", area: "Return on Ad Spend", message: `${roas}x ROAS — you may be losing money on ads`, fix: "Urgent: pause underperforming campaigns, audit keyword quality scores, check for wasted spend on broad match, implement conversion tracking correctly, consider restructuring account" });
      score += 5;
    }

    // Campaign structure (# campaigns vs spend)
    const spendPerCampaign = spend / campaigns;
    if (spendPerCampaign >= 50000) {
      recs.push({ type: "pass", area: "Campaign Structure", message: `${campaigns} campaigns with ₹${Math.round(spendPerCampaign / 1000)}K avg — good budget distribution`, fix: "" });
      score += 15;
    } else if (spendPerCampaign >= 20000) {
      recs.push({ type: "warn", area: "Campaign Structure", message: `Budget may be too thin across ${campaigns} campaigns`, fix: "Consolidate underperforming campaigns to focus budget. Google needs 30-50 conversions/month per campaign for smart bidding to work" });
      score += 10;
    } else {
      recs.push({ type: "fail", area: "Campaign Structure", message: `₹${Math.round(spendPerCampaign / 1000)}K per campaign is too low for optimization`, fix: "Drastically reduce campaign count. Merge similar campaigns, focus on 2-3 highest-intent campaigns, give each campaign enough budget for 50+ clicks/day minimum" });
      score += 5;
    }

    // Bonus: spend level advice
    if (spend >= 500000) {
      recs.push({ type: "pass", area: "Budget Level", message: `₹${Math.round(spend / 100000)}L/month — sufficient for AI-powered optimization`, fix: "" });
      score += 10;
    } else if (spend >= 100000) {
      recs.push({ type: "warn", area: "Budget Level", message: `₹${Math.round(spend / 1000)}K/month — consider scaling for better results`, fix: "At your current budget, focus on 1-2 channels max. Higher budgets enable faster learning and better AI optimization." });
      score += 7;
    } else {
      recs.push({ type: "warn", area: "Budget Level", message: `₹${Math.round(spend / 1000)}K/month — limited optimization potential`, fix: "Start with exact/phrase match keywords only, single campaign focus, manual CPC bidding until you have enough conversion data" });
      score += 5;
    }

    const finalScore = Math.min(score, 100);

    return NextResponse.json({
      score: finalScore,
      grade: finalScore >= 80 ? "A" : finalScore >= 60 ? "B" : finalScore >= 40 ? "C" : "D",
      recommendations: recs.sort((a, b) => {
        const order = { fail: 0, warn: 1, pass: 2 };
        return order[a.type] - order[b.type];
      }),
      summary: finalScore >= 80
        ? "Your ad account is performing well. Focus on scaling and incremental optimization."
        : finalScore >= 60
        ? "Good foundation with clear optimization opportunities. AI-powered management could significantly improve ROAS."
        : finalScore >= 40
        ? "Several areas need attention. A professional audit would uncover significant wasted spend."
        : "Critical issues detected. Your ad spend is likely not generating positive ROI. Immediate professional review recommended.",
    });
  } catch {
    return NextResponse.json({ error: "An error occurred. Please try again." }, { status: 500 });
  }
}
