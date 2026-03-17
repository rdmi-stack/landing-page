import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3010";

test.describe("Form Submissions", () => {
  test("Homepage loads and has CTA buttons", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible();
  });

  test("Floating callback widget opens and has phone input", async ({ page }) => {
    await page.goto(BASE);
    await page.locator('button[aria-label="Request callback"]').click();
    await expect(page.locator('input[type="tel"]').last()).toBeVisible();
  });

  test("Quote modal opens from navbar CTA", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("button", { hasText: "Get Free Quote" }).first().click();
    await expect(page.locator('input[placeholder="John Doe"]')).toBeVisible();
  });

  test("SEO services page loads with hero", async ({ page }) => {
    await page.goto(`${BASE}/seo-services`, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("Google AND AI");
    // Check the 2025 landscape section is present
    await expect(page.getByText("It's Not Just Google Anymore")).toBeVisible({ timeout: 10000 });
  });

  test("SEO services tab filtering works", async ({ page }) => {
    await page.goto(`${BASE}/seo-services`, { waitUntil: "networkidle" });
    // Click Next-Gen AI tab
    const tab = page.locator("button", { hasText: "Next-Gen AI" });
    await tab.scrollIntoViewIfNeeded();
    await tab.click();
    await expect(page.getByText("AI Overview & Zero-Click SEO")).toBeVisible({ timeout: 10000 });
  });

  test("Digital marketing page loads", async ({ page }) => {
    await page.goto(`${BASE}/digital-marketing`);
    await expect(page.locator("h1")).toContainText("ROAS");
  });

  test("Quiz funnel on SEO page is interactive", async ({ page }) => {
    await page.goto(`${BASE}/seo-services`, { waitUntil: "networkidle" });
    const quizHeading = page.getByText("Personalized Plan");
    await quizHeading.scrollIntoViewIfNeeded();
    await expect(quizHeading).toBeVisible({ timeout: 10000 });
    // Click a quiz option
    const seoOption = page.getByText("SEO & Organic Growth");
    await seoOption.scrollIntoViewIfNeeded();
    await seoOption.click();
  });

  test("SEO course page loads", async ({ page }) => {
    await page.goto(`${BASE}/seo-course`, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toContainText("SEO Masterclass");
    // Check curriculum items exist (numbered circles)
    await expect(page.getByText("How Google Really Works")).toBeVisible({ timeout: 10000 });
  });

  test("Dashboard page loads with stats", async ({ page }) => {
    await page.goto(`${BASE}/dashboard`);
    await expect(page.locator("h1")).toContainText("Real Time");
    await expect(page.getByText("Backlinks Built")).toBeVisible({ timeout: 10000 });
  });

  test("Experiment lab page loads with experiments", async ({ page }) => {
    await page.goto(`${BASE}/lab`);
    await expect(page.locator("h1")).toContainText("Experiment Lab");
    await expect(page.getByText("Title Tag Length")).toBeVisible({ timeout: 10000 });
  });

  test("ROI calculator section exists", async ({ page }) => {
    await page.goto(`${BASE}/seo-services`, { waitUntil: "networkidle" });
    const roi = page.getByText("How Much Revenue");
    await roi.scrollIntoViewIfNeeded();
    await expect(roi).toBeVisible({ timeout: 10000 });
  });

  test("All pages return 200", async ({ request }) => {
    const pages = [
      "/", "/seo-services", "/digital-marketing", "/dashboard",
      "/seo-course", "/lab", "/get-quote", "/contact", "/about",
      "/products", "/services", "/faq", "/how-it-works", "/case-studies",
    ];
    for (const path of pages) {
      const res = await request.get(`${BASE}${path}`);
      expect(res.status(), `${path} should return 200`).toBe(200);
    }
  });

  test("Contact API accepts all 8 form types", async ({ request }) => {
    const forms = [
      { name: "T1", email: "t1@test.com", message: "Software inquiry test" },
      { name: "T2", email: "t2@test.com", message: "[SEO Services Inquiry]\nTest" },
      { name: "T3", email: "t3@test.com", message: "[Digital Marketing Inquiry]\nTest" },
      { name: "T4", email: "t4@test.com", phone: "+91 98185 65561", message: "[Callback] Test" },
      { name: "T5", email: "t5@test.com", message: "[Lead Magnet] Test" },
      { name: "T6", email: "t6@test.com", message: "[SEO Tool] Test" },
      { name: "T7", email: "t7@test.com", message: "[Quiz Funnel] Test" },
      { name: "T8", email: "t8@test.com", message: "[SEO Course] Test" },
    ];
    for (const form of forms) {
      const res = await request.post(`${BASE}/api/contact`, { data: form });
      expect(res.status(), `Form ${form.name} should return 200`).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    }
  });
});
