import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitInquiry, INQUIRY_HONEYPOT_NAME } from '../lib/inquiries';
import './ContactPage.css';

const PRODUCT_CATEGORIES = [
  'SpO2 Sensors & Cables',
  'ECG Trunk Cables & Leadwires',
  'NIBP Cuffs & Air Hoses',
  'Temperature Probes',
  'IBP Cables & Transducers',
  'Defibrillator & ESU Electrodes',
  'OEM Custom Tooling & Mold'
];

const INQUIRY_INTENTS = [
  { id: 'Free Sample Evaluation', label: 'Free Sample Evaluation', desc: 'Clinical testing & evaluation units' },
  { id: 'Bulk Distributor Order', label: 'Bulk Distributor Order', desc: 'Volume tier pricing & regional stock' },
  { id: 'Hospital Tender Bidding', label: 'Hospital Tender Bidding', desc: 'Full compliance dossier & test reports' },
  { id: 'Custom OEM / ODM Development', label: 'Custom OEM / ODM Development', desc: 'Tooling, custom pinouts & extrusion' }
];

const FAQ_ITEMS = [
  {
    q: 'How quickly will our procurement team receive an official quotation?',
    a: (
      <>
        <p>Our commercial engineering desk commits to a <strong>strict 24-hour business SLA</strong> for all standard catalog items across SpO2, ECG, NIBP, and temperature sensor lines. Inquiries submitted during China business hours (GMT+8) are frequently routed to an assigned account engineer within <strong>2 to 4 hours</strong>.</p>
        <p>Your quotation includes transparent unit tier pricing, estimated packaging volume and gross weight for freight calculation, sample lead times, and regulatory dossier availability for your country of import.</p>
      </>
    )
  },
  {
    q: 'Can Medke supply free samples for clinical evaluation or distributor qualification?',
    a: (
      <>
        <p><strong>Yes.</strong> We offer an active sample program for certified hospitals, biomedical engineering teams, and qualified medical device distributors worldwide. For standard sensor lines and trunk cables, evaluation samples are typically dispatched from our Shenzhen hub within <strong>48 hours</strong>.</p>
        <p>Sample requests are subject to engineering review and account verification. To initiate sample dispatch, select &quot;Free Sample Evaluation&quot; in the RFQ form above and specify your target patient monitor or defibrillator models.</p>
      </>
    )
  },
  {
    q: 'What regulatory documentation and compliance dossiers do you provide?',
    a: (
      <>
        <p>Medke operates under a certified <strong>T&Uuml;V S&Uuml;D ISO 13485:2016</strong> quality management system. Depending on your import jurisdiction and product classification, we provide complete compliance packages including:</p>
        <div className="faq-highlight-box">
          &bull; <strong>European Union</strong>: CE Marking under EU MDR 2017/745 (Class IIb, Notified Body CE 0123) with EUDAMED SRN registration via MedNet Germany.<br />
          &bull; <strong>United States</strong>: FDA Device Listing &amp; Establishment Registration (FEI: 3012804266) with applicable 510(k) clearances.<br />
          &bull; <strong>Global Markets</strong>: ISO 10993 biological evaluation reports, EMC test reports, RoHS 2.0 / REACH SVHC certificates, Certificate of Origin (CO), and free sales certificates (FSC).
        </div>
      </>
    )
  },
  {
    q: 'Does Medke support custom OEM/ODM sensor and cable development?',
    a: (
      <>
        <p><strong>Absolutely.</strong> With our in-house mold design center, automated cable extrusion line, and dedicated biomedical R&amp;D lab, Medke partners with medical device OEMs across North America, Europe, and Asia for custom development.</p>
        <p>Our OEM capabilities cover custom connector pinouts, overmolding tooling, specialized TPU/TPE medical cable extrusion, custom labeling/laser engraving, and biocompatible material formulations. We routinely execute mutual non-disclosure agreements (NDAs) prior to receiving proprietary engineering drawings.</p>
      </>
    )
  },
  {
    q: "What are Medke's typical lead times and minimum order quantities (MOQ)?",
    a: (
      <>
        <p>For standard catalog accessories (SpO2 sensors, ECG leadwires, NIBP cuffs), we maintain high-velocity inventory buffers enabling dispatch within <strong>3 to 7 business days</strong>. Typical standard MOQ is <strong>10 to 50 pieces per model</strong>, allowing regional distributors to combine multiple accessory lines in a single consolidated shipment.</p>
        <p>Custom OEM cable runs or specialized tooling projects typically follow a <strong>20 to 30 day prototyping cycle</strong> followed by scheduled batch production. We support international freight via DHL, FedEx, air cargo, and ocean container (FOB Shenzhen / CIF destination port).</p>
      </>
    )
  }
];

export default function ContactPage() {
  const navigate = useNavigate();

  // Controlled form state
  const [selectedCategories, setSelectedCategories] = useState(['SpO2 Sensors & Cables']);
  const [inquiryType, setInquiryType] = useState('Bulk Distributor Order');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Anti-bot security timestamp with safety buffer
  const formStartedAt = useRef(Date.now() - 3000);
  const fileInputRef = useRef(null);
  const rfqFormRef = useRef(null);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev; // Keep at least one category selected
        return prev.filter((item) => item !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const sizeStr = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(0) + ' KB';
      setAttachment({ name: file.name, sizeStr });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const sizeStr = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(0) + ' KB';
      setAttachment({ name: file.name, sizeStr });
    }
  };

  const handleRemoveAttachment = (e) => {
    e.stopPropagation();
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  const scrollToRfq = (intent) => {
    if (intent) {
      setInquiryType(intent);
    }
    if (rfqFormRef.current) {
      rfqFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please provide your full name.';
    if (!email.trim()) {
      newErrors.email = 'Please provide your business email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }
    if (!company.trim()) newErrors.company = 'Please enter your hospital or company name.';
    if (!message.trim()) newErrors.message = 'Please describe your inquiry, target monitor models, or requirements.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitStatus('submitting');
    setErrorMessage('');

    const combinedCategories = selectedCategories.length > 0
      ? selectedCategories.join(', ')
      : 'General Medical Accessories';

    let compiledMessage = message.trim();
    const extraDetails = [];
    if (quantity.trim()) extraDetails.push(`Estimated Quantity / Scope: ${quantity.trim()}`);
    if (destination.trim()) extraDetails.push(`Target Delivery Country: ${destination.trim()}`);
    if (attachment) extraDetails.push(`Attachment File Noted: ${attachment.name} (${attachment.sizeStr})`);

    if (extraDetails.length > 0) {
      compiledMessage += `\n\n--- Project Scope & Logistics ---\n${extraDetails.join('\n')}`;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      company: company.trim(),
      product_name: combinedCategories,
      inquiry_type: inquiryType,
      message: compiledMessage
    };

    try {
      const res = await submitInquiry(payload, {
        honeypotValue: honeypot,
        formStartedAt: formStartedAt.current
      });

      if (res && res.blocked) {
        setSubmitStatus('idle');
        return;
      }

      if (res && res.ok) {
        navigate('/inquiry/success?ref=' + encodeURIComponent(res.ref || ''));
      } else {
        setSubmitStatus('error');
        setErrorMessage('Submission could not be completed at this moment. Please email info@medke.com or contact us on WhatsApp.');
      }
    } catch (err) {
      console.error('Contact inquiry submission failed:', err);
      setSubmitStatus('error');
      setErrorMessage(err?.message || 'Unable to submit your RFQ. Please contact info@medke.com directly or chat via WhatsApp.');
    }
  };

  return (
    <div className="contact-page">
      {/* §1 Hero Section: Pulsing status, authoritative stats, NO cert strip */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-header">
            <div className="live-response-pill">
              <span className="pulse-dot-wrap" aria-hidden="true">
                <span className="pulse-dot-ring"></span>
                <span className="pulse-dot-core"></span>
              </span>
              <span>Rapid Engineering &amp; Sales Response &middot; Active Now</span>
            </div>

            <h1 className="hero-title">
              Connect with Medke&apos;s Medical Cable &amp; <span className="text-highlight">Sensor Specialists</span>
            </h1>

            <p className="hero-subtitle">
              Direct communication with factory-based biomedical engineers, regulatory compliance leads, and international B2B account executives in Shenzhen, China.
            </p>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-card">
              <div className="stat-icon sla" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">24h</div>
                <div className="stat-label">Official RFQ Quote SLA</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon facility" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4v18" />
                  <path d="M19 21V11l-6-4" />
                  <path d="M9 9v.01" />
                  <path d="M9 12v.01" />
                  <path d="M9 15v.01" />
                  <path d="M9 18v.01" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">4,000 m&sup2;</div>
                <div className="stat-label">Shenzhen Production Base</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon markets" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">100+</div>
                <div className="stat-label">Countries &amp; Regions Served</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon regulatory" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">T&Uuml;V ISO 13485</div>
                <div className="stat-label">CE MDR &amp; FDA Registered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 Workspace Section: Dual-column workspace */}
      <section className="workspace-section">
        <div className="container">
          <div className="workspace-grid">
            {/* Left Column: Direct Communication Hub */}
            <div className="workspace-left-col">
              {/* WhatsApp Card */}
              <div className="hub-card whatsapp-card">
                <div className="hub-card-header">
                  <div className="hub-card-title-group">
                    <div className="hub-card-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="hub-card-heading">Direct WhatsApp Channel</h2>
                      <p className="hub-card-subheading">Instant technical &amp; sales desk access</p>
                    </div>
                  </div>
                  <span className="hub-card-badge">Instant Priority</span>
                </div>

                <div className="whatsapp-body">
                  <div className="whatsapp-meta-row">
                    <span className="whatsapp-number">+86 153 0265 4212</span>
                    <span className="whatsapp-status-tag">Online &middot; Avg. reply &lt; 15 min</span>
                  </div>
                  <a
                    href="https://wa.me/8615302654212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp-direct"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
                    </svg>
                    <span>Message WhatsApp Engineering Desk</span>
                  </a>
                </div>
              </div>

              {/* Official Inboxes Card: info@medke.com + contact@medke.com */}
              <div className="hub-card email-card">
                <div className="hub-card-header">
                  <div className="hub-card-title-group">
                    <div className="hub-card-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="hub-card-heading">Official Inboxes</h2>
                      <p className="hub-card-subheading">Guaranteed response within 24 hours</p>
                    </div>
                  </div>
                  <span className="hub-card-badge">24h SLA</span>
                </div>

                <div className="email-list">
                  <div className="email-item">
                    <div className="email-info">
                      <span className="email-addr">info@medke.com</span>
                      <span className="email-scope">General B2B Inquiries, Catalog Requests &amp; OEM Screening</span>
                    </div>
                    <a href="mailto:info@medke.com" className="email-action-link" title="Send email to info@medke.com">
                      <span>Compose</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  <div className="email-item">
                    <div className="email-info">
                      <span className="email-addr">contact@medke.com</span>
                      <span className="email-scope">Customer Support, Global Orders &amp; Regulatory Documentation</span>
                    </div>
                    <a href="mailto:contact@medke.com" className="email-action-link" title="Send email to contact@medke.com">
                      <span>Compose</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Physical Facility Card */}
              <div className="hub-card address-card">
                <div className="hub-card-header">
                  <div className="hub-card-title-group">
                    <div className="hub-card-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="hub-card-heading">Headquarters &amp; Manufacturing Facility</h2>
                      <p className="hub-card-subheading">Audited physical facility in Shenzhen</p>
                    </div>
                  </div>
                  <span className="hub-card-badge">4,000 m&sup2;</span>
                </div>

                <div className="address-body">
                  <div className="address-text-block">
                    <div className="legal-entity-name">Shenzhen Medke Technology Co., Ltd.</div>
                    <div className="physical-address">
                      4-5/F, Bldg A1, Anle Ind. Zone, Hangcheng Rd, Bao&apos;an Dist, Shenzhen 518000, Guangdong, China
                    </div>
                    <div className="business-hours-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Mon &ndash; Fri: 9:00 &ndash; 18:30 (GMT+8) &middot; Factory visits welcome by appointment</span>
                    </div>
                  </div>

                  <div className="facility-preview-wrap">
                    <div className="facility-preview-label">Live Facility Verification</div>
                    <div className="facility-photos-grid">
                      <div className="facility-photo-box">
                        <img
                          src="/assets/images/about/factory-workshop.jpg"
                          alt="Medke 4,000 m² Cable & Sensor Assembly Workshop in Shenzhen"
                          loading="lazy"
                        />
                        <div className="facility-photo-badge">Assembly Workshop</div>
                      </div>
                      <div className="facility-photo-box">
                        <img
                          src="/assets/images/about/cleanroom-real-clean.jpg"
                          alt="Medke 100k Class ISO 8 Cleanroom Production Facility"
                          loading="lazy"
                        />
                        <div className="facility-photo-badge">Class 100k Cleanroom</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3D Virtual Showroom Banner */}
              <div className="vr-banner-card">
                <div className="vr-banner-layout">
                  <div className="vr-banner-text">
                    <span className="vr-pill">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      360&deg; Virtual Tour
                    </span>
                    <h3 className="vr-banner-title">Tour Our 4,000 m&sup2; Cleanroom &amp; Testing Lab Online</h3>
                    <p className="vr-banner-desc">
                      Inspect our cleanroom, automated cable extrusion line, and reliability testing stations without travel restrictions.
                    </p>
                  </div>
                  <Link to="/vr-showroom" className="btn-vr-link">
                    <span>Enter 3D Tour</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Regulatory Representatives */}
              <div className="hub-card regulatory-card">
                <div className="hub-card-header">
                  <div className="hub-card-title-group">
                    <div className="hub-card-icon" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="hub-card-heading">Global Regulatory Representatives</h2>
                      <p className="hub-card-subheading">Authorized European &amp; British agents</p>
                    </div>
                  </div>
                  <span className="hub-card-badge">EU &amp; UK Rep</span>
                </div>

                <div className="regulatory-grid">
                  <div className="rep-item">
                    <div className="rep-header">
                      <span className="rep-title">
                        <span className="rep-flag" aria-hidden="true">&#x1F1EA;&#x1F1FA;</span> European Authorized Representative (EC-REP)
                      </span>
                      <span className="rep-badge">EU MDR 2017/745</span>
                    </div>
                    <div className="rep-name">MedNet EC-REP GmbH</div>
                    <div className="rep-address">Borkstrasse 10, 48163 M&uuml;nster, Germany</div>
                    <div className="rep-meta-line">EUDAMED SRN: CN-MF-000019638 &middot; Notified Body: CE 0123</div>
                  </div>

                  <div className="rep-item">
                    <div className="rep-header">
                      <span className="rep-title">
                        <span className="rep-flag" aria-hidden="true">&#x1F1EC;&#x1F1E7;</span> United Kingdom Responsible Person (UKRP)
                      </span>
                      <span className="rep-badge">MHRA Registered</span>
                    </div>
                    <div className="rep-name">MedNet UK Ltd.</div>
                    <div className="rep-address">Dudley Road, Birmingham, United Kingdom</div>
                    <div className="rep-meta-line">UK Medical Devices Regulations 2002 (SI 2002 No 618) Compliant</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-conversion RFQ Form */}
            <div className="workspace-right-col" ref={rfqFormRef}>
              <div className="rfq-card">
                <div className="rfq-card-header">
                  <div className="rfq-header-top">
                    <h2 className="rfq-main-title">Request an Official B2B Quotation</h2>
                    <span className="rfq-sla-pill">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      24h Quote SLA
                    </span>
                  </div>
                  <p className="rfq-subtitle">
                    Select your target medical product lines and submit your specifications for wholesale pricing, sample evaluation, or tender compliance files.
                  </p>
                </div>

                <form className="rfq-form" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field (hidden from view for anti-bot protection) */}
                  <input
                    type="text"
                    name={INQUIRY_HONEYPOT_NAME}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Step 1: Category Capsules Multi-select */}
                  <div className="form-group-title">
                    <span>1. Target Medical Product Lines</span>
                    <span className="hint">(Select all that apply)</span>
                  </div>

                  <div className="category-capsules-grid">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategories.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          className={`category-capsule ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleCategory(cat)}
                          aria-pressed={isSelected}
                        >
                          <span className="capsule-check" aria-hidden="true">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span>{cat}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 2: Inquiry Intent Buttons */}
                  <div className="form-group-title" style={{ marginTop: 24 }}>
                    <span>2. Inquiry &amp; Cooperation Intent</span>
                    <span className="req-star">*</span>
                  </div>

                  <div className="intent-grid">
                    {INQUIRY_INTENTS.map((intent) => {
                      const isActive = inquiryType === intent.label;
                      return (
                        <button
                          type="button"
                          key={intent.id}
                          className={`intent-btn ${isActive ? 'active' : ''}`}
                          onClick={() => setInquiryType(intent.label)}
                          aria-pressed={isActive}
                        >
                          <div className="intent-btn-label">{intent.label}</div>
                          <div className="intent-btn-desc">{intent.desc}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step 3: Contact & Project Details */}
                  <div className="form-group-title" style={{ marginTop: 24 }}>
                    <span>3. Contact &amp; Project Details</span>
                    <span className="req-star">*</span>
                  </div>

                  <div className="form-row-2col">
                    <div className="input-field-wrap">
                      <label className="input-label" htmlFor="contact-name">
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Dr. / Mr. / Ms. Full Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                        }}
                        required
                      />
                      {errors.name && <span className="field-error-msg">{errors.name}</span>}
                    </div>

                    <div className="input-field-wrap">
                      <label className="input-label" htmlFor="contact-email">
                        Work / Official Email <span className="req">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="name@hospital-or-company.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                        }}
                        required
                      />
                      {errors.email && <span className="field-error-msg">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="input-field-wrap">
                      <label className="input-label" htmlFor="contact-phone">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        className="form-input"
                        placeholder="+CountryCode Number (for rapid dispatch)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="input-field-wrap">
                      <label className="input-label" htmlFor="contact-company">
                        Hospital / Company Name <span className="req">*</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        className={`form-input ${errors.company ? 'error' : ''}`}
                        placeholder="Organization or Distributor Name"
                        value={company}
                        onChange={(e) => {
                          setCompany(e.target.value);
                          if (errors.company) setErrors((prev) => ({ ...prev, company: null }));
                        }}
                        required
                      />
                      {errors.company && <span className="field-error-msg">{errors.company}</span>}
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="input-field-wrap">
                      <label className="input-label" htmlFor="contact-quantity">
                        Target Quantity / Scope
                      </label>
                      <input
                        id="contact-quantity"
                        type="text"
                        className="form-input"
                        placeholder="e.g. 50 pcs sample / 2,000 pcs batch"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="input-field-wrap">
                      <label className="input-label" htmlFor="contact-destination">
                        Target Destination / Country
                      </label>
                      <input
                        id="contact-destination"
                        type="text"
                        className="form-input"
                        placeholder="e.g. Germany, USA, Brazil, UAE"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="input-field-wrap" style={{ marginTop: 14 }}>
                    <label className="input-label" htmlFor="contact-message">
                      Project Scope, Monitor Compatibility &amp; Requirements <span className="req">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      rows="4"
                      placeholder="Please specify compatible monitor brand/models (e.g. Philips, Mindray, GE, Nihon Kohden), target connector pinouts, required regulatory certifications (CE MDR, FDA), or custom OEM cable drawing requirements..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: null }));
                      }}
                      required
                    ></textarea>
                    {errors.message && <span className="field-error-msg">{errors.message}</span>}
                  </div>

                  {/* Attachment Upload Zone */}
                  <div
                    className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="file-input-hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.zip"
                    />
                    <div className="upload-content">
                      <div className="upload-icon" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div className="upload-title">
                        <span>Drag &amp; drop tender specs, BOM or drawings here, or </span>
                        <span className="browse-link">browse files</span>
                      </div>
                      <div className="upload-hint">
                        PDF, DOCX, XLSX, JPG, PNG or ZIP up to 25MB. Handled under strict NDA.
                      </div>
                    </div>
                  </div>

                  {attachment && (
                    <div className="uploaded-file-tag">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span>{attachment.name} ({attachment.sizeStr})</span>
                      <button
                        type="button"
                        onClick={handleRemoveAttachment}
                        aria-label="Remove attachment"
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 2,
                          color: '#64748b',
                          display: 'inline-flex',
                          alignItems: 'center'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Clean SVG Padlock NDA note */}
                  <div className="nda-guarantee-note">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>
                      <strong>NDA &amp; Confidentiality Guarantee:</strong> All project specifications, tender drawings, and engineering CAD data are strictly protected under mutual B2B confidentiality standards.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-submit-rfq"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        <span>Transmitting RFQ to Engineering Desk...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Official RFQ &amp; Technical Inquiry</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Submission Error Banner */}
                  {submitStatus === 'error' && (
                    <div className="form-error-banner" role="alert">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §3 B2B SLA Section: 4 Core Guarantees */}
      <section className="sla-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge-pill">B2B Procurement Commitments</span>
            <h2 className="section-title">Built for Global Hospital Tenders &amp; Device OEMs</h2>
            <p className="section-subtitle">
              Every inquiry is backed by enforceable turnaround standards, factory-direct pricing transparency, and comprehensive regulatory dossiers.
            </p>
          </div>

          <div className="sla-cards-grid">
            <div className="sla-card">
              <div className="sla-card-header">
                <div className="sla-icon-box" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span className="sla-metric-tag">24h SLA Guarantee</span>
              </div>
              <h3 className="sla-card-title">24-Hour Engineering RFQ Turnaround</h3>
              <p className="sla-card-desc">
                Every RFQ is reviewed directly by an assigned biomedical application engineer who verifies monitor pinout compatibility, regulatory classifications, and volume tier pricing.
              </p>
              <ul className="sla-feature-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Complete BOM &amp; tiered volume pricing</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Monitor pinout compatibility verification</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Transparent FOB/CIF freight estimations</span>
                </li>
              </ul>
            </div>

            <div className="sla-card">
              <div className="sla-card-header">
                <div className="sla-icon-box" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <span className="sla-metric-tag">48h Sample Dispatch</span>
              </div>
              <h3 className="sla-card-title">Flexible Sample Program &amp; Rapid Dispatch</h3>
              <p className="sla-card-desc">
                We provide evaluation samples to hospitals, clinical trials, and certified distributors to verify signal stability, mechanical fit, and connector endurance.
              </p>
              <ul className="sla-feature-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Dispatch within 48h for catalog items</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Includes Certificate of Conformance (CoC)</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Direct technical assistance during clinical evaluation</span>
                </li>
              </ul>
            </div>

            <div className="sla-card">
              <div className="sla-card-header">
                <div className="sla-icon-box" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="sla-metric-tag">ISO 13485 &amp; CE MDR</span>
              </div>
              <h3 className="sla-card-title">Full Technical Dossier &amp; Regulatory Package</h3>
              <p className="sla-card-desc">
                Seamless customs clearance and local medical device registration support with ready-to-file regulatory dossiers for 100+ countries.
              </p>
              <ul className="sla-feature-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>EU MDR Technical Documentation (Notified Body 0123)</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>ISO 10993 Biocompatibility Test Reports</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>FDA Establishment &amp; Device Listing records</span>
                </li>
              </ul>
            </div>

            <div className="sla-card">
              <div className="sla-card-header">
                <div className="sla-icon-box" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <span className="sla-metric-tag">Strict Confidentiality</span>
              </div>
              <h3 className="sla-card-title">B2B NDA &amp; Strict IP Protection</h3>
              <p className="sla-card-desc">
                Your OEM schematics, custom mold tooling, proprietary connector pinouts, and client lists are protected by binding bilateral non-disclosure agreements.
              </p>
              <ul className="sla-feature-list">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Bilateral NDA signed before CAD transfer</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>In-house mold tooling security &amp; isolation</span>
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Restricted engineering access for client designs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* §4 FAQ Section: Accordion */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge-pill">Procurement Questions Answered</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Key procurement guidelines, regulatory coverage, sample dispatch terms, and custom OEM manufacturing procedures.
            </p>
          </div>

          <div className="faq-accordion-wrap">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="faq-toggle-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div className="faq-answer-panel">
                    <div className="faq-answer-content">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* §5 Factory CTA Section: Deep Navy VR & Video Audit */}
      <section className="factory-cta-section">
        <div className="container">
          <div className="factory-cta-grid">
            <div className="factory-cta-content">
              <span className="factory-live-pill">
                <span className="pulse-dot-wrap" aria-hidden="true">
                  <span className="pulse-dot-ring"></span>
                  <span className="pulse-dot-core"></span>
                </span>
                Live Factory Verification
              </span>

              <h2 className="factory-cta-title">
                Schedule a Live Factory Video Audit or <span className="text-cyan">In-Person Facility Tour</span>
              </h2>

              <p className="factory-cta-desc">
                Audit our 4,000 m&sup2; Shenzhen manufacturing plant, class-100k cleanroom, automated cable extrusion line, and biomedical testing laboratories with a live technical consultant.
              </p>

              <div className="factory-actions-row">
                <Link to="/vr-showroom" className="btn-cta-primary">
                  <span>Explore 3D Virtual Showroom</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>

                <button
                  type="button"
                  className="btn-cta-secondary"
                  onClick={() => scrollToRfq('Custom OEM / ODM Development')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <span>Request Video Audit with Lead Engineer</span>
                </button>
              </div>
            </div>

            <div className="factory-visual-card">
              <div className="visual-card-header">
                <span className="visual-card-title">Shenzhen Facility Capabilities</span>
                <span className="visual-card-status">Active Audit Ready</span>
              </div>

              <div className="visual-specs-grid">
                <div className="spec-item-box">
                  <div className="spec-item-val">100k Class</div>
                  <div className="spec-item-lbl">ISO 8 Cleanroom</div>
                </div>

                <div className="spec-item-box">
                  <div className="spec-item-val">15+ Stations</div>
                  <div className="spec-item-lbl">Automated Testers</div>
                </div>

                <div className="spec-item-box">
                  <div className="spec-item-val">ISO 10993</div>
                  <div className="spec-item-lbl">Biocompatibility Pass</div>
                </div>

                <div className="spec-item-box">
                  <div className="spec-item-val">100% RoHS</div>
                  <div className="spec-item-lbl">&amp; REACH Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
