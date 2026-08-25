import React, { useState, useEffect } from 'react';
import { translations } from '../data/content';
import { Language } from '../types';
import { GraduationCap, Menu, X, Sparkles, Globe, ArrowRight } from 'lucide-react';

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
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#problem', label: t.nav.problem },
    { href: '#market', label: t.nav.market },
    { href: '#why-now', label: t.nav.whyNow },
    { href: '#system', label: t.nav.system },
    { href: '#modules', label: t.nav.modules },
    { href: '#comparison', label: t.nav.comparison },
    { href: '#traction', label: t.nav.traction },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#roadmap', label: t.nav.roadmap },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl tracking-tight font-display text-slate-900">
                TestTop<span className="text-indigo-600">.ai</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200/60 font-mono">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase font-mono">
              Global Exam Platform
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
          {navLinks.slice(0, 7).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-white rounded-full transition-all duration-150"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="px-3.5 py-1 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-full transition-all duration-150"
          >
            {t.nav.pricing}
          </a>
        </nav>

        {/* Actions & Language Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200/70"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="uppercase tracking-wider font-mono">{lang}</span>
          </button>

          {/* Practice CTA */}
          <button
            id="nav-cta-btn"
            onClick={onOpenTestModal}
            className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.nav.startFree}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-md"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-6 bg-white/95 backdrop-blur-lg border-b border-slate-200 mt-2 space-y-2 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTestModal();
            }}
            className="w-full mt-3 py-2.5 px-4 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-4 h-4" />
            {t.nav.startFree}
          </button>
        </div>
      )}
    </header>
  );
};
