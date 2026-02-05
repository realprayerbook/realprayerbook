import React, { useState } from 'react';
import DailySignal from './DailySignal'; // New Component
import Quiz from './Quiz';

interface DashboardProps {
  onJournalClick: () => void;
  onCommunityClick: () => void;
  onAdminClick: () => void;
  onLogout: () => void;
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ onJournalClick, onCommunityClick, onAdminClick, onLogout, children }) => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="bg-[#1a1625] min-h-screen font-manrope text-slate-100 flex flex-col">
      <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Top Navigation */}
      <header className="flex items-center justify-between border-b border-white/10 px-8 py-4 bg-white/5 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-[#f4d125]">
            <div className="size-8">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">Real Prayer</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors cursor-pointer" onClick={() => {}}>Library</a>
            <button onClick={onJournalClick} className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors">Journal</button>
            <button onClick={onCommunityClick} className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors">Community</button>
            <button onClick={onAdminClick} className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors">Admin</button>
            {/* Inject dynamic links here (Community, Admin) */}
            {children}
          </nav>
        </div>
        <button onClick={onLogout} className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors">Logout</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#1a1625] to-[#1a1625]">
          <div className="mb-10 flex flex-wrap justify-between items-end gap-4">
            <div className="space-y-1">
              <h1 className="text-white text-5xl font-serif font-bold tracking-tight">Welcome to The Archive</h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#f4d125] animate-pulse"></span>
                <p className="text-[#f4d125]/80 text-sm font-medium uppercase tracking-widest">Access Granted</p>
              </div>
            </div>
          </div>


          {/* Thank You Video */}
          <div className="mb-12 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative aspect-video bg-black/40">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/C4MnuBwrlHc?rel=0&modestbranding=1" 
                title="RealPrayer Thank You" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
          </div>

          {/* Daily Coherence Signal */}
          <DailySignal />

          {/* New Grid Layout for Download & Quiz */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Download Card */}
            <div className="bg-white/5 border border-[#f4d125]/20 rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-[#f4d125]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                   <span className="material-symbols-outlined text-5xl text-[#f4d125]">book_5</span>
                   <div>
                     <h2 className="text-3xl font-serif font-bold text-white">The Digital Archive</h2>
                     <p className="text-white/50 text-sm uppercase tracking-widest font-bold">PDF Edition</p>
                   </div>
                 </div>
                 <p className="text-white/80 leading-relaxed mb-8">
                   Your complete guide to frequency alignment. Download the full manuscript to begin your study of the 22 Prayers.
                 </p>
               </div>
               <a 
                 href="/assets/RealPrayerBook..pdf" 
                 download="RealPrayerBook_DrLouise.pdf"
                 className="relative z-10 w-full bg-[#f4d125] text-[#1a1625] py-4 rounded-xl font-bold uppercase tracking-widest text-center shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
               >
                 <span className="material-symbols-outlined">download</span>
                 Download PDF
               </a>
            </div>

            {/* Quiz Card */}
            <div className="bg-[#2E1A47] border border-white/10 rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                 <span className="material-symbols-outlined text-9xl text-[#f4d125]">psychology</span>
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="size-12 rounded-full border-2 border-[#f4d125] flex items-center justify-center text-[#f4d125]">
                     <span className="material-symbols-outlined text-2xl">graphic_eq</span>
                   </div>
                   <div>
                     <h2 className="text-3xl font-serif font-bold text-white">Frequency Audit</h2>
                     <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Interactive Tool</p>
                   </div>
                 </div>
                 <p className="text-white/80 leading-relaxed mb-8">
                   Are you "Begging" or "Aligning"? Take this assessment to discover your current prayer frequency and get a tailored practice.
                 </p>
               </div>
               <button 
                 onClick={() => setIsQuizOpen(true)}
                 className="relative z-10 w-full border-2 border-white/20 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:text-[#1a1625] transition-all flex items-center justify-center gap-3"
               >
                 <span className="material-symbols-outlined">play_arrow</span>
                 Start Audit
               </button>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={onJournalClick} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#f4d125]/40 transition-all group cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-[#f4d125]/60 group-hover:text-[#f4d125]">history_edu</span>
              <h4 className="text-white font-bold text-lg">Coherence Journal</h4>
              <p className="text-white/60 text-sm">Record your shifts and alignments.</p>
              <button className="text-[#f4d125] text-xs font-bold uppercase tracking-widest flex items-center gap-2 pt-2">Write Now <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            
            {/* Additional cards or spacers can go here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;