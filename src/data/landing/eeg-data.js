export const eegLandingData = {
  categoryType: 'EEG',
  topNotice: {
    badge: 'TÜV SÜD ISO 13485:2016 Certified & DIN 42802 Safety Standard',
    tagline: 'Factory-Direct Supply to 100+ Countries | Natus, Nihon Kohden, Cadwell & Compumedics 100% Interoperable',
    quoteSpeed: '< 2.4 Hours',
    whatsapp: '+86 15302654212'
  },
  eyebrow: 'DIRECT B2B MANUFACTURER · CLINICAL NEUROPHYSIOLOGY ACCESSORIES SINCE 2008',
  title: 'Medical-Grade EEG Cables & Electrodes',
  subtitle: 'Ultra-Low Noise Microvolt (μV) Signal Acquisition',
  lead: 'Precision engineered for Routine EEG, ICU cEEG, Polysomnography (PSG), and Long-Term Epilepsy Monitoring (LTM). 100% physically and electrically compatible with Natus, Nihon Kohden, Cadwell, and Compumedics headboxes.',
  trustBadges: [
    'TÜV SÜD ISO 13485:2016 Certified',
    'DIN 42802 1.5mm Touchproof Safety Standard',
    'Ultra-Low Baseline Drift (< 3 mV DC Offset)',
    'International 10/20 Standard 10-Color Coding'
  ],
  featureChecklist: [
    '<strong>1.5mm DIN 42802 Safety Socket</strong>: Universal fit',
    '<strong>Three Noble Metals</strong>: Ag/AgCl, Gold, 99.9% Silver',
    '<strong>Twin Standard Leads</strong>: 4.0mm Snap & Ergonomic Pinch',
    '<strong>Specialty Jumpers</strong>: Pin Adapters & Insulated Alligator'
  ],
  metrics: [
    { value: '17+', unit: 'Years', label: 'Medical Cable R&D' },
    { value: '4,000', unit: 'sqm', label: 'ISO 13485 Cleanroom' },
    { value: '< 3', unit: 'kΩ', label: 'Ultra-Low Contact Impedance' },
    { value: '100+', unit: 'Countries', label: 'Global B2B Supply' }
  ],
  schematicSpecs: [
    { label: 'Contact Impedance', value: '< 3 kΩ Target' },
    { label: 'DC Offset Drift', value: '< 3 mV Baseline' },
    { label: 'Flexing Endurance', value: '> 20,000 Cycles' }
  ],
  compatibility: {
    brandTabs: [
      { key: 'all', label: 'All Major Brands' },
      { key: 'natus', label: 'Natus / Nicolet / Grass' },
      { key: 'nihon', label: 'Nihon Kohden' },
      { key: 'cadwell', label: 'Cadwell' },
      { key: 'compumedics', label: 'Compumedics' },
      { key: 'philips', label: 'Philips Healthcare' }
    ],
    rows: [
      {
        brandKey: 'natus',
        brandName: 'Natus / Nicolet',
        dotColor: 'bg-blue-600',
        headbox: 'NicoletOne v32/v44 Headbox, BrainWave, UltraPro S100',
        standard: '1.5mm DIN 42802',
        product: 'Casted Ag/AgCl & Golden',
        productSub: '10-Color Coded',
        productBadgeClass: 'bg-blue-50 text-blue-700',
        advantage: 'Near-zero baseline drift (<3mV), ideal for pediatric EMU & ICU cEEG.',
        queryModel: 'Casted Ag/AgCl Cup Electrodes'
      },
      {
        brandKey: 'natus',
        brandName: 'Natus / Grass',
        dotColor: 'bg-blue-600',
        headbox: 'Grass Comet-PLUS, Beehive Horizon, Telefactor 32/64',
        standard: '1.5mm DIN 42802',
        product: 'Golden Cup (E0001-B)',
        productSub: '10-Color Wire',
        productBadgeClass: 'bg-amber-50 text-amber-700',
        advantage: 'High corrosion resistance against abrasive prep gels; reusable.',
        queryModel: 'Casted Golden Cup Electrodes'
      },
      {
        brandKey: 'nihon',
        brandName: 'Nihon Kohden',
        dotColor: 'bg-emerald-600',
        headbox: 'Neurofax EEG-1200, EEG-9100, EEG-9200, JE-921A Junction Box',
        standard: '1.5mm DIN 42802',
        product: '99.9% Pure Silver & AgCl',
        productSub: 'High-Conductivity',
        productBadgeClass: 'bg-emerald-50 text-emerald-700',
        advantage: 'Fast signal settling time for evoked potential and routine EEG.',
        queryModel: 'Casted Pure Silver Cup Electrodes'
      },
      {
        brandKey: 'cadwell',
        brandName: 'Cadwell',
        dotColor: 'bg-indigo-600',
        headbox: 'Easy III EEG/PSG Amplifier, Arc Premier, Cadwell IOM Box',
        standard: '1.5mm DIN 42802',
        product: 'Snap & Pinch Dual Leads',
        productSub: '4.0mm Press-Stud',
        productBadgeClass: 'bg-indigo-50 text-indigo-700',
        advantage: 'Seamless pairing with disposable adhesive hydrogel sensor pads.',
        queryModel: 'Standard Snap & Pinch Dual-Option Leadwires'
      },
      {
        brandKey: 'compumedics',
        brandName: 'Compumedics',
        dotColor: 'bg-amber-600',
        headbox: 'Grael 4K EEG, Somte PSG, Siesta 802, Neuvo LTM System',
        standard: '1.5mm DIN 42802',
        product: 'Ag/AgCl Reversible Cups',
        productSub: 'Alligator Clip Leads',
        productBadgeClass: 'bg-amber-50 text-amber-700',
        advantage: 'Zero motion polarization in 8-12 hour whole-night sleep studies.',
        queryModel: 'Casted Ag/AgCl Cup Electrodes'
      },
      {
        brandKey: 'philips',
        brandName: 'Philips Healthcare',
        dotColor: 'bg-sky-600',
        headbox: 'Alice 5 & Alice 6 Sleepware, IntelliVue EEG Module',
        standard: '1.5mm DIN 42802',
        product: 'Pediatric Golden (E0001-O)',
        productSub: 'Soft Pink TPU',
        productBadgeClass: 'bg-sky-50 text-sky-700',
        advantage: 'Gentle soft wire jacket; minimizes child anxiety and motion artifacts.',
        queryModel: 'Casted Golden Cup Electrodes'
      }
    ]
  },
  products: [
    {
      id: 'golden-cups',
      title: 'Casted Golden Cup Electrodes (4 Styles)',
      modelTag: 'Noble Metal Cup • EA11511A / E0001',
      badgeTopLeft: '4 Tail / Wire Styles',
      badgeTopColor: 'bg-amber-500',
      badgeBottomRight: 'Φ10.0mm / 2mm Gel Hole',
      statRight: 'Pull Force ≥ 50 N',
      statRightColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/H57a6bac609c14ae9b881024a4f61ee1aM.jpg',
      description: 'Precision gravity-cast medical brass disc with multi-layer micro-gold plating and molded relief tail. Exceptional chemical resistance against >100 repeated medical alcohol wipe-downs and abrasive skin prep gels. Single-pole contact impedance < 3 kΩ.',
      stylesBox: {
        title: '4 Clinical Tail & Color Configurations:',
        items: [
          { dot: 'bg-slate-400', label: 'Style 1 (E0001)', desc: 'All-gray TPU wire & DIN plug (hospital fleet)' },
          { dot: 'bg-blue-500', label: 'Style 2 (E0001-B)', desc: '10-Color international standard rainbow wire' },
          { dot: 'bg-pink-400', label: 'Style 3 (E0001-O)', desc: 'Pediatric soft pink wire (calming for NICU/children)' },
          { dot: 'bg-emerald-500', label: 'Style 4 (E0001-N)', desc: 'Mid-gray wire + 10-color molded DIN plugs (ICU blind-plug)' }
        ]
      },
      specs: [
        'Standard: 1.5m, 10 pcs/set',
        'Socket: 1.5mm DIN 42802'
      ],
      buttonText: 'Inquire Golden Cups →',
      queryModel: 'Casted Golden Cup Electrodes (4 Styles)'
    },
    {
      id: 'ag-agcl-cups',
      title: 'Casted Ag/AgCl Cup Electrodes',
      modelTag: 'Reversible Half-Cell • EA11521J',
      badgeTopLeft: 'Clinical Reference Standard',
      badgeTopColor: 'bg-indigo-600',
      badgeBottomRight: 'DC Offset < 3 mV',
      statRight: 'Zero Polarization',
      statRightColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/H5ba88cd0b2214082b20b89d968815ae7r.jpg',
      description: 'Reversible silver/silver chloride electrochemical electrode pair with electrochemically deposited stable AgCl micro-layer. Recognized as the clinical reference standard for minimal half-cell polarization and baseline drift in continuous recordings.',
      stylesBox: {
        title: 'Core Clinical Advantages:',
        items: [
          { dot: 'bg-indigo-500', label: '< 3 mV DC Offset Drift', desc: 'Rock-solid baseline across 24~72h continuous EMU/LTM' },
          { dot: 'bg-indigo-500', label: 'Artifact Suppression', desc: 'High SNR ratio rejects body movement and rolling noise' },
          { dot: 'bg-indigo-500', label: 'Microvolt Slow-Wave Recording', desc: 'Captures δ-wave and deep sleep slow potentials' },
          { dot: 'bg-indigo-500', label: 'Polyolefin Relief Tail', desc: 'Dual-layer heat-shrink strain buffer for durability' }
        ]
      },
      specs: [
        'Wire: 10-Color Medical TPU',
        'Socket: 1.5mm DIN 42802'
      ],
      buttonText: 'Inquire Ag/AgCl Cups →',
      queryModel: 'Casted Ag/AgCl Cup Electrodes'
    },
    {
      id: 'pure-silver-cups',
      title: 'Casted Pure Silver Cup Electrodes',
      modelTag: 'High Conductivity • EA11521A',
      badgeTopLeft: '99.9% Pure Silver',
      badgeTopColor: 'bg-slate-700',
      badgeBottomRight: '63 × 10⁶ S/m',
      statRight: 'Rapid Stabilization',
      statRightColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/He4e325ed818b4df1aea199bc363b86cdn.jpg',
      description: '99.9% high-purity cast pure silver disc (Φ10.0mm, 2.0mm gel hole) with multi-stage mirror-polished concave surface. Delivers fast impedance drop and high-frequency transient bio-signal response in routine clinical diagnostics and evoked potential studies.',
      stylesBox: {
        title: 'Core Clinical Advantages:',
        items: [
          { dot: 'bg-slate-500', label: 'Evoked Potentials (EP)', desc: 'Sensitive response for BAEP, VEP, and SEP transient spikes' },
          { dot: 'bg-slate-500', label: 'Rapid Outpatient Exams', desc: 'Fast stabilization in 20~30 min routine screening' },
          { dot: 'bg-slate-500', label: 'Cost-Effective Durability', desc: 'Reusable with clinical regeneration/polishing support' },
          { dot: 'bg-slate-500', label: 'Heat-shrink Stress Relief', desc: 'High-durability black sleeve resists hot-air drying' }
        ]
      },
      specs: [
        'Wire: 10-Color Medical TPU',
        'Socket: 1.5mm DIN 42802'
      ],
      buttonText: 'Inquire Silver Cups →',
      queryModel: 'Casted Pure Silver Cup Electrodes'
    },
    {
      id: 'snap-pinch-leads',
      title: 'Standard Snap & Pinch Dual-Option Leadwires',
      modelTag: 'Standard Leads • EA11562A / EA11511H',
      badgeTopLeft: 'Dual Standard Terminations',
      badgeTopColor: 'bg-emerald-600',
      statRight: 'Zero Cross-Infection',
      statRightColor: 'text-emerald-600',
      dualImages: {
        optionA: {
          src: 'https://sc02.alicdn.com/kf/H765c30da8e5447bcb7738839a3e3efeci.jpg',
          alt: 'Medke 4.0mm Snap EEG Leadwires',
          tag: 'Option A: 4.0mm Snap',
          tagClass: 'text-emerald-700 bg-emerald-50'
        },
        optionB: {
          src: 'https://sc02.alicdn.com/kf/Hb34d288950344ad89ad53ed9ef5103f0z.jpg',
          alt: 'Medke Pinch Grabber EEG Leadwires',
          tag: 'Option B: Pinch / Grabber',
          tagClass: 'text-teal-700 bg-teal-50'
        }
      },
      description: 'Two interchangeable international standard terminations designed for disposable pre-gelled hydrogel sensors. Choose 4.0mm Press-Stud Snap for rapid ICU click-on infection control, or Dual-Action Ergonomic Pinch (Grabber) for universal grip on flat tab and stud electrodes.',
      dualOptionsBox: [
        {
          dot: 'bg-emerald-500',
          title: 'Option A • Snap Leads (EA11562A):',
          desc: '4.0mm female socket with phosphor bronze retention ring & 3-step flex relief ribs (>20,000 cycles). Disposable hydrogel match for ICU cEEG, sleep EOG/EMG.'
        },
        {
          dot: 'bg-teal-500',
          title: 'Option B • Pinch Leads (EA11511H):',
          desc: 'Ergonomic thumb-press dual-claw clamp with heavy-duty spring. Firmly locks 4.0mm studs and flat tab electrodes; resists lateral pull in restless/elderly patients.'
        }
      ],
      specs: [
        'Resistance: < 0.1 Ω contact',
        'Socket: 1.5mm DIN 42802'
      ],
      buttonText: 'Inquire Snap & Pinch Leads →',
      queryModel: 'Standard Snap & Pinch Dual-Option Leadwires'
    },
    {
      id: 'pin-needle-jumpers',
      title: 'Pin / Needle Plug Adapter Jumper Leads',
      modelTag: 'Electrical Interconnect • EA11521D',
      badgeTopLeft: '100% Non-Invasive Jumper',
      badgeTopColor: 'bg-sky-600',
      badgeBottomRight: 'Φ1.5mm / Φ2.0mm Pin',
      statRight: 'Non-Subdermal',
      statRightColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/H93c3a4ac23e44b089eb009bf84d6ef53Q.jpg',
      description: 'Non-invasive cylindrical pin plug adapter jumpers (Touchproof to Pin Adapter Leads). Strictly designed for electrical interconnection between standard 1.5mm DIN 42802 headbox sockets and pin-style terminals. Absolute clarification: Non-invasive surface interconnect, NOT subdermal needles.',
      stylesBox: {
        title: 'Core Clinical Jumper Functions:',
        items: [
          { dot: 'bg-sky-500', label: 'Electrode Cap Jumpers', desc: 'Connects cap pin sockets to amplifier headboxes' },
          { dot: 'bg-sky-500', label: 'Signal Cascading', desc: 'Bridges non-standard terminal strips to DIN 42802 ports' },
          { dot: 'bg-sky-500', label: 'Legacy Equipment Retrofit', desc: 'Maintenance adapter for legacy EEG hardware' },
          { dot: 'bg-sky-500', label: 'Aramid Fiber Core', desc: 'Kevlar-reinforced conductor prevents pull-off breakage' }
        ]
      },
      specs: [
        'Wire: 10-Color Medical TPU',
        'Terminals: Φ1.5/2.0mm Pin to DIN'
      ],
      buttonText: 'Inquire Pin Jumpers →',
      queryModel: 'Pin / Needle Plug Adapter Jumper Leads'
    },
    {
      id: 'alligator-clip-leads',
      title: 'Alligator Clip Leads with Red Insulated Boot',
      modelTag: 'Safety Insulated Clip • EA11581A',
      badgeTopLeft: 'Anti-Short Red Silicone Boot',
      badgeTopColor: 'bg-red-600',
      badgeBottomRight: '1.5mm DIN Socket',
      statRight: 'No Crosstalk',
      statRightColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/Hd1e9de17e5f6416a9eb0882d9a1bb46b7.jpg',
      description: 'Precision spring-loaded alligator clip encased in a high-toughness red silicone insulating boot that fully encloses the spring and body, leaving only miniature serrated jaws exposed. Eliminates adjacent channel short-circuiting in high-density scalp montages.',
      stylesBox: {
        title: 'Safety Engineering Highlights:',
        items: [
          { dot: 'bg-red-500', label: 'Anti-Short Circuit Boot', desc: 'Prevents contact shorts in 1~2 cm dense scalp spacing' },
          { dot: 'bg-red-500', label: 'Eliminates Crosstalk', desc: 'Blocks stray parasitic capacitance and leakage currents' },
          { dot: 'bg-red-500', label: 'Earlobe Reference Clamps', desc: 'Firm grip for A1/A2 mastoid and ground reference' },
          { dot: 'bg-red-500', label: 'Precision Serrated Jaws', desc: 'Secure retention without severing thin tab sensors' }
        ]
      },
      specs: [
        'Wire: 10-Color Medical TPU',
        'Socket: 1.5mm DIN 42802'
      ],
      buttonText: 'Inquire Alligator Leads →',
      queryModel: 'Alligator Clip Leads with Red Insulated Boot'
    }
  ],
  realGallery: [
    {
      id: 'photo-1',
      title: 'E0001 Golden Cup (All-Gray Classic)',
      tag: 'Casted Golden • Style 1',
      tagColor: 'text-amber-600',
      image: 'https://sc02.alicdn.com/kf/H284155f1c99b443abcf211ace5a406c4P.jpg',
      quoteModel: 'Casted Golden Cup Electrodes',
      prefillBrand: 'E0001 Golden Cup Electrodes'
    },
    {
      id: 'photo-2',
      title: 'E0001-B Golden Cup (10-Color Rainbow)',
      tag: 'Casted Golden • Style 2',
      tagColor: 'text-amber-600',
      image: 'https://sc02.alicdn.com/kf/H57a6bac609c14ae9b881024a4f61ee1aM.jpg',
      quoteModel: 'Casted Golden Cup Electrodes',
      prefillBrand: 'E0001-B Golden Cup Electrodes'
    },
    {
      id: 'photo-3',
      title: 'E0001-O Golden Cup (Pediatric Pink)',
      tag: 'Casted Golden • Style 3',
      tagColor: 'text-pink-600',
      image: 'https://sc02.alicdn.com/kf/Ha92385ae543a4c9caafed5289e0b86063.jpg',
      quoteModel: 'Casted Golden Cup Electrodes',
      prefillBrand: 'E0001-O Golden Cup Electrodes'
    },
    {
      id: 'photo-4',
      title: 'E0001-N Golden Cup (Color DIN Plugs)',
      tag: 'Casted Golden • Style 4',
      tagColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/Hdf905fed5ae44cfa9b78d16b8d47e759P.jpg',
      quoteModel: 'Casted Golden Cup Electrodes',
      prefillBrand: 'E0001-N Golden Cup Electrodes'
    },
    {
      id: 'photo-5',
      title: 'Casted Ag/AgCl Set (< 3mV DC Offset)',
      tag: 'Ag/AgCl Reversible • EA11521J',
      tagColor: 'text-indigo-600',
      image: 'https://sc02.alicdn.com/kf/H5ba88cd0b2214082b20b89d968815ae7r.jpg',
      quoteModel: 'Casted Ag/AgCl Cup Electrodes',
      prefillBrand: 'EA11521J Ag/AgCl Cups'
    },
    {
      id: 'photo-6',
      title: 'Pure Silver Cup Set (Fast EP Response)',
      tag: '99.9% Pure Silver • EA11521A',
      tagColor: 'text-slate-700',
      image: 'https://sc02.alicdn.com/kf/He4e325ed818b4df1aea199bc363b86cdn.jpg',
      quoteModel: 'Casted Pure Silver Cup Electrodes',
      prefillBrand: 'EA11521A Pure Silver Cups'
    },
    {
      id: 'photo-7',
      title: 'Standard Snap Leads for ICU cEEG Pads',
      tag: '4.0mm Press-Stud • EA11562A',
      tagColor: 'text-emerald-600',
      image: 'https://sc02.alicdn.com/kf/H765c30da8e5447bcb7738839a3e3efeci.jpg',
      quoteModel: 'Standard Snap & Pinch Dual-Option Leadwires',
      prefillBrand: 'EA11562A Snap Leadwires'
    },
    {
      id: 'photo-8',
      title: 'Medical Pinch / Grabber Leadwires',
      tag: 'Dual-Action Clamp • EA11511H',
      tagColor: 'text-teal-600',
      image: 'https://sc02.alicdn.com/kf/Hb34d288950344ad89ad53ed9ef5103f0z.jpg',
      quoteModel: 'Standard Snap & Pinch Dual-Option Leadwires',
      prefillBrand: 'EA11511H Pinch Leadwires'
    },
    {
      id: 'photo-9',
      title: 'Pin / Needle Plug Adapter Jumper Leads',
      tag: 'Non-Invasive Jumper • EA11521D',
      tagColor: 'text-sky-600',
      image: 'https://sc02.alicdn.com/kf/H93c3a4ac23e44b089eb009bf84d6ef53Q.jpg',
      quoteModel: 'Pin / Needle Plug Adapter Jumper Leads',
      prefillBrand: 'EA11521D Pin Adapter Leads'
    },
    {
      id: 'photo-10',
      title: 'Alligator Clip Leads (Anti-Short Circuit)',
      tag: 'Red Boot Sleeve • EA11581A',
      tagColor: 'text-red-600',
      image: 'https://sc02.alicdn.com/kf/Hd1e9de17e5f6416a9eb0882d9a1bb46b7.jpg',
      quoteModel: 'Alligator Clip Leads with Red Insulated Boot',
      prefillBrand: 'EA11581A Alligator Clip Leads'
    }
  ],
  trustProof: {
    certificates: [
      {
        badge: 'ISO 13485:2016',
        tag: 'TÜV SÜD',
        status: 'Active Valid',
        authority: 'TÜV SÜD Product Service GmbH',
        certNo: 'Q5 085432 0005 Rev. 05',
        scope: 'Medical devices quality management system covering R&D, precision manufacturing, and cleanroom packaging of EEG cables & electrodes.',
        details: 'Design, production, and distribution of clinical neurophysiology cables, EEG leadwires, reusable cup electrodes, and patient interconnect adapters.'
      },
      {
        badge: 'EU MDR (2017/745) Class I',
        tag: 'EU MDR Class I',
        status: 'EC REP Registered',
        authority: 'German Competent Authority Notification',
        certNo: 'DE/CA09/01889/MDR',
        scope: 'Class I conformity declaration under European Medical Device Regulation for non-invasive patient monitoring cable accessories and electrodes.',
        details: 'Full compliance with MDR Annex II and III technical documentation for non-invasive reusable and disposable patient lead accessories.'
      },
      {
        badge: 'FDA Establishment QSR',
        tag: 'US FDA',
        status: 'Device Listed',
        authority: 'U.S. Food & Drug Administration',
        certNo: 'FEI / Reg No: 3012891913',
        scope: 'Compliant with US FDA Quality System Regulation (21 CFR Part 820) governing clinical patient monitoring cable assemblies.',
        details: 'Current Good Manufacturing Practice (CGMP) compliant facility for patient diagnostic cable harness assemblies and electrode leads.'
      },
      {
        badge: 'IEC 60601-2-26 Safety',
        tag: 'IEC & ISO 10993',
        status: 'Biocompatible',
        authority: 'Accredited Medical Device Test Lab',
        certNo: 'TR-EEG-BIO-2026-08',
        scope: 'Compliant with electrical safety standards for electroencephalographs and ISO 10993 cytotoxicity, sensitization, and skin irritation limits.',
        details: 'Passed ISO 10993-5 Cytotoxicity in vitro, ISO 10993-10 Skin Sensitization, and IEC 60601-2-26 Dielectric Breakdown test.'
      }
    ],
    factory: {
      tag: 'Manufacturing Infrastructure',
      title: '4,000 sqm Intelligent Factory in Shenzhen',
      description: 'Established in 2008 with 100+ skilled assembly technicians, Class 100,000 cleanroom workshops, automated extrusion lines, and precision welding workstations.',
      stats: [
        { value: '100%', label: 'Kelvin Contact & Offset Testing' },
        { value: '> 20,000', label: 'Cycles Dynamic Flex Life' }
      ],
      photos: [
        {
          tag: 'Cleanroom',
          title: 'Class 100,000 Assembly',
          description: 'Dust-free precision injection molding & terminal crimping lines',
          image: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg'
        },
        {
          tag: 'Testing Lab',
          title: 'Electrical Reliability Lab',
          description: 'Oscillating fatigue and high-voltage dielectric test rigs',
          image: 'https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg'
        },
        {
          tag: 'Warehouse',
          title: 'Global Express Logistics',
          description: 'DHL/FedEx express dispatches reaching Europe and Americas in 3-5 days',
          image: 'https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg'
        }
      ]
    }
  },
  faqs: [
    {
      question: 'Are Medke EEG leadwires 100% compatible with our Natus and Nihon Kohden amplifiers?',
      answer: 'Yes. All Medke EEG electrodes and leadwires strictly adhere to the international DIN 42802 standard with a 1.5 mm recessed touchproof safety socket. They plug and play directly into Natus (NicoletOne, Grass Comet), Nihon Kohden (Neurofax series), Cadwell (Easy III, Arc), Compumedics (Grael), and Philips input boxes without any intermediate adapters.'
    },
    {
      question: 'Which electrode material should I choose: Casted Ag/AgCl, Golden, or Pure Silver?',
      answer: `Casted Ag/AgCl: The clinical gold reference standard. Lowest baseline drift (<3 mV DC offset); essential for Long-Term Epilepsy Monitoring (LTM) and whole-night Polysomnography (PSG).\n\nCasted Golden: Multi-micron thick gold plating over cast brass. Maximum chemical inertness; resists wear and abrasive skin prep gels in high-throughput outpatient clinics.\n\nCasted Pure Silver (99.9%): Highest electrical conductivity; rapid signal settling time ideal for Evoked Potential (EP) and routine EEG screening at an economical price point.`
    },
    {
      question: 'Are the Pin / Needle Plug Adapter Jumper Leads invasive or surgical needles?',
      answer: 'No. Medke Pin Adapter Jumpers are 100% non-invasive electrical cable interconnects. One end features a standard 1.5mm DIN 42802 touchproof socket, and the other end terminates in a solid cylindrical brass pin plug (Φ1.5mm or Φ2.0mm) designed for headbox jumper patching and cap terminal connections. They do not penetrate human tissue.'
    },
    {
      question: 'What is the Minimum Order Quantity (MOQ) and production delivery lead time?',
      answer: 'For standard catalog items (E0001, E0001-B, Ag/AgCl sets, Snap/Pinch leads), sample orders (1-5 sets) and trial batches (10-50 sets) ship from stock within 2-3 business days. Wholesale and OEM customized orders (custom lead lengths, specific color codes) typically deliver in 7-14 business days via DHL/FedEx door-to-door express.'
    },
    {
      question: 'Can Medke provide OEM / ODM private labeling and customized wire lengths?',
      answer: 'Yes. As a direct source factory with full tooling, injection molding, and cable extrusion facilities, Medke supports customized wire lengths (0.5m to 3.0m), custom color combinations, molded client branding, customized packaging, and specialized terminal terminations.'
    }
  ]
};
