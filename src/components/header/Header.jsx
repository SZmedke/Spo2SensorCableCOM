import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

/* IA v1.7 — 7-item top navigation */
const PRODUCT_LINES = [
  { to: '/spo2', label: 'SpO2 Sensors' },
  { to: '/ecg', label: 'ECG / EKG' },
  { to: '/nibp', label: 'NIBP' },
  { to: '/ibp', label: 'IBP' },
  { to: '/temperature', label: 'Temperature' },
  { to: '/esu', label: 'ESU' },
  { to: '/aed', label: 'AED' },
  { to: '/eeg', label: 'EEG' },
];

const ABOUT_LINKS = [
  { to: '/about-us', label: 'About Us' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/team', label: 'Team' },
  { to: '/faq', label: 'FAQ' },
];

/* Dropdown component */
function Dropdown({ label, to, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const isActive = items.some((i) => pathname.startsWith(i.to)) || pathname === to;

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className={`nav-link ${isActive ? 'active' : ''}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 12px' }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={14} style={{ transition: 'transform 200ms', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', boxShadow: '0 8px 24px rgba(17,17,17,.12)',
          minWidth: 180, zIndex: 100, padding: '6px 0',
        }}>
          <Link
            to={to}
            className="nav-link"
            style={{ display: 'block', padding: '8px 16px', fontWeight: 600, fontSize: 13, color: 'var(--accent)' }}
          >
            All {label} →
          </Link>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              style={{ display: 'block', padding: '8px 16px', fontSize: 13 }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Mobile nav: flat list */
  const mobileLinks = [
    { to: '/products', label: 'All Products' },
    ...PRODUCT_LINES.map((p) => ({ ...p, indent: true })),
    { to: '/brands', label: 'Brand Compatibility' },
    { to: '/applications', label: 'Applications' },
    { to: '/blog', label: 'Blog' },
    { to: '/about-us', label: 'About Us' },
    { to: '/certificates', label: 'Certificates', indent: true },
    { to: '/team', label: 'Team', indent: true },
    { to: '/faq', label: 'FAQ', indent: true },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="site-header" data-component="site-header">
      <div className="container-site header-inner">
        <Link to="/" className="logo" aria-label="Medke home">
          <img src="/assets/images/logo/medke-logo.svg?v=2" alt="Medke logo" style={{ height: 40, width: 'auto' }} />
          <span className="logo-meta">EST. 2008</span>
        </Link>

        <nav className="nav-desktop" role="navigation" aria-label="Main navigation">
          <Dropdown label="Products" to="/products" items={PRODUCT_LINES} />
          <NavLink to="/brands" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Brands</NavLink>
          <NavLink to="/applications" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Applications</NavLink>
          <NavLink to="/blog" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Blog</NavLink>
          <Dropdown label="About" to="/about-us" items={ABOUT_LINKS} />
          <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Contact</NavLink>
        </nav>

        <div className="header-actions">
          <Link to="/contact" className="btn btn-primary header-cta">
            Get a quote <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav-drawer" aria-label="Mobile navigation">
          {mobileLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="nav-drawer-link"
              style={item.indent ? { paddingLeft: 28, fontSize: 14, color: 'var(--muted)' } : {}}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 12, width: '100%' }}>
            Get a quote <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
