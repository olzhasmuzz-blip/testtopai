import React from 'react';
import { Language } from '../types';
import { translations } from '../data/content';
import { Sparkles, Shield, FileCheck } from 'lucide-react';

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
              {/* logo icon matching brand */}
              <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center shadow-lg brand-glow shrink-0">
                <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                  <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60 10" />
                  <polyline points="13,20 18,26 28,14" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="28" cy="13" r="2.5" fill="white" />
                </svg>
              </div>
              <span className="font-black text-2xl tracking-tight font-display text-white">
                TestTop<span className="brand-gradient-text">.ai</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              {lang === 'ru'
                ? 'Первая в мире полностью автономная AI-платформа для подготовки к международным экзаменам IELTS, TOEIC, SAT и TOEFL. Мгновенная оценка с точностью 95%.'
                : "The world's first autonomous AI-driven global exam preparation engine. Real-time feedback and adaptive training for IELTS, TOEIC, SAT & TOEFL."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1 text-xs rounded-lg font-bold font-mono transition-colors ${
                  lang === 'ru' ? 'brand-gradient text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Русский
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs rounded-lg font-bold font-mono transition-colors ${
                  lang === 'en' ? 'brand-gradient text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Nav Col 1: Sections */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              {lang === 'ru' ? 'Платформа' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#problem" className="hover:text-white transition-colors">{t.nav.problem}</a></li>
              <li><a href="#app-showcase" className="hover:text-white transition-colors">{lang === 'ru' ? 'Платформа' : 'App Showcase'}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{lang === 'ru' ? 'Как работает' : 'How It Works'}</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">{t.nav.system}</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">{t.nav.modules}</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Plans */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              {lang === 'ru' ? 'Тарифы & Результаты' : 'Plans & Results'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#traction" className="hover:text-white transition-colors">{t.nav.traction}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">{t.nav.roadmap}</a></li>
              <li>
                <button
                  onClick={onOpenTestModal}
                  className="text-orange-400 hover:text-orange-300 hover:underline font-semibold cursor-pointer transition-colors"
                >
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

        {/* Bottom CTA strip */}
        <div className="py-8 border-b border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-lg font-display text-white">
              {lang === 'ru' ? 'Начни бесплатно прямо сейчас' : 'Start for free right now'}
            </p>
            <p className="text-sm text-slate-400 mt-0.5">
              {lang === 'ru' ? '5 минут — и ты знаешь свой уровень' : '5 minutes — and you know your level'}
            </p>
          </div>
          <button
            onClick={onOpenTestModal}
            className="brand-gradient text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 brand-glow hover:opacity-90 transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            {t.nav.startFree}
          </button>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 TestTop AI Inc. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-600 max-w-xl text-center md:text-right">
            Disclaimer: IELTS is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia. TestTop AI is an independent preparation system not affiliated with Cambridge Assessment.
          </p>
        </div>
      </div>
    </footer>
  );
};
