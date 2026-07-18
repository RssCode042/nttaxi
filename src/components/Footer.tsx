import  Facebook  from '../assets/Facebook.svg';
import  TikTok  from '../assets/TikTok.svg';
import  YouTube  from '../assets/YouTube.svg';
import  Instagram  from '../assets/Instagram.svg';



import logo from '../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white pt-16 pt-8 border-t border-gray-100">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <NavLink to="/" className="flex items-center"><img src={logo} alt="N6106 Logo" className="h-10 w-auto inline" /></NavLink>
                    <p className="text-gray-600 mb-6">Повече от 30 години доверие, сигурност и комфорт по пътищата на Стара Загора. Твоят лицензиран таксиметров партньор.</p>
                    <div className="flex gap-4">
                        <Link to="/" className="flex items-center">
                            <img src={Facebook} alt="N6106 Logo" className="h-8 w-auto inline text-brand" />
                        </Link>
                                <Link to="/" className="flex items-center">
                                    <img src={TikTok} alt="N6106 Logo" className="h-8 w-auto inline" />
                                </Link>
                                <Link to="/" className="flex items-center">
                                    <img src={YouTube} alt="N6106 Logo" className="h-8 w-auto inline" />
                                </Link>
                                <Link to="/" className="flex items-center">
                                    <img src={Instagram} alt="N6106 Logo" className="h-8 w-auto inline" />
                                </Link>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6">Контакт</h3>
                    <div className="space-y-4 text-gray-600">
                        <div className="flex gap-3"><MapPin className="text-blue-900 w-5 h-5 flex-shrink-0" /> <span>"бул. Цар Симеон Велики 1 Проектанска Организация ет.2 офис №21, 6000 гр. Стара Загора"</span></div>
                        <div className="flex gap-3"><Phone className="text-blue-900 w-5 h-5" /> <span>+359 42 6106</span></div>
                        <div className="flex gap-3"><Mail className="text-blue-900 w-5 h-5" /> <span>office@6106.bg</span></div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6">Меню</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li><Link to="/application" className="flex items-center gap-2 hover:text-blue-900">Приложение <span className="bg-teal-500 text-white text-[10px] px-2 py-0.5 rounded-full">Ново</span></Link></li>
                        <li><Link to="/services" className="hover:text-blue-900">Услуги</Link></li>
                        <li><Link to="#" className="hover:text-blue-900">За Нас</Link></li>
                        <li><Link to="#" className="hover:text-blue-900">Контакт</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-6">Услуги</h3>
                    <ul className="space-y-4 text-gray-600">
                        <li><Link to="/services" className="hover:text-blue-900">Градски превози</Link></li>
                        <li><Link to="/services" className="hover:text-blue-900">Междуградски трансфери</Link></li>
                        <li><Link to="/services" className="hover:text-blue-900">Корпоративни клиенти</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-100 py-8 mt-8 bg-[#1d1f2e]">
                <div className="container mx-auto px-4 flex items-center flex-col md:flex-row justify-between text-sm text-white">
                    <p className='text-gray-400'>© 2026 „Ен Такси Стара Загора“ ЕООД. ЕИК: 123748541 Всички права запазени.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 text-gray-400 ">
                        <Link className="hover:text-white" to="#">Общи условия</Link>
                        <Link className="hover:text-white" to="#">Политика за поверителност и бисквитки</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
