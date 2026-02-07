import React from 'react';

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      quote: "Real Prayer is one of the most profound and beautifully articulated explorations of the true power of prayer I have encountered. Dr Louise doesn’t merely explain prayer—she lives it and in living it shares how it moves, shapes, and transforms our lives. Reading this book, I felt it offers exactly what the world needs right now: not a new concept of prayer, but a way to embody it.",
      author: "Eleanora-Grace Heart",
      role: "Emotional Mastery Specialist & Author",
      img: "/assets/eleanora.jpg"
    },
    {
      quote: "Real Prayer is not theory—it’s practice, and it works. Through Louise’s guidance, I learned how important it is to recognise and eliminate negative and destructive influences before they take hold. These practices gave me clarity, strength, and a grounded sense of protection that changed how I move through the world—personally and professionally.",
      author: "Jon Callaway",
      role: "Stuntman & Actor",
      img: "/assets/jon.jpg"
    },
    {
      quote: "I have known Louise for over ten years and witnessed what I can only describe as miracles unfolding within days. Through reading Real Prayer, I now understand more clearly how this happens. This book offers the strength and faith needed to carry people through profound challenges. It is an easy read, yet a powerful and practical tool.",
      author: "Dr Lance Haggis OBE",
      role: "World Charity Supporter",
      img: "/assets/lance.jpg"
    }
  ];

  return (
    <section className="py-24 px-6" id="testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 lg:mb-20 gap-8 reveal-section">
          <div>
            <span className="text-brand-gold font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-[10px] lg:text-xs">Transmissions of Truth</span>
            <h2 className="text-4xl lg:text-6xl font-regal font-black mt-4 lg:mt-6 text-white tracking-tight">Voices of Connection</h2>
          </div>
          <div className="flex items-center gap-3 lg:gap-5 px-6 lg:px-10 py-3 lg:py-5 glass-card rounded-full border-2 border-white/20 shadow-2xl">
            <div className="flex text-brand-gold gap-1">
              {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-base lg:text-xl">star</span>)}
            </div>
            <span className="font-black text-[10px] lg:text-xs tracking-[0.2em] lg:tracking-[0.3em] uppercase text-white">4.9/5 FREQUENCY</span>
          </div>
        </div>
        
        <div className="masonry reveal-section">
          {testimonials.map((t, i) => (
            <div key={i} className="masonry-item glass-card p-10 rounded-[2.5rem] group hover:border-brand-gold/80 transition-all duration-500 shadow-2xl border-2 border-white/10">
              <div className="flex items-center gap-5 mb-8">
                <div className="size-16 rounded-full bg-cover border-2 border-brand-gold/40 shadow-xl" style={{ backgroundImage: `url('${t.img}')` }}></div>
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