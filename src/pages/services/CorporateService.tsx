
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../../context/AppContext';
import { Building2, FileText, CreditCard, Users, Briefcase, CalendarCheck } from 'lucide-react';
import { CTASection } from '../../components/CTASection';
import PageHero from '../../components/PageHero';

const CorporateService = () => {
  const { language, translations } = useAppContext();
  const t = translations?.[language]?.serviceCorporate;
  const navT = translations?.[language]?.nav;
  
  if (!t) return null;

  const breadcrumbs = [
    { label: navT.services, href: '/services' },
    { label: t.title }
  ];

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'Корпоративни Клиенти | EH TAXI 6106' : 'Corporate Clients | EH TAXI 6106'}</title>
      </Helmet>
      
      <PageHero 
        title={t.title}
        description={t.description}
        breadcrumbs={breadcrumbs}
      />

      {/* Main Benefits */}
      <section className="mx-auto px-4 max-w-[1200px] mt-24 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {t.benefits.map((benefit: any, i: number) => (
            <div key={i} className="p-10 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl hover:shadow-md hover:border-blue-700 dark:hover:border-blue-600 transition-all group">
              <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm mb-8 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 transition-colors group-hover:text-white">
                {i === 0 && <FileText size={24} />}
                {i === 1 && <CreditCard size={24} />}
                {i === 2 && <Briefcase size={24} />}
                {i === 3 && <Users size={24} />}
                {i === 4 && <CalendarCheck size={24} />}
                {i === 5 && <Building2 size={24} />}
              </div>
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-600 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry CTA */}
      <CTASection 
        title={t.ctaTitle}
        description={t.ctaSubtitle}
        buttonText={t.ctaButton}
      />
    </div>
  );
};

export default CorporateService;
