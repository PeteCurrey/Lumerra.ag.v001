import Link from 'next/link';

export function FooterStory() {
  return (
    <section className="bg-[var(--color-paper-deep)] py-32 md:py-48 text-center overflow-hidden">
      <div className="container-lumerra">
        <h2 className="display-80 text-[var(--color-ink)] mb-16 leading-[0.95]">
          The hour you <br />
          <span className="italic">take back.</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            href="/concierge" 
            className="btn py-4 px-10 border border-[var(--color-ink)] text-sm font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-white transition-all"
          >
            Begin with the Concierge
          </Link>
          <Link 
            href="/hot-tubs" 
            className="btn py-4 px-10 border border-[var(--color-ink)] text-sm font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-white transition-all"
          >
            Explore the collection
          </Link>
        </div>
      </div>
    </section>
  );
}
