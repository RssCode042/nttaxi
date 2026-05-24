/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NEWS_DATA } from '../constants';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function News() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Актуални новини</h2>
            <p className="text-gray-500 font-light">Следете последните събития и обновления при нас.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-700 dark:text-blue-600 font-bold hover:underline">
            ВИЖ ВСИЧКИ <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_DATA.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-900/5"
            >
              <div className="p-8">
                <span className="text-sm font-bold text-[#F6C000] uppercase tracking-widest">{item.date}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  {item.excerpt}
                </p>
                <button className="text-blue-700 dark:text-blue-600 font-bold text-sm inline-flex items-center gap-2 group/btn">
                  ПРОЧЕТИ ПОВЕЧЕ 
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
        
        <button className="mt-12 w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl md:hidden">
          ВИЖ ВСИЧКИ НОВИНИ
        </button>
      </div>
    </section>
  );
}
