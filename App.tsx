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
import LibraryExplorer from './components/LibraryExplorer';
import AdminPanel from './components/AdminPanel';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLeadCaptureOpen, setIsLeadCaptureOpen] = useState(false); 
  const [view, setView] = useState<'landing' | 'dashboard' | 'journal' | 'auth' | 'community' | 'admin' | 'membership_locked' | 'library'>('landing');
  const [session, setSession] = useState<any>(null);
  const [isCheckingMember, setIsCheckingMember] = useState(false);

  // Admin Guard
  const ADMIN_EMAILS = ['louisenlp@gmail.com', 'mike@dynamicmike.com'];

  const [installPrompt, setInstallPrompt] = useState<any>(null);

  // Subdomain Detection & PWA Logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isSubdomain = hostname.startsWith('members.') || hostname.startsWith('app.') || hostname.includes('members.realprayerbook-eight');
      
      if (isSubdomain && view === 'landing') {
        console.log('App: Subdomain detected. Defaulting to auth/member view.');
        setView('auth');
      }

      // PWA Install Prompt Listener
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setInstallPrompt(e);
      });
    }
  }, []);

  const checkMemberStatus = async (userEmail: string) => {
    if (ADMIN_EMAILS.includes(userEmail)) return true;
    
    setIsCheckingMember(true);
    try {
      const { data, error } = await supabase
        .from('shipping_requests')
        .select('id')
        .eq('friend_email', userEmail) // Check if they bought it as a gift
        .or(`user_phone.eq.${userEmail}`); // Some older records might use phone or different fields, but let's stick to email first if possible
      
      // Secondary check for standard email field if it exists in your schema
      const { data: data2 } = await supabase
        .from('shipping_requests')
        .select('id')
        .eq('user_name', userEmail); // Using user_name if that's where email is stored in some variants

      // Robust check across potential email fields
      const { data: finalData } = await supabase
        .from('shipping_requests')
        .select('id')
        .or(`friend_email.eq.${userEmail},user_name.eq.${userEmail}`); 

      if (finalData && finalData.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error checking member status:', err);
      return false;
    } finally {
      setIsCheckingMember(false);
    }
  };

  useEffect(() => {
    const handleHashChange = async () => {
      const hash = window.location.hash;
      console.log('App: Hash changed to:', hash, 'Current session:', !!session);
      
      if (hash === '#login' || hash === '#auth' || hash === '#invite' || hash === '#reset-password') {
        setView('auth');
      } else if (hash.startsWith('#dashboard') && session) {
        const isAuth = await checkMemberStatus(session.user.email);
        if (isAuth) setView('dashboard');
        else setView('membership_locked');
      } else if (hash.startsWith('#admin') && session) {
        if (ADMIN_EMAILS.includes(session.user.email)) {
          setView('admin');
        } else {
          setView('dashboard');
        }
      } else if (hash.startsWith('#admin') || hash.startsWith('#dashboard') || hash.startsWith('#community')) {
         if (!session) {
            setView('auth');
         }
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
      if (window.location.hash === '#admin' && session && ADMIN_EMAILS.includes(session.user.email)) setView('admin');
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('App: Auth State Change:', _event, session?.user?.email);
      setSession(session);
      
      const hash = window.location.hash;
      
      // Handle login transitions (including magic links and initial sessions with tokens)
      if (_event === 'SIGNED_IN' || _event === 'INITIAL_SESSION' || _event === 'USER_UPDATED') {
          if (session) {
              // If we land with a specific target hash, or if we have an access token (magic link)
              if (hash.startsWith('#admin') && ADMIN_EMAILS.includes(session.user.email)) {
                  setView('admin');
              } else if (hash.startsWith('#dashboard') || hash.includes('access_token') || hash.includes('type=recovery')) {
                  // Direct to dashboard for normal magic links or specific dashboard hash
                  setView('dashboard');
              } else if (view === 'auth' || (view === 'landing' && hash === '')) {
                  // If we are currently on the auth screen or root landing and just signed in, 
                  // we should probably go to the dashboard.
                  // BUT only if we aren't explicitly trying to stay on landing (logged in landing is allowed)
                  // For magic links, we almost ALWAYS want the dashboard.
                  if (_event === 'SIGNED_IN') setView('dashboard');
              }
          }
      } else if (_event === 'SIGNED_OUT') {
         setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, [view]); // Add view to dependencies to ensure we have context for transitions

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
         if (targetView === 'admin' && !ADMIN_EMAILS.includes(session.user.email)) {
             alert('Access Denied: Admin Privileges Required');
             return;
         }
         setView(targetView);
      }
  };

  const [isPrologueOpen, setIsPrologueOpen] = useState(false);

  // Defensive view resolution
  const renderView = () => {
    // If waiting for session on a protected route, show auth
    if ((view === 'admin' || view === 'dashboard' || view === 'community') && !session) {
       return <Auth onLogin={() => setView('dashboard')} />;
    }

    switch (view) {
      case 'auth':
        return <Auth onLogin={() => {
            if (window.location.hash === '#admin' && session && ADMIN_EMAILS.includes(session.user.email)) {
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
                onLibraryClick={() => setView('library')}
                onAdminClick={() => requireAuth('admin')} 
                onLogout={handleLogout} 
                isAdmin={session && ADMIN_EMAILS.includes(session.user.email)}
            >
               {session && ADMIN_EMAILS.includes(session.user.email) && (
                  <button onClick={() => requireAuth('admin')} className="text-brand-gold hover:text-white text-sm font-bold transition-colors animate-pulse">
                      Admin Command
                  </button>
               )}
            </Dashboard>
        );

      case 'journal':
        return <Journal 
          onBack={() => setView('dashboard')} 
          onCommunityClick={() => requireAuth('community')}
        />;

      case 'community':
        return (
            <div className="bg-[#1a1625] min-h-screen">
              <button onClick={() => setView('dashboard')} className="fixed top-6 left-6 z-50 text-white flex items-center gap-2 bg-black/20 p-3 rounded-xl backdrop-blur-md hover:bg-white/10 transition-all">
                  <span className="material-symbols-outlined">arrow_back</span> Back
              </button>
              <CommunityFeed />
            </div>
        );

      case 'library':
        return (
            <LibraryExplorer onBack={() => setView('dashboard')} />
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

      case 'membership_locked':
        return (
          <div className="min-h-screen bg-brand-obsidian flex items-center justify-center p-6 text-center">
            <div className="max-w-xl glass-card p-12 rounded-[3rem] border-2 border-brand-magenta/30 shadow-[0_0_50px_rgba(255,0,128,0.2)]">
              <span className="material-symbols-outlined text-brand-magenta text-6xl mb-8 animate-pulse">lock</span>
              <h2 className="text-4xl font-regal text-white mb-6 font-black italic">Access Restricted</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-10">
                A valid membership for <strong>{session?.user.email}</strong> was not found in our alignment records. 
                <br /><br />
                Please ensure you are using the same email address used during your Stripe checkout.
              </p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => { setView('landing'); setTimeout(() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                  className="w-full py-5 bg-brand-gold text-brand-purple rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all"
                >
                  Go to Payment Area
                </button>
                <button 
                  onClick={handleLogout}
                  className="text-white/40 text-xs hover:text-white transition-colors underline"
                >
                  Sign in with a different email
                </button>
              </div>
            </div>
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
                  <h2 className="text-6xl lg:text-7xl font-regal font-black leading-tight text-white drop-shadow-xl">Dr Louise <br/><span className="text-brand-magenta">Van der Velde</span></h2>
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
                  <div className="flex flex-col gap-10">
                    <div className="relative rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden aspect-[4/5.5] shadow-[0_0_120px_rgba(0,0,0,1)] border-4 border-white/20 group w-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110" 
                        style={{ backgroundImage: "url('/assets/author.jpg')" }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-transparent to-transparent hidden lg:block"></div>
                    </div>
                    
                    {/* Award Box - Stays UNDER the image as requested */}
                    <div className="relative z-20 w-full lg:w-[110%] lg:-ml-12">
                      <div className="bg-brand-obsidian lg:bg-white/10 backdrop-blur-3xl px-8 py-8 lg:px-12 lg:py-10 rounded-3xl lg:rounded-[3rem] shadow-2xl border-2 border-white/20 lg:border-white/30 text-center lg:text-left">
                         <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                           <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-4xl drop-shadow-lg">verified</span>
                           <p className="text-white font-black uppercase tracking-[0.4em] text-[10px] lg:text-xs">Transmitting Frequency</p>
                         </div>
                         <p className="text-white font-regal text-xl lg:text-3xl font-black italic leading-tight">"Outstanding Program Impact Award"</p>
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

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

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
        
        {/* Floating PWA Install Button - Moved to Member View */}
        {(view === 'dashboard' || view === 'admin' || view === 'journal') && (
          <div 
            className="fixed bottom-12 right-12 z-50 flex items-center gap-6 bg-brand-gold text-brand-purple px-10 py-5 rounded-full shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:scale-110 transition-all cursor-pointer group gold-glow"
            onClick={installPrompt ? handleInstallApp : undefined}
            style={{ display: installPrompt ? 'flex' : 'none' }}
          >
            <span className="text-xs font-black uppercase tracking-[0.5em] hidden lg:block">Install App</span>
            <span className="material-symbols-outlined text-3xl font-black">install_mobile</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;