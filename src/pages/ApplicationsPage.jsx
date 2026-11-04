import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import './ApplicationsPage.css';

// 1. Clinical Department Data Store
const DEPARTMENTS = {
      icu: {
        id: 'icu',
        name: 'ICU / CCU (Intensive & Critical Care)',
        subtext: 'High-acuity, continuous 24/7 hemodynamic monitoring requiring maximum signal stability and zero baseline drift.',
        badge: 'CRITICAL CARE UNIT',
        image: '/assets/images/applications/icu.png',
        imageAlt: 'ICU Intensive Care Patient Monitoring',
        challenges: [
          'High patient movement causing false SpO2 disconnect alarms and baseline wander in continuous telemetry.',
          'Frequent defibrillation events risking electrosurgical burn or monitor front-end electrical damage.',
          'High risk of cross-contamination across immunocompromised long-stay ICU patients.'
        ],
        solutions: [
          'Kevlar-reinforced dual-shielded TPU cables with high signal-to-noise ratio and fast motion artifact recovery.',
          'Built-in 3,000V dielectric isolation and defibrillator-proof 10k-ohm protection resistors inside trunk cables.',
          'Single-patient disposable foam & soft fabric SpO2 sensors preventing pathogen transfer.'
        ],
        oems: ['Philips IntelliVue MX800 / X3', 'GE Carescape B850', 'Mindray BeneVision N22 / N19', 'Dräger Infinity Delta', 'Nihon Kohden Life Scope', 'Spacelabs Qube / Xprezzon'],
        accessories: [
          { sku: 'MDK-ICU-S01', name: 'Reusable Adult Finger Clip SpO2 Sensor', type: 'Reusable', spec: '9-Pin D-Sub / Dual Wavelength 660/905nm' },
          { sku: 'MDK-ICU-S02', name: 'Disposable Adhesive Foam SpO2 Sensor', type: 'Disposable', spec: 'Latex-Free 3M Foam / Single-Patient ICU Use' },
          { sku: 'MDK-ICU-E01', name: '5-Lead Dual-Pin Shielded ECG Trunk Cable', type: 'Reusable', spec: 'AAMI / IEC Color Code / Integrated Defib Protection' },
          { sku: 'MDK-ICU-N01', name: 'Dual-Tube Antimicrobial TPU NIBP Cuff', type: 'Reusable', spec: 'Adult Large (31-40cm) / Quick-Click Bayonet' },
          { sku: 'MDK-ICU-I01', name: 'Dual-Channel IBP Interface Trunk Cable', type: 'Reusable', spec: 'Compatible with Utah / BD / Edwards Transducers' },
          { sku: 'MDK-ICU-T01', name: 'YSI 400 Series General Purpose Temp Probe', type: 'Reusable', spec: 'Skin & Esophageal / Accuracy ±0.1°C (25-45°C)' }
        ]
      },
      or: {
        id: 'or',
        name: 'Operating Room (OR & Surgical Suites)',
        subtext: 'Intraoperative vital-sign stability during major surgery with extreme high-frequency electrocautery noise rejection.',
        badge: 'SURGICAL SUITE',
        image: '/assets/images/applications/or.png',
        imageAlt: 'Operating Room Patient Monitoring & Electrosurgery',
        challenges: [
          'High-frequency electrosurgical knives (cautery/ESU) inducing heavy noise artifacts into ECG and SpO2 curves.',
          'Strict surgical field sterility requirements requiring gas-sterilized or sterile single-use leads.',
          'Accidental patient return plate dislodgment causing high current density risk and severe tissue burns.'
        ],
        solutions: [
          'High-frequency RF chokes and patented coaxial active shielding in ECG leadwires isolating electrosurgical noise.',
          'Pre-packaged EO gas-sterilized single-use disposable monitoring sensors with sterile barrier packaging.',
          'Equipotential dual-foil REM/ESU patient grounding plates ensuring automatic electrosurgical generator shut-off.'
        ],
        oems: ['Philips IntelliVue MP70 / X3', 'GE Carescape B650', 'Mindray BeneVision N17 / N15', 'Dräger Infinity Vista', 'Spacelabs Command Module', 'Masimo Radical-7'],
        accessories: [
          { sku: 'MDK-OR-E01', name: 'Diathermy-Shielded 5-Lead OR ECG Cable', type: 'Reusable', spec: 'Coaxial Active Noise Filter / Radiofrequency Shielded' },
          { sku: 'MDK-OR-S01', name: 'Sterile Single-Patient SpO2 Sensor', type: 'Disposable', spec: 'EO Sterilized / Non-Adhesive Wrap / Latex-Free' },
          { sku: 'MDK-OR-P01', name: 'Dual-Surface Conductive ESU Grounding Plate', type: 'Disposable', spec: 'Hydrogel Adhesive / REM Compatible / Adult & Peds' },
          { sku: 'MDK-OR-B01', name: 'Reusable Bipolar Forceps Connecting Cable', type: 'Reusable', spec: 'Autoclavable 134°C / Molded Dual-Pin Banana' },
          { sku: 'MDK-OR-I01', name: 'Direct Transducer Interface Cable (Edwards)', type: 'Reusable', spec: 'Round 12-Pin to Edwards Transducer Head' },
          { sku: 'MDK-OR-T01', name: 'Tympanic Membrane Rapid Temperature Sensor', type: 'Disposable', spec: 'Soft-Tipped / Fast Thermal Equilibrium (<5s)' }
        ]
      },
      emergency: {
        id: 'emergency',
        name: 'Emergency & EMS (Trauma & Resuscitation)',
        subtext: 'Ruggedized, rapid-deployment accessories engineered for high-impact patient triage, ambulance transport, and AED shocks.',
        badge: 'EMERGENCY & TRAUMA',
        image: '/assets/images/applications/emergency.png',
        imageAlt: 'Emergency Department & Mobile EMS Monitoring',
        challenges: [
          'Violent mechanical cable pulling, wheel-crush over cords during transport, and abrupt cold/wet ambulance environments.',
          'Extreme urgency demanding immediate sub-5-second sensor connection without orientation confusion.',
          'High-voltage defibrillator shocks applied repeatedly during CPR resuscitation.'
        ],
        solutions: [
          'DuPont Kevlar inner reinforcement delivering &gt;15kg tensile resistance and crush-resistant thick TPU jackets.',
          'Color-coded ergonomic keyed connectors with tactile snap-in detents for instant intuitive orientation.',
          'Reinforced internal spark gaps and high-voltage resistor arrays rated for 360-Joule biphasic defib discharges.'
        ],
        oems: ['ZOLL X Series', 'Physio-Control LIFEPAK 15', 'Philips Tempus Pro', 'Mindray BeneHeart D6', 'Spacelabs DM4 Vital Signs', 'Schiller DEFIGARD'],
        accessories: [
          { sku: 'MDK-EMS-S01', name: 'Ruggedized Kevlar-Shielded SpO2 Cable', type: 'Reusable', spec: 'Armored TPU Jacket / Extreme Bend Stress Relief' },
          { sku: 'MDK-EMS-E01', name: '3-Lead Quick-Snap Rapid Defib ECG Cable', type: 'Reusable', spec: 'Defibrillator Proof 8,000V Peak Discharge Tested' },
          { sku: 'MDK-EMS-A01', name: 'Multifunction Adult Defib / Pacing Pads', type: 'Disposable', spec: 'Compatible with ZOLL, Philips & LIFEPAK AEDs' },
          { sku: 'MDK-EMS-N01', name: 'Heavy-Duty Waterproof TPU NIBP Air Hose', type: 'Reusable', spec: 'High-Flex Spiral Hose / Quick-Snap Metal Luer' },
          { sku: 'MDK-EMS-P01', name: 'Soft Ear Clip Rapid SpO2 Sensor', type: 'Reusable', spec: 'Ideal for Low-Perfusion Hypothermic Trauma Cases' }
        ]
      },
      nicu: {
        id: 'nicu',
        name: 'NICU & Pediatrics (Neonatal Intensive Care)',
        subtext: 'Ultra-gentle, non-adhesive and hypoallergenic monitoring solutions guarding fragile neonatal epidermis.',
        badge: 'NEONATAL INTENSIVE CARE',
        image: '/assets/images/about/cleanroom-real-clean.jpg',
        imageAlt: 'NICU Cleanroom Produced Neonatal Sensor Environment',
        challenges: [
          'Preterm infant skin is only 30% the thickness of adult skin; aggressive adhesives cause traumatic epidermal stripping.',
          'Extremely low peripheral blood perfusion makes pulse oximetry signals difficult to detect accurately.',
          'Incubator radiant heat and phototherapy lights interfere with optical sensors and temperature readings.'
        ],
        solutions: [
          'Silicone-gel and soft non-adhesive micro-foam wraps utilizing gentle Velcro bands rather than sticky adhesives.',
          'High-sensitivity, high-quantum-efficiency optical diodes calibrated for micro-pulsatile infant perfusion.',
          'Infrared reflective temperature micro-sensors with aluminized mylar thermal radiation shielding.'
        ],
        oems: ['Dräger Babylog / Infinity', 'GE Giraffe Incubator Suite', 'Philips Avalon / IntelliVue', 'Masimo SET Radical-7', 'Spacelabs Ultraview', 'Atom Medical Incubator'],
        accessories: [
          { sku: 'MDK-NIC-S01', name: 'Neonatal Y-Type Soft Silicone SpO2 Sensor', type: 'Reusable', spec: 'Ultra-Soft Medical Silicone / Micro-Wavelength Emitting' },
          { sku: 'MDK-NIC-S02', name: 'Non-Adhesive Neonatal Foam SpO2 Wraps', type: 'Disposable', spec: 'Breathable 3M Foam / Zero Epidermal Adhesion' },
          { sku: 'MDK-NIC-E01', name: '3-Lead Din-Click Micro-Wire Neonatal ECG', type: 'Reusable', spec: 'Ultra-Flexible 1.2mm Leadwires / Gold-Plated Contacts' },
          { sku: 'MDK-NIC-N01', name: 'Neonatal NIBP Cuffs (Size 1 to Size 5)', type: 'Disposable', spec: 'Ultra-Soft TPU / Infant Limb Circ. 3.1cm to 15.0cm' },
          { sku: 'MDK-NIC-T01', name: 'Incubator Radiant-Shielded Skin Temp Probe', type: 'Disposable', spec: 'Mylar Reflective Disc / Precision ±0.05°C' }
        ]
      },
      ward: {
        id: 'ward',
        name: 'General Ward & Step-Down Units',
        subtext: 'High-durability, cost-effective daily monitoring accessories engineered for rapid turnover across high bed volumes.',
        badge: 'GENERAL INPATIENT WARD',
        image: '/assets/images/applications/ward.png',
        imageAlt: 'General Inpatient Ward Patient Monitoring',
        challenges: [
          'High bed volume (100–500 beds) generates massive annual consumable replacement expenditures.',
          'Accessories frequently misplaced or damaged during bed transfers between wards and diagnostic radiology.',
          'Nurses require fast, universal attachments without dealing with proprietary brand incompatibility.'
        ],
        solutions: [
          'Factory-direct tier pricing saving 40%–50% on routine sensor and cuff replenishment budgets.',
          'Reinforced strain reliefs and tamper-evident molded joints resisting rough handling and rolling cart snagging.',
          'Universal compatibility adapter trunks standardizing ward beds across disparate monitor brands.'
        ],
        oems: ['Mindray uMEC / ePM Series', 'Philips EarlyVue / SureSigns', 'GE B125 / B105 Dinamap', 'Spacelabs DM3 / OnTrak', 'Edan iM3 / M3', 'Comen / Biolight'],
        accessories: [
          { sku: 'MDK-WRD-S01', name: 'Economical Adult Reusable SpO2 Sensor', type: 'Reusable', spec: 'Durable Medical Silicone Finger Pad / 12-Month Warranty' },
          { sku: 'MDK-WRD-E01', name: '3-Lead One-Piece General Ward ECG Cable', type: 'Reusable', spec: 'Integrated Trunk & Leads / Snap Connectors / AAMI/IEC' },
          { sku: 'MDK-WRD-N01', name: 'Single-Tube Reusable Nylon NIBP Cuff', type: 'Reusable', spec: 'Adult Standard (25-35cm) / Heavy-Duty Bladder' },
          { sku: 'MDK-WRD-N02', name: 'Single-Patient Disposable Non-Woven Cuff', type: 'Disposable', spec: 'Cost-Effective 1-Patient Use / Latex-Free' },
          { sku: 'MDK-WRD-T01', name: 'Skin Surface Temperature Probe', type: 'Reusable', spec: 'Flat Disk Sensor / 3.0m Flexible Cable' }
        ]
      },
      cardiology: {
        id: 'cardiology',
        name: 'Cardiology & Diagnostic Suites',
        subtext: 'Ultra-low impedance diagnostic ECG cables engineered for Cath Labs, stress treadmill testing, and 12-lead Holter exams.',
        badge: 'CARDIOLOGY & CATH LAB',
        image: '/assets/images/about/lab-testing-real-web.jpg',
        imageAlt: 'Cardiology Precision Testing Laboratory',
        challenges: [
          'Treadmill vibration and patient muscle tremors generating severe baseline drift and motion artifacts during Stress ECG.',
          'Cath Lab fluoroscopy and radio-frequency noise obscuring subtle ST-segment ischemic elevation.',
          'Holter multi-day wear requiring ultra-light, sweat-resistant leadwires that do not detach during sleep or exercise.'
        ],
        solutions: [
          'Silver/silver chloride (Ag/AgCl) gold-plated contact pins delivering &lt;50-ohm contact impedance and ultra-fast settling time.',
          'Full-mesh braided copper shielding providing 99.8% attenuation against external electromagnetic fields.',
          'Flexible TPU ribbon wires with medical-grade banana and pinch connectors resisting sweat and skin oils.'
        ],
        oems: ['GE Marquette / CASE / MAC 5500', 'Philips PageWriter TC70', 'Mortara ELI 380 Series', 'Spacelabs 91387 / Sentinel', 'Schiller Cardiovit', 'Burdick / Quinton'],
        accessories: [
          { sku: 'MDK-CRD-E01', name: '10-Lead Diagnostic 12-Channel Resting ECG Cable', type: 'Reusable', spec: 'Sub-D 15-Pin to 4.0mm Banana / Ag-AgCl Contacts' },
          { sku: 'MDK-CRD-E02', name: 'Stress Test Treadmill 10-Lead Shielded Trunk', type: 'Reusable', spec: 'Braided Dual-Shield / Active Motion Dampening Core' },
          { sku: 'MDK-CRD-H01', name: '7-Lead / 5-Lead Holter Continuous Monitor Cable', type: 'Reusable', spec: 'Ultra-Lightweight Flexible TPU / Sweat-Resistant Snap' },
          { sku: 'MDK-CRD-P01', name: 'Diagnostic Suction Chest Electrodes (Set of 6)', type: 'Reusable', spec: 'Nickel-Plated Brass Bulb / Vacuum Suction Cup' },
          { sku: 'MDK-CRD-L01', name: 'Limb Clamp Diagnostic Electrodes (Set of 4)', type: 'Reusable', spec: 'Ag/AgCl Plated Clamp / Universal 3.0/4.0mm Connection' }
        ]
      }
    };

    // 2. BOM Data Store for Modals;

// 2. Department Bedside Bundled Kits Bill of Materials Data Store
const BOM_DATA = {
      icu: {
        title: 'Adult ICU Bedside Multi-Parameter Kit',
        sku: 'KIT-ICU-BED-200',
        items: [
          { num: '01', sku: 'MDK-SPO2-AD-01', desc: 'Adult Reusable SpO2 Finger Clip Sensor (3.0m)', mat: 'Medical Silicone / TPU / Kevlar', role: 'Continuous 24/7 Arterial O2 Saturation', qty: '2 Pcs' },
          { num: '02', sku: 'MDK-SPO2-DISP-01', desc: 'Single-Patient Disposable SpO2 Foam Wrap Sensor', mat: 'Latex-Free 3M Foam / Optical LEDs', role: 'Infection Prevention Long-Stay Beds', qty: '20 Pcs' },
          { num: '03', sku: 'MDK-ECG-5L-TRK', desc: '5-Lead ECG Shielded Trunk Cable (Dual-Pin)', mat: 'TPU Sheath / Braided Copper Shield', role: 'Primary Heart Rate & ST Waveform', qty: '2 Sets' },
          { num: '04', sku: 'MDK-ECG-5L-LEAD', desc: '5-Lead Detachable Snap Leadwires (AAMI/IEC)', mat: 'Flexible TPU / Phosphor Bronze Springs', role: 'Bedside Patient Electrode Interface', qty: '4 Sets' },
          { num: '05', sku: 'MDK-NIBP-CUFF-AL', desc: 'Dual-Tube Reusable Nylon NIBP Cuff (Adult Large)', mat: 'Nylon / TPU Bladder / Velcro Hook-Loop', role: 'Periodic Non-Invasive Hemodynamic Audit', qty: '3 Cuffs' },
          { num: '06', sku: 'MDK-NIBP-DISP-05', desc: 'Single-Patient Disposable TPU NIBP Cuffs (Adult)', mat: 'Soft Non-Woven Fabric / TPU Liner', role: 'Isolation Ward Cross-Infection Control', qty: '10 Cuffs' },
          { num: '07', sku: 'MDK-IBP-CBL-02', desc: 'Dual-Channel Invasive Blood Pressure Interface Cable', mat: 'Molded Polyurethane / Gold-Plated Pins', role: 'Direct Arterial & Central Venous Line', qty: '1 Cable' },
          { num: '08', sku: 'MDK-TMP-SKIN-01', desc: 'YSI 400 Series General Purpose Temp Probe (Skin)', mat: 'Medical-Grade Stainless Tip / PVC-Free', role: 'Continuous Core & Surface Thermal Watch', qty: '2 Pcs' }
        ]
      },
      or: {
        title: 'Surgical Intraoperative Monitoring Pack',
        sku: 'KIT-SURG-OR-300',
        items: [
          { num: '01', sku: 'MDK-ECG-OR-RF5', desc: 'Diathermy-Shielded 5-Lead Intraoperative ECG Trunk', mat: 'Coaxial High-RF Filter / Kevlar Core', role: 'Noise-Free Intraoperative ECG Under ESU', qty: '2 Sets' },
          { num: '02', sku: 'MDK-SPO2-STER-01', desc: 'Sterile Single-Patient Disposable SpO2 Sensor (EO)', mat: 'Medical Foam / Sterile Tyvek Barrier', role: 'Aseptic Intraoperative Patient Oxygenation', qty: '25 Pcs' },
          { num: '03', sku: 'MDK-IBP-TRNS-01', desc: 'Sterile IBP Transducer Lead Wire Interface', mat: 'Molded Medical TPU / 12-Pin Round Head', role: 'Continuous Real-Time Arterial Pressure', qty: '10 Sets' },
          { num: '04', sku: 'MDK-ESU-PLT-02', desc: 'Dual-Surface REM Conductive Patient Return Plate', mat: 'High-Conductivity Hydrogel / Non-Woven', role: 'Electrosurgical Return Circuit & Safety', qty: '2 Plates' },
          { num: '05', sku: 'MDK-ESU-CBL-01', desc: 'Reusable Bipolar Forceps Connecting Cable (Autoclavable)', mat: 'High-Temp Silicone / Dual Banana Plugs', role: 'Surgical Hemostasis Micro-Coagulation', qty: '2 Cables' },
          { num: '06', sku: 'MDK-TMP-TYMP-01', desc: 'Tympanic Membrane Rapid Temperature Sensor', mat: 'Ultra-Soft Polyurethane Tip / Micro-Thermistor', role: 'Hypothermia Detection Under Anesthesia', qty: '4 Pcs' }
        ]
      },
      nicu: {
        title: 'Neonatal Delicate Care Specialized Bundle',
        sku: 'KIT-NEO-NICU-100',
        items: [
          { num: '01', sku: 'MDK-NIC-Y-01', desc: 'Neonatal Y-Type Soft Silicone SpO2 Sensor', mat: 'Liquid Medical Silicone / Micro-LEDs', role: 'Delicate Limb Low-Perfusion Saturation', qty: '2 Pcs' },
          { num: '02', sku: 'MDK-NIC-FOAM-30', desc: 'Non-Adhesive Neonatal Foam SpO2 Wraps with Velcro', mat: 'Breathable 3M Foam / Hypoallergenic Band', role: 'Zero-Trauma Non-Adhesive Pulse Watch', qty: '30 Pcs' },
          { num: '03', sku: 'MDK-NIC-ECG-3D', desc: '3-Lead Din-Click Micro-Wire Neonatal ECG Cable', mat: '1.2mm Ultra-Lightweight TPU / Gold Springs', role: 'Fragile Premature Neonatal Heart Rhythm', qty: '5 Sets' },
          { num: '04', sku: 'MDK-NIC-NIBP-SET', desc: 'Micro-Scale Neonatal NIBP Cuffs (Sizes 1, 2, 3, 4, 5)', mat: 'Soft Biocompatible TPU / Mini-Luer Plug', role: 'Ultra-Low Pressure Arterial Blood Auditing', qty: '10 Cuffs' },
          { num: '05', sku: 'MDK-NIC-TMP-MYL', desc: 'Reflective Incubator Skin Temperature Micro-Probe', mat: 'Mylar Radiation Shield / Gold Pin Thermistor', role: 'Incubator Radiant Warming Servo Control', qty: '5 Pcs' },
          { num: '06', sku: 'MDK-NIC-STRAP-01', desc: 'Medical Soft Silicone Fixing Limb Straps', mat: 'Latex-Free Clean Silicone / Reusable', role: 'Secure Non-Traumatic Sensor Fixation', qty: '20 Straps' }
        ]
      }
    };

    // 3. Current State Manager
    let currentDeptId = 'icu';
    let rfpConfig = {
      dept: 'ICU / CCU',
      brand: 'Philips IntelliVue'
    };

    // 4. Render Department View (V2 Clinical Reconciliation Desk: Challenge vs Solution + OEM Fleets);

export default function ApplicationsPage() {
  const [activeDeptId, setActiveDeptId] = useState('icu');
  const [activeBomKit, setActiveBomKit] = useState(null);
  const [rfpDept, setRfpDept] = useState('icu');
  const [rfpBrand, setRfpBrand] = useState('philips');
  const [rfpForm, setRfpForm] = useState({ name: '', email: '', org: '', country: '', notes: '' });
  const [rfpSubmitted, setRfpSubmitted] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: 'Download Department Clinical Specification Sheet',
    subtitle: 'Comprehensive pinout clearance, metallurgy and biocompatibility test reports.',
    badge: 'Clinical Engineering Documentation',
    pdfUrl: '/docs/Medke-Brochure-2026.pdf',
    downloadFilename: 'Medke-Clinical-Department-Solutions.pdf',
    assetName: 'Department Solutions Guide'
  });

  const currentDept = DEPARTMENTS[activeDeptId] || DEPARTMENTS.icu;

  // ESC key to close BOM modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeBomKit) {
        closeBomModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBomKit]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const switchDeptTab = (deptKey) => {
    setActiveDeptId(deptKey);
  };

  const openBomModal = (kitKey) => {
    const kitData = BOM_DATA[kitKey];
    if (kitData) {
      setActiveBomKit({ key: kitKey, ...kitData });
      document.body.style.overflow = 'hidden';
    }
  };

  const closeBomModal = () => {
    setActiveBomKit(null);
    document.body.style.overflow = '';
  };

  const openLeadModal = (customConfig = {}) => {
    setModalConfig((prev) => ({ ...prev, ...customConfig, isOpen: true }));
  };

  const closeLeadModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const handleSelectDeptForRfp = (deptKey) => {
    setRfpDept(deptKey);
    const rfpSec = document.getElementById('rfp-desk');
    if (rfpSec) {
      rfpSec.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Configured RFP target: ${DEPARTMENTS[deptKey]?.name || deptKey}`);
  };

  const handleRfpSubmit = (e) => {
    e.preventDefault();
    if (!rfpForm.name.trim() || !rfpForm.email.trim()) {
      showToast('Please enter your full name and institutional work email.');
      return;
    }
    setRfpSubmitted(true);
    showToast('Department RFP submitted successfully. Engineering team will respond within 4 hours.');
  };

  // Human readable names for RFP preview
  const rfpDeptNames = {
    icu: 'ICU / CCU',
    or: 'Operating Room',
    emergency: 'Emergency & EMS',
    nicu: 'NICU & Pediatrics',
    ward: 'General Ward',
    cardio: 'Cardiology Suite'
  };

  const rfpBrandNames = {
    philips: 'Philips IntelliVue',
    ge: 'GE Carescape / Datex',
    mindray: 'Mindray BeneVision / uMEC',
    drager: 'Dräger Infinity Series',
    nihonkohden: 'Nihon Kohden Life Scope',
    mixed: 'Mixed Multi-Brand Fleet'
  };

  return (
    <div className="applications-page">
      {/* S1: HERO & DEPARTMENT JUMP */}
      <section className="app-hero-section" id="hero">
      <div className="container-1220">
        <div className="hero-content-wrap">
          <div className="super-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            Hospital-Wide Clinical Monitoring Ecosystem
          </div>

          <h1 className="hero-title">
            Department-Tailored Monitoring Accessories for Critical, Surgical &amp; General Care
          </h1>

          <p className="hero-subtitle">
            Eliminate signal artifacts, avoid OEM cost markups, and protect patients against nosocomial cross-contamination. Medke delivers validated, plug-and-play monitoring cables and sensors engineered to match 100+ OEM monitor fleets across six dedicated clinical environments.
          </p>

          {/* Department Jump Pills */}
          <div className="dept-jump-bar">
            <button type="button" className="dept-pill-btn" onClick={() => switchDeptTab("icu")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              ICU &amp; CCU
            </button>
            <button type="button" className="dept-pill-btn" onClick={() => switchDeptTab("or")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Operating Room (OR)
            </button>
            <button type="button" className="dept-pill-btn" onClick={() => switchDeptTab("emergency")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Emergency &amp; EMS
            </button>
            <button type="button" className="dept-pill-btn" onClick={() => switchDeptTab("nicu")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              NICU &amp; Pediatrics
            </button>
            <button type="button" className="dept-pill-btn" onClick={() => switchDeptTab("ward")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              General Ward
            </button>
            <button type="button" className="dept-pill-btn" onClick={() => switchDeptTab("cardio")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              Cardiology &amp; Diagnostic
            </button>
          </div>

          {/* Hero Endorsement Data Strip */}
          <div className="hero-stat-strip">
            <div className="hero-stat-card">
              <div className="stat-card-figure">2,000+</div>
              <div className="stat-card-label">Active Tooling Dies</div>
              <div className="stat-card-desc">Direct pin-to-pin fit for Philips, GE, Mindray, Dräger, Nihon Kohden and Masimo fleets.</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-card-figure">30%–50%</div>
              <div className="stat-card-label">Direct TCO Savings</div>
              <div className="stat-card-desc">Substantial hospital budget optimization while maintaining 100% signal precision.</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-card-figure">Class IIb</div>
              <div className="stat-card-label">TÜV SÜD CE MDR</div>
              <div className="stat-card-desc">Certificate G15 085432 0008 &amp; US FDA 510(k) cleared regulatory traceability.</div>
            </div>
            <div className="hero-stat-card">
              <div className="stat-card-figure">3–7 Days</div>
              <div className="stat-card-label">Rapid Warehouse Dispatch</div>
              <div className="stat-card-desc">Standard departmental turnkey packs buffered in stock for emergency replenishments.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* S2: 6 MAJOR CLINICAL DEPARTMENT HUB */}
      <section className="dept-hub-section" id="solution-hub">
        <div className="container-1220">
          <div className="section-header-block">
            <div className="section-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              Interactive Department Matrix
            </div>
            <h2 className="section-heading">Clinical Department Monitoring Hub</h2>
            <p className="section-description">
              Each hospital unit operates under unique clinical constraints—from continuous 24/7 hemodynamic stress in the ICU to high-frequency electrosurgical noise in the OR. Explore tailored accessory architectures below.
            </p>
          </div>

          {/* Department Tab Bar */}
          <div className="hub-tab-bar" role="tablist">
            <button
              type="button"
              className={`hub-tab-item ${activeDeptId === 'icu' ? 'active' : ''}`}
              id="tab-btn-icu"
              onClick={() => switchDeptTab('icu')}
              role="tab"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              <span>ICU / CCU</span>
            </button>
            <button
              type="button"
              className={`hub-tab-item ${activeDeptId === 'or' ? 'active' : ''}`}
              id="tab-btn-or"
              onClick={() => switchDeptTab('or')}
              role="tab"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              <span>Operating Room</span>
            </button>
            <button
              type="button"
              className={`hub-tab-item ${activeDeptId === 'emergency' ? 'active' : ''}`}
              id="tab-btn-emergency"
              onClick={() => switchDeptTab('emergency')}
              role="tab"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>Emergency / EMS</span>
            </button>
            <button
              type="button"
              className={`hub-tab-item ${activeDeptId === 'nicu' ? 'active' : ''}`}
              id="tab-btn-nicu"
              onClick={() => switchDeptTab('nicu')}
              role="tab"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <span>NICU &amp; Pediatrics</span>
            </button>
            <button
              type="button"
              className={`hub-tab-item ${activeDeptId === 'ward' ? 'active' : ''}`}
              id="tab-btn-ward"
              onClick={() => switchDeptTab('ward')}
              role="tab"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>General Ward</span>
            </button>
            <button
              type="button"
              className={`hub-tab-item ${activeDeptId === 'cardio' ? 'active' : ''}`}
              id="tab-btn-cardio"
              onClick={() => switchDeptTab('cardio')}
              role="tab"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>Cardiology &amp; Diagnostic</span>
            </button>
          </div>

          {/* Dynamic Department Card Container */}
          <div className="dept-showcase-card" id="dept-showcase-container">
            {/* Left Column: Department Scene Dossier & Clinical Challenges */}
            <div className="dept-dossier-col">
              <div className="dept-scene-image-wrap">
                <img src={currentDept.image} alt={currentDept.imageAlt} className="dept-scene-image" loading="lazy" />
                <div className="dept-image-overlay-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Clinical Field Reference</span>
                </div>
              </div>

              <div className="dept-meta-header">
                <div>
                  <span className="dept-badge-tag">{currentDept.badge}</span>
                  <h3 className="dept-main-name">{currentDept.name}</h3>
                  <p className="dept-main-subtext">{currentDept.subtext}</p>
                </div>
              </div>

              <div className="dual-box dual-box-challenge">
                <div className="dual-box-header">
                  <div className="dual-box-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span>Clinical Challenges &amp; Frontline Vulnerabilities</span>
                  </div>
                  <span className="challenge-risk-badge">Frontline Hospital Risk</span>
                </div>
                <ul className="challenge-list">
                  {currentDept.challenges.map((c, i) => (
                    <li key={i} className="challenge-list-item">
                      <span className="challenge-item-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      </span>
                      <span className="challenge-item-text">{c}</span>
                    </li>
                  ))}
                </ul>
                <div className="challenge-impact-footer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  <span>Direct clinical impact: false telemetry alarms, patient skin trauma, and premature cable failure.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Medke Engineering Countermeasures & Compatible OEM Monitor Fleets */}
            <div className="dept-solution-col">
              <div className="solution-col-header">
                <span className="solution-badge-tag">ENGINEERING RESOLUTION</span>
                <h4 className="solution-col-title">Medke Clinical Engineering Countermeasures</h4>
                <p className="solution-col-subtext">Direct technical mitigations engineered to eliminate signal noise, contact failure, and cross-infection risks.</p>
              </div>

              <div className="dual-box dual-box-solution">
                <div className="dual-box-header">
                  <div className="dual-box-title">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span>Medke Clinical Countermeasures</span>
                  </div>
                  <span className="solution-verified-badge">100% Bench &amp; Hospital Tested</span>
                </div>
                <ul className="solution-list">
                  {currentDept.solutions.map((s, i) => (
                    <li key={i} className="solution-list-item">
                      <span className="solution-item-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span className="solution-item-text">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="oem-fleet-block">
                <div className="oem-fleet-header">
                  <div className="oem-fleet-title">Compatible Patient Monitor Fleets</div>
                  <span className="oem-fleet-badge">Direct Pinout Matching</span>
                </div>
                <p className="oem-fleet-description">Certified plug-and-play matching for primary {currentDept.id.toUpperCase()} monitoring platforms:</p>
                <div className="oem-fleet-grid">
                  {currentDept.oems.map((oem, i) => (
                    <div key={i} className="oem-fleet-card">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2" style={{ flexShrink: 0 }}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      <div className="oem-fleet-info">
                        <span className="oem-fleet-name" title={oem}>{oem}</span>
                        <span className="oem-fleet-status">Pinout Validated</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dept-action-footer">
                <div className="dept-guarantee-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>100% Tested · 12-Month Replacement Warranty · Lot Traceable</span>
                </div>
                <div className="dept-btn-group">
                  <a href="#department-kits" className="btn btn-secondary btn-sm">Turnkey Kits</a>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSelectDeptForRfp(currentDept.id)}
                  >
                    Configure {currentDept.id.toUpperCase()} RFP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S3: DEPARTMENT BUNDLED KITS & BOM */}
      <section className="kits-section" id="department-kits">
      <div className="container-1220">
        <div className="section-header-block">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            Standardized Bedside Packages
          </div>
          <h2 className="section-heading">Department Bundled Kits &amp; Bill of Materials</h2>
          <p className="section-description">
            Simplify procurement, streamline nurse cart restocking, and secure volume discounts. Each turnkey kit includes pre-matched multi-parameter sensors and adapter trunks for clinical beds.
          </p>
        </div>

        <div className="kits-grid">
          {/* Kit 1: Adult ICU Bedside Kit */}
          <div className="kit-card">
            <div className="kit-tag-row">
              <span className="kit-sku-badge">KIT-ICU-BED-200</span>
              <span className="kit-highlight-badge">24/7 Critical Care</span>
            </div>
            <h3 className="kit-title">Adult ICU Bedside Multi-Parameter Kit</h3>
            <p className="kit-target-env">Designed for continuous multi-parameter telemetry in intensive care units and coronary care wards.</p>

            <ul className="kit-items-list">
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Reusable SpO2 Adult Finger Clip Sensor</span>
                <span className="kit-item-qty">Qty: 2 Pcs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Single-Patient Disposable SpO2 Foam Wraps</span>
                <span className="kit-item-qty">Qty: 20 Pcs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">5-Lead Shielded ECG Trunk Cable &amp; Leads</span>
                <span className="kit-item-qty">Qty: 2 Sets</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Dual-Tube Reusable &amp; Disposable NIBP Cuffs</span>
                <span className="kit-item-qty">Qty: 5 Cuffs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Dual-Channel Invasive Blood Pressure (IBP) Cable</span>
                <span className="kit-item-qty">Qty: 1 Set</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">General Purpose Skin / Esophageal Temp Probe</span>
                <span className="kit-item-qty">Qty: 2 Pcs</span>
              </li>
            </ul>

            <div className="kit-card-action">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => openBomModal("icu")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Inspect Full Itemized BOM
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => handleSelectDeptForRfp("icu")}>
                Request ICU Kit Quote
              </button>
            </div>
          </div>

          {/* Kit 2: Surgical Intraoperative Kit */}
          <div className="kit-card">
            <div className="kit-tag-row">
              <span className="kit-sku-badge">KIT-SURG-OR-300</span>
              <span className="kit-highlight-badge">RF / ESU Shielded</span>
            </div>
            <h3 className="kit-title">Surgical Intraoperative Monitoring Pack</h3>
            <p className="kit-target-env">Engineered to eliminate electrosurgical knife interference during complex surgical interventions.</p>

            <ul className="kit-items-list">
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Diathermy-Shielded 5-Lead ECG Cable</span>
                <span className="kit-item-qty">Qty: 2 Sets</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Sterile Single-Patient Disposable SpO2 Sensor</span>
                <span className="kit-item-qty">Qty: 25 Pcs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Sterile IBP Disposable Transducer Lead Interface</span>
                <span className="kit-item-qty">Qty: 10 Sets</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Reusable Dual-Surface ESU Patient Return Plate</span>
                <span className="kit-item-qty">Qty: 2 Plates</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Bipolar Electrosurgical Forceps Cable</span>
                <span className="kit-item-qty">Qty: 2 Cables</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Tympanic &amp; Central Core Temperature Sensor</span>
                <span className="kit-item-qty">Qty: 4 Pcs</span>
              </li>
            </ul>

            <div className="kit-card-action">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => openBomModal("or")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Inspect Full Itemized BOM
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => handleSelectDeptForRfp("or")}>
                Request OR Kit Quote
              </button>
            </div>
          </div>

          {/* Kit 3: Neonatal Delicate Care Bundle */}
          <div className="kit-card">
            <div className="kit-tag-row">
              <span className="kit-sku-badge">KIT-NEO-NICU-100</span>
              <span className="kit-highlight-badge">Non-Adhesive &amp; Hypoallergenic</span>
            </div>
            <h3 className="kit-title">Neonatal Delicate Care Specialized Bundle</h3>
            <p className="kit-target-env">Customized for ultra-fragile preterm infants, prioritizing zero epidermal tear and micro-circulation tracking.</p>

            <ul className="kit-items-list">
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Soft-Foam Non-Adhesive Neonatal Y-SpO2 Wraps</span>
                <span className="kit-item-qty">Qty: 30 Pcs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">3-Lead Neonatal Din-Click Soft Wire ECG Set</span>
                <span className="kit-item-qty">Qty: 5 Sets</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Micro-Scale TPU Neonatal NIBP Cuffs (Sizes 1–5)</span>
                <span className="kit-item-qty">Qty: 10 Cuffs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Reflective Incubator Skin Temperature Micro-Sensor</span>
                <span className="kit-item-qty">Qty: 5 Pcs</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Silicone Gel Fixing Straps for Pediatric Limbs</span>
                <span className="kit-item-qty">Qty: 20 Straps</span>
              </li>
              <li className="kit-item-row">
                <span className="kit-item-bullet"><svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#0047FF"/></svg></span>
                <span className="kit-item-name">Pediatric Dual-Wavelength Extension Adapter</span>
                <span className="kit-item-qty">Qty: 2 Cables</span>
              </li>
            </ul>

            <div className="kit-card-action">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => openBomModal("nicu")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Inspect Full Itemized BOM
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => handleSelectDeptForRfp("nicu")}>
                Request NICU Kit Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* S4: BIOCOMPATIBILITY & MATERIAL SAFETY COMPLIANCE */}
      <section className="compliance-section" id="biocompatibility">
      <div className="container-1220">
        <div className="section-header-block">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Clinical Safety &amp; Toxicological Validation
          </div>
          <h2 className="section-heading">Clinical Biocompatibility &amp; Material Safety</h2>
          <p className="section-description">
            Direct patient-contact accessories tested and certified according to stringent international regulatory frameworks. Zero compromise on patient safety or long-term skin health.
          </p>
        </div>

        <div className="compliance-grid">
          {/* Card 1: ISO 10993 Triple Testing */}
          <div className="compliance-card">
            <div className="comp-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            </div>
            <h3 className="comp-card-title">ISO 10993 Biological Safety</h3>
            <p className="comp-card-body">
              Full biocompatibility evaluation conducted by certified labs. Passed ISO 10993-5 (In Vitro Cytotoxicity: Grade 0), ISO 10993-10 (Skin Sensitization), and ISO 10993-23 (Skin Irritation: Zero reaction).
            </p>
            <span className="comp-metric-tag">Grade 0 Non-Cytotoxic</span>
          </div>

          {/* Card 2: Latex-Free & DEHP-Free */}
          <div className="compliance-card">
            <div className="comp-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <h3 className="comp-card-title">100% Latex &amp; DEHP Free</h3>
            <p className="comp-card-body">
              All raw materials free of natural rubber latex and phthalate plasticizers (DEHP-free). Eliminates contact dermatitis, Type I allergic anaphylaxis, and chemical leaching during critical therapy.
            </p>
            <span className="comp-metric-tag">EU REACH &amp; RoHS Compliant</span>
          </div>

          {/* Card 3: TPU + Kevlar Armor */}
          <div className="compliance-card">
            <div className="comp-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3 className="comp-card-title">Medical TPU + Kevlar Armor</h3>
            <p className="comp-card-body">
              Extruded with medical-grade thermoplastic polyurethane jacketing resistant to hospital disinfectant wipes (alcohol, bleach, quaternary ammonium). Internal DuPont Kevlar core withstands &gt;15kg pull.
            </p>
            <span className="comp-metric-tag">&gt; 10,000 Bend Cycles Tested</span>
          </div>

          {/* Card 4: Electrical & Hipot Safety */}
          <div className="compliance-card">
            <div className="comp-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3 className="comp-card-title">3,000V Dielectric Isolation</h3>
            <p className="comp-card-body">
              Every production batch undergoes 100% 3,000V AC Hipot insulation testing. Integrated defibrillator protection resistors safeguard both patient monitor inputs and internal circuitry.
            </p>
            <span className="comp-metric-tag">IEC 60601-2-27 Certified</span>
          </div>
        </div>

        {/* Official Regulatory Accreditation Logos Strip */}
        <div className="regulatory-strip-block">
          <div className="reg-strip-info">
            <div className="reg-strip-title">Global Notified Body &amp; Ministry Approvals</div>
            <p className="reg-strip-desc">Audited and verified by TÜV SÜD Product Service GmbH (Notified Body 0123) and listed under US FDA QSR 21 CFR Part 820.</p>
          </div>
          <div className="reg-strip-logos">
            <div className="reg-logo-box" title="TÜV SÜD ISO 13485:2016 Certification">
              <img src="/assets/images/certs/individual/logo-iso13485.png" alt="ISO 13485:2016 Certified" />
            </div>
            <div className="reg-logo-box" title="CE 0123 TÜV SÜD Mark">
              <img src="/assets/images/certs/individual/logo-ce0123.png" alt="CE 0123 Notified Body" />
            </div>
            <div className="reg-logo-box" title="European Union MDR 2017/745 Class IIb">
              <img src="/assets/images/certs/individual/logo-eumdr.png" alt="EU MDR 2017/745" />
            </div>
            <div className="reg-logo-box" title="US FDA 510(k) Cleared">
              <img src="/assets/images/certs/individual/logo-fda.png" alt="US FDA 510(k) Cleared" />
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* S5: HOSPITAL PROCUREMENT VALUE PROPOSITION */}
      <section className="value-prop-section" id="procurement-value">
      <div className="container-1220">
        <div className="section-header-block">
          <div className="section-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Hospital BME &amp; Supply Chain Economics
          </div>
          <h2 className="section-heading">Why Hospital Procurement &amp; BME Teams Choose Medke</h2>
          <p className="section-description">
            OEM monopoly markups drain critical hospital operational budgets. Medke provides certified, engineering-grade sensor alternatives that maintain identical clinical sensitivity while reducing departmental cost.
          </p>
        </div>

        <div className="value-matrix-grid">
          {/* Card 1 */}
          <div className="value-card">
            <div className="value-header-figure">30%–50%</div>
            <h3 className="value-card-title">Direct Budget Optimization</h3>
            <p className="value-card-text">
              Cut routine sensor replenishment expenditure in half without sacrificing waveform fidelity or alarm responsiveness. Reallocate savings into core capital equipment.
            </p>
            <div className="value-sub-metric">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Zero OEM Premium Markup
            </div>
          </div>

          {/* Card 2 */}
          <div className="value-card">
            <div className="value-header-figure">100%</div>
            <h3 className="value-card-title">Universal Multi-Brand Fleet</h3>
            <p className="value-card-text">
              Consolidate hospital inventory across Philips IntelliVue, GE Carescape, Mindray BeneVision, Dräger, and Nihon Kohden using Medke universal adapter trunks.
            </p>
            <div className="value-sub-metric">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Unified Warehouse SKU Management
            </div>
          </div>

          {/* Card 3 */}
          <div className="value-card">
            <div className="value-header-figure">3–7 Days</div>
            <h3 className="value-card-title">Agile Supply Continuity</h3>
            <p className="value-card-text">
              Avoid 8–12 week OEM factory backorders. Medke buffers 500+ standard hospital SKUs in Shenzhen warehouse hubs for immediate dispatch via DHL, FedEx, or air cargo.
            </p>
            <div className="value-sub-metric">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Guaranteed Stockout Prevention
            </div>
          </div>

          {/* Card 4 */}
          <div className="value-card">
            <div className="value-header-figure">12 Mos</div>
            <h3 className="value-card-title">Full Batch Traceability &amp; Warranty</h3>
            <p className="value-card-text">
              Comprehensive 12-month replacement warranty on reusable sensors. Every unit laser-etched with unique batch lot serials linked to 10-year Device Master Records (DMR).
            </p>
            <div className="value-sub-metric">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              Hospital Risk Governance Assurance
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* S6: INTERACTIVE DEPARTMENT RFP & SOLUTION DESK */}
      <section className="rfp-section" id="rfp-desk">
        <div className="container-1220 rfp-container">
          {/* Left Column: Context & Guarantees */}
          <div className="rfp-left-intro">
            <div className="rfp-super-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Hospital BME Fast-Track Support
            </div>

            <h2 className="rfp-title">Request a Tailored Departmental Solution &amp; Compatibility Dossier</h2>
            <p className="rfp-description">
              Whether outfitting a new 500-bed clinical tower or standardizing sensor replenishment across existing monitor fleets, our Shenzhen medical engineering desk provides detailed compatibility matrices and volume quotation within 24 hours.
            </p>

            <ul className="rfp-service-guarantees">
              <li className="rfp-guarantee-item">
                <svg className="rfp-guarantee-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong>Pinout &amp; DFM Verification:</strong> Free technical evaluation of your specific monitor interface connectors.</span>
              </li>
              <li className="rfp-guarantee-item">
                <svg className="rfp-guarantee-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong>Clinical Evaluation Samples:</strong> Free evaluation units shipped to accredited hospital BME departments.</span>
              </li>
              <li className="rfp-guarantee-item">
                <svg className="rfp-guarantee-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span><strong>Regulatory Package:</strong> Official TÜV SÜD CE MDR declaration, ISO 13485 certificates and FDA 510(k) summary copies provided.</span>
              </li>
            </ul>

            <div style={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 'var(--radius-xl)', padding: 'var(--space-300)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                Direct Engineering Hotline
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)', marginBottom: 4, display: 'flex', flexWrap: 'wrap', gap: '8px 12px', alignItems: 'center' }}>
                <a href="tel:+8675523463462" style={{ color: '#FFFFFF', textDecoration: 'none' }}>+86 755 23463462</a>
                <span style={{ color: '#64748B' }}>·</span>
                <a href="mailto:contact@medke.com" style={{ color: '#FFFFFF', textDecoration: 'none' }}>contact@medke.com</a>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>
                Shenzhen Medke Technology Co., Ltd. · Bao'an District, Shenzhen, China
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configuration RFP Form */}
          <div className="rfp-config-card">
            {/* Step 1: Department Selection */}
            <div className="config-step-block">
              <div className="config-step-label">
                <span className="step-number-circle">1</span>
                <span>Target Clinical Department(s)</span>
              </div>
              <div className="choice-pill-group" id="dept-choice-group">
                {[
                  { id: 'icu', label: 'ICU / CCU' },
                  { id: 'or', label: 'Operating Room' },
                  { id: 'emergency', label: 'Emergency & EMS' },
                  { id: 'nicu', label: 'NICU & Pediatrics' },
                  { id: 'ward', label: 'General Ward' },
                  { id: 'cardio', label: 'Cardiology Suite' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`choice-pill ${rfpDept === d.id ? 'active' : ''}`}
                    onClick={() => setRfpDept(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Primary Monitor Fleet */}
            <div className="config-step-block">
              <div className="config-step-label">
                <span className="step-number-circle">2</span>
                <span>Primary Patient Monitor Brand</span>
              </div>
              <div className="choice-pill-group" id="brand-choice-group">
                {[
                  { id: 'philips', label: 'Philips IntelliVue' },
                  { id: 'ge', label: 'GE Carescape / Datex' },
                  { id: 'mindray', label: 'Mindray BeneVision / uMEC' },
                  { id: 'drager', label: 'Dräger Infinity Series' },
                  { id: 'nihonkohden', label: 'Nihon Kohden Life Scope' },
                  { id: 'mixed', label: 'Mixed Multi-Brand Fleet' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={`choice-pill ${rfpBrand === b.id ? 'active' : ''}`}
                    onClick={() => setRfpBrand(b.id)}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Live Package Summary */}
            <div className="live-config-output-bar">
              <div className="config-output-left">
                Current Configuration: <span className="config-output-highlight" id="live-config-summary">{rfpDeptNames[rfpDept] || rfpDept} · {rfpBrandNames[rfpBrand] || rfpBrand}</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22C55E', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="#22C55E"/></svg>
                In Stock &amp; Validated
              </span>
            </div>

            {/* RFP Form */}
            <form id="department-rfp-form" onSubmit={handleRfpSubmit}>
              <div className="rfp-form-grid">
                <div className="form-field-wrap">
                  <label className="form-label" htmlFor="rfp-name">Full Name *</label>
                  <input
                    type="text"
                    id="rfp-name"
                    className="form-input"
                    placeholder="e.g. Dr. Thomas Wright / Ing. Sarah Schmidt"
                    value={rfpForm.name}
                    onChange={(e) => setRfpForm({ ...rfpForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-wrap">
                  <label className="form-label" htmlFor="rfp-email">Institutional Email *</label>
                  <input
                    type="email"
                    id="rfp-email"
                    className="form-input"
                    placeholder="e.g. twright@st-marys-hospital.org"
                    value={rfpForm.email}
                    onChange={(e) => setRfpForm({ ...rfpForm, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-wrap">
                  <label className="form-label" htmlFor="rfp-org">Hospital / Organization *</label>
                  <input
                    type="text"
                    id="rfp-org"
                    className="form-input"
                    placeholder="e.g. St. Mary's General Hospital / BioMed Supply"
                    value={rfpForm.org}
                    onChange={(e) => setRfpForm({ ...rfpForm, org: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-wrap">
                  <label className="form-label" htmlFor="rfp-country">Country / Region *</label>
                  <input
                    type="text"
                    id="rfp-country"
                    className="form-input"
                    placeholder="e.g. Germany / United States / Saudi Arabia"
                    value={rfpForm.country || ''}
                    onChange={(e) => setRfpForm({ ...rfpForm, country: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field-wrap form-field-full">
                  <label className="form-label" htmlFor="rfp-notes">Specific Sensor Requirements / Target Monitor Models</label>
                  <textarea
                    id="rfp-notes"
                    className="form-input"
                    placeholder="Specify monitor connector pinouts, required accessory categories (SpO2, ECG, NIBP, IBP, Temp), or tender deadlines..."
                    value={rfpForm.notes}
                    onChange={(e) => setRfpForm({ ...rfpForm, notes: e.target.value })}
                  ></textarea>
                </div>
                <label className="form-checkbox-label">
                  <input type="checkbox" id="rfp-certs-req" defaultChecked />
                  <span>Include TÜV SÜD CE MDR Class IIb &amp; ISO 13485 regulatory certificate copies</span>
                </label>
              </div>

              <button type="submit" className="rfp-submit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                <span>Request Tailored Departmental Proposal &amp; Dossier</span>
              </button>

              {rfpSubmitted && (
                <div style={{ marginTop: 16, padding: '12px 16px', background: '#DCFCE7', color: '#166534', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                  Thank you! Your department RFP has been routed to our biomedical engineering team. An OEM-cross-referenced proposal will be sent to {rfpForm.email} within 4 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* S3 BOM MODAL DRAWER */}
      {activeBomKit && (
        <div className="modal-backdrop active" id="bom-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) closeBomModal(); }}>
          <div className="modal-container" role="dialog" aria-modal="true">
            <div className="modal-header">
              <div className="modal-title-group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--medke-blue)" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <div className="modal-title" id="modal-kit-title">{activeBomKit.title}</div>
                <span className="modal-sku-pill" id="modal-kit-sku">{activeBomKit.sku}</span>
              </div>
              <button type="button" className="modal-close-btn" onClick={closeBomModal} aria-label="Close Bill of Materials">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="bom-meta-strip">
                <div className="bom-meta-item">
                  <span className="bom-meta-label">Standard Kit Packaging:</span>
                  <span className="bom-meta-val">Individual Antistatic Polybags + Master Carton</span>
                </div>
                <div className="bom-meta-item">
                  <span className="bom-meta-label">Regulatory Status:</span>
                  <span className="bom-meta-val">FDA 510(k) Cleared / CE Class IIb / ISO 13485</span>
                </div>
                <div className="bom-meta-item">
                  <span className="bom-meta-label">OEM Fleet Matching:</span>
                  <span className="bom-meta-val">Pre-Calibrated Plug &amp; Play</span>
                </div>
              </div>

              <div className="table-responsive-wrap">
                <table className="bom-table">
                  <thead>
                    <tr>
                      <th style={{ width: '12%' }}>Category</th>
                      <th style={{ width: '40%' }}>Component Item Description</th>
                      <th style={{ width: '22%' }}>Medke Model / Spec</th>
                      <th style={{ width: '26%' }}>Clinical Feature</th>
                    </tr>
                  </thead>
                  <tbody id="modal-bom-tbody">
                    {activeBomKit.items.map((item, idx) => (
                      <tr key={idx}>
                        <td><span className="bom-cat-badge">{item.cat}</span></td>
                        <td><strong>{item.item}</strong></td>
                        <td><span className="bom-pn-badge">{item.pn}</span></td>
                        <td><span className="bom-desc-text">{item.desc}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <div className="modal-footer-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Full lot traceability barcodes affixed to each internal blister pack.</span>
              </div>
              <div className="modal-btn-group">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => openLeadModal({
                    title: `Download Kit BOM (PDF): ${activeBomKit.title}`,
                    badge: `${activeBomKit.sku} · Technical Document`,
                    assetName: `${activeBomKit.title} Bill of Materials Specification`
                  })}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  <span>Download Complete BOM (PDF)</span>
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    closeBomModal();
                    handleSelectDeptForRfp(activeBomKit.key === 'nicu' ? 'nicu' : (activeBomKit.key === 'or' ? 'or' : 'icu'));
                  }}
                >
                  <span>Request Price Quotation</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast */}
      {toastMsg && (
        <div className="toast-notification active" id="global-toast">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span id="toast-message-text">{toastMsg}</span>
        </div>
      )}

      {/* Lead Generation & Brochure Modal */}
      <LeadBrochureModal
        isOpen={modalConfig.isOpen}
        onClose={closeLeadModal}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        badge={modalConfig.badge}
        pdfUrl={modalConfig.pdfUrl}
        downloadFilename={modalConfig.downloadFilename}
        assetName={modalConfig.assetName}
      />
    </div>
  );
}
