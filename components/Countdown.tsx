
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<any>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setIsLaunched(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-brand-obsidian py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-brand-gold font-bold tracking-widest text-xs uppercase mb-8">Current Countdown to Launch</h3>
        
        {isLaunched ? (
          <div className="text-brand-ivory font-serif text-5xl italic animate-pulse">The Archive is Live!</div>
        ) : (
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl w-full py-6 backdrop-blur-sm">
                  <span className="text-3xl md:text-5xl font-serif text-brand-gold font-black">{String(item.value).padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-brand-ivory/40 mt-3">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Countdown;
