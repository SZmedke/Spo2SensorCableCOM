export const nibpLandingData = {
  categoryType: 'NIBP',
  topNotice: {
    badge: 'TÜV SÜD ISO 13485:2016 Certified & FDA 510(k) K242623 Cleared',
    tagline: 'Factory-Direct Hospital Fleet Supply to 100+ Countries | Philips, GE, Mindray & Welch Allyn 100% Interoperable',
    quoteSpeed: '< 2.4 Hours',
    whatsapp: '+86 15302654212'
  },
  eyebrow: 'DIRECT B2B MANUFACTURER · CLINICAL BLOOD PRESSURE SOLUTIONS SINCE 2008',
  title: 'Medical-Grade NIBP Cuffs, Hoses & Connectors',
  subtitle: 'Zero-Leakage Assurance & Precision Limb Fit (3cm to 66cm)',
  lead: 'Engineered for ICU, Operating Room, Emergency Care, and NICU infection control. 100% physically and pneumatically compatible with Philips, GE Dinamap, Mindray, Welch Allyn, Dräger, and Nihon Kohden patient monitors.',
  trustBadges: [
    'TÜV SÜD ISO 13485:2016 Certified',
    'US FDA 510(k) K242623 Cleared',
    '100% Water Submersion Leak Tested (300 mmHg)',
    'Extreme Burst Pressure > 600 mmHg Proof'
  ],
  featureChecklist: [
    '<strong>100% Water Submersion Tested</strong>: ≤ 3 mmHg/min drop',
    '<strong>Full Limb Range 3~66 cm</strong>: NICU Size 1 to Thigh',
    '<strong>Medical TPU Anti-Kinking Tubing</strong>: 1-sec elastic rebound',
    '<strong>30+ Universal Quick Connectors</strong>: Metal & molded polymer'
  ],
  metrics: [
    { value: '17+', unit: 'Years', label: 'Medical R&D' },
    { value: '4,000', unit: 'sqm', label: 'Cleanroom Plant' },
    { value: '>600', unit: 'mmHg', label: 'Burst Proof' },
    { value: '100+', unit: 'Nations', label: 'Hospital Supply' }
  ],

  // 7-Tier Continuous Circumference Rail Data
  tierData: {
    'nicu': {
      key: 'nicu',
      tag: 'NICU 1~5',
      badge: 'NICU Neonatal · 5-Tier Color Coding System · US FDA 510(k)',
      title: 'NICU Neonatal Cuffs (Limb Circumference: 3.0 ~ 15.0 cm)',
      shortTitle: 'NICU Neonate',
      range: '3.0 - 15.0 cm',
      subtext: '5 Colors',
      subHighlight: 'FDA 510(k)',
      desc: 'Engineered specifically for very low birth weight (VLBW) premature infants, neonates, and young babies. Features 5-tier international color coding with pre-fitted CB42 miniature screw luer lock connectors to minimize dead-space air volume and ensure clinical pressure accuracy.',
      cuffDim: 'Micro Preterm (3.0 ~ 15.0 cm)',
      bladderDim: 'Ultra-low dead space chamber',
      fastening: 'Skin-safe soft lint-free hook & loop',
      connector: 'CB42 Micro Luer Lock (Pre-fitted)',
      prefillKey: 'NICU Neonatal Disposable Cuffs (Size 1-5)',
      specialty: {
        welchAllyn: 'C3311 (Small Infant 7-10cm)',
        abpm: 'Custom Micro Spec (On Request)',
        manual: 'Custom Infant Spec (On Request)'
      },
      matrix: [
        {
          material: 'Disposable Color-Coded Non-Woven (5 Tiers #1~#5)',
          single: 'C0101-44 ~ C0105-44',
          dual: 'C0201-4444 ~ C0205-4444',
          moq: '20 pcs/bag',
          highlight: true
        },
        {
          material: 'Disposable Pediatric Animal Prints (Fleece Soft #1~#5)',
          single: 'C0301-50 ~ C0305-50',
          dual: 'C0401-5050 ~ C0405-5050',
          moq: '20 pcs/bag',
          highlight: false
        },
        {
          material: 'Reusable Bladderless Antibacterial Nylon (6 Micro Sizes)',
          single: 'C1310-1 ~ C1310-6',
          dual: 'C1320-1 ~ C1320-6',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Sleeve + Removable TPU Bladder',
          single: 'C1311 (Nylon) / C2311 (PU)',
          dual: 'C1321 (Nylon) / C2321 (PU)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    },
    'infant': {
      key: 'infant',
      tag: 'Infant',
      badge: 'Infant Specialty · 1 Month to 1 Year',
      title: 'Infant NIBP Cuff (Limb Circumference: 9.0 ~ 19.0 cm)',
      shortTitle: 'Infant',
      range: '9.0 - 19.0 cm',
      subtext: '1mo - 1yr',
      subHighlight: 'Single/Dual',
      desc: 'Designed for older infants and toddlers. Rounded edge fabric binding eliminates pinching tender skin during rapid inflation cycles. Available in ultrasonic-welded bladderless medical PU fabric or durable nylon sleeve with removable TPU bladder.',
      cuffDim: '28.5 × 8.5 cm',
      bladderDim: '14.5 × 6.5 cm (Pure TPU)',
      fastening: '≥ 10,000 Peels (Reusable) / Medical Soft Loop',
      connector: 'CB10 / CB09 / CB07 / CB03 / CB04',
      prefillKey: 'Reusable PU Bladderless Cuffs (C6)',
      specialty: {
        welchAllyn: 'C3411 (Infant 9-13cm)',
        abpm: 'Special Custom Spec',
        manual: 'Custom D-Ring Infant Spec'
      },
      matrix: [
        {
          material: 'Disposable Standard Body Soft Non-Woven (9.8-13.3cm)',
          single: 'C0107',
          dual: 'C0207',
          moq: '5 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Bladderless PU Ultrasonic Welded (C6 Series)',
          single: 'C6511',
          dual: 'C6521',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Nylon Sleeve + Removable TPU Bladder',
          single: 'C1511 (Nylon) / C2511 (PU)',
          dual: 'C1521 (Nylon) / C2521 (PU)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    },
    'pediatric': {
      key: 'pediatric',
      tag: 'Child',
      badge: 'Pediatric Care · Preschool & School Children',
      title: 'Pediatric / Child NIBP Cuff (Limb Circumference: 14.0 ~ 26.0 cm)',
      shortTitle: 'Pediatric / Child',
      range: '14.0 - 26.0 cm',
      subtext: 'Kids / Clinic',
      subHighlight: 'Single/Dual',
      desc: 'Optimized width-to-circumference ratio prevents systolic overestimation in children. Available with friendly Animal Prints to relieve pediatric clinical anxiety, or standard PU/Nylon for pediatric inpatient monitoring.',
      cuffDim: '34.5 × 10.5 cm',
      bladderDim: '18.0 × 8.5 cm (Pure TPU)',
      fastening: '≥ 10,000 Peels Medical Nylon Hook & Loop',
      connector: 'CB10 / CB09 / CB07 / CB03 / CB12',
      prefillKey: 'Reusable PU Bladderless Cuffs (C6)',
      specialty: {
        welchAllyn: 'C3611 (Child 15-21cm)',
        abpm: 'C9711S (Small Adult 20.5-28cm)',
        manual: 'C8611F (Pediatric D-Ring 18-26cm)'
      },
      matrix: [
        {
          material: 'Disposable Standard Body Child Non-Woven (15.8-21.3cm)',
          single: 'C0109',
          dual: 'C0209',
          moq: '5 pcs/bag',
          highlight: false
        },
        {
          material: 'Reusable Bladderless PU Ultrasonic Welded (C6 Series)',
          single: 'C6611',
          dual: 'C6621',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Sleeve + Removable TPU Bladder',
          single: 'C1611 (Nylon) / C2611 (PU)',
          dual: 'C1621 (Nylon) / C2621 (PU)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    },
    'small-adult': {
      key: 'small-adult',
      tag: 'Small Adult',
      badge: 'Small Adult · Slender Patients & Teens',
      title: 'Small Adult NIBP Cuff (Limb Circumference: 20.0 ~ 28.0 cm)',
      shortTitle: 'Small Adult',
      range: '20.0 - 28.0 cm',
      subtext: 'Slender / Teen',
      subHighlight: 'Single/Dual',
      desc: 'Engineered for slender adults, adolescents, and geriatric patients bridging the pediatric and adult threshold. Prevents cuff overlap and inaccurate readings caused by ill-fitting adult standard cuffs.',
      cuffDim: '42.0 × 12.0 cm',
      bladderDim: '21.0 × 9.5 cm (Pure TPU)',
      fastening: '≥ 10,000 Peels High-Density Fastener',
      connector: 'CB10 / CB09 / CB07 / CB03 / CB12',
      prefillKey: 'Reusable PU Bladderless Cuffs (C6)',
      specialty: {
        welchAllyn: 'C3711S (Small Adult 20-26cm)',
        abpm: 'C9711S (24h Holter 20.5-28cm)',
        manual: 'C8611F / C8711F (Manual D-Ring)'
      },
      matrix: [
        {
          material: 'Disposable Standard Body Small Adult Non-Woven (20-27cm)',
          single: 'C0110',
          dual: 'C0210',
          moq: '5 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Bladderless PU Ultrasonic Welded (C6 Series)',
          single: 'C6711S',
          dual: 'C6721S',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Sleeve + Removable TPU Bladder',
          single: 'C2711S (PU) / C1610 (Nylon)',
          dual: 'C2721S (PU) / C1620 (Nylon)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    },
    'adult': {
      key: 'adult',
      tag: 'Standard',
      badge: 'Adult Standard · 70% Clinical Fleet Volume',
      title: 'Standard Adult NIBP Cuff (Limb Circumference: 24.0 ~ 35.0 cm)',
      shortTitle: 'Adult (Standard)',
      range: '24.0 - 35.0 cm',
      subtext: '70% Fleet',
      subHighlight: 'High Volume',
      desc: 'The primary clinical workhorse for inpatient wards, emergency departments, and outpatient clinics. Eliminates miscuffing errors in over 70% of adult patients. Cross-compatible across all standard hospital lines:',
      cuffDim: '53.0 × 14.5 cm',
      bladderDim: '24.0 × 12.0 cm (Pure TPU)',
      fastening: '≥ 10,000 Peels Heavy-Duty Hook & Loop',
      connector: 'Universal (CB01 ~ CB42)',
      prefillKey: 'Reusable PU Bladderless Cuffs (C6)',
      specialty: {
        welchAllyn: 'C3711 (Standard Adult 25-34cm)',
        abpm: 'C9711 (24h Holter Contoured 24-32cm)',
        manual: 'C8711F (Chrome D-Ring 22-32cm)'
      },
      matrix: [
        {
          material: 'Disposable Standard Body Adult Non-Woven (25.3-34.3cm)',
          single: 'C0111',
          dual: 'C0211',
          moq: '5 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Bladderless PU Welded (C6711 Standard / C6711+ Long)',
          single: 'C6711 / C6711+',
          dual: 'C6721 / C6721+',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Nylon Sleeve + Removable TPU Bladder (25-35cm)',
          single: 'C1711 (Nylon) / C2711 (PU)',
          dual: 'C1721 (Nylon) / C2721 (PU)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    },
    'large-adult': {
      key: 'large-adult',
      tag: 'Large Adult',
      badge: 'Large Adult · Muscular & Bariatric Arms',
      title: 'Large Adult NIBP Cuff (Limb Circumference: 32.0 ~ 47.0 cm)',
      shortTitle: 'Large Adult',
      range: '32.0 - 47.0 cm',
      subtext: 'Bariatric / Arm',
      subHighlight: 'Single/Dual',
      desc: 'Extended length and broadened inflatable chamber ensure complete arterial occlusion without uncoupling or popping open under high systolic pressure in bariatric and muscular patients.',
      cuffDim: '62.0 × 17.5 cm',
      bladderDim: '32.0 × 14.5 cm (Pure TPU)',
      fastening: '≥ 10,000 Peels High-Tension Hook & Loop',
      connector: 'Universal (CB01 ~ CB42)',
      prefillKey: 'Reusable PU Bladderless Cuffs (C6)',
      specialty: {
        welchAllyn: 'C3811 (Large Adult 32-43cm)',
        abpm: 'C9811 (24h Holter Large 38-55cm)',
        manual: 'C8811F (32-43cm) / C8911F Long (36-45cm)'
      },
      matrix: [
        {
          material: 'Disposable Standard Body Large Adult Non-Woven (32.1-43.4cm)',
          single: 'C0112',
          dual: 'C0212',
          moq: '5 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Bladderless PU Ultrasonic Welded (C6 Series)',
          single: 'C6811',
          dual: 'C6821',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Nylon Sleeve + Removable TPU Bladder (33-47cm)',
          single: 'C1811 (Nylon) / C2811 (PU)',
          dual: 'C1821 (Nylon) / C2821 (PU)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    },
    'thigh': {
      key: 'thigh',
      tag: 'Thigh',
      badge: 'Thigh Bariatric · Severe Obesity & Lower Limbs',
      title: 'Thigh Bariatric NIBP Cuff (Limb Circumference: 42.0 ~ 66.0 cm)',
      shortTitle: 'Thigh (Lower Limb)',
      range: '42.0 - 66.0 cm',
      subtext: 'Popliteal / ICU',
      subHighlight: 'Single/Dual',
      desc: 'Heavy-duty medical cuff for severely bariatric patients, lower limb popliteal artery blood pressure assessment, and ICU burn unit patients where upper extremities are compromised or inaccessible.',
      cuffDim: '76.0 × 21.0 cm',
      bladderDim: '38.0 × 18.0 cm (Pure TPU)',
      fastening: '≥ 10,000 Peels Reinforced Hook & Loop',
      connector: 'CB10 / CB09 / CB07 / CB03 / CB12',
      prefillKey: 'Reusable PU Bladderless Cuffs (C6)',
      specialty: {
        welchAllyn: 'Custom Bayonet Fitting Available',
        abpm: 'C9811 (Large Adult Extended 38-55cm)',
        manual: 'C8911F (Long Bariatric with D-Ring)'
      },
      matrix: [
        {
          material: 'Disposable Standard Body Thigh Non-Woven Heavy (46-66cm)',
          single: 'C0113',
          dual: 'C0213',
          moq: '5 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Bladderless PU Welded Thigh Cuff (46-66cm)',
          single: 'C6911',
          dual: 'C6921',
          moq: '1 pcs/bag',
          highlight: true
        },
        {
          material: 'Reusable Classic Sleeve + Removable TPU Bladder (46-66cm)',
          single: 'C1911 (Nylon) / C2911 (PU)',
          dual: 'C1921 (Nylon) / C2921 (PU)',
          moq: '1 pcs/bag',
          highlight: false
        }
      ]
    }
  },

  // 4 Core Manufacturing Families Navigation
  productFamilies: [
    {
      id: 'disposable',
      index: '01',
      title: 'Disposable NIBP Cuffs Series',
      subtitle: 'Infection Control & Hospital-Acquired Infection (HAI) Zero-Transmission Prevention',
      badges: ['100% Latex-Free & DEHP-Free', 'FDA 510(k) K242623'],
      cards: [
        {
          id: 'neonate-5-tier',
          title: 'Neonate 5-Tier Color Cuffs',
          categoryTag: 'Preemie & NICU Specialty',
          pillTag: 'Neonate (Size 1 ~ 5)',
          image: 'https://sc02.alicdn.com/kf/Hf8380dca0ace45f2a837eb68da5c81bcj.jpg',
          alt: 'Medke NICU Neonatal 5 Color Cuffs',
          hasColorDots: true,
          description: 'Designed for very low birth weight preemies and newborns (3.0~15.0cm). Standard 5-color coded system eliminates staff size confusion. Pre-fitted with CB42 miniature screw luer lock to minimize dead-space error.',
          specs: [
            { label: 'Single P/N', value: 'C0101 ~ C0105', mono: true },
            { label: 'Dual P/N', value: 'C0101-44 ~ C0105-44', mono: true },
            { label: 'Connector', value: 'CB42 Micro Luer Lock' }
          ],
          inquireProduct: 'NICU Neonatal Disposable Cuffs (Size 1-5)',
          buttonText: 'Inquire Neonate Series →',
          buttonColor: 'bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-800'
        },
        {
          id: 'animal-prints',
          title: 'Animal Prints Pediatric Cuffs',
          categoryTag: 'Pediatric & Children Clinic',
          pillTag: 'Animal Prints',
          badgeRight: 'Anxiety Mitigation',
          image: 'https://sc02.alicdn.com/kf/H1994921c60b143279c9d4f0e7a697159q.jpg',
          alt: 'Medke Animal Prints Pediatric NIBP Cuff',
          description: 'Printed with friendly cartoon animal illustrations (bear, puppy, bunny) to relieve pediatric clinical anxiety and crying, preventing measurement blood pressure spikes and movement artifacts.',
          specs: [
            { label: 'Material', value: 'Ultra-soft fleece non-woven' },
            { label: 'Circumference', value: 'Infant (10-19cm) / Child (18-26cm)' },
            { label: 'Safety', value: '100% Non-sensitizing, Skin-safe' }
          ],
          inquireProduct: 'Disposable Non-Woven Cuffs',
          buttonText: 'Inquire Animal Prints →',
          buttonColor: 'bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800'
        },
        {
          id: 'standard-body',
          title: 'Standard Body Non-Woven Cuffs',
          categoryTag: 'Single-Patient Infection Control',
          pillTag: 'Standard Body',
          badgeRight: 'ICU / OR / Wards',
          image: 'https://sc02.alicdn.com/kf/H66a240bc498e49eaa36bae4a3011793d3.jpg',
          alt: 'Medke Disposable Standard Body NIBP Cuff',
          description: 'Silky-soft breathable spunbond non-woven composite laminated with internal TPU bladder film. Dedicated single-patient use prevents cross-transmission of MRSA, VRE, and multi-drug resistant pathogens.',
          specs: [
            { label: 'Sizes', value: 'Infant to Thigh (10cm to 66cm)' },
            { label: 'Tube Options', value: 'Single Tube / Dual Tube' },
            { label: 'Markings', value: 'Clear Artery & Range Index' }
          ],
          inquireProduct: 'Disposable Non-Woven Cuffs',
          buttonText: 'Inquire Standard Body →',
          buttonColor: 'bg-blue-50 hover:bg-medkeBlue hover:text-white text-medkeBlue'
        }
      ]
    },
    {
      id: 'reusable',
      index: '02',
      title: 'Reusable NIBP Cuffs Series',
      subtitle: 'Clinical Durability for Patient Monitors, Manual Sphygmomanometers & 24h ABPM',
      badges: ['≥ 10,000 Peels Hook & Loop', '> 600 mmHg Burst Proof'],
      cards: [
        {
          id: 'sphygmomanometer-cuff',
          title: 'Cuff for Sphygmomanometers',
          categoryTag: 'Manual & Aneroid Gauges',
          pillTag: 'Sphygmomanometer Cuff',
          badgeRight: 'With Metal D-Ring',
          image: 'https://sc02.alicdn.com/kf/H7be6766960354de7b77e932ef633ff3fO.jpg',
          alt: 'Medke Cuff for Sphygmomanometers',
          description: 'Designed for desktop mercury and aneroid sphygmomanometers. Features a high-density woven fabric jacket with an electroplated metal D-ring for easy one-handed patient wrapping or clinical doctor use.',
          specs: [
            { label: 'Material', value: 'Fabric (Cotton / Polyester)', bold: true },
            { label: 'Hardware', value: 'Heavy-duty chrome metal D-Ring' },
            { label: 'Bladder', value: 'Removable pure TPU or latex-free rubber' }
          ],
          inquireProduct: 'Reusable Classic Nylon Cuffs (C1/C2)',
          buttonText: 'Inquire Sphygmo Cuffs →',
          buttonColor: 'bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800'
        },
        {
          id: 'patient-monitor-cuffs',
          title: 'NIBP Cuffs for Patient Monitors',
          categoryTag: 'ICU · OR · Wards Fleet',
          pillTag: 'Patient Monitors',
          badgeRight: 'Nylon / PU Options',
          isCore: true,
          image: 'https://sc02.alicdn.com/kf/H0deea89245cb4231bf2d2540e91f812e3.jpg',
          alt: 'Medke NIBP Cuffs for Patient Monitors',
          description: 'Comprehensive multi-parameter monitor cuff fleet. Engineered with flexible material and chamber architecture to meet hospital procurement specifications:',
          specs: [
            { label: 'Material Options', value: 'Medical PU (Ultrasonic Sealed) / 210D Heavy Nylon', bold: true },
            { label: 'Chamber Architecture', value: 'Available in Bladderless (C6 Series) & Classic with TPU Bladder (C1 Series)' },
            { label: 'Pneumatic Conduits', value: 'Available in Single Tube & Dual Tube' },
            { label: 'Sizes', value: 'Full clinical continuum (Infant 10cm to Thigh 66cm)' }
          ],
          inquireProduct: 'Reusable PU Bladderless Cuffs (C6)',
          buttonText: 'Inquire Monitor Cuffs →',
          buttonColor: 'bg-medkeBlue hover:bg-medkeBlueHover text-white'
        },
        {
          id: 'abpm-cuff',
          title: 'Ambulatory BP Monitor Cuff (ABPM)',
          categoryTag: '24-Hour Ambulatory Holter',
          pillTag: 'ABPM Series',
          badgeRight: '24h Holter Monitoring',
          image: 'https://sc02.alicdn.com/kf/Hfbd92442a08946849d10335a6b73f5ebt.jpg',
          alt: 'Medke Ambulatory BP Monitor Cuff',
          description: 'Ergonomically contoured for continuous 24-hour ambulatory blood pressure monitoring. Conical cut hugs the upper arm contour to prevent rotational shifting during daytime movement and nocturnal sleep.',
          specs: [
            { label: 'Material', value: 'High-Grade Soft Nylon', bold: true },
            { label: 'Fit', value: 'Tapered conical anatomical contour' },
            { label: 'Closure', value: 'Quiet medical loop fastener for sleep' }
          ],
          inquireProduct: 'Reusable Classic Nylon Cuffs (C1/C2)',
          buttonText: 'Inquire ABPM Cuffs →',
          buttonColor: 'bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-800'
        }
      ]
    },
    {
      id: 'hoses',
      index: '03',
      title: 'NIBP Adapter Hoses Series',
      subtitle: 'Medical TPU Extruded Tubing · 1-Second Anti-Kinking Rebound & Heavy Tensile Retention',
      badges: ['1s Elastic Anti-Kinking Rebound', '≥ 40 N Pull Force Tested'],
      cards: [
        {
          id: 'single-lumen-hose',
          title: 'Single-Lumen Medical TPU Adapter Hoses',
          categoryTag: 'Philips · Mindray · Dräger · Colin',
          pillTag: 'Single Lumen System',
          badgeRight: '2.5m / 3.0m Lengths',
          image: 'https://sc02.alicdn.com/kf/H49be950ea32047b98a94798713ba4ea6Z.jpg',
          alt: 'Medke Single Lumen TPU NIBP Adapter Hose',
          description: 'Heavy-duty medical polyurethane air tubing engineered to withstand bed-rail crushing and heavy cart rolling. Rebounds instantly in 1 second with 100% pneumatic restoration and zero kink occlusion.',
          specs: [
            { label: 'Standard Models', value: 'H0910S (Philips), H1010S (Mindray), H1210S (Dräger), H0304S (Colin)', mono: true },
            { label: 'Standard Lengths', value: '2.5m / 3.0m (custom 1.5m ~ 5.0m available)' },
            { label: 'Finish', value: 'Matte non-stick exterior, resistant to hospital alcohol wipes' }
          ],
          inquireProduct: 'TPU NIBP Adapter Hoses (Single/Dual)',
          buttonText: 'Inquire Single-Lumen Hoses →',
          buttonColor: 'bg-sky-50 hover:bg-sky-600 hover:text-white text-sky-800'
        },
        {
          id: 'dual-lumen-hose',
          title: 'Dual-Lumen Medical TPU Adapter Hoses',
          categoryTag: 'GE Healthcare · Critikon · Datex',
          pillTag: 'Dual Lumen System',
          badgeRight: 'GE Dinamap / Marquette',
          image: 'https://sc02.alicdn.com/kf/H4319c4f392644a6c9fb79a8ceda1fc24F.jpg',
          alt: 'Medke Dual Lumen TPU NIBP Adapter Hose',
          description: 'Parallel twin-conduit tubing featuring independent rapid inflation and high-fidelity arterial pressure sensing circuits. Eliminates airflow turbulence noise in Operating Rooms and ICU hemodynamics.',
          specs: [
            { label: 'Standard Models', value: 'H0707D (Dinamap), H3851D (Marquette), H3707D (Datex-Ohmeda)', mono: true },
            { label: 'Joint Reliability', value: 'Injection-molded strain relief boots prevent tearing' },
            { label: 'Testing', value: '100% submersion leak tested under 300 mmHg pressure' }
          ],
          inquireProduct: 'TPU NIBP Adapter Hoses (Single/Dual)',
          buttonText: 'Inquire Dual-Lumen Hoses →',
          buttonColor: 'bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-800'
        }
      ]
    },
    {
      id: 'connectors',
      index: '04',
      title: 'Precision Air Connectors Series',
      subtitle: '30+ Precision Metal & Molded Engineering Polymer Couplers (CB01 ~ CB42)',
      badges: ['Leak Rate < 0.5 mmHg/min', '98% Global Monitor Fit'],
      overviewGrid: [
        {
          codes: 'CB01 / CB03 / CB04',
          color: 'amber',
          title: 'Nickel Brass Couplers',
          desc: 'High-precision CNC machined nickel-plated brass with ball-bearing snap locking and self-closing valve.',
          brands: 'Colin / Welch Allyn / Nihon Kohden'
        },
        {
          codes: 'CB09 / CB10 / CB13',
          color: 'blue',
          title: 'Medical POM Push Plugs',
          desc: 'Acetal/POM engineered polymer quick disconnect sockets and plugs with fluororubber O-rings.',
          brands: 'Philips / Mindray / Datascope / Edan'
        },
        {
          codes: 'CB07 / CB37 / CB38',
          color: 'indigo',
          title: 'Dual-Lumen Keyed Plugs',
          desc: 'Dinaclick dual-pin parallel rectangular plugs & Datex asymmetrical keyed anti-mismatch connectors.',
          brands: 'GE Dinamap / Marquette / Datex'
        },
        {
          codes: 'CB12 / CB42',
          color: 'purple',
          title: 'Threaded & Micro Luers',
          desc: 'Dräger knurled metal screw collars (CB12) and ISO 594 miniature preterm neonatal screw luers (CB42).',
          brands: 'Dräger Infinity / Universal NICU'
        }
      ]
    }
  ],

  // 30+ Connectors Cross-Reference Matrix
  connectorMatrix: [
    {
      code: 'CB10',
      name: 'Quick-Disconnect Male Plug',
      subtext: 'P/N: CB10 · Standard Plug',
      color: 'blue',
      locking: 'Precision Molded Medical POM (Polyoxymethylene), single-motion push fit with internal O-ring seal',
      brands: 'Mindray BeneView/BeneVision, Philips IntelliVue/SureSigns, Datascope, Spacelabs',
      brandKey: 'mindray philips',
      lumen: 'Single Tube',
      lumenBadge: 'bg-blue-50 text-medkeBlue'
    },
    {
      code: 'CB09',
      name: 'Quick-Disconnect Female Socket',
      subtext: 'P/N: CB09 · Philips Female',
      color: 'blue',
      locking: 'One-hand press release metal leaf spring latch, medical gray POM casing, internal airtight valve',
      brands: 'Philips IntelliVue MP20~MP90, MX400~MX800, M1008A, M3000 Module',
      brandKey: 'philips',
      lumen: 'Single Tube',
      lumenBadge: 'bg-blue-50 text-medkeBlue'
    },
    {
      code: 'CB07',
      name: 'GE Dinaclick Dual-Lumen Metal Plug',
      subtext: 'P/N: CB07 · Rectangular Dual',
      color: 'indigo',
      locking: 'Dual-pin parallel layout with high-resilience fluororubber O-rings, zero cross-lumen air transfer',
      brands: 'GE Critikon Dinamap Pro, Carescape B450/B650/B850, Marquette Eagle 1000/3000',
      brandKey: 'ge',
      lumen: 'Dual Tube',
      lumenBadge: 'bg-purple-50 text-purple-700'
    },
    {
      code: 'CB03',
      name: 'Metal Quick-Disconnect Male Plug',
      subtext: 'P/N: CB03 · Nickel Brass',
      color: 'amber',
      locking: 'High-precision CNC machined brass with electroplated nickel, ball-bearing snap locking mechanism',
      brands: 'Colin / Omron BP, Welch Allyn Propaq / Atlas, Nihon Kohden Life Scope',
      brandKey: 'colin welchallyn',
      lumen: 'Single Tube',
      lumenBadge: 'bg-blue-50 text-medkeBlue'
    },
    {
      code: 'CB04',
      name: 'Metal Quick-Disconnect Female Socket',
      subtext: 'P/N: CB04 · Self-Sealing',
      color: 'amber',
      locking: 'Knurled pull-back release sleeve, internal spring check valve automatically seals when uncoupled',
      brands: 'Pairs with CB03; Welch Allyn Spot Vital Signs, Nihon Kohden BSM 2300/4100',
      brandKey: 'colin welchallyn',
      lumen: 'Single Tube',
      lumenBadge: 'bg-blue-50 text-medkeBlue'
    },
    {
      code: 'CB12',
      name: 'Dräger Metal Screw / Push Locking Pin',
      subtext: 'P/N: CB12 · Dräger Threaded',
      color: 'slate',
      locking: 'German precision instrument knurled sleeve locking collar, vibration resistant, dual O-ring seal',
      brands: 'Dräger Infinity Delta, Delta XL, Vista 120, Siemens SC6000 ~ SC9000',
      brandKey: 'drager',
      lumen: 'Single Tube',
      lumenBadge: 'bg-blue-50 text-medkeBlue'
    },
    {
      code: 'CB37',
      name: 'GE Datex Flat Dual Self-Locking Plug',
      subtext: 'P/N: CB37 · Datex Keyed',
      color: 'indigo',
      locking: 'Asymmetrical keyed anti-mismatch design prevents reverse insertion; protects internal solenoid valves',
      brands: 'GE Datex-Ohmeda AS/3, CS/3, S/5, Cardiocap 5 Anesthesia Systems',
      brandKey: 'ge',
      lumen: 'Dual Tube',
      lumenBadge: 'bg-purple-50 text-purple-700'
    },
    {
      code: 'CB42',
      name: 'Miniature Screw Luer Lock Connector',
      subtext: 'P/N: CB42 · Micro Luer',
      color: 'purple',
      locking: 'Standard ISO 594 compliant female/male screw lock, minimal internal dead volume for neonates',
      brands: 'Universal Neonatal Cuff Standard (NICU Size 1~5 C0101-C0105 across all monitor brands)',
      brandKey: 'all philips ge mindray drager colin welchallyn',
      lumen: 'Single / Dual',
      lumenBadge: 'bg-emerald-50 text-emerald-700'
    }
  ],

  // Brand filter tabs for connector hub
  brandTabs: [
    { key: 'all', label: 'All Brands (30+)' },
    { key: 'philips', label: 'Philips' },
    { key: 'ge', label: 'GE Healthcare (Dinamap)' },
    { key: 'mindray', label: 'Mindray' },
    { key: 'welchallyn', label: 'Welch Allyn' },
    { key: 'drager', label: 'Dräger' },
    { key: 'colin', label: 'Colin / Nihon Kohden' }
  ],

  // Trust Authority Proof
  trustProof: {
    certificates: [
      {
        badge: 'US FDA 510(k) Cleared',
        tag: '🇺🇸',
        status: 'Verified',
        certNo: 'K242623 · DXQ Class II',
        authority: 'U.S. Food and Drug Administration',
        scope: 'Full clearance for Medke Reusable Cuffs (Infant to Thigh) and Neonatal Disposable Cuffs (Size 1 to 5, C0101-C0105). 21 CFR 870.1120 compliance.',
        details: 'FDA Product Code: DXQ, Class II. Reusable cuffs across all clinical size segments (Infant to Thigh) and neonatal disposable cuffs size 1 through 5.'
      },
      {
        badge: 'EU CE MDR Class I DoC',
        tag: '🇪🇺',
        status: 'MDR 2017/745',
        certNo: '697101811cuffVN',
        authority: 'European Union Medical Device Regulation (EU) 2017/745',
        scope: 'Certified conformity under EU MDR 2017/745 Annex IV. Rigorous EN ISO 81060-1 non-invasive sphygmomanometer safety compliance.',
        details: 'EC Rep: Shanghai International Holding Corp. GmbH (Hamburg). Basic UDI-DI: 697101811cuffVN (Reusable) / 697101811DICUFFBG (Disposable).'
      },
      {
        badge: 'TÜV SÜD ISO 13485:2016',
        tag: '🏅',
        status: 'TÜV SÜD',
        certNo: 'Q5 085432 0005 Rev. 05',
        authority: 'TÜV SÜD Product Service GmbH (Munich, Germany)',
        scope: 'Complete governance of medical cable and NIBP cuff design, cleanroom manufacturing, ultrasonic welding, high-pot testing, and global export distribution.',
        details: 'Audited medical device quality management system for design, production, and distribution of physiological patient monitoring accessories.'
      },
      {
        badge: 'Saudi SFDA & UK MHRA',
        tag: '🇸🇦',
        status: 'SFDA & MHRA',
        certNo: 'MDMA-2-2026-1404',
        authority: 'Saudi Food and Drug Authority & UK MHRA',
        scope: 'Official market clearance across Saudi Arabia, United Kingdom, and the Middle East for hospital procurement and tender compliance.',
        details: 'Saudi SFDA Medical Device Marketing Authorization MDMA-2-2026-1404 and UK MHRA Registration 2022111601285087.'
      }
    ],
    factory: {
      tag: 'Direct Source Precision Factory',
      title: 'Rigorous Quality Engineering Inside Shenzhen Cleanrooms',
      description: 'Equipped with high-frequency ultrasonic welding stations, precision pneumatic burst pressure testing rigs, and automated 100% water submersion inspection lines. We ensure zero air micro-leakage and zero hospital cross-infection.',
      photos: [
        {
          tag: 'Cleanroom',
          title: 'Class 100,000 Workshop',
          description: 'Dust-free automated ultrasonic welding & injection molding',
          image: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg'
        },
        {
          tag: 'Testing Lab',
          title: 'Pneumatic QC Test Lab',
          description: '100% water submersion 300 mmHg test & >600 mmHg burst testing',
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

  // FAQs Section
  faqs: [
    {
      q: 'How does Medke guarantee zero-leakage for NIBP cuffs and hoses?',
      question: 'How does Medke guarantee zero-leakage for NIBP cuffs and hoses?',
      a: '100% of manufactured cuffs undergo 300 mmHg static pressure water submersion testing for 30 seconds (zero micro-bubble leak limit, pressure drop ≤ 3 mmHg/min). Ultrasonic welded seams withstand extreme burst pressure testing ≥ 600 mmHg for over 3 minutes.',
      answer: '100% of manufactured cuffs undergo 300 mmHg static pressure water submersion testing for 30 seconds (zero micro-bubble leak limit, pressure drop ≤ 3 mmHg/min). Ultrasonic welded seams withstand extreme burst pressure testing ≥ 600 mmHg for over 3 minutes.'
    },
    {
      q: 'Are your cuffs fully compatible with Philips, GE Dinamap, and Mindray monitors?',
      question: 'Are your cuffs fully compatible with Philips, GE Dinamap, and Mindray monitors?',
      a: 'Yes. Medke manufactures 30+ precision metal and polymer pneumatic connectors matching the exact pinouts and locking interfaces of leading OEM monitors (Philips, GE Dinamap/Marquette/Datex, Mindray, Welch Allyn FlexiPort, Dräger, Colin, Nihon Kohden). Simply specify your monitor model or connector code in our inquiry form or on WhatsApp.',
      answer: 'Yes. Medke manufactures 30+ precision metal and polymer pneumatic connectors matching the exact pinouts and locking interfaces of leading OEM monitors (Philips, GE Dinamap/Marquette/Datex, Mindray, Welch Allyn FlexiPort, Dräger, Colin, Nihon Kohden). Simply specify your monitor model or connector code in our inquiry form or on WhatsApp.'
    },
    {
      q: 'Which specific models are covered under FDA 510(k) K242623?',
      question: 'Which specific models are covered under FDA 510(k) K242623?',
      a: 'K242623 strictly covers all Medke reusable cuff models (Infant to Thigh, C6511~C6911) and neonatal disposable models Size 1 to Size 5 (C0101 through C0105). All covered products carry official 510(k) clearance documentation for hospital tender submissions.',
      answer: 'K242623 strictly covers all Medke reusable cuff models (Infant to Thigh, C6511~C6911) and neonatal disposable models Size 1 to Size 5 (C0101 through C0105). All covered products carry official 510(k) clearance documentation for hospital tender submissions.'
    },
    {
      q: 'What cleaning agents and disinfection methods are recommended for Reusable C6 cuffs?',
      question: 'What cleaning agents and disinfection methods are recommended for Reusable C6 cuffs?',
      a: 'Medke C6 series features a premium polyurethane (PU) composite surface that resists blood and iodine penetration. It is fully rated for repeated wipe-downs using 1:10 sodium hypochlorite (bleach), 70% isopropyl alcohol, and quaternary ammonium compounds without material embrittlement.',
      answer: 'Medke C6 series features a premium polyurethane (PU) composite surface that resists blood and iodine penetration. It is fully rated for repeated wipe-downs using 1:10 sodium hypochlorite (bleach), 70% isopropyl alcohol, and quaternary ammonium compounds without material embrittlement.'
    },
    {
      q: 'What is the MOQ, lead time, and sample policy for B2B dealers and hospital bids?',
      question: 'What is the MOQ, lead time, and sample policy for B2B dealers and hospital bids?',
      a: 'Evaluation samples are available for qualified medical distributors and hospital clinical trials. Standard catalog items ship within 3–5 business days; OEM customized branding, specific hose lengths, and private packaging require 10–14 business days via DHL/FedEx door-to-door express.',
      answer: 'Evaluation samples are available for qualified medical distributors and hospital clinical trials. Standard catalog items ship within 3–5 business days; OEM customized branding, specific hose lengths, and private packaging require 10–14 business days via DHL/FedEx door-to-door express.'
    }
  ]
};
