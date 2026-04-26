import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    slug: 'under-10k',
    label: 'Under £10,000',
    tagline: 'Considered wellness, at a considered price.',
    description: 'Twenty-two hot tubs and spas, all below £10,000. No compromises on quality — just a different point of entry.',
    href: '/collections/under-10k',
    image: '/images/collections/under-10k.jpg',
    span: 'col-span-1',
  },
  {
    slug: '13-amp-plug-and-play',
    label: 'Plug & Play',
    tagline: 'Any garden. Any socket.',
    description: 'Thirteen-amp hot tubs that need no rewiring, no electrician, no delay. Arrive today. In the water tonight.',
    href: '/collections/13-amp-plug-and-play',
    image: '/images/collections/plug-and-play.jpg',
    span: 'col-span-1',
  },
  {
    slug: 'holiday-lets',
    label: 'Holiday Let Ready',
    tagline: 'The amenity that pays for itself.',
    description: 'Hot tubs and saunas selected for durability, low maintenance, and the guest experience that earns five-star reviews.',
    href: '/collections/holiday-lets',
    image: '/images/collections/holiday-lets.jpg',
    span: 'col-span-1',
  },
];

export function FeaturedCollections() {
  return (
    <section className="section-padding bg-[var(--color-bone)]" aria-labelledby="collections-heading">
      <div className="container-lumerra">
        <div className="mb-12 md:mb-16 max-w-xl">
          <p className="caption-amber mb-4">Curated Collections</p>
          <h2 id="collections-heading" className="display-md text-[var(--color-ink)] mb-4">
            Find yours.
          </h2>
          <p className="text-[var(--color-graphite)] leading-relaxed">
            Three starting points. Each one a different kind of decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((col) => (
            <Link
              key={col.slug}
              href={col.href}
              className="group block"
              aria-label={`Browse ${col.label} collection`}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-5">
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 gradient-ink-bottom opacity-70" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="caption text-[var(--color-amber-light)] mb-2">{col.label}</p>
                  <p className="font-display text-2xl text-white font-light leading-tight">{col.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-[var(--color-graphite)] leading-relaxed mb-3">
                {col.description}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[var(--color-amber)] group-hover:gap-3 transition-all">
                Browse <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
