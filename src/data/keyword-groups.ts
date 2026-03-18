export interface KeywordGroup {
  slug: string;
  name: string;
  primaryKeyword: string;
  keywords: string[];
  route: string;
  status: "live" | "planned" | "paused";
}

export const keywordGroups: KeywordGroup[] = [
  {
    slug: "software-development-company",
    name: "Custom Software Development",
    primaryKeyword: "software development company India",
    keywords: [
      "software development company India",
      "custom software development company India",
      "custom software development services India",
      "best software development company India",
      "top software company India",
    ],
    route: "/kw/software-development-company",
    status: "planned",
  },
  {
    slug: "app-development-company",
    name: "App Development",
    primaryKeyword: "app development company India",
    keywords: [
      "app development company India",
      "mobile app development company India",
      "android app development company India",
      "iOS app development company India",
      "cross platform app development India",
    ],
    route: "/kw/app-development-company",
    status: "planned",
  },
  {
    slug: "web-development-company",
    name: "Web Application Development",
    primaryKeyword: "web application development company India",
    keywords: [
      "web application development company India",
      "custom web development India",
      "full stack development company India",
      "React development company India",
      "Node.js development company India",
    ],
    route: "/kw/web-development-company",
    status: "planned",
  },
  {
    slug: "saas-development-company",
    name: "SaaS Development",
    primaryKeyword: "SaaS development company India",
    keywords: [
      "SaaS development company India",
      "SaaS product development India",
      "build SaaS platform India",
      "SaaS application development India",
      "cloud SaaS development company India",
    ],
    route: "/kw/saas-development-company",
    status: "planned",
  },
  {
    slug: "mvp-development-company",
    name: "MVP & Startup Development",
    primaryKeyword: "MVP development company India",
    keywords: [
      "MVP development company India",
      "startup software development India",
      "MVP development cost India",
      "software development for startups India",
      "hire developers for startup India",
    ],
    route: "/kw/mvp-development-company",
    status: "planned",
  },
  {
    slug: "ai-development-company",
    name: "AI & ML Development",
    primaryKeyword: "AI development company India",
    keywords: [
      "AI development company India",
      "AI software development company India",
      "machine learning development India",
      "AI chatbot development company India",
      "AI agent development company India",
    ],
    route: "/kw/ai-development-company",
    status: "planned",
  },
  {
    slug: "ecommerce-development-company",
    name: "E-Commerce Development",
    primaryKeyword: "ecommerce development company India",
    keywords: [
      "ecommerce development company India",
      "custom ecommerce development India",
      "marketplace development company India",
      "online store development India",
      "Shopify development company India",
    ],
    route: "/kw/ecommerce-development-company",
    status: "planned",
  },
  {
    slug: "enterprise-software-company",
    name: "Enterprise Software (ERP/CRM)",
    primaryKeyword: "enterprise software development company India",
    keywords: [
      "enterprise software development company India",
      "ERP development company India",
      "CRM development company India",
      "custom ERP development India",
      "enterprise application development India",
    ],
    route: "/kw/enterprise-software-company",
    status: "planned",
  },
  {
    slug: "hire-developers-india",
    name: "Hire Developers",
    primaryKeyword: "hire software developers India",
    keywords: [
      "hire software developers India",
      "hire dedicated developers India",
      "hire remote developers India",
      "hire React developers India",
      "hire full stack developers India",
    ],
    route: "/kw/hire-developers-india",
    status: "planned",
  },
  {
    slug: "it-outsourcing-india",
    name: "IT Outsourcing",
    primaryKeyword: "IT outsourcing company India",
    keywords: [
      "IT outsourcing company India",
      "offshore software development India",
      "outsource software development India",
      "software development outsourcing India",
      "offshore development team India",
    ],
    route: "/kw/it-outsourcing-india",
    status: "planned",
  },
];

// All landing pages across the site (for admin panel listing)
export interface LandingPage {
  name: string;
  route: string;
  type: "homepage" | "sitelink" | "landing" | "utm" | "keyword";
  hasNavbar: boolean;
  status: "live" | "planned" | "paused";
  keywords?: string[];
}

export const allLandingPages: LandingPage[] = [
  { name: "Homepage", route: "/", type: "homepage", hasNavbar: true, status: "live", keywords: ["software development company India", "custom software development company India", "app development company India", "mobile app development company India", "hire software developers India", "SaaS development company India", "AI development company India", "web application development company India", "IT outsourcing company India", "MVP development company India"] },
  { name: "Get Free Quote", route: "/get-quote", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "Products", route: "/products", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "Services", route: "/services", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "About Us", route: "/about", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "How It Works", route: "/how-it-works", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "Case Studies", route: "/case-studies", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "Contact", route: "/contact", type: "sitelink", hasNavbar: false, status: "live" },
  { name: "FAQ", route: "/faq", type: "sitelink", hasNavbar: true, status: "live" },
  { name: "UTM Landing Page", route: "/lp", type: "utm", hasNavbar: false, status: "live" },
  { name: "SEO Services", route: "/seo-services", type: "landing", hasNavbar: false, status: "live" },
  { name: "Digital Marketing", route: "/digital-marketing", type: "landing", hasNavbar: false, status: "live" },
  { name: "Free SEO Course", route: "/seo-course", type: "landing", hasNavbar: false, status: "live" },
  { name: "Experiment Lab", route: "/lab", type: "landing", hasNavbar: false, status: "live" },
  { name: "Live Dashboard", route: "/dashboard", type: "landing", hasNavbar: false, status: "live" },
  { name: "Admin Panel", route: "/admin", type: "landing", hasNavbar: false, status: "live" },
  // Keyword landing pages
  ...keywordGroups.map((g) => ({
    name: g.name,
    route: g.route,
    type: "keyword" as const,
    hasNavbar: false,
    status: g.status,
    keywords: g.keywords,
  })),
];
