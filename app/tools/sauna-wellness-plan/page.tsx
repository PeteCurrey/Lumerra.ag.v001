'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Flame, Sparkles, Wind, Moon, Trophy, CheckCircle2 } from 'lucide-react';

const goals = [
  { id: 'sleep', name: 'Better Sleep', icon: Moon, description: 'Protocol focused on thermal regulation for deep restoration.' },
  { id: 'recovery', name: 'Athletic Recovery', icon: Trophy, description: 'Vasodilation and blood flow optimisation for muscle repair.' },
  { id: 'stress', name: 'Stress Relief', icon: Wind, description: 'Cortisol reduction and parasympathetic activation.' },
  { id: 'detox', name: 'Detox & Skin', icon: Sparkles, description: 'Intense perspiration for clarity and radiance.' },
];

export default function SaunaWellnessPage() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<any>({
    goal: null,
    level: 'intermediate',
    type: 'traditional',
  });
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-32 pb-24">
      <div className="container-lumerra max-w-4xl">
        <div className="mb-20 text-center">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Personalised Protocol</p>
          <h1 className="display-64 italic">Hekla Wellness Plan.</h1>
        </div>

        {!complete ? (
          <div className="space-y-24">
            {/* Step 1: Goal */}
            <section>
              <h2 className="text-xs uppercase tracking-widest font-medium mb-12 text-center">Step 01. Select your primary focus</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelection({...selection, goal: g.id})}
                    className={`p-8 border text-center transition-all flex flex-col items-center gap-6 ${selection.goal === g.id ? 'border-[var(--color-ink)] bg-white shadow-xl scale-105' : 'border-[var(--color-ink-rule)] opacity-60 hover:opacity-100'}`}
                  >
                    <g.icon size={32} strokeWidth={1} className={selection.goal === g.id ? 'text-[var(--color-bronze)]' : ''} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2">{g.name}</p>
                      <p className="text-[10px] leading-relaxed text-[var(--color-ink-muted)]">{g.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 2: Experience */}
            <AnimatePresence>
              {selection.goal && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-24 border-t border-[var(--color-ink-rule)]"
                >
                  <h2 className="text-xs uppercase tracking-widest font-medium mb-12 text-center">Step 02. Your Experience Level</h2>
                  <div className="flex justify-center gap-4">
                    {['Beginner', 'Intermediate', 'Active Athlete'].map(l => (
                      <button
                        key={l}
                        onClick={() => setSelection({...selection, level: l.toLowerCase()})}
                        className={`px-12 py-4 border text-[10px] uppercase tracking-[0.2em] transition-all ${selection.level === l.toLowerCase() ? 'bg-[var(--color-ink)] text-white' : 'border-[var(--color-ink-rule)] hover:border-[var(--color-ink)]'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Step 3: CTA */}
            {selection.goal && (
              <div className="flex justify-center pt-24">
                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="btn btn-primary py-6 px-16 text-sm uppercase tracking-widest gap-4"
                >
                  {loading ? 'Curating your protocol...' : 'Generate my 4-week plan'}
                  {!loading && <Flame size={20} />}
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 border border-[var(--color-ink-rule)] text-center max-w-2xl mx-auto"
          >
             <div className="w-20 h-20 bg-[var(--color-paper-sunken)] rounded-full flex items-center justify-center mx-auto mb-10">
                <CheckCircle2 size={32} className="text-[var(--color-bronze)]" />
             </div>
             <h2 className="display-48 mb-6">Plan Ready.</h2>
             <p className="text-lg text-[var(--color-ink-soft)] italic mb-12 leading-relaxed">
               Your personalised 4-week {selection.goal} protocol has been generated. We&apos;ve sent a beautifully formatted PDF to your inbox, containing daily session durations, temperature guides, and recovery rituals.
             </p>
             
             <div className="space-y-6">
                <button className="btn btn-primary w-full py-5 text-xs uppercase tracking-[0.2em]">
                  Download Protocol (PDF)
                </button>
                <button onClick={() => setComplete(false)} className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
                  Adjust Goals
                </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
