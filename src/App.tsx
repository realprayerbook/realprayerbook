import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis } from './utils/gsapEngine';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SocialProof from './components/SocialProof';
import DonationUI from './components/DonationUI';
import Footer from './components/Footer';
import IntroLoader from './components/IntroLoader';
import LeadCapture from './components/LeadCapture';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import PrologueModal from './components/PrologueModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard' | 'journal'>('landing');

  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;

    const lenis = initLenis();

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.reveal-section');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    });

    return () => {
      lenis?.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading, view]);

  const handleOpenLeadCapture = () => setIsLeadCaptureOpen(true);
  
  const handleLeadSuccess = (data: { name: string; phone: string }) => {
    localStorage.setItem('lead_captured', 'true');
    localStorage.setItem('lead_data', JSON.stringify(data));
    setView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('lead_captured');
    setView('landing');
  };

  if (view === 'dashboard') {
    return <Dashboard onJournalClick={() => setView('journal')} onLogout={handleLogout} />;
  }

  if (view === 'journal') {
    return <Journal onBack={() => setView('dashboard')} />;
  }

  const [isPrologueOpen, setIsPrologueOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans">
      {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}
      
      <LeadCapture 
        isOpen={isLeadCaptureOpen} 
        onClose={() => setIsLeadCaptureOpen(false)} 
        onSuccess={handleLeadSuccess}
      />

      <PrologueModal 
        isOpen={isPrologueOpen} 
        onClose={() => setIsPrologueOpen(false)} 
      />

      <div className={`relative transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header onCtaClick={handleOpenLeadCapture} />
        
        <main>
          <Hero 
            onCtaClick={handleOpenLeadCapture} 
            onPrologueClick={() => setIsPrologueOpen(true)}
          />
          
          <Features />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="lotus-divider">
              <span className="material-symbols-outlined text-5xl">spa</span>
            </div>
          </div>

          <section id="donate" className="py-24">
            <DonationUI onComplete={() => setView('dashboard')} />
          </section>

          <SocialProof />

          <section id="author" className="py-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 flex flex-col gap-12 reveal-section">
                <div className="flex items-center gap-6">
                  <span className="h-px w-16 bg-brand-gold"></span>
                  <span className="text-brand-gold font-black uppercase tracking-[0.6em] text-xs">The Visionary</span>
                </div>
                <h2 className="text-7xl font-regal font-black leading-tight text-white drop-shadow-xl">Dr. Louise <br/><span className="text-brand-magenta">Van der Velde</span></h2>
                <div className="space-y-10 text-white text-2xl leading-relaxed font-medium opacity-100 italic">
                  <p>Awarded the <strong>Outstanding Program Impact Award</strong>, I dedicated 25 years to the mechanics of frequency alignment.</p>
                  <p>Real prayer isn't a hope—it's a scientific command given to the unified field. This book is the archive you've been waiting for.</p>
                </div>
                <div className="pt-12 border-t-2 border-white/20">
                  <button 
                    onClick={handleOpenLeadCapture}
                    className="group flex items-center gap-10 glass-card p-10 rounded-[3rem] hover:border-brand-gold transition-all w-full text-left shadow-2xl border-2 border-white/30"
                  >
                    <div className="size-20 bg-brand-gold rounded-[1.5rem] flex items-center justify-center text-brand-purple shadow-xl">
                      <span className="material-symbols-outlined text-5xl">workspace_premium</span>
                    </div>
                    <div>
                      <p className="font-regal text-3xl text-white font-black italic">The Impact Edition</p>
                      <p className="text-sm text-brand-gold font-black tracking-[0.4em] uppercase mt-2">Award Winning Transmission</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-brand-gold group-hover:translate-x-4 transition-transform text-5xl">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative reveal-section mt-12 lg:mt-0">
                <div className="absolute -inset-10 border-4 border-brand-gold/20 rounded-[4rem] rotate-3 blur-md opacity-50 hidden lg:block"></div>
                <div className="relative rounded-[3rem] lg:rounded-[4rem] overflow-hidden aspect-[4/5.5] shadow-[0_0_120px_rgba(0,0,0,1)] border-4 border-white/20 group">
                  {/* CORRECT AUTHOR ASSET: Louise with Impact Award */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110" 
                    style={{ backgroundImage: "url('/assets/author.jpg')" }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-transparent to-transparent lg:hidden"></div>
                  
                  {/* Desktop: Overlay / Mobile: Stacked below (layout handled by grid/flex parent if needed, but here adjusting absolute pos) */}
                  <div className="absolute -bottom-1 left-0 right-0 lg:bottom-12 lg:left-12 lg:right-12 p-6 lg:p-0">
                    <div className="bg-brand-obsidian/80 lg:bg-white/10 backdrop-blur-xl lg:backdrop-blur-3xl px-8 py-8 lg:px-12 lg:py-10 rounded-[2rem] lg:rounded-[3rem] shadow-2xl border border-white/10 lg:border-2 lg:border-white/30">
                       <div className="flex items-center gap-4 lg:gap-5 mb-2 lg:mb-4">
                         <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl drop-shadow-lg">verified</span>
                         <p className="text-white font-black uppercase tracking-[0.4em] text-[10px] lg:text-xs">Transmitting Frequency</p>
                       </div>
                       <p className="text-white font-regal text-xl lg:text-3xl font-black italic">"Outstanding Program Impact Award"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer onCtaClick={handleOpenLeadCapture} />
        
        <div 
          className="fixed bottom-12 right-12 z-50 flex items-center gap-6 bg-brand-gold text-brand-purple px-10 py-5 rounded-full shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:scale-110 transition-all cursor-pointer group gold-glow"
          onClick={handleOpenLeadCapture}
        >
          <span className="text-xs font-black uppercase tracking-[0.5em] hidden lg:block">Elite Assistant</span>
          <span className="material-symbols-outlined text-3xl font-black">shield_person</span>
        </div>
      </div>
    </div>
  );
};

export default App;