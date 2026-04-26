import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FilterBar } from '@/components/shop/FilterBar';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { allProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Hot Tubs — The Full Collection',
  description: 'Explore our curated range of premium hot tubs. From the 13A Plug & Play series to the Luxury Portofino. UK-wide delivery and installation.',
};

export default function HotTubsPage() {
  const hotTubs = allProducts.filter(p => p.category === 'hot_tub');

  return (
    <div className="pt-20">
      {/* Hero (60vh) */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-[var(--color-ink)] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
           <Image 
             src="/images/categories/hot-tubs.jpg" 
             alt="Luxury Hot Tubs" 
             fill 
             className="object-cover"
             priority
           />
        </div>
        <div className="container-lumerra relative z-10">
          <div className="max-w-3xl">
            <h1 className="display-80 text-white mb-6">Hot Tubs</h1>
            <p className="text-xl text-[var(--color-ink-quiet)] leading-relaxed">
              Forty-eight models. One for every garden. Curated for engineering excellence and aesthetic restraint.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar & Grid */}
      <div className="bg-[var(--color-paper)]">
        <FilterBar />
        <div className="container-lumerra py-16">
          <ProductGrid products={hotTubs} />
        </div>
      </div>

      {/* Editorial SEO Section */}
      <section className="section-padding bg-[var(--color-paper-sunken)]">
        <div className="container-lumerra">
           <div className="max-w-4xl">
              <p className="text-caption mb-8 text-[var(--color-bronze)]">The Lumerra Collections</p>
              <h2 className="display-64 text-[var(--color-ink)] mb-12">
                Compare hot tub <span className="italic">ranges.</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-16">
                 <div className="space-y-6">
                    <h3 className="font-display text-2xl">Deluxe & Premium</h3>
                    <p className="text-[var(--color-ink-soft)] leading-relaxed">
                       Our Deluxe and Premium ranges represent the entry point to genuine hydrotherapy. 
                       Built with the same structural integrity as our flagship models, these tubs 
                       focus on core wellness benefits and 13A Plug & Play convenience.
                    </p>
                    <Link href="/hot-tubs/deluxe" className="btn btn-bronze-underline text-xs uppercase tracking-widest">Explore Deluxe</Link>
                 </div>
                 <div className="space-y-6">
                    <h3 className="font-display text-2xl">Luxury & Series 3</h3>
                    <p className="text-[var(--color-ink-soft)] leading-relaxed">
                       The pinnacle of the Lumerra collection. These models feature advanced 
                       multi-zone lighting, high-flow pumps, and medical-grade hydrotherapy 
                       maps designed in collaboration with leading physiotherapists.
                    </p>
                    <Link href="/hot-tubs/luxury" className="btn btn-bronze-underline text-xs uppercase tracking-widest">Explore Luxury</Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[var(--color-paper)]">
        <div className="container-lumerra">
           <div className="max-w-3xl">
              <h2 className="display-48 mb-12">Frequently Asked Questions</h2>
              <FAQAccordion 
                items={[
                  { q: 'What is the difference between 13A and 32A?', a: '13A models plug directly into a standard UK socket. 32A models require a dedicated electrical feed but offer more powerful pumps and faster heating.' },
                  { q: 'How long does delivery take?', a: 'In-stock models are typically delivered and installed within 7–14 working days.' },
                  { q: 'Do you offer finance?', a: 'Yes, we offer 0% APR finance options via Klarna and V12 Retail Finance on all orders above £1,000.' }
                ]}
              />
           </div>
        </div>
      </section>
    </div>
  );
}
