import { Metadata } from 'next';
import Image from 'next/image';
import { FilterBar } from '@/components/shop/FilterBar';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { allProducts } from '@/data/products';

export const metadata: Metadata = {
  title: 'Saunas — The Baltic Collection',
  description: 'Hand-crafted Finnish saunas. Barrel, Cube, and Infrared models built from premium Thermowood. Transform your garden into a Nordic sanctuary.',
};

export default function SaunasPage() {
  const saunas = allProducts.filter(p => p.category === 'sauna');

  return (
    <div className="pt-20 bg-[#F7F2EB]"> {/* Slightly warmer wood-tuned background */}
      {/* Hero (60vh) */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-[var(--color-wood-deep)] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image 
             src="/images/categories/saunas.jpg" 
             alt="Hekla Saunas" 
             fill 
             className="object-cover"
             priority
           />
        </div>
        <div className="container-lumerra relative z-10">
          <div className="max-w-3xl">
            <p className="text-caption text-[var(--color-wood-light)] mb-6">Baltic Craft</p>
            <h1 className="display-80 text-white mb-6">Saunas</h1>
            <p className="text-xl text-[var(--color-paper-deep)] leading-relaxed">
              Traditional heat, modern restraint. From Finnish barrel saunas to glass-fronted cubes. 
              Built with Scandinavian precision for the British garden.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar (Wood-tuned) */}
      <div className="border-b border-[var(--color-ink-rule)]">
         <FilterBar />
      </div>

      <div className="container-lumerra py-16">
        <ProductGrid products={saunas} />
      </div>

      {/* Sauna Editorial Section */}
      <section className="section-padding bg-[var(--color-wood)] text-white">
        <div className="container-lumerra">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                 <h2 className="display-64 mb-8">The heat, <br /><span className="italic">as nature intended.</span></h2>
                 <p className="text-lg text-[var(--color-wood-light)] leading-relaxed mb-12">
                   Lumerra saunas are built exclusively by Hekla using certified Nordic spruce and Thermowood. 
                   Our barrel designs facilitate natural air circulation, while our Cube series offers 
                   floor-to-ceiling views of your landscape through tempered glass.
                 </p>
                 <div className="flex gap-12">
                    <div className="flex flex-col">
                       <span className="font-mono text-2xl mb-1">100%</span>
                       <span className="text-xs uppercase tracking-widest text-[var(--color-wood-light)]">Nordic Spruce</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="font-mono text-2xl mb-1">8kW</span>
                       <span className="text-xs uppercase tracking-widest text-[var(--color-wood-light)]">Helo Heaters</span>
                    </div>
                 </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden">
                 <Image src="/images/categories/saunas.jpg" alt="Sauna Details" fill className="object-cover" />
              </div>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-lumerra">
           <div className="max-w-3xl">
              <h2 className="display-48 mb-12">Sauna Questions</h2>
              <FAQAccordion 
                items={[
                  { q: 'Barrel vs Cube: Which is better?', a: 'Barrel saunas heat up faster due to reduced volume and circular air flow. Cube saunas offer more internal space and larger glass views.' },
                  { q: 'Is a dedicated electrical supply needed?', a: 'Traditional electric saunas require a 32A or 3-phase supply. Our Infrared cabins can be powered by a standard 13A socket.' }
                ]}
              />
           </div>
        </div>
      </section>
    </div>
  );
}
