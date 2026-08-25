import React, { useState, useEffect, useRef } from 'react';
import { translations, loopSteps } from '../data/content';
import { Language } from '../types';
import { RefreshCw, Cpu, UserCheck, FileText, Sparkles, Play, Pause, RotateCcw } from 'lucide-react';

interface SolutionSectionProps { lang: Language; }

const STEP_ICONS: Record<number, React.ReactNode> = {
  1: <UserCheck className="w-6 h-6" />, 2: <Cpu className="w-6 h-6" />,
  3: <FileText className="w-6 h-6" />, 4: <RefreshCw className="w-6 h-6" />,
};

// brand-aligned step colors
const STEP_COLORS = ['#F97316', '#F43F5E', '#EC4899', '#FBBF24'];

export const SolutionSection: React.FC<SolutionSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [active, setActive] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const DURATION = 4000;
  const TICK = 50;

  const startCycle = () => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);
    let elapsed = 0;
    progressRef.current = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, TICK);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive(prev => (prev % 4) + 1);
    }, DURATION);
  };

  useEffect(() => {
    if (playing) startCycle();
    else {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [active, playing]);

  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = loopSteps.find(s => s.stepNumber === active) ?? loopSteps[0];

  return (
    <section id="system" ref={sectionRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <RefreshCw className={`w-3.5 h-3.5 ${playing ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
            {t.solution.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>{t.solution.title}</h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>{t.solution.subtitle}</p>
        </div>

        {/* Timeline stepper */}
        <div className="reveal mb-8" style={{ transitionDelay: '.18s' }}>
          <div className="flex items-center mb-8 px-2">
            {loopSteps.map((s, i) => {
              const isDone = s.stepNumber < active;
              const isActive = s.stepNumber === active;
              return (
                <React.Fragment key={s.stepNumber}>
                  <button onClick={() => { setActive(s.stepNumber); setPlaying(false); setProgress(0); }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group transition-all">
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-bold text-sm
                      ${isActive ? 'text-white shadow-lg scale-110' : isDone ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-white text-slate-400 group-hover:border-orange-300'}`}
                      style={isActive ? { background: `linear-gradient(135deg, #F97316, #F43F5E)`, border: 'none', boxShadow: '0 0 0 4px rgba(249,115,22,0.2)' } : {}}>
                      {isDone ? '✓' : s.stepNumber}
                    </div>
                    <span className={`text-xs font-bold hidden sm:block transition-colors ${isActive ? 'text-orange-600' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {s.title}
                    </span>
                  </button>
                  {i < loopSteps.length - 1 && (
                    <div className="flex-1 mx-2 h-1.5 rounded-full overflow-hidden bg-slate-200">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: isDone ? '100%' : isActive ? `${progress}%` : '0%', backgroundColor: isDone ? '#10B981' : STEP_COLORS[i] }} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Active step hero */}
          <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
                <img key={step.stepNumber} src={step.photo} alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ animation: 'slide-up .45s cubic-bezier(.16,1,.3,1)' }} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-white"
                    style={{ backgroundColor: STEP_COLORS[step.stepNumber - 1] + 'CC' }}>
                    STEP {step.stepNumber}: {step.tag}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-7 p-7 sm:p-10 text-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Closed-Loop AI Process</span>
                    </div>
                    <button onClick={() => setPlaying(!playing)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5 hover:bg-slate-700 transition-all cursor-pointer">
                      {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {playing ? 'Auto ON' : 'Paused'}
                    </button>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-display mb-2" key={`title-${step.stepNumber}`}
                    style={{ animation: 'slide-up .4s cubic-bezier(.16,1,.3,1)' }}>{step.subtitle}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.details}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {[
                    { label: 'Latency', val: step.latency ?? 'Instant', color: 'text-emerald-400' },
                    { label: 'Precision', val: '98.8%', color: 'text-orange-400' },
                    { label: 'Criteria', val: '4/4 Cambridge', color: 'text-slate-200' },
                    { label: 'Feedback', val: 'Word-level', color: 'text-amber-400' },
                  ].map(({ label, val, color }) => (
                    <div key={label} className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <span className="text-[10px] text-slate-400 font-mono block">{label}</span>
                      <span className={`text-sm font-black font-mono ${color}`}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-1 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full rounded-full transition-none"
                    style={{ width: `${playing ? progress : 0}%`, backgroundColor: STEP_COLORS[active - 1] }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 mini step cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 reveal stagger" style={{ transitionDelay: '.22s' }}>
          {loopSteps.map(s => {
            const isActive = s.stepNumber === active;
            return (
              <button key={s.stepNumber} onClick={() => { setActive(s.stepNumber); setPlaying(false); setProgress(0); }}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer card-hover
                  ${isActive ? 'bg-slate-900 border-slate-700 shadow-xl text-white' : 'bg-white border-slate-200 hover:border-orange-200 text-slate-800'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all
                  ${isActive ? 'text-white shadow-lg' : 'bg-orange-50 text-orange-600'}`}
                  style={{ backgroundColor: isActive ? STEP_COLORS[s.stepNumber - 1] : '' }}>
                  {STEP_ICONS[s.stepNumber]}
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase mb-2 inline-block
                  ${isActive ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>{s.tag}</span>
                <h4 className="font-extrabold text-sm font-display">{s.title}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>{s.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Outcome strip */}
        <div className="reveal bg-white rounded-3xl border border-slate-200 p-7 sm:p-8 shadow-sm" style={{ transitionDelay: '.26s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 text-left space-y-2">
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />{t.solution.outcomeTitle}
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{t.solution.outcomeDesc}</p>
            </div>
            <div className="lg:col-span-4 flex items-center gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:pl-8">
              <div>
                <span className="block text-4xl font-black text-slate-900 font-display">{t.solution.accuracyBadge}</span>
                <span className="text-xs text-slate-500 font-mono">{t.solution.accuracyLabel}</span>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <span className="block text-4xl font-black brand-gradient-text font-display">{t.solution.availabilityBadge}</span>
                <span className="text-xs text-slate-500 font-mono">{t.solution.availabilityLabel}</span>
              </div>
            </div>
          </div>
          <div className="mt-5 p-4 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg brand-gradient text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-sm font-semibold text-slate-800">{t.solution.engineNotice}</p>
            </div>
            <button onClick={() => { setActive(1); setPlaying(true); setProgress(0); }}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-sm hover:bg-slate-50 cursor-pointer transition-colors">
              <RotateCcw className="w-3.5 h-3.5 text-orange-500" />{t.solution.runSimButton}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
