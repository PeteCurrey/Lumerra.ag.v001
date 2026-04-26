import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Zap, Thermometer, Shield, Droplets } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Warmpath Technical Specification',
  description: 'Detailed engineering metrics for the Warmpath renewable energy range.',
};

export default function TechSpecPage() {
  return (
    <main className="bg-technical-white min-h-screen pt-32 pb-24 text-ink">
      <div className="container-lumerra">
        <Link 
          href="/warmpath"
          className="inline-flex items-center gap-2 text-caption text-moss mb-12 hover:translate-x-[-4px] transition-transform"
        >
          <ChevronLeft size={16} />
          Return to Warmpath
        </Link>

        <header className="mb-24">
           <p className="text-caption text-moss mb-4 uppercase tracking-[0.4em]">Model: Monobloc v3.1</p>
           <h1 className="display-80 text-moss">Technical <br />Specification.</h1>
        </header>

        <div className="grid lg:grid-cols-2 gap-24">
           <section className="space-y-12">
              <div>
                 <h3 className="text-caption text-moss mb-8 border-b border-moss/10 pb-4">Performance Metrics</h3>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-8 bg-white border border-moss/10">
                       <p className="text-[10px] uppercase tracking-widest text-ink-quiet mb-2">Max CoP</p>
                       <p className="text-4xl font-mono font-bold text-moss">4.82</p>
                    </div>
                    <div className="p-8 bg-white border border-moss/10">
                       <p className="text-[10px] uppercase tracking-widest text-ink-quiet mb-2">Sound Power</p>
                       <p className="text-4xl font-mono font-bold text-moss">32 dB</p>
                    </div>
                 </div>
              </div>

              <div>
                 <h3 className="text-caption text-moss mb-8 border-b border-moss/10 pb-4">Operational Range</h3>
                 <div className="space-y-6">
                    {[
                      { label: 'Minimum Temp', value: '-25°C', icon: Thermometer },
                      { label: 'Flow Temp', value: '65°C', icon: Droplets },
                      { label: 'Power Input', value: '230V / 50Hz', icon: Zap },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-moss-wash border border-moss/10">
                         <div className="flex items-center gap-4">
                            <spec.icon size={18} className="text-moss" />
                            <span className="text-xs font-bold uppercase tracking-widest">{spec.label}</span>
                         </div>
                         <span className="text-sm font-mono font-bold">{spec.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </section>

           <aside>
              <div className="bg-moss p-12 text-white sticky top-32">
                 <h3 className="display-48 mb-6">Commercial Enquiry</h3>
                 <p className="text-moss-light mb-12 leading-relaxed">
                   Request a full engineering pack including architectural CAD files and seasonal performance tables (SCOP) for your specific GEO location.
                 </p>
                 <button className="btn bg-white text-moss w-full py-5 text-sm tracking-widest hover:bg-moss-light hover:text-white">
                   REQUEST DATA PACK
                 </button>
              </div>
           </aside>
        </div>
      </div>
    </main>
  );
}
