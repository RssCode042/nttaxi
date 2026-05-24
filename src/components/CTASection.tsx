import React from 'react';
import { useAppContext } from '../context/AppContext';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ title, description, buttonText }) => {
  const { mainPhone } = useAppContext();

  return (
    <section className="bg-blue-700 dark:bg-blue-600 py-20 text-white mt-24">
      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left md:w-2/3">
            <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-xl text-blue-100 font-light max-w-2xl">
              {description}
            </p>
          </div>
          <div className="flex-shrink-0">
            <a 
              href={`tel:${mainPhone}`} 
              className="inline-block px-12 py-5 bg-[#F6C000] text-blue-700 dark:text-blue-600 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
