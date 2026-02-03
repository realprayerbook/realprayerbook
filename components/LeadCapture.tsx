import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LeadCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { name: string; phone: string }) => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' }
      );
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onSuccess({ name, phone });
      handleClose();
    }
  };

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 50, opacity: 0, duration: 0.4, ease: 'power4.in', onComplete: onClose });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
      <div ref={overlayRef} className="absolute inset-0 bg-brand-purple/95 backdrop-blur-2xl opacity-0" onClick={handleClose}></div>
      <div ref={modalRef} className="relative bg-white w-full max-w-md rounded-[3rem] p-12 shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden border-2 border-brand-gold/40">
        <div className="absolute top-0 right-0 p-8">
          <button onClick={handleClose} className="text-[#1E0B36]/30 hover:text-[#1E0B36] transition-colors">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center text-[#1E0B36] mx-auto mb-8 shadow-2xl shadow-brand-gold/30">
            <span className="material-symbols-outlined text-4xl font-bold">shield_person</span>
          </div>
          <h3 className="font-regal text-4xl font-black mb-4 text-[#1E0B36] tracking-tight">Exclusive Access</h3>
          <p className="text-[#1E0B36]/80 text-base font-semibold leading-relaxed italic px-4">
            "I am your Elite Assistant. Before revealing technical details or booking a viewing, please provide your contact information."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.3em] text-[#1E0B36] font-black ml-2">Full Name</label>
            <input 
              required
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1E0B36]/5 border-2 border-[#1E0B36]/10 rounded-2xl px-8 py-5 text-base text-[#1E0B36] font-bold focus:outline-none focus:border-brand-gold transition-all placeholder:text-[#1E0B36]/20"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.3em] text-[#1E0B36] font-black ml-2">Phone Number</label>
            <input 
              required
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#1E0B36]/5 border-2 border-[#1E0B36]/10 rounded-2xl px-8 py-5 text-base text-[#1E0B36] font-bold focus:outline-none focus:border-brand-gold transition-all placeholder:text-[#1E0B36]/20"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <button type="submit" className="w-full bg-[#1E0B36] text-white py-6 rounded-2xl font-black tracking-[0.4em] uppercase text-sm hover:bg-brand-magenta transition-all shadow-2xl shadow-[#1E0B36]/30 mt-6 gold-glow transform active:scale-95">
            Grant Me Access
          </button>
        </form>

        <p className="text-[10px] text-center text-[#1E0B36]/40 mt-10 uppercase tracking-[0.5em] font-black">
          Privacy Protocol Secured
        </p>
      </div>
    </div>
  );
};

export default LeadCapture;