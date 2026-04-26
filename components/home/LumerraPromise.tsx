import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function LumerraPromise() {
  return (
    <section className="relative h-screen min-h-[700px] w-full flex flex-col lg:flex-row overflow-hidden border-y border-[var(--color-ink-rule)]">
      {/* Left Column: Image (50%) */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
        <Image 
          src="/images/wellness-teaser.jpg" 
          alt="The Lumerra Promise" 
          fill 
          className="object-cover"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-[var(--color-ink)]/10" />
      </div>

      {/* Right Column: Content (50%) */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[var(--color-paper-raised)] flex flex-col justify-center p-12 md:p-24 lg:p-32">
        <div className="max-w-xl">
          <p className="text-caption mb-8">The Lumerra Promise</p>
          <h2 className="display-56 text-[var(--color-ink)] mb-8 leading-[1.1]">
            Try it for 30 days at home. <br />
            <span className="italic">If it doesn&apos;t change your evenings,</span> <br />
            we collect it. White glove.
          </h2>
          <p className="text-lg text-[var(--color-ink-muted)] mb-12 leading-relaxed">
            The category is dominated by showrooms. We are dominated by the truth of your experience. 
            Our in-home wet test is the ultimate assurance of quality. No showrooms, no pressure, 
            just the water and you.
          </p>
          
          <Link 
            href="/the-lumerra-promise" 
            className="group inline-flex items-center gap-4 py-4 px-10 border border-[var(--color-ink-rule)] text-sm font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-white transition-all"
          >
            Read the Promise
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
