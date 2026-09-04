import { Link, useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/catalog';
import IbpProductSection from '../components/products/IbpProductSection';
import AedProductSection from '../components/products/AedProductSection';

/* ---------- local data (visual-design spec: page 3 / 产品线页) ---------- */

const PRODUCT_LINES = [
  {
    slug: 'spo2', alias: ['spo2-sensor'], short: 'SpO2', eyebrow: 'SPO2',
    title: 'Reliable SpO2 Sensors & Cables',
    lead: 'Disposable & reusable SpO2 sensors, adapter cables and accessories — compatible with Philips, GE, Mindray, Drager and 90%+ mainstream monitors, with CE / FDA certified quality.',
    image: '/assets/images/products/spo2-sensor/spo2-scene-01.jpg',
    subs: [
      { name: 'Disposable SpO2 Sensor', desc: 'Single-use adhesive sensors for neonate, pediatric and adult patients', image: '/assets/images/products/spo2-sensor/spo2-disposable.jpg' },
      { name: 'Reusable SpO2 Sensor', desc: 'Durable clip-style finger sensors for long-term and repeated use', image: '/assets/images/products/spo2-sensor/spo2-reusable.jpg' },
      { name: 'SpO2 Adapter Cable', desc: 'Extension and adapter cables bridging sensors to monitoring equipment', image: '/assets/images/products/spo2-sensor/spo2-adapter-cable.jpg' },
      { name: 'SpO2 Accessories', desc: 'Complementary components and spare parts for SpO2 monitoring setups', image: '/assets/images/products/spo2-sensor/spo2-accessories.jpg' },
    ],
  },
  {
    slug: 'esu', alias: [], short: 'ESU', eyebrow: 'ESU',
    title: 'ESU Accessories for Electrosurgery',
    lead: 'Grounding pads, pencils, electrocoagulation cables and electrodes — compatible with mainstream electrosurgical units, with CE / FDA certified quality.',
    image: '/assets/images/products/esu-pad/esu-pad-01.jpg',
    subs: [
      { name: 'Grounding Pads', desc: 'Return electrode pads', image: '/assets/images/products/esu-pad/esu-pad-01.jpg' },
      { name: 'Pencils', desc: 'Electrosurgical pencils', image: '/assets/images/categories/esu.jpg' },
      { name: 'Cables', desc: 'Coagulation cables', image: '/assets/images/products/ecg-cable/ecg-cable-01.jpg' },
      { name: 'Electrodes', desc: 'Electrodes', image: '/assets/images/products/foam-electrode/foam-electrode-01.jpg' },
    ],
  },
  {
    slug: 'aed', alias: [], short: 'AED', eyebrow: 'AED',
    title: 'AED & Defibrillation Accessories',
    lead: 'Defibrillation pads, electrodes and accessory cables — compatible with AED & defibrillator fleets, with CE / FDA certified quality.',
    image: '/assets/images/products/aed-electrode/aed-scene-01.jpg',
    subs: [],
  },
  {
    slug: 'nibp', alias: [], short: 'NIBP', eyebrow: 'NIBP',
    title: 'NIBP Cuffs, Hoses & Adapters',
    lead: 'NIBP adapter hoses, connectors and cuffs — compatible with Philips, GE, Mindray, Drager and 90%+ mainstream monitors, with CE / FDA certified quality.',
    image: '/assets/images/products/nibp-hose/nibp-scene-01.jpg',
    subs: [
      { name: 'Disposable NIBP Cuffs', desc: 'Single-use cuffs for neonate, pediatric and adult patients — including printed styles for paediatric comfort', image: '/assets/images/products/nibp-hose/nibp-disposable-cuff.jpg' },
      { name: 'Reusable NIBP Cuffs', desc: 'Durable adult cuffs for long-term clinical use, 25–35 cm arm circumference range', image: '/assets/images/products/nibp-hose/nibp-reusable-cuff.jpg' },
      { name: 'NIBP Adapter Hoses', desc: 'Dual-lumen and single-lumen hoses with quick-release and screw connectors for major monitor brands', image: '/assets/images/products/nibp-hose/nibp-adapter-hose.jpg' },
    ],
  },
  {
    slug: 'ecg', alias: ['ekg'], short: 'ECG / EKG', eyebrow: 'ECG / EKG',
    title: 'ECG / EKG Cables & Electrodes',
    lead: 'ECG trunk cables, leadwires, electrodes and adapters — compatible with Philips, GE, Mindray, Drager and 90%+ mainstream monitors, with CE / FDA certified quality.',
    image: '/assets/images/products/ecg-cable/ecg-scene-01.jpg',
    subs: [
      { name: 'EKG cables', desc: 'Lead wires with color-coded, labeled connectors', image: '/assets/images/products/ecg-cable/ecg-cables.jpg' },
      { name: 'ECG Cables', desc: 'Trunk and extension cables with multi-pin connectors', image: '/assets/images/products/ecg-cable/ecg-trunk-cable.jpg' },
      { name: 'EKG Accessories', desc: 'Suction-bulb electrodes and limb clamps for ECG monitoring', image: '/assets/images/products/ecg-cable/ecg-accessories.jpg' },
    ],
  },
  {
    slug: 'ibp', alias: [], short: 'IBP', eyebrow: 'IBP',
    title: 'IBP Cables & Transducers',
    lead: 'Invasive blood pressure cables and transducer accessories — compatible with Philips, GE, Mindray, Drager and 90%+ mainstream monitors, with CE / FDA certified quality.',
    image: '/assets/images/products/ibp-cable/ibp-scene-01.jpg',
    subs: [
      { name: 'IBP Cables', desc: 'IBP cables', image: '/assets/images/products/ibp-cable/ibp-cable-01.jpg' },
      { name: 'Transducers', desc: 'Pressure transducers', image: '/assets/images/categories/patient-monitoring.jpg' },
      { name: 'Adapters', desc: 'Adapters', image: '/assets/images/products/temp-probe/temp-probe-01.jpg' },
      { name: 'Accessories', desc: 'Accessories', image: '/assets/images/products/ibp-cable/ibp-cable-01.jpg' },
    ],
  },
  {
    slug: 'temperature', alias: ['temp', 'temperature-probe'], short: 'TEMP', eyebrow: 'TEMP',
    title: 'Temperature Probes & Sensors',
    lead: 'Skin & reusable temperature probes, adapter cables and accessories — compatible with Philips, GE, Mindray, Drager and 90%+ mainstream monitors, with CE / FDA certified quality.',
    image: '/assets/images/products/temp-probe/temp-probe-01.jpg',
    subs: [
      { name: 'Skin Probes', desc: 'Skin probes', image: '/assets/images/products/temp-probe/temp-probe-01.jpg' },
      { name: 'Reusable', desc: 'Reusable type', image: '/assets/images/products/temp-probe/temp-probe-01.jpg' },
      { name: 'Adapters', desc: 'Adapters', image: '/assets/images/products/ecg-cable/ecg-cable-01.jpg' },
      { name: 'Accessories', desc: 'Temperature accessories', image: '/assets/images/categories/patient-monitoring.jpg' },
    ],
  },
  {
    slug: 'eeg', alias: [], short: 'EEG', eyebrow: 'EEG',
    title: 'EEG Cables & Electrodes',
    lead: 'EEG cables, electrodes and adapter accessories — compatible with mainstream EEG monitors and ventilators, with CE / FDA certified quality.',
    image: '/assets/images/products/eeg-electrode/eeg-scene-01.jpg',
    subs: [
      { name: 'Casted Golden',    desc: 'Highest signal stability & conductivity',             image: '/assets/images/products/eeg-electrode/eeg-casted-golden.jpg' },
      { name: 'Casted Ag/AgCl',   desc: 'Balanced performance, anti-interference',             image: '/assets/images/products/eeg-electrode/eeg-casted-ag-agcl.jpg' },
      { name: 'Casted Silver',    desc: 'Sensitive response, suitable for ICU use',            image: '/assets/images/products/eeg-electrode/eeg-casted-silver.jpg' },
      { name: 'Needle Type',      desc: 'Invasive, for neurosurgery application',              image: '/assets/images/products/eeg-electrode/eeg-needle.jpg' },
      { name: 'Alligator Clip',   desc: 'Quick-connect in ICU / monitoring stations',         image: '/assets/images/products/eeg-electrode/eeg-alligator-clip.jpg' },
      { name: 'Snap',             desc: 'Compatible with most adhesive sensor pads',           image: '/assets/images/products/eeg-electrode/eeg-snap.jpg' },
    ],
  },
];

const BRAND_CHIPS = ['Philips', 'GE', 'Mindray', 'Drager', 'Nihon Kohden'];
const CLIENT_CHIPS = ['Philips', 'GE', 'Mindray', 'Drager', 'Fukuda', 'Nihon Kohden', 'Bionet', 'Aeon'];

const FEATURES = [
  { title: 'Direct Factory', desc: 'Source pricing, no middleman markup.' },
  { title: 'ISO 13485 QC', desc: 'Strict quality control on every batch.' },
  { title: 'MDR · CE · FDA', desc: 'Full certification documentation ready.' },
  { title: 'OEM & ODM', desc: 'Custom connector, cable & packaging.' },
  { title: 'Fast Delivery', desc: '3–7 days for stock items.' },
  { title: '24h Support', desc: 'Technical & sales team always online.' },
];

const FACTORY = [
  { name: 'Production Line', desc: 'Automated production line', image: '/assets/images/about/factory-line.png' },
  { name: 'Quality Lab', desc: 'Incoming inspection lab', image: '/assets/images/about/quality-lab.png' },
  { name: 'Workshop', desc: 'Workshop floor', image: '/assets/images/about/factory-workshop.jpg' },
  { name: 'Warehouse', desc: 'Finished-goods storage', image: '/assets/images/about/factory-warehouse.jpg' },
];

const FAQS = [
  { no: 'Q1', q: 'What is the MOQ?', a: '100 pcs mixed for stock models; lower for OEM trials.' },
  { no: 'Q2', q: 'Can you do OEM packaging?', a: 'Yes — custom connectors, cables and branded packaging.' },
  { no: 'Q3', q: 'How long is delivery?', a: '3–7 days for stock, 15–25 days for OEM production.' },
];

function SectionHead({ title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="h-2">{title}</h2>
      {subtitle ? <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>{subtitle}</p> : null}
    </div>
  );
}

/* Catalog categories and subcategories are reachable via /product-category/:slug
   but have no hand-written PRODUCT_LINES entry. Build an equivalent shape from
   catalog data so those URLs render a real page instead of "not found". */
function lineFromCatalog(key) {
  const category = CATEGORIES.find((c) => c.slug === key);
  if (category) {
    const subs = (category.subcategories || []).slice(0, 4).map((s) => ({
      name: s.name,
      desc: s.count ? `${s.count} compatible options` : 'Compatible replacements',
      image: category.image,
    }));
    return {
      short: category.name,
      eyebrow: category.name.toUpperCase(),
      title: category.name,
      lead: category.blurb || `Compatible ${category.name.toLowerCase()} for mainstream patient monitor and ventilator brands.`,
      image: category.image,
      subs: subs.length ? subs : [{ name: category.name, desc: 'Compatible replacements', image: category.image }],
    };
  }

  for (const c of CATEGORIES) {
    const sub = (c.subcategories || []).find((s) => s.slug === key);
    if (!sub) continue;
    const siblings = (c.subcategories || [])
      .filter((s) => s.slug !== key)
      .slice(0, 3)
      .map((s) => ({
        name: s.name,
        desc: s.count ? `${s.count} compatible options` : 'Compatible replacements',
        image: c.image,
      }));
    return {
      short: sub.name,
      eyebrow: sub.name.toUpperCase(),
      title: sub.name,
      lead: `Compatible ${sub.name.toLowerCase()} replacements${sub.count ? ` — ${sub.count} options available` : ''}. Part of ${c.name}, cross-referenced by brand and part number.`,
      image: c.image,
      subs: [
        { name: sub.name, desc: sub.count ? `${sub.count} compatible options` : 'Compatible replacements', image: c.image },
        ...siblings,
      ],
    };
  }
  return null;
}

export default function CategoryPage({ slug: slugProp }) {
  // Pretty routes (/spo2, /ecg …) carry no URL params, so App passes the slug
  // in directly; /product-category/:slug still resolves through useParams.
  const { slug, productLine } = useParams();
  const key = (slugProp || slug || productLine || '').toLowerCase();

  const line =
    PRODUCT_LINES.find((l) => l.slug === key || l.alias.includes(key)) ||
    lineFromCatalog(key);

  if (!line) {
    return (
      <div className="section container-site">
        <h1 className="h-1">Product line not found</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          <Link to="/products" className="category-link">Back to all products</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container-site">
          <div className="hero-grid">
            <div className="hero-title">
              <span className="eyebrow">{line.eyebrow}</span>
              <h1 className="h-1" style={{ marginTop: 18 }}>{line.title}</h1>
              <p className="lede hero-lede">{line.lead}</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/contact">Quote Now</Link>
                <Link className="btn btn-secondary" to="/contact">View Datasheet</Link>
              </div>
            </div>
            <div className="hero-media">
              <img className="hero-img" src={line.image} alt={line.short} />
              <div className="hero-compat">
                {BRAND_CHIPS.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product sub-lines — 4 cards / ibp specialist section */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead
            title={`Our ${line.short} Product Line`}
            subtitle={line.slug === 'ibp' ? 'IBP Cables · Disposable Transducers' : line.slug === 'aed' ? 'Adult · Pediatric · 20 Monitor Brands' : 'Disposable · Reusable · Adapters · Accessories'}
          />
          {line.slug === 'ibp' ? (
            <IbpProductSection />
          ) : line.slug === 'aed' ? (
            <AedProductSection />
          ) : (
            <div className={`product-grid${[3, 6].includes(line.subs.length) ? ' product-grid-3' : ''}`}>
              {line.subs.map((s) => (
                <Link className="product-card" to="/contact" key={s.name}>
                  <div className="product-img-wrap">
                    <img src={s.image} alt={s.name} loading="lazy" />
                  </div>
                  <div className="product-body">
                    <h3 className="product-name">{s.name}</h3>
                    <p className="product-pn">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Why Partner with Us — 6 features (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <SectionHead title="Why Partner with Us" />
          <div className="oem-steps">
            {FEATURES.map((f) => (
              <div className="oem-step" key={f.title}>
                <h4 className="h-3" style={{ margin: '2px 0 6px' }}>{f.title}</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Inside Our Factory — 4 cards */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead title="Inside Our Factory" subtitle="Smart factory · 4000㎡ · 100+ workers" />
          <div className="app-grid">
            {FACTORY.map((f) => (
              <div className="app-card" key={f.name}>
                <div className="app-img-wrap">
                  <img src={f.image} alt={f.name} loading="lazy" />
                </div>
                <div className="app-body">
                  <h3 className="h-3">{f.name}</h3>
                  <p className="muted" style={{ fontSize: 13, marginTop: 6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Our Awesome Clients (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <SectionHead title="Our Awesome Clients" />
          <div className="brand-pills" style={{ justifyContent: 'center' }}>
            {CLIENT_CHIPS.map((c) => (
              <span className="brand-pill" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ — 3 items */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead title="FAQ" />
          <div className="oem-steps">
            {FAQS.map((f) => (
              <div className="oem-step" key={f.no}>
                <span className="oem-step-n">{f.no}</span>
                <h4 className="h-3" style={{ margin: '6px 0' }}>{f.q}</h4>
                <p className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA Band */}
      <section
        className="section"
        style={{ background: 'var(--accent-soft)', borderTop: '1px solid #cdd5ef', borderBottom: '1px solid #cdd5ef' }}
      >
        <div className="container-site" style={{ textAlign: 'center' }}>
          <h2 className="h-2" style={{ color: 'var(--accent)' }}>Request a Wholesale Quote</h2>
          <div style={{ marginTop: 20 }}>
            <Link className="btn btn-primary" to="/contact">Get Quote Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
