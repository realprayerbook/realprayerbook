import React from 'react';

interface JournalProps {
  onBack: () => void;
}

const Journal: React.FC<JournalProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-obsidian p-6">
      <button onClick={onBack} className="text-white mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined">arrow_back</span> Back
      </button>
      <h1 className="text-white text-3xl font-regal">Frequency Journal</h1>
      <p className="text-white/50">Coming Soon...</p>
    </div>
  );
};

export default Journal;
