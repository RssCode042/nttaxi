
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../../context/AppContext';
import { Car, Building2, PlaneTakeoff, GlassWater, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTASection } from '../../components/CTASection';
import PageHero from '../../components/PageHero';

const ServicesSummary = () => {
  const { language, translations: currentTranslations } = useAppContext();
  const t = currentTranslations[language];
  const navT = t.nav;

  const breadcrumbs = [
    { label: navT.services }
  ];

  const allServices = [
    {
      id: 'taxi',
      title: navT.serviceLinks.taxi,
      icon: <Car className="w-8 h-8" />,
      desc: language === 'bg' 
        ? "Професионални таксиметрови услуги в Цялата страна. Бърза реакция и комфортни автомобили."
        : "Professional taxi services across the country. Fast response and comfortable vehicles.",
      link: "/services/taxi"
    },
    {
      id: 'corporate',
      title: navT.serviceLinks.corporate,
      icon: <Building2 className="w-8 h-8" />,
      desc: language === 'bg'
        ? "Индивидуални решения за Вашия бизнес. Гъвкаво плащане и месечни фактури."
        : "Individual solutions for your business. Flexible payment and monthly invoices.",
      link: "/services/corporate"
    },
    {
      id: 'transfers',
      title: navT.serviceLinks.transfers,
      icon: <PlaneTakeoff className="w-8 h-8" />,
      desc: language === 'bg'
        ? "Фиксирани цени до всички летища в България - София, Пловдив, Бургас и Варна."
        : "Fixed prices to all airports in Bulgaria - Sofia, Plovdiv, Burgas, and Varna.",
      link: "/services/transfers"
    },
    {
      id: 'drink-and-drive',
      title: navT.serviceLinks.drinkAndDrive,
      icon: <GlassWater className="w-8 h-8" />,
      desc: language === 'bg'
        ? "Вашият автомобил ще бъде транспортиран безопасно, докато Вие почивате."
        : "Your car will be safely transported to your destination while you relax.",
      link: "/services/drink-and-drive"
    }
  ];

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'Нашите Услуги | EH TAXI 6106' : 'Our Services | EH TAXI 6106'}</title>
      </Helmet>
      
      <PageHero 
        title={navT.services}
        description={language === 'bg' 
          ? "Ние предлагаме широк спектър от транспортни услуги, проектирани да задоволят всяка Ваша нужда с максимален комфорт и сигурност."
          : "We offer a wide range of transport services designed to meet your every need with maximum comfort and security."}
        breadcrumbs={breadcrumbs}
      />

      {/* Services Grid */}
      <section className="mx-auto px-4 max-w-[1200px] mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allServices.map((service) => (
            <Link 
              key={service.id} 
              to={service.link}
              className="group p-8 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-700 dark:hover:border-blue-600 transition-all hover:shadow-md flex flex-col items-start"
            >
              <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm mb-6 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 transition-colors group-hover:text-white">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-600 mb-4">{service.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
                {service.desc}
              </p>
              <span className="flex items-center gap-2 text-blue-700 dark:text-blue-600 font-black tracking-wider text-sm group-hover:translate-x-2 transition-transform">
                {language === 'bg' ? 'Научи повече' : 'Learn more'} <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <CTASection 
        title={language === 'bg' ? 'Готови ли сте за път?' : 'Ready to go?'}
        description={language === 'bg' 
          ? 'Свържете се с нас за бърза поръчка или професионална консултация относно Вашите транспортни нужди.'
          : 'Contact us for a quick order or professional consultation regarding your transport needs.'}
        buttonText={language === 'bg' ? 'Поръчай сега' : 'Order Now'}
      />
    </div>
  );
};

export default ServicesSummary;
