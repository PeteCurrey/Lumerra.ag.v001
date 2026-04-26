'use client';

import { groupBrands, GroupBrand } from '@/data/brands';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CrossBrandReferralProps {
  targetBrandId: 'ember' | 'warmpath' | 'grove';
  context: 'post-purchase' | 'pdp-sidebar' | 'footer-cta';
}

export default function CrossBrandReferral({ targetBrandId, context }: CrossBrandReferralProps) {
  const brand = groupBrands.find(b => b.id === targetBrandId);
  if (!brand) return null;

  return (
    <div className={`p-10 border border-[var(--color-ink-rule)] ${brand.visualMode === 'dark' ? 'bg-[var(--color-ink)] text-white' : 'bg-white text-[var(--color-ink)]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <Sparkles size={16} className="text-[var(--color-bronze)]" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">The Outdoor Living Group</span>
      </div>
      
      <h3 className="text-2xl font-display italic mb-4">{brand.name}.</h3>
      <p className="text-sm italic mb-8 opacity-80 leading-relaxed">
        {context === 'post-purchase' 
          ? `Complete your outdoor space. Lumerra customers receive exclusive access to ${brand.name} ${brand.tagline.toLowerCase()}`
          : brand.description
        }
      </p>

      <a 
        href={`https://${brand.domain}`} 
        className={`inline-flex items-center gap-3 text-xs uppercase tracking-widest font-bold border-b-2 pb-1 transition-colors ${brand.visualMode === 'dark' ? 'border-white/20 hover:border-white' : 'border-black/10 hover:border-black'}`}
      >
        Explore {brand.name} <ArrowRight size={14} />
      </a>
    </div>
  );
}
