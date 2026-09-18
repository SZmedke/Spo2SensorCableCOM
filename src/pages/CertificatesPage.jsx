import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, FileText, Eye, Check, Lock, Info, Loader2 } from 'lucide-react';
import { submitInquiry } from '../lib/inquiries';

const _r = React;
void _r;

export default function CertificatesPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    quantity: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [activeSection, setActiveSection] = useState('section-qms');
  const [requestedCert, setRequestedCert] = useState('');

  const manualLockRef = React.useRef(null);
  const lockTimerRef = React.useRef(null);
  const intersectingMapRef = React.useRef({});

  // Scroll spy with IntersectionObserver + manual click lock
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Listen for scrollend to release click lock safely
    const onScrollEnd = () => {
      if (manualLockRef.current) {
        setActiveSection(manualLockRef.current);
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
        setTimeout(() => {
          manualLockRef.current = null;
        }, 150);
      }
    };
    window.addEventListener('scrollend', onScrollEnd);

    // Bottom-of-page scroll detection for the final section
    const handleScroll = () => {
      if (manualLockRef.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (atBottom) {
        setActiveSection('section-cta');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (!('IntersectionObserver' in window)) {
      return () => {
        window.removeEventListener('scrollend', onScrollEnd);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const sectionIds = ['section-qms', 'section-doc', 'section-facility', 'section-cta'];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // If programmatic scroll is in flight, retain target active section
        if (manualLockRef.current) {
          setActiveSection(manualLockRef.current);
          return;
        }

        // If scrolled to bottom of document, force section-cta
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
          setActiveSection('section-cta');
          return;
        }

        // Update intersection map
        entries.forEach((entry) => {
          intersectingMapRef.current[entry.target.id] = {
            isIntersecting: entry.isIntersecting,
            top: entry.boundingClientRect.top,
          };
        });

        const activeIds = sectionIds.filter((id) => intersectingMapRef.current[id]?.isIntersecting);

        if (activeIds.length > 0) {
          // If section-cta is in view and close to top
          if (activeIds.includes('section-cta')) {
            const ctaTop = intersectingMapRef.current['section-cta']?.top;
            if (ctaTop !== undefined && ctaTop <= 350) {
              setActiveSection('section-cta');
              return;
            }
          }

          // Pick the section closest to top offset ~135px
          let bestId = activeIds[0];
          let bestDist = Infinity;
          activeIds.forEach((id) => {
            const top = intersectingMapRef.current[id]?.top;
            if (top !== undefined) {
              const dist = Math.abs(top - 135);
              if (dist < bestDist) {
                bestDist = dist;
                bestId = id;
              }
            }
          });
          setActiveSection(bestId);
        }
      },
      {
        rootMargin: '-80px 0px -20% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      window.removeEventListener('scrollend', onScrollEnd);
      window.removeEventListener('scroll', handleScroll);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      manualLockRef.current = id;
      setActiveSection(id);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        manualLockRef.current = null;
      }, 1000);

      el.scrollIntoView({ behavior: 'smooth' });
      if (typeof window !== 'undefined' && window.history?.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  const handleRequestCert = (certName) => {
    setRequestedCert(certName);
    setValues((prev) => ({
      ...prev,
      message: `Please send official verified copies and compliance dossiers for:\n• ${certName}\n\n[Intended Purpose / Hospital Tender Details]:\n`,
    }));

    manualLockRef.current = 'section-cta';
    setActiveSection('section-cta');
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      manualLockRef.current = null;
    }, 1000);

    const ctaSection = document.getElementById('section-cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
    const input = document.getElementById('req-name');
    if (input) {
      setTimeout(() => input.focus(), 350);
    }
  };

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!values.company.trim()) next.company = 'Please enter your company name.';
    if (!values.country.trim()) next.country = 'Please enter your country or region.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid business email.';
    }
    if (!values.message.trim()) {
      next.message = 'Please specify the certificates or dossiers you require.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const res = await submitInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        company: values.company.trim() || undefined,
        message: [
          '[Certificate & Compliance Dossier Request]',
          `Company: ${values.company.trim()}`,
          `Country/Region: ${values.country.trim()}`,
          values.quantity.trim() ? `Est. Annual Quantity / Target Line: ${values.quantity.trim()}` : '',
          'Requested Certificates/Dossiers:',
          values.message.trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      });
      if (res.ok) {
        navigate(`/inquiry/success?ref=${res.ref}`);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="cert-page">
      {/* Hero Section */}
      <section className="cert-hero">
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} className="breadcrumb-sep" />
            <span>Compliance &amp; Certifications</span>
          </nav>

          <span className="eyebrow">Certified Medical Quality</span>
          <h1 className="h-1">Certifications &amp; Regulatory Compliance</h1>
          <p className="lede">
            Shenzhen Medke Technology Co., Ltd. operates under a certified ISO 13485:2016 quality management system and maintains comprehensive global regulatory approvals—including TÜV SÜD EU MDR Class IIb, EU MDR Class I DoC, US FDA 510(k), UK MHRA, Saudi SFDA, and China NMPA. We provide fully traceable, audit-ready clinical consumables for healthcare distributors, hospital tenders, and OEM partners worldwide.
          </p>

          {/* 4 Quick Stats / Meta Bar */}
          <div className="hero-meta-bar">
            <div className="meta-item">
              <span className="meta-item-label">Notified Body Audit</span>
              <span className="meta-item-val">TÜV SÜD (0123)</span>
              <span className="meta-item-desc">Munich, Germany · Continuous annual surveillance audits</span>
            </div>
            <div className="meta-item">
              <span className="meta-item-label">EU Medical Device Reg.</span>
              <span className="meta-item-val">MDR 2017/745</span>
              <span className="meta-item-desc">Class IIb Annex IX Chapter I System &amp; Class I Annexes II and III Declarations</span>
            </div>
            <div className="meta-item">
              <span className="meta-item-label">US FDA Status</span>
              <span className="meta-item-val">510(k) Cleared &amp; Reg.</span>
              <span className="meta-item-desc">FEI 3012804266 · Cleared SpO2 Sensors (DQA) &amp; NIBP Cuffs (DXQ)</span>
            </div>
            <div className="meta-item">
              <span className="meta-item-label">Global Access</span>
              <span className="meta-item-val">6+ Major Jurisdictions</span>
              <span className="meta-item-desc">Active approvals in EU, US, UK, Saudi Arabia, Russia &amp; China</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Anchor Navigation Bar */}
      <div className="cert-anchor-bar">
        <div className="container-site cert-anchor-inner">
          <nav className="cert-anchor-nav" aria-label="Section Navigation">
            <a
              href="#section-qms"
              className={`cert-anchor-link ${activeSection === 'section-qms' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'section-qms')}
            >
              QMS &amp; System
            </a>
            <a
              href="#section-doc"
              className={`cert-anchor-link ${activeSection === 'section-doc' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'section-doc')}
            >
              Market Clearances
            </a>
            <a
              href="#section-facility"
              className={`cert-anchor-link ${activeSection === 'section-facility' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'section-facility')}
            >
              Audited Facility
            </a>
            <a
              href="#section-cta"
              className={`cert-anchor-link cert-anchor-cta-link ${activeSection === 'section-cta' ? 'active' : ''}`}
              onClick={(e) => scrollToSection(e, 'section-cta')}
            >
              Request Copies
            </a>
          </nav>
        </div>
      </div>

      {/* =========================================================================
           Section A · Quality Management System & Notified Body Certifications
           ========================================================================= */}
      <section id="section-qms" className="section">
        <div className="container-site">
          <div className="section-head section-head-flex">
            <div>
              <span className="eyebrow">Category A · System Certifications</span>
              <h2 className="h-2">Quality Management System &amp; Notified Body Certificates</h2>
              <p className="lede">
                Full regulatory assessment and production audits conducted by TÜV SÜD Product Service GmbH (Notified Body 0123).
              </p>
            </div>
          </div>

          <div className="cert-grid-2">
            {/* Card A1: ISO 13485:2016 */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div className="cert-card-title-group">
                  <span className="cert-category-badge badge-primary">QMS Standard</span>
                  <h3 className="cert-title">ISO 13485:2016 Quality Management System</h3>
                  <div className="cert-authority-tag">
                    <ShieldCheck size={14} strokeWidth={2.5} />
                    Audited &amp; Issued by TÜV SÜD Product Service GmbH (Notified Body 0123)
                  </div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Valid &amp; Active</span>
              </div>

              {/* Spec Table */}
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Standard:</span>
                  <span className="cert-spec-v strong">EN ISO 13485:2016 / ISO 13485:2016</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Certificate No.:</span>
                  <span className="cert-spec-v mono strong">Q5 085432 0005 Rev. 05</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Validity Period:</span>
                  <span className="cert-spec-v mono">2026-01-17 ~ 2029-01-16</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Audited Facility:</span>
                  <span className="cert-spec-v">Shenzhen Medke Technology Co., Ltd. (Units 401, 503, Bldg A1, Anle Ind. Zone, 172 Hangcheng Rd, Bao'an, Shenzhen)</span>
                </div>
                <div className="cert-spec-row" style={{ alignItems: 'flex-start' }}>
                  <span className="cert-spec-k">Scope of Audit:</span>
                  <div className="cert-spec-v">
                    Design and development, production, and sales of SpO2 sensors and SpO2 extension cables, temperature probes, patient cables and leadwires, bipolar forceps cables, invasive blood pressure (IBP) cables.
                    <div className="cert-scope-box">
                      <strong>Audited Activities:</strong> Design control, risk management (ISO 14971), clean assembly, lot-based traceability, calibration, and customer complaint feedback loops.
                    </div>
                  </div>
                </div>
              </div>

              {/* Scan Placeholder */}
              <div className="cert-scan-placeholder">
                <FileText className="cert-scan-icon" size={28} strokeWidth={1.7} />
                <div><strong>TÜV SÜD Q5 Certificate Scan Placeholder</strong></div>
                <span className="cert-scan-tag">[ Official Verified PDF · Available Upon Request ]</span>
              </div>

              <div className="cert-card-footer">
                <span style={{ fontSize: 12, color: 'var(--meta)' }}>Audited under DAkkS accreditation</span>
                <button
                  className="btn-request-cert"
                  type="button"
                  onClick={() => handleRequestCert('ISO 13485:2016 Quality Management System Certificate (Q5 085432 0005 Rev. 05 - English / Chinese version)')}
                  title="Request official unredacted PDF copy of TÜV SÜD ISO 13485:2016 certificate"
                >
                  <Eye size={13} strokeWidth={2} />
                  Request Copy →
                </button>
              </div>
            </article>

            {/* Card A2: EU MDR Class IIb QMS Certificate */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div className="cert-card-title-group">
                  <span className="cert-category-badge badge-primary">EU CE Certification</span>
                  <h3 className="cert-title">EU MDR Class IIb Quality Management System</h3>
                  <div className="cert-authority-tag">
                    <ShieldCheck size={14} strokeWidth={2.5} />
                    TÜV SÜD Product Service GmbH (Notified Body 0123)
                  </div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Valid &amp; Active</span>
              </div>

              {/* Spec Table */}
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Legislation:</span>
                  <span className="cert-spec-v strong">Regulation (EU) 2017/745, Annex IX Chapter I</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Certificate No.:</span>
                  <span className="cert-spec-v mono strong">G15 085432 0008 Rev. 00</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Validity Period:</span>
                  <span className="cert-spec-v mono">2026-03-23 ~ 2031-03-22</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Manufacturer SRN:</span>
                  <span className="cert-spec-v mono strong">CN-MF-000019638</span>
                </div>
                <div className="cert-spec-row" style={{ alignItems: 'flex-start' }}>
                  <span className="cert-spec-k">Covered Groups:</span>
                  <div className="cert-spec-v">
                    <strong>Product Group C900301</strong>: Pulse oximeter probes and SpO2 sensor series (reusable &amp; disposable).<br />
                    <strong>Product Group V030102</strong>: Temperature monitoring probes (skin &amp; rectal/esophageal clinical series).
                    <div className="cert-scope-box">
                      <strong>Assessment Conformity:</strong> Complete technical documentation assessment, post-market surveillance (PMS), and clinical evaluation conformity under EU MDR.
                    </div>
                  </div>
                </div>
              </div>

              {/* Scan Placeholder */}
              <div className="cert-scan-placeholder">
                <FileText className="cert-scan-icon" size={28} strokeWidth={1.7} />
                <div><strong>TÜV SÜD G15 CE MDR Certificate Scan Placeholder</strong></div>
                <span className="cert-scan-tag">[ Official Verified PDF · Available Upon Request ]</span>
              </div>

              <div className="cert-card-footer">
                <span style={{ fontSize: 12, color: 'var(--meta)' }}>EU EUDAMED Registered Manufacturer</span>
                <button
                  className="btn-request-cert"
                  type="button"
                  onClick={() => handleRequestCert('EU MDR Class IIb CE Quality System Certificate (G15 085432 0008 Rev. 00)')}
                  title="Request official unredacted PDF copy of TÜV SÜD EU MDR Class IIb certificate"
                >
                  <Eye size={13} strokeWidth={2} />
                  Request Copy →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================================
           Section B · Product Declarations of Conformity & Global Market Clearances
           ========================================================================= */}
      <section id="section-doc" className="section-alt">
        <div className="container-site">
          <div className="section-head">
            <span className="eyebrow">Category B · Market Clearances</span>
            <h2 className="h-2">Declarations of Conformity &amp; International Market Registrations</h2>
            <p className="lede">
              Product-specific market authorizations, premarket notifications, and official health ministry approvals supporting customs clearance and distributor tenders.
            </p>
          </div>

          <div className="cert-grid-3">
            {/* B1: EU MDR Class I DoC */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div>
                  <span className="cert-category-badge badge-primary">EU CE Class I</span>
                  <h3 className="cert-title" style={{ fontSize: 16 }}>EU MDR Class I Declarations of Conformity</h3>
                  <div className="cert-authority-tag">Self-Declaration under Annexes II and III of the Regulation (EU) 2017/745</div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Active</span>
              </div>
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Route:</span>
                  <span className="cert-spec-v strong">Annexes II and III of the Regulation (EU) 2017/745</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Classification:</span>
                  <span className="cert-spec-v">Class I, Rule 1 (Chapter III of Annex VIII)</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Registered SRN:</span>
                  <span className="cert-spec-v mono">CN-MF-000019638</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">5 Covered Files:</span>
                  <span className="cert-spec-v mono" style={{ fontSize: '11.5px', lineHeight: 1.5 }}>
                    • SpO2 Ext. Cable: <strong>MDR-SSEC-P0-03 v1.0</strong> (2026-04-07)<br />
                    • NIBP Cuff Series: <strong>MDR-CUFF-CE-02 v1.0</strong><br />
                    • ECG Leadwires: <strong>MDR-ECG-CE-02 v2.0</strong><br />
                    • IBP Adapter Cable: <strong>MDR-IBP-CE-02 v1.0</strong><br />
                    • Temp Ext. Cable: <strong>MDR-TPEC-T0-02 v1.0</strong>
                  </span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">EU Rep:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>MedNet EC-REP GmbH (Borkstrasse 10, 48163 Münster, Germany)</span>
                </div>
              </div>
              <div className="cert-card-footer">
                <span style={{ fontSize: '11.5px', color: 'var(--meta)' }}>Complete Technical Files</span>
                <button className="btn-disabled-cert" type="button" disabled aria-disabled="true">
                  Official Filing [ On Request ]
                </button>
              </div>
            </article>

            {/* B2: US FDA 510(k) & Establishment */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div>
                  <span className="cert-category-badge badge-fda">United States</span>
                  <h3 className="cert-title" style={{ fontSize: 16 }}>US FDA Registration &amp; 510(k) Clearances</h3>
                  <div className="cert-authority-tag">US Food and Drug Administration (FDA)</div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Active</span>
              </div>
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">FEI Number:</span>
                  <span className="cert-spec-v mono strong">3012804266</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">510(k) Cleared #1:</span>
                  <span className="cert-spec-v mono">
                    <strong>K152390</strong> (Cleared: 2016-08-18)<br />
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>SpO2 Finger Clip Sensor (21 CFR 870.2700, Code DQA)</span>
                  </span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">510(k) Cleared #2:</span>
                  <span className="cert-spec-v mono">
                    <strong>K242623</strong> (Cleared: 2024-10-31)<br />
                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>NIBP Blood Pressure Cuff (21 CFR 870.1120, Code DXQ)</span>
                  </span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Audit Status:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>Active Annual Facility Listing (FY 2026); QSR 21 CFR Part 820 compliant.</span>
                </div>
              </div>
              <div className="cert-card-footer">
                <span style={{ fontSize: '11.5px', color: 'var(--meta)' }}>FDA Device Database Listed</span>
                <button className="btn-disabled-cert" type="button" disabled aria-disabled="true">
                  Official Filing [ On Request ]
                </button>
              </div>
            </article>

            {/* B3: UK MHRA Registration */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div>
                  <span className="cert-category-badge badge-neutral">United Kingdom</span>
                  <h3 className="cert-title" style={{ fontSize: 16 }}>UK MHRA Medical Device Registration</h3>
                  <div className="cert-authority-tag">Medicines and Healthcare products Regulatory Agency</div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Registered</span>
              </div>
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Account Ref:</span>
                  <span className="cert-spec-v mono strong">0000015617</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Legislation:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>UK Medical Devices Regulations 2002 (SI 2002 No 618)</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">3 Device Refs:</span>
                  <span className="cert-spec-v mono" style={{ fontSize: '11.5px', lineHeight: 1.5 }}>
                    • <strong>2022110701283617</strong> (ECG Leadwires)<br />
                    • <strong>2022111601285087</strong> (SpO2 Sensors &amp; Cuffs)<br />
                    • <strong>2021062401206748</strong> (ECG Electrode Clips)
                  </span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">UK Rep:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>MedNet UK Ltd. (Dudley Road, Birmingham)</span>
                </div>
              </div>
              <div className="cert-card-footer">
                <span style={{ fontSize: '11.5px', color: 'var(--meta)' }}>UK NHS Market Access</span>
                <button className="btn-disabled-cert" type="button" disabled aria-disabled="true">
                  Official Filing [ On Request ]
                </button>
              </div>
            </article>

            {/* B4: Saudi Arabia SFDA MDMA */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div>
                  <span className="cert-category-badge badge-success">Saudi Arabia / GCC</span>
                  <h3 className="cert-title" style={{ fontSize: 16 }}>Saudi Arabia SFDA Medical Device Approval</h3>
                  <div className="cert-authority-tag">Saudi Food and Drug Authority (SFDA)</div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Active</span>
              </div>
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">License Type:</span>
                  <span className="cert-spec-v strong">Medical Device Marketing Authorization (MDMA)</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">MDMA No.:</span>
                  <span className="cert-spec-v mono strong">MDMA-2-2026-1892</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Validity Period:</span>
                  <span className="cert-spec-v mono">2026-04-28 ~ 2029-04-28</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Scope:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>
                    Pulse oximeter probes and SpO2 sensor lines authorized for import, distribution, and hospital clinical use throughout the Kingdom of Saudi Arabia.
                  </span>
                </div>
              </div>
              <div className="cert-card-footer">
                <span style={{ fontSize: '11.5px', color: 'var(--meta)' }}>Saudi MDMA Clearance</span>
                <button className="btn-disabled-cert" type="button" disabled aria-disabled="true">
                  Official Filing [ On Request ]
                </button>
              </div>
            </article>

            {/* B5: Russia RZN Approval */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div>
                  <span className="cert-category-badge badge-neutral">EAEU / Russia</span>
                  <h3 className="cert-title" style={{ fontSize: 16 }}>Russian Roszdravnadzor (RZN) Registration</h3>
                  <div className="cert-authority-tag">Federal Service for Surveillance in Healthcare (RZN)</div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Active</span>
              </div>
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Type:</span>
                  <span className="cert-spec-v strong">National Medical Device Registration Certificate</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Registration:</span>
                  <span className="cert-spec-v mono">RZN Registered Dossier</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Covered Scope:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>
                    Reusable and disposable pulse oximetry sensors, patient connection cables, and adapters compatible with major Russian and international monitor brands.
                  </span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Compliance:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>GOST R electrical safety, biocompatibility, and clinical trial conformity verified.</span>
                </div>
              </div>
              <div className="cert-card-footer">
                <span style={{ fontSize: '11.5px', color: 'var(--meta)' }}>CIS &amp; Hospital Tenders</span>
                <button className="btn-disabled-cert" type="button" disabled aria-disabled="true">
                  Official Filing [ On Request ]
                </button>
              </div>
            </article>

            {/* B6: China NMPA */}
            <article className="cert-card-pro">
              <div className="cert-card-header">
                <div>
                  <span className="cert-category-badge badge-primary">China NMPA</span>
                  <h3 className="cert-title" style={{ fontSize: 16 }}>China NMPA License &amp; Registrations</h3>
                  <div className="cert-authority-tag">Guangdong Provincial Medical Products Administration</div>
                </div>
                <span className="cert-status-text"><span className="cert-status-dot"></span> Active</span>
              </div>
              <div className="cert-spec-list">
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Mfg. License:</span>
                  <span className="cert-spec-v mono strong">粤食药监械生产许20162775号</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Product Reg. #1:</span>
                  <span className="cert-spec-v mono">粤械注准20152071060</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Product Reg. #2:</span>
                  <span className="cert-spec-v mono">粤械注准20232070034</span>
                </div>
                <div className="cert-spec-row">
                  <span className="cert-spec-k">Scope:</span>
                  <span className="cert-spec-v" style={{ fontSize: 12 }}>
                    Manufacturing license and class II device approvals for biological sensor modules, patient monitoring cables, and diagnostic accessories.
                  </span>
                </div>
              </div>
              <div className="cert-card-footer">
                <span style={{ fontSize: '11.5px', color: 'var(--meta)' }}>Domestic &amp; Export Base</span>
                <button className="btn-disabled-cert" type="button" disabled aria-disabled="true">
                  Official Filing [ On Request ]
                </button>
              </div>
            </article>
          </div>

          {/* Verification guidance footnote */}
          <div className="verification-note-box">
            <Info size={20} strokeWidth={2} style={{ flexShrink: 0, color: 'var(--accent)', marginTop: 1 }} />
            <div>
              <strong>Regulatory Authenticity Verification:</strong>{' '}
              All certificates listed above are actively maintained by Shenzhen Medke Technology Co., Ltd. For tender verification or third-party audits, certificate validity may be confirmed directly on the official portals of TÜV SÜD (Certificate Explorer), the US FDA Establishment Registration database (FEI: 3012804266), the UK MHRA Public Access Database, or the Saudi SFDA MDMA register.
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           Section C · Manufacturing Facilities & Quality System Audits
           ========================================================================= */}
      <section id="section-facility" className="section">
        <div className="container-site">
          <div className="section-head">
            <span className="eyebrow">Category C · Audited Infrastructure</span>
            <h2 className="h-2">Manufacturing Facilities &amp; Quality Control Operations</h2>
            <p className="lede">
              Our certified manufacturing operations in Shenzhen, China are built and operated strictly in compliance with TÜV SÜD audited site boundaries and ISO 13485 cleanroom procedures.
            </p>
          </div>

          {/* Facility Overview Card */}
          <div className="facility-card">
            <div className="facility-grid">
              <div>
                <span className="eyebrow" style={{ color: 'var(--accent)' }}>Audited Manufacturing Site</span>
                <h3 className="h-3" style={{ fontSize: 22, marginTop: 4 }}>TÜV SÜD &amp; ISO 13485 Audited Facility</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 10, lineHeight: 1.65 }}>
                  Medke's production facility spans multiple specialized manufacturing floors dedicated to precision soldering, high-frequency shielding, biocompatible silicone/TPU overmolding, clean optical sensor assembly, and 100% finished electrical testing.
                </p>
                <ul className="facility-bullets">
                  <li>
                    <span className="bullet-check">✓</span>
                    <span><strong>Clean Optical Assembly Rooms:</strong> Controlled micro-environment for optical emitter and photodiode precision alignment on SpO2 sensors.</span>
                  </li>
                  <li>
                    <span className="bullet-check">✓</span>
                    <span><strong>100% Full-Batch Traceability:</strong> Device Master Records (DMR) and Device History Records (DHR) maintained with batch numbering on raw cables, raw connectors, and finished devices.</span>
                  </li>
                  <li>
                    <span className="bullet-check">✓</span>
                    <span><strong>In-House Rigorous Mechanical Testing:</strong> Cable flexing endurance (&gt;10,000 cycles), connector mating retention, tensile pull strength, and high-voltage insulation breakdown test bench.</span>
                  </li>
                </ul>
              </div>

              {/* Audited Site Scope Box */}
              <div className="audit-sites-box">
                <h4>Official Audit Premises (TÜV SÜD Q5 085432 0005)</h4>
                <p style={{ marginBottom: 12 }}>
                  <strong>Shenzhen Medke Technology Co., Ltd.</strong><br />
                  Units 401 &amp; 503, Building A1, Anle Industrial Zone,<br />
                  No. 172 Hangcheng Road, Xixiang Street, Bao'an District,<br />
                  Shenzhen 518102, Guangdong, P.R. China
                </p>
                <div style={{ fontSize: 12, color: 'var(--fg-2)', borderTop: '1px dashed #BAC3E8', paddingTop: 10 }}>
                  <strong>Audited Functions on Record:</strong><br />
                  Management responsibility, Design &amp; Engineering, Raw Material QC, Cleanroom Production, Final Inspection, Packaging, Clean Storage, and Global Logistics.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Medical Quality */}
          <div className="qa-grid-4">
            <div className="qa-box">
              <span className="qa-box-num">Pillar 01</span>
              <h4 className="qa-box-title">Raw Material Biocompatibility</h4>
              <p className="qa-box-desc">
                All patient-contact silicones, TPU jackets, and adhesives comply with medical-grade non-cytotoxic, non-irritant, and non-sensitizing requirements.
              </p>
            </div>
            <div className="qa-box">
              <span className="qa-box-num">Pillar 02</span>
              <h4 className="qa-box-title">100% Signal Integrity Verification</h4>
              <p className="qa-box-desc">
                Each finished SpO2 and ECG cable undergoes automated continuity, pinout resistance, insulation resistance, and simulated patient monitor signal verification.
              </p>
            </div>
            <div className="qa-box">
              <span className="qa-box-num">Pillar 03</span>
              <h4 className="qa-box-title">TÜV SÜD Annual Surveillance</h4>
              <p className="qa-box-desc">
                Subjected to rigorous annual on-site surveillance audits and periodic unannounced inspections by TÜV SÜD Munich to guarantee ongoing standard conformance.
              </p>
            </div>
            <div className="qa-box">
              <span className="qa-box-num">Pillar 04</span>
              <h4 className="qa-box-title">Clinical Compatibility Testing</h4>
              <p className="qa-box-desc">
                Tested for seamless mechanical plug-and-play fit and optical wavelength parity against leading OEM patient monitors (Philips, Mindray, GE, Dräger, Masimo, Nellcor).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
           Section CTA · Request Certificate Copies & Compliance Dossier
           ========================================================================= */}
      <section id="section-cta" className="cta-request-section">
        <div className="container-site">
          <div className="cta-layout">
            {/* Left: Value Proposition */}
            <div className="cta-intro">
              <span className="eyebrow">Distributor &amp; Hospital Tender Support</span>
              <h2>Request Official Certificate Copies &amp; Compliance Dossier</h2>
              <p>
                Are you preparing a national hospital tender submission, distributor registration dossier, or customs clearance package?
              </p>
              <p>
                Submit your business requirements below to receive unredacted, high-resolution official PDF certificate copies, DoC declarations, and technical dossiers verified by our regulatory affairs department.
              </p>

              <ul className="trust-guarantee-list">
                <li>
                  <Check size={18} strokeWidth={2.5} color="#68D391" />
                  <span>Verified response within 1 business day (Hong Kong/Shenzhen UTC+8)</span>
                </li>
                <li>
                  <Check size={18} strokeWidth={2.5} color="#68D391" />
                  <span>Non-Disclosure Agreements (NDA) available upon request</span>
                </li>
                <li>
                  <Check size={18} strokeWidth={2.5} color="#68D391" />
                  <span>Direct communication with Medke senior regulatory affairs team</span>
                </li>
              </ul>

              <div className="trust-badge-pill">
                <Lock size={16} strokeWidth={2} />
                <span>Strict B2B confidentiality guaranteed</span>
              </div>
            </div>

            {/* Right: 7-Field Compliance Request Form */}
            <div className="cta-form-card">
              <h3>Request Certificate Dossier</h3>
              <p className="form-sub">Please fill in your company information to receive the certified documents.</p>

              {requestedCert && (
                <div style={{ marginBottom: 18, padding: '10px 14px', background: 'var(--accent-soft)', border: '1px solid #D2D8F0', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--accent)' }}>
                  <strong>Selected Certificate:</strong> {requestedCert}
                </div>
              )}

              <form onSubmit={onSubmit} noValidate>
                <div className="form-grid-2">
                  {/* 1. Name */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="req-name">Full Name<span className="req">*</span></label>
                    <input
                      className="field-input"
                      type="text"
                      id="req-name"
                      placeholder="e.g. Dr. Alexander Weber"
                      value={values.name}
                      onChange={set('name')}
                      required
                    />
                    {errors.name && <span style={{ color: 'var(--danger)', fontSize: 12 }}>{errors.name}</span>}
                  </div>

                  {/* 2. Company */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="req-company">Company Name<span className="req">*</span></label>
                    <input
                      className="field-input"
                      type="text"
                      id="req-company"
                      placeholder="e.g. MedTech Supplies GmbH"
                      value={values.company}
                      onChange={set('company')}
                      required
                    />
                    {errors.company && <span style={{ color: 'var(--danger)', fontSize: 12 }}>{errors.company}</span>}
                  </div>

                  {/* 3. Country */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="req-country">Country / Region<span className="req">*</span></label>
                    <input
                      className="field-input"
                      type="text"
                      id="req-country"
                      placeholder="e.g. Germany / United Kingdom"
                      value={values.country}
                      onChange={set('country')}
                      required
                    />
                    {errors.country && <span style={{ color: 'var(--danger)', fontSize: 12 }}>{errors.country}</span>}
                  </div>

                  {/* 4. Email */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="req-email">Business Email<span className="req">*</span></label>
                    <input
                      className="field-input"
                      type="email"
                      id="req-email"
                      placeholder="name@company.com"
                      value={values.email}
                      onChange={set('email')}
                      required
                    />
                    {errors.email && <span style={{ color: 'var(--danger)', fontSize: 12 }}>{errors.email}</span>}
                  </div>

                  {/* 5. Phone */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="req-phone">Phone / WhatsApp</label>
                    <input
                      className="field-input"
                      type="tel"
                      id="req-phone"
                      placeholder="e.g. +49 170 1234567"
                      value={values.phone}
                      onChange={set('phone')}
                    />
                  </div>

                  {/* 6. Quantity / Target Products */}
                  <div className="form-group">
                    <label className="field-label" htmlFor="req-qty">Est. Annual Quantity / Target Line</label>
                    <input
                      className="field-input"
                      type="text"
                      id="req-qty"
                      placeholder="e.g. 5,000 pcs SpO2 sensors / ECG cables"
                      value={values.quantity}
                      onChange={set('quantity')}
                    />
                  </div>

                  {/* 7. Message */}
                  <div className="form-group full">
                    <label className="field-label" htmlFor="req-msg">Specific Certificates or Dossiers Requested<span className="req">*</span></label>
                    <textarea
                      className="field-textarea"
                      id="req-msg"
                      placeholder="Please specify which certificate copies (e.g. TÜV ISO 13485, MDR Class IIb, FDA 510(k), or DoC) or technical dossier files you require for your tender or registration..."
                      value={values.message}
                      onChange={set('message')}
                      required
                    ></textarea>
                    {errors.message && <span style={{ color: 'var(--danger)', fontSize: 12 }}>{errors.message}</span>}
                  </div>
                </div>

                {/* Submit Row */}
                <div className="form-submit-row">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={status === 'submitting'}
                    style={{ width: '100%', minHeight: 48, fontSize: 16 }}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={18} className="spin" />
                        Submitting request...
                      </>
                    ) : (
                      'Request Official Certificate Pack →'
                    )}
                  </button>
                  {status === 'error' && (
                    <p style={{ color: 'var(--danger)', fontSize: 13, marginTop: 8, textAlign: 'center' }}>
                      Failed to submit inquiry. Please email us directly at contact@medke.com.
                    </p>
                  )}
                </div>

                <p className="form-privacy-note">
                  We respect your business privacy. Your contact information is used exclusively to fulfill your compliance documentation request according to our{' '}
                  <Link to="/privacy-policy" style={{ textDecoration: 'underline', color: 'var(--cta)' }}>
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
