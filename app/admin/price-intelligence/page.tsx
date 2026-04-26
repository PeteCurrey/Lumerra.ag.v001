'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Calendar, ArrowUpRight, ArrowDownRight, Search } from 'lucide-react';

const priceData = [
  { product: 'Platinum Portofino', lumerra: 12499, competitor: 11999, diff: 500, status: 'above' },
  { product: 'Platinum Palermo', lumerra: 14499, competitor: 14999, diff: -500, status: 'below' },
  { product: 'AquaSolus Calma', lumerra: 8999, competitor: 9299, diff: -300, status: 'below' },
  { product: 'Hekla Oslo', lumerra: 6499, competitor: 6499, diff: 0, status: 'match' },
];

export default function PriceIntelligencePage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper-sunken)] pt-32 pb-24 text-[var(--color-ink)]">
      <div className="container-lumerra max-w-6xl">
        <div className="flex justify-between items-end mb-16">
          <div>
            <p className="text-caption text-[var(--color-bronze)] mb-4">Trading Intelligence</p>
            <h1 className="display-64">Price Monitor.</h1>
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-3 border border-[var(--color-ink-rule)] text-[10px] uppercase tracking-widest">
            <Calendar size={14} /> Last Scan: 24 Oct 2025
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
           <div className="bg-white p-10 border border-[var(--color-ink-rule)]">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-3">Market Position</p>
              <h2 className="text-3xl font-display text-[var(--color-bronze)]">98.2%</h2>
              <p className="text-[10px] text-[var(--color-ink-muted)] mt-2 italic">Relative to nearest premium competitor</p>
           </div>
           <div className="bg-white p-10 border border-[var(--color-ink-rule)]">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-3">Price Alerts</p>
              <h2 className="text-3xl font-display text-red-600">02</h2>
              <p className="text-[10px] text-[var(--color-ink-muted)] mt-2 italic">Models &gt;5% above market average</p>
           </div>
           <div className="bg-white p-10 border border-[var(--color-ink-rule)]">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-3">Next Promo Window</p>
              <h2 className="text-3xl font-display">01 Nov</h2>
              <p className="text-[10px] text-[var(--color-ink-muted)] mt-2 italic">Recommended Black Friday early access</p>
           </div>
        </div>

        <div className="bg-white border border-[var(--color-ink-rule)] overflow-hidden mb-12">
           <div className="p-8 border-b border-[var(--color-ink-rule)] flex justify-between items-center bg-[var(--color-paper-sunken)]/50">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Active Price Benchmarks</h3>
              <div className="relative">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" />
                 <input type="text" placeholder="Filter products..." className="pl-10 pr-4 py-2 text-xs bg-white border border-[var(--color-ink-rule)] outline-none focus:border-[var(--color-ink)]" />
              </div>
           </div>
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-[var(--color-ink-rule)]">
                    <th className="p-8 text-[10px] uppercase tracking-widest font-bold opacity-50">Product Model</th>
                    <th className="p-8 text-[10px] uppercase tracking-widest font-bold opacity-50 text-right">Lumerra</th>
                    <th className="p-8 text-[10px] uppercase tracking-widest font-bold opacity-50 text-right">Market Avg</th>
                    <th className="p-8 text-[10px] uppercase tracking-widest font-bold opacity-50 text-right">Delta</th>
                    <th className="p-8 text-[10px] uppercase tracking-widest font-bold opacity-50">Trend</th>
                 </tr>
              </thead>
              <tbody>
                 {priceData.map((item, i) => (
                   <tr key={i} className="border-b border-[var(--color-ink-rule)] hover:bg-[var(--color-paper-sunken)]/30 transition-colors">
                      <td className="p-8 text-sm font-medium">{item.product}</td>
                      <td className="p-8 text-sm font-mono text-right">£{item.lumerra.toLocaleString()}</td>
                      <td className="p-8 text-sm font-mono text-right opacity-60">£{item.competitor.toLocaleString()}</td>
                      <td className={`p-8 text-sm font-mono text-right ${item.status === 'above' ? 'text-red-600' : item.status === 'below' ? 'text-green-600' : ''}`}>
                         {item.diff > 0 ? `+£${item.diff}` : item.diff < 0 ? `-£${Math.abs(item.diff)}` : 'Match'}
                      </td>
                      <td className="p-8">
                         {item.status === 'above' ? <ArrowUpRight size={16} className="text-red-600" /> : item.status === 'below' ? <ArrowDownRight size={16} className="text-green-600" /> : <TrendingUp size={16} className="opacity-30" />}
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="bg-[var(--color-ink)] text-white p-12 relative overflow-hidden">
           <TrendingUp size={120} className="absolute -right-12 -bottom-12 opacity-5 text-white" />
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                 <AlertCircle size={20} className="text-[var(--color-bronze-light)]" />
                 <h2 className="text-xs uppercase tracking-widest font-bold">AI Trading Recommendation</h2>
              </div>
              <p className="text-lg leading-relaxed italic max-w-3xl mb-10 opacity-90">
                &quot;The Portofino is currently 4.2% above market average. Historical order patterns suggest a 15% drop in volume at this price point during November. We recommend a £500 discount window from 01 Nov to 15 Nov to capture pre-Christmas demand, projected to yield a 12% revenue uplift.&quot;
              </p>
              <button className="btn btn-primary bg-[var(--color-bronze)] hover:bg-[var(--color-bronze-light)] border-none py-4 px-12 text-[10px] uppercase tracking-widest">
                 Apply Recommended Promo
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
