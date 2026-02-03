import React from 'react';

interface FooterProps {
  onCtaClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  return (
    <footer className="bg-[#110620] border-t border-white/10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-brand-gold text-4xl">spa</span>
              <span className="text-2xl font-regal font-black tracking-widest text-brand-gold uppercase">REAL PRAYER</span>
            </div>
            <p className="text-white font-medium max-w-sm text-base tracking-wide leading-relaxed italic opacity-90">
              Guiding souls back to the sacred center. Join our global community of conscious seekers. An independent publishing transmission by Dr. Louise Van der Velde.
            </p>
            <div className="flex gap-6">
              {['share', 'mail', 'language'].map(icon => (
                <a key={icon} className="size-14 rounded-full glass-card flex items-center justify-center hover:bg-brand-gold hover:text-brand-purple transition-all text-brand-gold border border-white/10" href="#">
                  <span className="material-symbols-outlined text-2xl">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <h5 className="font-regal text-sm font-bold uppercase tracking-[0.4em] text-brand-gold">Navigation</h5>
            <ul className="space-y-5 text-white text-[11px] tracking-[0.3em] uppercase font-black opacity-100">
              <li><a className="hover:text-brand-gold transition-colors" href="#hero">The Book</a></li>
              <li><a className="hover:text-brand-gold transition-colors" href="#author">Dr. Louise</a></li>
              <li><a className="hover:text-brand-gold transition-colors" href="#donate">Donate Now</a></li>
              <li><button onClick={onCtaClick} className="hover:text-brand-gold transition-colors text-left uppercase">Elite Access</button></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h5 className="font-regal text-sm font-bold uppercase tracking-[0.4em] text-brand-gold">Stay Connected</h5>
            <p className="text-[11px] text-white/90 leading-relaxed uppercase tracking-[0.25em] font-bold">Divine wisdom in your inbox.</p>
            <div className="flex border-b border-brand-gold/30 pb-3 group">
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-white/30 text-white outline-none font-bold tracking-widest" 
                placeholder="EMAIL ADDRESS" 
                type="email"
              />
              <button className="text-brand-gold material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.5em]">© 2025 REAL PRAYER. DESIGNED BY LIGHT.</p>
          <div className="flex gap-12 text-[10px] text-white/50 font-black uppercase tracking-[0.5em]">
            <a className="hover:text-white transition-colors" href="#">TERMS</a>
            <a className="hover:text-white transition-colors" href="#">PRIVACY</a>
            <span className="text-brand-gold/60">SYSTEM V2.0.4</span>
          </div>
        </div>

        <div className="mt-20 p-10 bg-brand-purple/40 rounded-[3rem] border border-white/10 text-[11px] text-white font-bold leading-loose uppercase tracking-[0.3em] text-center max-w-4xl mx-auto shadow-2xl">
          PWA ARCHIVE ACTIVATED. For optimized sovereign access, select "Add to Home Screen" from your mobile browser menu. All transmissions secured via 256-bit coherence protocol.
        </div>
      </div>
    </footer>
  );
};

export default Footer;