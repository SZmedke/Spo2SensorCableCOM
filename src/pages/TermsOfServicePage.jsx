import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { COMPANY } from '../data/catalog';

export default function TermsOfServicePage() {
  return (
    <div className="section">
      <div className="container-site legal-page-wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb" style={{ marginBottom: 24 }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Terms of Service</span>
        </nav>

        <header style={{ marginBottom: 28 }}>
          <span className="eyebrow" style={{ marginBottom: 10 }}>Compliance & Legal</span>
          <h1 className="h-1" style={{ marginTop: 10 }}>Terms of Service</h1>
          <p className="lede" style={{ marginTop: 8, fontSize: 15, color: 'var(--muted)' }}>
            Effective date: September 17, 2026 · {COMPANY.legalName}
          </p>
        </header>

        <article className="legal-card legal-body">
          <h2>1. Overview</h2>
          <p>
            This website is operated by {COMPANY.legalName} Throughout the site, the terms “we”, “us”, and “our” refer to www.spo2sensorcable.com. By accessing this website and engaging with our business, you agree to be bound by the following terms and conditions ("Terms of Service", "Terms"). These Terms apply to all users of the site, including without limitation business partners, distributors, importers, and other commercial clients.
          </p>
          <p>
            Please read these Terms of Service carefully before using our website. If you do not agree with any part of these Terms, you may not access or use our services.
          </p>
          <p>
            We reserve the right to update or modify these Terms at any time. Changes will be posted on this page. Your continued use of the website following any changes constitutes acceptance of those changes.
          </p>

          <h2>2. Use of the Website</h2>
          <p>
            You agree to use this website for lawful purposes only and in compliance with all applicable laws and regulations.
          </p>
          <p>You may not:</p>
          <ul>
            <li>Use the website to infringe on the intellectual property rights of us or others.</li>
            <li>Attempt to disrupt the functionality of the website via malicious code (e.g. viruses, spyware).</li>
            <li>Provide false or misleading company or contact information when submitting inquiries or quote requests.</li>
          </ul>

          <h2>3. Business Communications</h2>
          <p>
            As a B2B platform, we do not support online checkout or real-time transactions. All product inquiries, pricing requests, and business negotiations are handled manually through our sales and support channels.
          </p>
          <p>
            By submitting a request through the website (e.g. quote form, contact form, or email), you consent to being contacted by our sales team via email, phone, or other communication channels to discuss your business needs.
          </p>

          <h2>4. Product & Service Information</h2>
          <p>
            All content on this website is provided for general informational purposes only and is subject to change without prior notice. While we aim to ensure accuracy, we do not guarantee that all information (including specifications, availability, or pricing) is complete or up-to-date.
          </p>
          <p>We reserve the right to:</p>
          <ul>
            <li>Modify or discontinue products or services at any time.</li>
            <li>Limit product availability by region or customer profile.</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on this site—including text, graphics, logos, product images, and downloadable materials—is the property of www.spo2sensorcable.com or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            No content may be reproduced, distributed, or exploited without our express written permission.
          </p>

          <h2>6. Third-Party Links</h2>
          <p>
            This website may contain links to third-party websites for your convenience. We are not responsible for the content, accuracy, or privacy practices of those third-party sites and do not endorse their services or products.
          </p>
          <p>
            Use of any third-party resources is at your own risk.
          </p>

          <h2>7. Confidentiality & Feedback</h2>
          <p>
            If you provide us with business inquiries, documents, or feedback (such as suggestions, comments, or ideas), you acknowledge that:
          </p>
          <ul>
            <li>Such materials are not considered confidential unless otherwise agreed in writing.</li>
            <li>We may use such feedback to improve our services or communications without obligation to you.</li>
          </ul>

          <h2>8. Personal Data</h2>
          <p>
            Your submission of personal or business contact information is governed by our{' '}
            <Link to="/privacy-policy">Privacy Policy</Link>, which outlines how we collect, store, and use your data in the context of B2B communication.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            We do not guarantee that access to our website will be uninterrupted or error-free. To the fullest extent permitted by law, we disclaim all warranties and liabilities related to:
          </p>
          <ul>
            <li>Errors or inaccuracies in the website content.</li>
            <li>Business decisions made based on the website information.</li>
            <li>Technical issues or interruptions.</li>
          </ul>
          <p>
            Our liability in any business transaction shall be strictly limited to the terms agreed in a separate sales or supply contract.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms of Service and any separate agreements whereby we provide services shall be governed and interpreted in accordance with the laws of the People's Republic of China.
          </p>

          <h2>11. Termination</h2>
          <p>
            We reserve the right to deny or terminate your access to this website and our services at our discretion, especially in cases of:
          </p>
          <ul>
            <li>Violation of these Terms</li>
            <li>Fraudulent or misleading conduct</li>
            <li>Any action deemed harmful to our business interests</li>
          </ul>

          <h2>12. Contact Information</h2>
          <p>
            If you have any questions regarding these Terms, please contact us at:
          </p>
          <p style={{ marginTop: 12 }}>
            <strong>{COMPANY.legalName}</strong><br />
            Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a><br />
            Phone/WhatsApp: {COMPANY.whatsapp}<br />
            Address: {COMPANY.address}
          </p>
        </article>
      </div>
    </div>
  );
}
