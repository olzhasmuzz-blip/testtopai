import React, { useState, useEffect, useRef } from 'react';
import { translations, moduleSkills, aiIntelligenceLayers } from '../data/content';
import { Language } from '../types';
import { Mic, CheckCircle2, Sparkles, ArrowRight, Check, Zap } from 'lucide-react';

interface ModulesSectionProps {
  lang: Language;
  onOpenTestModal: () => void;
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({ lang, onOpenTestModal }) => {
  const t = translations[lang];
  const MODULES_VISUAL = '/illustrations/modules-dashboard.svg';
  const [selected, setSelected] = useState<'reading' | 'listening' | 'writing' | 'speaking'>('writing');
  const [essay, setEssay] = useState('In recent years, artificial intelligence has become increasingly prominent in education. While some argue it undermines human tutors, I firmly believe AI enhances personalized learning.');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ band: string; ta: string; cc: string; lr: string; gr: string; tip: string } | null>({
    band: '8.0', ta: '8.5 – Clear position & well-developed arguments', cc: '8.0 – Smooth linking & logical flow',
    lr: '8.0 – High academic lexical density', gr: '8.0 – Complex syntax, high accuracy',
    tip: 'Upgrade "In recent years" → "Over the past decade" for academic flair.',
  });
  const [isRecording, setIsRecording] = useState(false);
  const [speakScore, setSpeakScore] = useState<string | null>('Band 8.0 · Fluency 8.5 · 0 filler words');
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true); setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({ band: (7.5 + Math.random()).toFixed(1), ta: '8.5 – Directly addresses the prompt with clear stance', cc: '8.0 – Cohesive paragraph progression detected', lr: '8.5 – Advanced academic collocations verified', gr: '8.0 – Zero tense agreement errors', tip: 'Add a concession clause in conclusion for Band 9 coherence.' });
    }, 1400);
  };

  const handleRecord = () => {
    if (isRecording) { setIsRecording(false); setSpeakScore('Band 8.5 · Pronunciation 9.0 · 0 filler words'); }
    else { setIsRecording(true); setSpeakScore(null); setTimeout(() => { setIsRecording(false); setSpeakScore('Band 8.5 · Pronunciation 9.0 · 0 filler words'); }, 3000); }
  };

  const skill = moduleSkills.find(s => s.id === selected)!;

  return (
    <section id="modules" ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> {lang === 'ru' ? 'Как выглядит обучение внутри' : 'How learning looks inside'}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>{t.modules.title}</h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>
            {lang === 'ru'
              ? 'Каждый модуль показывает, что делать студенту дальше, а не просто демонстрирует интерфейс.'
              : t.modules.subtitle}
          </p>
        </div>

        {/* 4 Module tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 reveal stagger" style={{ transitionDelay: '.18s' }}>
          {moduleSkills.map(sk => {
            const isSel = selected === sk.id;
            return (
              <button key={sk.id} onClick={() => { setSelected(sk.id); setAnimKey(k => k + 1); }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-250 cursor-pointer card-hover
                  ${isSel ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'}`}>
                <div className="relative mb-3 overflow-hidden rounded-2xl aspect-[4/3] brand-gradient">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_40%)]" />
                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${isSel ? 'bg-white text-slate-900' : 'bg-white/90 text-slate-700'}`}>
                        {sk.accuracy}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-white/80" />
                    </div>
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center text-white font-black text-sm">
                        {sk.title.slice(0, 2).toUpperCase()}
                      </div>
                      <h3 className="mt-2 font-extrabold text-base sm:text-lg text-white">{sk.title}</h3>
                    </div>
                  </div>
                </div>
                <p className={`text-xs mt-0.5 ${isSel ? 'text-slate-300' : 'text-slate-500'}`}>{sk.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Module detail + Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div key={`detail-${animKey}`} className="lg:col-span-5 bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden reveal-left"
            style={{ animation: 'slide-up .45s cubic-bezier(.16,1,.3,1)' }}>
            <div className="relative h-44 overflow-hidden bg-[#FFF7F1]">
              <img src={MODULES_VISUAL} alt="" className="w-full h-full object-contain p-4" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFF7F1] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-display">{skill.title} Master Engine</h3>
                  <p className="text-xs text-slate-500">{skill.sampleTitle}</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-slate-900 border border-orange-100 bg-white/90 backdrop-blur">{skill.accuracy}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider font-bold">
                {lang === 'ru' ? 'Что получает студент внутри модуля' : lang === 'kz' ? 'IELTS модулінің ресми сипаттамасы' : 'What the learner gets inside the module'}
              </p>
              <div className="space-y-2.5">
                {skill.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div>
                    {cap}
                  </div>
                ))}
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                  <span>Band 5.5 → 9.0 Adaptive</span><span className="font-bold text-slate-800">100% IDP Compliant</span>
                </div>
                <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all">
                  {t.modules.practiceNowBtn} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Live sandbox */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 reveal-right">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-md font-mono">
                  {lang === 'ru' ? 'Интерактивное демо' : lang === 'kz' ? 'Интерактивті демо' : 'Live Interactive Demo'}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 font-display">{lang === 'ru' ? 'AI-проверка прямо здесь' : lang === 'kz' ? 'AI-тексеру дәл осында' : 'Live AI Evaluation Sandbox'}</h4>
              </div>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                {lang === 'ru' ? 'Критерии Cambridge v4.2' : lang === 'kz' ? 'Cambridge критерийлері v4.2' : 'Cambridge Rubric v4.2'}
              </span>
            </div>

            {selected === 'speaking' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-2">{lang === 'ru' ? 'Speaking Part 2 — Анализ речи в реальном времени' : lang === 'kz' ? 'Speaking Part 2 — Сөйлеуді нақты уақытта талдау' : 'Speaking Part 2 – Real-Time Voice Analyzer'}</p>
                  <p className="text-xs text-slate-500 italic">"Describe an interesting tradition in your home country and explain why it is significant."</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <button onClick={handleRecord}
                    className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 transition-all cursor-pointer
                      ${isRecording ? 'bg-rose-600 text-white animate-pulse shadow-lg' : 'brand-gradient text-white brand-glow'}`}>
                    <Mic className="w-4 h-4" />
                    {isRecording ? (lang === 'ru' ? 'Слушаю...' : lang === 'kz' ? 'Тыңдап тұрмын...' : 'Recording...') : (lang === 'ru' ? 'Записать ответ' : lang === 'kz' ? 'Жауап жазу' : 'Test Speaking')}
                  </button>
                  {isRecording ? (
                    <div className="flex items-end gap-1 h-8">
                      {[3,7,5,10,6,12,4,9,7,11,5,8].map((h, i) => (
                        <div key={i} className="w-1.5 rounded-full wave-bar"
                          style={{ height: `${h * 2}px`, animationDelay: `${i * 60}ms`, background: 'linear-gradient(to top, #F97316, #F43F5E)' }} />
                      ))}
                      <span className="text-xs font-mono text-rose-500 font-bold ml-2">Analyzing…</span>
                    </div>
                  ) : <span className="text-xs text-slate-400 font-mono">Audio latency: 120ms</span>}
                </div>
                {speakScore && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />{speakScore}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-700">{lang === 'ru' ? 'Введите текст эссе или параграф:' : lang === 'kz' ? 'Эссе немесе параграф мәтінін енгізіңіз:' : 'Enter essay or paragraph sample:'}</label>
                <textarea value={essay} onChange={e => setEssay(e.target.value)} rows={4}
                  className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-slate-800 bg-slate-50/50 resize-none transition-all" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{essay.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <button onClick={handleAnalyze} disabled={analyzing}
                    className="px-5 py-2.5 rounded-xl brand-gradient text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all brand-glow">
                    <Sparkles className={`w-3.5 h-3.5 ${analyzing ? 'animate-spin' : ''}`} />
                    {analyzing ? (lang === 'ru' ? 'Анализирую...' : lang === 'kz' ? 'Талдап жатырмын...' : 'Analyzing...') : (lang === 'ru' ? 'Оценить за 2 сек' : lang === 'kz' ? '2 секундта бағалау' : 'Evaluate in 2s')}
                  </button>
                </div>
                {result && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 slide-up">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold font-mono text-xs">Band {result.band} Predicted</span>
                      <span className="text-[10px] text-slate-400 font-mono">Response: 1.8s · 95% calibration</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[{ l: 'Task Achievement', v: result.ta }, { l: 'Coherence & Cohesion', v: result.cc }, { l: 'Lexical Resource', v: result.lr }, { l: 'Grammatical Range', v: result.gr }].map(({ l, v }) => (
                        <div key={l} className="p-2.5 rounded-lg bg-slate-800">
                          <span className="text-[9px] text-slate-400 font-mono block">{l}</span>
                          <span className="text-slate-200 font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Band 9 AI Tip:</strong> {result.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* AI intelligence layer */}
        <div className="p-7 sm:p-9 rounded-3xl bg-[#FFF7F1] border border-orange-100 shadow-xl reveal" style={{ transitionDelay: '.2s' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-100 pb-5 mb-6">
            <div>
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">{lang === 'ru' ? 'Что студент получает на выходе' : 'What the learner gets back'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">{lang === 'ru' ? 'Четыре понятных результата для ученика' : lang === 'kz' ? 'Артық шуусыз төрт нақты нәтиже' : 'Four clear outcomes for the learner'}</h3>
            </div>
            <span className="px-3 py-1 bg-white text-slate-600 border border-orange-100 rounded-full text-xs font-mono self-start">
              {lang === 'ru' ? 'Подано через иллюстрации и живой интерфейс' : 'Presented through illustrations and product UI'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiIntelligenceLayers.map((layer, i) => (
              <div key={layer.id} className="p-4 rounded-2xl bg-white border border-orange-100 hover:border-orange-200 transition-colors card-hover shadow-sm" style={{ transitionDelay: `${i * 0.06}s` }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl brand-gradient text-white flex items-center justify-center font-black text-sm">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 font-display">
                    {lang === 'ru' ? layer.nameRu : lang === 'kz' ? layer.nameRu : layer.nameEn}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{lang === 'ru' ? layer.descRu : lang === 'kz' ? layer.descRu : layer.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
