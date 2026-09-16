import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';


const AED_VARIANTS = [
  {
    label: 'Adult',
    area: '69 cm² per electrode',
    length: '1.2 M',
    pnExample: 'AED-CP A-12 A',
    image: '/assets/images/products/aed-electrode/aed-adult-pad.jpg',
  },
  {
    label: 'Pediatric',
    area: '60 cm² per electrode',
    length: '1.2 M',
    pnExample: 'AED-CP A-12 B',
    image: '/assets/images/products/aed-electrode/aed-pediatric-pad.jpg',
  },
];

const AED_COMPAT = [
  { brand: 'AMI Italia',     model: 'Saver One',                                                   adultPN: 'AED-PHB-12A', pedPN: 'AED-PHB-12B', conn: 'CN547' },
  { brand: 'AMI Italia',     model: 'Saver One-D',                                                 adultPN: 'AED-PHD-12A', pedPN: 'AED-PHD-12B', conn: 'CN556' },
  { brand: 'Cardio Science', model: '—',                                                            adultPN: 'AED-CSA-12A', pedPN: 'AED-CSA-12B', conn: 'CN557' },
  { brand: 'Cardio Science', model: 'Powerheart G3 (Electrodes short circuit)',                    adultPN: 'AED-CSB-12A', pedPN: 'AED-CSB-12B', conn: 'CN557' },
  { brand: 'Comen',          model: 'Medtronic Physio-Control LIFEPAK 10/12/20/500/1000; Osatu Bexen; REANIBEX-200/300/500/700/800; Cardioline, ELIFE 700; Mindray, Comen BeneHeart D1/D2/D3/D5/D6 F1/F1A/F2/F2A', adultPN: 'AED-CMA-12A', pedPN: 'AED-CMA-12B', conn: 'CN546' },
  { brand: 'Corpuls',        model: 'Corpuls C3 Corpatch',                                         adultPN: 'AED-CPA-12A', pedPN: 'AED-CPA-12B', conn: 'CN541' },
  { brand: 'LE Medical',     model: 'LE Medical',                                                   adultPN: 'AED-MBB-12A', pedPN: 'AED-MBB-12B', conn: 'CN552' },
  { brand: 'Mindray',        model: 'PHYSIO-CONTROLLIFEPAK 9,10,12,20, 500,1000; BENEHERATD3, BNENEHERAT D6; Jousing', adultPN: 'AED-MDA-12A', pedPN: 'AED-MDA-12B', conn: 'CN535' },
  { brand: 'Nihon Kohden',   model: 'Nihon Kohden AED 2100, AED 2150, AED 2151, AED 2152',         adultPN: 'AED-NKA-12A', pedPN: 'AED-NKA-12B', conn: 'CN534' },
  { brand: 'Nihon Kohden',   model: 'JC-755V; TEC-5500 Series; TEC-7600 Series, TEC-7700 Series; JC-855V; TEC-8300 Series; WELCH ALLYN AED10, AED20, PIC30, PIC40, PIC50', adultPN: 'AED-NKB-12A', pedPN: 'AED-NKB-12B', conn: 'CN536' },
  { brand: 'Nihon Kohden',   model: 'F7955W / INSTRAMED',                                          adultPN: 'AED-NKC-12A', pedPN: 'AED-NKC-12B', conn: '—',     isNew: true },
  { brand: 'Nihon Kohden',   model: 'Nihon Kohden 2100 Series Defibrillator; 2150 Series Defibrillator (Electrodes short circuit)', adultPN: 'AED-NKD-12A', pedPN: 'AED-NKD-12B', conn: 'CN573', isNew: true },
  { brand: 'Nihon Kohden',   model: '—',                                                            adultPN: 'AED-NKE-12A', pedPN: 'AED-NKE-12B', conn: 'CN581', isNew: true },
  { brand: 'Philips',        model: 'HEARTSTART FR2, FR2+, FR3, MRx, XL, XL+; HEARTSTREAM FORERUNNER', adultPN: 'AED-PHA-12A', pedPN: 'AED-PHA-12B', conn: 'CN539' },
  { brand: 'Philips',        model: '940010XX & 940020XX; 9420XX & 9400; M1722A/B; M1723A/B; M1724A; M2475B/E/S/EM Series', adultPN: 'AED-PHC-12A', pedPN: 'AED-PHC-12B', conn: 'CN555' },
  { brand: 'Primedic',       model: 'HeartSave PAD; HeartSave AED; HeartSave AED-M; HeartSave 6S', adultPN: 'AED-PMA-12A', pedPN: 'AED-PMA-12B', conn: 'CN538' },
  { brand: 'Schiller',       model: 'CU Medical System; IPAD NF1200/1201; Ambulanc; Amoul i3; Amoul i5; CMOS DRAKE; Dea Life 400 Futura (before 2018); Cardioversor Vivo Gold (before 2024)', adultPN: 'AED-XLA-12A', pedPN: 'AED-XLA-12B', conn: 'CN537' },
  { brand: 'Schiller',       model: 'Schiller, DG4000, DG5000, DG6002, Skity, OBLS300, OBLS300A',  adultPN: 'AED-XLB-12A', pedPN: 'AED-XLB-12B', conn: 'CN548' },
  { brand: 'Zoll',           model: 'Zoll M-, E-, R-Series; Aed Plus, Aed Pro',                    adultPN: 'AED-ZRA-12A', pedPN: 'AED-ZRA-12B', conn: 'CN543' },
  { brand: 'Zoll',           model: 'M&B AED7000; Zoll M-,E-,R-Series PD 1200, 1400, 1600, 1700, 2000', adultPN: 'AED-ZRB-12A', pedPN: 'AED-ZRB-12B', conn: 'CN540' },
];

const FOLD_COUNT = 7; // show first 7 rows by default (covers AMI x2, Cardio x2, Comen, Corpuls, LE Medical)

export default function AedProductSection() {
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const visibleRows = showAll ? AED_COMPAT : AED_COMPAT.slice(0, FOLD_COUNT);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <div>
      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog" aria-modal="true"
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(8,10,24,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'zoom-out' }}
        >
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '80vh', maxWidth: '90vw', width: 'auto', height: 'auto', borderRadius: 12, boxShadow: '0 24px 64px rgba(0,0,0,0.55)', display: 'block' }} />
          <button type="button" onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: 16, right: 20, width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.14)', color: '#fff', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ×
          </button>
        </div>
      )}

      {/* Block B: Adult / Pediatric variant cards */}
      <div className="ibp-section-block">
        <h3 className="h-3" style={{ color: 'var(--accent)', marginBottom: 20 }}>
          Product Variants
        </h3>
        <div className="aed-variants-grid">
          {AED_VARIANTS.map((v) => (
            <div key={v.label} className="card" style={{ overflow: 'hidden' }}>
              <div
                style={{ aspectRatio: '4/3', background: '#f8f9fb', borderRadius: 'var(--radius-md)', overflow: 'hidden', padding: 12, cursor: 'zoom-in', marginBottom: 16 }}
                onClick={() => setLightbox({ src: v.image, alt: `AED ${v.label} Pad` })}
              >
                <img src={v.image} alt={`AED ${v.label} Electrode Pad`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>{v.label}</h4>
              <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8 }}>
                <div>Active Surface Area: <strong>{v.area}</strong></div>
                <div>Cable Length: <strong>{v.length}</strong></div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
                  P/N Example: {v.pnExample}
                </div>
                <div style={{ marginTop: 4 }}>Package: 1 pair/bag</div>
              </div>
              <div style={{ marginTop: 16 }}>
                <Link className="btn btn-primary" to="/contact" style={{ fontSize: 13, padding: '7px 18px' }}>
                  Request a Quote →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Block C: Brand compatibility table */}
      <div className="ibp-section-block">
        <div className="data-block">
          <span className="dlabel">Brand Compatibility — 20 Monitor Models</span>
          <div className="aed-compat-scroll" style={{ marginTop: 12 }}>
            <table className="aed-compat-table">
              <thead>
                <tr>
                  <th style={{ width: '14%' }}>Monitor</th>
                  <th style={{ width: '38%' }}>Compatible Models / Series</th>
                  <th style={{ width: '17%', fontFamily: 'var(--font-mono)', fontSize: 12 }}>Adult P/N</th>
                  <th style={{ width: '17%', fontFamily: 'var(--font-mono)', fontSize: 12 }}>Pediatric P/N</th>
                  <th style={{ width: '9%' }}>Connector</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, i) => {
                  const prevBrand = i > 0 ? visibleRows[i - 1].brand : null;
                  const isNewBrand = row.brand !== prevBrand;
                  return (
                    <Fragment key={`frag-${i}-${row.adultPN}`}>
                      {isNewBrand && (
                        <tr className="aed-brand-header">
                          <td colSpan={5}>{row.brand}</td>
                        </tr>
                      )}
                      <tr>
                        <td style={{ whiteSpace: 'nowrap', fontSize: 13 }}>
                          {row.isNew && <span style={{ background: '#e8405a', color: '#fff', fontSize: 10, borderRadius: 3, padding: '1px 5px', marginRight: 6, verticalAlign: 'middle' }}>NEW</span>}
                        </td>
                        <td style={{ fontSize: 13, lineHeight: 1.5 }}>{row.model}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap' }}>{row.adultPN}</td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, whiteSpace: 'nowrap' }}>{row.pedPN}</td>
                        <td style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{row.conn}</td>
                       </tr>
                     </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            style={{ marginTop: 14, background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', color: '#ADB8E3', borderRadius: 'var(--radius-sm)', padding: '6px 16px', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {showAll ? '▲ Show Less' : `▼ Show All 20 Models`}
          </button>
        </div>
      </div>

    </div>
  );
}
