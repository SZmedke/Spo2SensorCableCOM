export const ecgLandingData = {
  eyebrow: 'DEFIBRILLATION-PROOF · CE MDR CERTIFIED · ISO 13485:2016',
  title: 'Medical-Grade ECG & EKG Cables & Leadwires',
  lead: 'Source manufacturer of 3-lead, 5-lead, and 12-lead patient monitoring cables. Compatible with GE Marquette, Philips, Mindray, Nihon Kohden, and Schiller. Built with low-noise TPU and 5000V high-pot defibrillation protection.',
  metrics: [
    { value: '17+ Years', label: 'Medical Cables' },
    { value: '4,000㎡', label: 'Smart Facility' },
    { value: '149+ SKUs', label: 'ECG in Stock' },
    { value: '100+', label: 'Global Markets' }
  ],
  trustBadges: [
    'Average Quote: < 2.4 Hours',
    'Free Clinical Evaluation Samples',
    'Direct Factory Pricing'
  ],
  heroCard: {
    badge: '5000V High-Pot Tested',
    title: 'Precision ECG / EKG Cable Series',
    subtitle: 'Diagnostic, Telemetry & ICU Monitoring',
    image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-trunk-cable.jpg',
    specs: [
      { label: 'Configurations', value: '3-Lead, 5-Lead, 10-Lead, 12-Lead' },
      { label: 'Terminations', value: 'Snap, Grabber/Clip, 4.0mm Banana, Din 3.0' },
      { label: 'Protection', value: 'Integrated Defibrillation Resistors (1k-20kΩ)' }
    ]
  },
  brands: [
    {
      id: 'philips',
      name: 'PHILIPS',
      series: 'TC & IntelliVue Series',
      logo: 'https://sc02.alicdn.com/kf/H6842b29967f94ac4a247c0939767bdc5H.jpg'
    },
    {
      id: 'ge',
      name: 'GE HealthCare',
      series: 'MAC 1200/2000 & Solar',
      logo: 'https://sc02.alicdn.com/kf/H2de2fe1bc2874a34b611b4e7763b5646l.jpg'
    },
    {
      id: 'mindray',
      name: 'MINDRAY',
      series: 'BeneHeart & BeneView',
      logo: 'https://sc02.alicdn.com/kf/He4ee7b61b8f84779a0d8a646e9bf1648r.jpg'
    },
    {
      id: 'masimo',
      name: 'MASIMO',
      series: 'Rainbow Direct Leads',
      logo: 'https://sc02.alicdn.com/kf/Hcc5f1c546618422693f8dfae8e161d15m.jpg'
    },
    {
      id: 'nellcor',
      name: 'NELLCOR',
      series: 'ECG Intermediary Cables',
      logo: 'https://sc02.alicdn.com/kf/Hf6a7aac850164833b002b6e934f2ac3cP.jpg'
    },
    {
      id: 'nihon-kohden',
      name: 'NIHON KOHDEN',
      series: 'Cardiofax Series',
      logo: 'https://sc02.alicdn.com/kf/H82a652963c774ed7a864fde37ca63fbfJ.jpg'
    },
    {
      id: 'schiller',
      name: 'SCHILLER',
      series: 'Cardiovit Series',
      logo: 'https://sc02.alicdn.com/kf/H7cbd983568e849a4afd83a596189a6adB.jpg'
    },
    {
      id: 'drager',
      name: 'DRÄGER',
      series: 'Infinity MultiMed Pods',
      logo: 'https://www.spo2sensorcable.com/assets/images/clients/client-logo-drager.png'
    }
  ],
  brandGuarantee: [
    '5000V High-Pot Tested · Zero Electrical Breakdown',
    'Defibrillation Proof Resistors (1kΩ / 10kΩ / 20kΩ)',
    'Free Clinical Evaluation Samples Available'
  ],
  compatibility: {
    brands: [
      { id: 'philips', name: 'Philips' },
      { id: 'ge', name: 'GE Marquette' },
      { id: 'mindray', name: 'Mindray' },
      { id: 'nihon-kohden', name: 'Nihon Kohden' },
      { id: 'schiller', name: 'Schiller' },
      { id: 'drager', name: 'Dräger' }
    ],
    items: {
      philips: [
        {
          model: 'IntelliVue MP / MX / MMS M3001A Module',
          sensorType: 'ECG Trunk Cable (12-Pin Round to AAMI 8-Pin)',
          pinout: '12-Pin Round Plastic Connector (2.7m)',
          oemPn: 'M1668A / M1669A',
          medkePn: 'G3111D',
          highlight: 'Built-in 5000V high-pot isolation'
        },
        {
          model: 'IntelliVue & PageWriter TC30 / TC50 / TC70',
          sensorType: '5-Lead Detachable Leadwire Set (Snap / Grabber)',
          pinout: 'AAMI 8-Pin to Snap / Grabber (1.0m / 1.6m)',
          oemPn: 'M1603A / M1605A',
          medkePn: 'G5111S',
          highlight: 'AHA & IEC color codes available'
        },
        {
          model: 'PageWriter Diagnostic Cardiograph 10-Lead',
          sensorType: '1-Piece 10-Lead Resting EKG Cable',
          pinout: 'DB15 Male with thumbscrews (3.2m)',
          oemPn: 'M2461A / 989803151631',
          medkePn: 'G1111B',
          highlight: 'Integrated 10kΩ protective resistors'
        }
      ],
      ge: [
        {
          model: 'Dash 2000 - 5000 / Solar 8000M / Tram Module',
          sensorType: 'Multi-Link 5-Lead ECG Trunk Cable',
          pinout: '11-Pin Rectangular Connector (3.6m)',
          oemPn: '412682-001 / 2017006-001',
          medkePn: 'G3102D',
          highlight: 'Gold-plated Multi-Link interface'
        },
        {
          model: 'MAC 1200 / 1600 / 2000 / 5500 EKG Machines',
          sensorType: '10-Lead Resting EKG Trunk Cable with Leads',
          pinout: 'DB15 Male Connector with Screw Locks (3.0m)',
          oemPn: '22341809 / 38401816',
          medkePn: 'G1102B',
          highlight: '4.0mm Banana & Din 3.0 options'
        },
        {
          model: 'ApexPro / ApexPro CH Telemetry Transmitters',
          sensorType: 'Direct 5-Lead Snap Telemetry Leadwires',
          pinout: 'Multi-pin Telemetry Plug to Snap (0.9m)',
          oemPn: '414556-003',
          medkePn: 'G5102T',
          highlight: 'Ultra-lightweight low-noise shielding'
        }
      ],
      mindray: [
        {
          model: 'BeneView T5 - T9 / BeneVision N12 - N22',
          sensorType: '12-Pin Round 5-Lead ECG Trunk Cable',
          pinout: '12-Pin Round Smart Connector (3.0m)',
          oemPn: '0010-30-42721 / 115-018015-00',
          medkePn: 'G3103D',
          highlight: 'Defibrillation protected to 5000V'
        },
        {
          model: 'BeneHeart D3 / D6 Defibrillator Monitor',
          sensorType: 'Defibrillator Dedicated 3-Lead / 5-Lead Cable',
          pinout: '6-Pin Round Lemo-Style Connector (3.0m)',
          oemPn: '0010-30-42719',
          medkePn: 'G3103B',
          highlight: 'High-energy shock discharge resistant'
        },
        {
          model: 'iMEC / uMEC / PM-7000 / PM-8000 Series',
          sensorType: 'One-Piece 5-Lead Patient ECG Cable',
          pinout: 'Round 12-Pin to Snap / Grabber (3.0m)',
          oemPn: '040-000456-00',
          medkePn: 'G5103A',
          highlight: 'Durable integrated strain relief'
        }
      ],
      'nihon-kohden': [
        {
          model: 'Life Scope i / BSM-2300 / BSM-4100 / BSM-5100',
          sensorType: 'ECG Patient Cable 3-Lead / 6-Lead',
          pinout: 'Round 8-Pin Plastic Keyed Plug (3.0m)',
          oemPn: 'JC-906P / K911',
          medkePn: 'G3108D',
          highlight: 'Precision dual-spring terminal contacts'
        },
        {
          model: 'Cardiofax ECG-1150 / 1250 / 1350 / 2350',
          sensorType: '10-Lead Resting EKG Patient Cable',
          pinout: 'DB15 Male Connector with 10 Leads (3.2m)',
          oemPn: 'BA-901D / K922',
          medkePn: 'G1108B',
          highlight: '10kΩ resistor integrated per lead'
        }
      ],
      schiller: [
        {
          model: 'Cardiovit AT-1 / AT-2 / AT-102 / AT-104',
          sensorType: '10-Lead Resting Diagnostic Cable',
          pinout: 'DB15 Male with thumbscrews (3.0m)',
          oemPn: '2.400071 / 2.400070',
          medkePn: 'G1107B',
          highlight: 'Direct replacement for Cardiovit'
        },
        {
          model: 'Argus LCM / Pro Patient Monitors',
          sensorType: '3-Lead / 5-Lead Patient Cable',
          pinout: 'Round 7-Pin Metal Connector (3.0m)',
          oemPn: '2.400055',
          medkePn: 'G3107D',
          highlight: 'Medical-grade high-flex TPU core'
        }
      ],
      drager: [
        {
          model: 'Infinity Vista / Delta / Kappa / Gamma XL',
          sensorType: 'MultiMed Plus Pod Intermediate Cable',
          pinout: 'MultiMed Multi-Pin to Pod (2.5m)',
          oemPn: 'MS20093 / 3368391',
          medkePn: 'G3106D',
          highlight: 'Zero cross-talk audio & ECG shield'
        },
        {
          model: 'Dräger Infinity Patient Monitoring Telemetry',
          sensorType: 'MonoLead 3-Lead / 5-Lead Dual Cable',
          pinout: 'Dual-Connector Pod to Snap (1.5m / 2.0m)',
          oemPn: 'MS14555 / MS14556',
          medkePn: 'G5106M',
          highlight: 'Tangle-free molded ribbon design'
        }
      ]
    }
  },
  categories: [
    {
      title: 'ECG/EKG Cables',
      tag: '12-Lead Diagnostic & Resting',
      image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-cables.jpg',
      desc: 'One-piece diagnostic ECG cables for resting electrocardiographs with built-in 10kΩ/20kΩ defibrillation protection resistors.',
      specs: [
        'DB15, DB25, and proprietary multi-pin connectors',
        '4.0mm banana, Din 3.0, snap, and grabber terminations',
        'Compatible with Schiller, GE MAC, Nihon Kohden, Edan'
      ]
    },
    {
      title: 'ECG Trunk Cable & Leadwires',
      tag: 'ICU & Bedside Modular Bridge',
      image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-trunk-cable.jpg',
      desc: 'Modular trunk cables and detachable leadwires designed for bedside patient monitoring systems.',
      specs: [
        '12-Pin Round, 11-Pin Multi-Link, MultiMed interfaces',
        '3-lead, 5-lead, and 6-lead configurations (Snap & Grabber)',
        'Double-shielded TPU jacket resistant to disinfectant wipes'
      ]
    },
    {
      title: 'Disposable ECG Leadwires',
      tag: 'Single-Patient Infection Control',
      image: 'https://sc02.alicdn.com/kf/Hfd9d67cf8ee54e9c91d5f242ef097073v.jpg',
      desc: 'Pre-wired peelable ribbon leadwire sets engineered for OR, emergency, and ICU environments to prevent cross-contamination.',
      specs: [
        'Single-patient use eliminates hospital cleaning costs',
        'Color-coded ribbon wire with tangle-free peel design',
        'Radiotranslucent carbon fiber options for X-ray / Cath lab'
      ]
    },
    {
      title: 'Multi-Parameter Patient Cables',
      tag: 'Integrated Bedside Hubs',
      image: 'https://sc02.alicdn.com/kf/Hfbb4c353791c42848e30f8024c5545cfV.jpg',
      desc: 'Integrated all-in-one patient cable hubs combining ECG, SpO2, and dual-channel temperature monitoring into a single master trunk.',
      specs: [
        'Reduces bedside cable clutter by over 60%',
        'Integrated Dräger MultiMed & Philips Quad style hubs',
        'High-density molded strain relief withstands 20kg tensile'
      ]
    },
    {
      title: 'Holter Recorder ECG',
      tag: '24-48h Ambulatory Cardiology',
      image: 'https://sc02.alicdn.com/kf/Ac1eaac1c4e09462a8d8bd07438170799b.png',
      desc: 'Ultra-flexible shielded leadwire sets for continuous ambulatory cardiac recording with zero baseline drift.',
      specs: [
        'Ultra-low microphonic noise copper-tinsel conductors',
        'Compatible with DMS 26-Pin, Mortara, Rozinn, Biocare',
        '7-lead, 10-lead, and 12-lead snap lead sets'
      ]
    },
    {
      title: 'EKG Accessories',
      tag: 'Electrodes & Hardware',
      image: 'https://www.spo2sensorcable.com/assets/images/products/ecg-cable/ecg-accessories.jpg',
      desc: 'Comprehensive clinical hardware including limb clamps, suction chest bulbs, alligator adapters, and lead separators.',
      specs: [
        'Adult & pediatric suction chest electrodes (Ag/AgCl)',
        '4-color peripheral limb clamp electrode sets',
        '4.0mm banana to snap/clip alligator converter adapters'
      ]
    }
  ],
  trustProof: {
    certificates: [
      {
        badge: 'ISO 13485:2016',
        authority: 'Audited by TÜV SÜD Product Service GmbH',
        certNo: 'Certificate No. Q5 092823 0005 Rev. 01',
        scope: 'Design, Development and Manufacture of Medical Sensors, Patient Monitoring Cables & Accessories'
      },
      {
        badge: 'CE MDR 2017/745',
        authority: 'EU Medical Device Regulation (Notified Body 0123)',
        certNo: 'EU MDR Quality Management System Certificate',
        scope: 'Class IIa Certified Diagnostic & Therapeutic Patient Monitoring Connection Cables'
      },
      {
        badge: 'FDA 510(k) Cleared',
        authority: 'US Food and Drug Administration (CDRH)',
        certNo: 'Premarket Notification K192842',
        scope: 'Cleared for US Hospital Distribution: SpO2 & Patient Monitoring Cable Assemblies'
      }
    ],
    facilities: [
      {
        title: 'Class 100,000 Cleanroom Workshop',
        desc: 'Dust-free, ESD-protected automated assembly lines ensuring medical-grade optical sensor alignment.',
        image: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg'
      },
      {
        title: 'High-Pot QC & Reliability Lab',
        desc: '5000V high-pot dielectric strength verification, 10,000+ flexure testing, and salt spray chambers.',
        image: 'https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg'
      },
      {
        title: 'Finished Goods Buffer & Logistics',
        desc: 'Over 149 ECG cable SKUs buffered in central Shenzhen warehouse for 48-hour global air dispatch.',
        image: 'https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg'
      }
    ]
  },
  faqs: [
    {
      q: 'What defibrillation protection is built into Medke ECG cables?',
      a: 'All Medke diagnostic ECG and bedside monitoring cables feature integrated high-voltage current-limiting resistors (1kΩ, 10kΩ, or 20kΩ depending on monitor circuit requirements). Every production batch undergoes 5000V high-pot spark testing to guarantee patient isolation and equipment protection during emergency defibrillation shocks.'
    },
    {
      q: 'Are your leadwires available in both AHA (US) and IEC (European) color codes?',
      a: 'Yes. All 3-lead, 5-lead, and 10-lead cables and detachable leadwire sets are manufactured in both standard AHA (White, Black, Red, Green, Brown) and IEC (Red, Yellow, Green, Black, White) color-coded configurations. Clear anatomical lettering (RA, LA, RL, LL, V1-V6) is molded into each terminal.'
    },
    {
      q: 'Can Medke produce custom connector molds for OEM monitor manufacturers?',
      a: 'Yes. We provide complete in-house tooling, mold injection, and cable extrusion services. If you require custom pinouts, keyed plugs, metal push-pull locking connectors, or embedded PCB signal filter boards, our engineering team can deliver prototypes within 14 business days.'
    },
    {
      q: 'What is the lifespan and cleaning resistance of Medke medical TPU jackets?',
      a: 'Medke ECG cables utilize custom-formulated medical-grade thermoplastic polyurethane (TPU) outer jackets. They are engineered to endure over 10,000 bending fatigue cycles and resist breakdown from aggressive hospital disinfectants including Isopropyl Alcohol, Bleach (Sodium Hypochlorite), and Quaternary Ammonium compounds.'
    },
    {
      q: 'How fast can Medke fulfill bulk wholesale orders for hospital tenders?',
      a: 'We maintain safety stock for over 149 standard ECG/EKG cable SKUs in our Shenzhen logistics center. Stock orders ship within 48 to 72 hours via expedited air freight (3 to 5 business days worldwide delivery). Large hospital tender shipments (1,000 to 10,000 pieces) are typically delivered within 2 to 3 weeks.'
    }
  ]
};
