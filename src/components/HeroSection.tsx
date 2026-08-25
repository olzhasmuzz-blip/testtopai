import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../data/content';
import { Language } from '../types';
import {
  Sparkles, Zap, Smartphone, Play, ArrowRight,
  ShieldCheck, BookOpen, Headphones, PenTool, Mic,
} from 'lucide-react';

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

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onOpenTestModal }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'tests' | 'speaking'>('tests');
  const [isRecording, setIsRecording] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const typeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* typewriter */
  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[phraseIdx];
    if (typing) {
      if (displayed.length < phrase.length) {
        typeRef.current = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 70);
      } else {
        typeRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        typeRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setPhraseIdx(i => (i + 1) % TYPEWRITER_PHRASES.length);
        setTyping(true);
      }
    }
    return () => { if (typeRef.current) clearTimeout(typeRef.current); };
  }, [displayed, typing, phraseIdx]);

  /* scroll-reveal */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pillColors = [
    { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', icon: 'bg-orange-100' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', icon: 'bg-emerald-100' },
    { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', icon: 'bg-rose-100' },
  ];
  const pillIcons = [<Zap className="w-4 h-4" />, <Sparkles className="w-4 h-4" />, <Smartphone className="w-4 h-4" />];

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white">

      {/* ── Animated mesh background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.10) 0%, transparent 70%)' }} />
        <div className="absolute top-40 right-[-100px] w-[420px] h-[420px] rounded-full animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-[-60px] w-[340px] h-[340px] rounded-full animate-float-med"
          style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)' }} />
        {/* grid dots */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#F97316" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── LEFT ── */}
          <div className="lg:col-span-7 space-y-7 text-left">

            {/* badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              {t.hero.badge}
            </div>

            {/* headline */}
            <div className="reveal">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.06] font-display">
                {lang === 'ru' ? (
                  <>
                    Первый в мире<br />
                    <span className="brand-gradient-text animate-gradient-x">
                      AI-тренажер
                    </span>
                    {' '}для глобальных экзаменов
                  </>
                ) : (
                  <>
                    The first{' '}
                    <span className="brand-gradient-text animate-gradient-x">
                      AI-powered
                    </span>
                    <br />global exam trainer
                  </>
                )}
              </h1>
              {/* typewriter */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-slate-400 text-sm font-medium">
                  {lang === 'ru' ? 'Цель:' : 'Target:'}
                </span>
                <span className="text-2xl font-black brand-gradient-text font-mono cursor-blink min-w-[160px]">
                  {displayed}
                </span>
              </div>
            </div>

            {/* subtitle */}
            <p className="reveal text-lg text-slate-600 leading-relaxed max-w-2xl" style={{ transitionDelay: '.1s' }}>
              {t.hero.subtitle}
            </p>

            {/* 3 pills */}
            <div className="reveal stagger grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ transitionDelay: '.15s' }}>
              {t.hero.pills.map((pill, i) => (
                <div key={i}
                  className={`p-4 rounded-2xl ${pillColors[i].bg} border ${pillColors[i].border} card-hover cursor-default`}>
                  <div className={`w-8 h-8 rounded-xl ${pillColors[i].icon} ${pillColors[i].text} flex items-center justify-center mb-2.5`}>
                    {pillIcons[i]}
                  </div>
                  <h4 className="font-extrabold text-sm text-slate-900">{pill.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pill.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-3" style={{ transitionDelay: '.2s' }}>
              <button onClick={onOpenTestModal}
                className="group px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm flex items-center justify-center gap-2.5 brand-glow transition-all hover:scale-[1.03] active:scale-[0.98] neon-pulse">
                <Sparkles className="w-4 h-4" />
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#modules"
                className="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:border-orange-300">
                <Play className="w-4 h-4 text-orange-500 fill-orange-500" />
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* trust proof */}
            <div className="reveal flex items-center gap-3 text-xs text-slate-500" style={{ transitionDelay: '.25s' }}>
              <div className="flex -space-x-2">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {t.hero.statsValue}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Phone Mockup ── */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* ambient glow */}
            <div className="absolute inset-0 rounded-[60px] blur-3xl -z-10"
              style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, rgba(244,63,94,0.10) 60%, transparent 80%)' }} />

            {/* Floating stat badges */}
            <div className="absolute -left-6 top-16 animate-float-slow z-20">
              <div className="glass-panel rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 border border-orange-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">95% точность</p>
                  <p className="text-[10px] text-slate-500 font-mono">AI оценка эссе</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 bottom-24 animate-float-med z-20">
              <div className="glass-panel rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 border border-orange-100">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">+1.5 Band</p>
                  <p className="text-[10px] text-slate-500 font-mono">за 21 день</p>
                </div>
              </div>
            </div>

            {/* Phone shell */}
            <div className="w-[300px] sm:w-[330px] bg-slate-900 rounded-[44px] p-3 shadow-2xl shadow-slate-900/40 border-[3px] border-slate-700 relative animate-float-slow" style={{ animationDuration: '7s' }}>
              {/* notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-30 flex items-center justify-center">
                <div className="w-8 h-1.5 bg-slate-700 rounded-full" />
              </div>

              {/* screen */}
              <div className="w-full bg-white rounded-[36px] overflow-hidden h-[570px] flex flex-col">
                {/* status bar */}
                <div className="pt-2 px-6 pb-1.5 flex justify-between items-center text-[11px] font-bold text-slate-700 bg-white">
                  <span className="font-mono">12:15</span>
                  <div className="flex items-center gap-1 text-[10px] font-mono">5G ▮▮▮</div>
                </div>

                {/* tabs */}
                <div className="flex border-b border-slate-100 bg-slate-50/80 px-2 py-1.5 text-[10px] font-bold gap-1">
                  {(['tests', 'speaking'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === tab ? 'bg-white shadow text-orange-600' : 'text-slate-400 hover:text-slate-700'}`}>
                      {tab === 'tests' ? '📋 Tests' : '🎤 Speaking'}
                    </button>
                  ))}
                </div>

                {/* ─ Tests screen ─ */}
                {activeTab === 'tests' && (
                  <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs slide-up">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full brand-gradient text-white flex items-center justify-center font-black text-[10px]">TT</div>
                        <span className="font-black text-base text-slate-900 font-display">Tests</span>
                      </div>
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full border border-orange-200 font-mono">Band 8.0 Target</span>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">4 Skills</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Reading', acc: '92%', color: 'from-emerald-500 to-teal-600', Icon: BookOpen },
                        { label: 'Listening', acc: '88%', color: 'from-orange-500 to-rose-500', Icon: Headphones },
                        { label: 'Writing', acc: '95%', color: 'from-blue-500 to-cyan-600', Icon: PenTool },
                        { label: 'Speaking', acc: '90%', color: 'from-amber-400 to-orange-500', Icon: Mic },
                      ].map(({ label, acc, color, Icon }, i) => (
                        <button key={i} onClick={onOpenTestModal}
                          className={`p-3 rounded-2xl bg-gradient-to-br ${color} text-white flex flex-col items-center gap-1 hover:scale-[1.03] transition-transform cursor-pointer`}>
                          <Icon className="w-5 h-5 opacity-90" />
                          <span className="font-black text-sm font-display">{label}</span>
                          <span className="text-[9px] opacity-80 font-mono">{acc} Accuracy</span>
                        </button>
                      ))}
                    </div>

                    {/* progress bars */}
                    <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase font-mono">Weekly progress</p>
                      {[['Writing', 82, '#F97316'], ['Speaking', 70, '#F43F5E'], ['Reading', 94, '#10B981']].map(([lbl, pct, clr]) => (
                        <div key={lbl as string}>
                          <div className="flex justify-between text-[9px] mb-0.5 font-mono">
                            <span className="text-slate-600">{lbl as string}</span>
                            <span className="font-bold" style={{ color: clr as string }}>{pct as number}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                            <div className="h-full rounded-full bar-fill" style={{ width: `${pct}%`, backgroundColor: clr as string }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ─ Speaking screen ─ */}
                {activeTab === 'speaking' && (
                  <div className="p-4 flex flex-col justify-between h-full bg-slate-900 text-white slide-up">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        AI Examiner Active
                      </div>
                      <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                        <p className="text-[9px] text-amber-400 font-bold uppercase font-mono mb-1">Part 2 Cue Card</p>
                        <p className="text-[11px] text-slate-200 leading-snug">
                          «Describe a decision made by others that had a major positive impact on your life.»
                        </p>
                      </div>
                    </div>

                    {/* waveform */}
                    <div className="flex items-end justify-center gap-1 h-12 my-4">
                      {[4,8,14,10,18,12,20,9,16,11,19,7,15,8,12].map((h, i) => (
                        <div key={i} className="w-1.5 rounded-full wave-bar"
                          style={{
                            background: 'linear-gradient(to top, #F97316, #F43F5E)',
                            height: isRecording ? `${h * 2}px` : '4px',
                            animationDelay: `${i * 55}ms`,
                            animationDuration: `${0.6 + i * 0.04}s`,
                          }} />
                      ))}
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] text-slate-400 font-mono text-center">
                        {isRecording ? 'Analyzing pitch & phonemes...' : 'Fluency: 92% · Lexical: 8.5 · Pauses: 3'}
                      </p>
                      <button onClick={() => setIsRecording(!isRecording)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                          isRecording ? 'bg-rose-500 animate-pulse' : 'brand-gradient hover:opacity-90'}`}>
                        <Mic className="w-4 h-4" />
                        {isRecording ? 'Остановить запись' : 'Начать Speaking'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Marquee trust logos ── */}
        <div className="mt-16 pt-10 border-t border-slate-100 overflow-hidden reveal" style={{ transitionDelay: '.3s' }}>
          <p className="text-center text-xs text-slate-400 font-mono font-bold uppercase tracking-widest mb-6">
            {lang === 'ru' ? 'Готовимся к экзаменам ведущих организаций' : 'Prepare for exams by leading organizations'}
          </p>
          <div className="relative overflow-hidden">
            <div className="marquee-track flex gap-10 w-max">
              {[
                { name: 'Cambridge', logo: '🎓' },
                { name: 'IDP IELTS', logo: '📋' },
                { name: 'ETS TOEFL', logo: '🌐' },
                { name: 'College Board', logo: '📚' },
                { name: 'GMAC', logo: '🏛️' },
                { name: 'British Council', logo: '🇬🇧' },
                { name: 'Cambridge', logo: '🎓' },
                { name: 'IDP IELTS', logo: '📋' },
                { name: 'ETS TOEFL', logo: '🌐' },
                { name: 'College Board', logo: '📚' },
                { name: 'GMAC', logo: '🏛️' },
                { name: 'British Council', logo: '🇬🇧' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 px-6 py-3 bg-white rounded-xl border border-slate-100 shadow-sm whitespace-nowrap">
                  <span className="text-xl">{item.logo}</span>
                  <span className="text-sm font-bold text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
