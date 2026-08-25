import React, { useState, useEffect, useRef } from 'react';
import { translations, roadmapMilestones, faqs } from '../data/content';
import { Language } from '../types';
import {
  Sparkles, Globe2, ChevronDown, ArrowRight,
  Send, Award, Newspaper, Compass, Check, Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RoadmapVisionSectionProps {
  lang: Language;
  onOpenTestModal: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  completed: 'border-emerald-500 bg-emerald-500 text-white',
  active:    'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30',
  upcoming:  'border-slate-300 bg-white text-slate-400',
};

export const RoadmapVisionSection: React.FC<RoadmapVisionSectionProps> = ({ lang, onOpenTestModal }) => {
  const t = translations[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
    setTimeout(() => onOpenTestModal(), 1200);
  };

  return (
    <section id="roadmap" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />{t.roadmap.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>
            {t.roadmap.title}
          </h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* ── Team track record + roadmap ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">

          {/* Fluentme card */}
          <div className="lg:col-span-6 bg-slate-50 p-7 rounded-3xl border border-slate-200 text-left flex flex-col justify-between reveal-left">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20">
                  <Award className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg font-mono">
                  Proven Track Record
                </span>
              </div>

              {/* founder strip */}
              <div className="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Founders" referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 font-display">
                    {lang === 'ru' ? 'Основатели TestTop & Fluentme' : 'TestTop & Fluentme Founders'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {lang === 'ru' ? 'EdTech ветераны, Cambridge & ITMO ML Lab' : 'EdTech Veterans, 10+ yrs NLP & ML'}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 font-display">{t.roadmap.fluentmeTitle}</h3>
              <p className="text-sm text-slate-600 mt-1">{t.roadmap.fluentmeSub}</p>

              <div className="grid grid-cols-3 gap-3 my-6 text-center">
                {[
                  { v: '2019', l: 'Founded', c: 'text-slate-900' },
                  { v: '2022', l: 'Exited',  c: 'text-emerald-600' },
                  { v: '5,000+', l: 'MAU',   c: 'text-indigo-600' },
                ].map(s => (
                  <div key={s.l} className="p-3 bg-white rounded-2xl border border-slate-200">
                    <span className={`font-mono font-black text-xl block ${s.c}`}>{s.v}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>{t.roadmap.forbesArticle}</span>
              </div>
              <span className="font-bold text-indigo-600 font-mono shrink-0">Forbes 2022</span>
            </div>
          </div>

          {/* Roadmap timeline */}
          <div className="lg:col-span-6 bg-white p-7 rounded-3xl border border-slate-200 shadow-sm text-left reveal-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="font-extrabold text-lg text-slate-900 font-display">TestTop AI Roadmap</h3>
              <span className="text-xs font-mono text-slate-400">IELTS → TOEIC → SAT → GMAT</span>
            </div>

            {/* vertical timeline */}
            <div className="relative pl-8">
              {/* connecting line */}
              <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-200" />

              <div className="space-y-5">
                {roadmapMilestones.map((m, i) => {
                  const isActive = activeMilestone === i;
                  return (
                    <div key={i} onClick={() => setActiveMilestone(i)}
                      className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                        ${isActive ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-slate-50/80 border-slate-100 hover:bg-slate-100/50'}`}>
                      {/* dot */}
                      <div className={`absolute -left-[1.65rem] top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black
                        ${m.status === 'completed' ? 'border-emerald-500 bg-emerald-500 text-white'
                          : m.status === 'active' ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300 bg-white text-slate-400'}`}>
                        {m.status === 'completed' ? '✓' : m.status === 'active' ? <span className="w-2 h-2 rounded-full bg-white animate-ping" /> : ''}
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-extrabold text-sm text-slate-900 font-display">{m.title}</h4>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md
                          ${m.status === 'active' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {m.period}
                        </span>
                      </div>
                      {isActive && (
                        <p className="text-xs text-slate-600 leading-relaxed mt-1 slide-up">{m.description}</p>
                      )}
                      <span className={`inline-block mt-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md
                        ${m.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {m.metrics}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Vision banner ── */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl mb-16 relative overflow-hidden reveal" style={{ transitionDelay: '.18s' }}>
          <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Globe2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">{t.roadmap.visionTitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-display leading-snug">
                {t.roadmap.visionText}
              </h3>
            </div>
            <div className="lg:col-span-4">
              <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-xs text-slate-400 font-mono block">Global Architecture</span>
                <span className="text-2xl font-black text-white font-display mt-0.5 block">100% Scalable</span>
                <span className="text-[11px] text-emerald-400 font-mono">Zero Classroom Bottlenecks</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA lead capture ── */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-9 sm:p-12 rounded-3xl border-2 border-indigo-600/30 shadow-xl mb-16 text-center max-w-4xl mx-auto reveal" style={{ transitionDelay: '.22s' }}>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-5 animate-float-slow">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">{t.roadmap.ctaBoxTitle}</h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mt-2 mb-7">{t.roadmap.ctaBoxSub}</p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input type="text" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder={t.roadmap.ctaInputPlaceholder}
              className="flex-1 px-4 py-3 text-sm rounded-xl bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none shadow-sm text-slate-800 transition-all" />
            <button type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]">
              {submitted ? <><Check className="w-4 h-4" /> {lang === 'ru' ? 'Открываем...' : 'Opening...'}</> : <>{t.roadmap.ctaSubmitBtn} <Send className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> {lang === 'ru' ? 'Без карты' : 'No credit card'}</span>
            <span>•</span>
            <span>{lang === 'ru' ? 'Мгновенный доступ' : 'Instant free trial'}</span>
          </div>
        </div>

        {/* ── FAQ accordion ── */}
        <div className="max-w-3xl mx-auto reveal" style={{ transitionDelay: '.26s' }}>
          <h3 className="text-2xl font-black text-slate-900 font-display text-center mb-8">{t.roadmap.faqTitle}</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`rounded-2xl border overflow-hidden transition-all duration-300
                  ${isOpen ? 'border-indigo-200 bg-white shadow-sm' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm cursor-pointer hover:text-indigo-700 transition-colors">
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-3 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-white">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
