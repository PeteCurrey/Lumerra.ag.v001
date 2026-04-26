'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, ShieldAlert, Calendar, ShoppingCart, MessageSquare, AlertTriangle, ArrowRight } from 'lucide-react';

export default function OwnerHubPage() {
  const [activeTab, setActiveTab] = useState('care');

  return (
    <div className="min-h-screen bg-[var(--color-paper-sunken)] pt-32 pb-24">
      <div className="container-lumerra max-w-5xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-caption text-[var(--color-bronze)] mb-4">Customer Account</p>
            <h1 className="display-64">Owner Hub.</h1>
          </div>
          <div className="bg-white px-8 py-4 border border-[var(--color-ink-rule)] text-right">
             <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Your Model</p>
             <p className="text-sm font-medium">Platinum Spas Portofino (2025)</p>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="flex border-b border-[var(--color-ink-rule)] mb-12 overflow-x-auto no-scrollbar">
           {[
             { id: 'care', label: 'Water Care', icon: Droplets },
             { id: 'diagnosis', label: 'AI Diagnosis', icon: ShieldAlert },
             { id: 'history', label: 'Service History', icon: Calendar },
             { id: 'shop', label: 'Shop Accessories', icon: ShoppingCart },
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex items-center gap-3 px-8 py-5 text-[10px] uppercase tracking-widest font-bold transition-all border-b-2 ${activeTab === tab.id ? 'border-[var(--color-bronze)] text-[var(--color-ink)]' : 'border-transparent text-[var(--color-ink-muted)] opacity-50 hover:opacity-100'}`}
             >
               <tab.icon size={16} /> {tab.label}
             </button>
           ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Content Area */}
          <div className="space-y-8">
            {activeTab === 'care' && (
              <div className="bg-white border border-[var(--color-ink-rule)] p-12">
                 <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-display">Weekly Maintenance</h2>
                    <span className="text-[10px] uppercase tracking-widest bg-green-100 text-green-700 px-3 py-1">Last test: 2 days ago</span>
                 </div>
                 
                 <div className="space-y-6">
                    {[
                      { item: 'Check Alkalinity (Target: 80-120ppm)', done: true },
                      { item: 'Verify pH Level (Target: 7.2-7.6)', done: true },
                      { item: 'Sanitiser Residual (Chlorine: 3-5ppm)', done: false },
                      { item: 'Clean Micro-Filters', done: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-4 p-6 border border-[var(--color-ink-rule)] hover:border-[var(--color-ink)] transition-colors group">
                        <div className={`w-6 h-6 border rounded-sm flex items-center justify-center transition-colors ${step.done ? 'bg-[var(--color-ink)] border-[var(--color-ink)]' : 'border-[var(--color-ink-rule)] group-hover:border-[var(--color-ink)]'}`}>
                          {step.done && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span className={`text-sm ${step.done ? 'line-through opacity-40' : 'font-medium'}`}>{step.item}</span>
                      </div>
                    ))}
                 </div>

                 <div className="mt-12 p-8 bg-[var(--color-paper-sunken)] flex items-start gap-4">
                    <AlertTriangle size={20} className="text-[var(--color-bronze)] shrink-0 mt-1" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2">Winter Prep Advisory</p>
                      <p className="text-[11px] leading-relaxed text-[var(--color-ink-muted)] italic">
                        The temperature is projected to drop below 2°C this week. We recommend verifying your heater is in Standard mode and your freeze protection is active.
                      </p>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'diagnosis' && (
              <div className="bg-white border border-[var(--color-ink-rule)] p-12">
                 <h2 className="text-xl font-display mb-8">AI Symptom Diagnosis</h2>
                 <p className="text-sm text-[var(--color-ink-muted)] italic mb-10 leading-relaxed">
                   Describe the issue or symptom you are noticing with your water or equipment. Our AI will diagnose based on your model&apos;s specific engineering.
                 </p>
                 <div className="relative mb-10">
                    <textarea 
                      placeholder="e.g. My water is cloudy and has a slight green tint..."
                      className="w-full bg-[var(--color-paper-sunken)] p-8 text-lg font-light outline-none focus:ring-1 ring-[var(--color-bronze)] min-h-[150px] resize-none"
                    />
                    <button className="absolute right-6 bottom-6 btn btn-primary py-3 px-8 text-[10px] uppercase tracking-widest">
                       Run Diagnosis
                    </button>
                 </div>
                 
                 <div className="p-8 border border-dashed border-[var(--color-ink-rule)] text-center">
                    <p className="text-[10px] text-[var(--color-ink-quiet)] uppercase tracking-[0.2em]">Awaiting input</p>
                 </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[var(--color-ink)] text-white p-10">
               <h3 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-60">Reorder Loop</h3>
               <div className="space-y-8">
                  <div className="flex gap-4">
                     <div className="w-16 h-16 bg-white/10 shrink-0" />
                     <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider mb-1">Micro-Filter Type 3</p>
                        <p className="text-[10px] opacity-60 italic mb-3">Due: 14 days</p>
                        <button className="text-[10px] text-[var(--color-bronze-light)] uppercase tracking-widest font-bold hover:text-white transition-colors">Add to next Care Box</button>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-16 h-16 bg-white/10 shrink-0" />
                     <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider mb-1">Lithium Test Strips</p>
                        <p className="text-[10px] opacity-60 italic mb-3">Running low</p>
                        <button className="text-[10px] text-[var(--color-bronze-light)] uppercase tracking-widest font-bold hover:text-white transition-colors">Order Now (£14.99)</button>
                     </div>
                  </div>
               </div>
            </div>

            <button className="w-full bg-white border border-[var(--color-ink-rule)] p-6 flex items-center justify-between group hover:border-[var(--color-ink)] transition-colors">
               <div className="flex items-center gap-4">
                  <MessageSquare size={18} className="text-[var(--color-bronze)]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Request Service Call</span>
               </div>
               <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
