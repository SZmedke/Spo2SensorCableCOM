import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BrandsPage from './pages/BrandsPage';
import BrandDetailPage from './pages/BrandDetailPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ApplicationDetailPage from './pages/ApplicationDetailPage';
import AboutPage from './pages/AboutPage';
import OemPage from './pages/OemPage';
import BlogPage from './pages/BlogPage';
import TeamPage from './pages/TeamPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import InquirySuccessPage from './pages/InquirySuccessPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function NotFound() {
  return (
    <div className="section container-site">
      <h1 className="h-1">Page not found</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        <Link to="/" className="category-link">Back to homepage</Link>
      </p>
    </div>
  );
}

/* Pretty application URLs → ApplicationDetailPage (catalog slugs). */
const APPLICATION_LINE_ROUTES = [
  { path: '/icu', slug: 'patient-monitoring' },
  { path: '/or', slug: 'operating-room' },
  { path: '/emergency', slug: 'emergency-transport' },
  { path: '/ward', slug: 'obstetrics-gynecology' },
];

/* Pretty product-line URLs → CategoryPage (resolves the slug natively). */
const PRODUCT_LINE_PATHS = ['/spo2', '/ecg', '/nibp', '/ibp', '/temperature', '/esu', '/aed', '/eeg'];

/* Re-exported so the prerender + sitemap scripts stay in sync with the routes. */
export { APPLICATION_LINE_ROUTES, PRODUCT_LINE_PATHS };

/* Router-agnostic tree. The browser wraps it in BrowserRouter (entry-client);
   the prerender script wraps it in StaticRouter (entry-server). */
export function AppShell() {
  return (
    <>
      <ScrollToTop />
      <div className="app-shell">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-category/:slug" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/brands/:brandSlug" element={<BrandDetailPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/:slug" element={<ApplicationDetailPage />} />
            {APPLICATION_LINE_ROUTES.map((r) => (
              <Route key={r.path} path={r.path} element={<ApplicationDetailPage slug={r.slug} />} />
            ))}
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/about" element={<Navigate to="/about-us" replace />} />
            <Route path="/oem-solution" element={<OemPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/resources" element={<Navigate to="/blog" replace />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/inquiry/success" element={<InquirySuccessPage />} />
            {PRODUCT_LINE_PATHS.map((p) => (
              <Route key={p} path={p} element={<CategoryPage slug={p.slice(1)} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
      {/* Auto-tracks page views, including React Router pushState navigation.
          No-ops during prerender: inject() bails out when there is no window. */}
      <Analytics />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
