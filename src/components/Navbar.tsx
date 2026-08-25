import React, { useState, useEffect } from 'react';
import { translations } from '../data/content';
import { Language } from '../types';
import { Menu, X, Sparkles, Globe, ArrowRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  onOpenTestModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onOpenTestModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#problem',  label: t.nav.problem },
    { href: '#showcase', label: lang === 'ru' ? 'Платформа' : 'Platform' },
    { href: '#system',   label: t.nav.system },
    { href: '#modules',  label: t.nav.modules },
    { href: '#traction', label: t.nav.traction },
    { href: '#pricing',  label: t.nav.pricing },
    { href: '#roadmap',  label: t.nav.roadmap },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/96 backdrop-blur-md shadow-sm border-b border-orange-100 py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl brand-gradient flex items-center justify-center shadow-md brand-glow group-hover:scale-105 transition-transform duration-200 overflow-hidden">
            {/* SVG logo mark matching the brand icon */}
            <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
              <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60 10" />
              <polyline points="13,20 18,26 28,14" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="28" cy="13" r="2.5" fill="white" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight font-display text-slate-900">
                TestTop<span className="brand-gradient-text">.ai</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-orange-50 text-orange-600 rounded-md border border-orange-200/60 font-mono">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase font-mono">
              IELTS AI Trainer
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80">
          {navLinks.map(item => (
            <a key={item.href} href={item.href}
              className="px-3.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white rounded-full transition-all duration-150">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="uppercase tracking-wider font-mono">{lang}</span>
          </button>
          <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white brand-gradient rounded-xl brand-glow neon-pulse transition-all hover:scale-[1.03] active:scale-[0.98]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.startFree}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-md">{lang.toUpperCase()}</button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-orange-50 rounded-lg transition-colors">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/97 backdrop-blur-lg border-b border-orange-100 mt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map(item => (
              <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-orange-50 rounded-lg transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full mt-3 py-3 px-4 text-center text-sm font-bold text-white brand-gradient rounded-xl flex items-center justify-center gap-2 brand-glow">
            <Sparkles className="w-4 h-4" />
            {t.nav.startFree}
          </a>
        </div>
      )}
    </header>
  );
};
