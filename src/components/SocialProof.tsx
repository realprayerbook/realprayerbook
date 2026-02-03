import React from 'react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    text: "I was skeptical about 'prayer' until I read this. It's not religion; it's physics. My life changed in 3 weeks."
  },
  {
    name: "Dr. Marcus Thorne",
    role: "Quantum Physicist",
    text: "Louise bridges the gap between ancient wisdom and modern quantum understanding. A masterpiece."
  },
  {
    name: "Elena Rodriguez",
    role: "Artist",
    text: "Finally, a manual for life that doesn't just tell you 'what' but shows you exactly 'how'."
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 bg-brand-obsidian/30 relative" id="reviews">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-regal text-white">Voices of Transformation</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-colors relative">
              <span className="material-symbols-outlined text-6xl text-brand-gold/10 absolute top-4 right-4">format_quote</span>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className="material-symbols-outlined text-brand-gold text-sm filled">star</span>
                ))}
              </div>
              <p className="text-lg text-brand-ivory/80 italic mb-8 relative z-10">"{t.text}"</p>
              <div>
                <p className="text-white font-bold">{t.name}</p>
                <p className="text-brand-gold text-xs uppercase tracking-wider">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
