import React, { useEffect, useRef, useState } from 'react';
import { translations } from '../data/content';
import { Language } from '../types';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onOpenTestModal: () => void;
}

const TYPEWRITER_PHRASES = [
  'IELTS Band 9.0',
  'TOEFL 118/120',
  'SAT 1580+',
  'TOEIC 990/990',
];

const HERO_ILLUSTRATION = '/illustrations/hero-learning.svg';

export const HeroSection: React.FC<HeroSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[phraseIdx];
    if (typing) {
      if (displayed.length < phrase.length) {
        typeRef.current = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 70);
      } else {
        typeRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else if (displayed.length > 0) {
      typeRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setPhraseIdx(i => (i + 1) % TYPEWRITER_PHRASES.length);
      setTyping(true);
    }
    return () => { if (typeRef.current) clearTimeout(typeRef.current); };
  }, [displayed, typing, phraseIdx]);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#FFFCF8]">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-40 right-[-100px] w-[420px] h-[420px] rounded-full animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-[-60px] w-[340px] h-[340px] rounded-full animate-float-med"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              {t.hero.badge}
            </div>

            <div className="reveal">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.06] font-display">
                {lang === 'ru' ? (
                  <>
                    Первый в мире<br />
                    <span className="brand-gradient-text animate-gradient-x">AI-тренажер</span>
                    {' '}для глобальных экзаменов
                  </>
                ) : (
                  <>
                    The first <span className="brand-gradient-text animate-gradient-x">AI-powered</span>
                    <br />global exam trainer
                  </>
                )}
              </h1>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-slate-400 text-sm font-medium">
                  {lang === 'ru' ? 'Цель:' : 'Target:'}
                </span>
                <span className="text-2xl font-black brand-gradient-text font-mono cursor-blink min-w-[160px]">
                  {displayed}
                </span>
              </div>
            </div>

            <p className="reveal text-lg text-slate-600 leading-relaxed max-w-2xl" style={{ transitionDelay: '.1s' }}>
              {t.hero.subtitle}
            </p>

            <div className="reveal grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ transitionDelay: '.15s' }}>
              {t.hero.pills.map((pill, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm card-hover overflow-hidden">
                  <div className="w-full h-24 rounded-xl mb-3 brand-gradient opacity-90 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_45%)]" />
                    <div className="absolute left-3 top-3 w-8 h-8 rounded-xl bg-white/20 backdrop-blur border border-white/20" />
                    <div className="absolute right-3 bottom-3 w-12 h-2 rounded-full bg-white/30" />
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{pill.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pill.desc}</p>
                </div>
              ))}
            </div>

            <div className="reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-3" style={{ transitionDelay: '.2s' }}>
              <a
                href="https://testtop.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm flex items-center justify-center gap-2.5 brand-glow transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4" />
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#modules"
                className="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:border-orange-300"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="reveal flex items-center gap-3 text-xs text-slate-500" style={{ transitionDelay: '.25s' }}>
              <div className="flex -space-x-2">
                {['AI', 'XP', '24/7'].map((label, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm brand-gradient text-white flex items-center justify-center text-[10px] font-black"
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {t.hero.statsValue}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative reveal-right">
            <div className="absolute inset-0 rounded-[60px] blur-3xl -z-10"
              style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.10) 0%, rgba(244,63,94,0.06) 60%, transparent 80%)' }} />

            <div className="relative w-full max-w-[420px]">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-8 rounded-[28px] overflow-hidden shadow-2xl border border-slate-100 bg-white p-3">
                  <div className="relative rounded-[22px] overflow-hidden bg-[#FFF7F1]">
                    <img src={HERO_ILLUSTRATION} alt="" className="w-full h-[360px] object-contain p-3" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-orange-100 text-[10px] font-bold text-slate-700 shadow-sm">
                      Real learning flow
                    </div>
                  </div>
                </div>
                <div className="col-span-4 space-y-3">
                  <div className="rounded-[24px] shadow-lg border border-slate-100 bg-white p-4 h-[170px] flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                        {lang === 'ru' ? 'Что получает студент' : 'What a learner gets'}
                      </p>
                      <h3 className="text-base font-black text-slate-900 font-display mt-2">
                        {lang === 'ru' ? 'Понятный маршрут к баллу' : 'A clear path to a higher score'}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-orange-100 overflow-hidden">
                        <div className="h-full w-[86%] rounded-full brand-gradient" />
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {lang === 'ru'
                          ? 'Диагностика, практика, фидбек и повторение в одном непрерывном цикле.'
                          : 'Diagnostic, practice, feedback and repetition in one continuous loop.'}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-[24px] shadow-lg border border-slate-100 bg-slate-900 p-4 h-[170px] flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                        {lang === 'ru' ? 'Результат' : 'Outcome'}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold">+1.0</span>
                    </div>
                    <img src={HERO_ILLUSTRATION} alt="" className="w-full h-24 object-contain opacity-90" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="col-span-12 rounded-[28px] overflow-hidden shadow-xl border border-slate-100 bg-white">
                  <div className="grid grid-cols-5 gap-3 p-3 items-center">
                    <div className="col-span-3">
                      <p className="text-xs uppercase tracking-wider font-bold text-slate-400 font-mono">
                        {lang === 'ru' ? 'Реальная учебная среда' : 'Real study environment'}
                      </p>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {lang === 'ru'
                          ? 'Мы показываем живую подготовку, а не отвлечённые технологические визуалы.'
                          : 'We show real study moments instead of abstract tech visuals.'}
                      </p>
                    </div>
                    <div className="col-span-2 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-2">
                      <div className="w-full h-24 rounded-xl brand-gradient relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.2),transparent_40%)]" />
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-black uppercase tracking-[0.2em]">
                          AI · IELTS · TOEIC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-5 top-8 hidden sm:block animate-float-slow">
                <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-2 w-36">
                  <img src={HERO_ILLUSTRATION} alt="" className="w-full h-28 rounded-2xl object-contain bg-[#FFF7F1]" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="absolute -right-6 bottom-8 hidden sm:block animate-float-med">
                <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-orange-100 p-2 w-40">
                  <div className="w-full h-32 rounded-2xl brand-gradient text-white flex items-center justify-center font-black">
                    {lang === 'ru' ? 'Путь без шума' : 'No visual noise'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
