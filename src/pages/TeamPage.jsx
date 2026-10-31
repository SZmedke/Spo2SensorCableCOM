import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeamPage.css';

export default function TeamPage() {
  const [lightboxData, setLightboxData] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  const openLightbox = (data) => {
    setLightboxData(data);
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 4000);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Scroll reveal with IntersectionObserver
    const revealElements = document.querySelectorAll('.team-page .reveal-on-scroll');
    let revealObserver;

    if ('IntersectionObserver' in window) {
      revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach((el) => {
        revealObserver.observe(el);
      });
    } else {
      revealElements.forEach((el) => {
        el.classList.add('revealed');
      });
    }

    // 2. Keyboard ESC listener for Lightbox
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (revealObserver) {
        revealObserver.disconnect();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock background scroll when Lightbox is active
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (lightboxData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxData]);

  return (
    <div className="team-page">
      <main>

    {/* ===================================================================
         SECTION 1: HERO - Pillars of Precision (58:42 Asymmetric Split)
         =================================================================== */}
    <section className="practice-hero reveal-on-scroll" id="overview">
      <div className="container">
        <div className="practice-hero-grid">
          {/* Left 58%: Manifesto & CTAs */}
          <div>
            <div className="hero-manifesto-badge">
              <span>● 108-PERSON MEDICAL CABLE &amp; SENSOR MANUFACTURING TEAM</span>
            </div>

            <h1 className="hero-title">
              The Tooling Engineers, Assembly Craftsmen &amp; QC Specialists Behind<br />
              <span className="hero-text-gradient">Every Medke Cable.</span>
            </h1>

            <p className="hero-subtitle">
              From custom mold tooling and medical TPU extrusion to 100,000-class cleanroom soldering and 100% electrical testing. Meet our 108 in-house engineers, technicians, and QA specialists producing reliable patient monitoring accessories in Shenzhen since 2008.
            </p>

            <div className="hero-cta-group">
              <Link to="/contact" className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                <span>Talk to Our Engineering Team</span>
              </Link>
              <a href="#team-matrix" className="btn btn-secondary-light">
                <span>Explore Team Architecture</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
            </div>
          </div>

          {/* Right 42%: Global Operations Terminal */}
          <div>
            <div className="terminal-board">
              <div className="terminal-header">
                <span className="terminal-status-light">Shenzhen HQ Engineering Center: ACTIVE</span>
                <span style={{ fontSize: 12, color: 'var(--text-inverse-muted)' }}>UTC+8</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-key">DFM Feasibility Response</span>
                <span className="terminal-val">&lt; 24h Review</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-key">Cleanroom Standard</span>
                <span className="terminal-val">Class 100,000 (ISO 8)</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-key">Proprietary Mold Tooling Vault</span>
                <span className="terminal-val">2,000+ Active Sets</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-key">Multilingual Technical Desks</span>
                <span className="terminal-val">EN · DE · ES · AR · CN</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-key">Traceability Records Preserved</span>
                <span className="terminal-val">100% Batch Lot Trail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ===================================================================
         SECTION 2: 3-TIER TEAM ARCHITECTURE
         With Click-to-Zoom Lightbox Interaction & Lu Hui Update
         =================================================================== */}
    <section className="team-architecture-section reveal-on-scroll" id="team-matrix">
      <div className="container">

        {/* ==================== TIER 1 ==================== */}
        <div className="tier-separator-bar">
          <span className="tier-num-pill">Tier 01</span>
          <h2 className="tier-main-heading">Executive Leadership &amp; Governance</h2>
          <span className="tier-sub-caption">Click portraits to inspect high-resolution dossier</span>
        </div>

        <div className="executive-portrait-grid">
          {/* 1. Li Zhenzong */}
          <div className="executive-card">
            <div className="executive-image-frame zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Li Zhenzong', role: 'Founder (Born 1954 in Hong Kong)', src: '/assets/images/team/09_Li-Zhenzong_Founder.jpg', initials: null, quote: 'In medical electronics, 0.1% tolerance is not an acceptable deviation—it is a patient\'s life.', credentials: 'Founder · Total Biocompatibility Creed Since 2008' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Li Zhenzong', role: 'Founder (Born 1954 in Hong Kong)', src: '/assets/images/team/09_Li-Zhenzong_Founder.jpg', initials: null, quote: 'In medical electronics, 0.1% tolerance is not an acceptable deviation—it is a patient\'s life.', credentials: 'Founder · Total Biocompatibility Creed Since 2008' }); } }}>
              <img src="/assets/images/team/09_Li-Zhenzong_Founder.jpg" alt="Li Zhenzong - Founder" className="executive-img" loading="lazy" decoding="async" />
              <div className="zoom-hint-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Enlarge</span>
              </div>
            </div>
            <div className="executive-meta-block">
              <div>
                <h3 className="executive-name">Li Zhenzong</h3>
                <div className="executive-title">Founder (Born 1954 in Hong Kong)</div>
                <div className="executive-quote">
                  "In medical electronics, 0.1% tolerance is not an acceptable deviation—it is a patient's life."
                </div>
              </div>
              <p className="executive-bio">
                Philanthropist and industrial pioneer. Founded Medke in 2008 in the wake of the Wenchuan earthquake humanitarian response, establishing the enterprise's non-negotiable creed of total biocompatibility and life-critical signal continuity.
              </p>
            </div>
          </div>

          {/* 2. Li Weitao */}
          <div className="executive-card">
            <div className="executive-image-frame zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Li Weitao', role: 'Chairman &amp; CEO (2nd Generation Industrialist)', src: '/assets/images/team/08_Li-Weitao_Chairman-and-CEO.jpg', initials: null, quote: 'Agile manufacturing means responding with certified engineering dossiers before competitors finish quoting.', credentials: 'Chairman &amp; CEO · TÜV SÜD CE MDR Class IIb &amp; FDA 510(k) Lead' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Li Weitao', role: 'Chairman &amp; CEO (2nd Generation Industrialist)', src: '/assets/images/team/08_Li-Weitao_Chairman-and-CEO.jpg', initials: null, quote: 'Agile manufacturing means responding with certified engineering dossiers before competitors finish quoting.', credentials: 'Chairman &amp; CEO · TÜV SÜD CE MDR Class IIb &amp; FDA 510(k) Lead' }); } }}>
              <img src="/assets/images/team/08_Li-Weitao_Chairman-and-CEO.jpg" alt="Li Weitao - Chairman and CEO" className="executive-img" loading="lazy" decoding="async" />
              <div className="zoom-hint-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Enlarge</span>
              </div>
              {/* Floating Social Dock */}
              <div className="floating-social-dock" onClick={(e) => e.stopPropagation()}>
                <a href="https://www.linkedin.com/in/willyformedke/" target="_blank" rel="noopener noreferrer" className="social-dock-btn linkedin" title="Connect on LinkedIn" aria-label="Li Weitao LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://wa.me/8615302654212" target="_blank" rel="noopener noreferrer" className="social-dock-btn whatsapp" title="Chat on WhatsApp" aria-label="Li Weitao WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.178 1.564 5.923l-1.664 6.077 6.241-1.637c1.7 1.01 3.684 1.597 5.859 1.597 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <div className="executive-meta-block">
              <div>
                <h3 className="executive-name">Li Weitao</h3>
                <div className="executive-title">Chairman &amp; CEO (2nd Generation Industrialist)</div>
                <div className="executive-quote">
                  "Agile manufacturing means responding with certified engineering dossiers before competitors finish quoting."
                </div>
              </div>
              <p className="executive-bio">
                Forward-looking 90s-born industrialist. Spearheaded the construction of the 4,000㎡ smart facility, navigated European TÜV SÜD CE MDR Class IIb transition, and expanded US FDA 510(k) clearances.
              </p>
            </div>
          </div>

          {/* 3. Xian Zuyin */}
          <div className="executive-card">
            <div className="executive-image-frame zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Xian Zuyin', role: 'General Manager (Operations &amp; Regulatory)', src: '/assets/images/team/03_Xian-Zuyin_General-Manager.jpg', initials: null, quote: 'Regulatory adherence is not documentation—it is the engineering foundation of clinical trust.', credentials: 'General Manager · Official European MDR Legal Signatory' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Xian Zuyin', role: 'General Manager (Operations &amp; Regulatory)', src: '/assets/images/team/03_Xian-Zuyin_General-Manager.jpg', initials: null, quote: 'Regulatory adherence is not documentation—it is the engineering foundation of clinical trust.', credentials: 'General Manager · Official European MDR Legal Signatory' }); } }}>
              <img src="/assets/images/team/03_Xian-Zuyin_General-Manager.jpg" alt="Xian Zuyin - General Manager" className="executive-img" loading="lazy" decoding="async" />
              <div className="zoom-hint-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Enlarge</span>
              </div>
            </div>
            <div className="executive-meta-block">
              <div>
                <h3 className="executive-name">Xian Zuyin</h3>
                <div className="executive-title">General Manager (Operations &amp; Regulatory)</div>
                <div className="executive-quote">
                  "Regulatory adherence is not documentation—it is the engineering foundation of clinical trust."
                </div>
              </div>
              <p className="executive-bio">
                20+ years medical consumable manufacturing expert. Serves as official legal signatory for European MDR submissions and oversees rigorous ISO 13485 quality system enforcement across all cleanrooms.
              </p>
            </div>
          </div>
        </div>

        {/* ==================== TIER 2 ==================== */}
        <div className="tier-separator-bar">
          <span className="tier-num-pill">Tier 02</span>
          <h2 className="tier-main-heading">Engineering, Quality &amp; Operations Backbone</h2>
          <span className="tier-sub-caption">Technical Pillar Dossiers · Lab Hardware Verification</span>
        </div>

        <div className="dossier-grid">
          {/* 4. Wu Fengguang */}
          <div className="dossier-card">
            <div className="dossier-top">
              <div className="dossier-photo-wrap zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Wu Fengguang', role: 'R&amp;D Manager', src: '/assets/images/team/02_Wu-Fengguang_R-and-D-Manager.jpg', initials: null, quote: 'Every monitor pinout has an exact geometric solution in our 2,000+ mold vault.', credentials: '2,000+ Molds · 98% Pinout Coverage · 24h DFM' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Wu Fengguang', role: 'R&amp;D Manager', src: '/assets/images/team/02_Wu-Fengguang_R-and-D-Manager.jpg', initials: null, quote: 'Every monitor pinout has an exact geometric solution in our 2,000+ mold vault.', credentials: '2,000+ Molds · 98% Pinout Coverage · 24h DFM' }); } }}>
                <img src="/assets/images/team/02_Wu-Fengguang_R-and-D-Manager.jpg" alt="Wu Fengguang" className="dossier-photo" loading="lazy" decoding="async" />
                <div className="zoom-hint-badge" style={{ padding: '2px 5px', fontSize: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div>
                <h3 className="dossier-name">Wu Fengguang</h3>
                <div className="dossier-role">R&amp;D Manager</div>
              </div>
            </div>
            <p className="dossier-desc">
              Directs the 2,000+ proprietary mold library and 3D CAD modeling team. Delivers guaranteed 24-hour DFM feasibility feedback for custom OEM monitor pinouts worldwide.
            </p>
            <div className="dossier-test-badge">
              <span>● 2,000+ Molds · 98% Pinout Coverage</span>
            </div>
          </div>

          {/* 5. Lu Hui - Management Representative */}
          <div className="dossier-card">
            <div className="dossier-top">
              <div className="dossier-photo-wrap zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Lu Hui', role: 'Management Representative (ISO 13485 &amp; MDR)', src: null, initials: 'LH', quote: 'Zero deviation in compliance protocols ensures uncompromised patient safety and global audit clearance.', credentials: 'ISO 13485:2016 &amp; CE MDR Class IIb QMS Authority' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Lu Hui', role: 'Management Representative (ISO 13485 &amp; MDR)', src: null, initials: 'LH', quote: 'Zero deviation in compliance protocols ensures uncompromised patient safety and global audit clearance.', credentials: 'ISO 13485:2016 &amp; CE MDR Class IIb QMS Authority' }); } }}>
                <div className="dossier-initials-box">LH</div>
                <div className="zoom-hint-badge" style={{ padding: '2px 5px', fontSize: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div>
                <h3 className="dossier-name">Lu Hui</h3>
                <div className="dossier-role">Management Representative</div>
              </div>
            </div>
            <p className="dossier-desc">
              Designated ISO 13485:2016 Management Representative. Holds full operational authority for notified body audit surveillance (TÜV SÜD) and ISO 14971 medical risk management.
            </p>
            <div className="dossier-test-badge">
              <span>● ISO 13485 &amp; MDR QMS Authority</span>
            </div>
          </div>

          {/* 6. Zhou Yuanbin */}
          <div className="dossier-card">
            <div className="dossier-top">
              <div className="dossier-photo-wrap zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Zhou Yuanbin', role: 'Quality Control Manager', src: '/assets/images/team/04_Zhou-Yuanbin_Quality-Control-Manager.jpg', initials: null, quote: 'A single defective wire never leaves our inspection stations.', credentials: '20,000 Cycles Flex · 50N Tensile · 1,500V Hi-Pot Testing' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Zhou Yuanbin', role: 'Quality Control Manager', src: '/assets/images/team/04_Zhou-Yuanbin_Quality-Control-Manager.jpg', initials: null, quote: 'A single defective wire never leaves our inspection stations.', credentials: '20,000 Cycles Flex · 50N Tensile · 1,500V Hi-Pot Testing' }); } }}>
                <img src="/assets/images/team/04_Zhou-Yuanbin_Quality-Control-Manager.jpg" alt="Zhou Yuanbin" className="dossier-photo" loading="lazy" decoding="async" />
                <div className="zoom-hint-badge" style={{ padding: '2px 5px', fontSize: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div>
                <h3 className="dossier-name">Zhou Yuanbin</h3>
                <div className="dossier-role">Quality Control Manager</div>
              </div>
            </div>
            <p className="dossier-desc">
              Chief testing lab officer overseeing mechanical endurance, biocompatibility skin-contact verification, and high-voltage dielectric safety audits across all outgoing batches.
            </p>
            <div className="dossier-test-badge" style={{ color: 'var(--medke-blue)', background: 'var(--medke-blue-soft)', borderColor: 'var(--medke-blue-border)' }}>
              <span>● 20,000 Cycles · 50N Tensile · 1,500V Hi-Pot</span>
            </div>
          </div>

          {/* 7. Huang Yuanbin */}
          <div className="dossier-card">
            <div className="dossier-top">
              <div className="dossier-photo-wrap zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Huang Yuanbin', role: 'Factory Supervisor', src: '/assets/images/team/07_Huang-Yuanbin_Factory-Supervisor.jpg', initials: null, quote: 'Disciplined 5S cleanrooms ensure consistent clinical cable reliability.', credentials: '4,000㎡ Campus · ISO Class 7 Cleanroom · Dual Continuous Shifts' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Huang Yuanbin', role: 'Factory Supervisor', src: '/assets/images/team/07_Huang-Yuanbin_Factory-Supervisor.jpg', initials: null, quote: 'Disciplined 5S cleanrooms ensure consistent clinical cable reliability.', credentials: '4,000㎡ Campus · ISO Class 7 Cleanroom · Dual Continuous Shifts' }); } }}>
                <img src="/assets/images/team/07_Huang-Yuanbin_Factory-Supervisor.jpg" alt="Huang Yuanbin" className="dossier-photo" loading="lazy" decoding="async" />
                <div className="zoom-hint-badge" style={{ padding: '2px 5px', fontSize: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div>
                <h3 className="dossier-name">Huang Yuanbin</h3>
                <div className="dossier-role">Factory Supervisor</div>
              </div>
            </div>
            <p className="dossier-desc">
              Directs production operations across the 4,000㎡ campus, managing shift rotations, HEPA-filtered cleanroom maintenance, and zero-defect 5S shop floor disciplines.
            </p>
            <div className="dossier-test-badge">
              <span>● 4,000㎡ Operations · ISO Class 7 5S</span>
            </div>
          </div>

          {/* 8. Gong Shuangyu */}
          <div className="dossier-card">
            <div className="dossier-top">
              <div className="dossier-photo-wrap zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Gong Shuangyu', role: 'Supply Chain Manager', src: '/assets/images/team/06_Gong-Shuangyu_Supply-Chain-Manager.jpg', initials: null, quote: 'Upstream material purity dictates downstream patient safety.', credentials: 'Medical TPU Resins · Kevlar Yarns · RoHS &amp; REACH Compliance' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Gong Shuangyu', role: 'Supply Chain Manager', src: '/assets/images/team/06_Gong-Shuangyu_Supply-Chain-Manager.jpg', initials: null, quote: 'Upstream material purity dictates downstream patient safety.', credentials: 'Medical TPU Resins · Kevlar Yarns · RoHS &amp; REACH Compliance' }); } }}>
                <img src="/assets/images/team/06_Gong-Shuangyu_Supply-Chain-Manager.jpg" alt="Gong Shuangyu" className="dossier-photo" loading="lazy" decoding="async" />
                <div className="zoom-hint-badge" style={{ padding: '2px 5px', fontSize: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div>
                <h3 className="dossier-name">Gong Shuangyu</h3>
                <div className="dossier-role">Supply Chain Manager</div>
              </div>
            </div>
            <p className="dossier-desc">
              Controls upstream medical TPU, medical-grade silicone, Kevlar tensile reinforcement yarns, and optical chip sourcing, enforcing strict RoHS and REACH compliance.
            </p>
            <div className="dossier-test-badge">
              <span>● Medical TPU / Kevlar Redundant Supply</span>
            </div>
          </div>

          {/* 9. Lu Wen */}
          <div className="dossier-card">
            <div className="dossier-top">
              <div className="dossier-photo-wrap zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Lu Wen', role: 'Finance Manager', src: '/assets/images/team/10_Lu-Wen_Finance-Manager.jpg', initials: null, quote: 'Solid financial backing guarantees smooth international supply contracts.', credentials: '¥10M Paid-In Capital · International L/C &amp; Trade Settlement' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Lu Wen', role: 'Finance Manager', src: '/assets/images/team/10_Lu-Wen_Finance-Manager.jpg', initials: null, quote: 'Solid financial backing guarantees smooth international supply contracts.', credentials: '¥10M Paid-In Capital · International L/C &amp; Trade Settlement' }); } }}>
                <img src="/assets/images/team/10_Lu-Wen_Finance-Manager.jpg" alt="Lu Wen" className="dossier-photo" loading="lazy" decoding="async" />
                <div className="zoom-hint-badge" style={{ padding: '2px 5px', fontSize: 10 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
              </div>
              <div>
                <h3 className="dossier-name">Lu Wen</h3>
                <div className="dossier-role">Finance Manager</div>
              </div>
            </div>
            <p className="dossier-desc">
              Oversees financial internal governance for Medke's ¥10,000,000 paid-in capital, managing international letter of credit (L/C) settlements and international customs accounting.
            </p>
            <div className="dossier-test-badge">
              <span>● ¥10M Paid-In Capital · L/C Settlement</span>
            </div>
          </div>
        </div>

        {/* ==================== TIER 3 ==================== */}
        <div className="tier-separator-bar">
          <span className="tier-num-pill">Tier 03</span>
          <h2 className="tier-main-heading">Global Market &amp; Customer Success Network</h2>
          <span className="tier-sub-caption">Multilingual Desks · Golden Triad Client Care</span>
        </div>

        <div className="global-sales-grid">
          {/* 10. Nancy Liu */}
          <div className="sales-leader-card">
            <div className="sales-photo-frame zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Nancy (Guiting) Liu', role: 'Sales Director', src: '/assets/images/team/01_Nancy_Liu-Guiting_Sales-Director.jpg', initials: null, quote: 'We provide clinical engineering departments with direct factory backing and zero communication friction.', credentials: '12 Years Clinical Sensor Experience · 500+ Hospital Projects Advised' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Nancy (Guiting) Liu', role: 'Sales Director', src: '/assets/images/team/01_Nancy_Liu-Guiting_Sales-Director.jpg', initials: null, quote: 'We provide clinical engineering departments with direct factory backing and zero communication friction.', credentials: '12 Years Clinical Sensor Experience · 500+ Hospital Projects Advised' }); } }}>
              <img src="/assets/images/team/01_Nancy_Liu-Guiting_Sales-Director.jpg" alt="Nancy (Guiting) Liu" loading="lazy" decoding="async" />
              <div className="zoom-hint-badge" style={{ padding: '2px 6px', fontSize: 10 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span>Enlarge</span>
              </div>
            </div>
            <div className="sales-content">
              <div>
                <h3 className="sales-name">Nancy (Guiting) Liu</h3>
                <div className="sales-role-tag">Sales Director</div>
                <p className="sales-bio-text">
                  12 years of clinical sensor architecture experience. Has advised over 500 hospital biomedical engineering teams and specialized medical distributors in configuring custom OEM accessory lines.
                </p>
              </div>
              <div className="sales-social-row">
                <a href="https://www.linkedin.com/in/nancy-lau-25a02a68/" target="_blank" rel="noopener noreferrer" className="chip-btn linkedin" aria-label="Nancy Liu LinkedIn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://wa.me/8615302654212" target="_blank" rel="noopener noreferrer" className="chip-btn whatsapp" aria-label="Nancy Liu WhatsApp">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.178 1.564 5.923l-1.664 6.077 6.241-1.637c1.7 1.01 3.684 1.597 5.859 1.597 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* 11. Amy Yi Si */}
          <div className="sales-leader-card">
            <div className="sales-photo-frame zoomable-frame" role="button" tabIndex={0} onClick={() => openLightbox({ name: 'Amy (Yi Si)', role: 'Sales Operations Specialist', src: '/assets/images/team/05_Amy_Yi-Si_Sales-Assistant.jpg', initials: null, quote: 'Ensuring expedited samples and urgent tender orders clear international customs without delay.', credentials: '&lt; 24h Sample Logistics · Air Courier Documentation Expedited' })} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openLightbox({ name: 'Amy (Yi Si)', role: 'Sales Operations Specialist', src: '/assets/images/team/05_Amy_Yi-Si_Sales-Assistant.jpg', initials: null, quote: 'Ensuring expedited samples and urgent tender orders clear international customs without delay.', credentials: '&lt; 24h Sample Logistics · Air Courier Documentation Expedited' }); } }}>
              <img src="/assets/images/team/05_Amy_Yi-Si_Sales-Assistant.jpg" alt="Amy (Yi Si)" loading="lazy" decoding="async" />
              <div className="zoom-hint-badge" style={{ padding: '2px 6px', fontSize: 10 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span>Enlarge</span>
              </div>
            </div>
            <div className="sales-content">
              <div>
                <h3 className="sales-name">Amy (Yi Si)</h3>
                <div className="sales-role-tag">Sales Operations Specialist</div>
                <p className="sales-bio-text">
                  Manages expedited sample logistics, express air courier customs documentation, and order fulfillment milestone tracking to ensure urgent hospital orders arrive on schedule.
                </p>
              </div>
              <div className="sales-social-row">
                <span style={{ fontSize: 12, color: 'var(--accent-green)', fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'var(--accent-green-soft)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid #BBF7D0' }}>
                  ● &lt; 24h Clinical Sample Dispatch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Golden Triad System (Flat Navy & Four-Sided Borders) */}
        <div className="golden-triad-banner">
          <div className="triad-header-row">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5"><polygon points="12 2 22 20 2 20"/></svg>
            <h3 className="triad-title">The Medke "Golden Triad" Account Service Architecture</h3>
          </div>
          <p className="triad-intro">
            Every client account is assigned three dedicated specialists working in direct synergy:
          </p>
          <div className="triad-cols">
            <div className="triad-col-card">
              <h4 className="triad-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span>Technical Consultant</span>
              </h4>
              <p className="triad-body">Evaluates pinouts, conducts DFM feasibility, and verifies CAD geometry tolerances before mold cutting.</p>
            </div>
            <div className="triad-col-card">
              <h4 className="triad-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                <span>Supply Chain Specialist</span>
              </h4>
              <p className="triad-body">Schedules cleanroom batch runs, reserves raw medical TPU resins, and coordinates express air customs clearance.</p>
            </div>
            <div className="triad-col-card">
              <h4 className="triad-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>Account Manager</span>
              </h4>
              <p className="triad-body">Guarantees time-zone aligned communication, updates order milestones, and issues complete regulatory dossiers.</p>
            </div>
          </div>
        </div>

        {/* 5 Regional Desks */}
        <div className="regional-strip">
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--medke-navy)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>5 Specialized Regional Service Desks:</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-200)', flexWrap: 'wrap' }}>
            <div className="region-tag">
              <span>North America</span>
              <span className="region-code">EN</span>
            </div>
            <div className="region-tag">
              <span>Europe &amp; UK</span>
              <span className="region-code">EN / DE</span>
            </div>
            <div className="region-tag">
              <span>Latin America</span>
              <span className="region-code">ES</span>
            </div>
            <div className="region-tag">
              <span>Middle East &amp; Africa</span>
              <span className="region-code">AR / EN</span>
            </div>
            <div className="region-tag">
              <span>Asia-Pacific</span>
              <span className="region-code">EN / CN</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ===================================================================
         SECTION 3: IN-ACTION DOCUMENTARY STRIP
         =================================================================== */}
    <section className="documentary-section reveal-on-scroll" id="in-action">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <span className="section-eyebrow">Frontline Rigor</span>
          <h2 className="section-title">Our Specialists in Action</h2>
          <p className="section-subtitle">
            A documentary look into our HEPA-filtered cleanrooms, precision assembly benches, and reliability test cells.
          </p>
        </div>

        <div className="documentary-grid">
          {/* 1 */}
          <div className="doc-tile">
            <div className="doc-img-wrap">
              <img src="/assets/images/about/cleanroom-real-clean.jpg" alt="Cleanroom Soldering" loading="lazy" decoding="async" />
            </div>
            <div className="doc-meta">
              <div className="doc-label">Cleanroom Workstation</div>
              <h3 className="doc-title">Microscope Soldering</h3>
              <p className="doc-desc">Ultra-precise wire bonding under stereo microscopes in ISO Class 7 cleanrooms.</p>
            </div>
          </div>

          {/* 2 */}
          <div className="doc-tile">
            <div className="doc-img-wrap">
              <img src="/assets/images/about/lab-testing-real-web.jpg" alt="Electrical Safety Test" loading="lazy" decoding="async" />
            </div>
            <div className="doc-meta">
              <div className="doc-label">Reliability Lab</div>
              <h3 className="doc-title">Flex &amp; Dielectric Testing</h3>
              <p className="doc-desc">Rigorous 20,000-cycle cable flex endurance and 1,500V dielectric audits.</p>
            </div>
          </div>

          {/* 3 */}
          <div className="doc-tile">
            <div className="doc-img-wrap">
              <img src="/assets/images/about/factory-01.jpg" alt="Cable Extrusion" loading="lazy" decoding="async" />
            </div>
            <div className="doc-meta">
              <div className="doc-label">Extrusion Line</div>
              <h3 className="doc-title">Medical TPU Processing</h3>
              <p className="doc-desc">Calibrating extrusion dies for seamless outer diameter consistency.</p>
            </div>
          </div>

          {/* 4 */}
          <div className="doc-tile">
            <div className="doc-img-wrap">
              <img src="/assets/images/about/about-team-3.jpg" alt="Hospital Client Reception" loading="lazy" decoding="async" />
            </div>
            <div className="doc-meta">
              <div className="doc-label">Technical Consultation</div>
              <h3 className="doc-title">Global Client Delegations</h3>
              <p className="doc-desc">Welcoming European and North American hospital biomedical groups for audit walk-throughs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ===================================================================
         SECTION 4: QUANTIFIED SLA COMMITMENTS (Four-Sided Borders Only)
         =================================================================== */}
    <section className="sla-section reveal-on-scroll" id="service-sla">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <span className="section-eyebrow">Guaranteed Response Standards</span>
          <h2 className="section-title">Measurable Engineering &amp; Service SLAs</h2>
          <p className="section-subtitle">
            Every technical query, custom mold modification, and production batch is governed by transparent performance metrics.
          </p>
        </div>

        <div className="sla-plate-grid">
          <div className="sla-plate">
            <div className="sla-giant-metric">&lt; 24h</div>
            <h3 className="sla-name">DFM Engineering Review</h3>
            <p className="sla-detail">Complete pinout validation and 3D tooling feasibility drawings issued within 24 hours.</p>
          </div>

          <div className="sla-plate">
            <div className="sla-giant-metric">3–5 Days</div>
            <h3 className="sla-name">Rapid Tooling Samples</h3>
            <p className="sla-detail">Functional injection-molded clinical evaluation samples produced and air-shipped in 3–5 business days.</p>
          </div>

          <div className="sla-plate">
            <div className="sla-giant-metric">100%</div>
            <h3 className="sla-name">Triple Electrical Inspection</h3>
            <p className="sla-detail">Every cable passes automated continuity, resistance, and 1,500V dielectric safety testing.</p>
          </div>

          <div className="sla-plate">
            <div className="sla-giant-metric">100%</div>
            <h3 className="sla-name">Lot Traceability</h3>
            <p className="sla-detail">Full material tracking from raw TPU resin batches through workstation logs to final packaging.</p>
          </div>
        </div>
      </div>
    </section>
    {/* ===================================================================
         SECTION 5: DIRECT EXPERT CHANNELS CTA (Flat Navy Background)
         =================================================================== */}
    <section className="expert-dock-section reveal-on-scroll" id="expert-contact">
      <div className="container">
        <div className="expert-center-wrap">
          <div className="expert-pill">No Middleware · Direct Engineering Access</div>
          <h2 className="expert-title">Connect Directly with Our Medical Engineering Leads</h2>
          <p className="expert-desc">
            Whether developing a proprietary sensor geometry under strict NDA or streamlining replacement cable procurement, our senior engineering specialists are ready to review your blueprints.
          </p>

          <div className="expert-btn-row">
            <Link to="/contact#blueprint-upload" className="btn btn-primary" id="btn-submit-drawings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              <span>Submit Technical Drawings for DFM Review</span>
            </Link>
            <a href="https://wa.me/8615302654212" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark" id="btn-schedule-meeting">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
              <span>Schedule a Meeting with Regional Lead</span>
            </a>
          </div>

          <div className="expert-contact-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" color="#25D366"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.178 1.564 5.923l-1.664 6.077 6.241-1.637c1.7 1.01 3.684 1.597 5.859 1.597 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
              <span>Instant WhatsApp Desk: <strong>+86 153 0265 4212</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Direct Engineering Desk: <strong>contact@medke.com</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Coverage: <strong>08:30–21:00 (GMT+8) Mon–Sat</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  
      </main>

      {/* Interactive Lightbox Modal (Click-to-Zoom Portrait & Documentary System) */}
      {lightboxData && (
        <div
          className="lightbox-modal active"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-name"
          onClick={closeLightbox}
        >
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-topbar">
              <div className="lightbox-member-title-group">
                <h3 className="lightbox-member-name" id="lightbox-name">
                  {lightboxData.name}
                </h3>
                <div className="lightbox-member-role" id="lightbox-role">
                  {lightboxData.role}
                </div>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={closeLightbox}
                aria-label="Close Lightbox"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="lightbox-img-canvas" id="lightbox-canvas">
              {lightboxData.src ? (
                <img src={lightboxData.src} alt={lightboxData.name} id="lightbox-img" style={{ display: 'block' }} loading="lazy" decoding="async" />
              ) : (
                <div className="lightbox-avatar-fallback" id="lightbox-avatar-fallback" style={{ display: 'flex' }}>
                  {lightboxData.initials || 'MD'}
                </div>
              )}
            </div>

            <div className="lightbox-caption-block">
              {lightboxData.quote && (
                <div
                  id="lightbox-quote"
                  style={{
                    fontStyle: 'normal',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: '20px',
                    marginBottom: 6
                  }}
                >
                  "{lightboxData.quote}"
                </div>
              )}
              <div className="lightbox-badge-row">
                <span
                  id="lightbox-credentials"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--accent-cyan)',
                    background: 'rgba(56, 189, 248, 0.12)',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(56, 189, 248, 0.25)'
                  }}
                >
                  {lightboxData.credentials || 'Certified Clinical Engineering Specialist'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`toast-box ${toast.show ? 'show' : ''}`} role="status" aria-live="polite">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span id="toast-text">{toast.message}</span>
      </div>
    </div>
  );
}
