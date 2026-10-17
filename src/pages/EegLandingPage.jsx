import React, { useState } from 'react';
import { eegLandingData } from '../data/landing/eeg-data';
import EegHero from '../components/landing/EegHero';
import EegCompatibilityMatrix from '../components/landing/EegCompatibilityMatrix';
import EegProductSection from '../components/landing/EegProductSection';
import EegRealGalleryMarquee from '../components/landing/EegRealGalleryMarquee';
import TrustAuthorityProof from '../components/landing/TrustAuthorityProof';
import EegInquiryForm from '../components/landing/EegInquiryForm';
import LandingFaqSection from '../components/landing/LandingFaqSection';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import CertificateModal from '../components/landing/CertificateModal';

export default function EegLandingPage() {
  const [selectedModel, setSelectedModel] = useState('');
  const [prefillBrand, setPrefillBrand] = useState('');
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

  const handleSelectModel = (modelText, brandText = '') => {
    setSelectedModel(modelText);
    if (brandText) {
      setPrefillBrand(brandText);
    }
    scrollToForm();
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0">
      {/* 1. Hero Section with Medical SVG Vector Schematic, Callouts, Trust Pills & CTAs */}
      <EegHero
        data={eegLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onPrefillModel={handleSelectModel}
      />

      {/* 2. Interactive Multi-Brand Headbox Compatibility Matrix (100% English, Zero Search Box) */}
      <EegCompatibilityMatrix
        data={eegLandingData.compatibility}
        onSelectModel={handleSelectModel}
      />

      {/* 3. Balanced 3x2 Physical Line Grid (6 Standardized Cards) */}
      <EegProductSection
        onPrefillModel={handleSelectModel}
      />

      {/* 4. Real Production Photo Gallery (10 Verified Cleanroom Studio Assets Infinite Marquee) */}
      <EegRealGalleryMarquee
        onPrefillModel={handleSelectModel}
      />

      {/* 5. Trust & Authority: ISO 13485:2016, EU MDR Class I, FDA QSR, IEC 60601-2-26 & 4,000 sqm Facility */}
      <TrustAuthorityProof
        data={eegLandingData.trustProof}
        onOpenCert={(cert) => setActiveCert(cert)}
      />

      {/* 6. High-Converting Inline RFQ Portal (8 Product Checkboxes, Headbox Select, Side-by-Side WhatsApp) */}
      <EegInquiryForm
        selectedModel={selectedModel}
        prefillBrand={prefillBrand}
        onResetSelectedModel={() => {
          setSelectedModel('');
          setPrefillBrand('');
        }}
      />

      {/* 7. Clinical & B2B Procurement FAQ Section */}
      <LandingFaqSection items={eegLandingData.faqs} />

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
