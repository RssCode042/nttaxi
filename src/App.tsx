/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import SpecificServices from './components/SpecificServices';
import HowToOrder from './components/HowToOrder';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider, useAppContext } from './context/AppContext';
import Editor from './pages/Editor';
import AppPage from './pages/AppPage';
import ServicesSummary from './pages/services/ServicesSummary';
import TaxiService from './pages/services/TaxiService';
import CorporateService from './pages/services/CorporateService';
import TransferService from './pages/services/TransferService';
import DrinkDriveService from './pages/services/DrinkDriveService';
import About from './pages/About';
import Contacts from './pages/Contacts';
import { Helmet } from 'react-helmet-async';
import { trackVisit } from './lib/firebase';

// Common layout wrapper for sub-pages
const SubPageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
    <ScrollToTop />
  </>
);

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { seo, links } = useAppContext();
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] font-sans selection:bg-[#F6C000] selection:text-blue-700 dark:selection:text-blue-600 transition-colors duration-300">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        {links?.facebook && <meta property="article:publisher" content={links.facebook} />}
        <link rel="canonical" href="https://6106.bg" />
      </Helmet>
      {children}
    </div>
  );
}

function MainSite() {
  useEffect(() => {
    trackVisit('home');
  }, []);

  return (
    <>
      <Header />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <Features />
        <Pricing />
        <SpecificServices />
        <HowToOrder />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/app" element={<SubPageLayout><AppPage /></SubPageLayout>} />
            <Route path="/about" element={<SubPageLayout><About /></SubPageLayout>} />
            <Route path="/contacts" element={<SubPageLayout><Contacts /></SubPageLayout>} />
            <Route path="/services" element={<SubPageLayout><ServicesSummary /></SubPageLayout>} />
            <Route path="/services/taxi" element={<SubPageLayout><TaxiService /></SubPageLayout>} />
            <Route path="/services/corporate" element={<SubPageLayout><CorporateService /></SubPageLayout>} />
            <Route path="/services/transfers" element={<SubPageLayout><TransferService /></SubPageLayout>} />
            <Route path="/services/drink-and-drive" element={<SubPageLayout><DrinkDriveService /></SubPageLayout>} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AppProvider>
  );
}
