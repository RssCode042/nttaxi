import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-blue-700 dark:bg-blue-600 text-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
      
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-blue-200/80 text-sm mb-8">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={14} className="opacity-50" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-blue-100 max-w-2xl font-light leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
