import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { ArrowRight } from 'lucide-react';

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

const STORY_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    titleRu: 'Живая подготовка',
    titleEn: 'Real study session',
    descRu: 'Студент не смотрит на абстрактную схему, а учится на реальных заданиях и экранах.',
    descEn: 'A real learner works through actual exam tasks and product screens.',
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80',
    titleRu: 'Разбор на ходу',
    titleEn: 'On-the-go review',
    descRu: 'Проверка эссе и заметки прямо в телефоне, без лишнего интерфейсного шума.',
    descEn: 'Essay review and notes on mobile, without unnecessary interface noise.',
  },
  {
    src: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=900&auto=format&fit=crop&q=80',
    titleRu: 'Сцена из аудитории',
    titleEn: 'In the classroom',
    descRu: 'Более человеческий, учебный контекст вместо стерильного AI-рендера.',
    descEn: 'A human learning context instead of a sterile AI render.',
  },
];

export const StudentShowcaseSection: React.FC<StudentShowcaseSectionProps> = ({ lang, onOpenTestModal }) => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  return (
    <section id="app-showcase" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4 relative z-10">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            {lang === 'ru' ? 'Живой продукт' : 'Live product'}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {lang === 'ru'
              ? <>Больше реальных сцен,<br /><span className="brand-gradient-text">меньше декоративного шума</span></>
              : <>More real scenes,<br /><span className="brand-gradient-text">less decorative noise</span></>
            }
          </h2>
          <p className="reveal text-slate-500 text-base leading-relaxed" style={{ transitionDelay: '.14s' }}>
            {lang === 'ru'
              ? 'Мы оставили интерфейс только там, где он помогает, и добавили больше живых фото, чтобы секция ощущалась как настоящий образовательный продукт.'
              : 'We keep the UI only where it helps and add more real photos so the section feels like a genuine learning product.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
          <div className="lg:col-span-5 space-y-6 reveal-left">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-7 rounded-[28px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-100">
                <img
                  src={STORY_PHOTOS[0].src}
                  alt={lang === 'ru' ? STORY_PHOTOS[0].titleRu : STORY_PHOTOS[0].titleEn}
                  className="w-full h-[300px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-5 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 font-display">
                        {lang === 'ru' ? STORY_PHOTOS[0].titleRu : STORY_PHOTOS[0].titleEn}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {lang === 'ru' ? STORY_PHOTOS[0].descRu : STORY_PHOTOS[0].descEn}
                      </p>
                    </div>
                    <span className="shrink-0 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[10px] font-bold uppercase tracking-wider">
                      24/7
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-5 space-y-4">
                {STORY_PHOTOS.slice(1).map((photo, i) => (
                  <div key={photo.src} className="rounded-[24px] overflow-hidden border border-slate-100 shadow-lg bg-white">
                    <img
                      src={photo.src}
                      alt={lang === 'ru' ? photo.titleRu : photo.titleEn}
                      className="w-full h-[142px] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-4">
                      <h4 className="text-sm font-extrabold text-slate-900 font-display">
                        {lang === 'ru' ? photo.titleRu : photo.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {lang === 'ru' ? photo.descRu : photo.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                lang === 'ru' ? 'Реальные задания' : 'Real tasks',
                lang === 'ru' ? 'Живой прогресс' : 'Visible progress',
                lang === 'ru' ? 'Понятный фидбек' : 'Clear feedback',
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mb-3" />
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-slate-400 font-mono">
                  {lang === 'ru' ? 'Почему это работает' : 'Why it works'}
                </p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {lang === 'ru'
                    ? 'Показываем не абстракцию, а среду, в которой студент реально готовится каждый день.'
                    : 'We show the real environment where students actually study every day.'}
                </p>
              </div>
              <a
                href="https://testtop.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 brand-gradient text-white font-black py-3 px-5 rounded-2xl flex items-center justify-center gap-2 brand-glow hover:opacity-90 transition-all active:scale-95"
              >
                {lang === 'ru' ? 'Попробовать' : 'Try it'}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 flex justify-center reveal-right" style={{ transitionDelay: '.1s' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-[40px] blur-3xl opacity-20 brand-gradient scale-95 pointer-events-none" />

              <div className="relative w-[280px] sm:w-[320px] bg-slate-900 rounded-[44px] p-3 shadow-2xl phone-shadow">
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-full z-10" />
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
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>
                <div className="flex justify-center mt-2">
                  <div className="w-24 h-1 bg-white/30 rounded-full" />
                </div>
              </div>

              <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl border border-orange-100 px-4 py-2.5 flex items-center gap-2 animate-float-slow">
                <div>
                  <p className="text-[10px] text-slate-400 font-mono">{lang === 'ru' ? 'Точность оценки' : 'Score accuracy'}</p>
                  <p className="text-sm font-black text-slate-900">95%</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-xl border border-orange-100 px-4 py-2.5 animate-float-med">
                <p className="text-[10px] text-slate-400 font-mono">{lang === 'ru' ? 'Студентов онлайн' : 'Students online'}</p>
                <p className="text-sm font-black brand-gradient-text">2,500+</p>
              </div>

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

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {lang === 'ru' ? 'Реальные экраны приложения, без макетного шума' : 'Real app screens, no mockup noise'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
