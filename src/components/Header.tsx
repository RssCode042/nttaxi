import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.svg';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-blue-900 pb-2 border-b-4 ${isActive ? 'border-blue-900' : 'border-transparent'}`;
  
  return (
    <header className="flex items-center justify-center px-6 py-5 bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between z-50">
      <NavLink to="/" className="flex items-center"><img src={logo} alt="N6106 Logo" className="h-10 w-auto inline" /></NavLink>
      <nav className="hidden md:flex gap-6 text-gray-700">
        <NavLink to="/" className={navLinkClass} >Начало</NavLink>
        <NavLink to="/application" className={navLinkClass}>Приложение</NavLink>
        <NavLink to="/services" className={navLinkClass} >Услуги</NavLink>
        <NavLink to="/about" className={navLinkClass} >За Нас</NavLink>
        <NavLink to="/contact" className={navLinkClass} >Контакт</NavLink>
      </nav>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800">Поръчай сега</a>

      {/* Mobile Hamburger */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-lg p-4 flex flex-col gap-4 md:hidden">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClass}>Начало</NavLink>
          <NavLink to="/application" onClick={() => setIsOpen(false)} className={navLinkClass}>Приложение</NavLink>
          <NavLink to="/services" onClick={() => setIsOpen(false)} className={navLinkClass}>Услуги</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className={navLinkClass} >За Нас</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className={navLinkClass} >Контакт</NavLink>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="bg-blue-900 text-white px-5 py-3 rounded-xl hover:bg-blue-800">Поръчай сега</a>
        </nav>
      )}
      </div>
    </header>
  );
}

