import React, { useState } from 'react';

interface DonationUIProps {
  onComplete: () => void;
}

const DonationUI: React.FC<DonationUIProps> = ({ onComplete }) => {
  const [mode, setMode] = useState<'donate' | 'buy'>('buy'); // Toggle between 'buy' and 'donate'
  const [amount, setAmount] = useState<number>(33);
  const [isPhysical, setIsPhysical] = useState(true);
  
  // Shipping Mock State
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    country: 'US'
  });

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate actual Stripe/Payment Gateway
    console.log('Processing payment:', { mode, amount, isPhysical, shippingInfo });
    
    // Simulate API call
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-magenta via-brand-gold to-brand-indigo"></div>
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-regal text-white mb-4">Secure Your Copy</h2>
          <p className="text-brand-ivory/60">Choose your contribution level to receive the frequency archive.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => { setMode('buy'); setAmount(33); }}
            className={`px-8 py-3 rounded-full border transition-all ${mode === 'buy' ? 'bg-brand-gold text-brand-obsidian border-brand-gold' : 'border-white/20 text-white/50'}`}
          >
            Purchase
          </button>
          <button 
            onClick={() => { setMode('donate'); setAmount(50); }}
            className={`px-8 py-3 rounded-full border transition-all ${mode === 'donate' ? 'bg-brand-gold text-brand-obsidian border-brand-gold' : 'border-white/20 text-white/50'}`}
          >
            Donate what you want
          </button>
        </div>

        <form onSubmit={handlePayment} className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Product & Amount */}
          <div className="space-y-8">
            <div className="bg-brand-obsidian/50 p-6 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Real Prayer Book</h3>
                  <p className="text-sm text-brand-gold">The Impact Edition</p>
                </div>
                <div className="text-right">
                  {mode === 'buy' ? (
                    <span className="text-2xl font-bold text-white">$33.00</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-white">$</span>
                      <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-24 bg-transparent border-b border-brand-gold text-white text-xl focus:outline-none text-right"
                        min="1"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isPhysical ? 'border-brand-gold' : 'border-white/30'}`}>
                    {isPhysical && <div className="w-3 h-3 bg-brand-gold rounded-full"></div>}
                  </div>
                  <input type="checkbox" checked={isPhysical} onChange={() => setIsPhysical(!isPhysical)} className="hidden"/>
                  <span className="text-brand-ivory group-hover:text-white transition-colors">Physical Hardcopy (+ Digital)</span>
                </label>
                
                {mode === 'donate' && (
                  <p className="text-xs text-brand-ivory/40 ml-8">Minimum donation for physical copy: $33 + Shipping</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-brand-ivory/50 px-4">
               <span>Subtotal</span>
               <span className="text-white font-mono">${amount.toFixed(2)}</span>
            </div>
            {isPhysical && (
              <div className="flex justify-between items-center text-sm text-brand-ivory/50 px-4 border-b border-white/10 pb-4">
                 <span>Estimated Shipping</span>
                 <span className="text-white font-mono">$7.95</span>
              </div>
            )}
             <div className="flex justify-between items-center text-xl text-white font-bold px-4 pt-2">
               <span>Total</span>
               <span className="text-brand-gold">${(amount + (isPhysical ? 7.95 : 0)).toFixed(2)}</span>
            </div>
          </div>

          {/* Right Column: Shipping Details */}
          <div className="space-y-6">
            {isPhysical ? (
              <>
                <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Shipping Details</h3>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Address Line 1"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="City"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Zip Code"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
             <div className="h-full flex items-center justify-center p-8 bg-brand-gold/5 rounded-2xl border border-brand-gold/20 border-dashed">
                <div className="text-center space-y-2">
                  <span className="material-symbols-outlined text-4xl text-brand-gold">download</span>
                  <p className="text-brand-gold font-bold">Digital Download Only</p>
                  <p className="text-xs text-brand-ivory/50">You'll receive the PDF immediately via email.</p>
                </div>
             </div>
            )}

            <button type="submit" className="w-full py-4 mt-4 bg-white text-brand-obsidian font-black uppercase tracking-widest rounded-xl hover:bg-brand-gold transition-colors shadow-lg">
              {mode === 'donate' ? 'Complete Donation' : 'Complete Purchase'}
            </button>
            
            <p className="text-center text-xs text-white/20 mt-4 flex items-center justify-center gap-2">
               <span className="material-symbols-outlined text-xs">lock</span> Secure 256-bit Encyclopedia Encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationUI;
