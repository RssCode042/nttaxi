/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plane, Building, CreditCard, Beer, Car, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

export default function SpecificServices() {
  const { language, translations: currentTranslations } = useAppContext();
  const t = currentTranslations[language].services;
  const navT = currentTranslations[language].nav;

  const services = [
    { 
      label: navT.serviceLinks.transfers, 
      description: t.items[0].description, 
      icon: <Plane className="text-blue-700 dark:text-blue-600" />, 
      href: '/services/transfers' 
    },
    { 
      label: navT.serviceLinks.corporate, 
      description: t.items[1].description, 
      icon: <Building className="text-blue-700 dark:text-blue-600" />, 
      href: '/services/corporate' 
    },
    { 
      label: language === 'bg' ? 'Плащане с карта' : 'Card Payment', 
      description: t.items[2].description, 
      icon: <CreditCard className="text-blue-700 dark:text-blue-600" />, 
      href: '/services/taxi' 
    },
    { 
      label: navT.serviceLinks.drinkAndDrive, 
      description: t.items[3].description, 
      icon: <Beer className="text-blue-700 dark:text-blue-600" />, 
      href: '/services/drink-and-drive' 
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-black/20 transition-colors">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{t.title}</h2>
          <Link to="/services" className="text-blue-700 dark:text-blue-600 font-bold flex items-center gap-2 hover:underline transition-colors">
            {language === 'bg' ? 'Всички услуги' : 'All services'} <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={service.href}
                className="flex flex-col h-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-700 dark:hover:border-blue-600 transition-all group"
              >
                <div className="p-4 bg-blue-50 dark:bg-white/5 rounded-xl w-fit group-hover:scale-110 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 transition-all mb-6">
                  <div className="group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-600 transition-colors">
                    {service.label}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'bg' ? 'Научи повече' : 'Learn more'} <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
