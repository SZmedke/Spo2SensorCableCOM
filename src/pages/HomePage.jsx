import { Link } from 'react-router-dom';

/* ---------- local data (visual-design spec: page 1 / 首页) ---------- */

const PRODUCT_LINES = [
  { slug: 'spo2', name: 'SpO2 Sensors', desc: '123 SKUs · Disposable & Reusable', image: '/assets/images/categories/patient-monitoring.jpg' },
  { slug: 'esu', name: 'ESU', desc: '26 SKUs · Pads, Pencils & Cables', image: '/assets/images/categories/esu.jpg' },
  { slug: 'aed', name: 'AED', desc: 'Pads & Electrodes · Adapter Cables', image: '/assets/images/products/esu-pad/esu-pad-01.jpg' },
  { slug: 'nibp', name: 'NIBP', desc: '27 SKUs · Cuffs, Hoses & Adapters', image: '/assets/images/categories/ventilator.jpg' },
  { slug: 'ecg', name: 'ECG / EKG', desc: '149 SKUs · Cables, Leadwires & Electrodes', image: '/assets/images/categories/ekg.jpg' },
  { slug: 'ibp', name: 'IBP', desc: '23 SKUs · Cables & Transducers', image: '/assets/images/products/ibp-cable/ibp-cable-01.jpg' },
  { slug: 'temperature', name: 'TEMP', desc: '48 SKUs · Skin & Reusable Probes', image: '/assets/images/products/temp-probe/temp-probe-01.jpg' },
  { slug: 'eeg', name: 'EEG', desc: 'Cables & Electrodes · Adapters', image: '/assets/images/products/ecg-cable/ecg-cable-01.jpg' },
];

const HERO_BULLETS = [
  'Source factory provides cost-effective compatible products',
  'Quality control strict under ISO13485 quality management',
  'All cables are MDR compliant, CE / FDA / MHRA certified',
  'All-in-One Solution for Patient Monitor Accessories',
];

const STATS = [
  { num: '100+', label: 'Cooperative Clients' },
  { num: '4000㎡', label: 'Smart Factory' },
  { num: '90%+', label: 'Compatible Brands' },
  { num: '349+', label: 'Custom Cases' },
];

const SEGMENTS = [
  { icon: '🏬', title: 'Wholesale Agent', desc: 'One-stop compatible accessories supply with flexible small/large order mix.' },
  { icon: '🏭', title: 'OEM & ODM', desc: 'Custom connectors, cables, packaging with your brand labeling.' },
  { icon: '🔧', title: 'Trader or Repairer', desc: 'Reliable stock and fast dispatch to keep your shelves full.' },
  { icon: '🤝', title: 'Broker', desc: 'Share profits with us — your network, our factory.' },
];

const PROCESS_STEPS = [
  { no: '01', title: 'Pre Development', desc: 'Market research, product design, certification assistance.' },
  { no: '02', title: 'Project Experiment', desc: 'Mold opening, validation, mass production.' },
  { no: '03', title: 'Post Marketing', desc: 'Exhibition & platform & site operation guidance, posters.' },
];

const APPLICATIONS = [
  { slug: 'icu', name: 'ICU Monitoring', desc: 'Continuous 24/7 monitoring', image: '/assets/images/applications/icu.png' },
  { slug: 'or', name: 'Operating Room', desc: 'Intraoperative monitoring', image: '/assets/images/applications/or.png' },
  { slug: 'emergency', name: 'Emergency Dept.', desc: 'Rapid ED deployment', image: '/assets/images/applications/emergency.png' },
  { slug: 'ward', name: 'General Ward', desc: 'Daily ward monitoring', image: '/assets/images/applications/ward.png' },
];

const QUOTES = [
  { text: 'The negotiating process was fast and easy. Products are exceeding our expectations.', who: 'Alexander · Cyprus' },
  { text: 'We received an immediate response and professional guidance.', who: 'Wilma' },
  { text: 'Shipped quickly. The seller went above and beyond.', who: 'Hiki · Japan' },
  { text: 'Well packed and arrived a day earlier than expected.', who: 'Chris' },
];

const CERTS = ['TUV', 'MDD', 'ISO 13485', 'FSC', 'FDA'];

function SectionHead({ title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="h-2">{title}</h2>
      {subtitle ? <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>{subtitle}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container-site">
          <div className="hero-grid">
            <div className="hero-title">
              <span className="eyebrow">MEDKE® · SHENZHEN · EST. 2008</span>
              <h1 className="h-1" style={{ marginTop: 18 }}>
                17 Years of Focus on Medical Accessories Production and Manufacturing
              </h1>
              <p className="lede hero-lede">Vital links, Healthier lives.</p>
              <ul className="perk-list" style={{ maxWidth: 560 }}>
                {HERO_BULLETS.map((b) => (
                  <li key={b}>
                    <span style={{ color: 'var(--cta)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/products">Browse 472 Products</Link>
                <Link className="btn btn-secondary" to="/contact">Request a Full Catalog</Link>
              </div>
            </div>
            <div className="hero-media">
              <img
                className="hero-img"
                src="/assets/images/hero/hero-product.jpg"
                alt="Medke patient monitor accessories"
              />
              <div className="hero-compat">
                <span className="chip">Philips</span>
                <span className="chip">GE</span>
                <span className="chip">Mindray</span>
                <span className="chip">Drager</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats strip */}
      <div style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <div className="stat-strip">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <div className="num">{s.num}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Product lines — 8 cards */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead
            title="Choose Your Competitive Product, Now!"
            subtitle="8 product lines covering your monitor & device needs"
          />
          <div className="product-grid">
            {PRODUCT_LINES.map((line) => (
              <Link className="product-card" to={`/${line.slug}/`} key={line.slug}>
                <div className="product-img-wrap">
                  <img src={line.image} alt={line.name} loading="lazy" />
                </div>
                <div className="product-body">
                  <h3 className="product-name">{line.name}</h3>
                  <p className="product-pn">{line.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link className="btn btn-primary" to="/products">More Products</Link>
          </div>
        </div>
      </section>

      {/* 4. Client segments — 4 cards (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <SectionHead
            title="We Serve Every Kind of Partner"
            subtitle="Join us today — your business type decides your exclusive plan"
          />
          <div className="app-grid">
            {SEGMENTS.map((seg) => (
              <div className="card" key={seg.title}>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'var(--accent-soft)', color: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, marginBottom: 12,
                  }}
                >
                  {seg.icon}
                </div>
                <h4 className="h-3" style={{ marginBottom: 8 }}>{seg.title}</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{seg.desc}</p>
                <Link to="/contact" style={{ color: 'var(--cta)', fontWeight: 500, fontSize: 14 }}>
                  Join Us Today →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Band */}
      <section
        className="section"
        style={{ background: 'var(--accent-soft)', borderTop: '1px solid #cdd5ef', borderBottom: '1px solid #cdd5ef' }}
      >
        <div className="container-site" style={{ textAlign: 'center' }}>
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>
            One-Stop Solution: Save Worry, Save Trouble, Save Cost!
          </h2>
          <div style={{ marginTop: 20 }}>
            <Link className="btn btn-primary" to="/contact">Get a Quote Now</Link>
          </div>
        </div>
      </section>

      {/* 6. Service process — 3 steps */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead title="Our Service Process" />
          <div className="oem-steps">
            {PROCESS_STEPS.map((step) => (
              <div className="oem-step" key={step.no}>
                <span className="oem-step-n">{step.no}</span>
                <h4 className="h-3" style={{ margin: '6px 0' }}>{step.title}</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Applications — 4 cards (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <SectionHead title="Built for Every Care Setting" />
          <div className="app-grid">
            {APPLICATIONS.map((app) => (
              <Link className="app-card" to={`/${app.slug}/`} key={app.slug}>
                <div className="app-img-wrap">
                  <img src={app.image} alt={app.name} loading="lazy" />
                </div>
                <div className="app-body">
                  <h3 className="h-3">{app.name}</h3>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>{app.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Company intro — split (left text, right image) */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <div className="about-story-grid">
            <div>
              <h2 className="h-2">Welcome to Medke</h2>
              <p className="muted" style={{ fontSize: 15, lineHeight: 1.7, marginTop: 14, maxWidth: 560 }}>
                Established in 2008 with registered capital of RMB 10 million. Located in Shenzhen,
                we export to 100+ countries with complete medical certifications.
              </p>
              <div style={{ marginTop: 20 }}>
                <Link className="btn btn-secondary" to="/about">About Us</Link>
              </div>
            </div>
            <img className="about-story-img" src="/assets/images/about/quality-lab.png" alt="Medke quality lab" />
          </div>
        </div>
      </section>

      {/* 9. Testimonials — 4 quotes (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <SectionHead title="Valuable Partner" />
          <div className="cert-grid">
            {QUOTES.map((q) => (
              <div className="cert-card" key={q.who}>
                <p style={{ fontSize: 14, lineHeight: 1.65 }}>“{q.text}”</p>
                <div style={{ marginTop: 12, fontWeight: 600, fontSize: 13, color: 'var(--accent)' }}>{q.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Certification wall */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead title="Medke Certification" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {CERTS.map((c) => (
              <span
                key={c}
                style={{
                  border: '1.5px solid var(--accent)', color: 'var(--accent)',
                  borderRadius: 8, padding: '8px 18px', fontWeight: 600,
                  fontSize: 14, background: 'var(--surface)',
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
