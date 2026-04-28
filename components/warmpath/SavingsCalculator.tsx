'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { NumericScrub } from '@/components/ui/MicroInteractions';
import { ArrowRight, ChevronLeft, Zap, Flame, Info } from 'lucide-react';

const FUEL_TYPES = [
  { id: 'gas', label: 'Gas Boiler', color: '#8B6F47' },
  { id: 'oil', label: 'Oil Heating', color: '#1A1A1A' },
  { id: 'electric', label: 'Electric Storage', color: '#B87333' },
];

const STEPS = ['Property', 'Usage', 'Result'];

export function SavingsCalculator() {
  const [step, setStep] = useState(0);
  const [fuelType, setFuelType] = useState('gas');
  const [bedrooms, setBedrooms] = useState(3);
  const [usage, setUsage] = useState(12000); // kWh/year

  const results = useMemo(() => {
    // Basic ROI Model (Simplified for demo)
    const fuelCosts: Record<string, number> = { gas: 0.08, oil: 0.12, electric: 0.28 };
    const ashpCost = 0.14; // Average kWh cost with CoP of 3.5
    
    const currentCost = usage * (fuelCosts[fuelType] ?? 0);
    const newCost = usage * ashpCost;
    const savings = currentCost - newCost;
    const co2Saved = usage * 0.2; // kg per year

    return {
      currentCost: Math.round(currentCost),
      newCost: Math.round(newCost),
      savings: Math.round(savings),
      co2Saved: Math.round(co2Saved / 1000), // Tons
      chartData: [
        { name: 'Current', cost: currentCost, color: '#D4CFC7' },
        { name: 'Warmpath', cost: newCost, color: '#3A4D39' }
      ]
    };
  }, [fuelType, usage]);

  return (
    <div className="flex flex-col h-full bg-white border border-moss/10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-moss border-b border-moss/10">
        <div className="flex justify-between items-center mb-4">
           <span className="text-[10px] font-bold uppercase tracking-widest text-moss-light">Savings Calculator</span>
           <span className="text-[10px] font-mono text-moss-light">Step {step + 1} of 3</span>
        </div>
        <div className="flex gap-2">
           {STEPS.map((s, i) => (
             <div key={s} className={`h-1 flex-1 transition-all ${i <= step ? 'bg-white' : 'bg-white/10'}`} />
           ))}
        </div>
      </div>

      <div className="p-8 flex-1">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <label className="text-caption mb-4 block">Current Heating Fuel</label>
                <div className="grid grid-cols-1 gap-2">
                  {FUEL_TYPES.map((fuel) => (
                    <button
                      key={fuel.id}
                      onClick={() => setFuelType(fuel.id)}
                      className={`flex items-center justify-between p-4 border transition-all ${
                        fuelType === fuel.id ? 'border-moss bg-moss/5 text-moss' : 'border-ink-rule hover:border-moss/40'
                      }`}
                    >
                      <span className="text-sm font-medium">{fuel.label}</span>
                      {fuel.id === 'gas' ? <Flame size={16} /> : <Zap size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-caption mb-4 block">Property Size (Bedrooms)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setBedrooms(n);
                        setUsage(n * 4000);
                      }}
                      className={`flex-1 py-3 border transition-all font-mono text-sm ${
                        bedrooms === n ? 'bg-moss text-white border-moss' : 'border-ink-rule hover:bg-moss-wash'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <label className="text-caption mb-4 block">Annual Heat Consumption (kWh)</label>
                <p className="text-3xl font-mono mb-6">{usage.toLocaleString()}</p>
                <input 
                  type="range" 
                  min="2000" 
                  max="40000" 
                  step="500"
                  value={usage}
                  onChange={(e) => setUsage(parseInt(e.target.value))}
                  className="w-full accent-moss"
                />
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-ink-quiet mt-4">
                   <span>Lower Usage</span>
                   <span>High Demand</span>
                </div>
              </div>

              <div className="p-4 bg-moss-wash flex gap-4">
                 <Info size={16} className="text-moss flex-shrink-0" />
                 <p className="text-xs text-moss leading-relaxed">
                   Average 3-bed UK home uses ~12,000kWh/year. Larger estates can exceed 30,000kWh.
                 </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <div className="text-center p-6 bg-moss text-white">
                 <p className="text-[10px] uppercase tracking-widest text-moss-light mb-2">Estimated Annual Savings</p>
                 <p className="display-48 mb-1">£<NumericScrub value={results.savings} /></p>
                 <p className="text-xs text-moss-light italic">Based on current market cap</p>
              </div>

              <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={results.chartData} layout="vertical" margin={{ left: -20 }}>
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                     <Tooltip cursor={{ fill: 'transparent' }} />
                     <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={24}>
                        {results.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 border border-ink-rule">
                    <p className="text-[9px] uppercase tracking-widest text-ink-quiet mb-1">Carbon Saved</p>
                    <p className="text-lg font-mono font-bold">{results.co2Saved} Tons/yr</p>
                 </div>
                 <div className="p-4 border border-ink-rule">
                    <p className="text-[9px] uppercase tracking-widest text-ink-quiet mb-1">CoP Rating</p>
                    <p className="text-lg font-mono font-bold text-moss">4.5+</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Nav */}
      <div className="p-6 bg-paper-sunken border-t border-ink-rule flex justify-between">
        {step > 0 && (
          <button 
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink-quiet hover:text-ink transition-colors"
          >
            <ChevronLeft size={16} />
            BACK
          </button>
        )}
        
        {step < 2 ? (
          <button 
            onClick={() => setStep(step + 1)}
            className="ml-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-moss hover:text-moss-light transition-colors"
          >
            NEXT STEP
            <ArrowRight size={16} />
          </button>
        ) : (
          <button className="ml-auto btn btn-primary bg-moss text-white px-6 py-2 text-xs tracking-widest">
            GET FORMAL QUOTE
          </button>
        )}
      </div>
    </div>
  );
}
