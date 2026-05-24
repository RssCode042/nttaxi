/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { RATES, EUR_RATE } from '../constants';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../translations';

export default function Pricing() {
  const { language, translations: currentTranslations, pricingData: currentPricingData } = useAppContext();
  const t = currentTranslations[language].pricing;
  
  const [distance, setDistance] = useState(5);
  const [waitingTime, setWaitingTime] = useState(0);
  const [isNight, setIsNight] = useState(false);

  const currentRates = isNight ? RATES.night : RATES.day;
  const totalPrice = currentRates.start + (distance * currentRates.perKm) + (waitingTime * currentRates.perMin);

  // Map label to translated version
  const getTranslatedLabel = (bgLabel: string) => {
    if (bgLabel.includes('км')) return t.labels.km;
    if (bgLabel.includes('Повикване')) return t.labels.call;
    if (bgLabel.includes('Начална')) return t.labels.start;
    if (bgLabel.includes('Престой')) return t.labels.waiting;
    return bgLabel;
  };

  return (
    <section className="py-24 bg-white dark:bg-black/40 transition-colors">
      <div className="mx-auto px-4 max-w-[1200px]">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16 text-center md:text-left tracking-tight">{t.title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Pricing Table (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 md:p-10 border border-gray-100 dark:border-white/10 shadow-sm space-y-8"
          >
            <div className="space-y-2">
              <div className="hidden md:grid grid-cols-3 border-b border-gray-200 dark:border-gray-700 pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <div>{t.labels.unit}</div>
                <div className="text-center">{t.labels.day}</div>
                <div className="text-right">{t.labels.night}</div>
              </div>
              
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {currentPricingData.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 py-6 items-center"
                  >
                    <div className="font-bold text-gray-900 dark:text-white text-base md:text-base md:font-medium">
                      {getTranslatedLabel(item.label)}
                    </div>
                    
                    <div className="flex justify-between md:justify-center items-center bg-gray-100/50 dark:bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl">
                      <span className="md:hidden text-[10px] font-black text-gray-400 uppercase tracking-wider">{t.labels.day}</span>
                      <span className="text-blue-700 dark:text-blue-600 font-bold md:font-light">{item.dayPrice}</span>
                    </div>
                    
                    <div className="flex justify-between md:justify-end items-center bg-gray-100/50 dark:bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl">
                      <span className="md:hidden text-[10px] font-black text-gray-400 uppercase tracking-wider">{t.labels.night}</span>
                      <span className="text-blue-700 dark:text-blue-600 font-bold md:font-light">{item.nightPrice}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
               <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                 {t.note}
               </p>
            </div>
          </motion.div>

          {/* Calculator (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-white/5 rounded-2xl p-8 md:p-12 border border-gray-100 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 dark:bg-white/10 rounded-xl text-blue-700 dark:text-blue-600">
                <Calculator size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t.calculator.title}</h3>
            </div>

            <div className="space-y-8 md:space-y-10">
              {/* Distance Slider */}
              <div className="space-y-5">
                <div className="flex justify-between items-end">
                  <label className="text-gray-600 dark:text-gray-400 font-semibold text-sm md:text-base">{t.calculator.distance}</label>
                  <span className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-600 transition-colors">{distance} <small className="text-xs md:text-sm font-medium text-gray-400">km</small></span>
                </div>
                <div className="py-2">
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={distance} 
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full h-3 md:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-700 dark:accent-blue-600"
                  />
                </div>
              </div>

              {/* Waiting Time Slider */}
              <div className="space-y-5">
                <div className="flex justify-between items-end">
                  <label className="text-gray-600 dark:text-gray-400 font-semibold text-sm md:text-base">{t.calculator.waiting}</label>
                  <span className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-600 transition-colors">{waitingTime} <small className="text-xs md:text-sm font-medium text-gray-400">min</small></span>
                </div>
                <div className="py-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="60" 
                    value={waitingTime} 
                    onChange={(e) => setWaitingTime(parseInt(e.target.value))}
                    className="w-full h-3 md:h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-700 dark:accent-blue-600"
                  />
                </div>
              </div>

              {/* Day/Night Toggle */}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm">{t.calculator.tariff}</span>
                <div className="flex bg-gray-100 dark:bg-gray-900 p-1.5 rounded-xl grow sm:grow-0">
                  <button 
                    onClick={() => setIsNight(false)}
                    className={`flex-1 sm:flex-none px-6 py-3 sm:py-2 rounded-lg text-sm font-bold transition-all ${!isNight ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-600 shadow-md' : 'text-gray-400 dark:text-gray-600'}`}
                  >
                    {t.labels.day}
                  </button>
                  <button 
                    onClick={() => setIsNight(true)}
                    className={`flex-1 sm:flex-none px-6 py-3 sm:py-2 rounded-lg text-sm font-bold transition-all ${isNight ? 'bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-600 shadow-md' : 'text-gray-400 dark:text-gray-600'}`}
                  >
                    {t.labels.night}
                  </button>
                </div>
              </div>

              {/* Result */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mt-6 md:mt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center bg-blue-700 dark:bg-blue-600 p-6 md:p-8 rounded-2xl text-white gap-4">
                  <span className="text-gray-300 font-semibold uppercase tracking-widest text-[10px] sm:text-xs text-center sm:text-left">{t.calculator.approx}</span>
                  <div className="text-center sm:text-right">
                    <p className="text-4xl md:text-5xl font-black text-[#F6C000] tracking-tighter">{(totalPrice / EUR_RATE).toFixed(2)} EUR</p>
                    <p className="text-base sm:text-sm text-blue-200 mt-2 sm:mt-1 font-bold">{totalPrice.toFixed(2)} BGN</p>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 mt-6 text-center px-4 font-medium leading-relaxed">
                  {t.calculator.warning}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
