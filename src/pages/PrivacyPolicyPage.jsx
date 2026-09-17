import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { COMPANY } from '../data/catalog';

export default function PrivacyPolicyPage() {
  return (
    <div className="section">
      <div className="container-site legal-page-wrap">
        <nav aria-label="Breadcrumb" className="breadcrumb" style={{ marginBottom: 24 }}>
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <span>Privacy Policy</span>
        </nav>

        <header style={{ marginBottom: 28 }}>
          <span className="eyebrow" style={{ marginBottom: 10 }}>Compliance & Legal</span>
          <h1 className="h-1" style={{ marginTop: 10 }}>Privacy Policy</h1>
          <p className="lede" style={{ marginTop: 8, fontSize: 15, color: 'var(--muted)' }}>
            Effective date: September 17, 2026 · {COMPANY.legalName}
          </p>
        </header>

        <article className="legal-card legal-body">
          <p>
            At www.spo2sensorcable.com, we take your privacy very seriously. We do everything it takes to safeguard the trust you place in us. Please read below for more details regarding our privacy policy. Your use of the Website constitutes an acceptance of our privacy policy.
          </p>
          <p>
            This Privacy Policy describes how your personal information is collected, used, and shared when you visit www.spo2sensorcable.com.
          </p>

          <h2>PERSONAL INFORMATION WE COLLECT</h2>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.
          </p>
          <p>We collect Device Information using the following technologies:</p>
          <ol>
            <li>
              <strong>“Cookies”</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit{' '}
              <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
                http://www.allaboutcookies.org
              </a>.
            </li>
            <li>
              <strong>“Log files”</strong> track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.
            </li>
            <li>
              <strong>“Web beacons”</strong>, <strong>“tags”</strong>, and <strong>“pixels”</strong> are electronic files used to record information about how you browse the Site.
            </li>
          </ol>

          <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>
          <ol>
            <li>We will not use the collection of users’ personal information as the main purpose.</li>
            <li>Communicate with you;</li>
            <li>We use the information we collect to enhance your experience of our website and our products and services;</li>
            <li>We do not rent or sell this information to any third-party.</li>
            <li>Without your consent, we will not use your personal information or pictures for advertising.</li>
          </ol>
          <p>
            We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).
          </p>

          <h2>SHARING YOUR PERSONAL INFORMATION</h2>
          <p>
            We only share your personal information with Google. We also use Google Analytics to help us understand how our customers use the Site, you can read more about how Google uses your Personal Information here:{' '}
            <a href="https://www.google.com/intl/en/policies/privacy" target="_blank" rel="noopener noreferrer">
              https://www.google.com/intl/en/policies/privacy
            </a>.
          </p>
          <p>
            Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
          </p>
          <p>
            In addition, we will not share your personal information with any other third parties.
          </p>

          <h2>INFORMATION SECURITY</h2>
          <p>
            To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
          </p>
          <p>
            Communications with our Website are all conducted using Secure Socket Layer (SSL) encryption technology. Through our use of SSL encryption technology, all information communicated between you and our website is secured.
          </p>

          <h2>DO NOT TRACK</h2>
          <p>
            Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.
          </p>

          <h2>YOUR RIGHTS</h2>
          <p>
            The right to access the information we hold about you. If you wish to be informed what Personal Data we hold about you, please contact us.
          </p>
          <p>
            Request correction of your personal data. You have the right to have your information update or correct if that information is inaccurate or incomplete.
          </p>
          <p>
            Request erasure of your personal data. You have the right to ask us to delete any personal information we collect directly from you.
          </p>
          <p>
            If you would like to exercise these rights, please contact us by email at{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </p>

          <h2>DATA RETENTION</h2>
          <p>
            When you submit an inquiry or quote request through the Site, we will maintain your inquiry and contact information for our records unless and until you ask us to delete this information.
          </p>

          <h2>MINORS</h2>
          <p>
            The Site is not intended for individuals under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us via email{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
          </p>

          <h2>CHANGES</h2>
          <p>
            We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. Any changes made will be posted here.
          </p>

          <h2>HOW CAN I CONTACT YOU?</h2>
          <p>
            We invite you to contact us by email if you have any questions or comments about our Privacy Policy.
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
