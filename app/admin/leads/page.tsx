'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Table as TableIcon, 
  Map as MapIcon, 
  Plus, 
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Clock,
  MapPin
} from 'lucide-react';

const STAGES = ['New', 'Contacted', 'Quoted', 'Deposit Paid', 'Site Survey', 'Installed'];

const MOCK_LEADS = [
  { id: '1', name: 'James Wilson', brand: 'Lumerra', product: 'Portofino', value: 14500, stage: 'New', score: 85, location: 'London' },
  { id: '2', name: 'Sarah Thompson', brand: 'Ember', product: 'Outdoor Kitchen v1', value: 28000, stage: 'Contacted', score: 92, location: 'Manchester' },
  { id: '3', name: 'Robert Miller', brand: 'Warmpath', product: 'Air Source HP', value: 8500, stage: 'Quoted', score: 64, location: 'Bristol' },
  { id: '4', name: 'Emma Davis', brand: 'Lumerra', product: 'Hekla Sauna', value: 12000, stage: 'New', score: 78, location: 'Edinburgh' },
];

export default function LeadsDashboard() {
  const [view, setView] = useState<'board' | 'table' | 'map'>('board');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="display-64 mb-2">Lead Management</h1>
          <p className="text-ink-muted">Consolidated CRM for The Outdoor Living Group brands.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
          <div className="bg-paper-sunken p-1 rounded-sm border border-ink-rule flex gap-1">
            <button 
              onClick={() => setView('board')}
              className={`p-2 rounded-sm transition-all ${view === 'board' ? 'bg-white shadow-sm text-bronze' : 'text-ink-quiet hover:text-ink'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-2 rounded-sm transition-all ${view === 'table' ? 'bg-white shadow-sm text-bronze' : 'text-ink-quiet hover:text-ink'}`}
            >
              <TableIcon size={18} />
            </button>
            <button 
              onClick={() => setView('map')}
              className={`p-2 rounded-sm transition-all ${view === 'map' ? 'bg-white shadow-sm text-bronze' : 'text-ink-quiet hover:text-ink'}`}
            >
              <MapIcon size={18} />
            </button>
          </div>

          <button className="btn btn-primary h-11 px-6 flex items-center gap-2">
            <Plus size={18} />
            MANUAL ENTRY
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-4 py-4 border-y border-ink-rule">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-quiet" size={16} />
          <input 
            type="text" 
            placeholder="Search leads, products, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ink-rule px-10 py-2.5 text-sm focus:outline-none focus:border-bronze"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline h-10 px-4 flex items-center gap-2 text-xs">
            <Filter size={14} />
            BRAND: ALL
          </button>
          <button className="btn btn-outline h-10 px-4 flex items-center gap-2 text-xs">
            <Filter size={14} />
            VALUE: £5k+
          </button>
        </div>

        <div className="ml-auto text-[10px] uppercase tracking-widest text-ink-quiet">
          Total Value: <span className="text-ink font-bold font-mono">£63,000</span>
        </div>
      </div>

      {/* Main View Area */}
      <div className="min-h-[60vh]">
        <AnimatePresence mode="wait">
          {view === 'board' && (
            <motion.div 
              key="board"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-6 overflow-x-auto pb-8 mask-fade-right"
            >
              {STAGES.map((stage) => (
                <div key={stage} className="flex-shrink-0 w-80">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-caption text-ink font-bold flex items-center gap-2">
                      {stage}
                      <span className="bg-paper-sunken text-ink-quiet px-1.5 py-0.5 rounded text-[10px] font-mono">
                        {MOCK_LEADS.filter(l => l.stage === stage).length}
                      </span>
                    </h3>
                    <MoreHorizontal size={14} className="text-ink-quiet" />
                  </div>
                  
                  <div className="space-y-4">
                    {MOCK_LEADS.filter(l => l.stage === stage).map((lead) => (
                      <div 
                        key={lead.id}
                        className="bg-white border border-ink-rule p-5 shadow-sm hover:border-bronze transition-all group cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 border ${
                            lead.brand === 'Lumerra' ? 'text-bronze border-bronze/30 bg-bronze-wash/20' : 
                            lead.brand === 'Ember' ? 'text-orange-800 border-orange-200 bg-orange-50' :
                            'text-blue-800 border-blue-200 bg-blue-50'
                          }`}>
                            {lead.brand}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-success">
                            <Star size={10} className="fill-success" />
                            {lead.score}
                          </div>
                        </div>

                        <h4 className="font-medium text-sm mb-1">{lead.name}</h4>
                        <p className="text-xs text-ink-muted mb-4">{lead.product}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-ink-rule/50">
                          <div className="flex items-center gap-3 text-ink-quiet">
                             <div className="flex items-center gap-1 text-[10px] uppercase">
                               <MapPin size={10} />
                               {lead.location}
                             </div>
                             <div className="flex items-center gap-1 text-[10px] uppercase">
                               <Clock size={10} />
                               2h ago
                             </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-ink">
                            £{(lead.value / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full py-4 border border-dashed border-ink-rule text-ink-quiet text-xs hover:border-bronze hover:text-bronze transition-all">
                      + ADD LEAD
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'table' && (
            <motion.div 
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-ink-rule overflow-hidden"
            >
              <table className="w-full text-left">
                <thead className="bg-paper-sunken border-b border-ink-rule">
                  <tr>
                    <th className="px-6 py-4 text-caption">Lead</th>
                    <th className="px-6 py-4 text-caption">Product</th>
                    <th className="px-6 py-4 text-caption">Location</th>
                    <th className="px-6 py-4 text-caption">Score</th>
                    <th className="px-6 py-4 text-caption">Value</th>
                    <th className="px-6 py-4 text-caption text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LEADS.map(lead => (
                    <tr key={lead.id} className="border-b border-ink-rule hover:bg-paper-sunken/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-[10px] text-ink-quiet uppercase tracking-tighter">{lead.brand}</p>
                      </td>
                      <td className="px-6 py-4 text-xs text-ink-muted uppercase tracking-widest">{lead.product}</td>
                      <td className="px-6 py-4 text-xs">{lead.location}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs font-mono font-bold text-success">
                           <Star size={12} className="fill-success" />
                           {lead.score}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm">£{(lead.value/100).toLocaleString()}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[10px] font-bold uppercase tracking-widest border border-ink-rule px-2 py-1">
                          {lead.stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {view === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-[60vh] bg-paper-sunken border border-ink-rule flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {/* Simulated UK SVG Map would go here */}
                <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/UK_location_map.svg')] bg-contain bg-no-repeat bg-center" />
              </div>
              
              <div className="relative z-10 text-center">
                <MapPin size={48} className="text-bronze mx-auto mb-4 animate-bounce" />
                <h3 className="display-32 mb-2">UK Lead Density</h3>
                <p className="text-ink-muted text-sm max-w-sm mx-auto">
                  Heat map analysis of lead distribution across postcodes. (Map integration pending Leaflet.js activation).
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
