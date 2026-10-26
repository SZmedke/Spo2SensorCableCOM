import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { submitInquiry } from '../lib/inquiries';
import './VrShowroomPage.css';

const CERT_MARQUEE_CARDS = [
  {
    logo: '/assets/images/certs/individual/opt/logo-nmpa.png',
    tag: 'China Medical',
    title: 'China NMPA License',
    code: '粤食药监械生产许20162775号',
    isEu: false,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-eumdr.png',
    tag: 'European Union',
    title: 'EU MDR Class IIb QMS',
    code: 'G15 085432 0008 Rev. 00',
    isEu: true,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-ce0123.png',
    tag: 'Notified Body 0123',
    title: 'TÜV SÜD Product Service',
    code: 'Munich, Germany · Audited',
    isEu: false,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-fda.png',
    tag: 'United States FDA',
    title: 'FDA 510(k) & FEI Listing',
    code: 'K152390 · K242623 · 3012804266',
    isEu: false,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-iso13485.png',
    tag: 'Medical QMS Standard',
    title: 'EN ISO 13485:2016',
    code: 'Q5 085432 0005 Rev. 05',
    isEu: false,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-sfda.png',
    tag: 'Saudi Arabia / GCC',
    title: 'Saudi SFDA Approval',
    code: 'MDMA-2-2026-1892 (Active)',
    isEu: false,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-rzn.png',
    tag: 'EAEU / Russia',
    title: 'Russia Roszdravnadzor (RZN)',
    code: 'National Medical Device Reg.',
    isEu: false,
  },
  {
    logo: '/assets/images/certs/individual/opt/logo-mdsap.png',
    tag: 'Global Single Audit',
    title: 'MDSAP Global Program',
    code: 'US · CA · BR · JP · AU Audited',
    isEu: false,
  },
];

const VR_ENGLISH_URL =
  'https://medke.en.alibaba.com/view/showroom/immersed.htm?model_id=6427029&member_id=200574575&ali_id=17380443759&vaccount_id=200879398&wx_navbar_transparent=true&_aplus_page_enable=true&model=ailab&model_source=ailab&language=en_US&locale=en_US&wh_lang=en&_lang=en_US&country=US';

export default function VrShowroomPage() {
  const [activeStation, setActiveStation] = useState('entrance');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    corpEmail: '',
    companyName: '',
    country: '',
    tourType: 'both',
    preferredTimeWindow: '',
    productInterest: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);
  const vrContainerRef = useRef(null);

  // Monitor fullscreen change events across standard & vendor prefixes
  useEffect(() => {
    function handleFullscreenChange() {
      const isFull = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        vrContainerRef.current?.classList.contains('is-fullscreen')
      );
      setIsFullscreen(isFull);
      if (!isFull) {
        document.body.classList.remove('vr-body-lock');
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      document.body.classList.remove('vr-body-lock');
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const toggleFullscreen = () => {
    const container = vrContainerRef.current;
    if (!container) return;

    const isCurrentFull = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      container.classList.contains('is-fullscreen')
    );

    if (!isCurrentFull) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {
          container.classList.add('is-fullscreen');
          document.body.classList.add('vr-body-lock');
          setIsFullscreen(true);
        });
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else {
        container.classList.add('is-fullscreen');
        document.body.classList.add('vr-body-lock');
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      container.classList.remove('is-fullscreen');
      document.body.classList.remove('vr-body-lock');
      setIsFullscreen(false);
    }
  };

  const jumpToStation = (stationId) => {
    setActiveStation(stationId);
    if (stationId === 'entrance') {
      const vrSec = document.getElementById('vr-experience');
      if (vrSec) {
        vrSec.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const targetEl = document.getElementById(stationId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetEl.style.boxShadow = '0 0 0 3px #0047FF';
        setTimeout(() => {
          if (targetEl) targetEl.style.boxShadow = '';
        }, 1800);
      }
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.corpEmail.trim()) return;

    setSubmitting(true);
    try {
      const res = await submitInquiry({
        name: formData.fullName.trim(),
        email: formData.corpEmail.trim(),
        company: formData.companyName.trim() || undefined,
        country: formData.country.trim() || undefined,
        product_name: '3D VR Factory Tour & Audit Dossier',
        inquiry_type: 'VR Tour & Factory Audit Request',
        message: [
          `[VR Factory Tour & Audit Booking]`,
          `Requested Service: ${formData.tourType}`,
          `Preferred Time Window: ${formData.preferredTimeWindow || 'Not specified'}`,
          formData.productInterest ? `Audit Scope / Interests: ${formData.productInterest.trim()}` : '',
        ]
          .filter(Boolean)
          .join('\n\n'),
      });

      if (res.ok) {
        showToast(
          `Thank you, ${formData.fullName.trim()}! Your audit request (${res.ref}) has been logged. Our QA coordinator will contact you at ${formData.corpEmail.trim()} within 2 business hours.`
        );
        setFormData({
          fullName: '',
          corpEmail: '',
          companyName: '',
          country: '',
          tourType: 'both',
          preferredTimeWindow: '',
          productInterest: '',
        });
      } else {
        showToast('Something went wrong submitting your request. Please email contact@medke.com directly.');
      }
    } catch {
      showToast('Network error submitting request. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 6000);
  };

  return (
    <div className="vr-showroom-page">
      {/* 1. Hero / Intro Section */}
      <section className="vr-hero">
        <div className="container-site">
          <div className="vr-hero-header">
            <div className="vr-pill">
              <span className="pulse-dot"></span>
              IMMERSIVE 360° FACTORY TOUR · VIRTUAL SHOWROOM
            </div>
            <h1 className="vr-hero-title">
              4,000㎡ Modern Medical Production &amp; <span className="highlight">Cleanroom Facility</span>
            </h1>
            <p className="vr-hero-desc">
              Experience our audited medical manufacturing base in Bao&apos;an, Shenzhen. Walk through our Class 100,000 cleanrooms, automated extrusion &amp; laser soldering lines, and TÜV SÜD audited testing laboratories in real-time 3D VR.
            </p>

            {/* Factory Stats Strip */}
            <div className="factory-stats-strip">
              <div className="factory-stat-box">
                <div className="stat-val">4,000<span className="unit">㎡</span></div>
                <div className="stat-lbl">Audited Facility</div>
                <div className="stat-desc">Anle Industrial Zone, Shenzhen</div>
              </div>
              <div className="factory-stat-box">
                <div className="stat-val">100,000<span className="unit">Class</span></div>
                <div className="stat-lbl">GMP Cleanroom</div>
                <div className="stat-desc">Positive pressure clean assembly</div>
              </div>
              <div className="factory-stat-box">
                <div className="stat-val">100<span className="unit">%</span></div>
                <div className="stat-lbl">Electrical Hipot QA</div>
                <div className="stat-desc">3,000V AC dielectric safety test</div>
              </div>
              <div className="factory-stat-box">
                <div className="stat-val">100<span className="unit">+</span></div>
                <div className="stat-lbl">Export Countries</div>
                <div className="stat-desc">EU MDR, US FDA, UK MHRA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core 3D VR Showroom Container */}
      <section className="vr-section" id="vr-experience">
        <div className="container-site">
          <div className="vr-player-card" id="vr-container" ref={vrContainerRef}>
            
            {/* Top Interactive Toolbar */}
            <div className="vr-toolbar">
              <div className="vr-live-status">
                <span className="live-badge">
                  <span className="blink"></span>
                  LIVE 3D INTERACTIVE
                </span>
                <span className="vr-meta-text">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <strong>Shenzhen Medke Plant</strong> · Bao&apos;an District, Shenzhen, China
                </span>
              </div>

              {/* Quick Station Jump Anchors */}
              <div className="vr-station-nav">
                <button
                  type="button"
                  className={`station-btn ${activeStation === 'entrance' ? 'active' : ''}`}
                  onClick={() => jumpToStation('entrance')}
                >
                  🏢 Main Lobby
                </button>
                <button
                  type="button"
                  className={`station-btn ${activeStation === 'cleanroom' ? 'active' : ''}`}
                  onClick={() => jumpToStation('cleanroom')}
                >
                  🧼 Class 100k Cleanroom
                </button>
                <button
                  type="button"
                  className={`station-btn ${activeStation === 'extrusion' ? 'active' : ''}`}
                  onClick={() => jumpToStation('extrusion')}
                >
                  ⚡ Cable Extrusion
                </button>
                <button
                  type="button"
                  className={`station-btn ${activeStation === 'lab' ? 'active' : ''}`}
                  onClick={() => jumpToStation('lab')}
                >
                  🔬 Hipot QA Lab
                </button>
                <button
                  type="button"
                  className={`station-btn ${activeStation === 'warehouse' ? 'active' : ''}`}
                  onClick={() => jumpToStation('warehouse')}
                >
                  📦 Smart Warehouse
                </button>
              </div>

              {/* Fullscreen & External Action Controls */}
              <div className="vr-actions">
                <button
                  type="button"
                  className="ctrl-btn"
                  id="btn-fullscreen"
                  onClick={toggleFullscreen}
                  title="Toggle Fullscreen 360° Tour"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isFullscreen ? (
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    ) : (
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    )}
                  </svg>
                  <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}</span>
                </button>

                <a
                  href={VR_ENGLISH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ctrl-btn primary"
                  title="Open Standalone VR Window"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Open New Window
                </a>
              </div>
            </div>

            {/* Embedded 360° VR Iframe */}
            <div className="vr-iframe-wrap">
              <iframe
                id="medke-vr-iframe"
                className="vr-iframe"
                src={VR_ENGLISH_URL}
                title="Shenzhen Medke Technology 3D Virtual Showroom (Official English Edition)"
                allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
                loading="eager"
              ></iframe>
            </div>

            {/* Bottom Navigation & User Guidance Bar */}
            <div className="vr-guide-bar">
              <div className="guide-tips">
                <div className="tip-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 12l-4-4-4 4M12 16V9"></path>
                  </svg>
                  <span><strong>Drag</strong> to rotate 360°</span>
                </div>
                <div className="tip-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                  <span><strong>Scroll</strong> to zoom in/out</span>
                </div>
                <div className="tip-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4"></circle>
                    <circle cx="12" cy="12" r="9"></circle>
                  </svg>
                  <span><strong>Click floor discs</strong> to move to adjacent workshops</span>
                </div>
              </div>

              <div className="guide-cta-group">
                <a href="#audit-booking" className="link-live-audit">
                  Need a guided live walkthrough? Book a 1-on-1 engineer tour →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Section: 4 Core Workshop Stations */}
      <section className="workshops-section" id="workshops">
        <div className="container-site">
          <div className="section-header-wrap">
            <span className="section-badge">Verified Manufacturing Capabilities</span>
            <h2 className="section-heading">Key Production Workshops &amp; QA Stations</h2>
            <p className="section-subtext">
              Explore the precision engineering, certified cleanrooms, and stringent quality control protocols behind every Medke medical cable and patient sensor.
            </p>
          </div>

          <div className="workshop-cards-grid">
            
            {/* Workshop 1: Class 100,000 Cleanroom */}
            <article className="workshop-card" id="cleanroom">
              <div className="workshop-img-container">
                <img
                  src="/assets/images/about/cleanroom-real-clean.jpg"
                  alt="Class 100,000 Cleanroom Assembly Facility"
                  className="workshop-img"
                  loading="lazy"
                />
                <div className="workshop-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Zone 01 · Clean Assembly
                </div>
              </div>
              <div className="workshop-body">
                <h3 className="workshop-title">Class 100,000 Cleanroom Assembly Facility</h3>
                <p className="workshop-desc">
                  Dedicated positive pressure cleanroom built to ISO 14644-1 Class 8 standards. Houses critical medical optical sensor alignment, silicon overmolding, and bio-compatible medical TPU cable termination.
                </p>

                <table className="workshop-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Area &amp; HVAC:</td>
                      <td className="spec-val">1,200 ㎡ / Constant Temp 22±2℃, Humidity 45-65%</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Core Operations:</td>
                      <td className="spec-val">SpO2 LED/PD precision optical potting, Biocompatible TPU assembly</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Particle Audit:</td>
                      <td className="spec-val highlight">&lt; 3,520,000 particles/m³ (≥0.5µm) / Monthly 3rd-Party Test</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Applicable Regs:</td>
                      <td className="spec-val">ISO 13485:2016 Clause 6.4 (Work Environment) &amp; EU MDR</td>
                    </tr>
                  </tbody>
                </table>

                <div className="workshop-footer-row">
                  <div className="audit-stamp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    TÜV SÜD Audited Active
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStation('entrance')}
                    className="btn-card-action"
                  >
                    Inspect in 3D Tour ↑
                  </button>
                </div>
              </div>
            </article>

            {/* Workshop 2: Automated Cable Extrusion & Soldering */}
            <article className="workshop-card" id="extrusion">
              <div className="workshop-img-container">
                <img
                  src="/assets/images/about/factory-line.png"
                  alt="Automated Extrusion & Precision Laser Soldering"
                  className="workshop-img"
                  loading="lazy"
                />
                <div className="workshop-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Zone 02 · Extrusion &amp; Wiring
                </div>
              </div>
              <div className="workshop-body">
                <h3 className="workshop-title">Automated Extrusion &amp; Precision Laser Soldering</h3>
                <p className="workshop-desc">
                  Multi-core medical cable extrusion with Kevlar anti-tensile core braiding. Equipped with automated precision wire stripping and micro-laser welding benches to eliminate cold solder joints.
                </p>

                <table className="workshop-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Capacity:</td>
                      <td className="spec-val">50,000 meters / day medical cable extrusion capacity</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Jacket Material:</td>
                      <td className="spec-val">Medical-grade TPU &amp; TPE (Latex-Free, DEHP-Free, RoHS 2.0)</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Tensile &amp; Flex:</td>
                      <td className="spec-val highlight">&gt; 100,000 cycles flex fatigue life test verified</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Soldering QA:</td>
                      <td className="spec-val">100% Optical Microscope visual verification of pin joints</td>
                    </tr>
                  </tbody>
                </table>

                <div className="workshop-footer-row">
                  <div className="audit-stamp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    ISO 13485:2016 Validated
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStation('entrance')}
                    className="btn-card-action"
                  >
                    Inspect in 3D Tour ↑
                  </button>
                </div>
              </div>
            </article>

            {/* Workshop 3: Electrical Hipot & QA Lab */}
            <article className="workshop-card" id="lab">
              <div className="workshop-img-container">
                <img
                  src="/assets/images/about/lab-testing-real-web.jpg"
                  alt="Electrical Hipot & Biocompatibility Laboratory"
                  className="workshop-img"
                  loading="lazy"
                />
                <div className="workshop-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Zone 03 · Quality &amp; Safety Lab
                </div>
              </div>
              <div className="workshop-body">
                <h3 className="workshop-title">Electrical Hipot &amp; Biocompatibility Laboratory</h3>
                <p className="workshop-desc">
                  Comprehensive QA testing laboratory ensuring 100% compliance with IEC 60601-1 electrical safety and ISO 10993 cytotoxicity standards. Every patient cable undergoes automated multi-point testing.
                </p>

                <table className="workshop-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Hipot Test:</td>
                      <td className="spec-val highlight">100% 3,000V AC Dielectric Withstand &amp; Leakage Current test</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Biocompatibility:</td>
                      <td className="spec-val">ISO 10993-5 (Cytotoxicity) &amp; ISO 10993-10 (Irritation) Passed</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Defibrillation:</td>
                      <td className="spec-val">5,000V Defibrillator discharge energy absorption verification</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Signal Integrity:</td>
                      <td className="spec-val">Fluke &amp; Mindray Patient Simulator signal accuracy benchmarked</td>
                    </tr>
                  </tbody>
                </table>

                <div className="workshop-footer-row">
                  <div className="audit-stamp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    IEC 60601-1 / FDA Clearances
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStation('entrance')}
                    className="btn-card-action"
                  >
                    Inspect in 3D Tour ↑
                  </button>
                </div>
              </div>
            </article>

            {/* Workshop 4: Smart Barcoded Warehouse */}
            <article className="workshop-card" id="warehouse">
              <div className="workshop-img-container">
                <img
                  src="/assets/images/about/factory-warehouse.jpg"
                  alt="Smart Barcoded ERP Warehouse & Traceability"
                  className="workshop-img"
                  loading="lazy"
                />
                <div className="workshop-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  Zone 04 · Logistics &amp; ERP
                </div>
              </div>
              <div className="workshop-body">
                <h3 className="workshop-title">Smart Barcoded ERP Warehouse &amp; Traceability</h3>
                <p className="workshop-desc">
                  Temperature and humidity controlled raw material quarantine and finished goods storage. Full ERP lot-number barcode scanning links every cable assembly to incoming raw material test batches.
                </p>

                <table className="workshop-specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Storage Capacity:</td>
                      <td className="spec-val">500,000+ ready-to-ship standard sensor units &amp; cables</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Lot Traceability:</td>
                      <td className="spec-val highlight">100% Barcode ERP tracking / 10-Year DHR Record Archiving</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Lead Time:</td>
                      <td className="spec-val">24-48 Hours dispatch for standard replacement monitoring parts</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Packing Standard:</td>
                      <td className="spec-val">Anti-static sealed PE bag with medical lot traceability label</td>
                    </tr>
                  </tbody>
                </table>

                <div className="workshop-footer-row">
                  <div className="audit-stamp">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    100% Lot Traceability Verified
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToStation('entrance')}
                    className="btn-card-action"
                  >
                    Inspect in 3D Tour ↑
                  </button>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* 4. Section: Remote Audit Dossier & 1-on-1 Live Tour Booking */}
      <section className="conversion-section" id="audit-booking">
        <div className="container-site">
          <div className="conv-grid">
            
            {/* Left Column: Factory Audit Summary Dossier */}
            <div className="conv-card">
              <span className="conv-badge">Official Compliance Package</span>
              <h2 className="conv-title">Download Official Factory Audit Dossier</h2>
              <p className="conv-lead">
                Require certified documentation for your procurement committee, hospital tender, or regulatory registration? Request our complete audited manufacturing dossier.
              </p>

              <ul className="dossier-list">
                <li className="dossier-item">
                  <div className="dossier-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="dossier-info">
                    <h4>TÜV SÜD ISO 13485:2016 Audit Summary Report</h4>
                    <p>Official surveillance audit report covering QMS design, production control, and cleanroom maintenance.</p>
                  </div>
                </li>
                <li className="dossier-item">
                  <div className="dossier-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <div className="dossier-info">
                    <h4>Class 100,000 Cleanroom Particle &amp; Bio-Burden Report</h4>
                    <p>Third-party airborne particle counts and micro-organism sedimentation records.</p>
                  </div>
                </li>
                <li className="dossier-item">
                  <div className="dossier-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="dossier-info">
                    <h4>ISO 10993 Biocompatibility &amp; Electrical Safety Dossier</h4>
                    <p>GLP test certificates for skin irritation, cytotoxicity, and IEC 60601-1 hipot test procedures.</p>
                  </div>
                </li>
              </ul>

              <div style={{ background: '#F8F9FA', padding: 18, borderRadius: 8, border: '1px dashed #D7D8D3' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                  🛡️ Direct Confidentiality Guarantee
                </div>
                <div style={{ fontSize: 12, color: 'var(--meta)', lineHeight: 1.5 }}>
                  All proprietary technical drawings and customer references are protected. We provide mutual NDAs upon request before sharing full unredacted audit packages.
                </div>
              </div>
            </div>

            {/* Right Column: 1-on-1 Live Video Guided Tour Form */}
            <div className="conv-card">
              <span className="conv-badge" style={{ background: 'var(--cta-soft)', color: 'var(--cta)' }}>
                Interactive Live Tour
              </span>
              <h2 className="conv-title">Schedule a 1-on-1 Live Video Guided Audit</h2>
              <p className="conv-lead">
                Can&apos;t visit Shenzhen in person? Join a high-definition video walkthrough hosted by our QA Director &amp; Lead Project Engineers via Zoom or Teams.
              </p>

              <form className="conv-form" id="audit-form" onSubmit={handleAuditSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Your Full Name<span className="req">*</span></label>
                    <input
                      className="form-input"
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Dr. / Mr. / Ms. Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="corpEmail">Corporate Work Email<span className="req">*</span></label>
                    <input
                      className="form-input"
                      type="email"
                      id="corpEmail"
                      value={formData.corpEmail}
                      onChange={handleInputChange}
                      placeholder="name@hospital-or-oem.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="companyName">Company / Organization<span className="req">*</span></label>
                    <input
                      className="form-input"
                      type="text"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Hospital / Distributor / OEM"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="country">Country / Region<span className="req">*</span></label>
                    <input
                      className="form-input"
                      type="text"
                      id="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="e.g. Germany, USA, Brazil"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="tourType">Requested Service<span className="req">*</span></label>
                    <select
                      className="form-select"
                      id="tourType"
                      value={formData.tourType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="both">1-on-1 Live Video Tour + Audit Dossier</option>
                      <option value="dossier">Download Audit Dossier Pack Only</option>
                      <option value="live-tour">Schedule 1-on-1 Video Audit Only</option>
                      <option value="custom-oem">OEM / Custom Cable Technical Feasibility</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="preferredTimeWindow">Preferred Time Window<span className="req">*</span></label>
                    <select
                      className="form-select"
                      id="preferredTimeWindow"
                      value={formData.preferredTimeWindow}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select Time Window (e.g. This Week)</option>
                      <option value="urgent">Urgent — Within 24-48 Business Hours</option>
                      <option value="this-week">This Week (Mon - Fri / Flexible Slot)</option>
                      <option value="next-week">Next Week (Scheduled Milestone Slot)</option>
                      <option value="custom-date">Specific Calendar Date (Mention in scope below)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="productInterest">Product Lines or Specific Audit Scope</label>
                  <textarea
                    className="form-textarea"
                    id="productInterest"
                    value={formData.productInterest}
                    onChange={handleInputChange}
                    placeholder="e.g. SpO2 reusable sensors, ECG leadwires, cleanroom particle verification, or specific connector tooling..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Request & Access Dossier →'}
                </button>

                <p className="privacy-hint">
                  🔒 Your corporate details are kept strictly confidential under Medke&apos;s{' '}
                  <Link to="/privacy-policy" style={{ color: 'var(--cta)', textDecoration: 'underline' }}>
                    Privacy Policy
                  </Link>
                  . Our QA team responds within 2 business hours.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Section: Regulatory Credentials Infinite Marquee */}
      <section className="reg-marquee-section">
        <div className="container-site">
          <div className="reg-marquee-header">
            <div className="reg-marquee-title-group">
              <div className="reg-icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h3>Global Regulatory Clearances &amp; Certified QMS Authorities</h3>
                <p>Annual surveillance audits by TÜV SÜD (Notified Body 0123) · US FDA FEI 3012804266 · EU MDR 2017/745</p>
              </div>
            </div>

            <div className="reg-marquee-action">
              <Link to="/certificates">
                Explore All 8 Certificates →
              </Link>
            </div>
          </div>

          {/* Infinite Dual-Track Seamless Scrolling Marquee */}
          <div className="reg-marquee-wrapper" aria-label="Global Regulatory Accreditations Infinite Marquee">
            <div className="reg-marquee-track">
              {/* Set A */}
              {CERT_MARQUEE_CARDS.map((card, idx) => (
                <div className="reg-marquee-card" key={`set-a-${idx}`}>
                  <div className={`reg-card-logo-box ${card.isEu ? 'bg-eu' : ''}`}>
                    <img src={card.logo} alt={card.title} loading="lazy" />
                  </div>
                  <div className="reg-card-content">
                    <span className="reg-card-tag">{card.tag}</span>
                    <div className="reg-card-title">{card.title}</div>
                    <div className="reg-card-code">{card.code}</div>
                  </div>
                </div>
              ))}

              {/* Set B (Duplicated for seamless loop) */}
              {CERT_MARQUEE_CARDS.map((card, idx) => (
                <div className="reg-marquee-card" key={`set-b-${idx}`}>
                  <div className={`reg-card-logo-box ${card.isEu ? 'bg-eu' : ''}`}>
                    <img src={card.logo} alt={card.title} loading="lazy" />
                  </div>
                  <div className="reg-card-content">
                    <span className="reg-card-tag">{card.tag}</span>
                    <div className="reg-card-title">{card.title}</div>
                    <div className="reg-card-code">{card.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="vr-toast-notice" role="alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
