import React, { useEffect, useRef } from 'react';
import { BookOpen, CheckCircle2, Clock3, Headphones, MessageCircle, PenLine, Target } from 'lucide-react';

interface ProblemSectionProps { lang: string; }

const checklist = [
  'Привыкаете отвечать в условиях жёсткого тайминга',
  'Слушаете задания разного формата и учитесь ловить контекст',
  'Пишете эссе с моментальной проверкой по критериям',
];

export const ProblemSection: React.FC<ProblemSectionProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="problem" ref={sectionRef} className="scroll-mt-28 pt-24 pb-40 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-32 h-72 w-72 rounded-full bg-orange-50 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-16 h-80 w-80 rounded-full bg-emerald-50 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mb-12 md:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-[56px] font-semibold leading-[1.12] text-[#302D55] tracking-normal">
            Подготовьтесь к экзамену и сдайте его без лишнего стресса
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <article className="reveal relative min-h-[340px] overflow-hidden rounded-[18px] bg-[#F4F3F8] p-8 sm:p-10 lg:col-span-5 shadow-[0_20px_60px_rgba(48,45,85,0.06)]">
            <div className="absolute -right-32 -bottom-36 h-80 w-80 rounded-full border-[52px] border-[#DED8FA] opacity-45 sm:opacity-80" />
            <div className="absolute right-9 bottom-10 hidden w-28 rounded-2xl bg-white/90 p-3 shadow-[0_18px_40px_rgba(48,45,85,.12)] backdrop-blur sm:block">
              <div className="mb-2 h-2 w-14 rounded-full bg-[#302D55]/20" />
              <div className="space-y-1.5">
                <div className="h-2 rounded-full bg-orange-400" />
                <div className="h-2 w-4/5 rounded-full bg-emerald-400" />
                <div className="h-2 w-2/3 rounded-full bg-rose-300" />
              </div>
            </div>

            <div className="relative z-10 max-w-sm">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#302D55] shadow-[0_8px_22px_rgba(48,45,85,.08)]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold leading-tight text-[#242148] tracking-normal">
                Получаете полную диагностику знаний
              </h3>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#242148] font-medium">
                За несколько минут система показывает текущий уровень, слабые места и примерный путь до целевого балла.
              </p>
            </div>
          </article>

          <article className="reveal relative min-h-[340px] overflow-hidden rounded-[18px] bg-[#F4F3F8] p-8 sm:p-10 lg:col-span-7 shadow-[0_20px_60px_rgba(48,45,85,0.06)]" style={{ transitionDelay: '.06s' }}>
            <div className="absolute -right-20 top-8 h-64 w-64 rounded-full bg-white/60" />
            <div className="absolute right-8 bottom-8 hidden lg:block w-64 rounded-[24px] bg-white p-4 shadow-[0_22px_55px_rgba(48,45,85,.12)]">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="h-12 w-12 rounded-2xl brand-gradient flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="h-2.5 w-28 rounded-full bg-[#302D55]/20" />
                  <div className="mt-2 h-2 w-20 rounded-full bg-[#A9A5C4]" />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-emerald-50 p-3">
                  <div className="h-2 w-28 rounded-full bg-emerald-400" />
                  <div className="mt-2 h-2 w-36 rounded-full bg-emerald-200" />
                </div>
                <div className="rounded-2xl bg-rose-50 p-3">
                  <div className="h-2 w-24 rounded-full bg-rose-400" />
                  <div className="mt-2 h-2 w-32 rounded-full bg-rose-200" />
                </div>
              </div>
            </div>

            <div className="relative z-10 max-w-md">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#302D55] shadow-[0_8px_22px_rgba(48,45,85,.08)]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold leading-tight text-[#242148] tracking-normal">
                Устраняете пробелы без ожидания преподавателя
              </h3>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#242148] font-medium">
                AI сразу объясняет, где вы теряете баллы, и подсказывает, что исправить в следующей попытке.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#25224A]">Персональная траектория</p>
                  <p className="text-xs text-[#9B98B4]">Фокус только на вашем прогрессе</p>
                </div>
              </div>
            </div>
          </article>

          <article className="reveal relative min-h-[340px] overflow-hidden rounded-[18px] bg-[#F4F3F8] p-8 sm:p-10 lg:col-span-7 shadow-[0_20px_60px_rgba(48,45,85,0.06)]" style={{ transitionDelay: '.1s' }}>
            <div className="absolute right-8 top-8 hidden xl:grid grid-cols-2 gap-3">
              {[
                { icon: <BookOpen className="w-4 h-4" />, label: 'Reading', color: 'bg-emerald-100 text-emerald-700' },
                { icon: <Headphones className="w-4 h-4" />, label: 'Listening', color: 'bg-sky-100 text-sky-700' },
                { icon: <PenLine className="w-4 h-4" />, label: 'Writing', color: 'bg-orange-100 text-orange-700' },
                { icon: <MessageCircle className="w-4 h-4" />, label: 'Speaking', color: 'bg-rose-100 text-rose-700' },
              ].map(skill => (
                <div key={skill.label} className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-bold shadow-sm ${skill.color}`}>
                  {skill.icon}{skill.label}
                </div>
              ))}
            </div>

            <div className="relative z-10 max-w-lg">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#302D55] shadow-[0_8px_22px_rgba(48,45,85,.08)]">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold leading-tight text-[#242148] tracking-normal">
                Тренируете все навыки, которые проверяют на экзамене
              </h3>
              <div className="mt-7 space-y-4">
                {checklist.map(item => (
                  <div key={item} className="flex items-start gap-3 text-base sm:text-lg leading-snug text-[#242148] font-medium">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 fill-[#302D55] text-white" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="reveal relative min-h-[340px] overflow-hidden rounded-[18px] bg-[#F4F3F8] p-8 sm:p-10 lg:col-span-5 shadow-[0_20px_60px_rgba(48,45,85,0.06)]" style={{ transitionDelay: '.14s' }}>
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#DED8FA]" />
            <div className="absolute right-8 bottom-8 hidden sm:grid grid-cols-3 gap-2 opacity-90">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`h-10 w-10 rounded-xl ${i === 2 || i === 4 || i === 7 ? 'bg-orange-400' : 'bg-white/80'}`} />
              ))}
            </div>

            <div className="relative z-10 max-w-sm">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#302D55] shadow-[0_8px_22px_rgba(48,45,85,.08)]">
                <Clock3 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-[28px] font-semibold leading-tight text-[#242148] tracking-normal">
                Знакомитесь со всеми тонкостями формата
              </h3>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#242148] font-medium">
                Вы заранее понимаете структуру заданий, типичные ловушки и ошибки, которые чаще всего снимают баллы.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
