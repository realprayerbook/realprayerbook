import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { generateDailySignal } from '../utils/ai';

const DailySignal: React.FC = () => {
    const [signal, setSignal] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check local storage for today's signal to avoid re-generating
        const savedSignal = localStorage.getItem('daily_signal');
        const savedDate = localStorage.getItem('daily_signal_date');
        const today = new Date().toDateString();

        if (savedSignal && savedDate === today) {
            setSignal(savedSignal);
            setLoading(false);
        }
    }, []);

    const handleReveal = async () => {
        if (signal) {
            animateReveal();
            return;
        }

        setLoading(true);
        const generated = await generateDailySignal();
        
        if (generated) {
            setSignal(generated);
            localStorage.setItem('daily_signal', generated);
            localStorage.setItem('daily_signal_date', new Date().toDateString());
            setLoading(false);
            animateReveal();
        } else {
            // Fallback if API fails or no key
            setLoading(false);
            alert("The frequency is quiet today. Please ensure the API Key is configured in settings.");
        }
    };

    const animateReveal = () => {
         setRevealed(true);
         gsap.fromTo(contentRef.current, 
            { opacity: 0, y: 20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
         );
    };

    // Parse the signal for nice formatting if it follows the structure
    // We expect "The Insight:", "The Command:", "The Seal:" keys or similar.
    // Simple parser to bold the keys
    const formatSignal = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.includes(':')) {
                const parts = line.split(':');
                if (parts.length > 1 && (line.startsWith('The Insight') || line.startsWith('The Command') || line.startsWith('The Seal') || line.startsWith('Theme'))) {
                    return <p key={i} className="mb-4"><strong className="text-brand-gold uppercase tracking-widest text-xs block mb-1">{parts[0]}</strong> <span className="text-white/90">{parts.slice(1).join(':')}</span></p>;
                }
            }
            return <p key={i} className="mb-2 text-white/80">{line}</p>;
        });
    };

    if (revealed && signal) {
        return (
            <div ref={contentRef} className="glass-card p-8 md:p-12 rounded-[3rem] border border-brand-gold/20 shadow-[0_0_60px_rgba(212,175,55,0.15)] relative overflow-hidden mb-12">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                     <span className="material-symbols-outlined text-8xl text-brand-gold">spa</span>
                </div>
                
                <h3 className="text-2xl font-regal text-white font-black italic mb-2">Daily Coherence Signal</h3>
                <p className="text-[10px] text-brand-gold uppercase tracking-[0.3em] mb-8">Your Morning Instruction for Earth School</p>

                <div className="prose prose-invert prose-lg max-w-none font-light leading-relaxed">
                    {formatSignal(signal)}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-end">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Read aloud to command frequency</p>
                    <span className="material-symbols-outlined text-brand-gold/50">graphic_eq</span>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="glass-card p-1 text-center rounded-[3rem] border border-white/10 relative overflow-hidden mb-12 group hover:border-brand-gold/30 transition-all duration-500">
             <div className="bg-brand-obsidian/40 backdrop-blur-md rounded-[2.8rem] p-12 relative z-10 flex flex-col items-center gap-6">
                
                <div className="space-y-4 max-w-lg mx-auto">
                    <h3 className="text-3xl font-regal text-white font-black italic">The Daily Coherence Signal</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                        "If you do not set your signal first, the world will set it for you."
                    </p>
                    <p className="text-brand-gold text-xs uppercase tracking-[0.2em] font-bold">
                        Stop Reacting. Start Commanding.
                    </p>
                </div>

                <button 
                  onClick={handleReveal}
                  disabled={loading}
                  className="mt-4 group relative px-8 py-4 bg-brand-gold text-brand-purple rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-wait"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                            Tuning Frequency...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                             <span className="material-symbols-outlined">wifi_tethering</span>
                             Receive Instruction
                        </span>
                    )}
                </button>
             </div>

             {/* Background glow effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/5 via-transparent to-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>
    );
};

export default DailySignal;
