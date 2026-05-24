
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../../context/AppContext';
import { Car, MapPin, BadgeCheck, Phone } from 'lucide-react';
import { CTASection } from '../../components/CTASection';
import PageHero from '../../components/PageHero';

const TaxiService = () => {
  const { language, taxiNumbers, translations } = useAppContext();
  const t = translations?.[language]?.serviceTaxi;
  const navT = translations?.[language]?.nav;
  
  if (!t) return null;

  const breadcrumbs = [
    { label: navT.services, href: '/services' },
    { label: t.title }
  ];

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'Таксиметрови Услуги | EH TAXI 6106' : 'Taxi Services | EH TAXI 6106'}</title>
      </Helmet>
      
      <PageHero 
        title={t.title}
        description={t.description}
        breadcrumbs={breadcrumbs}
      />

      {/* Details */}
      <section className="mx-auto px-4 max-w-[1200px] mt-24 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.features.map((feature: any, i: number) => (
            <div key={i} className="p-10 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl group hover:shadow-md hover:border-blue-700 dark:hover:border-blue-600 transition-all">
              <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm mb-6 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 transition-colors group-hover:text-white">
                {i === 0 && <Car size={24} />}
                {i === 1 && <MapPin size={24} />}
                {i === 2 && <BadgeCheck size={24} />}
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call CTA */}
      <CTASection 
        title={t.ctaTitle}
        description={t.ctaSubtitle}
        buttonText={language === 'bg' ? 'Поръчай сега' : 'Order Now'}
      />
    </div>
  );
};

export default TaxiService;
