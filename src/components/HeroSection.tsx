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
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">

            {/* badge */}
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              {t.hero.badge}
            </div>

            {/* headline */}
            <div className="reveal">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.06] font-display">
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
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-slate-400 text-sm font-medium">
                  {lang === 'ru' ? 'Цель:' : 'Target:'}
                </span>
                <span className="text-xl sm:text-2xl font-black brand-gradient-text font-mono cursor-blink min-w-[120px] sm:min-w-[160px]">
                  {displayed}
                </span>
              </div>
            </div>

            {/* subtitle */}
            <div className="lg:hidden reveal relative mx-auto w-full max-w-[300px] my-2" style={{ transitionDelay: '.08s' }}>
              <div className="relative aspect-[1/1.08] rounded-[24px] bg-white/70 p-2.5 shadow-[0_20px_50px_rgba(15,23,42,.10)]">
                <div className="absolute -left-2 top-8 animate-float-slow z-20 scale-75 origin-left">
                  <div className="glass-panel rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2 border border-orange-100">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-900">95% точность</p>
                      <p className="text-[9px] text-slate-500 font-mono">AI оценка эссе</p>
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 top-20 animate-float-med z-20 scale-75 origin-right">
                  <div className="glass-panel rounded-2xl px-3 py-2 shadow-lg flex items-center gap-2 border border-orange-100">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-900">+1.5 Band</p>
                      <p className="text-[9px] text-slate-500 font-mono">за 21 день</p>
                    </div>
                  </div>
                </div>
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="heroPhoneMob" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#111827" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="heroAccentMob" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#F43F5E" />
                    </linearGradient>
                    <linearGradient id="heroMintMob" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="150" cy="176" rx="96" ry="96" fill="rgba(249,115,22,0.08)" className="animate-float-slow" />
                  <ellipse cx="150" cy="176" rx="74" ry="74" fill="rgba(244,63,94,0.06)" className="animate-float-med" />
                  <g className="animate-float-slow" style={{ transformOrigin: '150px 176px', animationDuration: '7s' }}>
                    <rect x="120" y="78" width="88" height="186" rx="26" fill="url(#heroPhoneMob)" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                    <rect x="129" y="90" width="70" height="150" rx="17" fill="#FFFFFF" />
                    <rect x="146" y="84" width="35" height="5" rx="2.5" fill="#334155" />
                    <rect x="136" y="106" width="52" height="48" rx="13" fill="#F8FAFC" />
                    <circle cx="153" cy="122" r="11" fill="rgba(249,115,22,0.16)" />
                    <path d="M146 123 C150 119, 154 119, 158 123 C162 127, 166 127, 170 123" fill="none" stroke="url(#heroAccentMob)" strokeWidth="3" strokeLinecap="round" />
                    <rect x="145" y="138" width="40" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="145" y="146" width="30" height="5" rx="2.5" fill="#A7F3D0" />
                    <rect x="136" y="160" width="52" height="64" rx="14" fill="#0F172A" />
                    <circle cx="162" cy="187" r="11" fill="none" stroke="rgba(52,211,153,0.95)" strokeWidth="5" strokeDasharray="48 18" />
                    <path d="M145 205 H181" stroke="rgba(255,255,255,0.15)" strokeWidth="5" strokeLinecap="round" />
                    <path d="M145 214 H174" stroke="rgba(255,255,255,0.25)" strokeWidth="5" strokeLinecap="round" />
                    <rect x="136" y="229" width="52" height="20" rx="10" fill="rgba(16,185,129,0.12)" />
                    <path d="M145 239 H179" stroke="url(#heroMintMob)" strokeWidth="4" strokeLinecap="round" />
                  </g>
                  <g className="animate-float-med" style={{ transformOrigin: '150px 176px', animationDuration: '6s' }}>
                    <rect x="212" y="118" width="90" height="50" rx="16" fill="#FFFFFF" opacity="0.98" />
                    <circle cx="230" cy="143" r="10" fill="rgba(249,115,22,0.18)" />
                    <path d="M227 143 L232 148 L239 137" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="244" y="126" width="40" height="5" rx="2.5" fill="#C4B5FD" />
                    <rect x="244" y="136" width="32" height="5" rx="2.5" fill="#CBD5E1" />
                    <rect x="244" y="146" width="24" height="5" rx="2.5" fill="#A7F3D0" />
                  </g>
                  <g className="animate-float-slow" style={{ transformOrigin: '150px 176px', animationDuration: '8s' }}>
                    <rect x="24" y="172" width="90" height="50" rx="16" fill="#FFFFFF" opacity="0.98" />
                    <rect x="38" y="188" width="34" height="5" rx="2.5" fill="#F97316" />
                    <rect x="38" y="197" width="46" height="5" rx="2.5" fill="#34D399" />
                    <rect x="38" y="206" width="24" height="5" rx="2.5" fill="#FDA4AF" />
                  </g>
                </svg>
              </div>
            </div>

            <p className="reveal text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ transitionDelay: '.1s' }}>
              {t.hero.subtitle}
            </p>

            {/* 3 pills */}
            <div className="reveal stagger grid grid-cols-3 gap-1.5 sm:gap-3" style={{ transitionDelay: '.15s' }}>
              {t.hero.pills.map((pill, i) => (
                <div key={i}
                  className={`min-w-0 p-2 sm:p-4 rounded-2xl ${pillColors[i].bg} border ${pillColors[i].border} card-hover cursor-default`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${pillColors[i].icon} ${pillColors[i].text} flex items-center justify-center mb-2 mx-auto sm:mx-0`}>
                    {pillIcons[i]}
                  </div>
                  <h4 className="font-extrabold text-[10px] sm:text-sm text-slate-900 leading-tight">{pill.title}</h4>
                  <p className="hidden sm:block text-[10px] sm:text-xs text-slate-500 mt-1 leading-snug">{pill.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-3" style={{ transitionDelay: '.2s' }}>
              <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
                className="group px-7 py-4 rounded-xl brand-gradient text-white font-bold text-sm flex items-center justify-center gap-2.5 brand-glow transition-all hover:scale-[1.03] active:scale-[0.98] neon-pulse">
                <Sparkles className="w-4 h-4" />
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
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
          <div className="hidden lg:flex lg:col-span-5 justify-center relative min-h-[640px] lg:min-h-[720px]">
            <div className="absolute inset-0 rounded-[60px] blur-3xl -z-10"
              style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, rgba(244,63,94,0.08) 60%, transparent 80%)' }} />

            <div className="absolute -left-2 top-20 animate-float-slow z-20">
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
            <div className="absolute right-0 top-28 animate-float-med z-20">
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

            <div className="absolute left-10 bottom-24 animate-float-med z-20">
              <div className="glass-panel rounded-2xl px-3.5 py-3 shadow-xl border border-orange-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-900">Weekly progress</p>
                  <p className="text-[10px] text-slate-500 font-mono">82% → 94%</p>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[640px] h-[640px] lg:h-[700px]">
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="heroPhone" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#111827" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                  <linearGradient id="heroAccent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#F43F5E" />
                  </linearGradient>
                  <linearGradient id="heroMint" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>

                <ellipse cx="320" cy="330" rx="250" ry="250" fill="rgba(249,115,22,0.08)" className="animate-float-slow" />
                <ellipse cx="320" cy="330" rx="190" ry="190" fill="rgba(244,63,94,0.06)" className="animate-float-med" />

                <g className="animate-float-slow" style={{ transformOrigin: '320px 330px', animationDuration: '7s' }}>
                  <rect x="250" y="150" width="140" height="300" rx="34" fill="url(#heroPhone)" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <rect x="264" y="174" width="112" height="248" rx="24" fill="#FFFFFF" />
                  <rect x="294" y="160" width="52" height="6" rx="3" fill="#334155" />

                  <rect x="278" y="196" width="84" height="78" rx="18" fill="#F8FAFC" />
                  <circle cx="305" cy="223" r="18" fill="rgba(249,115,22,0.16)" />
                  <path d="M294 224 C300 218, 306 218, 312 224 C318 230, 324 230, 330 224" fill="none" stroke="url(#heroAccent)" strokeWidth="4" strokeLinecap="round" />
                  <rect x="292" y="246" width="64" height="6" rx="3" fill="#CBD5E1" />
                  <rect x="292" y="258" width="48" height="6" rx="3" fill="#A7F3D0" />

                  <rect x="278" y="286" width="84" height="100" rx="18" fill="#0F172A" />
                  <circle cx="319" cy="320" r="18" fill="none" stroke="rgba(52,211,153,0.95)" strokeWidth="6" strokeDasharray="78 30" />
                  <path d="M292 348 H348" stroke="rgba(255,255,255,0.15)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M292 362 H336" stroke="rgba(255,255,255,0.25)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M292 376 H344" stroke="rgba(255,255,255,0.18)" strokeWidth="6" strokeLinecap="round" />

                  <rect x="278" y="396" width="84" height="34" rx="14" fill="rgba(16,185,129,0.12)" />
                  <path d="M293 413 H347" stroke="url(#heroMint)" strokeWidth="5" strokeLinecap="round" />
                </g>

                <g className="animate-float-med" style={{ transformOrigin: '320px 330px', animationDuration: '6s' }}>
                  <rect x="404" y="210" width="150" height="82" rx="24" fill="#FFFFFF" opacity="0.98" />
                  <circle cx="433" cy="251" r="16" fill="rgba(249,115,22,0.18)" />
                  <path d="M430 251 L438 259 L447 243" stroke="#F97316" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="456" y="226" width="70" height="8" rx="4" fill="#C4B5FD" />
                  <rect x="456" y="242" width="54" height="8" rx="4" fill="#CBD5E1" />
                  <rect x="456" y="258" width="42" height="8" rx="4" fill="#A7F3D0" />
                </g>

                <g className="animate-float-slow" style={{ transformOrigin: '320px 330px', animationDuration: '8s' }}>
                  <rect x="95" y="286" width="150" height="82" rx="24" fill="#FFFFFF" opacity="0.98" />
                  <rect x="120" y="312" width="58" height="8" rx="4" fill="#F97316" />
                  <rect x="120" y="326" width="78" height="8" rx="4" fill="#34D399" />
                  <rect x="120" y="340" width="42" height="8" rx="4" fill="#FDA4AF" />
                  <circle cx="170" cy="308" r="16" fill="rgba(52,211,153,0.14)" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Marquee trust logos ── */}
        <div className="hidden sm:block mt-16 pt-10 border-t border-slate-100 overflow-hidden reveal" style={{ transitionDelay: '.3s' }}>
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
