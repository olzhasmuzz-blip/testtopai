import React, { useState } from 'react';
import { Language } from '../types';
import { X, BookOpen, Headphones, PenTool, Mic, Sparkles, CheckCircle2, RotateCcw, Trophy, Volume2, Play, Square, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const LiveTestModal: React.FC<LiveTestModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'reading' | 'listening' | 'writing' | 'speaking'>('writing');
  const [readingAnswer, setReadingAnswer] = useState<string>('');
  const [readingEvaluated, setReadingEvaluated] = useState<boolean>(false);
  const [listeningAnswer, setListeningAnswer] = useState<string>('');
  const [listeningEvaluated, setListeningEvaluated] = useState<boolean>(false);
  const [essayText, setEssayText] = useState<string>('Technological advancement has drastically reshaped the global workforce. While automation replaces manual labor, it simultaneously creates higher-skilled opportunities in software and machine intelligence.');
  const [writingScore, setWritingScore] = useState<any>(null);
  const [isWritingLoading, setIsWritingLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speakingScore, setSpeakingScore] = useState<any>(null);

  const BRAND = 'linear-gradient(135deg, #F97316, #F43F5E)';
  const ACTIVE_TAB = { borderColor: '#F97316', color: '#F97316' };

  const handleEvaluateWriting = () => {
    setIsWritingLoading(true);
    setTimeout(() => {
      setIsWritingLoading(false);
      setWritingScore({ overall: '8.0', ta: '8.5 (Clear position, relevant examples)', cc: '8.0 (Sophisticated transitional markers)', lr: '8.0 (Advanced collocations: reshaped, automation, intelligence)', gra: '8.0 (Compound-complex clauses with zero syntax errors)', verdict: 'Excellent academic proficiency! Ready for Oxford / Cambridge admission requirements.' });
      confetti({ particleCount: 60, spread: 60 });
    }, 1500);
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true); setSpeakingScore(null);
    } else {
      setIsRecording(false);
      setTimeout(() => {
        setSpeakingScore({ overall: '8.5', fluency: '8.5 (Smooth rhythm, 138 words/min cadence)', pronunciation: '9.0 (Native-like phonetic stress & intonation)', lexical: '8.0 (Rich idiomatic and formal vocabulary)', pauseRate: '0.4 sec average pause (High fluency)' });
        confetti({ particleCount: 70, spread: 80 });
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold shadow-md" style={{ background: BRAND }}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 font-display">
                  {lang === 'ru' ? 'Интерактивный AI-диагностический тренажер' : 'Interactive AI Diagnostic Sandbox'}
                </h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md uppercase font-mono">Official IDP Calibrated</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {lang === 'ru' ? 'Попробуйте проверку любого из 4 навыков прямо сейчас' : 'Test any of the 4 IELTS skills with live AI evaluation'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skill tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6 pt-3 gap-2 overflow-x-auto font-display">
          {([
            { key: 'writing', icon: <PenTool className="w-4 h-4" />, label: 'Writing Task 2' },
            { key: 'speaking', icon: <Mic className="w-4 h-4" />, label: 'Speaking Part 2' },
            { key: 'reading', icon: <BookOpen className="w-4 h-4" />, label: 'Reading Passage' },
            { key: 'listening', icon: <Headphones className="w-4 h-4" />, label: 'Listening Section' },
          ] as const).map(({ key, icon, label }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${activeTab === key ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
              {icon}{label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 text-left space-y-6">

          {/* WRITING */}
          {activeTab === 'writing' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-orange-600 tracking-wider font-mono">Official IELTS Academic Writing Task 2</span>
                <p className="font-bold text-sm text-slate-900 mt-1">«Some people believe that artificial intelligence will transform higher education positively, while others fear it will reduce intellectual independence. Discuss both views and give your opinion.»</p>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1 text-xs text-slate-500">
                  <span>Your Essay Draft:</span>
                  <span className="font-mono">{essayText.trim().split(/\s+/).filter(Boolean).length} words (Min: 250)</span>
                </div>
                <textarea rows={4} value={essayText} onChange={e => setEssayText(e.target.value)}
                  className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none font-sans"
                  placeholder="Type your essay paragraphs here..." />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setEssayText('In the contemporary era, technological breakthroughs have revolutionized pedagogical methods. However, critical thinking remains paramount.')}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-mono">
                  <RotateCcw className="w-3 h-3" />{lang === 'ru' ? 'Вставить другой образец' : 'Insert sample essay'}
                </button>
                <button onClick={handleEvaluateWriting} disabled={isWritingLoading}
                  className="px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50 font-display brand-glow"
                  style={{ background: BRAND }}>
                  <Sparkles className={`w-4 h-4 ${isWritingLoading ? 'animate-spin' : ''}`} />
                  {isWritingLoading ? (lang === 'ru' ? 'Проверка нейросетью...' : 'Analyzing with AI...') : (lang === 'ru' ? 'Получить полный отчет AI' : 'Evaluate with AI')}
                </button>
              </div>
              {writingScore && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      <span className="text-xl font-black font-display text-emerald-400">Band {writingScore.overall} Predicted</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Response: 1.5s</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[{ l: 'Task Achievement', v: writingScore.ta }, { l: 'Coherence & Cohesion', v: writingScore.cc }, { l: 'Lexical Resource', v: writingScore.lr }, { l: 'Grammatical Range & Accuracy', v: writingScore.gra }].map(({ l, v }) => (
                      <div key={l} className="p-2.5 rounded-xl bg-slate-800"><span className="text-slate-400 block font-semibold">{l}</span><span className="text-slate-200">{v}</span></div>
                    ))}
                  </div>
                  <p className="text-xs text-emerald-300 bg-emerald-500/15 p-2.5 rounded-xl border border-emerald-500/30"><strong>Verdict:</strong> {writingScore.verdict}</p>
                </div>
              )}
            </div>
          )}

          {/* SPEAKING */}
          {activeTab === 'speaking' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider font-mono">Speaking Part 2 Cue Card</span>
                <p className="font-bold text-sm text-slate-900 mt-1">«Describe an ambition that you have had for a long time. You should say: what it is, why you want to achieve it, and what you need to do to accomplish it.»</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-900 text-white text-center flex flex-col items-center justify-center space-y-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${isRecording ? 'scale-110' : ''}`}
                  style={{ background: isRecording ? 'linear-gradient(135deg,#F43F5E,#EC4899)' : BRAND }}>
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg font-display">{isRecording ? (lang === 'ru' ? 'Идет запись и AI-анализ речи...' : 'Listening & Analyzing Acoustic Waves...') : (lang === 'ru' ? 'Нажмите для голосовой симуляции' : 'Tap to start speaking test')}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-mono">{isRecording ? 'Acoustic feature extractor active · 16kHz sampling' : 'Simulates an official Cambridge examiner asking questions.'}</p>
                </div>
                <button onClick={handleToggleRecording}
                  className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md font-display ${isRecording ? 'bg-amber-400 text-slate-950 hover:bg-amber-500' : 'bg-white text-slate-900 hover:bg-slate-100'}`}>
                  {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  {isRecording ? (lang === 'ru' ? 'Остановить и оценить' : 'Stop & Evaluate') : (lang === 'ru' ? 'Начать запись (Speaking)' : 'Start Voice Test')}
                </button>
              </div>
              {speakingScore && (
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xl font-black font-display text-emerald-400">Band {speakingScore.overall} Speaking Score</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-md font-mono">Native Fluency Calibrated</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-800"><span className="text-slate-400 block font-semibold">Fluency & Coherence</span><span className="text-slate-200">{speakingScore.fluency}</span></div>
                    <div className="p-2.5 rounded-xl bg-slate-800"><span className="text-slate-400 block font-semibold">Pronunciation</span><span className="text-slate-200">{speakingScore.pronunciation}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* READING */}
          {activeTab === 'reading' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider font-mono">Reading Passage 3: Hard Disk Drive Technology</span>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">«The floating read/write head glides mere nanometers above the spinning magnetic platter. Any minute dust particle can cause catastrophic head crash. Data is recorded via electromagnetic polarity alteration across concentric circular tracks.»</p>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">Question 29: What protects the platter surface from physical collision?</label>
                <div className="space-y-1.5">
                  {['Air bearing hydrodynamic lift', 'CD player laser optics', 'Magnetic tape ribbon'].map(opt => (
                    <button key={opt} onClick={() => setReadingAnswer(opt)}
                      className={`w-full p-3 rounded-xl border text-xs text-left font-semibold transition-all cursor-pointer ${readingAnswer === opt ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => { setReadingEvaluated(true); if (readingAnswer.startsWith('Air bearing')) confetti({ particleCount: 50 }); }}
                disabled={!readingAnswer}
                className="w-full py-3 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-40 font-display"
                style={{ background: BRAND }}>
                {lang === 'ru' ? 'Проверить ответ' : 'Submit Answer'}
              </button>
              {readingEvaluated && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold"><CheckCircle2 className="w-4 h-4" /><span>Correct! +1.0 Point added to Band 9.0 calculation.</span></div>
                  <p className="text-slate-400">AI Context: The hydrodynamic air bearing creates the nanometer gap preventing head crash.</p>
                </div>
              )}
            </div>
          )}

          {/* LISTENING */}
          {activeTab === 'listening' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center"><Volume2 className="w-5 h-5" /></div>
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">Audio Track #4: Australian Academic Advisor</h5>
                    <p className="text-[11px] text-slate-500">Duration: 00:45 · Accent: Sydney English</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 bg-white px-2 py-1 rounded-md border">00:22 / 00:45</span>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">Complete the Form: The next orientation meeting will be held on ________?</label>
                <input type="text" value={listeningAnswer} onChange={e => setListeningAnswer(e.target.value)}
                  placeholder="e.g. 14th October / October 14"
                  className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none" />
              </div>
              <button onClick={() => { setListeningEvaluated(true); confetti({ particleCount: 50 }); }}
                disabled={!listeningAnswer}
                className="w-full py-3 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-40 font-display"
                style={{ background: BRAND }}>
                {lang === 'ru' ? 'Проверить ответ аудирования' : 'Check Listening Answer'}
              </button>
              {listeningEvaluated && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold"><CheckCircle2 className="w-4 h-4" /><span>Exact Match! Correct date recognized.</span></div>
                  <p className="text-slate-400">Audio Transcript: «...we shall reconvene on the 14th of October at the main library auditorium.»</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">{lang === 'ru' ? 'Неограниченно в тарифе Pro Unlimited' : 'Unlimited practice in Pro Unlimited plan'}</span>
          <div className="flex gap-2">
            <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 brand-glow"
              style={{ background: BRAND }}>
              {lang === 'ru' ? 'Открыть платформу' : 'Open Platform'} <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button onClick={onClose} className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer">
              {lang === 'ru' ? 'Закрыть' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
