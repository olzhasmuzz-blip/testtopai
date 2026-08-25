import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { Smartphone, Star, CheckCircle2, ArrowRight, Play } from 'lucide-react';

interface StudentShowcaseSectionProps {
  lang: Language;
  onOpenTestModal: () => void;
}

const SCREENSHOTS = [
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.25.jpeg',
    labelRu: 'Экран входа',
    labelEn: 'Welcome Screen',
    descRu: 'Science-backed AI тренажёр прямо в телефоне',
    descEn: 'Science-backed AI trainer right in your pocket',
    tag: 'App',
  },
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.28.jpeg',
    labelRu: 'Выбор модуля',
    labelEn: 'Module Selection',
    descRu: 'Reading и Listening — продолжай с того места, где остановился',
    descEn: 'Reading & Listening — continue right where you left off',
    tag: 'Navigation',
  },
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.30.jpeg',
    labelRu: 'Diagram Label',
    labelEn: 'Diagram Label',
    descRu: 'Реальные задания экзамена с таймером и навигацией',
    descEn: 'Authentic exam tasks with countdown timer',
    tag: 'Reading',
  },
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.34.jpeg',
    labelRu: 'Summary Completion',
    labelEn: 'Summary Completion',
    descRu: 'Мгновенная проверка: зелёный — верно, красный — ошибка',
    descEn: 'Instant check: green = correct, red = wrong',
    tag: 'Feedback',
  },
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.36.jpeg',
    labelRu: 'Features Matching',
    labelEn: 'Features Matching',
    descRu: 'Интерактивные связи — перетаскивай и соединяй',
    descEn: 'Interactive matching — drag & connect answers',
    tag: 'Reading',
  },
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.39.jpeg',
    labelRu: 'Listen to Catch',
    labelEn: 'Listen to Catch',
    descRu: 'Разные акценты, реальные диалоги, прогресс к экзамену',
    descEn: 'Different accents, real dialogues, exam progress',
    tag: 'Listening',
  },
  {
    src: '/screens/WhatsApp Image 2026-08-21 at 10.59.42.jpeg',
    labelRu: 'Multiple Choice',
    labelEn: 'Multiple Choice',
    descRu: 'Аудиоплеер с регулировкой скорости и транскриптом',
    descEn: 'Audio player with speed control and transcript',
    tag: 'Listening',
  },
];

const TAG_COLORS: Record<string, string> = {
  App: 'bg-orange-100 text-orange-700',
  Navigation: 'bg-rose-100 text-rose-700',
  Reading: 'bg-emerald-100 text-emerald-700',
  Feedback: 'bg-amber-100 text-amber-700',
  Listening: 'bg-blue-100 text-blue-700',
};

const FEATURES_RU = [
  { icon: '⚡', text: 'Мгновенная обратная связь' },
  { icon: '🎯', text: 'Реальные задания IELTS' },
  { icon: '📱', text: 'Mobile-first дизайн' },
  { icon: '🏆', text: '4 модуля в одном приложении' },
];

const FEATURES_EN = [
  { icon: '⚡', text: 'Instant feedback on every answer' },
  { icon: '🎯', text: 'Authentic IELTS exam tasks' },
  { icon: '📱', text: 'Mobile-first experience' },
  { icon: '🏆', text: 'All 4 skills in one app' },
];

export const StudentShowcaseSection: React.FC<StudentShowcaseSectionProps> = ({ lang, onOpenTestModal }) => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const features = lang === 'ru' ? FEATURES_RU : FEATURES_EN;

  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setActive(i => (i + 1) % SCREENSHOTS.length);
    }, 3200);
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
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    if (autoRef.current) clearInterval(autoRef.current);
    setActive(i);
    startAuto();
  };

  const screen = SCREENSHOTS[active];

  return (
    <section id="app-showcase" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">

      {/* background blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)' }} />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            {lang === 'ru' ? 'Платформа в действии' : 'Platform in Action'}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {lang === 'ru'
              ? <>Всё, что нужно для IELTS —<br /><span className="brand-gradient-text">в одном приложении</span></>
              : <>Everything you need for IELTS —<br /><span className="brand-gradient-text">in one app</span></>
            }
          </h2>
          <p className="reveal text-slate-500 text-base leading-relaxed" style={{ transitionDelay: '.14s' }}>
            {lang === 'ru'
              ? 'Реальные скриншоты платформы. Никаких иллюстраций — только живой продукт, который уже помогает тысячам студентов.'
              : 'Real platform screenshots. No mockups — just the live product already helping thousands of students.'}
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left panel — feature list + thumbnail strip */}
          <div className="lg:col-span-5 space-y-6 reveal-left">

            {/* 4 feature pills */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl card-hover">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-sm font-semibold text-slate-800 leading-tight">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Screenshot thumbnail strip */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
                {lang === 'ru' ? 'Выбери экран' : 'Browse screens'}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {SCREENSHOTS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`relative rounded-xl overflow-hidden aspect-[9/16] border-2 transition-all duration-300
                      ${active === i ? 'border-orange-500 shadow-lg shadow-orange-200 scale-105' : 'border-slate-200 hover:border-orange-300 opacity-70 hover:opacity-100'}`}
                  >
                    <img
                      src={s.src}
                      alt={lang === 'ru' ? s.labelRu : s.labelEn}
                      className="w-full h-full object-cover"
                    />
                    {active === i && (
                      <div className="absolute inset-0 bg-orange-500/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Active screen info card */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[screen.tag] || 'bg-slate-100 text-slate-600'}`}>
                  {screen.tag}
                </span>
                <span className="text-sm font-extrabold text-slate-900 font-display">
                  {lang === 'ru' ? screen.labelRu : screen.labelEn}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === 'ru' ? screen.descRu : screen.descEn}
              </p>
              <div className="flex items-center gap-1 pt-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-slate-500 ml-1 font-mono">4.9 · {lang === 'ru' ? '2500+ учеников' : '2500+ students'}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onOpenTestModal}
              className="w-full brand-gradient text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 brand-glow hover:opacity-90 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              {lang === 'ru' ? 'Попробовать бесплатно' : 'Try for Free'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right panel — big phone mockup */}
          <div className="lg:col-span-7 flex justify-center reveal-right" style={{ transitionDelay: '.1s' }}>
            <div className="relative">
              {/* glow ring */}
              <div className="absolute inset-0 rounded-[40px] blur-3xl opacity-25 brand-gradient scale-95 pointer-events-none" />

              {/* phone frame */}
              <div className="relative w-[280px] sm:w-[320px] bg-slate-900 rounded-[44px] p-3 shadow-2xl phone-shadow">
                {/* notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full z-10" />
                {/* screen */}
                <div className="relative rounded-[34px] overflow-hidden aspect-[9/19] bg-white">
                  {SCREENSHOTS.map((s, i) => (
                    <img
                      key={i}
                      src={s.src}
                      alt={lang === 'ru' ? s.labelRu : s.labelEn}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
                        ${i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}`}
                    />
                  ))}

                  {/* bottom nav indicator overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* home indicator */}
                <div className="flex justify-center mt-2">
                  <div className="w-24 h-1 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* floating badge — top right */}
              <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-orange-100 px-4 py-2.5 flex items-center gap-2 animate-float-slow">
                <div className="w-8 h-8 rounded-xl brand-gradient flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono">{lang === 'ru' ? 'Точность оценки' : 'Score accuracy'}</p>
                  <p className="text-sm font-black text-slate-900">95%</p>
                </div>
              </div>

              {/* floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl border border-orange-100 px-4 py-2.5 animate-float-med">
                <p className="text-[10px] text-slate-400 font-mono">{lang === 'ru' ? 'Студентов онлайн' : 'Students online'}</p>
                <p className="text-sm font-black brand-gradient-text">2,500+</p>
              </div>

              {/* dot indicators */}
              <div className="flex justify-center gap-1.5 mt-6">
                {SCREENSHOTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    className={`rounded-full transition-all duration-300 ${i === active
                      ? 'w-6 h-2'
                      : 'w-2 h-2 bg-slate-300 hover:bg-orange-300'}`}
                    style={i === active ? { background: 'linear-gradient(135deg, #F97316, #F43F5E)' } : {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
