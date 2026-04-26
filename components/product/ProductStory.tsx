import Image from 'next/image';

export function ProductStory({ product }: { product: any }) {
  return (
    <section className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h2 className="display-56 mb-12">
          {product.name} <br />
          <span className="italic">The Story.</span>
        </h2>
        <div className="prose prose-ink max-w-none text-lg text-[var(--color-ink-soft)] leading-relaxed space-y-6">
           <p>
             Every Lumerra product is a culmination of years of physiological research and engineering refinement. 
             The {product.name} was designed specifically to address the intersection of hydrotherapy and aesthetic stillness.
           </p>
           <p>
             Constructed with a reinforced antimicrobial shell and finished in hand-polished composite panels, 
             this model doesn&apos;t just endure the elements — it elevates them.
           </p>
        </div>
      </div>
      <div className="aspect-[3/4] relative overflow-hidden bg-[var(--color-paper-sunken)]">
        <Image 
          src={product.imageDay} 
          alt={`${product.name} Detail`} 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>
    </section>
  );
}
