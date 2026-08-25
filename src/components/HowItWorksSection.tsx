import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import {
  ArrowRight, CheckCircle2, Zap, TrendingUp,
  BookOpen, Headphones, Mic, PenLine,
} from 'lucide-react';

interface HowItWorksSectionProps {
  lang: Language;
  onOpenTestModal: () => void;
}

const STEPS_RU = [
  {
    num: '01',
    title: 'Проходишь бесплатную диагностику',
    desc: 'За 5 минут AI анализирует твой уровень по всем 4 навыкам и находит конкретные слабые зоны.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.25.jpeg',
    tag: 'Старт',
    tagColor: 'bg-orange-100 text-orange-700',
    accent: '#F97316',
    detail: '95% точность оценки · < 2 сек',
  },
  {
    num: '02',
    title: 'Тренируешься по персональному плану',
    desc: 'Reading, Listening, Writing и Speaking — реальные задания экзамена с мгновенной проверкой ответов.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.28.jpeg',
    tag: 'Практика',
    tagColor: 'bg-rose-100 text-rose-700',
    accent: '#F43F5E',
    detail: '40+ тестов в каждом модуле',
  },
  {
    num: '03',
    title: 'Получаешь мгновенный AI-фидбек',
    desc: 'Каждый ответ разбирается по критериям: зелёный — верно, красный — ошибка с объяснением.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.34.jpeg',
    tag: 'Фидбек',
    tagColor: 'bg-amber-100 text-amber-700',
    accent: '#FBBF24',
    detail: 'Correct answer сразу на экране',
  },
  {
    num: '04',
    title: 'Растёшь — балл увеличивается',
    desc: 'Система отслеживает прогресс, усложняет задания и ведёт тебя к целевому баллу шаг за шагом.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.42.jpeg',
    tag: 'Результат',
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: '#10B981',
    detail: '+1.0–1.5 балла за 30 дней',
  },
];

const STEPS_EN = [
  {
    num: '01',
    title: 'Take your free AI diagnostic',
    desc: 'In 5 minutes, AI evaluates all 4 skills and pinpoints exactly where you lose points.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.25.jpeg',
    tag: 'Start',
    tagColor: 'bg-orange-100 text-orange-700',
    accent: '#F97316',
    detail: '95% scoring accuracy · < 2 sec',
  },
  {
    num: '02',
    title: 'Practice with your personal plan',
    desc: 'Reading, Listening, Writing & Speaking — authentic exam tasks with instant answer checking.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.28.jpeg',
    tag: 'Practice',
    tagColor: 'bg-rose-100 text-rose-700',
    accent: '#F43F5E',
    detail: '40+ tests per module',
  },
  {
    num: '03',
    title: 'Get instant AI feedback',
    desc: 'Every answer is graded by criteria — green for correct, red for wrong with a clear explanation.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.34.jpeg',
    tag: 'Feedback',
    tagColor: 'bg-amber-100 text-amber-700',
    accent: '#FBBF24',
    detail: 'Correct answer shown instantly',
  },
  {
    num: '04',
    title: 'Watch your score climb',
    desc: 'The system tracks progress, auto-adjusts difficulty and guides you toward your target band step by step.',
    screenshot: '/screens/WhatsApp Image 2026-08-21 at 10.59.42.jpeg',
    tag: 'Result',
    tagColor: 'bg-emerald-100 text-emerald-700',
    accent: '#10B981',
    detail: '+1.0–1.5 bands in 30 days',
  },
];

const SKILLS_RU = [
  { icon: <BookOpen className="w-5 h-5" />, label: 'Reading', color: '#059669', bg: '#D1FAE5' },
  { icon: <Headphones className="w-5 h-5" />, label: 'Listening', color: '#3B82F6', bg: '#DBEAFE' },
  { icon: <PenLine className="w-5 h-5" />, label: 'Writing', color: '#F97316', bg: '#FFEDD5' },
  { icon: <Mic className="w-5 h-5" />, label: 'Speaking', color: '#F43F5E', bg: '#FFE4E6' },
];

const STATS_RU = [
  { value: '2,500+', label: 'Активных учеников' },
  { value: '85%', label: 'Возвращаются каждый день' },
  { value: '+1.5', label: 'Средний прирост балла' },
  { value: '4.9★', label: 'Оценка в App Store' },
];

const STATS_EN = [
  { value: '2,500+', label: 'Active students' },
  { value: '85%', label: 'Daily return rate' },
  { value: '+1.5', label: 'Average band gain' },
  { value: '4.9★', label: 'App Store rating' },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ lang, onOpenTestModal }) => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = lang === 'ru' ? STEPS_RU : STEPS_EN;
  const stats = lang === 'ru' ? STATS_RU : STATS_EN;

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setActiveStep(i => (i + 1) % steps.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    sectionRef.current
      ?.querySelectorAll('.reveal,.reveal-left,.reveal-right')
      .forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    if (autoRef.current) clearInterval(autoRef.current);
    setActiveStep(i);
    startAuto();
  };

  const step = steps[activeStep];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 md:py-28 bg-[#FAFAF9] relative overflow-hidden">

      {/* bg decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.2), transparent)' }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            {lang === 'ru' ? 'Как это работает' : 'How it works'}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {lang === 'ru'
              ? <>От нуля до цели<br /><span className="brand-gradient-text">за 4 простых шага</span></>
              : <>From zero to your target<br /><span className="brand-gradient-text">in 4 simple steps</span></>
            }
          </h2>
          <p className="reveal text-slate-500 text-base leading-relaxed" style={{ transitionDelay: '.14s' }}>
            {lang === 'ru'
              ? 'Никакой теории ради теории. Только практика, AI-разбор ошибок и реальный рост балла.'
              : 'No fluff, no passive theory. Just focused practice, AI error analysis and measurable score growth.'}
          </p>

          {/* skill pills */}
          <div className="reveal flex items-center justify-center gap-3 flex-wrap pt-2" style={{ transitionDelay: '.18s' }}>
            {SKILLS_RU.map(s => (
              <div key={s.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: s.bg, color: s.color }}>
                {s.icon} {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Main interactive grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

          {/* Left — step selector list */}
          <div className="lg:col-span-5 space-y-3 reveal-left">
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer group
                    ${isActive
                      ? 'bg-white border-orange-400 shadow-xl shadow-orange-100'
                      : 'bg-white border-slate-100 hover:border-orange-200 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    {/* step number */}
                    <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm font-mono transition-all duration-300"
                      style={isActive
                        ? { background: `linear-gradient(135deg, #F97316, #F43F5E)`, color: '#fff' }
                        : { background: '#F8FAFC', color: '#94A3B8' }
                      }>
                      {s.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.tagColor}`}>{s.tag}</span>
                      </div>
                      <h3 className={`font-extrabold text-sm font-display leading-tight transition-colors
                        ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {s.title}
                      </h3>
                      {isActive && (
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed slide-up">{s.desc}</p>
                      )}
                    </div>

                    <div className="shrink-0">
                      <ArrowRight className={`w-4 h-4 transition-all duration-300
                        ${isActive ? 'text-orange-500 translate-x-0.5' : 'text-slate-300'}`} />
                    </div>
                  </div>

                  {/* progress bar */}
                  {isActive && (
                    <div className="mt-3 h-1 bg-orange-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full animate-[bar-fill_4s_linear_forwards]"
                        style={{ background: `linear-gradient(90deg, #F97316, #F43F5E)`, width: '100%' }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right — big screenshot preview */}
          <div className="lg:col-span-7 reveal-right" style={{ transitionDelay: '.1s' }}>
            <div className="relative">
              {/* glow */}
              <div className="absolute inset-6 rounded-3xl blur-2xl opacity-20 pointer-events-none brand-gradient" />

              {/* card */}
              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">

                {/* top bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 ml-2">TestTop AI · {lang === 'ru' ? 'Мобильное приложение' : 'Mobile App'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-700 font-mono">{lang === 'ru' ? 'LIVE' : 'LIVE'}</span>
                  </div>
                </div>

                {/* screenshot area */}
                <div className="relative h-[380px] sm:h-[460px] bg-slate-100 overflow-hidden">
                  {steps.map((s, i) => (
                    <img
                      key={i}
                      src={s.screenshot}
                      alt={s.tag}
                      className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 bg-white
                        ${i === activeStep ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}`}
                    />
                  ))}

                  {/* step badge overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur rounded-xl shadow-lg border border-white/60 slide-up">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black font-mono"
                      style={{ background: `linear-gradient(135deg, #F97316, #F43F5E)` }}>
                      {step.num}
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">{step.tag}</span>
                  </div>

                  {/* detail badge — bottom */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 backdrop-blur rounded-xl shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-white font-mono">{step.detail}</span>
                  </div>
                </div>

                {/* bottom info bar */}
                <div className="px-5 py-4 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 font-display">{step.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => pick(i)}
                        className="rounded-full transition-all duration-300"
                        style={i === activeStep
                          ? { width: 24, height: 8, background: 'linear-gradient(135deg, #F97316, #F43F5E)' }
                          : { width: 8, height: 8, background: '#E2E8F0' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" style={{ transitionDelay: '.2s' }}>
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 text-center card-hover shadow-sm">
              <div className="text-2xl sm:text-3xl font-black font-display brand-gradient-text">{s.value}</div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── CTA banner ── */}
        <div className="reveal" style={{ transitionDelay: '.26s' }}>
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{ background: 'linear-gradient(135deg, #F97316 0%, #F43F5E 50%, #EC4899 100%)' }}>

            {/* decorative circles */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 font-mono">
                    {lang === 'ru' ? 'Начни сегодня' : 'Start today'}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display mb-1">
                  {lang === 'ru' ? 'Первый тест — бесплатно' : 'First test is free'}
                </h3>
                <p className="text-white/80 text-sm">
                  {lang === 'ru'
                    ? '5 минут диагностики → персональный план → рост балла'
                    : '5 min diagnostic → personal plan → score improvement'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://testtop.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-slate-900 font-black px-7 py-3.5 rounded-xl flex items-center gap-2 hover:bg-orange-50 transition-all active:scale-95 shadow-lg"
                >
                  {lang === 'ru' ? 'Пройти AI-диагностику' : 'Take AI Diagnostic'}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2 text-white/80 text-sm justify-center">
                  <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                  {lang === 'ru' ? 'Без кредитной карты' : 'No credit card needed'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
