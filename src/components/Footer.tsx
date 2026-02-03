import React from 'react';

interface FooterProps {
  onCtaClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  return (
    <footer className="bg-brand-obsidian py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-regal text-2xl text-white mb-2">Real Prayer</h4>
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} Dr. Louise Van der Velde. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
             <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">Privacy Policy</a>
             <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">Terms of Service</a>
             <a href="#" className="text-white/40 hover:text-brand-gold transition-colors">Contact</a>
          </div>

          <button onClick={onCtaClick} className="text-brand-gold border border-brand-gold/30 px-6 py-2 rounded-full hover:bg-brand-gold hover:text-brand-obsidian transition-colors text-sm uppercase tracking-widest">
            Get Started
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
