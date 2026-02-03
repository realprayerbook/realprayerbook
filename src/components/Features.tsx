import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const features = [
  {
    icon: 'wifi_tethering',
    title: 'Frequency Alignment',
    description: 'Learn the precise mechanics of how to tune your personal frequency to the unified field.'
  },
  {
    icon: 'psychology',
    title: 'De-Hypnosis',
    description: 'Break free from the societal trances and limiting beliefs that have held you back for decades.'
  },
  {
    icon: 'lock_open',
    title: 'Unlocking Codes',
    description: 'Access the hidden codes of reality that allow you to command outcomes rather than request them.'
  }
];

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative z-10" id="about">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-card p-10 rounded-[2rem] hover:bg-white/5 transition-colors group cursor-default border border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-brand-gold text-4xl">{f.icon}</span>
              </div>
              <h3 className="text-2xl font-regal text-white mb-4">{f.title}</h3>
              <p className="text-brand-ivory/60 leading-relaxed font-light">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
