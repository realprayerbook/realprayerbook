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
          
          <h1 className="text-5xl lg:text-7xl font-regal text-white leading-[1.1]">
            Stop <span className="text-brand-magenta italic">Begging</span> for <br/>
            Miracles
          </h1>
          
          <h2 className="text-2xl lg:text-3xl text-brand-gold font-regal">
            Command Your Reality Through the Science of Alignment
          </h2>

          <p className="text-xl text-brand-ivory/80 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Most people fail at prayer because they speak from fear. Learn to regulate your nervous system, bypass the "New Age" noise, and enter into direct communion with Source.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start pt-8">
            <button 
              onClick={onCtaClick}
              className="px-8 py-4 bg-brand-gold text-brand-obsidian rounded-full font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              Get The Archive
            </button>
            <button 
              onClick={onPrologueClick}
              className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-bold tracking-widest uppercase hover:bg-white hover:text-brand-obsidian transition-colors"
            >
              Read Prologue
            </button>
          </div>
        </div>

        {/* 3D Book Visual */}
        <div className="relative perspective-1000 flex justify-center">
          <div ref={bookRef} className="relative w-[300px] h-[460px] preserve-3d">
            <div className="absolute inset-0 rounded-r-lg shadow-[20px_20px_60px_rgba(0,0,0,0.5)] bg-brand-obsidian border-l-4 border-white/10">
               {/* Placeholder for Book Cover if image load fails */}
               <img 
                 src="/assets/book_cover.jpg" 
                 alt="Real Prayer Book Cover" 
                 className="w-full h-full object-cover rounded-r-lg"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://placehold.co/600x900/1E0B36/D4AF37?text=Real+Prayer';
                 }}
               />
               {/* Shine effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-r-lg mix-blend-overlay"></div>
            </div>
          </div>
          
          {/* Floor Glow */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-12 bg-brand-gold/30 blur-[60px] rounded-full"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
