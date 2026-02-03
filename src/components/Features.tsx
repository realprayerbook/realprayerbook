import React from 'react';

const Features: React.FC = () => {
  const benefits = [
    {
      title: "Earth School Mechanics",
      desc: "Learn why crises are actually 'graduation events' and how to stop asking 'Why me?' and start asking 'What is this preparing me for?'",
      icon: "spa"
    },
    {
      title: "Coherence & Regulation",
      desc: "Learn why prayer fails when your body is in 'threat mode' and how to physiologically prepare your vessel for instruction.",
      icon: "filter_vintage"
    },
    {
      title: "Cut Straight to Source",
      desc: "Bypass the noise of 'New Age' distractions and fake gurus to establish a direct, unmediated line to Divine Intelligence.",
      icon: "bolt"
    }
  ];

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-16 reveal-section">
          <h2 className="text-5xl md:text-8xl font-regal font-bold leading-tight text-white tracking-tight">
            Sacred Wisdom for <br/>
            <span className="text-brand-gold drop-shadow-[0_0_25px_rgba(212,175,55,0.7)] italic">Modern Spirit</span>
          </h2>
          <div className="space-y-16">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-12 group">
                <div className="flex-shrink-0 size-24 rounded-full border-2 border-brand-gold/50 flex items-center justify-center group-hover:bg-brand-gold/30 transition-all duration-500 shadow-2xl shadow-brand-gold/20">
                  <span className="material-symbols-outlined text-brand-gold text-5xl">{b.icon}</span>
                </div>
                <div>
                  <h4 className="font-regal text-3xl mb-5 text-white font-black tracking-tight">{b.title}</h4>
                  <p className="text-white text-xl tracking-wide leading-relaxed font-medium opacity-100">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative reveal-section">
          <div className="absolute inset-0 bg-brand-indigo/80 rounded-[4rem] -rotate-3 blur-3xl"></div>
          <div className="relative glass-card p-6 rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] border-2 border-white/20">
            {/* Context Visual: Sacred Geometry / Meditation */}
            <div className="aspect-[4/5] bg-cover bg-center rounded-[3rem] hover:scale-105 transition-transform duration-1000" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200')" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="size-28 rounded-full bg-brand-magenta text-white flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_50px_rgba(157,43,102,0.8)] border-4 border-white/30">
                <span className="material-symbols-outlined fill-current text-6xl">play_circle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;