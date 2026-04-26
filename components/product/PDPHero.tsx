'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export function PDPHero({ product }: { product: any }) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolledPast(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.slug,
      productId: product.slug,
      name: product.name,
      price: product.price,
      imageUrl: product.heroImageUrl,
      brandName: product.brandSlug,
      slug: product.slug,
    });
  };

  return (
    <section className="relative h-[90vh] w-full bg-[var(--color-ink)] overflow-hidden">
      {/* Sticky Mini-Header */}
      <div className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-white/95 backdrop-blur-md border-b border-[var(--color-ink-rule)] transition-transform duration-500 py-3 ${isScrolledPast ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container-lumerra flex justify-between items-center">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-ink-quiet)] capitalize">{product.brandSlug.replace('-', ' ')}</span>
            <p className="font-display text-lg">{product.name}</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono text-sm">£{(product.price / 100).toLocaleString()}</span>
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary !py-2 !px-6 text-xs"
            >
              Add to Bag
            </button>
          </div>
        </div>
      </div>

      <Image 
        src={product.heroImageUrl} 
        alt={product.name} 
        fill 
        className="object-cover opacity-60"
        priority
      />

      <div className="container-lumerra relative h-full flex flex-col justify-center z-10">
        <div className="max-w-2xl text-white">
          <p className="text-caption text-[var(--color-bronze-light)] mb-6 capitalize">{product.brandSlug.replace('-', ' ')}</p>
          <h1 className="display-80 mb-8">{product.name}</h1>
          <p className="text-xl text-[var(--color-paper-deep)] mb-12 italic opacity-80">
            {product.descriptionShort}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-5 text-xs uppercase tracking-widest"
            >
              Add to Bag
            </button>
            <Link
              href={`/configure/${product.slug}`}
              className="btn btn-outline flex-1 py-5 text-xs uppercase tracking-widest text-center"
            >
              Configure yours
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-white hover:text-[var(--color-bronze-light)] transition-colors">
              <MessageCircle size={18} />
              Speak to Concierge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
