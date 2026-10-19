export const ibpLandingData = {
  categoryType: 'IBP',
  topNotice: {
    badge: 'TÜV SÜD ISO 13485:2016 Certified · CE MDR Class I DoC · SFDA MDMA Listed',
    tagline: 'Factory-Direct IBP Cables to 100+ Countries | Philips, GE, Mindray, Dräger 100% Compatible',
    quoteSpeed: '< 2.4 Hours',
    whatsapp: '+86 15302654212'
  },
  eyebrow: 'DIRECT B2B MANUFACTURER · CLINICAL IBP CABLE SOLUTIONS SINCE 2008',
  title: 'Clinical-Grade Compatible IBP Adapter Cables',
  subtitle: 'Connect 20+ Patient Monitors to Edwards, BD, B.Braun & Abbott Sensors',
  lead: 'Eliminate proprietary OEM monopoly pricing while preserving 100% microvolt waveform fidelity. Built with heavy-gauge double shielding to resist surgical electrosurgery knife (ESU) RF interference. Direct factory supply for hospital fleets, clinical engineering (HTM), and medical distributors.',
  trustBadges: [
    { text: 'TÜV SÜD ISO 13485:2016 Certified', dot: 'bg-emerald-500' },
    { text: 'EU CE MDR Class I Compliant (MDR-IBP-CE-02)', dot: 'bg-blue-500' },
    { text: 'Saudi SFDA MDMA Listed (MDMA-2-2026-1253)', dot: 'bg-indigo-500' },
    { text: 'ESU Electrocautery Noise Immunity (>95% Shielding)', dot: 'bg-amber-500' }
  ],
  featureChecklist: [
    '<strong>ESU Anti-Interference</strong>: Clean arterial waveform',
    '<strong>10,000+ Flex Cycles</strong>: Medical-grade gray TPU',
    '<strong>Gold-Plated Contact Pins</strong>: Contact resistance <0.1 Ω',
    '<strong>6-Month Warranty</strong>: 100% factory replacement guarantee'
  ],
  metrics: [
    {
      value: '200+ SKUs',
      title: 'Monitor × Sensor',
      sub: 'Full Interconnect Hub',
      dot: 'bg-emerald-500',
      nowrap: true
    },
    {
      value: '>95% Shielding',
      title: 'ESU RF Immunity',
      sub: 'Zero Waveform Drift',
      dot: 'bg-blue-500',
      nowrap: true
    },
    {
      value: '10,000+ Cycles',
      title: 'Flex Fatigue Life',
      sub: 'Heavy TPU Strain Relief',
      dot: 'bg-amber-500',
      nowrap: true
    },
    {
      value: '6-Month Warranty',
      title: 'Factory Direct',
      sub: '100% Free Replacement',
      dot: 'bg-indigo-500',
      nowrap: false
    }
  ],

  // Dual-End Interconnect Hub Data
  monitorSystems: [
    { id: 'philips', code: '11', name: 'Philips IntelliVue', sub: 'MP20-90, MX400-800, M1165A', conn: '12-Pin Round (CN311)' },
    { id: 'ge', code: '07', name: 'GE Healthcare Marquette', sub: 'Dash 2000-5000, Solar 8000, TRAM', conn: '11-Pin Rectangular (CN307)' },
    { id: 'mindray', code: '12', name: 'Mindray BeneView', sub: 'BeneView T5/T6/T8, ePM, iPM, MPM', conn: '12-Pin Round (CN313)' },
    { id: 'drager', code: '05', name: 'Dräger Infinity', sub: 'Infinity Delta, Vista, SC6000-9000', conn: '7-Pin Metal (CN305)' },
    { id: 'nihonkohden', code: '09', name: 'Nihon Kohden', sub: 'Life Scope BSM-2301, SVM-7200', conn: '5-Pin Red (CN309)' },
    { id: 'spacelabs', code: '16', name: 'Spacelabs', sub: 'Ultraview, Command Module 700-0028', conn: '10-Pin Round (CN312)' },
    { id: 'edan', code: '29', name: 'Edan / Biolight / Comen', sub: 'iM Series, M8000, C80', conn: 'Dedicated Multi-Pin' },
    { id: 'universal', code: '01', name: 'Universal Standard', sub: 'Criticare, Datascope, Invivo, Ivy', conn: 'Round 6-Pin (CN301)' }
  ],

  // Transducer Standards strictly B01-B10
  transducerStandards: [
    { id: 'bbraun', prefix: 'B01', standardNumber: '01', name: 'B.Braun / Philips', sub: 'Combitrans / Certofix' },
    { id: 'bd', prefix: 'B02', standardNumber: '02', name: 'BD (Becton Dickinson)', sub: 'Critical Care Monitoring' },
    { id: 'edwards', prefix: 'B03', standardNumber: '03', name: 'Edwards Lifesciences', sub: 'TruWave / DPT Series' },
    { id: 'abbott', prefix: 'B04', standardNumber: '04', name: 'Abbott / Medex', sub: 'Transpac IV Interface' },
    { id: 'utah', prefix: 'B05', standardNumber: '05', name: 'Utah Medical', sub: 'Deltran IV Interface' },
    { id: 'pvb', prefix: 'B06', standardNumber: '06', name: 'PVB Medical', sub: 'OEM Pressure Systems' },
    { id: 'argon', prefix: 'B07', standardNumber: '07', name: 'Argon Medical', sub: 'Critical Transducers' },
    { id: 'logical', prefix: 'B08', standardNumber: '08', name: 'Medex Logical', sub: 'OR Logical Series' },
    { id: 'usb', prefix: 'B09', standardNumber: '09', name: 'USB Digital', sub: 'Digital Interface Monitors' },
    { id: 'mindray_direct', prefix: 'B10', standardNumber: '10', name: 'Mindray Specific', sub: 'Mindray Direct Sensor' }
  ],

  // 10 Transducer Connector Interface Gallery (Strict B01-B10 order)
  connectorGallery: [
    {
      id: 'bbraun',
      prefix: 'B01',
      standardNumber: '01',
      name: 'B.Braun / Philips',
      sub: 'Combitrans / Certofix',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-bbraun.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-bbraun-600.jpg',
      alt: 'B.Braun / Philips IBP Connector (B01)'
    },
    {
      id: 'bd',
      prefix: 'B02',
      standardNumber: '02',
      name: 'BD (Becton Dickinson)',
      sub: 'Critical Care Systems',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-bd.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-bd-600.jpg',
      alt: 'BD Becton Dickinson IBP Connector (B02)'
    },
    {
      id: 'edwards',
      prefix: 'B03',
      standardNumber: '03',
      name: 'Edwards Lifesciences',
      sub: 'TruWave / DPT Series',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-edward.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-edward-600.jpg',
      alt: 'Edwards Lifesciences IBP Connector (B03)'
    },
    {
      id: 'abbott',
      prefix: 'B04',
      standardNumber: '04',
      name: 'Abbott / Medex',
      sub: 'Transpac IV Series',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-medex-abbott.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-medex-abbott-600.jpg',
      alt: 'Abbott / Medex IBP Connector (B04)'
    },
    {
      id: 'utah',
      prefix: 'B05',
      standardNumber: '05',
      name: 'Utah Medical',
      sub: 'Deltran IV Interface',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-utah.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-utah-600.jpg',
      alt: 'Utah Medical IBP Connector (B05)'
    },
    {
      id: 'pvb',
      prefix: 'B06',
      standardNumber: '06',
      name: 'PVB Medical',
      sub: 'OEM Sensor Systems',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-pvb.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-pvb-600.jpg',
      alt: 'PVB Medical IBP Connector (B06)'
    },
    {
      id: 'argon',
      prefix: 'B07',
      standardNumber: '07',
      name: 'Argon Medical',
      sub: 'Critical Care Transducers',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-argon.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-argon-600.jpg',
      alt: 'Argon Medical IBP Connector (B07)'
    },
    {
      id: 'logical',
      prefix: 'B08',
      standardNumber: '08',
      name: 'Medex Logical',
      sub: 'OR / ICU Logical Series',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-medex-logical.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-medex-logical-600.jpg',
      alt: 'Medex Logical Series IBP Connector (B08)'
    },
    {
      id: 'usb',
      prefix: 'B09',
      standardNumber: '09',
      name: 'USB Digital Port',
      sub: 'Digital Monitor Ports',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-usb.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-usb-600.jpg',
      alt: 'USB Digital IBP Interface Connector (B09)'
    },
    {
      id: 'mindray_direct',
      prefix: 'B10',
      standardNumber: '10',
      name: 'Mindray Specific',
      sub: 'BeneVision & ePM',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-mindray.jpg',
      lightboxImgSrc: 'https://www.spo2sensorcable.com/assets/images/products/ibp-cable/ibp-conn-mindray-600.jpg',
      alt: 'Mindray Specific IBP Connector (B10)'
    }
  ],

  // Engineering Advantages (4 Pillars)
  engineeringAdvantages: [
    {
      icon: '⚡',
      iconBg: 'bg-blue-100 text-medkeBlue',
      title: 'ESU Noise Immunity',
      desc: 'Multi-layer tinned copper spiral and braided shielding stops RF electrocautery noise from causing false arterial pressure waveform spikes or monitor alarm triggers during surgery.'
    },
    {
      icon: '🔌',
      iconBg: 'bg-emerald-100 text-emerald-600',
      title: 'Gold-Plated Spring Pins',
      desc: 'Contact pins feature 3μ" hard gold plating with internal spring tension. Delivers contact resistance <0.1 Ω and over 5,000 mating cycles without oxidation or loose contact dropouts.'
    },
    {
      icon: '🛡️',
      iconBg: 'bg-amber-100 text-amber-600',
      title: 'Disinfectant-Resistant TPU',
      desc: 'Outer jacket withstands hospital wipe-downs with quaternary ammonium, 10% bleach, and 70% isopropyl alcohol. Does not harden, crack, or peel after thousands of clinical sanitizations.'
    },
    {
      icon: '💰',
      iconBg: 'bg-purple-100 text-purple-600',
      title: '60-70% Budget Savings',
      desc: 'Bypass OEM list prices ($150-$250/cable) with direct factory wholesale ($35-$70/cable). Reduce hospital operating expenses while maintaining 100% clinical compliance and 6-month warranty.'
    }
  ],

  // Cleanroom Plant & Compliance Trust Proof
  trustProof: {
    badge: 'Direct Source Manufacturer · 17+ Years R&D',
    title: 'Shenzhen Medke Cleanroom Plant & Compliance Credentials',
    description: 'Operating 4,000 sqm precision manufacturing facilities in Shenzhen. Fully equipped with automatic cable testers, dielectric Hi-Pot rigs, and Class 100,000 cleanrooms.',
    factories: [
      {
        title: 'Class 100,000 Cleanroom',
        desc: 'Dust-free precision injection molding, ultrasonic welding, and terminal crimping lines under strict environmental particulate controls.',
        imgSrc: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg',
        alt: 'Medke Class 100,000 Cleanroom Workshop',
        tag: 'ISO 14644-1 Standard',
        metaLeft: 'Area: 2,500+ sqm',
        metaRight: 'Daily Output: 3,000+ pcs'
      },
      {
        title: 'Electrical Reliability & QC Lab',
        desc: 'Equipped with oscillating fatigue testers (>10,000 cycles), 1500V dielectric Hi-Pot rigs, microvolt signal analyzers, and tensile load testers.',
        imgSrc: 'https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg',
        alt: 'Medke High-Pot QC & Reliability Lab',
        tag: '100% Pre-Shipment Tested',
        metaLeft: 'Inspection: 100% Full Test',
        metaRight: 'Hi-Pot 1500V Pass'
      },
      {
        title: 'Global Express Logistics Center',
        desc: 'Continuous standing inventory of high-demand cables with same-day dispatch via DHL / FedEx express reaching Europe and the Americas in 3-5 days.',
        imgSrc: 'https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg',
        alt: 'Medke Global Express Logistics Center',
        tag: 'Express Air Logistics',
        metaLeft: 'Coverage: 100+ Countries',
        metaRight: 'EU/US: 3-5 Days Door'
      }
    ],
    certificates: [
      {
        key: 'iso13485',
        pill: 'TÜV SÜD CERTIFIED',
        pillClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        certNo: 'Q5 085432 0005 Rev. 05',
        title: 'ISO 13485:2016 Quality System',
        desc: 'Comprehensive medical device QMS covering design, cleanroom assembly, testing, and distribution of clinical IBP cables. Valid to 2029-01-25.',
        linkText: 'View Certificate Document →',
        auditedBy: 'TÜV SÜD Audited',
        modalTitle: 'TÜV SÜD ISO 13485:2016 Certificate',
        authority: 'TÜV SÜD Product Service GmbH · Valid Until: 2029-01-25',
        scope: 'Design, development, cleanroom manufacturing and distribution of medical cable assemblies, invasive blood pressure (IBP) transducer adapter cables, temperature probes, and non-invasive blood pressure accessories.'
      },
      {
        key: 'cemdr',
        pill: 'EU MDR 2017/745',
        pillClass: 'bg-blue-50 text-medkeBlue border-blue-200',
        certNo: 'MDR-IBP-CE-02 v1.0',
        title: 'EU MDR Class I DoC (Approved)',
        desc: 'Formal Declaration of Conformity under EU MDR Rule 1. Full regulatory clearance for hospital tenders and distributor supply across all 27 EU nations.',
        linkText: 'View CE MDR Declaration →',
        auditedBy: 'Rule 1 Compliant',
        modalTitle: 'EU MDR Class I Declaration of Conformity (DoC)',
        authority: 'Regulation (EU) 2017/745 Annex VIII Rule 1 · Class I Medical Device Accessory',
        scope: 'Device Identification: IBP Adapter Cable. CND Code: Z12050385. Basic UDI-DI: 697101811NIBPG4. This declaration authorizes clinical distribution across all 27 EU member states, the UK (MHRA), and EFTA countries.'
      },
      {
        key: 'sfda',
        pill: 'SAUDI ARABIA SFDA',
        pillClass: 'bg-amber-50 text-amber-800 border-amber-200',
        certNo: 'MDMA-2-2026-1253',
        title: 'SFDA Device Marketing Authorization',
        desc: 'Official regulatory approval for public hospital tenders, commercial import, and distributor supply across the Kingdom of Saudi Arabia and GCC.',
        linkText: 'View SFDA Authorization →',
        auditedBy: 'SFDA MDMA Listed',
        modalTitle: 'Saudi Arabia SFDA MDMA Authorization',
        authority: 'Saudi Food and Drug Authority (SFDA)',
        scope: 'Authorized Device: Medke IBP Adapter Cables. Enables direct importation, tender supply, and hospital fleet contracts throughout the Kingdom of Saudi Arabia and GCC markets.'
      }
    ],
    transparencyNotice: 'Shenzhen Medke Technology holds official TÜV SÜD ISO 13485:2016 certification, EU MDR Class I Declaration of Conformity (MDR-IBP-CE-02 v1.0), and Saudi SFDA MDMA approval (MDMA-2-2026-1253) for IBP adapter cables. Medke complies with all international medical manufacturing and trade standards.'
  },

  // 5 FAQs (Strictly matching prototype)
  faqs: [
    {
      q: 'Are Medke B Series adapter cables 100% compatible with original bedside monitors?',
      question: 'Are Medke B Series adapter cables 100% compatible with original bedside monitors?',
      a: 'Yes. Every cable connector (whether Philips 12-pin, GE 11-pin rectangular, or Dräger 7-pin metal) is precision-molded to match OEM dimensional tolerances and keyway orientations. Contact pins feature high-conductivity gold plating, guaranteeing seamless plug-and-play interoperability without module error codes or signal drift.',
      answer: 'Yes. Every cable connector (whether Philips 12-pin, GE 11-pin rectangular, or Dräger 7-pin metal) is precision-molded to match OEM dimensional tolerances and keyway orientations. Contact pins feature high-conductivity gold plating, guaranteeing seamless plug-and-play interoperability without module error codes or signal drift.'
    },
    {
      q: 'What regulatory certificates and documents are provided for hospital tenders?',
      question: 'What regulatory certificates and documents are provided for hospital tenders?',
      a: 'Medke provides full tender-ready documentation packages: TÜV SÜD ISO 13485:2016 quality management certificate (Q5 085432 0005 Rev. 05), EU MDR 2017/745 Class I Declaration of Conformity (DoC MDR-IBP-CE-02 v1.0), Saudi SFDA MDMA authorization (MDMA-2-2026-1253), biocompatibility test reports, and factory calibration certificates.',
      answer: 'Medke provides full tender-ready documentation packages: TÜV SÜD ISO 13485:2016 quality management certificate (Q5 085432 0005 Rev. 05), EU MDR 2017/745 Class I Declaration of Conformity (DoC MDR-IBP-CE-02 v1.0), Saudi SFDA MDMA authorization (MDMA-2-2026-1253), biocompatibility test reports, and factory calibration certificates.'
    },
    {
      q: 'Can Medke produce custom cable lengths or specialized pinout configurations?',
      question: 'Can Medke produce custom cable lengths or specialized pinout configurations?',
      a: 'Yes. While our standard hospital length is 3.0 meters (9.8 ft), we routinely manufacture 3.5m, 4.0m, or customized extended lengths for ceiling-mounted OR pendants and hybrid cardiac suites. OEM branding, custom jacket colors, and private labeling are available for bulk distributor contracts.',
      answer: 'Yes. While our standard hospital length is 3.0 meters (9.8 ft), we routinely manufacture 3.5m, 4.0m, or customized extended lengths for ceiling-mounted OR pendants and hybrid cardiac suites. OEM branding, custom jacket colors, and private labeling are available for bulk distributor contracts.'
    },
    {
      q: 'What is the sample trial policy and standard Minimum Order Quantity (MOQ)?',
      question: 'What is the sample trial policy and standard Minimum Order Quantity (MOQ)?',
      a: 'Our standard production MOQ is only 10 pieces per SKU. For qualified medical device distributors, hospital clinical engineering departments, and tender contractors, Medke provides free evaluation sample cables for clinical bench testing. Contact our sales engineers to arrange sample shipment.',
      answer: 'Our standard production MOQ is only 10 pieces per SKU. For qualified medical device distributors, hospital clinical engineering departments, and tender contractors, Medke provides free evaluation sample cables for clinical bench testing. Contact our sales engineers to arrange sample shipment.'
    },
    {
      q: 'What warranty policy does Medke offer on IBP adapter cables?',
      question: 'What warranty policy does Medke offer on IBP adapter cables?',
      a: 'Every Medke B Series IBP cable is backed by an official 6-month factory replacement warranty covering manufacturing defects, connector detachment, and signal failure. Defective units are promptly replaced free of charge with express shipping.',
      answer: 'Every Medke B Series IBP cable is backed by an official 6-month factory replacement warranty covering manufacturing defects, connector detachment, and signal failure. Defective units are promptly replaced free of charge with express shipping.'
    }
  ]
};
