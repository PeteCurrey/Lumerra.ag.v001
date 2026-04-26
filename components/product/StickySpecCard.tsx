'use client';

import { useState } from 'react';
import { Heart, Scale, Box } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export function StickySpecCard({ product }: { product: any }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const priceInPounds = product.price / 100;
  const deposit = Math.floor(priceInPounds * 0.25);
  const monthly = Math.floor((priceInPounds - deposit) / 60);

  return (
    <aside className="hidden lg:block absolute top-0 right-20 w-80 z-20">
      <div className="sticky top-32 bg-[var(--color-paper-raised)] border border-[var(--color-ink-rule)] p-8 shadow-[0_32px_64px_-24px_rgba(26,26,26,0.08)]">
        <div className="mb-8">
           <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">Price</span>
           <p className="font-display text-3xl mb-1">£{priceInPounds.toLocaleString()}</p>
           <p className="text-xs text-[var(--color-ink-muted)]">
             From <span className="font-mono text-[var(--color-ink)]">£{monthly}/mo</span> with 0% finance
           </p>
        </div>

        <div className="mb-8 space-y-4">
           <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">Shell & Cabinet</p>
           <div className="flex gap-2">
              {['#FFFFFF', '#E8E1D5', '#1A1A1A'].map((color, i) => (
                <button 
                  key={color}
                  onClick={() => setSelectedVariant(i)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${selectedVariant === i ? 'border-[var(--color-bronze)] scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select variant ${i + 1}`}
                />
              ))}
           </div>
        </div>

        <div className="space-y-4 mb-8">
          <button 
            onClick={() => addItem({
              id: product.slug,
              productId: product.slug,
              name: product.name,
              brandName: product.brandSlug,
              slug: product.slug,
              imageUrl: product.heroImageUrl,
              price: priceInPounds,
              image: product.heroImageUrl,
              brand: product.brandSlug,
              deposit: priceInPounds > 5000 ? deposit : undefined
            })}
            className="btn btn-primary w-full py-4 uppercase tracking-widest text-xs"
          >
            Add to Bag
          </button>
          
          <div className="flex gap-4">
             <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[var(--color-ink-rule)] text-[10px] uppercase tracking-widest hover:bg-[var(--color-paper-sunken)] transition-colors">
               <Scale size={14} /> Compare
             </button>
             <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[var(--color-ink-rule)] text-[10px] uppercase tracking-widest hover:bg-[var(--color-paper-sunken)] transition-colors">
               <Heart size={14} /> Save
             </button>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-[var(--color-ink-rule)]">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
              <p className="text-xs font-medium">In stock — delivery 7–14 days</p>
           </div>
           <div className="flex items-center gap-3 text-[var(--color-ink-quiet)] hover:text-[var(--color-bronze)] cursor-pointer transition-colors">
              <Box size={14} />
              <span className="text-[10px] uppercase tracking-widest font-medium">View 360° Gallery</span>
           </div>
        </div>
      </div>
    </aside>
  );
}
