export const spo2LandingData = {
  categoryType: 'SpO2',
  eyebrow: 'FDA 510(k) CLEARED · CE MDR CERTIFIED · ISO 13485:2016',
  title: 'Reliable SpO2 Sensors & Adapter Cables',
  lead: 'Source manufacturer with 17 years of patient monitoring cable expertise. 90%+ OEM monitor compatibility, medical-grade TPU jackets, and flexible low MOQ for global distributors.',
  metrics: [
    { value: '17+ Years', label: 'Medical Cables' },
    { value: '4,000㎡', label: 'Smart Factory' },
    { value: '123+ SKUs', label: 'SpO2 in Stock' },
    { value: '100+', label: 'Export Countries' }
  ],
  trustBadges: [
    'Average Quote: < 2.4 Hours',
    'Free Clinical Evaluation Samples',
    'Direct Factory Pricing'
  ],
  heroCard: {
    badge: '100% Tested & Verified',
    title: 'Precision SpO2 Sensor Series',
    subtitle: 'Adult, Pediatric & Infant Monitoring',
    image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-disposable.jpg',
    specs: [
      { label: 'Connectors', value: 'DB9, 8-Pin, 11-Pin, 14-Pin Multi-Link' },
      { label: 'Cable Core', value: 'Medical-grade TPU, Dual Shielding' },
      { label: 'Compliance', value: 'ISO 80601-2-61, RoHS & REACH' }
    ]
  },
  brands: [
    {
      id: 'philips',
      name: 'PHILIPS',
      series: 'IntelliVue & SureSigns',
      logo: 'https://sc02.alicdn.com/kf/H6842b29967f94ac4a247c0939767bdc5H.jpg'
    },
    {
      id: 'ge',
      name: 'GE HealthCare',
      series: 'Dash, Solar & Carescape',
      logo: 'https://sc02.alicdn.com/kf/H2de2fe1bc2874a34b611b4e7763b5646l.jpg'
    },
    {
      id: 'mindray',
      name: 'MINDRAY',
      series: 'BeneView & BeneVision',
      logo: 'https://sc02.alicdn.com/kf/He4ee7b61b8f84779a0d8a646e9bf1648r.jpg'
    },
    {
      id: 'masimo',
      name: 'MASIMO',
      series: 'Rainbow & RD SET',
      logo: 'https://sc02.alicdn.com/kf/Hcc5f1c546618422693f8dfae8e161d15m.jpg'
    },
    {
      id: 'nellcor',
      name: 'NELLCOR',
      series: 'OxiMax & Non-OxiMax',
      logo: 'https://sc02.alicdn.com/kf/Hf6a7aac850164833b002b6e934f2ac3cP.jpg'
    },
    {
      id: 'nihon-kohden',
      name: 'NIHON KOHDEN',
      series: 'Life Scope Series',
      logo: 'https://sc02.alicdn.com/kf/H82a652963c774ed7a864fde37ca63fbfJ.jpg'
    },
    {
      id: 'schiller',
      name: 'SCHILLER',
      series: 'AT-Series & Argus',
      logo: 'https://sc02.alicdn.com/kf/H7cbd983568e849a4afd83a596189a6adB.jpg'
    },
    {
      id: 'drager',
      name: 'DRÄGER',
      series: 'Infinity & MultiMed',
      logo: 'https://www.spo2sensorcable.com/assets/images/clients/client-logo-drager.png'
    }
  ],
  brandGuarantee: [
    '100% Optical Wavelength Matching (660nm / 905nm)',
    'Direct 1-to-1 OEM Pinout & Resistor Values',
    'Free Clinical Evaluation Samples Available'
  ],
  compatibility: {
    brands: [
      { id: 'philips', name: 'Philips' },
      { id: 'ge', name: 'GE Healthcare' },
      { id: 'mindray', name: 'Mindray' },
      { id: 'masimo', name: 'Masimo' },
      { id: 'nellcor', name: 'Nellcor' },
      { id: 'nihon-kohden', name: 'Nihon Kohden' }
    ],
    items: {
      philips: [
        {
          model: 'IntelliVue MP20 - MP90 / MX400 - MX800',
          sensorType: 'Reusable Adult Finger Clip',
          pinout: '8-Pin D-Shape Connector (3.0m)',
          oemPn: 'M1191B / M1196A',
          medkePn: 'P9311A',
          highlight: 'Gold-plated pins, zero attenuation'
        },
        {
          model: 'SureSigns VM4 / VM6 / VM8 / VS3',
          sensorType: 'Disposable Soft Foam Wrap (Neonate/Adult)',
          pinout: '8-Pin D-Shape Connector (0.9m)',
          oemPn: 'M1904B / M1903B',
          medkePn: 'P1311A',
          highlight: 'Medical 3M adhesive, biocompatible'
        },
        {
          model: 'Philips IntelliVue Patient Monitors',
          sensorType: 'SpO2 Adapter / Extension Cable',
          pinout: '8-Pin D-Shape to DB9 Female (2.2m)',
          oemPn: 'M1941A / 989803105641',
          medkePn: 'P0211A',
          highlight: 'High flex TPU, dual noise shielding'
        }
      ],
      ge: [
        {
          model: 'Dash 2500 / 3000 / 4000 / 5000',
          sensorType: 'Reusable Adult Finger Clip (OxyTip+)',
          pinout: '11-Pin Rectangular Connector (3.0m)',
          oemPn: 'TS-F4-GE / OXY-F-DB',
          medkePn: 'P9302B',
          highlight: 'Precision dual-wavelength photo sensor'
        },
        {
          model: 'Solar 8000M / Carescape B650 / B850',
          sensorType: 'Disposable Foam Sensor (Adult / Pedi)',
          pinout: '11-Pin Connector (0.9m)',
          oemPn: 'MAX-A / MAX-P (GE Module)',
          medkePn: 'P1302B',
          highlight: 'Cost saving > 50% vs OEM list price'
        },
        {
          model: 'Carescape & Tram Multi-Parameter Modules',
          sensorType: 'SpO2 Trunk Adapter Cable',
          pinout: '11-Pin to DB9 Female Intermediary (2.4m)',
          oemPn: '2021178-001',
          medkePn: 'P0202B',
          highlight: 'Integrated mold relief, long life'
        }
      ],
      mindray: [
        {
          model: 'BeneView T5 / T6 / T8 / T9',
          sensorType: 'Reusable Adult Finger Clip (Mindray Tech)',
          pinout: '7-Pin Round Connector (3.0m)',
          oemPn: '512F-30-28263',
          medkePn: 'P9303C',
          highlight: '10,000+ bend fatigue tested cable'
        },
        {
          model: 'BeneVision N12 / N15 / N17 / N22',
          sensorType: 'Reusable Silicone Soft Tip (Pediatric)',
          pinout: '8-Pin Round Smart Connector (3.0m)',
          oemPn: '115-018012-00',
          medkePn: 'P8303C',
          highlight: 'Non-irritant medical silicone cap'
        },
        {
          model: 'uMEC 10 / 12 / iMEC Series',
          sensorType: 'SpO2 Adapter Cable',
          pinout: 'Round 6-Pin to DB9 Female (2.5m)',
          oemPn: '0010-30-42719',
          medkePn: 'P0203C',
          highlight: 'Direct replacement with OEM accuracy'
        }
      ],
      masimo: [
        {
          model: 'Rad-57 / Radical-7 / Rad-8 (Rainbow)',
          sensorType: 'Reusable Rainbow SpO2 Sensor',
          pinout: '20-Pin Rainbow Direct Plug (3.0m)',
          oemPn: '2001 / DC-12',
          medkePn: 'P9305M',
          highlight: 'High perfusion signal processing'
        },
        {
          model: 'RD SET Patient Cable Series',
          sensorType: 'RD SET to DB9 Adapter Cable',
          pinout: 'RD SET Sensor Connector to DB9 (2.4m)',
          oemPn: '4073 / MD20-05',
          medkePn: 'P0205R',
          highlight: 'Flat lightweight ribbon interface'
        }
      ],
      nellcor: [
        {
          model: 'Bedside SpO2 PM1000N / N-600x / N-560',
          sensorType: 'Reusable OxiMax Adult Sensor',
          pinout: 'DB9 Male with Calibration Chip (3.0m)',
          oemPn: 'DS-100A',
          medkePn: 'P9301A',
          highlight: 'Equipped with accurate EEPROM chip'
        },
        {
          model: 'OxiMax Compatible Fleet Monitoring',
          sensorType: 'Disposable Adhesive Sensor (Adult)',
          pinout: 'DB9 Male Flat Cable (0.9m)',
          oemPn: 'MAX-A / MAX-AL',
          medkePn: 'P1301A',
          highlight: 'Sterile blister pack, latex free'
        },
        {
          model: 'Nellcor OxiMax Patient Interface',
          sensorType: 'DOC-10 OxiMax Extension Cable',
          pinout: '14-Pin Round to DB9 Female (2.4m)',
          oemPn: 'DOC-10 / MC-10',
          medkePn: 'P0201A',
          highlight: 'Triple shielded, eliminates RF noise'
        }
      ],
      'nihon-kohden': [
        {
          model: 'Life Scope i / BSM-2300 / BSM-4100 / BSM-5100',
          sensorType: 'Reusable Adult Finger Clip',
          pinout: '8-Pin Round Plastic Connector (3.0m)',
          oemPn: 'TL-201T / K911',
          medkePn: 'P9308A',
          highlight: 'Precision dual-spring finger clip'
        },
        {
          model: 'Life Scope TR / VS / G Series',
          sensorType: 'SpO2 Adapter Trunk Cable',
          pinout: '14-Pin Round to DB9 Female (2.5m)',
          oemPn: 'JL-900P / K931',
          medkePn: 'P0208A',
          highlight: 'Reinforced strain reliefs at both ends'
        }
      ]
    }
  },
  categories: [
    {
      title: 'Disposable SpO2 Sensor',
      tag: 'Single-Patient Infection Control',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-disposable.jpg',
      desc: 'Single-use adhesive sensors designed for OR, ICU, and emergency wards to eliminate hospital-acquired cross-infection (HAIs).',
      specs: [
        'Medical 3M porous fabric, foam, or transore tape',
        'Adult, pediatric, infant & neonatal wrapping styles',
        'Sterile individual packaging, latex-free formulation'
      ]
    },
    {
      title: 'Reusable SpO2 Sensor',
      tag: 'Durable Daily ICU Monitoring',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-reusable.jpg',
      desc: 'Heavy-duty finger clip and soft silicone tip sensors for routine patient vital sign checks and long-term bed monitoring.',
      specs: [
        'Adult finger clip, pediatric soft tip, neonatal Y-type',
        'Over 10,000 bending cycles with flexible TPU jacket',
        'Gold-plated connector pins ensure zero signal drift'
      ]
    },
    {
      title: 'SpO2 Adapter Cable',
      tag: 'Trunk & Intermediary Bridges',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-adapter-cable.jpg',
      desc: 'Extension and trunk adapter cables bridging OEM monitor sockets to standard sensor probes.',
      specs: [
        'Compatible with Philips 8-Pin, GE 11-Pin, Nellcor 14-Pin',
        'Dual-layer copper braided shielding against EMI / RFI',
        'Durable Kevlar reinforced core with high-tensile resistance'
      ]
    },
    {
      title: 'SpO2 Accessories',
      tag: 'Components & Replacement Parts',
      image: 'https://www.spo2sensorcable.com/assets/images/products/spo2-sensor/spo2-accessories.jpg',
      desc: 'Essential sensor hardware, silicone wraps, ear clip adapters, and replacement rubber cushions.',
      specs: [
        'Adult / pediatric ear clip adapters with uniform pressure',
        'Neonatal multi-site wrap straps with breathable slots',
        'Custom mold tooling & private label branding available'
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
        scope: 'Cleared for US Hospital Distribution: SpO2 Pulse Oximeter Probes & Cable Assemblies'
      }
    ],
    facilities: [
      {
        title: 'Class 100,000 Cleanroom Workshop',
        desc: 'Dust-free, ESD-protected automated assembly lines ensuring medical-grade optical sensor alignment.',
        image: 'https://sc02.alicdn.com/kf/Hb48abb180ecf4e0eb0db9aeed915d8ddz.jpg'
      },
      {
        title: 'Reliability & Tensile Lab',
        desc: '10,000+ flexure testing, salt spray corrosion chambers, and high-pot electrical breakdown verification.',
        image: 'https://sc02.alicdn.com/kf/H991144319ed54718862f7042440066b8f.jpg'
      },
      {
        title: 'Finished Goods Buffer & Logistics',
        desc: 'Over 123 SpO2 SKUs buffered in central Shenzhen warehouse for 48-hour global air dispatch.',
        image: 'https://sc02.alicdn.com/kf/H9e8c17033ad447b8a67ef820513c9cd8o.jpg'
      }
    ]
  },
  faqs: [
    {
      q: 'What is your Minimum Order Quantity (MOQ) for SpO2 sensors and cables?',
      a: 'For standard stock models compatible with Philips, GE, Mindray, and Nellcor, our MOQ is flexible at 10 to 50 pieces mixed. For custom OEM/ODM connector designs or private-label packaging, the starting batch is typically 100 to 500 pieces depending on tooling requirements.'
    },
    {
      q: 'Are Medke SpO2 sensors 100% compatible with original monitor calibration?',
      a: 'Yes. Medke optical sensors utilize selected 660nm (Red) and 905nm/940nm (Infrared) dual-wavelength LEDs paired with low-capacitance photodiode receivers. Resistor encoding values and pin configurations strictly match OEM manufacturer specifications, eliminating calibration alarms or false desaturation readings.'
    },
    {
      q: 'Can we request free samples for hospital engineering clinical evaluation?',
      a: 'Yes. We provide qualified medical equipment distributors, biomedical engineering departments, and purchasing managers with free sample units for hands-on bench testing and clinical fit checks. Please submit your equipment model via the quote form above to request an evaluation kit.'
    },
    {
      q: 'What international medical regulatory certificates do you hold?',
      a: 'Shenzhen Medke Technology operates under ISO 13485:2016 quality management certified by TÜV SÜD. Our core sensor product lines hold CE MDR 2017/745 certification and US FDA 510(k) clearance (K192842). All cable sheath materials pass ISO 10993 cytotoxicity and skin irritation biocompatibility testing.'
    },
    {
      q: 'What is the standard production lead time and international shipping method?',
      a: 'Stock sensors and adapter cables ship within 48 to 72 hours via DHL, FedEx, UPS, or direct air freight (3 to 5 business days delivery worldwide). OEM mass production runs are delivered within 15 to 25 calendar days. Complete export documentation (Certificate of Origin, Commercial Invoice, Packing List) is provided with every shipment.'
    }
  ]
};
