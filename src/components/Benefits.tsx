import {
  Shield, TimerReset, Euro
} from 'lucide-react';



export default  function Benefits() {
  const benefits = [
    {
      Icon: Shield,
      title: 'Сигурност и Безопасност',
      desc: 'Tехнически прегледани автомобили и опитни шофьори без нарушения.',
    },
    {
      Icon: TimerReset,
      title: 'Точност и Бързина',
      desc: 'Уважаваме твоето време. Пристигаме точно тогава, когато сме обещали.',
    },
    {
      Icon: Euro,
      title: 'Прозрачни цени',
      desc: 'Без скрити такси, ясна тарифа на километър. Платете с карта или в брой.',
    },
  ];

  return (
    <section className="section flex items-center justify-center px-6 py-5 " id="services">
      <div className="container flex flex-col gap-8 my-8 items-left justify-left">
        <div className="section-header ">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs  font-bold uppercase">Защо нас</span>
          <h2 className="text-3xl mt-2">Защо да изберете нас</h2>
        </div>
        <div className="services-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map(({ Icon, title, desc }) => (
            <div key={title} className="service-card bg-white flex flex-row gap-4 px-4 py-4 items-start rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="service-icon bg-yellow rounded-md">
                <Icon className="text-brand m-4  bg-yellow rounded-md" size={24}/>
              </div>
              <div className="title flex flex-col items-left justify-left gap-4">
                <h3 className="text-2xl pt-2">{title}</h3>
                <p>{desc}</p>
                
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}