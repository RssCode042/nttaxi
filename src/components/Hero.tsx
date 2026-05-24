/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

export default function Hero() {
  const { language, translations: currentTranslations, links, mainPhone } = useAppContext();
  const t = currentTranslations[language].hero;
  const navT = currentTranslations[language].nav;

  return (
    <section className="relative h-auto lg:h-[650px] w-full flex items-center overflow-hidden py-20 lg:py-0">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#0F172A]/40 dark:bg-[#000000]/60 z-10 transition-colors" />
      
      {/* Background Image */}
      <img
        src={t.assets?.heroImage || "/src/assets/images/Hero.png"}
        alt="Stara Zagora City"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="mx-auto px-4 max-w-[1200px] relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-white space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg text-center lg:text-left">
            {t.title} <span className="text-[#F6C000]">{t.city}</span>
          </h1>
          <p className="text-xl text-gray-100 dark:text-gray-200 font-medium max-w-lg drop-shadow-md text-center lg:text-left mx-auto lg:mx-0">
            {t.subtitle}
          </p>

          {/* Mobile Order Now Section */}
          <div className="lg:hidden flex flex-col items-center gap-4 pt-4">
            <span className="text-[#F6C000] font-black tracking-widest text-sm drop-shadow-md">
              {language === 'bg' ? 'поръчай сега' : 'order now'}
            </span>
            <a
              href={`tel:${mainPhone}`}
              className="w-full max-w-sm bg-[#F6C000] text-blue-700 dark:text-blue-600 px-8 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:bg-[#e5b200] transition-all shadow-2xl active:scale-95 animate-pulse"
            >
              <Phone size={24} fill="currentColor" />
              {mainPhone}
            </a>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           viewport={{ once: true }}
           className="flex flex-col items-center gap-6 lg:gap-8"
        >
          <div className="relative w-48 md:w-64 lg:w-80 h-auto">
             <img 
               src={t.assets?.phoneImage || "/src/assets/images/phone01.png"} 
               alt="Taxi App" 
               className="w-full h-auto drop-shadow-2xl"
             />
          </div>
          
          <div className="flex flex-col gap-3 w-full max-w-md">
             <h3 className="text-white font-bold text-center text-lg lg:text-xl mb-1 drop-shadow-sm">{t.downloadApp}</h3>
             <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
               <a href={links?.appleStore || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-lg lg:rounded-xl overflow-hidden">
                  <img src="/src/assets/images/apple.svg" alt="App Store" className="h-10 md:h-12 lg:h-14 w-auto" />
               </a>
               <a href={links?.googlePlay || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-lg lg:rounded-xl overflow-hidden">
                  <img src="/src/assets/images/google.svg" alt="Google Play" className="h-10 md:h-12 lg:h-14 w-auto" />
               </a>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
