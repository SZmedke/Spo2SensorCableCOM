// Single source of truth for per-route SEO metadata.
// Consumed by generate-sitemap.mjs and prerender.mjs so URLs and <head> tags
// can never drift apart.
import { CATEGORIES, BRANDS, PRODUCTS, APPLICATIONS, COMPANY } from '../src/data/catalog.js';

export const ORIGIN = 'https://www.spo2sensorcable.com';
const BRAND = 'Medke';

// Mirrors BrandDetailPage.jsx - keep in sync if that logic changes.
const BRAND_SLUG_OVERRIDES = { 'Fukuda Denshi': 'fukuda' };
export const brandSlug = (name) =>
  BRAND_SLUG_OVERRIDES[name] || name.toLowerCase().replace(/\s+/g, '-');

// Pretty product-line URLs -> the subcategory/category slug they resolve to.
const PRODUCT_LINE_META = {
  '/spo2': ['SpO2 Sensors & Adapter Cables', 'Compatible SpO2 sensors and adapter cables for Philips, GE, Mindray, Nihon Kohden and Drager patient monitors. Reusable and disposable options, OEM-grade build.'],
  '/ecg': ['ECG Cables & Lead Wires', 'Compatible ECG trunk cables and lead wires for major patient monitor brands. 3-lead, 5-lead and 12-lead configurations, IEC and AHA colour codes.'],
  '/nibp': ['NIBP Cuffs, Hoses & Connectors', 'Compatible NIBP cuffs, adapter hoses and connectors for adult, paediatric and neonatal use. Single-tube and dual-tube options.'],
  '/ibp': ['IBP Cables & Transducers', 'Compatible invasive blood pressure cables and transducer interfaces for ICU and operating-room monitors.'],
  '/temperature': ['Temperature Probes', 'Compatible reusable and disposable temperature probes: skin surface, oesophageal and rectal, YSI 400/700 series.'],
  '/esu': ['ESU & Electrosurgical Accessories', 'Compatible electrosurgical pencils, grounding pads, forceps and electrocoagulation cables for ESU generators.'],
  '/aed': ['AED & Defibrillator Accessories', 'Compatible defibrillator pads, cables and AED accessories for emergency and transport use.'],
  '/eeg': ['EEG Cables & Electrodes', 'Compatible EEG cables and electrode accessories for neurological monitoring.'],
};

const APPLICATION_PRETTY = {
  '/icu': 'patient-monitoring',
  '/or': 'operating-room',
  '/emergency': 'emergency-transport',
  '/ward': 'obstetrics-gynecology',
};

const clamp = (s, n = 158) => {
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length <= n ? t : `${t.slice(0, n - 1).trimEnd()}…`;
};

const subcategories = CATEGORIES.flatMap((c) =>
  (c.subcategories || c.children || []).map((s) => ({ ...s, parent: c }))
);

function build() {
  const routes = [];
  // canonical defaults to the route itself; pass it explicitly when two URLs
  // render identical content (pretty alias vs. long form).
  const add = (path, title, description, priority, changefreq, canonical) =>
    routes.push({
      path,
      title,
      description: clamp(description),
      priority,
      changefreq,
      canonical: canonical || path,
      isDuplicate: Boolean(canonical) && canonical !== path,
    });

  add('/',
    `${BRAND} — Compatible Medical Sensors, Cables & Patient Monitor Accessories`,
    `${COMPANY.legalName || COMPANY.name} (est. ${COMPANY.founded}) manufactures compatible medical accessories: SpO2 sensors, ECG cables, NIBP/IBP, temperature and fetal probes. ${COMPANY.productCount} products, TUV/CE/FDA/ISO certified, shipped to ${COMPANY.countries} countries.`,
    1.0, 'weekly');

  add('/products',
    `All Products — ${COMPANY.productCount} Compatible Medical Accessories | ${BRAND}`,
    `Browse ${COMPANY.productCount} compatible patient monitor and ventilator accessories across ${COMPANY.categoryCount} categories. Filter by part number, brand compatibility and product line.`,
    0.9, 'weekly');

  add('/brands',
    `Compatible Brands — Philips, GE, Mindray, Drager, Nihon Kohden | ${BRAND}`,
    `Find compatible replacement accessories by monitor brand. Cross-reference part numbers for Philips, GE, Mindray, Drager, Fukuda Denshi and Nihon Kohden equipment.`,
    0.9, 'monthly');

  add('/applications',
    `Clinical Applications — ICU, OR, Emergency & Obstetrics | ${BRAND}`,
    `Medical accessory solutions by clinical setting: intensive care, operating room, emergency transport and obstetrics/gynaecology departments.`,
    0.8, 'monthly');

  add('/about-us',
    `About ${BRAND} — Medical Accessory Manufacturer Since ${COMPANY.founded}`,
    `${COMPANY.legalName || COMPANY.name}: ${COMPANY.years} years manufacturing compatible medical sensors and cables. TUV/CE/FDA/ISO certified, exporting to ${COMPANY.countries} countries.`,
    0.7, 'monthly');

  add('/oem-solution',
    `OEM & ODM Manufacturing for Medical Accessories | ${BRAND}`,
    `Custom OEM and ODM manufacturing for medical sensors, cables and patient monitor accessories. Private labelling, custom connectors and volume production.`,
    0.8, 'monthly');

  add('/contact',
    `Contact ${BRAND} — Request a Quote for Medical Accessories`,
    `Get a quote on compatible medical accessories. ${COMPANY.responsePromise || 'Fast response'}. Email ${COMPANY.email} or message us on WhatsApp.`,
    0.8, 'monthly');

  add('/blog', `Resources & Technical Guides | ${BRAND}`,
    `Technical guides, compatibility references and buying advice for medical sensors, cables and patient monitor accessories.`,
    0.6, 'weekly');

  add('/team', `Our Team | ${BRAND}`,
    `Meet the engineering, quality and sales team behind ${BRAND} compatible medical accessories.`,
    0.5, 'yearly');

  add('/faq', `Frequently Asked Questions | ${BRAND}`,
    `Answers on compatibility, MOQ, lead times, certification, warranty and shipping for compatible medical accessories.`,
    0.6, 'monthly');

  add('/privacy-policy', `Privacy Policy | ${BRAND}`,
    `Privacy Policy for ${COMPANY.legalName} (${ORIGIN}). Learn how we collect, use, and protect your personal information and B2B inquiry data.`,
    0.3, 'yearly');

  add('/terms-of-service', `Terms of Service | ${BRAND}`,
    `Terms of Service for ${COMPANY.legalName} (${ORIGIN}). Review terms governing B2B product inquiries, communications, intellectual property, and use of this website.`,
    0.3, 'yearly');

  add('/certificates', `Certifications & Regulatory Compliance | ${BRAND}`,
    `Official regulatory compliance, ISO 13485:2016 certification, EU MDR CE certificates, US FDA 510(k) clearances, and global market authorizations for Medke patient monitoring accessories.`,
    0.8, 'monthly');

  for (const [path, [name, desc]] of Object.entries(PRODUCT_LINE_META)) {
    add(path, `${name} — Compatible Replacements | ${BRAND}`, desc, 0.8, 'monthly');
  }

  // Pretty aliases render the same page as /applications/<slug>, so they point
  // their canonical at the long form to avoid competing for the same query.
  for (const [path, slug] of Object.entries(APPLICATION_PRETTY)) {
    const a = APPLICATIONS.find((x) => x.slug === slug);
    if (!a) continue;
    add(path, `${a.name} Accessories — Compatible Sensors & Cables | ${BRAND}`,
      a.summary, 0.7, 'monthly', `/applications/${slug}`);
  }

  for (const c of CATEGORIES) {
    add(`/product-category/${c.slug}`,
      `${c.name} — Compatible Replacements | ${BRAND}`,
      c.blurb || `Compatible ${c.name.toLowerCase()} for major patient monitor and ventilator brands.`,
      0.8, 'monthly');
  }

  for (const s of subcategories) {
    add(`/product-category/${s.slug}`,
      `${s.name} — ${s.count ? `${s.count} Compatible Options` : 'Compatible Replacements'} | ${BRAND}`,
      `Compatible ${s.name.toLowerCase()} replacements${s.count ? ` — ${s.count} options in stock` : ''}. Part of ${s.parent.name}. Cross-reference by brand and part number.`,
      0.7, 'monthly');
  }

  for (const b of BRANDS) {
    add(`/brands/${brandSlug(b)}`,
      `${b}-Compatible Sensors, Cables & Accessories | ${BRAND}`,
      `Compatible replacement accessories for ${b} patient monitors: SpO2 sensors, ECG cables, NIBP cuffs and temperature probes. Cross-referenced by part number.`,
      0.7, 'monthly');
  }

  for (const a of APPLICATIONS) {
    add(`/applications/${a.slug}`,
      `${a.name} — Medical Accessory Solutions | ${BRAND}`,
      a.summary, 0.7, 'monthly');
  }

  for (const p of PRODUCTS) {
    const brands = (p.brands || []).join(', ');
    add(`/product/${p.id}`,
      `${p.name}${p.partNumber ? ` (${p.partNumber})` : ''} | ${BRAND}`,
      p.description || `Compatible replacement${brands ? ` for ${brands}` : ''}. Part number ${p.partNumber || p.id}.`,
      0.6, 'monthly');
  }

  // de-duplicate by path, first declaration wins (highest intent)
  const seen = new Set();
  return routes.filter((r) => !seen.has(r.path) && seen.add(r.path));
}

export const ROUTES = build();
