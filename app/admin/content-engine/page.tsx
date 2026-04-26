'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, FileText, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const contentTypes = [
  { id: 'location', name: 'Location Page', description: 'Targeting specific UK towns/counties.' },
  { id: 'comparison', name: 'Comparison Page', description: 'Product vs Product or Brand vs Brand.' },
  { id: 'guide', name: 'Buying Guide', description: 'Educational "How to choose" content.' },
  { id: 'journal', name: 'Journal Post', description: 'Lifestyle and wellness editorial.' },
];

export default function ContentEnginePage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const [config, setConfig] = useState({
    type: 'guide',
    keyword: '',
    targetProduct: '',
  });
  const [results, setResults] = useState<any>({
    research: null,
    outline: null,
    draft: null,
  });

  const handleResearch = async () => {
    setLoading('researching');
    // Mocking Claude Research API
    setTimeout(() => {
      setResults({
        ...results,
        research: {
          gaps: ['Lack of detailed running cost data for 2026 models', 'Missing specific insulation thickness comparisons'],
          angle: 'The "Silent Efficiency" angle — focusing on acoustic insulation and overnight heat retention.',
          semanticTerms: ['R-value', 'kilowatt-hour efficiency', 'acoustic dampening', 'ambient heat gain'],
        }
      });
      setLoading(null);
      setStep(1);
    }, 2000);
  };

  const handleGenerateDraft = async () => {
    setLoading('drafting');
    // Mocking Claude Drafting API
    setTimeout(() => {
      setResults({
        ...results,
        draft: {
          title: `The Ultimate Guide to ${config.keyword || 'Low-Running-Cost Hot Tubs'}`,
          body: `## The Quick Answer\nChoosing a hot tub in 2026 requires more than just looking at the jet count. The true measure of luxury is invisible: it is the thermal efficiency that ensures your hour of stillness doesn't come with a noisy electricity meter.\n\n## The Silent Efficiency Angle\nMost manufacturers talk about "insulation," but at Lumerra, we focus on the R-value of our high-density closed-cell foam...`,
          aeoScore: 88,
        }
      });
      setLoading(null);
      setStep(2);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper-sunken)] pt-32 pb-24">
      <div className="container-lumerra max-w-5xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-caption text-[var(--color-bronze)] mb-4">Internal Admin Tool</p>
            <h1 className="display-64">Content Engine.</h1>
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-3 border border-[var(--color-ink-rule)] text-[10px] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Claude-3.5-Sonnet Connected
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Workspace */}
          <div className="space-y-8">
            {step === 0 && (
              <div className="bg-white border border-[var(--color-ink-rule)] p-12">
                 <h2 className="text-xl font-display mb-10">Initial Configuration</h2>
                 <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest mb-4 font-bold">Content Strategy</label>
                      <div className="grid grid-cols-2 gap-4">
                        {contentTypes.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setConfig({...config, type: t.id})}
                            className={`p-6 border text-left transition-all ${config.type === t.id ? 'border-[var(--color-ink)] bg-[var(--color-paper-sunken)]' : 'border-[var(--color-ink-rule)] opacity-60'}`}
                          >
                            <p className="text-xs font-bold uppercase tracking-widest mb-1">{t.name}</p>
                            <p className="text-[10px] text-[var(--color-ink-muted)]">{t.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest mb-4 font-bold">Primary Keyword / Topic</label>
                      <input 
                        type="text"
                        placeholder="e.g. Best hot tubs for lower back pain 2026"
                        value={config.keyword}
                        onChange={(e) => setConfig({...config, keyword: e.target.value})}
                        className="w-full border-b border-[var(--color-ink-rule)] py-4 text-xl font-light outline-none focus:border-[var(--color-bronze)]"
                      />
                    </div>
                    <button 
                      onClick={handleResearch}
                      disabled={!config.keyword || loading !== null}
                      className="btn btn-primary w-full py-5 gap-3"
                    >
                      {loading === 'researching' ? 'Performing SERP Analysis...' : 'Start Research Phase'}
                      <Search size={18} />
                    </button>
                 </div>
              </div>
            )}

            {step === 1 && results.research && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="bg-white border border-[var(--color-ink-rule)] p-12">
                  <h2 className="text-xl font-display mb-8">Phase 01: Research Insights</h2>
                  <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Content Gaps Found</h3>
                      <ul className="space-y-3">
                        {results.research.gaps.map((g: string, i: number) => (
                          <li key={i} className="text-sm flex gap-3 italic">
                            <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Recommended Lumerra Angle</h3>
                      <p className="text-sm leading-relaxed italic">{results.research.angle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleGenerateDraft}
                    disabled={loading !== null}
                    className="btn btn-primary w-full py-5 gap-3"
                  >
                    {loading === 'drafting' ? 'Generating Editorial Draft...' : 'Generate Full Article Draft'}
                    <Sparkles size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && results.draft && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[var(--color-ink-rule)] p-12">
                <div className="flex justify-between items-center mb-12 pb-8 border-b border-[var(--color-ink-rule)]">
                  <h2 className="text-2xl font-display">{results.draft.title}</h2>
                  <div className="flex items-center gap-6">
                     <div className="text-right">
                       <p className="text-[10px] uppercase tracking-widest opacity-50">AEO Score</p>
                       <p className="text-xl font-mono font-bold text-green-600">{results.draft.aeoScore}/100</p>
                     </div>
                     <button className="btn btn-primary py-3 px-6 text-[10px]">Publish to Journal</button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  {results.draft.body.split('\n').map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white border border-[var(--color-ink-rule)] p-8">
               <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6">Strategy Rules</h3>
               <div className="space-y-4">
                  <div className="flex gap-3">
                    <AlertCircle size={14} className="text-[var(--color-bronze)] shrink-0" />
                    <p className="text-[10px] leading-relaxed text-[var(--color-ink-muted)]">Must include &quot;Quick Answer&quot; block for Google Featured Snippets.</p>
                  </div>
                  <div className="flex gap-3">
                    <AlertCircle size={14} className="text-[var(--color-bronze)] shrink-0" />
                    <p className="text-[10px] leading-relaxed text-[var(--color-ink-muted)]">Voice: Confident, precise, warm. UK English exclusively.</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-[var(--color-ink)] text-white p-8">
               <h3 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Token Budget</h3>
               <p className="text-2xl font-mono mb-2">£124.50</p>
               <p className="text-[10px] text-white/50 uppercase tracking-widest">Spent this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
