import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';

const LEADERS = [
  { name: 'Li Zhenzong', role: 'Founder', bio: 'Founded Medke in 2008; leads factory and supply-chain strategy.' },
  { name: 'Li Weitao', role: 'Chairman', bio: 'Group strategy and global market planning.' },
  { name: 'Xian Zuyin', role: 'General Manager', bio: 'Production operations, quality management and delivery.' },
  { name: 'Liu Guiting', role: 'Sales Director', bio: 'Global channels and key-account management.' },
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
                <div style={iconBoxStyle(true)} aria-hidden="true">👤</div>
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
    </>
  );
}
