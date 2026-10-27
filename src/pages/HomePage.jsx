import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitInquiry } from '../lib/inquiries';
import './HomePage.css';

/* ==========================================================================
   Static Datasets & Section Configuration (Production /assets/images/... paths)
   ========================================================================== */

/* 1.0 Hero Right Regulatory Certification Logos Marquee */
const HERO_CERT_LOGOS = [
  { name: 'China NMPA', logo: '/assets/images/certs/individual/logo-nmpa.png' },
  { name: 'EU MDR', logo: '/assets/images/certs/individual/logo-eumdr.png' },
  { name: 'TÜV SÜD CE 0123', logo: '/assets/images/certs/individual/logo-ce0123.png' },
  { name: 'US FDA 510(k)', logo: '/assets/images/certs/individual/logo-fda.png' },
  { name: 'ISO 13485:2016', logo: '/assets/images/certs/individual/logo-iso13485.png' },
  { name: 'Saudi SFDA', logo: '/assets/images/certs/individual/logo-sfda.png' },
  { name: 'Russia RZN', logo: '/assets/images/certs/individual/logo-rzn.png' },
  { name: 'MDSAP Global', logo: '/assets/images/certs/individual/logo-mdsap.png' },
];

/* 1. Core Manufacturing Statistics (#stats) */
const STATS = [
  {
    value: '18',
    suffix: '+',
    label: 'Years of Manufacturing',
    subtext: 'Founded in 2008 in Shenzhen',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    value: '4,000',
    suffix: '㎡',
    label: 'Factory & Cleanroom',
    subtext: 'Class 100,000 controlled zone',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    value: '100',
    suffix: '+',
    label: 'Export Destinations',
    subtext: 'EU, Americas, APAC & GCC',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    value: '90',
    suffix: '%+',
    label: 'Monitor Compatibility',
    subtext: 'Direct plug-and-play pinouts',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    value: '350',
    suffix: '+',
    label: 'OEM/ODM Custom Projects',
    subtext: 'Tooling, private labeling & DHF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

/* 2. Compatible Monitor Brands (#brand-marquee) */
const COMPATIBLE_BRANDS = [
  {
    name: 'Philips Medical',
    series: 'IntelliVue MX / MP · SureSigns',
    tag: '8-Pin / 12-Pin Plug & Play',
    logo: '/assets/images/clients/client-logo-philips.png',
  },
  {
    name: 'GE Healthcare',
    series: 'Carescape B450/B650/B850 · Dash',
    tag: '11-Pin Multi-Link · TruSignal',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    ),
  },
  {
    name: 'Mindray',
    series: 'BeneVision N-Series · ePM · uMEC',
    tag: '6-Pin / 7-Pin Validated',
    logo: '/assets/images/clients/client-logo-mindray.png',
  },
  {
    name: 'Dräger Medical',
    series: 'Infinity Delta, Vista · MultiMed',
    tag: 'Pod Cable · Direct 7-Pin',
    logo: '/assets/images/clients/client-logo-drager.png',
  },
  {
    name: 'Nihon Kohden',
    series: 'Life Scope BSM-2300/3000/6000',
    tag: '14-Pin Multi-Parameter',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 12h10M12 7v10" />
      </svg>
    ),
  },
  {
    name: 'Masimo SET®',
    series: 'Radical-7, Rad-97 · Rainbow',
    tag: 'LNCS / RD SET / M-LNCS',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: 'Nellcor™ OxiMax™',
    series: 'N-600x, PM1000N, N-560 Series',
    tag: '9-Pin / 14-Pin Resistor Code',
    iconSvg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    ),
  },
  {
    name: 'Biolight',
    series: 'AnyView A3/A5/A8 · Q-Series',
    tag: 'Digital SpO2 · 5-Lead ECG',
    logo: '/assets/images/clients/client-logo-biolight.png',
  },
  {
    name: 'Edan Instruments',
    series: 'iM3, iM8, iM50 · Elite Series',
    tag: '100% Direct Plug Compatible',
    logo: '/assets/images/clients/client-logo-edan.png',
  },
  {
    name: 'Comen Medical',
    series: 'C50, C80, Star8000 · NC Series',
    tag: 'Custom Molded Connectors',
    logo: '/assets/images/clients/client-logo-comen.png',
  },
  {
    name: 'Schiller AG',
    series: 'ARGUS, CARDIOVIT · DEFIGARD',
    tag: 'DIN · Banana Electrode Cables',
    logo: '/assets/images/clients/client-logo-schiller.png',
  },
  {
    name: 'Bionet',
    series: 'BM3, BM5 · BM7 Series',
    tag: 'Locking 7-Pin Sensor Interface',
    logo: '/assets/images/clients/client-logo-bionet.png',
  },
];

/* 3. 8 Core Product Lines (#products) */
const PRODUCT_LINES = [
  {
    slug: 'spo2',
    name: 'SpO2 Sensors & Cables',
    badge: 'FDA 510(k) · MDR CE',
    desc: 'Reusable finger clips, soft silicone tips, wrap sensors, and disposable adhesive sensors. High accuracy even under low perfusion conditions.',
    specs: ['Class IIb & Class I', 'K152390 Cleared'],
    image: '/assets/images/categories/patient-monitoring.jpg',
  },
  {
    slug: 'ecg',
    name: 'ECG Trunk Cables & Leads',
    badge: 'Defibrillation-Proof',
    desc: '3-lead, 5-lead, and 12-lead trunk cables and telemetry leadwires with TPU low-noise dual shielding and built-in anti-defibrillation protection.',
    specs: ['MDR Class I DoC', 'AHA / IEC Colors'],
    image: '/assets/images/categories/ekg.jpg',
  },
  {
    slug: 'nibp',
    name: 'NIBP Cuffs & Air Tubes',
    badge: 'FDA 510(k) Cleared',
    desc: 'Reusable nylon cuffs and disposable non-woven cuffs from neonate to thigh sizes. Biocompatible TPU bladders and quick-connect fittings.',
    specs: ['510(k) K242623', 'Single/Dual Tube'],
    image: '/assets/images/categories/category-nibp.jpg',
  },
  {
    slug: 'ibp',
    name: 'IBP Cables & Transducers',
    badge: 'Critical Care ICU',
    desc: 'Invasive arterial pressure adapter cables compatible with BD, Utah, Edwards, Abbott, Argon, and PVB transducer systems.',
    specs: ['MDR-IBP-CE-02', '10+ Transducer Pinouts'],
    image: '/assets/images/products/ibp-cable/ibp-cable-01.jpg',
  },
  {
    slug: 'temperature',
    name: 'Temperature Probes',
    badge: 'YSI 400 / 700 Series',
    desc: 'Adult and pediatric skin surface probes, rectal/esophageal probes, and autoclavable general-purpose sensors with ±0.1°C clinical precision.',
    specs: ['EU MDR Class IIb', 'YSI 400 & 700 Compatible'],
    image: '/assets/images/products/temp-probe/temp-probe-01.jpg',
  },
  {
    slug: 'esu',
    name: 'ESU Pencils & Grounding Pads',
    badge: 'Electrosurgical',
    desc: 'Monopolar electrocautery pencils, split grounding plates (REM/CQM), and bipolar coagulating forceps cables engineered for operating rooms.',
    specs: ['HF Surgical Grade', 'Valleylab / ConMed Fit'],
    image: '/assets/images/categories/esu.jpg',
  },
  {
    slug: 'aed',
    name: 'AED Defibrillator Pads',
    badge: 'Emergency Rescue',
    desc: 'Pre-gelled multi-function defibrillation electrode pads for public access AEDs and hospital resuscitation monitors.',
    specs: ['Adult / Pediatric', 'Philips, Zoll, Physio-Control'],
    image: '/assets/images/categories/category-aed.jpg',
  },
  {
    slug: 'eeg',
    name: 'EEG Electrodes & Leads',
    badge: 'Neurology Monitoring',
    desc: 'Gold-plated cup electrodes, Ag/AgCl disposable sensors, and neurology leadwires for sleep labs and intraoperative neuromonitoring (IONM).',
    specs: ['Low Impedance Signal', 'DIN 42802 Standard'],
    image: '/assets/images/categories/category-eeg.jpg',
  },
];

/* 4. Client Logos Matrix (#clients) */
const CLIENT_LOGOS = [
  { name: 'Philips Healthcare', img: '/assets/images/clients/client-logo-philips.png' },
  { name: 'Mindray Medical', img: '/assets/images/clients/client-logo-mindray.png' },
  { name: 'Dräger Medical', img: '/assets/images/clients/client-logo-drager.png' },
  { name: 'Edan Instruments', img: '/assets/images/clients/client-logo-edan.png' },
  { name: 'Biolight', img: '/assets/images/clients/client-logo-biolight.png' },
  { name: 'Comen Medical', img: '/assets/images/clients/client-logo-comen.png' },
  { name: 'Schiller AG', img: '/assets/images/clients/client-logo-schiller.png' },
  { name: 'Bionet', img: '/assets/images/clients/client-logo-bionet.png' },
  { name: 'Huntleigh Healthcare', img: '/assets/images/clients/client-logo-huntleigh.png' },
  { name: 'Withings / Nokia Health', img: '/assets/images/clients/client-logo-nokia-health.png' },
];

/* 5. Regulatory Compliance Cards (#compliance) */
const COMPLIANCE_CERTS = [
  {
    tag: 'QMS Standard',
    title: 'ISO 13485:2016',
    issuer: 'TÜV SÜD Product Service GmbH (NB 0123)',
    rows: [
      { label: 'Certificate No.:', val: 'Q5 085432 0005 Rev. 05', mono: true },
      { label: 'Validity Period:', val: '2026-01-17 ~ 2029-01-16' },
      { label: 'Audited Scope:', val: 'SpO2, ECG, IBP, Temp Probes' },
    ],
    btnText: 'View Certificate →',
    link: '/certificates',
  },
  {
    tag: 'European Union',
    title: 'EU MDR Class IIb CE',
    issuer: 'TÜV SÜD (NB 0123) · Annex IX Chapter I',
    rows: [
      { label: 'Certificate No.:', val: 'G15 085432 0008 Rev. 00', mono: true },
      { label: 'Validity Period:', val: '2026-03-23 ~ 2031-03-22' },
      { label: 'Manufacturer SRN:', val: 'CN-MF-000019638', mono: true },
    ],
    btnText: 'View CE Dossier →',
    link: '/certificates',
  },
  {
    tag: 'United States',
    title: 'US FDA Premarket',
    issuer: 'U.S. Food and Drug Administration (FDA)',
    rows: [
      { label: 'Facility FEI:', val: '3012804266', mono: true },
      { label: 'SpO2 Clearance:', val: '510(k) K152390 (DQA)', mono: true },
      { label: 'NIBP Clearance:', val: '510(k) K242623 (DXQ)', mono: true },
    ],
    btnText: 'View 510(k) Records →',
    link: '/certificates',
  },
  {
    tag: 'Saudi Arabia / GCC',
    title: 'Saudi SFDA Approval',
    issuer: 'Saudi Food and Drug Authority (SFDA)',
    rows: [
      { label: 'Authorization:', val: 'MDMA-2-2026-1892', mono: true },
      { label: 'Market Access:', val: 'Kingdom of Saudi Arabia & GCC' },
      { label: 'Device Class:', val: 'Class II Medical Accessories' },
    ],
    btnText: 'View SFDA Permit →',
    link: '/certificates',
  },
  {
    tag: 'Eurasian Union / Russia',
    title: 'Russia RZN Registration',
    issuer: 'Roszdravnadzor (Federal Healthcare Service)',
    rows: [
      { label: 'Registration No.:', val: 'FSZ 2012/12398', mono: true },
      { label: 'Authorized Products:', val: 'Patient Monitoring Cables & Sensors' },
      { label: 'GOST-R Status:', val: 'Conformity Validated' },
    ],
    btnText: 'View RZN Dossier →',
    link: '/certificates',
  },
];

/* 6. Smart Factory 4 Facility Snapshots (#factory) */
const FACTORY_SNAPSHOTS = [
  {
    title: 'Class 100,000 Cleanroom',
    sub: 'Enclosed positive-pressure environment for clean sensor assembly and packaging.',
    img: '/assets/images/about/cleanroom-real-clean.jpg',
  },
  {
    title: 'Automated Assembly Lines',
    sub: 'Automated stripping, robotic soldering, and high-frequency molding ensuring batch consistency.',
    img: '/assets/images/about/factory-line.png',
  },
  {
    title: 'Reliability & Safety Lab',
    sub: 'In-house bending fatigue, tensile pull, dielectric breakdown, and sterilization validation.',
    img: '/assets/images/about/lab-testing-real-web.jpg',
  },
  {
    title: 'Barcoded Warehouse',
    sub: 'Constant temperature and humidity storage with lot-level ERP traceability for every dispatch.',
    img: '/assets/images/about/factory-warehouse.jpg',
  },
];

/* 7. OEM/ODM 5-Stage Workflow (#oem) */
const OEM_STEPS = [
  {
    num: '01',
    title: 'Requirements & Pinout Analysis',
    desc: 'NDA execution, clinical application scope review, connector geometry validation, and electrical impedance tolerance definition.',
    tag: 'Phase 1 · Day 1-3',
  },
  {
    num: '02',
    title: 'Tooling & Mold Engineering',
    desc: '3D CAD modeling, DFM simulation, in-house precision EDM mold manufacturing, and silicone/TPU material batch compounding.',
    tag: 'Phase 2 · Day 4-10',
  },
  {
    num: '03',
    title: 'Prototyping & Lab Validation',
    desc: 'Rapid working sample build, optical wavelength calibration for SpO2, signal-to-noise ratio bench test, and customer sign-off.',
    tag: 'Phase 3 · Day 11-15',
  },
  {
    num: '04',
    title: 'Mass Production & 100% QC',
    desc: 'ERP lot-controlled cleanroom assembly, automated crimping, laser engraving, serial number tracking, and 100% dielectric Hipot screening.',
    tag: 'Phase 4 · Pilot to Batch',
  },
  {
    num: '05',
    title: 'Regulatory Dossier Support',
    desc: 'Delivery of complete technical documentation (ISO 10993, RoHS, biocompatibility reports) to accelerate your local MDR/FDA registration.',
    tag: 'Phase 5 · Full Compliance',
  },
];

/* 8. Clinical Applications (#applications) */
const CLINICAL_APPS = [
  {
    title: 'Intensive Care Units (ICU / CCU)',
    desc: 'Continuous multi-parameter monitoring cables designed for low drift, high biological safety, and non-stop 24/7 telemetry stability.',
    tag: 'Continuous SpO2 • IBP • ECG',
    img: '/assets/images/applications/icu.png',
  },
  {
    title: 'Operating Rooms (OR)',
    desc: 'High-frequency anti-electrosurgery shielding prevents monitor display interference during active electrocautery cutting and coagulation.',
    tag: 'ESU Grounding • Temperature Probes',
    img: '/assets/images/applications/or.png',
  },
  {
    title: 'Emergency & Resuscitation',
    desc: 'Ruggedized AED defibrillator pads and impact-resistant trunk cables optimized for rapid deployment in mobile paramedic ambulances.',
    tag: 'AED Pads • Portable NIBP Cuffs',
    img: '/assets/images/applications/emergency.png',
  },
  {
    title: 'General Wards & Neonatology',
    desc: 'Cost-effective disposable non-woven cuffs and gentle silicone soft sensors specifically sized to protect delicate premature neonatal skin.',
    tag: 'Neonatal Wrap SpO2 • Soft Cuffs',
    img: '/assets/images/applications/ward.png',
  },
];

/* 9. Global Testimonials (#testimonials) */
const TESTIMONIALS = [
  {
    flag: 'DE',
    stars: 5,
    quote: '"We have procured Medke SpO2 sensors and ECG cables for German university clinics for over 6 years. Their TÜV SÜD ISO 13485 audit trail and MDR compliance make customs clearance and hospital tender approval completely seamless."',
    name: 'Dr. Hans Weber',
    role: 'Director of Procurement, Medizintechnik GmbH (Germany)',
  },
  {
    flag: 'CY',
    stars: 5,
    quote: '"In our Mediterranean distributor network, Medke’s NIBP cuffs and IBP adapter cables have delivered zero return rates. The connector fit with Philips and Mindray monitors is identical to OEM originals at a fraction of the budget."',
    name: 'Elena Constantinou',
    role: 'Supply Chain Lead, Healthline Solutions (Cyprus)',
  },
  {
    flag: 'JP',
    stars: 5,
    quote: '"Japanese hospitals demand uncompromising mechanical finishing and clean packaging. Medke’s Class 100,000 cleanroom and biocompatibility test reports met every single requirement of our internal audit team."',
    name: 'Kenji Takahashi',
    role: 'Senior Product Manager, Tokyo Medical Supplies (Japan)',
  },
  {
    flag: 'BR',
    stars: 5,
    quote: '"Fast OEM sample delivery is where Medke truly outperforms other Asian suppliers. We received custom molded telemetry cable samples in 12 days and scaled up to 30,000 units within our target launch window."',
    name: 'Rodrigo Silveira',
    role: 'Chief Technology Officer, Hospicare Brasil (Brazil)',
  },
  {
    flag: 'SA',
    stars: 5,
    quote: '"Having official SFDA MDMA approval ready in Riyadh saved us over 8 months in tender preparation. Medke\'s team provided full technical dossier support and consistent temperature probe calibration data."',
    name: 'Tariq Al-Mansoor',
    role: 'Head of Biomedical Engineering, Al-Noor Healthcare (Saudi Arabia)',
  },
  {
    flag: 'UK',
    stars: 5,
    quote: '"Our NHS trust suppliers require strict batch electrical testing and UKCA/MHRA listings. Medke\'s 100% Hipot screening and MedNet EC-REP credentials give our clinical procurement committee absolute peace of mind."',
    name: 'Sarah Jenkins',
    role: 'Clinical Procurement Advisor, Apex Healthcare UK (United Kingdom)',
  },
];

/* ==========================================================================
   Main Component: HomePage
   ========================================================================== */
export default function HomePage() {
  const navigate = useNavigate();

  // Video modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Inquiry Form State
  const [values, setValues] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    product: 'spo2',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [honeypot, setHoneypot] = useState('');
  const formStartedAt = useRef(Date.now());

  // ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setVideoModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Form submit handler
  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) {
      alert('Please complete all required fields.');
      return;
    }

    const productMap = {
      spo2: 'SpO2 Sensors & Extension Cables',
      ecg: 'ECG Trunk Cables & Leadwires',
      nibp: 'NIBP Blood Pressure Cuffs & Tubes',
      ibp: 'IBP Cables & Transducers',
      temp: 'Medical Temperature Probes',
      esu: 'Electrosurgical (ESU) Accessories',
      aed: 'AED Defibrillation Electrodes',
      eeg: 'EEG Electrodes & Leads',
      oem: 'Custom OEM / ODM Development',
      'full-catalog': 'Complete Full Product Catalog',
    };

    setStatus('submitting');
    try {
      const res = await submitInquiry(
        {
          name: values.name.trim(),
          company: values.company.trim() || undefined,
          country: values.country.trim() || undefined,
          email: values.email.trim(),
          phone: values.phone.trim() || undefined,
          product_name: productMap[values.product] || values.product,
          inquiry_type: 'General Product Inquiry / RFQ',
          message: values.message.trim(),
        },
        { honeypotValue: honeypot, formStartedAt: formStartedAt.current }
      );

      if (res.blocked) {
        setStatus('idle');
        return;
      }

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
    <div className="home-page">
      {/* ========================================================================
          SECTION 1: HERO
          ======================================================================== */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-content-body">
                <div className="hero-badge-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Direct Medical Manufacturer · Est. 2008
                </div>

                <h1 className="hero-title">
                  Direct Manufacturer of <span className="highlight">Patient Monitoring</span> Cables &amp; Medical Sensors
                </h1>

                <p className="hero-lead">
                  Delivering ISO 13485:2016 audited, EU MDR CE certified, and US FDA 510(k) cleared patient monitoring accessories. Providing healthcare facilities and global distributors with 100% plug-and-play signal precision, biological safety, and OEM engineering agility.
                </p>

                <div className="hero-checklist">
                  <div className="checklist-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>TÜV SÜD ISO 13485:2016 &amp; MDR CE</span>
                  </div>
                  <div className="checklist-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>US FDA FEI 3012804266 &amp; 510(k) Cleared</span>
                  </div>
                  <div className="checklist-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>100% Electrical &amp; Hipot Safety Testing</span>
                  </div>
                  <div className="checklist-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Fast OEM/ODM Prototyping (7-15 Days)</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <a href="#rfq" className="btn-primary-home">
                    Get Factory Pricing &amp; Samples
                  </a>
                  <Link to="/certificates" className="btn-secondary-home">
                    Verify Regulatory Records →
                  </Link>
                </div>
              </div>

              {/* Left Bottom Reassurance Strip (Strict 52px Equal-Height with Right Cert Strip) */}
              <div className="hero-trust-reassurance">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>
                  <strong>Direct Factory Assurance:</strong> Biocompatible medical TPU · 100% signal matched pinouts · Free evaluation samples
                </span>
              </div>
            </div>

            {/* Hero Right Visual Column */}
            <div className="hero-visual-col">
              <div className="hero-visual-card">
                <div className="hero-img-container">
                  <img
                    src="/assets/images/about/factory-01.jpg"
                    alt="Medke Headquarters & Manufacturing Center"
                    className="hero-main-img"
                  />
                  <div className="hero-img-tag">
                    <span className="live-dot"></span>
                    Bao'an, Shenzhen Plant
                  </div>

                  {/* High-End Frosted Glass Floating Badge */}
                  <div className="floating-badge-v3">
                    <div className="floating-badge-top">
                      <div className="floating-badge-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>TÜV SÜD Audited QMS</span>
                      </div>
                      <div className="live-status-pill">
                        <span className="dot"></span>
                        Active &amp; Valid
                      </div>
                    </div>
                    <div className="floating-badge-desc">
                      <strong>ISO 13485:2016</strong> (Q5 085432 0005) &amp; <strong>EU MDR CE</strong> (G15 085432 0008) · Class 100,000 Cleanroom
                    </div>
                  </div>
                </div>

                <div className="hero-caption-integrated">
                  <div>
                    <div className="caption-title">Medke Headquarters &amp; Manufacturing Center</div>
                    <div className="caption-sub">4,000㎡ ISO 13485 Audited Facility · Class 100,000 Cleanroom</div>
                  </div>
                  <span className="facility-badge">Audited Plant</span>
                </div>
              </div>

              {/* Pure-Icon Infinite Marquee, 52px Height Aligned Baseline */}
              <div
                className="hero-cert-strip-soft"
                title="Global Regulatory Approvals: NMPA, EU MDR, TÜV SÜD CE 0123, US FDA, ISO 13485, SFDA, RZN, MDSAP"
              >
                <div className="hero-cert-marquee-track">
                  {/* Set A */}
                  {HERO_CERT_LOGOS.map((cert, idx) => (
                    <div key={`hero-cert-a-${idx}`} className="hero-cert-capsule" title={cert.name}>
                      <img src={cert.logo} alt={cert.name} />
                    </div>
                  ))}
                  {/* Set B (Duplicate for seamless loop) */}
                  {HERO_CERT_LOGOS.map((cert, idx) => (
                    <div key={`hero-cert-b-${idx}`} className="hero-cert-capsule" aria-hidden="true">
                      <img src={cert.logo} alt={cert.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 2: STATS STRIP
          ======================================================================== */}
      <section className="stats-section" id="stats" aria-label="Manufacturing Scale and Highlights">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, idx) => (
              <div key={idx} className="stat-card-enhanced">
                <div className="stat-icon-wrapper">{s.icon}</div>
                <div className="stat-number-v2">
                  {s.value}
                  <span>{s.suffix}</span>
                </div>
                <div className="stat-label-v2">{s.label}</div>
                <div className="stat-subtext">{s.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 2.5: COMPATIBLE OEM MONITOR BRANDS MARQUEE
          ======================================================================== */}
      <section className="brand-marquee-section" id="brand-marquee" aria-label="Compatible Hospital OEM Patient Monitor Brands">
        <div className="container">
          <div className="brand-marquee-header">
            <div className="brand-marquee-lead">
              <span className="pulse-dot"></span>
              <span className="lead-tag">DIRECT PINOUT COMPATIBILITY</span>
              <span className="lead-divider">|</span>
              <span className="lead-text">100% Plug-and-Play Precision for 90%+ Hospital Patient Monitors Worldwide</span>
            </div>
          </div>
        </div>

        <div className="brand-marquee-wrapper" aria-label="Compatible Monitor Brands Carousel">
          <div className="brand-marquee-track">
            {/* Set 1 */}
            {COMPATIBLE_BRANDS.map((b, i) => (
              <div key={`brand-1-${i}`} className="brand-card-marquee">
                <div className="brand-card-logo-wrap">
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} />
                  ) : (
                    b.iconSvg
                  )}
                </div>
                <div className="brand-card-info">
                  <div className="brand-card-name">{b.name}</div>
                  <div className="brand-card-series">{b.series}</div>
                  <span className="brand-card-tag">{b.tag}</span>
                </div>
              </div>
            ))}

            {/* Set 2 (Identical for seamless loop) */}
            {COMPATIBLE_BRANDS.map((b, i) => (
              <div key={`brand-2-${i}`} className="brand-card-marquee" aria-hidden="true">
                <div className="brand-card-logo-wrap">
                  {b.logo ? (
                    <img src={b.logo} alt={b.name} />
                  ) : (
                    b.iconSvg
                  )}
                </div>
                <div className="brand-card-info">
                  <div className="brand-card-name">{b.name}</div>
                  <div className="brand-card-series">{b.series}</div>
                  <span className="brand-card-tag">{b.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 3: 8 CORE PRODUCT LINES
          ======================================================================== */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Clinical Grade Solutions</span>
            <h2 className="section-title">8 Comprehensive Product Lines for Patient Care</h2>
            <p className="section-desc">
              Precision-engineered medical cables, transducers, and disposable consumables built in full compliance with ISO 10993 biological evaluation and IEC 60601-1 electrical safety standards.
            </p>
          </div>

          <div className="product-grid">
            {PRODUCT_LINES.map((p) => (
              <article key={p.slug} className="product-card">
                <div className="product-thumb-wrap">
                  <span className="product-badge">{p.badge}</span>
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="product-body">
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-meta-specs">
                    {p.specs.map((sp, idx) => (
                      <span key={idx}>{sp}</span>
                    ))}
                  </div>
                  <Link to={`/${p.slug}`} className="product-action">
                    Explore Series &amp; Catalog →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 4: OUR AWESOME CLIENTS (10 LOGOS)
          ======================================================================== */}
      <section className="clients-section" id="clients">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 36 }}>
            <span className="section-pill">OEM Compatibility &amp; Global Trust</span>
            <h2 className="section-title">Trusted for OEM Compatibility by Global Leaders</h2>
            <p className="section-desc">
              Our cables and sensors undergo rigorous benchtop signal testing to match or exceed the performance parameters of industry benchmark systems.
            </p>
          </div>

          <div className="clients-grid">
            {CLIENT_LOGOS.map((c, i) => (
              <div key={i} className="client-card" title={`${c.name} Compatible`}>
                <img src={c.img} alt={`${c.name} Logo`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 5: REGULATORY COMPLIANCE & CERTIFICATIONS
          ======================================================================== */}
      <section className="compliance-section" id="compliance">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Audited &amp; Validated Authority</span>
            <h2 className="section-title">International Medical Regulatory Authorizations</h2>
            <p className="section-desc">
              Medke operates under continuous notified body oversight and maintains active medical device market registrations across Europe, North America, the Middle East, and Eurasia.
            </p>
          </div>

          <div className="cert-grid-5">
            {COMPLIANCE_CERTS.map((c, i) => (
              <div key={i} className="cert-card-v2">
                <div className="cert-status-row">
                  <span className="cert-tag">{c.tag}</span>
                  <span className="cert-valid">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Active
                  </span>
                </div>
                <h3 className="cert-title-v2">{c.title}</h3>
                <div className="cert-issuer-v2">{c.issuer}</div>

                <div className="cert-details-list">
                  {c.rows.map((r, ri) => (
                    <div key={ri} className="cert-detail-row">
                      <span className="cert-detail-label">{r.label}</span>
                      <span className={`cert-detail-val ${r.mono ? 'mono' : ''}`}>{r.val}</span>
                    </div>
                  ))}
                </div>
                <Link to={c.link} className="cert-action-btn-v2">
                  {c.btnText}
                </Link>
              </div>
            ))}
          </div>

          <div className="compliance-cta-banner">
            <div className="compliance-cta-text">
              <h4>Need Official Certificates for Hospital Tender Submission?</h4>
              <p>We provide watermarked original PDF certificates, Declarations of Conformity, and ISO 10993 test reports.</p>
            </div>
            <Link to="/certificates" className="btn-primary-home" style={{ whiteSpace: 'nowrap' }}>
              Request Compliance Dossier →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 6: SMART FACTORY & QC
          ======================================================================== */}
      <section className="factory-section" id="factory">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Industrial Manufacturing Rigor</span>
            <h2 className="section-title">4,000㎡ Modern Production &amp; Testing Facility</h2>
            <p className="section-desc">
              Equipped with Class 100,000 controlled cleanrooms, automated high-precision wire extrusion, ultrasonic welding, and in-house biological and physical stress laboratories.
            </p>
          </div>

          {/* Corporate Video Portal Feature Card */}
          <div className="factory-video-banner">
            <div
              className="video-banner-visual"
              onClick={() => setVideoModalOpen(true)}
              title="Click to watch Medke Corporate Facility Video Tour"
            >
              <img
                src="/assets/images/about/facility-video-cover.jpg"
                alt="Medke Cleanroom &amp; Automated Assembly"
              />
              <div className="video-play-halo">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div className="video-duration-badge">03:45 HD Video</div>
            </div>

            <div className="video-banner-info">
              <div className="video-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                Interactive Factory Virtual Tour
              </div>
              <h3 className="video-title">Take an Inside Look at Medke's Cleanroom &amp; Automated Assembly</h3>
              <p className="video-desc">
                Tour our 4,000㎡ manufacturing operations from raw TPU wire extrusion and Class 100,000 sensor encapsulation to robotic laser soldering and 100% dielectric Hipot screening.
              </p>
              <div className="video-actions">
                <button className="btn-play-trigger" onClick={() => setVideoModalOpen(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch Facility Video (3:45)
                </button>
                <Link to="/vr-showroom" className="btn-virtual-tour">
                  Explore 3D VR Showroom &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Factory Media Snapshots (Static 4-Column Layout as in Prototype) */}
          <div className="factory-media-grid">
            {FACTORY_SNAPSHOTS.map((card, idx) => (
              <div key={idx} className="factory-card">
                <div className="factory-img-wrap">
                  <img src={card.img} alt={card.title} className="factory-img" />
                </div>
                <div className="factory-card-body">
                  <h4 className="factory-card-title">{card.title}</h4>
                  <p className="factory-card-sub">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 3 QC Pillars */}
          <div className="qc-pillars">
            <div className="qc-pillar-item">
              <div className="qc-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <div>
                <h4 className="qc-pillar-title">100% Electrical &amp; Hipot Testing</h4>
                <p className="qc-pillar-desc">
                  Every single cable is 100% verified for conductor continuity, pinout configuration, insulation resistance (&gt;100MΩ), and 3000V AC dielectric withstand before packing.
                </p>
              </div>
            </div>

            <div className="qc-pillar-item">
              <div className="qc-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h4 className="qc-pillar-title">ISO 10993 Biocompatibility</h4>
                <p className="qc-pillar-desc">
                  Medical-grade TPU and silicone raw materials are verified by third-party testing for cytotoxicity, skin irritation, and sensitization to protect sensitive patient skin.
                </p>
              </div>
            </div>

            <div className="qc-pillar-item">
              <div className="qc-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                </svg>
              </div>
              <div>
                <h4 className="qc-pillar-title">100,000+ Flex Bending Durability</h4>
                <p className="qc-pillar-desc">
                  Strain reliefs and Kevlar-reinforced jacket designs undergo multi-angle mechanical flex testing to survive heavy-duty clinical handling in fast-paced ICU environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 7: OEM / ODM WORKFLOW
          ======================================================================== */}
      <section className="oem-section" id="oem">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Custom Medical Engineering</span>
            <h2 className="section-title">5-Stage Structured OEM/ODM Development Cycle</h2>
            <p className="section-desc">
              From proprietary monitor connectors to specialized veterinary sensor geometries, Medke delivers turn-key technical execution backed by rigorous DHF documentation.
            </p>
          </div>

          <div className="workflow-timeline">
            {OEM_STEPS.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-num">{step.num}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-desc">{step.desc}</p>
                <span className="step-tag">{step.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 8: CLINICAL APPLICATIONS
          ======================================================================== */}
      <section className="applications-section" id="applications">
        <div className="container">
          <div className="section-header">
            <span className="section-pill">Point-of-Care Reliability</span>
            <h2 className="section-title">Engineered for Critical Hospital Departments</h2>
            <p className="section-desc">
              Medke cables and sensors operate under the most demanding clinical environments where signal integrity directly safeguards patient lives.
            </p>
          </div>

          <div className="apps-grid">
            {CLINICAL_APPS.map((app, idx) => (
              <div key={idx} className="app-card">
                <div className="app-img-wrap">
                  <img src={app.img} alt={app.title} />
                </div>
                <div className="app-body">
                  <h4 className="app-title">{app.title}</h4>
                  <p className="app-desc">{app.desc}</p>
                  <span className="app-specs-tag">{app.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 9: GLOBAL TESTIMONIALS
          ======================================================================== */}
      <section className="testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 36 }}>
            <span className="section-pill">Verified Client Reviews</span>
            <h2 className="section-title">What Medical Device Buyers Say About Medke</h2>
            <p className="section-desc">
              Trusted by hospital biomedical engineers, procurement directors, and tier-1 medical distributors across Europe, the Americas, Middle East, and Asia.
            </p>
          </div>
        </div>

        <div className="marquee-container" aria-label="Customer Reviews Carousel">
          <div className="marquee-track">
            {/* Set 1 */}
            {TESTIMONIALS.map((t, idx) => (
              <div key={`testi-1-${idx}`} className="testi-card-marquee">
                <div>
                  <div className="testi-stars">{'★'.repeat(t.stars)}</div>
                  <p className="testi-quote">{t.quote}</p>
                </div>
                <div className="testi-author-wrap">
                  <div className="testi-avatar-flag">{t.flag}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Set 2 (Identical for seamless infinite scroll) */}
            {TESTIMONIALS.map((t, idx) => (
              <div key={`testi-2-${idx}`} className="testi-card-marquee" aria-hidden="true">
                <div>
                  <div className="testi-stars">{'★'.repeat(t.stars)}</div>
                  <p className="testi-quote">{t.quote}</p>
                </div>
                <div className="testi-author-wrap">
                  <div className="testi-avatar-flag">{t.flag}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 10: DIRECT FACTORY INQUIRY FORM (#rfq)
          ======================================================================== */}
      <section className="inquiry-section" id="rfq">
        <div className="container">
          <div className="inquiry-grid">
            <div className="inquiry-info">
              <span className="section-pill">Fast Factory Response</span>
              <h3>Request Direct Factory Quotations &amp; Catalog</h3>
              <p>
                Connect directly with Medke’s medical engineering and export sales specialists. Receive comprehensive product catalogs, volume distributor price lists, and sample evaluation packages within 24 hours.
              </p>

              <div className="inquiry-promises">
                <div className="promise-item">
                  <div className="promise-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="promise-text">
                    <h5>Guaranteed 24-Hour Quote Turnaround</h5>
                    <p>Complete BOM pricing breakdown with MOQ and lead-time schedules.</p>
                  </div>
                </div>

                <div className="promise-item">
                  <div className="promise-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="promise-text">
                    <h5>Free Clinical Evaluation Samples</h5>
                    <p>Available for qualified hospital tenders and medical equipment distributors.</p>
                  </div>
                </div>

                <div className="promise-item">
                  <div className="promise-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="promise-text">
                    <h5>Strict NDA &amp; IP Protection</h5>
                    <p>Full confidentiality for custom connector pinouts, moldings, and private labeling.</p>
                  </div>
                </div>
              </div>

              <div className="direct-contacts">
                <div className="contact-line">
                  <strong>Direct Sales Email:</strong>{' '}
                  <a href="mailto:info@medke.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    info@medke.com
                  </a>
                </div>
                <div className="contact-line">
                  <strong>Factory Phone:</strong>{' '}
                  <a
                    href="https://wa.me/8615302654212"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                    title="Click to chat on WhatsApp"
                  >
                    +86 15302654212
                  </a>
                </div>
                <div className="contact-line">
                  <strong>Factory Address:</strong> Units 401 &amp; 503, Bldg A1, Anle Ind. Zone, 172 Hangcheng Rd, Bao'an, Shenzhen, China
                </div>
              </div>
            </div>

            <div className="inquiry-card">
              <form onSubmit={handleInquirySubmit}>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="inquiry-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="full-name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      className="form-input"
                      placeholder="e.g. John Doe"
                      value={values.name}
                      onChange={(e) => setValues({ ...values, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="company-name">
                      Company / Organization <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="company-name"
                      className="form-input"
                      placeholder="e.g. Medizintechnik GmbH"
                      value={values.company}
                      onChange={(e) => setValues({ ...values, company: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="country-region">
                      Country / Region
                    </label>
                    <select
                      id="country-region"
                      className="form-select"
                      value={values.country}
                      onChange={(e) => setValues({ ...values, country: e.target.value })}
                    >
                      <option value="">Select destination country...</option>
                      <option value="Germany">Germany</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Italy">Italy</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Japan">Japan</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Other Countries">Other Countries</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="work-email">
                      Corporate Email <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="work-email"
                      className="form-input"
                      placeholder="john@company.com"
                      value={values.email}
                      onChange={(e) => setValues({ ...values, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone-whatsapp">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      id="phone-whatsapp"
                      className="form-input"
                      placeholder="+1 (555) 000-0000"
                      value={values.phone}
                      onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="target-product">
                      Product Category of Interest <span className="req">*</span>
                    </label>
                    <select
                      id="target-product"
                      className="form-select"
                      value={values.product}
                      onChange={(e) => setValues({ ...values, product: e.target.value })}
                      required
                    >
                      <option value="spo2">SpO2 Sensors &amp; Extension Cables</option>
                      <option value="ecg">ECG Trunk Cables &amp; Leadwires</option>
                      <option value="nibp">NIBP Blood Pressure Cuffs &amp; Tubes</option>
                      <option value="ibp">IBP Cables &amp; Transducers</option>
                      <option value="temp">Medical Temperature Probes</option>
                      <option value="esu">Electrosurgical (ESU) Accessories</option>
                      <option value="aed">AED Defibrillation Electrodes</option>
                      <option value="eeg">EEG Electrodes &amp; Leads</option>
                      <option value="oem">Custom OEM / ODM Development</option>
                      <option value="full-catalog">Complete Full Product Catalog</option>
                    </select>
                  </div>

                  <div className="form-group full">
                    <label className="form-label" htmlFor="inquiry-message">
                      Requirements &amp; Model Numbers <span className="req">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      className="form-textarea"
                      placeholder="Please specify target monitor brand (e.g. Philips MP50, Mindray BeneVision), expected order quantities, or specific cable pinout requirements..."
                      value={values.message}
                      onChange={(e) => setValues({ ...values, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="inquiry-form-footer">
                  <button
                    type="submit"
                    className="inquiry-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Submitting Inquiry...' : 'Submit Inquiry & Request Factory Quote →'}
                  </button>
                  {status === 'error' && (
                    <p style={{ color: '#DC2626', fontSize: 13, marginTop: 8, textAlign: 'center' }}>
                      Failed to submit inquiry. Please try again or email us directly at sales@medke.com.
                    </p>
                  )}
                  <p className="form-privacy-note">
                    🔒 Strictly confidential under NDA. Your contact information is never shared with third parties.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          Interactive Video Modal (Lightbox Window)
          ======================================================================== */}
      <div
        className={`video-modal-backdrop ${videoModalOpen ? 'active' : ''}`}
        id="videoModal"
        onClick={() => setVideoModalOpen(false)}
      >
        <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="video-modal-header">
            <h4>Medke Facility Virtual Tour · Cleanroom &amp; Automated Production</h4>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setVideoModalOpen(false)}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <div className="video-modal-body">
            <div className="video-placeholder-inner">
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(0, 71, 255, 0.2)',
                  color: '#60A5FA',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <h5>Medke Corporate Video Stream</h5>
              <p>
                Experience our Class 100,000 cleanroom, precision automated extrusion, laser robotic soldering, and 100% Hipot dielectric testing procedures in action.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/vr-showroom"
                  className="btn-primary-home"
                  style={{ fontSize: 13, padding: '9px 20px' }}
                  onClick={() => setVideoModalOpen(false)}
                >
                  Enter 3D VR Showroom →
                </Link>
                <a
                  href="#rfq"
                  className="btn-secondary-home"
                  style={{ fontSize: 13, padding: '9px 18px', background: '#1E293B', color: '#FFFFFF', borderColor: '#334155' }}
                  onClick={() => setVideoModalOpen(false)}
                >
                  Request Private Video Audit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
