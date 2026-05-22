import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | RDMI AI Services",
  description:
    "The terms governing use of RDMI Tech Ventures Pvt. Ltd.'s website and the engagement of our software and AI development services.",
  alternates: { canonical: "https://ai.rdmi.in/terms" },
  robots: { index: true, follow: true },
};

const UPDATED = "22 May 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: {UPDATED}</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2 [&_h2]:mt-2 [&_a]:text-indigo-400 [&_a:hover]:text-indigo-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>
            These Terms govern your use of the website operated by <strong>RDMI Tech Ventures Pvt. Ltd.</strong>
            (&ldquo;RDMI&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and any enquiry you make with us. By using this
            site or contacting us you agree to these Terms.
          </p>

          <div>
            <h2>1. Our services</h2>
            <p>RDMI provides custom software, web, mobile app, AI, and related development and consulting services. Information on this website is for general guidance and does not constitute a binding offer.</p>
          </div>

          <div>
            <h2>2. Quotes and engagement</h2>
            <p>Any pricing, timeline, or scope shared on the site or in a first consultation is indicative. A binding engagement begins only when both parties sign a written proposal or agreement defining the specific scope, deliverables, fees, and timelines.</p>
          </div>

          <div>
            <h2>3. Intellectual property &amp; ownership</h2>
            <p>For client projects, ownership of deliverables (source code, designs, prompts) transfers to the client per the signed agreement, typically on payment. Website content, branding, and materials published by RDMI remain the property of RDMI unless stated otherwise.</p>
          </div>

          <div>
            <h2>4. Confidentiality</h2>
            <p>Information you share with us in the course of an enquiry or engagement is treated as confidential. We are happy to sign a mutual NDA before discussing sensitive project details.</p>
          </div>

          <div>
            <h2>5. Guarantees</h2>
            <p>Any guarantee referenced on this site (such as a free prototype or a money-back deadline guarantee) applies only as defined in a signed engagement agreement and is subject to the terms set out there.</p>
          </div>

          <div>
            <h2>6. Disclaimers &amp; limitation of liability</h2>
            <p>This website is provided &ldquo;as is&rdquo; without warranties of any kind. To the maximum extent permitted by law, RDMI is not liable for any indirect or consequential loss arising from use of the site. Liability under any engagement is governed by the relevant signed agreement.</p>
          </div>

          <div>
            <h2>7. Third-party links</h2>
            <p>The site may link to third-party services (e.g., WhatsApp). We are not responsible for the content or practices of third-party sites.</p>
          </div>

          <div>
            <h2>8. Governing law</h2>
            <p>These Terms are governed by the laws of India, and the courts of India have jurisdiction over any dispute, unless a signed engagement agreement specifies otherwise.</p>
          </div>

          <div>
            <h2>9. Changes</h2>
            <p>We may update these Terms from time to time. The &ldquo;last updated&rdquo; date above reflects the latest revision.</p>
          </div>

          <div>
            <h2>10. Contact</h2>
            <p>
              RDMI Tech Ventures Pvt. Ltd.<br />
              Email: <a href="mailto:info@rdmi.in">info@rdmi.in</a><br />
              Phone / WhatsApp: <a href="tel:+919818565561">+91 98185 65561</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
