import { useState } from 'react';

export default function Pricing() {
    const [distance, setDistance] = useState(30);
    const [wait, setWait] = useState(0);
    const [tariff, setTariff] = useState<'daily' | 'night'>('daily');

    const dayPrice = (distance * 0.85) + (wait * 0.25) + 1.85;
    const nightPrice = (distance * 0.95) + (wait * 0.30) + 1.95;
    const price = tariff === 'daily' ? dayPrice : nightPrice;

    return (
        <section className="flex items-center p-8 md:p-8 bg-gray-50 justify-center" id="prices">
            <div className="container flex flex-col gap-8 my-8 items-left justify-left">
                <div className="section-header ">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Колко струва</span>
                    <h2 className="text-3xl md:text-3xl font-bold mt-2 mb-8 text-brand">Цени и тарифи</h2>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Тарифа за превоз</h3>
                    <div className="space-y-4">
                        {[
                            { label: "Цена за 1км", daily: "0.85 EUR / 1.66 лв.", night: "0.95 EUR / 1.86 лв." },
                            { label: "Начална такса", daily: "1.85 EUR / 3.62 лв.", night: "1.95 EUR / 3.81 лв." },
                            { label: "Цена за повикване", daily: "Безплатно", night: "Безплатно" },
                            { label: "Престой за 1 мин.", daily: "0.25 EUR / 0.48 лв.", night: "0.30 EUR / 0.59 лв." },
                        ].map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100 pb-4">
                                <div className="font-semibold text-gray-700 mb-2">{item.label}</div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-gray-50 p-2 rounded">Дневна: <span className="font-bold text-brand">{item.daily}</span></div>
                                    <div className="bg-gray-50 p-2 rounded">Нощна: <span className="font-bold text-brand">{item.night}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs border border-blue-100 mt-6 bg-blue-50 p-4 text-blue-800 rounded-lg">* Дневната тарифа важи от 06:00 до 22:00 ч. Нощната тарифа важи от 22:00 до 06:00 ч.</p>
                </div>
                
                <div className="flex flex-col gap-6">
                    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Калкулатор на цена</h3>
                        <label className="block mb-2 font-medium">Разстояние: {distance} км</label>
                        <input type="range" min="1" max="100" value={distance} onChange={e => setDistance(Number(e.target.value))} className="w-full mb-6 bg-brand" />
                        
                        <label className="block mb-2 font-medium">Престой: {wait} мин.</label>
                        <input type="range" min="0" max="60" value={wait} onChange={e => setWait(Number(e.target.value))} className="w-full mb-6 bg-brand" />
                        
                        <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
                            <button onClick={() => setTariff('daily')} className={`flex-1 py-2 rounded-md font-semibold ${tariff === 'daily' ? 'bg-white shadow' : ''}`}>Дневна</button>
                            <button onClick={() => setTariff('night')} className={`flex-1 py-2 rounded-md font-semibold ${tariff === 'night' ? 'bg-white shadow' : ''}`}>Нощна</button>
                        </div>
                        
                        <div className="bg-brand text-yellow p-6 rounded-2xl text-center">
                            <div className="text-sm text-white font-bold">Приблизителна цена</div>
                            <div className="text-3xl md:text-4xl font-bold mt-1">{price.toFixed(2)} EUR</div>
                            <div className="text-md text-white opacity-80 mt-1">{(price * 1.95583).toFixed(2)} лв.</div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 italic">* Посочената цена е ориентировъчна и може да варира според трафика и точния маршрут.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-sm text-blue-800">
                        Всички наши автомобили са оборудвани с изправни фискални апарати. Цените са фиксирани и одобрени от Община Стара Загора.
                    </div>
                </div>
            </div>
            </div>
        </section>
    );
}
