import React, { useState } from 'react';
import { ecgLandingData } from '../data/landing/ecg-data';
import LandingHero from '../components/landing/LandingHero';
import BrandMarqueeStrip from '../components/landing/BrandMarqueeStrip';
import CompatibilityMatrix from '../components/landing/CompatibilityMatrix';
import ProductCategoryGrid from '../components/landing/ProductCategoryGrid';
import TrustAuthorityProof from '../components/landing/TrustAuthorityProof';
import InlineInquiryForm from '../components/landing/InlineInquiryForm';
import LandingFaqSection from '../components/landing/LandingFaqSection';
import MobileStickyBar from '../components/landing/MobileStickyBar';
import LeadBrochureModal from '../components/landing/LeadBrochureModal';
import CertificateModal from '../components/landing/CertificateModal';

export default function EcgLandingPage() {
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

  const handleSelectCategory = (catTitle) => {
    setSelectedModel(`${catTitle} (Bulk Wholesale / OEM Inquiry)`);
    scrollToForm();
  };

  return (
    <div className="bg-[#F8FAFC] text-slate-900 antialiased font-sans pb-16 md:pb-0">
      <LandingHero
        data={ecgLandingData}
        onOpenBrochure={() => setIsBrochureOpen(true)}
        onPrefillModel={handleSelectModel}
      />

      <CompatibilityMatrix
        data={ecgLandingData.compatibility}
        onSelectModel={handleSelectModel}
        categoryType="ECG"
      />

      <ProductCategoryGrid
        categories={ecgLandingData.categories}
        onSelectCategory={handleSelectCategory}
        categoryType="ECG"
      />

      <TrustAuthorityProof
        data={ecgLandingData.trustProof}
        onOpenCert={(cert) => setActiveCert(cert)}
      />

      <InlineInquiryForm
        pageCategory="ECG"
        selectedModel={selectedModel}
        onResetSelectedModel={() => setSelectedModel('')}
      />

      <LandingFaqSection items={ecgLandingData.faqs} />

      <MobileStickyBar onScrollToForm={scrollToForm} />

      <LeadBrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />

      <CertificateModal
        certificate={activeCert}
        isOpen={!!activeCert}
        onClose={() => setActiveCert(null)}
      />
    </div>
  );
}
