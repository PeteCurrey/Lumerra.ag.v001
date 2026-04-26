import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';

const articles = [
  {
    slug: 'how-to-choose-your-first-hot-tub',
    title: 'How to Choose Your First Hot Tub: A Complete Guide',
    kicker: 'Buying Guide',
    readTime: '8 min read',
    image: '/images/collections/under-10k.jpg',
  },
  {
    slug: 'hydrotherapy-explained-the-science-of-warm-water',
    title: 'Hydrotherapy Explained: The Science of Warm Water',
    kicker: 'Wellness',
    readTime: '6 min read',
    image: '/images/hero-poster.jpg',
  },
  {
    slug: '13-amp-vs-32-amp-which-is-right-for-you',
    title: '13 Amp vs 32 Amp: Which Power Supply Is Right For You?',
    kicker: 'Technical',
    readTime: '5 min read',
    image: '/images/collections/plug-and-play.jpg',
  },
];

export function JournalPreview() {
  return (
    <section className="section-padding bg-[var(--color-paper)]">
      <div className="container-lumerra">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-xl">
            <p className="caption-amber mb-4">The Journal</p>
            <h2 className="display-md text-[var(--color-ink)] mb-4">
              Considered living.
            </h2>
            <p className="text-[var(--color-graphite)] leading-relaxed">
              Notes on design, hydrotherapy science, and the ritual of the home spa.
            </p>
          </div>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[var(--color-amber)] hover:gap-3 transition-all"
          >
            View all articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[16/10] mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="caption text-[10px] text-[var(--color-pewter)]">{article.kicker}</span>
                <span className="flex items-center gap-1.5 text-[10px] text-[var(--color-pewter)] font-mono uppercase tracking-wider">
                  <Clock size={10} />
                  {article.readTime}
                </span>
              </div>
              
              <h3 className="font-display text-xl md:text-2xl text-[var(--color-ink)] group-hover:text-[var(--color-amber)] transition-colors leading-tight">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
