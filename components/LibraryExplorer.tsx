import React, { useState } from 'react';

const MONTHS_DATA = [
  { id: 1, title: "The Foundation of Coherence", focus: "Regulating the nervous system and establishing the baseline for frequency command.", days: 31 },
  { id: 2, title: "The Sovereign Vessel", focus: "Reclaiming ownership of your biological and spiritual space from external interference.", days: 31 },
  { id: 3, title: "Spiritual Hygiene & Sovereignty", focus: "Clearing parasitic energies and mastering the 'Command of Extraction.'", days: 31 },
  { id: 4, title: "Provision & The Sovereign Flow", focus: "Aligning with the mechanical laws of abundance and natural flow.", days: 31 },
  { id: 5, title: "Lineage, Legacy & Sovereignty", focus: "Healing ancestral 'glitches' and reclaiming your inherent power of heritage.", days: 31 },
  { id: 6, title: "Cellular Command & Vitality", focus: "Directing the intelligence of your cells for rejuvenation and health.", days: 31 },
  { id: 7, title: "Graduation Events & Resilience", focus: "Navigating life tests as opportunities for high-frequency graduation.", days: 31 },
  { id: 8, title: "Detachment, Importance & The Void", focus: "The power of surrender and the vacuum of creation.", days: 31 },
  { id: 9, title: "Relationships & Mirroring", focus: "Stopping the outward projection and changing the reflection by changing ourselves.", days: 31 },
  { id: 10, title: "Discernment in an Age of Noise", focus: "Reclaiming your internal compass in a world of algorithmic distraction.", days: 31 },
  { id: 11, title: "Joy as a Weapon of Resistance", focus: "Using laughter and lightness as high-potency tools to shatter density.", days: 31 },
  { id: 12, title: "Integration & The Sovereign Creator", focus: "Locking in your new identity as the architect of your own resonance.", days: 31 }
];

interface LibraryExplorerProps {
    onBack: () => void;
}

const LibraryExplorer: React.FC<LibraryExplorerProps> = ({ onBack }) => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-brand-obsidian text-white p-6 lg:p-12">
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 animate-in fade-in slide-in-from-top duration-700">
                <div className="space-y-4">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-brand-gold/60 hover:text-brand-gold transition-colors text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Command Center
                    </button>
                    <div className="flex items-center gap-4">
                        <span className="h-px w-12 bg-brand-gold"></span>
                        <span className="text-brand-gold font-black uppercase tracking-[0.4em] text-[10px]">The Archive Curriculum</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-regal font-black italic italic leading-tight">
                        Explore the <br /><span className="text-brand-magenta">12-Month Journey</span>
                    </h1>
                </div>
                <div className="max-w-md text-right md:text-left">
                    <p className="text-white/40 text-sm leading-relaxed font-medium italic">
                        "Do not rush the transmission. Real mastery is not a race; it is a steady recalibration of your entire field."
                    </p>
                </div>
            </header>

            {!selectedMonth ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                    {MONTHS_DATA.map((month) => (
                        <div 
                            key={month.id}
                            onClick={() => setSelectedMonth(month.id)}
                            className="glass-card p-8 rounded-[2.5rem] border border-white/10 hover:border-brand-gold/30 transition-all duration-500 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
                        >
                            <div className="absolute -top-10 -right-10 text-brand-gold/5 font-regal text-[12rem] pointer-events-none group-hover:text-brand-gold/10 transition-colors">
                                {month.id}
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all">
                                        <span className="material-symbols-outlined">menu_book</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Month {month.id}</span>
                                </div>
                                <h3 className="text-2xl font-regal font-black italic mb-4 group-hover:text-brand-gold transition-colors">{month.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {month.focus}
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{month.days} Transmissions</span>
                                <span className="material-symbols-outlined text-brand-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-7xl mx-auto animate-in slide-in-from-right duration-500 pb-24">
                    <div className="flex items-center gap-6 mb-12">
                         <button onClick={() => setSelectedMonth(null)} className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                         </button>
                         <div>
                            <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-1 italic">Now Viewing</p>
                            <h2 className="text-3xl font-regal font-black italic">Month {selectedMonth}: {MONTHS_DATA.find(m => m.id === selectedMonth)?.title}</h2>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="glass-card p-10 rounded-[3rem] border-2 border-brand-gold/20 shadow-2xl relative overflow-hidden bg-white/5">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <span className="material-symbols-outlined text-7xl text-brand-gold">military_tech</span>
                                </div>
                                <h4 className="text-brand-gold font-black uppercase tracking-widest text-xs mb-6">Primary Focus</h4>
                                <p className="text-white text-xl font-medium leading-relaxed italic">
                                    {MONTHS_DATA.find(m => m.id === selectedMonth)?.focus}
                                </p>
                            </div>
                            
                            <div className="p-8 rounded-[2rem] bg-brand-magenta/5 border border-brand-magenta/20">
                                <p className="text-white/70 text-sm leading-relaxed">
                                    <strong className="text-brand-magenta">Note:</strong> Full prayers are revealed daily in your "Daily Signal." This curriculum explorer shows the titles to help you map your evolution.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                           {[...Array(MONTHS_DATA.find(m => m.id === selectedMonth)?.days)].map((_, i) => (
                               <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all opacity-60 hover:opacity-100 group">
                                    <span className="text-brand-gold/30 font-black group-hover:text-brand-gold transition-colors">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-white/80 font-medium group-hover:text-white transition-colors">Strategic Transmission & Command</span>
                                    <span className="material-symbols-outlined ml-auto text-brand-gold text-lg opacity-20">lock</span>
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LibraryExplorer;
