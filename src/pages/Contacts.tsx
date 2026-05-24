
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/PageHero';

const Contacts = () => {
  const { language, taxiNumbers, translations } = useAppContext();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const t = translations?.[language]?.contacts;
  if (!t) return null;

  const breadcrumbs = [
    { label: t.title }
  ];

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'Контакти | EH TAXI 6106' : 'Contacts | EH TAXI 6106'}</title>
      </Helmet>

      <PageHero 
        title={t.title}
        description={t.subtitle}
        breadcrumbs={breadcrumbs}
      />

      <section className="mx-auto px-4 max-w-[1200px] mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
            <h2 className="text-3xl font-black mb-4 tracking-tight">{t.infoTitle}</h2>
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t.addressLabel}</div>
                    <div className="text-lg font-bold dark:text-white">{t.addressValue}</div>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t.phoneLabel}</div>
                    <div className="flex flex-col gap-1">
                      {taxiNumbers.map((num, i) => (
                        <a key={i} href={`tel:${num}`} className="text-lg font-bold text-blue-700 dark:text-blue-600 hover:underline">
                          {num}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t.emailLabel}</div>
                    <a href="mailto:office@ehtaxi.bg" className="text-lg font-bold dark:text-white hover:text-blue-700 dark:hover:text-blue-600 transition-colors">
                      office@ehtaxi.bg
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 text-blue-700 dark:text-blue-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Clock size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">{t.workLabel}</div>
                    <div className="text-lg font-bold dark:text-white">{t.workValue}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-[300px] bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                    <span className="font-bold uppercase tracking-widest text-xs">Interactive Map Coming Soon</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-white/5 p-10 md:p-12 rounded-xl border border-gray-100 dark:border-white/10 shadow-md relative group hover:border-blue-700 dark:hover:border-blue-600 transition-all">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black text-blue-700 dark:text-blue-600">{t.formSuccess}</h3>
              </motion.div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-blue-700 dark:text-blue-600 mb-8 tracking-tight">{t.formTitle}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.formName}</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-700 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-700/10 dark:focus:ring-blue-600/10 rounded-xl outline-none transition-all dark:text-white shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.formEmail}</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-700 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-700/10 dark:focus:ring-blue-600/10 rounded-xl outline-none transition-all dark:text-white shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.formSubject}</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-700 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-700/10 dark:focus:ring-blue-600/10 rounded-xl outline-none transition-all dark:text-white shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t.formMessage}</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:border-blue-700 dark:focus:border-blue-600 focus:ring-4 focus:ring-blue-700/10 dark:focus:ring-blue-600/10 rounded-xl outline-none transition-all dark:text-white resize-none shadow-sm"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#F6C000] text-blue-700 dark:text-blue-600 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3"
                  >
                    {t.formButton} <Send size={20} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
