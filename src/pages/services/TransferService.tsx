
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../../context/AppContext';
import { MapPin, Clock, Tag, UserCheck, Phone, Shield, ArrowRight } from 'lucide-react';
import { CTASection } from '../../components/CTASection';
import PageHero from '../../components/PageHero';
import { RATES, EUR_RATE } from '../../constants';

const TransferService = () => {
  const { language, taxiNumbers, translations } = useAppContext();
  const t = translations?.[language]?.serviceTransfers;
  const navT = translations?.[language]?.nav;

  if (!t) return null;

  const breadcrumbs = [
    { label: navT.services, href: '/services' },
    { label: t.title }
  ];

  const calculatePrice = (distance: number) => {
    const bgn = (distance * RATES.day.perKm) + RATES.day.start;
    const eur = bgn / EUR_RATE;
    return { bgn, eur };
  };

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'Летищни Трансфери | EH TAXI 6106' : 'Airport Transfers | EH TAXI 6106'}</title>
      </Helmet>
      
      <PageHero 
        title={t.title}
        description={t.description}
        breadcrumbs={breadcrumbs}
      />

      {/* Popular Transfers Table */}
      <section className="mx-auto px-4 max-w-[1200px] mt-24 mb-24">
        <h2 className="text-3xl font-black text-blue-700 dark:text-blue-600 mb-10 tracking-tight">
          {t.destinationsTitle}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-widest font-black">
                <th className="px-8 pb-4">{language === 'bg' ? 'От / До' : 'From / To'}</th>
                <th className="px-8 pb-4">{language === 'bg' ? 'Разстояние' : 'Distance'}</th>
                <th className="px-8 pb-4">{language === 'bg' ? 'Цена' : 'Price'}</th>
              </tr>
            </thead>
            <tbody>
              {t.destinations.map((dest: any, idx: number) => (
                <tr key={idx} className="bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                  <td className="px-8 py-6 rounded-l-xl font-bold dark:text-white border-y border-l border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white dark:bg-white/10 rounded-lg text-blue-700 dark:text-blue-600"><MapPin size={18} /></div>
                      {dest.from} <ArrowRight size={16} className="text-gray-400" /> {dest.to}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-white/5">{dest.distance} km</td>
                  <td className="px-8 py-6 rounded-r-xl border-y border-r border-gray-100 dark:border-white/5">
                    <div className="flex flex-col">
                      <span className="font-black text-blue-700 dark:text-blue-600">
                        ~{calculatePrice(dest.distance).eur.toFixed(0)} €
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">
                        ~{calculatePrice(dest.distance).bgn.toFixed(0)} лв.
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-gray-400 italic">
          {language === 'bg' 
            ? '* Посочените суми са приблизителни и могат да варират в зависимост от трафика и избрания маршрут.' 
            : '* The indicated amounts are approximate and may vary depending on traffic and the chosen route.'}
        </p>
      </section>

      {/* Why transfers */}
      <section className="mx-auto px-4 max-w-[1200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
        {t.features.map((item: any, i: number) => (
          <div key={i} className="text-center p-8 group bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 hover:border-blue-700 dark:hover:border-blue-600 transition-all">
            <div className="w-16 h-16 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm mx-auto mb-8 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
              {i === 0 && <UserCheck size={28} />}
              {i === 1 && <Tag size={28} />}
              {i === 2 && <Clock size={28} />}
              {i === 3 && <Shield size={28} />}
            </div>
            <h3 className="text-xl font-bold dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <CTASection 
        title={t.ctaTitle}
        description={language === 'bg' 
          ? 'Свържете се с нас за фиксирана цена и сигурен трансфер.' 
          : 'Contact us for a fixed price and a secure transfer.'}
        buttonText={language === 'bg' ? 'Резервирай сега' : 'Book Now'}
      />
    </div>
  );
};

export default TransferService;
