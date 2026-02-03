import React, { useState } from 'react';

interface LeadCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: { name: string; phone: string }) => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate capture
    onSuccess({ name, phone });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-brand-obsidian border border-white/10 rounded-3xl p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <h3 className="text-2xl font-regal text-brand-gold mb-2 text-center">Dispatch Details</h3>
        <p className="text-white/80 text-center italic mb-6">"Divine Wisdom coming your way here"</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors"
              required
            />
          </div>
          <button type="submit" className="w-full bg-brand-gold text-brand-obsidian font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-colors">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadCapture;
