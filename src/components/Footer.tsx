import React, { useState } from 'react';

interface FooterProps {
  onCtaClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-brand-obsidian py-12 border-t border-white/10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-regal text-2xl text-white mb-2">Real Prayer</h4>
            <p className="text-white/40 text-sm">© {new Date().getFullYear()} Dr. Louise Van der Velde. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
             <button onClick={() => setPrivacyOpen(true)} className="text-white/40 hover:text-brand-gold transition-colors text-sm uppercase tracking-widest">Privacy Policy</button>
             <button onClick={() => setTermsOpen(true)} className="text-white/40 hover:text-brand-gold transition-colors text-sm uppercase tracking-widest">Terms of Service</button>
          </div>

          <button onClick={onCtaClick} className="text-brand-gold border border-brand-gold/30 px-6 py-2 rounded-full hover:bg-brand-gold hover:text-brand-obsidian transition-colors text-sm uppercase tracking-widest">
            Get The Book
          </button>
        </div>
      </div>

      {/* Simplified Footer Modals */}
      {(privacyOpen || termsOpen) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => { setPrivacyOpen(false); setTermsOpen(false); }}></div>
            <div className="relative bg-brand-obsidian border border-white/10 p-10 rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
                <button onClick={() => { setPrivacyOpen(false); setTermsOpen(false); }} className="absolute top-4 right-4 text-white/50 hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h3 className="text-2xl font-regal text-brand-gold mb-6">{privacyOpen ? 'Privacy Policy' : 'Terms of Service'}</h3>
                <div className="prose prose-invert prose-sm text-white/70">
                    {privacyOpen ? (
                        <>
                            <p><strong>Effective Date: {new Date().toLocaleDateString()}</strong></p>
                            <p>Dr. Louise Van der Velde ("we", "our") respects your privacy. This policy outlines how we handle your data in relation to the 'Real Prayer' book and associated teachings.</p>
                            <h4>1. Information Collection</h4>
                            <p>We collect basic contact information (name, email, phone) only when you voluntarily provide it for the purpose of purchasing the book or receiving updates.</p>
                            <h4>2. Use of Information</h4>
                            <p>Your information is used solely to fulfill orders, deliver digital content, and provide "Divine Wisdom" updates. We never sell your data to third parties.</p>
                            <h4>3. Security</h4>
                            <p>We implement standard security protocols to protect your data during transmission and storage.</p>
                        </>
                    ) : (
                        <>
                            <p><strong>Welcome to Real Prayer.</strong></p>
                            <p>By accessing this website and purchasing our materials, you agree to the following terms:</p>
                            <h4>1. Intellectual Property</h4>
                            <p>All content, including text, images, and audio transmissions, is the intellectual property of Dr. Louise Van der Velde. Unauthorized reproduction is prohibited.</p>
                            <h4>2. Digital Goods</h4>
                            <p>Digital downloads are non-refundable once accessed. Please ensure compatibility before purchasing.</p>
                            <h4>3. Disclaimer</h4>
                            <p>The materials provided are for spiritual and educational purposes. Results may vary dependent on individual alignment.</p>
                        </>
                    )}
                </div>
            </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
