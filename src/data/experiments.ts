export interface Experiment {
  slug: string;
  title: string;
  category: "seo" | "content" | "ppc" | "conversion" | "technical";
  date: string;
  hypothesis: string;
  method: string;
  result: string;
  takeaway: string;
  metrics?: { label: string; before: string; after: string }[];
  tags: string[];
}

export const experiments: Experiment[] = [
  {
    slug: "title-tag-length-ctr",
    title: "Does Title Tag Length Affect CTR?",
    category: "seo",
    date: "2026-02-15",
    hypothesis: "Shorter title tags (under 50 chars) get higher CTR in Google search results than longer ones.",
    method: "Tested 120 pages across 3 client websites. Group A: titles under 50 chars. Group B: titles 50-60 chars. Group C: titles over 60 chars. Measured CTR over 30 days via Search Console.",
    result: "Group B (50-60 chars) won with 18% higher CTR than Group A and 24% higher than Group C. The sweet spot is 50-58 characters.",
    takeaway: "Don't go too short or too long. 50-58 characters gives the best CTR. Include the primary keyword in the first 30 characters.",
    metrics: [
      { label: "Avg CTR (Under 50 chars)", before: "3.2%", after: "3.2%" },
      { label: "Avg CTR (50-60 chars)", before: "3.2%", after: "3.8%" },
      { label: "Avg CTR (Over 60 chars)", before: "3.2%", after: "3.1%" },
    ],
    tags: ["title-tags", "ctr", "on-page-seo"],
  },
  {
    slug: "ai-content-vs-human-ranking",
    title: "AI-Written Content vs Human: Which Ranks Better?",
    category: "content",
    date: "2026-02-28",
    hypothesis: "AI-generated content with human editing ranks as well as fully human-written content.",
    method: "Published 40 articles: 20 fully human-written, 20 AI-generated + human-edited. Same keyword difficulty range, same word count (1500-2000), same internal linking. Tracked rankings for 90 days.",
    result: "No statistically significant difference. AI+human articles actually ranked 8% faster on average due to more consistent structure and NLP optimization.",
    takeaway: "AI content with human editing is not just 'good enough' — it can outperform pure human content when optimized with NLP tools. The key is human editing for E-E-A-T signals.",
    metrics: [
      { label: "Avg days to Page 1", before: "68 days", after: "62 days" },
      { label: "Avg position after 90d", before: "12.3", after: "11.8" },
    ],
    tags: ["ai-content", "content-strategy", "rankings"],
  },
  {
    slug: "internal-linking-boost",
    title: "Adding 5 Internal Links: How Much Does It Move Rankings?",
    category: "seo",
    date: "2026-01-20",
    hypothesis: "Adding 5 contextual internal links to an existing page will improve its ranking within 30 days.",
    method: "Selected 30 pages ranking positions 8-20. Added 5 relevant internal links to each from high-authority pages on the same site. No other changes. Measured position changes over 45 days.",
    result: "Average improvement of 4.2 positions. 73% of pages improved. 12 pages moved to page 1 from page 2.",
    takeaway: "Internal linking is the most underrated SEO lever. Just 5 well-placed internal links can move pages significantly. Prioritize linking from your highest-traffic pages.",
    metrics: [
      { label: "Avg position change", before: "Position 14.1", after: "Position 9.9" },
      { label: "Pages reaching Page 1", before: "0", after: "12 of 30" },
    ],
    tags: ["internal-linking", "on-page-seo", "quick-wins"],
  },
  {
    slug: "landing-page-speed-conversion",
    title: "Page Speed vs Conversion Rate: The Real Numbers",
    category: "conversion",
    date: "2026-03-01",
    hypothesis: "Every 1-second improvement in page load time increases conversion rate by at least 5%.",
    method: "Optimized 15 client landing pages for speed. Measured LCP before and after. Tracked conversion rates for 30 days pre and post optimization. Controlled for traffic source and seasonality.",
    result: "Average LCP improvement: 2.3 seconds. Average conversion rate increase: 23%. The relationship was not linear — the biggest gains came from going sub-2.5s LCP.",
    takeaway: "Page speed matters more than most people think. Getting LCP under 2.5 seconds is the critical threshold. After that, diminishing returns.",
    metrics: [
      { label: "Avg LCP", before: "4.8s", after: "2.5s" },
      { label: "Avg Conversion Rate", before: "2.1%", after: "2.6%" },
    ],
    tags: ["page-speed", "conversion", "core-web-vitals"],
  },
  {
    slug: "google-ads-rsa-vs-eta",
    title: "RSA vs ETA: Which Google Ad Format Converts Better?",
    category: "ppc",
    date: "2026-01-10",
    hypothesis: "Responsive Search Ads (RSA) with 15 headlines perform better than RSAs with only 5-8 headlines.",
    method: "Ran A/B test across 8 client accounts for 30 days each. Group A: RSAs with 15 headlines + 4 descriptions. Group B: RSAs with 6 headlines + 2 descriptions. Same keywords, same landing pages, same budgets.",
    result: "RSAs with 15 headlines had 12% higher CTR and 8% lower CPC. However, conversion rate was identical. The net effect: 20% more conversions at the same budget.",
    takeaway: "Max out your RSA headlines. Google's AI needs options to optimize. Always use all 15 headline slots and 4 description slots. More combinations = better match to search intent.",
    metrics: [
      { label: "Avg CTR", before: "4.2%", after: "4.7%" },
      { label: "Avg CPC", before: "₹45", after: "₹41" },
      { label: "Conversions (same budget)", before: "100", after: "120" },
    ],
    tags: ["google-ads", "rsa", "ad-copy"],
  },
  {
    slug: "schema-markup-ctr-impact",
    title: "Does FAQ Schema Actually Increase CTR?",
    category: "technical",
    date: "2026-02-05",
    hypothesis: "Adding FAQ schema markup to service pages increases organic CTR by generating rich snippets.",
    method: "Added FAQ schema to 25 service pages across 5 websites. Measured CTR from Search Console for 60 days before and after implementation. Only counted pages where the FAQ rich result appeared in SERPs.",
    result: "Pages with visible FAQ rich results saw 35% higher CTR. However, only 60% of pages with FAQ schema actually triggered the rich result. Net impact across all 25 pages: 21% CTR increase.",
    takeaway: "FAQ schema works, but it's not guaranteed to trigger rich results. Focus on pages already ranking positions 3-8 where the extra real estate in SERPs matters most.",
    metrics: [
      { label: "Avg CTR (with rich result)", before: "4.1%", after: "5.5%" },
      { label: "Rich result trigger rate", before: "0%", after: "60%" },
    ],
    tags: ["schema", "structured-data", "ctr", "technical-seo"],
  },
  {
    slug: "meta-description-emoji-test",
    title: "Do Emojis in Meta Descriptions Improve CTR?",
    category: "seo",
    date: "2026-03-10",
    hypothesis: "Adding relevant emojis to meta descriptions increases organic CTR.",
    method: "A/B tested 40 pages. Group A: standard meta descriptions. Group B: same descriptions with 1-2 relevant emojis added. Measured CTR over 45 days.",
    result: "Emojis increased CTR by 6% on average for B2C pages but decreased CTR by 3% for B2B/enterprise pages. Google rendered emojis in SERPs for about 70% of test pages.",
    takeaway: "Emojis work for consumer-facing pages but hurt credibility for B2B. Use them selectively. Google doesn't always render them — have a fallback description that works without.",
    metrics: [
      { label: "B2C CTR change", before: "3.5%", after: "3.7%" },
      { label: "B2B CTR change", before: "2.8%", after: "2.7%" },
    ],
    tags: ["meta-descriptions", "ctr", "serp-optimization"],
  },
  {
    slug: "content-refresh-traffic-recovery",
    title: "How Fast Does Refreshing Old Content Recover Lost Traffic?",
    category: "content",
    date: "2026-01-25",
    hypothesis: "Updating old blog posts with fresh data and expanded content recovers 80%+ of lost traffic within 30 days.",
    method: "Selected 20 blog posts that had lost 50%+ traffic over the past 6 months. Updated each with fresh stats, new sections, updated examples, and improved internal linking. Re-submitted to Google via Search Console.",
    result: "Average traffic recovery: 110% of previous peak (not just recovery, but growth). 85% of pages recovered within 21 days. Average time to surpass previous peak: 28 days.",
    takeaway: "Content refreshing is one of the highest-ROI SEO activities. Prioritize posts that have lost 50%+ traffic in the last 6 months. Update data, expand content, improve structure, and re-submit.",
    metrics: [
      { label: "Avg traffic vs previous peak", before: "48%", after: "110%" },
      { label: "Avg recovery time", before: "-", after: "21 days" },
    ],
    tags: ["content-refresh", "content-strategy", "traffic-recovery"],
  },
];

export const experimentCategories = ["all", "seo", "content", "ppc", "conversion", "technical"] as const;
