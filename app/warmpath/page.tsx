import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Zap, ShieldCheck, ArrowRight, Activity, BarChart2 } from 'lucide-react';
import { TextReveal } from '@/components/ui/TextReveal';
import { SavingsCalculator } from '@/components/warmpath/SavingsCalculator';

export const metadata: Metadata = {
  title: 'Warmpath — The Future of Domestic Energy',
  description: 'High-efficiency Air Source Heat Pumps. Reduce your carbon footprint and energy bills with Lumerra Warmpath technical solutions.',
};

export default function WarmpathPage() {
  return (
    <div className="bg-technical-white text-ink min-h-screen">
      {/* Technical Hero */}
      <section className="relative h-[90vh] w-full flex items-center overflow-hidden bg-moss-wash">
        <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-20 pointer-events-none">
           <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-moss-light)_1px,_transparent_1px)] bg-[size:32px_32px]" />
        </div>
        
        <div className="container-lumerra relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-moss/10 text-moss text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-moss/20">
               <Activity size={14} />
               RENEWABLE EFFICIENCY — v3.1
            </div>
            <h1 className="display-96 mb-8 text-moss">The Warmpath <br /><span className="italic">to Efficiency.</span></h1>
            <p className="text-xl text-ink-soft max-w-2xl leading-relaxed mb-12">
              Transforming domestic heating into a sustainable asset. Our ASHP systems achieve a CoP of 4.5+, delivering 4.5kW of heat for every 1kW of electricity.
            </p>
            <div className="flex gap-6">
               <Link href="#calculator" className="btn btn-primary bg-moss text-white px-10 py-5 tracking-widest text-sm hover:bg-moss/80">
                 CALCULATE YOUR ROI
               </Link>
               <button className="btn btn-outline border-moss/20 text-moss px-10 py-5 tracking-widest text-sm hover:bg-moss-wash">
                 TECHNICAL SPECIFICATIONS
               </button>
            </div>
          </div>
        </div>

        {/* Floating Technical Stats */}
        <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
           <div className="bg-white border border-moss/10 p-8 shadow-2xl space-y-6 max-w-xs">
              <div className="flex items-center justify-between gap-12">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-ink-quiet">Efficiency Rating</span>
                 <span className="text-xl font-mono font-bold text-moss">A+++</span>
              </div>
              <div className="h-[1px] bg-moss/5" />
              <div className="flex items-center justify-between gap-12">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-ink-quiet">CO2 Reduction</span>
                 <span className="text-xl font-mono font-bold text-moss">~70%</span>
              </div>
           </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section id="calculator" className="section-padding bg-white">
        <div className="container-lumerra">
           <div className="grid lg:grid-cols-[1fr_450px] gap-24">
              <div>
                 <TextReveal 
                   text="Measure the ROI of a greener future." 
                   className="display-64 mb-8 text-moss"
                 />
                 <p className="text-lg text-ink-muted leading-relaxed mb-12">
                   Switching to an Air Source Heat Pump (ASHP) is one of the most significant upgrades you can make to your estate. Use our AI-powered calculator to estimate your annual savings and carbon reduction based on UK energy price caps.
                 </p>
                 
                 <div className="space-y-8">
                    {[
                      { icon: Zap, title: 'Energy Independence', desc: 'Reduce reliance on volatile gas and oil markets.' },
                      { icon: Leaf, title: 'Carbon Neutrality', desc: 'Achieve significant reductions in household emissions.' },
                      { icon: BarChart2, title: 'Asset Appreciation', desc: 'EPC rating improvements increase property value.' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-12 h-12 bg-moss-wash border border-moss/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="text-moss" size={20} />
                         </div>
                         <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-1">{item.title}</h4>
                            <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="bg-moss-wash p-8 border border-moss/10 shadow-xl">
                 <SavingsCalculator />
              </div>
           </div>
        </div>
      </section>

      {/* Technical Authority Section */}
      <section className="section-padding bg-moss text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10">
           <div className="w-full h-full bg-[url('/images/fx/grid.svg')] bg-[size:40px_40px]" />
        </div>
        
        <div className="container-lumerra relative z-10">
           <div className="text-center max-w-4xl mx-auto mb-24">
              <h2 className="display-80 mb-8">Clinical Engineering. <br /><span className="italic text-moss-light">Organic Outcomes.</span></h2>
              <p className="text-moss-light text-xl leading-relaxed">
                Warmpath isn't just about heat; it's about the technical mastery of thermodynamics. Our systems are commissioned by industry specialists to ensure perfect integration with your existing estate.
              </p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: 'MONOBLOC v3', value: '4.5 CoP', detail: 'External unit containing all components.' },
                { label: 'QUIET MODE', value: '32 dB(A)', detail: 'Whisper-quiet operation for sensitive landscapes.' },
                { label: 'OPERATING RANGE', value: '-25°C', detail: 'Consistent performance in extreme conditions.' },
              ].map((spec, i) => (
                <div key={i} className="p-12 border border-white/10 bg-white/5 backdrop-blur-sm">
                   <p className="text-[10px] uppercase tracking-[0.3em] text-moss-light mb-8">{spec.label}</p>
                   <p className="display-48 mb-4">{spec.value}</p>
                   <p className="text-xs text-moss-light leading-relaxed">{spec.detail}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
