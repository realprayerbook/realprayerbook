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
          <h2 className="text-4xl md:text-8xl font-regal font-bold leading-tight text-white tracking-tight">
            Sacred Wisdom for <br/>
            <span className="text-brand-gold drop-shadow-[0_0_25px_rgba(212,175,55,0.7)] italic">Modern Spirit</span>
          </h2>
          <div className="space-y-16">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-6 lg:gap-12 group">
                <div className="flex-shrink-0 size-16 lg:size-24 rounded-full border-2 border-brand-gold/50 flex items-center justify-center group-hover:bg-brand-gold/30 transition-all duration-500 shadow-2xl shadow-brand-gold/20">
                  <span className="material-symbols-outlined text-brand-gold text-3xl lg:text-5xl">{b.icon}</span>
                </div>
                <div>
                  <h4 className="font-regal text-2xl lg:text-3xl mb-2 lg:mb-5 text-white font-black tracking-tight">{b.title}</h4>
                  <p className="text-white text-base lg:text-xl tracking-wide leading-relaxed font-medium opacity-100">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative reveal-section">
          <div className="absolute inset-0 bg-brand-indigo/80 rounded-[4rem] -rotate-3 blur-3xl"></div>
          <div className="relative glass-card p-6 rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] border-2 border-white/20">
            {/* Context Visual: Sacred Geometry / Meditation */}
            {/* Video Embed */}
            <div className="aspect-[4/5] bg-brand-obsidian rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <iframe 
                  className="absolute inset-0 w-full h-full" 
                  src="https://www.youtube.com/embed/Xebx3GusdWk?rel=0&modestbranding=1" 
                  title="RealPrayer Welcome" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;