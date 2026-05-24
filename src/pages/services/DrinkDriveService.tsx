
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../../context/AppContext';
import { ShieldCheck, Car, Key, UserCheck, Phone } from 'lucide-react';
import { CTASection } from '../../components/CTASection';
import PageHero from '../../components/PageHero';

const DrinkDriveService = () => {
  const { language, taxiNumbers, translations } = useAppContext();
  const t = translations?.[language]?.serviceDrinkDrive;
  const navT = translations?.[language]?.nav;

  if (!t) return null;

  const breadcrumbs = [
    { label: navT.services, href: '/services' },
    { label: 'Drink & Drive' }
  ];

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'Drink & Drive | EH TAXI 6106' : 'Drink & Drive | EH TAXI 6106'}</title>
      </Helmet>
      
      <PageHero 
        title="Drink & Drive"
        description={t.description}
        breadcrumbs={breadcrumbs}
      />

      {/* How it works */}
      <section className="mx-auto px-4 max-w-[1200px] mt-24 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl font-black text-blue-700 dark:text-blue-600">
              {t.howTitle}
            </h2>
            
            <div className="space-y-8">
              {t.steps.map((step: any, i: number) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {i === 0 && <Phone size={24} />}
                    {i === 1 && <UserCheck size={24} />}
                    {i === 2 && <ShieldCheck size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-light">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-xl text-center border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-blue-700 dark:hover:border-blue-600 transition-all">
              <Key className="w-10 h-10 mx-auto text-blue-700 dark:text-blue-600 mb-4" />
              <h4 className="font-bold dark:text-white mb-2">{t.trustTitle}</h4>
              <p className="text-xs text-gray-500 font-light">{t.trustDesc}</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-xl text-center mt-12 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md hover:border-blue-700 dark:hover:border-blue-600 transition-all">
              <Car className="w-10 h-10 mx-auto text-blue-700 dark:text-blue-600 mb-4" />
              <h4 className="font-bold dark:text-white mb-2">{t.respTitle}</h4>
              <p className="text-xs text-gray-500 font-light">{t.respDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection 
        title={t.ctaTitle}
        description={language === 'bg' 
          ? 'Погрижете се за себе си и автомобила си. Позвънете ни за професионално съдействие.'
          : 'Take care of yourself and your car. Call us for professional assistance.'}
        buttonText={t.ctaButton}
      />
    </div>
  );
};

export default DrinkDriveService;
