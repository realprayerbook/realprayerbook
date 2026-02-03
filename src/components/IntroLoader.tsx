import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .to(textRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.in'
      })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        pointerEvents: 'none'
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[60] bg-brand-obsidian flex items-center justify-center">
      <h1 ref={textRef} className="font-regal text-4xl md:text-6xl text-white opacity-0 translate-y-10">
        In the Beginning...
      </h1>
    </div>
  );
};

export default IntroLoader;
