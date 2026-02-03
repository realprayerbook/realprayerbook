import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(bookRef.current,
        { y: 0 },
        { y: -30, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      );

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth - 0.5) * 30;
        const yPos = (clientY / innerHeight - 0.5) * -30;

        gsap.to(bookRef.current, {
          rotateY: xPos,
          rotateX: yPos,
          duration: 1.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-48 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex items-center overflow-hidden" id="hero">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group order-2 lg:order-1" style={{ perspective: '3000px' }}>
          <div className="absolute -inset-24 bg-brand-magenta/40 blur-[180px] rounded-full"></div>
          <div 
            ref={bookRef}
            className="relative w-full max-w-sm mx-auto aspect-[3/4.5] rounded-xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] border-2 border-white/20 transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* THE CORRECT BOOK COVER URL */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMGZXZDs2l2j35DNNnKPdsmhc1FmkKqXT8RZeBx2mR8XzWwnPrx1mJnaVCtZjJHT8I7fgneNvG2Sd2PNhGrd7AciHErZksPDPBffzvouv_ADfOyiRdlz2HDPuSNiLoTv5HM-paxjgJZm2BxyuA66h0P0y45_IyT87iqGsU90rGsXEx5gcyCMPC4uFpU_qBBLRXxSDMXNJsbo4Us2YmQDwlXSudXZ2MSyli-e6xmJ3MeBJeBw2DP7yr6wwC7ELl9mGYpkJrot4lK5s')" }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/90 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-8 right-8 flex items-center gap-3 bg-brand-gold text-brand-purple px-5 py-2 rounded-full shadow-2xl border border-white/40 gold-glow">
              <span className="material-symbols-outlined text-sm font-black">filter_vintage</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Edition</span>
            </div>
          </div>
        </div>

        <div ref={titleRef} className="flex flex-col gap-10 order-1 lg:order-2">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-brand-gold text-xs font-black tracking-[0.4em] uppercase">Dr. Louise Van der Velde</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-regal font-black leading-[0.85] text-white">
              Real <br/><span className="text-brand-gold drop-shadow-2xl">Prayer</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-light leading-relaxed max-w-xl opacity-100 italic">
              Stop begging. Start commanding. A scientific journey through the mechanics of soul alignment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onCtaClick}
              className="bg-brand-gold hover:bg-white text-brand-purple px-12 py-5 rounded-full font-black text-xs transition-all flex items-center justify-center gap-4 gold-glow uppercase tracking-[0.3em]"
            >
              <span>Donate to Download</span>
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className="border-2 border-white/40 bg-white/10 hover:bg-white/20 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all backdrop-blur-md text-white">
              Read Prologue
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;