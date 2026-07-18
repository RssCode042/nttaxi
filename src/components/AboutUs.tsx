import AboutImage from '../assets/AboutUs.png';

export default function AboutUs() {

  const services = [
    {
      title: '30+',
      desc: 'Години опит',
    },
    {
      title: '350+',
      desc: 'Автомобила',
    },
    {
      title: '1мил.+',
      desc: 'Доволни клиенти',
    },
  ];

  return (    
    <section className="flex items-center justify-center px-6 py-5 ">
        <div className="container grid grid-col md:grid-cols-2 gap-8 md:justify-center items-center">
      <div className="max-auto text-center md:text-left ">
        <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase">За Нас</span>
        <h2 className="text-3xl md:text-3xl font-extrabold mt-4 leading-tight">30 години традиция и сигурност по улиците на Стара Загора</h2>
        <p className="mt-6 text-lg md:text-xl ">Основана в началото на 90-те години, Ен Такси започна своя път с една мисия – да предложи на жителите и гостите на Стара Загора сигурен, точен и достъпен транспорт. Днес, повече от три десетилетия по-късно, ние сме утвърден лидер с модерен автопарк и екип от професионалисти. За нас всяко пътуване не е просто дестинация, а отговорност към твоето доверие.</p>
        <div className="grid grid-cols-3 gap-8 w-fit mt-8">
          {services.map(({ title, desc }) => (
            <div key={title} className="card flex flex-col gap-2 items-center">
              
                <h3 className="text-3xl text-brand pt-2">{title}</h3>
                <p>{desc}</p>
              </div>
              
           
          ))}
        </div>
      </div>
      <div className="relative mt-8 md:mt-0 md:items-right">
          <img src={AboutImage} alt="Taxi" className="w-full " />
      </div>
      </div>
    </section>
  );
}
