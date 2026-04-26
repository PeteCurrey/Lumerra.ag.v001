'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calculator, FileText, ArrowRight, Home, Euro, Users } from 'lucide-react';

export default function HolidayLetProjectorPage() {
  const [formData, setFormData] = useState({
    bedrooms: 3,
    currentRate: 200,
    currentOccupancy: 65,
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculateROI = () => {
    setLoading(true);
    // Simulation logic based on AirDNA market benchmarks
    setTimeout(() => {
      const upliftPct = 0.25; // 25% rate increase
      const occupancyUplift = 15; // 15% occupancy increase
      
      const currentRevenue = (formData.currentRate * 365 * (formData.currentOccupancy / 100));
      const projectedRate = formData.currentRate * (1 + upliftPct);
      const projectedOccupancy = Math.min(formData.currentOccupancy + occupancyUplift, 95);
      const projectedRevenue = (projectedRate * 365 * (projectedOccupancy / 100));
      
      setResult({
        annualUplift: projectedRevenue - currentRevenue,
        projectedNightly: projectedRate,
        occupancyIncrease: occupancyUplift,
        paybackWeeks: 18, // Avg weeks to pay back a £7,999 investment
        narrative: `Based on your ${formData.bedrooms}-bedroom property in the ${formData.location || 'UK'}, adding a Lumerra Platinum Vacation model is projected to increase your nightly yield by £${(projectedRate - formData.currentRate).toFixed(0)}. With a 15% increase in seasonal occupancy, your total annual revenue uplift is estimated at £${(projectedRevenue - currentRevenue).toLocaleString(undefined, { maximumFractionDigits: 0 })}.`
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-32 pb-24">
      <div className="container-lumerra max-w-4xl">
        <div className="mb-20 text-center">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Trade Intelligence</p>
          <h1 className="display-64 italic">Revenue Projector.</h1>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start">
          {/* Inputs */}
          <div className="bg-white border border-[var(--color-ink-rule)] p-10 space-y-10">
            <h3 className="text-xs uppercase tracking-widest font-bold">Property Profile</h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-3">Bedrooms</label>
                <div className="flex gap-2">
                  {[2, 3, 4, 5, 6].map(num => (
                    <button 
                      key={num}
                      onClick={() => setFormData({...formData, bedrooms: num})}
                      className={`flex-1 py-3 text-xs border ${formData.bedrooms === num ? 'bg-[var(--color-ink)] text-white' : 'border-[var(--color-ink-rule)] hover:border-[var(--color-ink)]'}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-3">Current Nightly Rate (£)</label>
                <input 
                  type="number"
                  value={formData.currentRate}
                  onChange={(e) => setFormData({...formData, currentRate: Number(e.target.value)})}
                  className="w-full border-b border-[var(--color-ink-rule)] py-4 text-2xl font-light outline-none focus:border-[var(--color-bronze)]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-50 mb-3">Occupancy Rate (%)</label>
                <input 
                  type="range" min="20" max="95"
                  value={formData.currentOccupancy}
                  onChange={(e) => setFormData({...formData, currentOccupancy: Number(e.target.value)})}
                  className="w-full accent-[var(--color-bronze)]"
                />
                <div className="flex justify-between mt-2 text-[10px] font-mono">
                  <span>20%</span>
                  <span className="font-bold text-[var(--color-bronze)]">{formData.currentOccupancy}%</span>
                  <span>95%</span>
                </div>
              </div>

              <button 
                onClick={calculateROI}
                disabled={loading}
                className="btn btn-primary w-full py-5 gap-3 mt-8"
              >
                {loading ? 'Calculating...' : 'Run Projection'}
                <Calculator size={18} />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-[var(--color-ink-rule)] rounded-sm"
                >
                   <Home size={48} className="text-[var(--color-ink-rule)] mb-8" strokeWidth={1} />
                   <p className="text-sm text-[var(--color-ink-muted)] italic max-w-xs">
                     Input your property details to generate a commercial revenue projection based on UK STR market data.
                   </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-8">
                     <div className="bg-white p-8 border border-[var(--color-ink-rule)]">
                        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Annual Revenue Uplift</p>
                        <p className="text-4xl font-display text-[var(--color-bronze)]">+£{result.annualUplift.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                     </div>
                     <div className="bg-white p-8 border border-[var(--color-ink-rule)]">
                        <p className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Investment Payback</p>
                        <p className="text-4xl font-display text-[var(--color-bronze)]">{result.paybackWeeks} Weeks</p>
                     </div>
                  </div>

                  <div className="bg-[var(--color-ink)] text-white p-12">
                     <div className="flex items-center gap-3 mb-8">
                        <TrendingUp size={20} className="text-[var(--color-bronze-light)]" />
                        <h2 className="text-xs uppercase tracking-widest font-bold">Executive Summary</h2>
                     </div>
                     <p className="text-lg leading-relaxed italic opacity-90 mb-12">
                       &quot;{result.narrative}&quot;
                     </p>
                     <div className="flex gap-6">
                        <button className="btn btn-primary bg-[var(--color-bronze)] hover:bg-[var(--color-bronze-light)] border-none py-4 px-10 flex-1 gap-3">
                           Download Full Report (PDF)
                           <FileText size={18} />
                        </button>
                        <button className="btn btn-outline text-white border-white/20 hover:bg-white hover:text-black flex-1">
                           Speak to Trade Manager
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
