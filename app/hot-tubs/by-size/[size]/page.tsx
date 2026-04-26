import { Metadata } from 'next';
import { allProducts } from '@/data/products';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { FilterBar } from '@/components/shop/FilterBar';

type Props = {
  params: Promise<{ size: string }>;
};

export async function generateStaticParams() {
  return [
    { size: '3-4' },
    { size: '5' },
    { size: '6' },
    { size: '7-plus' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { size } = await params;
  const sizeLabel = size === '7-plus' ? '7+ Person' : `${size} Person`;
  return {
    title: `${sizeLabel} Hot Tubs — Lumerra`,
    description: `Explore our collection of ${sizeLabel} hot tubs. Curated for performance and designed for your space.`,
  };
}

export default async function HotTubsBySizePage({ params }: Props) {
  const { size } = await params;
  const sizeLabel = size === '7-plus' ? '7+ Person' : `${size} Person`;
  
  // Filtering logic based on seed data
  // For demo, we'll just filter by the "seats" spec
  const filteredProducts = allProducts.filter(p => {
    if (p.category !== 'hot_tub') return false;
    const seats = p.capacity || 0;
    if (size === '3-4') return seats >= 3 && seats <= 4;
    if (size === '5') return seats === 5;
    if (size === '6') return seats === 6;
    if (size === '7-plus') return seats >= 7;
    return false;
  });

  return (
    <div className="pt-20">
      <section className="bg-[var(--color-paper-sunken)] py-16 md:py-24 border-b border-[var(--color-ink-rule)]">
        <div className="container-lumerra">
           <p className="text-caption mb-4">Hot Tubs by Size</p>
           <h1 className="display-64 text-[var(--color-ink)] mb-6">{sizeLabel} Hot Tubs</h1>
           <p className="text-lg text-[var(--color-ink-muted)] max-w-2xl leading-relaxed">
             From intimate three-seaters for terrace installations to expansive family models. 
             Every Lumerra {sizeLabel} hot tub is chosen for its spatial efficiency and hydrotherapy depth.
           </p>
        </div>
      </section>

      <FilterBar />

      <div className="container-lumerra py-16">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="py-24 text-center">
            <p className="text-[var(--color-ink-quiet)]">No models currently in stock for this size.</p>
          </div>
        )}
      </div>
    </div>
  );
}
