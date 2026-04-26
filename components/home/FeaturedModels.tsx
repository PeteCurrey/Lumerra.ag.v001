import { ProductCard } from '@/components/shop/ProductCard';
import { allProducts } from '@/data/products';

export function FeaturedModels() {
  // Use first 6 products for demo
  const products = allProducts || [];

  return (
    <section className="section-padding bg-[var(--color-paper)]">
      <div className="container-lumerra">
        <div className="mb-16">
          <p className="text-caption mb-4">Curated Models</p>
          <h2 className="display-48 text-[var(--color-ink)]">
            Selected for the <span className="italic">connoisseur.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
