import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3010";

const corePages = [
  "/",
  "/get-quote",
  "/contact",
  "/about",
  "/products",
  "/services",
  "/faq",
  "/how-it-works",
  "/case-studies",
];

const premiumLandingPages = [
  {
    path: "/web-development-company",
    h1: "AI-First Web Design Agency",
  },
  {
    path: "/custom-software-development-company",
    h1: "Custom Software Development Company",
  },
  {
    path: "/enterprise-software-development-company",
    h1: "Enterprise Software Development Company",
  },
  {
    path: "/ai-software-development-company",
    h1: "AI Software Development Company",
  },
  {
    path: "/ai-agent-development-company",
    h1: "AI Agent Development Company",
  },
  {
    path: "/mobile-app-development-company",
    h1: "Mobile App Development Company",
  },
  {
    path: "/ecommerce-development-company",
    h1: "Ecommerce Development Company",
  },
];

test.describe("Focused Landing Platform", () => {
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

  for (const landingPage of premiumLandingPages) {
    test(`${landingPage.path} loads with premium H1 and form`, async ({ page }) => {
      await page.goto(`${BASE}${landingPage.path}`, { waitUntil: "networkidle" });
      await expect(page.locator("h1")).toContainText(landingPage.h1);
      await expect(page.getByRole("button", { name: /Send My|Get|Talk/i }).first()).toBeVisible();
    });
  }

  test("All retained pages return 200", async ({ request }) => {
    for (const path of [...corePages, ...premiumLandingPages.map((p) => p.path)]) {
      const res = await request.get(`${BASE}${path}`);
      expect(res.status(), `${path} should return 200`).toBe(200);
    }
  });

  test("Removed legacy landing pages do not return 200", async ({ request }) => {
    const removedPages = ["/lp", "/seo-services", "/digital-marketing", "/seo-course", "/lab", "/dashboard", "/kw/healthcare-ai-development"];
    for (const path of removedPages) {
      const res = await request.get(`${BASE}${path}`, { maxRedirects: 0 });
      expect(res.status(), `${path} should not be an active page`).not.toBe(200);
    }
  });

  test("Contact API accepts current landing page form types", async ({ request }) => {
    const forms = [
      { name: "Software", email: "software@test.com", message: "[formType:software]\nTest" },
      { name: "Mobile", email: "mobile@test.com", message: "[formType:mobile-app]\nTest" },
      { name: "Web", email: "web@test.com", message: "[formType:web-dev]\nTest" },
      { name: "AI Software", email: "ai@test.com", message: "[formType:ai-software]\nTest" },
      { name: "AI Agent", email: "agent@test.com", message: "[formType:ai-agent]\nTest" },
      { name: "Enterprise", email: "enterprise@test.com", message: "[formType:enterprise-saas]\nTest" },
      { name: "Ecommerce", email: "ecommerce@test.com", message: "[formType:ecommerce]\nTest" },
      { name: "Callback", email: "callback@test.com", phone: "+91 98185 65561", message: "[Callback] Test" },
    ];
    for (const form of forms) {
      const res = await request.post(`${BASE}/api/contact`, { data: form });
      expect(res.status(), `Form ${form.name} should return 200`).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    }
  });
});
