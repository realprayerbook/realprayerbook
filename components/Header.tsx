import React from 'react';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <span className="material-symbols-outlined text-brand-gold text-2xl lg:text-3xl">spa</span>
            <span className="font-regal text-lg lg:text-2xl text-brand-gold font-bold tracking-widest whitespace-nowrap">REAL PRAYER</span>
        </div>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-brand-gold p-2 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        <nav className="hidden lg:flex items-center gap-12">
           <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold">The Archive</button>
           <a href="#author" className="text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold">The Author</a>
           <a href="#login" className="text-white/60 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold border-l border-white/20 pl-12 ml-4">Login</a>
           <button 
             onClick={onCtaClick}
             className="px-8 py-3 bg-brand-gold text-brand-purple font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white hover:text-brand-obsidian transition-colors shadow-[0_0_30px_rgba(212,175,55,0.3)]"
           >
             Claim Your Copy
           </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-brand-obsidian/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="text-2xl font-regal text-white"
          >
            The Archive
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); document.querySelector('#author')?.scrollIntoView({ behavior: 'smooth' }); }} 
            className="text-2xl font-regal text-white"
          >
            The Author
          </button>
          <a 
            href="#login" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-2xl font-regal text-brand-gold"
          >
            Member Login
          </a>
          <button 
             onClick={() => { setIsMobileMenuOpen(false); onCtaClick(); }}
             className="px-10 py-4 bg-brand-gold text-brand-purple font-black uppercase tracking-[0.2em] text-sm rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)]"
           >
             Claim Your Copy
           </button>
      </div>
    </header>
  );
};

export default Header;