import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const NEXT_STEPS = [
  { icon: '💬', title: 'WhatsApp', desc: '+86 153 0265 4212' },
  { icon: '🏠', title: 'Back to Home', desc: 'Browse all Medke products', to: '/' },
  { icon: '📚', title: 'Browse Catalog', desc: 'View all product categories', to: '/products' },
  { icon: '📖', title: 'Read Blog', desc: 'Compatibility buying guides', to: '/blog' },
];

const iconBoxStyle = {
  width: 44,
  height: 44,
  borderRadius: 12,
  background: 'var(--accent-soft)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  marginBottom: 12,
};

function fallbackRef() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `MK-${ymd}-${suffix}`;
}

export default function InquirySuccessPage() {
  const [params] = useSearchParams();
  const ref = params.get('ref') || '';
  const displayRef = useMemo(() => ref || fallbackRef(), [ref]);

  return (
    <>
      <div className="section">
        <div className="container-site" style={{ maxWidth: 760 }}>
          {/* Success panel */}
          <div className="card" style={{ textAlign: 'center', padding: '44px 28px' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#0E8345',
                color: '#fff',
                fontSize: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
              aria-hidden="true"
            >
              ✓
            </div>
            <h3 className="h-2">Inquiry Received</h3>
            <p style={{ marginTop: 12 }}>
              Your inquiry reference <b style={{ color: 'var(--fg)' }}>{displayRef}</b> has been submitted successfully.
            </p>
            <p style={{ marginTop: 4 }}>
              We reply with a quote within <b style={{ color: 'var(--cta)' }}>24 hours</b> — watch your inbox and WhatsApp.
            </p>
          </div>

          {/* Next steps */}
          <div className="testimonial-grid" style={{ marginTop: 20 }}>
            {NEXT_STEPS.map((step) => {
              const body = (
                <>
                  <div style={iconBoxStyle} aria-hidden="true">{step.icon}</div>
                  <h4 style={{ fontSize: 15, fontWeight: 600 }}>{step.title}</h4>
                  <p className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55 }}>{step.desc}</p>
                </>
              );
              return step.to ? (
                <Link to={step.to} className="card" style={{ display: 'block' }} key={step.title}>
                  {body}
                </Link>
              ) : (
                <a
                  className="card"
                  style={{ display: 'block' }}
                  href="https://wa.me/8615302654212"
                  target="_blank"
                  rel="noreferrer"
                  key={step.title}
                >
                  {body}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div
        style={{
          background: 'var(--accent-soft)',
          borderTop: '1px solid #CDD5EF',
          borderBottom: '1px solid #CDD5EF',
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <div className="container-site">
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>While You Wait — Explore Our Compatibility Guide</h2>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 18 }}>
            Download Free Guide
          </Link>
        </div>
      </div>
    </>
  );
}
