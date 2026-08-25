import React, { useState, useRef, useEffect } from 'react';
import { translations, examMetrics, globalHubs } from '../data/content';
import { Language } from '../types';
import {
  Globe2, TrendingUp, Lightbulb, DollarSign, PieChart,
  ChevronLeft, ChevronRight, Users, MapPin,
} from 'lucide-react';

interface MarketSectionProps {
  lang: Language;
}

export const MarketSection: React.FC<MarketSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeExam, setActiveExam] = useState('IELTS');
  const [hubIdx, setHubIdx] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  const selectedExam = examMetrics.find(e => e.category === activeExam) || examMetrics[0];
  const maxVol = 8;

  /* scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* trigger bar animations on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setBarsVisible(true);
    }, { threshold: 0.3 });
    if (barsRef.current) io.observe(barsRef.current);
    return () => io.disconnect();
  }, []);

  const hubPrev = () => setHubIdx(i => (i - 1 + globalHubs.length) % globalHubs.length);
  const hubNext = () => setHubIdx(i => (i + 1) % globalHubs.length);

  return (
    <section id="market" ref={sectionRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">

      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5" />
              {t.market.sectionTag}
            </div>
            <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
              {t.market.title}
            </h2>
            <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
              {t.market.subtitle}
            </p>
          </div>

          {/* TAM card */}
          <div className="reveal shrink-0 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left md:text-right card-hover" style={{ transitionDelay: '.18s' }}>
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">{t.market.tamTitle}</span>
            <div className="text-4xl font-black text-indigo-600 font-display mt-1">{t.market.tamValue}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-bold font-mono md:justify-end">
              <TrendingUp className="w-3.5 h-3.5" />
              +14% CAGR Global EdTech
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">

          {/* Left — bar chart */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm reveal-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 font-display">
                  {lang === 'ru' ? 'Объём экзаменов по категориям' : 'Exam Volume by Category'}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {lang === 'ru' ? 'Ежегодное число кандидатов (млн)' : 'Annual Candidate Volume (Millions) · 2025'}
                </p>
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-mono font-bold rounded-lg">2025 Data</span>
            </div>

            <div ref={barsRef} className="space-y-4">
              {examMetrics.map(exam => {
                const pct = (exam.volumeNumber / maxVol) * 100;
                const isActive = activeExam === exam.category;
                return (
                  <div key={exam.category} onClick={() => setActiveExam(exam.category)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer group
                      ${isActive ? 'bg-slate-900 border-slate-700 shadow-lg' : 'bg-slate-50 border-slate-100 hover:border-slate-300'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg text-white font-black text-xs flex items-center justify-center font-mono shrink-0"
                          style={{ backgroundColor: exam.highlightColor }}>
                          {exam.code}
                        </span>
                        <div>
                          <span className={`font-extrabold text-sm font-display ${isActive ? 'text-white' : 'text-slate-900'}`}>
                            {exam.category}
                          </span>
                          <span className={`text-xs ml-2 hidden sm:inline ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                            {exam.description}
                          </span>
                        </div>
                      </div>
                      <span className={`font-mono font-black text-lg ${isActive ? 'text-white' : 'text-slate-800'}`}>
                        {exam.volume}
                      </span>
                    </div>
                    {/* animated bar */}
                    <div className={`h-3 rounded-full overflow-hidden ${isActive ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: barsVisible ? `${pct}%` : '0%',
                          backgroundColor: exam.highlightColor,
                          transitionDelay: '0.1s',
                        }} />
                    </div>
                    {/* target audience on active */}
                    {isActive && (
                      <p className="text-xs text-slate-300 mt-2 font-mono slide-up">
                        🎯 {exam.targetAudience}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* selected exam photo strip */}
            {selectedExam.photo && (
              <div className="mt-6 rounded-2xl overflow-hidden flex flex-col sm:flex-row gap-4 bg-slate-900 p-4 items-center slide-up">
                <img src={selectedExam.photo} alt={selectedExam.category}
                  className="w-full sm:w-32 h-24 object-cover rounded-xl shrink-0"
                  referrerPolicy="no-referrer" />
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-400 font-mono uppercase">{selectedExam.category} Audience</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-mono">{selectedExam.volume}/yr</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{selectedExam.targetAudience}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedExam.description}</p>
                </div>
              </div>
            )}

            {/* key insight */}
            <div className="mt-5 p-5 rounded-2xl bg-indigo-50 border border-indigo-100 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/30">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-extrabold text-sm text-slate-900 font-display">{t.market.keyInsightBadge}</span>
                  <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-mono font-bold rounded-md">Proprietary Moat</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{t.market.keyInsight}</p>
              </div>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="lg:col-span-4 flex flex-col gap-4 reveal-right">
            {[
              { icon: <DollarSign className="w-5 h-5" />, bg: 'bg-indigo-50', iconColor: 'text-indigo-600', val: '$2B+', valColor: 'text-slate-900', label: lang === 'ru' ? 'Потенциал выручки' : 'Revenue Potential', sub: lang === 'ru' ? 'B2C и институциональный сегмент' : 'Across B2C & Institutional' },
              { icon: <PieChart className="w-5 h-5" />, bg: 'bg-emerald-50', iconColor: 'text-emerald-600', val: '85%', valColor: 'text-emerald-600', label: lang === 'ru' ? 'Валовая маржинальность' : 'Gross Margin', sub: lang === 'ru' ? 'Чистый AI SaaS продукт' : 'Pure automated AI SaaS' },
              { icon: <Globe2 className="w-5 h-5" />, bg: 'bg-blue-50', iconColor: 'text-blue-600', val: '50+', valColor: 'text-blue-600', label: lang === 'ru' ? 'Целевых стран' : 'Target Countries', sub: lang === 'ru' ? 'Глобальный немедленный спрос' : 'Immediate international reach' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm card-hover text-left"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.iconColor} flex items-center justify-center mb-3`}>{s.icon}</div>
                <span className={`text-3xl sm:text-4xl font-black font-display ${s.valColor}`}>{s.val}</span>
                <h4 className="text-sm font-extrabold text-slate-900 mt-1 font-display">{s.label}</h4>
                <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Global Hubs Carousel ── */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm reveal">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  {lang === 'ru' ? 'Глобальные хабы кандидатов' : 'Global Candidate Hubs'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {lang === 'ru' ? 'Где готовятся лучшие студенты' : 'Where Top Candidates Train Daily'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={hubPrev}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all hover:border-indigo-300">
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={hubNext}
                className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all hover:border-indigo-300">
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Desktop: all 4 | Mobile: carousel */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {globalHubs.map((hub, i) => (
              <div key={hub.city} onClick={() => setHubIdx(i)}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 card-hover
                  ${hubIdx === i ? 'ring-2 ring-indigo-600 border-indigo-400 shadow-lg' : 'border-slate-200 hover:border-indigo-200'}`}>
                <div className="h-40 overflow-hidden relative">
                  <img src={hub.photo} alt={hub.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                  <span className="absolute top-2.5 right-2.5 text-lg">{hub.flag}</span>
                  <div className="absolute bottom-2.5 left-2.5 text-white">
                    <h4 className="font-extrabold text-sm font-display">{hub.city}</h4>
                    <p className="text-[11px] text-slate-300">{hub.country}</p>
                  </div>
                </div>
                <div className="p-3 bg-white flex justify-between text-xs">
                  <span className="font-bold text-indigo-600 font-mono">{hub.exam}</span>
                  <span className="text-slate-500 font-mono flex items-center gap-1">
                    <Users className="w-3 h-3" />{hub.candidates}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile single card carousel */}
          <div className="sm:hidden">
            <div className="relative rounded-2xl overflow-hidden border border-indigo-200 shadow-lg">
              <div className="h-52 relative">
                <img src={globalHubs[hubIdx].photo} alt={globalHubs[hubIdx].city}
                  className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                <span className="absolute top-3 right-3 text-2xl">{globalHubs[hubIdx].flag}</span>
                <div className="absolute bottom-3 left-3 text-white">
                  <h4 className="font-extrabold text-lg font-display">{globalHubs[hubIdx].city}</h4>
                  <p className="text-sm text-slate-300">{globalHubs[hubIdx].country}</p>
                </div>
                <button onClick={hubPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button onClick={hubNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="p-4 flex justify-between text-sm bg-white">
                <span className="font-bold text-indigo-600 font-mono">{globalHubs[hubIdx].exam}</span>
                <span className="text-slate-500 font-mono flex items-center gap-1"><Users className="w-4 h-4" />{globalHubs[hubIdx].candidates}</span>
              </div>
            </div>
            <div className="flex justify-center gap-1.5 mt-3">
              {globalHubs.map((_, i) => (
                <button key={i} onClick={() => setHubIdx(i)}
                  className={`rounded-full transition-all ${i === hubIdx ? 'w-5 h-2 bg-indigo-600' : 'w-2 h-2 bg-slate-300'}`} />
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] text-slate-400 font-mono">
            Sources: IELTS.org (2025), ETS TOEIC Report, College Board SAT Data, GMAC GMAT Profile
          </p>
        </div>
      </div>
    </section>
  );
};
