/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, Users, ShieldCheck, Banknote } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

export default function Features() {
  const { language, translations: currentTranslations } = useAppContext();
  const t = currentTranslations[language].features;

  const icons = [
    <Clock className="text-blue-700 dark:text-blue-600" size={24} />,
    <Users className="text-blue-700 dark:text-blue-600" size={24} />,
    <ShieldCheck className="text-blue-700 dark:text-blue-600" size={24} />,
    <Banknote className="text-blue-700 dark:text-blue-600" size={24} />,
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-black/20 transition-colors">
      <div className="mx-auto px-4 max-w-[1200px]">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.items.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
                {icons[index]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
