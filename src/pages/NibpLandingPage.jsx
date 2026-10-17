import React, { useState } from 'react';
import { nibpLandingData } from '../data/landing/nibp-data';
import NibpHero from '../components/landing/NibpHero';
import NibpCircumferenceHub from '../components/landing/NibpCircumferenceHub';
import NibpProductSection from '../components/landing/NibpProductSection';
import NibpConnectorHub from '../components/landing/NibpConnectorHub';
import TrustAuthorityProof from '../components/landing/TrustAuthorityProof';
import NibpInquiryForm from '../components/landing/NibpInquiryForm';
import LandingFaqSection from '../components/landing/LandingFaqSection';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import CertificateModal from '../components/landing/CertificateModal';

export default function NibpLandingPage() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [prefillBrand, setPrefillBrand] = useState('');
  const [prefillCode, setPrefillCode] = useState('');
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-[#0047FF]', 'transition-all');
          setTimeout(() => card.classList.remove('ring-4', 'ring-[#0047FF]'), 1500);
        }
      }
    }
  };

  const handleSelectProduct = (productName) => {
    setSelectedProduct(productName);
    scrollToForm();
  };

  const handlePrefillCode = (code, title) => {
    setPrefillCode(code);
    if (title && title.includes('NICU')) {
      setSelectedProduct('Disposable Series (Neonate/Animal/Standard)');
      setPrefillBrand('Universal NICU Miniature Luer');
    } else {
      setSelectedProduct('Reusable PU Bladderless Cuffs (C6)');
    }
    scrollToForm();
  };

  const handlePrefillSize = (productCategory, title) => {
    setSelectedProduct(productCategory);
    setPrefillCode(title);
    scrollToForm();
  };

  const handlePrefillConnector = (connectorName, brandMatch) => {
    setSelectedProduct('Quick-Fit Air Connectors (30+ Models)');
    setPrefillCode(connectorName);
    if (brandMatch) {
      setPrefillBrand(brandMatch);
    }
    scrollToForm();
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0">
      {/* 1. Hero Section with Medical CAD Vector Schematic, Metrics Badges, Trust Pills & Dual CTAs */}
      <NibpHero
        data={nibpLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onPrefillModel={(modelText) => {
          setSelectedProduct(modelText);
          scrollToForm();
        }}
      />

      {/* 2. Interactive Limb Circumference & Order Code Matrix (3cm ~ 66cm) with 7-Tier Rail & Collapsible Specialty Drawer */}
      <NibpCircumferenceHub
        tierData={nibpLandingData.tierData}
        onPrefillCode={handlePrefillCode}
        onPrefillSize={handlePrefillSize}
      />

      {/* 3. 4 Core NIBP Clinical Product Families with Modern High-Contrast Medical Grade Navigation Tabs */}
      <NibpProductSection
        families={nibpLandingData.productFamilies}
        onSelectProduct={handleSelectProduct}
      />

      {/* 4. Universal Pneumatic Connector Cross-Reference Hub (30+ Models) with OEM Brand Filters */}
      <NibpConnectorHub
        connectorMatrix={nibpLandingData.connectorMatrix}
        brandTabs={nibpLandingData.brandTabs}
        onPrefillConnector={handlePrefillConnector}
      />

      {/* 5. Trust & Authority: FDA 510(k) K242623, EU MDR Class I, TÜV SÜD ISO 13485 & 4,000 sqm Cleanroom Facility */}
      <TrustAuthorityProof
        data={nibpLandingData.trustProof}
        onOpenCert={(cert) => setActiveCert(cert)}
      />

      {/* 6. High-Converting Inline RFQ Portal (8 Product Checkboxes, Monitor Brand Select, Side-by-Side WhatsApp) */}
      <NibpInquiryForm
        selectedProduct={selectedProduct}
        prefillBrand={prefillBrand}
        prefillCode={prefillCode}
        onResetSelected={() => {
          setSelectedProduct('');
          setPrefillBrand('');
          setPrefillCode('');
        }}
      />

      {/* 7. Clinical & B2B Procurement FAQ Section */}
      <LandingFaqSection items={nibpLandingData.faqs} />

      {/* 8. Mobile Sticky Conversion Bar (<768px) */}
      <MobileStickyBar onScrollToForm={scrollToForm} />

      {/* 9. 20.8 MB Official Product Brochure Download Modal (Native Browser Download + GTM Secondary Lead) */}
      <LeadBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />

      {/* 10. Audit Certificate Dossier Verification Modal */}
      <CertificateModal
        certificate={activeCert}
        isOpen={!!activeCert}
        onClose={() => setActiveCert(null)}
      />
    </div>
  );
}
