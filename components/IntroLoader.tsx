
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'expo.inOut',
          onComplete
        });
      }
    });

    tl.fromTo(textRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }
    )
    .to(progressRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    }, "-=0.5")
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power4.in'
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-brand-obsidian flex flex-col items-center justify-center text-brand-ivory">
      <div className="overflow-hidden mb-4 text-center px-4">
        <div ref={textRef} className="font-serif text-4xl md:text-6xl italic tracking-tight text-brand-gold">
          Real Prayer
        </div>
      </div>
      <div className="w-64 h-[1px] bg-brand-clay/30 relative overflow-hidden">
        <div ref={progressRef} className="absolute top-0 left-0 h-full w-0 bg-brand-gold shadow-[0_0_10px_#C5A059]"></div>
      </div>
      <div className="mt-8 text-[10px] uppercase tracking-[0.5em] text-brand-clay opacity-60">
        Initiating Alignment
      </div>
    </div>
  );
};

export default IntroLoader;
