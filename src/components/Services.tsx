import {
  Building2, Road, Handshake, ChevronRight,
} from 'lucide-react';



export default  function Services() {
  const services = [
    {
      Icon: Building2,
      title: 'Градски превози',
      desc: 'Денонощно покритие на цяла Стара Загора и околните квартали. Бърза реакция и шофьори, които познават града перфектно.',
    },
    {
      Icon: Road,
      title: 'Междуградски трансфери',
      desc: 'Професионални пътувания до летища (София, Пловдив, Бургас) и всяка точка на България на фиксирани и прозрачни цени.',
    },
    {
      Icon: Handshake,
      title: 'Корпоративни клиенти',
      desc: 'Договори за фирмено обслужване, превоз на служители, събития и възможност за отложено плащане с фактури.',
    },
  ];

  return (
    <section className="section flex items-center justify-center px-6 py-5 " id="services">
      <div className="container flex flex-col gap-8 my-8 items-left justify-left">
        <div className="section-header ">
          <span className="bg-accent text-white px-3 py-1 rounded-full text-xs  font-bold uppercase">Услуги</span>
          <h2 className="text-3xl mt-2">Нашите услуги</h2>
        </div>
        <div className="services-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map(({ Icon, title, desc }) => (
            <div key={title} className="service-card bg-white flex flex-row gap-4 px-4 py-4 items-start rounded-xl border border-border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="service-icon bg-yellow rounded-md">
                <Icon className="text-brand m-4  bg-yellow rounded-md" size={20}/>
              </div>
              <div className="title flex flex-col items-left justify-left gap-4">
                <h3 className="text-2xl pt-2">{title}</h3>
                <p>{desc}</p>
                <a href="#" className="block text-heading text-right hover:text-brand flex items-center gap-2 mt-2">
                  Прочети повече
                  <ChevronRight className="hover:-translate-x-1 duration-300" size={20} />
                </a>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}