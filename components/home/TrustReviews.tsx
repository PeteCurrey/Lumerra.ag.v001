import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [
  {
    name: 'Eleanor R.',
    location: 'Cotswolds',
    text: 'The Portofino is the most considered purchase we&apos;ve made for our home. The delivery team was exceptional, and the daily ritual has changed how we sleep.',
    rating: 5,
  },
  {
    name: 'James T.',
    location: 'Edinburgh',
    text: 'AquaSolus engineering is in a different class. Whisper-quiet and beautifully insulated. Lumerra made the entire digital process feel very personal.',
    rating: 5,
  },
  {
    name: 'Sarah M.',
    location: 'Surrey',
    text: 'A truly premium experience from start to finish. No showrooms, no pressure, just quality wellness equipment and excellent support.',
    rating: 5,
  },
];

const pressLogos = [
  { name: 'FT', logo: '/images/press/ft.svg' },
  { name: 'Telegraph', logo: '/images/press/telegraph.svg' },
  { name: 'Ideal Home', logo: '/images/press/ideal-home.svg' },
  { name: 'Good Housekeeping', logo: '/images/press/good-housekeeping.svg' },
];

export function TrustReviews() {
  return (
    <section className="section-padding bg-[var(--color-bone)] border-t border-[var(--color-mist)]">
      <div className="container-lumerra">
        <div className="text-center mb-16 md:mb-20">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-[var(--color-amber)] text-[var(--color-amber)]" />
            ))}
          </div>
          <h2 className="display-md text-[var(--color-ink)] mb-4">
            Trusted by UK homeowners.
          </h2>
          <p className="text-[var(--color-graphite)]">
            Verified 4.9/5 on Trustpilot based on 450+ verified reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-[var(--color-paper)] p-8 md:p-10 rounded-xl border border-[var(--color-mist)] relative"
            >
              <Quote size={24} className="text-[var(--color-amber)]/20 absolute top-8 right-8" />
              <div className="flex gap-0.5 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[var(--color-amber)] text-[var(--color-amber)]" />
                ))}
              </div>
              <p className="text-[var(--color-ink)] leading-relaxed mb-8 italic">
                &quot;{review.text}&quot;
              </p>
              <div>
                <p className="font-medium text-sm text-[var(--color-ink)]">{review.name}</p>
                <p className="text-xs text-[var(--color-pewter)] uppercase tracking-wider">{review.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Press logos */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
           {/* Placeholder text logos since SVG files aren't created yet */}
           {['FT', 'THE TELEGRAPH', 'IDEAL HOME', 'GOOD HOUSEKEEPING'].map(press => (
             <span key={press} className="font-display text-lg md:text-xl tracking-widest">{press}</span>
           ))}
        </div>
      </div>
    </section>
  );
}
