
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import { Clock, ShieldCheck, Banknote, MapPin, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { CTASection } from '../components/CTASection';
import PageHero from '../components/PageHero';

const About = () => {
  const { language, translations } = useAppContext();

  const t = translations?.[language]?.about;
  if (!t) return null;

  const breadcrumbs = [
    { label: t.title }
  ];

  return (
    <div className="pb-0">
      <Helmet>
        <title>{language === 'bg' ? 'За Нас | EH TAXI 6106' : 'About Us | EH TAXI 6106'}</title>
      </Helmet>

      <PageHero 
        title={t.title}
        description={t.subtitle}
        breadcrumbs={breadcrumbs}
      />

      {/* Content Section */}
      <section className="mx-auto px-4 max-w-[1200px] mt-24 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-blue-700 dark:text-blue-600 leading-tight">
              {t.welcome}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-light">
              {t.intro}
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100 dark:border-white/10">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-[#F6C000] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-[#F6C000] rounded-[3rem] rotate-3 opacity-20 blur-2xl group-hover:rotate-6 transition-transform" />
            <img 
              src="/src/assets/images/Hero.png" 
              alt="Taxi Stara Zagora" 
              className="relative rounded-[3rem] shadow-2xl z-10 w-full object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-black/20 py-32 mb-32">
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-blue-700 dark:text-blue-600 mb-6 tracking-tight">
              {t.whyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-white/5 p-10 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md hover:border-blue-700 dark:hover:border-blue-600 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm mb-8 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {i === 0 && <Clock className="w-8 h-8" />}
                  {i === 1 && <ShieldCheck className="w-8 h-8" />}
                  {i === 2 && <Banknote className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-black text-blue-700 dark:text-blue-600 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mx-auto px-4 max-w-[900px] text-center">
        <div className="inline-flex p-4 bg-[#F6C000]/10 rounded-full text-[#F6C000] mb-8">
          <Heart fill="currentColor" size={32} />
        </div>
        <h2 className="text-4xl font-black text-blue-700 dark:text-blue-600 mb-8">{t.missionTitle}</h2>
        <p className="text-2xl text-gray-400 font-light italic leading-loose">
          {t.missionSubtitle}
        </p>
      </section>

      {/* CTA Section */}
      <CTASection 
        title={language === 'bg' ? 'Доверете се на опита и професионализма' : 'Trust our experience and professionalism'}
        description={language === 'bg' 
          ? 'Ние сме тук за Вас 24 часа в денонощието, 7 дни в седмицата. Повикайте ни сега!'
          : 'We are here for you 24 hours a day, 7 days a week. Call us now!'}
        buttonText={language === 'bg' ? 'Обади се сега' : 'Call Now'}
      />
    </div>
  );
};

export default About;
