import React, { useMemo } from 'react';

interface WeeklyTrackerProps {
  visits: string[]; // Array of ISO date strings 'YYYY-MM-DD'
}

const WeeklyTracker: React.FC<WeeklyTrackerProps> = ({ visits }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const currentDayIndex = today.getDay();

  // Get the start of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayIndex);

  const weekDays = useMemo(() => {
    return days.map((name, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      const dateString = date.toISOString().split('T')[0];
      const isVisited = visits.includes(dateString);
      const isToday = index === currentDayIndex;

      return {
        name,
        isVisited,
        isToday,
      };
    });
  }, [visits, currentDayIndex, startOfWeek]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 animate-in fade-in slide-in-from-top duration-1000">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-brand-gold text-[10px] font-black uppercase tracking-[0.4em]">Weekly Alignment Tracker</h3>
        <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Frequency Tracking Active</span>
        </div>
      </div>

      <div className="glass-card bg-brand-obsidian/40 border border-white/10 rounded-3xl p-4 lg:p-8 flex items-center justify-between gap-1 lg:gap-2">
        {weekDays.map((day, idx) => (
          <div key={day.name} className="flex flex-col items-center gap-4 flex-1">
            <span className={`text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-colors ${day.isToday ? 'text-brand-gold' : 'text-white/30'}`}>
              {day.name}
            </span>
            
            <div className={`relative size-10 lg:size-14 rounded-full flex items-center justify-center transition-all duration-500 border
              ${day.isVisited 
                ? 'bg-brand-gold border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                : day.isToday
                    ? 'border-brand-gold/50 bg-white/5'
                    : 'border-white/10 bg-white/5'
              }`}>
              
              {day.isVisited ? (
                <span className="material-symbols-outlined text-brand-purple font-black transition-all scale-90 lg:scale-110">done_all</span>
              ) : day.isToday ? (
                <span className="size-1.5 lg:size-2 rounded-full bg-brand-gold/50"></span>
              ) : null}

              {day.isToday && !day.isVisited && (
                <div className="absolute inset-0 rounded-full border border-brand-gold animate-ping opacity-20"></div>
              )}
            </div>
            
            {day.isToday && (
                <span className="text-[7px] lg:text-[9px] font-bold text-brand-gold uppercase tracking-tighter">Current Day</span>
            )}
          </div>
        ))}
      </div>
      
      <p className="mt-4 text-center text-white/40 text-[10px] italic">
        "Return daily to maintain your frequency. Consistency is the key to expansion."
      </p>
    </div>
  );
};

export default WeeklyTracker;
