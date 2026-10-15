import React, { useState } from 'react';
import { aedLandingData } from '../data/landing/aed-data';
import AedHero from '../components/landing/AedHero';
import AedBrandMarquee from '../components/landing/AedBrandMarquee';
import CompatibilityMatrix from '../components/landing/CompatibilityMatrix';
import AedProductSection from '../components/landing/AedProductSection';
import TrustAuthorityProof from '../components/landing/TrustAuthorityProof';
import InlineInquiryForm from '../components/landing/InlineInquiryForm';
import LandingFaqSection from '../components/landing/LandingFaqSection';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import CertificateModal from '../components/landing/CertificateModal';

export default function AedLandingPage() {
  const [selectedModel, setSelectedModel] = useState('');
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      const el = document.getElementById('inquiry-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const card = document.getElementById('form-card-container');
        if (card) {
          card.classList.add('ring-4', 'ring-blue-500', 'transition-all');
          setTimeout(() => card.classList.remove('ring-4', 'ring-blue-500'), 1500);
        }
      }
    }
  };

  const handleSelectModel = (modelText) => {
    setSelectedModel(modelText);
    scrollToForm();
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0">
      {/* 1. Hero Section with Trust Pills, Copy, Checklist, CTAs, and SVG Dual-Pad Illustration */}
      <AedHero
        data={aedLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onPrefillModel={handleSelectModel}
      />

      {/* 2. Uncropped Machine + Logo Infinite CSS Marquee Strip */}
      <AedBrandMarquee
        brands={aedLandingData.brands}
        guarantee={aedLandingData.brandGuarantee}
      />

      {/* 3. Interactive Multi-Brand Compatibility Matrix with 1-Click Prefill */}
      <CompatibilityMatrix
        data={aedLandingData.compatibility}
        onSelectModel={handleSelectModel}
        categoryType="AED"
      />

      {/* 4. Core Adult & Pediatric Lines + Embedded Kingsway Official Showcase Player */}
      <AedProductSection
        onPrefillModel={handleSelectModel}
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      {/* 5. Trust & Authority: ISO 13485, EU MDR Class I DoC, EN 60601-2-4, and 4,000 sqm Facility */}
      <TrustAuthorityProof
        data={aedLandingData.trustProof}
        onOpenCert={(cert) => setActiveCert(cert)}
      />

      {/* 6. High-Converting Inline Inquiry Form (4+1 Fields, GTM Telemetry, Email to contact@medke.com) */}
      <InlineInquiryForm
        pageCategory="AED"
        selectedModel={selectedModel}
        onResetSelectedModel={() => setSelectedModel('')}
      />

      {/* 7. Procurement FAQ Section */}
      <LandingFaqSection items={aedLandingData.faqs} />

      {/* 8. Mobile Sticky Conversion Bar */}
      <MobileStickyBar onScrollToForm={scrollToForm} />

      {/* 9. 20.8 MB Medke Brochure Download Modal (Native Browser Direct-Download) */}
      <LeadBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />

      {/* 10. Audit Certificate Dossier Modal */}
      <CertificateModal
        certificate={activeCert}
        isOpen={!!activeCert}
        onClose={() => setActiveCert(null)}
      />
    </div>
  );
}
