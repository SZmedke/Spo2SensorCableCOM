import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { COMPANY } from '../../data/catalog';

const COLS = [
  {
    title: 'Products',
    links: [
      { to: '/product-category/patient-monitor-accessories', label: 'Patient monitor accessories' },
      { to: '/product-category/ekg-accessories', label: 'EKG accessories' },
      { to: '/product-category/fetal-monitor-accessories', label: 'Fetal monitor accessories' },
      { to: '/product-category/ventilator-consumable', label: 'Ventilator consumables' },
      { to: '/product-category/esu-accessories', label: 'ESU accessories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/oem-solution', label: 'OEM / ODM' },
      { to: '/brands', label: 'Brand compatibility' },
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { to: '/resources', label: 'Buying guides' },
      { to: '/applications', label: 'Applications' },
      { to: '/certificates', label: 'Certificates' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer" data-component="site-footer">
      <div className="container-site">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/images/logo/medke-logo-white.svg?v=2" alt="Medke logo" />
            <p className="footer-slogan">Vital links, Healthier lives.</p>
            <p className="footer-desc">
              {COMPANY.legalName} — compatible medical accessories manufacturer since 2008.
            </p>
            <div className="footer-contact">
              <a href={`mailto:${COMPANY.email}`}><Mail size={15} /> {COMPANY.email}</a>
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}><Phone size={15} /> {COMPANY.phone}</a>
              <span><MapPin size={15} /> {COMPANY.address}</span>
              <span><Clock size={15} /> {COMPANY.hours}</span>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title} className="footer-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-legal-sep" aria-hidden="true">·</span>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
          <p>© {new Date().getFullYear()} {COMPANY.legalName} All rights reserved.</p>
          <p className="footer-disclaimer">
            All third-party brand names and logos are trademarks of their respective owners. Medke products are compatible replacement parts, not OEM parts.
          </p>
        </div>
      </div>
    </footer>
  );
}
