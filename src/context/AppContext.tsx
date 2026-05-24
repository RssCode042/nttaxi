/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { translations as defaultTranslations } from '../translations';
import { PRICING_DATA as defaultPricingData, TAXI_NUMBERS as defaultTaxiNumbers, MAIN_PHONE as defaultMainPhone } from '../constants';

type Language = 'bg' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  translations: any;
  pricingData: any[];
  taxiNumbers: string[];
  mainPhone: string;
  seo: any;
  links: any;
  isLoading: boolean;
}

const DEFAULT_SEO = {
  title: 'EH TAXI 6106 | Professional Taxi Services in Elin Pelin',
  description: 'Reliable and fast taxi services in Elin Pelin and the region. Call us 24/7 for a safe ride.',
  keywords: 'taxi, Elin Pelin, transport, 6106, EH TAXI, travel, Bulgaria',
  ogImage: 'https://6106.bg/og-image.jpg'
};

const DEFAULT_LINKS = {
  facebook: '',
  instagram: '',
  twitter: '',
  tiktok: '',
  appleStore: '',
  googlePlay: ''
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bg');
  const [theme, setTheme] = useState<Theme>('light');
  const [translations, setTranslations] = useState(defaultTranslations);
  const [pricingData, setPricingData] = useState(defaultPricingData);
  const [taxiNumbers, setTaxiNumbers] = useState(defaultTaxiNumbers);
  const [mainPhone, setMainPhone] = useState(defaultMainPhone);
  const [seo, setSeo] = useState(DEFAULT_SEO);
  const [links, setLinks] = useState(DEFAULT_LINKS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    // Subscribe to site config updates
    const siteConfigPath = 'config/site';
    const unsubscribe = onSnapshot(doc(db, siteConfigPath), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data.translations) setTranslations(data.translations);
        if (data.pricingData) setPricingData(data.pricingData);
        if (data.taxiNumbers) setTaxiNumbers(data.taxiNumbers);
        if (data.mainPhone) setMainPhone(data.mainPhone);
        if (data.seo) setSeo(data.seo);
        if (data.links) setLinks(data.links);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore Error (onSnapshot):", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ 
      language, setLanguage, theme, toggleTheme, 
      translations, pricingData, taxiNumbers, mainPhone, seo, links, isLoading 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
