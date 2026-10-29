import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { submitInquiry } from '../lib/inquiries';
import './ProductsPage.css';

// --- Compatibility Finder Matrix ---
const BRAND_MODELS = {
  philips: {
    name: 'Philips Healthcare',
    models: [
      { id: 'mp50', name: 'IntelliVue MP20 / MP30 / MP50 / MP70' },
      { id: 'mx700', name: 'IntelliVue MX400 / MX500 / MX700 / MX800' },
      { id: 'vm', name: 'SureSigns VM4 / VM6 / VM8 Series' },
      { id: 'mrx', name: 'HeartStart XL / MRx Defibrillator' },
    ],
  },
  ge: {
    name: 'GE Healthcare / Datex-Ohmeda',
    models: [
      { id: 'dash4000', name: 'Dash 2500 / 3000 / 4000 / 5000' },
      { id: 'solar8000', name: 'Solar 8000M / 8000i Modular' },
      { id: 'b40', name: 'CARESCAPE B40 / B20 / V100' },
      { id: 's5', name: 'Datex-Ohmeda S/5 Compact Monitor' },
    ],
  },
  mindray: {
    name: 'Mindray',
    models: [
      { id: 't5', name: 'BeneView T5 / T8 / T9 Series' },
      { id: 'epm12', name: 'ePM 10 / ePM 12 / ePM 12M' },
      { id: 'umec', name: 'uMEC 10 / uMEC 12 Patient Monitor' },
      { id: 'pm8000', name: 'PM-7000 / PM-8000 / PM-9000' },
    ],
  },
  drager: {
    name: 'Dräger Medical',
    models: [
      { id: 'delta', name: 'Infinity Delta / Delta XL / Vista' },
      { id: 'gamma', name: 'Infinity Gamma / Gamma XL' },
      { id: 'evita', name: 'Evita 4 / Evita XL / Savina Ventilator' },
    ],
  },
  'nihon-kohden': {
    name: 'Nihon Kohden',
    models: [
      { id: 'lifescope', name: 'Life Scope TR BSM-6000 / BSM-3000' },
      { id: 'bsm2300', name: 'Life Scope I / VS BSM-2300' },
    ],
  },
  masimo: {
    name: 'Masimo',
    models: [
      { id: 'radical7', name: 'Radical-7 Pulse CO-Oximeter' },
      { id: 'rad97', name: 'Rad-97 Pulse CO-Oximeter' },
    ],
  },
  nellcor: {
    name: 'Nellcor / Covidien',
    models: [
      { id: 'n600', name: 'OxiMax N-560 / N-600 / N-600x' },
    ],
  },
  spacelabs: {
    name: 'Spacelabs Healthcare',
    models: [
      { id: 'ultraview', name: 'Ultraview SL 2400 / 2600 / 2800' },
    ],
  },
};

const DEFAULT_SUITE_ITEMS = [
  { type: 'SpO2 Sensor', pn: 'P8324A', name: 'Adult Reusable SpO2 Sensor (M1191B Repl.)', img: '/assets/images/products/spo2-sensor/spo2-sensor-01.jpg' },
  { type: 'ECG Cable', pn: 'G3106P', name: '5-Lead Dual-Shielded ECG Cable', img: '/assets/images/products/ecg-cable/ecg-cable-01.jpg' },
  { type: 'NIBP Cuff', pn: 'C6711', name: 'Reusable Adult Blood Pressure Cuff & Hose', img: '/assets/images/products/nibp-hose/nibp-hose-01.jpg' },
  { type: 'Temp Probe', pn: 'T1306', name: 'YSI 400 Skin Surface Temperature Probe', img: '/assets/images/products/temp-probe/temp-probe-01.jpg' },
  { type: 'IBP Cable', pn: 'B1201', name: 'Utah/Edwards IBP Transducer Interface Cable', img: '/assets/images/products/ibp-cable/ibp-cable-01.jpg' },
];

const HOT_SEARCH_TAGS = [
  { label: 'M1191B (Philips SpO2)', query: 'M1191B' },
  { label: 'MAX-A (Nellcor SpO2)', query: 'MAX-A' },
  { label: '2017004-001 (GE ECG)', query: '2017004-001' },
  { label: 'DOC-10 (Masimo Cable)', query: 'DOC-10' },
  { label: '0010-30-42719 (Mindray)', query: '0010-30-42719' },
  { label: 'CAM-14 (GE EKG)', query: 'CAM-14' },
  { label: 'Multi-Link (Philips)', query: 'Multi-Link' },
  { label: 'MS20098 (Dräger)', query: 'MS20098' },
];

// --- 8 Featured Clinical High-Runner SKUs (4x2 Matrix) ---
const FEATURED_SKUS = [
  {
    id: 'f-1',
    pn: 'P8324A',
    category: 'SpO2 Sensor',
    oemRef: 'Replaces Philips M1191B / M1191A',
    title: 'Compatible Philips Adult Reusable Soft SpO2 Finger Sensor',
    compat: 'Philips IntelliVue MP/MX, VM Series',
    pinout: '8-Pin D-Sub',
    image: '/assets/images/products/spo2-sensor/spo2-sensor-01.jpg',
    specs: [
      { label: 'Connector', val: '8-Pin D-Sub / Gold Pins' },
      { label: 'Cable Spec', val: '3.0m Medical TPU Jacket' },
      { label: 'Wavelength', val: '660nm / 905nm Precision' },
    ],
  },
  {
    id: 'f-2',
    pn: 'G3106P',
    category: 'ECG / EKG Cable',
    oemRef: 'Replaces GE 2017004-001 / Multi-Link',
    title: 'Compatible GE Healthcare 5-Lead ECG One-Piece Cable (Snap/AHA)',
    compat: 'GE Dash 2500-5000, Solar 8000, B40/B20',
    pinout: '11-Pin Multi-Link',
    image: '/assets/images/products/ecg-cable/ecg-cable-01.jpg',
    specs: [
      { label: 'Connector', val: 'GE 11-Pin Multi-Link Circular' },
      { label: 'Lead Type', val: '5-Lead Snap (AHA / IEC)' },
      { label: 'Defib Protection', val: 'Built-in 10kΩ Resistors' },
    ],
  },
  {
    id: 'f-3',
    pn: 'C6711',
    category: 'NIBP Cuff & Hose',
    oemRef: 'Replaces Philips M1574A / M1599B',
    title: 'Compatible Philips Reusable Adult NIBP Blood Pressure Cuff & Hose',
    compat: 'Philips IntelliVue, SureSigns, Agilent',
    pinout: 'Bayonet Lock',
    image: '/assets/images/products/nibp-hose/nibp-hose-01.jpg',
    specs: [
      { label: 'Cuff Range', val: 'Adult 25.0 - 35.0 cm Limb' },
      { label: 'Air Hose', val: '2.8m Anti-Kink Medical TPU' },
      { label: 'Connector', val: 'Metal Quick-Connect Bayonet' },
    ],
  },
  {
    id: 'f-4',
    pn: 'T1306',
    category: 'Temperature Probe',
    oemRef: 'Replaces Mindray 0010-30-42719 / YSI 400',
    title: 'Compatible Mindray Reusable Skin Surface Temperature Probe',
    compat: 'Mindray BeneView T5/T8, ePM 10/12, uMEC',
    pinout: '2-Pin Round',
    image: '/assets/images/products/temp-probe/temp-probe-01.jpg',
    specs: [
      { label: 'Sensor Type', val: 'YSI 400 Series Thermistor' },
      { label: 'Accuracy', val: '±0.1°C (25°C - 45°C)' },
      { label: 'Cable Spec', val: '3.0m High-Flexibility Silicone' },
    ],
  },
  {
    id: 'f-5',
    pn: 'B1201',
    category: 'IBP Cable',
    oemRef: 'Replaces Utah 650-206 / Edwards Transducers',
    title: 'Compatible Philips to Utah/Edwards Invasive Blood Pressure Cable',
    compat: 'Philips IntelliVue MP50-90, MX700-800',
    pinout: '12-Pin Circular',
    image: '/assets/images/products/ibp-cable/ibp-cable-01.jpg',
    specs: [
      { label: 'Transducer', val: 'Utah / Edwards TruWave 4-Pin' },
      { label: 'Cable Length', val: '3.0m Shielded Medical TPU' },
      { label: 'Dielectric Test', val: '3000V AC Hi-Pot Verified' },
    ],
  },
  {
    id: 'f-6',
    pn: 'F1021',
    category: 'Fetal Monitoring / CTG',
    oemRef: 'Replaces GE Corometrics 5700LAX / 2264AAX',
    title: 'Compatible GE Corometrics Uterine Contraction TOCO Transducer',
    compat: 'Corometrics 120, 170, 250 Series',
    pinout: '7-Pin Flat IPX8',
    image: '/assets/images/categories/fetal.jpg',
    specs: [
      { label: 'Waterproof', val: 'IPX8 Submersible Design' },
      { label: 'Frequency', val: 'High-Sensitivity Strain Gauge' },
      { label: 'Cable Length', val: '2.5m Heavy Duty Medical TPU' },
    ],
  },
  {
    id: 'f-7',
    pn: 'E2101',
    category: 'Electrosurgical ESU',
    oemRef: 'Replaces Covidien ValleyLab E7507 REM',
    title: 'Compatible ValleyLab Universal Split Adult ESU Grounding Plate',
    compat: 'ValleyLab Force FX, FT10, ERBE, Bovie',
    pinout: 'ValleyLab REM',
    image: '/assets/images/products/esu-pad/esu-pad-01.jpg',
    specs: [
      { label: 'Foil Area', val: 'Split Dual-Zone 136 cm²' },
      { label: 'Adhesive', val: 'Biocompatible Conductive Gel' },
      { label: 'Cable Option', val: 'With 3.0m Reusable Cord' },
    ],
  },
  {
    id: 'f-8',
    pn: 'A3101',
    category: 'Defibrillator & AED',
    oemRef: 'Replaces Philips M3713A / M3716A Plus',
    title: 'Compatible Philips HeartStart Adult Multifunction Defibrillator Pads',
    compat: 'Philips HeartStart XL, FR2, FR3, MRx',
    pinout: 'Polarized 2-Pin',
    image: '/assets/images/categories/category-aed.jpg',
    specs: [
      { label: 'Energy Limit', val: 'Up to 360 Joules Biphasic' },
      { label: 'Shelf Life', val: '24 Months Sealed Foil' },
      { label: 'Functions', val: 'Pacing, Defib & ECG Monitor' },
    ],
  },
];

export default function ProductsPage() {
  // Compatibility Finder State
  const [selectedBrand, setSelectedBrand] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [suiteVisible, setSuiteVisible] = useState(false);
  const [customMatchVisible, setCustomMatchVisible] = useState(false);
  const [suiteTitle, setSuiteTitle] = useState('');

  // OEM Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedPn, setHighlightedPn] = useState('');

  // RFQ Modal State
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqProduct, setRfqProduct] = useState({
    pn: 'ALL-CATALOG',
    title: 'General Products Inquiry',
    img: '/assets/images/placeholder.svg',
  });
  const [modalFormValues, setModalFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    qty: '10-50 pcs',
    message: '',
  });

  // Lightbox Modal State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxData, setLightboxData] = useState({
    src: '',
    title: '',
    desc: '',
  });

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpen, setToastOpen] = useState(false);

  // Bottom Form State
  const [bottomFormValues, setBottomFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    categories: ['spo2', 'ecg'],
  });
  const [bottomStatus, setBottomStatus] = useState('idle');
  const navigate = useNavigate();
  const [modalStatus, setModalStatus] = useState('idle');
  const [modalError, setModalError] = useState('');
  const formStartedAt = useRef(Date.now() - 3000);

  // Show Toast Helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastOpen(true);
    setTimeout(() => {
      setToastOpen(false);
    }, 4500);
  };

  // Compatibility Selectors
  const handleBrandChange = (e) => {
    const val = e.target.value;
    setSelectedBrand(val);
    setSelectedModel('');
    setSuiteVisible(false);
    setCustomMatchVisible(false);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSuiteVisible(false);
    setCustomMatchVisible(false);
  };

  const handleGenerateSuite = () => {
    if (selectedBrand === 'custom' || selectedModel === 'custom') {
      const bName = selectedBrand === 'custom' ? (customBrand || 'Custom Brand') : BRAND_MODELS[selectedBrand]?.name;
      const mName = selectedModel === 'custom' ? (customModel || 'Custom Model') : selectedModel;
      setSuiteTitle(`${bName} (${mName})`);
      setCustomMatchVisible(true);
      setSuiteVisible(false);
    } else if (selectedBrand && selectedModel) {
      const bName = BRAND_MODELS[selectedBrand]?.name || selectedBrand;
      const mObj = BRAND_MODELS[selectedBrand]?.models.find((m) => m.id === selectedModel);
      const mName = mObj?.name || selectedModel;
      setSuiteTitle(`${bName} (${mName})`);
      setSuiteVisible(true);
      setCustomMatchVisible(false);
    }
  };

  // Search & Filter
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const lower = val.trim().toLowerCase();
    if (!lower) {
      setHighlightedPn('');
      return;
    }
    const match = FEATURED_SKUS.find(
      (s) => s.pn.toLowerCase().includes(lower) || s.oemRef.toLowerCase().includes(lower)
    );
    if (match) {
      setHighlightedPn(match.pn);
    } else {
      setHighlightedPn('');
    }
  };

  const handleApplyHotSearch = (query) => {
    setSearchQuery(query);
    handleSearchChange(query);
    const catalogEl = document.getElementById('sku-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Modal Handlers
  const openRfqModal = (pn, title, img) => {
    setRfqProduct({
      pn,
      title,
      img: img || '/assets/images/placeholder.svg',
    });
    setModalStatus('idle');
    setModalError('');
    setRfqModalOpen(true);
  };

  const closeRfqModal = () => {
    setRfqModalOpen(false);
  };

  const openLightbox = (src, title, desc) => {
    setLightboxData({ src, title, desc });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // ESC key to close modals
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        closeRfqModal();
        closeLightbox();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Modal Submit
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalFormValues.name.trim() || !modalFormValues.email.trim()) {
      setModalError('Please provide your name and business email.');
      return;
    }
    setModalStatus('submitting');
    setModalError('');
    try {
      const pnText = rfqProduct.pn || 'Direct Sample/Quote';
      const titleText = rfqProduct.title || 'All Products Catalog';
      const qtyText = modalFormValues.qty || 'Free Clinical Sample (1-2 pcs)';
      const reqText = modalFormValues.message.trim();

      const fullMessage = reqText
        ? `Target Product: ${pnText} (${titleText})\nTarget Quantity: ${qtyText}\nRequirements / Monitor Model: ${reqText}`
        : `Target Product: ${pnText} (${titleText})\nTarget Quantity: ${qtyText}\nClinical sample / quote request from All Products page.`;

      const isSample = pnText === 'FREE-SAMPLE' || qtyText.toLowerCase().includes('sample');
      const inqType = isSample ? 'Free Clinical Sample Request' : 'Product Quote & Sample Request';

      const res = await submitInquiry(
        {
          name: modalFormValues.name.trim(),
          email: modalFormValues.email.trim(),
          phone: modalFormValues.phone.trim() || undefined,
          product_name: `${pnText} - ${titleText}`,
          quantity_text: qtyText,
          inquiry_type: inqType,
          message: fullMessage,
          source: 'products_page_modal',
        },
        { honeypotValue: '', formStartedAt: formStartedAt.current }
      );

      if (res.blocked) {
        setModalStatus('idle');
        return;
      }

      if (res.ok) {
        closeRfqModal();
        setModalFormValues({ name: '', email: '', phone: '', qty: '10-50 pcs', message: '' });
        navigate(`/inquiry/success?ref=${res.ref}`);
      } else {
        setModalStatus('error');
        setModalError('Submission failed. Please try again or reach us via WhatsApp.');
      }
    } catch (err) {
      setModalStatus('error');
      setModalError(err.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  // Bottom Form Submit
  const handleBottomSubmit = async (e) => {
    e.preventDefault();
    if (!bottomFormValues.name.trim() || !bottomFormValues.email.trim()) {
      return;
    }
    setBottomStatus('submitting');
    try {
      const categoryNames = {
        spo2: 'SpO2 Sensors & Cables',
        ecg: 'ECG / EKG Cables & Leads',
        nibp: 'NIBP Cuffs & Hoses',
        temp: 'Medical Temperature Probes',
        ibp: 'IBP Cables & Transducers',
        oem: 'Custom OEM / ODM Solutions',
      };
      const selectedCats = bottomFormValues.categories.map((c) => categoryNames[c] || c).join(', ');
      const userMessage = bottomFormValues.message.trim();
      const fullMessage = userMessage
        ? `${userMessage}\n\n[Interested Product Categories: ${selectedCats || 'General Catalog'}]`
        : `Direct RFQ and volume pricing inquiry for: ${selectedCats || 'General Medical Cable & Sensor Catalog'}.`;

      const res = await submitInquiry(
        {
          name: bottomFormValues.name.trim(),
          email: bottomFormValues.email.trim(),
          phone: bottomFormValues.phone.trim() || undefined,
          company: bottomFormValues.company.trim() || undefined,
          product_name: selectedCats || 'All Products Catalog RFQ',
          inquiry_type: 'Direct RFQ & Volume Pricing Inquiry',
          message: fullMessage,
          source: 'products_page_bottom_rfq',
        },
        { honeypotValue: '', formStartedAt: formStartedAt.current }
      );

      if (res.blocked) {
        setBottomStatus('idle');
        return;
      }

      if (res.ok) {
        setBottomStatus('success');
        setBottomFormValues({ name: '', email: '', phone: '', company: '', message: '', categories: ['spo2', 'ecg'] });
        navigate(`/inquiry/success?ref=${res.ref}`);
      } else {
        setBottomStatus('error');
      }
    } catch {
      setBottomStatus('error');
    }
  };

  const handleCategoryCheckbox = (cat) => {
    setBottomFormValues((prev) => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat],
      };
    });
  };

  // Filtered SKUs
  const displayedSkus = FEATURED_SKUS.filter((sku) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sku.pn.toLowerCase().includes(q) ||
      sku.oemRef.toLowerCase().includes(q) ||
      sku.title.toLowerCase().includes(q) ||
      sku.compat.toLowerCase().includes(q)
    );
  });

  return (
    <div className="products-page">
      {/* ========================================================================
          SECTION 1: Trust & Authority Bar
          ======================================================================== */}
      <section className="trust-hero-section">
        <div className="container">
          <div className="trust-hero-top">
            <div className="trust-hero-content">
              <div className="trust-badge-pill">
                <span className="pulse-dot"></span>
                Direct Medical Manufacturer Since 2008 &middot; Shenzhen, China
              </div>
              <h1 className="trust-hero-title">
                Complete Medical Cable &amp; Sensor Solutions <br />
                <span>5,000+ Active SKUs</span> &middot; 98%+ Global Compatibility
              </h1>
              <p className="trust-hero-desc">
                Shenzhen Medke Technology Co., Ltd. supplies hospitals, biomedical service teams, and medical distributors in 100+ countries with factory-direct, MDR Class IIb &amp; ISO 13485 certified patient monitoring accessories and custom OEM cable assemblies.
              </p>
            </div>
          </div>

          {/* 4 Core Capability Stat Cards */}
          <div className="trust-stats-grid">
            <div className="stat-card-trust">
              <div className="stat-num-row">
                <span className="stat-num-trust">5,000+</span>
              </div>
              <span className="stat-label-trust">Active Catalog SKUs</span>
              <span className="stat-sub-trust">Immediate stock for high-demand lines</span>
            </div>

            <div className="stat-card-trust">
              <div className="stat-num-row">
                <span className="stat-num-trust">100+</span>
              </div>
              <span className="stat-label-trust">Monitor Brands Compatible</span>
              <span className="stat-sub-trust">Philips, GE, Mindray, Dräger, Masimo &amp; more</span>
            </div>

            <div className="stat-card-trust">
              <div className="stat-num-row">
                <span className="stat-num-trust">4,000㎡</span>
              </div>
              <span className="stat-label-trust">ISO Class 100k Cleanroom</span>
              <span className="stat-sub-trust">Automated extrusion, molding &amp; assembly</span>
            </div>

            <div className="stat-card-trust">
              <div className="stat-num-row">
                <span className="stat-num-trust">100%</span>
              </div>
              <span className="stat-label-trust">Hipot &amp; Pinout Tested</span>
              <span className="stat-sub-trust">Zero-defect dielectric screening before pack</span>
            </div>
          </div>

          {/* Regulatory Certifications & Factory Guarantee Strip */}
          <div className="cert-proof-strip">
            <div className="cert-strip-left">
              <span className="cert-strip-label">Global Approvals:</span>
              <div className="cert-badges-row">
                <div className="cert-badge-item" title="TÜV SÜD ISO 13485:2016 Medical Quality Management">
                  <img src="/assets/images/certs/individual/logo-iso13485.png" alt="ISO 13485" />
                  TÜV ISO 13485:2016
                </div>
                <div className="cert-badge-item" title="EU MDR CE 0123 Class IIb Certified">
                  <img src="/assets/images/certs/individual/logo-ce0123.png" alt="CE 0123" />
                  EU MDR CE 0123
                </div>
                <div className="cert-badge-item" title="US FDA 510(k) Cleared & FEI Registered">
                  <img src="/assets/images/certs/individual/logo-fda.png" alt="FDA 510k" />
                  US FDA 510(k)
                </div>
                <div className="cert-badge-item" title="China NMPA Medical Device Registration">
                  <img src="/assets/images/certs/individual/logo-nmpa.png" alt="NMPA" />
                  China NMPA
                </div>
                <div className="cert-badge-item" title="Saudi Arabia SFDA Medical Device Registration">
                  <img src="/assets/images/certs/individual/logo-sfda.png" alt="Saudi SFDA" />
                  Saudi SFDA
                </div>
                <div className="cert-badge-item" title="Russia RZN Roszdravnadzor Registration">
                  <img src="/assets/images/certs/individual/logo-rzn.png" alt="Russia RZN" />
                  Russia RZN
                </div>
              </div>
            </div>

            <div className="factory-badges-row">
              <span className="factory-tag-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                Same-Day Dispatch Ready
              </span>
              <span className="factory-tag-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                Free Clinical Trial Samples
              </span>
              <span className="factory-tag-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                MOQ: 10 pcs Flexible Orders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 2: Device Compatibility Finder & OEM Cross-Reference
          ======================================================================== */}
      <section className="finder-section" id="finder">
        <div className="container">
          <div className="finder-header">
            <span className="finder-tag">Fast Compatibility Engine</span>
            <h2 className="finder-title">Find Compatible Accessories by Device Model or OEM P/N</h2>
            <p className="finder-desc">
              Stop scrolling through thousands of lines. Select your patient monitor brand and series below to generate the complete verified accessory package in seconds.
            </p>
          </div>

          <div className="finder-box-card">
            {/* 3-Step Device Selector */}
            <div className="step-selector-grid">
              <div className="step-field-group">
                <label className="step-label" htmlFor="brandSelect">
                  <span className="step-badge-num">1</span>
                  Select Monitor Brand
                </label>
                <div className="select-custom-wrap">
                  <select
                    id="brandSelect"
                    className="select-custom"
                    value={selectedBrand}
                    onChange={handleBrandChange}
                  >
                    <option value="">-- Choose Brand (e.g. Philips) --</option>
                    <option value="philips">Philips Healthcare</option>
                    <option value="ge">GE Healthcare / Datex-Ohmeda</option>
                    <option value="mindray">Mindray</option>
                    <option value="drager">Dräger Medical</option>
                    <option value="nihon-kohden">Nihon Kohden</option>
                    <option value="masimo">Masimo</option>
                    <option value="nellcor">Nellcor / Covidien</option>
                    <option value="spacelabs">Spacelabs Healthcare</option>
                    <option value="custom">+ Other / Custom Brand...</option>
                  </select>
                  <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {selectedBrand === 'custom' && (
                  <input
                    type="text"
                    className="custom-field-input"
                    placeholder="Enter your monitor brand name (e.g. Edan, Comen, Biolight)..."
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                  />
                )}
              </div>

              <div className="step-field-group">
                <label className="step-label" htmlFor="modelSelect">
                  <span className="step-badge-num">2</span>
                  Select Monitor Series / Model
                </label>
                <div className="select-custom-wrap">
                  <select
                    id="modelSelect"
                    className="select-custom"
                    value={selectedModel}
                    onChange={handleModelChange}
                    disabled={!selectedBrand}
                  >
                    <option value="">
                      {!selectedBrand ? '-- First choose a brand above --' : '-- Select Series / Model --'}
                    </option>
                    {selectedBrand && selectedBrand !== 'custom' && BRAND_MODELS[selectedBrand]?.models.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                    {selectedBrand && (
                      <option value="custom">+ Enter Custom Model...</option>
                    )}
                  </select>
                  <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                </div>
                {selectedModel === 'custom' && (
                  <input
                    type="text"
                    className="custom-field-input"
                    placeholder="Enter specific monitor model/series (e.g. B20, K12, iM8)..."
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                  />
                )}
              </div>

              <div className="step-field-group">
                <label className="step-label" style={{ visibility: 'hidden' }}>Action</label>
                <button
                  className="btn-generate-suite"
                  disabled={!selectedBrand || !selectedModel}
                  onClick={handleGenerateSuite}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  Show Compatible Accessories
                </button>
              </div>
            </div>

            {/* Suite Result Display Area (Dynamic) */}
            {suiteVisible && (
              <div className="suite-result-container">
                <div className="suite-result-header">
                  <div className="suite-header-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Verified Accessories for <span style={{ color: 'var(--cta)', marginLeft: 4 }}>{suiteTitle}</span>
                    <span className="suite-badge-count">5 Matched Accessories</span>
                  </div>
                </div>

                <div className="suite-cards-grid">
                  {DEFAULT_SUITE_ITEMS.map((item) => (
                    <div key={item.pn} className="suite-item-card">
                      <span className="suite-item-type">{item.type}</span>
                      <img src={item.img} alt={item.name} className="suite-item-img" />
                      <span className="suite-item-pn">{item.pn}</span>
                      <span className="suite-item-name">{item.name}</span>
                      <button
                        className="btn-card-rfq"
                        style={{ marginTop: 'auto' }}
                        onClick={() => openRfqModal(item.pn, item.name, item.img)}
                      >
                        Select &amp; Quote
                      </button>
                    </div>
                  ))}
                </div>

                <div className="suite-actions-bar">
                  <span className="suite-notice-text">
                    <span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: 4 }}>✓</span> 100% Signal Match Tested &middot; Standard Hospital Warranty &middot; In Stock for Prompt Dispatch
                  </span>
                  <button
                    className="btn-suite-rfq"
                    onClick={() => openRfqModal('FULL-SUITE-PACKAGE', `Complete 5-SKU Accessory Package for ${suiteTitle}`)}
                  >
                    Request Full Package Quote (5 SKUs) &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Custom Engineering Match Box */}
            {customMatchVisible && (
              <div className="custom-match-box">
                <div className="custom-match-content">
                  <h4 className="custom-match-title">Looking for Accessories for {suiteTitle}?</h4>
                  <p className="custom-match-desc">
                    Our engineering team has pinout schematics and tooling for over 100+ niche and legacy monitor brands. Request a free 1-on-1 pinout match and trial sample.
                  </p>
                </div>
                <button
                  className="btn-custom-match"
                  onClick={() => openRfqModal('CUSTOM-PINOUT-MATCH', `Custom Pinout Match for ${suiteTitle}`)}
                >
                  Request Pinout Match &amp; Sample &rarr;
                </button>
              </div>
            )}

            {/* OEM Part Number Smart Cross-Index Bar */}
            <div className="oem-search-box">
              <div className="oem-search-label-row">
                <span className="oem-search-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                  OEM Part Number Cross-Index Reverse Lookup:
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Type any OEM part number to view immediate direct-replacement Medke stock
                </span>
              </div>

              <div className="oem-input-wrap">
                <svg className="oem-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input
                  type="text"
                  className="oem-search-input"
                  placeholder="Enter OEM P/N (e.g. M1191B, 2017004-001, DOC-10, MAX-A, CAM-14, 0010-30-42719)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <button
                  className="btn-oem-search"
                  onClick={() => {
                    const catalogEl = document.getElementById('sku-catalog');
                    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Filter Catalog
                </button>
              </div>

              {/* Quick Hot Search Tags */}
              <div className="hot-tags-row">
                <span className="hot-tags-title">Popular OEM Searches:</span>
                {HOT_SEARCH_TAGS.map((tag) => (
                  <button
                    key={tag.query}
                    className="hot-tag-btn"
                    onClick={() => handleApplyHotSearch(tag.query)}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 3: Dual Clinical Ecosystem Matrix (品类直达落地页)
          ======================================================================== */}
      <section className="dual-matrix-section" id="matrix">
        <div className="container">
          <div className="matrix-header-block">
            <span className="matrix-eyebrow">Direct Manufacturer Catalog Matrix</span>
            <h2 className="matrix-title">Medke Comprehensive Clinical Accessories Ecosystem</h2>
            <p className="matrix-desc">
              Structured into two major clinical domains: high-turnover Bedside Patient Monitoring lines and high-barrier Critical Care Specialty solutions, backed by in-house mold tooling and custom OEM/ODM capability.
            </p>
          </div>

          {/* Domain A: Core Bedside Patient Monitoring Suite */}
          <div className="domain-cluster-card">
            <div className="domain-cluster-header">
              <div className="domain-cluster-title-wrap">
                <span className="domain-cluster-badge badge-primary">Ecosystem A &middot; High Turnover</span>
                <h3 className="domain-cluster-title">Core Bedside Patient Monitoring Suite</h3>
                <p className="domain-cluster-subtitle">Covering 98% of global ICU/Ward monitors &middot; Direct replacements for Philips, GE, Mindray, Dräger, Nihon Kohden</p>
              </div>
              <span className="domain-cluster-meta">5 Core Vital Sign Lines &middot; 4,800+ Active SKUs</span>
            </div>

            <div className="bedside-lines-grid">
              {/* SpO2 */}
              <Link to="/spo2" className="line-tech-card">
                <div className="line-card-header">
                  <span className="line-badge">1,200+ SKUs</span>
                  <span className="line-tag-dept">ICU &middot; OR &middot; Ward</span>
                </div>
                <div className="line-card-thumb-wrap">
                  <img src="/assets/images/products/spo2-sensor/spo2-reusable.jpg" alt="SpO2 Sensors" />
                </div>
                <h4 className="line-title">SpO2 Sensors &amp; Cables</h4>
                <p className="line-desc">Adult/Pediatric/Infant reusable finger clips, silicone soft-tips, disposable adhesive wraps, and direct/extension trunk cables.</p>
                <div className="line-compat-pills">
                  <span>Philips D-Sub 8-Pin</span>
                  <span>Nellcor OxiMax</span>
                  <span>Masimo LNCS/RD</span>
                </div>
                <div className="line-card-footer">
                  <span className="line-action-link">View SpO2 Products &rarr;</span>
                </div>
              </Link>

              {/* ECG */}
              <Link to="/ecg" className="line-tech-card">
                <div className="line-card-header">
                  <span className="line-badge">1,500+ SKUs</span>
                  <span className="line-tag-dept">CCU &middot; Telemetry &middot; ER</span>
                </div>
                <div className="line-card-thumb-wrap">
                  <img src="/assets/images/products/ecg-cable/ecg-trunk-cable.jpg" alt="ECG Cables" />
                </div>
                <h4 className="line-title">ECG / EKG Cables &amp; Leads</h4>
                <p className="line-desc">3-Lead / 5-Lead / 12-Lead trunk cables, one-piece leadwires, Holter cables, with Snap, Grabber, Banana 4.0mm and DIN plugs.</p>
                <div className="line-compat-pills">
                  <span>GE Multi-Link 11-Pin</span>
                  <span>Mindray 12-Pin</span>
                  <span>Defib Protected</span>
                </div>
                <div className="line-card-footer">
                  <span className="line-action-link">View ECG Products &rarr;</span>
                </div>
              </Link>

              {/* NIBP */}
              <Link to="/nibp" className="line-tech-card">
                <div className="line-card-header">
                  <span className="line-badge">380+ SKUs</span>
                  <span className="line-tag-dept">General Ward &middot; Clinic</span>
                </div>
                <div className="line-card-thumb-wrap">
                  <img src="/assets/images/products/nibp-hose/nibp-reusable-cuff.jpg" alt="NIBP Cuffs" />
                </div>
                <h4 className="line-title">NIBP Cuffs &amp; Air Hoses</h4>
                <p className="line-desc">Full size range from Neonate to Thigh, durable reusable TPU and soft disposable non-woven cuffs with 20+ interchangeable bayonets.</p>
                <div className="line-compat-pills">
                  <span>Philips Bayonet</span>
                  <span>HP / Quick-Click</span>
                  <span>Dual/Single Tube</span>
                </div>
                <div className="line-card-footer">
                  <span className="line-action-link">View NIBP Products &rarr;</span>
                </div>
              </Link>

              {/* Temperature */}
              <Link to="/temperature" className="line-tech-card">
                <div className="line-card-header">
                  <span className="line-badge">480+ SKUs</span>
                  <span className="line-tag-dept">OR &middot; PACU &middot; NICU</span>
                </div>
                <div className="line-card-thumb-wrap">
                  <img src="/assets/images/products/temp-probe/temperature-reusable.jpg" alt="Temp Probes" />
                </div>
                <h4 className="line-title">Temperature Probes</h4>
                <p className="line-desc">High-precision thermistor sensors (±0.1°C), YSI 400 &amp; YSI 700 series, 10K NTC, adult/pediatric skin surface and esophageal/rectal probes.</p>
                <div className="line-compat-pills">
                  <span>YSI 400 / 700 Series</span>
                  <span>Mindray 2-Pin / Round</span>
                  <span>IPX7 Waterproof</span>
                </div>
                <div className="line-card-footer">
                  <span className="line-action-link">View TEMP Products &rarr;</span>
                </div>
              </Link>

              {/* IBP */}
              <Link to="/ibp" className="line-tech-card">
                <div className="line-card-header">
                  <span className="line-badge">240+ SKUs</span>
                  <span className="line-tag-dept">Cath Lab &middot; ICU &middot; OR</span>
                </div>
                <div className="line-card-thumb-wrap">
                  <img src="/assets/images/products/ibp-cable/ibp-cable-big.jpg" alt="IBP Cables" />
                </div>
                <h4 className="line-title">IBP Transducer Cables</h4>
                <p className="line-desc">Precision interface cables connecting patient monitors to disposable pressure transducers across Abbott, Utah, Edwards, BD, Braun and Argon.</p>
                <div className="line-compat-pills">
                  <span>Utah / Edwards 7-Pin</span>
                  <span>BD / Abbott 4-Pin</span>
                  <span>B.Braun / Argon</span>
                </div>
                <div className="line-card-footer">
                  <span className="line-action-link">View IBP Products &rarr;</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Domain B: Specialty & Critical Care Solutions */}
          <div className="domain-cluster-card">
            <div className="domain-cluster-header">
              <div className="domain-cluster-title-wrap">
                <span className="domain-cluster-badge badge-specialty">Ecosystem B &middot; Specialty &amp; Critical Care</span>
                <h3 className="domain-cluster-title">Specialty &amp; Critical Care Solutions</h3>
                <p className="domain-cluster-subtitle">Direct OEM-equivalent performance &middot; Alleviating monopoly pricing across surgical, neonatal, emergency and neuro departments</p>
              </div>
              <span className="domain-cluster-meta">6 Specialty Lines &middot; 1,320+ Active SKUs</span>
            </div>

            <div className="specialty-lines-grid">
              {/* Fetal Monitoring */}
              <Link to="/contact" className="specialty-card">
                <div className="specialty-thumb-col">
                  <img src="/assets/images/categories/fetal.jpg" alt="Fetal Monitoring" />
                </div>
                <div className="specialty-content-col">
                  <div className="specialty-top-tags">
                    <span className="spec-sku-pill">190+ SKUs</span>
                    <span className="spec-dept-pill">Obstetrics &middot; L&amp;D</span>
                  </div>
                  <h4 className="specialty-title">Fetal Monitoring / CTG Probes</h4>
                  <p className="specialty-desc">Ultrasonic Doppler (US) heart rate probes, TOCO contraction transducers, event markers, and belt sets for Philips Avalon and GE Corometrics.</p>
                  <div className="specialty-brands">Compatible with Philips FM20/30/50, GE Corometrics 120/170/250</div>
                </div>
              </Link>

              {/* EEG / EMG */}
              <Link to="/eeg" className="specialty-card">
                <div className="specialty-thumb-col">
                  <img src="/assets/images/categories/category-eeg.jpg" alt="EEG Electrodes" />
                </div>
                <div className="specialty-content-col">
                  <div className="specialty-top-tags">
                    <span className="spec-sku-pill">210+ SKUs</span>
                    <span className="spec-dept-pill">Neurology &middot; Sleep Lab</span>
                  </div>
                  <h4 className="specialty-title">EEG / EMG Neurophysiology</h4>
                  <p className="specialty-desc">Ag/AgCl cast sintered and gold cup disk electrodes, 1.5mm DIN 42802 touch-proof connectors, subdermal needle electrodes, and conductive gels.</p>
                  <div className="specialty-brands">Compatible with Natus, Nihon Kohden, Cadwell, Grass</div>
                </div>
              </Link>

              {/* ESU */}
              <Link to="/esu" className="specialty-card">
                <div className="specialty-thumb-col">
                  <img src="/assets/images/categories/esu.jpg" alt="Electrosurgical ESU" />
                </div>
                <div className="specialty-content-col">
                  <div className="specialty-top-tags">
                    <span className="spec-sku-pill">320+ SKUs</span>
                    <span className="spec-dept-pill">Operating Room &middot; Surgery</span>
                  </div>
                  <h4 className="specialty-title">Electrosurgical (ESU) Pencils &amp; Pads</h4>
                  <p className="specialty-desc">Hand/foot-switch pencils with smoke evacuation, non-stick bipolar forceps, split REM adult/pediatric grounding plates, and adapter cables.</p>
                  <div className="specialty-brands">Compatible with Valleylab, ConMed, Erbe, Bowa, Martin</div>
                </div>
              </Link>

              {/* Defibrillator & AED */}
              <Link to="/aed" className="specialty-card">
                <div className="specialty-thumb-col">
                  <img src="/assets/images/categories/category-aed.jpg" alt="AED Pads" />
                </div>
                <div className="specialty-content-col">
                  <div className="specialty-top-tags">
                    <span className="spec-sku-pill">160+ SKUs</span>
                    <span className="spec-dept-pill">Emergency &middot; EMS &middot; Ambulance</span>
                  </div>
                  <h4 className="specialty-title">Defibrillator &amp; AED Electrodes</h4>
                  <p className="specialty-desc">Pre-gelled adult and pediatric multifunction pacing/defibrillation pads with zero skin burn, low impedance, and high-voltage discharge cables.</p>
                  <div className="specialty-brands">Compatible with Philips HeartStart, Zoll M/R/X Series, Lifepak</div>
                </div>
              </Link>

              {/* Respiratory & Gas Analysis */}
              <Link to="/contact" className="specialty-card">
                <div className="specialty-thumb-col">
                  <img src="/assets/images/categories/ventilator.jpg" alt="Respiratory Sensors" />
                </div>
                <div className="specialty-content-col">
                  <div className="specialty-top-tags">
                    <span className="spec-sku-pill">180+ SKUs</span>
                    <span className="spec-dept-pill">Anesthesia &middot; Respiratory ICU</span>
                  </div>
                  <h4 className="specialty-title">Respiratory &amp; Gas Analysis (ETCO2 / O2)</h4>
                  <p className="specialty-desc">Mainstream/sidestream ETCO2 capnography sensors, galvanic lead-free oxygen fuel cells, precision flow sensors, and hydrophobic water traps.</p>
                  <div className="specialty-brands">Compatible with Dräger, Hamilton, Maquet Servo, GE Datex</div>
                </div>
              </Link>

              {/* Veterinary */}
              <Link to="/contact" className="specialty-card">
                <div className="specialty-thumb-col">
                  <img src="/assets/images/products/spo2-sensor/spo2-disposable.jpg" alt="Veterinary Accessories" />
                </div>
                <div className="specialty-content-col">
                  <div className="specialty-top-tags">
                    <span className="spec-sku-pill">260+ SKUs</span>
                    <span className="spec-dept-pill">Veterinary Hospital &middot; Lab Animal</span>
                  </div>
                  <h4 className="specialty-title">Veterinary Sensors &amp; Cuffs</h4>
                  <p className="specialty-desc">Specialized "Y-Clip" lingual and ear SpO2 sensors for small animals, 5-size color-coded veterinary NIBP cuffs, esophageal ECG/temp stethoscopes.</p>
                  <div className="specialty-brands">Compatible with Mindray Vet, Bionet BM Vet, Edan Vet, Contec</div>
                </div>
              </Link>
            </div>
          </div>

          {/* OEM/ODM Tooling Banner */}
          <div className="matrix-oem-banner" id="oem-banner">
            <div className="oem-banner-content">
              <span className="oem-banner-tag">Engineering Customization</span>
              <h3 className="oem-banner-title">Need Custom Pinouts, Unique Connectors or Private Labeling?</h3>
              <p className="oem-banner-desc">
                Medke operates a 4,000㎡ ISO 13485 facility with in-house mold toolmaking, robotic laser soldering, and precision TPU wire extrusion. We take OEM/ODM projects from schematic to functional samples in as fast as 7&ndash;14 business days.
              </p>
              <div className="oem-spec-highlights">
                <span><span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: 4 }}>✓</span> Low Tooling Costs &middot; MOQ 50-100 pcs</span>
                <span><span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: 4 }}>✓</span> Custom Overmolded Relief &middot; Laser Etching</span>
                <span><span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: 4 }}>✓</span> 100% Signal Integrity &amp; Biocompatibility Tests</span>
              </div>
            </div>
            <div className="oem-banner-action">
              <Link to="/oem-solution" className="btn-oem-inquiry">
                Explore OEM/ODM Solutions &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 4: Featured SKU Catalog Grid (4x2 Matrix - 8 Core High-Runners)
          ======================================================================== */}
      <section className="catalog-section" id="sku-catalog">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--cta)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
                Immediate Hospital Replacements
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent)' }}>
                Featured Clinical High-Runner SKUs
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
                Top 8 high-turnover clinical replacement accessories in stock. Click any image for connector pinout macro view or request instant quote.
              </p>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '8px 16px', borderRadius: 'var(--radius-pill)' }}>
              Showing {displayedSkus.length} of 5,000+ Active SKUs &middot; Same-Day Dispatch Ready
            </div>
          </div>

          <div className="sku-grid-4x2" id="skuGrid">
            {displayedSkus.map((sku) => {
              const isHighlighted = highlightedPn === sku.pn;
              return (
                <article
                  key={sku.id}
                  className={`sku-card ${isHighlighted ? 'highlighted' : ''}`}
                  data-pn={sku.pn}
                >
                  <div className="sku-card-top-bar">
                    <span className="category-label-tag">{sku.category}</span>
                    <span className="stock-badge-green">
                      <span className="stock-dot"></span> In Stock
                    </span>
                  </div>

                  <div
                    className="sku-image-wrap"
                    onClick={() => openLightbox(sku.image, `${sku.pn} (${sku.oemRef})`, `${sku.pinout} connector closeup with gold-plated pins and medical grade overmolding.`)}
                  >
                    <span className="pinout-macro-tag">{sku.pinout}</span>
                    <img src={sku.image} alt={sku.title} className="sku-img" />
                    <div className="zoom-hint-btn" title="Inspect Pinout Macro">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                    </div>
                  </div>

                  <div className="sku-body">
                    <div className="sku-part-row">
                      <span className="sku-medke-pn">{sku.pn}</span>
                      <span className="sku-moq-tag">MOQ: 10 pcs</span>
                    </div>
                    <div className="sku-oem-crossref"><span style={{ marginRight: 4 }}>⇄</span> {sku.oemRef}</div>
                    <h3 className="sku-title">{sku.title}</h3>
                    <div className="sku-compat-tag">
                      <span>Compatible:</span> <strong>{sku.compat}</strong>
                    </div>

                    <ul className="sku-specs-list">
                      {sku.specs.map((s, idx) => (
                        <li key={idx} className="sku-spec-item">
                          <span>{s.label}:</span> <span className="sku-spec-val">{s.val}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="sku-card-actions">
                      <button
                        className="btn-card-rfq"
                        onClick={() => openRfqModal(sku.pn, sku.title, sku.image)}
                      >
                        Quote &amp; Sample
                      </button>
                      <a
                        href={`https://wa.me/8615302654212?text=Inquiry%20for%20Medke%20${sku.pn}%20(${encodeURIComponent(sku.oemRef)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-card-wa"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECTION 5: Bottom Conversion & RFQ Hub
          ======================================================================== */}
      <section className="bottom-conversion-section" id="sample-program">
        <div className="container">
          <div className="bottom-conversion-grid">
            {/* Left Column: Sample Banner & Direct Form */}
            <div>
              {/* Clinical Sample Card */}
              <div className="sample-banner-box">
                <div className="sample-badge-pill">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 5 }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Free Hospital Evaluation Program
                </div>
                <h2 className="sample-banner-title">
                  Request Free Clinical Samples <br />for Biomedical &amp; Hospital Trials
                </h2>
                <p className="sample-banner-desc">
                  We provide qualifying medical distributors, biomedical hospital departments, and clinics with free trial evaluation samples. Test fit, biocompatibility, and signal stability on your actual patient monitors before committing to volume purchases.
                </p>
                <div className="sample-perks-list">
                  <div className="sample-perk-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Zero Sample Cost for Verified Buyers
                  </div>
                  <div className="sample-perk-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Full Test Certificate &amp; Spec Sheet
                  </div>
                  <div className="sample-perk-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Fast Air Courier Dispatch in 48h
                  </div>
                  <div className="sample-perk-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Dedicated Biomedical Engineer Support
                  </div>
                </div>
                <button
                  className="btn-apply-sample"
                  onClick={() => openRfqModal('FREE-SAMPLE', 'Free Clinical Trial Sample Request')}
                >
                  Apply for Free Clinical Trial Samples &rarr;
                </button>
              </div>

              {/* Embedded Direct RFQ Form */}
              <div className="embedded-rfq-card" id="rfq-hub">
                <div className="rfq-card-head">
                  <h3 className="rfq-card-title">Send Direct RFQ &amp; Volume Pricing Inquiry</h3>
                  <p className="rfq-card-desc">
                    Receive factory-direct B2B quotation, tier discounts, and stock status within 1 business day.
                  </p>
                </div>

                <form onSubmit={handleBottomSubmit}>
                  <div className="form-grid-2col">
                    <div className="form-field-group">
                      <label className="form-label" htmlFor="rfqName">Your Name <span className="req">*</span></label>
                      <input
                        type="text"
                        id="rfqName"
                        className="form-input"
                        placeholder="e.g. Dr. David Miller"
                        required
                        value={bottomFormValues.name}
                        onChange={(e) => setBottomFormValues({ ...bottomFormValues, name: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-label" htmlFor="rfqEmail">Business Email <span className="req">*</span></label>
                      <input
                        type="email"
                        id="rfqEmail"
                        className="form-input"
                        placeholder="e.g. david@hospital-supply.com"
                        required
                        value={bottomFormValues.email}
                        onChange={(e) => setBottomFormValues({ ...bottomFormValues, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2col">
                    <div className="form-field-group">
                      <label className="form-label" htmlFor="rfqPhone">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        id="rfqPhone"
                        className="form-input"
                        placeholder="+1 555-0199 or +44 ..."
                        value={bottomFormValues.phone}
                        onChange={(e) => setBottomFormValues({ ...bottomFormValues, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-label" htmlFor="rfqCompany">Hospital / Company / Distributor <span className="req">*</span></label>
                      <input
                        type="text"
                        id="rfqCompany"
                        className="form-input"
                        placeholder="e.g. St. Jude Biomedical Supplies"
                        required
                        value={bottomFormValues.company}
                        onChange={(e) => setBottomFormValues({ ...bottomFormValues, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-label">Product Categories of Interest:</label>
                    <div className="form-checkbox-row">
                      {[
                        { id: 'spo2', label: 'SpO2 Sensors' },
                        { id: 'ecg', label: 'ECG Cables' },
                        { id: 'nibp', label: 'NIBP Cuffs' },
                        { id: 'temp', label: 'Temp Probes' },
                        { id: 'ibp', label: 'IBP Cables' },
                        { id: 'oem', label: 'OEM Custom' },
                      ].map((c) => (
                        <label key={c.id} className="checkbox-pill-label">
                          <input
                            type="checkbox"
                            checked={bottomFormValues.categories.includes(c.id)}
                            onChange={() => handleCategoryCheckbox(c.id)}
                          />
                          {c.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-label" htmlFor="rfqMessage">Requested Part Numbers / Quantities / Monitor Models</label>
                    <textarea
                      id="rfqMessage"
                      className="form-textarea"
                      placeholder="Please list part numbers, target monitor models (e.g. Philips MP50 x 50 pcs), and any sample requirements..."
                      value={bottomFormValues.message}
                      onChange={(e) => setBottomFormValues({ ...bottomFormValues, message: e.target.value })}
                    />
                  </div>

                  {bottomStatus === 'error' && (
                    <div style={{ padding: '10px 14px', background: '#FEE2E2', border: '1px solid #F87171', borderRadius: 'var(--radius-md)', color: '#DC2626', fontSize: 13, marginBottom: 14 }}>
                      Failed to submit inquiry. Please check your network or reach our sales team directly at info@medke.com.
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn-submit-rfq-main"
                    disabled={bottomStatus === 'submitting'}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    {bottomStatus === 'submitting' ? 'Submitting Request...' : 'Submit Request for Factory Quote'}
                  </button>
                  <div className="rfq-privacy-note">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 5 }}>
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Your business data is protected under our NDA &amp; medical confidentiality policy.
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Factory Contacts, Address & FAQ */}
            <div className="factory-contact-card">
              <div>
                <h3 className="contact-block-title">Direct Sales &amp; Factory Contact</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                  Contact our international engineering sales team directly for urgent hospital tenders or OEM inquiries:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div className="contact-item-row">
                    <div className="contact-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Direct Sales Email:</span>
                      <a href="mailto:info@medke.com" className="contact-val-link">info@medke.com</a>
                      <span className="contact-hint">Official inquiry email &middot; 1 business day response</span>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-icon-box" style={{ background: '#ECFDF5', color: '#059669' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.448.74 0.96 1.196.659.586 1.215.767 1.388.854.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" /></svg>
                    </div>
                    <div className="contact-details">
                      <span className="contact-label">Factory Phone / WhatsApp:</span>
                      <a href="https://wa.me/8615302654212" target="_blank" rel="noopener noreferrer" className="contact-val-link">+86 15302654212</a>
                      <span className="contact-hint">Click for immediate 1-on-1 engineer chat</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="factory-address-box">
                <strong>Shenzhen Medke Technology Co., Ltd. (Factory Facility)</strong>
                Units 401 &amp; 503, Bldg A1, Anle Industrial Zone, 172 Hangcheng Rd, Bao'an District, Shenzhen, 518126, Guangdong Province, China.
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-main)', fontWeight: 600 }}>
                  <span style={{ color: 'var(--success)', fontWeight: 'bold', marginRight: 4 }}>✓</span> Facility Audited by TÜV SÜD &middot; ISO 13485:2016 Certified
                </div>
              </div>

              {/* B2B FAQ Accordion */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', marginBottom: 12 }}>
                  Frequently Asked B2B Questions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <details className="faq-accordion-item" open>
                    <summary>How does the Free Clinical Sample evaluation program work?</summary>
                    <div className="faq-accordion-body">
                      Hospital biomedical engineering departments and qualified medical distributors can request complimentary evaluation samples. We dispatch within 48 hours via express courier with full factory QA test reports and biocompatibility certifications.
                    </div>
                  </details>

                  <details className="faq-accordion-item">
                    <summary>Can Medke support custom OEM / ODM development and mold tooling?</summary>
                    <div className="faq-accordion-body">
                      Yes. Medke operates in-house mold toolmaking, plastic injection, and cable extrusion lines. We engineer custom pinouts, specialized overmolds, and private labeling with rapid prototypes ready in 7&ndash;14 business days.
                    </div>
                  </details>

                  <details className="faq-accordion-item">
                    <summary>How does Medke guarantee connector pinout and monitor compatibility?</summary>
                    <div className="faq-accordion-body">
                      All cables are reverse-engineered to exact OEM pinouts and subjected to 100% automated continuity, impedance, and 3,000V AC dielectric withstand testing. We provide a full 12-month zero-risk replacement warranty.
                    </div>
                  </details>

                  <details className="faq-accordion-item">
                    <summary>What is the typical MOQ for repeat orders?</summary>
                    <div className="faq-accordion-body">
                      Standard catalog products have an MOQ of just 10 pcs. Custom overmolded cables start from 50 - 100 pcs.
                    </div>
                  </details>

                  <details className="faq-accordion-item">
                    <summary>Are your cables compatible with OEM warranties?</summary>
                    <div className="faq-accordion-body">
                      Yes, our cables comply with AAMI/ANSI EC53 and ISO 80601-2-61 standards, ensuring full clinical safety without voiding monitor performance.
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          Interactive Modals: RFQ Drawer & Image Lightbox
          ======================================================================== */}
      {/* 1. RFQ Drawer Modal */}
      {rfqModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target.className === 'modal-backdrop') closeRfqModal();
          }}
        >
          <div className="rfq-drawer-card">
            <button className="modal-close-btn" onClick={closeRfqModal}>&times;</button>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', marginBottom: 6 }}>Request Quote &amp; Clinical Sample</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 18 }}>
              Fast response from Medke factory sales team. Please verify your contact details below:
            </p>

            <div className="rfq-product-preview-bar">
              <img src={rfqProduct.img} alt="Preview" className="rfq-preview-img" />
              <div className="rfq-preview-info">
                <div className="rfq-preview-pn">{rfqProduct.pn}</div>
                <div className="rfq-preview-title">{rfqProduct.title}</div>
              </div>
            </div>

            <form onSubmit={handleModalSubmit}>
              {modalError && (
                <div style={{ padding: '10px 14px', background: '#FEE2E2', border: '1px solid #F87171', borderRadius: 'var(--radius-md)', color: '#DC2626', fontSize: 13, marginBottom: 14 }}>
                  {modalError}
                </div>
              )}
              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label className="form-label" htmlFor="mName">Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="mName"
                    className="form-input"
                    required
                    placeholder="Your full name"
                    value={modalFormValues.name}
                    onChange={(e) => setModalFormValues({ ...modalFormValues, name: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-label" htmlFor="mEmail">Business Email <span className="req">*</span></label>
                  <input
                    type="email"
                    id="mEmail"
                    className="form-input"
                    required
                    placeholder="name@company.com"
                    value={modalFormValues.email}
                    onChange={(e) => setModalFormValues({ ...modalFormValues, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2col">
                <div className="form-field-group">
                  <label className="form-label" htmlFor="mPhone">WhatsApp / Mobile</label>
                  <input
                    type="tel"
                    id="mPhone"
                    className="form-input"
                    placeholder="+86 ... or +1 ..."
                    value={modalFormValues.phone}
                    onChange={(e) => setModalFormValues({ ...modalFormValues, phone: e.target.value })}
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-label" htmlFor="mQty">Target Quantity</label>
                  <select
                    id="mQty"
                    className="form-select"
                    value={modalFormValues.qty}
                    onChange={(e) => setModalFormValues({ ...modalFormValues, qty: e.target.value })}
                  >
                    <option value="Sample (1-2 pcs)">Free Clinical Sample (1-2 pcs)</option>
                    <option value="10-50 pcs">Trial Order (10 - 50 pcs)</option>
                    <option value="50-200 pcs">Volume Batch (50 - 200 pcs)</option>
                    <option value="200-1000 pcs">Distributor Stock (200 - 1,000 pcs)</option>
                    <option value="1000+ pcs">Annual OEM Contract (1,000+ pcs)</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group">
                <label className="form-label" htmlFor="mMessage">Target Monitor Model or Specific Requirements</label>
                <textarea
                  id="mMessage"
                  className="form-textarea"
                  placeholder="Specify your monitor model (e.g. Philips MP50) or connector specs..."
                  value={modalFormValues.message}
                  onChange={(e) => setModalFormValues({ ...modalFormValues, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-submit-rfq-main" disabled={modalStatus === 'submitting'}>
                {modalStatus === 'submitting' ? 'Submitting Inquiry...' : 'Send Instant RFQ to Medke Factory'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Connector Image Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target.className === 'modal-backdrop') closeLightbox();
          }}
        >
          <div className="lightbox-card">
            <button className="modal-close-btn" onClick={closeLightbox}>&times;</button>
            <div className="lightbox-img-area">
              <img src={lightboxData.src} alt={lightboxData.title} />
            </div>
            <div className="lightbox-caption-area">
              <h4 className="lightbox-title">{lightboxData.title}</h4>
              <p className="lightbox-desc">{lightboxData.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastOpen && (
        <div className="toast-notification">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
