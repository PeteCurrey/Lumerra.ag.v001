'use client';

import { useState } from 'react';
import { Zap, Clock, Info } from 'lucide-react';

export function RunningCostCalculator({ product }: { product: any }) {
  const [tariff, setTariff] = useState('28.5');
  const [hoursPerWeek, setHoursPerWeek] = useState('5');

  // Formula as per spec
  // monthly_kwh = (heater_kw * heating_hours_per_day * 30 * efficiency_factor) 
  //             + (pump_kw * usage_hours_per_week * 4 * 0.6) 
  //             + standby_kw * 24 * 30
  
  const heater_kw = product.heater_kw || 3;
  const pump_kw = (product.jets ? Math.ceil(product.jets / 30) : 2) * 1.5;
  const standby_kw = 0.4; // avg overnight standby
  const efficiency_factor = 0.45; // premium
  const heating_hours_per_day = 2.5;

  const monthly_kwh = (heater_kw * heating_hours_per_day * 30 * efficiency_factor)
                    + (pump_kw * parseInt(hoursPerWeek || '0') * 4 * 0.6)
                    + (standby_kw * 24 * 30);

  const monthly_cost = (monthly_kwh * parseFloat(tariff || '0')) / 100;

  return (
    <section className="py-24 border-b border-[var(--color-ink-rule)]">
      <div className="mb-12">
        <p className="text-caption mb-4">Ownership Economics</p>
        <h3 className="display-48 mb-6">Running Cost Calculator</h3>
        <p className="text-[var(--color-ink-soft)] max-w-2xl leading-relaxed">
          Transparent, realistic estimates based on UK energy tariffs and the {product.brandSlug.replace('-', ' ')} efficiency roadmap.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest font-medium flex items-center gap-2">
                   <Zap size={12} /> Tariff (p/kWh)
                 </label>
                 <input 
                   type="number" 
                   value={tariff}
                   onChange={(e) => setTariff(e.target.value)}
                   className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none font-mono"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest font-medium flex items-center gap-2">
                   <Clock size={12} /> Usage (Hrs/Week)
                 </label>
                 <input 
                   type="number" 
                   value={hoursPerWeek}
                   onChange={(e) => setHoursPerWeek(e.target.value)}
                   className="w-full bg-transparent border-b border-[var(--color-ink-rule)] py-3 focus:border-[var(--color-bronze)] outline-none font-mono"
                 />
              </div>
           </div>

           <div className="p-6 bg-[var(--color-paper-sunken)] border border-[var(--color-ink-rule)]">
              <div className="flex justify-between items-end">
                 <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)] mb-2">Estimated Monthly Cost</span>
                 <p className="font-display text-4xl text-[var(--color-bronze)]">£{monthly_cost.toFixed(2)}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-[var(--color-ink-rule)] flex items-start gap-3">
                 <Info size={16} className="text-[var(--color-ink-quiet)] mt-0.5" />
                 <p className="text-xs text-[var(--color-ink-muted)] italic">
                   &quot;That&apos;s roughly the same as your daily cup of coffee — for a private spa, every evening.&quot;
                 </p>
              </div>
           </div>
        </div>

        {/* Spec Breakdown */}
        <div className="bg-[var(--color-paper-raised)] p-8 border border-[var(--color-ink-rule)] font-mono text-xs uppercase tracking-wider space-y-4">
           <div className="flex justify-between border-b border-[var(--color-ink-rule)] pb-4">
              <span className="text-[var(--color-ink-quiet)]">Heating (kwh/mo)</span>
              <span>{(heater_kw * heating_hours_per_day * 30 * efficiency_factor).toFixed(1)}</span>
           </div>
           <div className="flex justify-between border-b border-[var(--color-ink-rule)] pb-4">
              <span className="text-[var(--color-ink-quiet)]">Filtration (kwh/mo)</span>
              <span>{(standby_kw * 24 * 30).toFixed(1)}</span>
           </div>
           <div className="flex justify-between border-b border-[var(--color-ink-rule)] pb-4">
              <span className="text-[var(--color-ink-quiet)]">Usage (kwh/mo)</span>
              <span>{(pump_kw * parseInt(hoursPerWeek || '0') * 4 * 0.6).toFixed(1)}</span>
           </div>
           <div className="flex justify-between pt-4 font-bold">
              <span>Total Monthly kWh</span>
              <span>{monthly_kwh.toFixed(1)}</span>
           </div>
        </div>
      </div>
    </section>
  );
}
