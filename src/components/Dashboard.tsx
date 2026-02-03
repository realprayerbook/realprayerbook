import React from 'react';

interface DashboardProps {
  onJournalClick: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onJournalClick, onLogout }) => {
  return (
    <div className="min-h-screen bg-brand-obsidian flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 z-10 bg-white/5 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-brand-gold text-3xl">verified_user</span>
          <span className="font-regal text-white text-xl">Member Portal</span>
        </div>
        <button onClick={onLogout} className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 z-10">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Welcome Card */}
          <div className="col-span-full mb-8">
             <h1 className="text-4xl md:text-5xl font-regal text-white mb-4">Welcome to the <span className="text-brand-gold italic">Aligned</span> Field.</h1>
             <p className="text-brand-ivory/60 text-lg max-w-2xl">Your frequency has been registered. You now have full access to the Real Prayer archives and tools.</p>
          </div>

          {/* Action Card 1: Download Book */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-brand-gold/30 transition-all group">
            <div className="w-16 h-16 bg-brand-gold/20 rounded-2xl flex items-center justify-center mb-6 text-brand-gold group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">menu_book</span>
            </div>
            <h3 className="text-2xl font-regal text-white mb-2">The Archive (PDF)</h3>
            <p className="text-white/50 mb-8 h-12">Download your digital copy of "Real Prayer" immediately.</p>
            <a 
              href="/assets/RealPrayerBook.pdf" 
              download 
              className="inline-flex items-center gap-3 text-brand-gold font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              Download Now <span className="material-symbols-outlined">download</span>
            </a>
          </div>

          {/* Action Card 2: Journal */}
          <div className="glass-card p-8 rounded-[2rem] border border-white/10 hover:border-brand-magenta/30 transition-all group cursor-pointer" onClick={onJournalClick}>
            <div className="w-16 h-16 bg-brand-magenta/20 rounded-2xl flex items-center justify-center mb-6 text-brand-magenta group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">edit_note</span>
            </div>
            <h3 className="text-2xl font-regal text-white mb-2">Frequency Journal</h3>
            <p className="text-white/50 mb-8 h-12">Track your alignment and commands daily.</p>
            <span className="inline-flex items-center gap-3 text-brand-magenta font-bold uppercase tracking-widest hover:translate-x-2 transition-transform">
              Open Journal <span className="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>

        </div>
      </main>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-purple/20 blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default Dashboard;
