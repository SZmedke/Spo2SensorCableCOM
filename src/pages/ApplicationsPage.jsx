import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';

// Scenario image cards (hi-fi design p7, first block)
const SCENARIOS = [
  {
    slug: 'icu',
    image: '/assets/images/applications/icu.png',
    title: 'ICU Monitoring',
    alt: 'ICU monitoring',
    desc: 'Continuous 24/7 monitoring',
  },
  {
    slug: 'or',
    image: '/assets/images/applications/or.png',
    title: 'Operating Room',
    alt: 'Operating room',
    desc: 'Intraoperative vital-sign monitoring',
  },
  {
    slug: 'emergency',
    image: '/assets/images/applications/emergency.png',
    title: 'Emergency Dept.',
    alt: 'Emergency department',
    desc: 'Rapid deployment in the ED',
  },
  {
    slug: 'ward',
    image: '/assets/images/applications/ward.png',
    title: 'General Ward',
    alt: 'General ward',
    desc: 'Daily monitoring for general wards',
  },
];

// Scenario detail cards (hi-fi design p7, second block)
const SCENARIO_DETAILS = [
  {
    icon: '🏥',
    title: 'ICU',
    text: 'Multi-parameter monitoring 24/7 — high-cycle consumables, stable supply & fast restock.',
  },
  {
    icon: '⚕️',
    title: 'Operating Room',
    text: 'ESU pads, ECG & SpO2 that withstand OR workflow, sterile-safe packaging options.',
  },
  {
    icon: '🚑',
    title: 'Emergency',
    text: 'Quick-dispatch accessories for ED monitors and defibrillators (AED-compatible).',
  },
  {
    icon: '🛏️',
    title: 'General Ward',
    text: 'Cost-effective disposable sensors for daily ward monitoring across 100+ beds.',
  },
];

export default function ApplicationsPage() {
  return (
    <>
      {/* Scenario image cards */}
      <div className="section">
        <div className="container-site">
          <SectionHeading
            align="center"
            title="Built for Every Care Setting"
            subtitle="Real scenarios · real hospitals · proven compatibility"
          />
          <div className="app-grid">
            {SCENARIOS.map((s) => (
              <Link key={s.slug} to={`/${s.slug}`} className="app-card">
                <div className="app-img-wrap">
                  <img src={s.image} alt={s.alt} width="400" height="225" loading="lazy" />
                </div>
                <div className="app-body">
                  <h3 className="h-3">{s.title}</h3>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scenario detail cards (light background) */}
      <div className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <SectionHeading align="center" title="Scenario Details" />
          <div className="cert-grid">
            {SCENARIO_DETAILS.map((s) => (
              <div className="card" key={s.title} style={{ padding: '18px 16px' }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: 'var(--surface-warm)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    marginBottom: 10,
                  }}
                >
                  {s.icon}
                </div>
                <h4 className="h-3" style={{ marginBottom: 6 }}>{s.title}</h4>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 10 }}>
                  {s.text}
                </p>
                <Link to="/products" className="category-link">
                  View Products <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA band */}
      <section
        style={{
          background: 'var(--surface-warm)',
          borderTop: '1px solid #cdd5ef',
          borderBottom: '1px solid #cdd5ef',
          padding: '48px 0',
          textAlign: 'center',
        }}
      >
        <div className="container-site">
          <h2 className="h-2" style={{ color: 'var(--accent)', fontWeight: 700 }}>
            Tell Us Your Scenario — Get a Tailored Kit List
          </h2>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: 18 }}>
            Request a Kit List
          </Link>
        </div>
      </section>
    </>
  );
}
