import React, { useState, useEffect, useRef } from 'react';
import { translations, pricingPlans, microPurchases } from '../data/content';
import { Language } from '../types';
import { CreditCard, Check, Sparkles, ArrowRight, Building } from 'lucide-react';

interface PricingSectionProps {
  lang: Language;
  onOpenTestModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ lang, onOpenTestModal }) => {
  const t = translations[lang];
  const [isAnnual, setIsAnnual] = useState(true);
  const [tab, setTab] = useState<'subscription' | 'micro' | 'b2b'>('subscription');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries =>
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5" />{t.pricing.sectionTag}
          </div>
          <h2 className="reveal text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-display" style={{ transitionDelay: '.08s' }}>{t.pricing.title}</h2>
          <p className="reveal text-slate-500 text-base" style={{ transitionDelay: '.14s' }}>{t.pricing.subtitle}</p>

          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 pt-2" style={{ transitionDelay: '.18s' }}>
            <div className="inline-flex bg-slate-200/70 p-1 rounded-2xl">
              {(['subscription', 'micro', 'b2b'] as const).map(t2 => (
                <button key={t2} onClick={() => setTab(t2)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${tab === t2 ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-800'}`}>
                  {t2 === 'subscription' ? (lang === 'ru' ? 'Подписка' : 'Subscription') : t2 === 'micro' ? (lang === 'ru' ? 'Разовые' : 'Per-Test') : 'B2B'}
                </button>
              ))}
            </div>
            {tab === 'subscription' && (
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 shadow-sm">
                <span className={`text-xs font-semibold ${!isAnnual ? 'text-orange-600 font-bold' : 'text-slate-400'}`}>{t.pricing.billingMonthly}</span>
                <button onClick={() => setIsAnnual(!isAnnual)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer`}
                  style={{ background: isAnnual ? 'linear-gradient(135deg,#F97316,#F43F5E)' : '#CBD5E1' }}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${isAnnual ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
                <span className={`text-xs font-bold flex items-center gap-1 ${isAnnual ? 'text-orange-600' : 'text-slate-400'}`}>
                  {t.pricing.billingAnnual}
                  <span className="px-1.5 bg-emerald-100 text-emerald-700 text-[10px] rounded-md font-mono">-30%</span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Subscription plans */}
        {tab === 'subscription' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14 items-stretch reveal stagger" style={{ transitionDelay: '.22s' }}>
            {pricingPlans.map((plan, i) => {
              const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
              return (
                <div key={plan.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between text-left transition-all relative card-hover
                    ${plan.popular ? 'bg-white border-2 shadow-2xl md:-translate-y-3' : 'bg-white border border-slate-200 shadow-sm hover:border-slate-300'}`}
                  style={plan.popular ? { borderColor: '#F97316', boxShadow: '0 25px 50px -12px rgba(249,115,22,0.20)' } : {}}>
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 brand-gradient text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-md px-4 py-1 flex items-center gap-1.5 font-mono brand-glow">
                      <Sparkles className="w-3 h-3" />{lang === 'ru' ? 'Выбор 85% студентов' : 'Most Popular'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-extrabold text-xl text-slate-900 font-display">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                    <div className="mt-6 mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1">
                      <span className="text-5xl font-black text-slate-900 font-display">${price}</span>
                      <span className="text-xs text-slate-400">/ {lang === 'ru' ? 'мес' : 'mo'}</span>
                      {isAnnual && <span className="ml-2 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-mono font-bold">billed annually</span>}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3" /></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                      ${plan.popular ? 'brand-gradient text-white shadow-lg brand-glow hover:scale-[1.02]' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}>
                    {plan.ctaText} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Per-test */}
        {tab === 'micro' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 reveal stagger slide-up" style={{ transitionDelay: '.22s' }}>
            {microPurchases.map((mp, i) => (
              <div key={i} className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between text-left card-hover">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase text-orange-600 bg-orange-50 border border-orange-200 rounded-md font-mono">{mp.type}</span>
                    <span className="text-2xl font-black font-display text-slate-900">{mp.price}</span>
                  </div>
                  <h4 className="font-extrabold text-lg text-slate-900 mb-4 font-display">{mp.name}</h4>
                  <ul className="space-y-2 mb-6">
                    {mp.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold text-center block transition-all">
                  {lang === 'ru' ? 'Купить разовый тест' : 'Buy Single Pass'}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* B2B */}
        {tab === 'b2b' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mb-14 slide-up reveal">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full font-mono">Institutional Partners & Schools</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">{lang === 'ru' ? 'AI-инфраструктура для языковых школ' : 'AI Infrastructure for Language Centers'}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'ru' ? 'Подключите студентов к единой платформе и автоматизируйте 100% рутинной проверки эссе и домашних заданий.' : 'Connect student cohorts to a unified dashboard. Automate 100% of repetitive homework and essay grading.'}
                </p>
                <div className="grid grid-cols-3 gap-3 text-sm font-semibold text-slate-700">
                  {['White-label LMS', 'Teacher Analytics', 'Volume Discounts'].map(f => (
                    <div key={f} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-500 shrink-0" />{f}</div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4">
                <a href="https://testtop.app/" target="_blank" rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl brand-gradient text-white font-bold text-sm shadow-lg brand-glow transition-all hover:scale-[1.02] flex items-center justify-center gap-2 block text-center">
                  <Building className="w-5 h-5" />{lang === 'ru' ? 'Запросить демо для школы' : 'Request School Demo'}
                </a>
                <p className="text-[11px] text-center text-slate-400 font-mono mt-2">Custom SLA & onboarding included.</p>
              </div>
            </div>
          </div>
        )}

        {/* Unit economics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 reveal" style={{ transitionDelay: '.26s' }}>
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <h4 className="font-extrabold text-base text-slate-900 font-display">{t.pricing.unitTitle}</h4>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">80–90% Gross Margin</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              {[{ val: '$0.01', label: 'Marginal Cost', color: 'text-slate-900' }, { val: '85%', label: 'Gross Margin', color: 'text-emerald-600' }, { val: '100x', label: 'Scalability', color: 'text-orange-600' }].map(s => (
                <div key={s.label} className="p-3 bg-slate-50 rounded-2xl">
                  <span className={`text-2xl font-black font-display block ${s.color}`}>{s.val}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">LTV / CAC Ratio</span>
              <span className="font-mono font-black text-emerald-600 text-sm">3.5×</span>
            </div>
          </div>
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <h4 className="font-extrabold text-base text-slate-900 font-display">{t.pricing.expansionTitle}</h4>
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">B2C → B2B</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'B2C Core', sub: lang === 'ru' ? 'Прямые продажи студентам' : 'Direct to students worldwide' },
                { title: 'B2B Schools', sub: lang === 'ru' ? 'Языковые школы-партнёры' : 'Institutional language partners' },
                { title: 'Test Centers', sub: lang === 'ru' ? 'Стратегические альянсы' : 'Strategic preparation alliances' },
                { title: 'Global Scale', sub: lang === 'ru' ? 'Быстрое международное расширение' : 'Rapid international expansion' },
              ].map(s => (
                <div key={s.title} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors">
                  <h5 className="font-bold text-sm text-slate-900 font-display">{s.title}</h5>
                  <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
