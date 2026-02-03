import React from 'react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      quote: "Real Prayer moved me in ways I didn't think possible. It's more than a book; it's a soft landing for the soul.",
      author: "James Miller",
      role: "Wellness Practitioner",
      img: "11"
    },
    {
      quote: "Louise has a way of translating the infinite into something so accessible. A masterclass in spiritual intimacy.",
      author: "Sarah Williams",
      role: "Author",
      img: "12"
    },
    {
      quote: "I've read many books on spirituality, but none have felt this grounded and real. The lotus motif truly represents the growth I've experienced.",
      author: "Marcus Thorne",
      role: "Seeker",
      img: "13"
    },
    {
      quote: "I finally understood that the pressure I was feeling wasn't a punishment, but a 'graduation event' designed to expand my capacity.",
      author: "Elena R.",
      role: "CEO & Founder",
      img: "14"
    },
    {
      quote: "This book cuts through the noise. It explains the mechanics of why prayer works—not as magic, but as instruction entering an intelligent system.",
      author: "David K.",
      role: "Truth Seeker",
      img: "15"
    }
  ];

  return (
    <section className="py-24 px-6" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal-section">
          <div>
            <span className="text-brand-gold font-black uppercase tracking-[0.5em] text-xs">Transmissions of Truth</span>
            <h2 className="text-6xl font-regal font-black mt-6 text-white tracking-tight">Voices of Connection</h2>
          </div>
          <div className="flex items-center gap-5 px-10 py-5 glass-card rounded-full border-2 border-white/20 shadow-2xl">
            <div className="flex text-brand-gold gap-1">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-xl">star</span>)}
            </div>
            <span className="font-black text-xs tracking-[0.3em] uppercase text-white">4.9/5 FREQUENCY</span>
          </div>
        </div>
        
        <div className="masonry reveal-section">
          {testimonials.map((t, i) => (
            <div key={i} className="masonry-item glass-card p-10 rounded-[2.5rem] group hover:border-brand-gold/80 transition-all duration-500 shadow-2xl border-2 border-white/10">
              <div className="flex items-center gap-5 mb-8">
                <div className="size-16 rounded-full bg-cover border-2 border-brand-gold/40 shadow-xl" style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${t.img}')` }}></div>
                <div>
                  <p className="font-regal text-xl font-black text-white tracking-tight">{t.author}</p>
                  <p className="text-[10px] text-brand-gold uppercase tracking-[0.4em] font-black mt-1">{t.role}</p>
                </div>
              </div>
              <p className="text-lg italic leading-relaxed text-white font-normal opacity-100">"{t.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;