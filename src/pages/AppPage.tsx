
import React from 'react';
import { Smartphone, MapPin, Navigation, Calculator, CheckCircle2, Star, Shield, Zap, Clock, Smartphone as PhoneIcon, Headset } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';

const AppPage: React.FC = () => {
  const { language, translations: currentTranslations, links, taxiNumbers } = useAppContext();
  const t = currentTranslations[language];
  const navT = t.nav;
  const heroT = t.hero;

  const steps = [
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "1. Проверка на местоположението",
      desc: "Приложението автоматично разпознава къде се намирате за бърза поръчка.",
      image: "/src/assets/images/phone01.png"
    },
    {
      icon: <Navigation className="w-8 h-8" />,
      title: "2. Избор на дестинация",
      desc: "Въведете адреса, до който искате да стигнете, или го изберете на картата.",
      image: "/src/assets/images/phone02.png"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "3. Обобщение и филтри",
      desc: "Вижте приблизителната цена и изберете екстри: Комби, ПОС терминал, повече багаж, чужди езици или превоз с куче.",
      image: "/src/assets/images/phone01.png"
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "4. Покана и Потвърждение",
      desc: "Изпратете поръчката и получете незабавно потвърждение от най-близкия шофьор.",
      image: "/src/assets/images/phone02.png"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "5. Завършен курс и оценка",
      desc: "След пристигане оценете шофьора, за да ни помогнете да поддържаме високо качество.",
      image: "/src/assets/images/phone01.png"
    }
  ];

  const advantages = [
    { icon: <Zap />, title: "Светкавична поръчка", desc: "Без чакане на оператор, поръчвате с два клика." },
    { icon: <Shield />, title: "Сигурност", desc: "Виждате данните на автомобила и шофьора в реално време." },
    { icon: <Clock />, title: "Точност", desc: "Следите точно след колко минути таксито ще е при Вас." },
    { icon: <PhoneIcon />, title: "Интуитивен интерфейс", desc: "Лесен за работа дизайн, оптимизиран за всеки смартфон." }
  ];

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>Мобилно Приложение | EH TAXI 6106</title>
        <meta name="description" content="Поръчайте такси бързо и лесно през нашето мобилно приложение." />
      </Helmet>

      {/* Hero Header - Same style as home Hero.tsx */}
      <section className="relative h-auto lg:h-[650px] w-full flex items-center overflow-hidden py-20 lg:py-0">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/40 dark:bg-[#000000]/60 z-10 transition-colors" />
        
        {/* Background Image */}
        <img
          src={heroT.assets?.heroImage || "/src/assets/images/Hero.png"}
          alt="Taxi Service BG"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="mx-auto px-4 max-w-[1200px] relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#F6C000] text-blue-700 dark:text-blue-600 text-xs font-black tracking-widest rounded-full">Бъдещето е тук</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg text-center lg:text-left">
              Вашето такси е на <span className="text-[#F6C000]">един клик</span> разстояние
            </h1>
            <p className="text-xl text-gray-100 dark:text-gray-200 font-medium max-w-lg drop-shadow-md text-center lg:text-left mx-auto lg:mx-0">
              С мобилното приложение на EH TAXI 6106 поръчвате бързо, следите колата си в реално време и плащате сигурно.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 lg:gap-8">
            <div className="relative w-48 md:w-64 lg:w-80 h-auto">
               {/* Floating image without frame */}
               <img 
                 src="/src/assets/images/phone01.png" 
                 alt="Taxi App" 
                 className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
               />
            </div>
            
            <div className="flex flex-col gap-3 w-full max-w-md">
               <h3 className="text-white font-bold text-center text-lg lg:text-xl mb-1 drop-shadow-sm">Изтегли приложението</h3>
               <div className="flex flex-row flex-wrap gap-3 items-center justify-center">
                 <a href={links?.appleStore || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-lg lg:rounded-xl overflow-hidden">
                    <img src="/src/assets/images/apple.svg" alt="App Store" className="h-10 md:h-12 lg:h-14 w-auto" />
                 </a>
                 <a href={links?.googlePlay || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-lg lg:rounded-xl overflow-hidden">
                    <img src="/src/assets/images/google.svg" alt="Google Play" className="h-10 md:h-12 lg:h-14 w-auto" />
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-white dark:bg-black/40 transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">Защо да изберете приложението ни?</h2>
        </div>
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-700 dark:hover:border-blue-600 transition-all hover:shadow-md group"
            >
              <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm mb-6 bg-white dark:bg-white/5 transition-colors group-hover:bg-blue-700 dark:group-hover:bg-blue-600 group-hover:text-white">
                {adv.icon}
              </div>
              <h4 className="text-xl font-bold text-blue-700 dark:text-blue-600 mb-3">{adv.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works - Steps */}
      <section className="py-24 bg-gray-50 dark:bg-black/20 transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 mb-20">
          <h2 className="text-3xl font-bold dark:text-white tracking-tight">Само 5 стъпки до Вашата дестинация</h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 space-y-32">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative group max-w-sm">
                  {/* Floating image without frame */}
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-auto drop-shadow-2xl transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="w-14 h-14 bg-blue-50 dark:bg-white/10 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-600 shadow-sm">
                  {step.icon}
                </div>
                <h4 className="text-3xl font-black text-blue-700 dark:text-blue-600 tracking-tight">{step.title}</h4>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
                  {step.desc}
                </p>
                {idx === 2 && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    {['Комби', 'ПОС Терминал', 'Багаж', 'Езици', 'Домашен любимец'].map((filter, i) => (
                      <span key={i} className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 shadow-sm">
                        {filter}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final - Unified Style */}
      <section className="py-24 bg-blue-700 dark:bg-blue-600 text-white mt-0 transition-colors">
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mobile App Column */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Готови ли сте за път?</h2>
              
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-blue-50/10 rounded-xl text-white">
                    <Smartphone size={32} />
                 </div>
                 <h3 className="text-2xl font-bold">Изтегли приложението</h3>
              </div>
              
              <p className="text-lg text-gray-200 font-light leading-relaxed">
                 Направете Вашето пътуване по-приятно и организирано. Изтеглете приложението днес и поръчвайте само с няколко докосвания.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={links?.appleStore || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-xl overflow-hidden">
                  <img src="/src/assets/images/apple.svg" alt="App Store" className="h-14 w-auto drop-shadow-lg" />
                </a>
                <a href={links?.googlePlay || "#"} target="_blank" rel="noopener noreferrer" className="transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 duration-300 rounded-xl overflow-hidden">
                  <img src="/src/assets/images/google.svg" alt="Google Play" className="h-14 w-auto drop-shadow-lg" />
                </a>
              </div>
            </div>

            {/* Phone Image Column */}
            <div className="flex justify-center items-center">
              <div className="relative max-w-sm w-full">
                <img 
                  src="/src/assets/images/phone01.png" 
                  alt="EH Taxi App" 
                  className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppPage;

