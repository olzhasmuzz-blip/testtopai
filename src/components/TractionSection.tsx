import React, { useState, useEffect, useRef } from 'react';
import { translations, tractionMetrics, testimonials, liveFeedActivities } from '../data/content';
import { Language } from '../types';
import { TrendingUp, Users, Bot, CheckCircle, Star, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

interface TractionSectionProps { lang: Language; }

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
  Users: <Users className="w-5 h-5 text-rose-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-orange-600" />,
  Bot: <Bot className="w-5 h-5 text-emerald-600" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-amber-600" />,
};

const SUCCESS_IMAGES = [
  '/success-stories/candidate-01.png',
  '/success-stories/candidate-02.png',
  '/success-stories/candidate-03.png',
];

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
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setCounting(true); }, { threshold: 0.4 });
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
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>{t.traction.title}</h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>{t.traction.subtitle}</p>
        </div>

        {/* Animated counter metrics */}
        <div ref={countersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12 reveal stagger" style={{ transitionDelay: '.18s' }}>
          {tractionMetrics.map((m, i) => (
            <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-orange-300 transition-all card-hover text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">{METRIC_ICONS[m.iconName]}</div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">{m.trend}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-display font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {i === 0 ? `${counts[i].toLocaleString()}${suffixes[i]}` : `${counts[i]}${suffixes[i]}`}
              </div>
              <h4 className="font-extrabold text-sm text-slate-800 mt-1 font-display">{m.label}</h4>
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-200 font-mono">{m.subtext}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative overflow-hidden bg-slate-950 text-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-2xl reveal" style={{ transitionDelay: '.2s' }}>
          <div className="absolute inset-0 pointer-events-none opacity-70"
            style={{ background: 'radial-gradient(circle at 18% 18%, rgba(249,115,22,.22), transparent 30%), radial-gradient(circle at 78% 0%, rgba(16,185,129,.16), transparent 28%), linear-gradient(135deg, rgba(15,23,42,.9), rgba(2,6,23,1))' }} />
          <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.06] px-5 pt-6 sm:px-8 lg:px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end min-h-[360px]">
              <div className="lg:col-span-5 pb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-300 uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />Студенты довольны
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display">Истории успеха выпускников TestTop</h3>
                <p className="mt-3 max-w-md text-sm text-slate-300 leading-relaxed">Ученики видят понятный прогресс, быстрее закрывают слабые места и увереннее подходят к экзамену.</p>
                <div className="mt-5 bg-slate-950/60 backdrop-blur border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-mono max-w-sm">
                  <span className="text-lg">{liveFeedActivities[feedIdx].flag}</span>
                  <span className="font-bold text-slate-200 truncate">{liveFeedActivities[feedIdx].user}</span>
                  <span className="text-slate-400 truncate">{liveFeedActivities[feedIdx].action}</span>
                  <span className="font-bold text-emerald-400 shrink-0">{liveFeedActivities[feedIdx].score}</span>
                </div>
              </div>

              <div className="relative lg:col-span-7 h-[330px]">
                <div className="absolute bottom-0 left-[12%] w-48 h-48 rounded-full bg-orange-500/30 blur-3xl" />
                <div className="absolute bottom-6 right-[14%] w-56 h-56 rounded-full bg-emerald-400/20 blur-3xl" />
                <img src={SUCCESS_IMAGES[0]} alt="" aria-hidden="true" className="absolute bottom-0 left-[2%] h-[290px] sm:h-[330px] object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,.45)]" />
                <img src={SUCCESS_IMAGES[1]} alt="" aria-hidden="true" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[320px] sm:h-[370px] object-contain z-10 drop-shadow-[0_34px_50px_rgba(0,0,0,.5)]" />
                <img src={SUCCESS_IMAGES[2]} alt="" aria-hidden="true" className="absolute bottom-0 right-[0%] h-[290px] sm:h-[340px] object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,.45)] hidden sm:block" />
                <div className="absolute left-4 bottom-5 z-20 rounded-2xl bg-white text-slate-950 px-3.5 py-2.5 shadow-xl sm:left-auto sm:right-6 sm:bottom-6">
                  <div className="text-2xl sm:text-3xl font-black font-display brand-gradient-text">4.9★</div>
                  <div className="text-[11px] font-bold text-slate-500">оценка студентов</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-300 uppercase">Отзывы</span>
              <h4 className="text-xl sm:text-2xl font-extrabold font-display">Что говорят выпускники</h4>
            </div>
            <div className="text-xs text-slate-400 max-w-md">Короткие истории о том, как фидбек, практика и персональный план помогли выйти на целевой балл.</div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {visibleTestimonials.map((item, i) => (
              <div key={`${tIdx}-${i}`} className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700 hover:border-orange-500/70 transition-colors flex flex-col justify-between card-hover"
                style={{ animation: 'slide-up .4s cubic-bezier(.16,1,.3,1)', animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold font-mono">{item.score}</span>
                  {item.university && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-mono font-bold border border-orange-500/30">
                      <GraduationCap className="w-3 h-3" />{item.university}
                    </span>
                  )}
                  </div>
                  <div className="flex gap-0.5 mb-2">{[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}</div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">«{item.comment}»</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-700">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/40" referrerPolicy="no-referrer" />
                  <div>
                    <h5 className="font-bold text-xs text-white font-display flex items-center gap-1">{item.name} {item.flag && <span>{item.flag}</span>}</h5>
                    <p className="text-[10px] text-slate-400">{item.role}</p>
                  </div>
                  <span className="ml-auto text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md shrink-0">{item.daysToTarget}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center gap-3">
            <button onClick={() => setTIdx(i => (i - 1 + pages) % pages)} className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-all">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)}
                className="rounded-full transition-all"
                style={i === tIdx ? { width: 24, height: 10, background: 'linear-gradient(135deg,#F97316,#F43F5E)' } : { width: 10, height: 10, background: '#475569' }} />
            ))}
            <button onClick={() => setTIdx(i => (i + 1) % pages)} className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-all">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
