export const tempLandingData = {
  categoryType: 'TEMP',
  topNotice: {
    badge: 'TÜV SÜD ISO 13485:2016 Certified · FDA 510(k) Cleared (K243000) · CE MDR Class I DoC · SFDA MDMA Listed',
    tagline: 'Factory-Direct Medical Temperature Probes to 100+ Countries | Philips, GE, Mindray, Dräger, Welch Allyn Compatible',
    quoteSpeed: '< 2.4 Hours',
    whatsapp: '+86 15302654212'
  },
  eyebrow: 'DIRECT B2B MANUFACTURER · CLINICAL TEMPERATURE SENSING SOLUTIONS SINCE 2008',
  title: 'Clinical-Grade Temperature Probes & Adapter Cables',
  subtitle: '100% Compatible with Philips, GE, Mindray, Dräger & Welch Allyn',
  lead: 'High-precision NTC thermistor technology engineered for perioperative anesthesia, ICU infection control, NICU radiant warmers, and TurboTemp predictive vitals. Delivering ±0.1°C continuous clinical accuracy across the core physiological range (25.0°C ~ 45.0°C) with fast thermal balance (τ < 10s) and IPX7 immersion disinfection durability.',
  trustBadges: [
    { text: 'TÜV SÜD ISO 13485:2016 Certified', dot: 'bg-emerald-500' },
    { text: 'FDA 510(k) Cleared (K243000 · 6 Models)', dot: 'bg-blue-500' },
    { text: 'EU CE MDR Class I DoC (MDR-TPEC-T0-02)', dot: 'bg-indigo-500' },
    { text: 'Saudi SFDA MDMA Listed (MDMA-2-2026-2681)', dot: 'bg-amber-500' }
  ],
  featureChecklist: [
    '<strong>±0.1°C Clinical Accuracy</strong>: ISO 80601-2-56 compliant',
    '<strong>IPX7 Waterproof</strong>: Immersion liquid disinfection',
    '<strong>YSI 400 & 700 Standards</strong>: Direct 1:1 OEM replacement',
    '<strong>12-Month Factory Warranty</strong>: 100% free replacement guarantee'
  ],
  metrics: [
    {
      value: '±0.1°C High Accuracy',
      title: 'ISO 80601-2-56',
      sub: 'Core Range 25–45°C',
      dot: 'bg-emerald-500',
      nowrap: true
    },
    {
      value: 'IPX7 Waterproof',
      title: 'Immersion Tested',
      sub: '1m Depth / 30 Min',
      dot: 'bg-blue-500',
      nowrap: true
    },
    {
      value: '20+ Monitor Brands',
      title: 'Philips · GE · Mindray',
      sub: 'YSI 400/700 Standard',
      dot: 'bg-amber-500',
      nowrap: true
    },
    {
      value: 'FDA 510(k) Cleared',
      title: 'K243000 (6 Models)',
      sub: 'TÜV SÜD ISO 13485',
      dot: 'bg-indigo-500',
      nowrap: true
    }
  ],

  // Four Core Product Pillars (Single-Row 4-Column in Desktop)
  fourPillars: [
    {
      id: 'reusable',
      tag: 'Pillar 1 · Reusable',
      tagColor: 'bg-blue-100 text-medkeBlue',
      fdaBadge: '✓ FDA 510(k) Cleared (T1306/T2306)',
      fdaBadgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      title: 'Reusable Skin & Cavity Probes (T Series)',
      description: 'Engineered with medical 316L stainless steel and mirror-polished gold-plated discs. Certified IPX7 immersion waterproof for repeated liquid chemical disinfection in glutaraldehyde and sodium hypochlorite.',
      imgSrc: 'https://sc02.alicdn.com/kf/Hc7b4797e78d54c6c9b956a94c5dfb6890.jpg',
      alt: 'Medke T1306 reusable skin temperature probe with yellow connector and medical TPU cable',
      label: 'T1306 / T2306 Reusable',
      specs: [
        { label: 'Skin Surface Disc', text: 'φ9.8mm gold-plated/316L disc with thermal insulated backing.' },
        { label: 'Esophageal / Rectal Bullet', text: 'φ4.0mm adult / φ3.0mm pediatric smooth 316L tip.' },
        { label: 'Cable Construction', text: '3.0m medical TPU with Kevlar core; >10,000 flex cycles.' },
        { label: 'Resistance Standards', text: 'YSI 400 (2.252kΩ) and YSI 700 dual thermistor series.' }
      ],
      moq: 'MOQ: 10 pcs · 12-Month Warranty',
      ctaText: 'Inquire Reusable Probes →',
      productLineName: 'Reusable Temperature Probes'
    },
    {
      id: 'disposable',
      tag: 'Pillar 2 · Disposable',
      tagColor: 'bg-emerald-100 text-emerald-800',
      fdaBadge: '✓ FDA 510(k) Cleared (T5106/T6106)',
      fdaBadgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      title: 'Disposable Infection-Control Probes',
      description: 'Designed for single-patient hospital infection control in OR and ICU. Eliminates cross-contamination of multi-drug resistant organisms (MDRO) with zero cleaning downtime.',
      imgSrc: 'https://sc02.alicdn.com/kf/H2d2f839baaf24baa8bd0f04f48195b71p.jpg',
      alt: 'Medke T5106 disposable skin temperature sensor with reflective foil patch',
      label: 'T5106 Disposable Skin',
      specs: [
        { label: 'Reflective Skin Foil', text: 'Aluminum barrier blocks surgical lamp heat & room convection.' },
        { label: 'Hypoallergenic Adhesion', text: 'Gentle medical acrylic adhesive; safe for fragile neonatal skin.' },
        { label: 'Graduated Depth Cavity', text: 'Smooth sealed tip with visual insertion depth markers.' },
        { label: '100% Safe Composition', text: 'Latex-free, DEHP-free; non-sterile evaluation per FDA K243000.' }
      ],
      moq: 'MOQ: 100 pcs · 24-Month Shelf Life',
      ctaText: 'Inquire Disposable Probes →',
      productLineName: 'Disposable Temperature Probes'
    },
    {
      id: 'adapter-cables',
      tag: 'Pillar 3 · Interconnect',
      tagColor: 'bg-amber-100 text-amber-900',
      fdaBadge: '✓ EU CE MDR Class I DoC',
      fdaBadgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      title: 'Temperature Adapter Cables (T0 Series)',
      description: 'Connect single-patient disposable probes and modular sensors to 20+ monitor instrument ports. Built with twisted-pair shielding to eliminate electrocautery (ESU) surgical RF interference.',
      imgSrc: 'https://sc02.alicdn.com/kf/H968680b57c97452ab0181687625f1c3fp.jpg',
      alt: 'Medke T0205 medical temperature adapter cable with monitor and probe connectors',
      label: 'T0205 Adapter Cable',
      specs: [
        { label: '20+ Instrument Plugs', text: 'Philips 2-pin CN405, GE 11-pin CN404, Mindray 6-pin CN411, Dräger 7-pin.' },
        { label: 'Sensor End Sockets', text: 'Standard 2-pin female socket (CN422/CN423) or 1/4" phone jack.' },
        { label: 'Insertion Durability', text: 'Precision gold-plated spring contacts rated for ≥5,000 cycles.' },
        { label: 'Official Regulatory', text: 'CE MDR DoC (MDR-TPEC-T0-02 v1.0), Saudi SFDA MDMA-2-2026-1845.' }
      ],
      moq: 'Lengths: 2.4m ~ 3.0m · 12-Month Warranty',
      ctaText: 'Inquire Adapter Cables →',
      productLineName: 'Temperature Adapter Cables'
    },
    {
      id: 'turbotemp',
      tag: 'Pillar 4 · Predictive',
      tagColor: 'bg-indigo-100 text-indigo-900',
      fdaBadge: '2~5 Second Reading',
      fdaBadgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      title: 'TurboTemp Rapid Oral & Rectal Probes',
      description: 'Direct MRO replacement handles for GE Dinamap / Carescape and Welch Allyn SureTemp Plus 690 / 679 vital sign spot-check monitors. Dual-color mistake-proofing prevents clinical cross-contamination.',
      imgSrc: 'https://sc02.alicdn.com/kf/H5ca1c0f594774c38a28bfc9f05104b57u.jpg',
      alt: 'Medke T7164 rapid predictive temperature probe compatible with Welch Allyn SureTemp Plus',
      label: 'T7164 · Welch Allyn Compatible',
      specs: [
        { label: 'Oral Probe (Blue)', text: 'Fast 2~5s predictive measurement; GE P/N 2008774-001 equivalent.' },
        { label: 'Rectal Probe (Red)', text: 'Color-coded isolation; GE P/N 2008775-001 equivalent.' },
        { label: 'High-Impact Ergonomics', text: 'Integrated probe cover ejection collar and gold contacts.' },
        { label: 'Retractable Spring Cable', text: 'Heavy-duty coiled cord resists ward trolley tugging.' }
      ],
      moq: 'Coiled / 2.7m Straight · Fast Stock',
      ctaText: 'Inquire TurboTemp Probes →',
      productLineName: 'TurboTemp Predictive Probes'
    }
  ],

  // Universal Compatibility Hub Systems
  tempMonitorSystems: [
    { id: 'philips', code: '05', name: 'Philips IntelliVue', sub: 'MP20-90, MX400-800, M1029A', conn: '2-Pin Round (CN405)', oemRef: '21078A / 21075A' },
    { id: 'ge_marquette', code: '12', name: 'GE Healthcare Marquette', sub: 'Dash 2000-5000, Solar, TRAM', conn: '11-Pin Rect (CN404)', oemRef: '9445-008 / 2008774' },
    { id: 'mindray', code: '18', name: 'Mindray BeneView', sub: 'BeneView T5/T8, ePM, iPM, uMEC', conn: '6-Pin Round (CN411)', oemRef: '0010-30-42721' },
    { id: 'drager', code: '03', name: 'Dräger Infinity', sub: 'Delta, Kappa, Vista, C2000', conn: '7-Pin Metal (CN403)', oemRef: 'MU12533 / 5204642' },
    { id: 'ysi400', code: '07', name: 'YSI 400 Universal Standard', sub: 'Mindray, Comen, Biolight, Edan', conn: '1/4" Phone Jack (CN407)', oemRef: 'Series 400 Direct' },
    { id: 'ysi700', code: '08', name: 'YSI 700 Dual Standard', sub: 'GE-Marquette, HP Legacy, Siemens', conn: 'Dual Banana (CN408)', oemRef: 'Series 700 Dual' },
    { id: 'welch_allyn', code: '63', name: 'Welch Allyn / Dinamap', sub: 'SureTemp Plus 690, Pro 1000', conn: 'Predictive Port (CN463)', oemRef: '02678-100 / 2008774-001' },
    { id: 'ge_ohmeda', code: '20', name: 'GE-Ohmeda / Spacelabs', sub: '10K NTC Care Plus, Incubators', conn: 'Round Multi-Pin (CN520)', oemRef: '6010-0000-001' }
  ],

  // Universal Compatibility Hub Sensor Types
  tempSensorTypes: [
    { id: 'adult_cavity', typeCode: '2', name: 'Adult Esophageal / Rectal', sub: 'φ4.0mm Smooth Bullet 316L, 3.0m', cat: 'Reusable Cavity Probe' },
    { id: 'adult_skin', typeCode: '1', name: 'Adult Skin Surface Disc', sub: 'φ9.8mm Gold Disc with Backing, 3.0m', cat: 'Reusable Skin Probe' },
    { id: 'ped_cavity', typeCode: '4', name: 'Pediatric Cavity Probe', sub: 'φ3.0mm Ultra-Soft Bullet, 3.0m', cat: 'Reusable Pediatric Cavity' },
    { id: 'ped_skin', typeCode: '3', name: 'Pediatric Skin Probe', sub: 'φ9.5mm Lightweight Disc, 3.0m', cat: 'Reusable Pediatric Skin' },
    { id: 'disp_skin', typeCode: '5', name: 'Disposable Skin Patch (Foil)', sub: 'Reflective Foil + Hypoallergenic Foam', cat: 'Disposable Skin Sensor' },
    { id: 'disp_cavity', typeCode: '6', name: 'Disposable Cavity Probe', sub: 'Graduated Depth Insertion Line', cat: 'Disposable Cavity Probe' },
    { id: 'adapter_cable', typeCode: '0', name: 'Adapter / Extension Cable', sub: 'Connects Probes to Monitor End', cat: 'Temperature Adapter Cable' },
    { id: 'turbotemp', typeCode: '7', name: 'TurboTemp Predictive Probe', sub: '2~5s Spot Oral/Rectal Handle', cat: 'Predictive Fast Probe' }
  ],

  // Manufacturing & Quality Trust Proof
  trustProof: {
    badge: 'GLOBAL REGULATORY CLEARANCES & 4,000 ㎡ ADVANCED MANUFACTURING',
    title: 'Strict Medical QA Compliance Built on 18 Years of Engineering',
    description: 'Shenzhen Medke Technology operates certified dust-free cleanrooms, automated precision thermistor calibration water baths, and electrical reliability test rigs to ensure zero-defect clinical safety.',
    factories: [
      {
        title: 'Class 100,000 Cleanroom Plant',
        desc: 'ISO 14644-1 dust-free micro-soldering, biocompatible sensor encapsulation, and precision terminal crimping.',
        imgSrc: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg',
        alt: 'Class 100,000 Cleanroom Workshop',
        tag1: 'Cleanroom Grade: Class 100k',
        tag2: '5,000+ Probes/Day'
      },
      {
        title: 'Constant Temp Calibration Lab',
        desc: 'Automated high-precision water baths (±0.01°C calibration), AC 1500V Hi-Pot dielectric test, and flex fatigue testers.',
        imgSrc: 'https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg',
        alt: 'Precision Water Bath Calibration & Hi-Pot Testing Lab',
        tag1: 'Accuracy Test: ISO 80601-2-56',
        tag2: '100% Pre-Shipment Pre-Tested'
      },
      {
        title: 'Global Express Logistics Center',
        desc: 'Standardized packaging with individual medical pouch barcode labeling. Priority DHL / FedEx dispatches to 100+ countries.',
        imgSrc: 'https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg',
        alt: 'Global Logistics and Express Dispatch Center',
        tag1: 'Dispatch Window: 24–48 Hours',
        tag2: '3–5 Days to US/EU'
      }
    ],
    certificates: [
      {
        id: 'fda',
        badge: 'US FDA 510(k) Cleared',
        badgeColor: 'bg-blue-100 text-medkeBlue',
        sub: 'FEI: 3012804266',
        title: 'Premarket Clearance K243000',
        desc: 'Formally granted for 6 primary temperature probe models: T1306, T2306, T3306, T4306, T5106, T6106 (Product Code FLL).',
        linkText: 'View FDA Scope Dossier →'
      },
      {
        id: 'iso13485',
        badge: 'TÜV SÜD Quality Certified',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        sub: 'Valid to 2029',
        title: 'ISO 13485:2016 System',
        desc: 'Certificate No. Q5 085432 0005 Rev. 05. Full quality management covering design, cleanroom production, and clinical cable assembly.',
        linkText: 'View TÜV SÜD Details →'
      },
      {
        id: 'cemdr',
        badge: 'EU CE MDR & Saudi SFDA',
        badgeColor: 'bg-amber-100 text-amber-800',
        sub: 'EU & KSA Listed',
        title: 'CE MDR DoC & SFDA MDMA',
        desc: 'EU MDR 2017/745 Class I DoC (MDR-TPEC-T0-02 v1.0) for adapter cables + Saudi SFDA MDMA-2-2026-2681 / 1845 authorisations.',
        linkText: 'View CE & SFDA Licences →'
      }
    ],
    transparencyNotice: 'US FDA 510(k) clearance (K243000) specifically applies to Medke models T1306, T2306, T3306, T4306, T5106, and T6106 as evaluated non-sterile clinical temperature probes. Other monitor-specific interface adapters (T0 series) and accessories are manufactured under our TÜV SÜD certified ISO 13485:2016 quality system and CE MDR Class I Declaration of Conformity.'
  },

  // Frequently Asked Questions (Dual keys for defensive compatibility)
  faqs: [
    {
      q: 'Which Medke temperature probe models are cleared under US FDA 510(k)?',
      question: 'Which Medke temperature probe models are cleared under US FDA 510(k)?',
      a: 'US FDA 510(k) clearance K243000 (Product Code FLL) explicitly covers 6 core models: T1306 (adult skin), T3306 (pediatric skin), T2306 (adult cavity), T4306 (pediatric cavity), T5106 (disposable skin), and T6106 (disposable cavity). In the official FDA evaluation summary, these models are evaluated as non-sterile devices. Other monitor-specific interface adapter cables (T0 series) are manufactured under our TÜV SÜD certified ISO 13485:2016 quality system and CE MDR Class I Declaration of Conformity.',
      answer: 'US FDA 510(k) clearance K243000 (Product Code FLL) explicitly covers 6 core models: T1306 (adult skin), T3306 (pediatric skin), T2306 (adult cavity), T4306 (pediatric cavity), T5106 (disposable skin), and T6106 (disposable cavity). In the official FDA evaluation summary, these models are evaluated as non-sterile devices. Other monitor-specific interface adapter cables (T0 series) are manufactured under our TÜV SÜD certified ISO 13485:2016 quality system and CE MDR Class I Declaration of Conformity.'
    },
    {
      q: 'How does Medke guarantee ±0.1°C accuracy across the clinical range?',
      question: 'How does Medke guarantee ±0.1°C accuracy across the clinical range?',
      a: 'Every thermistor sensor complies with ISO 80601-2-56 international clinical electrical thermometer standards. We utilize imported precision NTC thermistor wafers with a B-value tolerance of ±0.1%. During factory quality inspection, 100% of finished probes undergo automated precision multi-point water bath immersion calibration (±0.01°C reference bath) across the core physiological range (25.0°C ~ 45.0°C).',
      answer: 'Every thermistor sensor complies with ISO 80601-2-56 international clinical electrical thermometer standards. We utilize imported precision NTC thermistor wafers with a B-value tolerance of ±0.1%. During factory quality inspection, 100% of finished probes undergo automated precision multi-point water bath immersion calibration (±0.01°C reference bath) across the core physiological range (25.0°C ~ 45.0°C).'
    },
    {
      q: 'Can Medke temperature probes directly plug into our existing Philips, GE, or Mindray monitors?',
      question: 'Can Medke temperature probes directly plug into our existing Philips, GE, or Mindray monitors?',
      a: 'Yes. Medke provides both direct-plug probes with proprietary molded connectors (e.g., T1305/T2305 for Philips IntelliVue, T1312/T2312 for GE Marquette, T1318/T2318 for Mindray) and flexible 2-piece setups using our T0 series adapter cables. Both configurations guarantee 100% signal compatibility without monitor error codes or recalibration.',
      answer: 'Yes. Medke provides both direct-plug probes with proprietary molded connectors (e.g., T1305/T2305 for Philips IntelliVue, T1312/T2312 for GE Marquette, T1318/T2318 for Mindray) and flexible 2-piece setups using our T0 series adapter cables. Both configurations guarantee 100% signal compatibility without monitor error codes or recalibration.'
    },
    {
      q: 'What is the waterproof rating and recommended disinfection method for reusable probes?',
      question: 'What is the waterproof rating and recommended disinfection method for reusable probes?',
      a: 'Medke reusable probes achieve an IPX7 waterproof rating (continuous immersion at 1 meter depth for 30 minutes without fluid ingress). They are fully compatible with hospital-standard chemical disinfection routines, including wipe-down and immersion in 75% isopropyl alcohol, 2% glutaraldehyde, quaternary ammonium, or dilute sodium hypochlorite. Do not autoclave or expose to steam sterilization.',
      answer: 'Medke reusable probes achieve an IPX7 waterproof rating (continuous immersion at 1 meter depth for 30 minutes without fluid ingress). They are fully compatible with hospital-standard chemical disinfection routines, including wipe-down and immersion in 75% isopropyl alcohol, 2% glutaraldehyde, quaternary ammonium, or dilute sodium hypochlorite. Do not autoclave or expose to steam sterilization.'
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ), warranty, and delivery lead time?',
      question: 'What is the Minimum Order Quantity (MOQ), warranty, and delivery lead time?',
      a: 'For standard catalog models, our evaluation MOQ starts at just 10 pieces. Reusable probes and adapter cables carry a full 1-year (12-month) factory warranty with 100% free performance replacement. Disposable probes carry a 24-month shelf life. In-stock models dispatch within 24–48 hours, reaching overseas distributors via DHL/FedEx priority express in 3–5 business days.',
      answer: 'For standard catalog models, our evaluation MOQ starts at just 10 pieces. Reusable probes and adapter cables carry a full 1-year (12-month) factory warranty with 100% free performance replacement. Disposable probes carry a 24-month shelf life. In-stock models dispatch within 24–48 hours, reaching overseas distributors via DHL/FedEx priority express in 3–5 business days.'
    }
  ]
};
