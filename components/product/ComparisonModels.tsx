import { ProductCard } from '@/components/shop/ProductCard';
import { allProducts } from '@/data/products';

export function ComparisonModels({ product }: { product: any }) {
  // Suggest 3 alternatives in same category
  const alternatives = allProducts
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <section className="py-24">
      <div className="mb-16">
        <p className="text-caption mb-4">Comparable Models</p>
        <h3 className="display-48">Other <span className="italic">considered</span> choices.</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alternatives.map((alt) => (
          <ProductCard key={alt.slug} product={alt} />
        ))}
      </div>
    </section>
  );
}
