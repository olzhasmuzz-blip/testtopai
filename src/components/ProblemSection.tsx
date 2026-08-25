import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../data/content';
import { Language } from '../types';
import {
  AlertTriangle, DollarSign, BookOpen, Clock,
  MicOff, WifiOff, Quote, CheckCircle2, XCircle,
  TrendingDown, Calculator, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface ProblemSectionProps { lang: Language; }

const PROBLEM_VISUAL = '/illustrations/problem-overload.svg';

const SEVERITY_COLORS: Record<number, string> = {
  95: '#EF4444',
  90: '#F97316',
  85: '#F59E0B',
  80: '#EAB308',
  75: '#84CC16',
};

const getSeverityColor = (s: number) => {
  const keys = Object.keys(SEVERITY_COLORS).map(Number).sort((a, b) => b - a);
  for (const k of keys) {
    if (s >= k) return SEVERITY_COLORS[k];
  }
  return '#84CC16';
};

export const ProblemSection: React.FC<ProblemSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeIdx, setActiveIdx] = useState(0);
  const [mode, setMode] = useState<'cards' | 'calc'>('cards');
  const [tutorHours, setTutorHours] = useState(30);
  const [hourlyRate, setHourlyRate] = useState(40);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const items = t.problem.items;
  const active = items[activeIdx];

  const solutionMap: Record<string, { ai: string; savings: string }> = {
    tutors: { ai: lang === 'ru' ? 'AI-тренер 24/7 за $10-20/мес с безлимитной практикой.' : 'AI coach 24/7 for $10-20/mo with unlimited practice loops.', savings: lang === 'ru' ? 'Экономия до 90%' : 'Up to 90% cost saved' },
    static: { ai: lang === 'ru' ? 'Динамические задания под уровень и цель ученика.' : 'Dynamic tasks tuned to the learner’s level and target.', savings: lang === 'ru' ? '100% адаптивный план' : '100% adaptive path' },
    feedback: { ai: lang === 'ru' ? 'Мгновенная проверка эссе за секунды, а не за дни.' : 'Instant essay feedback in seconds, not days.', savings: lang === 'ru' ? 'В 100× быстрее' : '100× faster feedback' },
    eval: { ai: lang === 'ru' ? 'Беспристрастная оценка по 4 критериям Cambridge.' : 'Unbiased scoring across all 4 Cambridge criteria.', savings: lang === 'ru' ? '95% точность' : '95% band accuracy' },
    offline: { ai: lang === 'ru' ? 'Практика в браузере и на смартфоне без привязки к месту.' : 'Practice anywhere on mobile or desktop.', savings: lang === 'ru' ? 'Доступ 24/7/365' : '24/7 global access' },
  };

  const iconMap: Record<string, React.ReactNode> = {
    tutors: <DollarSign className="w-5 h-5" />,
    static: <BookOpen className="w-5 h-5" />,
    feedback: <Clock className="w-5 h-5" />,
    eval: <MicOff className="w-5 h-5" />,
    offline: <WifiOff className="w-5 h-5" />,
  };

  const totalLegacy = tutorHours * hourlyRate;
  const testTopCost = 40;
  const savings = Math.max(0, totalLegacy - testTopCost);
  const pct = Math.round((savings / (totalLegacy || 1)) * 100);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right') ?? [];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    setActiveIdx(i);
    setAnimKey(k => k + 1);
  };

  const prev = () => goTo((activeIdx - 1 + items.length) % items.length);
  const next = () => goTo((activeIdx + 1) % items.length);

  return (
    <section id="problem" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />{lang === 'ru' ? 'Что мешает студенту расти' : t.problem.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight font-display" style={{ transitionDelay: '.08s' }}>
            {lang === 'ru'
              ? <>Старая подготовка <span className="text-rose-500">съедает время и деньги</span></>
              : <>Global exam prep is <span className="text-rose-500">fundamentally broken</span></>}
          </h2>
          <p className="reveal text-slate-500 text-base leading-relaxed" style={{ transitionDelay: '.14s' }}>
            {lang === 'ru'
              ? 'Мы показываем не абстрактный рынок, а реальные барьеры, с которыми сталкивается сам ученик.'
              : t.problem.subtitle}
          </p>
        </div>

        <div className="reveal flex justify-center mb-10" style={{ transitionDelay: '.18s' }}>
          <div className="inline-flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setMode('cards')}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'cards' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {lang === 'ru' ? 'Проблемы ученика' : 'Market Pain Points'}
            </button>
            <button
              type="button"
              onClick={() => setMode('calc')}
              className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-all ${mode === 'calc' ? 'brand-gradient text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Calculator className="w-4 h-4" />
              {lang === 'ru' ? 'Посчитать выгоду' : 'Savings Calculator'}
            </button>
          </div>
        </div>

        {mode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 reveal-left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#FFF7F1] border border-orange-100 min-h-[420px] flex items-center justify-center">
                <img
                  key={animKey}
                  src={PROBLEM_VISUAL}
                  alt={lang === 'ru' ? 'Проблемы подготовки' : 'Study pain points'}
                  className="w-full h-full object-contain p-5"
                  style={{ animation: 'slide-up .5s cubic-bezier(.16,1,.3,1)' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 border border-white/60">
                    <span className="text-xs font-mono font-bold text-slate-700">Pain Level</span>
                    <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full rounded-full bar-fill" style={{ width: `${active.severity}%`, backgroundColor: getSeverityColor(active.severity) }} />
                    </div>
                    <span className="text-xs font-black text-slate-900 font-mono">{active.severity}%</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="p-4 rounded-2xl bg-white/95 backdrop-blur border border-white/60 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/90 text-white text-[10px] font-bold font-mono uppercase">{active.flaw}</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 font-display leading-tight">{active.title}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">{active.description}</p>
                  </div>
                </div>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                  <ChevronRight className="w-4 h-4 text-slate-700" />
                </button>
              </div>

              <div className="mt-6 p-5 rounded-2xl bg-orange-50 border-l-4 border-orange-500">
                <Quote className="w-7 h-7 text-orange-300 mb-2" />
                <p className="text-slate-800 font-bold text-sm italic leading-snug">{t.problem.quote}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-orange-600 font-bold font-mono">
                  <TrendingDown className="w-3.5 h-3.5" />Legacy EdTech Bottleneck · 2026
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3 reveal-right">
              {items.map((item, i) => {
                const isActive = i === activeIdx;
                const color = getSeverityColor(item.severity);
                return (
                  <button key={item.id} type="button" onClick={() => goTo(i)} className="w-full text-left">
                    <div
                      className={`relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer card-hover
                        ${isActive ? 'bg-slate-900 border-slate-700 shadow-xl text-white' : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'}`}
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: color }} />}
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all
                            ${isActive ? 'text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600'}`}
                          style={isActive ? { background: 'linear-gradient(135deg, #F97316, #F43F5E)' } : {}}
                        >
                          {iconMap[item.id]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-extrabold text-sm sm:text-base">{item.title}</span>
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase font-mono ${isActive ? 'bg-white/10 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>{item.flaw}</span>
                          </div>
                          <p className={`text-xs leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>{item.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1.5 rounded-full bg-slate-200/50 overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${item.severity}%`, backgroundColor: color, opacity: isActive ? 1 : 0.5 }} />
                            </div>
                            <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>{item.severity}%</span>
                          </div>
                        </div>
                        <div className="shrink-0 mt-0.5">
                          {isActive ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400/60" />}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {mode === 'calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal slide-up min-h-[560px]">
            <div className="lg:col-span-4">
              <div className="rounded-3xl overflow-hidden border border-orange-100 bg-[#FFF7F1] shadow-lg p-4 h-full">
                <img
                  src={PROBLEM_VISUAL}
                  alt={lang === 'ru' ? 'Почему студент теряет деньги' : 'Why learners lose money'}
                  className="w-full h-64 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4 p-4 rounded-2xl bg-white border border-orange-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold">
                    {lang === 'ru' ? 'Смысл калькулятора' : 'Calculator purpose'}
                  </p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {lang === 'ru'
                      ? 'Показывает, сколько стоит старая модель подготовки и сколько остаётся у ученика после перехода на AI.'
                      : 'Shows what the old prep model costs and how much the learner saves after switching to AI.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-8 shadow-sm">
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display">
                    {lang === 'ru' ? 'Калькулятор личной экономии' : 'Personal ROI Calculator'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    {lang === 'ru' ? 'Сравните стоимость репетиторов с TestTop AI' : 'Compare private tutor costs vs TestTop AI'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{lang === 'ru' ? 'Часов подготовки:' : 'Prep hours needed:'}</span>
                    <span className="brand-gradient-text font-mono">{tutorHours} {lang === 'ru' ? 'ч' : 'hrs'}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={5}
                    value={tutorHours}
                    onChange={e => setTutorHours(+e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
                    style={{ accentColor: '#F97316' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono"><span>10 (Sprint)</span><span>40 (Average)</span><span>80 (Intensive)</span></div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{lang === 'ru' ? 'Ставка репетитора:' : 'Tutor rate / hr:'}</span>
                    <span className="brand-gradient-text font-mono">${hourlyRate}/hr</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    step={5}
                    value={hourlyRate}
                    onChange={e => setHourlyRate(+e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
                    style={{ accentColor: '#F97316' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono"><span>$20 Novice</span><span>$50 Standard</span><span>$100 Ex-examiner</span></div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-[10px] text-slate-500 font-mono block mb-1">{lang === 'ru' ? 'Репетитор' : 'Private Tutor'}</span>
                    <span className="text-2xl font-black text-rose-500 font-display">${totalLegacy}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 shadow-sm">
                    <span className="text-[10px] text-orange-600 font-mono block mb-1">TestTop Pro (2 мес)</span>
                    <span className="text-2xl font-black brand-gradient-text font-display">${testTopCost}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-500 border border-emerald-600 shadow-sm">
                    <span className="text-[10px] text-emerald-100 font-mono block mb-1">{lang === 'ru' ? 'Экономия' : 'You Save'}</span>
                    <span className="text-2xl font-black text-white font-display">${savings}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                  <span className="text-sm font-bold">{lang === 'ru' ? 'Вы экономите' : 'Total savings'}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-3 rounded-full bg-slate-700 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-400 bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-lg font-black text-emerald-400 font-mono">{pct}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
