import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const IBP_CABLE_TYPES = [
  { type: 'B.Braun',        brands: 'B.Braun / Philips',         monitors: 'Philips, Siemens',          img: '/assets/images/products/ibp-cable/ibp-conn-bbraun.jpg',        imgFull: '/assets/images/products/ibp-cable/ibp-conn-bbraun-600.jpg' },
  { type: 'B.D',            brands: 'Becton Dickinson',           monitors: 'B.D systems',                img: '/assets/images/products/ibp-cable/ibp-conn-bd.jpg',            imgFull: '/assets/images/products/ibp-cable/ibp-conn-bd-600.jpg' },
  { type: 'Edward',         brands: 'Edwards Lifesciences',       monitors: 'GE, Datex-Ohmeda',          img: '/assets/images/products/ibp-cable/ibp-conn-edward.jpg',        imgFull: '/assets/images/products/ibp-cable/ibp-conn-edward-600.jpg' },
  { type: 'Medex / Abbott', brands: 'Abbott, Medex',              monitors: 'Nihon Kohden, GE',           img: '/assets/images/products/ibp-cable/ibp-conn-medex-abbott.jpg',  imgFull: '/assets/images/products/ibp-cable/ibp-conn-medex-abbott-600.jpg' },
  { type: 'Utah',           brands: 'Utah Medical',               monitors: 'Mindray, Drager',            img: '/assets/images/products/ibp-cable/ibp-conn-utah.jpg',          imgFull: '/assets/images/products/ibp-cable/ibp-conn-utah-600.jpg' },
  { type: 'PVB',            brands: 'PVB Medical',                monitors: 'OEM Systems',                img: '/assets/images/products/ibp-cable/ibp-conn-pvb.jpg',           imgFull: '/assets/images/products/ibp-cable/ibp-conn-pvb-600.jpg' },
  { type: 'Argon',          brands: 'Argon Medical',              monitors: 'Various ICU Systems',        img: '/assets/images/products/ibp-cable/ibp-conn-argon.jpg',         imgFull: '/assets/images/products/ibp-cable/ibp-conn-argon-600.jpg' },
  { type: 'Medex Logical',  brands: 'Medex Logical Series',       monitors: 'ICU and OR integrations',   img: '/assets/images/products/ibp-cable/ibp-conn-medex-logical.jpg', imgFull: '/assets/images/products/ibp-cable/ibp-conn-medex-logical-600.jpg' },
  { type: 'USB',            brands: 'Digital Interface Monitors', monitors: 'Custom data systems',        img: '/assets/images/products/ibp-cable/ibp-conn-usb.jpg',           imgFull: '/assets/images/products/ibp-cable/ibp-conn-usb-600.jpg' },
  { type: 'Mindray',        brands: 'Mindray-specific',           monitors: 'Mindray patient monitors',  img: '/assets/images/products/ibp-cable/ibp-conn-mindray.jpg',       imgFull: '/assets/images/products/ibp-cable/ibp-conn-mindray-600.jpg' },
];

const IBP_TRANSDUCERS = [
  { code: 'BB-101', model: 'Abbott / Medex',   brands: 'Abbott, Medex, GE, Nihon Kohden', moq: '10pcs' },
  { code: 'BB-102', model: 'Edward',            brands: 'Edwards, GE, Datex, Ohmeda',      moq: '10pcs' },
  { code: 'BB-103', model: 'Philips / B.Braun', brands: 'Philips, B.Braun systems',        moq: '10pcs' },
  { code: 'BB-104', model: 'B.D',               brands: 'Becton Dickinson monitors',        moq: '10pcs' },
  { code: 'BB-105', model: 'Utah',              brands: 'Utah Medical, Mindray',            moq: '10pcs' },
];

const TRANSDUCER_MODELS = ['bb-101', 'bb-102', 'bb-103', 'bb-104', 'bb-105'];

const THUMB_STYLE = {
  width: 56,
  height: 56,
  objectFit: 'contain',
  background: '#fff',
  borderRadius: 6,
  display: 'block',
  cursor: 'zoom-in',
  border: '1px solid rgba(255,255,255,0.18)',
  padding: 4,
  transition: 'box-shadow 150ms',
};

export default function IbpProductSection() {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { src, alt }

  const visibleRows = showAll ? IBP_CABLE_TYPES : IBP_CABLE_TYPES.slice(0, 5);

  // Esc to close lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  const openLightbox = (src, alt) => setLightbox({ src, alt });

  return (
    <div>
      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(8,10,24,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxHeight: '80vh', maxWidth: '90vw',
              width: 'auto', height: 'auto',
              borderRadius: 12,
              boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
              display: 'block',
            }}
          />
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute', top: 16, right: 20,
              width: 40, height: 40, borderRadius: '50%',
              border: 'none', background: 'rgba(255,255,255,0.14)',
              color: '#fff', fontSize: 24, lineHeight: 1,
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Block A: IBP Cables */}
      <div className="ibp-section-block">
        {/* A-1: image + text two-column */}
        <div className="ibp-cable-grid">
          <div
            style={{
              aspectRatio: '3 / 2',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'var(--surface-warm)',
            }}
          >
            <img
              src="/assets/images/products/ibp-cable/ibp-cable-big.jpg"
              alt="IBP Cable Connectors — 10 compatible types"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h3 className="h-3" style={{ color: 'var(--accent)', marginBottom: 8 }}>
              IBP Cables
            </h3>
            <div className="product-chips" style={{ marginBottom: 14 }}>
              <span className="chip">10 Connector Types</span>
              <span className="chip">CE · FDA</span>
              <span className="chip">OEM Available</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: 20 }}>
              Compatible IBP cables covering 10 mainstream transducer connector standards —
              B.Braun, Edwards, BD, Medex/Abbott and more. Direct factory supply, 10 pcs MOQ.
            </p>
            <Link className="btn btn-primary" to="/contact">Request a Quote →</Link>
          </div>
        </div>

        {/* A-2: 10-type connector table with Photo column + collapse */}
        <div className="data-block" style={{ marginTop: 24 }}>
          <span className="dlabel">IBP Cable Connector Type Reference — 10 Types</span>
          <table style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th style={{ width: 72 }}>Photo</th>
                <th>Cable Type</th>
                <th>Compatible Transducer Brands</th>
                <th>Common Use With Monitors</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.type}>
                  <td style={{ padding: '8px 10px' }}>
                    <img
                      src={row.img}
                      alt={`${row.type} connector`}
                      loading="lazy"
                      style={THUMB_STYLE}
                      onClick={() => openLightbox(row.imgFull, `${row.type} IBP Connector`)}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px #ADB8E3'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{row.type}</td>
                  <td>{row.brands}</td>
                  <td>{row.monitors}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setShowAll((v) => !v)}
            style={{
              marginTop: 14,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#ADB8E3',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 16px',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>{showAll ? '▲ Show Less' : '▼ Show All 10 Types'}</span>
          </button>
        </div>
      </div>

      {/* Block B: Disposable IBP Transducer */}
      <div className="ibp-section-block">
        <h3 className="h-3" style={{ color: 'var(--accent)', marginBottom: 8 }}>
          Disposable IBP Transducer
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--fg-2)', marginBottom: 24, maxWidth: '70ch' }}>
          Single-use sterile pressure transducers compatible with major ICU monitoring brands.
          Five models (BB-101 to BB-105) cover Abbott/Medex, Edwards, Philips/B.Braun, BD and Utah
          transducer interfaces. Standard kits available with pressure dome, flush device and
          transducer holder upon request.
        </p>

        {/* B-2: 5 product images — click to enlarge */}
        <div className="ibp-transducer-gallery">
          {TRANSDUCER_MODELS.map((m) => {
            const src = `/assets/images/products/ibp-cable/ibp-transducer-${m}.jpg`;
            const alt = `IBP Transducer ${m.toUpperCase()}`;
            return (
              <div
                className="ibp-transducer-gallery-item"
                key={m}
                onClick={() => openLightbox(src, alt)}
                style={{ cursor: 'zoom-in' }}
              >
                <div className="ibp-transducer-gallery-item-img">
                  <img src={src} alt={alt} loading="lazy" />
                </div>
                <div className="ibp-transducer-gallery-label">{m.toUpperCase()}</div>
              </div>
            );
          })}
        </div>

        {/* B-3: compatibility spec table — scrollable on mobile */}
        <div style={{ overflowX: 'auto' }}>
          <table className="spec-table" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th>Order Code</th>
                <th>Transducer Interface</th>
                <th>Compatible Brands</th>
                <th>MOQ</th>
              </tr>
            </thead>
            <tbody>
              {IBP_TRANSDUCERS.map((row) => (
                <tr key={row.code}>
                  <td style={{ fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{row.code}</td>
                  <td>{row.model}</td>
                  <td>{row.brands}</td>
                  <td><span className="chip">{row.moq}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* B-4: footnote */}
        <p className="muted" style={{ fontSize: 13, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          ✱ Standard kits include pressure dome, flush device, and transducer holder upon request.
          All models are sterile, single-use and individually packaged.
        </p>
      </div>
    </div>
  );
}
