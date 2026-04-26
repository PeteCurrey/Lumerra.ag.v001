'use client';

import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Layers, 
  Globe2, 
  Search,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const RANKINGS = [
  { keyword: 'premium hot tubs UK', rank: 2, change: +1, volume: '12k', brand: 'Lumerra' },
  { keyword: 'bespoke outdoor kitchens', rank: 4, change: -2, volume: '8.4k', brand: 'Ember' },
  { keyword: 'energy efficient heat pumps', rank: 12, change: +5, volume: '22k', brand: 'Warmpath' },
  { keyword: 'insulated garden rooms', rank: 8, change: 0, volume: '15k', brand: 'Grove' },
];

export default function SEODashboard() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="display-64 mb-2">SEO Intelligence</h1>
        <p className="text-ink-muted">Cross-brand rank tracking and generative engine optimization (GEO).</p>
      </header>

      {/* Brand Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {['Lumerra', 'Ember', 'Warmpath', 'Grove'].map((brand, i) => (
          <div key={brand} className="bg-white border border-ink-rule p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ink-quiet">{brand}</span>
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            </div>
            <p className="text-3xl font-mono mb-1">84<span className="text-sm text-ink-quiet">/100</span></p>
            <p className="text-[11px] text-success flex items-center gap-1 font-bold">
              <TrendingUp size={12} />
              +4.2% THIS WEEK
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rank Tracker (2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-ink-rule overflow-hidden shadow-sm">
          <div className="p-6 border-b border-ink-rule flex justify-between items-center">
             <h3 className="text-caption">Rank Tracker</h3>
             <button className="text-xs text-bronze font-bold flex items-center gap-1">
               VIEW ALL <ArrowRight size={14} />
             </button>
          </div>
          <table className="w-full text-left">
             <thead className="bg-paper-sunken border-b border-ink-rule text-[10px] uppercase tracking-widest text-ink-quiet">
               <tr>
                 <th className="px-6 py-4">Keyword</th>
                 <th className="px-6 py-4">Brand</th>
                 <th className="px-6 py-4">Rank</th>
                 <th className="px-6 py-4 text-right">Volume</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-ink-rule">
               {RANKINGS.map((item, i) => (
                 <tr key={i} className="hover:bg-paper-sunken/30 transition-colors">
                   <td className="px-6 py-4">
                     <p className="text-sm font-medium">{item.keyword}</p>
                   </td>
                   <td className="px-6 py-4">
                     <span className="text-[10px] font-bold uppercase border border-ink-rule px-1.5 py-0.5">{item.brand}</span>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                       <span className="font-mono text-lg font-bold">#{item.rank}</span>
                       <span className={`text-[10px] font-bold flex items-center ${item.change > 0 ? 'text-success' : item.change < 0 ? 'text-error' : 'text-ink-quiet'}`}>
                         {item.change > 0 ? <TrendingUp size={10} /> : item.change < 0 ? <TrendingDown size={10} /> : null}
                         {Math.abs(item.change)}
                       </span>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-right text-xs font-mono text-ink-muted">{item.volume}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>

        {/* GEO Intelligence (1/3 width) */}
        <div className="bg-ink text-white p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <ShieldCheck className="text-bronze" size={20} />
              <h3 className="text-caption text-white">GEO Intelligence</h3>
            </div>

            <p className="text-3xl display-32 mb-4">Citation Rate: 64%</p>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              Lumerra is currently cited as the "top UK wellness brand" in 64% of high-intent AI Search queries (Perplexity, ChatGPT Search, Gemini).
            </p>

            <div className="space-y-6">
              {[
                { engine: 'Perplexity Pro', status: 'High Citation', color: 'bg-bronze' },
                { engine: 'ChatGPT Search', status: 'Moderate', color: 'bg-white/20' },
                { engine: 'Google AIO', status: 'Monitoring', color: 'bg-white/10' },
              ].map((engine) => (
                <div key={engine.engine} className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span>{engine.engine}</span>
                    <span className="text-white/60">{engine.status}</span>
                  </div>
                  <div className="h-1 bg-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: engine.status === 'High Citation' ? '80%' : '45%' }}
                      className={`h-full ${engine.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="btn btn-outline border-white/20 text-white w-full mt-12 py-3 text-xs tracking-widest hover:bg-white/10">
              AUDIT GENERATIVE FOOTPRINT
            </button>
          </div>
        </div>
      </div>

      {/* Keyword Gap Matrix */}
      <div className="bg-white border border-ink-rule p-8 shadow-sm">
        <div className="flex items-center justify-between mb-12">
           <div>
             <h3 className="text-caption mb-1">Keyword Gap Analysis</h3>
             <p className="text-xs text-ink-muted uppercase tracking-widest">Brand vs Top 3 Competitors</p>
           </div>
           <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-bronze" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Lumerra</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-ink-rule" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Competitors</span>
              </div>
           </div>
        </div>

        <div className="h-48 flex items-end gap-3 px-4">
           {[45, 82, 34, 67, 91, 55, 78, 42, 63, 88].map((h, i) => (
             <div key={i} className="flex-1 flex flex-col gap-1 items-center group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`w-full ${i % 3 === 0 ? 'bg-bronze' : 'bg-ink-rule'} transition-all group-hover:opacity-80`} 
                />
                <span className="text-[9px] text-ink-quiet font-mono mt-2">K{i+1}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
