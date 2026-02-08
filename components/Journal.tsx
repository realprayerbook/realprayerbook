import React, { useState, useEffect } from 'react';
import { saveJournalEntry, getTodayJournalEntry, JournalEntry } from '../utils/db';

interface JournalProps {
  onBack: () => void;
  onCommunityClick: () => void;
  onHomeClick: () => void;
}

const Journal: React.FC<JournalProps> = ({ onBack, onCommunityClick, onHomeClick }) => {
  const [content, setContent] = useState('');
  const [frequency, setFrequency] = useState(75);
  const [tags, setTags] = useState<string[]>(['Gratitude']);
  const [isSaving, setIsSaving] = useState(false);
  const [isPromptEnabled, setIsPromptEnabled] = useState(true);

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const entry = await getTodayJournalEntry(dateStr);
        if (entry) {
          setContent(entry.content);
          setFrequency(entry.frequency);
          setTags(entry.tags || []);
        } else {
          setContent('');
          setFrequency(75);
          setTags(['Gratitude']);
        }
      } catch (err) {
        console.error('Error loading entry:', err);
      }
    };
    loadEntry();
  }, [selectedDate]);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    try {
      await saveJournalEntry({
        content,
        frequency,
        prompt: isPromptEnabled ? "How did today's Earth School lesson on 'Expansion' shift your perspective?" : undefined,
        tags,
        created_at: selectedDate.toISOString() // Use selectedDate for saving
      });
      alert('Your wisdom has been archived for the journey ahead.');
    } catch (err) {
      alert('Error saving to the archive. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const displayDate = selectedDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="bg-[#221015] min-h-screen text-white font-newsreader flex flex-col">
      <header className="flex items-center justify-between border-b border-[#48232c] px-10 py-4 bg-[#221015] sticky top-0 z-50">
        <div className="flex items-center gap-4 text-white">
          <div className="size-8 text-[#f1275a] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">Real Prayer</h2>
        </div>
        <div className="flex gap-8 items-center">
          <nav className="flex items-center gap-4 lg:gap-9 overflow-x-auto no-scrollbar py-2">
            <button onClick={onHomeClick} className="text-white/70 hover:text-white text-xs lg:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap">Home</button>
            <button onClick={onBack} className="text-white/70 hover:text-white text-xs lg:text-sm font-medium transition-colors whitespace-nowrap">Dashboard</button>
            <span className="text-white border-b-2 border-[#f1275a] text-xs lg:text-sm font-medium whitespace-nowrap">Journals</span>
            <button onClick={onCommunityClick} className="text-white/70 hover:text-white text-xs lg:text-sm font-medium transition-colors whitespace-nowrap">Community</button>
          </nav>
          <div className="flex gap-2">
            <button 
              onClick={() => alert('Notifications coming soon to your archive.')}
              className="flex items-center justify-center rounded-xl h-8 w-8 lg:h-10 lg:w-10 bg-[#48232c] text-white hover:bg-[#63323d] transition-colors"
            >
              <span className="material-symbols-outlined text-sm lg:text-base">notifications</span>
            </button>
            <button 
              onClick={() => alert('Settings coming soon.')}
              className="flex items-center justify-center rounded-xl h-8 w-8 lg:h-10 lg:w-10 bg-[#48232c] text-white hover:bg-[#63323d] transition-colors"
            >
              <span className="material-symbols-outlined text-sm lg:text-base">settings</span>
            </button>
          </div>
          <button 
            onClick={() => alert('Profile management coming soon.')}
            className="size-8 lg:size-10 rounded-full border border-[#f1275a]/30 overflow-hidden bg-brand-obsidian flex items-center justify-center hover:border-[#f1275a] transition-colors"
          >
             <span className="material-symbols-outlined text-white/40 text-sm lg:text-base">person</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#221015] to-[#30161d] p-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Breadcrumbs & Date Display */}
          <div className="flex items-center justify-between text-[#ca919f] text-sm font-medium">
            <div className="flex items-center gap-2">
                <button onClick={onBack} className="hover:text-white transition-colors">Journal</button>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-white">New Entry</span>
            </div>
            
            <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    <span className="italic">{displayDate}</span>
                </div>
                <input 
                    type="date"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
            </div>
          </div>

          {/* Prompt Panel */}
          <div className="border border-[#d4af37]/30 rounded-xl bg-[#221015]/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-[#d4af37]/5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d4af37] text-lg">lightbulb</span>
                <p className="text-white text-base font-bold leading-tight">Prompt of the Day</p>
              </div>
              <p className="text-[#ca919f] text-base font-normal italic">"How did today's Earth School lesson on 'Expansion' shift your perspective?"</p>
            </div>
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-[#48232c] p-0.5 transition-colors"
                style={{ backgroundColor: isPromptEnabled ? '#f1275a' : '#48232c' }}>
              <input 
                checked={isPromptEnabled} 
                onChange={() => setIsPromptEnabled(!isPromptEnabled)}
                className="hidden" 
                type="checkbox"
              />
              <div className={`h-full w-[27px] rounded-full bg-white shadow-md transform transition-transform ${isPromptEnabled ? 'translate-x-full' : 'translate-x-0'}`}></div>
            </label>
          </div>

          {/* Workspace */}
          <div className="border border-[#d4af37]/30 rounded-xl bg-[#2a141a]/60 backdrop-blur-sm p-10 flex flex-col gap-10 shadow-2xl">
            <div className="text-center">
              <h1 className="text-white tracking-tight text-3xl font-bold mb-2">Reflections: The Abundance Frequency</h1>
              <div className="h-px w-24 bg-[#d4af37] mx-auto opacity-50"></div>
            </div>

            {/* Slider */}
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full px-4">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-[#ca919f]">
                <span>Dense</span>
                <span className="text-[#d4af37]">Current State</span>
                <span>Coherent</span>
              </div>
              <input 
                className="frequency-slider w-full" 
                max="100" min="0" 
                type="range" 
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
              />
              <p className="text-center text-sm text-[#d4af37]/80 italic font-medium">Resonating at {frequency}Hz - {frequency > 50 ? 'Expanding' : 'Compressing'}</p>
            </div>

            <textarea 
              className="w-full min-h-[400px] bg-transparent border-none focus:ring-0 text-2xl leading-relaxed text-white/90 placeholder:text-white/20 italic font-newsreader resize-none"
              placeholder="Quiet your mind and record your insights here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              {['Gratitude', 'Release', 'Expansion', 'Clarity'].map(tag => (
                <span 
                  key={tag} 
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-1.5 rounded-full border transition-all font-medium uppercase tracking-widest text-sm cursor-pointer
                    ${tags.includes(tag) 
                        ? 'border-[#d4af37] bg-[#d4af37]/20 text-[#d4af37]' 
                        : 'border-[#d4af37]/30 bg-[#d4af37]/5 text-[#ca919f] hover:bg-[#d4af37]/10'}`}
                >
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1.5 rounded-full border border-dashed border-white/30 text-white/50 text-sm hover:border-white/50 hover:text-white flex items-center gap-1">+ Add Tag</button>
            </div>
          </div>

          <div className="flex justify-center pb-12">
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="group relative flex items-center gap-3 px-10 py-4 bg-[#f1275a] rounded-full text-white font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(241,39,90,0.4)] disabled:opacity-50"
            >
              <span className="material-symbols-outlined">
                {isSaving ? 'sync' : 'auto_stories'}
              </span>
              <span>{isSaving ? 'Archiving...' : 'Save to Archive'}</span>
              <div className="absolute -inset-1 bg-[#f1275a] blur opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;