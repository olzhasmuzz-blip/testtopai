import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { MarketSection } from './components/MarketSection';
import { WhyNowSection } from './components/WhyNowSection';
import { SolutionSection } from './components/SolutionSection';
import { ModulesSection } from './components/ModulesSection';
import { PositioningSection } from './components/PositioningSection';
import { TractionSection } from './components/TractionSection';
import { PricingSection } from './components/PricingSection';
import { RoadmapVisionSection } from './components/RoadmapVisionSection';
import { Footer } from './components/Footer';
import { LiveTestModal } from './components/LiveTestModal';

export default function App() {
  const [lang, setLang] = useState<Language>('ru');
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);

  /* Global scroll-reveal — catches any element with reveal classes */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 },
    );
    const attach = () =>
      document.querySelectorAll('.reveal:not(.visible),.reveal-left:not(.visible),.reveal-right:not(.visible)')
        .forEach(el => io.observe(el));
    attach();
    // re-attach after route/tab changes settle
    const id = setInterval(attach, 800);
    setTimeout(() => clearInterval(id), 6000);
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-[#0F172A] selection:bg-[#EA384D]/15 selection:text-[#EA384D] overflow-x-hidden flex flex-col justify-between">
      {/* Fixed Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenTestModal={() => setIsTestModalOpen(true)}
      />

      <main className="flex-1">
        {/* Section 1: Hero & Value Proposition */}
        <HeroSection
          lang={lang}
          onOpenTestModal={() => setIsTestModalOpen(true)}
        />

        {/* Section 2: Problem & Flaws of Legacy Tutoring */}
        <ProblemSection lang={lang} />

        {/* Section 3: Market Opportunity & TAM ($2.4B) */}
        <MarketSection lang={lang} />

        {/* Section 4: Why Now — 4 Converging Technologies */}
        <WhyNowSection lang={lang} />

        {/* Section 5: Closed-Loop AI Learning Engine */}
        <SolutionSection lang={lang} />

        {/* Section 6: Core Modules & Live Sandbox (Reading, Listening, Writing, Speaking) */}
        <ModulesSection
          lang={lang}
          onOpenTestModal={() => setIsTestModalOpen(true)}
        />

        {/* Section 7: Competitive Positioning & Category Creation */}
        <PositioningSection lang={lang} />

        {/* Section 8: Traction, Live Metrics & Student Outcomes */}
        <TractionSection lang={lang} />

        {/* Section 9: Business Model, Subscriptions & Micro-Purchases */}
        <PricingSection
          lang={lang}
          onOpenTestModal={() => setIsTestModalOpen(true)}
        />

        {/* Section 10: Team, Forbes Recognition, Roadmap, Global Vision & Lead Capture */}
        <RoadmapVisionSection
          lang={lang}
          onOpenTestModal={() => setIsTestModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        setLang={setLang}
        onOpenTestModal={() => setIsTestModalOpen(true)}
      />

      {/* Interactive Live Test Modal */}
      <LiveTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
