import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
  onCtaClick: () => void;
  onPrologueClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onPrologueClick }) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Float animation for the book
      gsap.to(bookRef.current, {
        y: -20,
        rotation: 2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      // Mouse move 3D tilt effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!bookRef.current || !containerRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX - innerWidth / 2) / 40;
        const y = (clientY - innerHeight / 2) / 40;
        
        gsap.to(bookRef.current, {
          rotationY: x,
          rotationX: -y,
          duration: 0.5,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/50 via-brand-obsidian to-brand-obsidian z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-brand-gold text-lg">auto_awesome</span>
            <span className="text-brand-gold text-xs font-black tracking-[0.2em] uppercase">The Science of Alignment</span>
          </div>
          
          <h1 className="text-4xl lg:text-7xl font-regal text-white leading-[1.2] lg:leading-[1.1]">
            Stop <span className="text-brand-magenta italic">Begging</span> for <br/>
            Miracles
          </h1>
          
          <h2 className="text-xl lg:text-3xl text-brand-gold font-regal leading-relaxed">
            Command Your Reality Through the Science of Alignment
          </h2>

          <p className="text-lg lg:text-xl text-brand-ivory/80 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Most people fail at prayer because they speak from fear. Learn to regulate your nervous system, bypass the "New Age" noise, and enter into direct communion with Source.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-8">
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 bg-brand-gold text-brand-obsidian rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.4)] text-sm lg:text-base"
            >
              Get The Archive
            </button>
            <button 
              onClick={onPrologueClick}
              className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-bold tracking-widest uppercase hover:bg-white hover:text-brand-obsidian transition-colors text-sm lg:text-base"
            >
              Read Prologue
            </button>
          </div>
        </div>

        {/* 3D Book / Author Visual */}
        <div className="relative perspective-1000 flex justify-center mt-12 lg:mt-0">
          {/* Mobile: Flex Column Layout to separate Image and Text completely */}
          <div className="flex flex-col gap-8 w-full max-w-md lg:block">
              
              {/* Image Container */}
              <div className="relative rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden aspect-[4/5] lg:aspect-[4/5.5] shadow-2xl border-4 border-white/20 group w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-110" 
                  style={{ backgroundImage: "url('/assets/author.jpg')" }}
                ></div>
                {/* Gradient Only for desktop overlay effect, removed on mobile to show full image */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-transparent to-transparent hidden lg:block"></div>
              </div>

              {/* Award Card - Relative block on Mobile (below image), Absolute Overlay on Desktop */}
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
  );
};

export default Hero;
