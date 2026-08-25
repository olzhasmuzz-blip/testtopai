import React, { useState, useEffect, useRef } from 'react';
import {
  translations,
  tractionMetrics,
  userEngagementStats,
  aiEngineStats,
  testimonials,
  liveFeedActivities,
} from '../data/content';
import { Language } from '../types';
import { Star, ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';

interface TractionSectionProps { lang: Language; }

function useCounter(target: number, running: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!running) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setVal(target);
        clearInterval(id);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [running, target, duration]);
  return val;
}

const TRACTION_VISUAL = '/illustrations/traction-dashboard.png';

export const TractionSection: React.FC<TractionSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [feedIdx, setFeedIdx] = useState(0);
  const [tIdx, setTIdx] = useState(0);
  const [counting, setCounting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setFeedIdx(i => (i + 1) % liveFeedActivities.length), 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

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
  const counts = [
    useCounter(countVals[0], counting),
    useCounter(countVals[1], counting),
    useCounter(countVals[2], counting),
    useCounter(countVals[3], counting),
  ];

  return (
    <section id="traction" ref={sectionRef} className="py-20 md:py-28 bg-[#FCFBF8] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {lang === 'ru' ? 'Результаты, которые видит студент' : t.traction.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {t.traction.title}
          </h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
            {lang === 'ru'
              ? 'Показываем прогресс, уверенность и понятный пользовательский эффект без повторяющихся картинок.'
              : t.traction.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 reveal stagger" style={{ transitionDelay: '.18s' }}>
          <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <img src={TRACTION_VISUAL} alt="" className="w-full h-full max-h-[360px] object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: lang === 'ru' ? 'Быстрый старт' : 'Fast start',
                desc: lang === 'ru' ? 'Пользователь понимает, что делать в первый же день.' : 'The learner knows what to do on day one.',
              },
              {
                title: lang === 'ru' ? 'Понятный прогресс' : 'Visible progress',
                desc: lang === 'ru' ? 'Рост балла и закрытие слабых тем видны сразу.' : 'Score growth and skill gaps are visible immediately.',
              },
              {
                title: lang === 'ru' ? 'Меньше шума' : 'Less clutter',
                desc: lang === 'ru' ? 'Визуал поддерживает смысл, а не отвлекает от него.' : 'Visuals support the message instead of distracting.',
              },
              {
                title: lang === 'ru' ? 'Больше уверенности' : 'More confidence',
                desc: lang === 'ru' ? 'Студент видит понятный результат своих действий.' : 'The learner can see the effect of each action.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="w-full h-32 rounded-2xl brand-gradient mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_35%)]" />
                </div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-mono font-bold">{card.title}</p>
                <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={countersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12 reveal stagger" style={{ transitionDelay: '.2s' }}>
            {tractionMetrics.map((m, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left card-hover overflow-hidden">
              <div className="h-24 rounded-2xl overflow-hidden mb-4 brand-gradient relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.25),transparent_35%)]" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {i === 0 ? `${counts[i].toLocaleString()}${suffixes[i]}` : `${counts[i]}${suffixes[i]}`}
              </div>
              <h4 className="font-extrabold text-sm text-slate-800 mt-1 font-display">{m.label}</h4>
              <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-200">{m.subtext}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-12">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm reveal-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="font-extrabold text-lg text-slate-900 font-display">
                {lang === 'ru' ? 'Вовлечённость пользователей' : 'User Engagement'}
              </h3>
              <span className="text-xs font-mono font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg">
                Last 30 days
              </span>
            </div>
            <div className="space-y-3">
              {userEngagementStats.map((stat, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors">
                  <span className="text-sm font-semibold text-slate-700">{stat.label}</span>
                  <span className="font-mono font-black text-base text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

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
                  <span className="font-mono font-black text-base brand-gradient-text">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-sm border border-slate-200 reveal" style={{ transitionDelay: '.2s' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7 border-b border-slate-100 pb-5">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-500 uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />Live Student Network
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900">
                {lang === 'ru' ? 'Что чувствует пользователь после первого цикла' : 'Verified Candidate Admissions'}
              </h3>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono shrink-0 max-w-sm">
              <span className="text-lg">{liveFeedActivities[feedIdx].flag}</span>
              <span className="font-bold text-slate-800 truncate">{liveFeedActivities[feedIdx].user}</span>
              <span className="text-slate-500 truncate">{liveFeedActivities[feedIdx].action}</span>
              <span className="font-bold text-emerald-600 shrink-0">{liveFeedActivities[feedIdx].score}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {visibleTestimonials.map((item, i) => (
              <div
                key={`${tIdx}-${i}`}
                className="bg-[#FCFBF8] p-5 rounded-2xl border border-slate-200 hover:border-orange-200 transition-colors flex flex-col justify-between card-hover"
                style={{ animation: 'slide-up .4s cubic-bezier(.16,1,.3,1)', animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-700 rounded-lg text-xs font-bold font-mono">{item.score}</span>
                    {item.university && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10px] font-mono font-bold border border-orange-200">
                        <GraduationCap className="w-3 h-3" />{item.university}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-4">“{item.comment}”</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <img src={item.avatar} alt={item.name} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-bold text-xs text-slate-900 font-display flex items-center gap-1">
                      {item.name} {item.flag && <span>{item.flag}</span>}
                    </h5>
                    <p className="text-[10px] text-slate-500">{item.role}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-emerald-700 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md shrink-0">
                    {item.daysToTarget}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <button onClick={() => setTIdx(i => (i - 1 + pages) % pages)} className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setTIdx(i)}
                className="rounded-full transition-all"
                style={i === tIdx ? { width: 24, height: 10, background: 'linear-gradient(135deg,#F97316,#F43F5E)' } : { width: 10, height: 10, background: '#E2E8F0' }}
              />
            ))}
            <button onClick={() => setTIdx(i => (i + 1) % pages)} className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
