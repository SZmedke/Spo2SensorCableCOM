// Medke catalog seed data.
// Facts traced to sensorsandcable.com (2026-08 audit) and user confirmations.
// NOTE: per-product spec values are seed placeholders awaiting the full 472-SKU import (Phase 5).

export const COMPANY = {
  name: 'Medke',
  legalName: 'Shenzhen Medke Technology Co., Ltd.',
  founded: 2008,
  years: '14+',
  projects: '349+',
  countries: '100+',
  productCount: 472,
  categoryCount: 27,
  topCategoryCount: 5,
  email: 'contact@medke.com',
  phone: '(0)755 2346-3462',
  whatsapp: '+86 153 0265 4212',
  whatsappLink: 'https://wa.me/8615302654212',
  address: '4-5/F, Bldg A1, Anle Ind. Zone, Hangcheng Rd, Bao\'an Dist, Shenzhen 518000, China',
  hours: 'Monday - Friday, 9:00 am - 6:30 pm (GMT+8)',
  responsePromise: 'We reply to every inquiry within 1 business day.',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100077499336024',
    twitter: 'https://twitter.com/Medke_Medical',
    youtube: 'https://www.youtube.com/channel/UCUswQRYZrZjDy0LDZBC4Fkg',
    linkedin: 'https://www.linkedin.com/company/medke/',
    pinterest: 'https://www.pinterest.com/sensorandcables/',
  },
};

export const STATS = [
  { num: '14+', label: 'Years in the business' },
  { num: '472', label: 'Compatible products' },
  { num: '100+', label: 'Countries served' },
  { num: '349+', label: 'Projects completed' },
];

export const CERTS = [
  { code: 'CE', scope: 'Medical device certification for EU market' },
  { code: 'FDA', scope: 'US market registration' },
  { code: 'TUV', scope: 'Product safety testing and certification' },
  { code: 'ISO', scope: 'Quality management system' },
];

export const CATEGORIES = [
  {
    slug: 'patient-monitor-accessories',
    name: 'Patient Monitor Accessories',
    image: '/assets/images/categories/patient-monitoring.jpg',
    blurb: 'SpO2, ECG, NIBP/IBP, temperature and multi-parameter accessories for patient monitors.',
    subcategories: [
      { slug: 'ecg-cable', name: 'ECG cable', count: 90 },
      { slug: 'ibp-cable', name: 'IBP cable', count: 23 },
      { slug: 'nibp-adapter-hoses', name: 'NIBP adapter hoses', count: 21 },
      { slug: 'nibp-connector', name: 'NIBP connector', count: 1 },
      { slug: 'nibp-cuff', name: 'NIBP cuff', count: 5 },
      { slug: 'spo2-adapter-cable', name: 'SpO2 adapter cable', count: 33 },
      { slug: 'spo2-sensor', name: 'SpO2 sensor', count: 90 },
      { slug: 'temperature-probe', name: 'Temperature probe', count: 48 },
    ],
  },
  {
    slug: 'ekg-accessories',
    name: 'EKG Accessories',
    image: '/assets/images/categories/ekg.jpg',
    blurb: 'Electrodes, clips, adaptors and EKG cables. Easily find your part and verify compatibility.',
    subcategories: [
      { slug: 'disposable-foam-electrode', name: 'Disposable foam electrode', count: 6 },
      { slug: 'ecg-adapter-cable', name: 'ECG adapter cable', count: 4 },
      { slug: 'ecg-adapter-clip', name: 'ECG adapter clip', count: 11 },
      { slug: 'ekg-cable', name: 'EKG cable', count: 29 },
      { slug: 'limb-clamp', name: 'Limb clamp', count: 4 },
      { slug: 'suction-electrode', name: 'Suction electrode', count: 5 },
    ],
  },
  {
    slug: 'fetal-monitor-accessories',
    name: 'Fetal Monitor Accessories',
    image: '/assets/images/categories/fetal.jpg',
    blurb: 'Fetal probes compatible with Bionet, Bistos, Comen, Edan, GE Corometrics, Philips and more.',
    subcategories: [{ slug: 'fetal-probe', name: 'Fetal probe', count: 34 }],
  },
  {
    slug: 'ventilator-consumable',
    name: 'Ventilator Consumables',
    image: '/assets/images/categories/ventilator.jpg',
    blurb: 'ETCO2 sensors, oxygen sensors, flow sensors, tubes and filters for ventilators.',
    subcategories: [
      { slug: 'breathing-circuit', name: 'Breathing circuit', count: 3 },
      { slug: 'eeg-cable', name: 'EEG cable', count: 2 },
      { slug: 'etco2-sensor', name: 'ETCO2 sensor', count: 8 },
      { slug: 'flow-sensor', name: 'Flow sensor', count: 4 },
      { slug: 'flow-sensor-cable', name: 'Flow sensor cable', count: 3 },
      { slug: 'oxygen-sensor', name: 'Oxygen sensor', count: 17 },
      { slug: 'sampling-cannula', name: 'Sampling cannula', count: 2 },
      { slug: 'water-trap', name: 'Water trap', count: 3 },
    ],
  },
  {
    slug: 'esu-accessories',
    name: 'ESU Accessories',
    image: '/assets/images/categories/esu.jpg',
    blurb: 'ESU pencils, bipolar cables, grounding pads and forceps for electrosurgery.',
    subcategories: [
      { slug: 'electrocoagulation-cable', name: 'Electrocoagulation cable', count: 8 },
      { slug: 'electrosurgical-forcep', name: 'Electrosurgical forcep', count: 6 },
      { slug: 'electrosurgical-pencil', name: 'Electrosurgical pencil', count: 2 },
      { slug: 'grounding-pad', name: 'Grounding pad', count: 10 },
    ],
  },
];

export const BRANDS = [
  'Philips',
  'GE',
  'Mindray',
  'Drager',
  'Fukuda Denshi',
  'Nihon Kohden',
];

// Seed products (12). images[0] is the card image; gallery uses all images.
// Spec values are placeholders for the full import.
export const PRODUCTS = [
  {
    id: 'p-001',
    partNumber: 'G3149P',
    name: 'Compatible Bionet (146K) ECG Cable',
    categorySlug: 'patient-monitor-accessories',
    subcategory: 'ecg-cable',
    brands: ['Bionet'],
    images: ['/assets/images/products/ecg-cable/ecg-cable-01.jpg', '/assets/images/products/ecg-cable/ecg-cable-02.jpg'],
    description: 'Replacement ECG trunk cable for Bionet patient monitors (146K connector). Compatible replacement part — not an original equipment part.',
    specs: [
      { label: 'Part number', value: 'G3149P' },
      { label: 'Lead configuration', value: '3-lead' },
      { label: 'Cable length', value: '3.0 m' },
      { label: 'Connector', value: 'Bionet 146K' },
      { label: 'Compatible monitors', value: 'Bionet series' },
      { label: 'MOQ', value: '10 pcs' },
    ],
    compat: [
      { brand: 'Bionet', series: ['BM3', 'BM5', 'Cardio7'] },
    ],
    moq: '10 pcs',
    badges: ['Best seller'],
  },
  {
    id: 'p-002',
    partNumber: 'P9305',
    name: 'Compatible Philips Reusable SpO2 Sensor',
    categorySlug: 'patient-monitor-accessories',
    subcategory: 'spo2-sensor',
    brands: ['Philips'],
    images: [
      '/assets/images/products/spo2-sensor/spo2-sensor-01.jpg',
      '/assets/images/products/spo2-sensor/spo2-sensor-02.jpg',
      '/assets/images/products/spo2-sensor/spo2-sensor-03.jpg',
    ],
    description: 'Reusable SpO2 sensor compatible with Philips patient monitors. Soft, flexible and built for daily clinical use.',
    specs: [
      { label: 'Part number', value: 'P9305' },
      { label: 'Type', value: 'Reusable' },
      { label: 'Connector', value: 'Philips 12-pin' },
      { label: 'Cable length', value: '3.0 m' },
      { label: 'Compatible monitors', value: 'Philips IntelliVue, VM series' },
      { label: 'MOQ', value: '10 pcs' },
    ],
    compat: [{ brand: 'Philips', series: ['IntelliVue MX series', 'VM series', 'MP series'] }],
    moq: '10 pcs',
    badges: [],
  },
  {
    id: 'p-003',
    partNumber: 'G3106P',
    name: 'Compatible GE Datex-Ohmeda ECG Cable',
    categorySlug: 'patient-monitor-accessories',
    subcategory: 'ecg-cable',
    brands: ['GE'],
    images: ['/assets/images/hero/hero-product-2.jpg'],
    description: 'Replacement ECG cable for GE Datex-Ohmeda patient monitors. Verified connector fit and lead configuration.',
    specs: [
      { label: 'Part number', value: 'G3106P' },
      { label: 'Lead configuration', value: '5-lead' },
      { label: 'Cable length', value: '3.2 m' },
      { label: 'Connector', value: 'GE Datex-Ohmeda' },
      { label: 'Compatible monitors', value: 'GE Datex-Ohmeda series' },
      { label: 'MOQ', value: '10 pcs' },
    ],
    compat: [{ brand: 'GE', series: ['Datex-Ohmeda S/5', 'CARESCAPE'] }],
    moq: '10 pcs',
    badges: [],
  },
  {
    id: 'p-004',
    partNumber: 'T4508',
    name: 'Compatible Mindray Temperature Probe',
    categorySlug: 'patient-monitor-accessories',
    subcategory: 'temperature-probe',
    brands: ['Mindray'],
    images: ['/assets/images/products/temp-probe/temp-probe-01.jpg'],
    description: 'Reusable skin temperature probe compatible with Mindray patient monitors.',
    specs: [
      { label: 'Part number', value: 'T4508' },
      { label: 'Type', value: 'Skin temperature probe' },
      { label: 'Cable length', value: '1.8 m' },
      { label: 'Compatible monitors', value: 'Mindray BeneView, VS series' },
      { label: 'MOQ', value: '20 pcs' },
    ],
    compat: [{ brand: 'Mindray', series: ['BeneView T series', 'VS series'] }],
    moq: '20 pcs',
    badges: [],
  },
  {
    id: 'p-005',
    partNumber: 'IBP-PH-01',
    name: 'Compatible Philips IBP Cable',
    categorySlug: 'patient-monitor-accessories',
    subcategory: 'ibp-cable',
    brands: ['Philips'],
    images: ['/assets/images/products/ibp-cable/ibp-cable-01.jpg'],
    description: 'Invasive blood pressure cable compatible with Philips monitors.',
    specs: [
      { label: 'Part number', value: 'IBP-PH-01' },
      { label: 'Type', value: 'IBP cable' },
      { label: 'Cable length', value: '3.0 m' },
      { label: 'Connector', value: 'Philips' },
      { label: 'Compatible monitors', value: 'Philips IntelliVue, MP series' },
      { label: 'MOQ', value: '10 pcs' },
    ],
    compat: [{ brand: 'Philips', series: ['IntelliVue', 'MP series'] }],
    moq: '10 pcs',
    badges: [],
  },
  {
    id: 'p-006',
    partNumber: 'NIBP-HS-01',
    name: 'Compatible NIBP Adapter Hose Set',
    categorySlug: 'patient-monitor-accessories',
    subcategory: 'nibp-adapter-hoses',
    brands: ['Philips', 'GE', 'Mindray'],
    images: ['/assets/images/products/nibp-hose/nibp-hose-01.jpg'],
    description: 'NIBP adapter hose set for connecting cuff to monitor. Multiple connector options.',
    specs: [
      { label: 'Part number', value: 'NIBP-HS-01' },
      { label: 'Type', value: 'Adapter hose set' },
      { label: 'Length', value: '2.6 m' },
      { label: 'Connectors', value: 'Philips / GE / Mindray' },
      { label: 'MOQ', value: '10 sets' },
    ],
    compat: [
      { brand: 'Philips', series: ['IntelliVue', 'VM series'] },
      { brand: 'GE', series: ['Dash', 'CARESCAPE'] },
      { brand: 'Mindray', series: ['BeneView', 'VS'] },
    ],
    moq: '10 sets',
    badges: [],
  },
  {
    id: 'p-007',
    partNumber: 'E-CO2-01',
    name: 'Compatible ETCO2 Sensor',
    categorySlug: 'ventilator-consumable',
    subcategory: 'etco2-sensor',
    brands: ['Drager'],
    images: ['/assets/images/products/etco2-sensor/etco2-sensor-01.jpg'],
    description: 'Mainstream ETCO2 sensor compatible with Drager ventilators and anesthesia machines.',
    specs: [
      { label: 'Part number', value: 'E-CO2-01' },
      { label: 'Type', value: 'Mainstream ETCO2 sensor' },
      { label: 'Compatible devices', value: 'Drager ventilators, anesthesia' },
      { label: 'MOQ', value: '5 pcs' },
    ],
    compat: [{ brand: 'Drager', series: ['Evita', 'Savina', 'Fabius'] }],
    moq: '5 pcs',
    badges: ['New'],
  },
  {
    id: 'p-008',
    partNumber: 'FLO-01',
    name: 'Compatible Flow Sensor',
    categorySlug: 'ventilator-consumable',
    subcategory: 'flow-sensor',
    brands: ['Drager'],
    images: ['/assets/images/products/flow-sensor/flow-sensor-01.jpg'],
    description: 'Reusable flow sensor for ventilator breathing circuits.',
    specs: [
      { label: 'Part number', value: 'FLO-01' },
      { label: 'Type', value: 'Flow sensor, reusable' },
      { label: 'Compatible devices', value: 'Drager ventilators' },
      { label: 'MOQ', value: '10 pcs' },
    ],
    compat: [{ brand: 'Drager', series: ['Evita XL', 'Evita 4'] }],
    moq: '10 pcs',
    badges: [],
  },
  {
    id: 'p-009',
    partNumber: 'ESU-GP-01',
    name: 'Compatible ESU Grounding Pad',
    categorySlug: 'esu-accessories',
    subcategory: 'grounding-pad',
    brands: ['Generic ESU'],
    images: ['/assets/images/products/esu-pad/esu-pad-01.jpg'],
    description: 'Single-use electrosurgical grounding pad with conductive adhesive.',
    specs: [
      { label: 'Part number', value: 'ESU-GP-01' },
      { label: 'Type', value: 'Single-use grounding pad' },
      { label: 'Size', value: 'Standard adult' },
      { label: 'Packaging', value: '50 pcs / box' },
      { label: 'MOQ', value: '100 pcs' },
    ],
    compat: [{ brand: 'Generic ESU', series: ['Compatible with standard ESU units'] }],
    moq: '100 pcs',
    badges: [],
  },
  {
    id: 'p-010',
    partNumber: 'BC-01',
    name: 'Compatible Breathing Circuit',
    categorySlug: 'ventilator-consumable',
    subcategory: 'breathing-circuit',
    brands: ['Drager'],
    images: ['/assets/images/products/breathing-circuit/breathing-circuit-01.jpg'],
    description: 'Adult breathing circuit with water trap, compatible with Drager ventilators.',
    specs: [
      { label: 'Part number', value: 'BC-01' },
      { label: 'Type', value: 'Adult breathing circuit' },
      { label: 'Includes', value: 'Water trap, ports' },
      { label: 'Length', value: '1.8 m' },
      { label: 'MOQ', value: '50 pcs' },
    ],
    compat: [{ brand: 'Drager', series: ['Evita', 'Oxylog'] }],
    moq: '50 pcs',
    badges: [],
  },
  {
    id: 'p-011',
    partNumber: 'ECG-AC-01',
    name: 'Compatible ECG Adapter Clip',
    categorySlug: 'ekg-accessories',
    subcategory: 'ecg-adapter-clip',
    brands: ['GE'],
    images: ['/assets/images/products/ecg-clip/ecg-clip-01.jpg'],
    description: 'ECG adapter clips for converting between lead connector types.',
    specs: [
      { label: 'Part number', value: 'ECG-AC-01' },
      { label: 'Type', value: 'Adapter clip' },
      { label: 'Compatible with', value: 'GE / Philips lead sets' },
      { label: 'MOQ', value: '50 pcs' },
    ],
    compat: [{ brand: 'GE', series: ['AHA', 'IEC lead sets'] }],
    moq: '50 pcs',
    badges: [],
  },
  {
    id: 'p-012',
    partNumber: 'ELE-FO-01',
    name: 'Compatible Disposable Foam Electrode',
    categorySlug: 'ekg-accessories',
    subcategory: 'disposable-foam-electrode',
    brands: ['Generic ECG'],
    images: ['/assets/images/products/foam-electrode/foam-electrode-01.jpg'],
    description: 'Disposable foam ECG electrodes, gel-free and skin-friendly for short-term monitoring.',
    specs: [
      { label: 'Part number', value: 'ELE-FO-01' },
      { label: 'Type', value: 'Disposable foam electrode' },
      { label: 'Packaging', value: '50 pcs / pack' },
      { label: 'MOQ', value: '200 pcs' },
    ],
    compat: [{ brand: 'Generic ECG', series: ['All standard ECG lead sets'] }],
    moq: '200 pcs',
    badges: [],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Alexander',
    country: 'Cyprus',
    quote: 'The negotiating process was fast and easy. The partners are very kind and professional. They lead you through the whole process and follow up execution. The product is exceeding our expectations. Very soft and high quality production. All as described, no defects whatsoever. I would warmly recommend the seller and the product.',
  },
  {
    name: 'Chris',
    quote: 'When we send an email to Medke for information, we received an immediate response and professional guidance. MEDKE is willing to go the extra mile and ready to look for a solution. We appreciate the service they offer.',
  },
  {
    name: 'Boris',
    quote: 'Items in good condition, shipped quickly. This seller was absolutely wonderful and went above and beyond to help!',
  },
  {
    name: 'VanLoon',
    quote: 'Quick response for price and delivery terms. After the order, I got good shipment information. Product was well packed and arrived a day earlier than expected.',
  },
];

export const APPLICATIONS = [
  {
    slug: 'patient-monitoring',
    name: 'Patient Monitoring',
    image: '/assets/images/applications/icu.png',
    summary: 'SpO2, ECG, BP and temperature accessories for ICU, CCU and general ward patient monitors.',
    categories: ['patient-monitor-accessories'],
  },
  {
    slug: 'operating-room',
    name: 'Operating Room',
    image: '/assets/images/applications/or.png',
    summary: 'ESU accessories and monitoring cables for surgical procedures.',
    categories: ['esu-accessories'],
  },
  {
    slug: 'emergency-transport',
    name: 'Emergency & Transport',
    image: '/assets/images/applications/emergency.png',
    summary: 'Durable cables and sensors for emergency departments and transport monitoring.',
    categories: ['patient-monitor-accessories', 'ekg-accessories'],
  },
  {
    slug: 'obstetrics-gynecology',
    name: 'Obstetrics & Gynecology',
    image: '/assets/images/applications/ward.png',
    summary: 'Fetal probes for fetal monitors, compatible with Bionet, Bistos, Comen, Edan, GE Corometrics, Philips and more.',
    categories: ['fetal-monitor-accessories'],
  },
];

export const TIMELINE = [
  { year: '2008', title: 'Founded in Shenzhen', fact: 'Medke established in Bao\'an District, Shenzhen, China.' },
  { year: 'Since 2008', title: '14+ years of manufacturing', fact: 'Specialized in medical accessories R&D, production and sales.' },
  { year: 'Today', title: '349+ projects, 100+ countries', fact: 'TUV, CE & FDA certified; serving distributors in over 100 countries and regions.' },
];

export const FAQS = [
  {
    q: 'Are Medke parts original or compatible replacements?',
    a: 'Medke manufactures compatible replacement parts. They are designed to work with the original equipment brands (Philips, GE, Mindray, Drager and others), but they are not OEM parts and do not carry the original brand trademark.',
  },
  {
    q: 'What is the minimum order quantity (MOQ)?',
    a: 'MOQ varies by product, typically 5-50 pieces. Small quantities are available for testing; larger quantities get better pricing.',
  },
  {
    q: 'Can I get free samples before ordering?',
    a: 'Yes, free samples are allowed prior to bulk orders. Shipping costs are usually borne by the customer.',
  },
  {
    q: 'What is the lead time?',
    a: 'Standard items ship within 3-7 working days after order confirmation. Custom or OEM items depend on the production schedule agreed with your sales contact.',
  },
  {
    q: 'Which certifications do you hold?',
    a: 'Medke is certified with TUV, CE and FDA, allowing access to major global markets.',
  },
  {
    q: 'Do you support OEM/ODM?',
    a: 'Yes, we support OEM and ODM with our own R&D team. Contact us with your requirements to start a project.',
  },
  {
    q: 'How fast do you reply to inquiries?',
    a: 'We reply to every inquiry within 1 business day.',
  },
  {
    q: 'How do I know if a product is compatible with my monitor?',
    a: 'Each product page lists compatible brands and model series. If your model is not listed, send us your monitor model and we will verify compatibility for you.',
  },
];

export const RESOURCES = [
  {
    slug: 'choose-compatible-ecg-cable',
    title: 'How to choose a compatible ECG cable',
    summary: 'Lead configuration, connector types and how to match your monitor model.',
    image: '/assets/images/resources/guide-cover.png',
    featured: true,
  },
  {
    slug: 'spo2-connector-guide',
    title: 'SpO2 sensor connector guide',
    summary: 'Identify the connector on your monitor and find the right sensor.',
    image: null,
    featured: false,
  },
  {
    slug: 'cleaning-cables',
    title: 'Cleaning & maintenance of monitor cables',
    summary: 'Best practices to extend the life of your cables and sensors.',
    image: null,
    featured: false,
  },
  {
    slug: 'bulk-order-guide',
    title: 'How to place a bulk order',
    summary: 'Sampling, MOQ, lead time and payment terms explained.',
    image: null,
    featured: false,
  },
];

export function getCategory(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id || p.partNumber === id);
}

export function productsByCategory(categorySlug) {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function productsByBrand(brand) {
  return PRODUCTS.filter((p) =>
    p.brands.some((b) => b.toLowerCase().includes(brand.toLowerCase()) || brand.toLowerCase().includes(b.toLowerCase()))
  );
}
