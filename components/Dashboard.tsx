import React from 'react';

interface DashboardProps {
  onJournalClick: () => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onJournalClick, onLogout }) => {
  return (
    <div className="bg-[#1a1625] min-h-screen font-manrope text-slate-100 flex flex-col">
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
            <a className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors" href="#">Library</a>
            <button onClick={onJournalClick} className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors">Journal</button>
            <a className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors" href="#">Circles</a>
            <a className="text-white/70 hover:text-[#f4d125] text-sm font-medium transition-colors" href="#">Transmissions</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Global Circle In</p>
            <div className="flex gap-2 text-[#f4d125] font-bold">
              <span>05d</span>
              <span>14h</span>
              <span>22m</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-full size-10 bg-white/5 hover:bg-white/10 text-white transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button onClick={onLogout} className="size-10 rounded-full border-2 border-[#f4d125]/50 overflow-hidden group">
              <img className="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBqDv8hTOPF3-eWYa9QDyDO1pe5AkZeMl0TXTbeRsgf-E-UkbYMZeTdbDYVro0sTEwBqRdXAvAcq7k0W04KqnLWggYkLAu89xrBFFiR-X-27XYxEvDsQS-sBVxnVa3T7I8ibDVjLm4cLquIM_5jY9aDAmT4W-VGBp2e42OoC5qjl8rvP7MpCmF1bh9ZgPxZ7SPyu5d-F2Bi-MuChZZsQzpjC-ylfSB2zYOpJowxLqvE5Ke-DsiiT2TjVAcg_hVVcNIr0gctXpG15U" alt="Profile" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-72 bg-white/5 border-r border-white/10 flex flex-col p-6 gap-8">
          <div className="flex flex-col">
            <h3 className="text-white/50 text-xs uppercase tracking-[0.2em] font-bold mb-4">Membership</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f4d125] text-[#1a1625] font-bold shadow-lg shadow-[#f4d125]/20 cursor-pointer">
                <span className="material-symbols-outlined">auto_awesome</span>
                <span className="text-sm">Daily Practice</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined">book_4</span>
                <span className="text-sm">22 Prayers Library</span>
              </div>
              <div onClick={onJournalClick} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined">menu_book</span>
                <span className="text-sm">Coherence Journal</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined">group</span>
                <span className="text-sm">Community Circles</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined">podcasts</span>
                <span className="text-sm">Direct Transmissions</span>
              </div>
            </div>
          </div>
          
          <div className="mt-auto bg-white/5 p-4 rounded-2xl border border-[#f4d125]/10">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-3 text-center">7-Day Alignment Streak</p>
            <div className="flex justify-center mb-2">
              <div className="relative size-24 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-white/5 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-[#f4d125] border-l-transparent border-b-transparent rounded-full rotate-45"></div>
                <span className="material-symbols-outlined text-4xl text-[#f4d125]">local_florist</span>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-white/40 font-bold px-2">
              <span>M</span><span>T</span><span>W</span><span className="text-[#f4d125]">T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#1a1625] to-[#1a1625]">
          <div className="mb-10 flex flex-wrap justify-between items-end gap-4">
            <div className="space-y-1">
              <h1 className="text-white text-5xl font-serif font-bold tracking-tight">Good Morning, Sarah</h1>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#f4d125] animate-pulse"></span>
                <p className="text-[#f4d125]/80 text-sm font-medium uppercase tracking-widest">Current Frequency: Alignment High</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/5 px-4 py-2 rounded-xl text-center min-w-[80px] border border-white/10">
                <p className="text-white text-xl font-bold">05</p>
                <p className="text-white/40 text-[10px] uppercase font-bold">Days</p>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-xl text-center min-w-[80px] border border-white/10">
                <p className="text-white text-xl font-bold">14</p>
                <p className="text-white/40 text-[10px] uppercase font-bold">Hours</p>
              </div>
              <div className="bg-white/5 px-4 py-2 rounded-xl text-center min-w-[80px] border border-[#f4d125]/40">
                <p className="text-[#f4d125] text-xl font-bold">22</p>
                <p className="text-white/40 text-[10px] uppercase font-bold">Mins</p>
              </div>
            </div>
          </div>

          {/* Featured Daily Prayer Card */}
          <div className="bg-white/5 border border-[#f4d125]/20 rounded-3xl overflow-hidden shadow-2xl mb-8">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 relative min-h-[350px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-1000" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB0FPOeN4Mi0jX4p9y06tkiKV2EsKJPIC8ca07M_0sh4tcc8k1BYiy9v6abE7ATX5JD6bbuV5IZt8HSJF7KXnDEIAC1tmRW48GPZroMId0xnqhZZPg-oZYyQ2VXbf3D6QJU4P4OVfiyKMA_S6a0przpJ0M9bZgcdX0_I-V_0COo-LO9Z5nPLTTz41PXrMITGE67ElwDTJcCkEAxP2jCUHdFZG3bTqFRz1ueNH4VlQSWrOzca-sA0ur-43-Qah-1KvgD5--M8d8BSds')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-4">
                  <button className="size-20 rounded-full bg-[#f4d125] flex items-center justify-center text-[#1a1625] shadow-2xl hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-5xl fill-current">play_arrow</span>
                  </button>
                  <div>
                    <p className="text-white text-xs font-bold uppercase tracking-widest opacity-70">Now Playing</p>
                    <p className="text-white font-serif text-2xl">The Resonance of Stillness</p>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-10 flex flex-col justify-between">
                <div className="space-y-6">
                  <span className="inline-block px-4 py-1 rounded-full bg-[#f4d125]/10 text-[#f4d125] text-[10px] font-bold uppercase tracking-widest border border-[#f4d125]/20">Prayer of the Day</span>
                  <h2 className="text-white text-3xl font-serif font-bold">Heart Coherence Flow</h2>
                  <p className="text-white/80 leading-relaxed italic">Guided by Dr. Louise</p>
                  <p className="text-white/90 text-base leading-relaxed max-w-md">Today's practice focuses on expanding the toroidal field of the heart. Center your breath, visualize a golden light at the core of your chest, and align your frequency with collective peace.</p>
                  <div className="space-y-3">
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#f4d125] h-full w-1/3 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 font-bold uppercase tracking-widest">
                      <span>04:12</span>
                      <span>12:00</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-10">
                  <div className="flex -space-x-3">
                    {[20, 21, 22].map(i => (
                      <div key={i} className="size-8 rounded-full border-2 border-[#1a1625] overflow-hidden">
                        <img className="w-full h-full object-cover" src={`https://i.pravatar.cc/100?img=${i}`} alt="Avatar" />
                      </div>
                    ))}
                    <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/70 border-2 border-[#1a1625]">+82</div>
                  </div>
                  <button className="flex items-center gap-3 px-8 py-4 bg-[#f4d125] text-[#1a1625] rounded-xl font-bold text-sm shadow-xl transition-all hover:brightness-110 active:scale-95">
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    <span>Mark as Aligned</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div onClick={onJournalClick} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#f4d125]/40 transition-all group cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-[#f4d125]/60 group-hover:text-[#f4d125]">history_edu</span>
              <h4 className="text-white font-bold text-lg">Morning Reflection</h4>
              <p className="text-white/60 text-sm">You haven't recorded your coherence levels today.</p>
              <button className="text-[#f4d125] text-xs font-bold uppercase tracking-widest flex items-center gap-2 pt-2">Write Now <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-[#f4d125]/40 transition-all group cursor-pointer">
              <span className="material-symbols-outlined text-4xl text-[#f4d125]/60 group-hover:text-[#f4d125]">diversity_1</span>
              <h4 className="text-white font-bold text-lg">Sacred Geometry Study</h4>
              <p className="text-white/60 text-sm">Next meeting: Tomorrow, 10:00 AM PST</p>
              <button className="text-[#f4d125] text-xs font-bold uppercase tracking-widest flex items-center gap-2 pt-2">RSVP <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
            </div>
            <div className="bg-[#f4d125]/5 border border-[#f4d125]/30 p-6 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#f4d125] animate-pulse"></div>
              <span className="material-symbols-outlined text-4xl text-[#f4d125]">broadcast_on_personal</span>
              <h4 className="text-white font-bold text-lg">Direct Transmission</h4>
              <p className="text-white/60 text-sm">Dr. Louise is sharing insights on the Feb 8th Alignment.</p>
              <button className="bg-[#f4d125] text-[#1a1625] px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest mt-2">Join Live</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;