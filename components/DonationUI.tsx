import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { saveShippingDetails } from '../utils/db'; // Keeping this if we want to save locally first, but checkout does it too.

interface DonationUIProps {
  onComplete: () => void;
}

const PHYSICAL_THRESHOLD = 24;
const MIN_AMOUNT = 5;
const MAX_AMOUNT = 200;

const DonationUI: React.FC<DonationUIProps> = ({ onComplete }) => {
  const [amount, setAmount] = useState(45);
  const [isPhysical, setIsPhysical] = useState(true);
  
  // Form State
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<HTMLDivElement>(null);

  const updateAmount = (val: number) => {
    setAmount(val);
    const shouldBePhysical = val >= PHYSICAL_THRESHOLD;
    if (shouldBePhysical !== isPhysical) {
      setIsPhysical(shouldBePhysical);
    }
  };

  const handleSubmit = async () => {
    if (isPhysical) {
        if (!userName || !userPhone || !userAddress) {
            alert('Please complete all shipping details for physical delivery.');
            return;
        }
    }

    setIsSubmitting(true);
    try {
        // 1. First save to Supabase to capture the "intent" and shipping details
        // This ensures we have the record even if they drop off at Stripe
        await saveShippingDetails({
            user_name: userName,
            user_phone: userPhone,
            user_address: userAddress,
            friend_name: friendName,
            friend_email: friendEmail,
            amount
        });

        // 2. Call our API to create a Stripe Checkout Session
        const response = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount, // Send the slider amount
                email: friendEmail || undefined, // Optional: Pre-fill email
                isPhysical
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText || errorText}`);
        }

        const data = await response.json();

        if (data.url) {
            // Redirect to Stripe
            window.location.href = data.url;
        } else {
            console.error('Stripe error:', data);
            alert('Could not initiate payment. Please try again.');
            setIsSubmitting(false);
        }

    } catch (error: any) {
        console.error(error);
        alert(`Error: ${error.message || 'There was an issue processing your request.'}`);
        setIsSubmitting(false);
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
    { label: 'Supporter', value: 5, desc: 'Complete Digital Archive (PDF)', icon: 'spa' },
    { label: 'Guardian', value: 24, desc: 'Physical Book + Membership + Friend Gift', icon: 'filter_vintage', recommended: true },
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
          Add just €{PHYSICAL_THRESHOLD - amount} more to unlock the Physical Book!
        </div>

        <div className="relative pt-12 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-10">
            <div className="text-center md:text-left">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-4 font-black">Your Divine Gift</p>
              <h4 className="text-9xl font-regal font-black text-brand-gold drop-shadow-2xl">€{amount}</h4>
            </div>
            <div className="text-center md:text-right bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-3 font-black">Archive Status</p>
              <p className={`text-2xl font-regal italic font-black ${isPhysical ? 'text-brand-gold' : 'text-white'}`}>
                {isPhysical ? 'Physical + Membership + Gift' : 'Digital Archive Only'}
              </p>
              {isPhysical && (
                <div className="mt-2 flex flex-col items-end gap-1">
                  <div className="inline-flex items-center gap-2 text-brand-gold/80 text-[10px] font-bold uppercase tracking-widest border border-brand-gold/30 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    1 Month Free Membership
                  </div>
                  <div className="inline-flex items-center gap-2 text-brand-gold/80 text-[10px] font-bold uppercase tracking-widest border border-brand-gold/30 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm">card_giftcard</span>
                    Free Friend Download
                  </div>
                  <div className="mt-4 p-4 bg-brand-obsidian/50 rounded-2xl border border-white/5 text-left max-w-[280px]">
                    <p className="text-[10px] text-white/70 leading-relaxed italic">
                      After payment, you will instantly be able to access the member's special dashboard. However, you may cancel your monthly subscription at any time without penalty.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative h-4 bg-white/10 rounded-full flex items-center">
            <input 
              type="range" 
              min={MIN_AMOUNT} 
              max={MAX_AMOUNT} 
              step="1"
              value={amount}
              onChange={(e) => updateAmount(parseInt(e.target.value))}
              className="w-full bg-transparent appearance-none cursor-pointer z-10"
            />
            <div className="absolute left-0 h-full bg-brand-gold rounded-full" style={{ width: `${((amount - MIN_AMOUNT) / (MAX_AMOUNT - MIN_AMOUNT)) * 100}%` }}></div>
          </div>
          
          <div className="flex justify-between mt-10 text-[9px] md:text-[11px] font-black text-white uppercase tracking-normal lg:tracking-[0.4em]">
            <span className="opacity-60 text-left w-1/3">Supporter (€{MIN_AMOUNT})</span>
            <span className={`text-center w-1/3 transition-transform ${isPhysical ? 'text-brand-gold scale-110' : 'opacity-40'}`}>
              <span className="block md:inline">Physical</span> <span className="block md:inline">Bound</span>
            </span>
            <span className="opacity-60 text-right w-1/3">Patron (€{MAX_AMOUNT})</span>
          </div>
        </div>

        <div ref={formRef} className="overflow-hidden">
          <div className="pt-12 space-y-12 border-t border-white/20 mt-12 text-left">
            
            {/* User Shipping Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <span className="material-symbols-outlined text-brand-gold text-3xl">local_shipping</span>
                 <h5 className="font-regal text-2xl text-white font-black italic">Your Dispatch Details</h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Your Name</label>
                   <input 
                     type="text" 
                     placeholder="Your Name" 
                     value={userName} 
                     onChange={e => setUserName(e.target.value)}
                     className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" 
                   />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Your Phone</label>
                   <input 
                     type="text" 
                     placeholder="+1 (555) 000-0000" 
                     value={userPhone} 
                     onChange={e => setUserPhone(e.target.value)}
                     className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" 
                   />
                </div>
                <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Your Shipping Address</label>
                   <input 
                     type="text" 
                     placeholder="123 Sovereign Street, Alignment City" 
                     value={userAddress} 
                     onChange={e => setUserAddress(e.target.value)}
                     className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" 
                   />
                </div>
              </div>
            </div>

            {/* Friend / Gift Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="size-10 rounded-full bg-brand-gold flex items-center justify-center text-brand-purple">
                   <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                 </div>
                 <div>
                   <h5 className="font-regal text-2xl text-white font-black italic">Pay it Forward</h5>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Gift a Digital Copy to a Friend</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-6 rounded-[2rem] border border-white/5">
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Friend's Name</label>
                   <input 
                     type="text" 
                     placeholder="Friend's Name" 
                     value={friendName} 
                     onChange={e => setFriendName(e.target.value)}
                     className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" 
                   />
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-4">Friend's Email (For Download)</label>
                   <input 
                     type="email" 
                     placeholder="friend@example.com" 
                     value={friendEmail} 
                     onChange={e => setFriendEmail(e.target.value)}
                     className="w-full bg-white/10 border-2 border-white/10 rounded-[1.5rem] px-8 py-5 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20" 
                   />
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full mt-16 py-8 bg-brand-gold text-brand-purple rounded-[2rem] font-black text-sm tracking-[0.4em] uppercase gold-glow hover:bg-white hover:scale-[1.02] transition-all shadow-2xl disabled:opacity-50"
        >
          {isSubmitting ? 'Securing Transmission...' : (isPhysical ? 'Secure Both Copies + Membership' : 'Get Digital Archive')}
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
              <p className="text-5xl font-regal text-brand-gold font-black">€{tier.value}+</p>
            </div>
            <p className="text-white text-base tracking-wide leading-relaxed font-normal opacity-100">{tier.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationUI;