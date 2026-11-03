import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import './BrandsPage.css';

const BRANDS_DATA = [
        {
          "id": "philips",
          "name": "Philips Healthcare",
          "origin": "Netherlands",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-philips.png",
          "badge": "54 Cleared Pinouts",
          "models": ["IntelliVue MX400-MX800", "IntelliVue MP20-MP90", "Avalon Fetal Series", "Efficia CM10-CM150", "SureSigns VM/VS", "HeartStart MRx/XL+", "M1205A / M1008B", "X2 / X3 Transport"],
          "hardware": "D-Sub 8-pin, 12-pin, Dual-pin fast snap. ±0.02mm pinout tolerance. Zero signal drift.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "D-Sub 8-pin / 12-pin Direct & Adapter", "molds": "42 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "12-pin Trunk & 3/5/10-Lead AHA/IEC", "molds": "36 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Quick-Lock Snap Coupler (Zero-Leak)", "molds": "28 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "12-pin Round Connector (BB-103)", "molds": "16 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "2-pin Round YSI 400 Series Compatible", "molds": "14 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "ge",
          "name": "GE Healthcare",
          "origin": "United States",
          "logoType": "text",
          "logoText": "GE Healthcare",
          "badge": "48 Cleared Pinouts",
          "models": ["CARESCAPE B850 / B650 / B450", "Solar 8000M / 7000", "Dash 2500 / 3000 / 5000", "Eagle 1000 / 3000", "Tram Modules 451N", "ApexPro Telemetry", "MAC 1200 / 5500 EKG", "Corometrics 120 / 250"],
          "hardware": "11-pin Multi-Link, 8-pin Ohmeda, Screw-lock pneumatic dual-tube couplers.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "11-pin OXY-TIP & Ohmeda UN-pin Direct", "molds": "38 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "11-pin Multi-Link 3/5/10-Lead Defib Proof", "molds": "34 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Dual-Tube Screw-Lock & Rectangular Push", "molds": "26 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "11-pin Dual Channel Host Cable (BB-101)", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "Multi-Link 11-pin Dual Temp Adapter", "molds": "12 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "mindray",
          "name": "Mindray Medical",
          "origin": "China",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-mindray.png",
          "badge": "44 Cleared Pinouts",
          "models": ["BeneVision N12 / N15 / N17 / N22", "BeneView T5 / T6 / T8", "ePM 10M / 12M", "iMEC 8 / 10 / 12", "uMEC 6 / 7 / 10 / 12", "PM-60 / 6000 / 7000", "BeneHeart D3 / D6", "DPM5 / DPM6 / DPM7"],
          "hardware": "Circular 6-pin, 7-pin, 12-pin push-pull self-latching connectors with medical gold plating.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "7-pin & 12-pin Circular Push-Pull", "molds": "36 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "12-pin Direct Trunk 3/5/12-Lead AHA/IEC", "molds": "32 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Quick-Coupling Metal & Plastic Push-in", "molds": "24 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "12-pin Circular IBP Interface (BB-101/104)", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "2-pin Round Mini & YSI 400 Sockets", "molds": "12 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "masimo",
          "name": "Masimo",
          "origin": "United States",
          "logoType": "text",
          "logoText": "Masimo SET",
          "badge": "38 Cleared Pinouts",
          "models": ["Radical-7 Pulse CO-Oximeter", "Rad-97 / Rad-97 NomoLine", "Rad-57 Handheld", "Rad-8 / Rad-5 Handhelds", "Root Patient Monitoring Hub", "Pronto-7 SpHb", "M-LNCS / LNCS Direct", "SedLine Brain Function"],
          "hardware": "Red 20-pin RD SET, 14-pin LNCS, 9-pin DB-9 direct host interfaces with digital chip calibration.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "RD SET 20-pin, LNCS 14-pin, DB-9 Direct", "molds": "32 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "Cross-Platform Adapter Cables for Root Hub", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "NIBP Quick Coupler for Root / Rad-97", "molds": "12 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "Multi-Parameter Host Interface Cables", "molds": "8 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "Continuous Direct Probes for Root Hub", "molds": "8 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "nellcor",
          "name": "Nellcor (Medtronic)",
          "origin": "United States",
          "logoType": "text",
          "logoText": "Nellcor OxiMax",
          "badge": "36 Cleared Pinouts",
          "models": ["OxiMax N-600x / N-560", "Bedside SpO2 PM1000N / PM100N", "OxiMax N-595 / N-550", "NPB-75 / NPB-40 Handhelds", "OxiMax MAX-A / MAX-P", "DOC-10 Interface Module", "Dura-Y Multi-Site", "Oxiband Pediatric"],
          "hardware": "DB-9 pin male/female latching and 14-pin digital host connectors with OxiMax calibration resistance.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "DB-9 OxiMax & Non-OxiMax Direct & Adapter", "molds": "30 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "Interface Leadwires for PM1000N Hubs", "molds": "12 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Dual-lumen Push Couplers", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "Abbott/Edwards Transducer Line Matching", "molds": "8 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "YSI 400 Standard Compatible Probes", "molds": "10 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "drager",
          "name": "Dräger Medical",
          "origin": "Germany",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-drager.png",
          "badge": "42 Cleared Pinouts",
          "models": ["Infinity Delta / Delta XL", "Infinity Vista / Vista XL", "Infinity Gamma / Gamma XL", "Infinity Kappa / Multimed", "Atlan Anesthesia Workstation", "Perseus / Primus Workstations", "Infinity M300 Telemetry", "Oxylog 3000 Plus"],
          "hardware": "MultiMed 7-pin, 8-pin, 14-pin shielded round push-pull military grade multi-parameter pods.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "7-pin & 8-pin MultiMed Direct & Extension", "molds": "28 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "MultiMed Pod 3/5/6-Lead Monolead & Dual", "molds": "26 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Quick-Release Locking Dual Couplers", "molds": "20 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "7-pin Shielded Interface Cable (BB-102)", "molds": "12 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "7-pin Round Dual Temp Adapter Cables", "molds": "10 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "nihonkohden",
          "name": "Nihon Kohden",
          "origin": "Japan",
          "logoType": "text",
          "logoText": "Nihon Kohden",
          "badge": "40 Cleared Pinouts",
          "models": ["Life Scope G9 / G7 / G5 (BSM-1700)", "Life Scope TR (BSM-6000)", "Life Scope VS (BSM-3000)", "Life Scope J (BSM-9101)", "Bedside Monitor BSM-2300", "Cardiofax ECG-1150 / 2350", "TEC-5600 / 8300 Defib", "GF-210R Gas Unit"],
          "hardware": "14-pin circular multi-key, 8-pin subminiature, JL-900P SpO2 adapter socket.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "14-pin & 8-pin Direct & JL-900P Adapter", "molds": "28 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "14-pin Trunk 3/6/10-Lead with Defib Resistors", "molds": "26 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Twist-Lock S-Coupler Pneumatic Hoses", "molds": "18 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "14-pin Dual IBP Cable (BB-101/104)", "molds": "10 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "Miniature Round YSI 400 Equivalent", "molds": "10 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "spacelabs",
          "name": "Spacelabs Healthcare",
          "origin": "United States",
          "logoType": "text",
          "logoText": "Spacelabs",
          "badge": "34 Cleared Pinouts",
          "models": ["Xhibit Central Station", "Qube / Qube Mini Monitors", "Xprezzon High-Acuity", "Ultraview SL2400 / SL2800", "91369 / 91370 / 91387 Hubs", "AriaTele Telemetry", "Command Module 90496", "OnTrak 90217 ABP"],
          "hardware": "10-pin TruLink rectangular keyed latch, 17-pin multi-parameter command module connector.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "10-pin TruLink Direct & Adapter Cables", "molds": "24 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "17-pin Command Module Trunk 3/5/10-Lead", "molds": "22 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Quick-Release Push-Button Couplers", "molds": "16 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "10-pin Modular IBP Interface (BB-101)", "molds": "10 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "TruLink YSI 400 Compatible Probes", "molds": "8 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "schiller",
          "name": "Schiller AG",
          "origin": "Switzerland",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-schiller.png",
          "badge": "28 Cleared Pinouts",
          "models": ["DEFIGARD HD-7 / Touch 7", "AT-102 G2 / AT-101 ECG", "CARDIOVIT FT-1 / CS-200", "Argus PRO LifeCare 2", "MAGLIFE Serene MRI Monitor", "PHYSIOGARD Touch 7", "FRED easyport Defib", "BR-102 plus ABP"],
          "hardware": "DIN 15-pin D-sub, 7-pin push-pull, precision gold lantern-petal bananas.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "7-pin Push-Pull & 9-pin Direct Sensors", "molds": "18 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "15-pin D-Sub 10-Lead Defib Protected Cables", "molds": "22 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Metal Luer-Lock & Push-in Connectors", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "Transducer Adapter Kits for Argus Pro", "molds": "6 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "2-pin Precision Thermistors", "molds": "8 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "biolight",
          "name": "Biolight Meditech",
          "origin": "China",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-biolight.png",
          "badge": "26 Cleared Pinouts",
          "models": ["AnyView A8 / A6 / A5 / A3", "Q7 / Q5 / Q3 Multi-parameter", "M69 / M66 / M60 Portable", "M8000 / M8500 Express", "BLT V6 Vital Signs", "E30 / E50 / E70 Series", "S12 / S10 Emergency", "W30 Wearable Telemetry"],
          "hardware": "12-pin round multi-notch, 5-pin push-pull quick connectors.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "12-pin Round Digital SpO2 Direct & Ext", "molds": "20 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "12-pin Trunk 3/5-Lead AHA/IEC", "molds": "20 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Quick-Release Bayonet Pneumatic Couplers", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "6-pin Round Transducer Cables (BB-101)", "molds": "8 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "Standard Phone Jack 6.3mm / YSI 400", "molds": "8 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "comen",
          "name": "Comen Medical",
          "origin": "China",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-comen.png",
          "badge": "28 Cleared Pinouts",
          "models": ["C80 / C70 / C60 ICU Series", "K1 / K2 Modular High-Acuity", "WQ-001 Wireless Telemetry", "Star8000 / Star5000 Fetal", "NC12 / NC10 / NC8 Vital Signs", "H3 3-Channel Diagnostic ECG", "C30 Emergency Transport", "AX-400 / AX-700 Anesthesia"],
          "hardware": "12-pin round self-latching, 6-pin modular sensor sockets.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "12-pin & 8-pin Direct & Extension Cables", "molds": "22 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "12-pin 3/5/12-Lead Snap/Grabber Trunk", "molds": "20 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Metal Dual-Lumen Quick Connectors", "molds": "16 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "12-pin Round Host Cables (BB-103)", "molds": "8 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "2-pin Round YSI 400 Probes", "molds": "8 Molds", "status": "100% In Stock & Cleared"}
          ]
        },
        {
          "id": "edan",
          "name": "Edan Instruments",
          "origin": "China",
          "logoType": "image",
          "logoSrc": "/assets/images/clients/client-logo-edan.png",
          "badge": "26 Cleared Pinouts",
          "models": ["Elite V8 / V6 / V5 Modular", "iM80 / iM70 / iM60 / iM50", "X12 / X10 / X8 Multi-parameter", "M3 / M3A Vital Signs", "SE-1200 Pro / SE-1201 ECG", "F9 / F6 / F3 Fetal Monitors", "SD3 Vascular Doppler", "i15 Blood Gas Analyzer"],
          "hardware": "7-pin Lemo type, 12-pin round locking patient cable sockets.",
          "categories": [
            {"cat": "SpO2 Sensors", "conn": "7-pin Lemo & 12-pin Digital SpO2 Direct", "molds": "20 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "ECG & EKG Cables", "conn": "12-pin 3/5-Lead Defibrillator-Proof Cable", "molds": "20 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "NIBP Cuffs & Hoses", "conn": "Quick-Coupling Plastic & Metal Connectors", "molds": "14 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "IBP Transducer Kits", "conn": "7-pin Transducer Host Cable (BB-104)", "molds": "8 Molds", "status": "100% In Stock & Cleared"},
            {"cat": "Temperature Probes", "conn": "YSI 400 Equivalent 2-pin Probes", "molds": "8 Molds", "status": "100% In Stock & Cleared"}
          ]
        }
      ];

const OEM_LOOKUP_DB = {
        "M1191B": {"brand": "philips", "brandName": "Philips Healthcare", "cat": "SpO2 Sensors", "desc": "Adult Reusable Soft Silicone SpO2 Sensor, 12-pin, 2.0m", "medkePn": "P8119B", "stock": "100% In Stock & Cleared"},
        "2007345-001": {"brand": "ge", "brandName": "GE Healthcare", "cat": "ECG & EKG Cables", "desc": "Multi-Link 5-Lead Grabber ECG Trunk Cable, 11-pin", "medkePn": "ECG-G501A", "stock": "100% In Stock & Cleared"},
        "115-018012-00": {"brand": "mindray", "brandName": "Mindray Medical", "cat": "NIBP Cuffs & Hoses", "desc": "Adult Reusable NIBP Cuff (25-35 cm) with Quick-Connect Tube", "medkePn": "NIBP-M01", "stock": "100% In Stock & Cleared"},
        "0010-30-42719": {"brand": "mindray", "brandName": "Mindray Medical", "cat": "Temperature Probes", "desc": "Adult Reusable Skin Surface Temperature Probe, Round 2-Pin", "medkePn": "TMP-MR01", "stock": "100% In Stock & Cleared"},
        "4000-01": {"brand": "drager", "brandName": "Dräger Medical", "cat": "IBP Transducer Kits", "desc": "7-Pin Shielded Transducer Interface Cable for Infinity Series", "medkePn": "IBP-DR07", "stock": "100% In Stock & Cleared"},
        "2360": {"brand": "masimo", "brandName": "Masimo", "cat": "SpO2 Sensors", "desc": "RD SET DCI Adult Reusable SpO2 Sensor, 3ft Direct", "medkePn": "P9360M", "stock": "100% In Stock & Cleared"},
        "DOC-10": {"brand": "nellcor", "brandName": "Nellcor (Medtronic)", "cat": "SpO2 Sensors", "desc": "OxiMax Patient Interface Cable 10ft / 3.0m", "medkePn": "ADP-N10", "stock": "100% In Stock & Cleared"},
        "K912": {"brand": "nihonkohden", "brandName": "Nihon Kohden", "cat": "ECG & EKG Cables", "desc": "3-Lead Snap Patient Leadwire Set, DIN 14-pin", "medkePn": "ECG-NK301", "stock": "100% In Stock & Cleared"},
        "700-0030-00": {"brand": "spacelabs", "brandName": "Spacelabs Healthcare", "cat": "SpO2 Sensors", "desc": "TruLink Adult Finger Sensor, 10-pin Rectangular", "medkePn": "P9700S", "stock": "100% In Stock & Cleared"},
        "2.400070": {"brand": "schiller", "brandName": "Schiller AG", "cat": "ECG & EKG Cables", "desc": "10-Lead Patient Cable with Banana Plugs, Defib-Protected", "medkePn": "EKG-SC10", "stock": "100% In Stock & Cleared"},
        "15-100-0014": {"brand": "biolight", "brandName": "Biolight Meditech", "cat": "SpO2 Sensors", "desc": "12-Pin Digital SpO2 Sensor Adult Clip, 3.0m", "medkePn": "P915B", "stock": "100% In Stock & Cleared"},
        "02.01.210673": {"brand": "comen", "brandName": "Comen Medical", "cat": "Temperature Probes", "desc": "General Purpose Reusable Temperature Probe, 2-Pin YSI 400", "medkePn": "TMP-CM02", "stock": "100% In Stock & Cleared"},
        "01.57.471017": {"brand": "edan", "brandName": "Edan Instruments", "cat": "ECG & EKG Cables", "desc": "12-Pin 5-Lead Snap Defibrillation Proof ECG Cable", "medkePn": "ECG-ED12", "stock": "100% In Stock & Cleared"}
      };

export default function BrandsPage() {
  const [currentBrandId, setCurrentBrandId] = useState('philips');
  const [activeHighlightModel, setActiveHighlightModel] = useState('');
  const [unifiedSearchQuery, setUnifiedSearchQuery] = useState('');
  const [matchedOemResult, setMatchedOemResult] = useState(null);
  const [activeSpecTab, setActiveSpecTab] = useState('spo2');
  const [toastMessage, setToastMessage] = useState('');
  const [toastActive, setToastActive] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: 'Download 2026 Master Cross-Reference Guide',
    subtitle: 'Instant download: Full cross-reference index, pinout diagrams, biocompatibility certificates, and tiered OEM price sheets.',
    badge: 'Complete Engineering E-Brochure (472+ SKUs)'
  });

  const toastTimerRef = useRef(null);

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    setToastActive(true);
    toastTimerRef.current = setTimeout(() => {
      setToastActive(false);
    }, 4000);
  };

  const openLeadModal = (custom = {}) => {
    setModalConfig({
      isOpen: true,
      title: custom.title || 'Brand Cross-Reference Request',
      subtitle: custom.subtitle || 'Instant download: Full cross-reference index, pinout diagrams, biocompatibility certificates, and tiered OEM price sheets.',
      badge: custom.badge || 'Direct Engineering Vault Dispatch (472+ SKUs)'
    });
  };

  const closeLeadModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const scrollToBrandHub = () => {
    const el = document.getElementById('brand-matrix');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('unifiedSearchInput');
        if (input) input.focus();
      }, 600);
    }
  };

  const jumpToBrandHub = (brandId) => {
    switchActiveBrand(brandId);
    scrollToBrandHub();
    const brand = BRANDS_DATA.find(b => b.id === brandId);
    showToast(`Switched directly to ${brand ? brand.name : brandId} Hub`);
  };

  const switchActiveBrand = (brandId, highlightModel = '') => {
    setCurrentBrandId(brandId);
    setActiveHighlightModel(highlightModel);
  };

  const executeUnifiedLookup = (query) => {
    const qTrim = query.trim();
    if (!qTrim) {
      showToast('Please enter a Monitor Model (e.g. MX400, ePM 12) or OEM Part # (e.g. M1191B).');
      return;
    }
    const qUpper = qTrim.toUpperCase();

    // 1. OEM Part Match
    let partMatch = OEM_LOOKUP_DB[qUpper];
    if (!partMatch) {
      const foundKey = Object.keys(OEM_LOOKUP_DB).find(k => k.includes(qUpper) || qUpper.includes(k));
      if (foundKey) partMatch = OEM_LOOKUP_DB[foundKey];
    }

    if (partMatch) {
      setMatchedOemResult({
        part: qTrim,
        desc: partMatch.desc,
        medkePn: `${partMatch.medkePn} (${partMatch.stock})`
      });
      switchActiveBrand(partMatch.brand);
      scrollToBrandHub();
      showToast(`OEM Match Found! Linked to ${partMatch.brandName} (${partMatch.cat}).`);
      return;
    }

    // 2. Monitor Model Match
    let matchedBrand = null;
    let matchedModelName = '';

    for (const brand of BRANDS_DATA) {
      const foundModel = brand.models.find(m => m.toLowerCase().includes(qTrim.toLowerCase()));
      if (foundModel) {
        matchedBrand = brand;
        matchedModelName = foundModel;
        break;
      }
      if (brand.name.toLowerCase().includes(qTrim.toLowerCase()) || brand.id.toLowerCase().includes(qTrim.toLowerCase())) {
        matchedBrand = brand;
        matchedModelName = brand.models[0];
        break;
      }
    }

    if (matchedBrand) {
      setMatchedOemResult({
        part: `Model: ${qTrim}`,
        desc: `${matchedBrand.name} (${matchedModelName}) Pinout Verified`,
        medkePn: 'Complete 5-Category Cable Harness Cleared'
      });
      switchActiveBrand(matchedBrand.id, qTrim);
      scrollToBrandHub();
      showToast(`Model Matched! Displaying ${matchedBrand.name} interface specifications.`);
      return;
    }

    // 3. Fallback to custom engineering lookup
    setMatchedOemResult(null);
    showToast(`Query '${qTrim}' noted. Our engineering vault covers 472+ pinouts. Opening inquiry window...`);
    openLeadModal({
      title: `Custom Pinout Lookup: ${qTrim}`,
      badge: '2-Hour Engineering SLA'
    });
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    executeUnifiedLookup(unifiedSearchQuery);
  };

  const triggerQuickLookup = (term) => {
    setUnifiedSearchQuery(term);
    executeUnifiedLookup(term);
  };

  const activeBrand = BRANDS_DATA.find(b => b.id === currentBrandId) || BRANDS_DATA[0];

  return (
    <div className="brands-page">
      {/* S1: HERO REPOSITORY HEADER & DIRECT BRAND JUMP (SCHEME 1) */}
      <section className="hero-section" id="hero-search">
        <div className="container reveal-on-scroll">
          <div className="hero-header">
            <div className="section-tag">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span>Verified Cross-Reference Database · 2026 Edition</span>
            </div>
            <h1 className="hero-title">
              Global Patient Monitor<br />
              <span className="hero-title-highlight">Compatibility Matrix</span>
            </h1>
            <p className="hero-desc">
              Directly cross-reference 2,000+ proprietary tooling dies and 472+ verified pinout schematics. Engineered for hospital biomedical equipment directors requiring exact keyway alignment, dielectric shielding, and zero signal drift.
            </p>
            <div className="hero-badges-row">
              <div className="hero-stat-badge"><strong>2,000+</strong> Mold Tooling Sets In-House</div>
              <div className="hero-stat-badge"><strong>472+</strong> Verified Pinout Schematics</div>
              <div className="hero-stat-badge"><strong>&plusmn;0.02mm</strong> Dielectric Centering Baseline</div>
              <div className="hero-stat-badge"><strong>98%</strong> Global Hospital Monitor Coverage</div>
            </div>
          </div>

          {/* Quick Jump to Brand Hub Navigator Bar */}
          <div className="hero-brand-navigator">
            <div className="brand-navigator-header">
              <div className="brand-navigator-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2.5"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                <span>Quick Jump to Brand Hub:</span>
              </div>
              <a href="#brand-matrix" className="hero-explore-btn" onClick={(e) => { e.preventDefault(); scrollToBrandHub(); }}>
                <span>Explore Brand Compatibility Hub &darr;</span>
              </a>
            </div>
            <div className="brand-navigator-pills">
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('philips')}>
                <span className="brand-dot"></span>
                <span>Philips IntelliVue</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('mindray')}>
                <span className="brand-dot"></span>
                <span>Mindray BeneView / ePM</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('ge')}>
                <span className="brand-dot"></span>
                <span>GE Carescape / Dash</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('drager')}>
                <span className="brand-dot"></span>
                <span>Dr&auml;ger Infinity Delta</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('nihonkohden')}>
                <span className="brand-dot"></span>
                <span>Nihon Kohden Life Scope</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('masimo')}>
                <span className="brand-dot"></span>
                <span>Masimo SET Root</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('nellcor')}>
                <span className="brand-dot"></span>
                <span>Nellcor OxiMax</span>
              </button>
              <button type="button" className="hero-brand-pill" onClick={() => jumpToBrandHub('spacelabs')}>
                <span className="brand-dot"></span>
                <span>Spacelabs Qube / SL</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* S2: BRAND COMPATIBILITY HUB (TIER-1 HUB) */}
      <section className="brand-hub-section" id="brand-matrix">
        <div className="container reveal-on-scroll">
          <div className="brand-hub-header">
            <div className="brand-hub-title-group">
              <h2>Brand Compatibility Hub</h2>
              <p className="brand-hub-subtitle">Verify instant pinout, mold matching, and clinical form factors across 12+ international bedside monitor brands.</p>
            </div>
            <div className="authority-pill-badge">
              <span className="authority-pill-dot"></span>
              <span>Real-Time Pinout Verification Active</span>
            </div>
          </div>

          {/* S2 UNIFIED SMART COMPATIBILITY & OEM LOOKUP HUB */}
          <div className="oem-search-container">
            <form className="oem-search-row" onSubmit={handleSearchSubmit}>
              <div className="oem-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <input
                type="text"
                id="unifiedSearchInput"
                className="oem-search-input"
                placeholder="Search by Monitor Model (e.g. MX400, ePM 12) or OEM Part # (e.g. M1191B, 2007345-001)..."
                autoComplete="off"
                value={unifiedSearchQuery}
                onChange={(e) => setUnifiedSearchQuery(e.target.value)}
              />
              <button type="submit" className="oem-search-btn" id="btnUnifiedSearch">Search &amp; Match Pinout</button>
            </form>
            <div className="oem-quick-tags">
              <span className="oem-tag-label">Sample Lookups:</span>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('MX400')}>MX400 (Philips Monitor)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('M1191B')}>M1191B (Philips SpO2)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('ePM 12')}>ePM 12 (Mindray Monitor)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('2007345-001')}>2007345-001 (GE ECG)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('B650')}>B650 (GE Carescape)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('115-018012-00')}>115-018012-00 (Mindray NIBP)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('Infinity Delta')}>Infinity Delta (Dr&auml;ger)</button>
              <button type="button" className="oem-quick-pill" onClick={() => triggerQuickLookup('DOC-10')}>DOC-10 (Nellcor SpO2)</button>
            </div>
          </div>

          {/* OEM Match Feedback Banner */}
          <div className={`oem-match-banner ${matchedOemResult ? 'visible' : ''}`} id="oemMatchBanner">
            <div className="oem-match-meta">
              <div>Verified Match for: <strong id="oemMatchPart">{matchedOemResult ? matchedOemResult.part : 'M1191B'}</strong></div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }} id="oemMatchDesc">
                {matchedOemResult ? matchedOemResult.desc : 'Adult Reusable Soft Silicone SpO2 Sensor, 12-pin'}
              </div>
            </div>
            <div className="oem-match-medke">
              Medke Equivalent: <strong id="oemMedkePn" style={{ color: 'var(--color-primary)' }}>{matchedOemResult ? matchedOemResult.medkePn : 'P8119B (100% In Stock & Cleared)'}</strong>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ fontSize: 12, padding: '6px 14px' }}
              onClick={() => openLeadModal({
                title: `Quote Request for ${matchedOemResult ? matchedOemResult.part : 'OEM Part'}`,
                badge: '472+ Pinout Index Compatibility'
              })}
            >
              Request Cross-Ref Quote
            </button>
          </div>

          {/* Brand Pills Cloud */}
          <div className="brand-cloud-wrapper">
            {BRANDS_DATA.map((brand) => (
              <button
                key={brand.id}
                type="button"
                className={`brand-pill-btn ${currentBrandId === brand.id ? 'active' : ''}`}
                data-brand-id={brand.id}
                onClick={() => switchActiveBrand(brand.id)}
              >
                {brand.logoType === 'image' ? (
                  <img src={brand.logoSrc} alt={brand.name} className="brand-pill-img" loading="lazy" />
                ) : (
                  <span className="brand-pill-text">{brand.logoText}</span>
                )}
              </button>
            ))}
          </div>

          {/* Active Brand Inspector Card */}
          <div className="brand-inspector-card" id="brandInspectorCard">
            <div className="inspector-top-banner">
              <div className="inspector-brand-meta">
                <div className="inspector-brand-logo-slot" id="inspectorLogoSlot">
                  {activeBrand.logoType === 'image' ? (
                    <img src={activeBrand.logoSrc} alt={activeBrand.name} style={{ height: 24, maxHeight: 24 }} />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-primary)', fontSize: 16, fontWeight: 800, color: 'var(--color-navy)' }}>
                      {activeBrand.logoText}
                    </span>
                  )}
                </div>
                <div>
                  <span className="inspector-brand-name" id="inspectorBrandName">{activeBrand.name}</span>
                  <span className="inspector-origin-tag" id="inspectorOriginTag">{activeBrand.origin}</span>
                </div>
              </div>
              <div className="inspector-cta-group">
                <button
                  type="button"
                  className="btn-inspector-pinout"
                  onClick={() => openLeadModal({
                    title: `Download Pinout CAD Spec: ${activeBrand.name}`,
                    badge: `${activeBrand.badge} · CAD Diagram`
                  })}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  <span>Pinout CAD Spec</span>
                </button>
                <button
                  type="button"
                  className="btn-inspector-spec"
                  id="inspectorCrossRefBtn"
                  onClick={() => openLeadModal({
                    title: `Brand Cross-Reference Request: ${activeBrand.name}`,
                    badge: 'Full Pinout Matrix Clearance'
                  })}
                >
                  <span>Request {activeBrand.name.split(' ')[0]} Cross-Reference Sheet</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </div>
            </div>

            <div className="inspector-body-grid">
              {/* Left Column: Covered Models */}
              <div className="inspector-left-card">
                <div>
                  <div className="inspector-col-title">
                    <span>Covered Monitor Series &amp; Modules</span>
                    <span className="models-count-badge">
                      {activeBrand.models.length} Core Series
                    </span>
                  </div>
                  <div className="model-tags-cloud" id="inspectorModelsList">
                    {activeBrand.models.map((modelName) => {
                      const isMatched = activeHighlightModel && modelName.toLowerCase().includes(activeHighlightModel.toLowerCase());
                      return (
                        <span
                          key={modelName}
                          className={`model-tag-pill ${isMatched ? 'matched-highlight' : ''}`}
                        >
                          {modelName}
                        </span>
                      );
                    })}
                  </div>
                  <div className="hardware-spec-box">
                    <div className="hardware-spec-label">Signal Benchmark: 0-Signal Drift Verified</div>
                    <div className="hardware-spec-text" id="inspectorHardwareDesc">{activeBrand.hardware}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-cad-download"
                  onClick={() => openLeadModal({
                    title: `Download Pinout CAD Spec: ${activeBrand.name}`,
                    badge: `${activeBrand.badge} · CAD Diagram`
                  })}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                  <span>Download Vector Pinout CAD Blueprint</span>
                </button>
              </div>

              {/* Right Column: 5 Categories Reconciliation Table */}
              <div className="inspector-table-scroller">
                <table className="matrix-table">
                  <thead>
                    <tr>
                      <th>Clinical Category</th>
                      <th>Interface Specification</th>
                      <th>Molds Opened</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="inspectorTableBody">
                    {activeBrand.categories.map((c) => (
                      <tr key={c.cat}>
                        <td>
                          <div className="cat-badge-cell">
                            <span className="cat-icon-bullet"></span>
                            <span>{c.cat}</span>
                          </div>
                        </td>
                        <td>{c.conn}</td>
                        <td><span className="mold-count-tag">{c.molds}</span></td>
                        <td>
                          <span className="status-badge-cleared">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                            <span>{c.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S3: CORE CLINICAL FORM & SPEC MATRIX */}
<section className="clinical-matrix-section" id="connector-matrix">
      <div className="container reveal-on-scroll">
        <div className="clinical-matrix-header">
          <div className="section-tag">Clinical Engineering Specifications</div>
          <h2 className="section-title">Core Clinical Form &amp; Spec Matrix</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Physical form factors, patient weight bands, conductor metallurgy, and regulatory clearances spanning Medke's 5 monitoring product categories.
          </p>
        </div>

        <div className="spec-tab-bar" role="tablist">
          <button type="button" id="tabBtn-spo2" className={`spec-tab-btn ${activeSpecTab === "spo2" ? "active" : ""}`} onClick={() => setActiveSpecTab("spo2")}>
            <span>SpO2 Sensors</span>
            <span className="spec-tab-badge">4 Weight Bands + 8 Forms</span>
          </button>
          <button type="button" id="tabBtn-ecg" className={`spec-tab-btn ${activeSpecTab === "ecg" ? "active" : ""}`} onClick={() => setActiveSpecTab("ecg")}>
            <span>ECG &amp; EKG Cables</span>
            <span className="spec-tab-badge">5 Terminations + 10k&Omega; Defib</span>
          </button>
          <button type="button" id="tabBtn-nibp" className={`spec-tab-btn ${activeSpecTab === "nibp" ? "active" : ""}`} onClick={() => setActiveSpecTab("nibp")}>
            <span>NIBP Cuffs &amp; Hoses</span>
            <span className="spec-tab-badge">Neonatal 1#-5# + K242623</span>
          </button>
          <button type="button" id="tabBtn-ibp" className={`spec-tab-btn ${activeSpecTab === "ibp" ? "active" : ""}`} onClick={() => setActiveSpecTab("ibp")}>
            <span>IBP Transducer Kits</span>
            <span className="spec-tab-badge">BB-101-105 + 5.0 &micro;V/V/mmHg</span>
          </button>
          <button type="button" id="tabBtn-temp" className={`spec-tab-btn ${activeSpecTab === "temp" ? "active" : ""}`} onClick={() => setActiveSpecTab("temp")}>
            <span>Temperature Probes</span>
            <span className="spec-tab-badge">&plusmn;0.1&deg;C + YSI 400/700</span>
          </button>
        </div>

        {/* 5 TABS CONTENT PRESERVED VERBATIM */}
        {/* TAB 1: SpO2 Sensors */}
        <div id="tabPane-spo2" className={`spec-tab-pane ${activeSpecTab === "spo2" ? "active" : ""}`}>
          <div className="spec-grid-layout">
            {/* Card 1: Disposable SpO2 Sensors */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <span>Disposable Sensors</span>
                </h3>
                <span className="spec-card-tag">Single-Patient Use</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Weight Bands &amp; Sites</span><span className="param-highlight">4 Classes</span></div>
                  <div className="param-value">Adult (&gt;40kg, index finger), Pediatric (10-50kg), Infant (3-20kg, great toe), Neonate (&lt;3kg, foot sole/palm).</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Adhesive Foam Substrate</span><span className="param-highlight">Closed-Cell PE</span></div>
                  <div className="param-value">Micro-porous hypoallergenic acrylic adhesive with total optical light barrier preventing phototherapy interference.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Velcro Sponge Wrap</span><span className="param-highlight">NICU Gentle</span></div>
                  <div className="param-value">Non-adhesive gentle polyurethane sponge with adjustable Velcro tab designed for fragile, skin-breakdown prone neonates.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Specialty Forehead Patch</span><span className="param-highlight">Low Perfusion</span></div>
                  <div className="param-value">Supraorbital artery site sensor delivering stable plethysmographic signals during severe peripheral vasoconstriction.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Disposable SpO2 Sensors", badge: "Direct Engineering Vault Dispatch" })}>Request Disposable SpO2 Catalog</button>
              </div>
            </div>

            {/* Card 2: Reusable SpO2 Sensors */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>Reusable Sensors</span>
                </h3>
                <span className="spec-card-tag">8 Clinical Forms</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>P9 &amp; P7 Hard Clips</span><span className="param-highlight">ABS Medical Shell</span></div>
                  <div className="param-value">P9 Adult Hard Clip and P7 Pediatric Hard Clip with calibrated stainless steel hinge springs and ergonomic finger grip pads.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>P8 &amp; P6 Soft Tips</span><span className="param-highlight">100% LSR Silicone</span></div>
                  <div className="param-value">P8 Adult and P6 Pediatric liquid silicone rubber boots with biocompatible non-latex contact and pressure-sore prevention.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>P5 &amp; P4 Flexible Forms</span><span className="param-highlight">Neonate / Y-Type</span></div>
                  <div className="param-value">P5 Neonate silicone wrap with locking strap; P4 Multi-site Y-sensor with convertible silicone tie / ear clip attachments.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>P3 Ear &amp; PA Veterinary</span><span className="param-highlight">Specialty Clamps</span></div>
                  <div className="param-value">P3 Adult high-sensitivity earlobe clip; PA Veterinary lingual/ear clip with dual spring tension for clinical animal care.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Reusable SpO2 Sensors (P3-P9)", badge: "Direct Engineering Vault Dispatch" })}>Request P-Series Specs Sheet</button>
              </div>
            </div>

            {/* Card 3: Adapter & Extension Cables */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span>Adapter Cables</span>
                </h3>
                <span className="spec-card-tag">Dual-Shielded TPU</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Cable Length Matrix</span><span className="param-highlight">1.0m / 2.4m / 3.0m</span></div>
                  <div className="param-value">Precision-engineered extension cords with low-attenuation tinned copper conductors and Kevlar tensile reinforcement.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Shielding Metallurgy</span><span className="param-highlight">&gt;98% Braided Coverage</span></div>
                  <div className="param-value">Double-layer foil plus tinned copper braided mesh shielding protecting high-gain photodiode currents from 50/60Hz noise.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Mechanical Reliability</span><span className="param-highlight">&gt;50,000 Flex Cycles</span></div>
                  <div className="param-value">Strain relief boots molded with medical Santoprene elastomer withstanding severe 90-degree oscillatory bending stress.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Connector Plating</span><span className="param-highlight">30&mu; Gold Plating</span></div>
                  <div className="param-value">Micro-polished gold-plated phosphor bronze terminal pins ensuring insertion life exceeding 5,000 mating cycles.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: SpO2 Adapter Cables", badge: "Direct Engineering Vault Dispatch" })}>Request SpO2 Extension Pricing</button>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 2: ECG & EKG Cables */}
        <div id="tabPane-ecg" className={`spec-tab-pane ${activeSpecTab === "ecg" ? "active" : ""}`}>
          <div className="spec-grid-layout">
            {/* Card 1: Patient End Terminations */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                  <span>Patient Terminations</span>
                </h3>
                <span className="spec-card-tag">5 Terminal Types</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>4.0mm Snap Socket</span><span className="param-highlight">Standard Stud</span></div>
                  <div className="param-value">High-retention beryllium copper spring mechanism ensuring solid snap engagement with all ANSI/AAMI disposable electrodes.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Grabber / Pinch Mechanism</span><span className="param-highlight">Surgical Claw</span></div>
                  <div className="param-value">Spring-loaded clamp jaw delivering constant 120g gripping force without slipping during intense patient mobilization.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Dual-Purpose Clamp</span><span className="param-highlight">Snap + Tab Hybrid</span></div>
                  <div className="param-value">Universal hybrid clamp head seamlessly accommodating both round snap studs and flat disposable electrode tabs.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Banana &amp; DIN 42802</span><span className="param-highlight">Gold Lantern Petals</span></div>
                  <div className="param-value">4.0mm Banana plug with resilient gold lantern springs (&lt;0.2&Omega; contact resistance) and 3.0mm DIN needle sockets per DIN 42802.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: ECG Patient End Terminations", badge: "Direct Engineering Vault Dispatch" })}>Request Termination Samples</button>
              </div>
            </div>

            {/* Card 2: Cable Systems & Defib Resistors */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                  </svg>
                  <span>Cable Systems</span>
                </h3>
                <span className="spec-card-tag">Defib Proof</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>One-Piece Direct Cables</span><span className="param-highlight">3 &amp; 5-Lead Molded</span></div>
                  <div className="param-value">Hermetically ultrasonic welded junction yolk blocks preventing chemical ingress during high-level disinfection wipe-downs.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Trunk &amp; Detachable Leads</span><span className="param-highlight">3/5/6/10/12-Lead</span></div>
                  <div className="param-value">Modular trunk architecture with low-insertion-force multi-pin yolk connectors for cost-effective single-lead replacement.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Defibrillation Resistors</span><span className="param-highlight">Built-in 10k&Omega;</span></div>
                  <div className="param-value">Precision 10k&Omega; current-limiting protection resistors integrated into leadwire hubs to protect patients from RF electrosurgical burns.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Diagnostic EKG &amp; Holter</span><span className="param-highlight">10-Lead Resting</span></div>
                  <div className="param-value">Diagnostic 10-lead cables for resting electrocardiographs and ultra-flexible lightweight leads for 24-48h Holter recorders.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: ECG Trunk and Leadwire Systems", badge: "Direct Engineering Vault Dispatch" })}>Request ECG Cable Catalog</button>
              </div>
            </div>

            {/* Card 3: Color Codes & Electrical Integrity */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                  </svg>
                  <span>Color &amp; Standards</span>
                </h3>
                <span className="spec-card-tag">AHA &amp; IEC Dual</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>AHA (AAMI) Standard</span><span className="param-highlight">US / Americas</span></div>
                  <div className="param-value">White (RA), Black (LA), Red (LL), Green (RL), Brown (V1-V6) with permanent laser-etched anatomical text marking.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>IEC Standard</span><span className="param-highlight">Europe / International</span></div>
                  <div className="param-value">Red (R), Yellow (L), Green (F), Black (N), White (C1-C6) ensuring zero cross-connection error in global ICU environments.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Noise Suppression Jacket</span><span className="param-highlight">Carbon-Coated</span></div>
                  <div className="param-value">Semi-conductive carbon layer surrounding core copper strands, eliminating triboelectric noise generated by patient movement.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Dielectric Voltage Withstand</span><span className="param-highlight">5,000V Dielectric</span></div>
                  <div className="param-value">High-voltage defibrillation withstand rating up to 5,000V DC per ANSI/AAMI EC53 without dielectric breakdown.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: AHA/IEC Dual Standard ECG", badge: "Direct Engineering Vault Dispatch" })}>Verify Standards Compliance</button>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 3: NIBP Cuffs & Hoses */}
        <div id="tabPane-nibp" className={`spec-tab-pane ${activeSpecTab === "nibp" ? "active" : ""}`}>
          <div className="spec-grid-layout">
            {/* Card 1: Disposable Neonatal Range */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Disposable Neonatal</span>
                </h3>
                <span className="spec-card-tag">Sizes 1# to 5#</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>5-Color Coding System</span><span className="param-highlight">3.0cm to 15.0cm</span></div>
                  <div className="param-value">1# (3.1-5.7cm, Orange), 2# (4.3-8.0cm, Teal), 3# (5.8-10.9cm, Green), 4# (7.1-13.1cm, Navy), 5# (8.5-15.0cm, White).</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Ultrasonic TPU Welding</span><span className="param-highlight">Seamless Edge</span></div>
                  <div className="param-value">Medical pure TPU bladder ultrasonically fused with soft non-woven fabric. 100% Latex-free and DEHP-free biocompatibility.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Index &amp; Range Markers</span><span className="param-highlight">Fail-Safe Guide</span></div>
                  <div className="param-value">High-contrast arterial line and arm circumference range markings ensuring accurate oscillometric pulse detection.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Lumen Configurations</span><span className="param-highlight">Single &amp; Dual Tube</span></div>
                  <div className="param-value">Available in both single-lumen micro luer and dual-lumen barb connectors for compatibility with neonatal bedside monitors.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Neonatal NIBP Cuffs (1#-5#)", badge: "Direct Engineering Vault Dispatch" })}>Request Neonatal Cuff Samples</button>
              </div>
            </div>

            {/* Card 2: Reusable Clinical Cuffs */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  <span>Reusable Cuffs</span>
                </h3>
                <span className="spec-card-tag">Infant to Thigh 66cm</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>C6 Bladderless Series</span><span className="param-highlight">Antimicrobial PU</span></div>
                  <div className="param-value">Integrated one-piece coated polyurethane cuff with no internal bladder. Fully submersible in bleach and quaternary ammonium.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>C1/C2 Nylon Series</span><span className="param-highlight">Removable Bladder</span></div>
                  <div className="param-value">High-denier abrasion-resistant woven nylon outer casing with durable pull-out TPU internal air chamber.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Burst Pressure Rating</span><span className="param-highlight">&ge;600 mmHg</span></div>
                  <div className="param-value">Ultrasonic welded perimeter seams withstand over 600 mmHg inflation pressure without rupture (exceeds ISO 81060-1).</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Velcro Fatigue Life</span><span className="param-highlight">&gt;10,000 Cycles</span></div>
                  <div className="param-value">Industrial-grade hook-and-loop fastening system maintaining &gt;85% retention strength after 10,000 repeated cycles.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Reusable NIBP Cuffs (C1-C6)", badge: "Direct Engineering Vault Dispatch" })}>Request Reusable Cuff Catalog</button>
              </div>
            </div>

            {/* Card 3: Pneumatic Connectors & Hoses */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Connectors &amp; Hoses</span>
                </h3>
                <span className="spec-card-tag">FDA K242623</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Pneumatic Quick Couplers</span><span className="param-highlight">30+ Molds</span></div>
                  <div className="param-value">Precision brass nickel-plated and medical POM couplers compatible with Philips snap, GE screw-lock, Mindray push, Colin.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Zero-Leakage Sealing</span><span className="param-highlight">&lt;1 mmHg / min</span></div>
                  <div className="param-value">Automated pressure-decay decay testing ensures leak rate &lt;1.0 mmHg over 5 minutes under 300 mmHg static pressure.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Reinforced TPU Hoses</span><span className="param-highlight">Kink-Resistant</span></div>
                  <div className="param-value">1.5m, 2.5m, and 3.0m heavy-wall medical polyurethane hoses resisting compression and pulse signal dampening.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>FDA 510(k) Clearance</span><span className="param-highlight">K242623 Approved</span></div>
                  <div className="param-value">Officially cleared under FDA 510(k) K242623 for adult, pediatric, and neonatal hospital blood pressure measurement.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: NIBP Couplers & Air Hoses", badge: "Direct Engineering Vault Dispatch" })}>Download 510(k) Clearance Doc</button>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 4: IBP Transducer Kits */}
        <div id="tabPane-ibp" className={`spec-tab-pane ${activeSpecTab === "ibp" ? "active" : ""}`}>
          <div className="spec-grid-layout">
            {/* Card 1: Disposable Transducer Units */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>Disposable Transducers</span>
                </h3>
                <span className="spec-card-tag">BB-101 to BB-105</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Platform Line Compatibility</span><span className="param-highlight">5 Industry Standards</span></div>
                  <div className="param-value">BB-101 (Abbott/Medex), BB-102 (Edwards Lifesciences), BB-103 (Philips/B.Braun), BB-104 (BD), BB-105 (Utah Medical).</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Silicon Piezoresistive Chip</span><span className="param-highlight">5.0 &micro;V/V/mmHg &plusmn;1%</span></div>
                  <div className="param-value">Solid-state micro-machined piezoresistive silicon bridge delivering ultra-linear physiological pressure conversion.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Measurement Range</span><span className="param-highlight">-50 to +300 mmHg</span></div>
                  <div className="param-value">Broad dynamic pressure range (-6.6 to +40 kPa) supporting arterial (ART), central venous (CVP), and pulmonary wedge (PAWP).</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Sterile Presentation</span><span className="param-highlight">EO Sterile Pack</span></div>
                  <div className="param-value">Individually packaged in medical Tyvek peel pouches, Ethylene Oxide (EO) sterilized with 3-year verified shelf life.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: IBP Transducers (BB-101-105)", badge: "Direct Engineering Vault Dispatch" })}>Request BB-Series Cross Ref</button>
              </div>
            </div>

            {/* Card 2: Dual Flush Architecture */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                  </svg>
                  <span>Dual Flush Architecture</span>
                </h3>
                <span className="spec-card-tag">3 ml/h Continuous</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Continuous Micro-Flush</span><span className="param-highlight">3.0 &plusmn; 1 ml/h</span></div>
                  <div className="param-value">Precision ceramic flow restrictor maintaining continuous 3ml/h heparinized saline infusion to prevent catheter lumen occlusion.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Fast Flush Valve</span><span className="param-highlight">High Flow Rapid</span></div>
                  <div className="param-value">Ergonomic pull/squeeze silicone flush valve enabling instantaneous fast flushing and dynamic square-wave response verification.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Fluid Channel Transparency</span><span className="param-highlight">Optical Clear PC</span></div>
                  <div className="param-value">Crystal-clear medical polycarbonate housing with zero dead-space geometry ensuring rapid, bubble-free priming.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Stopcocks &amp; Tubing</span><span className="param-highlight">Non-Compliant</span></div>
                  <div className="param-value">Includes color-coded 3-way stopcocks and high-durometer non-compliant pressure monitoring lines preventing pulse wave damping.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: IBP Dual Flush Valve System", badge: "Direct Engineering Vault Dispatch" })}>Request Valve Technical Drawing</button>
              </div>
            </div>

            {/* Card 3: Interface Cables & ESU Rejection */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <span>Interface Cables</span>
                </h3>
                <span className="spec-card-tag">40+ Host Pinouts</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Monitor Host Direct Plugs</span><span className="param-highlight">40+ Monitor Models</span></div>
                  <div className="param-value">Compatible interface cables for Philips 12-pin, GE 11-pin, Mindray 12-pin, Dräger 7-pin, Nihon Kohden 14-pin, Spacelabs.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>ESU Noise Rejection</span><span className="param-highlight">Double Metal Braid</span></div>
                  <div className="param-value">High-coverage tinned copper double braid effectively shielding sensitive 5&mu;V signals against electrosurgical cutting noise.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Zero Drift Baseline</span><span className="param-highlight">&lt;1 mmHg / 8h</span></div>
                  <div className="param-value">Ultra-stable thermal compensation circuitry maintaining baseline pressure drift &lt;1.0 mmHg throughout 24-hour ICU monitoring.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Cable Jacket Durability</span><span className="param-highlight">Medical Polyurethane</span></div>
                  <div className="param-value">Highly flexible, halogen-free medical TPU jacket resistant to alcohol, betadine, and enzymatic disinfectant detergents.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: IBP Monitor Interface Cables", badge: "Direct Engineering Vault Dispatch" })}>Request IBP Host Compatibility Map</button>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 5: Temperature Probes */}
        <div id="tabPane-temp" className={`spec-tab-pane ${activeSpecTab === "temp" ? "active" : ""}`}>
          <div className="spec-grid-layout">
            {/* Card 1: Reusable Probes */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                  </svg>
                  <span>Reusable Probes</span>
                </h3>
                <span className="spec-card-tag">IPX7 Immersion Proof</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Skin Surface Probe</span><span className="param-highlight">&phi;9.8mm Flat Disc</span></div>
                  <div className="param-value">Mirror-polished medical 316L stainless steel flat disc delivering high thermal conductivity and rapid response time (&tau; &le; 2.5s).</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Body Cavity Probe</span><span className="param-highlight">&phi;4.0mm / &phi;3.0mm</span></div>
                  <div className="param-value">Seamless rounded bullet tip in Adult (&phi;4.0mm) and Pediatric (&phi;3.0mm) calibers for non-traumatic esophageal and rectal monitoring.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>IPX7 Waterproof Sealing</span><span className="param-highlight">Liquid Disinfectable</span></div>
                  <div className="param-value">Hermetically epoxy-encapsulated sensor head fully compliant with IPX7 immersion requirements for glutaraldehyde soaking.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Strain Relief Construction</span><span className="param-highlight">&gt;1,000 Wipe Cycles</span></div>
                  <div className="param-value">Reinforced flex boots molded with medical Santoprene elastomer preventing core wire fracture at the sensor transition point.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Reusable Temperature Probes", badge: "Direct Engineering Vault Dispatch" })}>Request Reusable Probe Specs</button>
              </div>
            </div>

            {/* Card 2: Disposable Probes */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                  </svg>
                  <span>Disposable Probes</span>
                </h3>
                <span className="spec-card-tag">Single-Patient Clinical</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>Skin Radiant Heat Patch</span><span className="param-highlight">Reflective Aluminum</span></div>
                  <div className="param-value">Mylar-backed reflective aluminum foil foam patch reflecting ambient operating room lighting and radiant warmer heat.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Depth-Marked Cavity Probe</span><span className="param-highlight">Graduated Markings</span></div>
                  <div className="param-value">Clear centimeter graduations (5cm to 30cm) along the medical PVC sheath for precise anatomical depth placement.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Esophageal Stethoscope</span><span className="param-highlight">Audio + Temperature</span></div>
                  <div className="param-value">Combined acoustic diaphragm and core temperature thermistor enabling continuous cardiopulmonary auscultation during surgery.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Foley Catheter Integration</span><span className="param-highlight">Bladder Temperature</span></div>
                  <div className="param-value">Temperature-sensing Foley catheter adapters providing continuous urinary bladder core body temperature monitoring in the ICU.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Disposable Temperature Probes", badge: "Direct Engineering Vault Dispatch" })}>Request Disposable Probe Catalog</button>
              </div>
            </div>

            {/* Card 3: Standards & Precision */}
            <div className="spec-card">
              <div className="spec-card-top">
                <h3 className="spec-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047FF" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Standards &amp; Clearances</span>
                </h3>
                <span className="spec-card-tag">FDA K243000</span>
              </div>
              <ul className="spec-param-list">
                <li className="spec-param-item">
                  <div className="param-name"><span>YSI 400 &amp; 700 Dual Standard</span><span className="param-highlight">2252&Omega; &amp; Dual NTC</span></div>
                  <div className="param-value">Compatible with YSI 400 series (2252&Omega; at 25&deg;C) and YSI 700 series dual thermistor bridge monitors.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Clinical Accuracy</span><span className="param-highlight">&plusmn;0.1&deg;C (25&deg;C-45&deg;C)</span></div>
                  <div className="param-value">Calibrated precision conforming strictly to ISO 80601-2-56 across the critical physiological range 25.0&deg;C to 45.0&deg;C.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>FDA 510(k) Clearance</span><span className="param-highlight">K243000 Approved</span></div>
                  <div className="param-value">Officially cleared under FDA 510(k) K243000 for continuous human temperature monitoring in operating rooms and ICUs.</div>
                </li>
                <li className="spec-param-item">
                  <div className="param-name"><span>Biocompatibility Testing</span><span className="param-highlight">ISO 10993 Passed</span></div>
                  <div className="param-value">Passed rigorous ISO 10993 cytotoxicity, intracutaneous irritation, and delayed-type hypersensitivity safety certifications.</div>
                </li>
              </ul>
              <div className="spec-action-box">
                <button type="button" className="btn-spec-action" onClick={() => openLeadModal({ title: "Clinical Specification Request: Temperature Probe Clearances", badge: "Direct Engineering Vault Dispatch" })}>Download FDA K243000 Summary</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ===================================================================
         S4: BIOMEDICAL PROTOCOL & LEAD MAGNET
         =================================================================== */}
    

      {/* S4: BIOMEDICAL SELECTION GUIDE & LEAD MAGNET */}
<section className="guide-lead-section" id="lead-guide">
      <div className="container reveal-on-scroll">
        <div className="guide-grid">
          <div className="steps-card">
            <div>
              <div className="section-tag">Quality Protocol</div>
              <h2 className="section-title" style={{ fontSize: '24px', lineHeight: '32px' }}>3-Step Biomedical Engineering Protocol</h2>
              <p className="section-subtitle" style={{ fontSize: '14px', lineHeight: '20px' }}>How hospital clinical engineers verify replacement cable compatibility before procurement or trial deployment.</p>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-num-bubble">1</div>
                  <div>
                    <h3 className="step-content-title">Inspect Physical Port &amp; Host Model Plate</h3>
                    <p className="step-content-desc">Locate the monitor front-end module or side-panel jack label. Note connector outer diameter and internal polarizing ridge orientation.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-num-bubble">2</div>
                  <div>
                    <h3 className="step-content-title">Verify Anti-Mismatch Keyway Notch &amp; Pin Count</h3>
                    <p className="step-content-desc">Match pin geometry against Medke engineering CAD drawings. Our molds feature proprietary keyway notches ensuring zero socket forcing.</p>
                  </div>
                </div>
                <div className="step-item">
                  <div className="step-num-bubble">3</div>
                  <div>
                    <h3 className="step-content-title">Request Pre-Production Sample or Pinout Dossier</h3>
                    <p className="step-content-desc">Evaluate functional samples with 100% factory dielectric inspection reports and ISO 10993 biological safety certificates.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>Hotline: contact@medke.com</span>
              <a href="#custom-desk" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--medke-blue)', textDecoration: 'none' }}>Inquire Technical Support &rarr;</a>
            </div>
          </div>

          <div className="lead-magnet-card">
            <div>
              <div className="lead-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                <span>Engineering Authority Resource · 2026 Edition</span>
              </div>
              <h2 className="lead-title">Medke Master Cross-Reference Handbook (472+ Models)</h2>
              <p className="lead-desc">
                Instant access to our comprehensive engineering matrix containing exact OEM part numbers, pinout wiring diagrams, mold tolerances, and distributor pricing brackets.
              </p>
              <div className="lead-perks-list">
                <div className="lead-perk-item">
                  <svg className="lead-perk-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Complete lookup index for Philips, GE, Mindray, Dräger, Masimo &amp; Nihon Kohden</span>
                </div>
                <div className="lead-perk-item">
                  <svg className="lead-perk-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>High-resolution vector pinout diagrams with internal resistor &amp; shield layouts</span>
                </div>
                <div className="lead-perk-item">
                  <svg className="lead-perk-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Tiered factory direct pricing schedules for hospital contractors and distributors</span>
                </div>
              </div>
            </div>
            <div>
              <button type="button" className="btn-open-lead-modal" id="btnOpenLeadModal" onClick={() => openLeadModal({ title: "Download 2026 Master Cross-Reference Guide (PDF)", badge: "472+ Pinout Index · 20.8 MB" })}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                <span>Download Master Guide (PDF / Excel · 4.8MB)</span>
              </button>
              <div style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                Direct download link released immediately after work email verification.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ===================================================================
         S5: ZERO SIGNAL DRIFT & IP DISCLAIMER
         =================================================================== */}
    

      {/* S5: ZERO SIGNAL DRIFT & COMPLIANCE / IP DISCLAIMER */}
<section className="compliance-section" id="compliance-ip">
      <div className="container reveal-on-scroll">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-400)' }}>
          <div className="section-tag">Engineering Assurance</div>
          <h2 className="section-title">Zero Signal Drift &amp; Mechanical Integrity Guarantee</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Engineered to deliver electrical parameter parity with original factory cables while safeguarding clinical monitor receptacles.
          </p>
        </div>
        <div className="compliance-grid">
          <div className="compliance-card">
            <div className="compliance-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3 className="compliance-card-title">Zero Signal Drift Parity</h3>
            <p className="compliance-card-desc">Impedance-matched coaxial cores eliminate waveform attenuation, baseline wander, and electrosurgical unit (ESU) radiofrequency artifacts.</p>
          </div>
          <div className="compliance-card">
            <div className="compliance-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6v6H9z"/></svg>
            </div>
            <h3 className="compliance-card-title">&plusmn;0.02mm Pin Mating Tolerance</h3>
            <p className="compliance-card-desc">Precision beryllium copper and phosphor bronze contact pins prevent mechanical socket stretching and gold-finger abrasion.</p>
          </div>
          <div className="compliance-card">
            <div className="compliance-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="compliance-card-title">ISO 10993 Biocompatibility</h3>
            <p className="compliance-card-desc">Medical-grade thermoplastic elastomer (TPE) and TPU jackets certified for cytotoxicity, sensitization, and clinical disinfectant wipes.</p>
          </div>
          <div className="compliance-card">
            <div className="compliance-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3 className="compliance-card-title">1,500V Dielectric Tested</h3>
            <p className="compliance-card-desc">100% high-voltage dielectric insulation tested before packaging, guarding patients and monitors against electrical discharge.</p>
          </div>
        </div>
        <div className="ip-disclaimer-box">
          <svg className="disclaimer-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <div className="disclaimer-text">
            <strong>Intellectual Property &amp; Compatibility Notice:</strong> All OEM product names, model designations, connector identifiers, and trademarks (including Philips, GE Healthcare, Mindray, Dräger, Spacelabs, Welch Allyn, Masimo, Nellcor, Nihon Kohden, Edwards Lifesciences, etc.) displayed on this page remain the proprietary property of their respective manufacturers. Medke products are aftermarket compatible medical accessories independently engineered to match or exceed OEM physical and electrical specifications; they are not manufactured by or affiliated with original equipment manufacturers.
          </div>
        </div>
      </div>
    </section>

    {/* ===================================================================
         S6: OBSCURE / RETIRED MODEL CUSTOM ENGINEERING DESK
         =================================================================== */}
    

      {/* S6: CUSTOM ENGINEERING DESK FOR OBSCURE / RETIRED MONITORS */}
<section className="custom-desk-section" id="custom-desk">
      <div className="container reveal-on-scroll">
        <div className="custom-desk-card">
          <div>
            <div className="section-tag" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#93C5FD', borderColor: 'rgba(255, 255, 255, 0.2)', marginBottom: '12px' }}>
              Legacy Equipment Support
            </div>
            <h2 className="desk-info-title">Working with an unlisted or obsolete monitor port?</h2>
            <p className="desk-info-desc">
              Our mold development laboratory houses over 1,500 historical connector dies dating back to 2008. If your clinical device is out of production or unlisted above, send us a photograph of the connector port for immediate engineering cross-match within 2.4 hours.
            </p>
            <div className="desk-meta-pills">
              <div className="desk-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>3D Reverse Pinout Analysis</span>
              </div>
              <div className="desk-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>7-14 Day Rapid Prototype Tooling</span>
              </div>
              <div className="desk-meta-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>100-Unit Low-Volume Batch</span>
              </div>
            </div>
          </div>
          <div className="desk-action-box">
            <h3 className="desk-action-heading">Direct Engineering Verification</h3>
            <p className="desk-action-sub">Snap a clear photo of the side-panel port or existing damaged cable connector:</p>
            <a href="https://wa.me/8615302654212?text=Hello%20Medke%20Engineering%2C%20I%20have%20a%20monitor%20port%20photo%20to%20verify%20compatibility." target="_blank" rel="noopener noreferrer" className="btn-desk-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.178 1.564 5.923l-1.664 6.077 6.241-1.637c1.7 1.01 3.684 1.597 5.859 1.597 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
              <span>WhatsApp Photo to Engineer (+86 153 0265 4212)</span>
            </a>
            <a href="mailto:contact@medke.com?subject=Compatibility%20Verification%20Request%20-%20Medke" className="btn-desk-email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>Email Blueprint to contact@medke.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  

      {/* Global Toast */}
      <div id="globalToast" className={`toast-notice ${toastActive ? 'active' : ''}`}>
        <div className="toast-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        </div>
        <div className="toast-body">
          <div className="toast-title">Compatibility Vault Status</div>
          <div className="toast-desc" id="toastMessage">{toastMessage}</div>
        </div>
      </div>

      {/* Production LeadBrochureModal Integration */}
      <LeadBrochureModal
        isOpen={modalConfig.isOpen}
        onClose={closeLeadModal}
        title={modalConfig.title}
        subtitle={modalConfig.subtitle}
        badge={modalConfig.badge}
        pdfUrl="/docs/Medke-Company-Profile.pdf"
        downloadFilename="Medke_2026_Medical_Cable_Catalog.pdf"
        assetName="Medke Master Cross-Reference Guide (PDF)"
        fileSize="8.04 MB"
      />
    </div>
  );
}
