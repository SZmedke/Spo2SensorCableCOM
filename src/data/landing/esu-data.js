/**
 * ESU (Electrosurgical Unit Accessories) Landing Page Data Configuration
 * Decoupled data model for /esu route
 */

export const esuLandingData = {
  trustBadges: [
    { text: 'TÜV SÜD ISO 13485:2016 Facility', dot: 'bg-emerald-500' },
    { text: '4,000 m² Manufacturing Facility', dot: 'bg-blue-500' },
    { text: 'B2B Compatibility Engineering', dot: 'bg-amber-500' }
  ],

  hero: {
    eyebrow: 'Direct B2B manufacturer · electrosurgical interconnect solutions since 2008',
    title: 'Hospital-Grade ESU Grounding Pads',
    titleAccent: '& Autoclavable Bipolar Cables',
    subtitle: 'Direct factory supply for OR teams, medical distributors and BMETs. Universal REM split grounding pads plus 79 autoclavable bipolar cable models matching Valleylab, Erbe, ConMed and BOWA generators.',
    checklist: [
      'REM/CQM-ready return path with split-pad options',
      '79 bipolar cable SKUs across 20+ ecosystems',
      '3.0 m standard / 5.0 m option for cable programs',
      'MOQ 10 pcs with compatibility review support'
    ],
    metrics: [
      { value: '79 Cable SKUs', label: 'Bipolar platform' },
      { value: 'Dual-Foil REM', label: 'CQM safety · <50 Ω' },
      { value: '134°C × 50', label: 'Autoclave target' },
      { value: 'MOQ from 10 Pcs', label: 'Flexible trial' }
    ]
  },

  systemA: {
    tag: 'System A · monopolar return path',
    badge: 'Pads + dedicated leads',
    title: 'Grounding Pads & Dedicated Return Cables',
    description: 'Qualify the patient plate and generator-side return lead as one system. Choose disposable REM hydrogel, integrated-cable or reusable silicone formats before matching the generator port.',
    slides: [
      {
        id: 0,
        label: 'Grounding Pads',
        title: 'Reusable Conductive Silicone Grounding Pad',
        imgSrc: 'https://sc02.alicdn.com/kf/Hada2335e900c4322b88d51243bd2d5b6D.jpg',
        alt: 'Black reusable conductive silicone grounding pad with integrated cable'
      },
      {
        id: 1,
        label: 'Return Cables',
        title: 'Dedicated Patient Return Cables',
        imgSrc: 'https://sc02.alicdn.com/kf/Hf2d532e7aa8e41d7831544444119d2095.jpg',
        alt: 'Blue patient return cables with plate clamp and generator connectors'
      }
    ],
    highlights: [
      { label: 'Lead length', value: '3.0 m / 5.0 m' },
      { label: 'Primary interfaces', value: 'Valleylab · Erbe · BOWA' }
    ],
    matrix: [
      { sku: 'CP1008', product: 'Dual-foil REM hydrogel pad', spec: '160 × 200 mm', useCase: 'Adult monitored return path' },
      { sku: 'CP1020', product: 'Integrated lead REM pad', spec: '3.0 m moulded cable', useCase: 'No external plate clamp' },
      { sku: 'CP1013', product: 'Reusable silicone plate', spec: '150 × 250 × 4.5 mm', useCase: 'Washable reusable workflow' },
      { sku: 'CP1004 / CP1005', product: 'REM 2-pin → plate clamp', spec: '3.0 m standard', useCase: 'Valleylab / ConMed' },
      { sku: 'CPB305 Series', product: 'Dedicated port → plate clamp', spec: '3.0 m / 5.0 m', useCase: 'Erbe / BOWA systems' },
      { sku: 'CPA307', product: 'Aaron port → plate clamp', spec: '1250 / 2250 / 3250', useCase: 'Bovie-Aaron systems' }
    ]
  },

  systemB: {
    tag: 'System B · bipolar instrument path',
    badge: '79 cable SKUs',
    title: 'Autoclavable Bipolar Forceps Cables',
    description: 'Match both ends: generator output first, then the forceps or endoscopic instrument connector. Medical silicone cable bodies support repeated handling and steam-reprocessing programs.',
    imgSrc: 'https://sc02.alicdn.com/kf/H47316b2ece134f6e80149d0337077ddfs.jpg',
    alt: 'Multiple autoclavable bipolar forceps cables with generator and instrument connectors',
    titleLightbox: 'Autoclavable Bipolar Forceps Cables',
    highlights: [
      { label: 'Dielectric design', value: '3000 V AC' },
      { label: 'HF leakage target', value: '<10 mA' },
      { label: 'Steam target', value: '134°C × 50' },
      { label: 'Length options', value: '3.0 / 4.0 / 5.0 m' }
    ],
    matrix: [
      { sku: 'CPD316', genSide: '2 × 4.0 mm banana', instSide: 'Euro 2-pin flat', ecosystem: 'US standard / Erbe ICC / ConMed' },
      { sku: 'CP1002', genSide: 'US standard dual plug', instSide: 'Euro 2-pin flat', ecosystem: 'Valleylab / ConMed / Erbe ICC' },
      { sku: 'CP1003', genSide: 'Euro dedicated dual pin', instSide: 'Euro 2-pin flat', ecosystem: 'Aesculap / Martin / Berchtold' },
      { sku: 'CP1024 / CP1025', genSide: 'Dedicated / coaxial', instSide: 'Euro / Aesculap', ecosystem: 'Erbe VIO / BOWA / Wolf' },
      { sku: 'CP1029', genSide: 'BOWA / Lamidey interface', instSide: 'Olympus dedicated', ecosystem: 'Endoscopic electrosurgery' },
      { sku: 'CP1018A', genSide: 'Karl Storz multi-pin', instSide: 'Euro 2-pin socket', ecosystem: 'Karl Storz UH801 series' }
    ]
  },

  compatibilityData: {
    'Valleylab / Covidien': [
      { need: 'Euro 2-pin flat forceps', sku: 'CPD316', title: 'Universal Euro Bipolar Cable', generator: '2 × 4.0 mm banana bipolar output', instrument: 'Euro 2-pin flat forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'US standard forceps', sku: 'CP1002', title: 'US-to-Euro Bipolar Cable', generator: 'US standard dual bipolar plug', instrument: 'US / Euro forceps interface option', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'Erbe ICC': [
      { need: 'Euro 2-pin flat forceps', sku: 'CPD316', title: 'Erbe ICC Euro Bipolar Cable', generator: '2 × 4.0 mm banana bipolar output', instrument: 'Euro 2-pin flat forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'US standard forceps', sku: 'CP1002', title: 'Erbe ICC Bipolar Cable', generator: 'US standard dual bipolar plug', instrument: 'US / Euro forceps interface option', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'Erbe VIO / BOWA': [
      { need: 'Euro 2-pin flat forceps', sku: 'CP1024', title: 'VIO / BOWA Euro Bipolar Cable', generator: 'Dedicated VIO / BOWA interface', instrument: 'Euro 2-pin forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'Aesculap instrument socket', sku: 'CP1025', title: 'VIO / BOWA Aesculap Cable', generator: 'Dedicated VIO / BOWA interface', instrument: 'Aesculap dedicated socket', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'ConMed': [
      { need: 'Euro 2-pin flat forceps', sku: 'CPD316', title: 'ConMed Euro Bipolar Cable', generator: '2 × 4.0 mm banana bipolar output', instrument: 'Euro 2-pin flat forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'US standard forceps', sku: 'CP1002', title: 'ConMed US Bipolar Cable', generator: 'US standard dual bipolar plug', instrument: 'US / Euro forceps interface option', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'Bovie / Aaron': [
      { need: 'Euro 2-pin flat forceps', sku: 'CPD310', title: 'Bovie / Aaron Euro Bipolar Cable', generator: 'Bovie / Birtcher bipolar interface', instrument: 'Euro 2-pin flat forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: '2 × 4.0 mm banana', sku: 'CPD316', title: 'Dual Banana Bipolar Cable', generator: 'Dual banana bipolar output', instrument: 'Euro 2-pin flat forceps socket', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'Aesculap / Martin': [
      { need: 'Euro 2-pin flat forceps', sku: 'CP1003', title: 'Aesculap / Martin Euro Cable', generator: 'Euro dedicated dual-pin plug', instrument: 'Euro 2-pin flat forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'Aesculap dedicated socket', sku: 'CPD316D', title: 'Aesculap Dedicated Bipolar Cable', generator: '2 × 4.0 mm banana bipolar output', instrument: 'Aesculap dedicated forceps socket', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'Olympus': [
      { need: 'Olympus endoscopic interface', sku: 'CP1029', title: 'Olympus Bipolar Cable', generator: 'BOWA / Lamidey generator interface', instrument: 'Olympus dedicated instrument socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'Olympus / Erbe scope socket', sku: 'CPD420B', title: 'Olympus Endoscopic Interface Cable', generator: 'DC 6.3 mm generator plug', instrument: 'Olympus / Erbe endoscopic socket', length: '4.0 m', useClass: 'Reusable · 3000 V' }
    ],
    'Karl Storz / Richard Wolf': [
      { need: 'Karl Storz UH801 interface', sku: 'CP1018A', title: 'Karl Storz UH801 Cable', generator: 'Karl Storz dedicated multi-pin', instrument: 'Euro 2-pin forceps socket', length: '3.0 m', useClass: 'Reusable · 134°C' },
      { need: 'Richard Wolf interface', sku: 'CPD316C', title: 'Richard Wolf Bipolar Cable', generator: '2 × 4.0 mm banana bipolar output', instrument: 'Wolf dedicated instrument socket', length: '3.0 m', useClass: 'Reusable · 3000 V' }
    ]
  },

  orSupplies: [
    {
      id: 'pencil',
      title: 'ESU Pencils · CP1001 Series',
      subtitle: 'Optional add-on',
      description: 'Cut/coag dual push buttons, φ2.36 mm anti-rotation electrode socket, 70 mm blade and standard 3-prong plug. CP1001 is supplied in an EO-sterile peel pouch.',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/esu-pad/esu-pencil.jpg',
      alt: 'Complementary ESU pencil',
      prefillItem: 'CP1001 ESU pencil'
    },
    {
      id: 'forceps',
      title: 'Bipolar Forceps · Euro / US',
      subtitle: 'Optional add-on',
      description: 'Euro and US interfaces in straight or bayonet patterns from 11.5–24 cm. Insulated shafts support 3000 V qualification; PTFE or silver non-stick tips are optional.',
      imgSrc: 'https://www.spo2sensorcable.com/assets/images/products/esu-pad/esu-bipolar-forceps.jpg',
      alt: 'Complementary bipolar forceps',
      prefillItem: 'Bipolar forceps'
    },
    {
      id: 'adapter',
      title: 'ESU Adapters · CPD001–CPD013',
      subtitle: 'Optional add-on',
      description: 'Thirteen cross-brand port converters for mixed-generator fleets. CPD001 combines a banana plug with a keyed flat-pin receptacle; final fit is verified by port geometry.',
      imgSrc: 'https://sc02.alicdn.com/kf/H104d6c5c935f47a7ae4ad289cae1cfb9m.jpg',
      alt: 'CPD001 white ESU adapter with banana plug and flat-pin receptacle',
      prefillItem: 'CPD001–CPD013 ESU adapter'
    }
  ],

  trustProof: {
    title: 'Measured Criteria for Supplier Qualification',
    description: 'Review the production environment, lot-level inspection capability and controlled test targets. Final evidence is supplied by approved SKU and destination market.',
    credential: {
      tag: 'Quality system credential',
      title: 'TÜV SÜD ISO 13485:2016',
      sub: 'Q5 085432 0005 Rev. 05 · valid to 2029-01-25',
      cta: 'View credential scope →'
    },
    factories: [
      {
        id: 'facility',
        title: 'Controlled Production Facility',
        caption: 'Cable preparation, terminal assembly and in-process inspection under controlled workflows.',
        imgSrc: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg',
        alt: 'Medke controlled production facility'
      },
      {
        id: 'lab',
        title: 'Electrical & Mechanical Lab',
        caption: 'Dielectric withstand, continuity, leakage, pull and flex-cycle verification.',
        imgSrc: 'https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg',
        alt: 'Medke electrical verification laboratory'
      },
      {
        id: 'dispatch',
        title: 'Final Inspection & Dispatch',
        caption: 'Batch traceability, packaging review and consolidated export documentation.',
        imgSrc: 'https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg',
        alt: 'Medke inspection and dispatch center'
      }
    ],
    testTargets: [
      { val: '<50 Ω', title: 'REM Hydrogel Impedance', desc: 'Controlled target for qualified conductive hydrogel pads.', certKey: 'rem' },
      { val: '3000 V', title: 'Dielectric & Leakage', desc: 'AC withstand with bipolar HF leakage target <10 mA.', certKey: 'electrical' },
      { val: '134°C × 50', title: 'Steam-Reprocessing Target', desc: 'Reusable silicone cable qualification program.', certKey: 'electrical' },
      { val: '≥10,000', title: '90° Flex Cycles', desc: 'Strain-relief and conductor endurance criterion.' }
    ],
    nmpaNotice: {
      tag: 'Manufacturing basis',
      title: 'China Medical-Device Manufacturing Licence',
      cta: 'View evidence note →'
    },
    complianceNotice: {
      title: 'Regulatory & Compliance Notice',
      text: 'ESU accessories and interconnect assemblies are manufactured under an ISO 13485:2016 certified quality management system for qualified clinical, OEM and hospital distribution partners. Detailed technical files, IEC test reports and destination-market compliance documentation are available upon request per SKU.'
    }
  },

  certData: {
    iso: {
      title: 'TÜV SÜD ISO 13485:2016 Certified Facility',
      body: 'Certificate <strong>Q5 085432 0005 Rev. 05</strong> is recorded as valid through <strong>2029-01-25</strong>. This supports the medical-device quality management system of the facility. It does not by itself authorize an ESU SKU for sale in a destination market.'
    },
    nmpa: {
      title: 'China NMPA Manufacturing Basis',
      body: 'Medke holds a valid China medical-device manufacturing licence and maintains a lawful manufacturing basis in its country of origin. Destination-market registration, product listing and labeling remain separate requirements.'
    },
    rem: {
      title: 'REM/CQM Return-Path Verification Framework',
      body: 'Qualification evidence may include hydrogel impedance target <strong>&lt;50 Ω</strong>, peel adhesion target <strong>≥1.5 N/cm</strong>, split-zone continuity and generator-specific alarm behavior. The commonly referenced 20–135 Ω monitoring window is an engineering reference; actual thresholds follow the applicable generator IFU.'
    },
    electrical: {
      title: 'Electrical & Reprocessing Qualification',
      body: 'Reusable cable designs are engineered to meet applicable <strong>IEC 60601-2-2</strong> test principles, including dielectric and HF leakage evaluation. Selected bipolar cables target <strong>134°C steam reprocessing for at least 50 cycles</strong>. Final claims require the controlled SKU test report and approved IFU.'
    }
  },

  faqs: [
    {
      q: 'What compliance documentation is available for supplier review?',
      a: 'ESU accessories are manufactured under an ISO 13485:2016 certified quality management system. Detailed technical files, IEC test reports, labeling and destination-market documentation are available upon request for the selected SKU.'
    },
    {
      q: 'What information is needed to match a bipolar cable?',
      a: 'Provide the generator brand and model, a clear generator-port photo, the instrument or forceps connector, current OEM part number if available, required length and reprocessing method.'
    },
    {
      q: 'How does REM/CQM compatibility work?',
      a: 'A split return electrode provides two conductive zones for continuity monitoring. The generator measures the return path and controls output according to its own algorithm and IFU. Pad and cable compatibility must be verified as a complete system.'
    },
    {
      q: 'Which products are Medke’s primary manufactured focus?',
      a: 'Grounding pads with return/plate cables and the 79-SKU bipolar cable platform are the two core systems. Pencils, forceps and adapters are complementary supply options.'
    },
    {
      q: 'What are the standard MOQ, dispatch and warranty terms?',
      a: 'Typical MOQ starts from 10 pieces for reusable products. Standard dispatch targets 24–48 hours for available configurations. Reusable products carry a 12-month factory warranty; disposable products typically have a 24-month shelf life where supported by the approved specification.'
    }
  ]
};
