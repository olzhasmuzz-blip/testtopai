import React from 'react';
import { Language } from '../types';
import { translations } from '../data/content';
import { Sparkles, Shield, FileCheck, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: Language;
  setLang: (l: Language) => void;
  onOpenTestModal: () => void;
}

const DOCS = [
  { file: '06_Opisanie_produkta.pdf',          ru: 'Описание продукта',              en: 'Product Description' },
  { file: '07_1_Publichnaya_oferta.pdf',        ru: 'Публичная оферта',               en: 'Public Offer Agreement' },
  { file: '07_2_Politika_konfidentsialnosti.pdf', ru: 'Политика конфиденциальности', en: 'Privacy Policy' },
  { file: '07_3_Politika_vozvrata.pdf',          ru: 'Политика возврата',             en: 'Refund Policy' },
  { file: '07_4_Protsedura_oplaty.pdf',          ru: 'Процедура оплаты',              en: 'Payment Procedure' },
  { file: '07_5_Sroki_sposoby_polucheniya.pdf',  ru: 'Сроки и способы получения',     en: 'Delivery Terms' },
  { file: '07_6_Khranenie_dokumentov.pdf',       ru: 'Хранение документов',           en: 'Document Storage' },
  { file: '07_7_Zashchita_dannykh.pdf',          ru: 'Защита данных',                 en: 'Data Protection' },
];

export const Footer: React.FC<FooterProps> = ({ lang, setLang, onOpenTestModal }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
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
                className={`px-3 py-1 text-xs rounded-lg font-bold font-mono transition-all ${
                  lang === 'ru' ? 'brand-gradient text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >Русский</button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs rounded-lg font-bold font-mono transition-all ${
                  lang === 'en' ? 'brand-gradient text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >English</button>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              {lang === 'ru' ? 'Платформа' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#problem" className="hover:text-white transition-colors">{t.nav.problem}</a></li>
              <li><a href="#app-showcase" className="hover:text-white transition-colors">{lang === 'ru' ? 'Скриншоты' : 'App Showcase'}</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">{lang === 'ru' ? 'Как работает' : 'How It Works'}</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">{t.nav.system}</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">{t.nav.modules}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
              <li>
                <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 font-semibold transition-colors flex items-center gap-1">
                  {lang === 'ru' ? 'Открыть платформу' : 'Open Platform'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 — Legal docs */}
          <div className="space-y-3 text-xs lg:col-span-2">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider font-mono text-[11px]">
              {lang === 'ru' ? 'Документы' : 'Legal Documents'}
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-slate-400">
              {DOCS.map(doc => (
                <li key={doc.file}>
                  <a
                    href={`/docs/${doc.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <FileCheck className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors shrink-0" />
                    {lang === 'ru' ? doc.ru : doc.en}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-1.5 mt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>SSL 256-bit · GDPR Compliant</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA strip */}
        <div className="py-8 border-b border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-lg font-display text-white">
              {lang === 'ru' ? 'Начни бесплатно прямо сейчас' : 'Start for free right now'}
            </p>
            <p className="text-sm text-slate-400 mt-0.5">
              {lang === 'ru' ? '5 минут — и ты знаешь свой уровень' : '5 minutes — and you know your level'}
            </p>
          </div>
          <a
            href="https://testtop.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-gradient text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 brand-glow hover:opacity-90 transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            {t.nav.startFree}
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TestTop AI Inc. All rights reserved.</p>
          <p className="text-[11px] text-slate-600 max-w-xl text-center md:text-right">
            Disclaimer: IELTS is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia. TestTop AI is an independent preparation system not affiliated with Cambridge Assessment.
          </p>
        </div>
      </div>
    </footer>
  );
};
