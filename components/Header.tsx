import React from 'react';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#1E0B36]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-brand-gold text-3xl">spa</span>
          <span className="text-xl font-regal font-bold tracking-widest text-brand-gold">REAL PRAYER</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-gold transition-colors text-white/70" href="#hero">HOME</a>
          <a className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-gold transition-colors text-white/70" href="#donate">DONATE</a>
          <a className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-gold transition-colors text-white/70" href="#testimonials">REVIEWS</a>
          <a className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-gold transition-colors text-white/70" href="#author">THE AUTHOR</a>
          <button 
            onClick={onCtaClick}
            className="bg-brand-gold text-brand-purple px-6 py-2.5 rounded-full font-bold text-[10px] tracking-widest transition-all transform hover:scale-105 gold-glow uppercase"
          >
            Get The Book
          </button>
        </nav>

        <button 
          onClick={onCtaClick}
          className="md:hidden text-brand-gold"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Header;