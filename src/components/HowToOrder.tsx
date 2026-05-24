/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Smartphone, Headset } from 'lucide-react';
import { TAXI_NUMBERS } from '../constants';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

export default function HowToOrder() {
  const { language, translations: currentTranslations, taxiNumbers: currentTaxiNumbers } = useAppContext();
  const t = currentTranslations[language].order;

  return (
    <section id="app" className="py-24 bg-blue-700 dark:bg-blue-600 text-white transition-colors">
      <div className="mx-auto px-4 max-w-[1200px]">
        <h2 className="text-3xl font-bold mb-16 tracking-tight">{t.title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Mobile App Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
               <div className="p-4 bg-blue-50/10 rounded-xl text-white">
                  <Smartphone size={32} />
               </div>
               <h3 className="text-2xl font-bold">{t.mobile}</h3>
            </div>
            
            <p className="text-lg text-gray-200 font-light leading-relaxed">
               {t.mobileDesc}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-xl overflow-hidden">
                <img src="/src/assets/images/apple.svg" alt="App Store" className="h-14 w-auto drop-shadow-lg" />
              </a>
              <a href="#" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-xl overflow-hidden">
                <img src="/src/assets/images/google.svg" alt="Google Play" className="h-14 w-auto drop-shadow-lg" />
              </a>
            </div>
          </motion.div>

          {/* Dispatcher Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
               <div className="p-4 bg-blue-50/10 rounded-xl text-white">
                  <Headset size={32} />
               </div>
               <h3 className="text-2xl font-bold">{t.dispatcher}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTaxiNumbers.map((number, index) => (
                <a
                  key={index}
                  href={`tel:${number.replace(/\s+/g, '')}`}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-blue-700 dark:hover:text-blue-600 transition-all p-4 rounded-xl text-center font-bold tracking-tight text-lg shadow-sm"
                >
                  {number}
                </a>
              ))}
            </div>
            
            <p className="text-sm text-gray-300 font-light italic mt-4">
               {t.dispatcherDesc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
