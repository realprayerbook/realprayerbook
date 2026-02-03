import React, { useEffect, useState } from 'react';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-obsidian/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-brand-gold text-3xl">menu_book</span>
          <span className="font-regal text-xl md:text-2xl font-bold text-white tracking-wider">
            Real <span className="text-brand-gold">Prayer</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest">About</a>
          <a href="#author" className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest">Author</a>
          <a href="#reviews" className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest">Reviews</a>
        </nav>

        <button 
          onClick={onCtaClick}
          className={`px-6 py-2 rounded-full border transition-all ${isScrolled ? 'bg-brand-gold text-brand-obsidian border-brand-gold hover:bg-white' : 'border-white text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-obsidian'}`}
        >
          <span className="text-xs font-bold uppercase tracking-widest">Get The Book</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
