'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container (5:6 aspect) */}
      <div className="relative aspect-[5/6] bg-[var(--color-paper-sunken)] overflow-hidden mb-8">
        <img 
          src={product.heroImageUrl}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          onError={(e) => { e.currentTarget.src = '/images/placeholder.svg' }}
        />
        <img 
          src={product.imageLife || product.heroImageUrl}
          alt={`${product.name} Lifestyle`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          onError={(e) => { e.currentTarget.src = '/images/placeholder.svg' }}
        />

        {/* Spec Strip (Slides up on hover) */}
        <div className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-6 transition-transform duration-500 flex justify-between items-center ${isHovered ? 'translate-y-0' : 'translate-y-full lg:translate-y-full'} lg:group-hover:translate-y-0`}>
           <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">Price</span>
                <span className="font-mono text-sm">£{(product.price / 100).toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)]">Jets</span>
                <span className="font-mono text-sm">{product.specs?.jets || product.jets || 0}</span>
              </div>
           </div>
           <div className="w-8 h-8 rounded-full bg-[var(--color-bronze)] flex items-center justify-center text-white">
             <ArrowRight size={14} />
           </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bronze)] font-medium">
          {product.brandSlug.replace('-', ' ')}
        </p>
        <h3 className="display-48 text-3xl group-hover:text-[var(--color-bronze)] transition-colors">
          {product.name}
        </h3>
        <p className="text-[var(--color-ink-muted)] text-sm italic">
          {product.descriptionShort}
        </p>
      </div>
    </Link>
  );
}
