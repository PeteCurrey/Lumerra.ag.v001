'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calculator, Download, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 'basics', title: 'Financial Foundation', sub: 'The starting point of your investment.' },
  { id: 'household', title: 'Household Reach', sub: 'Who shares the hour of stillness?' },
  { id: 'spend', title: 'Current Wellness Spend', sub: 'What do you invest in today?' },
  { id: 'goals', title: 'Wellness Objectives', sub: 'The health ROI you seek.' },
];

export default function WellnessROIPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    productPrice: 7999,
    years: 7,
    adults: 2,
    children: 2,
    gymMonthly: 100,
    spaMonthly: 150,
    physioMonthly: 0,
    goals: [] as string[],
  });

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleCalculate = async () => {
    setLoading(true);
    // In a real app, this would call app/api/ai/roi-narrative
    // For now, we mock the result to demonstrate the flow
    setTimeout(() => {
      setResult({
        paybackYears: 3.2,
        costPerSession: 1.45,
        annualSavings: 1850,
        narrative: "Your Lumerra investment is not merely a purchase, but a reallocation of capital from fragmented wellness spends into a permanent home sanctuary. By centralising your hydrotherapy and recovery rituals, you eliminate the friction of travel and recurring membership costs. Citing recent sleep studies, the thermal regulation provided by your daily ritual will likely result in a 15% increase in deep sleep duration, contributing to a significant health ROI that extends far beyond the financial payback period of 3.2 years.",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-32 pb-24">
      <div className="container-lumerra max-w-3xl">
        <div className="mb-16">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Investment Analysis</p>
          <h1 className="display-64">Wellness ROI.</h1>
        </div>

        {!result ? (
          <div className="bg-white border border-[var(--color-ink-rule)] p-12 relative">
            {/* Step Progress */}
            <div className="flex gap-2 mb-12">
               {steps.map((_, i) => (
                 <div key={i} className={`h-1 flex-1 transition-all ${i <= step ? 'bg-[var(--color-bronze)]' : 'bg-[var(--color-paper-sunken)]'}`} />
               ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10">
                  <h2 className="text-2xl font-display mb-2">{steps[step]?.title}</h2>
                  <p className="text-sm text-[var(--color-ink-muted)] italic">{steps[step]?.sub}</p>
                </div>

                {step === 0 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-4">Estimated Product Cost (£)</label>
                      <input 
                        type="number" 
                        value={formData.productPrice}
                        onChange={(e) => setFormData({...formData, productPrice: Number(e.target.value)})}
                        className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-4 text-3xl font-light focus:border-[var(--color-bronze)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-4">Ownership Horizon (Years)</label>
                      <input 
                        type="range" min="1" max="15" 
                        value={formData.years}
                        onChange={(e) => setFormData({...formData, years: Number(e.target.value)})}
                        className="w-full accent-[var(--color-bronze)]"
                      />
                      <div className="flex justify-between mt-2 text-xs font-mono">
                         <span>1 Year</span>
                         <span className="text-[var(--color-bronze)] font-bold">{formData.years} Years</span>
                         <span>15 Years</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid grid-cols-2 gap-12">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-4">Adults</label>
                      <input 
                        type="number" 
                        value={formData.adults}
                        onChange={(e) => setFormData({...formData, adults: Number(e.target.value)})}
                        className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-4 text-3xl font-light focus:border-[var(--color-bronze)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-4">Children</label>
                      <input 
                        type="number" 
                        value={formData.children}
                        onChange={(e) => setFormData({...formData, children: Number(e.target.value)})}
                        className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-4 text-3xl font-light focus:border-[var(--color-bronze)] outline-none"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-12">
                      <div>
                        <label className="block text-xs uppercase tracking-widest mb-4">Gym/Memberships (£/mo)</label>
                        <input 
                          type="number" 
                          value={formData.gymMonthly}
                          onChange={(e) => setFormData({...formData, gymMonthly: Number(e.target.value)})}
                          className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-4 text-2xl font-light focus:border-[var(--color-bronze)] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-widest mb-4">Spa Visits (£/mo)</label>
                        <input 
                          type="number" 
                          value={formData.spaMonthly}
                          onChange={(e) => setFormData({...formData, spaMonthly: Number(e.target.value)})}
                          className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-4 text-2xl font-light focus:border-[var(--color-bronze)] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="grid grid-cols-2 gap-4">
                    {['Stress Relief', 'Better Sleep', 'Joint Pain', 'Athletic Recovery', 'Social Time', 'Home Value'].map(g => (
                      <button
                        key={g}
                        onClick={() => {
                          const newGoals = formData.goals.includes(g)
                            ? formData.goals.filter(goal => goal !== g)
                            : [...formData.goals, g];
                          setFormData({...formData, goals: newGoals});
                        }}
                        className={`p-4 border text-left flex justify-between items-center transition-all ${formData.goals.includes(g) ? 'border-[var(--color-ink)] bg-[var(--color-paper-sunken)]' : 'border-[var(--color-ink-rule)]'}`}
                      >
                        <span className="text-xs uppercase tracking-widest">{g}</span>
                        {formData.goals.includes(g) && <CheckCircle2 size={16} className="text-[var(--color-bronze)]" />}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 flex justify-between">
               {step > 0 ? (
                 <button onClick={prevStep} className="text-xs uppercase tracking-widest font-medium opacity-50 hover:opacity-100 transition-opacity">Back</button>
               ) : <div />}
               
               {step < steps.length - 1 ? (
                 <button onClick={nextStep} className="btn btn-primary py-4 px-12">Next Step</button>
               ) : (
                 <button onClick={handleCalculate} disabled={loading} className="btn btn-primary py-4 px-12 flex items-center gap-3">
                   {loading ? 'Analysing...' : 'Generate Analysis'}
                   {!loading && <Calculator size={18} />}
                 </button>
               )}
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white p-8 border border-[var(--color-ink-rule)]">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Payback Period</p>
                  <p className="text-4xl font-display text-[var(--color-bronze)]">{result.paybackYears} Years</p>
               </div>
               <div className="bg-white p-8 border border-[var(--color-ink-rule)]">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Cost Per Session</p>
                  <p className="text-4xl font-display text-[var(--color-bronze)]">£{result.costPerSession}</p>
               </div>
               <div className="bg-white p-8 border border-[var(--color-ink-rule)]">
                  <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-2">Annual Savings</p>
                  <p className="text-4xl font-display text-[var(--color-bronze)]">£{result.annualSavings}</p>
               </div>
            </div>

            <div className="bg-white p-12 border border-[var(--color-ink-rule)]">
               <h2 className="text-2xl font-display mb-8">Investment Narrative</h2>
               <p className="text-lg leading-relaxed text-[var(--color-ink-soft)] italic mb-12">
                 &quot;{result.narrative}&quot;
               </p>
               
               <div className="flex flex-col sm:flex-row gap-6 border-t border-[var(--color-ink-rule)] pt-12">
                  <button className="btn btn-primary py-5 px-10 flex-1 gap-3">
                    Download Full PDF Report
                    <Download size={18} />
                  </button>
                  <button onClick={() => setResult(null)} className="btn btn-outline py-5 px-10 flex-1">
                    Start Over
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
