'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    id: 'people',
    question: 'How many people will usually use the spa?',
    options: ['2–4 Person', '5 Person', '6 Person', '7+ Person'],
  },
  {
    id: 'loungers',
    question: 'Do you prefer loungers or all-seater models?',
    options: ['One Lounger', 'Dual Lounger', 'All-Seater (No Loungers)', 'No Preference'],
  },
  {
    id: 'power',
    question: 'What is your preferred electrical supply?',
    options: ['Plug & Play (13A)', 'Hardwired (32A)', 'Not Sure'],
  },
  {
    id: 'budget',
    question: 'What is your approximate budget band?',
    options: ['Under £7,000', '£7,000–£10,000', '£10,000–£15,000', '£15,000+'],
  },
  {
    id: 'use',
    question: 'What is the primary goal for your hot tub?',
    options: ['Relaxation', 'Sports Recovery', 'Social Entertaining', 'Hydrotherapy', 'Contrast Therapy'],
  },
];

export default function HotTubMatchPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const handleOption = (option: string) => {
    const step = steps[currentStep];
    if (!step) return;
    setAnswers({ ...answers, [step.id]: option });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const step = steps[currentStep];
  if (!step) return null;

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-32 pb-16">
      <div className="container-lumerra max-w-2xl">
        {!isFinished ? (
          <div className="space-y-16">
            <div className="flex items-center justify-between">
               <p className="text-caption">Step {currentStep + 1} of {steps.length}</p>
               <div className="flex gap-2">
                 {steps.map((_, i) => (
                   <div key={i} className={`h-1 w-8 transition-colors ${i <= currentStep ? 'bg-[var(--color-bronze)]' : 'bg-[var(--color-ink-rule)]'}`} />
                 ))}
               </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <h1 className="display-56 text-[var(--color-ink)] leading-tight">
                  {step.question}
                </h1>

                <div className="grid gap-4">
                  {step.options.map((option) => (
                    <button 
                      key={option}
                      onClick={() => handleOption(option)}
                      className="group flex items-center justify-between p-8 border border-[var(--color-ink-rule)] bg-white hover:border-[var(--color-bronze)] hover:bg-[var(--color-bronze-wash)]/10 transition-all text-left"
                    >
                      <span className="text-xl">{option}</span>
                      <ArrowRight size={20} className="text-[var(--color-ink-quiet)] group-hover:text-[var(--color-bronze)] transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)] hover:text-[var(--color-ink)]"
              >
                ← Back
              </button>
            )}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-12 py-24"
          >
            <div className="flex justify-center">
               <CheckCircle2 size={64} className="text-[var(--color-success)]" />
            </div>
            <div>
              <h1 className="display-48 mb-6">Match Complete.</h1>
              <p className="text-lg text-[var(--color-ink-muted)] leading-relaxed">
                We have found three models that perfectly align with your lifestyle. 
                Enter your email to receive your personalised wellness report.
              </p>
            </div>

            <form className="max-w-md mx-auto space-y-6">
               <input 
                 required 
                 type="email" 
                 placeholder="Your email address" 
                 className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-4 text-center text-xl focus:border-[var(--color-bronze)] outline-none" 
               />
               <button className="btn btn-primary w-full py-5 text-sm uppercase tracking-widest">
                 View Your Recommendations
               </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
