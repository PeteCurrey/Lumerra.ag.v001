import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProducts } from '@/data/products';
import { PDPHero } from '@/components/product/PDPHero';
import { StickySpecCard } from '@/components/product/StickySpecCard';
import { ProductStory } from '@/components/product/ProductStory';
import { SpecTheatre } from '@/components/product/SpecTheatre';
import { DimensionsTool } from '@/components/product/DimensionsTool';
import { RunningCostCalculator } from '@/components/product/RunningCostCalculator';
import { ComparisonModels } from '@/components/product/ComparisonModels';
import ReviewSynthesis from '@/components/product/ReviewSynthesis';
import NordicCycleCrossSell from '@/components/product/NordicCycleCrossSell';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — ${product.brandSlug.replace('-', ' ')} | Lumerra`,
    description: product.descriptionShort,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <div className="relative">
      <PDPHero product={product} />
      
      <div className="container-lumerra relative">
        <StickySpecCard product={product} />
        
        <div className="lg:w-[60%] space-y-32 py-32">
          <ProductStory product={product} />
          <SpecTheatre product={product} />
          <DimensionsTool product={product} />
          <RunningCostCalculator product={product} />
          <ComparisonModels product={product} />
        </div>
      </div>
      
      <ReviewSynthesis synthesis={product.reviewSynthesisJson || null} />
      {product.category === 'sauna' && <NordicCycleCrossSell />}
    </div>
  );
}
