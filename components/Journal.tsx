import React from 'react';

interface JournalProps {
  onBack: () => void;
}

const Journal: React.FC<JournalProps> = ({ onBack }) => {
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
          <div className="hidden lg:flex gap-9 text-white/70 text-sm font-medium">
            <button onClick={onBack} className="hover:text-white transition-colors">Dashboard</button>
            <span className="text-white border-b-2 border-[#f1275a]">Journals</span>
            <a className="hover:text-white transition-colors" href="#">Practices</a>
            <a className="hover:text-white transition-colors" href="#">Community</a>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#48232c] text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center justify-center rounded-xl h-10 w-10 bg-[#48232c] text-white">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <div className="size-10 rounded-full border border-[#f1275a]/30 overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi1FSV7GmVwY-5W3JDb-RGGZ8iwIjP-M1MIM5Ifss571VNISB6oo0tTAqPuUn58trzesMAHxlbOjbSWxcJmxBF-Cy1Uzc_AKFIGiVr-WAVI0TVltwY7sOUDBpbmoQjYRNu6DeGX9eQIPfiOg1nk4TTjQ0ml8HnzHJspZqCQcItHHbcKbn2ipMHfxeHtmfLjK1VI-wjvujz3CSRT5E1FaFZrRhh_TMRviFRKjpBedkx0vVwyI_cGKrl-B0TM0VSUqumEQl4ib7YPP8" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#221015] to-[#30161d] p-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[#ca919f] text-sm font-medium">
            <button onClick={onBack} className="hover:text-white transition-colors">Journal</button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-white">New Entry</span>
            <span className="ml-auto italic opacity-60">October 24, 2025</span>
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
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-[#48232c] p-0.5 has-[:checked]:bg-[#f1275a] transition-colors">
              <div className="h-full w-[27px] rounded-full bg-white shadow-md transform transition-transform translate-x-0 peer-checked:translate-x-full"></div>
              <input defaultChecked className="hidden peer" type="checkbox"/>
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
              <input className="frequency-slider w-full" max="100" min="0" type="range" defaultValue="75"/>
              <p className="text-center text-sm text-[#d4af37]/80 italic font-medium">Resonating at 75Hz - Expanding</p>
            </div>

            <textarea 
              className="w-full min-h-[400px] bg-transparent border-none focus:ring-0 text-2xl leading-relaxed text-white/90 placeholder:text-white/20 italic font-newsreader resize-none"
              placeholder="Quiet your mind and record your insights here..."
            ></textarea>

            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
              {['Gratitude', 'Release', 'Expansion', 'Clarity'].map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37] text-sm cursor-pointer hover:bg-[#d4af37]/20 transition-all font-medium uppercase tracking-widest">{tag}</span>
              ))}
              <button className="px-3 py-1.5 rounded-full border border-dashed border-white/30 text-white/50 text-sm hover:border-white/50 hover:text-white flex items-center gap-1">+ Add Tag</button>
            </div>
          </div>

          <div className="flex justify-center pb-12">
            <button className="group relative flex items-center gap-3 px-10 py-4 bg-[#f1275a] rounded-full text-white font-bold text-lg transition-all hover:scale-105 shadow-[0_0_30px_rgba(241,39,90,0.4)]">
              <span className="material-symbols-outlined">auto_stories</span>
              <span>Save to Archive</span>
              <div className="absolute -inset-1 bg-[#f1275a] blur opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;