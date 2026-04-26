'use client';

import { useState } from 'react';
import { Ruler, ThermometerSun, Maximize2 } from 'lucide-react';

export default function SaunaSizerPage() {
  const [people, setPeople] = useState('2');
  const [location, setLocation] = useState('outdoor');
  const [budget, setBudget] = useState('8000');

  // Deterministic logic
  const getRecommendation = () => {
    if (location === 'indoor') return { name: 'Infrared Cabin 1', brand: 'Hekla', type: 'Infrared' };
    if (parseInt(people) >= 6) return { name: 'Grand Cube', brand: 'Hekla', type: 'Cube' };
    return { name: 'Classic Barrel', brand: 'Hekla', type: 'Barrel' };
  };

  const rec = getRecommendation();

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-32 pb-16">
      <div className="container-lumerra max-w-4xl">
        <div className="mb-16">
           <p className="text-caption text-[var(--color-wood)] mb-4">Sauna Sizing Tool</p>
           <h1 className="display-64 text-[var(--color-ink)]">Find your <br /><span className="italic">Nordic fit.</span></h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
           <div className="space-y-12 bg-white p-12 border border-[var(--color-ink-rule)] shadow-sm">
              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                    <Ruler size={14} /> Occupancy
                 </label>
                 <select 
                   value={people} 
                   onChange={(e) => setPeople(e.target.value)}
                   className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-wood)] outline-none"
                 >
                    <option value="2">2 Person</option>
                    <option value="4">4 Person</option>
                    <option value="6">6 Person</option>
                    <option value="8">8+ Person</option>
                 </select>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                    <Maximize2 size={14} /> Location
                 </label>
                 <div className="flex gap-4">
                    {['indoor', 'outdoor'].map(loc => (
                       <button 
                         key={loc}
                         onClick={() => setLocation(loc)}
                         className={`flex-1 py-4 border text-sm uppercase tracking-widest transition-all ${location === loc ? 'border-[var(--color-wood)] bg-[var(--color-wood)] text-white' : 'border-[var(--color-ink-rule)] hover:border-[var(--color-wood)]'}`}
                       >
                         {loc}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                    <ThermometerSun size={14} /> Budget Band
                 </label>
                 <input 
                   type="range" 
                   min="5000" 
                   max="15000" 
                   step="1000" 
                   value={budget}
                   onChange={(e) => setBudget(e.target.value)}
                   className="w-full accent-[var(--color-wood)]"
                 />
                 <div className="flex justify-between text-xs font-mono text-[var(--color-ink-muted)]">
                    <span>£5k</span>
                    <span>£10k</span>
                    <span>£15k</span>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="p-12 bg-[var(--color-wood-deep)] text-white relative overflow-hidden">
                 <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-4 text-[var(--color-wood-light)]">Your Recommended Model</p>
                    <h2 className="display-48 mb-6">{rec.brand} {rec.name}</h2>
                    <p className="text-lg text-[var(--color-wood-light)] leading-relaxed mb-8 italic">
                      The perfect {rec.type} sauna for your {location} sanctuary. Designed for {people} people with architectural precision.
                    </p>
                    <button className="btn py-4 px-10 border border-white/20 text-white w-full uppercase tracking-widest text-xs hover:bg-white hover:text-[var(--color-wood-deep)] transition-all">
                       View Specifications
                    </button>
                 </div>
                 {/* Visual decoration */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              </div>

              <div className="p-8 border border-[var(--color-ink-rule)] bg-white">
                 <p className="text-xs text-[var(--color-ink-muted)] leading-relaxed">
                   <strong>Next Step:</strong> Our expert team can provide a full site survey to confirm the ground suitability for your {rec.name}.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
