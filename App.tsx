import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLenis } from './utils/gsapEngine';
import { supabase } from './utils/supabase'; // Import Supabase client

// Components
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
import Auth from './components/Auth';
import CommunityFeed from './components/CommunityFeed';
import AdminPanel from './components/AdminPanel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false); // Kept for potential future use or specific triggers
  const [view, setView] = useState<'landing' | 'dashboard' | 'journal' | 'auth' | 'community' | 'admin'>('landing');
  const [session, setSession] = useState<any>(null);

  // Admin Guard
  const ADMIN_EMAIL = 'louisenlp@gmail.com';

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#login' || hash === '#auth') {
        setView('auth');
      } else if (hash === '#dashboard' && session) {
        setView('dashboard');
      } else if (hash === '#admin' && session) {
        if (session.user.email === ADMIN_EMAIL) {
          setView('admin');
        } else {
          setView('dashboard'); // Redirect unauthorized access to dashboard
        }
      } else if (hash === '#admin' || hash === '#dashboard') {
         // If trying to access protected route without session, go into auth flow
         if (!session) setView('auth');
      } else {
         // Default landing if no hash or unknown hash (and not already in a view)
         if (view === 'landing' && !hash) return;
         // Optional: Handle other cases or allow view state to persist
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [session, view]); // Re-run if session changes to auto-redirect pending hashes

  // Existing auth effect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Trigger hash check logic again once session is loaded
      if (window.location.hash === '#dashboard' && session) setView('dashboard');
      if (window.location.hash === '#admin' && session && session.user.email === ADMIN_EMAIL) setView('admin');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_IN') {
         // Check hash on sign in
         const hash = window.location.hash;
         if (hash === '#admin' && session?.user.email === ADMIN_EMAIL) setView('admin');
         else if (hash === '#dashboard' || hash === '#auth' || hash === '#login') setView('dashboard');
      } else if (_event === 'SIGNED_OUT') {
         setView('landing');
         // Clean hash? Optional.
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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

  // Updated Handler to Scroll to Donate Section
  const handleOpenLeadCapture = () => {
      const donateSection = document.getElementById('donate');
      if (donateSection) {
          donateSection.scrollIntoView({ behavior: 'smooth' });
      } else {
          // If we are not on the landing page (e.g. dashboard), maybe switch view or just log
          // For now, assuming landing page elements are present or we switch view
          setView('landing');
          setTimeout(() => {
              document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      }
  };
  
  const handleLeadSuccess = (data: { name: string; phone: string }) => {
    localStorage.setItem('lead_captured', 'true');
    localStorage.setItem('lead_data', JSON.stringify(data));
    setView('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('lead_captured');
    setView('landing');
    window.history.pushState(null, '', ' '); // Clear hash
  };

  // Protected Route Check
  const requireAuth = (targetView: typeof view) => {
      if (!session) {
          setView('auth');
      } else {
         if (targetView === 'admin' && session.user.email !== ADMIN_EMAIL) {
             alert('Access Denied: Admin Privileges Required');
             return;
         }
         setView(targetView);
      }
  };

  // Defensive view resolution
  const renderView = () => {
    // If waiting for session on a protected route, show auth
    if ((view === 'admin' || view === 'dashboard' || view === 'community') && !session) {
       return <Auth onLogin={() => setView('dashboard')} />;
    }

    switch (view) {
      case 'auth':
        return <Auth onLogin={() => {
            if (window.location.hash === '#admin' && session?.user.email === ADMIN_EMAIL) {
                setView('admin');
            } else {
                setView('dashboard');
            }
        }} />;
      
      case 'dashboard':
        return (
            <Dashboard 
                onJournalClick={() => setView('journal')} 
                onCommunityClick={() => requireAuth('community')}
                onAdminClick={() => requireAuth('admin')} 
                onLogout={handleLogout} 
            >
               {session?.user.email === ADMIN_EMAIL && (
                  <button onClick={() => requireAuth('admin')} className="text-brand-gold hover:text-white text-sm font-bold transition-colors animate-pulse">
                      Admin Command
                  </button>
               )}
            </Dashboard>
        );

      case 'journal':
        return <Journal onBack={() => setView('dashboard')} />;

      case 'community':
        return (
            <div className="bg-[#1a1625] min-h-screen">
              <button onClick={() => setView('dashboard')} className="fixed top-6 left-6 z-50 text-white flex items-center gap-2 bg-black/20 p-3 rounded-xl backdrop-blur-md hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined">arrow_back</span> Back
              </button>
              <CommunityFeed />
            </div>
        );

      case 'admin':
        return (
            <div className="bg-[#0a0a0a] min-h-screen">
               <button onClick={() => setView('dashboard')} className="fixed top-6 left-6 z-50 text-white flex items-center gap-2 bg-white/10 p-3 rounded-xl backdrop-blur-md hover:bg-white/20 transition-all">
                  <span className="material-symbols-outlined">arrow_back</span> Back
              </button>
              <AdminPanel />
            </div>
        );

      default:
        return (
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
                  <h2 className="text-6xl lg:text-7xl font-regal font-black leading-tight text-white drop-shadow-xl">Dr. Louise <br/><span className="text-brand-magenta">Van der Velde</span></h2>
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
                  
                  <div className="flex flex-col gap-8 lg:block">
                    <div className="relative rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden aspect-[4/5.5] shadow-[0_0_120px_rgba(0,0,0,1)] border-4 border-white/20 group w-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110" 
                        style={{ backgroundImage: "url('/assets/author.jpg')" }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-transparent to-transparent hidden lg:block"></div>
                    </div>
                    
                    <div className="relative lg:absolute lg:bottom-12 lg:left-12 lg:right-12 z-20">
                      <div className="bg-brand-obsidian/80 lg:bg-white/10 backdrop-blur-xl lg:backdrop-blur-3xl px-6 py-6 lg:px-12 lg:py-10 rounded-3xl lg:rounded-[3rem] shadow-2xl border border-white/10 lg:border-2 lg:border-white/30 text-center lg:text-left">
                         <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-5 mb-3 lg:mb-4">
                           <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl drop-shadow-lg">verified</span>
                           <p className="text-white font-black uppercase tracking-[0.2em] lg:tracking-[0.4em] text-[10px] lg:text-xs">Transmitting Frequency</p>
                         </div>
                         <p className="text-white font-regal text-lg lg:text-3xl font-black italic leading-tight">"Outstanding Program Impact Award"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        );
    }
  };

  // Moved hook usage inside component logic where appropriate, or keep here if global
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
        onSuccess={() => setView('dashboard')}
      />

      <div className={`relative transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {view === 'landing' && <Header onCtaClick={handleOpenLeadCapture} />}
        
        {renderView()}
        
        {view === 'landing' && <Footer onCtaClick={handleOpenLeadCapture} />}
        
        {view === 'landing' && (
          <div 
            className="fixed bottom-12 right-12 z-50 flex items-center gap-6 bg-brand-gold text-brand-purple px-10 py-5 rounded-full shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:scale-110 transition-all cursor-pointer group gold-glow"
            onClick={handleOpenLeadCapture}
          >
            <span className="text-xs font-black uppercase tracking-[0.5em] hidden lg:block">Claim Your Divinity</span>
            <span className="material-symbols-outlined text-3xl font-black">spa</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;