import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import './AboutPage.css';

const FAQS = [
  {
    q: "What regulatory documentation is provided for hospital tender submissions?",
    a: "We provide full regulatory compliance packets including TÜV SÜD CE MDR Class IIb certificates (EU 2017/745), US FDA 510(k) summary letters, ISO 13485:2016 declarations, ISO 10993 biological evaluation reports, and complete Declarations of Conformity (DoC)."
  },
  {
    q: "What is the minimum order quantity (MOQ) for custom cable designs?",
    a: "For standard catalog models, we maintain zero MOQ requirements. For bespoke OEM/ODM projects with custom injection molds or special connector pinouts, our starting MOQ is typically 100 units following prototype approval."
  },
  {
    q: "How rapidly can Medke manufacture and ship functional evaluation samples?",
    a: "Standard clinical samples are dispatched from our Bao'an warehouse within 24 to 48 hours. Custom tooling sample batches require 3 to 5 business days using our modular tooling system, shipped via DHL Express or FedEx International Priority."
  },
  {
    q: "Can our quality assurance team conduct a live video or on-site factory audit?",
    a: "Yes. We regularly host formal remote video quality audits through encrypted conferencing tools, inspecting cleanrooms, incoming raw material inspections, and test benches in real-time. In-person audits at our Shenzhen facility can be scheduled with 5 business days advance notice."
  },
  {
    q: "How does Medke protect client intellectual property during custom development?",
    a: "We execute enforceable bilateral Non-Disclosure Agreements (NDAs) prior to receiving 3D CAD/STEP files. All proprietary mold tooling is marked with exclusive client identifiers, stored in segregated tool vaults, and never repurposed for third parties."
  },
  {
    q: "Are all medical cables certified for biocompatibility and skin contact?",
    a: "Yes. All patient-contact jackets and silicone sensor shells utilize medical-grade TPU or silicone certified under ISO 10993-5 (cytotoxicity), ISO 10993-10 (sensitization and irritation), and are 100% latex-free and DEHP-free."
  }
];

export default function AboutPage() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [lightboxData, setLightboxData] = useState(null);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const toggleFaq = (index) => {
    setActiveFaqIndex((prev) => (prev === index ? null : index));
  };

  const openLightbox = (src, caption) => {
    setLightboxData({ src, caption });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Tagline words reveal on scroll
    const container = document.getElementById('taglineWordsContainer');
    const words = container ? container.querySelectorAll('.tagline-word') : null;
    let taglineObserver;

    if (container && words && words.length > 0 && 'IntersectionObserver' in window) {
      taglineObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              words.forEach((word, index) => {
                setTimeout(() => {
                  word.classList.add('active');
                }, index * 60);
              });
              taglineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35, rootMargin: '0px 0px -50px 0px' }
      );

      taglineObserver.observe(container);
    } else if (words) {
      words.forEach((w) => w.classList.add('active'));
    }

    // 2. Scroll reveal for section primitives
    const revealElements = document.querySelectorAll('.about-page .reveal-on-scroll');
    let scrollObserver;

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              scrollObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
      );

      revealElements.forEach((el) => scrollObserver.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add('revealed'));
    }

    // 3. Close modal on ESC key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (taglineObserver) taglineObserver.disconnect();
      if (scrollObserver) scrollObserver.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="about-page">
      {/* ===================================================================
           SECTION 1: HERO - Asymmetric Industrial Fleet
           =================================================================== */}
      <section className="epic-hero" id="overview">
        <div className="container">
          <div className="epic-hero-grid">
            {/* Left Content */}
            <div className="reveal-on-scroll">
              <div className="hero-pre-badge">
                <span className="dot"></span>
                <span>EST. 2008 · SHENZHEN BAO'AN · ISO 13485 CERTIFIED</span>
              </div>

              <h1 className="hero-title">
                Professional Medical Supplies Manufacturer,<br />
                <span className="brand-accent">All-in-One Solution</span> for Monitor Accessories
              </h1>

              <p className="hero-subtitle">
                Shenzhen Medke Technology Co., Ltd. is an audit-ready medical manufacturer. We forge high-fidelity patient monitoring cables and pulse oximetry sensors that sustain vital clinical continuity in intensive care units across 100+ countries.
              </p>

              {/* 4 Independent Hero Stat Cards */}
              <div className="hero-stats-cards">
                <div className="stat-card-item">
                  <div className="stat-card-num">17<span className="plus">+</span></div>
                  <div className="stat-card-sub">Years Medical Sensors</div>
                </div>
                <div className="stat-card-item">
                  <div className="stat-card-num">4,000<span className="plus">㎡</span></div>
                  <div className="stat-card-sub">Smart Facility Base</div>
                </div>
                <div className="stat-card-item">
                  <div className="stat-card-num">472<span className="plus">+</span></div>
                  <div className="stat-card-sub">Clinical Models Cleared</div>
                </div>
                <div className="stat-card-item">
                  <div className="stat-card-num">100<span className="plus">+</span></div>
                  <div className="stat-card-sub">Export Destinations</div>
                </div>
              </div>

              {/* Hero CTA */}
              <div className="hero-btn-row">
                <button type="button" className="btn btn-primary" onClick={() => setIsBrochureModalOpen(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  <span>Download Corporate Brochure (PDF)</span>
                </button>
                <Link to="/vr-showroom" className="btn btn-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  <span>Explore 3D VR Tour</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Canvas */}
            <div className="hero-viewport-canvas reveal-on-scroll">
              <div className="hero-master-frame">
                <img src="/assets/images/about/factory-exterior.jpg" alt="Medke 4,000㎡ Intelligent Manufacturing Center Exterior in Bao'an, Shenzhen" loading="eager" decoding="async" />
              </div>

              {/* Floating VR Radar Card */}
              <div className="vr-radar-widget">
                <div className="radar-pulse-ring">
                  <div className="radar-pulse-center"></div>
                </div>
                <div>
                  <div className="radar-title">Live VR Tour Ready</div>
                  <div className="radar-sub">Shenzhen Cleanroom Facility</div>
                  <Link to="/vr-showroom" className="radar-link-btn">
                    <span>Enter Spatial View</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 2: TAGLINE REVEAL (Engineering Philosophy)
           =================================================================== */}
      <section className="tagline-reveal-section" id="philosophy">
        <div className="container">
          <div className="tagline-reveal-wrap reveal-on-scroll">
            <div className="tagline-lead-eyebrow">
              <span className="section-eyebrow">Precision Engineering Philosophy</span>
            </div>

            <h2 className="tagline-reveal-text" id="taglineWordsContainer">
              <span className="tagline-word">Zero</span>{' '}
              <span className="tagline-word">signal</span>{' '}
              <span className="tagline-word">distortion</span>{' '}
              <span className="tagline-word">under</span>{' '}
              <span className="tagline-word">critical</span>{' '}
              <span className="tagline-word highlight-word">ICU</span>{' '}
              <span className="tagline-word highlight-word">monitoring.</span>
              <br />
              <span className="tagline-word">Every</span>{' '}
              <span className="tagline-word">micron</span>{' '}
              <span className="tagline-word">of</span>{' '}
              <span className="tagline-word">extrusion</span>{' '}
              <span className="tagline-word">engineered</span>{' '}
              <span className="tagline-word">to</span>{' '}
              <span className="tagline-word">protect</span>{' '}
              <span className="tagline-word highlight-word">human</span>{' '}
              <span className="tagline-word highlight-word">life.</span>
            </h2>

            <div className="tagline-annotation">
              100% Biocompatible Materials · ISO 10993 Tested · Zero Cytotoxicity
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 3: 17-YEAR MANUFACTURING EVOLUTION (Editorial Split)
           =================================================================== */}
      <section className="dual-feature-section" id="evolution">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }} className="reveal-on-scroll">
            <span className="section-eyebrow">17-Year Manufacturing Evolution</span>
            <h2 className="section-title">From 2008 Precision Craftsmanship to a 4,000㎡ Modern Smart Factory</h2>
            <p className="section-subtitle">
              Two generations of engineering dedication: established in 2008 to safeguard critical patient monitoring vitals, evolving into an ISO 13485 &amp; CE MDR certified smart facility supplying hospital procurement networks in 100+ countries.
            </p>
          </div>

          <div className="dual-split-wrap">
            {/* Left Fold: 2008 Foundation */}
            <div className="split-fold-left reveal-on-scroll">
              <div>
                <div className="fold-stamp-row">
                  <span className="fold-badge-sub">Phase I · The Origin (2008)</span>
                  <span className="fold-year-heavy">2008</span>
                </div>
                <div className="fold-lead-person">
                  <img src="/assets/images/team/09_Li-Zhenzong_Founder.jpg" alt="Li Zhenzong - Founder of Medke" className="fold-avatar" loading="lazy" decoding="async" />
                  <div>
                    <h3 className="fold-name">Li Zhenzong</h3>
                    <div className="fold-title">Founder (Born 1954 in Hong Kong)</div>
                  </div>
                </div>
                <p className="fold-narrative">
                  Moved by the fragility of human life witnessed during the 2008 humanitarian response, industrialist Li Zhenzong established Medke with an initial ¥1,000,000 capital and a 1,000㎡ precision workshop. He pledged that every medical sensor leaving his shop floor must guarantee zero signal distortion when clinical lives hang in the balance.
                </p>
              </div>
              <ul className="fold-specs-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Origin Mandate:</strong> Life-saving bio-signal transmission with zero tolerance.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Seed Workshop:</strong> 1,000㎡ precision extrusion shop in Bao'an, Shenzhen.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Craftsmanship Ethic:</strong> 100% biocompatible medical skin-contact testing.</span>
                </li>
              </ul>
            </div>

            {/* Right Fold: 2024 Intelligent Scale */}
            <div className="split-fold-right reveal-on-scroll">
              <div>
                <div className="fold-stamp-row">
                  <span className="fold-badge-sub">Phase II · The Smart Leap (Today)</span>
                  <span className="fold-year-heavy">Present</span>
                </div>
                <div className="fold-lead-person">
                  <img src="/assets/images/team/08_Li-Weitao_Chairman-and-CEO.jpg" alt="Li Weitao - Chairman and CEO of Medke" className="fold-avatar" loading="lazy" decoding="async" />
                  <div>
                    <h3 className="fold-name">Li Weitao</h3>
                    <div className="fold-title">Chairman &amp; CEO (2nd Generation Industrialist)</div>
                  </div>
                </div>
                <p className="fold-narrative">
                  Representing a forward-looking industrial leadership, Li Weitao injected digital agility and global regulatory rigor into traditional manufacturing. He oversaw the transition to our modern 4,000㎡ campus, secured European TÜV SÜD CE MDR Class IIb certification, and expanded US FDA 510(k) clearances.
                </p>
              </div>
              <ul className="fold-specs-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>4,000㎡ Smart Campus:</strong> Positive-pressure cleanrooms &amp; automated test rigs.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Regulatory Pinnacle:</strong> Official CE MDR Class IIb &amp; FDA K242623 / K243000.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong>Agile DFM Engineering:</strong> 24-hour turnaround for OEM medical monitor builders.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 4: 17-YEAR STRATEGIC CHRONO-STRIP
           =================================================================== */}
      <section className="chrono-section" id="milestones">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }} className="reveal-on-scroll">
            <span className="section-eyebrow">Strategic Trajectory</span>
            <h2 className="section-title">17 Years of Clinical Quality Accumulation</h2>
            <p className="section-subtitle">
              A three-era chronological progression from startup precision extrusion to worldwide regulatory sovereignty (2008–2026).
            </p>
          </div>

          <div className="chrono-strip-grid">
            {/* Era 1: 2008–2014 */}
            <div className="chrono-era-card reveal-on-scroll">
              <div className="era-badge-strip">
                <span className="era-period-pill">2008 – 2014</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-subtle)' }}>Era I</span>
              </div>
              <h3 className="era-label-title">Precision Workshop &amp; ISO 13485 Foundation</h3>
              <ul className="era-event-chain">
                <li><strong>2008:</strong> Medke founded with ¥1M capital and 1,000㎡ plant in Bao'an following Wenchuan earthquake.</li>
                <li><strong>2010:</strong> First 100,000-grade cleanroom operational for optical SpO2 assembly.</li>
                <li><strong>2011:</strong> Official Medical Device Manufacturing License granted.</li>
                <li><strong>2014:</strong> Initial TÜV SÜD ISO 13485:2003 certificate secured from Munich auditors.</li>
              </ul>
            </div>

            {/* Era 2: 2015–2020 */}
            <div className="chrono-era-card reveal-on-scroll">
              <div className="era-badge-strip">
                <span className="era-period-pill">2015 – 2020</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-subtle)' }}>Era II</span>
              </div>
              <h3 className="era-label-title">Capital Expansion &amp; US FDA Entry</h3>
              <ul className="era-event-chain">
                <li><strong>2015:</strong> Registered capital raised to ¥10,000,000 RMB; obtained domestic NMPA approvals.</li>
                <li><strong>2016:</strong> Maiden US FDA 510(k) clearance granted (K152390) for SpO2 sensors.</li>
                <li><strong>2018:</strong> Campus expansion to 3,000㎡ with 12 multi-cavity injection lines.</li>
                <li><strong>2020:</strong> Dedicated OEM/ODM Engineering Department established with 2,000+ mold repository.</li>
              </ul>
            </div>

            {/* Era 3: 2021–2026 */}
            <div className="chrono-era-card active-era reveal-on-scroll">
              <div className="era-badge-strip">
                <span className="era-period-pill" style={{ backgroundColor: 'var(--medke-success-soft)', color: 'var(--medke-success)' }}>2021 – 2026</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--medke-success)' }}>Era III · Modern Scale</span>
              </div>
              <h3 className="era-label-title">4,000㎡ Smart Campus &amp; EU MDR Class IIb</h3>
              <ul className="era-event-chain">
                <li><strong>2022:</strong> Full transitional overhaul under European Medical Device Regulation (EU 2017/745).</li>
                <li><strong>2024:</strong> Inauguration of 4,000㎡ intelligent facility base in Bao'an, Shenzhen.</li>
                <li><strong>2025:</strong> Formal TÜV SÜD CE MDR Class IIb Certificate (G15 085432 0008) issued, valid to 2031.</li>
                <li><strong>2026:</strong> Dual US FDA 510(k) clearances secured (K242623 &amp; K243000); ISO 13485 renewed to 2029.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 5: BENTO GRID FACILITY MATRIX
           =================================================================== */}
      <section className="bento-facility-section" id="facility">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }} className="reveal-on-scroll">
            <span className="section-eyebrow">Manufacturing Powerhouse</span>
            <h2 className="section-title">4,000㎡ Certified Intelligent Production Base</h2>
            <p className="section-subtitle">
              An asymmetric look into our Bao'an facility. Positive-pressure cleanrooms, multi-axis reliability test benches, and vertical extrusion cells operating under 100% traceability.
            </p>
          </div>

          <div className="bento-matrix reveal-on-scroll">
            {/* Bento Hero Card: Cleanroom */}
            <div
              className="bento-box bento-hero-card"
              onClick={() => openLightbox('/assets/images/about/cleanroom-real-clean.jpg', 'ISO Class 7 (100,000-Grade) Dust-Free Assembly Cleanroom')}
            >
              <img src="/assets/images/about/cleanroom-real-clean.jpg" alt="Medke ISO Class 7 Assembly Cleanroom" loading="lazy" decoding="async" />
              <div className="bento-hud-panel">
                <div className="hud-param">
                  <span className="param-label">Cleanliness</span>
                  <span className="param-val">ISO 14644-1 Cl.7</span>
                </div>
                <div className="hud-param">
                  <span className="param-label">Temp</span>
                  <span className="param-val">22.4°C</span>
                </div>
                <div className="hud-param">
                  <span className="param-label">Humidity</span>
                  <span className="param-val">52% RH</span>
                </div>
                <div className="hud-param">
                  <span className="param-label">Differential</span>
                  <span className="param-val">+15 Pa</span>
                </div>
              </div>
              <div className="bento-caption-scrim">
                <h3 className="bento-title">ISO Class 7 Positive-Pressure Cleanroom</h3>
                <p className="bento-desc">HEPA-filtered dust-free environment dedicated to optical chip micro-soldering, wire harness bonding, and cleanroom packaging.</p>
              </div>
            </div>

            {/* Bento Top-Right Card: Lab */}
            <div
              className="bento-box"
              onClick={() => openLightbox('/assets/images/about/lab-testing-real-web.jpg', 'Full-Chain Electrical Safety & Reliability Testing Laboratory')}
            >
              <img src="/assets/images/about/lab-testing-real-web.jpg" alt="In-House Testing Laboratory" loading="lazy" decoding="async" />
              <div className="bento-caption-scrim">
                <h3 className="bento-title">Full Electrical &amp; Reliability Lab</h3>
                <p className="bento-desc">20,000-cycle bending benches, 50N axial pull testers, and 1,500V dielectric breakdown test cells.</p>
              </div>
            </div>

            {/* Bento Bottom-Right Split Cards */}
            <div className="bento-bottom-split">
              {/* Workshop Card */}
              <div
                className="bento-box"
                onClick={() => openLightbox('/assets/images/about/factory-01.jpg', 'High-Precision Extrusion & Multi-Cavity Injection Molding Workshop')}
              >
                <img src="/assets/images/about/factory-01.jpg" alt="Extrusion and Molding Workshop" loading="lazy" decoding="async" />
                <div className="bento-caption-scrim">
                  <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '2px' }}>Extrusion Workshop</h4>
                  <p style={{ fontSize: '12px', color: '#CBD5E1' }}>Medical-grade TPU jacketing.</p>
                </div>
              </div>

              {/* VR Showroom Launch Card */}
              <Link to="/vr-showroom" className="bento-vr-launch-box">
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(0, 71, 255, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 1 8 0M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>Explore in 3D VR</h4>
                <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '12px' }}>Inspect all 4,000㎡ bays remotely.</p>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#60A5FA', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Launch VR Tour &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 6: R&D AGILITY & OEM/ODM MATRIX
           =================================================================== */}
      <section className="rd-agility-section" id="customization">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }} className="reveal-on-scroll">
            <span className="section-eyebrow">Flexible Engineering</span>
            <h2 className="section-title">Proprietary Tooling &amp; Agile OEM/ODM Matrix</h2>
            <p className="section-subtitle">
              Our integrated toolmaking, resin extrusion, and electronics engineering enable responsive adaptation for custom patient monitor geometries.
            </p>
          </div>

          <div className="agility-quad-grid">
            {/* Card 1 */}
            <div className="agility-card reveal-on-scroll">
              <div>
                <div className="agility-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <h3 className="agility-title">2,000+ Mold Tooling Library</h3>
                <p className="agility-desc">Covering 98% of international monitor brand pinouts including Philips, Mindray, GE, Dräger, and Nihon Kohden.</p>
              </div>
              <span className="agility-tag">98% Global Coverage</span>
            </div>

            {/* Card 2 */}
            <div className="agility-card reveal-on-scroll">
              <div>
                <div className="agility-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="agility-title">24-Hour DFM Engineering Review</h3>
                <p className="agility-desc">Submit 2D drawings or 3D STEP models. Receive detailed Design for Manufacturing feedback and feasibility drawings within 24 hours.</p>
              </div>
              <span className="agility-tag">&lt; 24h Turnaround</span>
            </div>

            {/* Card 3 */}
            <div className="agility-card reveal-on-scroll">
              <div>
                <div className="agility-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h3 className="agility-title">3–5 Days Rapid Tooling Samples</h3>
                <p className="agility-desc">Modular tooling inserts enable functional evaluation sample runs manufactured and express air-shipped in 3 to 5 business days.</p>
              </div>
              <span className="agility-tag">3–5 Days Functional Samples</span>
            </div>

            {/* Card 4 */}
            <div className="agility-card reveal-on-scroll">
              <div>
                <div className="agility-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <h3 className="agility-title">Strict Bilateral NDA Protection</h3>
                <p className="agility-desc">Enforce comprehensive IP confidentiality agreements with segregated manufacturing lines and discrete documentation trails.</p>
              </div>
              <span className="agility-tag">Guaranteed IP Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 7: ACCREDITED SHIELD GALLERY (6 Pure White Certificates)
           =================================================================== */}
      <section className="shield-gallery-section" id="certifications">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }} className="reveal-on-scroll">
            <span className="section-eyebrow" style={{ background: 'rgba(0, 71, 255, 0.25)', color: '#60A5FA' }}>Audit-Ready Sovereignty</span>
            <h2 className="section-title" style={{ color: '#FFFFFF' }}>International Regulatory Shield Gallery</h2>
            <p className="section-subtitle" style={{ color: '#94A3B8' }}>
              Medke operates under continuous notified body audit surveillance. Our regulatory dossiers fulfill hospital procurement requirements globally.
            </p>
          </div>

          <div className="shield-grid">
            {/* Shield 1: ISO 13485 */}
            <div className="shield-card reveal-on-scroll">
              <div>
                <div className="shield-logo-row">
                  <div className="shield-logo-wrap">
                    <img src="/assets/images/certs/transparent/white-iso13485.png" alt="TÜV SÜD ISO 13485:2016 Certification" loading="lazy" decoding="async" />
                  </div>
                  <span className="shield-valid-pill">Valid to 2029</span>
                </div>
                <h3 className="shield-title">TÜV SÜD ISO 13485:2016</h3>
                <div className="shield-issuer">TÜV SÜD Product Service GmbH (Munich)</div>
              </div>
              <ul className="shield-meta-list">
                <li><strong>Cert No.:</strong> Q5 085432 0005 Rev. 05</li>
                <li><strong>Scope:</strong> Medical Cables &amp; Physiological Sensors</li>
                <li><strong>Status:</strong> Active / Full Audit Passed</li>
              </ul>
            </div>

            {/* Shield 2: CE MDR Class IIb */}
            <div className="shield-card reveal-on-scroll">
              <div>
                <div className="shield-logo-row">
                  <div className="shield-logo-wrap">
                    <img src="/assets/images/certs/transparent/white-ce0123.png" alt="EU CE MDR 0123 Certification" loading="lazy" decoding="async" />
                  </div>
                  <span className="shield-valid-pill">Valid to 2031</span>
                </div>
                <h3 className="shield-title">EU CE MDR 2017/745 (Class IIb)</h3>
                <div className="shield-issuer">Notified Body 0123 (TÜV SÜD Germany)</div>
              </div>
              <ul className="shield-meta-list">
                <li><strong>Cert No.:</strong> G15 085432 0008 Rev. 00</li>
                <li><strong>Classification:</strong> Class IIb (Annex IX)</li>
                <li><strong>Scope:</strong> Pulse Oximetry &amp; Patient Monitoring</li>
              </ul>
            </div>

            {/* Shield 3: US FDA 510(k) */}
            <div className="shield-card reveal-on-scroll">
              <div>
                <div className="shield-logo-row">
                  <div className="shield-logo-wrap">
                    <img src="/assets/images/certs/transparent/white-fda.png" alt="US FDA 510k Clearance" loading="lazy" decoding="async" />
                  </div>
                  <span className="shield-valid-pill">FEI 3012804266</span>
                </div>
                <h3 className="shield-title">US FDA 510(k) Clearances</h3>
                <div className="shield-issuer">US Food and Drug Administration (CDRH)</div>
              </div>
              <ul className="shield-meta-list">
                <li><strong>510(k) Nos:</strong> K152390, K242623, K243000</li>
                <li><strong>Product Code:</strong> DQA / DPZ</li>
                <li><strong>Regulation:</strong> 21 CFR 870.2700 / 870.2300</li>
              </ul>
            </div>

            {/* Shield 4: Saudi SFDA */}
            <div className="shield-card reveal-on-scroll">
              <div>
                <div className="shield-logo-row">
                  <div className="shield-logo-wrap">
                    <img src="/assets/images/certs/transparent/white-sfda.png" alt="Saudi SFDA Marketing Authorization" loading="lazy" decoding="async" />
                  </div>
                  <span className="shield-valid-pill">SFDA Authorized</span>
                </div>
                <h3 className="shield-title">Saudi SFDA Marketing Authorization</h3>
                <div className="shield-issuer">Kingdom of Saudi Arabia Food &amp; Drug Authority</div>
              </div>
              <ul className="shield-meta-list">
                <li><strong>Authorization Nos:</strong> MDMA-2-2026-1892 / -2681</li>
                <li><strong>Tender Access:</strong> Hospital Procurement Tender Cleared</li>
                <li><strong>Jurisdiction:</strong> Kingdom of Saudi Arabia &amp; GCC</li>
              </ul>
            </div>

            {/* Shield 5: Russia Roszdravnadzor (RZN) */}
            <div className="shield-card reveal-on-scroll">
              <div>
                <div className="shield-logo-row">
                  <div className="shield-logo-wrap">
                    <img src="/assets/images/certs/transparent/white-rzn.png" alt="Russia Roszdravnadzor RZN Registration" loading="lazy" decoding="async" />
                  </div>
                  <span className="shield-valid-pill">RZN Registered</span>
                </div>
                <h3 className="shield-title">Russia Roszdravnadzor (RZN)</h3>
                <div className="shield-issuer">Federal Service for Surveillance in Healthcare (RZN)</div>
              </div>
              <ul className="shield-meta-list">
                <li><strong>Registration:</strong> State Medical Device Certificate</li>
                <li><strong>Coverage:</strong> Monitoring Consumables &amp; Transducers</li>
                <li><strong>Market Reach:</strong> Russia &amp; Eurasian Customs Union</li>
              </ul>
            </div>

            {/* Shield 6: MDSAP 5-Nation */}
            <div className="shield-card reveal-on-scroll">
              <div>
                <div className="shield-logo-row">
                  <div className="shield-logo-wrap">
                    <img src="/assets/images/certs/transparent/white-mdsap.png" alt="MDSAP 5-Country Regulatory Alliance" loading="lazy" decoding="async" />
                  </div>
                  <span className="shield-valid-pill">5 Nations Global</span>
                </div>
                <h3 className="shield-title">MDSAP 5-Nation Regulatory Program</h3>
                <div className="shield-issuer">Medical Device Single Audit Program Alliance</div>
              </div>
              <ul className="shield-meta-list">
                <li><strong>Jurisdictions:</strong> USA (FDA) · Canada (Health Canada) · Brazil (ANVISA)</li>
                <li><strong>Pacific:</strong> Japan (MHLW/PMDA) · Australia (TGA)</li>
                <li><strong>Audit Standard:</strong> Unified Global QMS Single Audit</li>
              </ul>
            </div>
          </div>

          <div className="shield-link-bar reveal-on-scroll">
            <Link to="/certificates" className="btn btn-ghost-dark">
              <span>Access Technical Dossiers &amp; Download Certificates</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 8: GLOBAL CLIENT TRUST & COMPATIBILITY
           =================================================================== */}
      <section className="client-trust-section" id="global-reach">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-600)' }} className="reveal-on-scroll">
            <span className="section-eyebrow">Global Market Presence</span>
            <h2 className="section-title">Trusted Across 100+ Countries &amp; 5,200+ Clients</h2>
            <p className="section-subtitle">
              Engineered to exceed OEM baseline tolerances. Fully compatible with top clinical patient monitoring systems worldwide.
            </p>
          </div>

          <div className="brand-grid-10 reveal-on-scroll">
            <div className="brand-tile" title="Philips Compatible">
              <img src="/assets/images/clients/client-logo-philips.png" alt="Philips Medical Systems" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="Mindray Compatible">
              <img src="/assets/images/clients/client-logo-mindray.png" alt="Mindray Healthcare" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="General Electric Healthcare Compatible">
              <span className="brand-text-ge">GE HEALTHCARE</span>
            </div>
            <div className="brand-tile" title="Dräger Compatible">
              <img src="/assets/images/clients/client-logo-drager.png" alt="Dräger Medical" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="Biolight Compatible">
              <img src="/assets/images/clients/client-logo-biolight.png" alt="Biolight Healthcare" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="Comen Compatible">
              <img src="/assets/images/clients/client-logo-comen.png" alt="Comen Medical" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="EDAN Compatible">
              <img src="/assets/images/clients/client-logo-edan.png" alt="EDAN Instruments" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="Bionet Compatible">
              <img src="/assets/images/clients/client-logo-bionet.png" alt="Bionet Healthcare" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="Schiller Compatible">
              <img src="/assets/images/clients/client-logo-schiller.png" alt="Schiller Medical" loading="lazy" decoding="async" />
            </div>
            <div className="brand-tile" title="Huntleigh Compatible">
              <img src="/assets/images/clients/client-logo-huntleigh.png" alt="Huntleigh Healthcare" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 9: B2B PROCUREMENT FAQ
           =================================================================== */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }} className="reveal-on-scroll">
            <span className="section-eyebrow">Frequently Asked Questions</span>
            <h2 className="section-title">Common Hospital Procurement &amp; OEM Questions</h2>
            <p className="section-subtitle">
              Essential information regarding minimum orders, CE MDR regulatory files, customized tooling, and on-site factory audits.
            </p>
          </div>

          <div className="faq-accordion reveal-on-scroll">
            {FAQS.map((faq, index) => {
              const isActive = activeFaqIndex === index;
              return (
                <div key={index} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="faq-trigger"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isActive}
                  >
                    <span>{faq.q}</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="faq-content">
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
           SECTION 10: FACTORY AUDIT CONVERSION DOCK
           =================================================================== */}
      <section className="conversion-dock-section" id="audit-dock">
        <div className="container">
          <div className="dock-content-center reveal-on-scroll">
            <div className="dock-pill">Direct Factory Access · Certified Agility</div>
            <h2 className="dock-title">Audit Our Precision Manufacturing Excellence Firsthand</h2>
            <p className="dock-desc">
              Verify our cleanrooms, extrusion cells, and dielectric testing labs before order placement. Request complimentary clinical trial evaluation samples or schedule a live video factory audit with our senior engineering lead.
            </p>

            <div className="dock-btn-row">
              <Link to="/contact#sample-request" className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <span>Request Free Clinical Samples</span>
              </Link>
              <Link to="/contact#audit-schedule" className="btn btn-ghost-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <span>Schedule Remote Video Audit</span>
              </Link>
            </div>

            <div className="dock-trust-line">
              <span className="dock-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" color="#4ADE80"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Standard Bilateral NDA
              </span>
              <span>•</span>
              <span className="dock-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" color="#4ADE80"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Factory-Direct Wholesale Pricing
              </span>
              <span>•</span>
              <span className="dock-trust-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" color="#4ADE80"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Full CE MDR Technical Dossiers
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxData && (
        <div className="image-modal active" onClick={closeLightbox}>
          <div className="modal-content-wrap" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close-btn" onClick={closeLightbox} title="Close (Esc)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <img src={lightboxData.src} alt={lightboxData.caption} className="modal-image" loading="lazy" decoding="async" />
            <div className="modal-caption">
              <div className="modal-caption-text">{lightboxData.caption}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Shenzhen Medke Smart Campus</div>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Brochure Lead Capture Modal */}
      <LeadBrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        badge="Official Corporate Profile (PDF)"
        title="Medke Corporate Profile & Factory Capability"
        subtitle="Instant download: 4,000㎡ smart facility overview, Class 100,000 cleanroom specs, TÜV ISO 13485 & CE MDR regulatory certificates, and OEM/ODM capacity deck."
        pdfUrl="/docs/Medke-Company-Profile.pdf"
        downloadFilename="Medke_Company_Profile.pdf"
        assetName="Medke Company Profile (PDF)"
        fileSize="8.0 MB"
      />
    </div>
  );
}
