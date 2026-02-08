import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const questions = [
  {
    id: 1,
    text: "When a crisis hits (financial, health, or relational), what is your immediate internal reaction?",
    options: [
      { text: "Why does this keep happening to me? What did I do wrong?", type: 'A' },
      { text: "I need to fix this immediately before it destroys everything.", type: 'B' },
      { text: "This is a test. What is this preparing me for?", type: 'C' }
    ]
  },
  {
    id: 2,
    text: "How would you describe your physical state when you pray?",
    options: [
      { text: "I feel tense, anxious, or like I am crying out for help.", type: 'A' },
      { text: "I feel numb or exhausted, hoping someone else will take the burden.", type: 'B' },
      { text: "I feel regulated, calm, and my breath is slow and deep.", type: 'C' }
    ]
  },
  {
    id: 3,
    text: "Which phrase best matches the language you use in prayer?",
    options: [
      { text: "\"Please God, I really need this to happen...\"", type: 'A' },
      { text: "\"If it be your will, maybe this could change...\"", type: 'B' },
      { text: "\"Thank you that this is already done. Show me the steps.\"", type: 'C' }
    ]
  },
  {
    id: 4,
    text: "How do you view the outcome you are praying for?",
    options: [
      { text: "It is urgent. I am obsessed with when and how it will happen.", type: 'A' },
      { text: "I am hopeful, but deep down I doubt I deserve it.", type: 'B' },
      { text: "I have \"lowered importance.\" I know it is done, so I don't need to stress about the \"how.\"", type: 'C' }
    ]
  },
  {
    id: 5,
    text: "Where do you believe the power to change your life comes from?",
    options: [
      { text: "From an external God who I hope will choose to save me.", type: 'A' },
      { text: "From spiritual gurus, card readers, or healers who know more than I do.", type: 'B' },
      { text: "From direct communion with Source, where I am a co-creator.", type: 'C' }
    ]
  }
];

const Quiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentQ(0);
      setAnswers([]);
      setShowResult(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (questionRef.current) {
      gsap.fromTo(questionRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentQ, showResult]);

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    if (newAnswers.length < questions.length) {
      gsap.to(questionRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => setCurrentQ(currentQ + 1)
      });
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const cCount = answers.filter(a => a === 'C').length;
    if (cCount >= 3) {
      return {
        title: "The Aligned Commander",
        type: "Coherence / Authority",
        desc: "You have mastered the rules of \"Earth School.\" You understand that prayer is not about changing God’s mind, but about \"internal ordering\" that organizes reality. You do not beg; you instruct.",
        action: "You are ready for high-level creation. Use Prayer 12: I Command Alignment to lock in your authority."
      };
    } else {
      return {
        title: "The Pleader",
        type: "Survival / Fear",
        desc: "You are treating prayer as a plea for help. The book explains that \"begging is not humility; begging is fragmentation\". When you pray from fear, you amplify the signal of \"lack.\"",
        action: "Move from asking to aligning. Start with Prayer 21: A Prayer of Knowing to release urgency and regulate your nervous system."
      };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-brand-obsidian/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div ref={containerRef} className="relative w-full max-w-2xl bg-[#2E1A47] border border-white/10 rounded-3xl p-6 lg:p-12 shadow-2xl overflow-y-auto max-h-[85vh] flex flex-col">
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        {!showResult ? (
          <div ref={questionRef} className="text-center">
            <span className="text-brand-gold text-xs font-black uppercase tracking-[0.3em] mb-4 block">Question {currentQ + 1} of {questions.length}</span>
            <h3 className="text-2xl lg:text-3xl text-white font-regal font-bold mb-10 leading-relaxed">
              {questions[currentQ].text}
            </h3>
            <div className="space-y-4">
              {questions[currentQ].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(opt.type)}
                  className="w-full text-left p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold hover:bg-brand-gold/10 transition-all group flex items-start gap-4"
                >
                  <div className="size-6 rounded-full border border-white/30 group-hover:border-brand-gold shrink-0 mt-0.5 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-brand-gold scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                  <span className="text-white/80 group-hover:text-white text-lg font-medium">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div ref={questionRef} className="text-center animate-in fade-in zoom-in duration-500">
            <div className="size-24 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              <span className="material-symbols-outlined text-brand-purple text-5xl">
                {answers.filter(a => a === 'C').length >= 3 ? 'auto_awesome' : 'psychology_alt'}
              </span>
            </div>
            
            <p className="text-brand-gold text-sm font-black uppercase tracking-[0.3em] mb-2">Frequency Audit Result</p>
            <h3 className="text-4xl text-white font-regal font-black mb-2">{getResult().title}</h3>
            <p className="text-white/50 text-sm uppercase tracking-widest font-bold mb-8">Frequency: {getResult().type}</p>
            
            <p className="text-white text-xl leading-relaxed mb-8 max-w-lg mx-auto">
              {getResult().desc}
            </p>
            
            <div className="bg-white/5 border border-brand-gold/30 p-6 rounded-2xl mb-8">
              <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-2">Recommended Action</h4>
              <p className="text-white italic">"{getResult().action}"</p>
            </div>

            <button onClick={onClose} className="px-8 py-3 bg-brand-gold text-brand-purple font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
