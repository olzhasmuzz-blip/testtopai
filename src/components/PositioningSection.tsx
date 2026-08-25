import React, { useState, useEffect, useRef } from 'react';
import { translations, comparisonRows } from '../data/content';
import { Language } from '../types';
import { Trophy, XCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface PositioningSectionProps { lang: Language; }

export const PositioningSection: React.FC<PositioningSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [highlightRow, setHighlightRow] = useState<number | null>(null);
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* stagger rows on scroll */
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        comparisonRows.forEach((_, i) => {
          setTimeout(() => setVisibleRows(prev => [...prev, i]), i * 80);
        });
      }
    }, { threshold: 0.2 });
    if (tableRef.current) io.observe(tableRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="comparison" ref={sectionRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />{t.positioning.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {t.positioning.title}
          </h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
            {t.positioning.subtitle}
          </p>
        </div>

        {/* ── 2 column cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Legacy */}
          <div className="reveal-left bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase font-mono">
                  {lang === 'ru' ? 'Традиционные методы' : 'Traditional Methods'}
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-0.5">
                  {lang === 'ru' ? 'Рынок сегодня' : 'Market Today'}
                </h3>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold rounded-full font-mono">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Legacy
              </span>
            </div>
            <div className="space-y-3">
              {[
                { title: lang === 'ru' ? 'Платформы с контентом' : 'Content Platforms', desc: lang === 'ru' ? 'Статичные материалы, ноль персонализации.' : 'Static materials, zero dynamic personalization.' },
                { title: lang === 'ru' ? 'Пробные тесты' : 'Mock Test Providers', desc: lang === 'ru' ? 'Ограниченный фидбек, нет адаптации сложности.' : 'Limited feedback, zero algorithmic adaptation.' },
                { title: lang === 'ru' ? 'Живые репетиторы' : 'Human Tutors', desc: lang === 'ru' ? '$200–$400 в мес, субъективная оценка.' : '$200/month, subjective scoring, not scalable.' },
                { title: lang === 'ru' ? 'Офлайн-центры' : 'Offline Centers', desc: lang === 'ru' ? 'Географические ограничения, жёсткий график.' : 'Physical access only, no real-time availability.' },
                { title: lang === 'ru' ? 'Оценка Speaking/Writing' : 'Speaking / Writing', desc: lang === 'ru' ? 'Субъективная ручная проверка.' : 'Poorly evaluated, human bias.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-rose-200 transition-colors">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-display">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TestTop AI */}
          <div className="reveal-right bg-white p-6 sm:p-8 rounded-3xl border-2 border-indigo-600 shadow-xl shadow-indigo-600/10 text-left relative overflow-hidden">
            {/* glow sweep */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
            <div className="flex items-center justify-between border-b border-indigo-100 pb-4 mb-6 relative z-10">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase font-mono">
                  {lang === 'ru' ? 'Будущее экзаменов' : 'The Future of Prep'}
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-0.5">TestTop AI</h3>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-sm shadow-indigo-600/30 font-mono">
                <Sparkles className="w-3.5 h-3.5" /> AI-Native
              </span>
            </div>
            <div className="space-y-3 relative z-10">
              {[
                { title: lang === 'ru' ? 'AI-Native платформа' : 'AI-Native Platform', desc: lang === 'ru' ? 'Мгновенная оценка с детальным фидбеком за 2 сек.' : 'Real-time evaluation & line-by-line feedback in 2s.' },
                { title: lang === 'ru' ? 'Полная автоматизация' : 'Full Automation', desc: lang === 'ru' ? 'Ноль ручного вмешательства, 100% масштабируемость.' : 'Zero human intervention, 100% scalable.' },
                { title: lang === 'ru' ? 'Непрерывное обучение' : 'Continuous Learning', desc: lang === 'ru' ? 'Самообучающийся движок адаптируется под ошибки.' : 'Self-improving engine learning from every interaction.' },
                { title: lang === 'ru' ? 'Глобальная масштабируемость' : 'Global Scalability', desc: lang === 'ru' ? '$0.01 предельная стоимость на 150+ стран.' : 'Zero marginal cost infrastructure for millions.' },
                { title: lang === 'ru' ? 'Все 4 навыка' : 'All 4 Skills Covered', desc: lang === 'ru' ? 'Reading, Writing, Speaking, Listening в одной подписке.' : 'Complete coverage in one unified subscription.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 hover:border-indigo-300 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 font-display">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Animated comparison table ── */}
        <div ref={tableRef} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden reveal mb-10">
          {/* table header */}
          <div className="grid grid-cols-12 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold font-mono uppercase text-slate-400">
            <div className="col-span-4">{lang === 'ru' ? 'Критерий' : 'Feature'}</div>
            <div className="col-span-4 text-rose-500 text-center">{lang === 'ru' ? 'Устаревший рынок' : 'Legacy Market'}</div>
            <div className="col-span-4 text-indigo-600 text-center">TestTop AI</div>
          </div>
          {comparisonRows.map((row, i) => (
            <div key={i}
              onMouseEnter={() => setHighlightRow(i)}
              onMouseLeave={() => setHighlightRow(null)}
              className={`grid grid-cols-12 px-5 py-4 border-b border-slate-100 transition-all duration-300 cursor-default
                ${visibleRows.includes(i) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                ${highlightRow === i ? 'bg-indigo-50/60' : 'hover:bg-slate-50'}`}
              style={{ transitionDelay: `${i * 60}ms`, transition: 'opacity .4s ease, transform .4s ease, background .2s ease' }}>
              <div className="col-span-4 text-sm font-semibold text-slate-800 flex items-center">{row.feature}</div>
              <div className="col-span-4 text-xs text-slate-500 flex items-center justify-center text-center px-2">
                <span className="flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />{row.legacy}
                </span>
              </div>
              <div className="col-span-4 text-xs text-indigo-700 font-semibold flex items-center justify-center text-center px-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />{row.testTopAI}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Category creation banner ── */}
        <div className="reveal rounded-3xl border-2 border-indigo-600 bg-indigo-50/50 p-7 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm" style={{ transitionDelay: '.2s' }}>
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-slate-900 font-display">{t.positioning.categoryTitle}</h4>
              <p className="text-sm text-slate-600 mt-0.5">{t.positioning.categorySub}</p>
            </div>
          </div>
          <span className="px-5 py-2.5 bg-indigo-600 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm whitespace-nowrap neon-pulse">
            AI-First Approach
          </span>
        </div>

      </div>
    </section>
  );
};
