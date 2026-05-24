/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, Phone, X, Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, theme, toggleTheme, translations: currentTranslations, mainPhone } = useAppContext();
  const t = currentTranslations[language].nav;

  const services = [
    { name: t.serviceLinks.taxi, href: '/services/taxi' },
    { name: t.serviceLinks.corporate, href: '/services/corporate' },
    { name: t.serviceLinks.transfers, href: '/services/transfers' },
    { name: t.serviceLinks.drinkAndDrive, href: '/services/drink-and-drive' },
  ];

  const navLinks = [
    { name: t.home, href: '/' },
    { name: t.app, href: '/app' },
    { name: t.services, href: '/services', dropdown: true },
    { name: t.about, href: '/about' },
    { name: t.contact, href: '/contacts' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/src/assets/images/6106.svg" alt="EH Taxi 6106" className="h-12 w-auto dark:brightness-110" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.dropdown && setIsServicesOpen(true)}
                onMouseLeave={() => link.dropdown && setIsServicesOpen(false)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 font-medium transition-colors ${
                    location.pathname.startsWith(link.href) && link.href !== '/' ? 'text-blue-700 dark:text-blue-600' : ''
                  }`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 top-full pt-4 min-w-[220px]"
                      >
                        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 p-2 overflow-hidden">
                          {services.map((service) => (
                            <Link
                              key={service.name}
                              to={service.href}
                              className="block px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-blue-700 dark:hover:text-blue-600 rounded-lg transition-colors whitespace-nowrap"
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              {/* Language Switcher */}
              <button 
                onClick={() => setLanguage(language === 'bg' ? 'en' : 'bg')}
                className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition-colors group"
              >
                <Globe size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
              </button>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-600 transition-colors"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </nav>

          {/* Action Button */}
          <div className="hidden lg:block">
            <a
              href={`tel:${mainPhone}`}
              className="bg-[#F6C000] text-blue-700 dark:text-blue-600 px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-[#e5b200] transition-all shadow-md active:scale-95"
            >
              <Phone size={18} />
              {t.order}: {mainPhone}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-700"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#0F172A] border-b border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="w-full flex items-center justify-between px-3 py-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5 rounded-md"
                      >
                        {link.name}
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gray-50 dark:bg-white/5 rounded-lg overflow-hidden ml-3"
                          >
                            <Link
                              to="/services"
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-4 py-3 text-sm font-bold text-[#F6C000]"
                            >
                              {t.services} (Всички)
                            </Link>
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                to={service.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600"
                              >
                                {service.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5 rounded-md ${
                        location.pathname === link.href ? 'text-blue-700 dark:text-blue-600' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-between px-3 py-4 border-t border-gray-100 dark:border-gray-800 mt-2">
                 <button 
                    onClick={() => {
                        setLanguage(language === 'bg' ? 'en' : 'bg');
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 font-bold"
                 >
                    <Globe size={20} />
                    {language === 'bg' ? 'English' : 'Български'}
                 </button>
              </div>
              <div className="pt-4">
                <a
                  href={`tel:${mainPhone}`}
                  className="w-full bg-[#F6C000] text-blue-700 dark:text-blue-600 px-6 py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  {mainPhone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
