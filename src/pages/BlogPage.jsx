import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';

const POSTS = [
  {
    slug: '/blog/ecg-cable-guide',
    image: '/assets/images/products/ecg-cable/ecg-cable-01.jpg',
    title: 'ECG Cable Selection Guide',
    desc: 'How to pick trunk / leadwire sets',
  },
  {
    slug: '/blog/spo2-connector-guide',
    image: '/assets/images/products/spo2-sensor/spo2-sensor-01.jpg',
    title: 'SpO2 Connector ID',
    desc: 'DB9 / RJ45 / aviation connector quick ref',
  },
  {
    slug: '/blog/compatibility-check',
    image: '/assets/images/resources/guide-cover.png',
    title: 'Compatibility Self-Check',
    desc: '5 steps to confirm your model compatibility',
  },
  {
    slug: '/blog/disposable-vs-reusable',
    image: '/assets/images/products/temp-probe/temp-probe-01.jpg',
    title: 'Disposable vs Reusable',
    desc: 'Procurement cost vs infection control tradeoffs',
  },
];

const MORE = [
  { slug: '/blog/nibp-maintenance', no: '05', title: 'NIBP Cuff & Hose Care', desc: '6 habits that extend cuff and hose life.' },
  { slug: '/blog/ibp-storage', no: '06', title: 'IBP Sensor Storage Done Right', desc: 'Key storage tips to protect pressure lines.' },
  { slug: '/blog/fetal-probe-guide', no: '07', title: 'Fetal Probe Buying Guide', desc: 'Quick match guide for US / TOCO probes.' },
];

export default function BlogPage() {
  return (
    <>
      {/* Featured articles */}
      <div className="section">
        <div className="container-site">
          <SectionHeading
            align="center"
            title="Blog & Resources"
            subtitle="Buying guides & compatibility tips from Medke"
          />
          <div className="app-grid">
            {POSTS.map((post) => (
              <Link to="/blog" className="app-card" key={post.slug}>
                <div className="app-img-wrap">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="app-body">
                  <h3 className="h-3" style={{ fontSize: 15 }}>{post.title}</h3>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6, lineHeight: 1.55 }}>{post.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* More articles */}
      <div className="section" style={{ background: 'var(--surface-warm)' }}>
        <div className="container-site">
          <SectionHeading align="center" title="More Articles" />
          <div className="brand-grid">
            {MORE.map((m) => (
              <Link to="/blog" className="card" style={{ display: 'block' }} key={m.slug}>
                <span className="mono" style={{ color: 'var(--cta)', fontWeight: 700 }}>{m.no}</span>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginTop: 8 }}>{m.title}</h4>
                <p className="muted" style={{ fontSize: 13, marginTop: 6, lineHeight: 1.55 }}>{m.desc}</p>
              </Link>
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
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>Free Compatibility Guide for Your Monitor Fleet</h2>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 18 }}>
            Download Guide
          </Link>
        </div>
      </div>
    </>
  );
}
