/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Music2, Apple, Play } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { language, translations: currentTranslations, links, mainPhone } = useAppContext();
  const t = currentTranslations[language].footer;
  const navT = currentTranslations[language].nav;

  const socialLinks = [
    { id: 'facebook', icon: Facebook, url: links?.facebook, color: 'hover:bg-blue-700 dark:hover:bg-blue-600' },
    { id: 'instagram', icon: Instagram, url: links?.instagram, color: 'hover:bg-pink-600' },
    { id: 'twitter', icon: Twitter, url: links?.twitter, color: 'hover:bg-black' },
    { id: 'tiktok', icon: Music2, url: links?.tiktok, color: 'hover:bg-black' },
  ].filter(l => l.url);

  return (
    <footer id="contact" className="bg-[#0F172A] dark:bg-black/80 text-white pt-20 pb-10 transition-colors">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Link to="/">
                <img src="/src/assets/images/6106.svg" alt="EH Taxi 6106 Logo" className="h-12 w-auto" />
              </Link>
            </div>
            <p className="text-gray-400 dark:text-gray-500 font-light leading-relaxed">
               {t.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ id, icon: Icon, url, color }) => (
                <a 
                  key={id}
                  href={url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 bg-white/5 rounded-xl transition-all hover:text-white hover:-translate-y-1 shadow-lg ${color}`}
                >
                  <Icon size={18} />
                </a>
              ))}
              {links?.appleStore && (
                <a href={links.appleStore} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl transition-all hover:bg-gray-800 hover:text-white hover:-translate-y-1">
                  <Apple size={18} />
                </a>
              )}
              {links?.googlePlay && (
                <a href={links.googlePlay} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-xl transition-all hover:bg-green-700 hover:text-white hover:-translate-y-1">
                  <Play size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b border-white/10 pb-4">{t.contactTitle}</h4>
            <div className="space-y-4">
              <div className="flex gap-3 text-gray-400">
                <MapPin className="text-[#F6C000] mt-1 shrink-0" size={18} />
                <p className="text-sm">{t.address}</p>
              </div>
              <div className="flex gap-3 text-gray-400">
                <Phone className="text-[#F6C000] shrink-0" size={18} />
                <a href={`tel:${mainPhone}`} className="text-sm hover:text-white transition-colors">{mainPhone}</a>
              </div>
              <div className="flex gap-3 text-gray-400">
                <Mail className="text-[#F6C000] shrink-0" size={18} />
                <p className="text-sm">ntaxi@ntaxi.bg</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b border-white/10 pb-4">{t.servicesTitle}</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition-colors"><Link to="/services/taxi">{navT.serviceLinks.taxi}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/services/corporate">{navT.serviceLinks.corporate}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/services/drink-and-drive">{navT.serviceLinks.drinkAndDrive}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/services/transfers">{navT.serviceLinks.transfers}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/services" className="text-[#F6C000] font-bold">Всички услуги</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-b border-white/10 pb-4">{t.linksTitle}</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li className="hover:text-white transition-colors"><Link to="/">{navT.home}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/about">{navT.about}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/app">{navT.app}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/services">{navT.services}</Link></li>
              <li className="hover:text-white transition-colors"><Link to="/contacts">{navT.contact}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-light">
             {t.rights}
          </p>
          <div className="flex gap-4">
             {/* Badges moved to social section */}
          </div>
        </div>
      </div>
    </footer>
  );
}
