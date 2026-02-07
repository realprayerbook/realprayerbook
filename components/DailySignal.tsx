import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getDailyMessage } from '../utils/db';

const DailySignal: React.FC = () => {
    const [signal, setSignal] = useState<{ title: string; insight: string; command: string; seal: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Automatically check for a revealed signal in local storage for today
        const savedDate = localStorage.getItem('daily_signal_date');
        const todayStr = new Date().toDateString();
        
        if (savedDate === todayStr) {
            const savedSignal = localStorage.getItem('daily_signal');
            if (savedSignal) {
                try {
                    setSignal(JSON.parse(savedSignal));
                    setRevealed(true);
                } catch (e) {
                    console.error('Error parsing saved signal:', e);
                }
            }
        }
    }, []);

    const handleReveal = async () => {
        setLoading(true);
        
        // Calculate day of year (1-366)
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYearRaw = Math.floor(diff / oneDay);
        
        // Ensure we loop correctly if day exceeds archive count (e.g. leap years or custom offsets)
        // We have 370 days of content.
        const dayOfYear = ((dayOfYearRaw - 1) % 370) + 1;

        const data = await getDailyMessage(dayOfYear);
        
        if (data) {
            setSignal(data);
            localStorage.setItem('daily_signal', JSON.stringify(data));
            localStorage.setItem('daily_signal_date', new Date().toDateString());
            setLoading(false);
            animateReveal();
        } else {
            setLoading(false);
            // Fallback for missing data
            setSignal({
                title: "Stillness",
                insight: "The archive is tuning into your unique frequency.",
                command: "Command your day with your own sovereign will.",
                seal: "You are the creator. And so it is done."
            });
            animateReveal();
        }
    };

    const animateReveal = () => {
        setRevealed(true);
        setTimeout(() => {
            if (contentRef.current) {
                gsap.fromTo(contentRef.current, 
                    { opacity: 0, y: 30, filter: 'blur(10px)' },
                    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
                );
            }
        }, 100);
    };

    if (revealed && signal) {
        return (
            <div ref={contentRef} className="glass-card relative border border-white/10 p-12 lg:p-24 rounded-[4rem] bg-brand-obsidian/40 backdrop-blur-3xl space-y-16 overflow-hidden w-full mb-12">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 size-64 bg-brand-magenta/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                <div className="absolute bottom-0 left-0 size-64 bg-brand-gold/10 blur-[100px] -ml-32 -mb-32 rounded-full"></div>

                <div className="space-y-6 text-center">
                    <span className="text-xs uppercase tracking-[0.4em] text-brand-gold font-bold">{signal.title}</span>
                    <div className="h-px w-24 bg-brand-gold mx-auto opacity-30"></div>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl lg:text-4xl text-white font-newsreader italic leading-relaxed max-w-2xl mx-auto">
                        "{signal.insight}"
                    </h3>
                </div>

                <div className="space-y-8 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10">
                        <span className="size-2 rounded-full bg-brand-magenta"></span>
                        <span className="text-[10px] uppercase tracking-widest text-white/60 font-black">Today's Sacred Command</span>
                    </div>
                    <p className="text-3xl lg:text-5xl text-brand-gold font-regal font-light tracking-wide italic">
                        {signal.command}
                    </p>
                </div>

                <div className="pt-12 text-center">
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-black italic">
                        {signal.seal}
                    </p>
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
