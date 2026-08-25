import React from 'react';
import { Language } from '../types';
import { translations } from '../data/content';
import { GraduationCap, Sparkles, Globe, Heart, Shield, FileCheck, Mail } from 'lucide-react';

interface FooterProps {
  lang: Language;
  setLang: (l: Language) => void;
  onOpenTestModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setLang, onOpenTestModal }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-black text-2xl tracking-tight font-display text-white">
                TestTop<span className="text-indigo-400">.ai</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              {lang === 'ru'
                ? 'Первая в мире полностью автономная AI-платформа для подготовки к международным экзаменам IELTS, TOEIC, SAT и TOEFL. Мгновенная оценка с точностью 95%.'
                : 'The world’s first autonomous AI-driven global exam preparation engine. Real-time feedback and adaptive training for IELTS, TOEIC, SAT & TOEFL.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1 text-xs rounded-lg font-bold font-mono transition-colors ${
                  lang === 'ru' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Русский
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs rounded-lg font-bold font-mono transition-colors ${
                  lang === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Nav Col 1: Sections */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              {lang === 'ru' ? 'Секции лендинга' : 'Landing Sections'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#problem" className="hover:text-white transition-colors">{t.nav.problem}</a></li>
              <li><a href="#market" className="hover:text-white transition-colors">{t.nav.market}</a></li>
              <li><a href="#why-now" className="hover:text-white transition-colors">{t.nav.whyNow}</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">{t.nav.system}</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">{t.nav.modules}</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Platform */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              {lang === 'ru' ? 'Модули & Цены' : 'Modules & Plans'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#comparison" className="hover:text-white transition-colors">{t.nav.comparison}</a></li>
              <li><a href="#traction" className="hover:text-white transition-colors">{t.nav.traction}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">{t.nav.roadmap}</a></li>
              <li>
                <button onClick={onOpenTestModal} className="text-indigo-400 hover:underline font-semibold cursor-pointer">
                  {lang === 'ru' ? 'Пройти AI-тест' : 'Take AI Test'}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 3: Legal & Trust */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              Security & Legal
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /> SSL 256-bit Encryption</li>
              <li className="flex items-center gap-1.5"><FileCheck className="w-3.5 h-3.5 text-blue-400" /> GDPR & Privacy Compliant</li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Architecture</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 TestTop AI Inc. Inspired by goprep.gg and ielts.gg. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-600 max-w-xl text-center md:text-right">
            Disclaimer: IELTS is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia. TestTop AI is an independent preparation system not affiliated with Cambridge Assessment.
          </p>
        </div>
      </div>
    </footer>
  );
};
