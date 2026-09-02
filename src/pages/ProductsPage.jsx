import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/catalog';

/* ---------- local data (visual-design spec: page 2 / 全部产品) ---------- */

const PRODUCT_LINES = [
  { slug: 'spo2', name: 'SpO2 Sensors', desc: '123 SKUs · Disposable & Reusable', image: '/assets/images/categories/patient-monitoring.jpg' },
  { slug: 'esu', name: 'ESU', desc: '26 SKUs · Pads, Pencils & Cables', image: '/assets/images/categories/esu.jpg' },
  { slug: 'aed', name: 'AED', desc: 'Pads & Electrodes · Adapter Cables', image: '/assets/images/categories/category-aed.jpg' },
  { slug: 'nibp', name: 'NIBP', desc: '27 SKUs · Cuffs, Hoses & Adapters', image: '/assets/images/products/nibp-hose/nibp-hose-01.jpg' },
  { slug: 'ecg', name: 'ECG / EKG', desc: '149 SKUs · Cables, Leadwires & Electrodes', image: '/assets/images/categories/ekg.jpg' },
  { slug: 'ibp', name: 'IBP', desc: '23 SKUs · Cables & Transducers', image: '/assets/images/products/ibp-cable/ibp-cable-01.jpg' },
  { slug: 'temperature', name: 'TEMP', desc: '48 SKUs · Skin & Reusable Probes', image: '/assets/images/products/temp-probe/temp-probe-01.jpg' },
  { slug: 'eeg', name: 'EEG', desc: 'Cables & Electrodes · Adapters', image: '/assets/images/categories/category-eeg.jpg' },
];

const BRANDS = [
  { name: 'Philips', note: 'PM · Fetal' },
  { name: 'GE', note: 'PM · ESU' },
  { name: 'Mindray', note: 'BeneView' },
  { name: 'Drager', note: 'V-series' },
  { name: 'Fukuda', note: 'Dynascope' },
  { name: 'Nihon Kohden', note: 'BSM' },
  { name: 'Bionet', note: 'BM series' },
  { name: 'Aeon', note: 'Fetal Monitor' },
];

const brandSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function SectionHead({ title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <h2 className="h-2">{title}</h2>
      {subtitle ? <p className="muted" style={{ marginTop: 8, fontSize: 14 }}>{subtitle}</p> : null}
    </div>
  );
}

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [keyword, setKeyword] = useState('');

  const results = keyword.trim()
    ? PRODUCTS.filter((p) =>
        `${p.partNumber} ${p.name} ${p.description} ${p.brands.join(' ')} ${p.subcategory}`
          .toLowerCase()
          .includes(keyword.trim().toLowerCase())
      )
    : [];

  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(query);
  };

  return (
    <>
      {/* 1. Search + 2. product-line grid */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container-site">
          <SectionHead title="All Products" subtitle="8 product lines · 472 SKUs · 90%+ brand compatibility" />

          <form
            className="catalog-toolbar"
            onSubmit={onSearch}
            style={{ maxWidth: 620, margin: '0 auto 32px', border: 'none', paddingBottom: 0 }}
            role="search"
          >
            <input
              className="field-input"
              style={{ flex: 1, minWidth: 220 }}
              placeholder="Search by model, OEM#…"
              aria-label="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

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

          {/* 4. CTA */}
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link className="btn btn-primary" to="/contact">Request a Full Catalog</Link>
          </div>

          {/* 5. Search results */}
          {keyword.trim() !== '' && (
            <div style={{ marginTop: 48 }}>
              <h3 className="h-3" style={{ marginBottom: 16 }}>
                Search Results{results.length > 0 ? ` (${results.length})` : ''}
              </h3>
              {results.length > 0 ? (
                <div className="product-grid">
                  {results.map((p) => (
                    <Link className="product-card" to={`/product/${p.id}`} key={p.id}>
                      <div className="product-img-wrap">
                        <img src={p.images[0]} alt={p.name} loading="lazy" />
                      </div>
                      <div className="product-body">
                        <span className="product-pn">{p.partNumber}</span>
                        <h4 className="product-name">{p.name}</h4>
                        <div className="product-chips">
                          {p.brands.map((b) => (
                            <span className="chip" key={b}>{b}</span>
                          ))}
                        </div>
                        <span className="product-rfq">Request a Quote →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="muted">
                  No products found for “{keyword}”.{' '}
                  <Link to="/contact" style={{ color: 'var(--cta)' }}>Ask us directly</Link> — we can verify
                  compatibility for your model.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. Brand grid (light background) */}
      <section className="section" style={{ background: 'var(--accent-soft)' }}>
        <div className="container-site">
          <SectionHead title="By Compatible Brand" subtitle="90%+ of mainstream patient monitor brands" />
          <div className="cert-grid">
            {BRANDS.map((brand) => (
              <Link className="cert-card" to={`/brands/${brandSlug(brand.name)}`} key={brand.name}
                style={{ textAlign: 'center', textDecoration: 'none' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--fg-2)' }}>{brand.name}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>{brand.note}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
