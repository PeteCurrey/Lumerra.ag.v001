import { allProducts } from '@/data/products';
import { notFound } from 'next/navigation';
import ConfiguratorPage from '@/components/configurator/ConfiguratorPage';

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ConfiguratorPage product={product} />;
}
