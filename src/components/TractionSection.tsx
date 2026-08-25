import React, { useState, useEffect, useRef } from 'react';
import {
  translations, tractionMetrics, userEngagementStats,
  aiEngineStats, testimonials, liveFeedActivities,
} from '../data/content';
import { Language } from '../types';
import {
  TrendingUp, Users, Bot, CheckCircle,
  Star, GraduationCap, ChevronLeft, ChevronRight,
} from 'lucide-react';

interface TractionSectionProps { lang: Language; }

/* animated counter hook */
function useCounter(target: number, running: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!running) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [running, target]);
  return val;
}

const METRIC_ICONS: Record<string, React.ReactNode> = {
  Users:       <Users className="w-5 h-5 text-rose-600" />,
  TrendingUp:  <TrendingUp className="w-5 h-5 text-indigo-600" />,
  Bot:         <Bot className="w-5 h-5 text-emerald-600" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-amber-600" />,
};

export const TractionSection: React.FC<TractionSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [feedIdx, setFeedIdx] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  const [counting, setCounting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  /* live feed ticker */
  useEffect(() => {
    const id = setInterval(() => setFeedIdx(i => (i + 1) % liveFeedActivities.length), 3500);
    return () => clearInterval(id);
  }, []);

  /* scroll-reveal */
  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* trigger counters */
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setCounting(true);
    }, { threshold: 0.4 });
    if (countersRef.current) io.observe(countersRef.current);
    return () => io.disconnect();
  }, []);

  const testimonialsPerPage = 3;
  const pages = Math.ceil(testimonials.length / testimonialsPerPage);
  const visibleTestimonials = testimonials.slice(tIdx * testimonialsPerPage, (tIdx + 1) * testimonialsPerPage);

  const countVals = [2500, 85, 92, 78];
  const suffixes = ['+', '%', '%', '%'];

  const c0 = useCounter(countVals[0], counting);
  const c1 = useCounter(countVals[1], counting);
  const c2 = useCounter(countVals[2], counting);
  const c3 = useCounter(countVals[3], counting);
  const counts = [c0, c1, c2, c3];

  return (
    <section id="traction" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />{t.traction.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {t.traction.title}
          </h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
            {t.traction.subtitle}
          </p>
        </div>

        {/* ── Animated counter metrics ── */}
        <div ref={countersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12 reveal stagger" style={{ transitionDelay: '.18s' }}>
          {tractionMetrics.map((m, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-indigo-300 transition-all card-hover text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  {METRIC_ICONS[m.iconName]}
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                  {m.trend}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {i === 0 ? `${counts[i].toLocaleString()}${suffixes[i]}` : `${counts[i]}${suffixes[i]}`}
              </div>
              <h4 className="font-extrabold text-sm text-slate-800 mt-1 font-display">{m.label}</h4>
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-200 font-mono">{m.subtext}</p>
            </div>
          ))}
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-12">
          {/* User engagement */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm reveal-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-extrabold text-lg text-slate-900 font-display">
                {lang === 'ru' ? 'Вовлечённость пользователей' : 'User Engagement'}
              </h3>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">Last 30 days</span>
            </div>
            <div className="space-y-3">
              {userEngagementStats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <span className="text-sm font-semibold text-slate-700">{stat.label}</span>
                  <span className="font-mono font-black text-base text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI performance */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm reveal-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-extrabold text-lg text-slate-900 font-display">
                {lang === 'ru' ? 'Производительность AI' : 'AI Engine Performance'}
              </h3>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Real-time</span>
            </div>
            <div className="space-y-3">
              {aiEngineStats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                  <span className="text-sm font-semibold text-slate-700">{stat.label}</span>
                  <span className="font-mono font-black text-base text-indigo-600">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials carousel ── */}
        <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-9 shadow-xl reveal" style={{ transitionDelay: '.2s' }}>
          {/* header + live feed */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 border-b border-slate-800 pb-5">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Student Network
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display">
                {lang === 'ru' ? 'Истории успеха выпускников TestTop' : 'Verified Candidate Admissions'}
              </h3>
            </div>
            {/* live ticker */}
            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono shrink-0 max-w-sm">
              <span className="text-lg">{liveFeedActivities[feedIdx].flag}</span>
              <span className="font-bold text-slate-200 truncate">{liveFeedActivities[feedIdx].user}</span>
              <span className="text-slate-400 truncate">{liveFeedActivities[feedIdx].action}</span>
              <span className="font-bold text-emerald-400 shrink-0">{liveFeedActivities[feedIdx].score}</span>
            </div>
          </div>

          {/* testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {visibleTestimonials.map((item, i) => (
              <div key={`${tIdx}-${i}`} className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 hover:border-indigo-500/70 transition-colors flex flex-col justify-between card-hover"
                style={{ animation: 'slide-up .4s cubic-bezier(.16,1,.3,1)', animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold font-mono">{item.score}</span>
                    {item.university && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold border border-indigo-500/30">
                        <GraduationCap className="w-3 h-3" />{item.university}
                      </span>
                    )}
                  </div>
                  {/* stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">«{item.comment}»</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                  <img src={item.avatar} alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/40"
                    referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-bold text-xs text-white font-display flex items-center gap-1">
                      {item.name} {item.flag && <span>{item.flag}</span>}
                    </h5>
                    <p className="text-[10px] text-slate-400">{item.role}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md shrink-0">
                    {item.daysToTarget}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* carousel controls */}
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setTIdx(i => (i - 1 + pages) % pages)}
              className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)}
                className={`rounded-full transition-all ${i === tIdx ? 'w-6 h-2.5 bg-indigo-400' : 'w-2.5 h-2.5 bg-slate-600 hover:bg-slate-500'}`} />
            ))}
            <button onClick={() => setTIdx(i => (i + 1) % pages)}
              className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition-all">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
