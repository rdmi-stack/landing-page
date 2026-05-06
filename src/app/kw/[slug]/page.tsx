import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getKeywordGroup, getAllSlugs } from "@/data/keyword-groups";
import KeywordLandingPage from "@/components/pages/KeywordLandingPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getKeywordGroup(slug);
  if (!data) return {};

  const url = `https://rdmi-landing-page.netlify.app/kw/${slug}`;

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.targetKeywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: "RDMI",
      type: "website",
      images: [{ url: data.images.hero, width: 1600, height: 1067, alt: data.primaryKeyword }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [data.images.hero],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function KWPage({ params }: Props) {
  const { slug } = await params;
  const data = getKeywordGroup(slug);
  if (!data) notFound();

  const url = `https://rdmi-landing-page.netlify.app/kw/${slug}`;

  // FAQ JSON-LD for rich SERP results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Service / Organization JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.primaryKeyword,
    description: data.meta.description,
    provider: {
      "@type": "Organization",
      name: "RDMI Tech Ventures Pvt. Ltd.",
      url: "https://rdmi-landing-page.netlify.app",
      logo: "https://rdmi-landing-page.netlify.app/icon.svg",
      email: "info@rdmi.in",
      telephone: "+91-9818565561",
      address: { "@type": "PostalAddress", addressCountry: "IN" },
    },
    areaServed: ["IN", "US", "GB", "AE"],
    url,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200" },
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <KeywordLandingPage data={data} />
    </main>
  );
}
