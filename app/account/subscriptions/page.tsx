'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShieldCheck, Zap, ArrowRight, Check } from 'lucide-react';

const tiers = [
  {
    id: 'essential',
    name: 'Lumerra Care: Essential',
    price: 35,
    description: 'The core consumables to keep your water balanced and sanitized.',
    items: ['Chlorine Granules', 'pH Plus & Minus', 'Total Alkalinity Raiser', '50x Test Strips', 'Quarterly Maintenance Guide'],
    color: 'var(--color-ink-muted)',
  },
  {
    id: 'complete',
    name: 'Lumerra Care: Complete',
    price: 65,
    description: 'Comprehensive water wellness, including specialty clarifiers and fragrances.',
    items: ['Everything in Essential', 'No-Foam Clarifier', 'Algaecide Treatment', 'System Flush Agent', 'Aromatherapy Crystals (Rotating)', 'Replacement Micro-Filter'],
    color: 'var(--color-bronze)',
  }
];

export default function SubscriptionsPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] pt-32 pb-24">
      <div className="container-lumerra max-w-5xl">
        <div className="mb-16 text-center">
          <p className="text-caption text-[var(--color-bronze)] mb-4">Recurring Wellness</p>
          <h1 className="display-64 italic">Lumerra Care.</h1>
          <p className="text-sm text-[var(--color-ink-muted)] max-w-xl mx-auto mt-6 italic">
            Never run out of consumables again. Intelligent, quarterly deliveries perfectly matched to your specific model and usage patterns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div 
              key={tier.id}
              className={`bg-white border p-12 flex flex-col transition-all ${selectedTier === tier.id ? 'border-[var(--color-bronze)] shadow-2xl scale-105' : 'border-[var(--color-ink-rule)] opacity-80 hover:opacity-100'}`}
              onClick={() => setSelectedTier(tier.id)}
            >
              <div className="flex justify-between items-start mb-8">
                 <h2 className="text-xl font-display leading-tight max-w-[200px]">{tier.name}</h2>
                 <Package size={24} className="text-[var(--color-ink-rule)]" />
              </div>
              
              <div className="flex items-baseline gap-2 mb-10">
                 <span className="text-4xl font-mono">£{tier.price}</span>
                 <span className="text-[10px] uppercase tracking-widest opacity-50">/ Quarter</span>
              </div>

              <p className="text-sm text-[var(--color-ink-soft)] italic mb-10 leading-relaxed">
                &quot;{tier.description}&quot;
              </p>

              <ul className="space-y-4 mb-12 flex-1">
                {tier.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[11px] uppercase tracking-wider text-[var(--color-ink-muted)]">
                    <Check size={14} className="text-[var(--color-bronze)] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <button className={`btn w-full py-4 text-xs uppercase tracking-widest ${selectedTier === tier.id ? 'btn-primary' : 'btn-outline border-[var(--color-ink-rule)] hover:border-[var(--color-ink)]'}`}>
                {selectedTier === tier.id ? 'Subscribe via Stripe' : 'Select Tier'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-white border border-[var(--color-ink-rule)] text-center max-w-4xl mx-auto">
           <div className="flex justify-center gap-12 items-center">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={20} className="text-[var(--color-bronze)]" />
                 <span className="text-[10px] uppercase tracking-widest font-bold">Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-3">
                 <Zap size={20} className="text-[var(--color-bronze)]" />
                 <span className="text-[10px] uppercase tracking-widest font-bold">Fast UK Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                 <ArrowRight size={20} className="text-[var(--color-bronze)]" />
                 <span className="text-[10px] uppercase tracking-widest font-bold">Stripe Secured</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
