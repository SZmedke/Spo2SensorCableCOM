import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';

const LEADERS = [
  { name: 'Li Zhenzong', role: 'Founder', bio: 'Founded Medke in 2008; leads factory and supply-chain strategy.', image: '/assets/images/team/team-lizhenzong.jpg' },
  { name: 'Li Weitao', role: 'Chairman', bio: 'Group strategy and global market planning.', image: '/assets/images/team/team-liweitao.jpg' },
  { name: 'Xian Zuyin', role: 'General Manager', bio: 'Production operations, quality management and delivery.', image: '/assets/images/team/team-xianzuyin.jpg' },
  { name: 'Liu Guiting', role: 'Sales Director', bio: 'Global channels and key-account management.', image: '/assets/images/team/team-liuguiting.jpg' },
];

const FUNCTIONS = [
  { icon: '🌍', title: 'Global Sales', desc: 'Bilingual team covering 100+ countries, reply within 24 hours, one-stop quotation & after-sales.' },
  { icon: '🔬', title: 'R&D Lab', desc: 'Custom connectors, cables & packaging; CE / FDA documentation support for OEM clients.' },
  { icon: '🧪', title: 'QC Team', desc: 'Incoming & finished-goods double inspection under ISO 13485, batch traceability.' },
  { icon: '📦', title: 'Logistics', desc: '3–7 days stock dispatch; export packaging for DHL / FedEx / sea freight.' },
];

const iconBoxStyle = (circle) => ({
  width: 44,
  height: 44,
  borderRadius: circle ? '50%' : 12,
  background: 'var(--accent-soft)',
  color: 'var(--accent)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  marginBottom: 12,
});

export default function TeamPage() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <>
      {/* Leadership */}
      <div className="section">
        <div className="container-site">
          <SectionHeading
            align="center"
            title="The Faces Behind our Success"
            subtitle="Leadership with 15+ years in medical consumables"
          />
          <div className="cert-grid">
            {LEADERS.map((leader) => (
              <div className="card" key={leader.name}>
                {leader.image ? (
                  <img
                    src={leader.image}
                    alt={`${leader.name} portrait`}
                    title="Click to enlarge"
                    className="team-avatar"
                    onClick={() => setActive(leader)}
                    style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', marginBottom: 12, display: 'block' }}
                  />
                ) : (
                  <div style={iconBoxStyle(true)} aria-hidden="true">👤</div>
                )}
                <h4 style={{ fontSize: 15, fontWeight: 600 }}>{leader.name}</h4>
                <p style={{ marginTop: 4, fontSize: 13, fontWeight: 500, color: 'var(--accent)' }}>{leader.role}</p>
                <p className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55 }}>{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales & R&D */}
      <div className="section" style={{ background: 'var(--surface-warm)' }}>
        <div className="container-site">
          <SectionHeading align="center" title="Sales & R&D" />
          <div className="cert-grid">
            {FUNCTIONS.map((f) => (
              <div className="card" key={f.title}>
                <div style={iconBoxStyle(false)} aria-hidden="true">{f.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 600 }}>{f.title}</h4>
                <p className="muted" style={{ marginTop: 8, fontSize: 13, lineHeight: 1.55 }}>{f.desc}</p>
              </div>
            ))}
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
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>Work with the Team Behind 472 Products</h2>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 18 }}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Portrait lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} portrait`}
          onClick={() => setActive(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(8,10,24,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}
        >
          <img
            src={active.image}
            alt={`${active.name} portrait`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '80vh', maxWidth: '100%', width: 'auto', height: 'auto', borderRadius: 14, boxShadow: '0 24px 64px rgba(0,0,0,0.55)', display: 'block' }}
          />
          <button
            type="button"
            aria-label="Close portrait"
            onClick={() => setActive(null)}
            style={{ position: 'absolute', top: 16, right: 20, width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.14)', color: '#fff', fontSize: 24, lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 3 }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
