import React, { useState, useEffect, useRef } from 'react';
import { translations, techPillars } from '../data/content';
import { Language } from '../types';
import {
  BrainCircuit, Mic, Sparkles, Cloud,
  CheckCircle2, Zap, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface WhyNowSectionProps { lang: Language; }

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  llms:            <BrainCircuit className="w-6 h-6" />,
  voice:           <Mic className="w-6 h-6" />,
  personalization: <Sparkles className="w-6 h-6" />,
  cloud:           <Cloud className="w-6 h-6" />,
};

export const WhyNowSection: React.FC<WhyNowSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setActive(i => (i + 1) % techPillars.length);
      setAnimKey(k => k + 1);
    }, 4500);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    if (autoRef.current) clearInterval(autoRef.current);
    setActive(i);
    setAnimKey(k => k + 1);
    startAuto();
  };

  const pillar = techPillars[active];

  return (
    <section id="why-now" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">

      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />{t.whyNow.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {t.whyNow.title}
          </h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
            {t.whyNow.subtitle}
          </p>
        </div>

        {/* ── Full-bleed hero pillar card ── */}
        <div className="reveal mb-10" style={{ transitionDelay: '.18s' }}>
          <div key={animKey} className="relative rounded-3xl overflow-hidden shadow-2xl h-[380px] sm:h-[440px] slide-up">
            {/* bg photo */}
            <img src={pillar.photo} alt={pillar.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-105 hover:scale-100"
              referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

            {/* content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 sm:p-12 text-white max-w-2xl">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40">
                    {PILLAR_ICONS[pillar.id]}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-mono font-bold text-indigo-300">
                    {pillar.metric} · {pillar.metricLabel}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display mb-3">{pillar.title}</h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{pillar.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                {pillar.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* nav arrows */}
            <button onClick={() => go((active - 1 + techPillars.length) % techPillars.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-20">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={() => go((active + 1) % techPillars.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-20">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* progress dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {techPillars.map((_, i) => (
                <button key={i} onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-8 h-2.5 bg-indigo-400' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* ── 4 Pillar selector tabs ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 reveal stagger" style={{ transitionDelay: '.22s' }}>
          {techPillars.map((p, i) => {
            const isActive = active === i;
            return (
              <button key={p.id} onClick={() => go(i)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer card-hover
                  ${isActive ? 'bg-slate-900 border-slate-700 shadow-xl text-white' : 'bg-slate-50 border-slate-200 hover:border-indigo-200 text-slate-800'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all
                  ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white border border-slate-200 text-indigo-600'}`}>
                  {PILLAR_ICONS[p.id]}
                </div>
                <h4 className="font-extrabold text-sm font-display">{p.title}</h4>
                <p className={`text-xs mt-1 ${isActive ? 'text-indigo-400' : 'text-indigo-600'} font-mono font-bold`}>{p.metric}</p>
                {/* progress bar */}
                <div className={`h-1 rounded-full mt-3 overflow-hidden ${isActive ? 'bg-slate-700' : 'bg-slate-200'}`}>
                  <div className={`h-full rounded-full transition-all duration-[2s] ${isActive ? 'bg-indigo-400 w-full' : 'w-0'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Banner ── */}
        <div className="reveal rounded-3xl border-2 border-indigo-600 bg-indigo-50/40 p-7 sm:p-10 shadow-sm" style={{ transitionDelay: '.26s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3 text-left">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">{t.whyNow.bannerHeadline}</h3>
              <p className="text-slate-600 text-sm sm:text-base">{t.whyNow.bannerSub}</p>
              <div className="flex flex-wrap gap-4 pt-2">
                {t.whyNow.bannerBullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />{b}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 flex items-center gap-8 justify-start lg:justify-end pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-indigo-200 lg:pl-8">
              <div className="text-left">
                <span className="block text-4xl font-black text-slate-900 font-display">{t.whyNow.marginalCost}</span>
                <span className="text-xs text-slate-500 font-mono">{t.whyNow.marginalCostLabel}</span>
              </div>
              <div className="w-px h-10 bg-indigo-200" />
              <div className="text-left">
                <span className="block text-4xl font-black text-indigo-600 font-display">{t.whyNow.scaleMultiplier}</span>
                <span className="text-xs text-slate-500 font-mono">{t.whyNow.scaleLabel}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
