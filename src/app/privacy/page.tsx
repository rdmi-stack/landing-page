import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | RDMI AI Services",
  description:
    "How RDMI Tech Ventures Pvt. Ltd. collects, uses, and protects the information you share through our website and contact forms.",
  alternates: { canonical: "https://ai.rdmi.in/privacy" },
  robots: { index: true, follow: true },
};

const UPDATED = "22 May 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-10">Last updated: {UPDATED}</p>

        <div className="space-y-8 text-zinc-300 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-2 [&_h2]:mt-2 [&_a]:text-indigo-400 [&_a:hover]:text-indigo-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
          <p>
            This Privacy Policy explains how <strong>RDMI Tech Ventures Pvt. Ltd.</strong> (&ldquo;RDMI&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects information when you visit our website or
            contact us. We are a software and AI development company based in India, serving clients in India, the USA,
            UK, and UAE. If you have any questions, email us at <a href="mailto:info@rdmi.in">info@rdmi.in</a>.
          </p>

          <div>
            <h2>1. Information we collect</h2>
            <ul>
              <li><strong>Information you provide</strong> — when you submit a form, request a quote, or message us on WhatsApp, we collect your name, email, phone number, company/website (if given), budget range, and the details of your message.</li>
              <li><strong>Usage data</strong> — via Google Analytics 4 we collect standard analytics data such as pages viewed, device and browser type, approximate location (country/region), and how you arrived at our site.</li>
              <li><strong>Cookies</strong> — we use cookies and similar technologies for analytics and to measure ad performance. You can disable cookies in your browser settings.</li>
            </ul>
          </div>

          <div>
            <h2>2. How we use your information</h2>
            <ul>
              <li>To respond to your enquiry and have a senior team member contact you.</li>
              <li>To prepare proposals, quotes, and project scopes.</li>
              <li>To deliver and support the services you engage us for.</li>
              <li>To measure and improve our website and advertising.</li>
            </ul>
            <p className="mt-2">We do <strong>not</strong> sell your personal information.</p>
          </div>

          <div>
            <h2>3. Service providers we share with</h2>
            <p>We share limited data with trusted providers only to operate our business:</p>
            <ul>
              <li><strong>Mailgun</strong> — to deliver email notifications and confirmations.</li>
              <li><strong>Google Analytics 4 / Google Ads</strong> — for analytics and ad performance measurement.</li>
              <li><strong>MongoDB Atlas</strong> — secure storage of enquiry records.</li>
            </ul>
            <p className="mt-2">These providers process data under their own privacy and security commitments.</p>
          </div>

          <div>
            <h2>4. Data retention</h2>
            <p>We keep enquiry data only as long as needed to respond and, where you become a client, for the duration of our engagement plus a reasonable period for legal and accounting purposes. You can ask us to delete your data at any time.</p>
          </div>

          <div>
            <h2>5. Your rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data, and you may withdraw consent for marketing contact. To exercise any of these, email <a href="mailto:info@rdmi.in">info@rdmi.in</a> and we will respond within a reasonable time.</p>
          </div>

          <div>
            <h2>6. Security</h2>
            <p>We use reasonable technical and organisational measures to protect your information. No method of transmission or storage is completely secure, but we work to safeguard your data and limit access to it.</p>
          </div>

          <div>
            <h2>7. Children</h2>
            <p>Our website and services are intended for businesses and individuals aged 18 and over. We do not knowingly collect data from children.</p>
          </div>

          <div>
            <h2>8. Changes to this policy</h2>
            <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above reflects the latest revision.</p>
          </div>

          <div>
            <h2>9. Contact us</h2>
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
