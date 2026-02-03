import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface DonationUIProps {
  onComplete: () => void;
}

const PHYSICAL_THRESHOLD = 25;

const DonationUI: React.FC<DonationUIProps> = ({ onComplete }) => {
  const [amount, setAmount] = useState(45);
  const [isPhysical, setIsPhysical] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<HTMLDivElement>(null);

  const updateAmount = (val: number) => {
    setAmount(val);
    const shouldBePhysical = val >= PHYSICAL_THRESHOLD;
    if (shouldBePhysical !== isPhysical) {
      setIsPhysical(shouldBePhysical);
    }
  };

  useEffect(() => {
    if (isPhysical) {
      gsap.fromTo(formRef.current, 
        { height: 0, opacity: 0 }, 
        { height: 'auto', opacity: 1, duration: 0.8, ease: 'power4.out' }
      );
    } else {
      gsap.to(formRef.current, { height: 0, opacity: 0, duration: 0.5, ease: 'power4.in' });
    }
  }, [isPhysical]);

  useEffect(() => {
    const showNudge = amount >= PHYSICAL_THRESHOLD - 5 && amount < PHYSICAL_THRESHOLD;
    gsap.to(nudgeRef.current, { 
      opacity: showNudge ? 1 : 0, 
      y: showNudge ? 0 : 15,
      display: showNudge ? 'block' : 'none',
      duration: 0.4 
    });
  }, [amount]);

  const tiers = [
    { label: 'Supporter', value: 15, desc: 'Complete Digital Archive (PDF/EPUB)', icon: 'spa' },
    { label: 'Guardian', value: 45, desc: 'Physical Edition + Audio Meditations', icon: 'filter_vintage', recommended: true },
    { label: 'Patron', value: 95, desc: 'Special Award Edition + Mentoring Access', icon: 'auto_awesome' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="text-center mb-20 reveal-section">
        <span className="text-brand-gold text-xs font-black tracking-[0.5em] uppercase mb-6 block">The Exchange of Abundance</span>
        <h2 className="text-6xl font-regal font-black mb-8 text-white italic drop-shadow-2xl">Pay What Your Heart Desires</h2>
        <p className="text-white text-xl max-w-3xl mx-auto tracking-wide font-light opacity-100">Support the mission of global awakening. Your contribution allows this wisdom to reach seekers worldwide.</p>
      </div>

      <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 rounded-[4rem] border-2 border-white/20 mb-16 reveal-section relative shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div ref={nudgeRef} className="absolute -top-14 left-1/2 -translate-x-1/2 bg-brand-magenta text-white text-[11px] font-black uppercase py-3 px-8 rounded-full shadow-2xl border-2 border-white/30 whitespace-nowrap hidden opacity-0 z-20">
          Add just ${PHYSICAL_THRESHOLD - amount} more to unlock the Physical Book!
        </div>

        <div className="relative pt-12 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-10">
            <div className="text-center md:text-left">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-4 font-black">Your Divine Gift</p>
              <h4 className="text-9xl font-regal font-black text-brand-gold drop-shadow-2xl">${amount}</h4>
            </div>
            <div className="text-center md:text-right bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-3 font-black">Archive Status</p>
              <p className={`text-2xl font-regal italic font-black ${isPhysical ? 'text-brand-gold' : 'text-white'}`}>
                {isPhysical ? 'Physical + Digital' : 'Digital Archive Only'}
              </p>
            </div>
          </div>

          <div className="relative h-4 bg-white/10 rounded-full flex items-center">
            <input 
              type="range" 
              min="5" 
              max="250" 
              step="1"
              value={amount}
              onChange={(e) => updateAmount(parseInt(e.target.value))}
              className="w-full bg-transparent appearance-none cursor-pointer z-10"
            />
            <div className="absolute left-0 h-full bg-brand-gold rounded-full" style={{ width: `${(amount/250)*100}%` }}></div>
          </div>
          
          <div className="flex justify-between mt-10 text-[9px] lg:text-[11px] font-black text-white uppercase tracking-[0.2em] lg:tracking-[0.4em]">
            <span className="opacity-60 text-left w-1/3">Supporter</span>
            <span className={`text-center w-1/3 transition-transform ${isPhysical ? 'text-brand-gold scale-110' : 'opacity-40'}`}>
              <span className="block lg:inline">Physical</span> <span className="block lg:inline">Bound</span>
            </span>
            <span className="opacity-60 text-right w-1/3">Patron</span>
          </div>
        </div>

        <div ref={formRef} className="overflow-hidden">
          <div className="pt-12 space-y-10 border-t border-white/20 mt-12 text-left">
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-brand-gold text-3xl">local_shipping</span>
               <h5 className="font-regal text-3xl text-white font-black italic">Dispatch Details</h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Full Name</label>
                 <input type="text" placeholder="Your Name" className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Phone</label>
                 <input type="text" placeholder="+1 (555) 000-0000" className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" />
              </div>
              <div className="md:col-span-2 space-y-3">
                 <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Shipping Address</label>
                 <input type="text" placeholder="123 Sovereign Street, Alignment City" className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" />
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onComplete}
          className="w-full mt-16 py-8 bg-brand-gold text-brand-purple rounded-[2rem] font-black text-sm tracking-[0.4em] uppercase gold-glow hover:bg-white hover:scale-[1.02] transition-all shadow-2xl"
        >
          {isPhysical ? 'Secure Physical Copy' : 'Get Digital Archive'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal-section">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            onClick={() => updateAmount(tier.value)}
            className={`glass-card p-12 rounded-[3rem] transition-all duration-500 flex flex-col gap-8 cursor-pointer group relative overflow-hidden border-2 ${tier.recommended ? 'border-brand-gold bg-brand-gold/10 gold-glow scale-105' : 'border-white/10 hover:border-brand-gold/50'}`}
          >
            {tier.recommended && <div className="absolute top-0 right-0 bg-brand-gold text-brand-purple px-8 py-3 text-[11px] font-black uppercase tracking-widest rounded-bl-[2rem] shadow-xl">Elite Choice</div>}
            <div>
              <span className="material-symbols-outlined text-5xl text-brand-gold mb-6 block group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">{tier.icon}</span>
              <h3 className="font-regal text-3xl mb-3 text-white font-black">{tier.label}</h3>
              <p className="text-5xl font-regal text-brand-gold font-black">${tier.value}+</p>
            </div>
            <p className="text-white text-base tracking-wide leading-relaxed font-normal opacity-100">{tier.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationUI;