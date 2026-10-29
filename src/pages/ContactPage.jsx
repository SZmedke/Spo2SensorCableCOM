import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitInquiry, INQUIRY_HONEYPOT_NAME } from '../lib/inquiries';
import './ContactPage.css';

const PRODUCT_CATEGORIES = [
  { id: 'spo2', label: 'SpO2 Sensors & Cables', dataValue: 'SpO2 Sensors & Cables' },
  { id: 'ecg', label: 'ECG Cables & Leadwires', dataValue: 'ECG Trunk Cables & Leadwires' },
  { id: 'nibp', label: 'NIBP Cuffs & Hoses', dataValue: 'NIBP Cuffs & Air Hoses' },
  { id: 'temp', label: 'Temperature Probes', dataValue: 'Temperature Probes' },
  { id: 'ibp', label: 'IBP Cables & Adapters', dataValue: 'IBP Cables & Transducers' },
  { id: 'defib', label: 'Defib & ESU Electrodes', dataValue: 'Defibrillator & ESU Electrodes' },
  { id: 'oem', label: 'OEM Mold & Connectors', dataValue: 'OEM Custom Tooling & Mold' }
];

const INQUIRY_INTENTS = [
  {
    id: 'sample',
    label: 'Sample Trial',
    desc: 'Free for clinical audit',
    dataValue: 'Free Sample Evaluation'
  },
  {
    id: 'bulk',
    label: 'Bulk Order',
    desc: 'Tiered factory pricing',
    dataValue: 'Bulk Distributor Order'
  },
  {
    id: 'tender',
    label: 'Tender Bidding',
    desc: 'Compliance & authorization',
    dataValue: 'Hospital Tender Bidding'
  },
  {
    id: 'oem',
    label: 'Custom OEM',
    desc: 'Drawings & tooling',
    dataValue: 'Custom OEM / ODM Development'
  }
];

const QUANTITY_OPTIONS = [
  '1 – 5 pcs (Clinical Sample Evaluation)',
  '20 – 100 pcs (Small Batch / Trial Order)',
  '100 – 500 pcs (Standard Distributor Order)',
  '500 – 2,000 pcs (Annual Supply Agreement)',
  '2,000+ pcs (OEM Mass Production / Tender)'
];

const FAQ_ITEMS = [
  {
    question: "What is Medke's Minimum Order Quantity (MOQ) for standard cables vs custom OEM items?",
    answer: (
      <>
        <p>
          For our catalog of over 450+ standard clinical items (compatible with Philips, Mindray, GE Marquette, Nihon Kohden, Masimo, Nellcor, Spacelabs, etc.), our <strong>standard MOQ is as low as 1 to 10 pieces</strong> to accommodate hospital replacement batches and distributor trials.
        </p>
        <p>
          For custom OEM connector tooling or private-label jacket printing, MOQ typically begins at 100 to 500 units depending on raw material extrusion minimums.
        </p>
        <div className="faq-highlight-box">
          <strong>Standard SKUs:</strong> 1–10 pcs MOQ · <strong>Custom Tooling:</strong> 100–500 pcs based on mold design.
        </div>
      </>
    )
  },
  {
    question: "How does the free clinical sample evaluation process work for hospital trials?",
    answer: (
      <>
        <p>
          We provide free evaluation samples for qualified hospital biomedical engineering departments, clinical trial teams, and established medical device distributors. Simply submit your monitor model and patient cable connector pinout through our RFQ form.
        </p>
        <p>
          Our engineering team will verify DFM specifications and dispatch sample units via express air courier (DHL, FedEx, or UPS). We include our comprehensive Factory Inspection Report (FIR) and electrical test logs with every shipment.
        </p>
      </>
    )
  },
  {
    question: "Which customs clearance and regulatory certificates are readily provided for export?",
    answer: (
      <>
        <p>
          Every export shipment is backed by authenticated quality dossiers, including <strong>TÜV SÜD ISO 13485:2016</strong> certification, <strong>EU MDR 2017/745 Class IIb CE 0123</strong> certificates, EU Declaration of Conformity (DoC), US FDA 510(k) clearance letters, Certificate of Free Sale (CFS), and RoHS / REACH compliance statements.
        </p>
        <p>
          For Middle Eastern and South American markets, we also supply legalized commercial invoices and Saudi SFDA MDMA approval numbers.
        </p>
      </>
    )
  },
  {
    question: "What is the typical production lead time for standard repeat orders vs emergency batches?",
    answer: (
      <>
        <p>
          High-runner clinical SKUs (including standard SpO2 sensors, 3-lead/5-lead ECG trunk cables, and adult NIBP cuffs) are maintained in safety stock at our Shenzhen facility and can be dispatched within <strong>48 to 72 hours</strong>.
        </p>
        <p>
          Standard repeat distributor batches of 100 to 1,000 units require approximately <strong>7 to 14 business days</strong>. For urgent hospital emergency tender requirements, we operate fast-track assembly lines to meet critical delivery dates.
        </p>
      </>
    )
  },
  {
    question: "Can Medke tool proprietary connectors, custom overmolds, or engineer private-label OEM cables?",
    answer: (
      <>
        <p>
          Yes. OEM/ODM engineering is a core pillar of Medke's manufacturing operations. Our in-house tooling workshop designs and fabricates precision injection molds, silicone rubber overmolds, custom strain reliefs, and specialized multi-pin circular connectors.
        </p>
        <p>
          We support custom cable jacket extrusion (medical-grade medical TPU, TPE, and silicone), laser-etched private branding, unique packaging, and custom PCB / resistor integration for embedded sensor intelligence.
        </p>
      </>
    )
  }
];

export default function ContactPage() {
  const navigate = useNavigate();

  // Form State
  const [selectedCategories, setSelectedCategories] = useState(['SpO2 Sensors & Cables']);
  const [inquiryType, setInquiryType] = useState('Free Sample Evaluation');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Validation & status
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Anti-spam timing: set on mount, 3 seconds elapsed buffer
  const formStartedAt = useRef(Date.now() - 3000);
  const fileInputRef = useRef(null);
  const rfqFormRef = useRef(null);

  // FAQ Accordion State (first open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleCategory = (catDataValue) => {
    setSelectedCategories((prev) => {
      if (prev.includes(catDataValue)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((c) => c !== catDataValue);
      } else {
        return [...prev, catDataValue];
      }
    });
    if (errors.categories) {
      setErrors((prev) => ({ ...prev, categories: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, attachment: 'File size exceeds 25MB limit.' }));
        return;
      }
      setAttachment(file);
      setErrors((prev) => ({ ...prev, attachment: undefined }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, attachment: 'File size exceeds 25MB limit.' }));
        return;
      }
      setAttachment(file);
      setErrors((prev) => ({ ...prev, attachment: undefined }));
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  const scrollToRfq = (targetIntent) => {
    if (targetIntent) {
      setInquiryType(targetIntent);
    }
    if (rfqFormRef.current) {
      rfqFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Please enter your full name.';
    if (!company.trim()) newErrors.company = 'Please specify your organisation name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter a valid business email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid business email address.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please provide a valid phone or WhatsApp number.';
    }
    if (!quantity) {
      newErrors.quantity = 'Please select an estimated quantity.';
    }
    if (selectedCategories.length === 0) {
      newErrors.categories = 'Please select at least one product category.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitStatus('submitting');
    setErrorMessage('');

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        inquiry_type: inquiryType,
        source: 'Contact Page RFQ Form',
        message: [
          `Target Categories: ${selectedCategories.join(', ')}`,
          `Requirement Scope: ${inquiryType}`,
          `Estimated Target Quantity: ${quantity}`,
          country.trim() ? `Destination Market: ${country.trim()}` : null,
          message.trim() ? `Specifications / Device Models:\n${message.trim()}` : null,
          attachment ? `Attached File: ${attachment.name} (${Math.round(attachment.size / 1024)} KB)` : null
        ]
          .filter(Boolean)
          .join('\n\n')
      };

      const res = await submitInquiry(payload, {
        honeypotValue: honeypot,
        formStartedAt: formStartedAt.current
      });

      if (res && res.blocked) {
        setSubmitStatus('idle');
        return;
      }

      if (res && res.ok) {
        setSubmitStatus('idle');
        navigate('/inquiry/success?ref=' + encodeURIComponent(res.ref || ''));
      } else {
        throw new Error(res?.error || 'Failed to submit inquiry. Please try again or email us directly.');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'An unexpected error occurred. Please contact us via contact@medke.com.');
    }
  };

  return (
    <div className="contact-page">
      {/* SECTION 1: HERO */}
      <section className="contact-hero">
    <div className="container">
      <div className="hero-header">
        
        <div className="live-response-pill">
          <div className="pulse-dot-wrap">
            <div className="pulse-dot-ring"></div>
            <div className="pulse-dot-core"></div>
          </div>
          <span>Rapid Engineering &amp; Sales Response · Active Now (GMT+8)</span>
        </div>

        <h1 className="hero-title">
          Connect with Medke's <span className="text-highlight">Medical Cable &amp; Sensor</span> Specialists
        </h1>
        <p className="hero-subtitle">
          Direct manufacturing support for hospital clinical engineering departments, worldwide medical device distributors, and medical equipment OEMs. Factory pricing, clinical trial samples, and full technical dossiers delivered with verified agility.
        </p>
      </div>

      
      <div className="hero-stats-grid">
        <div className="stat-card">
          <div className="stat-icon sla">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{"< 24h SLA"}</span>
            <span className="stat-label">Engineering Quote &amp; DFM Review</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon facility">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/></svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">4,000 m² Facility</span>
            <span className="stat-label">Bao'an Shenzhen Class 100k Cleanroom</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon markets">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">100+ Countries</span>
            <span className="stat-label">Hospital &amp; Distributor Supply Chain</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon regulatory">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">ISO 13485 &amp; MDR</span>
            <span className="stat-label">TÜV SÜD CE 0123 &amp; FDA Cleared</span>
          </div>
        </div>
      </div>

      </div>
  </section>

  
  

      {/* SECTION 2: WORKSPACE */}
      <section className="workspace-section">
    <div className="container">
      <div className="workspace-grid">

        
        <div className="workspace-left-col">

          
          <div className="hub-card whatsapp-card">
            <div className="hub-card-header">
              <div className="hub-card-title-group">
                <div className="hub-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                </div>
                <div>
                  <h2 className="hub-card-heading">Direct WhatsApp Channel</h2>
                  <p className="hub-card-subheading">Instant technical &amp; sales desk access</p>
                </div>
              </div>
              <span className="hub-card-badge">Instant</span>
            </div>

            <div className="whatsapp-body">
              <div className="whatsapp-meta-row">
                <span className="whatsapp-number">+86 153 0265 4212</span>
                <span className="whatsapp-status-tag">Online Now</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Connect directly with our senior product managers for urgent pinout confirmation, inventory checks, or batch pricing in real time.
              </p>
              <a href="https://wa.me/8615302654212" target="_blank" rel="noopener noreferrer" className="btn-whatsapp-direct">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                <span>Launch WhatsApp Conversation</span>
              </a>
            </div>
          </div>

          
          <div className="hub-card email-card">
            <div className="hub-card-header">
              <div className="hub-card-title-group">
                <div className="hub-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h2 className="hub-card-heading">Official Inboxes</h2>
                  <p className="hub-card-subheading">Guaranteed response within 24 hours</p>
                </div>
              </div>
              <span className="hub-card-badge" style={{ background: '#E0F2FE', color: '#0284C7' }}>24h SLA</span>
            </div>

            <div className="email-list">
              <a href="mailto:info@medke.com" className="email-item">
                <div className="email-info">
                  <span className="email-addr">info@medke.com</span>
                  <span className="email-scope">General inquiries, hospital tenders &amp; compliance dossiers</span>
                </div>
                <span className="email-action-link">
                  Email
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </a>

              <a href="mailto:contact@medke.com" className="email-item">
                <div className="email-info">
                  <span className="email-addr">contact@medke.com</span>
                  <span className="email-scope">Bulk distributor pricing, custom tooling &amp; contract orders</span>
                </div>
                <span className="email-action-link">
                  Email
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </span>
              </a>
            </div>
          </div>

          
          <div className="hub-card address-card">
            <div className="hub-card-header">
              <div className="hub-card-title-group">
                <div className="hub-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h2 className="hub-card-heading">Headquarters &amp; Manufacturing Facility</h2>
                  <p className="hub-card-subheading">Audited physical facility in Shenzhen</p>
                </div>
              </div>
              <span className="hub-card-badge" style={{ background: '#FEF3C7', color: '#B45309' }}>4,000 m²</span>
            </div>

            <div className="address-body">
              <div className="address-text-block">
                <div className="legal-entity-name">Shenzhen Medke Technology Co., Ltd.</div>
                <div className="physical-address">
                  4-5/F, Building A1, Anle Industrial Zone, Hangcheng Road, Bao'an District, Shenzhen 518000, Guangdong Province, P.R. China
                </div>
                <div className="business-hours-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Operations: Monday – Saturday, 9:00 AM – 6:30 PM (GMT+8)</span>
                </div>
              </div>

              
              <div className="facility-preview-wrap">
                <div className="facility-preview-label">
                  <span>Factory Verification Views</span>
                  <span style={{ fontWeight: '500', textTransform: 'none', color: 'var(--text-subtle)' }}>Class 100k Cleanroom</span>
                </div>
                <div className="facility-photos-grid">
                  <div className="facility-photo-box">
                    <img
                      src="/assets/images/about/factory-workshop.jpg"
                      alt="Medke Precision Manufacturing Workshop"
                      loading="lazy"
                    />
                    <div className="facility-photo-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      <span>Automated Cable Assembly</span>
                    </div>
                  </div>

                  <div className="facility-photo-box">
                    <img
                      src="/assets/images/about/cleanroom-real-clean.jpg"
                      alt="Medke Class 100,000 ISO 7 Cleanroom"
                      loading="lazy"
                    />
                    <div className="facility-photo-badge">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span>ISO 7 Medical Cleanroom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="hub-card vr-banner-card">
            <div className="vr-banner-layout">
              <div className="vr-banner-text">
                <span className="vr-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12h20"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="m4 8 4 4 4-4 4 4 4-4"/></svg>
                  <span>Remote Factory Audit</span>
                </span>
                <div className="vr-banner-title">Take a 3D Virtual Factory Tour</div>
                <p className="vr-banner-desc">
                  Explore our automated SMT lines, environmental test chambers, and cleanroom packaging facilities without overseas travel.
                </p>
              </div>
              <Link to="/vr-showroom" className="btn-vr-link">
                <span>Enter VR</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>

          
          <div className="hub-card regulatory-card">
            <div className="hub-card-header">
              <div className="hub-card-title-group">
                <div className="hub-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <h2 className="hub-card-heading">Global Regulatory Representatives</h2>
                  <p className="hub-card-subheading">Authorized European &amp; British agents</p>
                </div>
              </div>
              <span className="hub-card-badge" style={{ background: '#EDE9FE', color: '#6D28D9' }}>Audit Ready</span>
            </div>

            <div className="regulatory-grid">
              
              <div className="rep-item">
                <div className="rep-header">
                  <span className="rep-title">
                    <span className="rep-flag">🇪🇺</span>
                    <span>European Authorized Representative (EC-REP)</span>
                  </span>
                  <span className="rep-badge">MDR (EU) 2017/745</span>
                </div>
                <div className="rep-name">MedNet EC-REP GmbH</div>
                <div className="rep-address">Borkstrasse 10, 48163 Münster, Germany</div>
                <div className="rep-meta-line">EUDAMED SRN: CN-MF-000019638</div>
              </div>

              
              <div className="rep-item">
                <div className="rep-header">
                  <span className="rep-title">
                    <span className="rep-flag">🇬🇧</span>
                    <span>United Kingdom Responsible Person (UKRP)</span>
                  </span>
                  <span className="rep-badge">MHRA Cleared</span>
                </div>
                <div className="rep-name">MedNet UK Ltd.</div>
                <div className="rep-address">Dudley Road, Birmingham, United Kingdom</div>
                <div className="rep-meta-line">MHRA Reg: 2022111601285087 · UK MDR 2002</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Smart RFQ Floating Card (~58%) */}
        <div className="workspace-right-col" id="rfq-form-card" ref={rfqFormRef}>
              <div className="rfq-card-header">
                <div className="rfq-header-top">
                  <h2 className="rfq-main-title">Request Quotation &amp; Free Samples</h2>
                  <span className="rfq-sla-pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>24h Quote SLA</span>
                  </span>
                </div>
                <p className="rfq-subtitle">
                  Select your product categories and volume requirement below. Our engineering and sales team will respond with factory pricing, compliance docs, and pinout verification within 24 hours.
                </p>
              </div>

              <form className="rfq-form" id="contact-rfq-form" onSubmit={handleSubmit} noValidate>
                {/* Honeypot hidden anti-spam field */}
                <input
                  type="text"
                  name={INQUIRY_HONEYPOT_NAME}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Product Category Capsule Multi-Select */}
                <div>
                  <div className="form-group-title">
                    <span>Target Product Categories</span>
                    <span className="req-star">*</span>
                    <span className="hint">Multi-select applicable lines</span>
                  </div>
                  <div className="category-capsules-grid" id="category-capsules">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const isActive = selectedCategories.includes(cat.dataValue);
                      return (
                        <div
                          key={cat.id}
                          className={`category-capsule ${isActive ? 'active' : ''}`}
                          onClick={() => toggleCategory(cat.dataValue)}
                          data-category={cat.dataValue}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleCategory(cat.dataValue);
                            }
                          }}
                        >
                          <span className="capsule-check">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                          <span>{cat.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  {errors.categories && <span className="field-error-msg" style={{ marginTop: '8px' }}>{errors.categories}</span>}
                </div>

                {/* Requirement Scope / Intent Selector */}
                <div>
                  <div className="form-group-title">
                    <span>Requirement Scope</span>
                    <span className="req-star">*</span>
                  </div>
                  <div className="intent-grid" id="intent-selector">
                    {INQUIRY_INTENTS.map((intent) => {
                      const isActive = inquiryType === intent.dataValue;
                      return (
                        <div
                          key={intent.id}
                          className={`intent-btn ${isActive ? 'active' : ''}`}
                          data-intent={intent.dataValue}
                          onClick={() => setInquiryType(intent.dataValue)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setInquiryType(intent.dataValue);
                            }
                          }}
                        >
                          <span className="intent-btn-label">{intent.label}</span>
                          <span className="intent-btn-desc">{intent.desc}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2-Column Compact Contact Details */}
                <div className="form-row-2col">
                  <div className="input-field-wrap">
                    <label className="input-label" htmlFor="rfq-name">
                      <span>Full Name</span>
                      <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="rfq-name"
                      name="full_name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Dr. Alexander Becker"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      required
                    />
                    {errors.name && <span className="field-error-msg" id="name-error">{errors.name}</span>}
                  </div>

                  <div className="input-field-wrap">
                    <label className="input-label" htmlFor="rfq-company">
                      <span>Company / Hospital</span>
                      <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="rfq-company"
                      name="company"
                      className={`form-input ${errors.company ? 'error' : ''}`}
                      placeholder="e.g. Mediserv Hospital Supplies GmbH"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                      }}
                      required
                    />
                    {errors.company && <span className="field-error-msg" id="company-error">{errors.company}</span>}
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="input-field-wrap">
                    <label className="input-label" htmlFor="rfq-email">
                      <span>Business Email</span>
                      <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="rfq-email"
                      name="business_email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="alexander@mediserv.de"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      required
                    />
                    {errors.email && <span className="field-error-msg" id="email-error">{errors.email}</span>}
                  </div>

                  <div className="input-field-wrap">
                    <label className="input-label" htmlFor="rfq-phone">
                      <span>Tel / WhatsApp (with Country Code)</span>
                      <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      id="rfq-phone"
                      name="phone_whatsapp"
                      className={`form-input ${errors.phone ? 'error' : ''}`}
                      placeholder="+49 176 1234 5678"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      required
                    />
                    {errors.phone && <span className="field-error-msg" id="phone-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="input-field-wrap">
                    <label className="input-label" htmlFor="rfq-quantity">
                      <span>Estimated Target Quantity</span>
                      <span className="req">*</span>
                    </label>
                    <select
                      id="rfq-quantity"
                      name="target_quantity"
                      className={`form-select ${errors.quantity ? 'error' : ''}`}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        if (errors.quantity) setErrors((prev) => ({ ...prev, quantity: undefined }));
                      }}
                      required
                    >
                      <option value="" disabled>Select estimated volume...</option>
                      {QUANTITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.quantity && <span className="field-error-msg" id="quantity-error">{errors.quantity}</span>}
                  </div>

                  <div className="input-field-wrap">
                    <label className="input-label" htmlFor="rfq-country">
                      <span>Destination Country / Market</span>
                    </label>
                    <input
                      type="text"
                      id="rfq-country"
                      name="destination_country"
                      className="form-input"
                      placeholder="e.g. Germany, Saudi Arabia, Brazil"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>

                {/* Message / Technical Specification Textarea */}
                <div className="input-field-wrap">
                  <label className="input-label" htmlFor="rfq-message">
                    <span>Product Specifications, OEM Cross-References, or Device Models</span>
                  </label>
                  <textarea
                    id="rfq-message"
                    name="specifications"
                    className="form-textarea"
                    placeholder="Include device brand &amp; model (e.g., Philips IntelliVue, Mindray BeneView, GE Marquette, Nihon Kohden), pin count, connector keying, preferred jacket material (Medical TPU / Silicone), or custom cable lengths..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Drag and Drop Technical File Upload Zone */}
                <div>
                  <div className="form-group-title">
                    <span>Drawings, Pinouts, or Tender Specifications</span>
                    <span className="hint">Optional · Max 25MB</span>
                  </div>
                  <div
                    className={`upload-zone ${isDragOver ? 'dragover' : ''} ${attachment ? 'has-file' : ''}`}
                    id="drop-zone"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => !attachment && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="file-input"
                      className="file-input-hidden"
                      accept=".pdf,.dwg,.dxf,.step,.stp,.zip,.rar,.png,.jpg,.jpeg,.xlsx,.docx"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />

                    {!attachment ? (
                      <div className="upload-content">
                        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <div className="upload-title">
                          Drag &amp; drop technical files here, or <span className="browse-link">browse from computer</span>
                        </div>
                        <span className="upload-hint">Supported formats: PDF, STEP, DWG, ZIP, XLSX, JPG (CAD pinouts, tender specs)</span>
                      </div>
                    ) : (
                      <div className="uploaded-file-tag" id="file-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span id="file-name-label">{attachment.name} ({(attachment.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button
                          type="button"
                          id="remove-file-btn"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger)', display: 'flex', alignItems: 'center' }}
                          title="Remove file"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveAttachment();
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.attachment && <span className="field-error-msg" style={{ marginTop: '8px' }}>{errors.attachment}</span>}
                </div>

                {/* NDA Privacy Protection Guarantee */}
                <div className="nda-guarantee-note">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>
                    <strong>Strict NDA &amp; IP Protection:</strong> All submitted technical drawings, OEM schematics, and hospital tender details are held under mutual non-disclosure and used solely for engineering quote evaluation.
                  </span>
                </div>

                {/* Submission Error Banner */}
                {submitStatus === 'error' && (
                  <div className="form-submit-error">
                    <strong>Submission Error:</strong> {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-submit-rfq"
                  id="submit-rfq-button"
                  disabled={submitStatus === 'submitting'}
                >
                  <span>{submitStatus === 'submitting' ? 'Submitting to Engineering Team...' : 'Request Engineering Quote & Free Sample'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SLA */}
      <section className="sla-section">
    <div className="container">
      <div className="section-header-center">
        <span className="section-badge-pill">B2B Manufacturing Commitments</span>
        <h2 className="section-title">Built for Mission-Critical Medical Procurement</h2>
        <p className="section-subtitle">
          Transparent service level agreements designed to de-risk hospital trials, accelerate distributor supply chains, and guarantee long-term regulatory compliance.
        </p>
      </div>

      <div className="sla-cards-grid">
        
        <div className="sla-card">
          <div className="sla-card-header">
            <div className="sla-icon-box">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <span className="sla-metric-tag">{"< 24h SLA"}</span>
          </div>
          <h3 className="sla-card-title">24-Hour Guaranteed Quote</h3>
          <p className="sla-card-desc">
            Direct response from assigned product engineering managers with complete tier pricing, lead time schedules, and pinout verification drawings.
          </p>
          <ul className="sla-feature-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Instant DFM compatibility check</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Itemised volume discount tiers</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Express customs HS code list</span>
            </li>
          </ul>
        </div>

        
        <div className="sla-card">
          <div className="sla-card-header">
            <div className="sla-icon-box">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <span className="sla-metric-tag">Zero Risk</span>
          </div>
          <h3 className="sla-card-title">Free Clinical Evaluation Samples</h3>
          <p className="sla-card-desc">
            We provide complimentary sample units for qualified hospitals, clinical engineers, and registered medical distributors to perform bedside tests before placing bulk orders.
          </p>
          <ul className="sla-feature-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Shipped via DHL/FedEx Express</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Full batch QC test certificate</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>100% bedside trial pass guarantee</span>
            </li>
          </ul>
        </div>

        
        <div className="sla-card">
          <div className="sla-card-header">
            <div className="sla-icon-box">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <span className="sla-metric-tag">Legal Binding</span>
          </div>
          <h3 className="sla-card-title">Strict NDA &amp; IP Protection</h3>
          <p className="sla-card-desc">
            Your proprietary connector designs, internal mold tooling, custom wiring pinouts, and hospital tender details remain strictly confidential under bilateral non-disclosure agreements.
          </p>
          <ul className="sla-feature-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Bilateral NDA signed prior to CAD</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Dedicated proprietary tooling ownership</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Encrypted drawing storage protocols</span>
            </li>
          </ul>
        </div>

        
        <div className="sla-card">
          <div className="sla-card-header">
            <div className="sla-icon-box">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <span className="sla-metric-tag">Full Dossier</span>
          </div>
          <h3 className="sla-card-title">Audit-Ready Regulatory Dossiers</h3>
          <p className="sla-card-desc">
            Complete compliance documentation provided for every batch, enabling swift local Ministry of Health registration, customs clearance, and hospital quality audits.
          </p>
          <ul className="sla-feature-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>EU Declaration of Conformity (DoC)</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>ISO 10993 Biocompatibility reports</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>FDA 510(k) summary documentation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  
  

      {/* SECTION 4: FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge-pill">Procurement &amp; Engineering FAQ</span>
            <h2 className="section-title">Frequently Asked Questions by Overseas Buyers</h2>
            <p className="section-subtitle">
              Key facts on minimum order quantities, clinical sample qualification, international regulatory documentation, and production lead times.
            </p>
          </div>

          <div className="faq-accordion-wrap" id="faq-accordion">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(idx)}
                  >
                    <span>{item.question}</span>
                    <div className="faq-toggle-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </button>
                  <div
                    className="faq-answer-panel"
                    style={{
                      maxHeight: isOpen ? '800px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className="faq-answer-content">{item.answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="factory-cta-section">
    <div className="container">
      <div className="factory-cta-grid">

        <div className="factory-cta-content">
          <div className="factory-live-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            <span>Live Video Facility Audit Available</span>
          </div>

          <h2 className="factory-cta-title">
            Verify Our <span className="text-cyan">4,000 m² Facility</span> Remotely Before You Place an Order
          </h2>

          <p className="factory-cta-desc">
            We welcome remote quality audits from hospital procurement directors and distributor QA teams. Step into our 3D Virtual Showroom or book a scheduled live video walk-through with our QA managers to inspect cleanroom operations, SMT placement, and environmental testing labs.
          </p>

          <div className="factory-actions-row">
            <Link to="/vr-showroom" className="btn-cta-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
              <span>Launch 3D Virtual Showroom (VR)</span>
            </Link>

            <a href="https://wa.me/8615302654212?text=Hello%20Medke,%20I%20would%20like%20to%20schedule%20a%20live%20video%20factory%20audit." target="_blank" rel="noopener noreferrer" className="btn-cta-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span>Schedule Live Video Audit</span>
            </a>
          </div>
        </div>

        <div className="factory-visual-card">
          <div className="visual-card-header">
            <span className="visual-card-title">Shenzhen Production Facility Metrics</span>
            <span className="visual-card-status">Online Audit Ready</span>
          </div>

          <div className="visual-specs-grid">
            <div className="spec-item-box">
              <div className="spec-item-val">4,000 m²</div>
              <div className="spec-item-lbl">Total Manufacturing Area</div>
            </div>

            <div className="spec-item-box">
              <div className="spec-item-val">Class 100k</div>
              <div className="spec-item-lbl">ISO 7 Medical Cleanroom</div>
            </div>

            <div className="spec-item-box">
              <div className="spec-item-val">30+ Units</div>
              <div className="spec-item-lbl">Precision QC &amp; Test Chambers</div>
            </div>

            <div className="spec-item-box">
              <div className="spec-item-val">100% Tested</div>
              <div className="spec-item-lbl">Electrical &amp; Biocompatibility Checks</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
    </div>
  );
}
